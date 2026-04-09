import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Speech from 'expo-speech';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { useCourses, CourseLesson, CourseType } from '../lib/useCourses';
import { Card } from '../components/RNComponents';
import { colors, borderRadius, fontSize } from '../theme';

const TYPE_META: Record<CourseType, { label: string; emoji: string; color: string }> = {
  grammar:       { label: 'Grammaire',     emoji: '📐', color: '#6366f1' },
  pronunciation: { label: 'Prononciation', emoji: '🗣️', color: '#f59e0b' },
  vocabulary:    { label: 'Vocabulaire',   emoji: '📚', color: '#10b981' },
  writing:       { label: 'Écriture',      emoji: '✍️', color: '#3b82f6' },
  culture:       { label: 'Culture',       emoji: '🌙', color: '#ec4899' },
};

const SOURCE_LABEL: Record<string, string> = {
  error:        "Détecté lors d'une erreur",
  conversation: 'Depuis une conversation',
  manual:       'Ajouté manuellement',
};

type FilterType = 'all' | CourseType | 'starred';

export default function CoursScreen() {
  const { recentCourses, unreadCount, markRead, toggleStar, deleteCourse, loading, reload } = useCourses();
  const [selectedCourse, setSelectedCourse] = useState<CourseLesson | null>(null);
  const [filter, setFilter] = useState<FilterType>('all');
  const [activeExercise, setActiveExercise] = useState<number | null>(null);
  const [exerciseAnswers, setExerciseAnswers] = useState<Record<number, string>>({});
  const [showAnswers, setShowAnswers] = useState<Record<number, boolean>>({});

  useFocusEffect(useCallback(() => { reload(); }, []));

  const speakArabic = (text: string) => {
    Speech.speak(text, { language: 'ar-SA', rate: 0.8 });
  };

  const openCourse = async (course: CourseLesson) => {
    setSelectedCourse(course);
    setActiveExercise(null);
    setExerciseAnswers({});
    setShowAnswers({});
    if (!course.read) await markRead(course.id);
  };

  const filteredCourses = recentCourses.filter(c => {
    if (filter === 'all') return true;
    if (filter === 'starred') return c.starred;
    return c.type === filter;
  });

  // ── DETAIL VIEW ──────────────────────────────────────────────────────────
  if (selectedCourse) {
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
            <TouchableOpacity
              onPress={() => setSelectedCourse(null)}
              style={styles.backBtn}
            >
              <Ionicons name="arrow-back" size={22} color={colors.text} />
            </TouchableOpacity>
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={styles.headerTitle} numberOfLines={2}>
                {selectedCourse.title}
              </Text>
              <View style={styles.headerMeta}>
                <View style={[styles.typeBadge, { backgroundColor: `${meta.color}18` }]}>
                  <Text style={styles.typeBadgeText}>{meta.emoji} {meta.label}</Text>
                </View>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => toggleStar(selectedCourse.id)}
              style={styles.starBtn}
            >
              <Ionicons
                name={selectedCourse.starred ? 'star' : 'star-outline'}
                size={22}
                color={selectedCourse.starred ? '#f59e0b' : colors.textMuted}
              />
            </TouchableOpacity>
          </View>

          {/* Résumé source */}
          <View style={[styles.sourceBanner, { backgroundColor: `${meta.color}10` }]}>
            <Ionicons name="information-circle" size={16} color={meta.color} />
            <Text style={[styles.sourceText, { color: meta.color }]}>
              {SOURCE_LABEL[selectedCourse.source]} · {selectedCourse.trigger_topic}
            </Text>
          </View>

          {/* Résumé */}
          <Card style={styles.summaryCard}>
            <Text style={styles.sectionTitle}>📋 En résumé</Text>
            <Text style={styles.summaryText}>{selectedCourse.summary}</Text>
          </Card>

          {/* Explication */}
          <Card style={styles.explanationCard}>
            <Text style={styles.sectionTitle}>📖 Explication</Text>
            <Text style={styles.explanationText}>{selectedCourse.explanation}</Text>
          </Card>

          {/* Mots arabes clés */}
          {selectedCourse.arabic_words?.length > 0 && (
            <Card style={styles.wordsCard}>
              <Text style={styles.sectionTitle}>🔑 Mots clés</Text>
              {selectedCourse.arabic_words.map((w, i) => (
                <TouchableOpacity
                  key={i}
                  style={styles.wordRow}
                  onPress={() => speakArabic(w.arabic)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.wordArabic}>{w.arabic}</Text>
                  <View style={styles.wordRight}>
                    <Text style={styles.wordTranslit}>{w.transliteration}</Text>
                    <Text style={styles.wordMeaning}>{w.meaning}</Text>
                  </View>
                  <View style={styles.speakIcon}>
                    <Ionicons name="volume-high" size={16} color={colors.primary} />
                  </View>
                </TouchableOpacity>
              ))}
            </Card>
          )}

          {/* Exemples */}
          {selectedCourse.examples?.length > 0 && (
            <Card style={styles.examplesCard}>
              <Text style={styles.sectionTitle}>💬 Exemples</Text>
              {selectedCourse.examples.map((ex, i) => (
                <TouchableOpacity
                  key={i}
                  style={styles.exampleItem}
                  onPress={() => speakArabic(ex.arabic)}
                  activeOpacity={0.8}
                >
                  <View style={styles.exampleContent}>
                    <Text style={styles.exampleArabic}>{ex.arabic}</Text>
                    <Text style={styles.exampleTranslit}>{ex.transliteration}</Text>
                    <Text style={styles.exampleFrench}>{ex.french}</Text>
                    {ex.note && <Text style={styles.exampleNote}>💡 {ex.note}</Text>}
                  </View>
                  <Ionicons name="volume-medium" size={18} color={colors.primary} style={styles.exampleSpeak} />
                </TouchableOpacity>
              ))}
            </Card>
          )}

          {/* Conseils — style fusionné pour éviter le tableau sur Card */}
          {selectedCourse.tips?.length > 0 && (
            <Card style={StyleSheet.flatten([styles.tipsCard, { backgroundColor: `${meta.color}08` }])}>
              <Text style={styles.sectionTitle}>✨ Conseils pour Fatima</Text>
              {selectedCourse.tips.map((tip, i) => (
                <View key={i} style={styles.tipRow}>
                  <Text style={[styles.tipDot, { color: meta.color }]}>•</Text>
                  <Text style={styles.tipText}>{tip}</Text>
                </View>
              ))}
            </Card>
          )}

          {/* Exercices */}
          {selectedCourse.exercises?.length > 0 && (
            <Card style={styles.exercisesCard}>
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
                          style={[
                            styles.optionBtn,
                            exerciseAnswers[i] === opt && styles.optionBtnSelected,
                          ]}
                          onPress={() => setExerciseAnswers(prev => ({ ...prev, [i]: opt }))}
                        >
                          <Text style={[
                            styles.optionText,
                            exerciseAnswers[i] === opt && styles.optionTextSelected,
                          ]}>
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
                    <TouchableOpacity
                      style={styles.answerBox}
                      onPress={() => speakArabic(ex.answer)}
                      activeOpacity={0.8}
                    >
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
              {recentCourses.length} leçon{recentCourses.length > 1 ? 's' : ''} disponible{recentCourses.length > 1 ? 's' : ''}
              {unreadCount > 0 && ` · ${unreadCount} nouvelle${unreadCount > 1 ? 's' : ''}`}
            </Text>
          </View>
          {unreadCount > 0 && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadBadgeText}>{unreadCount}</Text>
            </View>
          )}
        </View>

        {/* Filters */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filtersScroll}
          contentContainerStyle={styles.filtersContent}
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
                ? "Pratique la conversation et l'écriture. L'IA créera des cours personnalisés basés sur tes erreurs, Fatima !"
                : `Pas de cours de type "${filter}" pour l'instant.`}
            </Text>
            <View style={styles.emptyHints}>
              {["💬 Fais une conversation", "✍️ Pratique l'écriture", '🎯 Pose des questions à l\'IA'].map((h, i) => (
                <View key={i} style={styles.emptyHint}>
                  <Text style={styles.emptyHintText}>{h}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Course cards */}
        {filteredCourses.map(course => {
          const meta = TYPE_META[course.type] || TYPE_META.vocabulary;
          const age = Date.now() - new Date(course.created_at).getTime();
          const ageStr = age < 3600000
            ? `${Math.round(age / 60000)} min`
            : age < 86400000
            ? `${Math.round(age / 3600000)} h`
            : `${Math.round(age / 86400000)} j`;

          return (
            <TouchableOpacity
              key={course.id}
              style={[styles.courseCard, !course.read && styles.courseCardUnread]}
              onPress={() => openCourse(course)}
              activeOpacity={0.8}
            >
              <View style={[styles.courseIcon, { backgroundColor: `${meta.color}18` }]}>
                <Text style={styles.courseEmoji}>{meta.emoji}</Text>
              </View>
              <View style={styles.courseBody}>
                <View style={styles.courseTopRow}>
                  <Text style={styles.courseTitle} numberOfLines={1}>{course.title}</Text>
                  {!course.read && <View style={styles.newDot} />}
                </View>
                <Text style={styles.courseSummary} numberOfLines={2}>{course.summary}</Text>
                <View style={styles.courseMeta}>
                  <View style={[styles.courseTypePill, { backgroundColor: `${meta.color}12` }]}>
                    <Text style={[styles.courseTypeText, { color: meta.color }]}>{meta.label}</Text>
                  </View>
                  <Text style={styles.courseAge}>{ageStr}</Text>
                  {course.starred && (
                    <Ionicons name="star" size={12} color="#f59e0b" />
                  )}
                </View>
              </View>
              <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
            </TouchableOpacity>
          );
        })}

        <View style={{ height: 80 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

function FilterChip({
  label, active, onPress,
}: { label: string; active: boolean; onPress: () => void }) {
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

  header: {
    flexDirection: 'row', alignItems: 'center', marginBottom: 16,
  },
  headerTitle: {
    fontSize: fontSize.xl, fontWeight: '700', color: colors.text,
  },
  headerSubtitle: {
    fontSize: fontSize.xs, color: colors.textMuted, marginTop: 2,
  },
  headerMeta: { flexDirection: 'row', marginTop: 4, gap: 6 },
  backBtn: {
    padding: 8, borderRadius: borderRadius.md,
    backgroundColor: `${colors.textMuted}15`, marginRight: 2,
  },
  starBtn: { padding: 8 },
  unreadBadge: {
    width: 26, height: 26, borderRadius: 13,
    backgroundColor: colors.primary, justifyContent: 'center', alignItems: 'center',
  },
  unreadBadgeText: { color: colors.white, fontSize: 11, fontWeight: '800' },

  filtersScroll: { marginBottom: 16 },
  filtersContent: { paddingRight: 8, gap: 8 },
  filterChip: {
    paddingHorizontal: 14, paddingVertical: 7,
    borderRadius: borderRadius.full,
    backgroundColor: `${colors.textMuted}12`,
    borderWidth: 1, borderColor: 'transparent',
  },
  filterChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterChipText: { fontSize: fontSize.xs, fontWeight: '600', color: colors.textMuted },
  filterChipTextActive: { color: colors.white },

  emptyState: {
    alignItems: 'center', paddingTop: 40, paddingHorizontal: 20,
  },
  emptyEmoji: { fontSize: 56, marginBottom: 16 },
  emptyTitle: {
    fontSize: fontSize.xl, fontWeight: '700', color: colors.text, marginBottom: 10,
  },
  emptyBody: {
    fontSize: fontSize.sm, color: colors.textMuted, textAlign: 'center',
    lineHeight: 22, marginBottom: 24,
  },
  emptyHints: { gap: 10, width: '100%' },
  emptyHint: {
    backgroundColor: `${colors.primary}08`,
    borderRadius: borderRadius.xl,
    paddingVertical: 12, paddingHorizontal: 16,
    borderWidth: 1, borderColor: `${colors.primary}15`,
  },
  emptyHintText: { fontSize: fontSize.sm, color: colors.text, textAlign: 'center' },

  courseCard: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: borderRadius['2xl'],
    borderWidth: 1, borderColor: colors.border,
    padding: 14, marginBottom: 10,
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
  courseEmoji: { fontSize: 22 },
  courseBody: { flex: 1, marginRight: 8 },
  courseTopRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 4 },
  courseTitle: { fontSize: fontSize.base, fontWeight: '700', color: colors.text, flex: 1 },
  newDot: {
    width: 8, height: 8, borderRadius: 4,
    backgroundColor: colors.primary, flexShrink: 0,
  },
  courseSummary: { fontSize: fontSize.xs, color: colors.textMuted, lineHeight: 18, marginBottom: 8 },
  courseMeta: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  courseTypePill: {
    paddingHorizontal: 8, paddingVertical: 3, borderRadius: borderRadius.full,
  },
  courseTypeText: { fontSize: 9, fontWeight: '700' },
  courseAge: { fontSize: 10, color: colors.textMuted },

  // Detail
  sourceBanner: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    borderRadius: borderRadius.lg, paddingVertical: 10, paddingHorizontal: 12,
    marginBottom: 12,
  },
  sourceText: { fontSize: fontSize.xs, fontWeight: '600', flex: 1 },
  typeBadge: {
    paddingHorizontal: 10, paddingVertical: 4, borderRadius: borderRadius.full,
  },
  typeBadgeText: { fontSize: fontSize.xs, fontWeight: '700', color: colors.text },

  summaryCard: { marginBottom: 10 },
  summaryText: { fontSize: fontSize.base, color: colors.text, lineHeight: 24 },
  explanationCard: { marginBottom: 10 },
  explanationText: { fontSize: fontSize.sm, color: colors.text, lineHeight: 24 },

  wordsCard: { marginBottom: 10 },
  wordRow: {
    flexDirection: 'row', alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1, borderBottomColor: `${colors.border}60`,
  },
  wordArabic: {
    fontSize: 28, fontWeight: '700', color: colors.text,
    textAlign: 'right', width: 90, marginRight: 14,
  },
  wordRight: { flex: 1 },
  wordTranslit: { fontSize: fontSize.sm, color: colors.primary, fontStyle: 'italic' },
  wordMeaning: { fontSize: fontSize.base, fontWeight: '600', color: colors.text, marginTop: 2 },
  speakIcon: {
    width: 32, height: 32, borderRadius: 16,
    backgroundColor: `${colors.primary}12`,
    justifyContent: 'center', alignItems: 'center',
  },

  examplesCard: { marginBottom: 10 },
  exampleItem: {
    flexDirection: 'row', alignItems: 'flex-start',
    paddingVertical: 12,
    borderBottomWidth: 1, borderBottomColor: `${colors.border}50`,
  },
  exampleContent: { flex: 1 },
  exampleArabic: {
    fontSize: 26, fontWeight: '700', color: colors.text,
    textAlign: 'right', lineHeight: 36,
  },
  exampleTranslit: { fontSize: fontSize.sm, color: colors.primary, fontStyle: 'italic', marginTop: 4 },
  exampleFrench: { fontSize: fontSize.base, color: colors.text, marginTop: 3 },
  exampleNote: { fontSize: fontSize.xs, color: colors.textMuted, marginTop: 4, fontStyle: 'italic' },
  exampleSpeak: { marginLeft: 10, marginTop: 8, padding: 4 },

  // tipsCard sans backgroundColor ici — il est injecté via StyleSheet.flatten dans le JSX
  tipsCard: { marginBottom: 10 },
  tipRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 8, marginBottom: 8 },
  tipDot: { fontSize: 18, lineHeight: 22 },
  tipText: { fontSize: fontSize.sm, color: colors.text, lineHeight: 22, flex: 1 },

  exercisesCard: { marginBottom: 10 },
  exerciseBlock: {
    marginBottom: 16, paddingBottom: 16,
    borderBottomWidth: 1, borderBottomColor: `${colors.border}50`,
  },
  exerciseInstruction: { fontSize: fontSize.sm, fontWeight: '600', color: colors.text, marginBottom: 8 },
  exerciseQuestion: {
    backgroundColor: `${colors.primary}08`, borderRadius: borderRadius.lg,
    padding: 12, marginBottom: 10,
  },
  exerciseQuestionText: { fontSize: fontSize.base, color: colors.text, lineHeight: 22 },
  optionsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 10 },
  optionBtn: {
    paddingHorizontal: 14, paddingVertical: 8,
    borderRadius: borderRadius.full,
    backgroundColor: `${colors.textMuted}10`,
    borderWidth: 1, borderColor: `${colors.textMuted}20`,
  },
  optionBtnSelected: {
    backgroundColor: `${colors.primary}15`,
    borderColor: colors.primary,
  },
  optionText: { fontSize: fontSize.sm, color: colors.text },
  optionTextSelected: { color: colors.primary, fontWeight: '700' },
  showAnswerBtn: { paddingVertical: 8, alignItems: 'center' },
  showAnswerBtnText: { fontSize: fontSize.xs, color: colors.primary, fontWeight: '600' },
  answerBox: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    backgroundColor: `${colors.primary}10`,
    borderRadius: borderRadius.lg, padding: 12,
    borderWidth: 1, borderColor: `${colors.primary}20`,
  },
  answerLabel: { fontSize: fontSize.xs, color: colors.textMuted, fontWeight: '600' },
  answerText: { flex: 1, fontSize: fontSize.base, fontWeight: '700', color: colors.primary },

  sectionTitle: { fontSize: fontSize.base, fontWeight: '700', color: colors.text, marginBottom: 12 },
});