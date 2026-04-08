import { useState } from 'react';
import { ArrowLeft, Loader2, RotateCcw, Check, Sparkles, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { base44 } from '@/api/base44Client';
import { useUserProgress } from '@/lib/useUserProgress';
import CreditsBadge from '@/components/CreditsBadge';
import AudioButton from '@/components/AudioButton';

// Gemini 2.0 Flash — identifiant correct pour base44/InvokeLLM
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

export default function Vocabulary() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [words, setWords] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [genError, setGenError] = useState(null);
  const [flashcardIndex, setFlashcardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [mode, setMode] = useState('browse'); // browse | flashcard
  const { incrementCredits, canUseAI, creditsRemaining, addXP, updateProgress, progress } =
    useUserProgress();

  const loadWords = async (category) => {
    setGenError(null);
    try {
      const existing = await base44.entities.Vocabulary.filter({ category });
      if (existing.length > 0) {
        setWords(existing);
        return;
      }

      // Generate with AI if no words exist
      if (!canUseAI()) return;
      setIsGenerating(true);

      const ok = await incrementCredits();
      if (!ok) return;

      const res = await base44.integrations.Core.InvokeLLM({
        prompt: `Génère 10 mots de vocabulaire arabe pour la catégorie "${CATEGORIES.find((c) => c.id === category)?.label}". 
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
        res.words.map((w) => ({
          ...w,
          category,
          difficulty: 'beginner',
          mastered: false,
          practice_count: 0,
        })),
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

  const selectCategory = (cat) => {
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

  const nextFlashcard = async (mastered) => {
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
      setFlashcardIndex((i) => i + 1);
      setShowAnswer(false);
    } else {
      setMode('browse');
      setFlashcardIndex(0);
      loadWords(selectedCategory.id);
    }
  };

  // ── Écran sélection catégorie ──────────────────────────────────────────────
  if (!selectedCategory) {
    return (
      <div className="px-5 pt-14 pb-4 space-y-6">
        <div className="flex items-center gap-3">
          <Link to="/" className="p-2 rounded-xl hover:bg-muted transition">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex-1">
            <h1 className="text-xl font-bold">Vocabulaire</h1>
            <p className="text-xs text-muted-foreground">Choisissez une catégorie</p>
          </div>
          <CreditsBadge creditsRemaining={creditsRemaining()} />
        </div>

        <div className="grid grid-cols-2 gap-3">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => selectCategory(cat)}
              className="p-4 rounded-2xl bg-card border border-border text-center hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
            >
              <span className="text-2xl block mb-1.5">{cat.emoji}</span>
              <p className="font-semibold text-sm">{cat.label}</p>
              <p className="font-arabic text-xs text-muted-foreground mt-0.5">{cat.arabic}</p>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // ── Chargement IA ──────────────────────────────────────────────────────────
  if (isGenerating) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground">Génération du vocabulaire avec Gemini…</p>
      </div>
    );
  }

  // ── Erreur génération ──────────────────────────────────────────────────────
  if (genError) {
    return (
      <div className="px-5 pt-14 pb-4 space-y-6">
        <button
          onClick={() => setSelectedCategory(null)}
          className="p-2 rounded-xl hover:bg-muted transition"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="p-4 rounded-2xl bg-destructive/10 border border-destructive/20 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-destructive">Erreur</p>
            <p className="text-xs text-muted-foreground mt-1">{genError}</p>
          </div>
        </div>
        <Button onClick={() => loadWords(selectedCategory.id)} className="w-full rounded-2xl">
          Réessayer
        </Button>
      </div>
    );
  }

  // ── Mode Flashcard ─────────────────────────────────────────────────────────
  if (mode === 'flashcard' && words.length > 0) {
    const word = words[flashcardIndex];
    return (
      <div className="px-5 pt-14 pb-4 space-y-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMode('browse')}
            className="p-2 rounded-xl hover:bg-muted transition"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <p className="text-xs text-muted-foreground">
              {flashcardIndex + 1} / {words.length}
            </p>
          </div>
        </div>

        <div className="h-1.5 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-500"
            style={{ width: `${((flashcardIndex + 1) / words.length) * 100}%` }}
          />
        </div>

        <button
          onClick={() => setShowAnswer(true)}
          className="w-full p-12 rounded-3xl bg-card border border-border text-center shadow-sm hover:shadow-md transition-all"
        >
          {!showAnswer ? (
            <>
              <p className="font-arabic text-4xl font-bold" dir="rtl">
                {word.arabic_word}
              </p>
              <p className="text-sm text-muted-foreground mt-4">Touchez pour voir la réponse</p>
            </>
          ) : (
            <>
              <p className="font-arabic text-3xl font-bold" dir="rtl">
                {word.arabic_word}
              </p>
              <p className="text-primary italic mt-3">{word.transliteration}</p>
              <p className="text-lg font-semibold mt-2">{word.french_translation}</p>
            </>
          )}
        </button>

        {showAnswer && (
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1 h-12 rounded-2xl"
              onClick={() => nextFlashcard(false)}
            >
              <RotateCcw className="w-4 h-4 mr-2" /> Revoir
            </Button>
            <Button className="flex-1 h-12 rounded-2xl" onClick={() => nextFlashcard(true)}>
              <Check className="w-4 h-4 mr-2" /> Maîtrisé
            </Button>
          </div>
        )}
      </div>
    );
  }

  // ── Mode Browse ────────────────────────────────────────────────────────────
  return (
    <div className="px-5 pt-14 pb-4 space-y-6">
      <div className="flex items-center gap-3">
        <button
          onClick={() => setSelectedCategory(null)}
          className="p-2 rounded-xl hover:bg-muted transition"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex-1">
          <h1 className="text-lg font-bold">
            {selectedCategory.emoji} {selectedCategory.label}
          </h1>
          <p className="text-xs text-muted-foreground">{words.length} mots</p>
        </div>
      </div>

      {words.length > 0 && (
        <Button onClick={startFlashcards} className="w-full h-12 rounded-2xl">
          <Sparkles className="w-4 h-4 mr-2" /> Mode Flashcards
        </Button>
      )}

      <div className="space-y-2">
        {words.map((word) => (
          <div
            key={word.id}
            className="p-4 rounded-2xl bg-card border border-border flex items-center gap-4"
          >
            <div className="flex-1">
              <p className="font-arabic text-lg font-semibold" dir="rtl">
                {word.arabic_word}
              </p>
              <p className="text-xs text-primary italic">{word.transliteration}</p>
            </div>
            <div className="text-right flex items-center gap-2">
              <div>
                <p className="text-sm font-medium">{word.french_translation}</p>
                {word.mastered && <span className="text-[10px] text-primary">✅ Maîtrisé</span>}
              </div>
              <AudioButton text={word.arabic_word} size="sm" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}