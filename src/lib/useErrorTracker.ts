import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ERRORS_KEY = '@maa_error_tracker_v2';
const SESSIONS_KEY = '@maa_sessions';

export interface LearningError {
  id: string;
  type: 'pronunciation' | 'grammar' | 'vocabulary' | 'writing';
  category: string;
  description: string;
  correct_form: string;
  user_attempt: string;
  count: number;
  last_seen: string;
  resolved: boolean;
  source: 'conversation' | 'writing' | 'vocabulary';
}

export interface LearningSession {
  id: string;
  date: string;
  type: 'conversation' | 'writing' | 'vocabulary' | 'exercise';
  topic: string;
  duration_minutes: number;
  score?: number;
  errors_count: number;
  xp_earned: number;
}

export interface ErrorSummary {
  total_errors: number;
  most_common_type: string;
  weak_categories: string[];
  recent_errors: LearningError[];
  improvement_areas: string[];
  resolved_count: number;
  sessions_count: number;
}

export interface AdaptiveExercise {
  type: 'writing' | 'vocabulary' | 'pronunciation' | 'grammar';
  difficulty: 'easy' | 'medium' | 'hard';
  target_errors: string[];
  description: string;
}

export function useErrorTracker() {
  const [errors, setErrors] = useState<LearningError[]>([]);
  const [sessions, setSessions] = useState<LearningSession[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      const [storedErrors, storedSessions] = await Promise.all([
        AsyncStorage.getItem(ERRORS_KEY),
        AsyncStorage.getItem(SESSIONS_KEY),
      ]);
      if (storedErrors) setErrors(JSON.parse(storedErrors));
      if (storedSessions) setSessions(JSON.parse(storedSessions));
    } catch (err) {
      console.error('Erreur chargement tracker:', err);
    } finally {
      setLoading(false);
    }
  };

  const saveErrors = async (updated: LearningError[]) => {
    await AsyncStorage.setItem(ERRORS_KEY, JSON.stringify(updated));
    setErrors(updated);
  };

  const addError = async (
    error: Omit<LearningError, 'id' | 'count' | 'last_seen' | 'resolved'>,
  ) => {
    const current = errors;
    const existing = current.find(
      e =>
        e.type === error.type &&
        e.correct_form === error.correct_form &&
        !e.resolved,
    );

    let updated: LearningError[];
    if (existing) {
      updated = current.map(e =>
        e.id === existing.id
          ? {
              ...e,
              count: e.count + 1,
              last_seen: new Date().toISOString(),
              user_attempt: error.user_attempt,
            }
          : e,
      );
    } else {
      updated = [
        ...current,
        {
          ...error,
          id: `err_${Date.now()}_${Math.random().toString(36).slice(2)}`,
          count: 1,
          last_seen: new Date().toISOString(),
          resolved: false,
        },
      ];
    }
    await saveErrors(updated);
    return updated;
  };

  const resolveError = async (errorId: string) => {
    const updated = errors.map(e =>
      e.id === errorId ? { ...e, resolved: true } : e,
    );
    await saveErrors(updated);
  };

  const addSession = async (
    session: Omit<LearningSession, 'id' | 'date'>,
  ) => {
    const newSession: LearningSession = {
      ...session,
      id: `ses_${Date.now()}`,
      date: new Date().toISOString(),
    };
    const updated = [newSession, ...sessions].slice(0, 100); // Keep last 100
    await AsyncStorage.setItem(SESSIONS_KEY, JSON.stringify(updated));
    setSessions(updated);
    return newSession;
  };

  const getErrorSummary = (): ErrorSummary => {
    const unresolved = errors.filter(e => !e.resolved);
    const typeCounts: Record<string, number> = {};
    const categoryCounts: Record<string, number> = {};

    unresolved.forEach(e => {
      typeCounts[e.type] = (typeCounts[e.type] || 0) + e.count;
      categoryCounts[e.category] =
        (categoryCounts[e.category] || 0) + e.count;
    });

    const mostCommonType =
      Object.entries(typeCounts).sort(([, a], [, b]) => b - a)[0]?.[0] ||
      'aucune';

    const weakCategories = Object.entries(categoryCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([cat]) => cat);

    const recent = [...unresolved]
      .sort(
        (a, b) =>
          new Date(b.last_seen).getTime() - new Date(a.last_seen).getTime(),
      )
      .slice(0, 10);

    const improvements: string[] = [];
    if ((typeCounts['pronunciation'] || 0) >= 2) improvements.push('prononciation');
    if ((typeCounts['grammar'] || 0) >= 2) improvements.push('grammaire');
    if ((typeCounts['vocabulary'] || 0) >= 2) improvements.push('vocabulaire');
    if ((typeCounts['writing'] || 0) >= 2) improvements.push('écriture');

    return {
      total_errors: unresolved.length,
      most_common_type: mostCommonType,
      weak_categories: weakCategories,
      recent_errors: recent,
      improvement_areas: improvements,
      resolved_count: errors.filter(e => e.resolved).length,
      sessions_count: sessions.length,
    };
  };

  /** Returns a structured string for AI prompts */
  const getErrorsForAIPrompt = (): string => {
    const summary = getErrorSummary();
    if (summary.total_errors === 0 && summary.sessions_count === 0) {
      return "Fatima commence tout juste son apprentissage. Propose des exercices adaptés aux débutants.";
    }

    const recentSessions = sessions.slice(0, 5);
    const sessionDesc = recentSessions
      .map(
        s =>
          `- ${s.type} sur "${s.topic}": ${s.errors_count} erreurs, ${s.xp_earned} XP gagnés`,
      )
      .join('\n');

    const recentDesc = summary.recent_errors
      .slice(0, 5)
      .map(
        e =>
          `- ${e.type} (${e.source}): a écrit/dit "${e.user_attempt}" au lieu de "${e.correct_form}" (${e.count}x dans catégorie "${e.category}")`,
      )
      .join('\n');

    return `=== Profil d'apprentissage de Fatima ===
Erreurs non résolues: ${summary.total_errors}
Type d'erreur dominant: ${summary.most_common_type}
Catégories faibles: ${summary.weak_categories.join(', ') || 'aucune identifiée'}
Axes d'amélioration: ${summary.improvement_areas.join(', ') || 'aucun identifié'}
Sessions complétées: ${summary.sessions_count}

Erreurs récentes:
${recentDesc || '(aucune erreur récente)'}

Sessions récentes:
${sessionDesc || '(aucune session récente)'}
===========================================`;
  };

  /** Suggests the next adaptive exercise based on errors */
  const getAdaptiveExerciseSuggestion = (): AdaptiveExercise | null => {
    const summary = getErrorSummary();
    if (summary.total_errors === 0) return null;

    const dominant = summary.most_common_type as LearningError['type'];
    const targetErrors = summary.recent_errors
      .slice(0, 3)
      .map(e => e.correct_form);

    let difficulty: 'easy' | 'medium' | 'hard' = 'easy';
    const totalCount = summary.recent_errors.reduce(
      (acc, e) => acc + e.count,
      0,
    );
    if (totalCount > 10) difficulty = 'hard';
    else if (totalCount > 4) difficulty = 'medium';

    const descriptions: Record<string, string> = {
      writing: `Pratique l'écriture des lettres/mots que tu as manqués : ${targetErrors.join(', ')}`,
      pronunciation: `Exercice de prononciation sur les mots difficiles : ${targetErrors.join(', ')}`,
      vocabulary: `Révise le vocabulaire raté : ${targetErrors.join(', ')}`,
      grammar: `Exercice de grammaire ciblé sur tes erreurs répétées`,
    };

    return {
      type: dominant || 'vocabulary',
      difficulty,
      target_errors: targetErrors,
      description: descriptions[dominant] || descriptions['vocabulary'],
    };
  };

  const clearErrors = async () => {
    await Promise.all([
      AsyncStorage.removeItem(ERRORS_KEY),
      AsyncStorage.removeItem(SESSIONS_KEY),
    ]);
    setErrors([]);
    setSessions([]);
  };

  useEffect(() => {
    load();
  }, []);

  return {
    errors,
    sessions,
    loading,
    addError,
    resolveError,
    addSession,
    getErrorSummary,
    getErrorsForAIPrompt,
    getAdaptiveExerciseSuggestion,
    clearErrors,
    reload: load,
  };
}