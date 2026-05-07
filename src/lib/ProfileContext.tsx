import React, { createContext, useContext, ReactNode } from 'react';
import { useProfiles } from './useProfiles';
import { getLanguageByCode, SUPPORTED_LANGUAGES } from './languages';
import type { LanguageConfig } from './languages';

type ProfileContextValue = ReturnType<typeof useProfiles> & {
  language: LanguageConfig;
};

const ProfileContext = createContext<ProfileContextValue | null>(null);

export function ProfileProvider({ children }: { children: ReactNode }) {
  const value = useProfiles();
  const langCode = value.activeProfile?.activeLanguageCode ?? 'ar';
  const language = getLanguageByCode(langCode) ?? SUPPORTED_LANGUAGES[0];

  return (
    <ProfileContext.Provider value={{ ...value, language }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile(): ProfileContextValue {
  const ctx = useContext(ProfileContext);
  if (!ctx) throw new Error('useProfile must be used inside ProfileProvider');
  return ctx;
}
