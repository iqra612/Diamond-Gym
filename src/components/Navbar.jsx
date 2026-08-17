import { useEffect, useState, useRef } from 'react';
import './Navbar.css';

const navItems = [
  { label: 'Training',   href: '#philosophy' },
  { label: 'Classes',    href: '#classes'    },
  { label: 'Membership', href: '#membership' },
  { label: 'Locations',  href: '#locations'  },
];

const DiamondLogo = () => (
  <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" width="36" height="36">
    <polygon points="30,2 58,22 46,56 14,56 2,22" stroke="#FF1E1E" strokeWidth="2.5" fill="none"/>
    <polygon points="30,12 50,26 42,50 18,50 10,26" fill="#FF1E1E" opacity="0.5"/>
  </svg>
);

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    const target = document.querySelector(href);
    if (!target) return;
    const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h'), 10) || 80;
    window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - navH, behavior: 'smooth' });
  };

  return (
    <nav id="navbar" className={`navbar${scrolled ? ' scrolled' : ''}`} role="navigation" aria-label="Main navigation">
      <div className="nav-container">
        <a href="#hero" className="nav-logo" onClick={(e) => handleNavClick(e, '#hero')} aria-label="Diamond Gym Home">
          <DiamondLogo />
          <span>DIAMOND <span className="logo-accent">GYM</span></span>
        </a>

        <button
          className={`hamburger${menuOpen ? ' active' : ''}`}
          id="hamburgerBtn"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          aria-controls="navLinks"
          onClick={() => setMenuOpen(o => !o)}
        >
          <span /><span /><span />
        </button>

        <ul className={`nav-links${menuOpen ? ' open' : ''}`} id="navLinks" role="list">
          {navItems.map(({ label, href }) => (
            <li key={href}>
              <a href={href} className="nav-link" onClick={(e) => handleNavClick(e, href)}>{label}</a>
            </li>
          ))}
        </ul>

        <a href="#trial" className="btn btn-primary btn-glow nav-cta" id="navCtaBtn" onClick={(e) => handleNavClick(e, '#trial')}>
          GET STARTED
        </a>
      </div>
    </nav>
  );
}
