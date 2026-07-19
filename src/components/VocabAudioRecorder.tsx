import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import { colors, borderRadius, fontSize } from '../theme';
import type { VocabAudioEntry } from '../lib/useVocabAudio';

interface Props {
  wordId: string;
  audio?: VocabAudioEntry;
  onSave: (wordId: string, tempUri: string, duration: number) => Promise<void>;
  onDelete: (wordId: string) => Promise<void>;
}

/**
 * Micro compact attaché à un mot : enregistrer sa propre prononciation,
 * la réécouter, la remplacer ou la supprimer. Fichiers 100 % locaux.
 */
export function VocabAudioRecorder({ wordId, audio, onSave, onDelete }: Props) {
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const recordingRef = useRef<Audio.Recording | null>(null);
  const soundRef = useRef<Audio.Sound | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => () => {
    // Cleanup à la fermeture : stopper timer, micro et lecture
    if (timerRef.current) clearInterval(timerRef.current);
    recordingRef.current?.stopAndUnloadAsync().catch(() => {});
    soundRef.current?.unloadAsync().catch(() => {});
  }, []);

  if (Platform.OS === 'web') return null;

  const startRecording = async () => {
    try {
      const perm = await Audio.requestPermissionsAsync();
      if (!perm.granted) {
        Alert.alert('Permission', "Autorise l'accès au micro pour enregistrer ta prononciation !");
        return;
      }
      await Audio.setAudioModeAsync({ allowsRecordingIOS: true, playsInSilentModeIOS: true });
      const { recording } = await Audio.Recording.createAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
      recordingRef.current = recording;
      setIsRecording(true);
      setDuration(0);
      timerRef.current = setInterval(() => setDuration(d => d + 1), 1000);
    } catch {
      Alert.alert('Erreur', "Impossible de démarrer l'enregistrement.");
    }
  };

  const stopRecording = async () => {
    if (!recordingRef.current) return;
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
    setIsRecording(false);
    try {
      await recordingRef.current.stopAndUnloadAsync();
      const uri = recordingRef.current.getURI();
      recordingRef.current = null;
      await Audio.setAudioModeAsync({ allowsRecordingIOS: false, playsInSilentModeIOS: true });
      if (uri) await onSave(wordId, uri, duration);
    } catch (err: any) {
      recordingRef.current = null;
      Alert.alert('Erreur', err?.message || "Impossible de sauvegarder l'enregistrement.");
    }
  };

  const play = async () => {
    if (!audio || isPlaying) return;
    try {
      setIsPlaying(true);
      const { sound } = await Audio.Sound.createAsync({ uri: audio.uri }, { shouldPlay: true });
      soundRef.current = sound;
      sound.setOnPlaybackStatusUpdate(status => {
        if (status.isLoaded && status.didJustFinish) {
          sound.unloadAsync().catch(() => {});
          soundRef.current = null;
          setIsPlaying(false);
        }
      });
    } catch {
      setIsPlaying(false);
      Alert.alert('Erreur', 'Impossible de lire cet enregistrement.');
    }
  };

  const confirmDelete = () => {
    Alert.alert('Supprimer', 'Supprimer ton enregistrement pour ce mot ?', [
      { text: 'Annuler', style: 'cancel' },
      { text: 'Supprimer', style: 'destructive', onPress: () => onDelete(wordId) },
    ]);
  };

  if (isRecording) {
    return (
      <View style={styles.row}>
        <View style={styles.recDot} />
        <Text style={styles.recTime}>{duration}s</Text>
        <TouchableOpacity style={styles.stopBtn} onPress={stopRecording}>
          <Ionicons name="stop" size={16} color={colors.white} />
          <Text style={styles.stopBtnText}>Sauvegarder</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.row}>
      {audio ? (
        <>
          <TouchableOpacity style={styles.playBtn} onPress={play} disabled={isPlaying}>
            <Ionicons name={isPlaying ? 'volume-high' : 'play'} size={15} color={colors.primary} />
            <Text style={styles.playBtnText}>Ma voix · {audio.duration}s</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn} onPress={startRecording}>
            <Ionicons name="mic" size={16} color={colors.secondary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn} onPress={confirmDelete}>
            <Ionicons name="trash-outline" size={15} color={colors.textMuted} />
          </TouchableOpacity>
        </>
      ) : (
        <TouchableOpacity style={styles.recordBtn} onPress={startRecording}>
          <Ionicons name="mic" size={15} color={colors.secondary} />
          <Text style={styles.recordBtnText}>Enregistrer ma prononciation</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 12 },
  recDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: colors.destructive },
  recTime: { fontSize: fontSize.sm, fontWeight: '700', color: colors.destructive, minWidth: 28 },
  stopBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: colors.destructive,
    paddingHorizontal: 14, paddingVertical: 8,
    borderRadius: borderRadius.full,
  },
  stopBtnText: { color: colors.white, fontSize: fontSize.xs, fontWeight: '700' },
  recordBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: `${colors.secondary}14`,
    borderWidth: 1, borderColor: `${colors.secondary}40`,
    paddingHorizontal: 12, paddingVertical: 7,
    borderRadius: borderRadius.full,
  },
  recordBtnText: { color: colors.secondary, fontSize: fontSize.xs, fontWeight: '700' },
  playBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: `${colors.primary}10`,
    paddingHorizontal: 12, paddingVertical: 7,
    borderRadius: borderRadius.full,
  },
  playBtnText: { color: colors.primary, fontSize: fontSize.xs, fontWeight: '700' },
  iconBtn: {
    width: 30, height: 30, borderRadius: 15,
    backgroundColor: `${colors.textMuted}12`,
    justifyContent: 'center', alignItems: 'center',
  },
});
