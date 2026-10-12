import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing, interpolate } from 'react-native-reanimated';
import { WordPic } from '../WordPic';
import { colors, borderRadius, fontSize } from '../../theme';
import { DEFAULT_THEME, useMotionTiming, type MotionTheme } from './tokens';

// ─── Carte de vocabulaire qui se retourne ────────────────────────────────────
// Face avant : photo + mot. Face arrière : photo réduite, mot, translittération,
// sens, et `children` (boutons audio, enregistreur…). Utilisée par les
// flashcards du vocabulaire et par la révision espacée.

export interface WordFlipCardProps extends MotionTheme {
  native: string;
  translit?: string;
  meaning: string;
  img?: string;
  emoji?: string;
  color?: string;
  rtl?: boolean;
  /** true = face arrière visible. */
  flipped: boolean;
  onFlip: () => void;
  hint?: string;
  children?: React.ReactNode;
}

export function WordFlipCard({
  native, translit, meaning, img, emoji, color, rtl, flipped, onFlip, hint = 'Toucher pour voir la réponse', children, ...theme
}: WordFlipCardProps) {
  const { speed } = { ...DEFAULT_THEME, ...theme };
  const t = useMotionTiming(speed);
  const p = useSharedValue(flipped ? 1 : 0);

  useEffect(() => {
    p.value = withTiming(flipped ? 1 : 0, { duration: t(450), easing: Easing.inOut(Easing.cubic) });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flipped]);

  const front = useAnimatedStyle(() => ({
    transform: [{ perspective: 1000 }, { rotateY: `${interpolate(p.value, [0, 1], [0, 180])}deg` }] as any,
    opacity: p.value < 0.5 ? 1 : 0,
  }));
  const back = useAnimatedStyle(() => ({
    transform: [{ perspective: 1000 }, { rotateY: `${interpolate(p.value, [0, 1], [180, 360])}deg` }] as any,
    opacity: p.value >= 0.5 ? 1 : 0,
  }));
  const hasPic = !!img || !!emoji || !!color;

  return (
    <View style={styles.wrap}>
      {/* La face arrière donne la hauteur (elle contient le plus de contenu) */}
      <Animated.View style={[styles.face, styles.sizer, back]} pointerEvents={flipped ? 'auto' : 'none'}>
        {hasPic && <View style={{ marginBottom: 8 }}><WordPic img={img} emoji={emoji} color={color} size={96} /></View>}
        <Text style={[styles.native, rtl && styles.rtl]}>{native}</Text>
        {!!translit && <Text style={styles.translit}>{translit}</Text>}
        <Text style={styles.meaning}>{meaning}</Text>
        {children}
      </Animated.View>
      <Animated.View style={[styles.face, StyleSheet.absoluteFill, front]} pointerEvents={flipped ? 'none' : 'auto'}>
        <Pressable style={styles.frontPress} onPress={onFlip}>
          {hasPic && <View style={{ marginBottom: 14 }}><WordPic img={img} emoji={emoji} color={color} size={150} /></View>}
          <Text style={[styles.native, rtl && styles.rtl]}>{native}</Text>
          <Text style={styles.hint}>{hint}</Text>
        </Pressable>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginHorizontal: 16 },
  face: {
    backgroundColor: colors.card, borderRadius: borderRadius['3xl'], borderWidth: 1, borderColor: colors.border,
    alignItems: 'center', justifyContent: 'center', paddingVertical: 32, paddingHorizontal: 24,
    shadowColor: colors.primary, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.08, shadowRadius: 12, elevation: 4,
    backfaceVisibility: 'hidden',
  },
  sizer: { minHeight: 280 },
  frontPress: { alignItems: 'center', justifyContent: 'center', flex: 1, alignSelf: 'stretch' },
  native: { fontSize: 46, fontWeight: '700', color: colors.text, textAlign: 'center', marginBottom: 6 },
  rtl: { writingDirection: 'rtl' },
  translit: { fontSize: fontSize.lg, color: colors.primary, fontStyle: 'italic', marginBottom: 6 },
  meaning: { fontSize: fontSize.xl, fontWeight: '700', color: colors.text, marginBottom: 8, textAlign: 'center' },
  hint: { fontSize: fontSize.sm, color: colors.textMuted, marginTop: 14 },
});
