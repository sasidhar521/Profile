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

    console.log('⚡ Engineering 3D Matrix & Neural Lattice Engine Active.');
});
