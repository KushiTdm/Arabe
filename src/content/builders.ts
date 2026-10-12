import type { Activity, Lesson, LessonPart, Word } from './types';
import { IMG_KEY_BY_AR, imgForFrench } from './imageKeys';
import { fade as fadeText, type FadeMode } from './ar/vowels';

// ─── Outils de construction des leçons ───────────────────────────────────────
// Les exercices sont dérivés des mots de l'unité : on écrit les mots une fois,
// les parties « découvrir / s'entraîner / bilan » s'en déduisent. Tout est
// déterministe (pas d'aléatoire) ; l'écran mélange les choix à l'affichage.

/** 'ar|tr|fr|emoji' → Word. Le champ emoji est facultatif ; '~' en tête = mot inventé. */
export function w(spec: string): Word {
  const fake = spec.startsWith('~');
  const [ar, tr, fr, emoji] = (fake ? spec.slice(1) : spec).split('|');
  const explicit = emoji?.startsWith('img:') ? emoji.slice(4) : undefined;
  // Lien explicite, puis table du mot, puis table de la traduction française (noms concrets seulement)
  const img = explicit ?? IMG_KEY_BY_AR[ar] ?? (fake ? undefined : imgForFrench(fr));
  const color = emoji?.startsWith('#') ? emoji : undefined;
  return { ar, tr, fr, ...(emoji && !color && !explicit ? { emoji } : {}), ...(color ? { color } : {}), ...(img ? { img } : {}), ...(fake ? { fake: true } : {}) };
}
/** Réplique ou option en français seul (pas d'audio). */
export const t = (text: string): Word => ({ ar: text, tr: '', fr: text, plain: true });
export const ws = (specs: string[]): Word[] => specs.map(w);

/** `n` mots différents de la cible, pris dans `pool` à partir de la position de la cible. */
export function distractors(target: Word, pool: Word[], n = 3): Word[] {
  const others = pool.filter(p => p.ar !== target.ar && p.fr !== target.fr);
  if (others.length <= n) return others;
  const start = Math.max(0, pool.findIndex(p => p.ar === target.ar));
  const out: Word[] = [];
  for (let i = 1; out.length < n && i <= pool.length * 2; i++) {
    const cand = pool[(start + i * 2 + 1) % pool.length];
    if (cand.ar !== target.ar && cand.fr !== target.fr && !out.some(o => o.ar === cand.ar)) out.push(cand);
  }
  return out;
}

const withTarget = (target: Word, pool: Word[], n = 3): Word[] => [target, ...distractors(target, pool, n)];

const take = <T,>(arr: T[], n: number): T[] => arr.slice(0, n);
const chunk = <T,>(arr: T[], size: number): T[][] => {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
};

// ─── Unité de lecture ────────────────────────────────────────────────────────

export interface ReadingSpec {
  id: string;
  /** La translittération n'est pas une lecture (vietnamien : c'est le ton) : pas d'exercice « comment se lit ». */
  skipTr?: boolean;
  theme?: string;
  level?: Lesson['level'];
  /** Lettres ou signes nouveaux sans carte propre (hamza, ة…). */
  extraLetters?: string[];
  /** Phrases à remettre en ordre. */
  orders?: { fr: string; words: Word[] }[];
  title: string;
  goal: string;
  letters: string[];
  /** Mots (ou syllabes inventées) de l'unité. */
  words: Word[];
  /** Mots déjà connus, pour varier les choix de réponse. */
  known?: Word[];
  /** Paires proches : [a, b, note]. */
  pairs?: [Word, Word, string?][];
  /** Cartes d'explication placées avant les lettres. */
  intro?: { title: string; body: string }[];
}

