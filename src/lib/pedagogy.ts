import type { LanguageProgress } from './useProfiles';
import type { LanguageConfig } from './languages';

// ─── Adaptation du contenu au niveau de l'apprenant (i+1) ────────────────────
// Le niveau était stocké mais n'atteignait aucun prompt : tous disaient
// « débutant » en dur, si bien qu'un apprenant à 1 500 XP recevait le même
// contenu qu'au premier jour.
//
// Le brief se construit en deux couches :
//   1. LEVEL_FRAME       — ce que le niveau impose, quelle que soit la langue
//                          (longueur de phrase, temps autorisés, mots nouveaux)
//   2. LANGUAGE_PROGRESSION — ce que CETTE langue travaille à CE niveau
//
// Sans la couche 2, un A1 en arabe (qui déchiffre encore l'alphabet) et un A1
// en espagnol (qui construit déjà des phrases) recevraient la même consigne.
// Source des progressions : methodologie.md § 3.

export type Level = LanguageProgress['level'];

/** Correspondance avec les bandes CEFR retenues (methodologie.md § 2.2). */
export const CEFR_BAND: Record<Level, string> = {
  beginner:     'A1',
  intermediate: 'A2',
  advanced:     'B1',
};

export function levelLabel(level: Level): string {
  switch (level) {
    case 'advanced':     return 'Avancé (B1)';
    case 'intermediate': return 'Intermédiaire (A2)';
    default:             return 'Débutant (A1)';
  }
}

// ─── Couche 1 : cadre générique par niveau ───────────────────────────────────

const LEVEL_FRAME: Record<Level, string> = {
  beginner:
    `Phrases de 5 à 8 mots, présent uniquement, vocabulaire concret et quotidien. `
    + `UN SEUL mot nouveau par réponse. Donne systématiquement la traduction française. `
    + `Corrige avec douceur, en reformulant correctement plutôt qu'en listant les fautes.`,
  intermediate:
    `Phrases de 8 à 12 mots. Passé et futur autorisés. `
    + `2 à 3 mots nouveaux par réponse au maximum. `
    + `Traduis les passages difficiles seulement, pas tout. `
    + `Corrige en signalant la règle en une ligne.`,
  advanced:
    `Phrases longues avec subordonnées, sujets abstraits simples, registres variés. `
    + `Ne traduis que ce qui bloque vraiment. `
    + `Corrige les nuances, propose synonymes et tournures plus idiomatiques.`,
};

// ─── Couche 2 : progression propre à chaque langue ───────────────────────────

