/**
 * Envelope.jsx
 * Pastel envelope with crisscross flaps that unfold in 3D on tap.
 * Two modes:
 *   - "closed" with intro hint
 *   - "sealed" (after slides, before finale) with "One last thing" hint
 */
import React from 'react';
import { motion } from 'framer-motion';
import content from '../content';

/** Small heart SVG for the seal */
const HeartSeal = () => (
  <svg
    width="28" height="26" viewBox="0 0 28 26" fill="none"
    style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 10 }}
  >
    <path
      d="M14 26S0 16.5 0 8.5C0 3.8 3.8 0 8.5 0c2.7 0 5.2 1.3 6.5 3.4C16.3 1.3 18.8 0 21.5 0 26.2 0 28 3.8 28 8.5 28 16.5 14 26 14 26z"
      fill="#ff6b8a"
    />
  </svg>
);

function Envelope({ onTap, mode = 'closed' }) {
  const hintText = mode === 'sealed' ? 'One last thing' : content.introHint;

  return (
    <motion.div
      className="envelope-wrapper"
      onClick={onTap}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.6 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="envelope-glow" />

      <motion.div
        className="envelope-container"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="envelope-body" />

        {/* Flap – bottom (behind) */}
        <div className="flap flap-bottom" />

        {/* Flap – left */}
        <div className="flap flap-left" />

        {/* Flap – right */}
        <div className="flap flap-right" />

        {/* Flap – top (front, triangular) */}
        <div className="flap flap-top" />

        {/* Heart seal */}
        <HeartSeal />
      </motion.div>

      <motion.p
        className="intro-hint"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        {hintText}
      </motion.p>
    </motion.div>
  );
}

export default Envelope;
