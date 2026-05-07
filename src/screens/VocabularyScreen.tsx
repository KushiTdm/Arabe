import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Speech from 'expo-speech';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors, borderRadius, fontSize, spacing } from '../theme';
import { Card } from '../components/RNComponents';
import { useProfile } from '../lib/ProfileContext';
import { invokeAI } from '../api/aiClient';
import {
  getWordsForCategory,
  getAvailableCategories,
  getTotalWords,
  type VocabWord,
} from '../data/multilingualVocab';

// ─── Category display metadata (emoji + French label) ────────────────────────

const CATEGORY_META: Record<string, { label: string; emoji: string }> = {
  greetings:  { label: 'Salutations',     emoji: '👋' },
  numbers:    { label: 'Nombres',          emoji: '🔢' },
  family:     { label: 'Famille',          emoji: '👨‍👩‍👧' },
  food:       { label: 'Nourriture',       emoji: '🍕' },
  travel:     { label: 'Voyage',           emoji: '✈️' },
  daily_life: { label: 'Vie quotidienne',  emoji: '☀️' },
  colors:     { label: 'Couleurs',         emoji: '🎨' },
  animals:    { label: 'Animaux',          emoji: '🐱' },
  body:       { label: 'Corps humain',     emoji: '🫀' },
  emotions:   { label: 'Émotions',         emoji: '😊' },
  religion:   { label: 'Religion',         emoji: '☪️' },
  work:       { label: 'Travail',          emoji: '💼' },
};

// ─── Main screen ─────────────────────────────────────────────────────────────

