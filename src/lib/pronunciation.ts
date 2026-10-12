import { invokeAIWithAudio } from '../api/aiClient';
import type { LanguageConfig } from './languages';

// ─── Évaluation de prononciation ─────────────────────────────────────────────
// Différence essentielle avec l'évaluation faite dans la Conversation : ici on
// connaît LA CIBLE. L'IA ne devine pas ce que l'élève a voulu dire, elle
// compare ce qu'elle entend à un mot précis. Le diagnostic devient fiable et
// on peut produire un score reproductible plutôt qu'un « Bien ! » générique.

export interface PronunciationIssue {
  /** Le son ou la syllabe en cause. */
  segment: string;
  /** Ce que l'élève a produit. */
  heard: string;
  /** Ce qui était attendu. */
  expected: string;
  /** Consigne articulatoire concrète (où placer la langue, la glotte…). */
  fix: string;
}

export type PronunciationVerdict = 'excellent' | 'good' | 'fair' | 'retry';

export interface PronunciationResult {
  score: number;              // 0–100
  verdict: PronunciationVerdict;
  /** Transcription de ce qui a réellement été prononcé. */
  heard: string;
  /** false = l'élève a dit un autre mot (à distinguer d'un mot mal prononcé). */
  matches_target: boolean;
  issues: PronunciationIssue[];
  /** UNE seule consigne à retenir pour le prochain essai. */
  tip: string;
}

// ─── Pièges spécifiques aux francophones, par langue ─────────────────────────
// C'est ce qui transforme un retour vague en diagnostic utile : sans cette
// liste, le modèle commente au hasard ; avec elle, il vérifie les points où
// le français induit réellement en erreur (cf. methodologie.md § 3).

const FRANCOPHONE_FOCUS: Record<string, string> = {
  ar: `ع (ʿayn) souvent réduit à une voyelle ; ح (ḥ) confondu avec h ou disparu ; `
    + `ق (q) prononcé k ; خ/غ ; emphatiques ص ض ط ظ aplaties en s/d/t/z ; `
    + `longueur vocalique (ـَ vs ـَا) ; ر doit être roulé, jamais le r français.`,
  vi: `LES TONS D'ABORD : contour de chaque syllabe (ngang plat, huyền descendant, `
    + `sắc montant, hỏi creusé-remontant, ngã brisé, nặng bas et bref). `
    + `Voyelles ơ ư â ă ; finales -c -t -p non relâchées ; ne pas accentuer la finale à la française.`,
  zh: `LES TONS D'ABORD (1 haut plat, 2 montant, 3 creusé, 4 descendant) et le sandhi. `
    + `Rétroflexes zh/ch/sh distinctes de z/c/s ; aspiration p/t/k vs b/d/g ; `
    + `ü ; distinction finale -n vs -ng.`,
  ja: `Voyelles pures et LONGUEUR vocalique distinctive (obasan ≠ obāsan) ; `
    + `consonnes géminées (kite ≠ kitte) ; accent de hauteur ; `
    + `R japonais = battement alvéolaire, jamais le r français ; ne pas accentuer la finale.`,
  ko: `Triple opposition ㄱ/ㄲ/ㅋ (simple, tendue, aspirée) — inaudible pour un francophone ; `
    + `batchim non relâché en finale ; voyelles ㅓ vs ㅗ et ㅡ ; assimilations entre blocs.`,
  ru: `PLACE DE L'ACCENT TONIQUE (change le mot) ; réduction du o atone en a (akanye) ; `
    + `palatalisation (ь) ; ы distinct de и ; х ; р roulé ; consonnes finales assourdies.`,
  de: `Voyelles ü et ö ; ch [ç] (ich) vs [x] (Bach) ; h aspiré réellement expiré ; `
    + `coup de glotte devant voyelle initiale ; accent sur la première syllabe du radical ; `
    + `ne pas nasaliser les voyelles devant n/m.`,
  es: `r simple vs rr roulé (pero ≠ perro) ; j/g [x] ; VOYELLES PURES — aucune nasalisation ; `
    + `d intervocalique [ð] ; pas de liaison ni d'accent final à la française.`,
  it: `CONSONNES DOUBLES réellement tenues (nono ≠ nonno) — l'erreur n°1 des francophones ; `
    + `voyelles ouvertes/fermées ; gli [ʎ] ; gn [ɲ] ; aucune nasalisation ; place de l'accent tonique.`,
  pt: `Voyelles nasales ã õ ão ; lh [ʎ] et nh [ɲ] ; r initial et rr gutturaux ; `
    + `réduction des voyelles atones ; s final ; ne pas lire à la française.`,
  en: `/θ/ et /ð/ (think, this) jamais en s/z ; h réellement aspiré ; r rétroflexe ; `
    + `voyelles courtes vs longues (ship ≠ sheep) ; ACCENT TONIQUE de mot ; `
    + `pas de nasalisation devant n/m ; pas d'accent sur la dernière syllabe.`,
};

