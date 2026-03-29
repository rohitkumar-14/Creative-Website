'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePathname } from 'next/navigation';

gsap.registerPlugin(ScrollTrigger);

export default function ParticleScene() {
  const mountRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const isContactPage = pathname === '/contact';

  const mousePos = useRef({ x: 0, y: 0 });
  const targetRot = useRef({ x: 0, y: 0 });
  const ambientRef = useRef<THREE.Points | null>(null);

  const scrollState = useRef({
    heroProgress: 0,
    servicesProgress: 0,
    spotlightProgress: 0,
    industriesProgress: 0,
    successStoriesProgress: 0,
    insightsProgress: 0,
    gamingProgress: 0,
    ctaProgress: 0,
    footerProgress: 0,
    contactProgress: 0,
  });

  // Ref to hold the update function for cross-hook access
  const updateRef = useRef<((t?: number) => void) | null>(null);

  useEffect(() => {
    // Morph to Globe on /contact, back to home states on other pages
    gsap.to(scrollState.current, {
      contactProgress: isContactPage ? 1 : 0,
      duration: 2,
      ease: 'power4.inOut',
      onUpdate: () => updateRef.current?.()
    });

    if (isContactPage) {
      gsap.to(scrollState.current, {
        heroProgress: 0,
        servicesProgress: 0,
        spotlightProgress: 0,
        industriesProgress: 0,
        successStoriesProgress: 0,
        insightsProgress: 0,
        gamingProgress: 0,
        ctaProgress: 0,
        footerProgress: 0,
        duration: 1.5,
        ease: 'power3.out'
      });
    }
  }, [isContactPage]);

  useEffect(() => {
    if (!mountRef.current) return;

    // ----- Scene Setup -----
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 50;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    // ----- Particle System Generation -----
    const particleCount = 12000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const brandOrange = new THREE.Color('#7d8cff');

    const states: Float32Array[] = Array(20).fill(null).map(() => new Float32Array(particleCount * 3));

    // Distribution function for shapes roughly handling 10k points
    for (let i = 0; i < particleCount; i++) {
      // --- Common Noise Helper ---
      const nz = (Math.random() - 0.5) * 2;
      const p = i / particleCount;

      // State 0: Hero Ribbon Waves (Full-width spread with visible spacing)
      const ribbonCount = 24; // More ribbons for better layering
      const ribbonIdx = i % ribbonCount;
      const pInRibbon = Math.floor(i / ribbonCount) / (particleCount / ribbonCount);

      const x0 = -100 + pInRibbon * 200; // Extreme full-width spread
      const z0 = -60 + (ribbonIdx / ribbonCount) * 80; // Deeper depth for more spacing

      // Dynamic frequency and phase based on depth for a staggered, airy look
      const freq = 0.05 + (ribbonIdx * 0.003); // Slower, wider waves
      const phase = (ribbonIdx * Math.PI) / 2.5;
      const amp = 8 + Math.sin(ribbonIdx * 0.5) * 4;

      const y0 = amp * Math.sin(x0 * freq + phase)
        + (amp / 4) * Math.sin(x0 * freq * 3 + phase)
        + (Math.random() - 0.5) * 0.2;

      states[0][i * 3] = x0;
      states[0][i * 3 + 1] = y0 - 15; // Shifted lower to stay at the bottom
      states[0][i * 3 + 2] = z0;

      // State 1: Gen AI (High-Definition AI Chip)
      const s1 = 1.35;
      let x1, y1, z1 = nz * 0.5;
      if (p < 0.35) { // Denser base frame (Triple layered for thickness)
        const sq = Math.floor(i % 4);
        const st = (Math.floor(i / 12) % (particleCount / 12)) / (particleCount / 12);
        const sz = 10 * s1;
        const off = (Math.floor(i / 4) % 3) * 0.2; // multiple layers
        if (sq === 0) { x1 = -sz + st * 2 * sz; y1 = sz + off; }
        else if (sq === 1) { x1 = sz + off; y1 = sz - st * 2 * sz; }
        else if (sq === 2) { x1 = sz - st * 2 * sz; y1 = -sz - off; }
        else { x1 = -sz - off; y1 = -sz + st * 2 * sz; }
      } else if (p < 0.65) { // Precise Pins (Better structured)
        const pinIdx = Math.floor((p - 0.35) / 0.015);
        const side = Math.floor(pinIdx / 5);
        const pinPos = (pinIdx % 5 - 2) * 3.5 * s1;
        const sz = 10 * s1;
        const pL = 4 * s1;
        const noiseSub = (Math.random() - 0.5) * 0.3;
        if (side === 0) { x1 = pinPos + noiseSub; y1 = sz + Math.random() * pL; }
        else if (side === 1) { x1 = sz + Math.random() * pL; y1 = pinPos + noiseSub; }
        else if (side === 2) { x1 = pinPos + noiseSub; y1 = -sz - Math.random() * pL; }
        else { x1 = -sz - Math.random() * pL; y1 = pinPos + noiseSub; }
      } else { // High-Density AI Text
        const subP = (p - 0.65) / 0.35;
        if (subP < 0.6) { // 'A' (Denser outline)
          const at = (subP / 0.6);
          if (at < 0.4) { x1 = -4.5 + at / 0.4 * 2.5; y1 = -5 + at / 0.4 * 10; }
          else if (at < 0.8) { x1 = -2 + (at - 0.4) / 0.4 * 2.5; y1 = 5 - (at - 0.4) / 0.4 * 10; }
          else { x1 = -3.5 + (at - 0.8) / 0.2 * 3; y1 = 0; }
        } else { // 'I'
          const it = (subP - 0.6) / 0.4;
          x1 = 5; y1 = -5 + it * 10;
        }
        x1 *= s1; y1 *= s1;
        x1 += (Math.random() - 0.5) * 0.2; y1 += (Math.random() - 0.5) * 0.2;
      }
      states[1][i * 3] = x1; states[1][i * 3 + 1] = y1; states[1][i * 3 + 2] = z1;

      // State 2: Product Engineering (High-Definition Flowchart)
      const s2 = 1.35;
      let x2, y2, z2 = nz * 0.5;
      if (p < 0.25) { // Denser Diamond (Decision Box)
        const side = Math.floor(p / 0.0625);
        const st = (p % 0.0625) / 0.0625;
        const dr = 7 * s2;
        const v = [[0, 1.2], [0.8, 0], [0, -1.2], [-0.8, 0], [0, 1.2]];
        x2 = THREE.MathUtils.lerp(v[side][0], v[side + 1][0], st) * dr - 8 * s2;
        y2 = THREE.MathUtils.lerp(v[side][1], v[side + 1][1], st) * dr;
      } else if (p < 0.45) { // Top Box
        const rt = (p - 0.25) / 0.2;
        const side = Math.floor(rt / 0.25);
        const st = (rt % 0.25) / 0.25;
        const w = 6 * s2; const h = 4 * s2;
        const vx = [[-w, h], [w, h], [w, -h], [-w, -h], [-w, h]];
        x2 = THREE.MathUtils.lerp(vx[side][0], vx[side + 1][0], st) - 8 * s2;
        y2 = THREE.MathUtils.lerp(vx[side][1], vx[side + 1][1], st) + 14 * s2;
      } else if (p < 0.65) { // Bottom Box
        const rt = (p - 0.45) / 0.2;
        const side = Math.floor(rt / 0.25);
        const st = (rt % 0.25) / 0.25;
        const w = 6 * s2; const h = 4 * s2;
        const vx = [[-w, h], [w, h], [w, -h], [-w, -h], [-w, h]];
        x2 = THREE.MathUtils.lerp(vx[side][0], vx[side + 1][0], st) - 8 * s2;
        y2 = THREE.MathUtils.lerp(vx[side][1], vx[side + 1][1], st) - 14 * s2;
      } else if (p < 0.85) { // Right Large Box 
        const rt = (p - 0.65) / 0.2;
        const side = Math.floor(rt / 0.25);
        const st = (rt % 0.25) / 0.25;
        const w = 10 * s2; const h = 10 * s2;
        const vx = [[-w, h], [w, h], [w, -h], [-w, -h], [-w, h]];
        x2 = THREE.MathUtils.lerp(vx[side][0], vx[side + 1][0], st) + 12 * s2;
        y2 = THREE.MathUtils.lerp(vx[side][1], vx[side + 1][1], st);
      } else { // Connection Lines (Thicker)
        const lt = (p - 0.85) / 0.15;
        const off = (i % 3 - 1) * 0.2;
        if (lt < 0.4) { x2 = -8 * s2 + off; y2 = -14 * s2 + (lt / 0.4) * 28 * s2; }
        else { x2 = -1 * s2 + ((lt - 0.4) / 0.6) * 11 * s2; y2 = off; }
      }
      states[2][i * 3] = x2; states[2][i * 3 + 1] = y2; states[2][i * 3 + 2] = z2;


      // State 6: Spotlight Giant Hollow Planet
      const t6 = Math.random() * Math.PI * 2;
      const p6 = Math.acos((Math.random() * 2) - 1);
      const r6 = 30 + (Math.random() - 0.5) * 2;
      states[6][i * 3] = r6 * Math.sin(p6) * Math.cos(t6);
      states[6][i * 3 + 1] = r6 * Math.sin(p6) * Math.sin(t6);
      states[6][i * 3 + 2] = r6 * Math.cos(p6);

      // State 7: CTA Torus/Swarm Rings
      const t7 = (i / particleCount) * Math.PI * 2 * 3;
      const p7_c = (i / particleCount) * Math.PI * 2 * 8;
      const R7 = 20; const r7 = 8;
      states[7][i * 3] = (R7 + r7 * Math.cos(p7_c)) * Math.cos(t7) + (Math.random() - 0.5) * 2;
      states[7][i * 3 + 1] = (R7 + r7 * Math.cos(p7_c)) * Math.sin(t7) + (Math.random() - 0.5) * 2;
      states[7][i * 3 + 2] = r7 * Math.sin(p7_c) + (Math.random() - 0.5) * 2;

      // State 8: Footer "yoekii" Y Logo 
      const s8 = 1.7;
      let x8, y8, z8 = (Math.random() - 0.5) * 5;
      if (p < 0.25) { // Left Arm (Modern Block)
        const st = (p / 0.25);
        x8 = THREE.MathUtils.lerp(-12, -4, st) * s8 + (Math.random() - 0.5) * 0.5;
        y8 = THREE.MathUtils.lerp(16, 4, st) * s8;
      } else if (p < 0.45) { // Right Arm (Sharp Diagonal)
        const st = (p - 0.25) / 0.2;
        x8 = THREE.MathUtils.lerp(14, 0, st) * s8;
        y8 = THREE.MathUtils.lerp(16, 0, st) * s8;
      } else if (p < 0.65) { // Stem (Vertical Block)
        const st = (p - 0.45) / 0.2;
        x8 = (Math.random() - 0.5) * 1.5;
        y8 = THREE.MathUtils.lerp(0, -18, st) * s8;
      } else { // High-Density Circular Aura (Top-Right Signature)
        const st = (p - 0.65) / 0.35;
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.pow(Math.random(), 0.5) * 9 * s8;
        x8 = 14 * s8 + radius * Math.cos(angle);
        y8 = 12 * s8 + radius * Math.sin(angle);
        z8 = (Math.random() - 0.5) * 15;
      }
      states[8][i * 3] = x8;
      states[8][i * 3 + 1] = y8;
      states[8][i * 3 + 2] = z8;

      // State 19: Expansive Spiral Background (Explore Infinite)
      const st19 = (i / particleCount);
      const angle19 = st19 * Math.PI * 16; // multiple rotations
      const radius19 = 5 + st19 * 35; // outward growth
      states[19][i * 3] = radius19 * Math.cos(angle19) + (Math.random() - 0.5) * 4;
      states[19][i * 3 + 1] = radius19 * Math.sin(angle19) + (Math.random() - 0.5) * 4;
      states[19][i * 3 + 2] = (Math.random() - 0.5) * 20; // thick disk

      // State 9: Healthcare (Heart + ECG)
      const t9 = Math.random() * Math.PI * 2;
      // Heart shape: x = 16sin^3(t), y = 13cos(t) - 5cos(2t) - 2cos(3t) - cos(4t)
      const heartX = 16 * Math.pow(Math.sin(t9), 3) * 0.7; // scaled up
      const heartY = (13 * Math.cos(t9) - 5 * Math.cos(2 * t9) - 2 * Math.cos(3 * t9) - Math.cos(4 * t9)) * 0.7;
      if (p < 0.8) {
        states[9][i * 3] = heartX + (Math.random() - 0.5);
        states[9][i * 3 + 1] = heartY + (Math.random() - 0.5) + 5;
        states[9][i * 3 + 2] = nz;
      } else {
        // ECG line
        const ecgX = (p - 0.8) / 0.2 * 40 - 20;
        let ecgY = 0;
        if (Math.abs(ecgX) < 1) ecgY = 0;
        else if (Math.abs(ecgX) < 2) ecgY = (ecgX - 1) * 8;
        else if (Math.abs(ecgX) < 3) ecgY = 8 - (ecgX - 2) * 16;
        else if (Math.abs(ecgX) < 4) ecgY = -8 + (ecgX - 3) * 8;
        states[9][i * 3] = ecgX;
        states[9][i * 3 + 1] = ecgY + nz + 5;
        states[9][i * 3 + 2] = 2;
      }

      // State 10: BFSI (Bank Building)
      let x10, y10, z10 = nz;
      if (p < 0.3) { // Podium/Steps
        x10 = (Math.random() - 0.5) * 28; y10 = -10 + Math.random() * 3;
      } else if (p < 0.5) { // 4 Columns
        const colIdx = Math.floor((p - 0.3) / 0.2 * 4);
        x10 = -10.5 + colIdx * 7 + (Math.random() - 0.5) * 2; y10 = -7 + Math.random() * 12;
      } else if (p < 0.8) { // Roof
        const roofU = (Math.random() - 0.5) * 32; const roofV = Math.random() * 6;
        x10 = roofU * (1 - roofV / 10); y10 = 5 + roofV;
      } else { // $ Sign
        const sT = (p - 0.8) / 0.2 * Math.PI * 2.5;
        x10 = 3 * Math.sin(sT); y10 = 15 + (p - 0.8) / 0.2 * 8 - 4;
        z10 = 2;
      }
      states[10][i * 3] = x10; states[10][i * 3 + 1] = y10 + 3; states[10][i * 3 + 2] = z10;

      // State 11: Technology (Neural Network / Web)
      const t11 = Math.random() * Math.PI * 2;
      const r11 = 18 + Math.random() * 4;
      if (p < 0.6) { // Outer nodes circle
        states[11][i * 3] = r11 * Math.cos(t11);
        states[11][i * 3 + 1] = r11 * Math.sin(t11) + 4;
        states[11][i * 3 + 2] = (Math.random() - 0.5) * 8;
      } else { // Brain inner mesh
        const br = 12 * Math.pow(Math.random(), 0.5);
        states[11][i * 3] = br * Math.cos(t11) * (1 + 0.3 * Math.sin(t11 * 3));
        states[11][i * 3 + 1] = br * Math.sin(t11) * 1.2 + 4;
        states[11][i * 3 + 2] = (Math.random() - 0.5) * 10;
      }

      // State 12: Retail (Shopping Cart)
      let x12, y12, z12 = nz;
      if (p < 0.4) { // Basket
        x12 = (Math.random() - 0.5) * 18; y12 = Math.random() * 12;
        if (y12 < 6) x12 *= (y12 / 6 * 0.2 + 0.8);
      } else if (p < 0.6) { // Handle + Back
        const bl = Math.random();
        x12 = -9 - bl * 5; y12 = bl * 15;
      } else if (p < 0.8) { // Wheels
        const wt = Math.random() * Math.PI * 2;
        const wr = 2.5 * Math.random();
        const we = Math.random() < 0.5 ? -6 : 6;
        x12 = we + wr * Math.cos(wt); y12 = -3 + wr * Math.sin(wt);
      } else { // Floor line
        x12 = (Math.random() - 0.5) * 30; y12 = -3;
      }
      states[12][i * 3] = x12; states[12][i * 3 + 1] = y12 + 5; states[12][i * 3 + 2] = z12;

      // State 3: Intelligent Automation (High-Density Gears/Mech)
      const s3 = 1.45;
      let x3, y3, z3 = nz * 0.8;
      if (p < 0.6) { // Main Industrial Gear (More teeth, clearer rim)
        const ga = (p / 0.6) * Math.PI * 2;
        const hasTooth = Math.floor(ga / (Math.PI / 8)) % 2 === 0;
        const gr = (hasTooth ? 10 : 8) * s3;
        x3 = gr * Math.cos(ga) - 5 * s3; y3 = gr * Math.sin(ga);
      } else if (p < 0.9) { // Secondary Smaller Gear
        const ga = (p - 0.6) / 0.3 * Math.PI * 2;
        const hasTooth = Math.floor(ga / (Math.PI / 6)) % 2 === 0;
        const gr = (hasTooth ? 6 : 4.5) * s3;
        x3 = gr * Math.cos(ga) + 8 * s3; y3 = gr * Math.sin(ga) - 8 * s3;
      } else { // Connecting Chain/Belt
        const ct = (p - 0.9) / 0.1;
        x3 = THREE.MathUtils.lerp(-5 * s3, 8 * s3, ct);
        y3 = THREE.MathUtils.lerp(8 * s3, -4 * s3, ct);
      }
      states[3][i * 3] = x3; states[3][i * 3 + 1] = y3; states[3][i * 3 + 2] = z3;

      // State 4: Quality Engineering (Double-Layered Security Shield)
      const s4 = 1.4;
      let x4, y4, z4 = nz;
      if (p < 0.6) { // Thick Shield Outline
        const tS = (p / 0.6) * Math.PI;
        const rS = 12 * s4;
        const layer = (i % 2) * 0.5;
        x4 = (rS + layer) * Math.sin(tS) * Math.cos(p * Math.PI * 2);
        y4 = (rS + layer) * Math.cos(tS);
        if (y4 < -4) x4 *= (1 - ((-y4 - 4) / 8));
      } else if (p < 0.95) { // Sharp Checkmark (Centered)
        const ct = (p - 0.6) / 0.35;
        if (ct < 0.4) { x4 = (-5 + (ct / 0.4) * 5) * s4; y4 = (-2 + (ct / 0.4) * 4) * s4; }
        else { x4 = (0 + ((ct - 0.4) / 0.6) * 9) * s4; y4 = (2 + ((ct - 0.4) / 0.6) * 8) * s4; }
      } else {
        x4 = (Math.random() - 0.5) * 20; y4 = (Math.random() - 0.5) * 20;
      }
      states[4][i * 3] = x4; states[4][i * 3 + 1] = y4; states[4][i * 3 + 2] = z4;

      // State 5: iXie Gaming (High-Poly Gamepad)
      const s5 = 1.5;
      let x5, y5, z5 = nz * 2;
      if (p < 0.8) { // Structured Controller Body
        const tB = (p / 0.8) * Math.PI * 2;
        const rB = (10 + 3 * Math.cos(tB * 2)) * s5;
        x5 = rB * Math.cos(tB); y5 = rB * Math.sin(tB) * 0.75;
      } else { // Definitive Buttons
        const btnIdx = Math.floor((p - 0.8) / 0.05);
        const bX = [6, 9, 6, 3][btnIdx % 4] * s5;
        const bY = [4, 0, -4, 0][btnIdx % 4] * s5;
        const br = 2 * s5; const bt = Math.random() * Math.PI * 2;
        x5 = bX + br * Math.cos(bt); y5 = bY + br * Math.sin(bt);
      }
      states[5][i * 3] = x5; states[5][i * 3 + 1] = y5; states[5][i * 3 + 2] = z5;

      // State 14: Success Stories (Achievement Constellation - Volumetric Shards)
      const shardCount = 6;
      const shardIdx = i % shardCount;
      const shardPX = ((shardIdx % 3) - 1) * 25;
      const shardPY = ((Math.floor(shardIdx / 3)) - 0.5) * 30;
      const shardSize = 8 + Math.random() * 5;
      // Vertices of a simple octahedron-like volumetric shard
      const sX = (Math.random() - 0.5) * shardSize;
      const sY = (Math.random() - 0.5) * shardSize;
      const sZ = (Math.random() - 0.5) * shardSize;
      const dist = Math.abs(sX) + Math.abs(sY) + Math.abs(sZ);
      const factor = dist > (shardSize * 0.5) ? 1 : 0.2; // Hollow-ish feel
      states[14][i * 3] = shardPX + sX * factor;
      states[14][i * 3 + 1] = shardPY + sY * factor;
      states[14][i * 3 + 2] = sZ * factor;

      // State 15: Insights (Neural Swirl - Brain/Vortex Cloud)
      const t15 = p * Math.PI * 8;
      const r15 = (10 + 10 * p) * (0.8 + 0.2 * Math.sin(t15 * 0.5));
      states[15][i * 3] = r15 * Math.cos(t15);
      states[15][i * 3 + 1] = (p - 0.5) * 50;
      states[15][i * 3 + 2] = r15 * Math.sin(t15);

      // State 16: Gaming (Digital Grid & Infinite Cubes)
      if (p < 0.4) { // Grid floor
        const gridX = ((i % 20) - 10) * 10;
        const gridZ = (Math.floor((i % 400) / 20)) * 10 - 200;
        states[16][i * 3] = gridX; states[16][i * 3 + 1] = -25; states[16][i * 3 + 2] = gridZ;
      } else { // Large floating cubes
        const gcIdx = i % 8;
        const gcx = ((gcIdx % 4) - 1.5) * 40;
        const gcy = (Math.floor(gcIdx / 4) - 0.5) * 40;
        const gcu = (Math.random() - 0.5) * 15;
        const gcv = (Math.random() - 0.5) * 15;
        const gcw = (Math.random() - 0.5) * 15;
        states[16][i * 3] = gcx + gcu; states[16][i * 3 + 1] = gcy + gcv; states[16][i * 3 + 2] = gcw - 100;
      }

      // State 17: Contact (The Celestial Arch - Parabolic Framing Swarm)
      const archX = (p - 0.5) * 110; // Extra wide
      const archY = 18 - (archX * archX) / 100; // Parabola
      const archZ = (Math.random() - 0.5) * 15;
      const archNoise = (Math.random() - 0.5) * 6; // Thick volume
      states[17][i * 3] = archX + archNoise;
      states[17][i * 3 + 1] = archY + archNoise - 5; // Center vertically
      states[17][i * 3 + 2] = archZ;

      // State 18: Connectivity Globe (Contact Page Hero)
      if (p < 0.7) { // The Sphere Shell
        const t18 = Math.random() * Math.PI * 2;
        const p18 = Math.acos((Math.random() * 2) - 1);
        const r18 = 22;
        states[18][i * 3] = r18 * Math.sin(p18) * Math.cos(t18);
        states[18][i * 3 + 1] = r18 * Math.sin(p18) * Math.sin(t18);
        states[18][i * 3 + 2] = r18 * Math.cos(p18);
      } else { // Connection Arcs / Internal nodes
        const t18 = (p - 0.7) / 0.3 * Math.PI * 10;
        const r18 = 22 * (0.8 + 0.2 * Math.sin(t18));
        states[18][i * 3] = r18 * Math.cos(t18);
        states[18][i * 3 + 1] = r18 * Math.sin(t18);
        states[18][i * 3 + 2] = (Math.random() - 0.5) * 5;
      }

      // Common init
      brandOrange.toArray(colors, i * 3);
      positions[i * 3] = states[0][i * 3];
      positions[i * 3 + 1] = states[0][i * 3 + 1];
      positions[i * 3 + 2] = states[0][i * 3 + 2];
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.32,
      vertexColors: true,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // --- Secondary Ambient System (Digital Dust) ---
    const ambientCount = 2000;
    const ambientGeo = new THREE.BufferGeometry();
    const ambientPos = new Float32Array(ambientCount * 3);
    for (let i = 0; i < ambientCount; i++) {
      ambientPos[i * 3] = (Math.random() - 0.5) * 120;
      ambientPos[i * 3 + 1] = (Math.random() - 0.5) * 80;
      ambientPos[i * 3 + 2] = (Math.random() - 0.5) * 60;
    }
    ambientGeo.setAttribute('position', new THREE.BufferAttribute(ambientPos, 3));
    const ambientMat = new THREE.PointsMaterial({
      size: 0.15,
      color: '#7d8cff',
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending
    });
    const ambientParticles = new THREE.Points(ambientGeo, ambientMat);
    scene.add(ambientParticles);
    ambientRef.current = ambientParticles;

    const updateGeometry = (time: number = 0) => {
      const pArr = geometry.attributes.position.array as Float32Array;
      const ss = scrollState.current;

      // Calculate active base indices
      let fromState = states[0];
      let toState = states[0];
      let t = 0; // interpolation factor 0 to 1

      const aspect = window.innerWidth / window.innerHeight;
      const frustumWidth = 76.7 * aspect;
      const rightAlignX = window.innerWidth > 960 ? frustumWidth * 0.25 : 0;
      const isMobile = window.innerWidth < 768;

      // --- Smoothing Helper ---
      const smoothStep = (x: number) => x * x * (3 - 2 * x);

      // Reset base transforms
      particles.rotation.set(0, 0, 0);
      particles.position.set(0, 0, 0);
      const desktopScale = 0.82;
      particles.scale.set(isMobile ? 0.7 : desktopScale, isMobile ? 0.7 : desktopScale, isMobile ? 0.7 : desktopScale);

      // Visibility state
      const isHeroActive = ss.heroProgress < 1 && ss.servicesProgress <= 0;

      if (ss.heroProgress < 1) {
        // Hero waves (0) morphing to first Service (1)
        fromState = states[0];
        toState = states[1];
        // Sharper transition at the end
        t = Math.pow(ss.heroProgress, 3);
        particles.position.x = THREE.MathUtils.lerp(0, rightAlignX, Math.pow(ss.heroProgress, 2));
        particles.position.y = THREE.MathUtils.lerp(0, 0, Math.pow(ss.heroProgress, 2));
        particles.rotation.x = THREE.MathUtils.lerp(0.1, 0, ss.heroProgress);

      } else if (ss.servicesProgress < 1) {
        // Cycling through the 5 Service Logos
        particles.position.x = rightAlignX;
        particles.position.y = 0; // Centered in right container
        const scaled = ss.servicesProgress * 5.0; // 0 to 5
        const index = Math.min(4, Math.floor(scaled));
        const subT = scaled - index;

        // Pause-Morph Implementation: 


        // Smoother, wider morph window (80% window)
        let morphT = 0;
        if (subT > 0.2) {
          const rawT = (subT - 0.2) / 0.8;
          // Quintic easing for fluid start/stop
          morphT = rawT * rawT * rawT * (rawT * (6 * rawT - 15) + 10);
        }
        t = morphT;

        fromState = states[index + 1];
        toState = states[index + 2] || states[6]; // Morph to next icon OR Spotlight


      } else if (ss.spotlightProgress < 1) {
        // Service (5) morphing to Spotlight Planet (6)
        fromState = states[5];
        toState = states[6];
        t = smoothStep(ss.spotlightProgress);
        particles.position.x = THREE.MathUtils.lerp(rightAlignX, 0, ss.spotlightProgress);
        particles.position.y = THREE.MathUtils.lerp(0, -10, ss.spotlightProgress);

      } else if (ss.industriesProgress < 1) {
        // Spotlight Planet (6) morphing into the Industries loop (9-13)
        const totalInd = 5;
        const scaled = ss.industriesProgress * totalInd;

        const indX = window.innerWidth > 960 ? frustumWidth * 0.25 : 0;
        particles.position.x = THREE.MathUtils.lerp(0, indX, Math.min(1, ss.industriesProgress * 5));
        particles.position.y = THREE.MathUtils.lerp(-10, 0, Math.min(1, ss.industriesProgress * 5));

        if (scaled < 1) {
          fromState = states[6];
          toState = states[9];
          t = smoothStep(scaled);
        } else {
          const index = Math.min(3, Math.floor(scaled - 1));
          fromState = states[index + 9];
          toState = states[index + 10];
          t = smoothStep((scaled - 1) - index);
        }

      } else if (ss.successStoriesProgress < 1) {
        // Final Industry (13) morphing to SuccessStories (14)
        fromState = states[13];
        toState = states[14];
        t = smoothStep(ss.successStoriesProgress);
        particles.position.x = THREE.MathUtils.lerp(frustumWidth * 0.25, 0, ss.successStoriesProgress);
        particles.position.y = THREE.MathUtils.lerp(0, 0, ss.successStoriesProgress);

      } else if (ss.insightsProgress < 1) {
        // SuccessStories (14) morphing to Insights Swirl (15)
        fromState = states[14];
        toState = states[15];
        t = smoothStep(ss.insightsProgress);
        particles.rotation.y = time * 0.2;

      } else if (ss.gamingProgress < 1) {
        // InsightsSwirl (15) morphing to Gaming Grid (16)
        fromState = states[15];
        toState = states[16];
        t = smoothStep(ss.gamingProgress);
        particles.rotation.y = time * 0.1;

      } else if (ss.ctaProgress < 1) {
        // Gaming Grid (16) morphing to CTA Torus (7) and then Spiral (19)
        const scaled = ss.ctaProgress * 2.0;
        if (scaled < 1.0) {
          fromState = states[16];
          toState = states[7];
          t = smoothStep(scaled);
        } else {
          fromState = states[7];
          toState = states[19];
          t = smoothStep(scaled - 1.0);
        }
        particles.position.y = 5;
        const breathing = 1.0 + Math.sin(time * 0.8) * 0.05;
        particles.scale.set(breathing, breathing, breathing);

      } else {
        // Spiral (19) morphing to Footer "yoekii" Logo (8)
        fromState = states[19];
        toState = states[8];
        t = smoothStep(ss.footerProgress);
        particles.position.y = THREE.MathUtils.lerp(5, -12, ss.footerProgress);
      }

      // Final Morph Override to Connectivity Globe
      const interpToContact = smoothStep(ss.contactProgress);
      const contactX = window.innerWidth > 900 ? -frustumWidth * 0.2 : 0;

      particles.position.x = THREE.MathUtils.lerp(particles.position.x, contactX, interpToContact);
      particles.position.y = THREE.MathUtils.lerp(particles.position.y, 0, interpToContact);
      particles.rotation.x = THREE.MathUtils.lerp(particles.rotation.x, 0, interpToContact);
      particles.rotation.y += (time * 0.15 * interpToContact); // extra spin for globe

      const homeToContactFrom = fromState;
      const homeToContactTo = toState;
      const homeT = t;

      // Perform interpolation per particle
      for (let i = 0; i < particleCount; i++) {
        const idx = i * 3;
        const xVal = states[0][idx];

        // Dynamic wave logic for State 0
        let waveY = 0;
        if (isHeroActive) {
          const waveWeight = Math.max(0, 1 - ss.heroProgress); // Only active on hero
          const freq = 0.05;
          waveY = 8 * Math.sin(xVal * freq + time * 1.5) * waveWeight;
          waveY += 2 * Math.sin(xVal * freq * 3 + time) * waveWeight;
        }

        let fromX = fromState[idx];
        let fromY = fromState[idx + 1];
        let fromZ = fromState[idx + 2];
        let toX = toState[idx];
        let toY = toState[idx + 1];
        let toZ = toState[idx + 2];

        // --- Gear Rotation Logic (State 3) ---
        if (fromState === states[3] || toState === states[3]) {
          // Rotate around the gear center (0,0) or (8,-8) for small gear
          const rotSpeed = time * 2;
          const isSmallGear = (i / particleCount) > 0.6;
          const cx = isSmallGear ? 8 * 1.4 : 0;
          const cy = isSmallGear ? -8 * 1.4 : 0;

          const rx = fromX - cx; const ry = fromY - cy;
          const s = Math.sin(rotSpeed * (isSmallGear ? -1.5 : 1));
          const c = Math.cos(rotSpeed * (isSmallGear ? -1.5 : 1));

          if (fromState === states[3]) {
            fromX = rx * c - ry * s + cx;
            fromY = rx * s + ry * c + cy;
          }
          if (toState === states[3]) {
            const tx = toX - cx; const ty = toY - cy;
            toX = tx * c - ty * s + cx;
            toY = tx * s + ty * c + cy;
          }
        }

        // --- CTA Torus & Spotlight Planet Rotation (States 6, 7) ---
        if (fromState === states[6] || toState === states[6]) {
          const rotZ = time * 0.15;
          const s = Math.sin(rotZ); const c = Math.cos(rotZ);
          if (fromState === states[6]) { const rx = fromX; fromX = rx * c - fromY * s; fromY = rx * s + fromY * c; }
          if (toState === states[6]) { const tx = toX; toX = tx * c - toY * s; toY = tx * s + toY * c; }
        }

        if (fromState === states[7] || toState === states[7]) {
          const rotY = time * 0.4;
          const s = Math.sin(rotY); const c = Math.cos(rotY);
          if (fromState === states[7]) { const rx = fromX; fromX = rx * c - fromZ * s; fromZ = rx * s + fromZ * c; }
          if (toState === states[7]) { const tx = toX; toX = tx * c - toZ * s; toZ = tx * s + toZ * c; }
        }

        // --- Footer Modern N Swaying (State 8) ---
        if (fromState === states[8] || toState === states[8]) {
          const sway = Math.sin(time * 0.8) * 0.15;
          const s = Math.sin(sway); const c = Math.cos(sway);
          if (fromState === states[8]) { const rx = fromX; fromX = rx * c - fromZ * s; fromZ = rx * s + fromZ * c; }
          if (toState === states[8]) { const tx = toX; toX = tx * c - toZ * s; toZ = tx * s + toZ * c; }
        }

        const homeX = THREE.MathUtils.lerp(fromX, toX, t);
        const homeY = THREE.MathUtils.lerp(fromY, toY, t) + waveY;
        const homeZ = THREE.MathUtils.lerp(fromZ, toZ, t);

        // FINAL BLEND with Globe (State 18)
        pArr[idx] = THREE.MathUtils.lerp(homeX, states[18][idx], interpToContact);
        pArr[idx + 1] = THREE.MathUtils.lerp(homeY, states[18][idx + 1], interpToContact);
        pArr[idx + 2] = THREE.MathUtils.lerp(homeZ, states[18][idx + 2], interpToContact);
      }
      geometry.attributes.position.needsUpdate = true;
    };

    updateRef.current = updateGeometry;

    // Use global custom events so we don't rely on strict DOM mount ordering
    const handleHeroScroll = (e: any) => {
      scrollState.current.heroProgress = e.detail.progress;
      if (!isContactPage) updateGeometry();
    };

    const handleServicesScroll = (e: any) => {
      scrollState.current.servicesProgress = e.detail.progress;
      if (!isContactPage) updateGeometry();
    };

    const handleSpotlightScroll = (e: any) => {
      scrollState.current.spotlightProgress = e.detail.progress;
      if (!isContactPage) updateGeometry();
    };

    const handleIndustriesScroll = (e: any) => {
      scrollState.current.industriesProgress = e.detail.progress;
      if (!isContactPage) updateGeometry();
    };

    const handleCTAScroll = (e: any) => {
      scrollState.current.ctaProgress = e.detail.progress;
      if (!isContactPage) updateGeometry();
    };

    const handleFooterScroll = (e: any) => {
      scrollState.current.footerProgress = e.detail.progress;
      if (!isContactPage) updateGeometry();
    };

    const handleSuccessStoriesScroll = (e: any) => {
      scrollState.current.successStoriesProgress = e.detail.progress;
      if (!isContactPage) updateGeometry();
    };

    const handleInsightsScroll = (e: any) => {
      scrollState.current.insightsProgress = e.detail.progress;
      if (!isContactPage) updateGeometry();
    };

    const handleGamingScroll = (e: any) => {
      scrollState.current.gamingProgress = e.detail.progress;
      if (!isContactPage) updateGeometry();
    };

    window.addEventListener('HERO_SCROLL', handleHeroScroll);
    window.addEventListener('SERVICES_SCROLL', handleServicesScroll);
    window.addEventListener('SPOTLIGHT_SCROLL', handleSpotlightScroll);
    window.addEventListener('INDUSTRIES_SCROLL', handleIndustriesScroll);
    window.addEventListener('SUCCESS_STORIES_SCROLL', handleSuccessStoriesScroll);
    window.addEventListener('INSIGHTS_SCROLL', handleInsightsScroll);
    window.addEventListener('GAMING_SCROLL', handleGamingScroll);
    window.addEventListener('CTA_SCROLL', handleCTAScroll);
    window.addEventListener('FOOTER_SCROLL', handleFooterScroll);

    // ----- Animation Loop -----
    let rafId: number;
    const clock = new THREE.Clock();
    const animate = () => {
      rafId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Only call updateGeometry every frame if wave, globe, or object animations are active
      const ss = scrollState.current;
      const isObjectActive = (ss.industriesProgress > 0 && ss.ctaProgress <= 0) || ss.ctaProgress > 0 || ss.footerProgress > 0;
      const isTransitioning = ss.contactProgress > 0 && ss.contactProgress < 1;
      if ((ss.servicesProgress <= 0 && ss.heroProgress < 1.1) || isObjectActive || isContactPage || isTransitioning) {
      // --- Ambient Drift ---
      if (ambientRef.current) {
        ambientRef.current.rotation.y = elapsedTime * 0.05;
        ambientRef.current.rotation.x = elapsedTime * 0.03;
      }

      // --- Interactive Parallax (Mouse Tilt) ---
      const rotX = mousePos.current.y * 0.15;
      const rotY = mousePos.current.x * 0.15;
      targetRot.current.x = THREE.MathUtils.lerp(targetRot.current.x, rotX, 0.05);
      targetRot.current.y = THREE.MathUtils.lerp(targetRot.current.y, rotY, 0.05);
      particles.rotation.x = targetRot.current.x;
      particles.rotation.y += targetRot.current.y;

      updateGeometry(elapsedTime);
      }

      renderer.render(scene, camera);
    };
    animate();

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mousePos.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('HERO_SCROLL', handleHeroScroll);
      window.removeEventListener('SERVICES_SCROLL', handleServicesScroll);
      window.removeEventListener('SPOTLIGHT_SCROLL', handleSpotlightScroll);
      window.removeEventListener('INDUSTRIES_SCROLL', handleIndustriesScroll);
      window.removeEventListener('SUCCESS_STORIES_SCROLL', handleSuccessStoriesScroll);
      window.removeEventListener('INSIGHTS_SCROLL', handleInsightsScroll);
      window.removeEventListener('GAMING_SCROLL', handleGamingScroll);
      window.removeEventListener('CTA_SCROLL', handleCTAScroll);
      window.removeEventListener('FOOTER_SCROLL', handleFooterScroll);
      cancelAnimationFrame(rafId);
      if (mountRef.current && mountRef.current.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 15,
        pointerEvents: 'none'
      }}
    />
  );
}
