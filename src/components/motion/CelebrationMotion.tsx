import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import Animated, {
  useSharedValue, useAnimatedStyle, withTiming, withSpring, withDelay, withSequence, Easing,
} from 'react-native-reanimated';
import { WordPic } from '../WordPic';
import { colors, fontSize } from '../../theme';
import { CONFETTI_COLORS, DEFAULT_THEME, useMotionTiming, type MotionTheme } from './tokens';

// ─── Célébration de fin de leçon ─────────────────────────────────────────────
// L'image de la leçon fait un bond au centre, des confettis retombent, la note
// monte jusqu'à son score et l'XP gagnée s'affiche. `passed = false` : pas de
// confettis, une secousse douce et un ton encourageant.

export interface CelebrationProps extends MotionTheme {
  /** Titre de la leçon. */
  title: string;
  /** Message sous le titre (ex. « Partie réussie »). */
  message: string;
  score: number;
  passed: boolean;
  img?: string;
  emoji?: string;
  /** XP gagnée, affichée en pastille. */
  xp?: number;
  confettiCount?: number;
  confettiColors?: string[];
}

export function CelebrationMotion({
  title, message, score, passed, img, emoji, xp, confettiCount = 28, confettiColors = CONFETTI_COLORS, ...theme
}: CelebrationProps) {
  const { accent, speed } = { ...DEFAULT_THEME, ...theme };
  const t = useMotionTiming(speed);
  const pop = useSharedValue(0);
  const text = useSharedValue(0);
  const badge = useSharedValue(0);
  const shake = useSharedValue(0);
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (passed) pop.value = withSpring(1, { damping: 6, stiffness: 120 });
    else {
      pop.value = withSpring(1, { damping: 14 });
      shake.value = withDelay(t(300), withSequence(withTiming(8, { duration: t(70) }), withTiming(-8, { duration: t(70) }), withTiming(5, { duration: t(70) }), withTiming(0, { duration: t(70) })));
    }
    text.value = withDelay(t(350), withTiming(1, { duration: t(400) }));
    badge.value = withDelay(t(1100), withSpring(1, { damping: 8 }));

    // Compteur de note
    const steps = 24; const total = t(900);
    if (total === 0) { setShown(score); return; }
    let i = 0;
    const id = setInterval(() => {
      i++; setShown(Math.round((score * i) / steps));
      if (i >= steps) clearInterval(id);
    }, total / steps);
    return () => clearInterval(id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const picStyle = useAnimatedStyle(() => ({
    opacity: pop.value,
    transform: [{ scale: 0.3 + pop.value * 0.7 }, { translateX: shake.value }] as any,
  }));
  const textStyle = useAnimatedStyle(() => ({ opacity: text.value, transform: [{ translateY: (1 - text.value) * 16 }] as any }));
  const badgeStyle = useAnimatedStyle(() => ({ opacity: badge.value, transform: [{ scale: 0.5 + badge.value * 0.5 }] as any }));

  return (
    <View style={styles.root}>
      {passed && <Confetti count={confettiCount} colors={confettiColors} speed={speed} />}
      <Animated.View style={[styles.picWrap, { borderColor: passed ? accent : colors.border }, picStyle]}>
        <WordPic img={img} emoji={emoji ?? (passed ? '🎉' : '💪')} size={132} />
      </Animated.View>
      <Animated.View style={[{ alignItems: 'center' }, textStyle]}>
        <Text style={styles.lesson} numberOfLines={2}>{title}</Text>
        <Text style={styles.message}>{message}</Text>
        <Text style={[styles.score, { color: passed ? accent : colors.secondary }]}>{shown}%</Text>
      </Animated.View>
      {!!xp && passed && (
        <Animated.View style={[styles.xp, { backgroundColor: accent }, badgeStyle]}>
          <Text style={styles.xpText}>+{xp} XP</Text>
        </Animated.View>
      )}
    </View>
  );
}

// ─── Confettis ───────────────────────────────────────────────────────────────

function Confetti({ count, colors: palette, speed }: { count: number; colors: string[]; speed: number }) {
  const { width, height } = useWindowDimensions();
  const pieces = useMemo(() => Array.from({ length: count }, (_, i) => {
    // pseudo-aléatoire déterministe : rendu stable, tests reproductibles
    const r = (n: number) => { const x = Math.sin((i + 1) * 9301 + n * 49297) * 233280; return x - Math.floor(x); };
    return {
      x: r(1) * width, drift: (r(2) - 0.5) * 120, delay: r(3) * 500, size: 7 + r(4) * 8,
      color: palette[i % palette.length], spin: (r(5) - 0.5) * 720, fall: height * (0.55 + r(6) * 0.4),
    };
  }), [count, palette, width, height]);
  return <View style={StyleSheet.absoluteFill} pointerEvents="none">{pieces.map((p, i) => <Piece key={i} {...p} speed={speed} />)}</View>;
}

function Piece({ x, drift, delay, size, color, spin, fall, speed }: { x: number; drift: number; delay: number; size: number; color: string; spin: number; fall: number; speed: number }) {
  const t = useMotionTiming(speed);
  const v = useSharedValue(0);
  useEffect(() => { v.value = withDelay(t(delay), withTiming(1, { duration: t(1900), easing: Easing.in(Easing.quad) })); }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const style = useAnimatedStyle(() => ({
    opacity: v.value === 0 ? 0 : 1 - v.value * 0.9,
    transform: [{ translateX: x + drift * v.value }, { translateY: -40 + fall * v.value }, { rotate: `${spin * v.value}deg` }] as any,
  }));
  return <Animated.View style={[{ position: 'absolute', top: 0, left: 0, width: size, height: size * 0.6, backgroundColor: color, borderRadius: 2 }, style]} />;
}

const styles = StyleSheet.create({
  root: { alignItems: 'center', justifyContent: 'center' },
  picWrap: { padding: 6, borderRadius: 36, borderWidth: 3, backgroundColor: colors.card, marginBottom: 18 },
  lesson: { fontSize: fontSize.lg, fontWeight: '700', color: colors.textMuted, textAlign: 'center', maxWidth: 280 },
  message: { fontSize: 28, fontWeight: '800', color: colors.text, marginTop: 4 },
  score: { fontSize: 56, fontWeight: '800', marginTop: 4 },
  xp: { marginTop: 8, paddingHorizontal: 18, paddingVertical: 8, borderRadius: 20 },
  xpText: { color: '#fff', fontWeight: '800', fontSize: fontSize.base },
});
