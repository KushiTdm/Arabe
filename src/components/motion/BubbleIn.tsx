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
  useEffect(() => { p.value = withDelay(t(delay), withSpring(1, { damping: 14, stiffness: 170 })); }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const dir = from === 'left' ? -1 : 1;
  const a = useAnimatedStyle(() => ({
    opacity: withTiming(p.value > 0.05 ? 1 : 0, { duration: t(120) }),
    transform: [{ translateX: (1 - p.value) * 36 * dir }, { scale: 0.85 + 0.15 * p.value }] as any,
  }));
  return <Animated.View style={[a, style]}>{children}</Animated.View>;
}
