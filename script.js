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


// Horizontal Showcase
// We wait for window load so images have dimensions
window.addEventListener('load', () => {
    const horizontalTrack = document.querySelector('.gallery-track');
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
