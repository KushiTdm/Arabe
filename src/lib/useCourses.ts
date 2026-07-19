import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DEFAULT_COURSES_KEY = '@maa_courses_v1';

// Plafond de sécurité (évite une croissance illimitée d'AsyncStorage) plutôt
// qu'une vraie limite fonctionnelle — largement au-delà d'un usage normal.
export const MAX_COURSES = 500;

export type CourseSource = 'error' | 'conversation' | 'manual';
export type CourseType = 'grammar' | 'pronunciation' | 'vocabulary' | 'writing' | 'culture';

export interface CourseLesson {
  id: string;
  title: string;
  type: CourseType;
  source: CourseSource;
  trigger_topic: string;    // Ce qui a déclenché la création du cours
  summary: string;          // Résumé en 1-2 phrases
  explanation: string;      // Explication détaillée
  examples: CourseExample[];
  exercises: CourseExercise[];
  tips: string[];
  arabic_words: { arabic: string; transliteration: string; meaning: string }[];
  created_at: string;
  read: boolean;
  starred: boolean;
}

export interface CourseExample {
  arabic: string;
  transliteration: string;
  french: string;
  note?: string;
}

export interface CourseExercise {
  instruction: string;
  type: 'translate' | 'fill' | 'choose' | 'pronounce';
  question: string;
  answer: string;
  options?: string[];
}

// storageKey permet de scoper les cours par profil+langue :
//   `@maa_courses_${profileId}_${languageCode}`
export function useCourses(storageKey: string = DEFAULT_COURSES_KEY) {
  const [courses, setCourses] = useState<CourseLesson[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      const raw = await AsyncStorage.getItem(storageKey);
      if (raw) setCourses(JSON.parse(raw));
      else setCourses([]);
    } catch (err) {
      console.error('Erreur chargement cours:', err);
    } finally {
      setLoading(false);
    }
  };

  const save = async (updated: CourseLesson[]) => {
    await AsyncStorage.setItem(storageKey, JSON.stringify(updated));
    setCourses(updated);
  };

  /** Ajoute un cours s'il n'existe pas déjà sur le même topic dans les 24h */
  const addCourse = async (course: Omit<CourseLesson, 'id' | 'created_at' | 'read' | 'starred'>) => {
    const current = courses;
    const recent = current.find(c => {
      const age = Date.now() - new Date(c.created_at).getTime();
      return c.trigger_topic === course.trigger_topic && age < 24 * 3600 * 1000;
    });
    if (recent) return null;

    const newCourse: CourseLesson = {
      ...course,
      id: `course_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
      created_at: new Date().toISOString(),
      read: false,
      starred: false,
    };

    const updated = [newCourse, ...current].slice(0, MAX_COURSES);
    await save(updated);
    return newCourse;
  };

  const markRead = async (courseId: string) => {
    const updated = courses.map(c => c.id === courseId ? { ...c, read: true } : c);
    await save(updated);
  };

  const toggleStar = async (courseId: string) => {
    const updated = courses.map(c => c.id === courseId ? { ...c, starred: !c.starred } : c);
    await save(updated);
  };

  const deleteCourse = async (courseId: string) => {
    const updated = courses.filter(c => c.id !== courseId);
    await save(updated);
  };

  const clearAll = async () => {
    await AsyncStorage.removeItem(storageKey);
    setCourses([]);
  };

  const unreadCount    = courses.filter(c => !c.read).length;
  const starredCourses = courses.filter(c => c.starred);
  const recentCourses  = [...courses].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
  );

  // Recharge les cours quand la clé change (changement de profil/langue)
  useEffect(() => { load(); }, [storageKey]);

  return {
    courses,
    recentCourses,
    starredCourses,
    loading,
    unreadCount,
    addCourse,
    markRead,
    toggleStar,
    deleteCourse,
    clearAll,
    reload: load,
  };
}
