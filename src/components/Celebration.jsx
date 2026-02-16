import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

/**
 * CELEBRATION OVERLAY
 * Triggered when YES is clicked.
 * - Fires confetti bursts
 * - Animates floating hearts on canvas
 * - Shows romantic message and photo
 *
 * -------- REPLACE THE PHOTO --------
 * Set CELEBRATION_PHOTO to your image path.
 */

const CELEBRATION_PHOTO = "/76170.JPG";
const CELEBRATION_TEXT = "Check the rose in the center 🌹";
const CELEBRATION_SUB = "Here's to forever, together.";
const CELEBRATION_FOOTER = "I love you, endlessly & always";

export default function Celebration() {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Fire multiple confetti bursts
    const fireConfetti = () => {
      const colors = ['#fb7185', '#fda4af', '#fcd34d', '#d4a853', '#f43f5e', '#fecdd3'];

      // Center burst
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.5, x: 0.5 },
        colors,
        gravity: 0.6,
        ticks: 300,
      });

      // Left burst
      setTimeout(() => {
        confetti({
          particleCount: 80,
          angle: 60,
          spread: 70,
          origin: { x: 0, y: 0.6 },
          colors,
          gravity: 0.6,
          ticks: 250,
        });
      }, 300);

      // Right burst
      setTimeout(() => {
        confetti({
          particleCount: 80,
          angle: 120,
          spread: 70,
          origin: { x: 1, y: 0.6 },
          colors,
          gravity: 0.6,
          ticks: 250,
        });
      }, 600);

      // Sparkle shower
      setTimeout(() => {
        confetti({
          particleCount: 200,
          spread: 160,
          origin: { y: 0.1, x: 0.5 },
          colors,
          gravity: 0.4,
          ticks: 400,
          shapes: ['circle'],
          scalar: 0.8,
        });
      }, 1000);
    };

    fireConfetti();

    // Repeat confetti every few seconds
    const interval = setInterval(() => {
      confetti({
        particleCount: 40,
        spread: 80,
        origin: { y: 0.3, x: Math.random() },
        colors: ['#fb7185', '#fda4af', '#fcd34d'],
        gravity: 0.5,
        ticks: 200,
      });
    }, 3000);

    // Heart particle animation on canvas
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const hearts = [];
    for (let i = 0; i < 30; i++) {
      hearts.push({
        x: Math.random() * canvas.width,
        y: canvas.height + Math.random() * 200,
        size: Math.random() * 14 + 8,
        speed: Math.random() * 2 + 0.8,
        drift: (Math.random() - 0.5) * 1,
        opacity: Math.random() * 0.5 + 0.2,
        rotation: Math.random() * Math.PI * 2,
      });
    }

    const drawHeart = (ctx, x, y, size) => {
      ctx.beginPath();
      const t = size * 0.3;
      ctx.moveTo(x, y + t);
      ctx.bezierCurveTo(x, y, x - size / 2, y, x - size / 2, y + t);
      ctx.bezierCurveTo(x - size / 2, y + (size + t) / 2, x, y + (size + t) / 1.2, x, y + size);
      ctx.bezierCurveTo(x, y + (size + t) / 1.2, x + size / 2, y + (size + t) / 2, x + size / 2, y + t);
      ctx.bezierCurveTo(x + size / 2, y, x, y, x, y + t);
      ctx.closePath();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      hearts.forEach((h) => {
        h.y -= h.speed;
        h.x += h.drift + Math.sin(h.y * 0.01) * 0.5;
        h.rotation += 0.01;

        if (h.y < -30) {
          h.y = canvas.height + 20;
          h.x = Math.random() * canvas.width;
        }

        ctx.save();
        ctx.translate(h.x, h.y);
        ctx.rotate(h.rotation);
        ctx.fillStyle = `rgba(251, 113, 133, ${h.opacity})`;
        drawHeart(ctx, 0, -h.size / 2, h.size);
        ctx.fill();
        ctx.restore();
      });

      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      clearInterval(interval);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className="celebration-canvas" />

      <motion.div
        className="celebration-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="celebration-content"
          initial={{ opacity: 0, scale: 0.8, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
        >
          <h2 className="celebration-title">{CELEBRATION_TEXT}</h2>

          <p className="celebration-message">{CELEBRATION_SUB}</p>

          <motion.div
            className="celebration-photo"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            {CELEBRATION_PHOTO ? (
              <img src={CELEBRATION_PHOTO} alt="Us, together forever" />
            ) : (
              <div className="celebration-photo-placeholder">
                <span className="celebration-photo-placeholder-icon">&#128247;&#10084;&#65039;</span>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '1.1rem', fontStyle: 'italic' }}>
                  Your photo here
                </span>
              </div>
            )}
          </motion.div>

          <motion.p
            className="celebration-footer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            {CELEBRATION_FOOTER}
          </motion.p>
        </motion.div>
      </motion.div>
    </>
  );
}
