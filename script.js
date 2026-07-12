// Lenis Smooth Scroll Setup
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smooth: true,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Register GSAP Plugins
gsap.registerPlugin(ScrollTrigger);

// Loader Animation
window.addEventListener('load', () => {
    const tl = gsap.timeline();
    tl.to('.loader-logo', { opacity: 1, duration: 1 })
      .to('.loader-logo', { opacity: 0, duration: 0.5, delay: 0.5 })
      .to('#loader', { yPercent: -100, duration: 1, ease: 'power4.inOut' })
      .from('.hero-title', { y: 100, opacity: 0, duration: 1.5, ease: 'power4.out' }, "-=0.5")
      .from('.hero-subtitle', { y: 50, opacity: 0, duration: 1, ease: 'power4.out' }, "-=1");
});

// Hero Typography Scale & Fade
gsap.to('.hero-title', {
    scrollTrigger: {
        trigger: '.hero-section',
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
    },
    scale: 1.3,
    opacity: 0,
    letterSpacing: "0.1em"
});

gsap.to('.hero-subtitle', {
    scrollTrigger: {
        trigger: '.hero-section',
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
    },
    y: -50,
    opacity: 0
});

// Video Scrubbing (First Video)
const video1 = document.getElementById('heroVideo');

// Make sure video is loaded before getting duration
if (video1) {
    video1.addEventListener('loadedmetadata', function() {
        // Only scrub if the video has duration
        if(video1.duration) {
            gsap.to(video1, {
                scrollTrigger: {
                    trigger: "#cinematicSeq",
                    start: "top top",
                    end: "bottom bottom",
                    scrub: true,
                },
                currentTime: video1.duration - 0.1 // avoid going past end
            });
        }
    });
}

// Floating Specs appearing one by one
const specs = gsap.utils.toArray('.spec-item');
specs.forEach((spec, i) => {
    gsap.to(spec, {
        scrollTrigger: {
            trigger: "#cinematicSeq",
            start: () => `top+=${i * 15}% center`,
            end: () => `top+=${(i + 1) * 15}% center`,
            scrub: true,
        },
        opacity: 1,
        y: 0,
        yoyo: true, // fades out after
        repeat: 1
    });
});

// Performance Counters
const counters = document.querySelectorAll('.counter');
counters.forEach(counter => {
    ScrollTrigger.create({
        trigger: '.performance-showcase',
        start: 'top center',
        once: true,
        onEnter: () => {
            const target = parseFloat(counter.getAttribute('data-target'));
            const isDecimal = counter.getAttribute('data-decimal') === 'true';
            
            gsap.to(counter, {
                innerHTML: target,
                duration: 2,
                ease: 'power3.out',
                snap: { innerHTML: isDecimal ? 0.1 : 1 },
                onUpdate: function() {
                    if (isDecimal) {
                        counter.innerHTML = parseFloat(this.targets()[0].innerHTML).toFixed(1);
                    }
                }
            });
        }
    });
});

// Video Transition (hide first, show second)
ScrollTrigger.create({
    trigger: '.performance-showcase',
    start: 'bottom center',
    onEnter: () => {
        gsap.to('#videoContainer1', { opacity: 0, duration: 1 });
        gsap.to('#videoContainer2', { opacity: 1, duration: 1 });
    },
    onLeaveBack: () => {
        gsap.to('#videoContainer1', { opacity: 1, duration: 1 });
        gsap.to('#videoContainer2', { opacity: 0, duration: 1 });
    }
});


// Cinematic Color Reveal
const colorPanes = gsap.utils.toArray('.color-pane');
const morphOverlay = document.getElementById('morphOverlay');

