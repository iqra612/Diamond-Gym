import { useScrollAnimation } from '../hooks/useScrollAnimation';
import './Locations.css';

const PinIcon = () => (
  <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="location-pin">
    <path d="M30 5C20.06 5 12 13.06 12 23c0 14.25 18 32 18 32s18-17.75 18-32C48 13.06 39.94 5 30 5zm0 24a7 7 0 110-14 7 7 0 010 14z" fill="#FF1E1E" opacity="0.8"/>
  </svg>
);

const locations = [
  {
    name: 'DOWNTOWN FLAGSHIP',
    address: '42 Iron Street, City Center',
    hours: 'Open 24 / 7',
    size: '18,000 sq ft',
    id: 'locationLink1',
  },
  {
    name: 'WESTSIDE PERFORMANCE',
    address: '108 Muscle Ave, West District',
    hours: '5am – 11pm Daily',
    size: '12,500 sq ft',
    id: 'locationLink2',
  },
  {
    name: 'NORTHGATE STUDIO',
    address: '77 Power Blvd, North End',
    hours: '6am – 10pm Daily',
    size: '9,000 sq ft',
    id: 'locationLink3',
  },
];

function LocationCard({ loc, delay }) {
  const ref = useScrollAnimation(delay);
  return (
    <article ref={ref} className="location-card animate-el" tabIndex={0}>
      <div className="location-map-placeholder" aria-hidden="true">
        <PinIcon />
      </div>
      <div className="location-body">
        <h3 className="location-name">{loc.name}</h3>
        <address className="location-address">{loc.address}</address>
        <p className="location-hours"><strong>Hours:</strong> {loc.hours}</p>
        <p className="location-size"><strong>Size:</strong> {loc.size}</p>
        <a href="#trial" className="card-link" id={loc.id}>Get Directions <span>→</span></a>
      </div>
    </article>
  );
}

export default function Locations() {
  const headerRef = useScrollAnimation(0);
  return (
    <section id="locations" className="locations section">
      <div className="container">
        <div ref={headerRef} className="section-header animate-el">
          <span className="section-eyebrow">FIND US</span>
          <h2>OUR LOCATIONS</h2>
          <p className="section-sub">Three world-class facilities engineered for performance.</p>
        </div>
        <div className="locations-grid">
          {locations.map((loc, i) => (
            <LocationCard key={loc.name} loc={loc} delay={i * 150} />
          ))}
        </div>
      </div>
    </section>
  );
}
