/**
 * Finale.jsx
 * "Happy Birthday, Keshvii" with spring-physics letter-by-letter animation,
 * "Happy 25th" badge, closing line, secret heart, and secret message modal.
 */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import content from '../content';
import Confetti from './Confetti';

/** Split text into individual characters for letter-by-letter animation */
function AnimatedTitle({ text }) {
  const chars = [...text];
  return (
    <motion.div className="finale-title" aria-label={text}>
      {chars.map((char, i) => (
        <motion.span
          key={i}
          style={{ display: 'inline-block', whiteSpace: char === ' ' ? 'pre' : 'normal' }}
          initial={{ y: -80, opacity: 0, rotate: -15 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 15,
            delay: i * 0.06,
          }}
        >
          {char}
        </motion.span>
      ))}
    </motion.div>
  );
}

/** Mini heart burst when the secret heart is tapped */
function HeartBurst({ x, y }) {
  return (
    <div style={{ position: 'fixed', left: x, top: y, pointerEvents: 'none', zIndex: 3000 }}>
      {Array.from({ length: 8 }, (_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const dist = 30 + Math.random() * 20;
        return (
          <motion.span
            key={i}
            style={{ position: 'absolute', fontSize: 14 }}
            initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
            animate={{
              x: Math.cos(angle) * dist,
              y: Math.sin(angle) * dist,
              opacity: 0,
              scale: 0.3,
            }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            💗
          </motion.span>
        );
      })}
    </div>
  );
}

function Finale() {
  const [showSecret, setShowSecret] = useState(false);
  const [burst, setBurst] = useState(null);

  const handleSecretTap = (e) => {
    if (showSecret) {
      setShowSecret(false);
      return;
    }
    const rect = e.currentTarget.getBoundingClientRect();
    setBurst({ x: rect.left + rect.width / 2 - 10, y: rect.top });
    setTimeout(() => setBurst(null), 800);
    setShowSecret(true);
  };

  return (
    <>
      <Confetti active />

      <motion.div
        className="finale-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Title: letter-by-letter with spring */}
        <AnimatedTitle text={content.finaleTitle} />

        {/* Happy 25th badge */}
        <motion.div
          className="finale-badge"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            delay: content.finaleTitle.length * 0.06 + 0.3,
            type: 'spring',
            stiffness: 200,
          }}
        >
          🎂 Happy {content.age}th 🎂
        </motion.div>

        {/* Closing line */}
        <motion.p
          className="closing-line"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: content.finaleTitle.length * 0.06 + 0.8,
            duration: 0.8,
          }}
        >
          {content.closingLine}
        </motion.p>

        {/* Secret heart – slightly different from ambient ones */}
        <motion.span
          className="secret-heart"
          onClick={handleSecretTap}
          whileTap={{ scale: 1.5 }}
          title="💗"
        >
          💝
        </motion.span>
      </motion.div>

      {/* Heart burst animation */}
      {burst && <HeartBurst x={burst.x} y={burst.y} />}

      {/* Secret message modal */}
      <AnimatePresence>
        {showSecret && (
          <motion.div
            className="secret-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={() => setShowSecret(false)}
          >
            <motion.div
              className="secret-note"
              initial={{ scale: 0.8, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 20 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="secret-close"
                onClick={() => setShowSecret(false)}
                aria-label="Close"
              >
                ✕
              </button>
              <p className="secret-text">{content.secretMessage}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Finale;
