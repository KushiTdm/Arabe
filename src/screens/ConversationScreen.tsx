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
import { Card, Badge, LoadingSpinner, Button } from '../components/RNComponents';
import { colors, spacing, borderRadius, fontSize } from '../theme';
import { base44 } from '../api/base44Client';

const GEMINI_MODEL = 'gemini_2_flash';

const TOPICS = [
  { id: 'greetings', label: 'التحيات', fr: 'Salutations', emoji: '👋' },
  { id: 'restaurant', label: 'المطعم', fr: 'Au restaurant', emoji: '🍽️' },
  { id: 'shopping', label: 'التسوق', fr: 'Shopping', emoji: '🛍️' },
  { id: 'travel', label: 'السفر', fr: 'Voyage', emoji: '✈️' },
  { id: 'family', label: 'العائلة', fr: 'Famille', emoji: '👨‍👩‍👧‍👦' },
  { id: 'daily', label: 'الحياة اليومية', fr: 'Vie quotidienne', emoji: '☀️' },
];

export default function ConversationScreen() {
  const [messages, setMessages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<any>(null);
  const [inputText, setInputText] = useState('');
  const scrollViewRef = useRef<ScrollView>(null);
  
  const { progress, incrementCredits, canUseAI, creditsRemaining, addXP, updateProgress } = useUserProgress();

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  const speakArabic = (text: string) => {
    Speech.speak(text, {
      language: 'ar-SA',
      rate: 0.85,
    });
  };

  const startConversation = async (topic: any) => {
    setSelectedTopic(topic);
    setAiError(null);
    if (!canUseAI()) return;
    setIsLoading(true);

    try {
      const ok = await incrementCredits();
      if (!ok) return;

      const res = await base44.integrations.Core.InvokeLLM({
        prompt: `Tu es un professeur d'arabe patient et encourageant. Commence une conversation simple en arabe sur le thème "${topic.fr}". 
Donne une phrase d'accueil en arabe, sa translitération, et sa traduction en français.
Puis pose une question simple pour lancer la conversation. Utilise un arabe simple adapté aux débutants.`,
        model: GEMINI_MODEL,
        response_json_schema: {
          type: 'object',
          properties: {
            arabic_text: { type: 'string' },
            transliteration: { type: 'string' },
            french_translation: { type: 'string' },
            suggestion: { type: 'string' },
          },
        },
      });

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
      setAiError("Une erreur s'est produite. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!inputText.trim() || isLoading || !canUseAI()) return;

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
            : `Prof: ${m.arabic} (${m.transliteration}) - ${m.french}`
        )
        .join('\n');

      const res = await base44.integrations.Core.InvokeLLM({
        prompt: `Tu es un professeur d'arabe patient. Conversation sur le thème "${selectedTopic.fr}":
${history}
Élève (a parlé): ${spokenText}

Réponds en arabe avec translitération et traduction. Si l'élève a parlé en arabe, évalue brièvement sa prononciation/formulation. Corrige les erreurs gentiment. Continue la conversation.
Si l'élève a parlé en français, aide-le à dire la même chose en arabe.`,
        model: GEMINI_MODEL,
        response_json_schema: {
          type: 'object',
          properties: {
            arabic_text: { type: 'string' },
            transliteration: { type: 'string' },
            french_translation: { type: 'string' },
            pronunciation_feedback: { type: 'string' },
            correction: { type: 'string' },
            suggestion: { type: 'string' },
          },
        },
      });

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
      setAiError("Une erreur s'est produite. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  };

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
              style={styles.topicCard}
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

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* Header */}
      <View style={styles.chatHeader}>
        <TouchableOpacity 
          onPress={() => {
            setSelectedTopic(null);
            setMessages([]);
            setAiError(null);
          }}
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

      {/* Messages */}
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

      {/* Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Tapez en arabe ou en français..."
          multiline
          editable={!isLoading}
        />
        <TouchableOpacity 
          style={styles.sendButton}
          onPress={sendMessage}
          disabled={!inputText.trim() || isLoading}
        >
          <Ionicons name="send" size={20} color={colors.white} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

function MessageBubble({ message, onSpeak }: { message: any; onSpeak: (text: string) => void }) {
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
          <TouchableOpacity onPress={() => onSpeak(message.arabic)} style={styles.audioButton}>
            <Ionicons name="volume-high" size={20} color={colors.primary} />
          </TouchableOpacity>
        </View>
      </Card>
      {message.pronunciation_feedback && (
        <View style={styles.feedbackBubble}>
          <Text style={styles.feedbackText}>🗣️ {message.pronunciation_feedback}</Text>
        </View>
      )}
      {message.correction && (
        <View style={styles.correctionBubble}>
          <Text style={styles.correctionText}>💡 {message.correction}</Text>
        </View>
      )}
      {message.suggestion && (
        <View style={styles.suggestionBubble}>
          <Text style={styles.suggestionText}>✨ {message.suggestion}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 56,
    paddingBottom: 16,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: fontSize.xl,
    fontWeight: '700',
    color: colors.text,
  },
  headerSubtitle: {
    fontSize: fontSize.xs,
    color: colors.textMuted,
  },
  topicsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
    paddingHorizontal: 20,
  },
  topicCard: {
    width: '47%',
    backgroundColor: colors.card,
    borderRadius: borderRadius['2xl'],
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.xl,
    alignItems: 'center',
  },
  topicEmoji: {
    fontSize: 32,
    marginBottom: spacing.sm,
  },
  topicArabic: {
    fontSize: fontSize.lg,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'right',
  },
  topicFrench: {
    fontSize: fontSize.xs,
    color: colors.textMuted,
    marginTop: 4,
  },
  errorCard: {
    margin: 20,
    backgroundColor: colors.destructiveLight,
    borderColor: colors.destructive,
  },
  errorTitle: {
    fontSize: fontSize.base,
    fontWeight: '600',
    color: colors.destructive,
  },
  errorText: {
    fontSize: fontSize.xs,
    color: colors.textMuted,
    marginTop: 4,
  },
  chatHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 56,
    paddingBottom: 12,
    paddingHorizontal: 20,
    backgroundColor: colors.card,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    padding: 8,
    marginRight: 12,
    borderRadius: borderRadius.lg,
    backgroundColor: `${colors.textMuted}15`,
  },
  chatTitle: {
    fontSize: fontSize.base,
    fontWeight: '700',
    color: colors.text,
  },
  chatSubtitle: {
    fontSize: fontSize.xs,
    color: colors.textMuted,
    textAlign: 'right',
  },
  messagesContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  messagesContent: {
    padding: 20,
    paddingBottom: 100,
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: colors.primary,
    borderRadius: borderRadius.xl,
    paddingHorizontal: 16,
    paddingVertical: 12,
    maxWidth: '80%',
    marginBottom: 12,
  },
  userText: {
    color: colors.white,
    fontSize: fontSize.base,
  },
  aiBubbleContainer: {
    alignSelf: 'flex-start',
    maxWidth: '85%',
    marginBottom: 12,
  },
  aiBubble: {
    backgroundColor: colors.card,
    marginBottom: 4,
  },
  aiBubbleContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  arabicText: {
    fontSize: fontSize.xl,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  transliteration: {
    fontSize: fontSize.xs,
    color: colors.primary,
    fontStyle: 'italic',
    marginTop: 6,
  },
  frenchText: {
    fontSize: fontSize.sm,
    color: colors.textMuted,
    marginTop: 4,
  },
  audioButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: `${colors.primary}15`,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  feedbackBubble: {
    backgroundColor: `${colors.primary}15`,
    borderRadius: borderRadius.lg,
    padding: 12,
    borderWidth: 1,
    borderColor: `${colors.primary}30`,
  },
  feedbackText: {
    fontSize: fontSize.xs,
    color: colors.primary,
  },
  correctionBubble: {
    backgroundColor: `${colors.secondary}15`,
    borderRadius: borderRadius.lg,
    padding: 12,
    borderWidth: 1,
    borderColor: `${colors.secondary}30`,
    marginTop: 4,
  },
  correctionText: {
    fontSize: fontSize.xs,
    color: colors.text,
  },
  suggestionBubble: {
    backgroundColor: colors.accentLight,
    borderRadius: borderRadius.lg,
    padding: 12,
    marginTop: 4,
  },
  suggestionText: {
    fontSize: fontSize.xs,
    color: colors.text,
  },
  loadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  loadingText: {
    fontSize: fontSize.xs,
    color: colors.textMuted,
  },
  errorBubble: {
    backgroundColor: colors.destructiveLight,
    borderRadius: borderRadius.lg,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.destructive,
    marginBottom: 12,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: 16,
    paddingBottom: 100,
    backgroundColor: colors.card,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    gap: 12,
  },
  input: {
    flex: 1,
    backgroundColor: colors.background,
    borderRadius: borderRadius.xl,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: fontSize.base,
    maxHeight: 100,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});