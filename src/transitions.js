/**
 * transitions.js
 * Five unique Framer Motion transition variant sets for slide changes.
 * Each has enter + exit animations, ~0.9–1.2s duration.
 *
 * 0→1: Liquid wipe (slide left with scale)
 * 1→2: Heart-shaped reveal (zoom + rotate)
 * 2→3: Card flip with sparkles (rotateY)
 * 3→4: Whirl and zoom (spin + scale)
 * 4→finale: Petals sweep (diagonal slide)
 */

const TRANSITIONS = [
  /* ── 0: Liquid wipe ─────────────────────────────────── */
  {
    exit: {
      x: '-110%',
      scale: 0.85,
      opacity: 0,
      transition: { duration: 0.9, ease: [0.65, 0, 0.35, 1] },
    },
    enter: {
      x: ['110%', '0%'],
      scale: [0.85, 1],
      opacity: [0, 1],
      transition: { duration: 0.95, ease: [0.22, 1, 0.36, 1] },
    },
    initial: { x: '110%', scale: 0.85, opacity: 0 },
  },

  /* ── 1: Heart-shaped reveal (zoom + rotate) ─────────── */
  {
    exit: {
      scale: 0.3,
      rotate: 15,
      opacity: 0,
      transition: { duration: 0.9, ease: 'easeIn' },
    },
    enter: {
      scale: [1.4, 1],
      rotate: [-10, 0],
      opacity: [0, 1],
      transition: { duration: 1.0, ease: [0.34, 1.56, 0.64, 1] },
    },
    initial: { scale: 1.4, rotate: -10, opacity: 0 },
  },

  /* ── 2: Card flip (rotateY) ─────────────────────────── */
  {
    exit: {
      rotateY: 90,
      opacity: 0,
      transition: { duration: 0.5, ease: 'easeIn' },
    },
    enter: {
      rotateY: [-90, 0],
      opacity: [0, 1],
      transition: { duration: 1.0, ease: [0.22, 1, 0.36, 1] },
    },
    initial: { rotateY: -90, opacity: 0 },
  },

  /* ── 3: Whirl and zoom ──────────────────────────────── */
  {
    exit: {
      scale: 0.1,
      rotate: 180,
      opacity: 0,
      transition: { duration: 1.0, ease: [0.65, 0, 0.35, 1] },
    },
    enter: {
      scale: [0.1, 1],
      rotate: [-180, 0],
      opacity: [0, 1],
      transition: { duration: 1.1, ease: [0.34, 1.56, 0.64, 1] },
    },
    initial: { scale: 0.1, rotate: -180, opacity: 0 },
  },

  /* ── 4: Petals / diagonal sweep ─────────────────────── */
  {
    exit: {
      x: '-100%',
      y: '40%',
      rotate: -20,
      opacity: 0,
      transition: { duration: 0.9, ease: 'easeIn' },
    },
    enter: {
      x: ['100%', '0%'],
      y: ['-40%', '0%'],
      rotate: [15, 0],
      opacity: [0, 1],
      transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] },
    },
    initial: { x: '100%', y: '-40%', rotate: 15, opacity: 0 },
  },
];

/**
 * Get the transition variants for a given slide index.
 * Wraps around if more than 5 slides are defined.
 */
export function getTransition(index) {
  return TRANSITIONS[index % TRANSITIONS.length];
}

export default TRANSITIONS;
