import { oralLesson, w, t, type OralSpec } from './builders';
import type { Lesson, Word } from './types';

// ─── Format d'écriture compact pour les langues sans translittération ────────
// Une unité = quelques phrases, des questions-réponses et une note de grammaire.
// Les exercices (écoute, lecture, choix, ordre, répliques, répétition) en sont
// dérivés par oralLesson. Les tuiles d'une phrase à remettre en ordre sont ses
// mots (séparés par des espaces).
//
// Phrase : 'texte|français|emoji-ou-img:clé'  (le 3e champ est facultatif)
//   avec `romanized: true` : 'texte|romanisation|français|emoji-ou-img:clé'
//
// qa : [question, bonne réponse, leurre 1, leurre 2] — des indices dans `phrases`.
// Les leurres doivent être des phrases qui ne répondent PAS à la question.

/** Indice dans `phrases`, ou texte exact de la phrase (plus sûr à écrire). */
type Ref = number | string;

export interface SimpleUnit {
  id: string;
  level?: Lesson['level'];
  theme: string;
  title: string;
  goal: string;
  tip?: { title: string; body: string };
  romanized?: boolean;
  phrases: string[];
  qa: [Ref, Ref, Ref, Ref][];
  /** Phrases à remettre en ordre (par défaut : les 3 premières de 3 à 7 mots). */
  orders?: Ref[];
  /** Mots d'une phrase sans espaces (japonais, chinois) : texte exact de la phrase → ['mot|romanisation', …]. */
  tokens?: Record<string, string[]>;
  /** Texte de la question posée avant les options de réplique. */
  replyPrompt?: string;
}

function parse(spec: string, romanized?: boolean): Word {
  const f = spec.split('|');
  return romanized ? w(`${f[0]}|${f[1] ?? ''}|${f[2] ?? ''}|${f[3] ?? ''}`.replace(/\|+$/, '')) : w(`${f[0]}||${f[1] ?? ''}|${f[2] ?? ''}`.replace(/\|+$/, ''));
}

export function simpleLesson(u: SimpleUnit): Lesson {
  const P = u.phrases.map(s => parse(s, u.romanized));
  const tokenList = (x: Word): { ar: string; tr: string }[] => {
    const custom = u.tokens?.[x.ar];
    if (custom) return custom.map(t0 => { const [a, b = ''] = t0.split('|'); return { ar: a, tr: b }; });
    const trs = x.tr.split(' ');
    return x.ar.split(' ').filter(Boolean).map((a, k) => ({ ar: a, tr: u.romanized ? (trs[k] ?? '') : '' }));
  };
  const at = (r: Ref): number => {
    if (typeof r === 'number') return r;
    const i = P.findIndex(p => p.ar === r);
    if (i < 0) throw new Error(`${u.id} : phrase introuvable « ${r} »`);
    return i;
  };
  // `orders` absent : 3 premières phrases de 3 à 7 mots ; `orders: []` : aucune.
  const orderIdx = u.orders !== undefined
    ? u.orders.map(at)
    : P.map((p, i) => ({ i, n: tokenList(p).length })).filter(o => o.n >= 3 && o.n <= 7).slice(0, 3).map(o => o.i);

  const spec: OralSpec = {
    id: u.id, level: u.level, theme: u.theme, title: u.title, goal: u.goal, intro: u.tip,
    phrases: P,
    orders: orderIdx.map(i => ({
      fr: P[i].fr,
      words: tokenList(P[i]).map(tok => ({ ar: tok.ar, tr: tok.tr, fr: '' })),
    })),
    dialogues: u.qa.map(refs => {
      const [q, a, d1, d2] = refs.map(at);
      const opts = [P[a], P[d1], P[d2]];
      const answer = (q + a) % 3;                       // position déterministe de la bonne réponse
      const arranged = [P[d1], P[d2]];
      arranged.splice(answer, 0, P[a]);
      return { context: [P[q]], prompt: u.replyPrompt ?? 'Que réponds-tu ?', options: arranged.length === opts.length ? arranged : opts, answer };
    }),
  };
  return oralLesson(spec);
}

export { t };
