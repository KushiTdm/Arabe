import React, { useState, useRef, useEffect } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  TextInput, KeyboardAvoidingView, Platform, Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Speech from 'expo-speech';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUserProgress } from '../lib/useUserProgress';
import { useErrorTracker } from '../lib/useErrorTracker';
import { useCourses } from '../lib/useCourses';
import { Card, LoadingSpinner } from '../components/RNComponents';
import { colors, spacing, borderRadius, fontSize } from '../theme';
import { invokeAI, invokeAIWithAudio } from '../api/aiClient';

const TOPICS = [
  { id: 'greetings',  label: 'التحيات',        fr: 'Salutations',     emoji: '👋' },
  { id: 'restaurant', label: 'المطعم',          fr: 'Au restaurant',   emoji: '🍽️' },
  { id: 'shopping',   label: 'التسوق',          fr: 'Shopping',        emoji: '🛍️' },
  { id: 'travel',     label: 'السفر',           fr: 'Voyage',          emoji: '✈️' },
  { id: 'family',     label: 'العائلة',         fr: 'Famille',         emoji: '👨‍👩‍👧‍👦' },
  { id: 'daily',      label: 'الحياة اليومية',  fr: 'Vie quotidienne', emoji: '☀️' },
  { id: 'exercise',   label: 'تمارين مخصصة',    fr: 'Exercice adapté', emoji: '🎯' },
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
  course_added?: boolean;   // ← badge indiquant qu'un cours a été créé
  course_topic?: string;
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
  // Course generation
  should_create_course?: boolean;
  course?: {
    title: string;
    type: string;
    summary: string;
    explanation: string;
    arabic_words: { arabic: string; transliteration: string; meaning: string }[];
    examples: { arabic: string; transliteration: string; french: string; note?: string }[];
    tips: string[];
    exercises: { instruction: string; type: string; question: string; answer: string; options?: string[] }[];
  };
}

