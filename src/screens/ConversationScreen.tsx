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
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Speech from 'expo-speech';
import { useUserProgress } from '../lib/useUserProgress';
import { Card, Badge, LoadingSpinner } from '../components/RNComponents';
import { colors, spacing, borderRadius, fontSize } from '../theme';
import { invokeAI } from '../api/aiClient';

const TOPICS = [
  { id: 'greetings',  label: 'التحيات',        fr: 'Salutations',      emoji: '👋' },
  { id: 'restaurant', label: 'المطعم',          fr: 'Au restaurant',    emoji: '🍽️' },
  { id: 'shopping',   label: 'التسوق',          fr: 'Shopping',         emoji: '🛍️' },
  { id: 'travel',     label: 'السفر',           fr: 'Voyage',           emoji: '✈️' },
  { id: 'family',     label: 'العائلة',         fr: 'Famille',          emoji: '👨‍👩‍👧‍👦' },
  { id: 'daily',      label: 'الحياة اليومية',  fr: 'Vie quotidienne',  emoji: '☀️' },
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
}

interface AIMessage {
  arabic_text: string;
  transliteration: string;
  french_translation: string;
  suggestion?: string;
  pronunciation_feedback?: string;
  correction?: string;
}

export default function ConversationScreen() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<(typeof TOPICS)[0] | null>(null);
  const [inputText, setInputText] = useState('');
  const scrollViewRef = useRef<ScrollView>(null);

  const { progress, incrementCredits, canUseAI, creditsRemaining, addXP, updateProgress } =
    useUserProgress();

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  const speakArabic = (text: string) => {
    Speech.speak(text, { language: 'ar-SA', rate: 0.85 });
  };

  const startConversation = async (topic: (typeof TOPICS)[0]) => {
    setSelectedTopic(topic);
    setAiError(null);
    if (!canUseAI()) return;
    setIsLoading(true);
    try {
      const ok = await incrementCredits();
      if (!ok) return;

      const res = await invokeAI<AIMessage>(
        `Tu es un professeur d'arabe patient et encourageant. Commence une conversation simple en arabe sur le thème "${topic.fr}".
Donne une phrase d'accueil en arabe, sa translitération, et sa traduction en français.
Puis pose une question simple pour lancer la conversation. Utilise un arabe simple adapté aux débutants.
Réponds avec un JSON : { "arabic_text": "...", "transliteration": "...", "french_translation": "...", "suggestion": "..." }`,
      );

      setMessages([
        {
          role: 'ai',
          arabic: res.arabic_text,
          transliteration: res.transliteration,
          french: res.french_translation,
          suggestion: res.suggestion,
        },
      ]);
      setTimeout(() => speakArabic(res.arabic_text), 300);
    } catch (err) {
      console.error('Erreur IA conversation:', err);
      setAiError("Une erreur s'est produite. Vérifiez votre clé API dans .env");
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
            ? `Élève: ${m.text}`
            : `Prof: ${m.arabic} (${m.transliteration}) - ${m.french}`,
        )
        .join('\n');

      const res = await invokeAI<AIMessage>(
        `Tu es un professeur d'arabe patient. Conversation sur le thème "${selectedTopic.fr}":
${history}
Élève: ${spokenText}

Réponds en arabe avec translitération et traduction. Corrige les erreurs gentiment.
JSON : { "arabic_text": "...", "transliteration": "...", "french_translation": "...", "pronunciation_feedback": "...", "correction": "...", "suggestion": "..." }`,
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
        },
      ]);
      setTimeout(() => speakArabic(res.arabic_text), 300);

      await addXP(5);
      await updateProgress({
        conversations_count: (progress?.conversations_count || 0) + 1,
      });
    } catch (err) {
      console.error('Erreur IA réponse:', err);
      setAiError("Une erreur s'est produite. Vérifiez votre clé API dans .env");
    } finally {
      setIsLoading(false);
    }
  };

  // ── Topic selection ────────────────────────────────────────────────────────
  if (!selectedTopic) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={{ flex: 1 }}>
            <Text style={styles.headerTitle}>Conversation IA</Text>
            <Text style={styles.headerSubtitle}>Choisissez un thème</Text>
          </View>
          <Badge color="primary">{creditsRemaining()} crédits IA</Badge>
        </View>

        <View style={styles.topicsGrid}>
          {TOPICS.map(topic => (
            <TouchableOpacity
              key={topic.id}
              style={[styles.topicCard, (!canUseAI() || isLoading) && { opacity: 0.5 }]}
              onPress={() => startConversation(topic)}
              disabled={!canUseAI() || isLoading}
            >
              <Text style={styles.topicEmoji}>{topic.emoji}</Text>
              <Text style={styles.topicArabic}>{topic.label}</Text>
              <Text style={styles.topicFrench}>{topic.fr}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {!canUseAI() && (
          <Card style={styles.errorCard}>
            <Text style={styles.errorTitle}>Crédits IA épuisés</Text>
            <Text style={styles.errorText}>Vous avez utilisé tous vos crédits IA.</Text>
          </Card>
        )}
      </View>
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

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Tapez en arabe ou en français..."
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
    </View>
  );
}

const styles = StyleSheet.create({
  container:        { flex: 1, backgroundColor: colors.background },
  header:           { flexDirection: 'row', alignItems: 'center', paddingTop: 56, paddingBottom: 16, paddingHorizontal: 20 },
  headerTitle:      { fontSize: fontSize.xl, fontWeight: '700', color: colors.text },
  headerSubtitle:   { fontSize: fontSize.xs, color: colors.textMuted },
  topicsGrid:       { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md, paddingHorizontal: 20 },
  topicCard:        { width: '47%', backgroundColor: colors.card, borderRadius: borderRadius['2xl'], borderWidth: 1, borderColor: colors.border, padding: spacing.xl, alignItems: 'center' },
  topicEmoji:       { fontSize: 32, marginBottom: spacing.sm },
  topicArabic:      { fontSize: fontSize.lg, fontWeight: '600', color: colors.text, textAlign: 'right' },
  topicFrench:      { fontSize: fontSize.xs, color: colors.textMuted, marginTop: 4 },
  errorCard:        { margin: 20, backgroundColor: colors.destructiveLight, borderColor: colors.destructive },
  errorTitle:       { fontSize: fontSize.base, fontWeight: '600', color: colors.destructive },
  errorText:        { fontSize: fontSize.xs, color: colors.textMuted, marginTop: 4 },
  chatHeader:       { flexDirection: 'row', alignItems: 'center', paddingTop: 56, paddingBottom: 12, paddingHorizontal: 20, backgroundColor: colors.card, borderBottomWidth: 1, borderBottomColor: colors.border },
  backButton:       { padding: 8, marginRight: 12, borderRadius: borderRadius.lg, backgroundColor: `${colors.textMuted}15` },
  chatTitle:        { fontSize: fontSize.base, fontWeight: '700', color: colors.text },
  chatSubtitle:     { fontSize: fontSize.xs, color: colors.textMuted, textAlign: 'right' },
  messagesContainer:{ flex: 1, backgroundColor: colors.background },
  messagesContent:  { padding: 20, paddingBottom: 20 },
  userBubble:       { alignSelf: 'flex-end', backgroundColor: colors.primary, borderRadius: borderRadius.xl, paddingHorizontal: 16, paddingVertical: 12, maxWidth: '80%', marginBottom: 12 },
  userText:         { color: colors.white, fontSize: fontSize.base },
  aiBubbleContainer:{ alignSelf: 'flex-start', maxWidth: '85%', marginBottom: 12 },
  aiBubble:         { backgroundColor: colors.card, marginBottom: 4 },
  aiBubbleContent:  { flexDirection: 'row', alignItems: 'flex-start' },
  arabicText:       { fontSize: fontSize.xl, fontWeight: '600', color: colors.text, textAlign: 'right', writingDirection: 'rtl' },
  transliteration:  { fontSize: fontSize.xs, color: colors.primary, fontStyle: 'italic', marginTop: 6 },
  frenchText:       { fontSize: fontSize.sm, color: colors.textMuted, marginTop: 4 },
  audioButton:      { width: 36, height: 36, borderRadius: 18, backgroundColor: `${colors.primary}15`, justifyContent: 'center', alignItems: 'center', marginLeft: 12 },
  feedbackBubble:   { backgroundColor: `${colors.primary}15`, borderRadius: borderRadius.lg, padding: 12, borderWidth: 1, borderColor: `${colors.primary}30` },
  feedbackText:     { fontSize: fontSize.xs, color: colors.primary },
  correctionBubble: { backgroundColor: `${colors.secondary}15`, borderRadius: borderRadius.lg, padding: 12, borderWidth: 1, borderColor: `${colors.secondary}30`, marginTop: 4 },
  correctionText:   { fontSize: fontSize.xs, color: colors.text },
  suggestionBubble: { backgroundColor: colors.accentLight, borderRadius: borderRadius.lg, padding: 12, marginTop: 4 },
  suggestionText:   { fontSize: fontSize.xs, color: colors.text },
  loadingRow:       { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 },
  loadingText:      { fontSize: fontSize.xs, color: colors.textMuted },
  errorBubble:      { backgroundColor: colors.destructiveLight, borderRadius: borderRadius.lg, padding: 12, borderWidth: 1, borderColor: colors.destructive, marginBottom: 12 },
  inputContainer:   { flexDirection: 'row', alignItems: 'flex-end', padding: 16, paddingBottom: 40, backgroundColor: colors.card, borderTopWidth: 1, borderTopColor: colors.border, gap: 12 },
  input:            { flex: 1, backgroundColor: colors.background, borderRadius: borderRadius.xl, paddingHorizontal: 16, paddingVertical: 12, fontSize: fontSize.base, maxHeight: 100, borderWidth: 1, borderColor: colors.border },
  sendButton:       { width: 44, height: 44, borderRadius: 22, backgroundColor: colors.primary, justifyContent: 'center', alignItems: 'center' },
});