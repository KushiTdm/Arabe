import React, { useEffect } from 'react';
import { View, type StyleProp, type ViewStyle } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming, Easing, useReducedMotion } from 'react-native-reanimated';
import { colors } from '../../theme';

// ─── Squelette de chargement ─────────────────────────────────────────────────
// Remplace un spinner pendant qu'une réponse de l'IA arrive : des lignes grises
// qui respirent doucement montrent la forme du contenu à venir.

export function SkeletonLines({ lines = 3, label, style }: { lines?: number; label?: string; style?: StyleProp<ViewStyle> }) {
  const reduced = useReducedMotion();
  const o = useSharedValue(0.55);
  useEffect(() => {
    if (!reduced) o.value = withRepeat(withTiming(1, { duration: 900, easing: Easing.inOut(Easing.quad) }), -1, true);
  }, [reduced]); // eslint-disable-line react-hooks/exhaustive-deps
  const a = useAnimatedStyle(() => ({ opacity: o.value }));
  const widths = ['92%', '78%', '85%', '60%'];
  return (
    <View style={[{ padding: 16, gap: 10 }, style]} accessibilityLabel={label ?? 'Chargement'}>
      {Array.from({ length: lines }, (_, i) => (
        <Animated.View key={i} style={[{ height: 12, borderRadius: 6, width: widths[i % widths.length] as any, backgroundColor: `${colors.textMuted}22` }, a]} />
      ))}
    </View>
  );
}