if (morphOverlay && colorPanes.length > 0) {
    const colorSeq = gsap.timeline({
        scrollTrigger: {
            trigger: '#colorReveal',
            start: 'top top',
            end: 'bottom bottom',
            scrub: true,
        }
    });

    // 1. Obsidian Black (Default)
    colorSeq.to(colorPanes[0], { opacity: 1, duration: 1 })
            .to(morphOverlay, { backgroundColor: 'rgba(10,10,12,0.85)', duration: 1 }, "<")
            .to(colorPanes[0], { opacity: 0, duration: 1 })
    // 2. Crimson Velocity
            .to(colorPanes[1], { opacity: 1, duration: 1 })
            .to(morphOverlay, { backgroundColor: 'rgba(122,0,16,0.65)', duration: 1 }, "<")
            .to(colorPanes[1], { opacity: 0, duration: 1 })
    // 3. Liquid Titanium
            .to(colorPanes[2], { opacity: 1, duration: 1 })
            .to(morphOverlay, { backgroundColor: 'rgba(106,108,117,0.7)', duration: 1 }, "<");
}


// Horizontal Showcase
// We wait for window load so images have dimensions
window.addEventListener('load', () => {
    const horizontalTrack = document.querySelector('.gallery-track');
    if (horizontalTrack) {
        // Calculate the amount to scroll left based on the width of track minus viewport
        const horizontalScrollLength = horizontalTrack.scrollWidth - window.innerWidth;

        gsap.to(horizontalTrack, {
            x: () => -horizontalScrollLength,
            ease: "none",
            scrollTrigger: {
                trigger: "#horizontalWrapper",
                start: "top top",
                end: () => "+=" + horizontalScrollLength,
                pin: true,
                scrub: 1,
                invalidateOnRefresh: true // recalculates width on resize
            }
        });
    }
});

// Engineering Cards Parallax
const cards = gsap.utils.toArray('.eng-card');
cards.forEach((card, i) => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: '.engineering-section',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
        },
        y: 100 * (i * 0.2 + 1), // stagger parallax effect
        opacity: 0.5
    });
});

// Final Hero Parallax
gsap.from('.final-content', {
    scrollTrigger: {
        trigger: '.final-hero',
        start: 'top bottom',
        end: 'center center',
        scrub: true
    },
    y: 100,
    opacity: 0,
    scale: 0.9
});

// ==========================================
// GOD-TIER FEATURES
// ==========================================

// 1. Custom Cursor
const cursor = document.getElementById("cursor");
const cursorFollower = document.getElementById("cursor-follower");
let mouseX = 0, mouseY = 0, cursorX = 0, cursorY = 0;

window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX; mouseY = e.clientY;
    gsap.to(cursor, { x: mouseX, y: mouseY, duration: 0 });
});

gsap.ticker.add(() => {
    cursorX += (mouseX - cursorX) * 0.15;
    cursorY += (mouseY - cursorY) * 0.15;
    gsap.set(cursorFollower, { x: cursorX, y: cursorY });
});

const interactables = document.querySelectorAll("a, button, .glass-panel, .eng-card, .cta-reserve, .gallery-item");
interactables.forEach(el => {
    el.addEventListener("mouseenter", () => document.body.classList.add("hover-active"));
    el.addEventListener("mouseleave", () => document.body.classList.remove("hover-active"));
});

// 2. Magnetic Buttons
const magneticBtns = document.querySelectorAll(".cta-reserve");
magneticBtns.forEach(btn => {
    btn.addEventListener("mousemove", (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(btn, { x: x * 0.4, y: y * 0.4, duration: 0.3, ease: "power2.out" });
    });
    btn.addEventListener("mouseleave", () => {
        gsap.to(btn, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.3)" });
    });
});


