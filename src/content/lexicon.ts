import type { VocabWord } from '../data/multilingualVocab';
import { getLessons } from './index';
import type { Activity, Word } from './types';
import { LETTER_IMG } from './imageKeys';

// ─── Lexique construit à partir des leçons ───────────────────────────────────
// Pour une langue au contenu intégré, le vocabulaire (écran « Vocab », mot du
// jour, révision) est exactement celui des leçons : mêmes mots voyellés, même
// translittération, mêmes photos. Aucune liste parallèle à maintenir.

/** Thème d'après l'illustration du mot, quand il en a une. */
const THEME_BY_IMG: Record<string, string> = {
  dog: 'animals', camel: 'animals', elephant: 'animals', horse: 'animals', bird: 'animals', whale: 'animals',
  fish: 'animals', fox: 'animals', hen: 'animals', falcon: 'animals', frog: 'animals', raven: 'animals', lion: 'animals',
  bread: 'food', coffee: 'food', fig: 'food', tea: 'food', water: 'food', milk: 'food', juice: 'food',
  apple: 'food', banana: 'food', lemon: 'food',
  father: 'family', mother: 'family', brother: 'family', sister: 'family', boy: 'family', girl: 'family',
  house: 'places', school: 'places', market: 'places', hospital: 'places', mosque: 'places', street: 'places',
  eye: 'body', hand: 'body', heart: 'body', head: 'body', nails: 'body',
  moon: 'nature', sun: 'nature', tree: 'nature', star: 'nature', crescent: 'nature', flowers: 'nature', rose: 'nature',
  eggs: 'food', salt: 'food', sheep: 'animals', gazelle: 'animals', sword: 'objects', hair: 'body', foot: 'body',
  mouth: 'body', sea: 'nature', clock: 'objects', library: 'places', university: 'places', ink: 'objects',
  teacher: 'places', student: 'places', city: 'places',
  door: 'objects', book: 'objects', pen: 'objects', key: 'objects', table: 'objects', robe: 'objects', gold: 'objects',
};

/** Thème d'après l'unité d'origine, pour les mots sans illustration. */
const THEME_BY_UNIT: Record<string, string> = {
  'ar-O1': 'greetings', 'ar-O2': 'greetings', 'ar-O3': 'daily_life', 'ar-O4': 'numbers', 'ar-O5': 'places',
  'ar-O6': 'family', 'ar-O7': 'daily_life', 'ar-O8': 'daily_life', 'ar-O9': 'food', 'ar-O10': 'daily_life',
  'ar-O11': 'body',
};

export const LEXICON_THEMES: Record<string, { label: string; emoji: string }> = {
  greetings:  { label: 'Salutations',      emoji: '👋' },
  numbers:    { label: 'Nombres',          emoji: '🔢' },
  family:     { label: 'Famille',          emoji: '👨‍👩‍👧' },
  food:       { label: 'Nourriture',       emoji: '🍽️' },
  places:     { label: 'Lieux',            emoji: '🏙️' },
  daily_life: { label: 'Vie quotidienne',  emoji: '☀️' },
  animals:    { label: 'Animaux',          emoji: '🐾' },
  body:       { label: 'Corps et santé',   emoji: '🫀' },
  nature:     { label: 'Nature',           emoji: '🌿' },
  objects:    { label: 'Objets',           emoji: '🗝️' },
  reading:    { label: 'Mots de lecture',  emoji: '📖' },
};

const THEME_ORDER = Object.keys(LEXICON_THEMES);

/** Mots réellement enseignés : cartes de découverte et cibles d'exercice (pas les leurres, ni les morceaux de phrase). */
function wordsOf(a: Activity): Word[] {
  switch (a.type) {
    case 'teach': return a.words ?? [];
    case 'listen': case 'read': case 'pick': case 'restore': case 'repeat': return [a.target];
    case 'pair': return [a.a, a.b];
    case 'match': return a.words;
    case 'order': case 'reply': return [];
  }
}

const cache = new Map<string, VocabWord[]>();

export function getLexicon(code: string): VocabWord[] {
  const hit = cache.get(code);
  if (hit) return hit;
  const seen = new Set<string>();
  const out: VocabWord[] = [];
  for (const lesson of getLessons(code)) {
    for (const part of lesson.parts) for (const act of part.activities) for (const w of wordsOf(act)) {
      if (w.fake || !w.tr || !w.fr || seen.has(w.ar)) continue;
      seen.add(w.ar);
      const theme = (w.img && THEME_BY_IMG[w.img]) || THEME_BY_UNIT[lesson.id] || 'reading';
      out.push({
        id: `lex:${code}:${w.ar}`,
        native_word: w.ar,
        transliteration: w.tr,
        french_translation: w.fr,
        category: theme,
        mastered: false,
        practice_count: 0,
        img: w.img,
        emoji: w.emoji,
        unit: lesson.id,
      });
    }
  }
  cache.set(code, out);
  return out;
}

export function getLexiconCategories(code: string): string[] {
  const present = new Set(getLexicon(code).map(w => w.category));
  return THEME_ORDER.filter(t => present.has(t));
}

export const getLexiconWords = (code: string, category: string): VocabWord[] =>
  getLexicon(code).filter(w => w.category === category);

/** Mots d'une unité (pour alimenter la révision quand elle est suivie). */
export const getLexiconForUnit = (code: string, unitId: string): VocabWord[] =>
  getLexicon(code).filter(w => w.unit === unitId);

/** Couverture photographique, pour décider quoi illustrer ensuite. */
export function imageCoverage(code: string) {
  const all = getLexicon(code);
  const withImage = all.filter(w => w.img);
  return { total: all.length, withImage: withImage.length, without: all.filter(w => !w.img) };
}

/** Image représentative d'une leçon (intro et célébration animées). */
export function getLessonCover(code: string, lessonId: string): { img?: string; emoji: string } {
  const lesson = getLessons(code).find(l => l.id === lessonId);
  if (!lesson) return { emoji: '📖' };
  const firstLetter = lesson.letters?.[0];
  if (firstLetter && LETTER_IMG[firstLetter]) return { img: LETTER_IMG[firstLetter], emoji: '🔤' };
  const word = getLexiconForUnit(code, lessonId).find(w => w.img);
  if (word) return { img: word.img, emoji: word.emoji ?? '📖' };
  return { emoji: lesson.reading ? '📖' : '💬' };
}
