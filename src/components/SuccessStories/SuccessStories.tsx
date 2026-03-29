'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import styles from './SuccessStories.module.css';

gsap.registerPlugin(ScrollTrigger);

const storiesData = [
  {
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1080',
    title: 'Amplifying Bug Coverage through Social Forum Insights and BERT',
    desc: 'A global ride-hailing platform was drowning in unstructured user feedback across public forums. Yoekii built a BERT-powered classifier that converted...',
    link: 'https://www.yoekii.tech/success-stories/bug-coverage-social-insights-bert/'
  },
  {
    image: 'https://images.unsplash.com/photo-1551288049-bbbda536339a?auto=format&fit=crop&q=80&w=1080',
    title: 'From Hail to Happy: Reimagining Ride-Share UX with Analytics',
    desc: 'Discover how one of the world’s largest ride-sharing platforms transformed user experience and loyalty by decoding ride cancellations, funnel drop-offs with Yoekii...',
    link: 'https://www.yoekii.tech/success-stories/ride-share-ux-analytics/'
  },
  {
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1080',
    title: 'Driving Cost Efficiency Through Native Payment Wallets',
    desc: 'A global food delivery giant slashed payment processing costs by 85% through native top-up wallets, saving millions in annual revenue with Yoekii...',
    link: 'https://www.yoekii.tech/success-stories/native-wallets-cost-efficiency-strategy/'
  },
  {
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=1080',
    title: 'Accelerating Innovation with Next-Gen Application Modernization',
    desc: 'Yoekii modernized a major investment management firm\'s legacy systems using the Mendix low-code platform, consolidating operations and automating workflows...',
    link: 'https://www.yoekii.tech/success-stories/next-gen-application-modernization-investment-management-firm/'
  }
];

export default function SuccessStories() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollWrapperRef.current) {
      scrollWrapperRef.current.scrollBy({ left: -450, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollWrapperRef.current) {
      scrollWrapperRef.current.scrollBy({ left: 450, behavior: 'smooth' });
    }
  };

  useGSAP(() => {
    if (!sectionRef.current || !scrollWrapperRef.current) return;
    
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top bottom',
      end: 'bottom top',
      onUpdate: (self) => {
        window.dispatchEvent(new CustomEvent('SUCCESS_STORIES_SCROLL', { 
          detail: { progress: self.progress } 
        }));
      }
    });
    // Entrance animations for story cards
    gsap.from(sectionRef.current.querySelectorAll(`.${styles.storyCard}`), {
      y: 40,
      opacity: 0,
      stagger: 0.15,
      duration: 1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 95%',
      }
    });

  }, { scope: sectionRef });

  return (
    <section className={styles.successSection} ref={sectionRef}>
      <div className={styles.container}>
        <div className={styles.secHdn}>
          <h4 className={styles.smallHdn}>Success Stories</h4>
          <h2 className={styles.title}>Real Stories, Real Impact</h2>
          <div className={styles.navButtons}>
            <button onClick={scrollLeft} className={styles.navButton} aria-label="Previous">
              <ArrowLeft size={24} />
            </button>
            <button onClick={scrollRight} className={styles.navButton} aria-label="Next">
              <ArrowRight size={24} />
            </button>
          </div>
        </div>
      </div>

      <div className={styles.sliderOverflow}>
        <div className={styles.scrollWrapper} ref={scrollWrapperRef}>
          {storiesData.map((story, idx) => (
            <div key={idx} className={styles.storyCard}>
              <div className={styles.imageWrap}>
                <Image 
                  src={story.image} 
                  alt={story.title}
                  width={500}
                  height={300}
                  unoptimized // bypassing if domain is dynamic
                  className={styles.storyImage}
                />
              </div>
              <div className={styles.storyInfo}>
                <h3>{story.title}</h3>
                <p>{story.desc}</p>
                <a href={story.link} target="_blank" rel="noopener noreferrer" className={styles.readMore}>
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
