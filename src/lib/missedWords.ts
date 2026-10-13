import AsyncStorage from '@react-native-async-storage/async-storage';

// ─── Mots ratés ──────────────────────────────────────────────────────────────
// Chaque mot raté dans un quiz est mémorisé par profil et par langue. Le boss de
// fin d'unité les réinjecte ; un mot réussi face au boss perd un point d'erreur.

export type MissedMap = Record<string, { n: number; last: string }>;

export const missedStorageKey = (profileId: string | undefined, langCode: string) =>
  `@maa_missed_${profileId ?? 'default'}_${langCode}`;

export async function readMissed(key: string): Promise<MissedMap> {
  try {
    const raw = await AsyncStorage.getItem(key);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

async function write(key: string, map: MissedMap) {
  try { await AsyncStorage.setItem(key, JSON.stringify(map)); } catch { /* stockage indisponible */ }
}

export async function recordMiss(key: string, word: string) {
  const map = await readMissed(key);
  map[word] = { n: (map[word]?.n ?? 0) + 1, last: new Date().toISOString() };
  await write(key, map);
}

/** Un mot réussi face au boss : une erreur de moins, effacé à zéro. */
export async function recordRecovered(key: string, word: string): Promise<boolean> {
  const map = await readMissed(key);
  if (!map[word]) return false;
  if (map[word].n <= 1) delete map[word]; else map[word] = { ...map[word], n: map[word].n - 1 };
  await write(key, map);
  return true;
}
