<div align="center">
  <img src="https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?w=1200&auto=format&fit=crop" alt="APEX Motors Cover" width="100%" style="border-radius: 12px; margin-bottom: 20px; box-shadow: 0 20px 40px rgba(0,0,0,0.5);">
  
  <h1 align="center">🏎️ APEX Motors: The Cinematic Experience</h1>
  
  <p align="center">
    <strong>Engineering Tomorrow. Crafted Without Compromise.</strong>
    <br>
    An ultra-premium, scroll-driven storytelling website built for a luxury hypercar brand.
  </p>

  <p align="center">
    <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5" />
    <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3" />
    <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
    <img src="https://img.shields.io/badge/GSAP-88CE02?style=for-the-badge&logo=greensock&logoColor=white" alt="GSAP" />
    <img src="https://img.shields.io/badge/Lenis-Smooth_Scroll-black?style=for-the-badge" alt="Lenis" />
  </p>
</div>

---

## 🌟 The Vision

**APEX Motors** isn't just a website; it's a $10M luxury automotive launch experience rendered directly in your browser. Inspired by the commanding digital presence of industry titans like Bugatti, Koenigsegg, and the legendary visual polish of Apple, this single-page application leverages intense, scroll-driven animations to make the user feel like they are actively directing a high-budget cinematic commercial.

## ✨ God-Tier Features

*   **🎬 Cinematic Video Scrubbing**: The hero background video’s timeline is intrinsically linked to your scroll position. You control the pace, direction, and flow of the commercial purely through scrolling.
*   **🧈 Ultra-Smooth Scrolling**: Powered by [Lenis](https://lenis.studiofreight.com/), ensuring every pixel moves with premium, frictionless fluidity.
*   **📐 Apple-Level Aesthetics**: Deep matte Obsidian Black backgrounds, HDR-inspired gradients, glowing metallic accents, and seamless glassmorphism UI panels.
*   **⚡ Dynamic Micro-Interactions**: Performance specifications gracefully float into view, featuring live GSAP-powered counters that animate to display raw power metrics (e.g., *1,850 HP*, *480 KM/H*, *1.9s 0-100*).
*   **🎨 Liquid Morphing Color Reveal**: A sophisticated, scroll-triggered gradient morph that transitions the vehicle's surrounding atmosphere between three distinct finishes: *Obsidian Black*, *Crimson Velocity*, and *Liquid Titanium*.
*   **🏎️ Immersive Horizontal Showcase**: A pinned horizontal scroll track that delivers dramatic, layered parallax close-ups of the carbon fiber aerodynamics and cockpit details without breaking the vertical scroll momentum.

## 🛠️ Technology Stack

*   **Markup**: HTML5 structured for maximum semantic clarity and flow.
*   **Styling**: Pure Vanilla CSS3 utilizing advanced CSS variables, responsive grid/flexbox layouts, and heavily relying on `backdrop-filter` for stunning glassmorphism.
*   **Core Animation Engine**: [GSAP (GreenSock Animation Platform) 3.12.5](https://greensock.com/gsap/).
*   **Scroll Triggering**: GSAP `ScrollTrigger` plugin for pinning sections, managing complex timelines, and tying video `currentTime` to scroll depth.
*   **Smooth Scroll Interpolation**: [Lenis](https://github.com/studio-freight/lenis) for a lightweight, highly performant smooth-scroll wrapper.

## 🚀 Quick Start

Getting the APEX Motors experience running locally is instantaneous. No complex build tools, transpilers, or bundlers required.

1.  **Clone the Repository** (or download the files):
    ```bash
    git clone https://github.com/your-username/Hyperix.git
    cd Hyperix
    ```
2.  **Launch the Site**:
    Because this is a pure HTML/CSS/JS frontend masterpiece, you can simply open the `index.html` file in any modern web browser (Chrome, Safari, Edge).
    
    *For the absolute best performance (especially regarding video buffering), it is highly recommended to run a local server (like WAMP, XAMPP, or VSCode Live Server):*
    ```bash
    npx serve .
    ```
    Then navigate to `http://localhost:3000`.

## 📁 Project Architecture

```text
Hyperix/
├── index.html       # The main cinematic DOM structure & layout
├── style.css        # Premium design system (Glassmorphism, Typography, Colors)
├── script.js        # The brain: Lenis setup & complex GSAP ScrollTrigger logic
└── README.md        # You are here!
```

## 🎥 Customizing the Cinematic Experience

To make this project your own, you must replace the placeholder videos with your own high-quality automotive or product footage.

1.  Open `index.html`.
2.  Locate the `<video>` tags within `#videoContainer1` and `#videoContainer2`.
3.  Replace the `src` attribute with the direct URL or local path to your video.

> [!IMPORTANT]
> **The Secret to Stutter-Free Video Scrubbing**
> To achieve the buttery-smooth "commercial scrubbing" effect seen on top Awwwards sites, your video file **must** be specially encoded. Standard MP4s compress data between keyframes, causing heavy stuttering when scrolling backwards. 
> 
> You must encode your video with an intra-frame only codec or a keyframe interval of 1 (every frame is a keyframe). You can do this easily with FFmpeg:
> ```bash
> ffmpeg -i input.mp4 -g 1 -c:v libx264 -preset veryfast output.mp4
> ```

---

<div align="center">
  <p>Crafted with 🖤 for the love of Automotive Design, Uncompromising Engineering, and Next-Level Web Animation.</p>
</div>
