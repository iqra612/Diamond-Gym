import { useScrollAnimation } from '../hooks/useScrollAnimation';
import './Membership.css';

const plans = [
  {
    name: 'IRON',
    price: '49',
    tagline: 'Start your journey',
    features: [
      { text: 'Gym floor access (6am–10pm)',  included: true  },
      { text: 'Locker room & showers',         included: true  },
      { text: '2 group classes/month',          included: true  },
      { text: 'App & progress tracking',        included: true  },
      { text: 'Personal training sessions',     included: false },
      { text: 'Recovery zone access',           included: false },
      { text: 'Nutrition consulting',           included: false },
    ],
    btnId: 'planBtn1',
  },
  {
    name: 'DIAMOND',
    price: '99',
    tagline: 'Train like a champion',
    featured: true,
    features: [
      { text: '24/7 Gym floor access',          included: true  },
      { text: 'Locker room & showers',          included: true  },
      { text: 'Unlimited group classes',         included: true  },
      { text: 'App & progress tracking',         included: true  },
      { text: '2 PT sessions/month',             included: true  },
      { text: 'Recovery zone access',            included: true  },
      { text: 'Nutrition consulting',            included: false },
    ],
    btnId: 'planBtn2',
  },
  {
    name: 'ELITE',
    price: '179',
    tagline: 'The full experience',
    features: [
      { text: '24/7 Gym floor access',          included: true  },
      { text: 'Locker room & showers',          included: true  },
      { text: 'Unlimited group classes',         included: true  },
      { text: 'App & progress tracking',         included: true  },
      { text: '8 PT sessions/month',             included: true  },
      { text: 'Recovery zone access',            included: true  },
      { text: 'Monthly nutrition consult',       included: true  },
    ],
    btnId: 'planBtn3',
  },
];

function PlanCard({ plan, delay }) {
  const ref = useScrollAnimation(delay);
  return (
    <article
      ref={ref}
      className={`membership-card animate-el${plan.featured ? ' membership-card-featured' : ''}`}
    >
      {plan.featured && <div className="plan-best-value">BEST VALUE</div>}
      <div className="plan-header">
        <h3 className="plan-name">{plan.name}</h3>
        <div className="plan-price">
          <span className="plan-currency">$</span>
          <span className="plan-amount">{plan.price}</span>
          <span className="plan-period">/mo</span>
        </div>
        <p className="plan-tagline">{plan.tagline}</p>
      </div>
      <ul className="plan-features">
        {plan.features.map(f => (
          <li key={f.text} className={`feature-item ${f.included ? 'included' : 'excluded'}`}>{f.text}</li>
        ))}
      </ul>
      <a
        href="#trial"
        className={`btn ${plan.featured ? 'btn-primary btn-glow' : 'btn-ghost'} btn-full`}
        id={plan.btnId}
      >
        START FREE TRIAL
      </a>
    </article>
  );
}

export default function Membership() {
  const headerRef = useScrollAnimation(0);
  return (
    <section id="membership" className="membership section">
      <div className="container">
        <div ref={headerRef} className="section-header animate-el">
          <span className="section-eyebrow">JOIN THE ELITE</span>
          <h2>MEMBERSHIP PLANS</h2>
          <p className="section-sub">No gimmicks. No lock-ins. Choose the plan that fits your ambition.</p>
        </div>
        <div className="membership-grid">
          {plans.map((plan, i) => (
            <PlanCard key={plan.name} plan={plan} delay={i * 150} />
          ))}
        </div>
      </div>
    </section>
  );
}
