import React, { useEffect } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSequence, withTiming, withSpring } from 'react-native-reanimated';
import { DEFAULT_THEME, useMotionTiming, type MotionTheme } from './tokens';

// ─── Retour sur une réponse ──────────────────────────────────────────────────
// Enveloppe n'importe quel élément (choix, carte, tuile) : bonne réponse = petit
// rebond ; mauvaise = secousse. `null` = au repos.

export interface AnswerMotionProps extends MotionTheme {
  status: 'correct' | 'wrong' | null;
  /** Amplitude de la secousse, en px. */
  amplitude?: number;
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
}

export function AnswerMotion({ status, amplitude = 9, style: outer, children, ...theme }: AnswerMotionProps) {
  const { speed } = { ...DEFAULT_THEME, ...theme };
  const t = useMotionTiming(speed);
  const scale = useSharedValue(1);
  const x = useSharedValue(0);

  useEffect(() => {
    if (status === 'correct') scale.value = withSequence(withTiming(1.06, { duration: t(120) }), withSpring(1, { damping: 7 }));
    else if (status === 'wrong') x.value = withSequence(
      withTiming(amplitude, { duration: t(60) }), withTiming(-amplitude, { duration: t(60) }),
      withTiming(amplitude * 0.6, { duration: t(60) }), withTiming(0, { duration: t(60) }),
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  const style = useAnimatedStyle(() => ({ transform: [{ translateX: x.value }, { scale: scale.value }] as any }));
  return <Animated.View style={[outer, style]}>{children}</Animated.View>;
}
