import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';

// ─── Enregistrements vocaux personnels attachés à un mot de vocabulaire ──────
// Les fichiers audio vivent dans documentDirectory (persistant, survit au
// nettoyage du cache OS), indexés par un JSON AsyncStorage { wordId -> entry }.

export interface VocabAudioEntry {
  uri: string;
  duration: number; // secondes
  recorded_at: string;
}

const AUDIO_DIR = `${FileSystem.documentDirectory}vocab_audio/`;

export function vocabAudioStorageKey(profileId: string | undefined, langCode: string): string {
  return `@maa_vocab_audio_${profileId ?? 'default'}_${langCode}`;
}

async function ensureDir(): Promise<void> {
  const info = await FileSystem.getInfoAsync(AUDIO_DIR);
  if (!info.exists) {
    await FileSystem.makeDirectoryAsync(AUDIO_DIR, { intermediates: true });
  }
}

function safeFileName(wordId: string): string {
  return wordId.replace(/[^a-zA-Z0-9_-]/g, '_');
}

export function useVocabAudio(storageKey: string) {
  const [entries, setEntries] = useState<Record<string, VocabAudioEntry>>({});
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const raw = await AsyncStorage.getItem(storageKey);
      setEntries(raw ? JSON.parse(raw) : {});
    } catch (err) {
      console.error('useVocabAudio load error:', err);
      setEntries({});
    } finally {
      setLoading(false);
    }
  }, [storageKey]);

  useEffect(() => { load(); }, [load]);

  const persist = async (updated: Record<string, VocabAudioEntry>) => {
    setEntries(updated);
    await AsyncStorage.setItem(storageKey, JSON.stringify(updated));
  };

  /** Copie l'enregistrement temporaire vers un stockage persistant et l'indexe. */
  const saveAudio = async (wordId: string, tempUri: string, duration: number): Promise<void> => {
    if (!FileSystem.documentDirectory) {
      throw new Error("L'enregistrement audio n'est disponible que sur téléphone.");
    }
    await ensureDir();
    const ext = tempUri.split('.').pop() || 'm4a';
    const destUri = `${AUDIO_DIR}${safeFileName(wordId)}.${ext}`;

    const previous = entries[wordId];
    if (previous) {
      await FileSystem.deleteAsync(previous.uri, { idempotent: true });
    }
    await FileSystem.copyAsync({ from: tempUri, to: destUri });

    const updated: Record<string, VocabAudioEntry> = {
      ...entries,
      [wordId]: { uri: destUri, duration, recorded_at: new Date().toISOString() },
    };
    await persist(updated);
  };

  const deleteAudio = async (wordId: string): Promise<void> => {
    const existing = entries[wordId];
    if (!existing) return;
    await FileSystem.deleteAsync(existing.uri, { idempotent: true });
    const updated = { ...entries };
    delete updated[wordId];
    await persist(updated);
  };

  const getAudio = (wordId: string): VocabAudioEntry | undefined => entries[wordId];

  return { entries, loading, saveAudio, deleteAudio, getAudio, reload: load };
}
