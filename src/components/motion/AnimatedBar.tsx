import React, { useEffect } from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing } from 'react-native-reanimated';
import { colors } from '../../theme';
import { DEFAULT_THEME, useMotionTiming, type MotionTheme } from './tokens';

// ─── Barre de progression animée ─────────────────────────────────────────────
// Remplace les barres à largeur instantanée : la barre glisse vers la nouvelle
// valeur (0 à 1). Sert à la leçon, à l'unité en cours, à la maîtrise d'un thème.

export interface AnimatedBarProps extends MotionTheme {
  value: number;
  height?: number;
  trackColor?: string;
  style?: StyleProp<ViewStyle>;
}

export function AnimatedBar({ value, height = 8, trackColor = colors.border, style, ...theme }: AnimatedBarProps) {
  const { accent, speed } = { ...DEFAULT_THEME, ...theme };
  const t = useMotionTiming(speed);
  const v = useSharedValue(0);
  useEffect(() => { v.value = withTiming(Math.max(0, Math.min(1, value)), { duration: t(500), easing: Easing.out(Easing.cubic) }); }, [value]); // eslint-disable-line react-hooks/exhaustive-deps
  const fill = useAnimatedStyle(() => ({ width: `${v.value * 100}%` }));
  return (
    <View style={[{ height, borderRadius: height / 2, backgroundColor: trackColor, overflow: 'hidden' }, style]}>
      <Animated.View style={[StyleSheet.absoluteFill, { right: undefined, backgroundColor: accent, borderRadius: height / 2 }, fill]} />
    </View>
  );
}
