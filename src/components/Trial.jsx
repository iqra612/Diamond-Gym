import { useState, useRef } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import './Trial.css';

const perks = [
  '✓ Full gym access for 7 days',
  '✓ Complimentary fitness assessment',
  '✓ 1 free personal training session',
  '✓ Access to all group classes',
];

function validate(fields) {
  const errors = {};
  if (!fields.firstName.trim()) errors.firstName = 'Required.';
  if (!fields.lastName.trim())  errors.lastName  = 'Required.';
  if (!fields.email.trim()) {
    errors.email = 'Required.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
    errors.email = 'Valid email required.';
  }
  return errors;
}

export default function Trial({ onSuccess }) {
  const contentRef = useScrollAnimation(0);
  const formRef    = useScrollAnimation(150);

  const [fields, setFields]     = useState({ firstName: '', lastName: '', email: '', phone: '', goal: '' });
  const [errors, setErrors]     = useState({});
  const [loading, setLoading]   = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields(f => ({ ...f, [name]: value }));
    if (errors[name]) setErrors(er => ({ ...er, [name]: undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate(fields);
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setFields({ firstName: '', lastName: '', email: '', phone: '', goal: '' });
      onSuccess?.();
    }, 1200);
  };

  return (
    <section id="trial" className="trial section">
      <div className="trial-bg" aria-hidden="true" />
      <div className="container">
        <div className="trial-inner">
          <div ref={contentRef} className="trial-content animate-el">
            <span className="section-eyebrow">LIMITED OFFER</span>
            <h2 className="trial-headline">READY TO START YOUR TRANSFORMATION?</h2>
            <p className="trial-sub">Claim your 7-day free trial. No credit card required. Cancel any time.</p>
            <ul className="trial-perks">
              {perks.map(p => <li key={p}>{p}</li>)}
            </ul>
          </div>

          <form
            ref={formRef}
            className="trial-form animate-el"
            id="trialForm"
            noValidate
            onSubmit={handleSubmit}
            aria-label="Free trial sign-up form"
          >
            <h3 className="form-title">CLAIM YOUR FREE TRIAL</h3>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName" className="form-label">First Name</label>
                <input
                  type="text" id="firstName" name="firstName"
                  className={`form-input${errors.firstName ? ' input-error' : ''}`}
                  placeholder="John" value={fields.firstName}
                  onChange={handleChange} autoComplete="given-name"
                />
                {errors.firstName && <span className="field-error">{errors.firstName}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="lastName" className="form-label">Last Name</label>
                <input
                  type="text" id="lastName" name="lastName"
                  className={`form-input${errors.lastName ? ' input-error' : ''}`}
                  placeholder="Doe" value={fields.lastName}
                  onChange={handleChange} autoComplete="family-name"
                />
                {errors.lastName && <span className="field-error">{errors.lastName}</span>}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label">Email Address</label>
              <input
                type="email" id="email" name="email"
                className={`form-input${errors.email ? ' input-error' : ''}`}
                placeholder="john@example.com" value={fields.email}
                onChange={handleChange} autoComplete="email"
              />
              {errors.email && <span className="field-error">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="phone" className="form-label">Phone Number</label>
              <input
                type="tel" id="phone" name="phone"
                className="form-input"
                placeholder="+1 (555) 000-0000" value={fields.phone}
                onChange={handleChange} autoComplete="tel"
              />
            </div>

            <div className="form-group">
              <label htmlFor="goal" className="form-label">Primary Fitness Goal</label>
              <select id="goal" name="goal" className="form-input form-select" value={fields.goal} onChange={handleChange}>
                <option value="">Select your goal...</option>
                <option value="strength">Build Strength &amp; Muscle</option>
                <option value="weight-loss">Weight Loss</option>
                <option value="endurance">Improve Endurance</option>
                <option value="mobility">Mobility &amp; Recovery</option>
                <option value="performance">Athletic Performance</option>
              </select>
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-glow btn-full"
              id="trialSubmitBtn"
              disabled={loading}
            >
              {loading ? 'SUBMITTING...' : <>CLAIM FREE TRIAL NOW <span className="btn-arrow">→</span></>}
            </button>

            <p className="form-disclaimer">
              By submitting, you agree to our <a href="#" className="form-link">Terms</a> and{' '}
              <a href="#" className="form-link">Privacy Policy</a>. We never spam.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
