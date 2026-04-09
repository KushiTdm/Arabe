import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Speech from 'expo-speech';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import { useUserProgress } from '../lib/useUserProgress';
import { useErrorTracker } from '../lib/useErrorTracker';
import { Card, Badge, LoadingSpinner } from '../components/RNComponents';
import { colors, spacing, borderRadius, fontSize } from '../theme';
import { invokeAI, invokeAIWithAudio } from '../api/aiClient';

const TOPICS = [
  { id: 'greetings',  label: 'التحيات',        fr: 'Salutations',      emoji: '👋' },
  { id: 'restaurant', label: 'المطعم',          fr: 'Au restaurant',    emoji: '🍽️' },
  { id: 'shopping',   label: 'التسوق',          fr: 'Shopping',         emoji: '🛍️' },
  { id: 'travel',     label: 'السفر',           fr: 'Voyage',           emoji: '✈️' },
  { id: 'family',     label: 'العائلة',         fr: 'Famille',          emoji: '👨‍👩‍👧‍👦' },
  { id: 'daily',      label: 'الحياة اليومية',  fr: 'Vie quotidienne',  emoji: '☀️' },
  { id: 'exercise',   label: 'تمارين',          fr: 'Exercice adapté',  emoji: '🎯' },
];

interface Message {
  role: 'ai' | 'user';
  text?: string;
  arabic?: string;
  transliteration?: string;
  french?: string;
  correction?: string;
  pronunciation_feedback?: string;
  suggestion?: string;
  exercise?: string;
}

interface AIMessage {
  arabic_text: string;
  transliteration: string;
  french_translation: string;
  suggestion?: string;
  pronunciation_feedback?: string;
  correction?: string;
  exercise?: string;
  error_type?: string;
  error_category?: string;
  correct_form?: string;
}

