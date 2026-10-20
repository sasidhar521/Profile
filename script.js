/**
 * ============================================================
 * NELLURU SASIDHAR — DEVFOLIO 3D SCRIPT (ENGINEERING MATRIX SUITE)
 * 
 * 1. 3D Engineering Geodesic Quantum Core (CAD wireframe lattice)
 * 2. Dual Concentric Engineering Caliper / Gimbal Rings
 * 3. 3D Neural Network / Circuit Lattice with dynamic node drift
 * 4. 3D Engineering Waveform Oscilloscope Ground Grid
 * 5. Magnetic Trailing Cursor & Physics 3D Tilt
 * 6. GSAP ScrollTrigger section timeline
 * ============================================================
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       📌 CHANGE 1: RESUME & CONTACT HANDLERS
       ========================================================================== */
    window.downloadResume = function() {
        alert('Resume download triggered! Place your PDF in assets/ folder and link it here.');
    };

    const contactForm = document.querySelector('#contact form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you! Your message has been sent to Sasidhar.');
            contactForm.reset();
        });
    }

    // Mobile Navigation Drawer Toggle
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileBtn && mobileMenu) {
        mobileBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }

    /* ==========================================================================
       📌 CHANGE 2: 3D CARD TILT EFFECT (Physics-based hover depth)
       ========================================================================== */
    const tiltCards = document.querySelectorAll('.tilt-card, .interactive-card');
    tiltCards.forEach((card) => {
        card.addEventListener('pointermove', (event) => {
            const rect = card.getBoundingClientRect();
            const x = (event.clientX - rect.left) / rect.width;
            const y = (event.clientY - rect.top) / rect.height;
            const rotateY = (x - 0.5) * 14;
            const rotateX = (0.5 - y) * 14;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
            card.style.boxShadow = `0 18px 30px -12px rgba(229, 169, 60, 0.22), ${rotateY * -1.5}px ${rotateX * 1.5}px 25px rgba(0,0,0,0.35)`;
        });

        card.addEventListener('pointerleave', () => {
            card.style.transform = '';
            card.style.boxShadow = '';
        });
    });

    /* ==========================================================================
       📌 CHANGE 3: MAGNETIC TRAILING CURSOR
       ========================================================================== */
    const cursorDot = document.getElementById('cursor-dot');
    const cursorRing = document.getElementById('cursor-ring');

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        if (cursorDot) {
            cursorDot.style.left = mouseX + 'px';
            cursorDot.style.top = mouseY + 'px';
        }
    });

    function animateCursor() {
        ringX += (mouseX - ringX) * 0.16;
        ringY += (mouseY - ringY) * 0.16;

        if (cursorRing) {
            cursorRing.style.left = ringX + 'px';
            cursorRing.style.top = ringY + 'px';
        }
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    const hoverables = document.querySelectorAll('a, button, input, textarea, .interactive-card');
    hoverables.forEach(el => {
        el.addEventListener('mouseenter', () => {
            if (cursorRing) {
                cursorRing.style.width = '52px';
                cursorRing.style.height = '52px';
                cursorRing.style.borderColor = '#E5A93C';
                cursorRing.style.backgroundColor = 'rgba(229, 169, 60, 0.15)';
            }
        });
        el.addEventListener('mouseleave', () => {
            if (cursorRing) {
                cursorRing.style.width = '36px';
                cursorRing.style.height = '36px';
                cursorRing.style.borderColor = 'rgba(225, 225, 225, 0.4)';
                cursorRing.style.backgroundColor = 'transparent';
            }
        });
    });

    /* ==========================================================================
       📌 CHANGE 4: THREE.JS 3D ENGINEERING & COMPUTING MATRIX
       ========================================================================== */
    const canvas = document.getElementById('webgl-canvas');
    if (!canvas || typeof THREE === 'undefined') return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0b0d0e, 0.012);

    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 1, 18);

    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance'
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Master 3D Group for Engineering Core Assemblage
    const engineeringCore = new THREE.Group();
    scene.add(engineeringCore);

    // ==========================================================================
    // A. CENTRAL 3D ENGINEERING GEODESIC ICOSAHEDRON (CAD Wireframe Lattice)
    // ==========================================================================
    const icoGeo = new THREE.IcosahedronGeometry(3.6, 2);
    
    // Wireframe structure
    const icoWireMat = new THREE.MeshBasicMaterial({
        color: 0xE5A93C,
        wireframe: true,
        transparent: true,
        opacity: 0.45
    });
    const icoMesh = new THREE.Mesh(icoGeo, icoWireMat);
    engineeringCore.add(icoMesh);

    // Inner Solid Dark Quantum Core with Gold Specular
    const innerCoreGeo = new THREE.IcosahedronGeometry(2.4, 1);
    const innerCoreMat = new THREE.MeshStandardMaterial({
        color: 0x121518,
        emissive: 0x3d2707,
        metalness: 0.9,
        roughness: 0.2,
        wireframe: false
    });
    const innerCoreMesh = new THREE.Mesh(innerCoreGeo, innerCoreMat);
    engineeringCore.add(innerCoreMesh);

    // Glowing Geometric Vertices
    const vertexPointsGeo = new THREE.IcosahedronGeometry(3.6, 2);
    const vertexPointsMat = new THREE.PointsMaterial({
        color: 0xFFF0D4,
        size: 0.22,
        transparent: true,
        opacity: 0.9
    });
    const vertexPoints = new THREE.Points(vertexPointsGeo, vertexPointsMat);
    engineeringCore.add(vertexPoints);

    // ==========================================================================
    // B. DUAL CONCENTRIC ENGINEERING CALIPER / GIMBAL RINGS
    // ==========================================================================
    const ringMat1 = new THREE.MeshBasicMaterial({
        color: 0x38BDF8, // Cyan engineering caliper
        wireframe: true,
        transparent: true,
        opacity: 0.35
    });
    const ringGeo1 = new THREE.TorusGeometry(5.2, 0.04, 8, 80);
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 3;
    engineeringCore.add(ring1);

    const ringMat2 = new THREE.MeshBasicMaterial({
        color: 0xE5A93C, // Gold coordinate axis
        wireframe: true,
        transparent: true,
        opacity: 0.35
    });
    const ringGeo2 = new THREE.TorusGeometry(6.4, 0.04, 8, 90);
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.y = Math.PI / 4;
    engineeringCore.add(ring2);

    // ==========================================================================
    // C. 3D ENGINEERING GROUND WAVEFORM / CIRCUIT GRID
    // ==========================================================================
    const gridRows = 35;
    const gridCols = 35;
    const gridGeometry = new THREE.PlaneGeometry(60, 60, gridRows - 1, gridCols - 1);
    gridGeometry.rotateX(-Math.PI / 2.2);

    const gridMaterial = new THREE.MeshBasicMaterial({
        color: 0x1E2328,
        wireframe: true,
        transparent: true,
        opacity: 0.4
    });
    const terrainGrid = new THREE.Mesh(gridGeometry, gridMaterial);
    terrainGrid.position.y = -6.5;
    scene.add(terrainGrid);

    // Store original Z positions for wave physics
    const originalPositions = gridGeometry.attributes.position.array.slice();

    // ==========================================================================
    // D. 3D NEURAL DATA NODES (AI, Machine Learning & Computing)
    // ==========================================================================
    const nodeCount = 120;
    const nodeGeo = new THREE.BufferGeometry();
    const nodePositions = new Float32Array(nodeCount * 3);
    const nodeVelocities = [];

    for (let i = 0; i < nodeCount; i++) {
        nodePositions[i * 3] = (Math.random() - 0.5) * 50;
        nodePositions[i * 3 + 1] = (Math.random() - 0.5) * 35;
        nodePositions[i * 3 + 2] = (Math.random() - 0.5) * 30;

        nodeVelocities.push({
            x: (Math.random() - 0.5) * 0.04,
            y: (Math.random() - 0.5) * 0.04,
            z: (Math.random() - 0.5) * 0.03
        });
    }

    nodeGeo.setAttribute('position', new THREE.BufferAttribute(nodePositions, 3));
    const nodeMat = new THREE.PointsMaterial({
        color: 0xE5A93C,
        size: 0.28,
        transparent: true,
        opacity: 0.75,
        blending: THREE.AdditiveBlending
    });
    const neuralNodes = new THREE.Points(nodeGeo, nodeMat);
    scene.add(neuralNodes);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x0f172a, 1.8);
    scene.add(ambientLight);

    const goldPoint = new THREE.PointLight(0xE5A93C, 3.5, 30);
    goldPoint.position.set(5, 5, 8);
    scene.add(goldPoint);

    const cyanPoint = new THREE.PointLight(0x38BDF8, 2.5, 25);
    cyanPoint.position.set(-6, -4, 6);
    scene.add(cyanPoint);

    // ==========================================================================
    // 5. GSAP SCROLLTRIGGER ENGINE POSITIONING
    // Translates & rotates the engineering core as you scroll sections
    // ==========================================================================
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // Projects section: Shift core right
        gsap.timeline({
            scrollTrigger: {
                trigger: '#projects',
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1.2
            }
        })
        .to(engineeringCore.position, { x: 4.2, y: -0.5, z: -2.5 }, 0)
        .to(engineeringCore.rotation, { y: Math.PI * 0.9, x: 0.4 }, 0);

        // Hackathons section: Shift core left
        gsap.timeline({
            scrollTrigger: {
                trigger: '#hackathons',
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1.2
            }
        })
        .to(engineeringCore.position, { x: -4.5, y: -0.8, z: -1.5 }, 0)
        .to(engineeringCore.rotation, { y: Math.PI * 1.8, z: 0.6 }, 0);

        // About section: Center and zoom for inspection
        gsap.timeline({
            scrollTrigger: {
                trigger: '#about',
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1.2
            }
        })
        .to(engineeringCore.position, { x: 0, y: 1.0, z: -4 }, 0)
        .to(engineeringCore.rotation, { x: Math.PI * 0.5, y: Math.PI * 2.2 }, 0);
    }

    // ==========================================================================
    // 6. ANIMATION LOOP WITH OSCILLOSCOPE WAVE & PARALLAX
    // ==========================================================================
    let mouseXParallax = 0;
    let mouseYParallax = 0;

    window.addEventListener('mousemove', (e) => {
        mouseXParallax = (e.clientX / window.innerWidth - 0.5) * 2;
        mouseYParallax = (e.clientY / window.innerHeight - 0.5) * 2;
    });

    const clock = new THREE.Clock();

    function renderLoop() {
        requestAnimationFrame(renderLoop);
        const elapsed = clock.getElapsedTime();

        // 1. Engineering Core Multi-Axis Rotation
        icoMesh.rotation.y = elapsed * 0.25;
        icoMesh.rotation.x = elapsed * 0.15;
        vertexPoints.rotation.y = elapsed * 0.25;
        vertexPoints.rotation.x = elapsed * 0.15;
        innerCoreMesh.rotation.y = -elapsed * 0.35;

        ring1.rotation.z = elapsed * 0.3;
        ring1.rotation.x = elapsed * 0.15;
        ring2.rotation.y = -elapsed * 0.25;
        ring2.rotation.z = -elapsed * 0.2;

        // 2. Oscilloscope Grid Waves
        const posArray = terrainGrid.geometry.attributes.position.array;
        for (let i = 0; i < posArray.length; i += 3) {
            const u = posArray[i];
            const v = posArray[i + 1];
            posArray[i + 2] = originalPositions[i + 2] + Math.sin(u * 0.2 + elapsed * 1.5) * 0.6 + Math.cos(v * 0.2 + elapsed * 1.2) * 0.6;
        }
        terrainGrid.geometry.attributes.position.needsUpdate = true;

        // 3. Neural Data Node Drift
        const nodeArr = neuralNodes.geometry.attributes.position.array;
        for (let i = 0; i < nodeCount; i++) {
            nodeArr[i * 3] += nodeVelocities[i].x;
            nodeArr[i * 3 + 1] += nodeVelocities[i].y;
            nodeArr[i * 3 + 2] += nodeVelocities[i].z;

            // Bounce within bounding area
            if (Math.abs(nodeArr[i * 3]) > 25) nodeVelocities[i].x *= -1;
            if (Math.abs(nodeArr[i * 3 + 1]) > 18) nodeVelocities[i].y *= -1;
            if (Math.abs(nodeArr[i * 3 + 2]) > 15) nodeVelocities[i].z *= -1;
        }
        neuralNodes.geometry.attributes.position.needsUpdate = true;

        // 4. Smooth Mouse Parallax
        scene.rotation.y += (mouseXParallax * 0.08 - scene.rotation.y) * 0.05;
        scene.rotation.x += (-mouseYParallax * 0.08 - scene.rotation.x) * 0.05;

        renderer.render(scene, camera);
    }
    renderLoop();

    // Window Resize Handler
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    /* ==========================================================================
       7. FLOATING LIVE BADGE DISMISS
       ========================================================================== */
    window.dismissBadge = function(button) {
        const badge = button.closest('.floating-badge');
        if (badge) {
            badge.style.opacity = '0';
            badge.style.transform = 'translateY(15px) scale(0.95)';
            setTimeout(() => badge.remove(), 300);
        }
    };

    /* ==========================================================================
       8. COMPACT DIRECTORY FILTERING (Projects vs Hackathons)
       ========================================================================== */
    window.filterDirectory = function(category) {
        const items = document.querySelectorAll('.directory-item');
        const btnAll = document.getElementById('filter-all');
        const btnProject = document.getElementById('filter-project');
        const btnHackathon = document.getElementById('filter-hackathon');

        [btnAll, btnProject, btnHackathon].forEach(btn => {
            if (btn) {
                btn.className = 'px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium text-slate-400 hover:text-white transition-all';
            }
        });

        const activeBtn = document.getElementById('filter-' + category);
        if (activeBtn) {
            activeBtn.className = 'px-3.5 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all bg-[#E5A93C] text-black shadow-md';
        }

        items.forEach(item => {
            if (category === 'all' || item.classList.contains(category)) {
                item.style.display = 'flex';
                item.style.opacity = '1';
                item.style.transform = 'scale(1)';
            } else {
                item.style.display = 'none';
                item.style.opacity = '0';
                item.style.transform = 'scale(0.96)';
            }
        });
    };

    // Auto-filter if URL hash is #hackathons
    if (window.location.hash === '#hackathons') {
        window.filterDirectory('hackathon');
    }

    /* ==========================================================================
       9. DEEP DIVE DETAIL MODAL ENGINE & INTERACTIVE PHOTO GALLERY
       ========================================================================== */
    const itemDetailsDatabase = {
        'sensors': {
            badge: 'PROJECT 01 · EMBEDDED SYSTEMS & HARDWARE',
            institution: 'Alliance University · Batch 2030',
            title: 'Sensors: Ultrasonic, Infrared, Touch Sensor',
            tagline: 'Hands-on hardware study: understanding physical transducer working procedures, pinouts, and signal response.',
            status: 'Calibrated & Benchmarked',
            images: [
                {
                    url: '/assets/aistudio/UTIA_1_6d6f5093.jpeg',
                    fallback: 'public/assets/aistudio/UTIA_1_6d6f5093.jpeg',
                    title: 'Multi-Sensor Testbed & Breadboard Wiring Rig',
                    caption: 'Overview of the prototype circuit featuring the HC-SR04 ultrasonic transducer, infrared reflectance obstacle module, and capacitive touch sensor.'
                },
                {
                    url: '/assets/aistudio/UTIA_2_906d1381.jpeg',
                    fallback: 'public/assets/aistudio/UTIA_2_906d1381.jpeg',
                    title: 'Pinout Interfacing, Power Distribution & Pull-Up Configuration',
                    caption: 'Detailed jumper routing connecting VCC, GND, Echo/Trig, and output state pins to microcontroller signal buses.'
                },
                {
                    url: '/assets/aistudio/UTIA_3_4384cb6d.jpeg',
                    fallback: 'public/assets/aistudio/UTIA_3_4384cb6d.jpeg',
                    title: 'Live Signal Verification & Active Proximity Testing',
                    caption: 'Benchmarking acoustic pulse delays and digital switching thresholds in real-time under laboratory conditions.'
                }
            ],
            objective: 'There was no pre-existing problem statement or artificial challenge for this project. Our primary objective was hands-on discovery: we wanted to know exactly how real sensors work, observe physical phenomena conversion into electrical signals, and master the complete operating procedure through direct breadboard prototyping.',
            sensorsExplained: [
                {
                    name: 'Ultrasonic Sensor (HC-SR04)',
                    badge: 'Acoustic Time-of-Flight',
                    color: '#E5A93C',
                    explanation: 'Emits a 40 kHz high-frequency ultrasonic sound burst via a piezoelectric transmitter transducer and clocks the exact round-trip duration until the echo bounces off an obstacle and hits the receiver. The microcontroller computes distance using the formula: Distance = (Time × Speed of Sound in Air) / 2.'
                },
                {
                    name: 'Infrared (IR) Sensor',
                    badge: 'Optical Reflection & Photodetection',
                    color: '#38BDF8',
                    explanation: 'Constantly beams focused infrared light from an IR emitter LED. When an obstacle reflects this invisible light back into the onboard photodiode detector, the voltage drop across the comparator triggers an instantaneous digital logic shift (HIGH to LOW) to indicate proximity.'
                },
                {
                    name: 'Touch Sensor (Capacitive TTP223)',
                    badge: 'Electrostatic Capacitance Coupling',
                    color: '#34D399',
                    explanation: 'Continuously monitors dielectric capacitance on a conductive copper electrode pad. When a human finger touches or enters the near field, the body natural capacitance alters the charge level, triggering an onboard IC to output a stable, clean, debounced digital pulse.'
                }
            ],
            outcomes: [
                'Attained comprehensive mastery over the operating procedures, trigger signals, and return pulses of ultrasonic, optical, and capacitive transducers.',
                'Learned how to solve real hardware edge cases: false reflections, acoustic dead zones (<2cm), ambient IR interference, and mechanical switch bounce.',
                'Gained practical breadboard wiring, multimeter probing, and oscilloscope/logic analyzer signal verification skills.',
                'Established the critical hardware foundation needed for autonomous mobile robots, obstacle avoidance algorithms, and embedded AI telemetry.'
            ],
            specifications: [
                { label: 'Operating Voltage', value: '3.3V – 5.0V DC (Breadboard Bus)' },
                { label: 'Ultrasonic Range', value: '2 cm to 400 cm (±3mm precision)' },
                { label: 'IR Proximity Range', value: '2 cm to 30 cm (potentiometer adjustable)' },
                { label: 'Touch Response Time', value: '< 60ms fast mode, low-power standby' },
                { label: 'MCU Compatibility', value: 'Arduino Uno / ESP32 / Raspberry Pi Pico' }
            ]
        },
        'aster': {
            badge: 'PROJECT 02 · ENTERPRISE ANALYTICS',
            institution: 'Alliance University',
            title: 'Aster Labs Analytics Platform',
            tagline: 'High-density operational telemetry dashboard engineered for real-time metric visualization and swift user onboarding.',
            status: 'Design Prototype',
            images: [],
            objective: 'Developing an intuitive operational control center for telemetry pipelines, reducing cognitive load for engineers monitoring distributed services.',
            overview: 'Aster Labs Analytics delivers rapid data comprehension through visual metric hierarchy, custom charting widgets, and low-latency state synchronizations.',
            outcomes: [
                'Designed responsive data visualizations with sub-100ms render speeds for large dataset streaming.',
                'Created modular UI component systems with high keyboard accessibility and theme flexibility.'
            ],
            specifications: [
                { label: 'Tech Stack', value: 'React, TypeScript, Tailwind CSS, Chart.js' },
                { label: 'Target Users', value: 'Data Analysts, DevOps, System Administrators' }
            ]
        },
        'crest': {
            badge: 'PROJECT 03 · HEALTHTECH ACCESSIBILITY',
            institution: 'Alliance University',
            title: 'Crest Health Patient Portal',
            tagline: 'Human-centered patient engagement platform prioritizing appointment clarity, medical record privacy, and WCAG AAA compliance.',
            status: 'Accessible Architecture',
            images: [],
            objective: 'Eliminating healthcare communication friction by delivering a patient portal accessible to individuals with varying visual and physical abilities.',
            overview: 'Crest Health combines high-contrast color palettes, screen reader optimizations, and simplified appointment workflows.',
            outcomes: [
                'Achieved 100% automated accessibility audit scoring against WCAG AAA contrast and focus indicators.',
                'Reduced appointment booking time to under 3 clicks for senior users.'
            ],
            specifications: [
                { label: 'Tech Stack', value: 'HTML5 Semantic, ARIA Roles, Modern CSS Grid' },
                { label: 'Compliance', value: 'WCAG 2.1 AAA Accessibility Standards' }
            ]
        },
        'harbor': {
            badge: 'PROJECT 04 · E-COMMERCE CONVERSION',
            institution: 'Alliance University',
            title: 'Harbor Retail Storefront',
            tagline: 'Mobile-first retail catalog with optimized checkout pathways and progressive image hydration.',
            status: 'Full Prototype',
            images: [],
            objective: 'Architecting a storefront experience that loads under 1 second on cellular networks while maintaining rich visual storytelling.',
            overview: 'Harbor Retail balances brand aesthetics with frictionless add-to-cart dynamics, responsive media queries, and micro-interactions.',
            outcomes: [
                'Optimized mobile navigation drawer and one-thumb product card ergonomics.',
                'Built instant filter and category search without layout shift.'
            ],
            specifications: [
                { label: 'Tech Stack', value: 'JavaScript ES6+, Modern Flexbox/Grid, Web Animations API' },
                { label: 'Performance', value: '98+ Google Lighthouse Performance Score' }
            ]
        },
        'hackathon-1': {
            badge: 'HACKATHON SPRINT 01 · 24-HOUR RAPID MVP',
            institution: 'Alliance University Hackathon 2026',
            title: 'Alliance 24h Rapid Sprint Prototype',
            tagline: 'Conceiving, designing, and coding a functional MVP from scratch under high-intensity 24-hour hackathon constraints.',
            status: 'Finalist Demo',
            images: [],
            objective: 'Tackling rapid ideation, architectural decision-making, and live prototype demonstration within a single sleepless 24-hour sprint.',
            overview: 'Collaborated with team members to prioritize essential features, build functional proof-of-concept logic, and deliver a convincing stage presentation to industry judges.',
            outcomes: [
                'Delivered a fully working demo under extreme time constraints with zero critical bugs during the live pitch.',
                'Mastered rapid team Git workflows, branch merging, and emergency triage.'
            ],
            specifications: [
                { label: 'Event', value: 'Alliance University Annual Tech Hackathon' },
                { label: 'Duration', value: '24 Hours Continuous Coding' }
            ]
        },
        'hackathon-2': {
            badge: 'HACKATHON SPRINT 02 · AI INNOVATION',
            institution: 'Alliance University · AI & ML Society',
            title: 'AI Innovation Challenge Sprint',
            tagline: 'Developing an applied machine learning pipeline and inference interface for smart campus problem statements.',
            status: 'Completed Prototype',
            images: [],
            objective: 'Applying foundational machine learning models to solve automated pattern detection and smart resource allocation challenges on campus.',
            overview: 'Integrated Python machine learning preprocessing with an interactive browser dashboard to visualize prediction probabilities and anomaly detections.',
            outcomes: [
                'Gained practical experience implementing inference endpoints and translating AI model outputs into intuitive UI elements.',
                'Received special recognition for clean technical documentation and presentation.'
            ],
            specifications: [
                { label: 'Focus Area', value: 'Machine Learning, Predictive Analytics, Python' },
                { label: 'Department', value: 'AU Quasar AI & ML Division' }
            ]
        }
    };

    window.openItemDetail = function(id) {
        const item = itemDetailsDatabase[id];
        if (!item) return;

        const modal = document.getElementById('detail-modal');
        const headerMeta = document.getElementById('modal-header-meta');
        const bodyContent = document.getElementById('modal-body-content');

        if (!modal || !headerMeta || !bodyContent) return;

        // Populate Header Meta
        headerMeta.innerHTML = `
            <div class="flex items-center gap-2 mb-1">
                <span class="text-[11px] font-mono px-2 py-0.5 rounded bg-[#E5A93C]/10 text-[#E5A93C] border border-[#E5A93C]/20 font-bold uppercase tracking-wider">
                    ${item.badge}
                </span>
                <span class="text-xs font-mono text-slate-400 hidden sm:inline">
                    · ${item.institution}
                </span>
            </div>
            <h2 class="text-xl sm:text-2xl font-black text-white leading-tight">
                ${item.title}
            </h2>
        `;

        // Build Body Content
        let galleryHtml = '';
        if (item.images && item.images.length > 0) {
            const firstImg = item.images[0];
            galleryHtml = `
                <!-- Interactive High-Resolution Gallery -->
                <div class="space-y-4 rounded-2xl bg-[#0B0D0E]/80 border border-[#1E2328] p-4 sm:p-5">
                    <div class="flex items-center justify-between pb-3 border-b border-[#1E2328]">
                        <div class="flex items-center gap-2">
                            <span class="w-2.5 h-2.5 rounded-full bg-[#E5A93C] animate-pulse"></span>
                            <span class="text-xs font-mono uppercase tracking-wider text-slate-300 font-bold">
                                Project Hardware Gallery (${item.images.length} Photos)
                            </span>
                        </div>
                        <span class="text-[11px] font-mono text-[#E5A93C]">Click thumbnails to switch view</span>
                    </div>

                    <!-- Main Featured Image -->
                    <div class="relative rounded-xl overflow-hidden border border-[#1E2328] bg-black/60 aspect-video sm:aspect-[16/9] flex items-center justify-center">
                        <img id="gallery-main-img" 
                             src="${firstImg.url}" 
                             onerror="this.src='${firstImg.fallback}'"
                             alt="${firstImg.title}" 
                             class="w-full h-full object-contain sm:object-cover transition-all duration-300">
                        <div class="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-4 sm:p-5">
                            <h4 id="gallery-img-title" class="text-white font-bold text-sm sm:text-base">
                                ${firstImg.title}
                            </h4>
                            <p id="gallery-img-caption" class="text-xs text-slate-300 font-mono mt-1">
                                ${firstImg.caption}
                            </p>
                        </div>
                    </div>

                    <!-- Thumbnail Strip -->
                    <div class="grid grid-cols-3 gap-3 pt-1">
                        ${item.images.map((img, idx) => `
                            <button onclick="selectGalleryPhoto(${idx}, '${id}')" 
                                    id="gallery-thumb-${idx}"
                                    class="gallery-thumb rounded-lg overflow-hidden border ${idx === 0 ? 'border-[#E5A93C] ring-2 ring-[#E5A93C]/40' : 'border-[#1E2328] opacity-70 hover:opacity-100'} transition-all duration-200 aspect-video relative group bg-black">
                                <img src="${img.url}" 
                                     onerror="this.src='${img.fallback}'"
                                     alt="${img.title}" 
                                     class="w-full h-full object-cover group-hover:scale-105 transition-transform">
                                <span class="absolute bottom-1 right-1 bg-black/80 text-[10px] font-mono px-1.5 py-0.5 rounded text-white border border-white/10">
                                    Photo ${idx + 1}
                                </span>
                            </button>
                        `).join('')}
                    </div>
                </div>
            `;
        }

        // Specific Sensors Breakdown Section
        let sensorsHtml = '';
        if (item.sensorsExplained) {
            sensorsHtml = `
                <!-- Sensor Working Procedures (2-3 lines each) -->
                <div class="space-y-4">
                    <div class="flex items-center gap-2">
                        <span class="text-xs font-mono uppercase tracking-widest text-[#E5A93C]">Technical Working Procedures</span>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                        ${item.sensorsExplained.map(s => `
                            <div class="p-4 rounded-xl border border-[#1E2328] bg-[#0B0D0E]/90 space-y-2 hover:border-[#E5A93C]/40 transition">
                                <div class="flex items-center justify-between">
                                    <span class="text-[10px] font-mono px-2 py-0.5 rounded uppercase font-semibold" style="color: ${s.color}; background: ${s.color}15; border: 1px solid ${s.color}35;">
                                        ${s.badge}
                                    </span>
                                </div>
                                <h4 class="font-bold text-sm text-white">${s.name}</h4>
                                <p class="text-xs text-slate-300 leading-relaxed">
                                    ${s.explanation}
                                </p>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }

        // Objectives & Honest Engineering Focus (No Challenge)
        const objectiveHtml = item.objective ? `
            <div class="p-5 rounded-xl border border-[#1E2328] bg-[#0B0D0E]/60 space-y-2">
                <div class="flex items-center gap-2 text-xs font-mono uppercase text-[#E5A93C] font-semibold">
                    <span>💡 Project Purpose &amp; Focus</span>
                </div>
                <p class="text-sm text-slate-300 leading-relaxed">
                    ${item.objective}
                </p>
            </div>
        ` : '';

        // Outcomes
        let outcomesHtml = '';
        if (item.outcomes && item.outcomes.length > 0) {
            outcomesHtml = `
                <div class="space-y-3">
                    <div class="flex items-center gap-2 text-xs font-mono uppercase text-emerald-400 font-semibold">
                        <span>🎯 Key Outcomes &amp; Engineering Competencies Gained</span>
                    </div>
                    <ul class="space-y-2 text-xs sm:text-sm text-slate-300">
                        ${item.outcomes.map(out => `
                            <li class="flex items-start gap-2.5 p-3 rounded-lg bg-[#0B0D0E]/80 border border-[#1E2328]">
                                <span class="text-emerald-400 font-bold">✓</span>
                                <span>${out}</span>
                            </li>
                        `).join('')}
                    </ul>
                </div>
            `;
        }

        // Specifications
        let specsHtml = '';
        if (item.specifications && item.specifications.length > 0) {
            specsHtml = `
                <div class="space-y-3 pt-2">
                    <span class="text-xs font-mono uppercase text-slate-400 font-semibold">Technical Specifications &amp; Parameters</span>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                        ${item.specifications.map(spec => `
                            <div class="p-3 rounded-lg bg-[#0B0D0E]/70 border border-[#1E2328] flex justify-between items-center">
                                <span class="text-slate-400">${spec.label}:</span>
                                <span class="text-white font-bold text-right">${spec.value}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }

        // Combine into modal
        bodyContent.innerHTML = `
            <div class="space-y-6">
                <p class="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
                    ${item.tagline}
                </p>

                ${galleryHtml}
                ${objectiveHtml}
                ${sensorsHtml}
                ${outcomesHtml}
                ${specsHtml}

                <div class="pt-4 border-t border-[#1E2328] flex justify-end">
                    <button onclick="closeItemDetail()" class="px-5 py-2.5 rounded-lg bg-[#E5A93C] text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#D4982B] transition">
                        Back to Portfolio
                    </button>
                </div>
            </div>
        `;

        // Reveal modal with animation
        modal.classList.remove('opacity-0', 'pointer-events-none');
        modal.classList.add('opacity-100', 'pointer-events-auto');
        const container = document.getElementById('modal-container');
        if (container) {
            container.classList.remove('scale-95');
            container.classList.add('scale-100');
        }
        document.body.style.overflow = 'hidden';
    };

    window.closeItemDetail = function() {
        const modal = document.getElementById('detail-modal');
        const container = document.getElementById('modal-container');
        if (!modal) return;

        modal.classList.add('opacity-0', 'pointer-events-none');
        modal.classList.remove('opacity-100', 'pointer-events-auto');
        if (container) {
            container.classList.add('scale-95');
            container.classList.remove('scale-100');
        }
        document.body.style.overflow = '';
    };

    // Switch image in gallery
    window.selectGalleryPhoto = function(index, itemId) {
        const item = itemDetailsDatabase[itemId];
        if (!item || !item.images || !item.images[index]) return;

        const imgData = item.images[index];
        const mainImg = document.getElementById('gallery-main-img');
        const titleEl = document.getElementById('gallery-img-title');
        const captionEl = document.getElementById('gallery-img-caption');

        if (mainImg) {
            mainImg.style.opacity = '0.3';
            setTimeout(() => {
                mainImg.src = imgData.url;
                mainImg.onerror = () => { mainImg.src = imgData.fallback; };
                mainImg.alt = imgData.title;
                mainImg.style.opacity = '1';
            }, 150);
        }

        if (titleEl) titleEl.textContent = imgData.title;
        if (captionEl) captionEl.textContent = imgData.caption;

        // Update active thumbnail borders
        document.querySelectorAll('.gallery-thumb').forEach((thumb, idx) => {
            if (idx === index) {
                thumb.className = 'gallery-thumb rounded-lg overflow-hidden border border-[#E5A93C] ring-2 ring-[#E5A93C]/40 transition-all duration-200 aspect-video relative group bg-black opacity-100';
            } else {
                thumb.className = 'gallery-thumb rounded-lg overflow-hidden border border-[#1E2328] opacity-70 hover:opacity-100 transition-all duration-200 aspect-video relative group bg-black';
            }
        });
    };

    // Close on backdrop click or ESC key
    const detailModal = document.getElementById('detail-modal');
    if (detailModal) {
        detailModal.addEventListener('click', (e) => {
            if (e.target === detailModal) {
                window.closeItemDetail();
            }
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            window.closeItemDetail();
        }
    });

    console.log('⚡ Engineering 3D Matrix & Neural Lattice Engine Active with Dedicated Modal System.');
});
