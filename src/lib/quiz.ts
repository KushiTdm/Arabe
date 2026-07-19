import { invokeAI } from '../api/aiClient';
import {
  getAvailableCategories,
  getWordsForCategory,
  type VocabWord,
} from '../data/multilingualVocab';
import type { LanguageConfig } from './languages';

// ─── Types ───────────────────────────────────────────────────────────────────

export interface QuizQuestion {
  question: string;
  /** Text to read aloud in the target language (native word), when relevant. */
  speakText?: string;
  choices: string[];
  correctIndex: number;
  explanation: string;
}

export const QUIZ_SIZE = 8;
export const XP_PER_CORRECT = 2;
export const XP_PERFECT_BONUS = 5;

// ─── Local generator (static vocab, no network, no AI credits) ───────────────

function shuffle<T>(input: T[]): T[] {
  const arr = [...input];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function pickDistractors(
  pool: VocabWord[],
  correct: string,
  key: 'native_word' | 'french_translation',
): string[] {
  const seen = new Set([correct]);
  const out: string[] = [];
  for (const w of shuffle(pool)) {
    const value = w[key];
    if (!seen.has(value)) {
      seen.add(value);
      out.push(value);
    }
    if (out.length === 3) break;
  }
  return out;
}

function explanationFor(word: VocabWord): string {
  return word.transliteration
    ? `${word.native_word} (${word.transliteration}) = ${word.french_translation}`
    : `${word.native_word} = ${word.french_translation}`;
}

export function hasLocalQuiz(langCode: string, category: string): boolean {
  return getWordsForCategory(langCode, category).length >= 4;
}

export function generateLocalQuiz(
  langCode: string,
  category: string,
  size: number = QUIZ_SIZE,
): QuizQuestion[] {
  const words = getWordsForCategory(langCode, category);
  if (words.length < 4) return [];

  // Distractor pool: same category, extended with the whole language if needed
  let pool = words;
  if (pool.length < 8) {
    const allWords = getAvailableCategories(langCode)
      .flatMap(cat => getWordsForCategory(langCode, cat));
    pool = allWords;
  }

  return shuffle(words).slice(0, size).map(word => {
    const nativeToFrench = Math.random() < 0.5;

    if (nativeToFrench) {
      const distractors = pickDistractors(pool, word.french_translation, 'french_translation');
      const choices = shuffle([word.french_translation, ...distractors]);
      return {
        question: `Que signifie « ${word.native_word} » ?`,
        speakText: word.native_word,
        choices,
        correctIndex: choices.indexOf(word.french_translation),
        explanation: explanationFor(word),
      };
    }

    const distractors = pickDistractors(pool, word.native_word, 'native_word');
    const choices = shuffle([word.native_word, ...distractors]);
    return {
      question: `Comment dit-on « ${word.french_translation} » ?`,
      choices,
      correctIndex: choices.indexOf(word.native_word),
      explanation: explanationFor(word),
    };
  });
}

// ─── AI fallback (languages without static vocab) ────────────────────────────

interface AIQuizResponse {
  questions: Array<{
    question: string;
    choices: string[];
    correctIndex: number;
    explanation?: string;
  }>;
}

export async function generateAIQuiz(
  language: LanguageConfig,
  categoryLabel: string,
  size: number = QUIZ_SIZE,
): Promise<QuizQuestion[]> {
  const res = await invokeAI<AIQuizResponse>(
    `${language.aiSeedPrompt}
Génère un QCM de ${size} questions de vocabulaire ${language.familiarName} pour un débutant, catégorie "${categoryLabel}".
Chaque question teste un mot (sens ${language.familiarName}→français ou français→${language.familiarName}). 4 choix, un seul correct.
JSON: {"questions":[{"question":"...","choices":["...","...","...","..."],"correctIndex":0,"explanation":"mot = traduction"}]}`,
    2048,
  );

  const questions = (res?.questions ?? [])
    .filter(q =>
      q?.question &&
      Array.isArray(q.choices) &&
      q.choices.length >= 2 &&
      typeof q.correctIndex === 'number' &&
      q.correctIndex >= 0 &&
      q.correctIndex < q.choices.length,
    )
    .slice(0, size)
    .map(q => ({
      question: q.question,
      choices: q.choices,
      correctIndex: q.correctIndex,
      explanation: q.explanation || '',
    }));

  if (questions.length === 0) {
    throw new Error('Réponse IA invalide. Réessayez.');
  }
  return questions;
}
