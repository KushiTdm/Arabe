import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming, withDelay, Easing, cancelAnimation } from 'react-native-reanimated';
import { DEFAULT_THEME, useMotionTiming, type MotionTheme } from './tokens';

// ─── Ondes sonores ───────────────────────────────────────────────────────────
// Barres qui ondulent pendant la lecture audio d'un mot ou d'une phrase.

export interface SpeakingWavesProps extends MotionTheme {
  active: boolean;
  bars?: number;
  height?: number;
  color?: string;
}

export function SpeakingWaves({ active, bars = 5, height = 28, color, ...theme }: SpeakingWavesProps) {
  const { accent, speed } = { ...DEFAULT_THEME, ...theme };
  return (
    <View style={[styles.row, { height }]}>
      {Array.from({ length: bars }, (_, i) => (
        <Bar key={i} index={i} active={active} height={height} color={color ?? accent} speed={speed} />
      ))}
    </View>
  );
}

function Bar({ index, active, height, color, speed }: { index: number; active: boolean; height: number; color: string; speed: number }) {
  const t = useMotionTiming(speed);
  const v = useSharedValue(0.2);
  useEffect(() => {
    if (active) {
      v.value = withDelay(index * t(90), withRepeat(withTiming(1, { duration: t(380 + (index % 3) * 90), easing: Easing.inOut(Easing.quad) }), -1, true));
    } else {
      cancelAnimation(v);
      v.value = withTiming(0.2, { duration: t(200) });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);
  const style = useAnimatedStyle(() => ({ height: Math.max(4, v.value * height) }));
  return <Animated.View style={[styles.bar, { backgroundColor: color }, style]} />;
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  bar: { width: 5, borderRadius: 3 },
});
