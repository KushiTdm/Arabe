import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { READ_PASS_PCT } from '../content/reading';

// Meilleur score (en %) de chaque palier de lecture, par profil et par langue.

export function readingStorageKey(profileId: string | undefined, langCode: string): string {
  return `@maa_read_${profileId ?? 'default'}_${langCode}`;
}

export type ReadingScores = Record<string, number>;

export async function saveReadingScore(key: string, level: string, pct: number): Promise<void> {
  let scores: ReadingScores = {};
  try { scores = JSON.parse((await AsyncStorage.getItem(key)) ?? '{}'); } catch { scores = {}; }
  scores[level] = Math.max(scores[level] ?? 0, pct);
  await AsyncStorage.setItem(key, JSON.stringify(scores));
}

export function useReadingProgress(key: string) {
  const [scores, setScores] = useState<ReadingScores>({});
  const reload = useCallback(async () => {
    try { setScores(JSON.parse((await AsyncStorage.getItem(key)) ?? '{}')); } catch { setScores({}); }
  }, [key]);
  useEffect(() => { reload(); }, [reload]);
  const passed = (level: string) => (scores[level] ?? 0) >= READ_PASS_PCT;
  return { scores, reload, passed };
}
