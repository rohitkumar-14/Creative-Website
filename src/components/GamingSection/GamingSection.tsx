'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './GamingSection.module.css';

gsap.registerPlugin(ScrollTrigger);

const gamesData = [
  {
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1080',
    title: 'Game QA',
    desc: 'Your players demand perfection. So do we.'
  },
  {
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1080',
    title: 'Game Development',
    desc: 'Built for performance. Designed for players.'
  },
  {
    image: 'https://images.unsplash.com/photo-1560253023-3ee5d6448744?auto=format&fit=crop&q=80&w=1080',
    title: 'Specialized Services',
    desc: 'Smart Decisions for big wins.'
  },
  {
    image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&q=80&w=1080',
    title: 'Game Art & Animation',
    desc: 'We turn your vision into reality.'
  }
];

export default function GamingSection() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    gsap.fromTo('.game-box-gsap', {
      scale: 0.9,
      opacity: 0,
    }, {
      scale: 1,
      opacity: 1,
      duration: 0.8,
      stagger: 0.15,
      ease: 'back.out(1.2)',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 75%',
      }
    });

    ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top bottom',
      end: 'bottom top',
      onUpdate: (self) => {
        window.dispatchEvent(new CustomEvent('GAMING_SCROLL', { 
          detail: { progress: self.progress } 
        }));
      }
    });
  }, { scope: containerRef });

  return (
    <section className={styles.gameSection} ref={containerRef}>
      <div className={styles.container}>
        <div className={styles.secHdn}>
          <div className={styles.hdnLogo}>
            <Image 
              src="https://www.yoekii.tech/wp-content/uploads/2025/12/iXie-by-yoekii-logos-02.png" 
              alt="iXie by Yoekii"
              width={200}
              height={80}
              unoptimized
              className={styles.logoImage}
            />
          </div>
        </div>

        <div className={styles.gamesWrap}>
          {gamesData.map((game, idx) => (
            <div key={idx} className={`${styles.gameBox} game-box-gsap`}>
              <div className={styles.gameImg}>
                <Image 
                  src={game.image} 
                  alt={game.title}
                  width={300}
                  height={200}
                  unoptimized
                  className={styles.image}
                />
              </div>
              <div className={styles.gameTxt}>
                <h4>{game.title}</h4>
                <p>{game.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <a href="https://www.ixiegaming.com/" target="_blank" rel="noopener noreferrer" className={styles.buttonBlack}>
          Discover iXie Gaming
        </a>
      </div>
    </section>
  );
}
