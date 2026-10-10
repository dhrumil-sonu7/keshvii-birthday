/**
 * AmbientParticles.jsx
 * Floating mini hearts and cakes that drift upward with sway.
 * Renders ~30 items at 10–16 px, 15–25 % opacity.
 * Respects prefers-reduced-motion via CSS.
 */
import React, { useMemo } from 'react';

const EMOJIS = ['🎂', '💗', '🎂', '💕', '🎂', '❤️', '🎂', '💖'];

function AmbientParticles() {
  const particles = useMemo(() => {
    return Array.from({ length: 30 }, (_, i) => {
      const emoji = EMOJIS[i % EMOJIS.length];
      const size = 10 + Math.random() * 6; // 10–16px
      const left = Math.random() * 100; // 0–100%
      const duration = 16 + Math.random() * 14; // 16–30s
      const delay = Math.random() * -30; // stagger
      const swayX = -15 + Math.random() * 30; // slight sway
      const opacity = 0.15 + Math.random() * 0.10; // 15–25%

      return { id: i, emoji, size, left, duration, delay, swayX, opacity };
    });
  }, []);

  return (
    <div className="ambient-particles" aria-hidden="true">
      {particles.map((p) => (
        <span
          key={p.id}
          className="ambient-particle"
          style={{
            left: `${p.left}%`,
            fontSize: `${p.size}px`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            opacity: p.opacity,
            '--sway': `${p.swayX}px`,
          }}
        >
          {p.emoji}
        </span>
      ))}
    </div>
  );
}

export default React.memo(AmbientParticles);
