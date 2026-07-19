import React, { useCallback } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageSourcePropType } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import * as Speech from 'expo-speech';
import { useProfile } from '../lib/ProfileContext';
import { useCourses } from '../lib/useCourses';
import { useReviewDeck, reviewStorageKey } from '../lib/useReviewDeck';
import { getWordOfTheDay } from '../data/multilingualVocab';
import { Card, LoadingSpinner, ProgressBar } from '../components/RNComponents';
import { ParallaxScreen } from '../components/ParallaxScreen';
import { PressableScale, Animated, FadeInDown } from '../components/anim';
import { LANGUAGE_IMAGES, LESSON_IMAGES } from '../theme/images';
import { colors, spacing, borderRadius, fontSize } from '../theme';

export default function HomeScreen() {
  const { currentProgress: progress, loading, creditsRemaining, activeProfile, language } = useProfile();
  const coursKey = activeProfile
    ? `@maa_courses_${activeProfile.id}_${activeProfile.activeLanguageCode}`
    : '@maa_courses_v1';
  const { unreadCount } = useCourses(coursKey);
  const reviewDeck = useReviewDeck(reviewStorageKey(activeProfile?.id, language.code));
  const navigation = useNavigation<any>();

  // Refresh the due-cards counter when coming back from a review session
  useFocusEffect(useCallback(() => { reviewDeck.reload(); }, [reviewDeck.reload]));

  const wordOfDay = getWordOfTheDay(language.code, new Date().toISOString().split('T')[0]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <LoadingSpinner size="lg" />
      </View>
    );
  }

  const userName     = activeProfile?.name ?? '';
  const langName     = language.familiarName;
  const greetingWord = language.greetingWord;
  const heroImage    = LANGUAGE_IMAGES[language.code] ?? LANGUAGE_IMAGES.ar;

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <ParallaxScreen
        image={heroImage}
        headerHeight={252}
        topRight={
          <View style={styles.avatarBadgeCol}>
            <View style={styles.avatarBubble}>
              <Text style={styles.avatarText}>{activeProfile?.avatar ?? '🌍'}</Text>
            </View>
            <View style={styles.creditPill}>
              <Ionicons name="sparkles" size={11} color={colors.secondaryLight} />
              <Text style={styles.creditPillText}>{creditsRemaining()} crédits</Text>
            </View>
          </View>
        }
        headerContent={
          <View>
            <Text style={styles.greetingWord}>{greetingWord}</Text>
            <Text style={styles.greetingName}>{userName} 👋</Text>
            <Text style={styles.greetingSubtitle}>Continue ton apprentissage du {langName}</Text>
          </View>
        }
      >
        <View style={styles.body}>
          {/* XP Progress */}
          <Animated.View entering={FadeInDown.delay(80).springify().damping(16)}>
            <Card style={styles.xpCard}>
              <XPBar xp={progress?.xp_points || 0} level={progress?.level || 'beginner'} />
            </Card>
          </Animated.View>

          {/* Stats */}
          <Animated.View entering={FadeInDown.delay(160).springify().damping(16)} style={styles.statsGrid}>
            <StatCard icon="flame"  value={progress?.streak_days       || 0} label="Jours"  color={colors.secondary} />
            <StatCard icon="star"   value={progress?.lessons_completed || 0} label="Leçons" color={colors.primary}   />
            <StatCard icon="trophy" value={progress?.vocab_learned     || 0} label="Mots"   color={colors.accent}    />
          </Animated.View>

          {/* Word of the day */}
          {wordOfDay && (
            <Animated.View entering={FadeInDown.delay(200).springify().damping(16)}>
              <Card style={styles.wodCard}>
                <View style={styles.wodHeader}>
                  <Text style={styles.wodTitle}>💡 Mot du jour</Text>
                  <TouchableOpacity
                    onPress={() =>
                      reviewDeck.has(wordOfDay.id)
                        ? reviewDeck.removeWord(wordOfDay.id)
                        : reviewDeck.addWord(wordOfDay)
                    }
                    style={styles.wodBookmark}
                  >
                    <Ionicons
                      name={reviewDeck.has(wordOfDay.id) ? 'bookmark' : 'bookmark-outline'}
                      size={18}
                      color={reviewDeck.has(wordOfDay.id) ? colors.secondary : colors.textMuted}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.wodRow}>
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.wodNative, language.rtl && styles.wodRtl]}>
                      {wordOfDay.native_word}
                    </Text>
                    {!!wordOfDay.transliteration && (
                      <Text style={styles.wodTranslit}>{wordOfDay.transliteration}</Text>
                    )}
                    <Text style={styles.wodFrench}>{wordOfDay.french_translation}</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => Speech.speak(wordOfDay.native_word, { language: language.ttsLang, rate: 0.85 })}
                    style={styles.wodSpeakBtn}
                  >
                    <Ionicons name="volume-high" size={20} color={colors.primary} />
                  </TouchableOpacity>
                </View>
              </Card>
            </Animated.View>
          )}

          {/* Lessons */}
          <Text style={styles.sectionTitle}>Apprendre</Text>
          <View style={styles.lessonsSection}>
            <LessonCard
              index={0}
              title="Conversation IA"
              subtitle={`Parle en ${langName} avec l'IA — elle crée des cours !`}
              image={LESSON_IMAGES.conversation}
              icon="chatbubbles"
              onPress={() => navigation.navigate('Conversation')}
            />
            <LessonCard
              index={1}
              title="Écriture"
              subtitle={`Pratique l'écriture ${language.rtl ? 'avec les formes des lettres' : 'des mots'}`}
              image={LESSON_IMAGES.writing}
              icon="pencil"
              onPress={() => navigation.navigate('Writing')}
            />
            <LessonCard
              index={2}
              title="Vocabulaire"
              subtitle={`Mots par catégories · ${language.categories.length} thèmes`}
              image={LESSON_IMAGES.vocabulary}
              icon="book"
              onPress={() => navigation.navigate('Vocabulary')}
            />
            <LessonCard
              index={3}
              title="Mes Cours"
              subtitle={
                unreadCount > 0
                  ? `${unreadCount} nouveau${unreadCount > 1 ? 'x' : ''} cours créé${unreadCount > 1 ? 's' : ''} par l'IA !`
                  : "Leçons personnalisées par l'IA"
              }
              image={LESSON_IMAGES.cours}
              icon="school"
              onPress={() => navigation.navigate('Cours')}
              badge={unreadCount > 0 ? String(unreadCount) : undefined}
            />
            <LessonCard
              index={4}
              title={`Alphabet · ${language.script}`}
              subtitle={`${language.alphabet.length} lettres / sons à maîtriser`}
              image={LESSON_IMAGES.alphabet}
              icon="text"
              onPress={() => navigation.navigate('Alphabet')}
            />
            <LessonCard
              index={5}
              title="Quiz"
              subtitle={
                (progress?.quiz_best_score ?? 0) > 0
                  ? `QCM par catégorie · Record : ${progress?.quiz_best_score}%`
                  : 'Teste ton vocabulaire en QCM !'
              }
              image={LESSON_IMAGES.quiz}
              icon="help-circle"
              onPress={() => navigation.navigate('Quiz')}
            />
            <LessonCard
              index={6}
              title="Réviser"
              subtitle={
                reviewDeck.dueCount > 0
                  ? `${reviewDeck.dueCount} carte${reviewDeck.dueCount > 1 ? 's' : ''} à réviser aujourd'hui`
                  : 'Répétition espacée de tes mots'
              }
              image={LESSON_IMAGES.review}
              icon="layers"
              onPress={() => navigation.navigate('Review')}
              badge={reviewDeck.dueCount > 0 ? String(reviewDeck.dueCount) : undefined}
            />
          </View>
        </View>
      </ParallaxScreen>
    </View>
  );
}