export default function VocabularyScreen() {
  const { language, canUseAI, incrementCredits } = useProfile();
  const langCode = language.code;

  const availableCategories = getAvailableCategories(langCode);
  const totalWords = getTotalWords(langCode);
  const hasVocab = availableCategories.length > 0;

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [mode, setMode] = useState<'browse' | 'flashcard'>('browse');
  const [flashcardIndex, setFlashcardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [masteredIds, setMasteredIds] = useState<Set<string>>(new Set());
  const [search, setSearch] = useState('');
  const [aiWords, setAiWords] = useState<VocabWord[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [genError, setGenError] = useState<string | null>(null);

  const masteredKey = `@maa_mastered_${langCode}`;

  React.useEffect(() => {
    setSelectedCategory(null);
    setMode('browse');
    setFlashcardIndex(0);
    setShowAnswer(false);
    setSearch('');
    setAiWords([]);
    setGenError(null);
    AsyncStorage.getItem(`@maa_mastered_${langCode}`).then(raw => {
      if (raw) setMasteredIds(new Set(JSON.parse(raw)));
      else setMasteredIds(new Set());
    });
  }, [langCode]);

  React.useEffect(() => {
    if (!selectedCategory) { setAiWords([]); setGenError(null); return; }
    AsyncStorage.getItem(`@maa_aivocab_${langCode}_${selectedCategory}`).then(raw => {
      setAiWords(raw ? JSON.parse(raw) : []);
    });
    setGenError(null);
  }, [langCode, selectedCategory]);

  const speakWord = (text: string) => {
    Speech.speak(text, { language: language.ttsLang, rate: 0.85 });
  };

  const toggleMastered = async (id: string) => {
    const updated = new Set(masteredIds);
    if (updated.has(id)) updated.delete(id);
    else updated.add(id);
    setMasteredIds(updated);
    await AsyncStorage.setItem(masteredKey, JSON.stringify([...updated]));
  };

  const generateMoreWords = async () => {
    if (!selectedCategory || isGenerating || !canUseAI()) return;
    setIsGenerating(true);
    setGenError(null);
    try {
      const ok = await incrementCredits();
      if (!ok) return;
      const meta = CATEGORY_META[selectedCategory];
      const staticWords = getWordsForCategory(langCode, selectedCategory);
      const existingNative = [...staticWords, ...aiWords].map(w => w.native_word).slice(0, 20).join(', ');

      const result = await invokeAI<{ words: Array<{ native_word: string; transliteration: string; french_translation: string }> }>(
        `${language.aiSeedPrompt}
Génère 10 mots de vocabulaire pour la catégorie "${meta?.label || selectedCategory}" en ${language.familiarName}.
Exclus ces mots: ${existingNative}
JSON: {"words":[{"native_word":"...","transliteration":"...","french_translation":"..."}]}`,
        1024,
      );

      if (result?.words?.length) {
        const newWords: VocabWord[] = result.words
          .filter(w => w.native_word)
          .map((w, i) => ({
            id: `ai_${langCode}_${selectedCategory}_${Date.now()}_${i}`,
            native_word: w.native_word,
            transliteration: w.transliteration || '',
            french_translation: w.french_translation || '',
            category: selectedCategory,
            mastered: false,
            practice_count: 0,
          }));

        const updated = [...aiWords, ...newWords];
        setAiWords(updated);
        await AsyncStorage.setItem(`@maa_aivocab_${langCode}_${selectedCategory}`, JSON.stringify(updated));
      }
    } catch (err: any) {
      setGenError(err?.message || 'Erreur lors de la génération.');
    } finally {
      setIsGenerating(false);
    }
  };

  // ── No static vocab for this language ────────────────────────────────
  if (!hasVocab) {
    return (
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>{language.flag} Vocabulaire {language.familiarName}</Text>
          </View>
          <View style={styles.emptyState}>
            <Text style={styles.emptyEmoji}>🤖</Text>
            <Text style={styles.emptyTitle}>Vocabulaire IA</Text>
            <Text style={styles.emptyText}>
              Le vocabulaire statique pour le {language.familiarName} n'est pas encore disponible.{'\n\n'}
              Utilise l'onglet <Text style={{ fontWeight: '700' }}>Conversation</Text> pour apprendre des mots avec l'IA !
            </Text>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  // ── FLASHCARD MODE ────────────────────────────────────────────────────
  if (selectedCategory && mode === 'flashcard') {
    const words = [...getWordsForCategory(langCode, selectedCategory), ...aiWords];
    const word = words[flashcardIndex];
    if (!word) return null;

    const next = async (mark: boolean) => {
      if (mark) await toggleMastered(word.id);
      if (flashcardIndex < words.length - 1) {
        setFlashcardIndex(i => i + 1);
        setShowAnswer(false);
      } else {
        setMode('browse');
        setFlashcardIndex(0);
        setShowAnswer(false);
      }
    };

    return (
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => { setMode('browse'); setFlashcardIndex(0); }} style={styles.backBtn}>
              <Ionicons name="arrow-back" size={22} color={colors.text} />
            </TouchableOpacity>
            <View style={{ flex: 1 }}>
              <Text style={styles.headerTitle}>
                {CATEGORY_META[selectedCategory]?.emoji} Flashcards
              </Text>
              <Text style={styles.headerSubtitle}>{flashcardIndex + 1} / {words.length}</Text>
            </View>
          </View>

          <View style={styles.progressBg}>
            <View style={[styles.progressFill, { width: `${((flashcardIndex + 1) / words.length) * 100}%` as any }]} />
          </View>

          <TouchableOpacity
            style={styles.flashCard}
            onPress={() => setShowAnswer(true)}
            activeOpacity={0.85}
          >
            {!showAnswer ? (
              <>
                <Text style={[styles.flashNative, language.rtl && styles.rtlText]}>{word.native_word}</Text>
                <Text style={styles.flashHint}>Toucher pour voir la réponse</Text>
              </>
            ) : (
              <>
                <Text style={[styles.flashNative, language.rtl && styles.rtlText]}>{word.native_word}</Text>
                {!!word.transliteration && (
                  <Text style={styles.flashTranslit}>{word.transliteration}</Text>
                )}
                <Text style={styles.flashFrench}>{word.french_translation}</Text>
                <TouchableOpacity onPress={() => speakWord(word.native_word)} style={styles.speakBtn}>
                  <Ionicons name="volume-high" size={20} color={colors.primary} />
                </TouchableOpacity>
              </>
            )}
          </TouchableOpacity>

          {showAnswer && (
            <View style={styles.flashActions}>
              <TouchableOpacity style={styles.flashBtnRetry} onPress={() => next(false)}>
                <Ionicons name="refresh" size={18} color={colors.text} />
                <Text style={styles.flashBtnRetryText}>Revoir</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.flashBtnMastered} onPress={() => next(true)}>
                <Ionicons name="checkmark" size={18} color={colors.white} />
                <Text style={styles.flashBtnMasteredText}>Maîtrisé !</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </SafeAreaView>
    );
  }

  // ── BROWSE MODE (category selected) ──────────────────────────────────
  if (selectedCategory) {
    const allWords = [...getWordsForCategory(langCode, selectedCategory), ...aiWords];
    const filtered = search.trim()
      ? allWords.filter(w =>
          w.native_word.includes(search) ||
          w.french_translation.toLowerCase().includes(search.toLowerCase()) ||
          w.transliteration.toLowerCase().includes(search.toLowerCase()),
        )
      : allWords;

    const masteredCount = allWords.filter(w => masteredIds.has(w.id)).length;
    const meta = CATEGORY_META[selectedCategory];

    return (
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => { setSelectedCategory(null); setSearch(''); }} style={styles.backBtn}>
              <Ionicons name="arrow-back" size={22} color={colors.text} />
            </TouchableOpacity>
            <View style={{ flex: 1 }}>
              <Text style={styles.headerTitle}>{meta?.emoji} {meta?.label}</Text>
              <Text style={styles.headerSubtitle}>{allWords.length} mots · {masteredCount} maîtrisés</Text>
            </View>
            <TouchableOpacity
              style={styles.flashcardBtn}
              onPress={() => { setMode('flashcard'); setFlashcardIndex(0); setShowAnswer(false); }}
            >
              <Ionicons name="layers" size={16} color={colors.white} />
              <Text style={styles.flashcardBtnText}>Flashcards</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.searchBar}>
            <Ionicons name="search" size={16} color={colors.textMuted} />
            <TextInput
              style={styles.searchInput}
              value={search}
              onChangeText={setSearch}
              placeholder="Rechercher..."
              placeholderTextColor={colors.textMuted}
            />
            {search.length > 0 && (
              <TouchableOpacity onPress={() => setSearch('')}>
                <Ionicons name="close-circle" size={16} color={colors.textMuted} />
              </TouchableOpacity>
            )}
          </View>

          <ScrollView contentContainerStyle={styles.wordList} showsVerticalScrollIndicator={false}>
            {filtered.map(word => {
              const isMastered = masteredIds.has(word.id);
              const isAI = word.id.startsWith('ai_');
              return (
                <View key={word.id} style={[styles.wordRow, isMastered && styles.wordRowMastered]}>
                  <View style={styles.wordLeft}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                      <Text style={[styles.wordNative, language.rtl && styles.rtlText]}>
                        {word.native_word}
                      </Text>
                      {isAI && (
                        <View style={styles.aiTag}>
                          <Text style={styles.aiTagText}>IA</Text>
                        </View>
                      )}
                    </View>
                    {!!word.transliteration && (
                      <Text style={styles.wordTranslit}>{word.transliteration}</Text>
                    )}
                  </View>
                  <View style={styles.wordRight}>
                    <Text style={styles.wordFrench}>{word.french_translation}</Text>
                  </View>
                  <TouchableOpacity onPress={() => speakWord(word.native_word)} style={styles.iconBtn}>
                    <Ionicons name="volume-high" size={18} color={colors.primary} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => toggleMastered(word.id)} style={styles.iconBtn}>
                    <Ionicons
                      name={isMastered ? 'checkmark-circle' : 'ellipse-outline'}
                      size={20}
                      color={isMastered ? colors.success : colors.textMuted}
                    />
                  </TouchableOpacity>
                </View>
              );
            })}

            <View style={styles.generateSection}>
              {genError && (
                <Text style={styles.genErrorText}>{genError}</Text>
              )}
              <TouchableOpacity
                style={[styles.generateBtn, (isGenerating || !canUseAI()) && { opacity: 0.5 }]}
                onPress={generateMoreWords}
                disabled={isGenerating || !canUseAI()}
              >
                {isGenerating ? (
                  <ActivityIndicator size="small" color={colors.white} />
                ) : (
                  <Ionicons name="sparkles" size={16} color={colors.white} />
                )}
                <Text style={styles.generateBtnText}>
                  {isGenerating ? 'Génération...' : 'Générer plus de mots'}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={{ height: 80 }} />
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }

  // ── CATEGORY SELECTION ────────────────────────────────────────────────
  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView contentContainerStyle={styles.categoryContent} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={{ flex: 1 }}>
            <Text style={styles.headerTitle}>{language.flag} Vocabulaire {language.familiarName}</Text>
            <Text style={styles.headerSubtitle}>{totalWords} mots · {availableCategories.length} catégories</Text>
          </View>
        </View>

        <View style={styles.grid}>
          {availableCategories.map(cat => {
            const meta = CATEGORY_META[cat];
            if (!meta) return null;
            const words = getWordsForCategory(langCode, cat);
            const masteredCount = words.filter(w => masteredIds.has(w.id)).length;
            const pct = Math.round((masteredCount / words.length) * 100);

            return (
              <TouchableOpacity
                key={cat}
                style={styles.catCard}
                onPress={() => { setSelectedCategory(cat); setSearch(''); }}
                activeOpacity={0.75}
              >
                <Text style={styles.catEmoji}>{meta.emoji}</Text>
                <Text style={styles.catLabel}>{meta.label}</Text>
                <Text style={styles.catCount}>{words.length} mots</Text>
                <View style={styles.miniProgressBg}>
                  <View style={[styles.miniProgressFill, { width: `${pct}%` as any }]} />
                </View>
                {masteredCount > 0 && (
                  <Text style={styles.catMastered}>{pct}% maîtrisé</Text>
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

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

  emptyState: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 32 },
  emptyEmoji: { fontSize: 56, marginBottom: 16 },
  emptyTitle: { fontSize: fontSize.xl, fontWeight: '700', color: colors.text, marginBottom: 12 },
  emptyText: { fontSize: fontSize.base, color: colors.textMuted, textAlign: 'center', lineHeight: 24 },

  categoryContent: { paddingHorizontal: 16, paddingBottom: 120 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  catCard: {
    width: '47%',
    backgroundColor: colors.card,
    borderRadius: borderRadius['2xl'],
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    alignItems: 'center',
  },
  catEmoji: { fontSize: 28, marginBottom: 6 },
  catLabel: { fontSize: fontSize.base, fontWeight: '700', color: colors.text, textAlign: 'center' },
  catCount: { fontSize: fontSize.xs, color: colors.primary, marginTop: 4, fontWeight: '600' },
  miniProgressBg: {
    width: '100%', height: 4,
    backgroundColor: `${colors.textMuted}20`,
    borderRadius: 2, overflow: 'hidden', marginTop: 8,
  },
  miniProgressFill: { height: '100%', backgroundColor: colors.success, borderRadius: 2 },
  catMastered: { fontSize: 9, color: colors.success, fontWeight: '700', marginTop: 4 },

  searchBar: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: borderRadius.xl,
    borderWidth: 1, borderColor: colors.border,
    paddingHorizontal: 12, paddingVertical: 8,
    marginHorizontal: 16, marginBottom: 12, gap: 8,
  },
  searchInput: { flex: 1, fontSize: fontSize.base, color: colors.text },

  flashcardBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 5,
    backgroundColor: colors.primary,
    paddingHorizontal: 12, paddingVertical: 7,
    borderRadius: borderRadius.full,
  },
  flashcardBtnText: { color: colors.white, fontSize: fontSize.xs, fontWeight: '700' },

  wordList: { paddingHorizontal: 16 },
  wordRow: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: borderRadius.xl,
    borderWidth: 1, borderColor: colors.border,
    padding: 12, marginBottom: 8, gap: 8,
  },
  wordRowMastered: {
    borderColor: `${colors.success}40`,
    backgroundColor: `${colors.success}06`,
  },
  wordLeft: { flex: 1 },
  wordNative: { fontSize: 22, fontWeight: '700', color: colors.text },
  rtlText: { textAlign: 'right', writingDirection: 'rtl' },
  wordTranslit: { fontSize: fontSize.xs, color: colors.primary, fontStyle: 'italic' },
  wordRight: { flex: 1 },
  wordFrench: { fontSize: fontSize.base, fontWeight: '600', color: colors.text },
  iconBtn: {
    width: 34, height: 34, borderRadius: 17,
    backgroundColor: `${colors.primary}10`,
    justifyContent: 'center', alignItems: 'center',
  },

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
  flashNative: { fontSize: 48, fontWeight: '700', color: colors.text, textAlign: 'center', marginBottom: 8 },
  flashTranslit: { fontSize: fontSize.lg, color: colors.primary, fontStyle: 'italic', marginBottom: 8 },
  flashFrench: { fontSize: fontSize.xl, fontWeight: '700', color: colors.text, marginBottom: 16 },
  flashHint: { fontSize: fontSize.sm, color: colors.textMuted, marginTop: 16 },
  speakBtn: {
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: `${colors.primary}12`,
    justifyContent: 'center', alignItems: 'center',
  },

  aiTag: {
    backgroundColor: `${colors.secondary}25`,
    borderRadius: borderRadius.sm,
    paddingHorizontal: 5, paddingVertical: 1,
  },
  aiTagText: { fontSize: 9, fontWeight: '700', color: colors.secondary },

  generateSection: {
    marginTop: 16, marginHorizontal: 0, gap: 8, alignItems: 'center',
  },
  genErrorText: { fontSize: fontSize.xs, color: colors.destructive, textAlign: 'center' },
  generateBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    backgroundColor: colors.secondary,
    paddingHorizontal: 20, paddingVertical: 12,
    borderRadius: borderRadius.full,
  },
  generateBtnText: { color: colors.white, fontSize: fontSize.base, fontWeight: '700' },

  flashActions: { flexDirection: 'row', gap: 12, marginHorizontal: 16, marginTop: 20 },
  flashBtnRetry: {
    flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 6, backgroundColor: colors.card, borderRadius: borderRadius['2xl'],
    borderWidth: 1, borderColor: colors.border, paddingVertical: 14,
  },
  flashBtnRetryText: { fontSize: fontSize.base, fontWeight: '600', color: colors.text },
  flashBtnMastered: {
    flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 6, backgroundColor: colors.success, borderRadius: borderRadius['2xl'], paddingVertical: 14,
  },
  flashBtnMasteredText: { fontSize: fontSize.base, fontWeight: '700', color: colors.white },
});
