import React, { useEffect } from 'react';
import { View, Text, StyleSheet, I18nManager } from 'react-native';
import Animated, {
  useSharedValue, useAnimatedStyle, withTiming, withSpring, withDelay, Easing,
} from 'react-native-reanimated';
import { WordPic } from '../WordPic';
import { colors } from '../../theme';
import { DEFAULT_THEME, useMotionTiming, type MotionTheme } from './tokens';

// ─── Révélation d'un mot ─────────────────────────────────────────────────────
// Le mot, sa photo, sa translittération et son sens arrivent en séquence :
// photo (ressort) → mot (zoom) → trait d'accent qui balaie → translittération →
// sens. `replayKey` rejoue l'animation quand on change de mot.
// Le mot arabe est animé d'un bloc : le découper lettre à lettre casserait les
// liaisons de l'écriture.

export interface WordRevealProps extends MotionTheme {
  native: string;
  translit?: string;
  meaning?: string;
  img?: string;
  emoji?: string;
  rtl?: boolean;
  /** Taille de la photo (0 = pas de photo). */
  picSize?: number;
  /** Taille du texte du mot. */
  nativeSize?: number;
  /** Change pour rejouer l'animation. */
  replayKey?: string | number;
  /** Cache la translittération et le sens (face avant d'une carte). */
  hideDetails?: boolean;
}

export function WordRevealMotion({
  native, translit, meaning, img, emoji, rtl, picSize = 130, nativeSize = 44, replayKey, hideDetails, ...theme
}: WordRevealProps) {
  const { accent, speed } = { ...DEFAULT_THEME, ...theme };
  const t = useMotionTiming(speed);
  const pic = useSharedValue(0);
  const word = useSharedValue(0);
  const line = useSharedValue(0);
  const tr = useSharedValue(0);
  const fr = useSharedValue(0);

  useEffect(() => {
    pic.value = 0; word.value = 0; line.value = 0; tr.value = 0; fr.value = 0;
    pic.value = withSpring(1, { damping: 12, stiffness: 130 });
    word.value = withDelay(t(180), withSpring(1, { damping: 13, stiffness: 140 }));
    line.value = withDelay(t(380), withTiming(1, { duration: t(450), easing: Easing.out(Easing.cubic) }));
    tr.value = withDelay(t(620), withTiming(1, { duration: t(350) }));
    fr.value = withDelay(t(820), withTiming(1, { duration: t(380) }));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [replayKey, native]);

  const picStyle = useAnimatedStyle(() => ({ opacity: pic.value, transform: [{ scale: 0.7 + pic.value * 0.3 }] as any }));
  const wordStyle = useAnimatedStyle(() => ({ opacity: word.value, transform: [{ scale: 0.8 + word.value * 0.2 }, { translateY: (1 - word.value) * 10 }] as any }));
  const lineStyle = useAnimatedStyle(() => ({ width: `${line.value * 70}%` }));
  const trStyle = useAnimatedStyle(() => ({ opacity: tr.value, transform: [{ translateY: (1 - tr.value) * 8 }] as any }));
  const frStyle = useAnimatedStyle(() => ({ opacity: fr.value, transform: [{ translateY: (1 - fr.value) * 12 }] as any }));

  const hasPic = picSize > 0 && (!!img || !!emoji);

  return (
    <View style={styles.root}>
      {hasPic && <Animated.View style={[{ marginBottom: 12 }, picStyle]}><WordPic img={img} emoji={emoji} size={picSize} /></Animated.View>}
      <Animated.Text style={[styles.native, { fontSize: nativeSize }, rtl && styles.rtl, wordStyle]}>{native}</Animated.Text>
      <View style={[styles.lineBg, { alignItems: rtl ? 'flex-end' : 'flex-start' }]}>
        <Animated.View style={[styles.line, { backgroundColor: accent }, lineStyle]} />
      </View>
      {!hideDetails && !!translit && <Animated.Text style={[styles.translit, trStyle]}>{translit}</Animated.Text>}
      {!hideDetails && !!meaning && <Animated.Text style={[styles.meaning, frStyle]}>{meaning}</Animated.Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { alignItems: 'center' },
  native: { fontWeight: '700', color: colors.text, textAlign: 'center' },
  rtl: { writingDirection: 'rtl' },
  lineBg: { width: '60%', height: 3, marginTop: 6, marginBottom: 8, justifyContent: 'center' },
  line: { height: 3, borderRadius: 2, alignSelf: 'center' },
  translit: { fontSize: 18, color: colors.primaryLight, fontStyle: 'italic', marginBottom: 4 },
  meaning: { fontSize: 22, fontWeight: '700', color: colors.text, textAlign: 'center' },
});
