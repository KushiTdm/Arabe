import React, { useCallback, useMemo, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useProfile } from '../lib/ProfileContext';
import { useSpeaker } from '../lib/useSpeaker';
import { getReadingLevels, hasLetters, READ_PASS_PCT, READ_SESSION, type ReadItem, type ReadLevel } from '../content/reading';
import { useReadingProgress, readingStorageKey, saveReadingScore } from '../lib/useReadingProgress';
import { WordPic } from '../components/WordPic';
import { PressableScale, Animated, FadeInDown } from '../components/anim';
import { AnswerMotion, AnimatedBar, ProgressRing, PopIn, PulseHint, CountUp } from '../components/motion';
import { colors, borderRadius, fontSize } from '../theme';

// ─── Lecture : des lettres aux dialogues ─────────────────────────────────────
// Cinq paliers qui se débloquent : chaque palier demande 70 % pour ouvrir le
// suivant. Le texte natif est grand ; la réponse (sens ou prononciation) est
// révélée avec la photo du mot.

interface Q { item: ReadItem; kind: 'meaning' | 'sound'; options: ReadItem[]; }

function seeded(n: number) { let s = n * 9301 + 49297; return () => { s = (s * 9301 + 49297) % 233280; return s / 233280; }; }

function buildSession(level: ReadLevel, romanized: boolean, nonce: number): Q[] {
  const rnd = seeded(nonce + level.items.length);
  const pool = [...level.items].sort(() => rnd() - 0.5);
  const picks = pool.slice(0, READ_SESSION);
  return picks.map((item, i) => {
    const kind: Q['kind'] = romanized && i % 2 === 1 && item.tr && item.tr !== item.fr ? 'sound' : 'meaning';
    const label = (x: ReadItem) => (kind === 'sound' ? x.tr : x.fr);
    const others: ReadItem[] = [];
    for (const c of pool.sort(() => rnd() - 0.5)) {
      if (others.length >= 3) break;
      if (c.id === item.id || !label(c) || label(c) === label(item) || others.some(o => label(o) === label(c))) continue;
      others.push(c);
    }
    const options = [...others, item].sort(() => rnd() - 0.5);
    return { item, kind, options };
  });
}