export function readingLesson(s: ReadingSpec): Lesson {
  const pool = [...s.words, ...(s.known ?? [])];
  const real = s.words.filter(x => !x.fake);
  const meaningful = real.length >= 3;

  const discover: Activity[] = [
    ...(s.intro ?? []).map(i => ({ type: 'teach' as const, title: i.title, body: i.body })),
    ...s.letters.map(l => ({ type: 'teach' as const, title: 'Nouvelle lettre', letter: l })),
    ...take(s.words, 3).map(t => ({
      type: 'listen' as const, target: t, options: withTarget(t, pool), as: 'ar' as const,
    })),
  ];

  const practise: Activity[] = [
    ...(s.skipTr ? [] : s.words.map(t => ({
      type: 'read' as const, target: t, options: withTarget(t, pool), as: 'tr' as const,
    }))),
    ...(meaningful ? take(real, s.skipTr ? 8 : 3).map(t => ({
      type: 'read' as const, target: t, options: withTarget(t, real.length >= 4 ? real : pool), as: 'fr' as const,
    })) : []),
    ...(s.pairs ?? []).map(([a, b, note], i) => ({
      type: 'pair' as const, a, b, heard: (i % 2 === 0 ? 'a' : 'b') as 'a' | 'b', note,
    })),
  ];

  const review: Activity[] = [
    { type: 'match', words: take(meaningful ? real : s.words, 5), as: meaningful ? 'fr' : 'tr' },
    ...s.words.slice(3).map(t => ({
      type: 'listen' as const, target: t, options: withTarget(t, pool), as: 'ar' as const,
    })),
    ...(s.pairs ?? []).slice(0, 2).map(([a, b], i) => ({
      type: 'pair' as const, a, b, heard: (i % 2 === 0 ? 'b' : 'a') as 'a' | 'b',
    })),
    ...(s.orders ?? []).map(o => ({ type: 'order' as const, fr: o.fr, words: o.words })),
    ...take(s.words, 2).map(t => ({ type: 'repeat' as const, target: t })),
  ];

  return {
    id: s.id, level: s.level ?? 'beginner', title: s.title, goal: s.goal, reading: true, letters: s.letters, theme: s.theme,
    parts: [
      { title: 'Découvrir', activities: discover },
      { title: 'Lire', activities: practise },
      { title: 'Bilan', activities: review },
    ],
  };
}

// ─── Unité communicative ─────────────────────────────────────────────────────

export interface OralSpec {
  id: string;
  theme?: string;
  /** Affichage dégradé (B1 : texte presque nu) ; l'audio reste lu en voyellé. */
  fade?: FadeMode;
  level?: Lesson['level'];
  title: string;
  goal: string;
  /** Phrases et mots clés, dans l'ordre de présentation. */
  phrases: Word[];
  /** Mots à illustrer (cartes et choix en images). */
  dialogues: { context: Word[]; prompt: string; options: Word[]; answer: number }[];
  /** Phrases à reconstituer (≥ 3 mots). Le français est celui de la phrase d'origine. */
  orders: { fr: string; words: Word[] }[];
  intro?: { title: string; body: string };
}

