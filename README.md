# Yoekii | High-Performance Agentic AI Platform

![Yoekii Hero](/public/images/demo/hero.png)

Yoekii is a premium, immersive **Agentic AI platform** built with Next.js, Three.js, and GSAP. It features a cutting-edge **3D Particle System** that morphs through various states (AI Chips, Life, Industries, Branding) as the user scrolls, creating a deeply engaging storytelling experience.

---

## 🚀 Key Features

- **3D Particle Morphing Engine**: A customized WebGL system with 20+ morphing states, synchronized to user scroll via GSAP ScrollTrigger.
![3D Particle System](/public/images/demo/services.png)
- **Neon Tech Aesthetic**: A sleek, futuristic UI theme using deep navy background (`#112257`) and neon cobalt highlights (`#7d8cff`).
![Industries View](/public/images/demo/industries.png)
- **Interactive Global Elements**:
    - **GSAP Cursor Follower**: A smooth, hover-reactive cursor trail.
    - **Mouse Parallax**: 3D elements that respond to mouse movement for volumetric depth.
    - **Ambient Digital Dust**: Background particle layers that drift organically across sections.
- **Modern Tech Stack**: Fully responsive, performance-optimized, and built with industry-standard patterns.

---

## 🛠 Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **3D Graphics**: [Three.js](https://threejs.org/)
- **Animation**: [GSAP (GreenSock)](https://gsap.com/) + ScrollTrigger
- **Styling**: Vanilla CSS + [CSS Modules](https://github.com/css-modules/css-modules)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)

---

## 🏗 Project Structure

```bash
yoekii-platform/
├── src/
│   ├── app/                # Next.js App Router (Pages, Global Styles)
│   ├── components/         # Interactive UI Components
│   │   ├── ParticleScene/  # Core 3D Logic & Particle States
│   │   ├── Cursor/         # Custom Interactive Trail
│   │   ├── Navbar/         # Brand Identity & Mega Menus
│   │   └── ...             # Sections (Services, Industries, Insights)
│   └── lib/                # Utility Functions & Configuration
├── public/                 # Static Assets (Images, Icons)
└── package.json            # Dependencies & Scripts
```

---

## 🏁 Getting Started

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org/) (v18+) and [npm](https://www.npmjs.com/) installed.

### 2. Installation
Clone the repository and install the dependencies:
```bash
npm install
```

### 3. Development Mode
Run the local development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view the site.

### 4. Production Build
Optimize the project for production:
```bash
npm run build
npm run start
```

---

## 🎨 Customization: Theme Synchronization

The site uses a unified "Neon Tech" design system. To adjust global colors, modify `src/app/globals.css`:

```css
:root {
  --bg-color: #112257;    /* Deep Navy Foundation */
  --brand-orange: #7d8cff; /* Neon Primary Cobalt */
  /* These variables update the UI, 3D particles, and cursor automatically */
}
```

---

## 📄 License
© 2026 **Yoekii**. All rights reserved. 
Designed for high-performance AI excellence.
