import { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';

export const MAX_AI_CREDITS = 150;

export function useUserProgress() {
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadProgress = async () => {
    setLoading(true);
    setError(null);
    try {
      const records = await base44.entities.UserProgress.list();
      if (records.length > 0) {
        setProgress(records[0]);
      } else {
        const newProgress = await base44.entities.UserProgress.create({
          level: 'beginner',
          xp_points: 0,
          streak_days: 0,
          lessons_completed: 0,
          conversations_count: 0,
          writing_exercises_count: 0,
          vocab_learned: 0,
          ai_credits_used: 0,
          last_practice_date: new Date().toISOString().split('T')[0],
        });
        setProgress(newProgress);
      }
    } catch (err) {
      console.error('Erreur chargement progression:', err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const updateProgress = async (updates) => {
    if (!progress) return;
    try {
      const updated = await base44.entities.UserProgress.update(progress.id, updates);
      setProgress(updated);
      return updated;
    } catch (err) {
      console.error('Erreur mise à jour progression:', err);
    }
  };

  const addXP = async (xp) => {
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