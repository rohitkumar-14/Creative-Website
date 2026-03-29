'use client';

import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import styles from './Industries.module.css';

gsap.registerPlugin(ScrollTrigger);

const industriesData = [
  {
    title: 'Healthcare',
    desc: 'Delivering patient-centric solutions that improve value-based care. From patient 360 to new client onboarding to SDOH models for preventive care, we cover the entire healthcare spectrum.',
    link: 'https://www.yoekii.tech/healthcare/'
  },
  {
    title: 'BFSI',
    desc: 'Enhancing customer experience, risk management, and fraud detection through AI-powered analytics, automation, and secure digital transformation solutions.',
    link: 'https://www.yoekii.tech/bfsi/'
  },
  {
    title: 'Technology',
    desc: 'Empowering tech companies with scalable product engineering, data modernization, and intelligent automation to accelerate innovation and time-to-market.',
    link: 'https://www.yoekii.tech/digital-natives-technology-isvs/'
  },
  {
    title: 'Retail',
    desc: 'Revolutionizing retail experiences with AI-powered personalization, inventory management, and omnichannel solutions that enhance customer engagement and drive growth.',
    link: 'https://www.yoekii.tech/retail/'
  },
  {
    title: 'Manufacturing',
    desc: 'Optimizing production processes and supply chains with smart automation, predictive analytics, and AI-driven decision-making to improve efficiency and reduce costs.',
    link: 'https://www.yoekii.tech/manufacturing/'
  }
];

export default function Industries() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useGSAP(() => {
    if (!containerRef.current || !trackRef.current || !sectionRef.current) return;

    const totalSlides = industriesData.length;
    
    // Pinning the section for scroll duration
    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: `+=${totalSlides * 100}%`,
      pin: true,
      scrub: 1,
      onUpdate: (self) => {
        // Broadcast scroll progress for particles
        window.dispatchEvent(new CustomEvent('INDUSTRIES_SCROLL', { 
          detail: { progress: self.progress } 
        }));

        // Update active index for progress markers
        const index = Math.min(
          totalSlides - 1,
          Math.floor(self.progress * totalSlides * 0.999)
        );
        setActiveIndex(index);

        // Horizontal slide of the text track
        // Calculation: -index * (100 / total_panels_visible)
        // Since only 1 panel is visible at a time (flex: 0 0 100%)
        gsap.to(trackRef.current, {
          xPercent: -index * 100,
          duration: 0.5,
          ease: 'power2.out'
        });
      }
    });

    return () => st.kill();
  }, { scope: sectionRef });

  return (
    <section className={styles.wrapper} ref={sectionRef}>
      <div className={styles.scrollContainer} ref={containerRef}>
        {/* Left Side: Fixed White Area */}
        <div className={styles.leftHalf}>
          <h4 className={styles.smallHdn}>Industries</h4>
          <h2 className={styles.secHdn}>Transforming Industries with Cutting-Edge Innovation</h2>
          <div className={styles.cardPara}>
            <p>At Yoekii, we pride ourselves in driving growth and delivering high-value solutions with unwavering commitment to the unique needs of every industry we serve.</p>
          </div>
        </div>

        {/* Right Side: Black Area for Track & Particles */}
        <div className={styles.rightHalf}>
          <div className={styles.trackWrapper} ref={trackRef}>
            {industriesData.map((item, idx) => (
              <div key={idx} className={styles.slidePanel}>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
                <a href={item.link} target="_blank" rel="noopener noreferrer" className={styles.readMore}>
                  Read More <ArrowRight size={16} />
                </a>
              </div>
            ))}
          </div>

          {/* Segmented Progress Bar */}
          <div className={styles.progressBarContainer}>
            {industriesData.map((_, idx) => (
              <div key={idx} className={styles.progressSegment}>
                <div 
                  className={styles.progressFill}
                  style={{ 
                    transform: `scaleX(${activeIndex === idx ? 1 : 0})`,
                    transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
