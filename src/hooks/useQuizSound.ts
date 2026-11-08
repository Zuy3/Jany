import { useState, useCallback } from 'react';
import useSound from 'use-sound';

export function useQuizSound() {
  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('zuy_quiz_sound_enabled');
      return saved !== null ? saved === 'true' : true;
    } catch {
      return true;
    }
  });

  const toggleSound = useCallback(() => {
    setSoundEnabled((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('zuy_quiz_sound_enabled', String(next));
      } catch {
        // ignore
      }
      return next;
    });
  }, []);

  // use-sound with gentle volumes to maintain subtlety
  const [playTapSound] = useSound('./sounds/tap.wav', {
    volume: 0.22,
    soundEnabled,
  });

  const [playStepSound] = useSound('./sounds/step.wav', {
    volume: 0.28,
    soundEnabled,
  });

  const [playSuccessSound] = useSound('./sounds/success.wav', {
    volume: 0.35,
    soundEnabled,
  });

  const playTap = useCallback(() => {
    if (!soundEnabled) return;
    try {
      playTapSound();
    } catch (e) {
      // safe fallback if audio context blocked
    }
  }, [playTapSound, soundEnabled]);

  const playStep = useCallback(() => {
    if (!soundEnabled) return;
    try {
      playStepSound();
    } catch (e) {
      // safe fallback
    }
  }, [playStepSound, soundEnabled]);

  const playSuccess = useCallback(() => {
    if (!soundEnabled) return;
    try {
      playSuccessSound();
    } catch (e) {
      // safe fallback
    }
  }, [playSuccessSound, soundEnabled]);

  return {
    soundEnabled,
    toggleSound,
    playTap,
    playStep,
    playSuccess,
  };
}
