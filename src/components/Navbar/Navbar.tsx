'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ArrowRight, ChevronDown } from 'lucide-react';
import styles from './Navbar.module.css';

const megaMenuData: Record<string, any[]> = {
  'Who We Are': [
    {
      title: 'Our Story',
      subtitle: 'Building excellence since 1999',
      subItems: ['Vision', 'Milestones', 'History']
    },
    {
      title: 'Leadership',
      subtitle: 'Meet the visionaries',
      subItems: ['Board of Directors', 'Advisory Council']
    },
    {
      title: 'Culture',
      subtitle: 'Innovation at our heart',
      subItems: ['DE&I', 'Employee Experience', 'Community']
    },
    {
      title: 'Global Presence',
      subtitle: 'Scaling impacts worldwide',
      subItems: ['USA', 'UK', 'India', 'Singapore']
    }
  ],
  'What We Do': [
    {
      title: 'Artificial Intelligence',
      subtitle: 'Adaptive intelligence for tomorrow',
      subItems: ['Gen AI', 'Agentic AI', 'AI/ML Solutions', 'AI/MLOps']
    },
    {
      title: 'Data & Analytics',
      subtitle: 'Unlock insights from data',
      subItems: ['Data Engineering', 'Data Visualization', 'Advanced Analytics']
    },
    {
      title: 'Product Engineering',
      subtitle: 'Build scaleable digital products',
      subItems: ['Cloud Native', 'Microservices', 'DevOps']
    },
    {
      title: 'Intelligent Automation',
      subtitle: 'Automate complex workflows',
      subItems: ['RPA', 'Cognitive Automation']
    },
    {
      title: 'Quality Engineering',
      subtitle: 'Ensure zero-defect releases',
      subItems: ['Test Automation', 'Performance Testing']
    }
  ],
  'The Lifter': [
    {
      title: 'AI Platform',
      subtitle: 'The core of our agentic AI',
      subItems: ['Architecture', 'Deployment', 'Security']
    },
    {
      title: 'AI Maturity',
      subtitle: 'Where do you stand?',
      subItems: ['Assessment', 'Roadmap Audit']
    },
    {
      title: 'Efficiency Gains',
      subtitle: 'Quantifying the ROI',
      subItems: ['Case Studies', 'ROI Calculator']
    }
  ],
  'Industries': [
    {
      title: 'BFSI',
      subtitle: 'Banking & Financial Services',
      subItems: ['Fraud Detection', 'Risk Management', 'Customer Experience']
    },
    {
      title: 'Healthcare',
      subtitle: 'Quality patient care',
      subItems: ['Patient 360', 'Prevention Models', 'Compliance']
    },
    {
      title: 'Technology',
      subtitle: 'Accelerating tech growth',
      subItems: ['Digital Natives', 'Product Scaling', 'Cloud Migration']
    },
    {
      title: 'Retail',
      subtitle: 'Personalized retail paths',
      subItems: ['Inventory Optimization', 'Omnichannel Strategy']
    },
    {
      title: 'Manufacturing',
      subtitle: 'Smart manufacturing lines',
      subItems: ['Predictive Maintenance', 'Supply Chain AI']
    }
  ],
  'Subsidiaries': [
    {
      title: 'iXie Gaming',
      subtitle: 'Premier gaming solutions',
      subItems: ['Quality Assurance', 'Dev Services']
    },
    {
      title: 'TapasAI',
      subtitle: 'Our AI consulting arm',
      subItems: ['Strategic Planning', 'Model Fine-Tuning']
    }
  ],
  'Insights': [
    {
      title: 'Resource Center',
      subtitle: 'Expertise at your fingertips',
      subItems: ['Whitepapers', 'E-books', 'Case Studies']
    },
    {
      title: 'Newsroom',
      subtitle: 'Stay updated with Yoekii',
      subItems: ['Press Releases', 'Media Mentions']
    },
    {
      title: 'Knowledge Base',
      subtitle: 'Diving deep into code',
      subItems: ['Engineering Blog', 'Tech Talks']
    }
  ]
};

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMenuEnter = (menuName: string) => {
    setActiveMenu(menuName);
    if (megaMenuData[menuName] && megaMenuData[menuName].length > 0) {
      setActiveCategory(megaMenuData[menuName][0].title);
    }
  };

  const currentSubItems = (activeMenu && activeCategory) 
    ? megaMenuData[activeMenu]?.find(item => item.title === activeCategory)?.subItems || []
    : [];

  const navLinks = [
    'Who We Are', 'What We Do', 'The Lifter', 'Industries', 'Subsidiaries', 'Insights'
  ];

  return (
    <header className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.navContainer}>
        <Link href="/" className={styles.logo}>
          YOE<span>KII</span>
        </Link>

        <nav className={`${styles.desktopNav} ${mobileMenuOpen ? styles.mobileOpen : ''}`}>
          {navLinks.map((label) => {
            const anchorMap: Record<string, string> = {
              'What We Do': '/#services',
              'The Lifter': '/#spotlight',
              'Industries': '/#industries',
              'Insights': '/#insights',
              'Who We Are': '/#home',
              'Subsidiaries': '/#gaming'
            };
            const href = anchorMap[label] || '#';

            return (
              <div 
                key={label} 
                className={styles.navItem} 
                onMouseEnter={() => handleMenuEnter(label)}
                onMouseLeave={() => { setActiveMenu(null); setActiveCategory(null); }}
              >
                <Link href={href} className={styles.navLink}>
                  {label} <ChevronDown size={14} className={styles.dropdownIcon} />
                </Link>
                
                {/* Mega Menu Rendering */}
                {megaMenuData[label] && (
                  <div className={styles.megaMenu}>
                    <div className={styles.menuLeft}>
                      <span className={styles.menuTitle}>{label}</span>
                      <div className={styles.primaryLinks}>
                        {megaMenuData[label].map((item) => (
                          <div 
                            key={item.title} 
                            className={`${styles.primaryLink} ${activeCategory === item.title ? styles.active : ''}`}
                            onMouseEnter={() => setActiveCategory(item.title)}
                          >
                            {item.title}
                            {activeCategory === item.title && <ArrowRight size={20} />}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className={styles.menuRight}>
                      <div className={styles.subLinks}>
                        {currentSubItems.map((sub: string) => (
                          <a key={sub} href="#" className={styles.subLink}>{sub}</a>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          <Link href="/contact" className="btn-animated">
            <span className="btn-text">Contact Us</span>
            <div className="icon-circle">
               <ArrowRight size={18} />
            </div>
          </Link>
        </nav>

        <button className={styles.mobileToggle} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  );
}
