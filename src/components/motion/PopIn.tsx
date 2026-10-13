import React, { useEffect, type ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSequence, withSpring, withTiming } from 'react-native-reanimated';
import { DEFAULT_THEME, useMotionTiming, type MotionTheme } from './tokens';

// ─── Petit rebond d'apparition ───────────────────────────────────────────────
// À chaque changement de `triggerKey` (ex. un palier validé), l'élément gonfle
// puis se pose. Sert aux pastilles, coches, badges.

export interface PopInProps extends MotionTheme {
  triggerKey?: string | number | boolean;
  /** Échelle maximale atteinte. */
  peak?: number;
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}

export function PopIn({ triggerKey, peak = 1.35, children, style, ...theme }: PopInProps) {
  const { speed } = { ...DEFAULT_THEME, ...theme };
  const t = useMotionTiming(speed);
  const s = useSharedValue(1);
  useEffect(() => {
    s.value = withSequence(withTiming(0.6, { duration: t(1) }), withTiming(peak, { duration: t(160) }), withSpring(1, { damping: 7, stiffness: 190 }));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerKey]);
  const a = useAnimatedStyle(() => ({ transform: [{ scale: s.value }] as any }));
  return <Animated.View style={[a, style]}>{children}</Animated.View>;
}
