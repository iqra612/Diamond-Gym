import { useScrollAnimation } from '../hooks/useScrollAnimation';
import './Classes.css';

const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
);

const classData = [
  {
    img: '/class_gravity_cycle.png',
    alt: 'Gravity Cycle high-intensity indoor cycling class',
    tag: 'HIGH INTENSITY',
    duration: '45 MIN',
    level: 'ALL LEVELS',
    name: 'GRAVITY CYCLE',
    desc: 'Ride to the rhythm in our signature cycle studio. Explosive intervals, hill climbs, and full-body conditioning on the bike — no mercy, maximum results.',
    id: 'classLink1',
  },
  {
    img: '/class_core_fusion.png',
    alt: 'Core Fusion intense abdominal and core workout class',
    tag: 'CORE FOCUS',
    duration: '60 MIN',
    level: 'INTERMEDIATE',
    name: 'CORE FUSION',
    desc: 'Forge an ironclad core through a fusion of pilates, functional movement, and strength training. Build the foundation every elite athlete needs.',
    featured: true,
    id: 'classLink2',
  },
  {
    img: '/class_barbell_club.png',
    alt: 'Barbell Club powerlifting and strength class',
    tag: 'POWERLIFTING',
    duration: '75 MIN',
    level: 'ADVANCED',
    name: 'BARBELL CLUB',
    desc: 'The house of iron. Coach-led sessions focused on squat, bench, and deadlift technique. Join a tribe of serious lifters committed to hitting new personal records.',
    id: 'classLink3',
  },
];

const testimonials = [
  {
    id: 'testimonial1',
    text: "Diamond Gym completely transformed my physique and my mindset. Coach Marcus built me a custom program that pushed me harder than I ever thought possible. In 6 months I lost 40 lbs and added 80 lbs to my deadlift. This isn't just a gym — it's a brotherhood. The community here holds you accountable like nothing else.",
    initials: 'JM',
    name: 'James Mitchell',
    role: 'Member since 2022 · Barbell Club',
    featured: true,
  },
  {
    id: 'testimonial2',
    text: "The trainers here are genuinely world-class. My mobility and recovery sessions with Sarah changed how I move entirely. No more back pain, no more tight hips. I perform better at 38 than I did at 28.",
    initials: 'KR',
    name: 'Karen Rodriguez',
    role: 'Member since 2023 · Mobility Sessions',
  },
  {
    id: 'testimonial3',
    text: "Gravity Cycle is literally addictive. The energy in that room, the music, the coaches — I've tried every boutique studio in the city and nothing comes close. Joined for the classes, stayed for the community.",
    initials: 'AL',
    name: 'Aisha Lawson',
    role: 'Member since 2021 · Gravity Cycle',
  },
];

function ClassCard({ item, delay }) {
  const ref = useScrollAnimation(delay);
  return (
    <article
      ref={ref}
      className={`class-card animate-el${item.featured ? ' class-card-featured' : ''}`}
      tabIndex={0}
    >
      <div className="class-img-wrap">
        <img src={item.img} alt={item.alt} className="class-img" loading="lazy" />
        <div className="class-img-overlay" aria-hidden="true" />
        <div className="class-tag">{item.tag}</div>
      </div>
      <div className="class-body">
        <div className="class-meta">
          <span className="class-duration">{item.duration}</span>
          <span className="class-level">{item.level}</span>
        </div>
        <h3 className="class-name">{item.name}</h3>
        <p className="class-desc">{item.desc}</p>
        <a href="#trial" className="class-link" id={item.id}>
          VIEW SCHEDULE <ArrowIcon />
        </a>
      </div>
    </article>
  );
}

function TestimonialCard({ t, delay }) {
  const ref = useScrollAnimation(delay);
  return (
    <blockquote ref={ref} className={`testimonial-card animate-el${t.featured ? ' testimonial-featured' : ''}`} id={t.id}>
      <div className="testimonial-quote-icon" aria-hidden="true">"</div>
      <p className="testimonial-text">{t.text}</p>
      <footer className="testimonial-footer">
        <div className="testimonial-avatar" aria-hidden="true">{t.initials}</div>
        <div className="testimonial-author">
          <cite className="testimonial-name">{t.name}</cite>
          <span className="testimonial-role">{t.role}</span>
        </div>
        <div className="testimonial-rating" aria-label="5 stars">★★★★★</div>
      </footer>
    </blockquote>
  );
}

export default function Classes() {
  const headerRef = useScrollAnimation(0);
  const testimonialsHeaderRef = useScrollAnimation(0);

  return (
    <section id="classes" className="classes section">
      <div className="container">
        <div ref={headerRef} className="section-header animate-el">
          <span className="section-eyebrow">WHAT WE OFFER</span>
          <h2>FEATURED CLASSES</h2>
          <p className="section-sub">From explosive cycle sessions to heavy iron — find the class that ignites your fire.</p>
        </div>

        <div className="classes-grid">
          {classData.map((item, i) => (
            <ClassCard key={item.name} item={item} delay={i * 150} />
          ))}
        </div>

        {/* Testimonials */}
        <div className="testimonials">
          <div ref={testimonialsHeaderRef} className="testimonials-header animate-el">
            <h2 className="testimonials-title">WHAT OUR MEMBERS SAY</h2>
            <div className="testimonials-stars" aria-label="5 out of 5 stars">★★★★★</div>
          </div>
          <div className="testimonials-grid">
            {testimonials.map((t, i) => (
              <TestimonialCard key={t.id} t={t} delay={i * 120} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
