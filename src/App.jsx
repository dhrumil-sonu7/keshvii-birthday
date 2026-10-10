/**
 * App.jsx
 * ──────
 * Orchestrates the full birthday-letter experience:
 *
 *   INTRO (envelope) → tap → SLIDES 1–5 → tap heart → RESEALED envelope
 *   → tap → FINALE (confetti, title, secret heart)
 *
 * State machine: 'intro' → 'opening' → 'slides' → 'resealing'
 *                → 'sealed' → 'finale'
 *
 * Music starts on the very first tap (browser autoplay compliance).
 */
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import content from './content';
import { getTransition } from './transitions';

import BackgroundBlobs from './components/BackgroundBlobs';
import AmbientParticles from './components/AmbientParticles';
import Envelope from './components/Envelope';
import SlideCard from './components/SlideCard';
import ProgressHearts from './components/ProgressHearts';
import Finale from './components/Finale';
import useMusic from './hooks/useMusic';

/** Preload next image so it's ready when the user taps Next */
function preloadImage(src) {
  if (!src) return;
  const img = new Image();
  img.src = src;
}

function App() {
  /* ── State machine ───────────────────────────────────────── */
  const [phase, setPhase] = useState('intro');
  // 'intro' | 'opening' | 'slides' | 'resealing' | 'sealed' | 'finale'

  const [slideIndex, setSlideIndex] = useState(0);
  const slides = content.slides;
  const isLastSlide = slideIndex === slides.length - 1;

  const { muted, started, startMusic, toggleMute } = useMusic();

  /* ── Preload the next photo eagerly ──────────────────────── */
  useEffect(() => {
    if (phase === 'slides' && slideIndex < slides.length - 1) {
      preloadImage(slides[slideIndex + 1].photo);
    }
  }, [phase, slideIndex, slides]);

  /* ── Preload first photo when intro mounts ───────────────── */
  useEffect(() => {
    preloadImage(slides[0]?.photo);
  }, [slides]);

  /* ── Handlers ────────────────────────────────────────────── */
  const handleEnvelopeTap = useCallback(() => {
    if (phase === 'intro') {
      startMusic();
      setPhase('opening');
      // After the opening animation (~1.4s), switch to slides
      setTimeout(() => setPhase('slides'), 1400);
    }
  }, [phase, startMusic]);

  const handleSealedTap = useCallback(() => {
    if (phase === 'sealed') {
      setPhase('finale');
    }
  }, [phase]);

  const handleNext = useCallback(() => {
    if (isLastSlide) {
      // Reseal the envelope before finale
      setPhase('resealing');
      setTimeout(() => setPhase('sealed'), 1200);
    } else {
      setSlideIndex((i) => i + 1);
    }
  }, [isLastSlide]);

  const handleReplay = useCallback(() => {
    setPhase('intro');
    setSlideIndex(0);
  }, []);

  /* ── Current slide data ──────────────────────────────────── */
  const currentSlide = slides[slideIndex];
  const trans = getTransition(slideIndex);

  return (
    <>
      {/* Ambient layers */}
      <BackgroundBlobs />
      <AmbientParticles />

      {/* ── Music toggle ─────────────────────────────────── */}
      {started && (
        <button className="music-btn" onClick={toggleMute} aria-label={muted ? 'Unmute' : 'Mute'}>
          {muted ? '🔇' : '🔊'}
        </button>
      )}

      {/* ── Stage ────────────────────────────────────────── */}
      <div className="stage">
        <AnimatePresence mode="wait">

          {/* INTRO: closed envelope */}
          {phase === 'intro' && (
            <Envelope key="env-intro" onTap={handleEnvelopeTap} mode="closed" />
          )}

          {/* OPENING: envelope zooms out, flaps unfold */}
          {phase === 'opening' && (
            <motion.div
              key="opening"
              className="envelope-wrapper"
              initial={{ scale: 1, opacity: 1 }}
              animate={{ scale: 2.5, opacity: 0 }}
              transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
              style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <motion.div className="envelope-container">
                <div className="envelope-body" />
                {/* Flaps fold open during the zoom */}
                <motion.div
                  className="flap flap-top"
                  animate={{ rotateX: -180 }}
                  transition={{ duration: 0.8, delay: 0.1, ease: 'easeInOut' }}
                />
                <motion.div
                  className="flap flap-left"
                  animate={{ rotateY: -180 }}
                  transition={{ duration: 0.7, delay: 0.3, ease: 'easeInOut' }}
                />
                <motion.div
                  className="flap flap-right"
                  animate={{ rotateY: 180 }}
                  transition={{ duration: 0.7, delay: 0.4, ease: 'easeInOut' }}
                />
                <motion.div
                  className="flap flap-bottom"
                  animate={{ rotateX: 180 }}
                  transition={{ duration: 0.6, delay: 0.5, ease: 'easeInOut' }}
                />
              </motion.div>
              {/* Small heart burst */}
              {Array.from({ length: 12 }, (_, i) => {
                const angle = (i / 12) * Math.PI * 2;
                const dist = 50 + Math.random() * 40;
                return (
                  <motion.span
                    key={i}
                    style={{ position: 'absolute', fontSize: 16, pointerEvents: 'none' }}
                    initial={{ x: 0, y: 0, opacity: 1 }}
                    animate={{
                      x: Math.cos(angle) * dist,
                      y: Math.sin(angle) * dist,
                      opacity: 0,
                    }}
                    transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
                  >
                    💗
                  </motion.span>
                );
              })}
            </motion.div>
          )}

          {/* SLIDES */}
          {phase === 'slides' && (
            <motion.div
              key={`slide-${slideIndex}`}
              className="slide-wrapper"
              initial={trans.initial}
              animate={{
                x: 0, y: 0, scale: 1, opacity: 1, rotate: 0, rotateY: 0,
                transition: trans.enter.transition,
              }}
              exit={trans.exit}
              style={{ perspective: 800 }}
            >
              <SlideCard
                index={slideIndex}
                photo={currentSlide.photo}
                caption={currentSlide.caption}
              />

              <ProgressHearts total={slides.length} current={slideIndex} />

              <button className="next-btn" onClick={handleNext}>
                {isLastSlide ? (
                  <>
                    <svg width="20" height="19" viewBox="0 0 24 22" fill="none">
                      <path d="M12 22S0 14 0 7c0-3.9 3.1-7 7-7 2.3 0 4.3 1.1 5 2.8C12.7 1.1 14.7 0 17 0c3.9 0 7 3.1 7 7 0 7-12 15-12 15z" fill="#fff" />
                    </svg>
                  </>
                ) : (
                  'Next →'
                )}
              </button>
            </motion.div>
          )}

          {/* RESEALING: letter folds back into envelope */}
          {phase === 'resealing' && (
            <motion.div
              key="resealing"
              className="envelope-wrapper"
              initial={{ scale: 0.3, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div className="envelope-container">
                <div className="envelope-body" />
                <div className="flap flap-bottom" />
                <div className="flap flap-left" />
                <div className="flap flap-right" />
                <div className="flap flap-top" />
              </motion.div>
            </motion.div>
          )}

          {/* SEALED: envelope with "One last thing" */}
          {phase === 'sealed' && (
            <Envelope key="env-sealed" onTap={handleSealedTap} mode="sealed" />
          )}

          {/* FINALE */}
          {phase === 'finale' && (
            <motion.div
              key="finale"
              style={{ width: '100%', height: '100%' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Finale />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Replay button (visible after intro) ──────────── */}
      {phase !== 'intro' && (
        <button className="replay-btn" onClick={handleReplay} aria-label="Replay">
          ↻
        </button>
      )}
    </>
  );
}

export default App;
