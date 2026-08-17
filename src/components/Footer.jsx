import { useState } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import './Footer.css';

const DiamondLogo = () => (
  <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" width="36" height="36">
    <polygon points="30,2 58,22 46,56 14,56 2,22" stroke="#FF1E1E" strokeWidth="2.5" fill="none"/>
    <polygon points="30,12 50,26 42,50 18,50 10,26" fill="#FF1E1E" opacity="0.5"/>
  </svg>
);

const socialLinks = [
  {
    id: 'socialInstagram', label: 'Follow us on Instagram',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>,
  },
  {
    id: 'socialFacebook', label: 'Follow us on Facebook',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>,
  },
  {
    id: 'socialTwitter', label: 'Follow us on Twitter',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>,
  },
  {
    id: 'socialYoutube', label: 'Subscribe on YouTube',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>,
  },
];

const scrollTo = (href) => (e) => {
  e.preventDefault();
  const target = document.querySelector(href);
  if (!target) return;
  const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h'), 10) || 80;
  window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - navH, behavior: 'smooth' });
};

export default function Footer({ onNewsletterSuccess }) {
  const [email, setEmail]       = useState('');
  const [emailError, setEmailError] = useState('');
  const [sent, setSent]         = useState(false);
  const ref = useScrollAnimation(0);

  const handleNewsletter = (e) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError('Enter a valid email.');
      return;
    }
    setEmailError('');
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setEmail('');
      onNewsletterSuccess?.();
    }, 2000);
  };

  return (
    <footer className="footer" role="contentinfo">
      <div className="footer-glow" aria-hidden="true" />
      <div className="container">
        <div ref={ref} className="footer-grid animate-el">
          {/* Brand */}
          <div className="footer-brand">
            <a href="#hero" className="nav-logo footer-logo" onClick={scrollTo('#hero')} aria-label="Diamond Gym Home">
              <DiamondLogo />
              <span>DIAMOND <span className="logo-accent">GYM</span></span>
            </a>
            <p className="footer-tagline">Where champions are forged. Push beyond your limits every single day.</p>
            <div className="social-links" role="list" aria-label="Social media links">
              {socialLinks.map(s => (
                <a key={s.id} href="#" className="social-link" id={s.id} role="listitem"
                  aria-label={s.label} target="_blank" rel="noopener noreferrer">
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Training nav */}
          <nav className="footer-nav" aria-label="Footer navigation - Training">
            <h4 className="footer-nav-title">TRAINING</h4>
            <ul role="list">
              {['Strength & Power','Endurance & Agility','Mobility & Recovery','Personal Training','Group Classes'].map(label => (
                <li key={label}>
                  <a href="#philosophy" className="footer-link" onClick={scrollTo('#philosophy')}>{label}</a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Membership nav */}
          <nav className="footer-nav" aria-label="Footer navigation - Membership">
            <h4 className="footer-nav-title">MEMBERSHIP</h4>
            <ul role="list">
              {[
                { label: 'Iron Plan',   href: '#membership' },
                { label: 'Diamond Plan',href: '#membership' },
                { label: 'Elite Plan',  href: '#membership' },
                { label: 'Free Trial',  href: '#trial'      },
                { label: 'Locations',   href: '#locations'  },
              ].map(({ label, href }) => (
                <li key={label}>
                  <a href={href} className="footer-link" onClick={scrollTo(href)}>{label}</a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Newsletter */}
          <div className="footer-newsletter">
            <h4 className="footer-nav-title">STAY IN THE ZONE</h4>
            <p className="footer-newsletter-text">Get training tips, class updates, and exclusive offers delivered to your inbox.</p>
            <form className="newsletter-form" id="newsletterForm" noValidate onSubmit={handleNewsletter} aria-label="Newsletter sign-up">
              <div className="newsletter-input-wrap">
                <input
                  type="email" id="newsletterEmail" name="email"
                  className="newsletter-input"
                  placeholder="your@email.com"
                  value={email} onChange={e => { setEmail(e.target.value); setEmailError(''); }}
                  aria-label="Email for newsletter"
                />
                <button type="submit" className={`newsletter-btn${sent ? ' sent' : ''}`} id="newsletterSubmitBtn" aria-label="Subscribe">
                  {sent
                    ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                    : <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  }
                </button>
              </div>
              {emailError && <span className="field-error" style={{marginTop:'6px',display:'block'}}>{emailError}</span>}
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom">
          <p className="footer-copy">&copy; 2026 Diamond Gym. All rights reserved. Built for those who refuse to quit.</p>
          <div className="footer-legal" role="list">
            {['Privacy Policy','Terms of Service','Cookie Policy'].map(label => (
              <a key={label} href="#" className="footer-link footer-legal-link" role="listitem">{label}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
