import type { Lesson, Word } from './types';
import { readingLesson, oralLesson, fadingLesson, type ReadingSpec } from './builders';
import { AR_READING } from './ar/reading';
import { AR_ORAL } from './ar/oral';
import { AR_ORAL_A2 } from './ar/oral2';
import { AR_ORAL_B1 } from './ar/oral3';
import { simpleLesson, type SimpleUnit } from './simple';
import { ES_UNITS } from './es/units';
import { ES_A2, ES_B1 } from './es/units2';
import { IT_UNITS } from './it/units';
import { IT_A2, IT_B1 } from './it/units2';
import { PT_UNITS } from './pt/units';
import { PT_A2, PT_B1 } from './pt/units2';
import { DE_UNITS } from './de/units';
import { DE_A2, DE_B1 } from './de/units2';
import { EN_UNITS } from './en/units';
import { EN_A2, EN_B1 } from './en/units2';
import { RU_READING, RU_UNITS } from './ru/units';
import { KO_READING, KO_UNITS } from './ko/units';
import { JA_READING, JA_UNITS } from './ja/units';
import { ZH_READING, ZH_UNITS } from './zh/units';
import { VI_READING, VI_UNITS } from './vi/units';
import { AR_SIGNS, AR_FADING } from './ar/signs';

// ─── Catalogue des leçons intégrées, par langue ──────────────────────────────
// Seules les langues listées ici ont un parcours entièrement intégré ; les
// autres s'appuient encore sur les écrans de vocabulaire, de quiz et de
// conversation (voir data/learningPath.ts).

/** Ordre de présentation : l'oral précède la fin de la lecture (programmes/arabe.md § 6.3). */
const AR_ORDER = [
  'ar-L1', 'ar-L2', 'ar-O1', 'ar-L3', 'ar-L4', 'ar-O2', 'ar-L5', 'ar-L6', 'ar-O3',
  'ar-L7', 'ar-L8', 'ar-O4', 'ar-L9', 'ar-L10', 'ar-O5', 'ar-O6',
  'ar-L11', 'ar-L12', 'ar-L13', 'ar-L14',
  'ar-L15', 'ar-O7', 'ar-L16', 'ar-O8', 'ar-L17', 'ar-O9', 'ar-L18', 'ar-O10', 'ar-O11',
  'ar-O12', 'ar-O13', 'ar-O14', 'ar-O15',
];

function buildArabic(): Lesson[] {
  const known: Word[] = [];
  const byId = new Map<string, Lesson>();
  for (const spec of AR_READING) {
    const lesson = readingLesson({ ...spec, known: [...known] });
    byId.set(lesson.id, lesson);
    known.push(...spec.words.filter(x => !x.fake));
  }
  for (const spec of [...AR_ORAL, ...AR_ORAL_A2, ...AR_ORAL_B1]) byId.set(spec.id, oralLesson(spec));
  // Signes (L11-L14) : lettres déjà toutes connues, mots réels ; puis retrait du voyellage.
  for (const spec of AR_SIGNS) {
    const lesson = readingLesson({ ...spec, known: [...known] });
    byId.set(lesson.id, lesson);
    known.push(...spec.words.filter(x => !x.fake));
  }
  for (const spec of AR_FADING) byId.set(spec.id, fadingLesson(spec));
  return AR_ORDER.map(id => byId.get(id)).filter((l): l is Lesson => !!l);
}

/** Langue à écriture non latine : unités de lecture d'abord, puis oral (lecture cumulée pour varier les leurres). */
function buildScript(reading: Omit<ReadingSpec, 'known'>[], oral: SimpleUnit[]): Lesson[] {
  const known: Word[] = [];
  const out: Lesson[] = [];
  for (const spec of reading) {
    out.push(readingLesson({ ...spec, known: [...known] }));
    known.push(...spec.words.filter(x => !x.fake));
  }
  return [...out, ...oral.map(simpleLesson)];
}

const BUILDERS: Record<string, () => Lesson[]> = {
  ru: () => buildScript(RU_READING, RU_UNITS),
  ko: () => buildScript(KO_READING, KO_UNITS),
  ja: () => buildScript(JA_READING, JA_UNITS),
  zh: () => buildScript(ZH_READING, ZH_UNITS),
  vi: () => buildScript(VI_READING, VI_UNITS),
  ar: buildArabic,
  es: () => [...ES_UNITS, ...ES_A2, ...ES_B1].map(simpleLesson),
  it: () => [...IT_UNITS, ...IT_A2, ...IT_B1].map(simpleLesson),
  pt: () => [...PT_UNITS, ...PT_A2, ...PT_B1].map(simpleLesson),
  de: () => [...DE_UNITS, ...DE_A2, ...DE_B1].map(simpleLesson),
  en: () => [...EN_UNITS, ...EN_A2, ...EN_B1].map(simpleLesson),
};
const cache = new Map<string, Lesson[]>();

export function getLessons(code: string): Lesson[] {
  const hit = cache.get(code);
  if (hit) return hit;
  const built = BUILDERS[code]?.() ?? [];
  cache.set(code, built);
  return built;
}

export const hasIntegratedCourse = (code: string): boolean => code in BUILDERS;

export function getLesson(code: string, id: string): Lesson | undefined {
  return getLessons(code).find(l => l.id === id);
}
