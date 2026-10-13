import React, { type ReactNode } from 'react';
import { View } from 'react-native';
import { colors } from '../../theme';
import { DEFAULT_THEME, useMotionTiming, useTween, type MotionTheme } from './tokens';

// ─── Anneau de progression ───────────────────────────────────────────────────
// Un cercle de petits traits qui s'allument de 0 à `value` (0 à 1). Sans SVG.
// `children` se place au centre (score, icône, numéro).

export interface ProgressRingProps extends MotionTheme {
  value: number;
  size?: number;
  /** Épaisseur des traits. */
  stroke?: number;
  trackColor?: string;
  segments?: number;
  duration?: number;
  children?: ReactNode;
}

export function ProgressRing({ value, size = 56, stroke = 5, trackColor = colors.border, segments = 40, duration = 800, children, ...theme }: ProgressRingProps) {
  const { accent, speed } = { ...DEFAULT_THEME, ...theme };
  const t = useMotionTiming(speed);
  const v = useTween(Math.max(0, Math.min(1, value)), t(duration));
  const lit = v * segments;
  const r = size / 2 - stroke / 2;
  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      {Array.from({ length: segments }, (_, i) => {
        const a = (i / segments) * 2 * Math.PI - Math.PI / 2;
        const on = i + 0.5 <= lit;
        return (
          <View
            key={i}
            style={{
              position: 'absolute',
              left: size / 2 + r * Math.cos(a) - stroke / 2,
              top: size / 2 + r * Math.sin(a) - stroke / 2,
              width: stroke, height: stroke, borderRadius: stroke / 2,
              backgroundColor: on ? accent : trackColor,
            }}
          />
        );
      })}
      {children}
    </View>
  );
}
