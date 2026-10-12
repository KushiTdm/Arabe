import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withSpring, withDelay, Easing } from 'react-native-reanimated';
import { WordPic } from '../WordPic';
import { colors, borderRadius, fontSize } from '../../theme';
import { DEFAULT_THEME, useMotionTiming, type MotionTheme } from './tokens';

// ─── Révélation d'une lettre ─────────────────────────────────────────────────
// La lettre grandit, son nom et son son suivent, puis ses formes (isolée,
// début, milieu, fin) s'allument l'une après l'autre, et enfin la photo du
// mot-clé. Les formes sont des variables : l'animation ne connaît pas l'arabe,
// elle sert à tout alphabet qui a des formes positionnelles.

export interface LetterRevealProps extends MotionTheme {
  letter: string;
  name: string;
  sound: string;
  /** Formes à montrer, dans l'ordre : [libellé, glyphe]. */
  forms?: [string, string][];
  /** Photo du mot-clé. */
  img?: string;
  emoji?: string;
  keyword?: string;
  replayKey?: string | number;
}

export function LetterRevealMotion({ letter, name, sound, forms = [], img, emoji, keyword, replayKey, ...theme }: LetterRevealProps) {
  const { accent, speed } = { ...DEFAULT_THEME, ...theme };
  const t = useMotionTiming(speed);
  const big = useSharedValue(0);
  const label = useSharedValue(0);
  const picIn = useSharedValue(0);
  const glow = useSharedValue(-1); // index de la forme allumée

  useEffect(() => {
    big.value = 0; label.value = 0; picIn.value = 0; glow.value = -1;
    big.value = withSpring(1, { damping: 9, stiffness: 110 });
    label.value = withDelay(t(300), withTiming(1, { duration: t(350) }));
    forms.forEach((_, i) => { glow.value = withDelay(t(650 + i * 320), withTiming(i, { duration: 0 })); });
    picIn.value = withDelay(t(650 + forms.length * 320), withSpring(1, { damping: 12 }));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [replayKey, letter]);

  const bigStyle = useAnimatedStyle(() => ({ opacity: big.value, transform: [{ scale: 0.4 + big.value * 0.6 }] as any }));
  const labelStyle = useAnimatedStyle(() => ({ opacity: label.value, transform: [{ translateY: (1 - label.value) * 10 }] as any }));
  const picStyle = useAnimatedStyle(() => ({ opacity: picIn.value, transform: [{ scale: 0.6 + picIn.value * 0.4 }] as any }));

  return (
    <View style={styles.root}>
      <Animated.Text style={[styles.letter, bigStyle]}>{letter}</Animated.Text>
      <Animated.Text style={[styles.name, labelStyle]}>{name} · « {sound} »</Animated.Text>
      {forms.length > 0 && (
        <View style={styles.forms}>
          {forms.map(([k, g], i) => <FormCell key={k} label={k} glyph={g} index={i} glow={glow} accent={accent} />)}
        </View>
      )}
      {(!!img || !!emoji) && (
        <Animated.View style={[styles.pic, picStyle]}>
          <WordPic img={img} emoji={emoji} size={120} />
          {!!keyword && <Text style={styles.keyword}>{keyword}</Text>}
        </Animated.View>
      )}
    </View>
  );
}

function FormCell({ label, glyph, index, glow, accent }: { label: string; glyph: string; index: number; glow: Animated.SharedValue<number>; accent: string }) {
  const style = useAnimatedStyle(() => {
    const on = glow.value >= index ? 1 : 0;
    return {
      opacity: 0.25 + on * 0.75,
      transform: [{ scale: glow.value === index ? 1.18 : 1 }] as any,
      borderColor: on ? accent : colors.border,
    };
  });
  return (
    <Animated.View style={[styles.cell, style]}>
      <Text style={styles.glyph}>{glyph}</Text>
      <Text style={styles.cellKey}>{label}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  root: { alignItems: 'center' },
  letter: { fontSize: 110, lineHeight: 140, color: colors.arabicText },
  name: { fontSize: fontSize.lg, color: colors.text, fontWeight: '700' },
  forms: { flexDirection: 'row', gap: 10, marginTop: 14 },
  cell: { alignItems: 'center', backgroundColor: colors.background, borderRadius: borderRadius.md, borderWidth: 2, paddingVertical: 8, paddingHorizontal: 10, minWidth: 62 },
  glyph: { fontSize: 30, color: colors.arabicText },
  cellKey: { fontSize: 10, color: colors.textMuted },
  pic: { alignItems: 'center', marginTop: 16 },
  keyword: { marginTop: 6, fontSize: fontSize.base, color: colors.text, fontWeight: '600' },
});
