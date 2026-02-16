import { useEffect, useRef } from 'react';

/**
 * CURSOR SPARKLE TRAIL
 * Renders sparkle particles that follow the cursor on desktop.
 * Each sparkle fades and shrinks as it ages, creating a magical trail effect.
 * Disabled on mobile for performance.
 */
export default function CursorSparkle() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animId;
    let particles = [];
    let mouseX = -100;
    let mouseY = -100;

    // Skip on touch devices
    if ('ontouchstart' in window) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const handleMouse = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Spawn sparkle particles at cursor
      for (let i = 0; i < 2; i++) {
        particles.push({
          x: mouseX + (Math.random() - 0.5) * 10,
          y: mouseY + (Math.random() - 0.5) * 10,
          size: Math.random() * 4 + 2,
          life: 1,
          decay: Math.random() * 0.03 + 0.015,
          speedX: (Math.random() - 0.5) * 1.5,
          speedY: (Math.random() - 0.5) * 1.5 - 0.5,
          color: Math.random() > 0.5
            ? [251, 113, 133] // rose
            : [252, 211, 77], // gold
        });
      }
    };

    window.addEventListener('mousemove', handleMouse);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles = particles.filter((p) => p.life > 0);

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.life -= p.decay;
        p.speedY += 0.01; // subtle gravity

        const alpha = p.life * 0.8;
        const size = p.size * p.life;

        // Sparkle glow
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, size * 2);
        gradient.addColorStop(0, `rgba(${p.color[0]}, ${p.color[1]}, ${p.color[2]}, ${alpha})`);
        gradient.addColorStop(1, `rgba(${p.color[0]}, ${p.color[1]}, ${p.color[2]}, 0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, size * 2, 0, Math.PI * 2);
        ctx.fill();

        // Bright center
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.8})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, size * 0.4, 0, Math.PI * 2);
        ctx.fill();
      });

      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouse);
    };
  }, []);

  return <canvas ref={canvasRef} className="sparkle-canvas" />;
}
