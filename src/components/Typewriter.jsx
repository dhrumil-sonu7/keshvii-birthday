/**
 * Typewriter.jsx
 * Reveals text character-by-character with a soft typing effect.
 * Preserves line breaks (\n) and renders emoji in full colour.
 */
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

function Typewriter({ text, speed = 35, onComplete }) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayed('');
    setDone(false);
    let i = 0;
    const chars = [...text]; // spread handles multi-byte emoji correctly

    const timer = setInterval(() => {
      i++;
      setDisplayed(chars.slice(0, i).join(''));
      if (i >= chars.length) {
        clearInterval(timer);
        setDone(true);
        onComplete?.();
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed]);

  return (
    <motion.p
      className="caption-text"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {displayed}
      {!done && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.6, repeat: Infinity }}
          style={{ color: '#ff6b8a' }}
        >
          |
        </motion.span>
      )}
    </motion.p>
  );
}

export default Typewriter;
