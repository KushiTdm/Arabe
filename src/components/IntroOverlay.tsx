import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Video, ResizeMode, type AVPlaybackStatus } from 'expo-av';
import Animated, { useSharedValue, useAnimatedStyle, withDelay, withSpring, withTiming } from 'react-native-reanimated';
import { INTRO_VIDEO, AGENCY_VIDEO } from '../theme/introVideo';
import { useMotionTiming } from './motion/tokens';
import { NeuraWebIntro, NEURAWEB_BG, NEURAWEB_MS } from './NeuraWebIntro';

// ─── Intro au lancement ──────────────────────────────────────────────────────
// 1) la vidéo d'intro de l'app (4 s) si elle est branchée dans theme/introVideo.ts,
//    sinon une courte intro animée ; 2) la signature de l'agence NeuraWeb.
// Un toucher passe l'étape en cours. `onDone` est appelé une seule fois, à la fin.

const LOGO = require('../../assets/store/logo.png');
const SURFACE = '#1a2e2a';
const MAX_MS = 6500;                       // filet de sécurité si la vidéo ne démarre pas

export function IntroOverlay({ onDone, video = INTRO_VIDEO, agencyVideo = AGENCY_VIDEO, title = 'Polyglotte', tagline = '11 langues, un seul parcours', agency = true }: {
  onDone: () => void; video?: number | null; agencyVideo?: number | null; title?: string; tagline?: string; agency?: boolean;
}) {
  const [stage, setStage] = useState<'app' | 'agency'>('app');
  const fired = useRef(false);
  const out = useSharedValue(1);
  const [hidden, setHidden] = useState(false);
  const t = useMotionTiming(1);

  const close = () => {
    if (fired.current) return;
    fired.current = true;
    out.value = withTiming(0, { duration: t(350) });
    setTimeout(() => { setHidden(true); onDone(); }, t(380));
  };
  const endApp = () => (agency ? setStage(s => (s === 'app' ? 'agency' : s)) : close());

  // Filets de sécurité : la vidéo qui ne démarre pas, puis la fin de la signature.
  useEffect(() => {
    if (stage === 'app') { const id = setTimeout(endApp, video ? MAX_MS : t(2600)); return () => clearTimeout(id); }
    const id = setTimeout(close, agencyVideo ? MAX_MS : t(NEURAWEB_MS));
    return () => clearTimeout(id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage]);

  const fade = useAnimatedStyle(() => ({ opacity: out.value }));
  if (hidden) return null;

  return (
    <Animated.View style={[styles.root, stage === 'agency' && { backgroundColor: NEURAWEB_BG }, fade]}>
      {stage === 'agency' ? (
        agencyVideo ? <VideoStage key="agency" source={agencyVideo} onEnd={close} /> : <NeuraWebIntro />
      ) : video ? (
        <VideoStage key="app" source={video} onEnd={endApp} />
      ) : <BrandIntro title={title} tagline={tagline} />}
      <TouchableOpacity style={StyleSheet.absoluteFill} activeOpacity={1} onPress={stage === 'app' ? endApp : close} accessibilityLabel="Passer l'intro" />
    </Animated.View>
  );
}

function VideoStage({ source, onEnd }: { source: number; onEnd: () => void }) {
  return (
    <Video
      source={source}
      style={StyleSheet.absoluteFill}
      resizeMode={ResizeMode.COVER}
      shouldPlay
      isLooping={false}
      isMuted
      onError={onEnd}
      onPlaybackStatusUpdate={(st: AVPlaybackStatus) => { if (st.isLoaded && st.didJustFinish) onEnd(); }}
    />
  );
}

function BrandIntro({ title, tagline }: { title: string; tagline: string }) {
  const t = useMotionTiming(1);
  const s = useSharedValue(0.6);
  const o = useSharedValue(0);
  const l = useSharedValue(0);
  useEffect(() => {
    s.value = withSpring(1, { damping: 11, stiffness: 120 });
    o.value = withTiming(1, { duration: t(600) });
    l.value = withDelay(t(700), withTiming(1, { duration: t(600) }));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const logo = useAnimatedStyle(() => ({ opacity: o.value, transform: [{ scale: s.value }] as any }));
  const line = useAnimatedStyle(() => ({ opacity: l.value, transform: [{ translateY: (1 - l.value) * 12 }] as any }));
  return (
    <View style={styles.brand}>
      <Animated.View style={[styles.logoWrap, logo]}>
        <Image source={LOGO} style={styles.logo} resizeMode="contain" />
      </Animated.View>
      <Animated.View style={line}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.tag}>{tagline}</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { ...StyleSheet.absoluteFillObject, backgroundColor: SURFACE, zIndex: 100 },
  brand: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  logoWrap: { width: 220, height: 220, borderRadius: 44, overflow: 'hidden', marginBottom: 28 },
  logo: { width: 220, height: 220 },
  title: { color: '#f5e9c8', fontSize: 34, fontWeight: '800', textAlign: 'center' },
  tag: { color: '#c9b37a', fontSize: 15, marginTop: 6, textAlign: 'center' },
});
