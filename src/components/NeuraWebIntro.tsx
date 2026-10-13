import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withDelay, withSpring, withTiming, withSequence, Easing } from 'react-native-reanimated';
import { useMotionTiming } from './motion/tokens';

// ─── Signature de l'agence : NeuraWeb ────────────────────────────────────────
// Après l'intro de l'app : le symbole tourne et se pose, une onde s'en échappe,
// le nom monte, puis la ligne « tech agency ». Fond blanc, comme le logo.

const MARK = require('../../assets/brand/neuraweb-mark.png');   // 380 × 340
const NAME = require('../../assets/brand/neuraweb-name.png');   // 1020 × 176
const TAG = require('../../assets/brand/neuraweb-tag.png');     // 630 × 98
export const NEURAWEB_BG = '#ffffff';
export const NEURAWEB_MS = 2800;

export function NeuraWebIntro({ speed = 1, accent = '#4db8ff', scale = 1 }: { speed?: number; accent?: string; scale?: number }) {
  const t = useMotionTiming(speed);
  const mark = useSharedValue(0);
  const spin = useSharedValue(-120);
  const ring = useSharedValue(0);
  const name = useSharedValue(0);
  const tag = useSharedValue(0);

  useEffect(() => {
    mark.value = withSpring(1, { damping: 9, stiffness: 110 });
    spin.value = withTiming(0, { duration: t(900), easing: Easing.out(Easing.cubic) });
    ring.value = withDelay(t(500), withTiming(1, { duration: t(900), easing: Easing.out(Easing.quad) }));
    name.value = withDelay(t(750), withTiming(1, { duration: t(650), easing: Easing.out(Easing.cubic) }));
    tag.value = withDelay(t(1300), withTiming(1, { duration: t(700), easing: Easing.out(Easing.cubic) }));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const markW = 92 * scale, nameW = 250 * scale, tagW = 150 * scale;
  const markStyle = useAnimatedStyle(() => ({ opacity: mark.value, transform: [{ scale: 0.3 + 0.7 * mark.value }, { rotate: `${spin.value}deg` }] as any }));
  const ringStyle = useAnimatedStyle(() => ({ opacity: (1 - ring.value) * 0.5, transform: [{ scale: 0.6 + ring.value * 2.2 }] as any }));
  const nameStyle = useAnimatedStyle(() => ({ opacity: name.value, transform: [{ translateY: (1 - name.value) * 22 }] as any }));
  const tagStyle = useAnimatedStyle(() => ({ opacity: tag.value, transform: [{ scaleX: 0.88 + 0.12 * tag.value }] as any }));

  return (
    <View style={styles.root}>
      <View style={{ width: markW, height: markW * 340 / 380, alignItems: 'center', justifyContent: 'center' }}>
        <Animated.View style={[styles.ring, { width: markW, height: markW, borderRadius: markW / 2, borderColor: accent }, ringStyle]} />
        <Animated.Image source={MARK} style={[{ width: markW, height: markW * 340 / 380 }, markStyle]} resizeMode="contain" />
      </View>
      <Animated.Image source={NAME} style={[{ width: nameW, height: nameW * 176 / 1020, marginTop: 10 * scale }, nameStyle]} resizeMode="contain" />
      <Animated.Image source={TAG} style={[{ width: tagW, height: tagW * 98 / 630, marginTop: 8 * scale }, tagStyle]} resizeMode="contain" />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: NEURAWEB_BG },
  ring: { position: 'absolute', borderWidth: 3 },
});
