/**
 * useMusic.js
 * Handles audio playback, mute toggle, and silent failure if file is missing.
 */
import { useRef, useState, useCallback } from 'react';
import content from '../content';

export default function useMusic() {
  const audioRef = useRef(null);
  const [muted, setMuted] = useState(false);
  const [started, setStarted] = useState(false);

  /** Start playback (call on first user tap to satisfy autoplay policy) */
  const startMusic = useCallback(() => {
    if (started) return;
    try {
      const audio = new Audio(content.musicSrc);
      audio.volume = content.musicVolume;
      audio.loop = false;
      audio.play().catch(() => {
        /* File missing or browser blocked – fail silently */
      });
      audioRef.current = audio;
      setStarted(true);
    } catch {
      /* fail silently */
    }
  }, [started]);

  /** Toggle mute / unmute */
  const toggleMute = useCallback(() => {
    if (!audioRef.current) return;
    const next = !muted;
    audioRef.current.muted = next;
    setMuted(next);
  }, [muted]);

  return { muted, started, startMusic, toggleMute };
}
