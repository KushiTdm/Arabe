import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// ─── Progression dans les conversations guidées ──────────────────────────────
// Par profil et par langue : meilleur score de chaque conversation terminée.

export const CONVERSATION_XP = 10;
export const CONVERSATION_PASS_PCT = 60;

export function conversationStorageKey(profileId: string | undefined, langCode: string): string {
  return `@maa_conv_${profileId ?? 'default'}_${langCode}`;
}

export type ConversationScores = Record<string, number>;

export async function saveConversationScore(key: string, id: string, pct: number): Promise<{ firstPass: boolean }> {
  let scores: ConversationScores = {};
  try { scores = JSON.parse((await AsyncStorage.getItem(key)) ?? '{}'); } catch { scores = {}; }
  const before = scores[id] ?? 0;
  const firstPass = before < CONVERSATION_PASS_PCT && pct >= CONVERSATION_PASS_PCT;
  scores[id] = Math.max(before, pct);
  await AsyncStorage.setItem(key, JSON.stringify(scores));
  return { firstPass };
}

export function useConversationProgress(key: string) {
  const [scores, setScores] = useState<ConversationScores>({});
  const [loading, setLoading] = useState(true);

  const reload = useCallback(async () => {
    try { setScores(JSON.parse((await AsyncStorage.getItem(key)) ?? '{}')); } catch { setScores({}); }
    setLoading(false);
  }, [key]);

  useEffect(() => { reload(); }, [reload]);

  const done = (id: string) => (scores[id] ?? -1) >= CONVERSATION_PASS_PCT;
  return { scores, loading, reload, done, doneCount: Object.keys(scores).filter(done).length };
}
