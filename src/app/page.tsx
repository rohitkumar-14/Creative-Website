import React from 'react';
import ParticleScene from '@/components/ParticleScene';
import ContactForm from '@/components/ContactForm';
import PinnedServices from '@/components/PinnedServices';
import Spotlight from '@/components/Spotlight';
import Industries from '@/components/Industries';
import SuccessStories from '@/components/SuccessStories';
import Insights from '@/components/Insights';
import GamingSection from '@/components/GamingSection';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';
import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.main}>
      {/* Section 1: Hero */}
      <section id="home" className={styles.section} style={{ minHeight: '100vh', justifyContent: 'center' }}>
        <div className="container">
          <div className={styles.heroContent}>
            <h1 className="title" style={{ fontSize: '3.5rem', fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 1.1 }}>
              Tech Debt & Reverse Engineering Costs<br />
              Draining Your Budget?
            </h1>
            <p className="subtitle" style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>
              Yoekii's Agentic AI Platform:
            </p>
            
            <div className={styles.lifterLogoWrapper}>
              <div className={styles.lifterGrid}>
                <div className={styles.gridSquare}></div>
                <div className={styles.gridSquare}></div>
                <div className={styles.gridSquare}></div>
                <div className={styles.gridSquare} style={{ opacity: 0 }}></div>
                <div className={styles.gridSquare}></div>
                <div className={styles.gridSquare}></div>
              </div>
              <div className={styles.lifterText}>
                <span className={styles.theText}>The</span>
                <span className={styles.lifterMain}>Lifter</span>
              </div>
            </div>

            <div className={styles.heroButtons}>
              <a href="#services" className="btn-animated">
                <span className="btn-text">Explore The Lifter</span>
                <div className="icon-circle">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Pinned Services */}
      <PinnedServices />

      {/* Section 2.5: Spotlight */}
      <Spotlight />

      {/* Section 4: Industries */}
      <Industries />

      {/* Section 5: Success Stories */}
      <SuccessStories />

      {/* Section 6: Fresh Takes & Insights */}
      <Insights />

      {/* Section 7: iXie Gaming */}
      <GamingSection />

      {/* Section 8: CTA */}
      <CTA />

      {/* Global Footer */}
      <Footer />
    </main>
  );
}
