// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. ORIGINAL HANDLERS & CARD INTERACTION
       ========================================================================== */
    
    // Resume download handler
    window.downloadResume = function() {
        alert('Resume download action triggered.');
    };

    // Contact form submit handler
    const contactForm = document.querySelector('#contact form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Message sent successfully!');
            contactForm.reset();
        });
    }

    // Interactive card subtle mouse move tilt/glow effect
    const cards = document.querySelectorAll('.interactive-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    /* ==========================================================================
       2. MAGNETIC TRAILING CURSOR
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
            cursorDot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
        }
    });

    function animateCursor() {
        ringX += (mouseX - ringX) * 0.15;
        ringY += (mouseY - ringY) * 0.15;

        if (cursorRing) {
            cursorRing.style.transform = `translate3d(${ringX - 18}px, ${ringY - 18}px, 0)`;
        }
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    const hoverables = document.querySelectorAll('a, button, input, textarea, .interactive-card');
    hoverables.forEach(el => {
        el.addEventListener('mouseenter', () => {
            if (cursorRing) {
                cursorRing.style.width = '50px';
                cursorRing.style.height = '50px';
                cursorRing.style.borderColor = '#E5A93C';
                cursorRing.style.backgroundColor = 'rgba(229, 169, 60, 0.1)';
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
       3. THREE.JS REALISTIC 3D MOON & WINGED STAG ENGINE
       ========================================================================== */
    const canvas = document.getElementById('webgl-canvas');
    if (!canvas || typeof THREE === 'undefined') return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0b0d0e, 0.015);

    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 14);

    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance'
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    // FIX 1: REALISTIC PROCEDURAL LUNAR TEXTURE (NO CARTOON RINGS)
    function createRealisticMoonTexture() {
        const texCanvas = document.createElement('canvas');
        texCanvas.width = 1024;
        texCanvas.height = 512;
        const ctx = texCanvas.getContext('2d');

        // Base lunar surface color
        ctx.fillStyle = '#9e9e9e';
        ctx.fillRect(0, 0, 1024, 512);

        // Soft Maria Basins (Dark lunar seas)
        for (let i = 0; i < 80; i++) {
            const x = Math.random() * 1024;
            const y = Math.random() * 512;
            const radius = Math.random() * 120 + 30;

            const grad = ctx.createRadialGradient(x, y, 0, x, y, radius);
            grad.addColorStop(0, 'rgba(40, 42, 45, 0.45)');
            grad.addColorStop(0.5, 'rgba(60, 62, 65, 0.25)');
            grad.addColorStop(1, 'rgba(158, 158, 158, 0)');

            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.fill();
        }

        // Soft realistic micro-noise craters
        for (let i = 0; i < 1500; i++) {
            const x = Math.random() * 1024;
            const y = Math.random() * 512;
            const radius = Math.random() * 6 + 1;

            const grad = ctx.createRadialGradient(x - radius * 0.3, y - radius * 0.3, 0, x, y, radius);
            grad.addColorStop(0, 'rgba(255, 255, 255, 0.4)');
            grad.addColorStop(0.6, 'rgba(80, 80, 80, 0.3)');
            grad.addColorStop(1, 'rgba(158, 158, 158, 0)');

            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.fill();
        }

        return new THREE.CanvasTexture(texCanvas);
    }

    const moonTexture = createRealisticMoonTexture();

    // 3D Moon Mesh
    const moonGeo = new THREE.SphereGeometry(3.5, 64, 64);
    const moonMat = new THREE.MeshStandardMaterial({
        map: moonTexture,
        roughness: 0.9,
        metalness: 0.05,
        color: new THREE.Color(0xdce5ed)
    });
    const moonMesh = new THREE.Mesh(moonGeo, moonMat);
    scene.add(moonMesh);

    // Atmospheric Glow Rim Shader
    const atmosphereGeo = new THREE.SphereGeometry(3.62, 64, 64);
    const atmosphereMat = new THREE.ShaderMaterial({
        vertexShader: `
            varying vec3 vNormal;
            void main() {
                vNormal = normalize(normalMatrix * normal);
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `,
        fragmentShader: `
            varying vec3 vNormal;
            void main() {
                float intensity = pow(0.55 - dot(vNormal, vec3(0, 0, 1.0)), 2.5);
                gl_FragColor = vec4(0.9, 0.66, 0.24, 1.0) * intensity;
            }
        `,
        blending: THREE.AdditiveBlending,
        side: THREE.BackSide,
        transparent: true
    });
    const atmosphereMesh = new THREE.Mesh(atmosphereGeo, atmosphereMat);
    scene.add(atmosphereMesh);

    // FIX 2: PREVENT 3D EMBLEM CLIPPING (POSITIONED CLEARLY IN FRONT OF THE MOON)
    const stagGroup = new THREE.Group();

    const goldEmissiveMat = new THREE.MeshStandardMaterial({
        color: 0xe5a93c,
        emissive: 0x996110,
        metalness: 0.85,
        roughness: 0.25,
        depthTest: true
    });

    // Body Core
    const bodyGeo = new THREE.ConeGeometry(0.4, 1.5, 16);
    const bodyMesh = new THREE.Mesh(bodyGeo, goldEmissiveMat);
    bodyMesh.rotation.x = Math.PI;
    stagGroup.add(bodyMesh);

    // Head
    const headGeo = new THREE.SphereGeometry(0.3, 16, 16);
    const headMesh = new THREE.Mesh(headGeo, goldEmissiveMat);
    headMesh.position.set(0, 0.9, 0);
    stagGroup.add(headMesh);

    // Wings
    const wingShape = new THREE.Shape();
    wingShape.moveTo(0, 0);
    wingShape.quadraticCurveTo(1.0, 1.5, 2.2, 1.0);
    wingShape.quadraticCurveTo(1.5, 0.1, 0, -0.6);

    const extrudeSettings = { depth: 0.04, bevelEnabled: true, bevelSegments: 2, steps: 1, bevelSize: 0.01, bevelThickness: 0.01 };
    const wingGeo = new THREE.ExtrudeGeometry(wingShape, extrudeSettings);

    const leftWing = new THREE.Mesh(wingGeo, goldEmissiveMat);
    leftWing.position.set(-0.15, 0.3, 0);
    leftWing.scale.set(-1, 1, 1);

    const rightWing = new THREE.Mesh(wingGeo, goldEmissiveMat);
    rightWing.position.set(0.15, 0.3, 0);

    stagGroup.add(leftWing);
    stagGroup.add(rightWing);

    // Move stag mesh well in front of the moon (z = 4.8 vs moon z = 0) to avoid intersection
    stagGroup.position.set(0, -0.2, 4.8);
    stagGroup.scale.set(0.6, 0.6, 0.6);
    stagGroup.renderOrder = 10;
    scene.add(stagGroup);

    // Ambient Space Stars
    const starsGeo = new THREE.BufferGeometry();
    const starCount = 600;
    const starPositions = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount * 3; i += 3) {
        starPositions[i] = (Math.random() - 0.5) * 80;
        starPositions[i + 1] = (Math.random() - 0.5) * 80;
        starPositions[i + 2] = (Math.random() - 0.5) * 80;
    }
    starsGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const starsMat = new THREE.PointsMaterial({ color: 0xe5a93c, size: 0.1, transparent: true, opacity: 0.5 });
    const starField = new THREE.Points(starsGeo, starsMat);
    scene.add(starField);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x1a202c, 1.2);
    scene.add(ambientLight);

    const mainSun = new THREE.DirectionalLight(0xfff5ea, 2.8);
    mainSun.position.set(8, 6, 10);
    scene.add(mainSun);

    const goldFill = new THREE.PointLight(0xe5a93c, 2.5, 20);
    goldFill.position.set(-5, -2, 5);
    scene.add(goldFill);

    /* ==========================================================================
       4. GSAP SCROLLTRIGGER TIMELINE (Cleaned Positions)
       ========================================================================== */
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // Section 1 -> Section 2 Transition (Projects)
        gsap.timeline({
            scrollTrigger: {
                trigger: '#projects',
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1.2
            }
        })
        .to(moonMesh.position, { x: 3.2, y: 0.5, z: -1.0 }, 0)
        .to(atmosphereMesh.position, { x: 3.2, y: 0.5, z: -1.0 }, 0)
        .to(moonMesh.rotation, { y: Math.PI * 0.8 }, 0)
        .to(stagGroup.position, { x: 2.8, y: -0.2, z: 3.8 }, 0);

        // Section 2 -> Section 3 Transition (Hackathons)
        gsap.timeline({
            scrollTrigger: {
                trigger: '#hackathons',
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1.2
            }
        })
        .to(moonMesh.position, { x: -3.5, y: -0.8, z: 0 }, 0)
        .to(atmosphereMesh.position, { x: -3.5, y: -0.8, z: 0 }, 0)
        .to(moonMesh.rotation, { y: Math.PI * 1.6 }, 0)
        .to(stagGroup.position, { x: -2.8, y: -0.6, z: 3.8 }, 0);

        // Section 3 -> Section 4 Transition (About / Roadmap)
        gsap.timeline({
            scrollTrigger: {
                trigger: '#about',
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1.2
            }
        })
        .to(moonMesh.position, { x: 0, y: 1.2, z: -4 }, 0)
        .to(atmosphereMesh.position, { x: 0, y: 1.2, z: -4 }, 0)
        .to(stagGroup.position, { x: 0, y: 0.8, z: 2.5 }, 0);
    }

    /* ==========================================================================
       5. RENDER LOOP & PARALLAX
       ========================================================================== */
    let mouseXParallax = 0;
    let mouseYParallax = 0;

    window.addEventListener('mousemove', (e) => {
        mouseXParallax = (e.clientX / window.innerWidth - 0.5) * 2;
        mouseYParallax = (e.clientY / window.innerHeight - 0.5) * 2;
    });

    const clock = new THREE.Clock();

    function renderFrame() {
        const elapsedTime = clock.getElapsedTime();

        // Idle Moon & Stag motion
        moonMesh.rotation.y += 0.0015;
        atmosphereMesh.rotation.y += 0.0015;

        stagGroup.position.y += Math.sin(elapsedTime * 2) * 0.002;
        leftWing.rotation.z = Math.sin(elapsedTime * 3) * 0.12;
        rightWing.rotation.z = -Math.sin(elapsedTime * 3) * 0.12;

        // Subtle Mouse Parallax
        scene.rotation.y += (mouseXParallax * 0.08 - scene.rotation.y) * 0.05;
        scene.rotation.x += (-mouseYParallax * 0.08 - scene.rotation.x) * 0.05;

        renderer.render(scene, camera);
        requestAnimationFrame(renderFrame);
    }
    renderFrame();

    // Window Resize Handler
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    /* ==========================================================================
       6. FLOATING LIVE BADGES TOGGLE
       ========================================================================== */
    window.dismissBadge = function(button) {
        const badge = button.closest('.floating-badge');
        if (badge) {
            badge.style.opacity = '0';
            badge.style.transform = 'translateY(15px) scale(0.95)';
            setTimeout(() => badge.remove(), 300);
        }
    };
});