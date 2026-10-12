import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
  Image,
} from 'react-native';
import { ILLUSTRATIONS } from '../theme/images';
import { Ionicons } from '@expo/vector-icons';
import { useSpeaker } from '../lib/useSpeaker';
import * as Haptics from 'expo-haptics';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { colors, borderRadius, fontSize, spacing } from '../theme';
import { PressableScale, Animated, FadeInDown } from '../components/anim';
import { useProfile } from '../lib/ProfileContext';
import type { VocabCategory } from '../lib/languages';
import {
  QuizQuestion,
  QUIZ_SIZE,
  XP_PER_CORRECT,
  XP_PERFECT_BONUS,
  hasLocalQuiz,
  generateLocalQuiz,
  generateAIQuiz,
  generateLetterQuiz,
  LETTERS_CATEGORY,
  getQuizThemes,
  getThemeWords,
  generateWordsQuiz,
  type QuizTheme,
} from '../lib/quiz';
import { hasIntegratedCourse } from '../content';
import { WordPic } from '../components/WordPic';
import { useReviewDeck, reviewStorageKey } from '../lib/useReviewDeck';
import { getLexicon } from '../content/lexicon';
import type { VocabWord } from '../data/multilingualVocab';
import { markStepDone, pathStorageKey } from '../lib/usePathProgress';
import { QUIZ_PASS_PCT, READQUIZ_PASS_PCT } from '../data/learningPath';

type Phase = 'setup' | 'playing' | 'done';

function haptic(type: 'success' | 'error') {
  if (Platform.OS === 'web') return;
  Haptics.notificationAsync(
    type === 'success'
      ? Haptics.NotificationFeedbackType.Success
      : Haptics.NotificationFeedbackType.Error,
  ).catch(() => {});
}

