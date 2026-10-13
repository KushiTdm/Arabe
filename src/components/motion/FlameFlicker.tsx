import React, { useEffect, type ReactNode } from 'react';
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withSequence, withTiming, Easing } from 'react-native-reanimated';
import { DEFAULT_THEME, useMotionTiming, type MotionTheme } from './tokens';

// ─── Flamme de série ─────────────────────────────────────────────────────────
// Vacille doucement (échelle et inclinaison). `intensity` grandit avec la série :
// 0 = presque immobile, 1 = très vivant.

export interface FlameFlickerProps extends MotionTheme {
  intensity?: number;
  children: ReactNode;
}

export function FlameFlicker({ intensity = 0.5, children, ...theme }: FlameFlickerProps) {
  const { speed } = { ...DEFAULT_THEME, ...theme };
  const t = useMotionTiming(speed);
  const k = Math.max(0, Math.min(1, intensity));
  const p = useSharedValue(0);
  useEffect(() => {
    if (t(1) === 0) return;
    p.value = withRepeat(withSequence(
      withTiming(1, { duration: t(520 - 240 * k), easing: Easing.inOut(Easing.quad) }),
      withTiming(-0.6, { duration: t(430 - 200 * k), easing: Easing.inOut(Easing.quad) }),
    ), -1, true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [intensity]);
  const a = useAnimatedStyle(() => ({
    transform: [{ scale: 1 + p.value * (0.04 + 0.1 * k) }, { rotate: `${p.value * (2 + 5 * k)}deg` }] as any,
  }));
  return <Animated.View style={a}>{children}</Animated.View>;
}
