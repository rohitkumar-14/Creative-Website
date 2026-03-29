'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { MapPin, Phone } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Footer.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!footerRef.current) return;
    
    ScrollTrigger.create({
      trigger: footerRef.current,
      start: 'top bottom', // As soon as footer appears
      end: 'bottom bottom', // When footer is fully visible
      scrub: true,
      onUpdate: (self) => {
        window.dispatchEvent(new CustomEvent('FOOTER_SCROLL', { detail: { progress: self.progress } }));
      }
    });
  }, { scope: footerRef });

  return (
    <footer className={styles.footer} id="footer" ref={footerRef}>
      <div className={styles.container}>
        <div className={styles.footerWrap}>
          {/* Logo & Company Info */}
          <div className={styles.footerInfo}>
            <div className={styles.footerLogo}>
              <Link href="/">
                <span className={styles.logoText}>YOE<span>KII</span></span>
              </Link>
            </div>
            <p className={styles.desc}>
              Yoekii is a fast-growing, AI-driven digital engineering services company, developing cutting-edge solutions across applications and data.
            </p>
            <div className={styles.contactItem}>
              <MapPin size={20} className={styles.iconOrange} />
              <p>Cupertino, CA 95014-2358, USA</p>
            </div>
            <div className={styles.contactItem}>
              <Phone size={20} className={styles.iconOrange} />
              <a href="tel:+18882075969">+1 (888) 207 5969</a>
            </div>
            <div className={styles.subsidiaries}>
              <h4>Subsidiaries:</h4>
              <a href="https://www.yoekii.tech/yoekii-acquires-experion/" target="_blank" rel="noopener noreferrer">
                Experion Technologies
              </a>
            </div>
          </div>

          {/* Links Columns */}
          <div className={styles.footerLinksGrid}>
            <ul className={styles.linkList}>
              <li className={styles.listHeader}><Link href="/#services">Artificial Intelligence</Link></li>
              <li><Link href="/#services">Gen AI</Link></li>
              <li><Link href="/#services">Agentic AI</Link></li>
              <li><Link href="/#services">AI/ML Solutions</Link></li>
              <li><Link href="/#services">AI/MLOps</Link></li>
            </ul>
            <ul className={styles.linkList}>
              <li className={styles.listHeader}><Link href="/#services">Data & Analytics</Link></li>
              <li><Link href="/#services">Data Engineering</Link></li>
              <li><Link href="/#services">Data Governance</Link></li>
              <li><Link href="/#services">Data Modernization</Link></li>
              <li><Link href="/#services">Data Streaming</Link></li>
              <li><Link href="/#services">Data Annotation</Link></li>
            </ul>
            <ul className={styles.linkList}>
              <li className={styles.listHeader}><Link href="/#services">Intelligent Automation</Link></li>
              <li><Link href="/#services">Low-Code</Link></li>
              <li><Link href="/#services">Process Mining</Link></li>
              <li><Link href="/#services">Smart Workflows</Link></li>
              <li><Link href="/#services">Robotic Process Automation</Link></li>
            </ul>
            <ul className={styles.linkList}>
              <li className={styles.listHeader}><Link href="/#services">Product Engineering</Link></li>
              <li><Link href="/#services">App Modernization</Link></li>
              <li><Link href="/#services">Mobile Development</Link></li>
              <li><Link href="/#services">Cloud Services</Link></li>
            </ul>
            <ul className={styles.linkList}>
              <li className={styles.listHeader}><Link href="/#services">Quality Engineering</Link></li>
              <li><Link href="/#services">IoT Testing</Link></li>
              <li><Link href="/#services">Cloud Migration Testing</Link></li>
              <li><Link href="/#services">Service Virtualization</Link></li>
              <li><Link href="/#services">Performance Testing</Link></li>
              <li><Link href="/#services">Test Automation</Link></li>
            </ul>
            <ul className={styles.linkList}>
              <li className={styles.listHeader}><Link href="/#industries">Industry Expertise</Link></li>
              <li><Link href="/#industries">BFSI</Link></li>
              <li><Link href="/#gaming">Gaming</Link></li>
              <li><Link href="/#industries">Manufacturing</Link></li>
              <li><Link href="/#industries">Healthcare</Link></li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className={styles.footerBottom}>
          <p>© 2026 Yoekii. All rights reserved.</p>
          <div className={styles.bottomLinks}>
            <Link href="/contact">Contact Us</Link>
            <Link href="#">Privacy Policy</Link>
            <Link href="#">Terms of Use</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
