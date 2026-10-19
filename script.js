// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', () => {
    
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

});// Wait for the DOM to fully load
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
       3. THREE.JS 3D MOON & WINGED STAG ENGINE
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
    renderer.toneMappingExposure = 1.25;

    // Procedural Lunar Map Generator
    function createMoonTexture() {
        const texCanvas = document.createElement('canvas');
        texCanvas.width = 1024;
        texCanvas.height = 512;
        const ctx = texCanvas.getContext('2d');

        ctx.fillStyle = '#888888';
        ctx.fillRect(0, 0, 1024, 512);

        // Noise & Maria basins
        for (let i = 0; i < 2000; i++) {
            const x = Math.random() * 1024;
            const y = Math.random() * 512;
            const radius = Math.random() * 80 + 10;
            const shade = Math.random() * 50;

            const grad = ctx.createRadialGradient(x, y, 0, x, y, radius);
            grad.addColorStop(0, `rgba(${shade}, ${shade}, ${shade}, 0.6)`);
            grad.addColorStop(1, 'rgba(136, 136, 136, 0)');

            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.fill();
        }

        // Craters
        for (let i = 0; i < 400; i++) {
            const x = Math.random() * 1024;
            const y = Math.random() * 512;
            const r = Math.random() * 12 + 2;

            ctx.lineWidth = 2;
            ctx.strokeStyle = '#ffffff';
            ctx.beginPath();
            ctx.arc(x, y, r, 0, Math.PI * 2);
            ctx.stroke();

            ctx.fillStyle = '#222222';
            ctx.beginPath();
            ctx.arc(x + r * 0.2, y + r * 0.2, r * 0.8, 0, Math.PI * 2);
            ctx.fill();
        }

        return new THREE.CanvasTexture(texCanvas);
    }

    const moonTexture = createMoonTexture();

    // 3D Moon Mesh
    const moonGeo = new THREE.SphereGeometry(3.5, 64, 64);
    const moonMat = new THREE.MeshStandardMaterial({
        map: moonTexture,
        roughness: 0.85,
        metalness: 0.1,
        color: new THREE.Color(0xdce5ed)
    });
    const moonMesh = new THREE.Mesh(moonGeo, moonMat);
    scene.add(moonMesh);

    // Atmospheric Glow Rim Shader
    const atmosphereGeo = new THREE.SphereGeometry(3.68, 64, 64);
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
                float intensity = pow(0.6 - dot(vNormal, vec3(0, 0, 1.0)), 2.2);
                gl_FragColor = vec4(0.9, 0.66, 0.24, 1.0) * intensity;
            }
        `,
        blending: THREE.AdditiveBlending,
        side: THREE.BackSide,
        transparent: true
    });
    const atmosphereMesh = new THREE.Mesh(atmosphereGeo, atmosphereMat);
    scene.add(atmosphereMesh);

    // 3D Winged Stag Emblem Group
    const stagGroup = new THREE.Group();

    // Body Core
    const bodyGeo = new THREE.ConeGeometry(0.5, 1.8, 16);
    const goldEmissiveMat = new THREE.MeshStandardMaterial({
        color: 0xe5a93c,
        emissive: 0x996110,
        metalness: 0.8,
        roughness: 0.2
    });
    const bodyMesh = new THREE.Mesh(bodyGeo, goldEmissiveMat);
    bodyMesh.rotation.x = Math.PI;
    stagGroup.add(bodyMesh);

    // Head
    const headGeo = new THREE.SphereGeometry(0.35, 16, 16);
    const headMesh = new THREE.Mesh(headGeo, goldEmissiveMat);
    headMesh.position.set(0, 1, 0);
    stagGroup.add(headMesh);

    // Wings
    const wingShape = new THREE.Shape();
    wingShape.moveTo(0, 0);
    wingShape.quadraticCurveTo(1.2, 1.8, 2.8, 1.2);
    wingShape.quadraticCurveTo(2.0, 0.2, 0, -0.8);

    const extrudeSettings = { depth: 0.05, bevelEnabled: true, bevelSegments: 3, steps: 1, bevelSize: 0.02, bevelThickness: 0.02 };
    const wingGeo = new THREE.ExtrudeGeometry(wingShape, extrudeSettings);

    const leftWing = new THREE.Mesh(wingGeo, goldEmissiveMat);
    leftWing.position.set(-0.2, 0.4, 0);
    leftWing.scale.set(-1, 1, 1);

    const rightWing = new THREE.Mesh(wingGeo, goldEmissiveMat);
    rightWing.position.set(0.2, 0.4, 0);

    stagGroup.add(leftWing);
    stagGroup.add(rightWing);
    stagGroup.position.set(0, -0.2, 4.2);
    stagGroup.scale.set(0.65, 0.65, 0.65);
    scene.add(stagGroup);

    // Ambient Space Stars / Cosmic Dust
    const starsGeo = new THREE.BufferGeometry();
    const starCount = 800;
    const starPositions = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount * 3; i += 3) {
        starPositions[i] = (Math.random() - 0.5) * 80;
        starPositions[i + 1] = (Math.random() - 0.5) * 80;
        starPositions[i + 2] = (Math.random() - 0.5) * 80;
    }
    starsGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const starsMat = new THREE.PointsMaterial({ color: 0xe5a93c, size: 0.12, transparent: true, opacity: 0.6 });
    const starField = new THREE.Points(starsGeo, starsMat);
    scene.add(starField);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x1a202c, 1.5);
    scene.add(ambientLight);

    const mainSun = new THREE.DirectionalLight(0xfff5ea, 2.5);
    mainSun.position.set(8, 6, 10);
    scene.add(mainSun);

    const goldFill = new THREE.PointLight(0xe5a93c, 3, 20);
    goldFill.position.set(-5, -2, 5);
    scene.add(goldFill);

    /* ==========================================================================
       4. GSAP SCROLLTRIGGER TIMELINE (Peryton 3D Moon Motion)
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
        .to(moonMesh.rotation, { y: Math.PI * 0.8, x: 0.3 }, 0)
        .to(stagGroup.position, { x: 2.8, y: -0.2, z: 2.2 }, 0)
        .to(stagGroup.rotation, { y: -0.4 }, 0);

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
        .to(moonMesh.rotation, { y: Math.PI * 1.6, x: -0.2 }, 0)
        .to(stagGroup.position, { x: -2.8, y: -0.6, z: 2.8 }, 0)
        .to(stagGroup.rotation, { y: 0.5 }, 0);

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
        .to(moonMesh.scale, { x: 1.4, y: 1.4, z: 1.4 }, 0)
        .to(atmosphereMesh.scale, { x: 1.4, y: 1.4, z: 1.4 }, 0)
        .to(stagGroup.position, { x: 0, y: 0.8, z: 1.5 }, 0);
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
        moonMesh.rotation.y += 0.002;
        atmosphereMesh.rotation.y += 0.002;

        stagGroup.position.y += Math.sin(elapsedTime * 2) * 0.003;
        leftWing.rotation.z = Math.sin(elapsedTime * 3) * 0.15;
        rightWing.rotation.z = -Math.sin(elapsedTime * 3) * 0.15;

        // Subtle Mouse Parallax Spring
        scene.rotation.y += (mouseXParallax * 0.12 - scene.rotation.y) * 0.05;
        scene.rotation.x += (-mouseYParallax * 0.12 - scene.rotation.x) * 0.05;

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