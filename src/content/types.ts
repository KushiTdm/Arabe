// ─── Contenu pédagogique intégré ─────────────────────────────────────────────
// Leçons écrites à l'avance, jouables sans réseau, sans clé d'API et sans
// crédit. L'IA n'est qu'un complément (cours à la demande, conversation libre).
//
// Une leçon = une unité du parcours. Elle est découpée en 3 parties d'environ
// 5 minutes (découvrir, s'entraîner, bilan) : chaque partie validée coche une
// étape du parcours.

/** Mot ou phrase de la langue étudiée. */
export interface Word {
  /** Écriture native, voyellée pour l'arabe. */
  ar: string;
  /** Translittération à la française. */
  tr: string;
  fr: string;
  /** Repli visuel tant que l'illustration n'existe pas. */
  emoji?: string;
  /** Clé d'illustration (imageKeys.ts → images.ts). */
  img?: string;
  /** Affichage dégradé (voyelles retirées) ; `ar` reste la forme complète lue à voix haute. */
  show?: string;
  /** Mot inventé, pour s'exercer au décodage. */
  fake?: boolean;
}

export type Activity =
  /** Carte de découverte : une idée, des mots à écouter. */
  | { type: 'teach'; title: string; body?: string; words?: Word[]; letter?: string }
  /** J'entends, je choisis. `as` : ce que l'on choisit (le sens ou le mot écrit). */
  | { type: 'listen'; target: Word; options: Word[]; as: 'fr' | 'ar' }
  /** Je lis, je choisis la translittération ou le sens. */
  | { type: 'read'; target: Word; options: Word[]; as: 'tr' | 'fr' }
  /** Je vois le français, je choisis l'arabe. */
  | { type: 'pick'; target: Word; options: Word[] }
  /** Deux mots proches : lequel ai-je entendu ? */
  | { type: 'pair'; a: Word; b: Word; heard: 'a' | 'b'; note?: string }
  /** Associer les paires. */
  | { type: 'match'; words: Word[]; as: 'fr' | 'tr' }
  /** Remettre une phrase dans l'ordre (`words` = bon ordre). */
  | { type: 'order'; fr: string; words: Word[] }
  /** Répondre dans un échange : je choisis la bonne réplique. */
  | { type: 'reply'; context: Word[]; prompt: string; options: Word[]; answer: number }
  /** Texte dégradé affiché : je choisis la bonne lecture voyellée (`target.show` est le texte nu). */
  | { type: 'restore'; target: Word; options: Word[] }
  /** Écouter puis répéter à voix haute (auto-évalué). */
  | { type: 'repeat'; target: Word };

export interface LessonPart {
  title: string;
  activities: Activity[];
}

export interface Lesson {
  id: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  title: string;
  goal: string;
  /** Unité de lecture (lettres) ou communicative. */
  reading: boolean;
  /** Lettres travaillées (pour l'écran de découverte). */
  letters?: string[];
  parts: LessonPart[];
}

/** Part des activités notées à réussir pour valider une partie. */
export const PART_PASS_RATIO = 0.7;
