import { useRef, useState, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import { useIsMobile } from '../hooks/useIsMobile';

/**
 * PROPOSAL SECTION
 * The big question with YES/NO buttons.
 *
 * NO button behavior:
 * - Desktop: dodges cursor on hover (continuous evasion)
 * - Mobile: jumps to random position on tap attempt
 *
 * YES button triggers the celebration callback.
 */
export default function Proposal({ onYes }) {
  const ref = useRef(null);
  const sectionRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const isMobile = useIsMobile();

  // NO button position state
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [hasDodged, setHasDodged] = useState(false);

  // Get a random safe position within the proposal section
  const getRandomPosition = useCallback(() => {
    const section = sectionRef.current;
    if (!section) return { x: 0, y: 0 };

    const rect = section.getBoundingClientRect();
    const padding = 60;
    const btnWidth = 140;
    const btnHeight = 50;

    const maxX = rect.width - btnWidth - padding * 2;
    const maxY = rect.height - btnHeight - padding * 2;

    return {
      x: (Math.random() * maxX - maxX / 2),
      y: (Math.random() * maxY / 2 - maxY / 4),
    };
  }, []);

  // Desktop: dodge on hover
  const handleNoHover = useCallback(() => {
    if (isMobile) return;
    setHasDodged(true);
    setNoPos(getRandomPosition());
  }, [isMobile, getRandomPosition]);

  // Mobile: dodge on touch start
  const handleNoTouch = useCallback((e) => {
    e.preventDefault();
    setHasDodged(true);
    setNoPos(getRandomPosition());
  }, [getRandomPosition]);

  return (
    <section className="proposal" id="proposal" ref={sectionRef}>
      <motion.div
        ref={ref}
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <motion.div
          className="proposal-ring"
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
        >
          &#128141;
        </motion.div>

        <motion.h2
          className="proposal-question"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          Will you let me be at home forever?
        </motion.h2>

        <motion.p
          className="proposal-sub"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.8 } : {}}
          transition={{ delay: 0.9, duration: 0.8 }}
        >
          I already know my answer... do you?
        </motion.p>

        <motion.div
          className="proposal-buttons"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.2, duration: 0.8 }}
          style={{ minHeight: '160px', position: 'relative', width: '100%', maxWidth: '500px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '32px' }}
        >
          {/* YES button — always stays put */}
          <motion.button
            className="btn-yes"
            onClick={onYes}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
          >
            YES &#10084;&#65039;
          </motion.button>

          {/* NO button — starts inline, goes absolute when dodging */}
          <motion.button
            className="btn-no"
            animate={{
              x: hasDodged ? noPos.x : 0,
              y: hasDodged ? noPos.y : 0,
            }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 20,
            }}
            onHoverStart={handleNoHover}
            onMouseEnter={handleNoHover}
            onTouchStart={handleNoTouch}
            onClick={(e) => {
              e.preventDefault();
              setHasDodged(true);
              setNoPos(getRandomPosition());
            }}
            style={{
              position: hasDodged ? 'absolute' : 'relative',
            }}
          >
            NO &#128546;
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
}
