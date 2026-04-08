import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const MAX_AI_CREDITS = 150;
const PROGRESS_KEY = '@maa_user_progress';

export interface UserProgress {
  id: string;
  level: string;
  xp_points: number;
  streak_days: number;
  lessons_completed: number;
  conversations_count: number;
  writing_exercises_count: number;
  vocab_learned: number;
  ai_credits_used: number;
  last_practice_date: string;
}

const defaultProgress: UserProgress = {
  id: 'local',
  level: 'beginner',
  xp_points: 0,
  streak_days: 0,
  lessons_completed: 0,
  conversations_count: 0,
  writing_exercises_count: 0,
  vocab_learned: 0,
  ai_credits_used: 0,
  last_practice_date: new Date().toISOString().split('T')[0],
};

export function useUserProgress() {
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  const loadProgress = async () => {
    setLoading(true);
    setError(null);
    try {
      const stored = await AsyncStorage.getItem(PROGRESS_KEY);
      if (stored) {
        setProgress(JSON.parse(stored));
      } else {
        await AsyncStorage.setItem(PROGRESS_KEY, JSON.stringify(defaultProgress));
        setProgress({ ...defaultProgress });
      }
    } catch (err) {
      console.error('Erreur chargement progression:', err);
      setError(err);
      setProgress({ ...defaultProgress });
    } finally {
      setLoading(false);
    }
  };

  const updateProgress = async (updates: Partial<UserProgress>) => {
    if (!progress) return;
    try {
      const updated = { ...progress, ...updates };
      await AsyncStorage.setItem(PROGRESS_KEY, JSON.stringify(updated));
      setProgress(updated);
      return updated;
    } catch (err) {
      console.error('Erreur mise à jour progression:', err);
    }
  };

  const addXP = async (xp: number) => {
    if (!progress) return;
    const newXP = (progress.xp_points || 0) + xp;
    let newLevel = progress.level;
    if (newXP >= 1000) newLevel = 'advanced';
    else if (newXP >= 300) newLevel = 'intermediate';
    return updateProgress({ xp_points: newXP, level: newLevel });
  };

  const incrementCredits = async () => {
    if (!progress) return false;
    const current = progress.ai_credits_used || 0;
    if (current >= MAX_AI_CREDITS) return false;
    try {
      await updateProgress({ ai_credits_used: current + 1 });
      return true;
    } catch {
      return false;
    }
  };

  const canUseAI = () => {
    if (!progress) return false;
    return (progress.ai_credits_used || 0) < MAX_AI_CREDITS;
  };

  const creditsRemaining = () => {
    if (!progress) return 0;
    return MAX_AI_CREDITS - (progress.ai_credits_used || 0);
  };

  useEffect(() => {
    loadProgress();
  }, []);

  return {
    progress,
    loading,
    error,
    updateProgress,
    addXP,
    incrementCredits,
    canUseAI,
    creditsRemaining,
    reload: loadProgress,
  };
}