export default function ConversationScreen() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<(typeof TOPICS)[0] | null>(null);
  const [inputText, setInputText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [inputMode, setInputMode] = useState<'text' | 'voice'>('voice');
  const scrollViewRef = useRef<ScrollView>(null);
  const recordingRef = useRef<Audio.Recording | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const { progress, incrementCredits, canUseAI, creditsRemaining, addXP, updateProgress } =
    useUserProgress();
  const { addError, getErrorsForAIPrompt, getErrorSummary } = useErrorTracker();

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const speakArabic = (text: string) => {
    Speech.speak(text, { language: 'ar-SA', rate: 0.85 });
  };

  const startRecording = async () => {
    try {
      const permission = await Audio.requestPermissionsAsync();
      if (!permission.granted) {
        Alert.alert('Permission requise', "Fatima, autorise l'accès au micro pour parler en arabe !");
        return;
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      recordingRef.current = recording;
      setIsRecording(true);
      setRecordingDuration(0);

      timerRef.current = setInterval(() => {
        setRecordingDuration(prev => prev + 1);
      }, 1000);
    } catch (err) {
      console.error('Erreur démarrage enregistrement:', err);
      Alert.alert('Erreur', "Impossible de démarrer l'enregistrement.");
    }
  };

  const stopRecording = async () => {
    if (!recordingRef.current) return;

    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    setIsRecording(false);

    try {
      await recordingRef.current.stopAndUnloadAsync();
      const uri = recordingRef.current.getURI();
      recordingRef.current = null;

      if (!uri) {
        Alert.alert('Erreur', 'Aucun enregistrement capturé.');
        return;
      }

      await processVoiceInput(uri);
    } catch (err) {
      console.error('Erreur arrêt enregistrement:', err);
      recordingRef.current = null;
    }
  };

  const processVoiceInput = async (audioUri: string) => {
    if (!canUseAI() || !selectedTopic) return;

    setIsLoading(true);
    setAiError(null);

    try {
      const ok = await incrementCredits();
      if (!ok) return;

      const audioBase64 = await FileSystem.readAsStringAsync(audioUri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const history = messages
        .map(m =>
          m.role === 'user'
            ? `Élève Fatima: ${m.text}`
            : `Prof: ${m.arabic} (${m.transliteration}) - ${m.french}`,
        )
        .join('\n');

      const errorsContext = getErrorsForAIPrompt();

      const res = await invokeAIWithAudio<AIMessage>(
        `Tu es un professeur d'arabe patient et bienveillant qui enseigne à Fatima.
Conversation sur le thème "${selectedTopic.fr}".

Historique:
${history}

${errorsContext}

Fatima vient de t'envoyer un message vocal. Transcris ce qu'elle dit, puis réponds-lui.
Corrige ses erreurs de prononciation et de grammaire avec bienveillance.
Encourage-la et propose-lui un exercice adapté à ses difficultés si pertinent.
Adresse-toi à elle directement : "Fatima, ..."

JSON : { "arabic_text": "...", "transliteration": "...", "french_translation": "...", "pronunciation_feedback": "...", "correction": "...", "suggestion": "...", "exercise": "...", "error_type": "pronunciation|grammar|vocabulary|null", "error_category": "...", "correct_form": "..." }`,
        audioBase64,
        'audio/m4a'
      );

      setMessages(prev => [
        ...prev,
        { role: 'user', text: '(message vocal)' },
        {
          role: 'ai',
          arabic: res.arabic_text,
          transliteration: res.transliteration,
          french: res.french_translation,
          correction: res.correction,
          pronunciation_feedback: res.pronunciation_feedback,
          suggestion: res.suggestion,
          exercise: res.exercise,
        },
      ]);

      if (res.error_type && res.correct_form) {
        await addError({
          type: res.error_type as any,
          category: res.error_category || selectedTopic.fr,
          description: res.correction || 'Erreur détectée',
          correct_form: res.correct_form,
          user_attempt: '(vocal)',
        });
      }

      setTimeout(() => speakArabic(res.arabic_text), 300);
      await addXP(5);
      await updateProgress({
        conversations_count: (progress?.conversations_count || 0) + 1,
      });
    } catch (err) {
      console.error('Erreur traitement vocal:', err);
      setAiError("Erreur de traitement vocal. Essaie de reparler plus clairement, Fatima !");
    } finally {
      setIsLoading(false);
    }
  };

  const startConversation = async (topic: (typeof TOPICS)[0]) => {
    setSelectedTopic(topic);
    setAiError(null);
    if (!canUseAI()) return;
    setIsLoading(true);
    try {
      const ok = await incrementCredits();
      if (!ok) return;

      const errorsContext = getErrorsForAIPrompt();
      const isExercise = topic.id === 'exercise';

      const prompt = isExercise
        ? `Tu es un professeur d'arabe bienveillant. Tu enseignes à Fatima.
${errorsContext}

En te basant sur le profil d'erreurs de Fatima ci-dessus, propose-lui un exercice adapté à ses faiblesses.
L'exercice doit être encourageant et progressif. Commence par la saluer chaleureusement.
Adresse-toi à elle : "Fatima, ..."
JSON : { "arabic_text": "...", "transliteration": "...", "french_translation": "...", "suggestion": "...", "exercise": "..." }`
        : `Tu es un professeur d'arabe patient et encourageant qui enseigne à Fatima.
Commence une conversation simple en arabe sur le thème "${topic.fr}".
${errorsContext}
Donne une phrase d'accueil en arabe, sa translitération, et sa traduction en français.
Puis pose une question simple pour lancer la conversation. Utilise un arabe simple adapté aux débutants.
Adresse-toi à Fatima directement de manière chaleureuse : "Fatima, ..."
JSON : { "arabic_text": "...", "transliteration": "...", "french_translation": "...", "suggestion": "...", "exercise": "..." }`;

      const res = await invokeAI<AIMessage>(prompt);

      setMessages([
        {
          role: 'ai',
          arabic: res.arabic_text,
          transliteration: res.transliteration,
          french: res.french_translation,
          suggestion: res.suggestion,
          exercise: res.exercise,
        },
      ]);
      setTimeout(() => speakArabic(res.arabic_text), 300);
    } catch (err) {
      console.error('Erreur IA conversation:', err);
      setAiError("Une erreur s'est produite. Vérifie ta connexion, Fatima.");
    } finally {
      setIsLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!inputText.trim() || isLoading || !canUseAI() || !selectedTopic) return;

    const spokenText = inputText.trim();
    setMessages(prev => [...prev, { role: 'user', text: spokenText }]);
    setInputText('');
    setAiError(null);
    setIsLoading(true);

    try {
      const ok = await incrementCredits();
      if (!ok) return;

      const history = messages
        .map(m =>
          m.role === 'user'
            ? `Élève Fatima: ${m.text}`
            : `Prof: ${m.arabic} (${m.transliteration}) - ${m.french}`,
        )
        .join('\n');

      const errorsContext = getErrorsForAIPrompt();

      const res = await invokeAI<AIMessage>(
        `Tu es un professeur d'arabe patient et bienveillant. Tu enseignes à Fatima.
Conversation sur le thème "${selectedTopic.fr}":
${history}
Élève Fatima: ${spokenText}

${errorsContext}

Réponds en arabe avec translitération et traduction. Corrige les erreurs avec bienveillance.
Propose un exercice si tu détectes une faiblesse récurrente.
Adresse-toi à Fatima directement : "Fatima, ..."
JSON : { "arabic_text": "...", "transliteration": "...", "french_translation": "...", "pronunciation_feedback": "...", "correction": "...", "suggestion": "...", "exercise": "...", "error_type": "pronunciation|grammar|vocabulary|null", "error_category": "...", "correct_form": "..." }`,
      );

      setMessages(prev => [
        ...prev,
        {
          role: 'ai',
          arabic: res.arabic_text,
          transliteration: res.transliteration,
          french: res.french_translation,
          correction: res.correction,
          pronunciation_feedback: res.pronunciation_feedback,
          suggestion: res.suggestion,
          exercise: res.exercise,
        },
      ]);

      if (res.error_type && res.correct_form) {
        await addError({
          type: res.error_type as any,
          category: res.error_category || selectedTopic.fr,
          description: res.correction || 'Erreur détectée',
          correct_form: res.correct_form,
          user_attempt: spokenText,
        });
      }

      setTimeout(() => speakArabic(res.arabic_text), 300);
      await addXP(5);
      await updateProgress({
        conversations_count: (progress?.conversations_count || 0) + 1,
      });
    } catch (err) {
      console.error('Erreur IA réponse:', err);
      setAiError("Une erreur s'est produite. Réessaie, Fatima !");
    } finally {
      setIsLoading(false);
    }
  };

  // ── Topic selection ────────────────────────────────────────────────────────
  if (!selectedTopic) {
    const errorSummary = getErrorSummary();

    return (
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 100 }}>
        <View style={styles.header}>
          <View style={{ flex: 1 }}>
            <Text style={styles.headerTitle}>Salut Fatima !</Text>
            <Text style={styles.headerSubtitle}>Choisis un thème de conversation</Text>
          </View>
          <Badge color="primary">{creditsRemaining()} crédits</Badge>
        </View>

        {/* Encouragement card */}
        <Card style={styles.encourageCard}>
          <Text style={styles.encourageText}>
            {errorSummary.total_errors === 0
              ? "Tu es prête pour ta prochaine conversation, Fatima ! Choisis un thème et lance-toi !"
              : `Continue comme ça Fatima ! Tu progresses bien. Travaille un peu sur ${errorSummary.improvement_areas.join(' et ') || 'ta pratique'} pour t'améliorer encore !`}
          </Text>
        </Card>

        <View style={styles.topicsGrid}>
          {TOPICS.map(topic => (
            <TouchableOpacity
              key={topic.id}
              style={[
                styles.topicCard,
                topic.id === 'exercise' && styles.exerciseCard,
                (!canUseAI() || isLoading) && { opacity: 0.5 },
              ]}
              onPress={() => startConversation(topic)}
              disabled={!canUseAI() || isLoading}
            >
              <Text style={styles.topicEmoji}>{topic.emoji}</Text>
              <Text style={styles.topicArabic}>{topic.label}</Text>
              <Text style={styles.topicFrench}>{topic.fr}</Text>
              {topic.id === 'exercise' && errorSummary.total_errors > 0 && (
                <Badge color="secondary" style={{ marginTop: 6 }}>
                  {errorSummary.total_errors} à travailler
                </Badge>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {!canUseAI() && (
          <Card style={styles.errorCard}>
            <Text style={styles.errorTitle}>Crédits IA épuisés</Text>
            <Text style={styles.errorText}>Tu as utilisé tous tes crédits IA, Fatima.</Text>
          </Card>
        )}
      </ScrollView>
    );
  }

  // ── Chat view ──────────────────────────────────────────────────────────────
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.chatHeader}>
        <TouchableOpacity
          onPress={() => { setSelectedTopic(null); setMessages([]); setAiError(null); }}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text style={styles.chatTitle}>{selectedTopic.emoji} {selectedTopic.fr}</Text>
          <Text style={styles.chatSubtitle}>{selectedTopic.label}</Text>
        </View>
        <Badge color="primary">{creditsRemaining()}</Badge>
      </View>

      <ScrollView
        ref={scrollViewRef}
        style={styles.messagesContainer}
        contentContainerStyle={styles.messagesContent}
      >
        {messages.map((msg, i) => (
          <MessageBubble key={i} message={msg} onSpeak={speakArabic} />
        ))}
        {isLoading && (
          <View style={styles.loadingRow}>
            <LoadingSpinner size="sm" />
            <Text style={styles.loadingText}>Le professeur réfléchit...</Text>
          </View>
        )}
        {aiError && (
          <View style={styles.errorBubble}>
            <Text style={styles.errorText}>{aiError}</Text>
          </View>
        )}
      </ScrollView>

      {/* Input area */}
      <View style={styles.inputContainer}>
        {/* Mode toggle */}
        <TouchableOpacity
          onPress={() => setInputMode(inputMode === 'voice' ? 'text' : 'voice')}
          style={styles.modeToggle}
        >
          <Ionicons
            name={inputMode === 'voice' ? 'keypad-outline' : 'mic-outline'}
            size={22}
            color={colors.primary}
          />
        </TouchableOpacity>

        {inputMode === 'text' ? (
          <>
            <TextInput
              style={styles.input}
              value={inputText}
              onChangeText={setInputText}
              placeholder="Écris en arabe ou en français, Fatima..."
              multiline
              editable={!isLoading}
              onSubmitEditing={sendMessage}
            />
            <TouchableOpacity
              style={[styles.sendButton, (!inputText.trim() || isLoading) && { opacity: 0.5 }]}
              onPress={sendMessage}
              disabled={!inputText.trim() || isLoading}
            >
              <Ionicons name="send" size={20} color={colors.white} />
            </TouchableOpacity>
          </>
        ) : (
          <View style={styles.voiceInputArea}>
            {isRecording ? (
              <>
                <View style={styles.recordingIndicator}>
                  <View style={styles.recordingDot} />
                  <Text style={styles.recordingText}>
                    Enregistrement... {recordingDuration}s
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.stopRecordButton}
                  onPress={stopRecording}
                >
                  <Ionicons name="stop" size={24} color={colors.white} />
                </TouchableOpacity>
              </>
            ) : (
              <>
                <Text style={styles.voiceHint}>
                  Appuie sur le micro pour parler, Fatima !
                </Text>
                <TouchableOpacity
                  style={[styles.micButton, isLoading && { opacity: 0.5 }]}
                  onPress={startRecording}
                  disabled={isLoading}
                >
                  <Ionicons name="mic" size={28} color={colors.white} />
                </TouchableOpacity>
              </>
            )}
          </View>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}

function MessageBubble({
  message,
  onSpeak,
}: {
  message: Message;
  onSpeak: (t: string) => void;
}) {
  if (message.role === 'user') {
    return (
      <View style={styles.userBubble}>
        <Text style={styles.userText}>{message.text}</Text>
      </View>
    );
  }
  return (
    <View style={styles.aiBubbleContainer}>
      <Card style={styles.aiBubble}>
        <View style={styles.aiBubbleContent}>
          <View style={{ flex: 1 }}>
            <Text style={styles.arabicText}>{message.arabic}</Text>
            <Text style={styles.transliteration}>{message.transliteration}</Text>
            <Text style={styles.frenchText}>{message.french}</Text>
          </View>
          <TouchableOpacity
            onPress={() => message.arabic && onSpeak(message.arabic)}
            style={styles.audioButton}
          >
            <Ionicons name="volume-high" size={20} color={colors.primary} />
          </TouchableOpacity>
        </View>
      </Card>
      {!!message.pronunciation_feedback && (
        <View style={styles.feedbackBubble}>
          <Text style={styles.feedbackText}>🗣️ {message.pronunciation_feedback}</Text>
        </View>
      )}
      {!!message.correction && (
        <View style={styles.correctionBubble}>
          <Text style={styles.correctionText}>💡 {message.correction}</Text>
        </View>
      )}
      {!!message.suggestion && (
        <View style={styles.suggestionBubble}>
          <Text style={styles.suggestionText}>✨ {message.suggestion}</Text>
        </View>
      )}
      {!!message.exercise && (
        <View style={styles.exerciseBubble}>
          <Text style={styles.exerciseTitle}>🎯 Exercice pour toi, Fatima :</Text>
          <Text style={styles.exerciseText}>{message.exercise}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container:           { flex: 1, backgroundColor: colors.background },
  header:              { flexDirection: 'row', alignItems: 'center', paddingTop: 56, paddingBottom: 16, paddingHorizontal: 20 },
  headerTitle:         { fontSize: fontSize.xl, fontWeight: '700', color: colors.text },
  headerSubtitle:      { fontSize: fontSize.xs, color: colors.textMuted },
  encourageCard:       { marginHorizontal: 20, marginBottom: spacing.lg, backgroundColor: `${colors.accent}15`, borderColor: `${colors.accent}30` },
  encourageText:       { fontSize: fontSize.sm, color: colors.text, lineHeight: 20, textAlign: 'center', fontStyle: 'italic' },
  topicsGrid:          { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md, paddingHorizontal: 20 },
  topicCard:           { width: '47%', backgroundColor: colors.card, borderRadius: borderRadius['2xl'], borderWidth: 1, borderColor: colors.border, padding: spacing.xl, alignItems: 'center' },
  exerciseCard:        { backgroundColor: `${colors.secondary}10`, borderColor: `${colors.secondary}40`, width: '97%' },
  topicEmoji:          { fontSize: 32, marginBottom: spacing.sm },
  topicArabic:         { fontSize: fontSize.lg, fontWeight: '600', color: colors.text, textAlign: 'right' },
  topicFrench:         { fontSize: fontSize.xs, color: colors.textMuted, marginTop: 4 },
  errorCard:           { margin: 20, backgroundColor: colors.destructiveLight, borderColor: colors.destructive },
  errorTitle:          { fontSize: fontSize.base, fontWeight: '600', color: colors.destructive },
  errorText:           { fontSize: fontSize.xs, color: colors.textMuted, marginTop: 4 },
  chatHeader:          { flexDirection: 'row', alignItems: 'center', paddingTop: 56, paddingBottom: 12, paddingHorizontal: 20, backgroundColor: colors.card, borderBottomWidth: 1, borderBottomColor: colors.border },
  backButton:          { padding: 8, marginRight: 12, borderRadius: borderRadius.lg, backgroundColor: `${colors.textMuted}15` },
  chatTitle:           { fontSize: fontSize.base, fontWeight: '700', color: colors.text },
  chatSubtitle:        { fontSize: fontSize.xs, color: colors.textMuted, textAlign: 'right' },
  messagesContainer:   { flex: 1, backgroundColor: colors.background },
  messagesContent:     { padding: 20, paddingBottom: 20 },
  userBubble:          { alignSelf: 'flex-end', backgroundColor: colors.primary, borderRadius: borderRadius.xl, paddingHorizontal: 16, paddingVertical: 12, maxWidth: '80%', marginBottom: 12 },
  userText:            { color: colors.white, fontSize: fontSize.base },
  aiBubbleContainer:   { alignSelf: 'flex-start', maxWidth: '85%', marginBottom: 12 },
  aiBubble:            { backgroundColor: colors.card, marginBottom: 4 },
  aiBubbleContent:     { flexDirection: 'row', alignItems: 'flex-start' },
  arabicText:          { fontSize: fontSize.xl, fontWeight: '600', color: colors.text, textAlign: 'right', writingDirection: 'rtl' },
  transliteration:     { fontSize: fontSize.xs, color: colors.primary, fontStyle: 'italic', marginTop: 6 },
  frenchText:          { fontSize: fontSize.sm, color: colors.textMuted, marginTop: 4 },
  audioButton:         { width: 36, height: 36, borderRadius: 18, backgroundColor: `${colors.primary}15`, justifyContent: 'center', alignItems: 'center', marginLeft: 12 },
  feedbackBubble:      { backgroundColor: `${colors.primary}15`, borderRadius: borderRadius.lg, padding: 12, borderWidth: 1, borderColor: `${colors.primary}30` },
  feedbackText:        { fontSize: fontSize.xs, color: colors.primary },
  correctionBubble:    { backgroundColor: `${colors.secondary}15`, borderRadius: borderRadius.lg, padding: 12, borderWidth: 1, borderColor: `${colors.secondary}30`, marginTop: 4 },
  correctionText:      { fontSize: fontSize.xs, color: colors.text },
  suggestionBubble:    { backgroundColor: colors.accentLight, borderRadius: borderRadius.lg, padding: 12, marginTop: 4 },
  suggestionText:      { fontSize: fontSize.xs, color: colors.text },
  exerciseBubble:      { backgroundColor: `${colors.secondary}10`, borderRadius: borderRadius.lg, padding: 12, marginTop: 4, borderWidth: 1, borderColor: `${colors.secondary}30` },
  exerciseTitle:       { fontSize: fontSize.xs, fontWeight: '700', color: colors.text, marginBottom: 4 },
  exerciseText:        { fontSize: fontSize.xs, color: colors.text, lineHeight: 18 },
  loadingRow:          { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 },
  loadingText:         { fontSize: fontSize.xs, color: colors.textMuted },
  errorBubble:         { backgroundColor: colors.destructiveLight, borderRadius: borderRadius.lg, padding: 12, borderWidth: 1, borderColor: colors.destructive, marginBottom: 12 },
  inputContainer:      { flexDirection: 'row', alignItems: 'center', padding: 12, paddingBottom: 36, backgroundColor: colors.card, borderTopWidth: 1, borderTopColor: colors.border, gap: 10 },
  modeToggle:          { width: 40, height: 40, borderRadius: 20, backgroundColor: `${colors.primary}10`, justifyContent: 'center', alignItems: 'center' },
  input:               { flex: 1, backgroundColor: colors.background, borderRadius: borderRadius.xl, paddingHorizontal: 16, paddingVertical: 10, fontSize: fontSize.base, maxHeight: 100, borderWidth: 1, borderColor: colors.border },
  sendButton:          { width: 44, height: 44, borderRadius: 22, backgroundColor: colors.primary, justifyContent: 'center', alignItems: 'center' },
  voiceInputArea:      { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  voiceHint:           { flex: 1, fontSize: fontSize.sm, color: colors.textMuted, fontStyle: 'italic' },
  micButton:           { width: 56, height: 56, borderRadius: 28, backgroundColor: colors.primary, justifyContent: 'center', alignItems: 'center', shadowColor: colors.primary, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 6 },
  stopRecordButton:    { width: 56, height: 56, borderRadius: 28, backgroundColor: colors.destructive, justifyContent: 'center', alignItems: 'center' },
  recordingIndicator:  { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 8 },
  recordingDot:        { width: 10, height: 10, borderRadius: 5, backgroundColor: colors.destructive },
  recordingText:       { fontSize: fontSize.sm, color: colors.destructive, fontWeight: '600' },
});
