import { Platform } from 'react-native';
import * as Speech from 'expo-speech';
import { Audio } from 'expo-av';

// ─── Lecture audio centralisée (TTS) ─────────────────────────────────────────
// Remplace les appels dispersés à Speech.speak(). Trois problèmes réglés ici :
//   1. expo-speech EMPILE les énoncés ; sans stop() préalable, deux taps
//      successifs se lisent l'un après l'autre au lieu de se remplacer.
//   2. Sans identifiant de voix explicite, le moteur retombe silencieusement
//      sur la locale par défaut du téléphone : un mot arabe lu par une voix
//      française produit du bruit et enseigne une prononciation fausse.
//   3. Le débit était choisi au hasard (0.7 / 0.8 / 0.85 selon l'écran).

export type SpeechSpeed = 'normal' | 'slow';

/**
 * Débit par langue et par vitesse.
 *
 * Les langues à tons (vi, zh) se dégradent quand on les ralentit : le contour
 * tonal synthétisé s'étire et devient perceptivement faux — un apprenant qui
 * écoute un `sắc` ralenti n'entend plus une montée. On ne descend donc jamais
 * sous ~0.78 pour ces langues, alors qu'on peut aller beaucoup plus bas sur
 * les langues où le mot est une suite de segments (ar, ru, de, ja, ko).
 */
const RATE_POLICY: Record<string, { normal: number; slow: number }> = {
  vi: { normal: 0.92, slow: 0.78 },  // 6 tons — ralentissement limité
  zh: { normal: 0.92, slow: 0.78 },  // 4 tons + sandhi — ralentissement limité
  ar: { normal: 0.85, slow: 0.55 },  // emphatiques et gutturales : lent = utile
  ja: { normal: 0.88, slow: 0.62 },
  ko: { normal: 0.88, slow: 0.62 },  // batchim et consonnes tendues
  ru: { normal: 0.88, slow: 0.60 },  // accent mobile, réduction vocalique
  de: { normal: 0.90, slow: 0.62 },  // mots composés longs
  en: { normal: 0.95, slow: 0.65 },
  es: { normal: 0.95, slow: 0.68 },
  it: { normal: 0.95, slow: 0.68 },  // consonnes doubles audibles au ralenti
  pt: { normal: 0.92, slow: 0.65 },  // voyelles nasales
};

const DEFAULT_RATE = { normal: 0.95, slow: 0.68 };

export function rateFor(langCode: string, speed: SpeechSpeed): number {
  return (RATE_POLICY[langCode] ?? DEFAULT_RATE)[speed];
}

// ─── Résolution de voix ──────────────────────────────────────────────────────

export type VoiceStatus =
  | 'exact'     // une voix de la locale exacte est installée (ar-SA)
  | 'language'  // une voix de la langue mais d'une autre région (ar-EG pour ar-SA)
  | 'missing'   // aucune voix : le moteur lirait avec la voix par défaut → inaudible/faux
  | 'unknown';  // impossible de lister les voix (web, moteur non initialisé)

export interface VoiceResolution {
  identifier?: string;
  name?: string;
  status: VoiceStatus;
}

let voiceCache: Speech.Voice[] | null = null;
const resolutionCache = new Map<string, VoiceResolution>();

/** Normalise "ar_SA", "ara-x-lcl", "AR-sa" → "ar-sa". */
function normalizeTag(tag: string): string {
  return tag.toLowerCase().replace(/_/g, '-');
}

function baseCode(tag: string): string {
  return normalizeTag(tag).split('-')[0].slice(0, 2);
}

async function loadVoices(): Promise<Speech.Voice[]> {
  if (voiceCache) return voiceCache;
  try {
    voiceCache = await Speech.getAvailableVoicesAsync();
  } catch {
    voiceCache = [];
  }
  return voiceCache;
}

/** Préfère une voix "Enhanced" (nettement plus intelligible) à une "Default". */
function bestOf(voices: Speech.Voice[]): Speech.Voice {
  return voices.find(v => v.quality === Speech.VoiceQuality.Enhanced) ?? voices[0];
}

/**
 * Cherche la meilleure voix installée pour un tag BCP-47.
 * Résultat mémorisé : l'appel natif est coûteux et la liste ne bouge pas
 * pendant la session.
 */
