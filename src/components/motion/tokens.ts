import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'react-native-reanimated';
import { colors } from '../../theme';

// ─── Variables communes des animations ───────────────────────────────────────
// Chaque animation accepte ces variables. `speed` > 1 accélère, < 1 ralentit.
// Si l'utilisateur a demandé de réduire les animations, tout passe à 0 ms.

export interface MotionTheme {
  /** Couleur d'accent (anneaux, barres, confettis). */
  accent?: string;
  /** Fond sombre des superpositions plein écran. */
  surface?: string;
  /** Multiplicateur de vitesse. */
  speed?: number;
}

export const DEFAULT_THEME: Required<MotionTheme> = {
  accent: colors.accent,
  surface: colors.primaryDark,
  speed: 1,
};

/** Durées en ms ajustées à la vitesse et à « réduire les animations ». */
export function useMotionTiming(speed = 1) {
  const reduced = useReducedMotion();
  return (ms: number) => (reduced ? 0 : Math.round(ms / Math.max(0.25, speed)));
}

export const CONFETTI_COLORS = ['#10b981', '#f59e0b', '#3b82f6', '#ef4444', '#8b5cf6', '#14b8a6'];

/** Valeur qui glisse vers `target` (nombre réel), utile pour les compteurs et les anneaux. */
export function useTween(target: number, ms: number): number {
  const [v, setV] = useState(0);
  const from = useRef(0);
  useEffect(() => {
    if (ms <= 0) { from.current = target; setV(target); return; }
    const start = from.current; const t0 = Date.now(); let raf = 0;
    const tick = () => {
      const p = Math.min(1, (Date.now() - t0) / ms);
      const e = 1 - Math.pow(1 - p, 3);
      const cur = start + (target - start) * e;
      from.current = cur; setV(cur);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, ms]);
  return v;
}
