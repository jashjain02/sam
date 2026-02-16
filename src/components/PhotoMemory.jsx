import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

/**
 * PHOTO MEMORY SECTION
 * Displays a photo in a romantic polaroid-style frame
 * with floating heart decorations around it.
 *
 * -------- REPLACE THE PHOTO --------
 * Set PHOTO_URL to your image path (e.g., "/our-photo.jpg" placed in /public)
 * or an external URL.
 */

// Replace with your actual photo path
const PHOTO_URL = "/76173.JPG";
const PHOTO_CAPTION = "You & Me, Always";
const PHOTO_DATE = "The day my heart found its home";
const SECTION_HEADING = "A Moment I'll Never Forget";

// Floating heart positions (decorative)
const FLOATING_HEARTS = [
  { top: '10%', left: '8%', size: '1.5rem', delay: 0 },
  { top: '20%', right: '10%', size: '1.2rem', delay: 1.5 },
  { bottom: '15%', left: '12%', size: '1.8rem', delay: 0.8 },
  { bottom: '25%', right: '8%', size: '1rem', delay: 2.2 },
  { top: '50%', left: '3%', size: '1.3rem', delay: 1 },
  { top: '40%', right: '5%', size: '1.6rem', delay: 1.8 },
];

export default function PhotoMemory() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="photo-section" id="photo">
      {/* Floating decorative hearts */}
      {FLOATING_HEARTS.map((heart, i) => (
        <span
          key={i}
          className="floating-heart"
          style={{
            top: heart.top,
            left: heart.left,
            right: heart.right,
            bottom: heart.bottom,
            fontSize: heart.size,
            animationDelay: `${heart.delay}s`,
          }}
        >
          &#10084;
        </span>
      ))}

      <motion.div
        ref={ref}
        className="photo-container"
        initial={{ opacity: 0, y: 60 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <motion.h2
          className="photo-heading"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          {SECTION_HEADING}
        </motion.h2>

        <motion.div
          className="polaroid"
          initial={{ opacity: 0, rotate: -6, scale: 0.9 }}
          animate={isInView ? { opacity: 1, rotate: -2, scale: 1 } : {}}
          transition={{ delay: 0.4, duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
          whileHover={{ rotate: 0, scale: 1.02 }}
        >
          {PHOTO_URL ? (
            <img src={PHOTO_URL} alt="Our memory together" className="polaroid-image" />
          ) : (
            <div className="polaroid-placeholder">
              <span className="polaroid-placeholder-icon">&#128247;</span>
              <span className="polaroid-placeholder-text">
                Place your photo here
              </span>
            </div>
          )}
          <div className="polaroid-caption">{PHOTO_CAPTION}</div>
        </motion.div>

        <motion.p
          className="photo-date"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.7 } : {}}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          {PHOTO_DATE}
        </motion.p>
      </motion.div>
    </section>
  );
}
