import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Speech from 'expo-speech';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { useUserProgress } from '../lib/useUserProgress';
import { Card, Badge, Button, ProgressBar } from '../components/RNComponents';
import { colors, spacing, borderRadius, fontSize } from '../theme';
import { getWordsForCategory, VocabWord } from '../data/vocabulary';

const CATEGORIES = [
  { id: 'greetings',  label: 'Salutations',     emoji: '👋', arabic: 'التحيات' },
  { id: 'numbers',    label: 'Nombres',          emoji: '🔢', arabic: 'الأرقام' },
  { id: 'family',     label: 'Famille',          emoji: '👨‍👩‍👧', arabic: 'العائلة' },
  { id: 'food',       label: 'Nourriture',       emoji: '🍕', arabic: 'الطعام' },
  { id: 'travel',     label: 'Voyage',           emoji: '✈️', arabic: 'السفر' },
  { id: 'daily_life', label: 'Vie quotidienne',  emoji: '☀️', arabic: 'الحياة اليومية' },
  { id: 'colors',     label: 'Couleurs',         emoji: '🎨', arabic: 'الألوان' },
  { id: 'animals',    label: 'Animaux',          emoji: '🐱', arabic: 'الحيوانات' },
];

const MASTERED_KEY = '@maa_mastered_words';

