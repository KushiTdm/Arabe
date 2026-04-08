import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Speech from 'expo-speech';
import { useUserProgress } from '../lib/useUserProgress';
import { Card, Badge, LoadingSpinner, Button, ProgressBar } from '../components/RNComponents';
import { colors, spacing, borderRadius, fontSize } from '../theme';
import { base44 } from '../api/base44Client';

const GEMINI_MODEL = 'gemini_2_flash';

const CATEGORIES = [
  { id: 'greetings', label: 'Salutations', emoji: '👋', arabic: 'التحيات' },
  { id: 'numbers', label: 'Nombres', emoji: '🔢', arabic: 'الأرقام' },
  { id: 'family', label: 'Famille', emoji: '👨‍👩‍👧', arabic: 'العائلة' },
  { id: 'food', label: 'Nourriture', emoji: '🍕', arabic: 'الطعام' },
  { id: 'travel', label: 'Voyage', emoji: '✈️', arabic: 'السفر' },
  { id: 'daily_life', label: 'Vie quotidienne', emoji: '☀️', arabic: 'الحياة اليومية' },
  { id: 'colors', label: 'Couleurs', emoji: '🎨', arabic: 'الألوان' },
  { id: 'animals', label: 'Animaux', emoji: '🐱', arabic: 'الحيوانات' },
];

