import { useState, useEffect, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// ─── Constants ───────────────────────────────────────────────────────────────

export const MAX_AI_CREDITS = 150;
const PROFILES_KEY = '@mlapp_profiles_v1';
const ACTIVE_PROFILE_KEY = '@mlapp_active_profile';

// ─── Types ───────────────────────────────────────────────────────────────────

export interface LanguageProgress {
  languageCode: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  xp_points: number;
  streak_days: number;
  last_practice_date: string;
  lessons_completed: number;
  conversations_count: number;
  writing_exercises_count: number;
  vocab_learned: number;
  ai_credits_used: number;
  quizzes_completed: number;
  quiz_best_score: number;
}

export interface UserProfile {
  id: string;
  name: string;
  avatar: string;           // emoji avatar
  created_at: string;
  activeLanguageCode: string;
  languages: LanguageProgress[];
}

// ─── Defaults ────────────────────────────────────────────────────────────────

export function defaultLanguageProgress(languageCode: string): LanguageProgress {
  return {
    languageCode,
    level: 'beginner',
    xp_points: 0,
    streak_days: 0,
    last_practice_date: new Date().toISOString().split('T')[0],
    lessons_completed: 0,
    conversations_count: 0,
    writing_exercises_count: 0,
    vocab_learned: 0,
    ai_credits_used: 0,
    quizzes_completed: 0,
    quiz_best_score: 0,
  };
}

const AVATARS = ['🦁', '🐬', '🦊', '🐧', '🦋', '🐙', '🦚', '🐨', '🦄', '🐺',
                 '🦝', '🦜', '🐸', '🦁', '🐯', '🦅', '🐳', '🦋', '🌟', '🔥'];

export function randomAvatar(): string {
  return AVATARS[Math.floor(Math.random() * AVATARS.length)];
}

// ─── Hook ────────────────────────────────────────────────────────────────────

export function useProfiles() {
  const [profiles, setProfiles] = useState<UserProfile[]>([]);
  const [activeProfileId, setActiveProfileId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Latest profiles, readable synchronously. Without this, two awaited updates
  // in the same handler (e.g. addXP puis updateProgress) rebuild the profiles
  // from the stale closure state and the second write erases the first.
  const profilesRef = useRef<UserProfile[]>([]);
  profilesRef.current = profiles;

  // ── Derived: active profile ──────────────────────────────────────────
  const activeProfile = profiles.find(p => p.id === activeProfileId) ?? null;

  const getActiveProfile = (): UserProfile | null =>
    profilesRef.current.find(p => p.id === activeProfileId) ?? null;

  const getCurrentProgress = (): LanguageProgress | null => {
    const p = getActiveProfile();
    if (!p) return null;
    return p.languages.find(l => l.languageCode === p.activeLanguageCode)
      ?? defaultLanguageProgress(p.activeLanguageCode);
  };

  // ── Derived: current language progress ──────────────────────────────
  const currentProgress: LanguageProgress | null = activeProfile
    ? (activeProfile.languages.find(l => l.languageCode === activeProfile.activeLanguageCode)
      ?? defaultLanguageProgress(activeProfile.activeLanguageCode))
    : null;

  // ── Load ─────────────────────────────────────────────────────────────
  const load = async () => {
    setLoading(true);
    try {
      const [rawProfiles, rawActive] = await Promise.all([
        AsyncStorage.getItem(PROFILES_KEY),
        AsyncStorage.getItem(ACTIVE_PROFILE_KEY),
      ]);
      const parsed: UserProfile[] = rawProfiles ? JSON.parse(rawProfiles) : [];
      setProfiles(parsed);
      setActiveProfileId(rawActive ?? (parsed[0]?.id ?? null));
    } catch (err) {
      console.error('useProfiles load error:', err);
    } finally {
      setLoading(false);
    }
  };

  const saveProfiles = async (updated: UserProfile[]) => {
    profilesRef.current = updated;
    await AsyncStorage.setItem(PROFILES_KEY, JSON.stringify(updated));
    setProfiles(updated);
  };

  const saveActiveId = async (id: string) => {
    await AsyncStorage.setItem(ACTIVE_PROFILE_KEY, id);
    setActiveProfileId(id);
  };

  // ── Create profile ────────────────────────────────────────────────────
  const createProfile = async (name: string, languageCode: string, avatar?: string): Promise<UserProfile> => {
    const profile: UserProfile = {
      id: `profile_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
      name: name.trim(),
      avatar: avatar ?? randomAvatar(),
      created_at: new Date().toISOString(),
      activeLanguageCode: languageCode,
      languages: [defaultLanguageProgress(languageCode)],
    };
    const updated = [...profilesRef.current, profile];
    await saveProfiles(updated);
    await saveActiveId(profile.id);
    return profile;
  };

  // ── Switch active profile ─────────────────────────────────────────────
  const switchProfile = async (profileId: string) => {
    await saveActiveId(profileId);
  };

  // ── Delete profile ────────────────────────────────────────────────────
  const deleteProfile = async (profileId: string) => {
    const updated = profilesRef.current.filter(p => p.id !== profileId);
    await saveProfiles(updated);
    if (activeProfileId === profileId) {
      const newActive = updated[0]?.id ?? null;
      if (newActive) await saveActiveId(newActive);
      else setActiveProfileId(null);
    }
  };

  // ── Update profile name / avatar ──────────────────────────────────────
  const updateProfile = async (profileId: string, changes: Partial<Pick<UserProfile, 'name' | 'avatar'>>) => {
    const updated = profilesRef.current.map(p => p.id === profileId ? { ...p, ...changes } : p);
    await saveProfiles(updated);
  };

  // ── Switch language within active profile ─────────────────────────────
  const switchLanguage = async (languageCode: string) => {
    const active = getActiveProfile();
    if (!active) return;
    // Ensure progress entry exists for that language
    const hasLang = active.languages.some(l => l.languageCode === languageCode);
    const updatedLanguages = hasLang
      ? active.languages
      : [...active.languages, defaultLanguageProgress(languageCode)];

    const updated = profilesRef.current.map(p =>
      p.id === active.id
        ? { ...p, activeLanguageCode: languageCode, languages: updatedLanguages }
        : p,
    );
    await saveProfiles(updated);
  };

  // ── Update language progress ──────────────────────────────────────────
  const updateProgress = async (changes: Partial<LanguageProgress>) => {
    const active = getActiveProfile();
    if (!active) return;
    const langCode = active.activeLanguageCode;

    const updatedLanguages = active.languages.map(l =>
      l.languageCode === langCode ? { ...l, ...changes } : l,
    );
    // If language didn't exist yet, add it
    if (!active.languages.find(l => l.languageCode === langCode)) {
      updatedLanguages.push({ ...defaultLanguageProgress(langCode), ...changes });
    }

    const updated = profilesRef.current.map(p =>
      p.id === active.id ? { ...p, languages: updatedLanguages } : p,
    );
    await saveProfiles(updated);
  };

  // ── Add XP (auto-levels) ──────────────────────────────────────────────
  const addXP = async (xp: number) => {
    const progress = getCurrentProgress();
    if (!progress) return;
    const newXP = progress.xp_points + xp;
    let newLevel: LanguageProgress['level'] = 'beginner';
    if (newXP >= 1000) newLevel = 'advanced';
    else if (newXP >= 300) newLevel = 'intermediate';
    await updateProgress({ xp_points: newXP, level: newLevel });
  };

  // ── AI credits (per language) ─────────────────────────────────────────
  const incrementCredits = async (): Promise<boolean> => {
    const progress = getCurrentProgress();
    if (!progress) return false;
    if (progress.ai_credits_used >= MAX_AI_CREDITS) return false;
    await updateProgress({ ai_credits_used: progress.ai_credits_used + 1 });
    return true;
  };

  const canUseAI = (): boolean => {
    if (!currentProgress) return false;
    return currentProgress.ai_credits_used < MAX_AI_CREDITS;
  };

  const creditsRemaining = (): number => {
    if (!currentProgress) return 0;
    return MAX_AI_CREDITS - (currentProgress.ai_credits_used ?? 0);
  };

  // ── Streak update ─────────────────────────────────────────────────────
  const updateStreak = async () => {
    const progress = getCurrentProgress();
    if (!progress) return;
    const today = new Date().toISOString().split('T')[0];
    if (progress.last_practice_date === today) return;

    const last = new Date(progress.last_practice_date);
    const now = new Date(today);
    const diffDays = Math.round((now.getTime() - last.getTime()) / 86400000);

    const newStreak = diffDays === 1
      ? progress.streak_days + 1
      : 1;

    await updateProgress({ streak_days: newStreak, last_practice_date: today });
  };

  useEffect(() => { load(); }, []);

  return {
    profiles,
    activeProfile,
    activeProfileId,
    currentProgress,
    loading,
    // profile management
    createProfile,
    switchProfile,
    deleteProfile,
    updateProfile,
    // language management
    switchLanguage,
    // progress
    updateProgress,
    addXP,
    incrementCredits,
    canUseAI,
    creditsRemaining,
    updateStreak,
    reload: load,
  };
}