function StatCard({ icon, value, label, color }: { icon: string; value: number; label: string; color: string }) {
  return (
    <View style={styles.statCard}>
      <View style={[styles.statIconBubble, { backgroundColor: `${color}18` }]}>
        <Ionicons name={icon as any} size={18} color={color} />
      </View>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function LessonCard({ index, title, subtitle, image, icon, onPress, badge }: {
  index: number; title: string; subtitle: string; image: ImageSourcePropType; icon: string;
  onPress: () => void; badge?: string;
}) {
  return (
    <Animated.View entering={FadeInDown.delay(240 + index * 80).springify().damping(15)}>
      <PressableScale style={styles.lessonCard} onPress={onPress}>
        <View style={styles.lessonThumbWrap}>
          <Image source={image} style={styles.lessonThumb} resizeMode="cover" />
          <View style={styles.lessonThumbIcon}>
            <Ionicons name={icon as any} size={15} color={colors.white} />
          </View>
        </View>
        <View style={styles.lessonContent}>
          <Text style={styles.lessonTitle}>{title}</Text>
          <Text style={styles.lessonSubtitle} numberOfLines={2}>{subtitle}</Text>
        </View>
        {badge ? (
          <View style={styles.lessonBadge}>
            <Text style={styles.lessonBadgeText}>{badge}</Text>
          </View>
        ) : (
          <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
        )}
      </PressableScale>
    </Animated.View>
  );
}

function XPBar({ xp = 0, level = 'beginner' }: { xp?: number; level?: string }) {
  const levelThresholds: Record<string, { min: number; max: number; label: string }> = {
    beginner:     { min: 0,    max: 300,  label: 'Débutant'      },
    intermediate: { min: 300,  max: 1000, label: 'Intermédiaire' },
    advanced:     { min: 1000, max: 2000, label: 'Avancé'        },
  };
  const threshold = levelThresholds[level] ?? levelThresholds.beginner;
  const pct = Math.min(((xp - threshold.min) / (threshold.max - threshold.min)) * 100, 100);
  return (
    <View>
      <View style={styles.xpHeader}>
        <View style={styles.xpLevelRow}>
          <Ionicons name="trophy" size={14} color={colors.secondary} />
          <Text style={styles.xpLevel}>{threshold.label}</Text>
        </View>
        <Text style={styles.xpValue}>{xp} / {threshold.max} XP</Text>
      </View>
      <ProgressBar progress={pct} height={10} />
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer:   { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background },

  body:               { paddingHorizontal: 20, paddingBottom: 110 },

  // Hero overlay text
  greetingWord:       { fontSize: 34, fontWeight: '800', color: colors.white, letterSpacing: 0.5, textAlign: 'left', textShadowColor: 'rgba(0,0,0,0.4)', textShadowOffset: { width: 0, height: 1 }, textShadowRadius: 8 },
  greetingName:       { fontSize: 20, fontWeight: '700', color: colors.white, marginTop: 2, textAlign: 'left', textShadowColor: 'rgba(0,0,0,0.4)', textShadowOffset: { width: 0, height: 1 }, textShadowRadius: 8 },
  greetingSubtitle:   { fontSize: fontSize.sm, color: 'rgba(255,255,255,0.95)', marginTop: 5, textAlign: 'left', textShadowColor: 'rgba(0,0,0,0.35)', textShadowOffset: { width: 0, height: 1 }, textShadowRadius: 6 },

  // Top-right cluster (avatar + credits) pinned in the hero
  avatarBadgeCol:     { alignItems: 'flex-end', gap: 8 },
  avatarBubble:       { width: 46, height: 46, borderRadius: 23, backgroundColor: 'rgba(255,255,255,0.92)', justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 6, elevation: 4 },
  avatarText:         { fontSize: 26 },
  creditPill:         { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: 'rgba(15,28,26,0.72)', paddingHorizontal: 10, paddingVertical: 5, borderRadius: borderRadius.full },
  creditPillText:     { color: colors.white, fontSize: fontSize.xs, fontWeight: '700' },

  xpCard:             { marginBottom: spacing['2xl'], marginTop: spacing.xs },
  xpHeader:           { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.sm },
  xpLevelRow:         { flexDirection: 'row', alignItems: 'center', gap: 6 },
  xpLevel:            { fontSize: fontSize.sm, fontWeight: '700', color: colors.primary },
  xpValue:            { fontSize: fontSize.xs, color: colors.textMuted, fontWeight: '600' },

  statsGrid:          { flexDirection: 'row', gap: spacing.md, marginBottom: spacing['2xl'] },
  statCard:           { flex: 1, backgroundColor: colors.card, borderRadius: borderRadius['2xl'], borderWidth: 1, borderColor: colors.border, paddingVertical: spacing.lg, alignItems: 'center', gap: 4 },
  statIconBubble:     { width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center', marginBottom: 2 },
  statValue:          { fontSize: fontSize.xl, fontWeight: '800', color: colors.text },
  statLabel:          { fontSize: fontSize.xs, color: colors.textMuted },

  // Word of the day
  wodCard:            { marginBottom: spacing['2xl'] },
  wodHeader:          { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.sm },
  wodTitle:           { fontSize: fontSize.sm, fontWeight: '700', color: colors.secondary },
  wodBookmark:        { padding: 4 },
  wodRow:             { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  wodNative:          { fontSize: fontSize['2xl'], fontWeight: '800', color: colors.text },
  wodRtl:             { writingDirection: 'rtl' },
  wodTranslit:        { fontSize: fontSize.sm, color: colors.primary, fontStyle: 'italic', marginTop: 2 },
  wodFrench:          { fontSize: fontSize.base, fontWeight: '600', color: colors.textMuted, marginTop: 4 },
  wodSpeakBtn:        {
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: `${colors.primary}12`,
    justifyContent: 'center', alignItems: 'center',
  },

  sectionTitle:       { fontSize: fontSize.lg, fontWeight: '800', color: colors.text, marginBottom: spacing.md },
  lessonsSection:     { gap: spacing.md },
  lessonCard:         { flexDirection: 'row', alignItems: 'center', padding: spacing.md, borderRadius: borderRadius['2xl'], borderWidth: 1, borderColor: colors.border, backgroundColor: colors.card, shadowColor: colors.primary, shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.06, shadowRadius: 10, elevation: 2 },
  lessonThumbWrap:    { width: 56, height: 56, borderRadius: borderRadius.lg, overflow: 'hidden', marginRight: spacing.md, backgroundColor: `${colors.primary}10` },
  lessonThumb:        { width: '100%', height: '100%' },
  lessonThumbIcon:    { position: 'absolute', bottom: 4, right: 4, width: 22, height: 22, borderRadius: 11, backgroundColor: 'rgba(15,28,26,0.78)', justifyContent: 'center', alignItems: 'center' },
  lessonContent:      { flex: 1, paddingRight: 8 },
  lessonTitle:        { fontSize: fontSize.base, fontWeight: '700', color: colors.text },
  lessonSubtitle:     { fontSize: fontSize.xs, color: colors.textMuted, marginTop: 3, lineHeight: 16 },
  lessonBadge:        { minWidth: 24, height: 24, borderRadius: 12, backgroundColor: colors.destructive, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 6 },
  lessonBadgeText:    { color: colors.white, fontSize: 10, fontWeight: '800' },
});
