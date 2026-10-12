import { useState, useCallback, useRef, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useProfile } from './ProfileContext';
import {
  getPath, type PathUnit, type PathStep, type PathLevel,
} from '../data/learningPath';

// ─── Progression dans le parcours ────────────────────────────────────────────
// Stockée par profil ET par langue. Une étape est validée :
//   • quiz / test de lecture : par l'écran du quiz, au-dessus du seuil de réussite ;
//   • dialogue : par l'écran de conversation, après deux messages de l'élève ;
//   • lecture / mots : quand l'élève revient de l'écran ouvert (« étape visitée »).
// Une unité est terminée quand toutes ses étapes le sont.

export const UNIT_XP = 20;

interface PathStore {
  steps: Record<string, number[]>;
  rewarded: string[];
  pending: { unitId: string; stepIdx: number } | null;
}

const EMPTY: PathStore = { steps: {}, rewarded: [], pending: null };

export function pathStorageKey(profileId: string | undefined, langCode: string): string {
  return `@maa_path_${profileId ?? 'default'}_${langCode}`;
}

async function readStore(key: string): Promise<PathStore> {
  try {
    const raw = await AsyncStorage.getItem(key);
    return raw ? { ...EMPTY, ...JSON.parse(raw) } : { ...EMPTY };
  } catch {
    return { ...EMPTY };
  }
}

async function writeStore(key: string, store: PathStore): Promise<void> {
  await AsyncStorage.setItem(key, JSON.stringify(store));
}

/** Valide une étape depuis un autre écran (quiz, conversation). */
export async function markStepDone(key: string, unitId: string, stepIdx: number): Promise<void> {
  const store = await readStore(key);
  const done = new Set(store.steps[unitId] ?? []);
  done.add(stepIdx);
  store.steps[unitId] = [...done].sort((a, b) => a - b);
  if (store.pending?.unitId === unitId && store.pending.stepIdx === stepIdx) store.pending = null;
  await writeStore(key, store);
}

export interface StepRef { unitId: string; stepIdx: number }

export function isUnitDone(unit: PathUnit, store: PathStore): boolean {
  const done = store.steps[unit.id] ?? [];
  return unit.steps.every((_, i) => done.includes(i));
}

export function usePathProgress() {
  const { activeProfile, language, currentProgress, updateProgress, addXP } = useProfile();
  const key = pathStorageKey(activeProfile?.id, language.code);
  const units = getPath(language.code);

  const [store, setStore] = useState<PathStore>(EMPTY);
  const [loading, setLoading] = useState(true);
  const busy = useRef(false);

  const reload = useCallback(async () => {
    if (busy.current) return;
    busy.current = true;
    try {
      const s = await readStore(key);

      // 1. Étape ouverte puis quittée : lecture et mots comptent comme visités.
      if (s.pending) {
        const unit = units.find(u => u.id === s.pending!.unitId);
        const step = unit?.steps[s.pending.stepIdx];
        if (unit && step && (step.kind === 'read' || step.kind === 'vocab')) {
          const done = new Set(s.steps[unit.id] ?? []);
          done.add(s.pending.stepIdx);
          s.steps[unit.id] = [...done].sort((a, b) => a - b);
        }
        s.pending = null;
      }

      // 2. Récompense unique pour chaque unité terminée.
      const fresh = units.filter(u => isUnitDone(u, s) && !s.rewarded.includes(u.id));
      if (fresh.length > 0) {
        s.rewarded = [...s.rewarded, ...fresh.map(u => u.id)];
        await addXP(fresh.length * UNIT_XP);
        await updateProgress({
          lessons_completed: (currentProgress?.lessons_completed ?? 0) + fresh.length,
        });
      }

      await writeStore(key, s);
      setStore(s);

      // 3. Le niveau suit l'unité en cours : il pilote le contenu généré par l'IA.
      const current = units.find(u => !isUnitDone(u, s)) ?? units[units.length - 1];
      if (current && currentProgress && currentProgress.level !== current.level) {
        await updateProgress({ level: current.level });
      }
    } finally {
      busy.current = false;
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, language.code]);

  useEffect(() => { setLoading(true); reload(); }, [reload]);

  const currentIndex = units.findIndex(u => !isUnitDone(u, store));
  const finished = units.length > 0 && currentIndex === -1;
  const currentUnit: PathUnit | null =
    units.length === 0 ? null : finished ? units[units.length - 1] : units[currentIndex];
  const completedCount = units.filter(u => isUnitDone(u, store)).length;

  const isStepDone = (unitId: string, idx: number) => (store.steps[unitId] ?? []).includes(idx);
  const unitDone = (unit: PathUnit) => isUnitDone(unit, store);
  const nextStepIndex = (unit: PathUnit): number => {
    const idx = unit.steps.findIndex((_, i) => !isStepDone(unit.id, i));
    return idx === -1 ? 0 : idx;
  };

  /** Mémorise l'étape lancée, puis ouvre l'écran correspondant. */
  const launch = async (navigation: any, unit: PathUnit, idx: number) => {
    const step: PathStep = unit.steps[idx];
    // Relit le stockage : un quiz ou un dialogue a pu valider une étape entre-temps.
    const fresh = await readStore(key);
    const next: PathStore = { ...fresh, pending: { unitId: unit.id, stepIdx: idx } };
    setStore(next);
    await writeStore(key, next);
    const pathStep = { unitId: unit.id, stepIdx: idx };
    const launchId = Date.now();

    switch (step.kind) {
      case 'lesson':
        navigation.navigate('Lesson', { launchId, lessonId: step.lessonId, part: step.part, pathStep });
        break;
      case 'read':
        navigation.navigate('Alphabet', { letters: step.letters, title: unit.title });
        break;
      case 'readquiz':
        navigation.navigate('Quiz', { launchId, letters: step.letters, pathStep });
        break;
      case 'quiz':
        navigation.navigate('Quiz', { launchId, categoryId: step.categoryId, pathStep });
        break;
      case 'vocab':
        navigation.navigate('MainTabs', {
          screen: 'Vocabulary', params: { launchId, categoryId: step.categoryId },
        });
        break;
      case 'speak':
        navigation.navigate('MainTabs', {
          screen: 'Conversation',
          params: { launchId, categoryId: step.categoryId, task: step.task, pathStep },
        });
        break;
    }
  };

  const level: PathLevel = currentUnit?.level ?? 'beginner';

  return {
    units, loading, reload, key,
    currentUnit, currentIndex: finished ? units.length - 1 : currentIndex,
    finished, completedCount, level,
    isStepDone, unitDone, nextStepIndex, launch,
  };
}
