import { useEffect, useRef } from 'react';
import { useCounter } from '../hooks/useCounter';
import './Hero.css';

/* ── Particle canvas ───────────────────────────────────── */
function ParticleCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W, H, particles = [], animId;

    const resize = () => {
      W = canvas.width  = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    };

    class Particle {
      constructor() { this.reset(true); }
      reset(init = false) {
        this.x = Math.random() * W;
        this.y = init ? Math.random() * H : H + 10;
        this.size   = Math.random() * 1.5 + 0.5;
        this.speedY = -(Math.random() * 0.6 + 0.2);
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.opacity  = Math.random() * 0.6 + 0.1;
        this.life     = 0;
        this.maxLife  = Math.random() * 300 + 200;
      }
      update() {
        this.x += this.speedX; this.y += this.speedY; this.life++;
        if (this.y < -10 || this.life > this.maxLife) this.reset();
      }
      draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity * Math.min(1, (this.maxLife - this.life) / 60);
        ctx.fillStyle = Math.random() > 0.85 ? '#FF1E1E' : 'rgba(255,255,255,0.7)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, W, H);
      particles.forEach(p => { p.update(); p.draw(); });
      animId = requestAnimationFrame(animate);
    };

    resize();
    for (let i = 0; i < 120; i++) particles.push(new Particle());
    animate();

    const onResize = () => { resize(); cancelAnimationFrame(animId); animate(); };
    window.addEventListener('resize', onResize);
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', onResize); };
  }, []);

  return <canvas ref={canvasRef} className="particle-canvas" aria-hidden="true" />;
}

/* ── Stat counter item ─────────────────────────────────── */
function StatItem({ count, label }) {
  const { ref, value } = useCounter(count);
  return (
    <div className="stat" ref={ref} role="listitem">
      <div className="stat-row">
        <span className="stat-num">{value.toLocaleString()}</span>
        <span className="stat-plus">+</span>
      </div>
      <span className="stat-label">{label}</span>
    </div>
  );
}

/* ── Hero ──────────────────────────────────────────────── */
export default function Hero() {
  const heroRef = useRef(null);

  // Parallax on scroll
  useEffect(() => {
    const wrapper = document.querySelector('.hero-img-wrapper');
    if (!wrapper) return;
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (window.scrollY < window.innerHeight)
            wrapper.style.transform = `translateY(${window.scrollY * 0.12}px)`;
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (href) => (e) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (!target) return;
    const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h'), 10) || 80;
    window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - navH, behavior: 'smooth' });
  };

  return (
    <section id="hero" className="hero" aria-label="Hero section" ref={heroRef}>
      <ParticleCanvas />

      <div className="hero-container">
        {/* Content */}
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-dot" aria-hidden="true" />
            EST. 2018 &nbsp;·&nbsp; ELITE TRAINING
          </div>

          <h1 className="hero-headline">
            DEFY<br />
            <span className="headline-accent">GRAVITY.</span><br />
            REDEFINE<br />
            LIMITS.
          </h1>

          <p className="hero-sub">
            Experience dynamic, state-of-the-art functional training at Diamond Gym.
            Elevate your strength and performance today.
          </p>

          <div className="hero-actions">
            <a href="#trial" className="btn btn-primary btn-glow" id="heroCtaBtn" onClick={scrollTo('#trial')}>
              CLAIM YOUR FREE TRIAL <span className="btn-arrow">→</span>
            </a>
            <a href="#classes" className="btn btn-ghost" id="heroClassesBtn" onClick={scrollTo('#classes')}>
              EXPLORE CLASSES
            </a>
          </div>

          <div className="hero-stats" role="list" aria-label="Gym statistics">
            <StatItem count={2400} label="Members" />
            <div className="stat-divider" aria-hidden="true" />
            <StatItem count={48}   label="Classes/Week" />
            <div className="stat-divider" aria-hidden="true" />
            <StatItem count={15}   label="Elite Coaches" />
          </div>
        </div>

        {/* Visual */}
        <div className="hero-visual">
          <div className="hero-img-wrapper">
            <div className="hero-img-glow" aria-hidden="true" />
            <img
              src="/gym_hero_athlete.png"
              alt="Elite athlete performing intense overhead press in Diamond Gym"
              className="hero-img"
              loading="eager"
            />
            <div className="hero-img-overlay" aria-hidden="true" />
            <div className="floating-badge floating-badge-1" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#FF1E1E">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              <span>Elite Training</span>
            </div>
            <div className="floating-badge floating-badge-2" aria-hidden="true">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#FF1E1E">
                <path d="M13 2.05v2.02c3.95.49 7 3.85 7 7.93 0 3.21-1.81 6-4.72 7.72L13 17v5h5l-1.22-1.22C19.91 19.07 22 15.76 22 12c0-5.18-3.95-9.45-9-9.95zM11 2.05C5.95 2.55 2 6.82 2 12c0 3.76 2.09 7.07 5.22 8.78L6 22h5v-5l-2.28 2.72C7.01 18.38 6 15.28 6 12c0-4.08 3.05-7.44 7-7.93V2.05z"/>
              </svg>
              <span>500+ Machines</span>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-scroll-indicator" aria-hidden="true">
        <span>SCROLL</span>
        <div className="scroll-line" />
      </div>
    </section>
  );
}
