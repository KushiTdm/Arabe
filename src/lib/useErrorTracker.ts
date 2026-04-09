import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ERRORS_KEY = '@maa_error_tracker';

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
}

export interface ErrorSummary {
  total_errors: number;
  most_common_type: string;
  weak_categories: string[];
  recent_errors: LearningError[];
  improvement_areas: string[];
}

export function useErrorTracker() {
  const [errors, setErrors] = useState<LearningError[]>([]);
  const [loading, setLoading] = useState(true);

  const loadErrors = async () => {
    try {
      const stored = await AsyncStorage.getItem(ERRORS_KEY);
      if (stored) setErrors(JSON.parse(stored));
    } catch (err) {
      console.error('Erreur chargement erreurs:', err);
    } finally {
      setLoading(false);
    }
  };

  const saveErrors = async (updated: LearningError[]) => {
    try {
      await AsyncStorage.setItem(ERRORS_KEY, JSON.stringify(updated));
      setErrors(updated);
    } catch (err) {
      console.error('Erreur sauvegarde erreurs:', err);
    }
  };

  const addError = async (error: Omit<LearningError, 'id' | 'count' | 'last_seen' | 'resolved'>) => {
    const existing = errors.find(
      e => e.type === error.type && e.correct_form === error.correct_form && !e.resolved
    );

    let updated: LearningError[];
    if (existing) {
      updated = errors.map(e =>
        e.id === existing.id
          ? { ...e, count: e.count + 1, last_seen: new Date().toISOString(), user_attempt: error.user_attempt }
          : e
      );
    } else {
      const newError: LearningError = {
        ...error,
        id: Date.now().toString(),
        count: 1,
        last_seen: new Date().toISOString(),
        resolved: false,
      };
      updated = [...errors, newError];
    }

    await saveErrors(updated);
    return updated;
  };

  const resolveError = async (errorId: string) => {
    const updated = errors.map(e =>
      e.id === errorId ? { ...e, resolved: true } : e
    );
    await saveErrors(updated);
  };

  const getErrorSummary = (): ErrorSummary => {
    const unresolved = errors.filter(e => !e.resolved);
    const typeCounts: Record<string, number> = {};
    const categoryCounts: Record<string, number> = {};

    unresolved.forEach(e => {
      typeCounts[e.type] = (typeCounts[e.type] || 0) + e.count;
      categoryCounts[e.category] = (categoryCounts[e.category] || 0) + e.count;
    });

    const mostCommonType = Object.entries(typeCounts)
      .sort(([, a], [, b]) => b - a)[0]?.[0] || 'aucune';

    const weakCategories = Object.entries(categoryCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([cat]) => cat);

    const recent = [...unresolved]
      .sort((a, b) => new Date(b.last_seen).getTime() - new Date(a.last_seen).getTime())
      .slice(0, 10);

    const improvements: string[] = [];
    if (typeCounts['pronunciation'] > 3) improvements.push('prononciation');
    if (typeCounts['grammar'] > 3) improvements.push('grammaire');
    if (typeCounts['vocabulary'] > 3) improvements.push('vocabulaire');
    if (typeCounts['writing'] > 3) improvements.push('écriture');

    return {
      total_errors: unresolved.length,
      most_common_type: mostCommonType,
      weak_categories: weakCategories,
      recent_errors: recent,
      improvement_areas: improvements,
    };
  };

  const getErrorsForAIPrompt = (): string => {
    const summary = getErrorSummary();
    if (summary.total_errors === 0) return "L'élève Fatima n'a pas encore d'erreurs enregistrées.";

    const recentDesc = summary.recent_errors
      .slice(0, 5)
      .map(e => `- ${e.type}: a dit "${e.user_attempt}" au lieu de "${e.correct_form}" (${e.count}x)`)
      .join('\n');

    return `Profil d'erreurs de Fatima:
- Erreurs totales non résolues: ${summary.total_errors}
- Type d'erreur principal: ${summary.most_common_type}
- Catégories faibles: ${summary.weak_categories.join(', ') || 'aucune'}
- Axes d'amélioration: ${summary.improvement_areas.join(', ') || 'aucun'}
Erreurs récentes:
${recentDesc}`;
  };

  const clearErrors = async () => {
    await AsyncStorage.removeItem(ERRORS_KEY);
    setErrors([]);
  };

  useEffect(() => {
    loadErrors();
  }, []);

  return {
    errors,
    loading,
    addError,
    resolveError,
    getErrorSummary,
    getErrorsForAIPrompt,
    clearErrors,
  };
}