function focusFor(langCode: string): string {
  return FRANCOPHONE_FOCUS[langCode]
    ?? `Sons absents du français, longueur vocalique et place de l'accent tonique.`;
}

// ─── Barème ──────────────────────────────────────────────────────────────────
// Explicite dans le prompt : sans barème écrit, le modèle note « 85 » à tout
// le monde et le score perd toute valeur de progression.

const SCORING_RUBRIC = `Barème (sois honnête, un score flatteur n'aide pas) :
90-100 : prononciation quasi native, aucun défaut gênant
75-89  : compris sans effort par un natif, accent léger
60-74  : compris avec effort, un ou deux sons fautifs
40-59  : déformations qui gênent la compréhension
0-39   : mot non reconnaissable, ou mot différent de la cible`;

export function verdictFor(score: number): PronunciationVerdict {
  if (score >= 90) return 'excellent';
  if (score >= 75) return 'good';
  if (score >= 60) return 'fair';
  return 'retry';
}

export function verdictLabel(verdict: PronunciationVerdict): string {
  switch (verdict) {
    case 'excellent': return 'Excellent';
    case 'good':      return 'Bien';
    case 'fair':      return 'Compréhensible';
    default:          return 'À refaire';
  }
}

// ─── Appel ───────────────────────────────────────────────────────────────────

interface RawResult {
  score?: number;
  heard?: string;
  matches_target?: boolean;
  issues?: Array<{ segment?: string; heard?: string; expected?: string; fix?: string }>;
  tip?: string;
}

export interface EvaluateParams {
  language: LanguageConfig;
  /** Le mot ou la phrase que l'élève devait prononcer, en écriture native. */
  target: string;
  /** Romanisation, si disponible — aide le modèle à cadrer l'attendu. */
  transliteration?: string;
  /** Traduction française, pour lever une ambiguïté d'homophone. */
  meaning?: string;
  audioBase64: string;
  mimeType: string;
}

/**
 * Compare l'audio de l'élève à une cible connue et renvoie un diagnostic
 * structuré. Un seul objectif par appel : pas de conversation, pas de cours,
 * pas de suivi d'erreurs — ce qui garde le prompt court (donc peu coûteux)
 * et empêche le modèle de diluer le retour de prononciation.
 */
export async function evaluatePronunciation(
  params: EvaluateParams,
): Promise<PronunciationResult> {
  const { language, target, transliteration, meaning, audioBase64, mimeType } = params;

  const prompt = `Tu es phonéticien, professeur de ${language.familiarName} pour francophones.

L'élève devait prononcer : "${target}"${transliteration ? ` (${transliteration})` : ''}${meaning ? ` — « ${meaning} »` : ''}
Écoute l'audio joint et compare-le À CETTE CIBLE PRÉCISE.

Points à vérifier en priorité pour un francophone :
${focusFor(language.code)}

${SCORING_RUBRIC}

Règles :
- matches_target=false UNIQUEMENT si l'élève a dit un AUTRE mot (pas s'il a dit le bon mot avec un accent).
- Si l'audio est inaudible, vide ou incompréhensible : score=0, heard="", tip explique de réessayer.
- N'invente pas de défaut : si c'est bien prononcé, issues=[] et dis-le.
- Maximum 2 issues, les plus importantes seulement.
- "fix" doit être une consigne ARTICULATOIRE concrète (position de la langue, de la glotte, souffle), pas « entraîne-toi ».
- "tip" : UNE seule chose à corriger au prochain essai, en français, encourageante.

JSON: {"score":0,"heard":"","matches_target":true,"issues":[{"segment":"","heard":"","expected":"","fix":""}],"tip":""}`;

  const res = await invokeAIWithAudio<RawResult>(prompt, audioBase64, mimeType);

  const rawScore = typeof res?.score === 'number' ? res.score : 0;
  const score = Math.max(0, Math.min(100, Math.round(rawScore)));

  const issues: PronunciationIssue[] = (res?.issues ?? [])
    .filter(i => i && (i.segment || i.fix))
    .slice(0, 2)
    .map(i => ({
      segment:  i.segment  ?? '',
      heard:    i.heard    ?? '',
      expected: i.expected ?? '',
      fix:      i.fix      ?? '',
    }));

  return {
    score,
    verdict: verdictFor(score),
    heard: res?.heard?.trim() ?? '',
    matches_target: res?.matches_target !== false,
    issues,
    tip: res?.tip?.trim() || 'Réessaie en articulant plus lentement.',
  };
}
