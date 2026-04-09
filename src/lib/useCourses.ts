import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const COURSES_KEY = '@maa_courses_v1';

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

export function useCourses() {
  const [courses, setCourses] = useState<CourseLesson[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      const raw = await AsyncStorage.getItem(COURSES_KEY);
      if (raw) setCourses(JSON.parse(raw));
    } catch (err) {
      console.error('Erreur chargement cours:', err);
    } finally {
      setLoading(false);
    }
  };

  const save = async (updated: CourseLesson[]) => {
    await AsyncStorage.setItem(COURSES_KEY, JSON.stringify(updated));
    setCourses(updated);
  };

  /** Ajoute un cours s'il n'existe pas déjà sur le même topic */
  const addCourse = async (course: Omit<CourseLesson, 'id' | 'created_at' | 'read' | 'starred'>) => {
    const current = courses;
    // Évite les doublons sur le même sujet (dans les 24h)
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

    const updated = [newCourse, ...current].slice(0, 50); // max 50 cours
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
    await AsyncStorage.removeItem(COURSES_KEY);
    setCourses([]);
  };

  const unreadCount = courses.filter(c => !c.read).length;
  const starredCourses = courses.filter(c => c.starred);
  const recentCourses = [...courses].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  useEffect(() => { load(); }, []);

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