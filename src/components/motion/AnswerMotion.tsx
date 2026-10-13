import React, { useEffect } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSequence, withTiming, withSpring } from 'react-native-reanimated';
import { DEFAULT_THEME, useMotionTiming, type MotionTheme } from './tokens';
import { tap } from '../../lib/haptics';

// ─── Retour sur une réponse ──────────────────────────────────────────────────
// Enveloppe n'importe quel élément (choix, carte, tuile) : bonne réponse = petit
// léger gonflement ; mauvaise = simple tassement, sans secousse. `null` = au repos.

export interface AnswerMotionProps extends MotionTheme {
  status: 'correct' | 'wrong' | null;
  /** Réservé : l'ancienne secousse a été retirée. */
  amplitude?: number;
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
}

export function AnswerMotion({ status, style: outer, children, ...theme }: AnswerMotionProps) {
  const { speed } = { ...DEFAULT_THEME, ...theme };
  const t = useMotionTiming(speed);
  const scale = useSharedValue(1);

  useEffect(() => {
    if (status === 'correct') {
      tap();
      scale.value = withSequence(withTiming(1.03, { duration: t(120) }), withSpring(1, { damping: 20, stiffness: 220 }));
    } else if (status === 'wrong') {
      scale.value = withSequence(withTiming(0.98, { duration: t(120) }), withSpring(1, { damping: 20, stiffness: 220 }));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  const style = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] as any }));
  return <Animated.View style={[outer, style]}>{children}</Animated.View>;
}
