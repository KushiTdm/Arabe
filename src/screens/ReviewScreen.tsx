import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Speech from 'expo-speech';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { colors, borderRadius, fontSize } from '../theme';
import { Animated, FadeInDown } from '../components/anim';
import { useProfile } from '../lib/ProfileContext';
import { useReviewDeck, reviewStorageKey, MAX_BOX, ReviewCard } from '../lib/useReviewDeck';
import { useVocabAudio, vocabAudioStorageKey } from '../lib/useVocabAudio';
import { VocabAudioRecorder } from '../components/VocabAudioRecorder';
import { getAvailableCategories, getWordsForCategory } from '../data/multilingualVocab';

const SESSION_SIZE = 20;
const NEW_WORDS_BATCH = 10;

type Phase = 'home' | 'session' | 'done';

function shuffle<T>(input: T[]): T[] {
  const arr = [...input];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function ReviewScreen() {
  const navigation = useNavigation<any>();
  const { language, activeProfile, addXP, updateStreak, updateProgress } = useProfile();
  const deck = useReviewDeck(reviewStorageKey(activeProfile?.id, language.code));
  const vocabAudio = useVocabAudio(vocabAudioStorageKey(activeProfile?.id, language.code));

  const [phase, setPhase] = useState<Phase>('home');
  const [sessionIds, setSessionIds] = useState<string[]>([]);
  const [pos, setPos] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [knownCount, setKnownCount] = useState(0);
  const savedRef = useRef(false);

  const speak = (text: string) => {
    Speech.speak(text, { language: language.ttsLang, rate: 0.85 });
  };

  // Persist session results once when the summary appears
  useEffect(() => {
    if (phase !== 'done' || savedRef.current) return;
    savedRef.current = true;
    (async () => {
      await updateProgress({ vocab_learned: deck.masteredCount });
      if (knownCount > 0) await addXP(knownCount);
      await updateStreak();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  const startSession = () => {
    const ids = shuffle(deck.dueCards).slice(0, SESSION_SIZE).map(c => c.id);
    if (ids.length === 0) return;
    setSessionIds(ids);
    setPos(0);
    setShowAnswer(false);
    setKnownCount(0);
    savedRef.current = false;
    setPhase('session');
  };

  const addNewWords = async () => {
    const known = new Set(deck.cards.map(c => c.id));
    const candidates = getAvailableCategories(language.code)
      .flatMap(cat => getWordsForCategory(language.code, cat))
      .filter(w => !known.has(w.id));
    await deck.addWords(shuffle(candidates).slice(0, NEW_WORDS_BATCH));
  };

  const answerCard = async (card: ReviewCard, known: boolean) => {
    await deck.answer(card.id, known);
    if (known) setKnownCount(c => c + 1);
    setShowAnswer(false);
    if (pos < sessionIds.length - 1) {
      setPos(p => p + 1);
    } else {
      setPhase('done');
    }
  };

  // ── DONE (session summary) ───────────────────────────────────────────
  if (phase === 'done') {
    const total = sessionIds.length;
    return (
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <View style={styles.doneContainer}>
          <Text style={styles.doneEmoji}>{knownCount === total ? '🏆' : '📚'}</Text>
          <Text style={styles.doneTitle}>Session terminée !</Text>
          <Text style={styles.doneScore}>{knownCount} / {total} retenues</Text>
          <Text style={styles.doneXp}>+{knownCount} XP</Text>
          <Text style={styles.doneHint}>
            Les cartes ratées reviendront aujourd'hui,{'\n'}les réussies dans quelques jours.
          </Text>
          <TouchableOpacity style={styles.primaryBtn} onPress={() => { savedRef.current = true; setPhase('home'); }}>
            <Text style={styles.primaryBtnText}>Continuer</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // ── SESSION (flashcards) ─────────────────────────────────────────────
  if (phase === 'session') {
    const card = deck.cards.find(c => c.id === sessionIds[pos]);
    if (!card) {
      // Deck changed under the session (e.g. switch de langue) — back to overview
      return (
        <SafeAreaView style={styles.safeArea} edges={['top']}>
          <View style={styles.doneContainer}>
            <Text style={styles.doneEmoji}>🗂️</Text>
            <Text style={styles.doneTitle}>Session interrompue</Text>
            <TouchableOpacity style={styles.primaryBtn} onPress={() => setPhase('home')}>
              <Text style={styles.primaryBtnText}>Retour</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      );
    }
    return (
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => setPhase('home')} style={styles.backBtn}>
              <Ionicons name="arrow-back" size={22} color={colors.text} />
            </TouchableOpacity>
            <View style={{ flex: 1 }}>
              <Text style={styles.headerTitle}>🔁 Révision</Text>
              <Text style={styles.headerSubtitle}>{pos + 1} / {sessionIds.length} · boîte {card.box}/{MAX_BOX}</Text>
            </View>
          </View>

          <View style={styles.progressBg}>
            <View style={[styles.progressFill, { width: `${((pos + 1) / sessionIds.length) * 100}%` as any }]} />
          </View>

          <TouchableOpacity
            style={styles.flashCard}
            onPress={() => setShowAnswer(true)}
            activeOpacity={0.85}
          >
            <Text style={[styles.flashNative, language.rtl && styles.rtlText]}>{card.native_word}</Text>
            {!showAnswer ? (
              <Text style={styles.flashHint}>Toucher pour voir la réponse</Text>
            ) : (
              <>
                {!!card.transliteration && (
                  <Text style={styles.flashTranslit}>{card.transliteration}</Text>
                )}
                <Text style={styles.flashFrench}>{card.french_translation}</Text>
                <TouchableOpacity onPress={() => speak(card.native_word)} style={styles.speakBtn}>
                  <Ionicons name="volume-high" size={20} color={colors.primary} />
                </TouchableOpacity>
                <VocabAudioRecorder
                  wordId={card.id}
                  audio={vocabAudio.getAudio(card.id)}
                  onSave={vocabAudio.saveAudio}
                  onDelete={vocabAudio.deleteAudio}
                />
              </>
            )}
          </TouchableOpacity>

          {showAnswer && (
            <View style={styles.flashActions}>
              <TouchableOpacity style={styles.flashBtnRetry} onPress={() => answerCard(card, false)}>
                <Ionicons name="refresh" size={18} color={colors.destructive} />
                <Text style={styles.flashBtnRetryText}>À revoir</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.flashBtnKnown} onPress={() => answerCard(card, true)}>
                <Ionicons name="checkmark" size={18} color={colors.white} />
                <Text style={styles.flashBtnKnownText}>Je savais !</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </SafeAreaView>
    );
  }

  // ── HOME (deck overview) ─────────────────────────────────────────────
  const hasStaticVocab = getAvailableCategories(language.code).length > 0;
  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView contentContainerStyle={styles.homeContent} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={22} color={colors.text} />
          </TouchableOpacity>
          <View style={{ flex: 1 }}>
            <Text style={styles.headerTitle}>{language.flag} Révision {language.familiarName}</Text>
            <Text style={styles.headerSubtitle}>Répétition espacée (boîtes de Leitner)</Text>
          </View>
        </View>

        <Animated.View entering={FadeInDown.delay(60).springify().damping(16)} style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{deck.cards.length}</Text>
            <Text style={styles.statLabel}>Cartes</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={[styles.statValue, deck.dueCount > 0 && { color: colors.secondary }]}>{deck.dueCount}</Text>
            <Text style={styles.statLabel}>À réviser</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={[styles.statValue, { color: colors.success }]}>{deck.masteredCount}</Text>
            <Text style={styles.statLabel}>Maîtrisées</Text>
          </View>
        </Animated.View>

        {deck.dueCount > 0 ? (
          <TouchableOpacity style={styles.primaryBtn} onPress={startSession}>
            <Ionicons name="play" size={18} color={colors.white} />
            <Text style={styles.primaryBtnText}>
              Réviser {Math.min(deck.dueCount, SESSION_SIZE)} carte{Math.min(deck.dueCount, SESSION_SIZE) > 1 ? 's' : ''}
            </Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.emptyDueBox}>
            <Text style={styles.emptyDueEmoji}>{deck.cards.length > 0 ? '✅' : '🗂️'}</Text>
            <Text style={styles.emptyDueText}>
              {deck.cards.length > 0
                ? 'Rien à réviser aujourd\'hui — reviens demain !'
                : 'Ton paquet est vide. Ajoute des mots pour commencer.'}
            </Text>
          </View>
        )}

        {hasStaticVocab ? (
          <TouchableOpacity style={styles.secondaryBtn} onPress={addNewWords}>
            <Ionicons name="add-circle-outline" size={18} color={colors.primary} />
            <Text style={styles.secondaryBtnText}>Ajouter {NEW_WORDS_BATCH} nouveaux mots</Text>
          </TouchableOpacity>
        ) : (
          <Text style={styles.noVocabHint}>
            Pas de vocabulaire intégré pour cette langue : ajoute des mots depuis l'onglet Vocab (bouton 🔖).
          </Text>
        )}

        {deck.cards.length > 0 && (
          <View style={styles.deckList}>
            <Text style={styles.deckListTitle}>Mon paquet</Text>
            {[...deck.cards]
              .sort((a, b) => a.nextDue.localeCompare(b.nextDue))
              .map(card => (
                <View key={card.id} style={styles.deckRow}>
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.deckNative, language.rtl && styles.rtlText]}>{card.native_word}</Text>
                    <Text style={styles.deckFrench}>{card.french_translation}</Text>
                  </View>
                  <View style={styles.boxPills}>
                    {Array.from({ length: MAX_BOX }).map((_, i) => (
                      <View
                        key={i}
                        style={[styles.boxPill, i < card.box && (card.box >= MAX_BOX ? styles.boxPillMastered : styles.boxPillActive)]}
                      />
                    ))}
                  </View>
                  <TouchableOpacity onPress={() => deck.removeWord(card.id)} style={styles.deckRemoveBtn}>
                    <Ionicons name="trash-outline" size={16} color={colors.textMuted} />
                  </TouchableOpacity>
                </View>
              ))}
          </View>
        )}
        <View style={{ height: 80 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

// ─── Styles ──────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  container: { flex: 1, backgroundColor: colors.background },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
  },
  headerTitle: { fontSize: fontSize.xl, fontWeight: '700', color: colors.text },
  headerSubtitle: { fontSize: fontSize.xs, color: colors.textMuted, marginTop: 2 },
  backBtn: {
    padding: 8,
    borderRadius: borderRadius.md,
    backgroundColor: `${colors.textMuted}15`,
    marginRight: 10,
  },

  // home
  homeContent: { paddingBottom: 120 },
  statsRow: { flexDirection: 'row', gap: 10, paddingHorizontal: 16, marginBottom: 16 },
  statBox: {
    flex: 1, alignItems: 'center', gap: 2,
    backgroundColor: colors.card,
    borderRadius: borderRadius['2xl'],
    borderWidth: 1, borderColor: colors.border,
    paddingVertical: 14,
  },
  statValue: { fontSize: fontSize.xl, fontWeight: '800', color: colors.text },
  statLabel: { fontSize: fontSize.xs, color: colors.textMuted },

  primaryBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 8, backgroundColor: colors.primary,
    borderRadius: borderRadius['2xl'], paddingVertical: 15,
    marginHorizontal: 16, marginBottom: 10,
  },
  primaryBtnText: { color: colors.white, fontSize: fontSize.base, fontWeight: '700' },
  secondaryBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 8, backgroundColor: colors.card,
    borderRadius: borderRadius['2xl'],
    borderWidth: 1, borderColor: colors.border,
    paddingVertical: 13, marginHorizontal: 16,
  },
  secondaryBtnText: { color: colors.primary, fontSize: fontSize.base, fontWeight: '700' },
  noVocabHint: {
    fontSize: fontSize.sm, color: colors.textMuted, textAlign: 'center',
    paddingHorizontal: 32, lineHeight: 20,
  },
  emptyDueBox: { alignItems: 'center', paddingVertical: 18, gap: 8 },
  emptyDueEmoji: { fontSize: 40 },
  emptyDueText: { fontSize: fontSize.sm, color: colors.textMuted, textAlign: 'center', paddingHorizontal: 32 },

  deckList: { marginTop: 20, paddingHorizontal: 16 },
  deckListTitle: { fontSize: fontSize.lg, fontWeight: '800', color: colors.text, marginBottom: 10 },
  deckRow: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    backgroundColor: colors.card,
    borderRadius: borderRadius.xl,
    borderWidth: 1, borderColor: colors.border,
    padding: 12, marginBottom: 8,
  },
  deckNative: { fontSize: fontSize.lg, fontWeight: '700', color: colors.text },
  deckFrench: { fontSize: fontSize.xs, color: colors.textMuted, marginTop: 1 },
  rtlText: { textAlign: 'left', writingDirection: 'rtl' },
  boxPills: { flexDirection: 'row', gap: 3 },
  boxPill: {
    width: 8, height: 8, borderRadius: 4,
    backgroundColor: `${colors.textMuted}25`,
  },
  boxPillActive: { backgroundColor: colors.secondary },
  boxPillMastered: { backgroundColor: colors.success },
  deckRemoveBtn: { padding: 6 },

  // session
  progressBg: {
    height: 4, backgroundColor: `${colors.textMuted}20`,
    marginHorizontal: 16, borderRadius: 2, overflow: 'hidden', marginBottom: 20,
  },
  progressFill: { height: '100%', backgroundColor: colors.primary, borderRadius: 2 },
  flashCard: {
    marginHorizontal: 16, backgroundColor: colors.card,
    borderRadius: borderRadius['3xl'], borderWidth: 1, borderColor: colors.border,
    paddingVertical: 48, paddingHorizontal: 24,
    alignItems: 'center', minHeight: 220, justifyContent: 'center',
    shadowColor: colors.primary, shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08, shadowRadius: 12, elevation: 4,
  },
  flashNative: { fontSize: 42, fontWeight: '700', color: colors.text, textAlign: 'center', marginBottom: 8 },
  flashTranslit: { fontSize: fontSize.lg, color: colors.primary, fontStyle: 'italic', marginBottom: 8 },
  flashFrench: { fontSize: fontSize.xl, fontWeight: '700', color: colors.text, marginBottom: 16 },
  flashHint: { fontSize: fontSize.sm, color: colors.textMuted, marginTop: 16 },
  speakBtn: {
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: `${colors.primary}12`,
    justifyContent: 'center', alignItems: 'center',
  },
  flashActions: { flexDirection: 'row', gap: 12, marginHorizontal: 16, marginTop: 20 },
  flashBtnRetry: {
    flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 6, backgroundColor: colors.card, borderRadius: borderRadius['2xl'],
    borderWidth: 1, borderColor: colors.border, paddingVertical: 14,
  },
  flashBtnRetryText: { fontSize: fontSize.base, fontWeight: '600', color: colors.destructive },
  flashBtnKnown: {
    flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 6, backgroundColor: colors.success, borderRadius: borderRadius['2xl'], paddingVertical: 14,
  },
  flashBtnKnownText: { fontSize: fontSize.base, fontWeight: '700', color: colors.white },

  // done
  doneContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 24 },
  doneEmoji: { fontSize: 64, marginBottom: 12 },
  doneTitle: { fontSize: fontSize['2xl'], fontWeight: '800', color: colors.text, marginBottom: 8 },
  doneScore: { fontSize: fontSize['3xl'], fontWeight: '800', color: colors.primary },
  doneXp: { fontSize: fontSize.lg, fontWeight: '700', color: colors.secondary, marginTop: 4 },
  doneHint: {
    fontSize: fontSize.sm, color: colors.textMuted, textAlign: 'center',
    marginTop: 16, marginBottom: 24, lineHeight: 20,
  },
});
