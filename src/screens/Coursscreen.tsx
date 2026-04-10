import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Speech from 'expo-speech';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { useCourses, CourseLesson, CourseType } from '../lib/useCourses';
import { useErrorTracker } from '../lib/useErrorTracker';
import { Card, LoadingSpinner } from '../components/RNComponents';
import { colors, borderRadius, fontSize, spacing } from '../theme';
import { invokeAI } from '../api/aiClient';

const TYPE_META: Record<CourseType, { label: string; emoji: string; color: string }> = {
  grammar:       { label: 'Grammaire',     emoji: '📐', color: '#6366f1' },
  pronunciation: { label: 'Prononciation', emoji: '🗣️', color: '#f59e0b' },
  vocabulary:    { label: 'Vocabulaire',   emoji: '📚', color: '#10b981' },
  writing:       { label: 'Écriture',      emoji: '✍️', color: '#3b82f6' },
  culture:       { label: 'Culture',       emoji: '🌙', color: '#ec4899' },
};

const SOURCE_LABEL: Record<string, string> = {
  error:        "Généré depuis une erreur",
  conversation: 'Depuis une conversation',
  manual:       'Demandé manuellement',
  report:       'Depuis le rapport IA',
};

type FilterType = 'all' | CourseType | 'starred';
type ViewType = 'list' | 'detail' | 'chat';

