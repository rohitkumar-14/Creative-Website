import React from 'react';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';
import styles from './page.module.css';

export default function ContactPage() {
  return (
    <main className={styles.contactPage}>
      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.twoColumn}>
            {/* Left Column: Info & Map */}
            <div className={styles.infoSection}>
              <h1>Get in Touch</h1>
              <p>
                Our experts are ready to help you navigate the future of Agentic AI and complex product engineering. Let&apos;s discuss your next breakthrough.
              </p>
              
              <div className={styles.detailsGrid}>
                <div className={styles.detailItem}>
                  <h3>Global HQ</h3>
                  <p>123 Innovation Drive<br />Silicon Valley, CA 94025</p>
                </div>
                <div className={styles.detailItem}>
                  <h3>Email Us</h3>
                  <p>hello@yoekii.ai<br />support@yoekii.ai</p>
                </div>
                <div className={styles.detailItem}>
                  <h3>Call Us</h3>
                  <p>+1 (555) 000-YKKI<br />+44 20 7946 0123</p>
                </div>
                <div className={styles.detailItem}>
                  <h3>Global Presence</h3>
                  <p>USA | UK | India | Singapore</p>
                </div>
              </div>

              {/* Interactive Map (Embedded) */}
              <div className={styles.mapWrapper}>
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d101408.21773412595!2d-122.151307!3d37.4219999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fba02425dad8f%3A0x6c296c0d4619a6ce!2sStanford%20University!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus" 
                  loading="lazy"
                ></iframe>
              </div>
            </div>

            {/* Right Column: Form */}
            <div className={styles.formWrapper}>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '24px', fontWeight: 600 }}>Message Us</h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
