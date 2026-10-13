import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withSequence, Easing } from 'react-native-reanimated';
import { DEFAULT_THEME, useMotionTiming, type MotionTheme } from './tokens';

// ─── Étiquette qui s'envole ──────────────────────────────────────────────────
// « +10 XP », « 🔥 ×3 », « ✓ » : le texte monte et s'efface chaque fois que
// `trigger` change (incrémente-le à chaque bonne réponse). `trigger` = 0 : rien.

export interface FloatingXPProps extends MotionTheme {
  label: string;
  trigger: number;
  /** Hauteur parcourue, en px. */
  rise?: number;
  color?: string;
  fontSize?: number;
}

export function FloatingXP({ label, trigger, rise = 70, color, fontSize = 22, ...theme }: FloatingXPProps) {
  const { accent, speed } = { ...DEFAULT_THEME, ...theme };
  const t = useMotionTiming(speed);
  const y = useSharedValue(0);
  const o = useSharedValue(0);
  const s = useSharedValue(0.6);
  useEffect(() => {
    if (!trigger) return;
    y.value = 0; s.value = 0.6;
    y.value = withTiming(-rise, { duration: t(900), easing: Easing.out(Easing.cubic) });
    s.value = withSequence(withTiming(1.25, { duration: t(180) }), withTiming(1, { duration: t(200) }));
    o.value = withSequence(withTiming(1, { duration: t(120) }), withTiming(1, { duration: t(450) }), withTiming(0, { duration: t(330) }));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger]);
  const style = useAnimatedStyle(() => ({ opacity: o.value, transform: [{ translateY: y.value }, { scale: s.value }] as any }));
  return (
    <Animated.Text style={[styles.txt, { color: color ?? accent, fontSize }, style]}>{label}</Animated.Text>
  );
}

const styles = StyleSheet.create({
  txt: { position: 'absolute', alignSelf: 'center', fontWeight: '900', textShadowColor: 'rgba(0,0,0,0.12)', textShadowRadius: 4, textShadowOffset: { width: 0, height: 1 } },
});