// 6. ThreeJS Telemetry Particles
const canvas = document.getElementById("webgl-canvas");
if(canvas) {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const particlesGeometry = new THREE.BufferGeometry();
    const posArray = new Float32Array(800 * 3);
    for(let i = 0; i < 2400; i++) posArray[i] = (Math.random() - 0.5) * 15;
    particlesGeometry.setAttribute("position", new THREE.BufferAttribute(posArray, 3));
    
    const material = new THREE.PointsMaterial({ size: 0.006, color: 0xffffff, transparent: true, opacity: 0.6, blending: THREE.AdditiveBlending });
    const particlesMesh = new THREE.Points(particlesGeometry, material);
    scene.add(particlesMesh);
    camera.position.z = 2;

    let pMouseX = 0, pMouseY = 0;
    window.addEventListener("mousemove", (event) => {
        pMouseX = (event.clientX / window.innerWidth) - 0.5;
        pMouseY = (event.clientY / window.innerHeight) - 0.5;
    });

    const clock = new THREE.Clock();
    function animateParticles() {
        requestAnimationFrame(animateParticles);
        const elapsedTime = clock.getElapsedTime();
        particlesMesh.rotation.y = elapsedTime * 0.05;
        particlesMesh.rotation.x = elapsedTime * 0.02;
        particlesMesh.position.x += (pMouseX * 0.5 - particlesMesh.position.x) * 0.05;
        particlesMesh.position.y += (-pMouseY * 0.5 - particlesMesh.position.y) * 0.05;
        camera.position.y = -window.scrollY * 0.001;
        renderer.render(scene, camera);
    }
    animateParticles();

    window.addEventListener("resize", () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}


// ==========================================
// 10-POINT ULTIMATE GOD-TIER FEATURES
// ==========================================

// 1. Time-of-Day UI
const currentHour = new Date().getHours();
if(currentHour >= 6 && currentHour <= 18) {
    // Daytime
    document.documentElement.style.setProperty("--bg-color", "#1a1a24");
}



// 3. Velocity Skewing
const skewSetter = gsap.quickSetter("main", "skewY", "deg");
gsap.ticker.add(() => {
    let skewAmount = scrollVelocity * 0.1;
    skewSetter(Math.min(skewAmount, 5));
});

// 4. Glass Reflections (Mouse tracking)
document.addEventListener("mousemove", (e) => {
    document.querySelectorAll(".glass-panel").forEach(panel => {
        const rect = panel.getBoundingClientRect();
        const mx = ((e.clientX - rect.left) / rect.width) * 100;
        const my = ((e.clientY - rect.top) / rect.height) * 100;
        panel.style.setProperty("--mx", `${mx}%`);
        panel.style.setProperty("--my", `${my}%`);
    });
});

// 5. Haptic Feedback
document.querySelectorAll(".cta-reserve").forEach(btn => {
    btn.addEventListener("mouseenter", () => {
        if("vibrate" in navigator) navigator.vibrate([100, 50, 100]);
    });
});





// 8. Barba.js Transitions
if(window.barba) {
    barba.init({
        transitions: [{
            name: "opacity-transition",
            leave(data) {
                return gsap.to(data.current.container, { opacity: 0, duration: 0.5 });
            },
            enter(data) {
                return gsap.from(data.next.container, { opacity: 0, duration: 0.5 });
            }
        }]
    });
}


// ==========================================
// 10-POINT ULTIMATE GOD-TIER JS
// ==========================================

// 1. Custom Glowing Scroll Progress
const scrollProgress = document.getElementById("scroll-progress");
if(scrollProgress) {
    gsap.to(scrollProgress, {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
            trigger: document.body,
            start: "top top",
            end: "bottom bottom",
            scrub: true
        }
    });
}

// 2. 3D Tilt Engineering Cards
const engCards = document.querySelectorAll(".eng-card");
engCards.forEach(card => {
    card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -10; // max 10 deg tilt
        const rotateY = ((x - centerX) / centerX) * 10;
        
        gsap.to(card, {
            rotationX: rotateX,
            rotationY: rotateY,
            transformPerspective: 1000,
            ease: "power2.out",
            duration: 0.5
        });
    });
    card.addEventListener("mouseleave", () => {
        gsap.to(card, { rotationX: 0, rotationY: 0, duration: 0.5, ease: "power2.out" });
    });
});

// 3. Cursor "Flashlight" Spotlight
const spotlight = document.getElementById("spotlight");
if(spotlight) {
    window.addEventListener("mousemove", (e) => {
        spotlight.style.setProperty("--x", `${e.clientX}px`);
        spotlight.style.setProperty("--y", `${e.clientY}px`);
    });
}

// 4. Kinetic Typography Marquee
const marquee = document.querySelector(".marquee-container");
if(marquee) {
    gsap.to(".marquee-text", {
        xPercent: -50,
        ease: "none",
        repeat: -1,
        duration: 10 // baseline speed
    });
    
    // Skew and speed up based on scroll velocity
    const skewSetter = gsap.quickSetter(".marquee-text", "skewX", "deg");
    gsap.ticker.add(() => {
        const velocity = window.lenis ? window.lenis.velocity : 0;
        skewSetter(velocity * -0.5); // Tilt text based on scroll speed
    });
}