export default function QuizScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const {
    language, currentProgress, canUseAI, incrementCredits,
    updateProgress, addXP, updateStreak, activeProfile,
  } = useProfile();

  const [phase, setPhase] = useState<Phase>('setup');
  const [category, setCategory] = useState<VocabCategory | null>(null);
  const [themeSel, setThemeSel] = useState<QuizTheme | null>(null);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [genError, setGenError] = useState<string | null>(null);
  // Parcours : test de lecture sur des lettres, et résultat de l'étape lancée
  const [letterSet, setLetterSet] = useState<string[] | null>(null);
  const [stepResult, setStepResult] = useState<'passed' | 'failed' | null>(null);
  const pathStep: { unitId: string; stepIdx: number } | undefined = route.params?.pathStep;

  const bestScore = currentProgress?.quiz_best_score ?? 0;

  // Thèmes tirés du lexique des leçons (langues au contenu intégré)
  const integrated = hasIntegratedCourse(language.code);
  const quizThemes = React.useMemo(() => getQuizThemes(language.code), [language.code]);
  const deck = useReviewDeck(reviewStorageKey(activeProfile?.id, language.code));
  const deckWords: VocabWord[] = React.useMemo(() => deck.cards.map(c => ({
    id: c.id, native_word: c.native_word, transliteration: c.transliteration,
    french_translation: c.french_translation, category: c.category, mastered: false,
    practice_count: c.practice_count, img: c.img, emoji: c.emoji, color: c.color,
  })), [deck.cards]);

  const { say } = useSpeaker();
  const speak = (text: string) => say(text);

  const startQuiz = async (cat: VocabCategory) => {
    setGenError(null);
    setCategory(cat);

    if (hasLocalQuiz(language.code, cat.id)) {
      const qs = generateLocalQuiz(language.code, cat.id);
      setQuestions(qs);
      setCurrent(0);
      setSelected(null);
      setCorrectCount(0);
      setPhase('playing');
      return;
    }

    // No static vocab for this language → generate with AI
    if (!canUseAI()) {
      setGenError('Crédits IA épuisés pour cette langue — impossible de générer un quiz.');
      return;
    }
    setIsGenerating(true);
    try {
      const ok = await incrementCredits();
      if (!ok) return;
      const qs = await generateAIQuiz(language, cat.label, currentProgress?.level ?? 'beginner');
      setQuestions(qs);
      setCurrent(0);
      setSelected(null);
      setCorrectCount(0);
      setPhase('playing');
    } catch (err: any) {
      setGenError(err?.message || 'Erreur lors de la génération du quiz.');
    } finally {
      setIsGenerating(false);
    }
  };

  const startLetterQuiz = (letters: string[]) => {
    const qs = generateLetterQuiz(language, letters);
    if (qs.length === 0) {
      setGenError('Aucun signe à tester pour cette unité.');
      return;
    }
    setGenError(null);
    setLetterSet(letters);
    setCategory(LETTERS_CATEGORY);
    setQuestions(qs);
    setCurrent(0);
    setSelected(null);
    setCorrectCount(0);
    setStepResult(null);
    setPhase('playing');
  };

  /** Lance un quiz sur un thème du lexique, une unité, « tout mélangé » ou « mon paquet ». */
  const startTheme = (theme: QuizTheme) => {
    const words = theme.kind === 'deck' ? deckWords : getThemeWords(language.code, theme.id);
    const qs = generateWordsQuiz(words, getLexicon(language.code));
    if (qs.length === 0) { setGenError('Pas assez de mots pour ce quiz.'); return; }
    setGenError(null);
    setLetterSet(null); setStepResult(null);
    setThemeSel(theme);
    setCategory({ id: theme.id, label: theme.label, emoji: theme.emoji });
    setQuestions(qs); setCurrent(0); setSelected(null); setCorrectCount(0);
    setPhase('playing');
  };

  const answer = (index: number) => {
    if (selected !== null) return;
    setSelected(index);
    const isCorrect = index === questions[current].correctIndex;
    if (isCorrect) {
      setCorrectCount(c => c + 1);
      haptic('success');
    } else {
      haptic('error');
    }
  };

  const finishQuiz = async (finalCorrect: number) => {
    const pct = Math.round((finalCorrect / questions.length) * 100);
    await updateProgress({
      quizzes_completed: (currentProgress?.quizzes_completed ?? 0) + 1,
      quiz_best_score: Math.max(bestScore, pct),
    });
    const xp = finalCorrect * XP_PER_CORRECT
      + (finalCorrect === questions.length ? XP_PERFECT_BONUS : 0);
    if (xp > 0) await addXP(xp);
    await updateStreak();

    // Étape du parcours : validée au-dessus du seuil de réussite
    if (pathStep) {
      const threshold = letterSet ? READQUIZ_PASS_PCT : QUIZ_PASS_PCT;
      if (pct >= threshold) {
        await markStepDone(
          pathStorageKey(activeProfile?.id, language.code), pathStep.unitId, pathStep.stepIdx,
        );
        setStepResult('passed');
      } else {
        setStepResult('failed');
      }
    }
    setPhase('done');
  };

  const next = () => {
    if (current < questions.length - 1) {
      setCurrent(i => i + 1);
      setSelected(null);
    } else {
      finishQuiz(correctCount);
    }
  };

  // Questions « à l'oreille » : lecture automatique
  useEffect(() => {
    const q = questions[current];
    if (phase === 'playing' && q?.listen && q.speakText) speak(q.speakText);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, current, questions]);

  // ── Lancement depuis le parcours d'apprentissage ──────────────────────
  const launchId = route.params?.launchId;
  useEffect(() => {
    if (!launchId) return;
    const letters: string[] | undefined = route.params?.letters;
    const categoryId: string | undefined = route.params?.categoryId;
    if (letters?.length) {
      startLetterQuiz(letters);
    } else if (categoryId) {
      const cat = language.categories.find(c => c.id === categoryId);
      if (cat) { setLetterSet(null); setStepResult(null); startQuiz(cat); }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [launchId]);

  // ── DONE ──────────────────────────────────────────────────────────────
  if (phase === 'done') {
    const total = questions.length;
    const pct = Math.round((correctCount / total) * 100);
    const perfect = correctCount === total;
    const xpEarned = correctCount * XP_PER_CORRECT + (perfect ? XP_PERFECT_BONUS : 0);
    return (
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <View style={styles.doneContainer}>
          {pct >= 50
            ? <Image source={perfect ? ILLUSTRATIONS.achievement : ILLUSTRATIONS.success} style={styles.doneArt} resizeMode="contain" />
            : <Image source={ILLUSTRATIONS.path} style={styles.doneArt} resizeMode="contain" />}
          <Text style={styles.doneTitle}>
            {perfect ? 'Parfait !' : pct >= 50 ? 'Bien joué !' : 'Continue à t\'entraîner !'}
          </Text>
          <Text style={styles.doneScore}>{correctCount} / {total}</Text>
          <Text style={styles.doneXp}>+{xpEarned} XP</Text>
          {stepResult === 'passed' && (
            <View style={[styles.bestBadge, { backgroundColor: colors.successLight }]}>
              <Ionicons name="checkmark-circle" size={14} color={colors.success} />
              <Text style={[styles.bestBadgeText, { color: colors.success }]}>Étape du parcours validée</Text>
            </View>
          )}
          {stepResult === 'failed' && (
            <View style={[styles.bestBadge, { backgroundColor: colors.destructiveLight }]}>
              <Ionicons name="refresh-circle" size={14} color={colors.destructive} />
              <Text style={[styles.bestBadgeText, { color: colors.destructive }]}>
                {letterSet ? READQUIZ_PASS_PCT : QUIZ_PASS_PCT} % requis pour valider l'étape — réessaie !
              </Text>
            </View>
          )}
          {!stepResult && pct >= (currentProgress?.quiz_best_score ?? 0) && pct > 0 && (
            <View style={styles.bestBadge}>
              <Ionicons name="trophy" size={14} color={colors.secondary} />
              <Text style={styles.bestBadgeText}>Nouveau record !</Text>
            </View>
          )}
          <View style={styles.doneActions}>
            <TouchableOpacity
              style={styles.doneBtnSecondary}
              onPress={() => { setPhase('setup'); setCategory(null); setThemeSel(null); setLetterSet(null); setStepResult(null); }}
            >
              <Text style={styles.doneBtnSecondaryText}>Autre catégorie</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.doneBtnPrimary}
              onPress={() => { if (letterSet) startLetterQuiz(letterSet); else if (themeSel) startTheme(themeSel); else if (category) startQuiz(category); }}
            >
              <Ionicons name="refresh" size={16} color={colors.white} />
              <Text style={styles.doneBtnPrimaryText}>Rejouer</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.doneBackLink} onPress={() => navigation.goBack()}>
            <Text style={styles.doneBackLinkText}>Retour à l'accueil</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // ── PLAYING ───────────────────────────────────────────────────────────
  if (phase === 'playing' && questions[current]) {
    const q = questions[current];
    const answered = selected !== null;
    return (
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => setPhase('setup')} style={styles.backBtn}>
              <Ionicons name="arrow-back" size={22} color={colors.text} />
            </TouchableOpacity>
            <View style={{ flex: 1 }}>
              <Text style={styles.headerTitle}>{category?.emoji} Quiz · {category?.label}</Text>
              <Text style={styles.headerSubtitle}>
                Question {current + 1} / {questions.length} · {correctCount} ✓
              </Text>
            </View>
          </View>

          <View style={styles.progressBg}>
            <View style={[styles.progressFill, { width: `${((current + 1) / questions.length) * 100}%` as any }]} />
          </View>

          <ScrollView contentContainerStyle={styles.playContent} showsVerticalScrollIndicator={false}>
            <View style={styles.questionCard}>
              {(!!q.image || !!q.emoji || !!q.color) && <View style={{ marginBottom: 10 }}><WordPic img={q.image} emoji={q.emoji} color={q.color} size={130} /></View>}
              <Text style={[styles.questionText, language.rtl && q.speakText && styles.rtlText]}>
                {q.question}
              </Text>
              {!!q.speakText && (
                <TouchableOpacity onPress={() => speak(q.speakText!)} style={styles.speakBtn}>
                  <Ionicons name="volume-high" size={20} color={colors.primary} />
                </TouchableOpacity>
              )}
            </View>

            {q.choices.map((choice, i) => {
              const isCorrect = i === q.correctIndex;
              const isSelected = i === selected;
              return (
                <TouchableOpacity
                  key={`${current}_${i}`}
                  style={[
                    styles.choiceBtn,
                    answered && isCorrect && styles.choiceCorrect,
                    answered && isSelected && !isCorrect && styles.choiceWrong,
                  ]}
                  onPress={() => answer(i)}
                  disabled={answered}
                  activeOpacity={0.8}
                >
                  <Text style={[
                    styles.choiceText,
                    answered && isCorrect && styles.choiceTextCorrect,
                    answered && isSelected && !isCorrect && styles.choiceTextWrong,
                  ]}>
                    {choice}
                  </Text>
                  {answered && isCorrect && (
                    <Ionicons name="checkmark-circle" size={20} color={colors.success} />
                  )}
                  {answered && isSelected && !isCorrect && (
                    <Ionicons name="close-circle" size={20} color={colors.destructive} />
                  )}
                </TouchableOpacity>
              );
            })}

            {answered && (
              <Animated.View entering={FadeInDown.springify().damping(16)}>
                {!!q.explanation && (
                  <View style={styles.explanationBox}>
                    <Ionicons name="bulb" size={14} color={colors.secondary} />
                    <Text style={styles.explanationText}>{q.explanation}</Text>
                  </View>
                )}
                <TouchableOpacity style={styles.nextBtn} onPress={next}>
                  <Text style={styles.nextBtnText}>
                    {current < questions.length - 1 ? 'Question suivante' : 'Voir mon score'}
                  </Text>
                  <Ionicons name="arrow-forward" size={18} color={colors.white} />
                </TouchableOpacity>
              </Animated.View>
            )}
            <View style={{ height: 60 }} />
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }

  // ── SETUP (category selection) ────────────────────────────────────────
  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView contentContainerStyle={styles.setupContent} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={22} color={colors.text} />
          </TouchableOpacity>
          <View style={{ flex: 1 }}>
            <Text style={styles.headerTitle}>{language.flag} Quiz {language.familiarName}</Text>
            <Text style={styles.headerSubtitle}>
              {QUIZ_SIZE} questions · Record : {bestScore}%
            </Text>
          </View>
        </View>

        {genError && <Text style={styles.genErrorText}>{genError}</Text>}
        {isGenerating && (
          <View style={styles.generatingRow}>
            <ActivityIndicator size="small" color={colors.primary} />
            <Text style={styles.generatingText}>Génération du quiz par l'IA...</Text>
          </View>
        )}

        {integrated && (quizThemes.themes.length > 0 || deckWords.length >= 4) ? (
          <>
            {deckWords.length >= 4 && (
              <>
                <Text style={styles.setupHint}>Mon paquet</Text>
                <View style={styles.themeList}>
                  <PressableScale style={styles.themeRow} disabled={isGenerating}
                    onPress={() => startTheme({ id: 'deck', kind: 'deck', label: 'Mon paquet', emoji: '🔖', count: deckWords.length })}>
                    <Text style={styles.themeEmoji}>🔖</Text>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.themeLabel}>Mots de mon paquet</Text>
                      <Text style={styles.themeSub}>{deckWords.length} mots à réviser</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
                  </PressableScale>
                </View>
              </>
            )}

            <Text style={styles.setupHint}>Par thème</Text>
            <View style={styles.catGrid}>
              {quizThemes.themes.map((t, i) => (
                <Animated.View key={t.id} entering={FadeInDown.delay(i * 35).springify().damping(16)} style={styles.catCardWrap}>
                  <PressableScale style={styles.catCard} onPress={() => startTheme(t)} disabled={isGenerating}>
                    <Text style={styles.catEmoji}>{t.emoji}</Text>
                    <Text style={styles.catLabel}>{t.label}</Text>
                    <Text style={styles.themeSub}>{t.count} mots</Text>
                  </PressableScale>
                </Animated.View>
              ))}
              {quizThemes.mix && (
                <View style={styles.catCardWrap}>
                  <PressableScale style={[styles.catCard, { borderColor: colors.secondary }]} onPress={() => startTheme(quizThemes.mix!)} disabled={isGenerating}>
                    <Text style={styles.catEmoji}>{quizThemes.mix.emoji}</Text>
                    <Text style={styles.catLabel}>{quizThemes.mix.label}</Text>
                    <Text style={styles.themeSub}>{quizThemes.mix.count} mots</Text>
                  </PressableScale>
                </View>
              )}
            </View>

            {quizThemes.units.length > 0 && (
              <>
                <Text style={[styles.setupHint, { marginTop: 18 }]}>Par unité du parcours</Text>
                <View style={styles.themeList}>
                  {quizThemes.units.map(u => (
                    <PressableScale key={u.id} style={styles.themeRow} onPress={() => startTheme(u)} disabled={isGenerating}>
                      <Text style={styles.themeEmoji}>{u.emoji}</Text>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.themeLabel} numberOfLines={1}>{u.label}</Text>
                        <Text style={styles.themeSub}>{u.subtitle} · {u.count} mots</Text>
                      </View>
                      <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
                    </PressableScale>
                  ))}
                </View>
              </>
            )}
          </>
        ) : (
          <>
        <Text style={styles.setupHint}>Choisis une catégorie :</Text>
        <View style={styles.catGrid}>
          {language.categories.map((cat, i) => (
            <Animated.View
              key={cat.id}
              entering={FadeInDown.delay(i * 45).springify().damping(16)}
              style={styles.catCardWrap}
            >
              <PressableScale
                style={styles.catCard}
                onPress={() => startQuiz(cat)}
                disabled={isGenerating}
              >
                <Text style={styles.catEmoji}>{cat.emoji}</Text>
                <Text style={styles.catLabel}>{cat.label}</Text>
                {!hasLocalQuiz(language.code, cat.id) && (
                  <View style={styles.aiTag}>
                    <Ionicons name="sparkles" size={9} color={colors.secondary} />
                    <Text style={styles.aiTagText}>IA</Text>
                  </View>
                )}
              </PressableScale>
            </Animated.View>
          ))}
        </View>
          </>
        )}
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

  // setup
  setupContent: { paddingBottom: 120 },
  setupHint: {
    fontSize: fontSize.sm, fontWeight: '600', color: colors.textMuted,
    paddingHorizontal: 16, marginBottom: 10,
  },
  catGrid: {
    flexDirection: 'row', flexWrap: 'wrap',
    paddingHorizontal: 16, gap: 10,
  },
  catCardWrap: { width: '47.5%' },
  themeList: { paddingHorizontal: 16, gap: 8, marginBottom: 6 },
  themeRow: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: colors.card, borderRadius: borderRadius.xl, borderWidth: 1, borderColor: colors.border, padding: 14 },
  themeEmoji: { fontSize: 24 },
  themeLabel: { fontSize: fontSize.base, fontWeight: '700', color: colors.text },
  themeSub: { fontSize: fontSize.xs, color: colors.textMuted },
  catCard: {
    backgroundColor: colors.card,
    borderRadius: borderRadius['2xl'],
    borderWidth: 1, borderColor: colors.border,
    paddingVertical: 18, paddingHorizontal: 12,
    alignItems: 'center', gap: 6,
  },
  catEmoji: { fontSize: 28 },
  catLabel: { fontSize: fontSize.sm, fontWeight: '700', color: colors.text, textAlign: 'center' },
  aiTag: {
    flexDirection: 'row', alignItems: 'center', gap: 3,
    backgroundColor: `${colors.secondary}20`,
    borderRadius: borderRadius.sm,
    paddingHorizontal: 6, paddingVertical: 2,
  },
  aiTagText: { fontSize: 9, fontWeight: '700', color: colors.secondary },
  genErrorText: {
    fontSize: fontSize.xs, color: colors.destructive,
    paddingHorizontal: 16, marginBottom: 8, textAlign: 'center',
  },
  generatingRow: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 8, marginBottom: 12,
  },
  generatingText: { fontSize: fontSize.sm, color: colors.textMuted },

  // playing
  progressBg: {
    height: 4, backgroundColor: `${colors.textMuted}20`,
    marginHorizontal: 16, borderRadius: 2, overflow: 'hidden', marginBottom: 16,
  },
  progressFill: { height: '100%', backgroundColor: colors.primary, borderRadius: 2 },
  playContent: { paddingHorizontal: 16 },
  questionCard: {
    backgroundColor: colors.card,
    borderRadius: borderRadius['2xl'],
    borderWidth: 1, borderColor: colors.border,
    paddingVertical: 28, paddingHorizontal: 20,
    alignItems: 'center', marginBottom: 16, gap: 12,
  },
  questionText: { fontSize: fontSize.xl, fontWeight: '700', color: colors.text, textAlign: 'center' },
  rtlText: { writingDirection: 'rtl' },
  speakBtn: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: `${colors.primary}12`,
    justifyContent: 'center', alignItems: 'center',
  },
  choiceBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    backgroundColor: colors.card,
    borderRadius: borderRadius.xl,
    borderWidth: 1.5, borderColor: colors.border,
    paddingVertical: 14, paddingHorizontal: 16,
    marginBottom: 10, gap: 8,
  },
  choiceCorrect: { borderColor: colors.success, backgroundColor: `${colors.success}0C` },
  choiceWrong: { borderColor: colors.destructive, backgroundColor: `${colors.destructive}0C` },
  choiceText: { flex: 1, fontSize: fontSize.lg, fontWeight: '600', color: colors.text },
  choiceTextCorrect: { color: colors.success },
  choiceTextWrong: { color: colors.destructive },
  explanationBox: {
    flexDirection: 'row', alignItems: 'flex-start', gap: 8,
    backgroundColor: `${colors.secondary}10`,
    borderRadius: borderRadius.xl,
    padding: 12, marginTop: 4, marginBottom: 12,
  },
  explanationText: { flex: 1, fontSize: fontSize.sm, color: colors.text, lineHeight: 20 },
  nextBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 8, backgroundColor: colors.primary,
    borderRadius: borderRadius['2xl'], paddingVertical: 15,
  },
  nextBtnText: { color: colors.white, fontSize: fontSize.base, fontWeight: '700' },

  // done
  doneContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 24 },
  doneEmoji: { fontSize: 64, marginBottom: 12 },
  doneArt: { width: 160, height: 160, marginBottom: 12 },
  doneTitle: { fontSize: fontSize['2xl'] ?? 24, fontWeight: '800', color: colors.text, marginBottom: 8 },
  doneScore: { fontSize: 44, fontWeight: '800', color: colors.primary },
  doneXp: { fontSize: fontSize.lg, fontWeight: '700', color: colors.secondary, marginTop: 4 },
  bestBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 5,
    backgroundColor: `${colors.secondary}15`,
    borderRadius: borderRadius.full,
    paddingHorizontal: 12, paddingVertical: 6, marginTop: 12,
  },
  bestBadgeText: { fontSize: fontSize.xs, fontWeight: '700', color: colors.secondary },
  doneActions: { flexDirection: 'row', gap: 12, marginTop: 28, width: '100%' },
  doneBtnSecondary: {
    flex: 1, alignItems: 'center', justifyContent: 'center',
    backgroundColor: colors.card,
    borderRadius: borderRadius['2xl'],
    borderWidth: 1, borderColor: colors.border, paddingVertical: 14,
  },
  doneBtnSecondaryText: { fontSize: fontSize.base, fontWeight: '600', color: colors.text },
  doneBtnPrimary: {
    flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 6, backgroundColor: colors.primary,
    borderRadius: borderRadius['2xl'], paddingVertical: 14,
  },
  doneBtnPrimaryText: { fontSize: fontSize.base, fontWeight: '700', color: colors.white },
  doneBackLink: { marginTop: 18, padding: 8 },
  doneBackLinkText: { fontSize: fontSize.sm, color: colors.textMuted, fontWeight: '600' },
});
