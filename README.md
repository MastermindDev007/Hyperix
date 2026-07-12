# APEX MOTORS - NEXT-LEVEL WEB EXPERIENCE

![APEX Motors Hero](https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=2000&q=80)

Welcome to the **APEX Motors** concept repository. This project is a demonstration of absolute "God-Tier" frontend engineering, pushing the boundaries of what is possible in the browser without relying on heavy reactive frameworks like React or Vue. 

It is designed to win Awwwards, featuring buttery-smooth 60fps animations, WebGL integrations, and seamless page transitions, all wrapped in a hyper-luxury aesthetic.

## 🚀 The Tech Stack

This project achieves its high performance by sticking to the absolute essentials, powered by industry-leading animation libraries:

- **HTML5 & CSS3** (Vanilla, heavily utilizing Custom Properties and Flexbox/Grid)
- **Vanilla JavaScript** (ES6+)
- **[GSAP (GreenSock)](https://greensock.com/)** - For complex, timeline-based ScrollTriggers and DOM animations.
- **[Three.js](https://threejs.org/)** - For WebGL 3D rendering (Interactive Wireframes and 360° Cockpit panoramas).
- **[Barba.js](https://barba.js.org/)** - For fluid, single-page-application (SPA) style transitions without browser reloading.
- **[Lenis](https://lenis.studiofreight.com/)** - For mathematically perfect, physics-based smooth scrolling.

---

## ⚡ God-Tier Features Included

We didn't just build a website; we built a digital experience.

### 1. Seamless Navigation (Barba.js)
Clicking the "Reserve Yours" button transitions the user to the `reserve.html` page without a flash of white or a browser reload. The DOM is seamlessly swapped with a smooth fade, maintaining background audio and cursor state.

### 2. Live WebGL Integrations (Three.js)
- **3D Wireframe Spin**: At the bottom of the page, interact with a live, draggable 3D wireframe rendering of an APEX hypercar.
- **360° Cockpit Panorama**: Physically click and drag to look around the luxury interior in full 360 degrees.

### 3. Hyper-Optimized Scroll Hijacking (Lenis + GSAP)
- **Kinetic Typography**: Background text that skews and speeds up based on the exact velocity of your scroll wheel.
- **Scroll-Exploded Powertrain**: As you scroll, high-res layers of a V12 engine physically pull apart in 3D space to reveal inner mechanics.
- **Smart Video Observers**: Custom `IntersectionObservers` instantly pause videos when scrolled out of view to save RAM and maintain 60 FPS.

### 4. Bespoke Micro-Interactions
- **Magnetic Custom Cursor**: A custom glowing cursor that morphs into a frosted ring, magnetically snapping to interactive elements.
- **Ignite Engine Audio**: A violently shaking CSS animation paired with a thunderous V12 audio clip triggered via the menu.
- **Live Wind Tunnel**: An HTML5 Canvas particle simulator that reacts to your mouse, deflecting wind around an invisible car.
- **Color Configurator**: Click swatches to instantly repaint the car and dynamically shift the website's entire ambient CSS variable lighting.

---

## 🛠️ Installation & Setup

Because this project utilizes **Barba.js** and **Three.js** texture loading, it **cannot** be run directly via the `file://` protocol due to strict browser CORS policies.

**You must run this over a local server.**

### Quick Start (VS Code)
1. Open the folder in Visual Studio Code.
2. Install the **Live Server** extension.
3. Click `Go Live` at the bottom right.
4. The site will open at `http://127.0.0.1:5500`.

### Quick Start (Node.js)
```bash
# Navigate to the directory
cd Hyperix

# Use npx to spin up a quick server
npx serve .
```

### Quick Start (Python)
```bash
# Navigate to the directory
cd Hyperix

# Start a local python server
python -m http.server 8000
```

---

## 📂 File Structure

```text
/Hyperix
│
├── index.html       # The main immersive landing page experience
├── reserve.html     # The luxury booking confirmation page
├── style.css        # All custom styling and CSS variables
├── script.js        # The brain: GSAP, Three.js, Observers, and DOM logic
└── README.md        # This documentation file
```

---

*Designed and Engineered for the Future of the Web.*
