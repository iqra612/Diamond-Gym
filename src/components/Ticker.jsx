import './Ticker.css';

const words = [
  'STRENGTH & POWER', 'ENDURANCE TRAINING', 'MOBILITY & RECOVERY',
  'ELITE COACHING', 'GRAVITY CYCLE', 'BARBELL CLUB',
  'CORE FUSION', 'PREMIUM EQUIPMENT',
];

export default function Ticker() {
  // Duplicate for seamless loop
  const items = [...words, ...words];
  return (
    <div className="ticker-wrap" aria-hidden="true">
      <div className="ticker-track">
        {items.map((word, i) => (
          <span key={i} className={i % (words.length * 2) === words.length ? 'ticker-group' : ''}>
            {word}
            <span className="ticker-sep">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