export async function resolveVoice(ttsLang: string): Promise<VoiceResolution> {
  const cached = resolutionCache.get(ttsLang);
  if (cached) return cached;

  const voices = await loadVoices();
  let result: VoiceResolution;

  if (voices.length === 0) {
    // Liste indisponible (web, ou moteur TTS Android pas encore initialisé).
    // On ne peut rien affirmer : on laisse parler avec le tag de langue.
    result = { status: 'unknown' };
  } else {
    const wanted = normalizeTag(ttsLang);
    const base = baseCode(ttsLang);

    const exact = voices.filter(v => normalizeTag(v.language) === wanted);
    const sameLang = voices.filter(v => baseCode(v.language) === base);

    if (exact.length > 0) {
      const v = bestOf(exact);
      result = { identifier: v.identifier, name: v.name, status: 'exact' };
    } else if (sameLang.length > 0) {
      const v = bestOf(sameLang);
      result = { identifier: v.identifier, name: v.name, status: 'language' };
    } else {
      result = { status: 'missing' };
    }
  }

  resolutionCache.set(ttsLang, result);
  return result;
}

/** Force un rechargement (après installation d'un pack de voix par l'utilisateur). */
export function invalidateVoiceCache(): void {
  voiceCache = null;
  resolutionCache.clear();
}

// ─── Configuration audio ─────────────────────────────────────────────────────

/**
 * À appeler une fois au démarrage. Sans `playsInSilentModeIOS`, toute la
 * lecture audio est muette quand l'interrupteur latéral de l'iPhone est sur
 * silencieux — cas très fréquent, et l'utilisateur conclut que l'app est cassée.
 */
export async function configureAudioForPlayback(): Promise<void> {
  if (Platform.OS === 'web') return;
  try {
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      playsInSilentModeIOS: true,
      staysActiveInBackground: false,
      shouldDuckAndroid: true,
    });
  } catch {
    // Non bloquant : l'app reste utilisable sans son.
  }
}

// ─── API de lecture ──────────────────────────────────────────────────────────

export interface SpeakOptions {
  speed?: SpeechSpeed;
  onStart?: () => void;
  onDone?: () => void;
  /** Appelé si aucune voix n'est installée pour cette langue (rien n'est lu). */
  onUnavailable?: (resolution: VoiceResolution) => void;
}

/**
 * Lit un texte dans la langue cible.
 *
 * Toujours appeler avec le mot en écriture native — jamais la translittération,
 * qui serait lue comme du texte latin par une voix étrangère.
 */
export async function speak(
  text: string,
  ttsLang: string,
  langCode: string,
  options: SpeakOptions = {},
): Promise<void> {
  const clean = text?.trim();
  if (!clean) return;

  const { speed = 'normal', onStart, onDone, onUnavailable } = options;

  // Remplace l'énoncé en cours au lieu de l'empiler derrière.
  await Speech.stop();

  const resolution = await resolveVoice(ttsLang);

  // Voix absente et liste fiable : lire produirait la phrase avec la voix par
  // défaut du téléphone (souvent française) — pédagogiquement pire que le
  // silence. On prévient l'appelant plutôt que d'enseigner une erreur.
  if (resolution.status === 'missing') {
    onUnavailable?.(resolution);
    return;
  }

  Speech.speak(clean, {
    language: ttsLang,
    voice: resolution.identifier,
    rate: rateFor(langCode, speed),
    pitch: 1.0,
    onStart,
    onDone,
    onStopped: onDone,
    onError: onDone,
  });
}

export async function stopSpeaking(): Promise<void> {
  try { await Speech.stop(); } catch { /* rien à arrêter */ }
}

/** Message d'aide affichable quand aucune voix n'est installée. */
export function missingVoiceHint(languageName: string): string {
  return Platform.OS === 'android'
    ? `Aucune voix ${languageName} installée. Réglages › Général › Synthèse vocale › `
      + `Google Text-to-Speech › Installer les données vocales.`
    : `Aucune voix ${languageName} installée. Réglages › Accessibilité › `
      + `Contenu énoncé › Voix › ajouter ${languageName}.`;
}