export default function VocabularyScreen() {
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [words, setWords] = useState<any[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [genError, setGenError] = useState<string | null>(null);
  const [flashcardIndex, setFlashcardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [mode, setMode] = useState<'browse' | 'flashcard'>('browse');
  
  const { incrementCredits, canUseAI, creditsRemaining, addXP, updateProgress, progress } = useUserProgress();

  const speakArabic = (text: string) => {
    Speech.speak(text, {
      language: 'ar-SA',
      rate: 0.85,
    });
  };

  const loadWords = async (category: string) => {
    setGenError(null);
    try {
      const existing = await base44.entities.Vocabulary.filter({ category });
      if (existing.length > 0) {
        setWords(existing);
        return;
      }

      if (!canUseAI()) return;
      setIsGenerating(true);

      const ok = await incrementCredits();
      if (!ok) return;

      const res = await base44.integrations.Core.InvokeLLM({
        prompt: `Génère 10 mots de vocabulaire arabe pour la catégorie "${CATEGORIES.find(c => c.id === category)?.label}". 
Pour chaque mot, donne: le mot en arabe, la translitération, et la traduction en français.
Choisis des mots courants et utiles pour un débutant.`,
        model: GEMINI_MODEL,
        response_json_schema: {
          type: 'object',
          properties: {
            words: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  arabic_word: { type: 'string' },
                  transliteration: { type: 'string' },
                  french_translation: { type: 'string' },
                },
              },
            },
          },
        },
      });

      const created = await base44.entities.Vocabulary.bulkCreate(
        res.words.map((w: any) => ({
          ...w,
          category,
          difficulty: 'beginner',
          mastered: false,
          practice_count: 0,
        }))
      );
      setWords(created);
      await updateProgress({ vocab_learned: (progress?.vocab_learned || 0) + res.words.length });
    } catch (err) {
      console.error('Erreur chargement vocabulaire:', err);
      setGenError('Impossible de charger le vocabulaire. Veuillez réessayer.');
    } finally {
      setIsGenerating(false);
    }
  };

  const selectCategory = (cat: any) => {
    setSelectedCategory(cat);
    setMode('browse');
    setFlashcardIndex(0);
    setShowAnswer(false);
    loadWords(cat.id);
  };

  const startFlashcards = () => {
    setMode('flashcard');
    setFlashcardIndex(0);
    setShowAnswer(false);
  };

  const nextFlashcard = async (mastered: boolean) => {
    try {
      if (mastered && words[flashcardIndex]) {
        await base44.entities.Vocabulary.update(words[flashcardIndex].id, {
          mastered: true,
          practice_count: (words[flashcardIndex].practice_count || 0) + 1,
        });
        await addXP(3);
      }
    } catch (err) {
      console.error('Erreur mise à jour flashcard:', err);
    }

    if (flashcardIndex < words.length - 1) {
      setFlashcardIndex(i => i + 1);
      setShowAnswer(false);
    } else {
      setMode('browse');
      setFlashcardIndex(0);
      loadWords(selectedCategory.id);
    }
  };

  if (isGenerating) {
    return (
      <View style={styles.loadingContainer}>
        <LoadingSpinner size="lg" />
        <Text style={styles.loadingText}>Génération du vocabulaire avec Gemini…</Text>
      </View>
    );
  }

  if (!selectedCategory) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={{ flex: 1 }}>
            <Text style={styles.headerTitle}>Vocabulaire</Text>
            <Text style={styles.headerSubtitle}>Choisissez une catégorie</Text>
          </View>
          <Badge color="primary">{creditsRemaining()} crédits</Badge>
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

        <ProgressBar 
          progress={((flashcardIndex + 1) / words.length) * 100} 
          height={4} 
        />

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
            </>
          )}
        </TouchableOpacity>

        {showAnswer && (
          <View style={styles.flashcardButtons}>
            <Button 
              variant="outline" 
              onPress={() => nextFlashcard(false)}
              style={{ flex: 1, marginRight: 8 }}
            >
              <Ionicons name="refresh" size={16} color={colors.text} /> Revoir
            </Button>
            <Button 
              onPress={() => nextFlashcard(true)}
              style={{ flex: 1, marginLeft: 8 }}
            >
              <Ionicons name="checkmark" size={16} color={colors.white} /> Maîtrisé
            </Button>
          </View>
        )}
      </View>
    );
  }

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

      {words.length > 0 && (
        <Button onPress={startFlashcards} fullWidth style={{ marginBottom: 16 }}>
          <Ionicons name="sparkles" size={16} color={colors.white} /> Mode Flashcards
        </Button>
      )}

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
                {word.mastered && <Text style={styles.wordMastered}>✅ Maîtrisé</Text>}
              </View>
              <TouchableOpacity 
                onPress={() => speakArabic(word.arabic_word)}
                style={styles.audioButton}
              >
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
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingBottom: 100,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
    gap: 16,
  },
  loadingText: {
    fontSize: fontSize.sm,
    color: colors.textMuted,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 56,
    paddingBottom: 16,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: fontSize.xl,
    fontWeight: '700',
    color: colors.text,
  },
  headerSubtitle: {
    fontSize: fontSize.xs,
    color: colors.textMuted,
  },
  backButton: {
    padding: 8,
    marginRight: 12,
    borderRadius: borderRadius.lg,
    backgroundColor: `${colors.textMuted}15`,
  },
  progressText: {
    fontSize: fontSize.xs,
    color: colors.textMuted,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
    paddingHorizontal: 20,
  },
  categoryCard: {
    width: '47%',
    backgroundColor: colors.card,
    borderRadius: borderRadius['2xl'],
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    alignItems: 'center',
  },
  categoryEmoji: {
    fontSize: 24,
    marginBottom: spacing.sm,
  },
  categoryLabel: {
    fontSize: fontSize.sm,
    fontWeight: '600',
    color: colors.text,
  },
  categoryArabic: {
    fontSize: fontSize.xs,
    color: colors.textMuted,
    marginTop: 4,
  },
  flashcard: {
    flex: 1,
    margin: 20,
    backgroundColor: colors.card,
    borderRadius: borderRadius['3xl'],
    borderWidth: 1,
    borderColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  flashcardArabic: {
    fontSize: 48,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'center',
  },
  flashcardHint: {
    fontSize: fontSize.sm,
    color: colors.textMuted,
    marginTop: 16,
  },
  flashcardTransliteration: {
    fontSize: fontSize.lg,
    color: colors.primary,
    fontStyle: 'italic',
    marginTop: 12,
  },
  flashcardFrench: {
    fontSize: fontSize.xl,
    fontWeight: '600',
    color: colors.text,
    marginTop: 8,
  },
  flashcardButtons: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  wordsList: {
    paddingHorizontal: 20,
    gap: 8,
  },
  wordCard: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  wordContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  wordArabic: {
    fontSize: fontSize.lg,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'right',
  },
  wordTransliteration: {
    fontSize: fontSize.xs,
    color: colors.primary,
    fontStyle: 'italic',
  },
  wordRight: {
    alignItems: 'flex-end',
    marginRight: 8,
  },
  wordFrench: {
    fontSize: fontSize.sm,
    color: colors.text,
  },
  wordMastered: {
    fontSize: fontSize.xs,
    color: colors.primary,
  },
  audioButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: `${colors.primary}15`,
    justifyContent: 'center',
    alignItems: 'center',
  },
});