import { w, t } from './builders';
import type { Conversation, ConversationTurn, Word } from './types';

// ─── Conversations guidées ───────────────────────────────────────────────────
// Un scénario illustré : un personnage parle, l'élève choisit la bonne réplique
// parmi trois. Tout est écrit à l'avance, jouable hors ligne, sans IA.
//
// Texte d'un mot ou d'une réplique : 'natif|français|emoji-ou-img:clé'
// (avec `romanized` : 'natif|romanisation|français|emoji-ou-img:clé').

export interface ConvTurnSpec {
  /** Ce que dit le personnage. */
  npc: string;
  /** Photo de la question (clé d'image) : « Qui est-ce ? » devant une photo. */
  img?: string;
  /** La bonne réplique, puis deux répliques qui ne conviennent pas. */
  ok: string;
  bad: [string, string];
  /** Explication si l'élève se trompe. */
  why?: string;
}

export interface ConvSpec {
  id: string;
  level?: Conversation['level'];
  title: string;
  situation: string;
  npcRole: string;
  /** Clé de la photo de la scène, ou emoji. */
  scene: string;
  /** Mots clés illustrés, présentés avant la conversation. */
  key: string[];
  romanized?: boolean;
  turns: ConvTurnSpec[];
}

function parse(spec: string, romanized?: boolean): Word {
  const f = spec.split('|');
  return romanized
    ? w(`${f[0]}|${f[1] ?? ''}|${f[2] ?? ''}|${f[3] ?? ''}`.replace(/\|+$/, ''))
    : w(`${f[0]}||${f[1] ?? ''}|${f[2] ?? ''}`.replace(/\|+$/, ''));
}

export function buildConversation(c: ConvSpec): Conversation {
  const p = (x: string) => parse(x, c.romanized);
  const isImg = /^[a-z_]+$/.test(c.scene);
  const turns: ConversationTurn[] = c.turns.map((tn, i) => {
    const answer = i % 3;                       // position déterministe de la bonne réplique
    const options = [p(tn.bad[0]), p(tn.bad[1])];
    options.splice(answer, 0, p(tn.ok));
    return { npc: p(tn.npc), img: tn.img, options, answer, why: tn.why };
  });
  return {
    id: c.id, level: c.level ?? 'beginner', title: c.title, situation: c.situation, npcRole: c.npcRole,
    scene: isImg ? { img: c.scene, emoji: '💬' } : { emoji: c.scene },
    keyWords: c.key.map(p), turns,
  };
}

export { t };
