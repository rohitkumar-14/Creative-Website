'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import styles from './CTA.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function CTA() {
  const containerRef = useRef<HTMLElement>(null);
  const handleScrollToContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useGSAP(() => {
    if (!containerRef.current) return;

    ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top bottom', // As soon as CTA appears
      end: 'top top',      // Full morph by the time it reaches top
      scrub: true,
      onUpdate: (self) => {
        window.dispatchEvent(new CustomEvent('CTA_SCROLL', { detail: { progress: self.progress } }));
      }
    });
  }, { scope: containerRef });

  return (
    <section className={styles.ctaSection} ref={containerRef}>
      <div className={styles.container}>
        <div className={styles.secHdn}>
          <h2 className={styles.title}>
            Explore Infinite<br /> Possibilities with Yoekii
          </h2>

          <div className={styles.commPara}>
            <p>
              Have a challenge or a big idea? We&apos;re here to listen, innovate, and make it happen. Reach out today, and let&apos;s start shaping the future of your business.
            </p>
          </div>

          <div className={styles.buttonWrap}>
            <a href="#contact" onClick={handleScrollToContact} className={styles.button}>
              <span className={styles.btnText}>Contact</span>
              <span className={styles.btnIcon}><ArrowRight size={18} color="#fff" strokeWidth={2.5} /></span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
