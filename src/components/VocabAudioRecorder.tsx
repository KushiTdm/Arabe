import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Platform, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import { colors, borderRadius, fontSize } from '../theme';
import type { VocabAudioEntry } from '../lib/useVocabAudio';
import { useProfile } from '../lib/ProfileContext';
import {
  VOICE_RECORDING_OPTIONS, checkDuration, rejectionMessage,
  mimeTypeForUri, MAX_WORD_RECORDING_SECONDS,
} from '../lib/audioCapture';
import {
  evaluatePronunciation, verdictLabel, type PronunciationResult,
} from '../lib/pronunciation';

/** Le mot que l'élève doit prononcer. Sans lui, pas d'évaluation possible. */
export interface PronunciationTarget {
  native: string;
  transliteration?: string;
  meaning?: string;
}

interface Props {
  wordId: string;
  audio?: VocabAudioEntry;
  onSave: (wordId: string, tempUri: string, duration: number) => Promise<void>;
  onDelete: (wordId: string) => Promise<void>;
  /** Fourni → débloque le bouton « Évaluer ma prononciation ». */
  target?: PronunciationTarget;
  onScored?: (wordId: string, score: number) => void;
}

function scoreColor(score: number): string {
  if (score >= 90) return colors.success;
  if (score >= 75) return colors.accent;
  if (score >= 60) return colors.secondary;
  return colors.destructive;
}

/**
 * Micro attaché à un mot : enregistrer sa prononciation, la réécouter, et —
 * si la cible est connue — la faire évaluer par l'IA.
 *
 * Deux niveaux volontairement séparés :
 *   • enregistrer + réécouter : gratuit, hors ligne, répétable à l'infini ;
 *   • évaluer : 1 crédit IA, sur demande explicite.
 * L'entraînement à la prononciation demande beaucoup de répétitions ; les
 * facturer toutes rendrait l'exercice impraticable avec 150 crédits.
 */
