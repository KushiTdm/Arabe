import React, { useEffect, type ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withDelay, withSpring, withTiming } from 'react-native-reanimated';
import { DEFAULT_THEME, useMotionTiming, type MotionTheme } from './tokens';

// ─── Bulle de conversation qui apparaît ──────────────────────────────────────
// Glisse depuis son côté (`from`) en grossissant. Un interlocuteur arrive de la
// gauche, l'élève de la droite.

export interface BubbleInProps extends MotionTheme {
  from?: 'left' | 'right';
  delay?: number;
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}

export function BubbleIn({ from = 'left', delay = 0, children, style, ...theme }: BubbleInProps) {
  const { speed } = { ...DEFAULT_THEME, ...theme };
  const t = useMotionTiming(speed);
  const p = useSharedValue(0);
  const o = useSharedValue(0);
  // Durées calculées ici : un worklet ne peut pas appeler la fonction JS `t`.
  const fadeMs = t(120);
  useEffect(() => {
    p.value = withDelay(t(delay), withSpring(1, { damping: 14, stiffness: 170 }));
    o.value = withDelay(t(delay), withTiming(1, { duration: fadeMs }));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const dir = from === 'left' ? -1 : 1;
  const a = useAnimatedStyle(() => ({
    opacity: o.value,
    transform: [{ translateX: (1 - p.value) * 36 * dir }, { scale: 0.85 + 0.15 * p.value }] as any,
  }));
  return <Animated.View style={[a, style]}>{children}</Animated.View>;
}