const LANGUAGE_PROGRESSION: Record<string, Record<Level, string>> = {
  ar: {
    beginner:
      `Texte TOUJOURS entièrement vocalisé. Alphabet et formes positionnelles encore en cours `
      + `d'acquisition. Phrase nominale (pas de verbe « être » au présent), salutations, chiffres. `
      + `Sons à travailler : ع ح ق غ خ.`,
    intermediate:
      `Texte vocalisé. Verbe à l'accompli et à l'inaccompli, pronoms suffixes, `
      + `annexion (إضافة), duel et pluriels brisés.`,
    advanced:
      `Vocalise seulement les ambiguïtés, plus les mots entiers. `
      + `Exploite les racines trilitères et les schèmes pour élargir le lexique, `
      + `introduis les formes verbales dérivées (II, III, V) et la voix passive.`,
  },
  es: {
    beginner:
      `Présent de l'indicatif, distinction ser/estar, genre et nombre, articles. `
      + `Rappelle que le pronom sujet s'omet (« hablo », pas « yo hablo »). `
      + `Signale les faux-amis dès qu'il y en a un.`,
    intermediate:
      `Prétérit vs imparfait par contraste explicite, futur, pronoms COD/COI, impératif.`,
    advanced:
      `Subjonctif présent, conditionnel, propositions relatives, connecteurs argumentatifs.`,
  },
  it: {
    beginner:
      `Présent, genre et nombre, articles, prépositions articulées. `
      + `Insiste sur les CONSONNES DOUBLES (nono ≠ nonno) : difficulté n°1 des francophones.`,
    intermediate:
      `Passato prossimo vs imperfetto, futur, pronoms, particule « ne ».`,
    advanced:
      `Congiuntivo presente, conditionnel, concordance des temps, registres.`,
  },
  pt: {
    beginner:
      `Portugais BRÉSILIEN. Présent, ser/estar, genre et nombre. `
      + `Travaille les voyelles nasales (ã, õ, ão) et les digrammes lh/nh.`,
    intermediate:
      `Pretérito perfeito vs imperfeito, futur, pronoms (placement brésilien, avant le verbe).`,
    advanced:
      `Subjonctif présent ET futur du subjonctif (propre au portugais), conditionnel, connecteurs.`,
  },
  en: {
    beginner:
      `Présent simple et continu, « to be », articles, pluriels. `
      + `Marque l'ACCENT TONIQUE des mots nouveaux (ex. TOmato). `
      + `Travaille /θ/ /ð/, le h aspiré et le r. Signale les faux-amis.`,
    intermediate:
      `Prétérit, will vs going to, comparatifs, modaux de base. `
      + `Attention à l'orthographe, imprévisible : donne-la explicitement.`,
    advanced:
      `Present perfect (aucun équivalent français — explicite le contraste), `
      + `conditionnels 0 à 2, voix passive, phrasal verbs fréquents.`,
  },
  de: {
    beginner:
      `Ne donne JAMAIS un nom sans son article (der/die/das) ni son pluriel. `
      + `Présent, nominatif et accusatif seulement. Verbe en 2e position.`,
    intermediate:
      `Datif, parfait (haben/sein), verbes à particule séparable, prépositions mixtes. `
      + `Indique le cas employé et pourquoi.`,
    advanced:
      `Subordonnées avec VERBE EN DERNIÈRE POSITION (weil, dass, wenn), prétérit, `
      + `génitif, Konjunktiv II, groupes nominaux étendus.`,
  },
  ru: {
    beginner:
      `Cyrillique + translittération. MARQUE L'ACCENT TONIQUE sur chaque mot (молоко́). `
      + `Genre, présent, prépositionnel et accusatif. `
      + `Rappelle l'absence de verbe « être » au présent.`,
    intermediate:
      `Cyrillique, translittération seulement si le mot est difficile. Accent toujours marqué. `
      + `Passé (accord en genre), génitif, datif. Introduis l'ASPECT verbal `
      + `en donnant chaque verbe par paire perfectif/imperfectif.`,
    advanced:
      `Cyrillique seul, accent marqué. Six cas au pluriel, aspect systématisé, `
      + `verbes de mouvement avec préfixes, participes et gérondifs.`,
  },
  zh: {
    beginner:
      `Caractères + pinyin ACCENTUÉ (nǐ hǎo, jamais ni hao). Les 4 tons d'abord. `
      + `Donne le classificateur avec chaque nom. Signale le sandhi tonal quand il s'applique. `
      + `Reste dans les ~150 caractères les plus fréquents.`,
    intermediate:
      `Caractères + pinyin. Aspect 了 (JAMAIS présenté comme « le passé »), `
      + `comparaisons, ~300 caractères. Explique les caractères par leurs clés.`,
    advanced:
      `Caractères, pinyin sur les mots nouveaux seulement. Système aspectuel complet `
      + `(了 / 过 / 着), structure 把, ~600 caractères, premiers 成语.`,
  },
  ja: {
    beginner:
      `Kana, avec rōmaji en appui. Forme polie -masu/desu uniquement. `
      + `Nomme la PARTICULE employée et sa fonction (は が を に で). `
      + `Donne le compteur adapté. Attention à la longueur vocalique.`,
    intermediate:
      `Kanji avec furigana, plus de rōmaji. Forme neutre, forme en -te, passé, potentiel. `
      + `Explicite la distinction は vs が. Précise le niveau de politesse employé.`,
    advanced:
      `Kanji avec furigana sur les mots rares. Causatif, passif, conditionnels, `
      + `keigo (尊敬語 / 謙譲語), registres écrits.`,
  },
  ko: {
    beginner:
      `Hangeul + romanisation révisée. Style 해요체 uniquement. `
      + `Particules 은/는, 이/가, 을/를. Signale les changements de prononciation dus au batchim. `
      + `Distingue numération native et sino-coréenne.`,
    intermediate:
      `Hangeul, romanisation sur les mots difficiles. Passé et futur, connecteurs. `
      + `Introduis les niveaux de politesse et quand les employer.`,
    advanced:
      `Hangeul seul. Registres (합쇼체 / 반말) et choix social associé, `
      + `subordination, lexique sino-coréen, hanja de base.`,
  },
  vi: {
    beginner:
      `TOUS les diacritiques, toujours (Xin chào, jamais Xin chao). `
      + `Nomme le TON de chaque syllabe nouvelle et propose une paire minimale contrastive. `
      + `Explique le pronom relationnel choisi (tôi, em, anh, chị) et pourquoi. `
      + `Ordre SVO, classificateurs.`,
    intermediate:
      `Diacritiques toujours. Marqueurs temporels đã / đang / sẽ, `
      + `particules interrogatives (không, à, nhé), classificateurs étendus.`,
    advanced:
      `Diacritiques toujours. Particules modales, comparaisons, subordination, `
      + `idiomes et variations régionales Nord/Sud.`,
  },
};

/** Repli pour une langue sans progression déclarée. */
const GENERIC_PROGRESSION: Record<Level, string> = {
  beginner:     `Structures de base, vocabulaire concret, sons absents du français.`,
  intermediate: `Temps du passé et du futur, connecteurs, vocabulaire élargi.`,
  advanced:     `Subordination, registres, expressions idiomatiques.`,
};

function progressionFor(langCode: string, level: Level): string {
  return (LANGUAGE_PROGRESSION[langCode] ?? GENERIC_PROGRESSION)[level]
    ?? GENERIC_PROGRESSION[level];
}

// ─── API ─────────────────────────────────────────────────────────────────────

/**
 * Brief complet à injecter dans les prompts qui GÉNÈRENT du contenu
 * (conversation, exercices d'écriture, cours).
 */
export function levelBrief(level: Level, language: LanguageConfig): string {
  return `NIVEAU DE L'ÉLÈVE : ${CEFR_BAND[level]} (${levelLabel(level)}).
${LEVEL_FRAME[level]}
Progression ${language.familiarName} à ce niveau : ${progressionFor(language.code, level)}`;
}

/**
 * Version compacte pour les prompts courts (quiz), où le budget de tokens
 * compte et où seul le calibrage de difficulté importe.
 */
export function levelTag(level: Level, language: LanguageConfig): string {
  return `Niveau ${CEFR_BAND[level]} en ${language.familiarName} : `
       + `${progressionFor(language.code, level)}`;
}
