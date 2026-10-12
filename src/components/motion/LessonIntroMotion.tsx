import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Animated, {
  useSharedValue, useAnimatedStyle, withTiming, withSpring, withDelay, withSequence, withRepeat,
  Easing, runOnJS,
} from 'react-native-reanimated';
import { WordPic } from '../WordPic';
import { DEFAULT_THEME, useMotionTiming, type MotionTheme } from './tokens';

// ─── Intro de leçon ──────────────────────────────────────────────────────────
// Plein écran, ~1,8 s : l'image de la leçon entre dans un anneau qui pulse, puis
// le titre, l'étiquette (niveau / partie) et l'objectif se révèlent. Un toucher
// l'écourte. Tout vient des variables : rien n'est écrit en dur.

export interface LessonIntroProps extends MotionTheme {
  title: string;
  /** Objectif de la leçon. */
  goal?: string;
  /** Étiquette (ex. « A1 · Découvrir » ou « Partie 1 / 3 »). */
  tag?: string;
  /** Image de la leçon (clé de content/images.ts) ou emoji de repli. */
  img?: string;
  emoji?: string;
  /** Durée d'affichage totale, en ms (avant `speed`). */
  duration?: number;
  onDone: () => void;
}

export function LessonIntroMotion({
  title, goal, tag, img, emoji, duration = 1800, onDone, ...theme
}: LessonIntroProps) {
  const { accent, surface, speed } = { ...DEFAULT_THEME, ...theme };
  const t = useMotionTiming(speed);

  const bg = useSharedValue(0);
  const pic = useSharedValue(0);
  const ring = useSharedValue(0);
  const titleIn = useSharedValue(0);
  const goalIn = useSharedValue(0);
  const bar = useSharedValue(0);
  const out = useSharedValue(1);

  useEffect(() => {
    const total = t(duration);
    bg.value = withTiming(1, { duration: t(250) });
    pic.value = withDelay(t(150), withSpring(1, { damping: 11, stiffness: 120 }));
    ring.value = withDelay(t(250), withRepeat(withTiming(1, { duration: t(900), easing: Easing.out(Easing.quad) }), -1, false));
    titleIn.value = withDelay(t(450), withTiming(1, { duration: t(450), easing: Easing.out(Easing.cubic) }));
    goalIn.value = withDelay(t(750), withTiming(1, { duration: t(450) }));
    bar.value = withTiming(1, { duration: total, easing: Easing.linear });
    out.value = withDelay(Math.max(0, total - t(250)), withTiming(0, { duration: t(250) }, finished => {
      if (finished) runOnJS(onDone)();
    }));
    if (total === 0) onDone();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const root = useAnimatedStyle(() => ({ opacity: Math.min(bg.value, out.value) }));
  const picStyle = useAnimatedStyle(() => ({ opacity: pic.value, transform: [{ scale: 0.55 + pic.value * 0.45 }] as any }));
  const ringStyle = useAnimatedStyle(() => ({
    opacity: 0.55 * (1 - ring.value),
    transform: [{ scale: 1 + ring.value * 0.55 }] as any,
  }));
  const titleStyle = useAnimatedStyle(() => ({ opacity: titleIn.value, transform: [{ translateY: (1 - titleIn.value) * 22 }] as any }));
  const goalStyle = useAnimatedStyle(() => ({ opacity: goalIn.value, transform: [{ translateY: (1 - goalIn.value) * 14 }] as any }));
  const barStyle = useAnimatedStyle(() => ({ width: `${bar.value * 100}%` }));

  return (
    <Animated.View style={[StyleSheet.absoluteFill, styles.root, { backgroundColor: surface }, root]}>
      <Pressable style={styles.fill} onPress={onDone}>
        <View style={styles.stage}>
          <Animated.View style={[styles.ring, { borderColor: accent }, ringStyle]} />
          <Animated.View style={[styles.picWrap, { borderColor: accent }, picStyle]}>
            <WordPic img={img} emoji={emoji ?? '📖'} size={150} />
          </Animated.View>
        </View>
        {!!tag && <Animated.Text style={[styles.tag, { color: accent }, titleStyle]}>{tag}</Animated.Text>}
        <Animated.Text style={[styles.title, titleStyle]}>{title}</Animated.Text>
        {!!goal && <Animated.Text style={[styles.goal, goalStyle]}>{goal}</Animated.Text>}
        <View style={styles.barBg}><Animated.View style={[styles.barFill, { backgroundColor: accent }, barStyle]} /></View>
        <Text style={styles.skip}>Toucher pour passer</Text>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  root: { zIndex: 50 },
  fill: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 32 },
  stage: { width: 220, height: 220, alignItems: 'center', justifyContent: 'center', marginBottom: 28 },
  ring: { position: 'absolute', width: 190, height: 190, borderRadius: 95, borderWidth: 3 },
  picWrap: { padding: 6, borderRadius: 32, borderWidth: 3, backgroundColor: 'rgba(255,255,255,0.08)' },
  tag: { fontSize: 13, fontWeight: '800', letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 8 },
  title: { fontSize: 28, fontWeight: '800', color: '#fff', textAlign: 'center' },
  goal: { fontSize: 15, color: 'rgba(255,255,255,0.78)', textAlign: 'center', marginTop: 10, lineHeight: 22 },
  barBg: { position: 'absolute', left: 32, right: 32, bottom: 64, height: 4, borderRadius: 2, backgroundColor: 'rgba(255,255,255,0.18)', overflow: 'hidden' },
  barFill: { height: '100%', borderRadius: 2 },
  skip: { position: 'absolute', bottom: 34, color: 'rgba(255,255,255,0.45)', fontSize: 12 },
});
