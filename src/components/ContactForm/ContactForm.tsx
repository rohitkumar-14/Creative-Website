'use client';

import React, { useState, useEffect } from 'react';
import { ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import styles from './ContactForm.module.css';

export default function ContactForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [countdown, setCountdown] = useState(5);

  const validate = () => {
    if (!formData.name.trim()) return 'Name is required.';
    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) return 'Valid email is required.';
    if (!formData.message.trim()) return 'Message cannot be empty.';
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const error = validate();
    if (error) {
      setErrorMessage(error);
      setStatus('error');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (!res.ok) throw new Error('Submission failed. Please try again later.');
      
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });

      // Start countdown to redirect home
      const timer = setInterval(() => {
        setCountdown((prev: number) => {
          if (prev <= 1) {
            clearInterval(timer);
            router.push('/');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

    } catch (err: any) {
      setStatus('error');
      setErrorMessage(err.message || 'Something went wrong.');
      // Auto-clear error after 5s
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <div className={`glass-panel ${styles.formContainer}`}>
      <h2 className={styles.heading}>Get in Touch</h2>
      <p className={styles.subtext}>Our team of AI experts usually responds within 24 hours.</p>

      {status === 'success' && (
        <div className={styles.successBanner}>
          <CheckCircle2 size={24} />
          <div>
            <p><strong>Success!</strong> Your message has been sent.</p>
            <p style={{fontSize: '0.8rem', opacity: 0.8}}>Redirecting to Home in {countdown}s...</p>
          </div>
        </div>
      )}

      {status === 'error' && (
        <div className={styles.errorBanner}>
          <AlertCircle size={24} />
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <label htmlFor="name">Full Name</label>
          <input 
            type="text" 
            id="name" 
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            disabled={status === 'loading' || status === 'success'}
            className={styles.input}
            placeholder="John Doe"
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="email">Email Address</label>
          <input 
            type="email" 
            id="email" 
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            disabled={status === 'loading' || status === 'success'}
            className={styles.input}
            placeholder="john@example.com"
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="message">Message</label>
          <textarea 
            id="message" 
            rows={5}
            value={formData.message}
            onChange={(e) => setFormData({...formData, message: e.target.value})}
            disabled={status === 'loading' || status === 'success'}
            className={styles.input}
            placeholder="How can we help you?"
          />
        </div>

        <button 
          type="submit" 
          disabled={status === 'loading' || status === 'success'}
          className="btn-animated"
          style={{width: '100%', justifyContent: 'center', marginTop: '1rem', border: 'none'}}
        >
          <span className="btn-text">
            {status === 'loading' ? 'Sending Request...' : 'Submit Inquiry'}
          </span>
          <div className="icon-circle">
            {status === 'success' ? <CheckCircle2 size={18} /> : <ArrowRight size={18} />}
          </div>
        </button>
      </form>
    </div>
  );
}
