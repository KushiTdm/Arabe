import { useCallback, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getLexicon } from '../content/lexicon';
import { readMissed, missedStorageKey } from './missedWords';

// ─── Quêtes du jour et coffre ────────────────────────────────────────────────
// Trois objectifs par jour, tous tournés vers la révision et la maîtrise (jamais
// vers le simple fait d'ouvrir l'app). Les trois faits, un coffre s'ouvre :
// une carte-mot à collectionner (cosmétique) ou, parfois, un gel de série.
// Les probabilités sont affichées à l'élève et ne changent jamais.

export type QuestId = 'review' | 'quiz' | 'lesson' | 'recover';

export interface Quest { id: QuestId; label: string; target: number; progress: number }
export type Rarity = 'common' | 'rare' | 'epic';
export interface CollectedCard {
  word: string; lang: string; fr: string; rarity: Rarity; date: string;
  img?: string; emoji?: string; color?: string;
}
export type Reward = { kind: 'card'; card: CollectedCard } | { kind: 'freeze' } | { kind: 'complete' };

interface QuestStore { date: string; quests: Quest[]; claimed: boolean; reward?: Reward }
export interface Inventory { freezes: number; cards: CollectedCard[] }

/** Probabilités du coffre, affichées telles quelles. */
export const CHEST_ODDS = { freeze: 10, card: 90, rarity: { common: 70, rare: 25, epic: 5 } as Record<Rarity, number> };
export const MAX_FREEZES = 2;
export const RARITY_LABEL: Record<Rarity, string> = { common: 'Commune', rare: 'Rare', epic: 'Épique' };
export const RARITY_COLOR: Record<Rarity, string> = { common: '#6b7280', rare: '#0f766e', epic: '#b45309' };

export const questKey = (profileId: string | undefined, lang: string) => `@maa_quests_${profileId ?? 'default'}_${lang}`;
export const inventoryKey = (profileId: string | undefined) => `@maa_inventory_${profileId ?? 'default'}`;

const today = () => new Date().toISOString().slice(0, 10);
const EMPTY_INV: Inventory = { freezes: 0, cards: [] };

async function read<T>(key: string, fallback: T): Promise<T> {
  try { const raw = await AsyncStorage.getItem(key); return raw ? { ...fallback, ...JSON.parse(raw) } : fallback; } catch { return fallback; }
}
const write = (key: string, v: unknown) => AsyncStorage.setItem(key, JSON.stringify(v)).catch(() => {});

export const readInventory = (profileId: string | undefined) => read<Inventory>(inventoryKey(profileId), EMPTY_INV);

function makeQuests(date: string, missedCount: number): Quest[] {
  // Objectif de révision qui varie un peu d'un jour à l'autre (6 à 9 cartes).
  const day = Number(date.slice(8, 10)) || 1;
  const review: Quest = { id: 'review', label: 'Réviser des cartes', target: 6 + (day % 4), progress: 0 };
  const quiz: Quest = { id: 'quiz', label: 'Réussir un quiz', target: 1, progress: 0 };
  // Retrouver des mots ratés n'est proposé que s'il y en a de quoi.
  const third: Quest = missedCount >= 3
    ? { id: 'recover', label: 'Retrouver des mots ratés', target: 3, progress: 0 }
    : { id: 'lesson', label: 'Finir une partie de leçon', target: 1, progress: 0 };
  return [review, quiz, third];
}

export async function loadQuests(key: string, missedKey: string): Promise<QuestStore> {
  const s = await read<QuestStore | null>(key, null as any);
  if (s && s.date === today()) return s;
  const missed = Object.keys(await readMissed(missedKey)).length;
  const fresh: QuestStore = { date: today(), quests: makeQuests(today(), missed), claimed: false };
  await write(key, fresh);
  return fresh;
}

/** Fait avancer une quête. Sans effet si elle n'est pas au programme du jour. */
export async function trackQuest(profileId: string | undefined, lang: string, id: QuestId, amount = 1) {
  const key = questKey(profileId, lang);
  const s = await loadQuests(key, missedStorageKey(profileId, lang));
  const q = s.quests.find(x => x.id === id);
  if (!q || q.progress >= q.target) return;
  q.progress = Math.min(q.target, q.progress + amount);
  await write(key, s);
}

export const allDone = (s: QuestStore) => s.quests.every(q => q.progress >= q.target);

function drawRarity(): Rarity {
  const r = Math.random() * 100;
  return r < CHEST_ODDS.rarity.epic ? 'epic' : r < CHEST_ODDS.rarity.epic + CHEST_ODDS.rarity.rare ? 'rare' : 'common';
}

/** Ouvre le coffre du jour (une seule fois). */
export async function claimChest(profileId: string | undefined, lang: string): Promise<Reward | null> {
  const key = questKey(profileId, lang);
  const s = await loadQuests(key, missedStorageKey(profileId, lang));
  if (s.claimed || !allDone(s)) return null;
  const inv = await readInventory(profileId);

  const owned = new Set(inv.cards.filter(c => c.lang === lang).map(c => c.word));
  const candidates = getLexicon(lang).filter(w => (w.img || w.color) && !owned.has(w.native_word));
  const wantFreeze = Math.random() * 100 < CHEST_ODDS.freeze;

  let reward: Reward;
  if (wantFreeze && inv.freezes < MAX_FREEZES) {
    inv.freezes += 1; reward = { kind: 'freeze' };
  } else if (candidates.length > 0) {
    const w = candidates[Math.floor(Math.random() * candidates.length)];
    const card: CollectedCard = {
      word: w.native_word, lang, fr: w.french_translation, rarity: drawRarity(), date: today(),
      img: w.img, emoji: w.emoji, color: w.color,
    };
    inv.cards.push(card); reward = { kind: 'card', card };
  } else {
    reward = { kind: 'complete' };
  }
  s.claimed = true; s.reward = reward;
  await write(key, s);
  await write(inventoryKey(profileId), inv);
  return reward;
}

/** Un jour manqué est rattrapé par un gel : consomme-le et dis si c'était le cas. */
export async function consumeFreeze(profileId: string | undefined): Promise<boolean> {
  const inv = await readInventory(profileId);
  if (inv.freezes <= 0) return false;
  inv.freezes -= 1;
  await write(inventoryKey(profileId), inv);
  return true;
}

export function useQuests(profileId: string | undefined, lang: string) {
  const [state, setState] = useState<QuestStore | null>(null);
  const [inv, setInv] = useState<Inventory>(EMPTY_INV);
  const reload = useCallback(async () => {
    setState(await loadQuests(questKey(profileId, lang), missedStorageKey(profileId, lang)));
    setInv(await readInventory(profileId));
  }, [profileId, lang]);
  useEffect(() => { reload(); }, [reload]);
  const claim = async () => { const r = await claimChest(profileId, lang); await reload(); return r; };
  return { state, inv, reload, claim };
}
