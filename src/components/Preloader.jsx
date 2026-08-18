import { useEffect, useState } from 'react';
import './Preloader.css';

const DiamondLogo = () => (
  <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" width="60" height="60">
    <polygon points="30,2 58,22 46,56 14,56 2,22" stroke="#FF1E1E" strokeWidth="2.5" fill="none"/>
    <polygon points="30,12 50,26 42,50 18,50 10,26" fill="#FF1E1E" opacity="0.2"/>
  </svg>
);

export default function Preloader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 900);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div id="preloader" className={visible ? '' : 'hidden'} aria-hidden="true">
      <div className="preloader-inner">
        <div className="preloader-diamond">
          <DiamondLogo />
        </div>
        <span className="preloader-text">DIAMOND GYM</span>
      </div>
    </div>
  );
}