export function VocabAudioRecorder({ wordId, audio, onSave, onDelete, target, onScored }: Props) {
  const { language, canUseAI, incrementCredits } = useProfile();
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [result, setResult] = useState<PronunciationResult | null>(null);
  const [evalError, setEvalError] = useState<string | null>(null);

  const recordingRef = useRef<Audio.Recording | null>(null);
  const soundRef = useRef<Audio.Sound | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => () => {
    if (timerRef.current) clearInterval(timerRef.current);
    recordingRef.current?.stopAndUnloadAsync().catch(() => {});
    soundRef.current?.unloadAsync().catch(() => {});
  }, []);

  // Un nouveau mot = un nouveau diagnostic.
  useEffect(() => { setResult(null); setEvalError(null); }, [wordId]);

  // Un mot isolé ne demande jamais plus : coupe au lieu de laisser filer un
  // fichier qu'on n'exploitera pas (et qui grossirait la requête d'évaluation).
  // Passe par un ref : stopRecording est défini plus bas, et l'effet doit
  // rester au-dessus du retour anticipé « web » pour ne pas rendre
  // conditionnel l'ordre des hooks.
  const stopRef = useRef<() => void>(() => {});
  useEffect(() => {
    if (isRecording && duration >= MAX_WORD_RECORDING_SECONDS) stopRef.current();
  }, [isRecording, duration]);

  // Tous les hooks sont déclarés : le retour anticipé peut intervenir ici.
  if (Platform.OS === 'web') return null;

  const startRecording = async () => {
    try {
      const perm = await Audio.requestPermissionsAsync();
      if (!perm.granted) {
        Alert.alert('Permission', "Autorise l'accès au micro pour enregistrer ta prononciation !");
        return;
      }
      setResult(null);
      setEvalError(null);
      await Audio.setAudioModeAsync({ allowsRecordingIOS: true, playsInSilentModeIOS: true });
      const { recording } = await Audio.Recording.createAsync(VOICE_RECORDING_OPTIONS);
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
    const seconds = duration;
    try {
      await recordingRef.current.stopAndUnloadAsync();
      const uri = recordingRef.current.getURI();
      recordingRef.current = null;
      await Audio.setAudioModeAsync({ allowsRecordingIOS: false, playsInSilentModeIOS: true });

      const rejection = checkDuration(seconds, MAX_WORD_RECORDING_SECONDS);
      if (rejection) { setEvalError(rejectionMessage(rejection)); return; }
      if (uri) await onSave(wordId, uri, seconds);
    } catch (err: any) {
      recordingRef.current = null;
      Alert.alert('Erreur', err?.message || "Impossible de sauvegarder l'enregistrement.");
    }
  };

  stopRef.current = stopRecording;

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

  const evaluate = async () => {
    if (!audio || !target || isEvaluating) return;
    if (!canUseAI()) { setEvalError("Plus de crédits IA pour cette langue."); return; }
    setIsEvaluating(true);
    setEvalError(null);
    try {
      const ok = await incrementCredits();
      if (!ok) { setEvalError("Plus de crédits IA pour cette langue."); return; }
      const base64 = await FileSystem.readAsStringAsync(audio.uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      const res = await evaluatePronunciation({
        language,
        target: target.native,
        transliteration: target.transliteration,
        meaning: target.meaning,
        audioBase64: base64,
        mimeType: mimeTypeForUri(audio.uri),
      });
      setResult(res);
      onScored?.(wordId, res.score);
    } catch (err: any) {
      setEvalError(err?.message || "Évaluation impossible.");
    } finally {
      setIsEvaluating(false);
    }
  };

  // ── Enregistrement en cours ────────────────────────────────────────────
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
    <View>
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
            <TouchableOpacity
              style={styles.iconBtn}
              onPress={() => Alert.alert('Supprimer', 'Supprimer ton enregistrement pour ce mot ?', [
                { text: 'Annuler', style: 'cancel' },
                { text: 'Supprimer', style: 'destructive', onPress: () => onDelete(wordId) },
              ])}
            >
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

      {/* Évaluation : uniquement quand la cible est connue */}
      {!!audio && !!target && !result && (
        <TouchableOpacity style={styles.evalBtn} onPress={evaluate} disabled={isEvaluating}>
          {isEvaluating
            ? <ActivityIndicator size="small" color={colors.primary} />
            : <Ionicons name="sparkles" size={15} color={colors.primary} />}
          <Text style={styles.evalBtnText}>
            {isEvaluating ? 'Analyse en cours…' : 'Évaluer ma prononciation'}
          </Text>
        </TouchableOpacity>
      )}

      {!!evalError && <Text style={styles.errorText}>{evalError}</Text>}

      {!!result && (
        <View style={styles.resultCard}>
          <View style={styles.resultHeader}>
            <View style={[styles.scoreBadge, { backgroundColor: `${scoreColor(result.score)}1a` }]}>
              <Text style={[styles.scoreValue, { color: scoreColor(result.score) }]}>
                {result.score}
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[styles.verdict, { color: scoreColor(result.score) }]}>
                {verdictLabel(result.verdict)}
              </Text>
              {!!result.heard && (
                <Text style={styles.heard} numberOfLines={2}>Entendu : « {result.heard} »</Text>
              )}
            </View>
            <TouchableOpacity style={styles.retryBtn} onPress={startRecording}>
              <Ionicons name="refresh" size={15} color={colors.primary} />
            </TouchableOpacity>
          </View>

          {!result.matches_target && (
            <Text style={styles.mismatch}>
              Ce n'est pas le mot attendu — vise « {target?.native} ».
            </Text>
          )}

          {result.issues.map((issue, i) => (
            <View key={i} style={styles.issue}>
              <Text style={styles.issueSegment}>{issue.segment}</Text>
              <Text style={styles.issueBody}>
                {!!issue.heard && !!issue.expected && (
                  <Text style={styles.issueDiff}>{issue.heard} → {issue.expected}. </Text>
                )}
                {issue.fix}
              </Text>
            </View>
          ))}

          <Text style={styles.tip}>💡 {result.tip}</Text>
        </View>
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
  evalBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6,
    marginTop: 8,
    backgroundColor: `${colors.primary}0d`,
    borderWidth: 1, borderColor: `${colors.primary}26`,
    paddingHorizontal: 12, paddingVertical: 8,
    borderRadius: borderRadius.full,
  },
  evalBtnText: { color: colors.primary, fontSize: fontSize.xs, fontWeight: '700' },
  errorText: { color: colors.destructive, fontSize: fontSize.xs, marginTop: 8, textAlign: 'center' },
  resultCard: {
    marginTop: 10, padding: 12,
    backgroundColor: colors.card,
    borderWidth: 1, borderColor: colors.border,
    borderRadius: borderRadius.lg,
    gap: 8,
  },
  resultHeader: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  scoreBadge: {
    minWidth: 44, height: 44, borderRadius: 22,
    justifyContent: 'center', alignItems: 'center', paddingHorizontal: 6,
  },
  scoreValue: { fontSize: fontSize.lg, fontWeight: '800' },
  verdict: { fontSize: fontSize.base, fontWeight: '800' },
  heard: { fontSize: fontSize.xs, color: colors.textMuted, marginTop: 2 },
  retryBtn: {
    width: 32, height: 32, borderRadius: 16,
    backgroundColor: `${colors.primary}10`,
    justifyContent: 'center', alignItems: 'center',
  },
  mismatch: {
    fontSize: fontSize.xs, fontWeight: '700', color: colors.destructive,
    backgroundColor: colors.destructiveLight,
    padding: 8, borderRadius: borderRadius.sm,
  },
  issue: {
    flexDirection: 'row', gap: 8, alignItems: 'flex-start',
    backgroundColor: `${colors.secondary}0d`,
    padding: 8, borderRadius: borderRadius.sm,
  },
  issueSegment: { fontSize: fontSize.md, fontWeight: '800', color: colors.secondary, minWidth: 26 },
  issueBody: { flex: 1, fontSize: fontSize.xs, color: colors.text, lineHeight: 17 },
  issueDiff: { fontWeight: '700', color: colors.textMuted },
  tip: { fontSize: fontSize.xs, color: colors.text, lineHeight: 17, fontWeight: '600' },
});
