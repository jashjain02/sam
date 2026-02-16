import { useState, useEffect } from 'react';

/**
 * Detect if the user is on a mobile/touch device.
 * Used to switch between hover-dodge (desktop) and tap-dodge (mobile) for the NO button.
 */
export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => {
      const hasTouchScreen = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isNarrow = window.innerWidth <= 768;
      setIsMobile(hasTouchScreen || isNarrow);
    };

    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return isMobile;
}
