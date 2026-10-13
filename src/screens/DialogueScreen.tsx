import React, { useEffect, useMemo, useRef, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useProfile } from '../lib/ProfileContext';
import { useSpeaker } from '../lib/useSpeaker';
import { getConversation } from '../content';
import { VOCAB_IMAGES } from '../content/images';
import type { Word } from '../content/types';
import { WordPic } from '../components/WordPic';
import { PressableScale } from '../components/anim';
import { AnswerMotion, LessonIntroMotion, CelebrationMotion, AnimatedBar, SpeakingWaves, BubbleIn } from '../components/motion';
import { saveConversationScore, conversationStorageKey, CONVERSATION_XP, CONVERSATION_PASS_PCT } from '../lib/useConversationProgress';
import { colors, borderRadius, fontSize } from '../theme';

// ─── Conversation guidée ─────────────────────────────────────────────────────
// Le personnage parle (audio automatique), l'élève choisit sa réplique. Une
// photo peut accompagner la question. Aucune IA, aucun crédit.

type Line = { who: 'npc' | 'me'; word: Word };

export default function DialogueScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const insets = useSafeAreaInsets();
  const { language, activeProfile, addXP } = useProfile();
  const speaker = useSpeaker();
  const conv = getConversation(language.code, route.params?.conversationId);

  const [intro, setIntro] = useState(true);
  const [briefed, setBriefed] = useState(false);
  const [step, setStep] = useState(0);
  const [lines, setLines] = useState<Line[]>([]);
  const [picked, setPicked] = useState<number | null>(null);
  const [firstTry, setFirstTry] = useState(0);
  const [help, setHelp] = useState(true);
  const [xpGiven, setXpGiven] = useState(0);
  const saved = useRef(false);
  const scroller = useRef<ScrollView>(null);

  const turn = conv?.turns[step];
  const done = !!conv && step >= conv.turns.length;
  const pct = conv ? Math.round((firstTry / conv.turns.length) * 100) : 0;

  // Le personnage parle dès que sa réplique s'affiche
  useEffect(() => {
    if (!briefed || !turn) return;
    speaker.say(turn.npc.ar, { id: 'npc' });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, briefed]);

  useEffect(() => { setTimeout(() => scroller.current?.scrollToEnd({ animated: true }), 120); }, [lines.length, picked]);
  useEffect(() => () => speaker.stop(), []); // eslint-disable-line react-hooks/exhaustive-deps

  // Fin : on enregistre le score et l'XP de la première réussite
  useEffect(() => {
    if (!done || !conv || saved.current) return;
    saved.current = true;
    saveConversationScore(conversationStorageKey(activeProfile?.id, language.code), conv.id, pct).then(async ({ firstPass }) => {
      if (firstPass) { await addXP(CONVERSATION_XP); setXpGiven(CONVERSATION_XP); }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [done]);

  const sceneSrc = useMemo(() => (conv?.scene.img ? VOCAB_IMAGES[conv.scene.img] : undefined), [conv]);

  if (!conv) {
    return (
      <View style={[styles.root, styles.center]}>
        <Text style={styles.muted}>Conversation introuvable.</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}><Text style={styles.link}>Retour</Text></TouchableOpacity>
      </View>
    );
  }

  const choose = (i: number) => {
    if (!turn || picked !== null) return;
    const ok = i === turn.answer;
    setPicked(i);
    if (ok) setFirstTry(n => n + 1);
    speaker.say(turn.options[turn.answer].ar, { id: 'me' });
  };

  const next = () => {
    if (!turn) return;
    setLines(l => [...l, { who: 'npc', word: turn.npc }, { who: 'me', word: turn.options[turn.answer] }]);
    setPicked(null);
    setStep(s => s + 1);
  };

  // ─── Fin ────────────────────────────────────────────────────────────────
  if (done) {
    const passed = pct >= CONVERSATION_PASS_PCT;
    return (
      <View style={[styles.root, styles.center, { paddingTop: insets.top, paddingBottom: insets.bottom + 16 }]}>
        <CelebrationMotion
          title={conv.title}
          message={passed ? 'Conversation réussie' : 'Presque !'}
          score={pct}
          passed={passed}
          img={conv.scene.img}
          emoji={conv.scene.emoji}
          xp={xpGiven || undefined}
        />
        {!passed && <Text style={[styles.muted, { marginTop: 14 }]}>Il faut {CONVERSATION_PASS_PCT} % pour la valider. Recommence en écoutant bien.</Text>}
        <View style={styles.endActions}>
          <PressableScale style={[styles.cta, { backgroundColor: colors.secondary }]} onPress={() => {
            saved.current = false; setStep(0); setLines([]); setPicked(null); setFirstTry(0); setXpGiven(0);
          }}>
            <Text style={styles.ctaText}>Rejouer</Text>
          </PressableScale>
          <PressableScale style={[styles.cta, styles.ctaGhost]} onPress={() => navigation.goBack()}>
            <Text style={[styles.ctaText, { color: colors.text }]}>Retour aux conversations</Text>
          </PressableScale>
        </View>
      </View>
    );
  }

  // ─── Présentation : situation et mots clés ──────────────────────────────
  if (!briefed) {
    return (
      <View style={[styles.root, { paddingTop: insets.top }]}>
        <ScrollView contentContainerStyle={styles.body}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}>
            <Ionicons name="arrow-back" size={22} color={colors.text} />
          </TouchableOpacity>
          <View style={styles.hero}>
            {sceneSrc ? <Image source={sceneSrc} style={styles.heroImg} /> : <Text style={styles.heroEmoji}>{conv.scene.emoji}</Text>}
          </View>
          <Text style={styles.title}>{conv.title}</Text>
          <Text style={styles.situation}>{conv.situation}</Text>
          <Text style={styles.who}>Tu parles avec : {conv.npcRole}</Text>

          <Text style={styles.kicker}>Mots clés</Text>
          <View style={styles.keyGrid}>
            {conv.keyWords.map(k => (
              <TouchableOpacity key={k.ar} style={styles.keyCard} onPress={() => speaker.say(k.ar, { id: k.ar })}>
                <WordPic img={k.img} emoji={k.emoji} color={k.color} size={52} />
                <Text style={styles.keyAr}>{k.ar}</Text>
                {!!k.tr && <Text style={styles.keyTr}>{k.tr}</Text>}
                <Text style={styles.keyFr}>{k.fr}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <PressableScale style={[styles.cta, { marginTop: 20 }]} onPress={() => { speaker.stop(); setBriefed(true); }}>
            <Text style={styles.ctaText}>Commencer la conversation</Text>
          </PressableScale>
        </ScrollView>
        {intro && (
          <LessonIntroMotion
            title={conv.title} goal={conv.situation} tag={`Conversation · ${conv.npcRole}`}
            img={conv.scene.img} emoji={conv.scene.emoji} duration={1500} onDone={() => setIntro(false)}
          />
        )}
      </View>
    );
  }

  // ─── Échange ────────────────────────────────────────────────────────────
  const bubble = (l: Line, i: number) => (
    <BubbleIn key={i} from={l.who === 'me' ? 'right' : 'left'} style={[styles.bubble, l.who === 'me' ? styles.bubbleMe : styles.bubbleNpc]}>
      <Text style={[styles.bAr, language.rtl && styles.rtl]}>{l.word.ar}</Text>
      {!!l.word.tr && help && <Text style={styles.bTr}>{l.word.tr}</Text>}
      {help && <Text style={styles.bFr}>{l.word.fr}</Text>}
    </BubbleIn>
  );

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={12}><Ionicons name="close" size={26} color={colors.text} /></TouchableOpacity>
        <AnimatedBar style={{ flex: 1 }} height={10} value={step / conv.turns.length} />
        <TouchableOpacity onPress={() => setHelp(h => !h)} hitSlop={10} style={styles.helpBtn}>
          <Ionicons name={help ? 'eye' : 'eye-off'} size={18} color={colors.primaryLight} />
          <Text style={styles.helpText}>Aide</Text>
        </TouchableOpacity>
      </View>

      <ScrollView ref={scroller} contentContainerStyle={styles.chat} showsVerticalScrollIndicator={false}>
        {lines.map(bubble)}

        {turn && (
          <>
            {(!!turn.img || !!turn.emoji) && (
              <View style={styles.qPic}>
                {turn.img && VOCAB_IMAGES[turn.img] ? <Image source={VOCAB_IMAGES[turn.img]} style={styles.qPicImg} /> : <WordPic emoji={turn.emoji} size={110} />}
              </View>
            )}
            <BubbleIn key={`npc-${step}`} from="left" style={[styles.bubble, styles.bubbleNpc, styles.bubbleCurrent]}>
            <TouchableOpacity activeOpacity={0.8} onPress={() => speaker.say(turn.npc.ar, { id: 'npc' })}>
              <View style={styles.bRow}>
                <Ionicons name="volume-medium" size={18} color={colors.primaryLight} />
                <SpeakingWaves active={speaker.speakingId === 'npc'} bars={4} height={16} />
              </View>
              <Text style={[styles.bAr, language.rtl && styles.rtl]}>{turn.npc.ar}</Text>
              {!!turn.npc.tr && help && <Text style={styles.bTr}>{turn.npc.tr}</Text>}
              {help && <Text style={styles.bFr}>{turn.npc.fr}</Text>}
            </TouchableOpacity>
            </BubbleIn>

            <Text style={styles.prompt}>Ta réplique :</Text>
            {turn.options.map((o, i) => {
              const state = picked === null ? 0 : i === turn.answer ? 1 : picked === i ? 2 : 0;
              return (
                <AnswerMotion key={o.ar + i} status={state === 1 ? 'correct' : state === 2 ? 'wrong' : null}>
                  <PressableScale disabled={picked !== null} onPress={() => choose(i)}
                    style={[styles.option, state === 1 && styles.optOk, state === 2 && styles.optKo]}>
                    <Text style={[styles.optAr, language.rtl && styles.rtl]}>{o.ar}</Text>
                    {!!o.tr && help && <Text style={styles.optSub}>{o.tr}</Text>}
                    {(help || picked !== null) && <Text style={styles.optFr}>{o.fr}</Text>}
                  </PressableScale>
                </AnswerMotion>
              );
            })}
            {picked !== null && picked !== turn.answer && !!turn.why && <Text style={styles.why}>{turn.why}</Text>}
            {picked !== null && (
              <PressableScale style={[styles.cta, { marginTop: 8 }]} onPress={next}>
                <Text style={styles.ctaText}>{step < conv.turns.length - 1 ? 'Suite' : 'Terminer'}</Text>
              </PressableScale>
            )}
          </>
        )}
        <View style={{ height: insets.bottom + 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  center: { alignItems: 'center', justifyContent: 'center', padding: 24 },
  body: { padding: 20, paddingBottom: 60 },
  back: { alignSelf: 'flex-start', padding: 8, borderRadius: borderRadius.md, backgroundColor: `${colors.textMuted}15`, marginBottom: 12 },
  hero: { height: 190, borderRadius: borderRadius['2xl'], overflow: 'hidden', backgroundColor: colors.card, alignItems: 'center', justifyContent: 'center', marginBottom: 16 },
  heroImg: { width: '100%', height: '100%' },
  heroEmoji: { fontSize: 80 },
  title: { fontSize: 26, fontWeight: '800', color: colors.text },
  situation: { fontSize: fontSize.base, color: colors.text, lineHeight: 22, marginTop: 8 },
  who: { fontSize: fontSize.sm, color: colors.primaryLight, fontWeight: '700', marginTop: 8 },
  kicker: { color: colors.accent, fontWeight: '800', marginTop: 20, marginBottom: 8, letterSpacing: 0.8 },
  keyGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  keyCard: { width: '48%', backgroundColor: colors.card, borderRadius: borderRadius.xl, borderWidth: 1, borderColor: colors.border, padding: 12, alignItems: 'center', gap: 2 },
  keyAr: { fontSize: 22, fontWeight: '700', color: colors.arabicText, marginTop: 6, textAlign: 'center' },
  keyTr: { fontSize: fontSize.xs, color: colors.primaryLight, fontStyle: 'italic' },
  keyFr: { fontSize: fontSize.xs, color: colors.textMuted, textAlign: 'center' },
  header: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 16, paddingVertical: 10 },
  helpBtn: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 14, backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border },
  helpText: { fontSize: fontSize.xs, color: colors.primaryLight, fontWeight: '700' },
  chat: { paddingHorizontal: 16, paddingBottom: 40 },
  bubble: { maxWidth: '86%', borderRadius: 18, padding: 12, marginBottom: 8 },
  bubbleNpc: { alignSelf: 'flex-start', backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border, borderBottomLeftRadius: 4 },
  bubbleMe: { alignSelf: 'flex-end', backgroundColor: `${colors.accent}22`, borderBottomRightRadius: 4 },
  bubbleCurrent: { borderColor: colors.primaryLight, borderWidth: 2 },
  bRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4 },
  bAr: { fontSize: 22, fontWeight: '600', color: colors.arabicText },
  rtl: { writingDirection: 'rtl' },
  bTr: { fontSize: fontSize.sm, color: colors.primaryLight, fontStyle: 'italic', marginTop: 2 },
  bFr: { fontSize: fontSize.sm, color: colors.textMuted, marginTop: 2 },
  qPic: { alignItems: 'center', marginVertical: 8 },
  qPicImg: { width: 170, height: 170, borderRadius: 24 },
  prompt: { fontSize: fontSize.sm, fontWeight: '700', color: colors.textMuted, marginTop: 10, marginBottom: 8 },
  option: { backgroundColor: colors.card, borderRadius: borderRadius.lg, borderWidth: 2, borderColor: colors.border, paddingVertical: 12, paddingHorizontal: 16, marginBottom: 10, alignItems: 'center' },
  optOk: { borderColor: colors.success, backgroundColor: colors.successLight },
  optKo: { borderColor: colors.destructive, backgroundColor: colors.destructiveLight },
  optAr: { fontSize: 24, fontWeight: '600', color: colors.arabicText, textAlign: 'center' },
  optSub: { fontSize: fontSize.xs, color: colors.primaryLight, fontStyle: 'italic', marginTop: 2 },
  optFr: { fontSize: fontSize.xs, color: colors.textMuted, marginTop: 2, textAlign: 'center' },
  why: { color: colors.textMuted, fontSize: fontSize.sm, textAlign: 'center', marginBottom: 8 },
  cta: { backgroundColor: colors.accent, borderRadius: borderRadius.xl, paddingVertical: 15, alignItems: 'center', paddingHorizontal: 28 },
  ctaGhost: { backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border },
  ctaText: { color: colors.white, fontWeight: '800', fontSize: fontSize.base },
  endActions: { marginTop: 28, gap: 10, alignSelf: 'stretch' },
  muted: { color: colors.textMuted, textAlign: 'center', fontSize: fontSize.base },
  link: { color: colors.accent, marginTop: 12, fontWeight: '700' },
});