export function oralLesson(spec: OralSpec): Lesson {
  const s = spec.fade ? applyFade(spec, spec.fade) : spec;
  const P = s.phrases;
  const groups = chunk(P, 4);

  const discover: Activity[] = [
    ...(s.intro ? [{ type: 'teach' as const, ...s.intro }] : []),
    ...groups.map((g, i) => ({
      type: 'teach' as const,
      title: groups.length > 1 ? `À retenir (${i + 1}/${groups.length})` : 'À retenir',
      words: g,
    })),
    ...take(P, 3).map(t => ({
      type: 'listen' as const, target: t, options: withTarget(t, P), as: 'fr' as const,
    })),
  ];

  // Un exercice par phrase (écoute, lecture, choix en alternance), puis un
  // second passage décalé sur une phrase sur deux — 14 exercices au plus.
  const kinds = ['listen', 'read', 'pick'] as const;
  const exercise = (t: Word, k: typeof kinds[number]): Activity => {
    const options = withTarget(t, P);
    if (k === 'listen') return { type: 'listen', target: t, options, as: 'fr' };
    if (k === 'read') return { type: 'read', target: t, options, as: 'fr' };
    return { type: 'pick', target: t, options };
  };
  const practise: Activity[] = [
    ...P.map((t, i) => exercise(t, kinds[i % 3])),
    ...P.filter((_, i) => i % 2 === 1).map(t => exercise(t, kinds[(P.indexOf(t) + 1) % 3])),
  ].slice(0, 14);

  const review: Activity[] = [
    { type: 'match', words: take(P, 5), as: 'fr' },
    ...s.orders.map(o => ({ type: 'order' as const, fr: o.fr, words: o.words })),
    ...s.dialogues.map(d => ({ type: 'reply' as const, ...d })),
    ...take(P, 3).map(t => ({ type: 'repeat' as const, target: t })),
  ];

  const parts: LessonPart[] = [
    { title: 'Découvrir', activities: discover },
    { title: 'S\'entraîner', activities: practise },
    { title: 'Bilan', activities: review },
  ];
  return { id: s.id, level: s.level ?? 'beginner', title: s.title, goal: s.goal, reading: false, theme: s.theme, parts };
}

// ─── Unité de retrait du voyellage (arabe L15-L18) ───────────────────────────

export interface FadingSpec {
  id: string;
  title: string;
  goal: string;
  mode: FadeMode;
  intro: { title: string; body: string }[];
  /** Mots déjà connus ; leur forme complète reste celle qui est lue. */
  words: Word[];
  /** Familles de variantes voyellées pour « restaure la lecture » : chaque ligne = mots qui s'écrivent pareil nus. */
  variants?: Word[][];
}

export const faded = (x: Word, mode: FadeMode): Word => ({ ...x, show: fadeText(x.ar, mode) });

export function fadingLesson(s: FadingSpec): Lesson {
  const W = s.words.map(x => faded(x, s.mode));
  const restore: Activity[] = (s.variants ?? []).flatMap(family => family.map(target => ({
    type: 'restore' as const,
    target: { ...target, show: fadeText(target.ar, 'bare') },
    options: family,
  })));

  const discover: Activity[] = [
    ...s.intro.map(i => ({ type: 'teach' as const, title: i.title, body: i.body })),
    ...take(W, 4).map(t => ({ type: 'read' as const, target: t, options: withTarget(t, W), as: 'tr' as const })),
  ];
  const practise: Activity[] = [
    ...W.slice(4).map(t => ({ type: 'read' as const, target: t, options: withTarget(t, W), as: 'tr' as const })),
    ...W.map(t => ({ type: 'read' as const, target: t, options: withTarget(t, W), as: 'fr' as const })).filter((_, i) => i % 2 === 0),
  ].slice(0, 14);
  const review: Activity[] = [
    { type: 'match', words: take(W, 5), as: 'fr' },
    // Sans familles de variantes (racines) : retrouver le mot à partir de son sens
    ...(restore.length > 0 ? take(restore, 6) : take(W, 6).map(t => ({ type: 'pick' as const, target: t, options: withTarget(t, W) }))),
    ...take(W, 2).map(t => ({ type: 'repeat' as const, target: t })),
  ];
  return {
    id: s.id, level: 'intermediate', title: s.title, goal: s.goal, reading: true,
    parts: [
      { title: 'Découvrir', activities: discover },
      { title: 'Lire', activities: practise },
      { title: 'Bilan', activities: review },
    ],
  };
}

/** Applique l'affichage dégradé aux mots ayant une translittération (pas aux répliques en français). */
function applyFade(s: OralSpec, mode: FadeMode): OralSpec {
  const f = (x: Word): Word => (x.plain ? x : faded(x, mode));
  return {
    ...s,
    phrases: s.phrases.map(f),
    orders: s.orders.map(o => ({ ...o, words: o.words.map(f) })),
    dialogues: s.dialogues.map(d => ({ ...d, context: d.context.map(f), options: d.options.map(f) })),
  };
}
