'use client';

import React, { useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowRight as ArrowRightInline } from 'lucide-react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Spotlight.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function Spotlight() {
  const containerRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -400, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 400, behavior: 'smooth' });
    }
  };

  useGSAP(() => {
    if (!containerRef.current) return;
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top bottom', // Start morphing when Spotlight comes into view from bottom
      end: 'top center', // Finish morphing when it's well onto the screen
      scrub: true,
      onUpdate: (self) => {
        window.dispatchEvent(new CustomEvent('SPOTLIGHT_SCROLL', { detail: { progress: self.progress } }));
      }
    });
  }, { scope: containerRef });
  const cards = [
    {
      id: 1,
      sourceLogo: 'THE TIMES OF INDIA',
      title: 'Yoekii expects AI Platform, Legacy Modernization to drive growth',
      linkText: 'Check out the interview',
      image: '/images/spotlight/ai-business.png'
    },
    {
      id: 2,
      sourceLogo: 'Analytics Insight',
      title: 'Agentic AI in Healthcare: Expert Insights from Kodeeswaran Natarajan, Yoekii',
      linkText: 'Listen to the podcast',
      image: '/images/spotlight/ai-healthcare.png'
    },
    {
      id: 3,
      sourceLogo: 'TECHCIRCLE',
      title: 'Human-centric AI is changing the way customers experience technology',
      linkText: 'Read the opinion piece',
      image: '/images/spotlight/human-ai.png'
    }
  ];

  return (
    <section id="spotlight" className={styles.spotlightSection} ref={containerRef}>
      <h2 className={styles.title}>Spotlight</h2>
      <div className={styles.cardsContainer} ref={scrollRef}>
        {cards.map((card) => (
          <div key={card.id} className={styles.card}>
            <div className={styles.imageWrapper}>
              <div className={styles.logoTopLeft}>{card.sourceLogo}</div>
              <div className={styles.logoTopRight}>YOE<span>KII</span></div>
              <Image 
                src={card.image} 
                alt={card.title} 
                className={styles.cardImage} 
                width={600} 
                height={400} 
                style={{ objectFit: 'cover' }}
                priority={card.id === 1}
              />
            </div>
            <div className={styles.cardContent}>
              <h3 className={styles.cardTitle}>{card.title}</h3>
              <a href="#" className={styles.cardLink}>
                {card.linkText} <ArrowRightInline size={16} />
              </a>
            </div>
          </div>
        ))}
      </div>
      
      <div className={styles.navButtons}>
        <button onClick={scrollLeft} className={styles.navButton} aria-label="Previous card">
          <ArrowLeft size={20} />
        </button>
        <button onClick={scrollRight} className={styles.navButton} aria-label="Next card">
          <ArrowRight size={20} />
        </button>
      </div>
    </section>
  );
}
