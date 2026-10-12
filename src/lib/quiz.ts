import { invokeAI } from '../api/aiClient';
import {
  getAvailableCategories,
  getWordsForCategory,
  type VocabWord,
} from '../data/multilingualVocab';
import type { LanguageConfig, AlphabetLetter } from './languages';
import { levelTag, type Level } from './pedagogy';
import { hasIntegratedCourse, getLessons } from '../content';
import { getLexicon, getLexiconCategories, getLexiconForUnit, LEXICON_THEMES } from '../content/lexicon';

// ─── Types ───────────────────────────────────────────────────────────────────

export interface QuizQuestion {
  question: string;
  /** Text to read aloud in the target language (native word), when relevant. */
  speakText?: string;
  choices: string[];
  correctIndex: number;
  explanation: string;
  /** Photo du mot (clé de content/images.ts) ou emoji de repli, affichée au-dessus de la question. */
  image?: string;
  emoji?: string;
  color?: string;
  /** Question à l'oreille : lire `speakText` automatiquement. */
  listen?: boolean;
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
  level: Level = 'beginner',
  size: number = QUIZ_SIZE,
): Promise<QuizQuestion[]> {
  const res = await invokeAI<AIQuizResponse>(
    `${language.aiSeedPrompt}
${levelTag(level, language)}
Génère un QCM de ${size} questions de vocabulaire ${language.familiarName} à ce niveau, catégorie "${categoryLabel}".
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

// ─── Test de lecture (lettres d'une unité du parcours) ───────────────────────
// Local, sans IA ni crédit : on montre un signe, l'élève choisit sa lecture.

export const LETTERS_CATEGORY = { id: 'letters', label: 'Lecture', emoji: '🔤' };

function letterLabel(l: AlphabetLetter): string {
  return l.sound ? `${l.name} · ${l.sound}` : l.name;
}

export function generateLetterQuiz(
  language: LanguageConfig,
  letters: string[],
  size: number = QUIZ_SIZE,
): QuizQuestion[] {
  const all = language.alphabet;
  const targets = all.filter(l => letters.includes(l.letter));
  if (targets.length === 0) return [];

  // Chaque signe est posé au moins une fois, puis on complète jusqu'à `size`.
  const pool: AlphabetLetter[] = [];
  while (pool.length < Math.min(size, Math.max(targets.length * 2, 4))) {
    pool.push(...shuffle(targets));
  }
  const picked = pool.slice(0, Math.min(size, pool.length));

  return picked.map(target => {
    const correct = letterLabel(target);
    const seen = new Set([correct]);
    const distractors: string[] = [];
    for (const other of shuffle(all)) {
      const label = letterLabel(other);
      if (!seen.has(label)) {
        seen.add(label);
        distractors.push(label);
      }
      if (distractors.length === 3) break;
    }
    const choices = shuffle([correct, ...distractors]);
    return {
      question: `Comment se lit « ${target.letter} » ?`,
      speakText: target.letter,
      choices,
      correctIndex: choices.indexOf(correct),
      explanation: `${target.letter} = ${correct}${target.example ? ` — ex. ${target.example}` : ''}`,
    };
  });
}


// ─── Thèmes de quiz tirés du lexique des leçons (sans IA, sans crédit) ───────

export interface QuizTheme {
  id: string;
  label: string;
  emoji: string;
  /** Nombre de mots testables. */
  count: number;
  kind: 'theme' | 'unit' | 'mix' | 'deck';
  subtitle?: string;
}

const LEVEL_EMOJI: Record<string, string> = { beginner: '🟢', intermediate: '🟡', advanced: '🔴' };
const LEVEL_NAME: Record<string, string> = { beginner: 'A1', intermediate: 'A2', advanced: 'B1' };

/** Thèmes disponibles pour une langue au contenu intégré (≥ 4 mots chacun). */
export function getQuizThemes(code: string): { themes: QuizTheme[]; units: QuizTheme[]; mix: QuizTheme | null } {
  if (!hasIntegratedCourse(code)) return { themes: [], units: [], mix: null };
  const all = getLexicon(code);
  const themes = getLexiconCategories(code)
    .map(id => ({ id, words: all.filter(w => w.category === id) }))
    .filter(t => t.words.length >= 4)
    .map<QuizTheme>(t => ({
      id: t.id, kind: 'theme', count: t.words.length,
      label: LEXICON_THEMES[t.id]?.label ?? t.id, emoji: LEXICON_THEMES[t.id]?.emoji ?? '📚',
    }));
  const units = getLessons(code)
    .map(l => ({ l, n: getLexiconForUnit(code, l.id).length }))
    .filter(x => x.n >= 4)
    .map<QuizTheme>(({ l, n }) => ({
      id: `unit:${l.id}`, kind: 'unit', count: n, label: l.title,
      emoji: LEVEL_EMOJI[l.level] ?? '📘', subtitle: LEVEL_NAME[l.level],
    }));
  const mix = all.length >= 8
    ? { id: 'mix:all', kind: 'mix' as const, count: all.length, label: 'Tout mélangé', emoji: '🎲', subtitle: 'Tous les mots des leçons' }
    : null;
  return { themes, units, mix };
}

/** Mots d'un thème de quiz (thème lexical, unité, ou tout le lexique). */
export function getThemeWords(code: string, themeId: string): VocabWord[] {
  if (themeId === 'mix:all') return getLexicon(code);
  if (themeId.startsWith('unit:')) return getLexiconForUnit(code, themeId.slice(5));
  return getWordsForCategory(code, themeId);
}

/**
 * Quiz mêlant quatre types de questions : sens du mot, traduction vers la langue,
 * photo (« comment dit-on ceci ? ») et écoute. Les photos et l'audio servent
 * seulement quand le mot en a.
 */
export function generateWordsQuiz(words: VocabWord[], pool: VocabWord[], size: number = QUIZ_SIZE): QuizQuestion[] {
  const usable = words.filter(w => w.native_word && w.french_translation);
  if (usable.length < 4) return [];
  const bigPool = pool.length >= 8 ? pool : usable;

  return shuffle(usable).slice(0, size).map((word, i) => {
    const kinds: Array<'nf' | 'fn' | 'listen' | 'img'> = ['nf', 'fn', 'listen'];
    if (word.img || word.emoji || word.color) kinds.push('img', 'img');
    const kind = kinds[(i + Math.floor(Math.random() * kinds.length)) % kinds.length];

    const toFrench = () => {
      const distractors = pickDistractors(bigPool, word.french_translation, 'french_translation');
      const choices = shuffle([word.french_translation, ...distractors]);
      return { choices, correctIndex: choices.indexOf(word.french_translation) };
    };
    const toNative = () => {
      const distractors = pickDistractors(bigPool, word.native_word, 'native_word');
      const choices = shuffle([word.native_word, ...distractors]);
      return { choices, correctIndex: choices.indexOf(word.native_word) };
    };

    if (kind === 'img') {
      return {
        question: word.color ? 'Comment dit-on cette couleur ?' : 'Comment dit-on ceci ?',
        image: word.img, emoji: word.emoji, color: word.color, ...toNative(), explanation: explanationFor(word),
      };
    }
    if (kind === 'listen') {
      return {
        question: 'Que signifie ce que tu entends ?',
        speakText: word.native_word, listen: true, ...toFrench(), explanation: explanationFor(word),
      };
    }
    if (kind === 'nf') {
      return {
        question: `Que signifie « ${word.native_word} » ?`,
        speakText: word.native_word, ...toFrench(), explanation: explanationFor(word),
      };
    }
    return { question: `Comment dit-on « ${word.french_translation} » ?`, ...toNative(), explanation: explanationFor(word) };
  });
}
