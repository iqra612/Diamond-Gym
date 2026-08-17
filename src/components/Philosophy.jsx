import { useScrollAnimation } from '../hooks/useScrollAnimation';
import './Philosophy.css';

const cards = [
  {
    num: '01',
    title: 'STRENGTH & POWER',
    desc: 'Progressive overload programs engineered by certified strength coaches. Build raw power, explosive force, and unbreakable muscle through proven periodization methods.',
    features: ['Olympic lifting platforms', 'Powerlifting racks & specialty bars', 'Customized strength programs'],
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="24" cy="24" r="22" stroke="#FF1E1E" strokeWidth="1.5" opacity="0.3"/>
        <path d="M8 24h6M34 24h6M14 24c0-5.52 4.48-10 10-10s10 4.48 10 10-4.48 10-10 10-10-4.48-10-10z" stroke="#FF1E1E" strokeWidth="2" strokeLinecap="round"/>
        <path d="M19 24h10M24 19v10" stroke="#FF1E1E" strokeWidth="2.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    num: '02',
    title: 'ENDURANCE & AGILITY',
    desc: 'High-intensity interval training, metabolic conditioning, and sport-specific agility drills designed to push your cardiovascular limits and sharpen reaction time.',
    features: ['HIIT & MetCon classes', 'Agility ladders & sprint tracks', 'VO₂ max assessment tools'],
    featured: true,
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="24" cy="24" r="22" stroke="#FF1E1E" strokeWidth="1.5" opacity="0.3"/>
        <path d="M16 36l4-8 4 4 4-12 4 8" stroke="#FF1E1E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="24" cy="14" r="3" fill="#FF1E1E"/>
      </svg>
    ),
  },
  {
    num: '03',
    title: 'MOBILITY & RECOVERY',
    desc: 'Dedicated recovery zones with expert-led flexibility and mobility sessions. Because elite performance requires elite recovery — prevent injury, move better, feel unstoppable.',
    features: ['Stretch & mobility studio', 'Cold plunge & sauna access', 'Sports massage therapy'],
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="24" cy="24" r="22" stroke="#FF1E1E" strokeWidth="1.5" opacity="0.3"/>
        <path d="M24 10c0 0-8 6-8 14 0 4.42 3.58 8 8 8s8-3.58 8-8c0-8-8-14-8-14z" stroke="#FF1E1E" strokeWidth="2" fill="none"/>
        <path d="M20 28c0 0 1 4 4 4s4-4 4-4" stroke="#FF1E1E" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
];

function PhilosophyCard({ card, delay }) {
  const ref = useScrollAnimation(delay);
  return (
    <article
      ref={ref}
      className={`philosophy-card animate-el${card.featured ? ' card-featured' : ''}`}
      tabIndex={0}
    >
      {card.featured && <div className="card-featured-badge" aria-label="Most popular">MOST POPULAR</div>}
      <div className="card-number" aria-hidden="true">{card.num}</div>
      <div className="card-icon" aria-hidden="true">{card.icon}</div>
      <h3 className="card-title">{card.title}</h3>
      <p className="card-desc">{card.desc}</p>
      <ul className="card-features">
        {card.features.map(f => <li key={f}>{f}</li>)}
      </ul>
      <div className="card-cta">
        <a href="#trial" className="card-link">Learn More <span>→</span></a>
      </div>
      <div className="card-accent-line" aria-hidden="true" />
    </article>
  );
}

export default function Philosophy() {
  const headerRef = useScrollAnimation(0);
  return (
    <section id="philosophy" className="philosophy section">
      <div className="container">
        <div ref={headerRef} className="section-header animate-el">
          <span className="section-eyebrow">OUR APPROACH</span>
          <h2>TRAINING PHILOSOPHY</h2>
          <p className="section-sub">
            We don't believe in one-size-fits-all. Our methodology is built around three pillars
            that unlock your full athletic potential.
          </p>
        </div>
        <div className="philosophy-grid">
          {cards.map((card, i) => (
            <PhilosophyCard key={card.num} card={card} delay={i * 150} />
          ))}
        </div>
      </div>
    </section>
  );
}
