'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import styles from './Insights.module.css';

gsap.registerPlugin(ScrollTrigger);

const insightsData = [
  {
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1080',
    title: 'Introducing The Lifter: An Agentic AI-Powered Application Modernization Platform',
    desc: 'Think of application modernization as a critical upgrade for your organization’s future. As technology advances, competition intensifies...',
    link: 'https://www.yoekii.tech/blog/the-lifter-agentic-for-application-modernization/'
  },
  {
    image: 'https://images.unsplash.com/photo-1576091160550-217359f4b88c?auto=format&fit=crop&q=80&w=1080',
    title: 'Agentic RAG in Healthcare: The Future of Context-Aware Clinical Decision Support',
    desc: 'The Rise of Agentic RAG in Healthcare AI Let’s be honest! Healthcare isn’t suffering from a lack of data with Yoekii...',
    link: 'https://www.yoekii.tech/blog/agentic-rag-in-healthcare/'
  },
  {
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1080',
    title: 'The ROI of Generative AI in Investment Banking: What CXOs Should Expect',
    desc: 'The rise of Generative AI in investment banking is redefining what’s possible with Yoekii, promising both radical efficiency and new avenues...',
    link: 'https://www.yoekii.tech/blog/generative-ai-in-investment-banking/'
  },
  {
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=1080',
    title: 'Agentic AI in Banking & Financial Services: Autonomous Intelligence',
    desc: 'Banking has always been a game of trust, numbers, and timing. But lately, with Yoekii, it’s also become a game of speed...',
    link: 'https://www.yoekii.tech/blog/agentic-ai-in-banking-financial-services/'
  }
];

export default function Insights() {
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

    // Stagger reveal the cards when they scroll into view
    gsap.fromTo('.insight-card-gsap', {
      y: 50,
      opacity: 0,
    }, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%', 
        toggleActions: 'play none none reverse',
      }
    });

    ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top bottom',
      end: 'bottom top',
      onUpdate: (self) => {
        window.dispatchEvent(new CustomEvent('INSIGHTS_SCROLL', { 
          detail: { progress: self.progress } 
        }));
      }
    });
  }, { scope: containerRef });

  return (
    <section className={styles.insightsSection} ref={containerRef}>
      <div className={styles.container}>
        <div className={styles.secHdn}>
          <div className={styles.hdnText}>
            <h2 className={styles.title}>Fresh Takes and Insights</h2>
            <p className={styles.subtitle}>Decoding trends, one byte of knowledge at a time.</p>
          </div>
          <div className={styles.navButtons}>
            <button onClick={scrollLeft} className={styles.navButton} aria-label="Previous">
              <ArrowLeft size={24} />
            </button>
            <button onClick={scrollRight} className={styles.navButton} aria-label="Next">
              <ArrowRight size={24} />
            </button>
          </div>
        </div>

        <div className={styles.gridContainer} ref={scrollRef}>
          {insightsData.map((item, idx) => (
            <div key={idx} className={`${styles.insightCard} insight-card-gsap`}>
              <div className={styles.imageWrap}>
                <Image 
                  src={item.image} 
                  alt={item.title}
                  width={600}
                  height={300}
                  unoptimized // bypassing if domain is dynamic
                  className={styles.insightImage}
                />
              </div>
              <div className={styles.insightInfo}>
                <div>
                  <h3 className={styles.cardTitle}>{item.title}</h3>
                  <p className={styles.cardDesc}>{item.desc}</p>
                </div>
                <a href={item.link} target="_blank" rel="noopener noreferrer" className={styles.readMore}>
                  Read More <ArrowRight size={16} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
