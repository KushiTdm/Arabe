import type { Lesson, Word } from './types';
import { readingLesson, oralLesson, fadingLesson } from './builders';
import { AR_READING } from './ar/reading';
import { AR_ORAL } from './ar/oral';
import { AR_ORAL_A2 } from './ar/oral2';
import { AR_ORAL_B1 } from './ar/oral3';
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

const BUILDERS: Record<string, () => Lesson[]> = { ar: buildArabic };
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