export default function ConversationScreen() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<typeof TOPICS[0] | null>(null);
  const [inputText, setInputText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [inputMode, setInputMode] = useState<'text' | 'voice'>('text');
  const [courseNotif, setCourseNotif] = useState<string | null>(null);

  const scrollViewRef = useRef<ScrollView>(null);
  const recordingRef = useRef<Audio.Recording | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const { progress, incrementCredits, canUseAI, creditsRemaining, addXP, updateProgress } = useUserProgress();
  const { addError, addSession, getErrorsForAIPrompt } = useErrorTracker();
  const { addCourse } = useCourses();

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  useEffect(() => {
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  const speakArabic = (text: string) => {
    Speech.speak(text, { language: 'ar-SA', rate: 0.85 });
  };

  const buildHistory = () =>
    messages
      .map(m => m.role === 'user'
        ? `Fatima: ${m.text}`
        : `Prof: ${m.arabic} (${m.transliteration}) - ${m.french}`)
      .join('\n');

  const buildPrompt = (topic: string, history: string, errorsCtx: string, userMessage: string) =>
    `Tu es un professeur d'arabe patient et bienveillant. Tu enseignes à Fatima (débutante francophone).
Thème: "${topic}".
${history ? `Historique:\n${history}\n` : ''}
${errorsCtx}

Message de Fatima: ${userMessage}

Réponds chaleureusement en arabe, avec translitération et traduction française.
Corrige gentiment ses erreurs. Encourage-la. Adresse-toi directement à "Fatima".

⚠️ IMPORTANT - Création de cours:
Si Fatima pose une question sur un point de grammaire, une règle, un concept linguistique ou culturel
(ex: "pourquoi", "comment ça marche", "c'est quoi", "explique-moi"),
alors crée un mini-cours en remplissant "should_create_course": true et le champ "course".

JSON: {
  "arabic_text": "...",
  "transliteration": "...",
  "french_translation": "...",
  "pronunciation_feedback": "...",
  "correction": "...",
  "suggestion": "...",
  "exercise": "...",
  "error_type": "pronunciation|grammar|vocabulary|null",
  "error_category": "...",
  "correct_form": "...",
  "should_create_course": false,
  "course": {
    "title": "...",
    "type": "grammar|pronunciation|vocabulary|culture",
    "summary": "...",
    "explanation": "...",
    "arabic_words": [{"arabic":"...","transliteration":"...","meaning":"..."}],
    "examples": [{"arabic":"...","transliteration":"...","french":"...","note":"..."}],
    "tips": ["..."],
    "exercises": [{"instruction":"...","type":"translate","question":"...","answer":"...","options":["a","b","c","d"]}]
  }
}`;

  const handleAIResponse = async (res: AIMessage, topicFr: string) => {
    let courseAdded = false;
    let courseTopic = '';

    // Auto-create course if AI decides it's needed
    if (res.should_create_course && res.course) {
      try {
        const courseData = {
          ...res.course,
          source: 'conversation' as const,
          trigger_topic: topicFr,
          type: (res.course.type as any) || 'vocabulary',
          exercises: (res.course.exercises || []).map(ex => ({
            ...ex,
            type: ex.type as 'fill' | 'translate' | 'choose' | 'pronounce',
          })),
        };
        await addCourse(courseData);
        courseAdded = true;
        courseTopic = res.course.title;
        setCourseNotif(res.course.title);
        setTimeout(() => setCourseNotif(null), 5000);
      } catch (err) {
        console.warn('Erreur création cours:', err);
      }
    }

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
        course_added: courseAdded,
        course_topic: courseTopic,
      },
    ]);

    if (res.error_type && res.correct_form) {
      await addError({
        type: res.error_type as any,
        category: res.error_category || topicFr,
        description: res.correction || 'Erreur détectée',
        correct_form: res.correct_form,
        user_attempt: inputText || '(vocal)',
        source: 'conversation',
      });
    }

    setTimeout(() => speakArabic(res.arabic_text), 300);
  };

  const startConversation = async (topic: typeof TOPICS[0]) => {
    setSelectedTopic(topic);
    setMessages([]);
    setAiError(null);
    if (!canUseAI()) { setAiError('Crédits IA épuisés.'); return; }
    setIsLoading(true);
    try {
      const ok = await incrementCredits();
      if (!ok) return;
      const errorsCtx = getErrorsForAIPrompt();
      const isExercise = topic.id === 'exercise';
      const prompt = isExercise
        ? `Tu es un professeur d'arabe expert. Lance un exercice oral adapté aux difficultés de Fatima.
${errorsCtx}
Salue-la et propose un exercice ciblé. "Fatima, ..."
JSON: { "arabic_text":"...","transliteration":"...","french_translation":"...","suggestion":"...","exercise":"...","should_create_course":false,"course":null }`
        : `Tu es un professeur d'arabe patient. Lance une conversation simple sur "${topic.fr}" avec Fatima (débutante).
${errorsCtx}
Salue-la en arabe. Pose une question simple. "Fatima, ..."
JSON: { "arabic_text":"...","transliteration":"...","french_translation":"...","suggestion":"...","exercise":"","should_create_course":false,"course":null }`;

      const res = await invokeAI<AIMessage>(prompt);
      if (!res?.arabic_text) throw new Error('Réponse IA vide.');
      setMessages([{
        role: 'ai', arabic: res.arabic_text, transliteration: res.transliteration,
        french: res.french_translation, suggestion: res.suggestion, exercise: res.exercise,
      }]);
      setTimeout(() => speakArabic(res.arabic_text), 300);
    } catch (err: any) {
      setAiError(err?.message || 'Erreur IA. Vérifiez votre clé API dans Profil.');
    } finally {
      setIsLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!inputText.trim() || isLoading || !canUseAI() || !selectedTopic) return;
    const text = inputText.trim();
    setMessages(prev => [...prev, { role: 'user', text }]);
    setInputText('');
    setAiError(null);
    setIsLoading(true);
    try {
      const ok = await incrementCredits();
      if (!ok) return;
      const res = await invokeAI<AIMessage>(
        buildPrompt(selectedTopic.fr, buildHistory(), getErrorsForAIPrompt(), text)
      );
      if (!res?.arabic_text) throw new Error('Réponse IA vide.');
      await handleAIResponse(res, selectedTopic.fr);
      await addXP(5);
      await updateProgress({ conversations_count: (progress?.conversations_count || 0) + 1 });
      await addSession({ type: 'conversation', topic: selectedTopic.fr, duration_minutes: 1, errors_count: res.error_type ? 1 : 0, xp_earned: 5 });
    } catch (err: any) {
      setAiError(err?.message || 'Erreur IA.');
    } finally {
      setIsLoading(false);
    }
  };

  const startRecording = async () => {
    try {
      const perm = await Audio.requestPermissionsAsync();
      if (!perm.granted) { Alert.alert('Permission', "Autorise l'accès au micro !"); return; }
      await Audio.setAudioModeAsync({ allowsRecordingIOS: true, playsInSilentModeIOS: true });
      const { recording } = await Audio.Recording.createAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
      recordingRef.current = recording;
      setIsRecording(true);
      setRecordingDuration(0);
      timerRef.current = setInterval(() => setRecordingDuration(p => p + 1), 1000);
    } catch { Alert.alert('Erreur', "Impossible de démarrer l'enregistrement."); }
  };

  const stopRecording = async () => {
    if (!recordingRef.current) return;
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
    setIsRecording(false);
    try {
      await recordingRef.current.stopAndUnloadAsync();
      const uri = recordingRef.current.getURI();
      recordingRef.current = null;
      if (uri) await processVoice(uri);
    } catch { recordingRef.current = null; }
  };

  const processVoice = async (audioUri: string) => {
    if (!canUseAI() || !selectedTopic) return;
    setIsLoading(true); setAiError(null);
    try {
      const ok = await incrementCredits();
      if (!ok) return;
      const audioBase64 = await FileSystem.readAsStringAsync(audioUri, { encoding: FileSystem.EncodingType.Base64 });
      const res = await invokeAIWithAudio<AIMessage>(
        buildPrompt(selectedTopic.fr, buildHistory(), getErrorsForAIPrompt(), '(message vocal de Fatima)'),
        audioBase64, 'audio/m4a',
      );
      if (!res?.arabic_text) throw new Error('Réponse IA vide.');
      await handleAIResponse(res, selectedTopic.fr);
      await addXP(5);
      await updateProgress({ conversations_count: (progress?.conversations_count || 0) + 1 });
    } catch (err: any) {
      setAiError(err?.message || 'Erreur IA.');
    } finally {
      setIsLoading(false);
    }
  };

  // ── TOPIC SELECTION ────────────────────────────────────────────────────
  if (!selectedTopic) {
    return (
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <ScrollView style={styles.container} contentContainerStyle={styles.topicContent}>
          <View style={styles.header}>
            <View style={{ flex: 1 }}>
              <Text style={styles.headerTitle}>Salut Fatima ! 👋</Text>
              <Text style={styles.headerSubtitle}>Choisis un thème de conversation</Text>
            </View>
            <View style={styles.creditsTag}>
              <Ionicons name="flash" size={14} color={colors.primary} />
              <Text style={styles.creditsTagText}>{creditsRemaining()}</Text>
            </View>
          </View>

          <Card style={styles.tipCard}>
            <Text style={styles.tipText}>
              💡 Pose des questions à l'IA ! Si tu demandes d'expliquer une règle,
              un cours sera automatiquement créé dans ta section "Cours" 📚
            </Text>
          </Card>

          {!canUseAI() && (
            <Card style={styles.noCreditsCard}>
              <Ionicons name="warning" size={18} color={colors.destructive} />
              <Text style={styles.noCreditsText}>Crédits IA épuisés. Configurez votre clé API dans Profil.</Text>
            </Card>
          )}

          <View style={styles.topicsGrid}>
            {TOPICS.map(topic => (
              <TouchableOpacity
                key={topic.id}
                style={[styles.topicCard, topic.id === 'exercise' && styles.exerciseCard, (!canUseAI() || isLoading) && { opacity: 0.5 }]}
                onPress={() => startConversation(topic)}
                disabled={!canUseAI() || isLoading}
                activeOpacity={0.75}
              >
                <Text style={styles.topicEmoji}>{topic.emoji}</Text>
                <Text style={styles.topicArabic}>{topic.label}</Text>
                <Text style={styles.topicFrench}>{topic.fr}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // ── CHAT VIEW ──────────────────────────────────────────────────────────
  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined} keyboardVerticalOffset={0}>

        {/* Header */}
        <View style={styles.chatHeader}>
          <TouchableOpacity onPress={() => { setSelectedTopic(null); setMessages([]); setAiError(null); }} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={22} color={colors.text} />
          </TouchableOpacity>
          <View style={{ flex: 1 }}>
            <Text style={styles.chatTitle}>{selectedTopic.emoji} {selectedTopic.fr}</Text>
            <Text style={styles.chatSubtitle}>{selectedTopic.label}</Text>
          </View>
          <View style={styles.creditsTag}>
            <Ionicons name="flash" size={12} color={colors.primary} />
            <Text style={styles.creditsTagText}>{creditsRemaining()}</Text>
          </View>
        </View>

        {/* Course notification banner */}
        {courseNotif && (
          <View style={styles.courseNotifBanner}>
            <Ionicons name="book" size={16} color={colors.white} />
            <Text style={styles.courseNotifText} numberOfLines={1}>
              📚 Nouveau cours ajouté : "{courseNotif}"
            </Text>
          </View>
        )}

        {/* Messages */}
        <ScrollView ref={scrollViewRef} style={styles.messagesContainer} contentContainerStyle={styles.messagesContent}>
          {messages.length === 0 && isLoading && (
            <View style={styles.loadingRow}>
              <LoadingSpinner size="sm" />
              <Text style={styles.loadingText}>Démarrage de la conversation...</Text>
            </View>
          )}
          {messages.map((msg, i) => <MessageBubble key={i} message={msg} onSpeak={speakArabic} />)}
          {messages.length > 0 && isLoading && (
            <View style={styles.loadingRow}>
              <LoadingSpinner size="sm" />
              <Text style={styles.loadingText}>Le professeur réfléchit...</Text>
            </View>
          )}
          {aiError && (
            <View style={styles.errorBubble}>
              <Ionicons name="warning" size={14} color={colors.destructive} />
              <Text style={styles.errorBubbleText}>{aiError}</Text>
            </View>
          )}
        </ScrollView>

        {/* Input bar */}
        <View style={styles.inputBar}>
          <TouchableOpacity style={styles.modeToggle} onPress={() => setInputMode(m => m === 'text' ? 'voice' : 'text')}>
            <Ionicons name={inputMode === 'text' ? 'mic-outline' : 'keypad-outline'} size={20} color={colors.primary} />
          </TouchableOpacity>

          {inputMode === 'text' ? (
            <>
              <TextInput
                style={styles.textInput} value={inputText}
                onChangeText={setInputText}
                placeholder="Parle ou écris en arabe / français..."
                placeholderTextColor={colors.textMuted}
                multiline editable={!isLoading}
                blurOnSubmit onSubmitEditing={sendMessage}
              />
              <TouchableOpacity
                style={[styles.sendBtn, (!inputText.trim() || isLoading) && styles.sendBtnDisabled]}
                onPress={sendMessage} disabled={!inputText.trim() || isLoading}
              >
                <Ionicons name="send" size={18} color={colors.white} />
              </TouchableOpacity>
            </>
          ) : (
            <View style={styles.voiceArea}>
              {isRecording ? (
                <>
                  <View style={styles.recIndicator}>
                    <View style={styles.recDot} />
                    <Text style={styles.recText}>Enregistrement... {recordingDuration}s</Text>
                  </View>
                  <TouchableOpacity style={styles.stopBtn} onPress={stopRecording}>
                    <Ionicons name="stop" size={22} color={colors.white} />
                  </TouchableOpacity>
                </>
              ) : (
                <>
                  <Text style={styles.voiceHint}>Appuie sur le micro pour parler en arabe</Text>
                  <TouchableOpacity style={[styles.micBtn, isLoading && { opacity: 0.5 }]} onPress={startRecording} disabled={isLoading}>
                    <Ionicons name="mic" size={26} color={colors.white} />
                  </TouchableOpacity>
                </>
              )}
            </View>
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function MessageBubble({ message, onSpeak }: { message: Message; onSpeak: (t: string) => void }) {
  if (message.role === 'user') {
    return (
      <View style={styles.userBubble}>
        <Text style={styles.userBubbleText}>{message.text}</Text>
      </View>
    );
  }
  return (
    <View style={styles.aiBubbleWrap}>
      <Card style={styles.aiBubble}>
        <View style={styles.aiBubbleContent}>
          <View style={{ flex: 1 }}>
            {/* *** GRAND TEXTE ARABE *** */}
            <Text style={styles.arabicText}>{message.arabic}</Text>
            <Text style={styles.translitText}>{message.transliteration}</Text>
            <Text style={styles.frenchText}>{message.french}</Text>
          </View>
          <TouchableOpacity onPress={() => message.arabic && onSpeak(message.arabic)} style={styles.speakBtn}>
            <Ionicons name="volume-high" size={18} color={colors.primary} />
          </TouchableOpacity>
        </View>
      </Card>
      {!!message.pronunciation_feedback && (
        <View style={styles.feedbackPill}>
          <Text style={styles.feedbackPillText}>🗣️ {message.pronunciation_feedback}</Text>
        </View>
      )}
      {!!message.correction && (
        <View style={styles.correctionPill}>
          <Text style={styles.correctionPillText}>💡 {message.correction}</Text>
        </View>
      )}
      {!!message.suggestion && (
        <View style={styles.suggestionPill}>
          <Text style={styles.suggestionPillText}>✨ {message.suggestion}</Text>
        </View>
      )}
      {!!message.exercise && (
        <View style={styles.exercisePill}>
          <Text style={styles.exercisePillTitle}>🎯 Exercice :</Text>
          <Text style={styles.exercisePillText}>{message.exercise}</Text>
        </View>
      )}
      {message.course_added && (
        <View style={styles.courseAddedPill}>
          <Ionicons name="book" size={14} color={colors.white} />
          <Text style={styles.courseAddedText}>
            📚 Cours créé : "{message.course_topic}" — va dans "Cours" pour le lire !
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  container: { flex: 1 },
  topicContent: { paddingHorizontal: 16, paddingTop: 16, paddingBottom: 120 },

  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 14 },
  headerTitle: { fontSize: fontSize.xl, fontWeight: '700', color: colors.text },
  headerSubtitle: { fontSize: fontSize.xs, color: colors.textMuted, marginTop: 2 },
  creditsTag: { flexDirection: 'row', alignItems: 'center', backgroundColor: `${colors.primary}12`, paddingHorizontal: 10, paddingVertical: 5, borderRadius: borderRadius.full, gap: 4 },
  creditsTagText: { fontSize: fontSize.xs, fontWeight: '700', color: colors.primary },

  tipCard: { marginBottom: 14, backgroundColor: `${colors.accent}10`, borderRadius: borderRadius.xl },
  tipText: { fontSize: fontSize.sm, color: colors.text, lineHeight: 20 },
  noCreditsCard: { flexDirection: 'row', gap: 8, alignItems: 'center', marginBottom: 14, backgroundColor: `${colors.destructive}08`, padding: 12, borderRadius: borderRadius.xl, borderWidth: 1, borderColor: `${colors.destructive}20` },
  noCreditsText: { fontSize: fontSize.sm, color: colors.destructive, flex: 1 },

  topicsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  topicCard: { width: '47%', backgroundColor: colors.card, borderRadius: borderRadius['2xl'], borderWidth: 1, borderColor: colors.border, padding: spacing.lg, alignItems: 'center' },
  exerciseCard: { width: '97%', backgroundColor: `${colors.secondary}10`, borderColor: `${colors.secondary}40` },
  topicEmoji: { fontSize: 30, marginBottom: 6 },
  topicArabic: { fontSize: fontSize.base, fontWeight: '700', color: colors.text },
  topicFrench: { fontSize: fontSize.xs, color: colors.textMuted, marginTop: 3 },

  chatHeader: { flexDirection: 'row', alignItems: 'center', paddingTop: 10, paddingBottom: 12, paddingHorizontal: 16, backgroundColor: colors.card, borderBottomWidth: 1, borderBottomColor: colors.border },
  backBtn: { padding: 8, borderRadius: borderRadius.md, backgroundColor: `${colors.textMuted}12`, marginRight: 10 },
  chatTitle: { fontSize: fontSize.base, fontWeight: '700', color: colors.text },
  chatSubtitle: { fontSize: fontSize.xs, color: colors.textMuted },

  // Course notification banner
  courseNotifBanner: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    backgroundColor: colors.primary,
    paddingVertical: 10, paddingHorizontal: 16,
  },
  courseNotifText: { color: colors.white, fontSize: fontSize.xs, fontWeight: '600', flex: 1 },

  messagesContainer: { flex: 1, backgroundColor: colors.background },
  messagesContent: { padding: 16, paddingBottom: 12 },

  userBubble: { alignSelf: 'flex-end', backgroundColor: colors.primary, borderRadius: borderRadius.xl, paddingHorizontal: 14, paddingVertical: 10, maxWidth: '80%', marginBottom: 10 },
  userBubbleText: { color: colors.white, fontSize: fontSize.base },

  aiBubbleWrap: { alignSelf: 'flex-start', maxWidth: '90%', marginBottom: 12, gap: 5 },
  aiBubble: { padding: 14 },
  aiBubbleContent: { flexDirection: 'row', alignItems: 'flex-start' },

  // *** LARGE ARABIC — taille augmentée pour meilleure lisibilité ***
  arabicText: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'right',
    lineHeight: 40,
    marginBottom: 6,
  },
  translitText: { fontSize: fontSize.sm, color: colors.primary, fontStyle: 'italic', marginBottom: 4 },
  frenchText: { fontSize: fontSize.base, color: colors.textMuted },
  speakBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: `${colors.primary}12`, justifyContent: 'center', alignItems: 'center', marginLeft: 10 },

  feedbackPill: { backgroundColor: `${colors.primary}12`, borderRadius: borderRadius.lg, padding: 10, borderWidth: 1, borderColor: `${colors.primary}20` },
  feedbackPillText: { fontSize: fontSize.xs, color: colors.primary, lineHeight: 18 },
  correctionPill: { backgroundColor: `${colors.secondary}12`, borderRadius: borderRadius.lg, padding: 10 },
  correctionPillText: { fontSize: fontSize.xs, color: colors.text, lineHeight: 18 },
  suggestionPill: { backgroundColor: `${colors.accent}12`, borderRadius: borderRadius.lg, padding: 10 },
  suggestionPillText: { fontSize: fontSize.xs, color: colors.text, lineHeight: 18 },
  exercisePill: { backgroundColor: `${colors.secondary}10`, borderRadius: borderRadius.lg, padding: 10, borderWidth: 1, borderColor: `${colors.secondary}25` },
  exercisePillTitle: { fontSize: fontSize.xs, fontWeight: '700', color: colors.text, marginBottom: 3 },
  exercisePillText: { fontSize: fontSize.xs, color: colors.text, lineHeight: 18 },

  // Course added pill
  courseAddedPill: { flexDirection: 'row', alignItems: 'flex-start', gap: 6, backgroundColor: colors.primary, borderRadius: borderRadius.lg, padding: 10 },
  courseAddedText: { fontSize: fontSize.xs, color: colors.white, flex: 1, lineHeight: 18 },

  loadingRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 10, padding: 12, backgroundColor: `${colors.primary}08`, borderRadius: borderRadius.lg },
  loadingText: { fontSize: fontSize.xs, color: colors.textMuted },
  errorBubble: { flexDirection: 'row', alignItems: 'flex-start', gap: 6, backgroundColor: `${colors.destructive}10`, borderRadius: borderRadius.lg, padding: 10, borderWidth: 1, borderColor: `${colors.destructive}25`, marginBottom: 10 },
  errorBubbleText: { fontSize: fontSize.xs, color: colors.destructive, flex: 1 },

  inputBar: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 10, paddingBottom: Platform.OS === 'ios' ? 24 : 12, backgroundColor: colors.card, borderTopWidth: 1, borderTopColor: colors.border, gap: 8 },
  modeToggle: { width: 38, height: 38, borderRadius: 19, backgroundColor: `${colors.primary}12`, justifyContent: 'center', alignItems: 'center' },
  textInput: { flex: 1, backgroundColor: colors.background, borderRadius: borderRadius.xl, paddingHorizontal: 14, paddingVertical: 10, fontSize: fontSize.base, maxHeight: 90, borderWidth: 1, borderColor: colors.border, color: colors.text },
  sendBtn: { width: 42, height: 42, borderRadius: 21, backgroundColor: colors.primary, justifyContent: 'center', alignItems: 'center' },
  sendBtnDisabled: { opacity: 0.4 },
  voiceArea: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  voiceHint: { fontSize: fontSize.sm, color: colors.textMuted, fontStyle: 'italic', flex: 1 },
  micBtn: { width: 52, height: 52, borderRadius: 26, backgroundColor: colors.primary, justifyContent: 'center', alignItems: 'center', shadowColor: colors.primary, shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.3, shadowRadius: 6, elevation: 5 },
  stopBtn: { width: 52, height: 52, borderRadius: 26, backgroundColor: colors.destructive, justifyContent: 'center', alignItems: 'center' },
  recIndicator: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 8 },
  recDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: colors.destructive },
  recText: { fontSize: fontSize.sm, color: colors.destructive, fontWeight: '600' },
});