import { useState, useEffect, useRef, useCallback } from 'react';
import { useProfile } from './ProfileContext';
import {
  speak as speakRaw,
  stopSpeaking,
  resolveVoice,
  missingVoiceHint,
  type SpeechSpeed,
} from './speech';

// ─── Hook de lecture pour les écrans ─────────────────────────────────────────
// Remplace `Speech.speak(text, { language: language.ttsLang, rate: 0.85 })`.
// Apporte : l'état "en train de lire" (pour l'UI), l'arrêt automatique au
// démontage de l'écran, et l'avertissement quand aucune voix n'est installée.

export interface UseSpeakerResult {
  /** Lit un mot/une phrase en écriture native. `id` permet d'animer l'item lu. */
  say: (text: string, opts?: { speed?: SpeechSpeed; id?: string }) => void;
  /** Raccourci vitesse lente — la fonction d'écoute la plus utile en pratique. */
  saySlow: (text: string, id?: string) => void;
  stop: () => void;
  isSpeaking: boolean;
  /** Identifiant de l'élément en cours de lecture, pour l'état visuel. */
  speakingId: string | null;
  /** Non nul si aucune voix n'est installée pour la langue active. */
  voiceWarning: string | null;
}

export function useSpeaker(): UseSpeakerResult {
  const { language } = useProfile();
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const [voiceWarning, setVoiceWarning] = useState<string | null>(null);

  // Évite un setState après démontage (l'utilisateur quitte pendant la lecture).
  const mountedRef = useRef(true);
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      stopSpeaking();
    };
  }, []);

  // Vérifie la disponibilité de la voix au changement de langue, avant même
  // que l'utilisateur ait appuyé sur un bouton.
  useEffect(() => {
    let cancelled = false;
    resolveVoice(language.ttsLang).then(res => {
      if (cancelled || !mountedRef.current) return;
      setVoiceWarning(res.status === 'missing' ? missingVoiceHint(language.familiarName) : null);
    });
    return () => { cancelled = true; };
  }, [language.ttsLang, language.familiarName]);

  const say = useCallback((text: string, opts: { speed?: SpeechSpeed; id?: string } = {}) => {
    const { speed = 'normal', id } = opts;
    const marker = id ?? text;
    setSpeakingId(marker);
    speakRaw(text, language.ttsLang, language.code, {
      speed,
      onDone: () => { if (mountedRef.current) setSpeakingId(null); },
      onUnavailable: () => {
        if (!mountedRef.current) return;
        setSpeakingId(null);
        setVoiceWarning(missingVoiceHint(language.familiarName));
      },
    });
  }, [language.ttsLang, language.code, language.familiarName]);

  const saySlow = useCallback((text: string, id?: string) => {
    say(text, { speed: 'slow', id });
  }, [say]);

  const stop = useCallback(() => {
    stopSpeaking();
    if (mountedRef.current) setSpeakingId(null);
  }, []);

  return {
    say,
    saySlow,
    stop,
    isSpeaking: speakingId !== null,
    speakingId,
    voiceWarning,
  };
}
