import { Audio } from 'expo-av';

// ─── Capture audio calibrée pour la voix ─────────────────────────────────────
// Les écrans utilisaient `RecordingOptionsPresets.HIGH_QUALITY` : 44,1 kHz,
// stéréo, 128 kbps — un réglage de musique. Pour de la parole envoyée à l'IA
// c'est du gaspillage pur : la voix humaine tient sous 8 kHz de bande utile,
// et le fichier part en base64 (+33 %) dans une requête réseau.
//
//   HIGH_QUALITY : ~16 Ko/s  → 5 s ≈ 80 Ko  → base64 ≈ 107 Ko
//   VOICE        : ~4  Ko/s  → 5 s ≈ 20 Ko  → base64 ≈  27 Ko
//
// Soit ~4× moins à téléverser : envoi plus rapide, moins d'échecs réseau, et
// aucune perte de qualité pour la reconnaissance (16 kHz mono est la norme
// d'entrée des modèles de parole).

export const VOICE_RECORDING_OPTIONS: Audio.RecordingOptions = {
  isMeteringEnabled: true,
  android: {
    extension: '.m4a',
    outputFormat: Audio.AndroidOutputFormat.MPEG_4,
    audioEncoder: Audio.AndroidAudioEncoder.AAC,
    sampleRate: 16000,
    numberOfChannels: 1,
    bitRate: 32000,
  },
  ios: {
    extension: '.m4a',
    outputFormat: Audio.IOSOutputFormat.MPEG4AAC,
    audioQuality: Audio.IOSAudioQuality.MEDIUM,
    sampleRate: 16000,
    numberOfChannels: 1,
    bitRate: 32000,
    linearPCMBitDepth: 16,
    linearPCMIsBigEndian: false,
    linearPCMIsFloat: false,
  },
  web: {
    mimeType: 'audio/webm',
    bitsPerSecond: 32000,
  },
};

// ─── Garde-fous de durée ─────────────────────────────────────────────────────

/** En dessous, c'est un appui accidentel : rien d'exploitable à évaluer. */
export const MIN_RECORDING_SECONDS = 1;

/** Au-delà, la requête grossit sans rien apporter (et brûle un crédit IA). */
export const MAX_RECORDING_SECONDS = 30;

/** Un mot isolé n'a jamais besoin de plus : coupe automatiquement. */
export const MAX_WORD_RECORDING_SECONDS = 10;

export type RecordingRejection = 'too-short' | 'too-long' | null;

export function checkDuration(seconds: number, max = MAX_RECORDING_SECONDS): RecordingRejection {
  if (seconds < MIN_RECORDING_SECONDS) return 'too-short';
  if (seconds > max) return 'too-long';
  return null;
}

export function rejectionMessage(reason: Exclude<RecordingRejection, null>): string {
  return reason === 'too-short'
    ? 'Enregistrement trop court — garde le micro appuyé le temps de prononcer.'
    : 'Enregistrement trop long — reste sous 30 secondes.';
}

// ─── Type MIME ───────────────────────────────────────────────────────────────

/**
 * Déduit le type MIME de l'extension du fichier produit par expo-av.
 *
 * `audio/m4a` n'est pas un type MIME enregistré (le conteneur MPEG-4 est
 * `audio/mp4`), mais c'est la valeur que l'API accepte aujourd'hui dans cette
 * app : on la conserve pour ne rien casser. Point unique à modifier si un
 * changement d'API l'impose.
 */
export function mimeTypeForUri(uri: string): string {
  const ext = uri.split('.').pop()?.toLowerCase() ?? 'm4a';
  switch (ext) {
    case 'wav':  return 'audio/wav';
    case 'mp3':  return 'audio/mp3';
    case 'aac':  return 'audio/aac';
    case 'ogg':  return 'audio/ogg';
    case 'flac': return 'audio/flac';
    case 'webm': return 'audio/webm';
    default:     return 'audio/m4a';
  }
}
