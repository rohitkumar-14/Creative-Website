'use client';

import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import styles from './PinnedServices.module.css';

gsap.registerPlugin(ScrollTrigger);

const servicesData = [
  {
    num: '01',
    title: 'Data & Gen AI',
    desc: 'Harness the power of ML models, LLMs, and advanced data modernization techniques to create intelligent systems that drive innovation. Our AI-driven solutions empower enterprises to design new paradigms.',
    iconType: 'chip'
  },
  {
    num: '02',
    title: 'Product Engineering',
    desc: 'Design, develop, and scale next-gen digital products with robust architecture, microservices, and cloud-native technologies. From concept to deployment, we enable accelerated time-to-market.',
    iconType: 'flowchart'
  },
  {
    num: '03',
    title: 'Intelligent Automation',
    desc: 'Streamline operations with robotic process automation, cognitive learning, and autonomous agent workflows.',
    iconType: 'automation'
  },
  {
    num: '04',
    title: 'Quality Engineering',
    desc: 'Ensure robust enterprise systems with continuous testing, load simulation, and automated validation pipelines.',
    iconType: 'quality'
  },
  {
    num: '05',
    title: 'iXie Gaming',
    desc: 'Powering interactive entertainment and immersive simulation through optimized rendering and gameplay loops.',
    iconType: 'gaming'
  }
];

export default function PinnedServices() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollTriggerRef = useRef<ScrollTrigger>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useGSAP(() => {
    if (!containerRef.current) return;

    ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      onUpdate: (self) => {
        // Broadcast to particle scene 
        window.dispatchEvent(new CustomEvent('SERVICES_SCROLL', { detail: { progress: self.progress } }));
        
        // map progress 0-1 to index 0-4
        const newIndex = Math.min(
          servicesData.length - 1,
          Math.floor(self.progress * servicesData.length * 0.99)
        );
        setActiveIndex(newIndex);
      }
    });

    // Handle Hero Scroll seamlessly - MUST query document.getElementById directly, 
    // because GSAP scope confines string selectors to containerRef!
    const homeEl = document.getElementById('home');
    if (homeEl) {
      ScrollTrigger.create({
        trigger: homeEl,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => {
          window.dispatchEvent(new CustomEvent('HERO_SCROLL', { detail: { progress: self.progress } }));
        }
      });
    }

    // Entrance animations removed for debugging
  }, { scope: containerRef });

  return (
    <section className={styles.wrapper} id="services">
      <div className={styles.scrollContainer} ref={containerRef}>
        <div className={styles.stickyArea}>
          <div className={styles.header}>
            <h4>Services</h4>
            <h2>Crafting success through our expertise in AI</h2>
            <p>AI-infused engineering that speaks your language — innovative, efficient, and built to solve real problems.</p>
          </div>
          
          <div className={styles.contentSplit}>
            <div className={styles.leftCol}>
              {servicesData.map((item, index) => {
                const isActive = activeIndex === index;
                return (
                  <div 
                    key={item.num} 
                    className={`${styles.serviceItem} ${isActive ? styles.active : ''}`}
                    onClick={() => setActiveIndex(index)}
                  >
                    <div className={styles.indexNum}>{item.num}</div>
                    <div className={styles.textContent}>
                      <div className={styles.titleRow}>
                        <h3 className={styles.title}>{item.title}</h3>
                        <a href="#" className={styles.readMore}>
                          Read More <ArrowRight size={16} />
                        </a>
                      </div>
                      <div className={styles.dropdownContent}>
                        <p className={styles.description}>{item.desc}</p>
                      </div>
                    </div>
                    {/* Orange right indicator */}
                    <div className={styles.scrollIndicator}>
                      <div 
                        className={styles.scrollProgress} 
                        style={{ 
                           transform: `translateY(${(activeIndex * 100) / servicesData.length}%)` 
                        }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className={styles.rightCol}>
              {/* ParticleScene WebGL handles the rendering behind this empty area */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
