import { getLexicon } from './lexicon';
import { getConversations } from './index';

// ─── Parcours de lecture : des lettres aux dialogues ─────────────────────────
// Cinq paliers, construits sans IA à partir du lexique et des conversations :
// 1 lettres (écran Alphabet) · 2 syllabes et petits mots · 3 mots · 4 phrases ·
// 5 dialogues. Chaque palier est un entraînement de lecture : on voit le texte
// natif, on retrouve son sens (ou sa prononciation).

export interface ReadItem {
  id: string;
  text: string;
  tr: string;
  fr: string;
  img?: string;
  emoji?: string;
  color?: string;
}

export interface ReadLevel {
  id: 'letters' | 'small' | 'words' | 'phrases' | 'dialogues';
  title: string;
  desc: string;
  icon: string;
  /** Vide pour « letters » (écran Alphabet). */
  items: ReadItem[];
}

export const READ_PASS_PCT = 70;
export const READ_SESSION = 10;

const NON_LATIN = new Set(['ar', 'ru', 'ko', 'ja', 'zh']);
export const hasLetters = (code: string) => NON_LATIN.has(code);

/** Seuils : nombre de lettres de base d'un « petit mot » puis d'un « mot ». */
const SIZE: Record<string, [number, number]> = {
  ar: [3, 8], ru: [4, 10], ko: [2, 5], ja: [3, 7], zh: [2, 4],
};
const DEFAULT_SIZE: [number, number] = [4, 10];

/** Nombre de lettres de base (sans signes voyelles, espaces ni ponctuation). */
export function baseLength(text: string): number {
  return Array.from(text.normalize('NFD').replace(/[\p{M}ـ\p{P}\s]/gu, '')).length;
}

const SMALL_TITLE: Record<string, [string, string]> = {
  ar: ['Liaison des lettres', 'Lis des mots courts : les lettres se relient entre elles.'],
  ru: ['Syllabes et petits mots', 'Assemble les lettres en mots courts.'],
  ko: ['Syllabes', 'Lis des blocs et des mots d\'une ou deux syllabes.'],
  ja: ['Petits mots', 'Lis des mots courts en kana et en kanji.'],
  zh: ['Petits caractères', 'Lis des mots d\'un ou deux caractères.'],
};

export function getReadingLevels(code: string): ReadLevel[] {
  const [small, wordMax] = SIZE[code] ?? DEFAULT_SIZE;
  const seen = new Set<string>();
  const lex: ReadItem[] = [];
  for (const v of getLexicon(code)) {
    const key = v.native_word;
    if (!key || seen.has(key)) continue;
    seen.add(key);
    lex.push({ id: v.id, text: v.native_word, tr: v.transliteration, fr: v.french_translation, img: v.img, emoji: v.emoji, color: v.color });
  }
  const isPhrase = (t: string) => /\s/.test(t.trim()) || baseLength(t) > wordMax;
  const smalls = lex.filter(i => !isPhrase(i.text) && baseLength(i.text) <= small);
  const words = lex.filter(i => !isPhrase(i.text) && baseLength(i.text) > small);
  const phrases = lex.filter(i => isPhrase(i.text));

  const lines: ReadItem[] = [];
  for (const c of getConversations(code)) {
    c.turns.forEach((t, n) => {
      for (const [k, w] of [['n', t.npc], ['a', t.options[t.answer]]] as const) {
        const key = w.show ?? w.ar;
        if (seen.has(key)) continue;
        seen.add(key);
        lines.push({ id: `${c.id}:${n}${k}`, text: key, tr: w.tr, fr: w.fr, img: w.img, emoji: w.emoji });
      }
    });
  }
  const longLines = lines.filter(l => baseLength(l.text) > wordMax / 2 || /\s/.test(l.text));

  const levels: ReadLevel[] = [];
  if (hasLetters(code)) levels.push({ id: 'letters', title: 'Lettres', desc: 'Découvre l\'écriture et les sons, lettre par lettre.', icon: 'text', items: [] });
  const [st, sd] = SMALL_TITLE[code] ?? ['Petits mots', 'Lis des mots très courts.'];
  levels.push({ id: 'small', title: st, desc: sd, icon: 'link', items: smalls });
  levels.push({ id: 'words', title: 'Mots', desc: 'Lis des mots complets et retrouve leur sens.', icon: 'book', items: words });
  levels.push({ id: 'phrases', title: 'Phrases', desc: 'Lis des phrases entières du cours.', icon: 'reader', items: phrases });
  levels.push({ id: 'dialogues', title: 'Dialogues', desc: 'Lis les répliques des conversations, sans aide.', icon: 'chatbubbles', items: longLines });
  return levels.filter(l => l.id === 'letters' || l.items.length >= 6);
}
