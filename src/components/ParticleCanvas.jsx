import { useEffect, useRef } from 'react';

/**
 * Canvas-based particle system for the hero section.
 * Renders floating hearts, sparkles, and soft glowing orbs
 * that drift upward with gentle motion.
 */
export default function ParticleCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationId;
    let particles = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Heart shape drawing function
    const drawHeart = (ctx, x, y, size) => {
      ctx.beginPath();
      const topCurveHeight = size * 0.3;
      ctx.moveTo(x, y + topCurveHeight);
      // Left curve
      ctx.bezierCurveTo(
        x, y,
        x - size / 2, y,
        x - size / 2, y + topCurveHeight
      );
      // Left bottom
      ctx.bezierCurveTo(
        x - size / 2, y + (size + topCurveHeight) / 2,
        x, y + (size + topCurveHeight) / 1.2,
        x, y + size
      );
      // Right bottom
      ctx.bezierCurveTo(
        x, y + (size + topCurveHeight) / 1.2,
        x + size / 2, y + (size + topCurveHeight) / 2,
        x + size / 2, y + topCurveHeight
      );
      // Right curve
      ctx.bezierCurveTo(
        x + size / 2, y,
        x, y,
        x, y + topCurveHeight
      );
      ctx.closePath();
    };

    // Create particles
    const createParticle = () => {
      const type = Math.random();
      if (type < 0.35) {
        // Heart particle
        return {
          x: Math.random() * canvas.width,
          y: canvas.height + 20,
          size: Math.random() * 10 + 6,
          speedY: -(Math.random() * 0.6 + 0.2),
          speedX: (Math.random() - 0.5) * 0.3,
          opacity: Math.random() * 0.3 + 0.05,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.01,
          type: 'heart',
          color: `rgba(251, ${Math.floor(113 + Math.random() * 50)}, ${Math.floor(133 + Math.random() * 40)}, `,
        };
      } else if (type < 0.7) {
        // Sparkle/star
        return {
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 1,
          speedY: -(Math.random() * 0.1 + 0.02),
          speedX: (Math.random() - 0.5) * 0.05,
          opacity: Math.random() * 0.6 + 0.1,
          pulseSpeed: Math.random() * 0.02 + 0.01,
          pulseOffset: Math.random() * Math.PI * 2,
          type: 'sparkle',
          color: `rgba(253, ${Math.floor(205 + Math.random() * 50)}, ${Math.floor(77 + Math.random() * 50)}, `,
        };
      } else {
        // Soft glowing orb
        return {
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 40 + 20,
          speedY: (Math.random() - 0.5) * 0.1,
          speedX: (Math.random() - 0.5) * 0.1,
          opacity: Math.random() * 0.04 + 0.01,
          type: 'orb',
          color: Math.random() > 0.5
            ? `rgba(244, 63, 94, `
            : `rgba(212, 168, 83, `,
        };
      }
    };

    // Initialize particles
    for (let i = 0; i < 60; i++) {
      const p = createParticle();
      p.y = Math.random() * canvas.height; // Spread initially
      particles.push(p);
    }

    let time = 0;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.016;

      particles.forEach((p, i) => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.type === 'heart') {
          p.rotation += p.rotationSpeed;
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotation);
          ctx.fillStyle = p.color + p.opacity + ')';
          drawHeart(ctx, 0, -p.size / 2, p.size);
          ctx.fill();
          ctx.restore();

          // Reset when off screen
          if (p.y < -30) {
            p.y = canvas.height + 20;
            p.x = Math.random() * canvas.width;
          }
        } else if (p.type === 'sparkle') {
          const pulse = Math.sin(time * p.pulseSpeed * 60 + p.pulseOffset) * 0.5 + 0.5;
          const currentOpacity = p.opacity * pulse;
          ctx.fillStyle = p.color + currentOpacity + ')';
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * (0.8 + pulse * 0.4), 0, Math.PI * 2);
          ctx.fill();

          if (p.y < -10) {
            p.y = canvas.height + 10;
            p.x = Math.random() * canvas.width;
          }
        } else if (p.type === 'orb') {
          const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
          gradient.addColorStop(0, p.color + p.opacity + ')');
          gradient.addColorStop(1, p.color + '0)');
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();

          // Bounce off edges gently
          if (p.x < -p.size || p.x > canvas.width + p.size) p.speedX *= -1;
          if (p.y < -p.size || p.y > canvas.height + p.size) p.speedY *= -1;
        }
      });

      // Occasionally add new heart particles
      if (Math.random() < 0.02 && particles.length < 80) {
        particles.push(createParticle());
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="hero-particles" />;
}
