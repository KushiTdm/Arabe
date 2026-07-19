import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { VocabWord } from '../data/multilingualVocab';

// ─── Spaced repetition (Leitner boxes) ───────────────────────────────────────
// box 1..5 ; réussite → box+1, échec → retour box 1.
// Intervalle avant la prochaine revue, en jours, par box atteinte.
const BOX_INTERVALS_DAYS = [1, 3, 7, 14, 30];
export const MAX_BOX = 5;

export interface ReviewCard {
  id: string;
  native_word: string;
  transliteration: string;
  french_translation: string;
  category: string;
  box: number;
  nextDue: string; // YYYY-MM-DD
  practice_count: number;
}

export function reviewStorageKey(profileId: string | undefined, langCode: string): string {
  return `@maa_review_${profileId ?? 'default'}_${langCode}`;
}

function todayStr(): string {
  return new Date().toISOString().split('T')[0];
}

function dateInDays(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().split('T')[0];
}

export function useReviewDeck(storageKey: string) {
  const [cards, setCards] = useState<ReviewCard[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const raw = await AsyncStorage.getItem(storageKey);
      setCards(raw ? JSON.parse(raw) : []);
    } catch (err) {
      console.error('useReviewDeck load error:', err);
      setCards([]);
    } finally {
      setLoading(false);
    }
  }, [storageKey]);

  useEffect(() => { load(); }, [load]);

  const persist = async (updated: ReviewCard[]) => {
    setCards(updated);
    await AsyncStorage.setItem(storageKey, JSON.stringify(updated));
  };

  // ── Deck management ───────────────────────────────────────────────────
  const has = (wordId: string): boolean => cards.some(c => c.id === wordId);

  const addWord = async (word: Pick<VocabWord, 'id' | 'native_word' | 'transliteration' | 'french_translation' | 'category'>) => {
    if (has(word.id)) return;
    const card: ReviewCard = {
      id: word.id,
      native_word: word.native_word,
      transliteration: word.transliteration,
      french_translation: word.french_translation,
      category: word.category,
      box: 1,
      nextDue: todayStr(),
      practice_count: 0,
    };
    await persist([...cards, card]);
  };

  const addWords = async (words: Array<Pick<VocabWord, 'id' | 'native_word' | 'transliteration' | 'french_translation' | 'category'>>) => {
    const existing = new Set(cards.map(c => c.id));
    const fresh = words
      .filter(w => !existing.has(w.id))
      .map<ReviewCard>(w => ({
        id: w.id,
        native_word: w.native_word,
        transliteration: w.transliteration,
        french_translation: w.french_translation,
        category: w.category,
        box: 1,
        nextDue: todayStr(),
        practice_count: 0,
      }));
    if (fresh.length === 0) return;
    await persist([...cards, ...fresh]);
  };

  const removeWord = async (wordId: string) => {
    await persist(cards.filter(c => c.id !== wordId));
  };

  // ── Answer a card during a session ────────────────────────────────────
  const answer = async (wordId: string, known: boolean) => {
    const updated = cards.map(c => {
      if (c.id !== wordId) return c;
      const newBox = known ? Math.min(c.box + 1, MAX_BOX) : 1;
      return {
        ...c,
        box: newBox,
        nextDue: known ? dateInDays(BOX_INTERVALS_DAYS[newBox - 1]) : todayStr(),
        practice_count: c.practice_count + 1,
      };
    });
    await persist(updated);
  };

  // ── Derived ───────────────────────────────────────────────────────────
  const today = todayStr();
  const dueCards = cards.filter(c => c.nextDue <= today);
  const masteredCount = cards.filter(c => c.box >= MAX_BOX).length;

  return {
    cards,
    dueCards,
    dueCount: dueCards.length,
    masteredCount,
    loading,
    has,
    addWord,
    addWords,
    removeWord,
    answer,
    reload: load,
  };
}
