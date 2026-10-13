import type { LanguageConfig } from './languages';
import type { PathUnit } from '../data/learningPath';
import type { VocabWord } from '../data/multilingualVocab';
import { getWordsForCategory } from '../data/multilingualVocab';
import { getLexicon, getLexiconForUnit } from '../content/lexicon';
import { generateLetterQuiz, generateWordsQuiz, type QuizQuestion } from './quiz';
import type { MissedMap } from './missedWords';

// ─── Boss de fin d'unité ─────────────────────────────────────────────────────
// Quiz de 10 questions qui mêle les mots de l'unité et, en priorité, ceux que
// l'élève a ratés avant (jusqu'à 4 venant d'autres unités). Sans chrono, sans
// vie : on peut le rejouer à volonté, il ne retire jamais la série.

export const BOSS_SIZE = 10;
export const BOSS_PASS_PCT = 70;
export const BOSS_XP = 30;
const MAX_FOREIGN_MISSED = 4;

export function getUnitWords(code: string, unit: PathUnit): VocabWord[] {
  const out: VocabWord[] = [];
  for (const step of unit.steps) {
    if (step.kind === 'lesson' && step.lessonId) out.push(...getLexiconForUnit(code, step.lessonId));
    else if (step.categoryId) out.push(...getWordsForCategory(code, step.categoryId));
  }
  return dedupe(out);
}

const dedupe = (words: VocabWord[]) => {
  const seen = new Set<string>();
  return words.filter(w => (seen.has(w.native_word) ? false : (seen.add(w.native_word), true)));
};

const byMisses = (missed: MissedMap) => (a: VocabWord, b: VocabWord) =>
  (missed[b.native_word]?.n ?? 0) - (missed[a.native_word]?.n ?? 0);

/** Unité de lecture : le boss teste les signes ; sinon les mots, ratés en tête. */
export function buildBossQuiz(language: LanguageConfig, unit: PathUnit, missed: MissedMap): QuizQuestion[] {
  const letters = unit.steps.flatMap(s => s.letters ?? []);
  if (unit.reading && letters.length > 0) return generateLetterQuiz(language, [...new Set(letters)], BOSS_SIZE);

  const lexicon = getLexicon(language.code);
  const unitWords = getUnitWords(language.code, unit);
  const unitSet = new Set(unitWords.map(w => w.native_word));

  const unitMissed = unitWords.filter(w => missed[w.native_word]).sort(byMisses(missed));
  const foreignMissed = lexicon
    .filter(w => missed[w.native_word] && !unitSet.has(w.native_word))
    .sort(byMisses(missed))
    .slice(0, MAX_FOREIGN_MISSED);
  const rest = unitWords.filter(w => !missed[w.native_word]);

  const picked = dedupe([...unitMissed, ...foreignMissed, ...rest]).slice(0, BOSS_SIZE);
  return generateWordsQuiz(picked, lexicon.length ? lexicon : unitWords, BOSS_SIZE);
}
