import { useRef, useCallback } from "react";

export const useAudioMusic = () => {
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  const startMusic = useCallback(() => {
    if (audioCtxRef.current) return;

    const AudioContextClass =
      window.AudioContext || (window as any).webkitAudioContext;

    const audioCtx = new AudioContextClass();

    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.type = "sine";
    oscillator.frequency.value = 100;

    gainNode.gain.value = 0.2;

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillator.start();

    audioCtxRef.current = audioCtx;
    oscillatorRef.current = oscillator;
    gainNodeRef.current = gainNode;
  }, []);

  const updateMusic = useCallback((value: number) => {
    if (!oscillatorRef.current || !audioCtxRef.current) return;

    oscillatorRef.current.frequency.setValueAtTime(
      100 + value * 2,
      audioCtxRef.current.currentTime
    );
  }, []);

  const stopMusic = useCallback(() => {
    if (oscillatorRef.current) {
      oscillatorRef.current.stop();
      oscillatorRef.current.disconnect();
      oscillatorRef.current = null;
    }

    if (audioCtxRef.current) {
      audioCtxRef.current.close();
      audioCtxRef.current = null;
    }
  }, []);

  return {
    startMusic,
    updateMusic,
    stopMusic,
  };
};