export default function ReadingScreen() {
  const navigation = useNavigation<any>();
  const { language, activeProfile } = useProfile();
  const levels = useMemo(() => getReadingLevels(language.code), [language.code]);
  const progress = useReadingProgress(readingStorageKey(activeProfile?.id, language.code));
  const [active, setActive] = useState<ReadLevel | null>(null);

  useFocusEffect(useCallback(() => { progress.reload(); }, [progress.reload])); // eslint-disable-line react-hooks/exhaustive-deps

  if (active) {
    return <Drill level={active} romanized={hasLetters(language.code)}
      storageKey={readingStorageKey(activeProfile?.id, language.code)}
      onExit={() => { setActive(null); progress.reload(); }} />;
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}>
            <Ionicons name="arrow-back" size={22} color={colors.text} />
          </TouchableOpacity>
          <View style={{ flex: 1 }}>
            <Text style={styles.title}>{language.flag} Lecture</Text>
            <Text style={styles.sub}>Monte de palier en palier : {READ_PASS_PCT} % pour débloquer le suivant.</Text>
          </View>
        </View>

        {levels.map((l, i) => {
          const prevOk = i === 0 || levels[i - 1].id === 'letters' || progress.passed(levels[i - 1].id);
          const best = progress.scores[l.id];
          const ok = progress.passed(l.id);
          const isLetters = l.id === 'letters';
          const isNext = prevOk && !ok && !isLetters && levels.findIndex(x => x.id !== 'letters' && !progress.passed(x.id)) === i;
          return (
            <Animated.View key={l.id} entering={FadeInDown.delay(i * 50).springify().damping(16)}>
              <PulseHint active={isNext} radius={borderRadius.xl} color={colors.accent} style={{ marginBottom: 12 }}>
              <PressableScale
                disabled={!prevOk}
                style={[styles.card, { marginBottom: 0 }, !prevOk && styles.locked, ok && styles.cardDone]}
                onPress={() => (isLetters ? navigation.navigate('Alphabet') : setActive(l))}
              >
                <ProgressRing value={(best ?? 0) / 100} size={50} stroke={5} accent={ok ? colors.success : colors.accent}>
                  <PopIn triggerKey={ok}>
                    {ok ? <Ionicons name="checkmark" size={22} color={colors.success} />
                      : !prevOk ? <Ionicons name="lock-closed" size={18} color={colors.textMuted} />
                      : <Text style={styles.numText}>{i + 1}</Text>}
                  </PopIn>
                </ProgressRing>
                <View style={{ flex: 1 }}>
                  <Text style={styles.cardTitle}>{l.title}</Text>
                  <Text style={styles.cardDesc}>{l.desc}</Text>
                  {!isLetters && <Text style={styles.cardMeta}>{l.items.length} textes{best != null ? ` · meilleur score ${best} %` : ''}</Text>}
                </View>
                <Ionicons name={l.icon as any} size={22} color={prevOk ? colors.primary : colors.textLight} />
              </PressableScale>
              </PulseHint>
            </Animated.View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

function Drill({ level, romanized, storageKey, onExit }: { level: ReadLevel; romanized: boolean; storageKey: string; onExit: () => void }) {
  const speaker = useSpeaker();
  const [nonce, setNonce] = useState(1);
  const session = useMemo(() => buildSession(level, romanized, nonce), [level, romanized, nonce]);
  const [pos, setPos] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [right, setRight] = useState(0);
  const [saved, setSaved] = useState(false);

  const done = pos >= session.length;
  const pct = Math.round((right / Math.max(session.length, 1)) * 100);
  if (done && !saved) { setSaved(true); saveReadingScore(storageKey, level.id, pct); }

  const restart = () => { setNonce(n => n + 1); setPos(0); setPicked(null); setRight(0); setSaved(false); };

  if (done) {
    const ok = pct >= READ_PASS_PCT;
    return (
      <SafeAreaView style={[styles.safe, styles.center]}>
        <Text style={styles.bigEmoji}>{ok ? '🎉' : '💪'}</Text>
        <Text style={styles.endTitle}>{ok ? 'Palier réussi' : 'Presque !'}</Text>
        <CountUp value={pct} suffix=" %" style={styles.endScore} />
        <Text style={styles.sub}>{ok ? 'Le palier suivant est ouvert.' : `Il faut ${READ_PASS_PCT} % pour débloquer la suite.`}</Text>
        <View style={styles.endActions}>
          <PressableScale style={[styles.cta, { backgroundColor: colors.secondary }]} onPress={restart}><Text style={styles.ctaText}>Rejouer</Text></PressableScale>
          <PressableScale style={[styles.cta, styles.ctaGhost]} onPress={onExit}><Text style={[styles.ctaText, { color: colors.text }]}>Retour aux paliers</Text></PressableScale>
        </View>
      </SafeAreaView>
    );
  }

  const q = session[pos];
  const textSize = level.id === 'small' ? 54 : level.id === 'words' ? 40 : 30;
  const label = (x: ReadItem) => (q.kind === 'sound' ? x.tr : x.fr);

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={onExit}><Ionicons name="close" size={26} color={colors.text} /></TouchableOpacity>
        <AnimatedBar style={{ flex: 1 }} height={10} value={pos / session.length} />
        <Text style={styles.partTag}>{level.title}</Text>
      </View>
      <ScrollView contentContainerStyle={styles.body}>
        <Text style={styles.ask}>{q.kind === 'sound' ? 'Comment se prononce ce texte ?' : 'Que signifie ce texte ?'}</Text>
        <View style={styles.stage}>
          <Text style={[styles.native, { fontSize: textSize, lineHeight: textSize * 1.7 }]}>{q.item.text}</Text>
          <TouchableOpacity onPress={() => speaker.say(q.item.text, { id: q.item.id })} style={styles.listen}>
            <Ionicons name="volume-high" size={22} color={colors.white} />
          </TouchableOpacity>
          {picked !== null && (
            <View style={styles.reveal}>
              <WordPic img={q.item.img} emoji={q.item.emoji} color={q.item.color} size={72} />
              {!!q.item.tr && <Text style={styles.revealTr}>{q.item.tr}</Text>}
              <Text style={styles.revealFr}>{q.item.fr}</Text>
            </View>
          )}
        </View>
        {q.options.map((o, i) => {
          const isRight = o.id === q.item.id;
          const state = picked === null ? 0 : isRight ? 1 : picked === i ? 2 : 0;
          return (
            <AnswerMotion key={o.id} status={state === 1 ? 'correct' : state === 2 ? 'wrong' : null}>
              <PressableScale
                disabled={picked !== null}
                style={[styles.option, state === 1 && styles.optOk, state === 2 && styles.optKo]}
                onPress={() => { setPicked(i); if (isRight) setRight(n => n + 1); speaker.say(q.item.text, { id: q.item.id }); }}
              >
                <Text style={styles.optText}>{label(o)}</Text>
              </PressableScale>
            </AnswerMotion>
          );
        })}
        {picked !== null && (
          <PressableScale style={[styles.cta, { marginTop: 14 }]} onPress={() => { setPicked(null); setPos(p => p + 1); }}>
            <Text style={styles.ctaText}>Continuer</Text>
          </PressableScale>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  center: { alignItems: 'center', justifyContent: 'center', padding: 24 },
  content: { padding: 20, paddingBottom: 60 },
  header: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 18 },
  back: { width: 40, height: 40, borderRadius: 20, backgroundColor: colors.card, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: colors.border },
  title: { fontSize: fontSize.xl, fontWeight: '800', color: colors.text },
  sub: { color: colors.textMuted, fontSize: fontSize.sm, marginTop: 2, textAlign: 'center' },
  card: { flexDirection: 'row', alignItems: 'center', gap: 14, backgroundColor: colors.card, borderRadius: borderRadius.xl, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: colors.border },
  locked: { opacity: 0.5 },
  cardDone: { borderColor: colors.success },
  num: { width: 44, height: 44, borderRadius: 22, backgroundColor: colors.primaryLight + '33', alignItems: 'center', justifyContent: 'center' },
  numText: { fontSize: fontSize.lg, fontWeight: '800', color: colors.primary },
  cardTitle: { fontSize: fontSize.lg, fontWeight: '800', color: colors.text },
  cardDesc: { color: colors.textMuted, fontSize: fontSize.sm, marginTop: 2, lineHeight: 19 },
  cardMeta: { color: colors.accent, fontSize: fontSize.xs, fontWeight: '700', marginTop: 4 },
  topBar: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 16, paddingTop: 8 },
  partTag: { color: colors.textMuted, fontWeight: '700', fontSize: fontSize.sm },
  body: { padding: 20, paddingBottom: 60 },
  ask: { fontSize: fontSize.lg, fontWeight: '700', color: colors.text, marginBottom: 14 },
  stage: { alignItems: 'center', backgroundColor: colors.card, borderRadius: borderRadius.xl, padding: 22, marginBottom: 16, borderWidth: 1, borderColor: colors.border },
  native: { color: colors.arabicText, textAlign: 'center', fontWeight: '600' },
  listen: { width: 48, height: 48, borderRadius: 24, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center', marginTop: 12 },
  reveal: { alignItems: 'center', marginTop: 16, gap: 4 },
  revealTr: { color: colors.primaryLight, fontStyle: 'italic', fontSize: fontSize.base },
  revealFr: { color: colors.text, fontWeight: '700', fontSize: fontSize.base, textAlign: 'center' },
  option: { backgroundColor: colors.card, borderRadius: borderRadius.lg, borderWidth: 2, borderColor: colors.border, paddingVertical: 16, paddingHorizontal: 16, marginBottom: 10, alignItems: 'center' },
  optOk: { borderColor: colors.success, backgroundColor: colors.successLight },
  optKo: { borderColor: colors.destructive, backgroundColor: colors.destructiveLight },
  optText: { fontSize: fontSize.lg, color: colors.text, fontWeight: '600', textAlign: 'center' },
  cta: { backgroundColor: colors.accent, borderRadius: borderRadius.xl, paddingVertical: 15, alignItems: 'center', paddingHorizontal: 28 },
  ctaGhost: { backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border },
  ctaText: { color: colors.white, fontWeight: '800', fontSize: fontSize.base },
  bigEmoji: { fontSize: 72 },
  endTitle: { fontSize: 28, fontWeight: '800', color: colors.text, marginTop: 8 },
  endScore: { fontSize: 56, fontWeight: '800', color: colors.accent, marginVertical: 8 },
  endActions: { marginTop: 28, gap: 10, alignSelf: 'stretch' },
});
