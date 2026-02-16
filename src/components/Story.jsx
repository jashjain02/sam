import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

/**
 * STORY SECTION
 * Emotional paragraph describing the relationship journey.
 * Text appears with elegant staggered fade-in animations
 * triggered when section scrolls into view.
 *
 * -------- CUSTOMIZE YOUR MESSAGE BELOW --------
 */

// Edit these to personalize your love story
const STORY_HEADING = "Our Story";

const STORY_PARAGRAPHS = [
  <>
    I still remember the first time I saw you — how everything else seemed to
    fade away, and all that was left was <span className="highlight">you</span>.
    That moment changed everything for me, and I have been falling deeper every
    single day since.
  </>,
  <>
    You taught me what it means to truly love someone — not just with grand
    gestures, but in the quiet moments, the laughter we share, the way your hand
    fits perfectly in mine. Every second with you feels like a{' '}
    <span className="highlight">gift I never want to stop unwrapping</span>.
  </>,
  <>
    I've realised how naturally you've become a part of my everyday life.
    Talking to you feels easy, comforting, and something I genuinely look
    forward to. I feel like I can be completely myself around you without any
    hesitation. There's a sense of <span className="highlight">peace and happiness</span> I
    feel when I'm with you. Honestly, I get that{' '}
    <span className="highlight">homely feeling</span> only with you.
  </>,
];

const STORY_CLOSING = "And now, the question is...";

export default function Story() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  return (
    <section className="story" id="story">
      <motion.div
        ref={ref}
        className="story-container"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        <motion.div className="story-ornament" variants={itemVariants}>
          &#10047;
        </motion.div>

        <motion.h2 className="story-heading" variants={itemVariants}>
          {STORY_HEADING}
        </motion.h2>

        {STORY_PARAGRAPHS.map((paragraph, index) => (
          <motion.p key={index} className="story-text" variants={itemVariants}>
            {paragraph}
          </motion.p>
        ))}

        <motion.div className="story-divider" variants={itemVariants} />

        <motion.p className="story-closing" variants={itemVariants}>
          {STORY_CLOSING}
        </motion.p>
      </motion.div>
    </section>
  );
}