async function loadMastered(): Promise<Record<string, boolean>> {
  try {
    const raw = await AsyncStorage.getItem(MASTERED_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

async function saveMastered(map: Record<string, boolean>) {
  await AsyncStorage.setItem(MASTERED_KEY, JSON.stringify(map));
}

export default function VocabularyScreen() {
  const [selectedCategory, setSelectedCategory] = useState<(typeof CATEGORIES)[0] | null>(null);
  const [words, setWords] = useState<VocabWord[]>([]);
  const [masteredMap, setMasteredMap] = useState<Record<string, boolean>>({});
  const [flashcardIndex, setFlashcardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [mode, setMode] = useState<'browse' | 'flashcard'>('browse');

  const { addXP, updateProgress, progress } = useUserProgress();

  // Reload mastered state whenever screen gains focus
  useFocusEffect(
    useCallback(() => {
      loadMastered().then(setMasteredMap);
    }, []),
  );

  const selectCategory = async (cat: (typeof CATEGORIES)[0]) => {
    const raw = getWordsForCategory(cat.id);
    const mastered = await loadMastered();
    setMasteredMap(mastered);
    const enriched = raw.map(w => ({ ...w, mastered: mastered[w.id] ?? false }));
    setWords(enriched);
    setSelectedCategory(cat);
    setMode('browse');
    setFlashcardIndex(0);
    setShowAnswer(false);
  };

  const startFlashcards = () => {
    setMode('flashcard');
    setFlashcardIndex(0);
    setShowAnswer(false);
  };

  const speakArabic = (text: string) => {
    Speech.speak(text, { language: 'ar-SA', rate: 0.85 });
  };

  const nextFlashcard = async (mastered: boolean) => {
    const word = words[flashcardIndex];
    if (mastered && word) {
      const updated = { ...masteredMap, [word.id]: true };
      setMasteredMap(updated);
      await saveMastered(updated);
      setWords(prev => prev.map(w => (w.id === word.id ? { ...w, mastered: true } : w)));
      await addXP(3);
    }

    if (flashcardIndex < words.length - 1) {
      setFlashcardIndex(i => i + 1);
      setShowAnswer(false);
    } else {
      // Session terminée
      const newLearned = words.filter(w => !masteredMap[w.id]).length;
      await updateProgress({
        vocab_learned: (progress?.vocab_learned || 0) + newLearned,
      });
      setMode('browse');
      setFlashcardIndex(0);
    }
  };

  // ── Category selection ─────────────────────────────────────────────────────
  if (!selectedCategory) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={{ flex: 1 }}>
            <Text style={styles.headerTitle}>Vocabulaire</Text>
            <Text style={styles.headerSubtitle}>Choisis une catégorie, Fatima !</Text>
          </View>
        </View>
        <View style={styles.categoriesGrid}>
          {CATEGORIES.map(cat => (
            <TouchableOpacity
              key={cat.id}
              style={styles.categoryCard}
              onPress={() => selectCategory(cat)}
            >
              <Text style={styles.categoryEmoji}>{cat.emoji}</Text>
              <Text style={styles.categoryLabel}>{cat.label}</Text>
              <Text style={styles.categoryArabic}>{cat.arabic}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  }

  // ── Flashcard mode ─────────────────────────────────────────────────────────
  if (mode === 'flashcard' && words.length > 0) {
    const word = words[flashcardIndex];
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setMode('browse')} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={styles.progressText}>{flashcardIndex + 1} / {words.length}</Text>
        </View>

        <ProgressBar progress={((flashcardIndex + 1) / words.length) * 100} height={4} />

        <TouchableOpacity
          style={styles.flashcard}
          onPress={() => setShowAnswer(true)}
          activeOpacity={0.9}
        >
          <Text style={styles.flashcardArabic}>{word.arabic_word}</Text>
          {!showAnswer ? (
            <Text style={styles.flashcardHint}>Touchez pour voir la réponse</Text>
          ) : (
            <>
              <Text style={styles.flashcardTransliteration}>{word.transliteration}</Text>
              <Text style={styles.flashcardFrench}>{word.french_translation}</Text>
              <TouchableOpacity
                onPress={() => speakArabic(word.arabic_word)}
                style={styles.speakBtn}
              >
                <Ionicons name="volume-high" size={20} color={colors.primary} />
              </TouchableOpacity>
            </>
          )}
          {word.mastered && <Text style={styles.masteredBadge}>✅ Déjà maîtrisé</Text>}
        </TouchableOpacity>

        {showAnswer && (
          <View style={styles.flashcardButtons}>
            <Button variant="outline" onPress={() => nextFlashcard(false)} style={{ flex: 1, marginRight: 8 }}>
              Revoir
            </Button>
            <Button onPress={() => nextFlashcard(true)} style={{ flex: 1, marginLeft: 8 }}>
              Maîtrisé ✓
            </Button>
          </View>
        )}
      </View>
    );
  }

  // ── Browse mode ────────────────────────────────────────────────────────────
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setSelectedCategory(null)} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text style={styles.headerTitle}>{selectedCategory.emoji} {selectedCategory.label}</Text>
          <Text style={styles.headerSubtitle}>{words.length} mots</Text>
        </View>
      </View>

      <Button onPress={startFlashcards} fullWidth style={{ marginHorizontal: 20, marginBottom: 16 }}>
        <Ionicons name="sparkles" size={16} color={colors.white} /> Mode Flashcards
      </Button>

      <View style={styles.wordsList}>
        {words.map(word => (
          <Card key={word.id} style={styles.wordCard}>
            <View style={styles.wordContent}>
              <View style={{ flex: 1 }}>
                <Text style={styles.wordArabic}>{word.arabic_word}</Text>
                <Text style={styles.wordTransliteration}>{word.transliteration}</Text>
              </View>
              <View style={styles.wordRight}>
                <Text style={styles.wordFrench}>{word.french_translation}</Text>
                {(masteredMap[word.id]) && <Text style={styles.wordMastered}>✅ Maîtrisé</Text>}
              </View>
              <TouchableOpacity onPress={() => speakArabic(word.arabic_word)} style={styles.audioButton}>
                <Ionicons name="volume-high" size={18} color={colors.primary} />
              </TouchableOpacity>
            </View>
          </Card>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:              { flex: 1, backgroundColor: colors.background },
  content:                { paddingBottom: 100 },
  header:                 { flexDirection: 'row', alignItems: 'center', paddingTop: 56, paddingBottom: 16, paddingHorizontal: 20 },
  headerTitle:            { fontSize: fontSize.xl, fontWeight: '700', color: colors.text },
  headerSubtitle:         { fontSize: fontSize.xs, color: colors.textMuted },
  backButton:             { padding: 8, marginRight: 12, borderRadius: borderRadius.lg, backgroundColor: `${colors.textMuted}15` },
  progressText:           { fontSize: fontSize.xs, color: colors.textMuted, flex: 1, textAlign: 'right' },
  categoriesGrid:         { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md, paddingHorizontal: 20 },
  categoryCard:           { width: '47%', backgroundColor: colors.card, borderRadius: borderRadius['2xl'], borderWidth: 1, borderColor: colors.border, padding: spacing.lg, alignItems: 'center' },
  categoryEmoji:          { fontSize: 24, marginBottom: spacing.sm },
  categoryLabel:          { fontSize: fontSize.sm, fontWeight: '600', color: colors.text },
  categoryArabic:         { fontSize: fontSize.xs, color: colors.textMuted, marginTop: 4 },
  flashcard:              { flex: 1, margin: 20, backgroundColor: colors.card, borderRadius: borderRadius['3xl'], borderWidth: 1, borderColor: colors.border, justifyContent: 'center', alignItems: 'center', padding: 40 },
  flashcardArabic:        { fontSize: 48, fontWeight: '700', color: colors.text, textAlign: 'center' },
  flashcardHint:          { fontSize: fontSize.sm, color: colors.textMuted, marginTop: 16 },
  flashcardTransliteration:{ fontSize: fontSize.lg, color: colors.primary, fontStyle: 'italic', marginTop: 12 },
  flashcardFrench:        { fontSize: fontSize.xl, fontWeight: '600', color: colors.text, marginTop: 8 },
  masteredBadge:          { fontSize: fontSize.xs, color: colors.primary, marginTop: 12 },
  speakBtn:               { marginTop: 16, padding: 12, borderRadius: borderRadius.full, backgroundColor: `${colors.primary}15` },
  flashcardButtons:       { flexDirection: 'row', paddingHorizontal: 20, paddingBottom: 60 },
  wordsList:              { paddingHorizontal: 20, gap: 8 },
  wordCard:               {},
  wordContent:            { flexDirection: 'row', alignItems: 'center', flex: 1 },
  wordArabic:             { fontSize: fontSize.lg, fontWeight: '600', color: colors.text, textAlign: 'right' },
  wordTransliteration:    { fontSize: fontSize.xs, color: colors.primary, fontStyle: 'italic' },
  wordRight:              { alignItems: 'flex-end', marginRight: 8 },
  wordFrench:             { fontSize: fontSize.sm, color: colors.text },
  wordMastered:           { fontSize: fontSize.xs, color: colors.primary },
  audioButton:            { width: 32, height: 32, borderRadius: 16, backgroundColor: `${colors.primary}15`, justifyContent: 'center', alignItems: 'center' },
});