// 5. Geometric Image Mask Reveals
const galleryItems = gsap.utils.toArray(".gallery-item");
galleryItems.forEach(item => {
    gsap.to(item, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        scrollTrigger: {
            trigger: item,
            start: "top 80%",
            end: "bottom 80%",
            scrub: true
        }
    });
});

// 6. Magnetic Floating Navigation Menu
const navToggle = document.getElementById("navToggle");
const navOverlay = document.getElementById("navOverlay");
const navLinks = document.querySelectorAll(".nav-link");

if (navToggle && navOverlay) {
    // Magnetic hover effect
    navToggle.addEventListener("mousemove", (e) => {
        const rect = navToggle.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) * 0.3;
        const y = (e.clientY - rect.top - rect.height / 2) * 0.3;
        gsap.to(navToggle, { x: x, y: y, duration: 0.5, ease: "power2.out" });
    });
    navToggle.addEventListener("mouseleave", () => {
        gsap.to(navToggle, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.3)" });
    });

    // Toggle menu
    navToggle.addEventListener("click", () => {
        navToggle.classList.toggle("open");
        navOverlay.classList.toggle("active");
        
        if (navOverlay.classList.contains("active")) {
            gsap.fromTo(navLinks, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, delay: 0.2, ease: "power3.out" });
        }
    });
    
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            navToggle.classList.remove("open");
            navOverlay.classList.remove("active");
        });
    });
}

// 9. Smart Video Intersection Observers
const videos = document.querySelectorAll("video");
if (videos.length > 0 && "IntersectionObserver" in window) {
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.play().catch(e => console.log("Video Autoplay prevented:", e));
            } else {
                entry.target.pause();
            }
        });
    }, { threshold: 0.1 }); // Play when at least 10% visible
    
    videos.forEach(video => videoObserver.observe(video));
}

// 10. Interactive 3D Wireframe Spin (Reserve Section)
const wireContainer = document.getElementById("wireframe-canvas-container");
if(wireContainer && window.THREE) {
    const scene2 = new THREE.Scene();
    const camera2 = new THREE.PerspectiveCamera(75, wireContainer.clientWidth / wireContainer.clientHeight, 0.1, 1000);
    const renderer2 = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer2.setSize(wireContainer.clientWidth, wireContainer.clientHeight);
    wireContainer.appendChild(renderer2.domElement);
    
    // Create a conceptual wireframe car shape (simplified Box with wireframe for performance/aesthetics)
    const geometry2 = new THREE.BoxGeometry(4, 1.2, 2, 8, 4, 4); 
    const edges = new THREE.EdgesGeometry(geometry2);
    const material2 = new THREE.LineBasicMaterial({ color: 0xff0033, linewidth: 2 });
    const wireCar = new THREE.LineSegments(edges, material2);
    scene2.add(wireCar);
    
    camera2.position.z = 5;
    
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    
    wireContainer.addEventListener("mousedown", (e) => {
        isDragging = true;
    });
    
    window.addEventListener("mousemove", (e) => {
        if(isDragging) {
            const deltaMove = {
                x: e.offsetX - previousMousePosition.x,
                y: e.offsetY - previousMousePosition.y
            };
            wireCar.rotation.y += deltaMove.x * 0.01;
            wireCar.rotation.x += deltaMove.y * 0.01;
        }
        previousMousePosition = { x: e.offsetX, y: e.offsetY };
    });
    
    window.addEventListener("mouseup", (e) => {
        isDragging = false;
    });
    
    // Auto spin slowly
    function animateWireframe() {
        requestAnimationFrame(animateWireframe);
        if(!isDragging) {
            wireCar.rotation.y += 0.002;
        }
        renderer2.render(scene2, camera2);
    }
    animateWireframe();
    
    window.addEventListener("resize", () => {
        camera2.aspect = wireContainer.clientWidth / wireContainer.clientHeight;
        camera2.updateProjectionMatrix();
        renderer2.setSize(wireContainer.clientWidth, wireContainer.clientHeight);
    });
}

