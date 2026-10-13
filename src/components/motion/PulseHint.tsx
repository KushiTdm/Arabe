import React, { useEffect, type ReactNode } from 'react';
import { View, StyleSheet, type StyleProp, type ViewStyle } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming, cancelAnimation, Easing } from 'react-native-reanimated';
import { DEFAULT_THEME, useMotionTiming, type MotionTheme } from './tokens';

// ─── Halo qui attire le regard ───────────────────────────────────────────────
// Un anneau qui pulse autour d'un élément : « c'est ici que ça continue ».
// `active` = false : rien.

export interface PulseHintProps extends MotionTheme {
  active?: boolean;
  radius?: number;
  color?: string;
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}

export function PulseHint({ active = true, radius = 16, color, children, style, ...theme }: PulseHintProps) {
  const { accent, speed } = { ...DEFAULT_THEME, ...theme };
  const t = useMotionTiming(speed);
  const p = useSharedValue(0);
  useEffect(() => {
    if (active && t(1) > 0) p.value = withRepeat(withTiming(1, { duration: t(1500), easing: Easing.out(Easing.quad) }), -1, false);
    else { cancelAnimation(p); p.value = 0; }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);
  const halo = useAnimatedStyle(() => ({ opacity: (1 - p.value) * 0.55, transform: [{ scale: 1 + p.value * 0.12 }] as any }));
  return (
    <View style={style}>
      {active && <Animated.View pointerEvents="none" style={[StyleSheet.absoluteFill, { borderRadius: radius, borderWidth: 3, borderColor: color ?? accent }, halo]} />}
      {children}
    </View>
  );
}
