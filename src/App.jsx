import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Ticker from './components/Ticker';
import Philosophy from './components/Philosophy';
import Classes from './components/Classes';
import Membership from './components/Membership';
import Locations from './components/Locations';
import Trial from './components/Trial';
import Footer from './components/Footer';
import CursorGlow from './components/CursorGlow';

function App() {
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (title, desc) => {
    setToastMessage({ title, desc });
    setTimeout(() => setToastMessage(null), 4000);
  };

  return (
    <>
      <CursorGlow />
      <Navbar />
      
      <main>
        <Hero />
        <Ticker />
        <Philosophy />
        <Classes />
        <Membership />
        <Locations />
        <Trial onSuccess={() => showToast("You're in!", "We'll be in touch within 24 hours.")} />
      </main>

      <Footer onNewsletterSuccess={() => showToast("Subscribed!", "Check your inbox for updates.")} />

      {/* Shared Toast Notification */}
      <div className={`toast${toastMessage ? ' show' : ''}`} role="alert" aria-live="polite" aria-atomic="true">
        <div className="toast-icon" aria-hidden="true">✓</div>
        <div className="toast-content">
          <strong>{toastMessage?.title}</strong>
          <span>{toastMessage?.desc}</span>
        </div>
      </div>
    </>
  );
}

export default App;
