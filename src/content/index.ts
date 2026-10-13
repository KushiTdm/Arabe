import type { Lesson, Word, Conversation } from './types';
import { buildConversation, type ConvSpec } from './conversations';
import { AR_CONVERSATIONS } from './ar/conversations';
import { AR_CONVERSATIONS2 } from './ar/conversations2';
import { ES_CONVERSATIONS } from './es/conversations';
import { ES_CONVERSATIONS2 } from './es/conversations2';
import { IT_CONVERSATIONS } from './it/conversations';
import { IT_CONVERSATIONS2 } from './it/conversations2';
import { PT_CONVERSATIONS } from './pt/conversations';
import { PT_CONVERSATIONS2 } from './pt/conversations2';
import { DE_CONVERSATIONS } from './de/conversations';
import { DE_CONVERSATIONS2 } from './de/conversations2';
import { EN_CONVERSATIONS } from './en/conversations';
import { EN_CONVERSATIONS2 } from './en/conversations2';
import { RU_CONVERSATIONS } from './ru/conversations';
import { RU_CONVERSATIONS2 } from './ru/conversations2';
import { KO_CONVERSATIONS } from './ko/conversations';
import { KO_CONVERSATIONS2 } from './ko/conversations2';
import { JA_CONVERSATIONS } from './ja/conversations';
import { JA_CONVERSATIONS2 } from './ja/conversations2';
import { ZH_CONVERSATIONS } from './zh/conversations';
import { ZH_CONVERSATIONS2 } from './zh/conversations2';
import { VI_CONVERSATIONS } from './vi/conversations';
import { VI_CONVERSATIONS2 } from './vi/conversations2';
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
import { RU_A2, RU_B1 } from './ru/units2';
import { KO_READING, KO_UNITS } from './ko/units';
import { KO_A2, KO_B1 } from './ko/units2';
import { JA_READING, JA_UNITS } from './ja/units';
import { JA_A2, JA_B1 } from './ja/units2';
import { ZH_READING, ZH_UNITS } from './zh/units';
import { ZH_A2, ZH_B1 } from './zh/units2';
import { VI_READING, VI_UNITS } from './vi/units';
import { VI_A2, VI_B1 } from './vi/units2';
import { AR_SIGNS, AR_FADING } from './ar/signs';
import { AR_PHONETICS } from './ar/phonetics';
import { EXTRA_UNITS } from './pronunciation';

// ─── Catalogue des leçons intégrées, par langue ──────────────────────────────
// Seules les langues listées ici ont un parcours entièrement intégré ; les
// autres s'appuient encore sur les écrans de vocabulaire, de quiz et de
// conversation (voir data/learningPath.ts).

/** Ordre de présentation : l'oral précède la fin de la lecture (programmes/arabe.md § 6.3). */
const AR_ORDER = [
  'ar-L1', 'ar-L2', 'ar-O1', 'ar-L3', 'ar-L4', 'ar-O2', 'ar-L5', 'ar-L6', 'ar-O3',
  'ar-L7', 'ar-L8', 'ar-O4', 'ar-L9', 'ar-L10', 'ar-P1', 'ar-P2', 'ar-P3', 'ar-O5', 'ar-O6',
  'ar-L11', 'ar-P4', 'ar-L12', 'ar-L13', 'ar-L14',
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
  // Phonétique P1-P4 : paires minimales sur des lettres déjà toutes connues.
  for (const spec of AR_PHONETICS) byId.set(spec.id, readingLesson({ ...spec, known: [...known] }));
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
  ru: () => buildScript(RU_READING, [...RU_UNITS, ...RU_A2, ...RU_B1]),
  ko: () => buildScript(KO_READING, [...KO_UNITS, ...KO_A2, ...KO_B1]),
  ja: () => buildScript(JA_READING, [...JA_UNITS, ...JA_A2, ...JA_B1]),
  zh: () => buildScript(ZH_READING, [...ZH_UNITS, ...ZH_A2, ...ZH_B1]),
  vi: () => buildScript(VI_READING, [...VI_UNITS, ...VI_A2, ...VI_B1]),
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
  // Prononciation et faux amis des programmes (hors arabe, dont les unités P1-P4 sont déjà dans l'ordre).
  for (const { after, spec } of EXTRA_UNITS[code] ?? []) {
    const at = built.findIndex(l => l.id === after);
    if (at >= 0) built.splice(at + 1, 0, readingLesson({ ...spec, letters: [], skipTr: true, known: [] }));
  }
  cache.set(code, built);
  return built;
}

export const hasIntegratedCourse = (code: string): boolean => code in BUILDERS;

export function getLesson(code: string, id: string): Lesson | undefined {
  return getLessons(code).find(l => l.id === id);
}


// ─── Conversations guidées ───────────────────────────────────────────────────

const CONVERSATIONS: Record<string, ConvSpec[]> = {
  ar: [...AR_CONVERSATIONS, ...AR_CONVERSATIONS2],
  es: [...ES_CONVERSATIONS, ...ES_CONVERSATIONS2],
  it: [...IT_CONVERSATIONS, ...IT_CONVERSATIONS2],
  pt: [...PT_CONVERSATIONS, ...PT_CONVERSATIONS2],
  de: [...DE_CONVERSATIONS, ...DE_CONVERSATIONS2],
  en: [...EN_CONVERSATIONS, ...EN_CONVERSATIONS2],
  ru: [...RU_CONVERSATIONS, ...RU_CONVERSATIONS2],
  ko: [...KO_CONVERSATIONS, ...KO_CONVERSATIONS2],
  ja: [...JA_CONVERSATIONS, ...JA_CONVERSATIONS2],
  zh: [...ZH_CONVERSATIONS, ...ZH_CONVERSATIONS2],
  vi: [...VI_CONVERSATIONS, ...VI_CONVERSATIONS2],
};

const convCache = new Map<string, Conversation[]>();

export function getConversations(code: string): Conversation[] {
  const hit = convCache.get(code);
  if (hit) return hit;
  const built = (CONVERSATIONS[code] ?? []).map(buildConversation);
  convCache.set(code, built);
  return built;
}

export const hasConversations = (code: string): boolean => (CONVERSATIONS[code]?.length ?? 0) > 0;

export function getConversation(code: string, id: string): Conversation | undefined {
  return getConversations(code).find(c => c.id === id);
}
