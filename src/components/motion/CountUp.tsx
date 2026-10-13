import React from 'react';
import { Text, type StyleProp, type TextStyle } from 'react-native';
import { DEFAULT_THEME, useMotionTiming, useTween, type MotionTheme } from './tokens';

// ─── Compteur qui monte ──────────────────────────────────────────────────────
// Un nombre (XP, jours de série, score) qui roule jusqu'à sa valeur.

export interface CountUpProps extends MotionTheme {
  value: number;
  prefix?: string;
  suffix?: string;
  /** Durée en ms. */
  duration?: number;
  style?: StyleProp<TextStyle>;
}

export function CountUp({ value, prefix = '', suffix = '', duration = 700, style, ...theme }: CountUpProps) {
  const { speed } = { ...DEFAULT_THEME, ...theme };
  const t = useMotionTiming(speed);
  const v = useTween(value, t(duration));
  return <Text style={style}>{prefix}{Math.round(v)}{suffix}</Text>;
}
