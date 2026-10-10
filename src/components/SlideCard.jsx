/**
 * SlideCard.jsx
 * A letter-card slide with a polaroid photo frame, typewriter caption,
 * and unique decorative accents per slide.
 */
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Typewriter from './Typewriter';

/** Small SVG doodles used as decorations */
const Doodles = {
  sparkle: (props) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M12 0L14.5 9.5 24 12l-9.5 2.5L12 24l-2.5-9.5L0 12l9.5-2.5z" fill="#ffd700" opacity="0.5" />
    </svg>
  ),
  heart: (props) => (
    <svg width="16" height="15" viewBox="0 0 24 22" fill="none" {...props}>
      <path d="M12 22S0 14 0 7c0-3.9 3.1-7 7-7 2.3 0 4.3 1.1 5 2.8C12.7 1.1 14.7 0 17 0c3.9 0 7 3.1 7 7 0 7-12 15-12 15z" fill="#ff6b8a" opacity="0.4" />
    </svg>
  ),
  star: (props) => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M12 2l2.4 7.2H22l-6 4.4 2.4 7.2L12 16.4l-6.4 4.4 2.4-7.2-6-4.4h7.6z" fill="#c96dd8" opacity="0.35" />
    </svg>
  ),
  arrow: (props) => (
    <svg width="30" height="14" viewBox="0 0 40 14" fill="none" {...props}>
      <path d="M2 7h34M30 2l6 5-6 5" stroke="#ff6b8a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.3" />
    </svg>
  ),
};

/**
 * Each slide gets slightly different card colour, tilt, and doodle placement
 * to feel handcrafted.
 */
const SLIDE_STYLES = [
  { bg: '#fde4ec', tilt: -1.5, doodles: [{ Comp: Doodles.sparkle, top: 8, right: 12 }, { Comp: Doodles.heart, bottom: 14, left: 10 }] },
  { bg: '#e8daf5', tilt: 1.2, doodles: [{ Comp: Doodles.star, top: 10, left: 14 }, { Comp: Doodles.arrow, bottom: 18, right: 8 }] },
  { bg: '#fde8d0', tilt: -0.8, doodles: [{ Comp: Doodles.heart, top: 12, right: 16 }, { Comp: Doodles.sparkle, bottom: 10, left: 12 }] },
  { bg: '#fef9ef', tilt: 1.5, doodles: [{ Comp: Doodles.star, top: 8, left: 10 }, { Comp: Doodles.heart, bottom: 16, right: 14 }] },
  { bg: '#f5e0ec', tilt: -1.0, doodles: [{ Comp: Doodles.sparkle, top: 14, left: 8 }, { Comp: Doodles.arrow, bottom: 12, right: 10 }] },
];

function SlideCard({ index, photo, caption }) {
  const style = SLIDE_STYLES[index % SLIDE_STYLES.length];
  const [typingDone, setTypingDone] = useState(false);

  return (
    <motion.div
      className="letter-card"
      style={{
        background: style.bg,
        transform: `rotate(${style.tilt}deg)`,
      }}
    >
      {/* Decorative doodles */}
      {style.doodles.map(({ Comp, ...pos }, i) => (
        <span
          key={i}
          className="doodle"
          style={{ ...pos }}
        >
          <Comp />
        </span>
      ))}

      {/* Polaroid photo */}
      <div className="polaroid-frame">
        <img src={photo} alt={`Photo ${index + 1}`} loading="eager" draggable="false" />
      </div>

      {/* Typed caption */}
      <Typewriter text={caption} speed={30} onComplete={() => setTypingDone(true)} />
    </motion.div>
  );
}

export default SlideCard;