export default function CoursScreen() {
  const {
    recentCourses, unreadCount, markRead, toggleStar,
    deleteCourse, loading, reload, addCourse,
  } = useCourses();
  const { getErrorsForAIPrompt, getErrorSummary } = useErrorTracker();

  const [view, setView] = useState<ViewType>('list');
  const [selectedCourse, setSelectedCourse] = useState<CourseLesson | null>(null);
  const [filter, setFilter] = useState<FilterType>('all');
  const [exerciseAnswers, setExerciseAnswers] = useState<Record<number, string>>({});
  const [showAnswers, setShowAnswers] = useState<Record<number, boolean>>({});

  // Chat state
  const [chatInput, setChatInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [chatMessages, setChatMessages] = useState<{ role: 'user' | 'ai'; text: string }[]>([
    { role: 'ai', text: '👋 Bonjour Fatima ! Demande-moi de créer un cours sur n\'importe quel sujet arabe. Par exemple : "Explique-moi comment former le pluriel en arabe" ou "Crée un cours sur les salutations formelles".' }
  ]);

  useFocusEffect(useCallback(() => { reload(); }, []));

  const speakArabic = (text: string) => {
    Speech.speak(text, { language: 'ar-SA', rate: 0.8 });
  };

  const openCourse = async (course: CourseLesson) => {
    setSelectedCourse(course);
    setView('detail');
    setExerciseAnswers({});
    setShowAnswers({});
    if (!course.read) await markRead(course.id);
  };

  const handleDeleteCourse = (course: CourseLesson) => {
    Alert.alert(
      'Supprimer ce cours',
      `Voulez-vous supprimer "${course.title}" ?`,
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Supprimer',
          style: 'destructive',
          onPress: async () => {
            await deleteCourse(course.id);
            if (selectedCourse?.id === course.id) {
              setSelectedCourse(null);
              setView('list');
            }
          },
        },
      ],
    );
  };

  // ── Generate course from AI chat ────────────────────────────────────────
  const sendChatMessage = async () => {
    const text = chatInput.trim();
    if (!text || isGenerating) return;

    setChatInput('');
    setChatMessages(prev => [...prev, { role: 'user', text }]);
    setIsGenerating(true);

    try {
      const errorsCtx = getErrorsForAIPrompt();

      interface CourseResponse {
        title: string;
        type: string;
        summary: string;
        explanation: string;
        arabic_words: { arabic: string; transliteration: string; meaning: string }[];
        examples: { arabic: string; transliteration: string; french: string; note?: string }[];
        tips: string[];
        exercises: { instruction: string; type: string; question: string; answer: string; options?: string[] }[];
      }

      const res = await invokeAI<CourseResponse>(
        `Tu es un professeur d'arabe expert. Fatima te demande : "${text}"

${errorsCtx ? `Contexte d'apprentissage de Fatima:\n${errorsCtx.substring(0, 400)}` : ''}

RÈGLES IMPORTANTES:
- Tous les mots arabes DOIVENT avoir les voyelles (harakat/tashkil)
- Exemple correct: "مَرْحَباً" pas "مرحبا"
- Translitérations en français

Génère un cours complet.
JSON (compact):
{"title":"Titre du cours","type":"grammar","summary":"Résumé en 1 phrase","explanation":"Explication en 3-4 phrases claires","arabic_words":[{"arabic":"مَثَل","transliteration":"mathal","meaning":"exemple"}],"examples":[{"arabic":"جُمْلَة","transliteration":"jumla","french":"phrase","note":"conseil"}],"tips":["conseil 1","conseil 2"],"exercises":[{"instruction":"Traduire","type":"translate","question":"Bonjour","answer":"مَرْحَباً","options":["مَرْحَباً","شُكْراً","وَدَاعاً","مَاء"]}]}`,
        2048,
      );

      const courseData = {
        ...res,
        source: 'manual' as const,
        trigger_topic: text,
        type: (res.type as CourseType) || 'grammar',
        exercises: (res.exercises || []).map(ex => ({
          ...ex,
          type: ex.type as 'fill' | 'translate' | 'choose' | 'pronounce',
        })),
      };

      const added = await addCourse(courseData);
      if (added) {
        setChatMessages(prev => [
          ...prev,
          {
            role: 'ai',
            text: `✅ Cours créé : "${res.title}" ! Il est maintenant disponible dans ta liste. Tu veux que j'approfondisse un autre point ?`,
          },
        ]);
        reload();
      } else {
        setChatMessages(prev => [
          ...prev,
          { role: 'ai', text: 'Un cours similaire existe déjà (moins de 24h). Veux-tu un autre sujet ?' },
        ]);
      }
    } catch (err: any) {
      setChatMessages(prev => [
        ...prev,
        { role: 'ai', text: `❌ Erreur : ${err?.message || 'Impossible de générer le cours. Vérifiez votre clé API dans Profil.'}`},
      ]);
    } finally {
      setIsGenerating(false);
    }
  };

  // ── Generate course from errors ─────────────────────────────────────────
  const generateFromErrors = async () => {
    const summary = getErrorSummary();
    if (summary.total_errors === 0) {
      Alert.alert('Aucune erreur', 'Pratique d\'abord des conversations pour que l\'IA détecte tes difficultés !');
      return;
    }

    setIsGenerating(true);
    setChatMessages(prev => [...prev,
      { role: 'user', text: '🎯 Génère un cours basé sur mes erreurs récentes' },
    ]);

    try {
      const errorsCtx = getErrorsForAIPrompt();
      const dominant = summary.most_common_type || 'grammaire';
      const weakCats = summary.weak_categories.slice(0, 2).join(', ') || dominant;

      interface CourseResponse {
        title: string;
        type: string;
        summary: string;
        explanation: string;
        arabic_words: { arabic: string; transliteration: string; meaning: string }[];
        examples: { arabic: string; transliteration: string; french: string; note?: string }[];
        tips: string[];
        exercises: { instruction: string; type: string; question: string; answer: string; options?: string[] }[];
      }

      const res = await invokeAI<CourseResponse>(
        `Professeur d'arabe expert. Génère un cours CIBLÉ pour corriger les erreurs de Fatima.

${errorsCtx}

Axe principal: ${dominant} dans ${weakCats}.
RÈGLE: Arabe avec voyelles (harakat). Ex: "مَرْحَباً" pas "مرحبا"

JSON:
{"title":"Titre ciblé sur ${dominant}","type":"${dominant === 'pronunciation' ? 'pronunciation' : dominant === 'writing' ? 'writing' : 'grammar'}","summary":"Résumé","explanation":"Explication","arabic_words":[{"arabic":"مَثَل","transliteration":"mathal","meaning":"exemple"}],"examples":[{"arabic":"جُمْلَة","transliteration":"jumla","french":"phrase","note":"note"}],"tips":["conseil 1"],"exercises":[{"instruction":"Exercice","type":"translate","question":"Q","answer":"مَرْحَباً","options":["مَرْحَباً","شُكْراً","وَدَاعاً","مَاء"]}]}`,
        2048,
      );

      const courseData = {
        ...res,
        source: 'error' as const,
        trigger_topic: `Erreurs en ${weakCats}`,
        type: (res.type as CourseType) || 'grammar',
        exercises: (res.exercises || []).map(ex => ({
          ...ex,
          type: ex.type as 'fill' | 'translate' | 'choose' | 'pronounce',
        })),
      };

      await addCourse(courseData);
      setChatMessages(prev => [...prev,
        { role: 'ai', text: `✅ Cours créé : "${res.title}" — basé sur tes ${summary.total_errors} erreurs. Va le consulter dans la liste !` },
      ]);
      reload();
    } catch (err: any) {
      setChatMessages(prev => [...prev,
        { role: 'ai', text: `❌ Erreur : ${err?.message || 'Impossible. Vérifiez votre clé API.'}` },
      ]);
    } finally {
      setIsGenerating(false);
    }
  };

  const filteredCourses = recentCourses.filter(c => {
    if (filter === 'all') return true;
    if (filter === 'starred') return c.starred;
    return c.type === filter;
  });

  // ── CHAT VIEW ───────────────────────────────────────────────────────────
  if (view === 'chat') {
    return (
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <View style={styles.header}>
            <TouchableOpacity onPress={() => setView('list')} style={styles.backBtn}>
              <Ionicons name="arrow-back" size={22} color={colors.text} />
            </TouchableOpacity>
            <View style={{ flex: 1 }}>
              <Text style={styles.headerTitle}>Créer un cours IA</Text>
              <Text style={styles.headerSubtitle}>Demande n'importe quel sujet</Text>
            </View>
          </View>

          {/* Quick actions */}
          <View style={styles.quickActionsRow}>
            <TouchableOpacity
              style={[styles.quickActionBtn, isGenerating && { opacity: 0.5 }]}
              onPress={generateFromErrors}
              disabled={isGenerating}
            >
              <Ionicons name="analytics" size={14} color={colors.secondary} />
              <Text style={styles.quickActionText}>Depuis mes erreurs</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.quickActionBtn, isGenerating && { opacity: 0.5 }]}
              onPress={() => setChatInput('Explique-moi les règles du pluriel en arabe')}
              disabled={isGenerating}
            >
              <Ionicons name="bulb" size={14} color={colors.primary} />
              <Text style={styles.quickActionText}>Exemple de question</Text>
            </TouchableOpacity>
          </View>

          {/* Chat messages */}
          <ScrollView
            style={styles.chatContainer}
            contentContainerStyle={styles.chatContent}
            showsVerticalScrollIndicator={false}
          >
            {chatMessages.map((msg, i) => (
              <View
                key={i}
                style={[
                  styles.chatBubble,
                  msg.role === 'user' ? styles.chatBubbleUser : styles.chatBubbleAI,
                ]}
              >
                <Text style={[
                  styles.chatBubbleText,
                  msg.role === 'user' && styles.chatBubbleTextUser,
                ]}>
                  {msg.text}
                </Text>
              </View>
            ))}
            {isGenerating && (
              <View style={styles.generatingRow}>
                <LoadingSpinner size="sm" />
                <Text style={styles.generatingText}>Génération du cours en cours...</Text>
              </View>
            )}
          </ScrollView>

          {/* Input */}
          <View style={styles.chatInputBar}>
            <TextInput
              style={styles.chatInput}
              value={chatInput}
              onChangeText={setChatInput}
              placeholder="Ex: Explique le dual en arabe..."
              placeholderTextColor={colors.textMuted}
              multiline
              editable={!isGenerating}
            />
            <TouchableOpacity
              style={[styles.chatSendBtn, (!chatInput.trim() || isGenerating) && { opacity: 0.4 }]}
              onPress={sendChatMessage}
              disabled={!chatInput.trim() || isGenerating}
            >
              <Ionicons name="send" size={18} color={colors.white} />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }

  // ── DETAIL VIEW ─────────────────────────────────────────────────────────
  if (view === 'detail' && selectedCourse) {
    const meta = TYPE_META[selectedCourse.type] || TYPE_META.vocabulary;

    return (
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.detailContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => { setView('list'); setSelectedCourse(null); }} style={styles.backBtn}>
              <Ionicons name="arrow-back" size={22} color={colors.text} />
            </TouchableOpacity>
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={styles.headerTitle} numberOfLines={2}>
                {selectedCourse.title}
              </Text>
              <View style={[styles.typeBadge, { backgroundColor: `${meta.color}18` }]}>
                <Text style={[styles.typeBadgeText, { color: meta.color }]}>
                  {meta.emoji} {meta.label}
                </Text>
              </View>
            </View>
            <TouchableOpacity onPress={() => toggleStar(selectedCourse.id)} style={styles.iconBtn}>
              <Ionicons
                name={selectedCourse.starred ? 'star' : 'star-outline'}
                size={22}
                color={selectedCourse.starred ? '#f59e0b' : colors.textMuted}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleDeleteCourse(selectedCourse)}
              style={[styles.iconBtn, { marginLeft: 4 }]}
            >
              <Ionicons name="trash-outline" size={20} color={colors.destructive} />
            </TouchableOpacity>
          </View>

          {/* Source banner */}
          <View style={[styles.sourceBanner, { backgroundColor: `${meta.color}10` }]}>
            <Ionicons name="information-circle" size={16} color={meta.color} />
            <Text style={[styles.sourceText, { color: meta.color }]}>
              {SOURCE_LABEL[selectedCourse.source] || selectedCourse.source} · {selectedCourse.trigger_topic}
            </Text>
          </View>

          {/* Summary */}
          <Card style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>📋 En résumé</Text>
            <Text style={styles.bodyText}>{selectedCourse.summary}</Text>
          </Card>

          {/* Explanation */}
          <Card style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>📖 Explication</Text>
            <Text style={styles.bodyText}>{selectedCourse.explanation}</Text>
          </Card>

          {/* Key words */}
          {selectedCourse.arabic_words?.length > 0 && (
            <Card style={styles.sectionCard}>
              <Text style={styles.sectionTitle}>🔑 Mots clés</Text>
              {selectedCourse.arabic_words.map((w, i) => (
                <TouchableOpacity key={i} style={styles.wordRow} onPress={() => speakArabic(w.arabic)}>
                  <Text style={styles.wordArabic}>{w.arabic}</Text>
                  <View style={styles.wordInfo}>
                    <Text style={styles.wordTranslit}>{w.transliteration}</Text>
                    <Text style={styles.wordMeaning}>{w.meaning}</Text>
                  </View>
                  <View style={styles.speakCircle}>
                    <Ionicons name="volume-high" size={16} color={colors.primary} />
                  </View>
                </TouchableOpacity>
              ))}
            </Card>
          )}

          {/* Examples */}
          {selectedCourse.examples?.length > 0 && (
            <Card style={styles.sectionCard}>
              <Text style={styles.sectionTitle}>💬 Exemples</Text>
              {selectedCourse.examples.map((ex, i) => (
                <TouchableOpacity key={i} style={styles.exampleItem} onPress={() => speakArabic(ex.arabic)}>
                  <View style={styles.exampleContent}>
                    <Text style={styles.exampleArabic}>{ex.arabic}</Text>
                    <Text style={styles.exampleTranslit}>{ex.transliteration}</Text>
                    <Text style={styles.exampleFrench}>{ex.french}</Text>
                    {ex.note ? <Text style={styles.exampleNote}>💡 {ex.note}</Text> : null}
                  </View>
                  <Ionicons name="volume-medium" size={18} color={colors.primary} style={{ marginLeft: 8, marginTop: 4 }} />
                </TouchableOpacity>
              ))}
            </Card>
          )}

          {/* Tips */}
          {selectedCourse.tips?.length > 0 && (
            <Card style={[styles.sectionCard, { backgroundColor: `${meta.color}08` }]}>
              <Text style={styles.sectionTitle}>✨ Conseils pour Fatima</Text>
              {selectedCourse.tips.map((tip, i) => (
                <View key={i} style={styles.tipRow}>
                  <Text style={[styles.tipDot, { color: meta.color }]}>•</Text>
                  <Text style={styles.tipText}>{tip}</Text>
                </View>
              ))}
            </Card>
          )}

          {/* Exercises */}
          {selectedCourse.exercises?.length > 0 && (
            <Card style={styles.sectionCard}>
              <Text style={styles.sectionTitle}>🎯 Exercices</Text>
              {selectedCourse.exercises.map((ex, i) => (
                <View key={i} style={styles.exerciseBlock}>
                  <Text style={styles.exerciseInstruction}>{i + 1}. {ex.instruction}</Text>
                  <View style={styles.exerciseQuestion}>
                    <Text style={styles.exerciseQuestionText}>{ex.question}</Text>
                  </View>

                  {ex.options && ex.options.length > 0 && !showAnswers[i] && (
                    <View style={styles.optionsRow}>
                      {ex.options.map((opt, oi) => (
                        <TouchableOpacity
                          key={oi}
                          style={[styles.optionBtn, exerciseAnswers[i] === opt && styles.optionBtnSelected]}
                          onPress={() => setExerciseAnswers(prev => ({ ...prev, [i]: opt }))}
                        >
                          <Text style={[styles.optionText, exerciseAnswers[i] === opt && styles.optionTextSelected]}>
                            {opt}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}

                  <TouchableOpacity
                    style={styles.showAnswerBtn}
                    onPress={() => setShowAnswers(prev => ({ ...prev, [i]: !prev[i] }))}
                  >
                    <Text style={styles.showAnswerBtnText}>
                      {showAnswers[i] ? 'Masquer la réponse' : 'Voir la réponse'}
                    </Text>
                  </TouchableOpacity>

                  {showAnswers[i] && (
                    <TouchableOpacity style={styles.answerBox} onPress={() => speakArabic(ex.answer)}>
                      <Text style={styles.answerLabel}>Réponse :</Text>
                      <Text style={styles.answerText}>{ex.answer}</Text>
                      <Ionicons name="volume-high" size={16} color={colors.primary} />
                    </TouchableOpacity>
                  )}
                </View>
              ))}
            </Card>
          )}

          <View style={{ height: 40 }} />
        </ScrollView>
      </SafeAreaView>
    );
  }

  // ── LIST VIEW ────────────────────────────────────────────────────────────
  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={{ flex: 1 }}>
            <Text style={styles.headerTitle}>Mes Cours</Text>
            <Text style={styles.headerSubtitle}>
              {recentCourses.length} cours · {unreadCount > 0 ? `${unreadCount} nouveau${unreadCount > 1 ? 'x' : ''}` : 'tout lu'}
            </Text>
          </View>
          {/* Chat button */}
          <TouchableOpacity
            style={styles.createCourseBtn}
            onPress={() => setView('chat')}
          >
            <Ionicons name="add-circle" size={16} color={colors.white} />
            <Text style={styles.createCourseBtnText}>Créer</Text>
          </TouchableOpacity>
        </View>

        {/* Filters */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginBottom: 14 }}
          contentContainerStyle={{ gap: 8, paddingRight: 8 }}
        >
          <FilterChip label="Tout" active={filter === 'all'} onPress={() => setFilter('all')} />
          <FilterChip label="⭐ Favoris" active={filter === 'starred'} onPress={() => setFilter('starred')} />
          {Object.entries(TYPE_META).map(([type, meta]) => (
            <FilterChip
              key={type}
              label={`${meta.emoji} ${meta.label}`}
              active={filter === type}
              onPress={() => setFilter(type as FilterType)}
            />
          ))}
        </ScrollView>

        {/* Empty state */}
        {filteredCourses.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyEmoji}>📚</Text>
            <Text style={styles.emptyTitle}>Aucun cours encore</Text>
            <Text style={styles.emptyBody}>
              {filter === 'all'
                ? "Pratique la conversation — l'IA créera des cours automatiquement. Ou clique sur \"Créer\" pour en demander un !"
                : `Pas de cours de ce type pour l'instant.`}
            </Text>
            <TouchableOpacity style={styles.emptyCreateBtn} onPress={() => setView('chat')}>
              <Ionicons name="add-circle" size={18} color={colors.white} />
              <Text style={styles.emptyCreateBtnText}>Créer mon premier cours</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Course cards */}
        {filteredCourses.map(course => {
          const meta = TYPE_META[course.type] || TYPE_META.vocabulary;
          const age = Date.now() - new Date(course.created_at).getTime();
          const ageStr = age < 3600000
            ? `${Math.round(age / 60000)} min`
            : age < 86400000 ? `${Math.round(age / 3600000)} h`
            : `${Math.round(age / 86400000)} j`;

          return (
            <TouchableOpacity
              key={course.id}
              style={[styles.courseCard, !course.read && styles.courseCardUnread]}
              onPress={() => openCourse(course)}
              activeOpacity={0.8}
            >
              <View style={[styles.courseIcon, { backgroundColor: `${meta.color}18` }]}>
                <Text style={{ fontSize: 22 }}>{meta.emoji}</Text>
              </View>
              <View style={styles.courseBody}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                  <Text style={styles.courseTitle} numberOfLines={1}>{course.title}</Text>
                  {!course.read && <View style={styles.newDot} />}
                </View>
                <Text style={styles.courseSummary} numberOfLines={2}>{course.summary}</Text>
                <View style={styles.courseMeta}>
                  <View style={[styles.courseTypePill, { backgroundColor: `${meta.color}12` }]}>
                    <Text style={[styles.courseTypeText, { color: meta.color }]}>{meta.label}</Text>
                  </View>
                  <Text style={styles.courseAge}>{ageStr}</Text>
                  {course.starred && <Ionicons name="star" size={12} color="#f59e0b" />}
                </View>
              </View>

              {/* Actions */}
              <View style={styles.courseActions}>
                <TouchableOpacity
                  onPress={(e) => { e.stopPropagation?.(); toggleStar(course.id); }}
                  style={styles.courseActionBtn}
                >
                  <Ionicons
                    name={course.starred ? 'star' : 'star-outline'}
                    size={16}
                    color={course.starred ? '#f59e0b' : colors.textMuted}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={(e) => { e.stopPropagation?.(); handleDeleteCourse(course); }}
                  style={styles.courseActionBtn}
                >
                  <Ionicons name="trash-outline" size={16} color={colors.destructive} />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          );
        })}

        <View style={{ height: 80 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

function FilterChip({ label, active, onPress }: { label: string; active: boolean; onPress: () => void }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.filterChip, active && styles.filterChipActive]}
      activeOpacity={0.8}
    >
      <Text style={[styles.filterChipText, active && styles.filterChipTextActive]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  container: { flex: 1 },
  listContent: { paddingHorizontal: 16, paddingTop: 16, paddingBottom: 120 },
  detailContent: { paddingHorizontal: 16, paddingTop: 16, paddingBottom: 120 },

  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  headerTitle: { fontSize: 22, fontWeight: '700', color: colors.text },
  headerSubtitle: { fontSize: 13, color: colors.textMuted, marginTop: 2 },
  backBtn: {
    padding: 8, borderRadius: borderRadius.md,
    backgroundColor: `${colors.textMuted}15`, marginRight: 10,
  },
  iconBtn: { padding: 8 },

  createCourseBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 5,
    backgroundColor: colors.primary,
    paddingHorizontal: 12, paddingVertical: 8,
    borderRadius: borderRadius.full,
  },
  createCourseBtnText: { color: colors.white, fontSize: 13, fontWeight: '700' },

  filterChip: {
    paddingHorizontal: 14, paddingVertical: 7,
    borderRadius: borderRadius.full,
    backgroundColor: `${colors.textMuted}12`,
  },
  filterChipActive: { backgroundColor: colors.primary },
  filterChipText: { fontSize: 12, fontWeight: '600', color: colors.textMuted },
  filterChipTextActive: { color: colors.white },

  emptyState: { alignItems: 'center', paddingTop: 40, paddingHorizontal: 20 },
  emptyEmoji: { fontSize: 56, marginBottom: 16 },
  emptyTitle: { fontSize: 20, fontWeight: '700', color: colors.text, marginBottom: 10 },
  emptyBody: {
    fontSize: 15, color: colors.textMuted, textAlign: 'center',
    lineHeight: 22, marginBottom: 24,
  },
  emptyCreateBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    backgroundColor: colors.primary, paddingHorizontal: 20,
    paddingVertical: 12, borderRadius: borderRadius['2xl'],
  },
  emptyCreateBtnText: { color: colors.white, fontSize: 15, fontWeight: '700' },

  courseCard: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: colors.card, borderRadius: borderRadius['2xl'],
    borderWidth: 1, borderColor: colors.border,
    padding: 12, marginBottom: 10,
  },
  courseCardUnread: {
    borderColor: `${colors.primary}40`,
    backgroundColor: `${colors.primary}04`,
  },
  courseIcon: {
    width: 46, height: 46, borderRadius: 23,
    justifyContent: 'center', alignItems: 'center',
    marginRight: 12, flexShrink: 0,
  },
  courseBody: { flex: 1, marginRight: 4 },
  courseTitle: { fontSize: 15, fontWeight: '700', color: colors.text, flex: 1 },
  newDot: {
    width: 8, height: 8, borderRadius: 4,
    backgroundColor: colors.primary, flexShrink: 0,
  },
  courseSummary: { fontSize: 13, color: colors.textMuted, lineHeight: 18, marginBottom: 6 },
  courseMeta: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  courseTypePill: {
    paddingHorizontal: 8, paddingVertical: 3, borderRadius: borderRadius.full,
  },
  courseTypeText: { fontSize: 10, fontWeight: '700' },
  courseAge: { fontSize: 10, color: colors.textMuted },
  courseActions: { flexDirection: 'column', gap: 4, alignItems: 'center' },
  courseActionBtn: {
    width: 30, height: 30, borderRadius: 15,
    justifyContent: 'center', alignItems: 'center',
    backgroundColor: `${colors.textMuted}10`,
  },

  // Detail
  sectionCard: { marginBottom: 10 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: colors.text, marginBottom: 12 },
  bodyText: { fontSize: 15, color: colors.text, lineHeight: 24 },

  sourceBanner: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    borderRadius: borderRadius.lg, paddingVertical: 10, paddingHorizontal: 12,
    marginBottom: 12,
  },
  sourceText: { fontSize: 13, fontWeight: '600', flex: 1 },
  typeBadge: {
    alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 4,
    borderRadius: borderRadius.full, marginTop: 4,
  },
  typeBadgeText: { fontSize: 12, fontWeight: '700' },

  wordRow: {
    flexDirection: 'row', alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1, borderBottomColor: `${colors.border}60`,
  },
  wordArabic: {
    fontSize: 30, fontWeight: '700', color: colors.text,
    textAlign: 'right', width: 100, marginRight: 14,
  },
  wordInfo: { flex: 1 },
  wordTranslit: { fontSize: 14, color: colors.primary, fontStyle: 'italic' },
  wordMeaning: { fontSize: 15, fontWeight: '600', color: colors.text, marginTop: 2 },
  speakCircle: {
    width: 32, height: 32, borderRadius: 16,
    backgroundColor: `${colors.primary}12`,
    justifyContent: 'center', alignItems: 'center',
  },

  exampleItem: {
    flexDirection: 'row', alignItems: 'flex-start',
    paddingVertical: 12,
    borderBottomWidth: 1, borderBottomColor: `${colors.border}50`,
  },
  exampleContent: { flex: 1 },
  exampleArabic: {
    fontSize: 28, fontWeight: '700', color: colors.text,
    textAlign: 'right', lineHeight: 40,
  },
  exampleTranslit: { fontSize: 14, color: colors.primary, fontStyle: 'italic', marginTop: 4 },
  exampleFrench: { fontSize: 16, color: colors.text, marginTop: 3 },
  exampleNote: { fontSize: 13, color: colors.textMuted, marginTop: 4, fontStyle: 'italic' },

  tipRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 8, marginBottom: 8 },
  tipDot: { fontSize: 18, lineHeight: 24 },
  tipText: { fontSize: 15, color: colors.text, lineHeight: 22, flex: 1 },

  exerciseBlock: {
    marginBottom: 16, paddingBottom: 16,
    borderBottomWidth: 1, borderBottomColor: `${colors.border}50`,
  },
  exerciseInstruction: { fontSize: 15, fontWeight: '600', color: colors.text, marginBottom: 8 },
  exerciseQuestion: {
    backgroundColor: `${colors.primary}08`, borderRadius: borderRadius.lg,
    padding: 12, marginBottom: 10,
  },
  exerciseQuestionText: { fontSize: 16, color: colors.text, lineHeight: 22 },
  optionsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 10 },
  optionBtn: {
    paddingHorizontal: 14, paddingVertical: 8,
    borderRadius: borderRadius.full,
    backgroundColor: `${colors.textMuted}10`,
    borderWidth: 1, borderColor: `${colors.textMuted}20`,
  },
  optionBtnSelected: {
    backgroundColor: `${colors.primary}15`, borderColor: colors.primary,
  },
  optionText: { fontSize: 15, color: colors.text },
  optionTextSelected: { color: colors.primary, fontWeight: '700' },
  showAnswerBtn: { paddingVertical: 8, alignItems: 'center' },
  showAnswerBtnText: { fontSize: 13, color: colors.primary, fontWeight: '600' },
  answerBox: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    backgroundColor: `${colors.primary}10`, borderRadius: borderRadius.lg,
    padding: 12, borderWidth: 1, borderColor: `${colors.primary}20`,
  },
  answerLabel: { fontSize: 13, color: colors.textMuted, fontWeight: '600' },
  answerText: { flex: 1, fontSize: 16, fontWeight: '700', color: colors.primary },

  // Chat view
  quickActionsRow: {
    flexDirection: 'row', gap: 10,
    paddingHorizontal: 16, marginBottom: 12,
  },
  quickActionBtn: {
    flex: 1, flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: `${colors.primary}08`,
    borderRadius: borderRadius.xl, padding: 10,
    borderWidth: 1, borderColor: `${colors.primary}15`,
  },
  quickActionText: { fontSize: 12, color: colors.text, fontWeight: '600', flex: 1 },

  chatContainer: { flex: 1, backgroundColor: colors.background },
  chatContent: { padding: 16, paddingBottom: 12 },

  chatBubble: {
    maxWidth: '85%', borderRadius: borderRadius.xl,
    paddingHorizontal: 14, paddingVertical: 10, marginBottom: 10,
  },
  chatBubbleUser: {
    alignSelf: 'flex-end', backgroundColor: colors.primary,
  },
  chatBubbleAI: {
    alignSelf: 'flex-start',
    backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border,
  },
  chatBubbleText: { fontSize: 15, color: colors.text, lineHeight: 22 },
  chatBubbleTextUser: { color: colors.white },

  generatingRow: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    padding: 12, backgroundColor: `${colors.primary}08`,
    borderRadius: borderRadius.lg, marginBottom: 10,
  },
  generatingText: { fontSize: 14, color: colors.textMuted },

  chatInputBar: {
    flexDirection: 'row', alignItems: 'flex-end',
    paddingHorizontal: 12, paddingVertical: 10,
    paddingBottom: Platform.OS === 'ios' ? 24 : 12,
    backgroundColor: colors.card,
    borderTopWidth: 1, borderTopColor: colors.border, gap: 8,
  },
  chatInput: {
    flex: 1, backgroundColor: colors.background,
    borderRadius: borderRadius.xl,
    paddingHorizontal: 14, paddingVertical: 10,
    fontSize: 15, maxHeight: 100,
    borderWidth: 1, borderColor: colors.border, color: colors.text,
  },
  chatSendBtn: {
    width: 42, height: 42, borderRadius: 21,
    backgroundColor: colors.primary,
    justifyContent: 'center', alignItems: 'center',
  },
});