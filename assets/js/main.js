    /**
     * ALPHA ROOFING & GUTTERS | MASTER LOGIC CONTROLLER
     * ESTRATEGA: IM + Alpha AI
     * FILOSOFÍA: "La belleza es la estructura hecha visible"
     * VERSION: 22.2.0 (Consolidated: Navigation, Bilingual Sync & Flip-Words Engine)
     */

    document.addEventListener("DOMContentLoaded", function() {
        console.log("[Alpha Core] System Synchronized v22.2.0");

        // 1. DETECCIÓN DE IDIOMA Y RUTAS [SSOT 1351]
        const isEnglish = window.location.pathname.includes('/en/');
        const headerPath = isEnglish ? "/components/header-en.html" : "/components/header.html";

        // 2. INYECCIÓN MODULAR DE COMPONENTES [SSOT 1352]
        injectComponent("header-container", headerPath);
        injectComponent("zoho-form-embed", "/components/lead-form.html");

        // 3. INICIALIZACIÓN DE NAVEGACIÓN WEBAPP [SSOT 1352]
        if (!document.getElementById('language-selector')) {
            initAlphaNavigation();
        } else if (window.location.hash) {
            initAlphaNavigation();
        }

        // 4. ACTIVACIÓN DEL MOTOR FLIP-WORDS (SOLO SI EXISTE EL TARGET) [25: 1392]
        const flipTarget = document.getElementById('flip-word-target');
        if (flipTarget) {
            setInterval(rotateCity, 2800); // Cadencia agilizada según protocolo regional
        }
    });

    /**
     * MOTOR FLIP-WORDS: COBERTURA REGIONAL ALPHA [SSOT: Cobertura 41 Ciudades]
     */
    const coreCities = ["THE WOODLANDS, TX", "SPRING, TX"];
    const additionalCities = [
        "CONROE, TX", "TOMBALL, TX", "MAGNOLIA, TX", "MONTGOMERY, TX", "KLEIN, TX", 
        "OAK RIDGE NORTH, TX", "SHENANDOAH, TX", "HOUSTON, TX", "BELLAIRE, TX", 
        "WEST UNIVERSITY PLACE, TX", "HUNTERS CREEK VILLAGE, TX", "SPRING VALLEY VILLAGE, TX", 
        "JERSEY VILLAGE, TX", "ALDINE, TX", "HUMBLE, TX", "ATASCOCITA, TX", "KINGWOOD, TX", 
        "KATY, TX", "CYPRESS, TX", "FULSHEAR, TX", "RICHMOND, TX", "ROSENBERG, TX", 
        "SUGAR LAND, TX", "MISSOURI CITY, TX", "STAFFORD, TX", "PEARLAND, TX", 
        "FRIENDSWOOD, TX", "LEAGUE CITY, TX", "GALVESTON, TX", "SANTA FE, TX", 
        "DICKINSON, TX", "PASADENA, TX", "SOUTH HOUSTON, TX", "DEER PARK, TX", 
        "BAYTOWN, TX", "MONT BELVIEU, TX", "CHANNELVIEW, TX", "CLEAR LAKE, TX"
    ];

    function shuffleArray(a) {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }

    // Lista unificada: Houston es estático en HTML, el script inicia con el resto
    const alphaCities = [...coreCities, ...shuffleArray(additionalCities.filter(c => c !== "HOUSTON, TX"))];
    let cityIdx = 0;

    function buildWordElement(fullStr) {
        const wrapper = document.createElement('span');
        wrapper.className = 'word-wrapper';
        const words = fullStr.split(' ');
        let globalCharIdx = 0;

        words.forEach((wordText, wordIdx) => {
            // Creamos un bloque indivisible para cada palabra
            const wordGroup = document.createElement('span');
            wordGroup.className = 'inline-block whitespace-nowrap';

            [...wordText].forEach((char) => {
                const letterSpan = document.createElement('span');
                letterSpan.textContent = char;
                letterSpan.className = 'letter';
                letterSpan.style.transitionDelay = `${globalCharIdx * 0.03}s`;
                wordGroup.appendChild(letterSpan);
                globalCharIdx++;
            });

            wrapper.appendChild(wordGroup);

            // Espacio entre palabras como letra animable
            if (wordIdx < words.length - 1) {
                const spaceSpan = document.createElement('span');
                spaceSpan.innerHTML = '&nbsp;';
                spaceSpan.className = 'letter';
                spaceSpan.style.transitionDelay = `${globalCharIdx * 0.03}s`;
                wrapper.appendChild(spaceSpan);
                globalCharIdx++;
            }
        });
        return wrapper;
    }

    function rotateCity() {
        const targetContainer = document.getElementById('flip-word-target');
        if (!targetContainer) return;

        const current = targetContainer.querySelector('.word-wrapper');
        if (current) {
            current.classList.remove('active');
            current.classList.add('exit');
            setTimeout(() => current.remove(), 800); // Tiempo de espera para desvanecimiento
        }

        const nextCityStr = alphaCities[cityIdx];
        const newCity = buildWordElement(nextCityStr);
        targetContainer.appendChild(newCity);
        
        newCity.offsetHeight; // Forzado de reflow para disparar animación
        newCity.classList.add('active');
        cityIdx = (cityIdx + 1) % alphaCities.length;
    }

    /**
     * CONTROLADOR DE NAVEGACIÓN SEMÁNTICA [SSOT 1354]
     */
    function initAlphaNavigation() {
        const currentHash = window.location.hash.replace('#', '') || 'hero-section';
        history.replaceState({ sectionId: currentHash }, 'Home', `#${currentHash}`);
        showSection(currentHash, true);
    }

    function showSection(sectionId, isBack = false) {
        const sections = document.querySelectorAll('.view-section');
        const targetSection = document.getElementById(sectionId);
        
        if (targetSection) {
            sections.forEach(s => s.classList.remove('active'));
            targetSection.classList.add('active');
            
            // Reset de scroll interno para secciones con scrollable
            if (targetSection.classList.contains('scrollable')) {
                targetSection.scrollTop = 0;
            }

            // Reset de vista del Hub de Contacto si aplica [5]
            if (sectionId !== 'lead-form-container') {
                hideZohoForm();
            }

            if (!isBack) {
                history.pushState({ sectionId: sectionId }, '', `#${sectionId}`);
            }
        }
    }

    /**
     * COMPONENTES Y BACKEND [SSOT 1353, 1356]
     */
    function injectComponent(containerId, path) {
        const container = document.getElementById(containerId);
        if (container) {
            fetch(path)
                .then(res => {
                    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
                    return res.text();
                })
                .then(data => { container.innerHTML = data; })
                .catch(err => console.error(`[Alpha Error] Fallo en inyección de ${containerId}:`, err));
        }
    }

    function toggleFullscreenMenu() {
        const menu = document.getElementById("fullscreen-menu-overlay");
        if (menu) {
            menu.classList.toggle('hidden');
        }
    }

    function showZohoForm() {
        const hub = document.getElementById('hub-options');
        const zoho = document.getElementById('zoho-form-container');
        if (hub && zoho) {
            hub.classList.add('hidden');
            zoho.classList.remove('hidden');
            history.pushState({ sectionId: 'lead-form-container', subView: 'zoho' }, '', '#form-entry');
        }
    }

    function hideZohoForm() {
        const hub = document.getElementById('hub-options');
        const zoho = document.getElementById('zoho-form-container');
        if (hub && zoho) {
            zoho.classList.add('hidden');
            hub.classList.remove('hidden');
        }
    }



    window.onpopstate = function(event) {
        // Si el evento tiene un estado definido, es una navegación de pantalla completa (SPA logic)
        if (event.state && event.state.sectionId) {
            if (event.state.sectionId === 'lead-form-container' && !event.state.subView) {
                hideZohoForm();
            }
            showSection(event.state.sectionId, true);
        } else {
            // Permitimos que el navegador maneje los hashes internos (#alpha-way, etc.) sin resetear
            const currentHash = window.location.hash.replace('#', '');
            const targetElement = document.getElementById(currentHash);
            
            // Solo regresamos al Hero si no hay un hash válido o el elemento no existe
            if (!currentHash || !targetElement) {
                showSection('hero-section', true);
            }
        }
    };


    // Accesos Rápidos
    function navigateToHome(event) { 
        if (event) event.preventDefault();
        console.log("[Alpha Core] Retorno fluido al cimiento.");
        showSection('hero-section'); 
    }

    function navigateToAuditForm(event) { 
        if (event) event.preventDefault();
        console.log("[Alpha Core] Salto táctico al motor de captura.");
        showSection('lead-form-container'); 
    }

    /* MOTOR DE ROTACIÓN DE PREGUNTAS (v40.0.0) */
    let qIdx = 0;
    function rotateQuestions() {
        const items = document.querySelectorAll('.q-item');
        if (items.length === 0) return;
        const current = items[qIdx];
        current.classList.remove('active');
        current.classList.add('exit');
        qIdx = (qIdx + 1) % items.length;
        const next = items[qIdx];
        next.classList.remove('exit');
        next.offsetHeight; // Force reflow
        next.classList.add('active');
        setTimeout(() => {
            items.forEach((item, i) => { if (i !== qIdx) item.classList.remove('exit'); });
        }, 800);
    }
    // Activar el intervalo (4.5s para legibilidad técnica)
    setInterval(rotateQuestions, 4500);


    /* 🎡 SENSOR DE NAVEGACIÓN QUIRÚRGICO (ScrollSpy v55) */
            document.addEventListener("DOMContentLoaded", () => {
                const sections = document.querySelectorAll("section[id]");
                const navItems = document.querySelectorAll(".nav-item");

                const observer = new IntersectionObserver((entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            const targetId = entry.target.id;
                            navItems.forEach((item) => {
                                item.classList.remove("active");
                                if (item.getAttribute("href").substring(1) === targetId) {
                                    item.classList.add("active");
                                }
                            });
                        }
                    });
                }, {
                    // Reducimos el umbral al 10% para que se active apenas entre la sección
                    threshold: 0.1, 
                    // Flexibilizamos el margen para móviles: 5% arriba y 15% abajo
                    rootMargin: "-5% 0px -15% 0px" 
                });

                sections.forEach((section) => observer.observe(section));
            });


            /**
 * 🎡 MOTOR ALPHA LEGACY: TESTIMONIALS ENGINE v89 [Source: 26]
 */
    const testimonials = [
        { name: "Ramon Hernandez", location: "Houston, TX", service: "Reemplazo de Techo", quote: "Alpha se encargó de absolutamente todo con el seguro. Me dio mucha tranquilidad ver cómo recuperaron mi hogar con tanta profesionalidad.", rotation: -3 },
        { name: "Samantha Harris", location: "Cypress, TX", service: "Restauración por Tormenta", quote: "Tras el tornado, Alpha peleó mi caso con el seguro. Lograron la aprobación total del techo completo cuando inicialmente el seguro solo querían cubrir reparaciones.", rotation: 2 },
        { name: "Steve Ramirez", location: "Sugar Land, TX", service: "Reemplazo de Techo", quote: "Un proceso increíblemente rápido. La aseguranza pagó a la primera y la instalación quedó impecable. Muy feliz con el resultado.", rotation: -2 },
        { name: "Armando Silva", location: "The Woodlands, TX", service: "Reemplazo de Techo", quote: "Mi casa quedó como nueva. El equipo cuidó cada detalle y el resultado final realmente elevó el valor de mi patrimonio.", rotation: 3 },
        { name: "John Peters", location: "Katy, TX", service: "Gestión de Seguro", quote: "Excelente gestión. Me hicieron el techo a través de mi aseguranza y no tuve que preocuparme por nada técnico.", rotation: -4 },
        { name: "Miguel Andrade", location: "Pasadena, TX", service: "Reemplazo de Techo", quote: "La calidad es visible. El color y el material del techo son espectaculares; se nota el profesionalismo en las terminaciones.", rotation: 1 },
        { name: "Lisa Smith", location: "Channelview, TX", service: "Gestión de Seguro", quote: "Totalmente satisfecha. Alpha asumió la responsabilidad del proceso, permitiéndome disfrutar del resultado final sin estrés.", rotation: -2 },
        { name: "James Ordonez", location: "Pearland, TX", service: "Reemplazo de Techo", quote: "Tenía goteras internas persistentes. Alpha detectó el origen y lo solucionó definitivamente. Mi casa está protegida de nuevo.", rotation: 3 },
        { name: "Roberto Martinez", location: "Spring, TX", service: "Proyecto Exterior", quote: "Construyeron un espacio inmaculado. Su metodología de trabajo es limpia, ordenada y de un nivel técnico superior.", rotation: -1 }
    ];

    let legacyIdx = 0;
    let legacyInterval;
    let legacyPlaying = true;

    function updateLegacyUI() {
        const data = testimonials[legacyIdx];
        const quoteEl = document.getElementById('client-quote');
        const cards = document.querySelectorAll('#legacy .testimonial-card');
        
        // Update Info with Scales [Source: 1121]
        document.getElementById('client-name').innerText = data.name;
        document.getElementById('client-location').innerText = data.location;
        document.getElementById('client-service').innerText = data.service;

        // Update Images Stack [Source: 303]
        cards.forEach((card, i) => {
            card.className = 'testimonial-card';
            if (i === legacyIdx) {
                card.classList.add('active');
                card.style.transform = `rotate(0deg) scale(1)`;
            } else {
                card.classList.add('background');
                const rot = testimonials[i]?.rotation || 0;
                card.style.transform = `rotate(${rot}deg) scale(0.95)`;
            }
        });

        // Word Stagger Animation
        quoteEl.innerHTML = '';
        data.quote.split(' ').forEach((word, index) => {
            const span = document.createElement('span');
            span.innerText = word;
            span.className = 'word';
            quoteEl.appendChild(span);
            setTimeout(() => span.classList.add('visible'), 30 * index);
        });
    }

    function nextTestimonial() { stopLegacyAutoplay(); legacyIdx = (legacyIdx + 1) % testimonials.length; updateLegacyUI(); }
    function prevTestimonial() { stopLegacyAutoplay(); legacyIdx = (legacyIdx - 1 + testimonials.length) % testimonials.length; updateLegacyUI(); }

    function startLegacyAutoplay() {
        legacyPlaying = true;
        document.getElementById('pause-icon').classList.remove('hidden');
        document.getElementById('play-icon').classList.add('hidden');
        legacyInterval = setInterval(() => {
            legacyIdx = (legacyIdx + 1) % testimonials.length;
            updateLegacyUI();
        }, 5500);
    }

    function stopLegacyAutoplay() {
        legacyPlaying = false;
        document.getElementById('pause-icon').classList.add('hidden');
        document.getElementById('play-icon').classList.remove('hidden');
        clearInterval(legacyInterval);
    }

    function toggleAutoplay() { if (legacyPlaying) stopLegacyAutoplay(); else startLegacyAutoplay(); }

    // Inicialización de Legacy al cargar
    document.addEventListener('DOMContentLoaded', () => {
        if(document.getElementById('legacy')) {
            updateLegacyUI();
            startLegacyAutoplay();
        }
    });
