import { useState } from 'react';
import './App.css';

import Hero from './components/Hero';
import Story from './components/Story';
import PhotoMemory from './components/PhotoMemory';
import Proposal from './components/Proposal';
import Celebration from './components/Celebration';
import CursorSparkle from './components/CursorSparkle';

/**
 * MAIN APP
 * Orchestrates the full romantic proposal experience.
 *
 * Flow: Hero -> Story -> Photo Memory -> Proposal -> (YES) -> Celebration
 *
 * Features:
 * - Cursor sparkle trail on desktop
 * - Background music toggle (optional)
 * - Celebration overlay with confetti on YES
 */

function App() {
  const [saidYes, setSaidYes] = useState(false);

  const handleYes = () => {
    setSaidYes(true);
    // Scroll to top so the celebration is fully visible
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="app">
      {/* Cursor sparkle trail (desktop only) */}
      <CursorSparkle />

      {/* Main sections */}
      <Hero />
      <Story />
      <PhotoMemory />
      <Proposal onYes={handleYes} />

      {/* Celebration overlay — appears when YES is clicked */}
      {saidYes && <Celebration />}
    </div>
  );
}

export default App;
