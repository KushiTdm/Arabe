import React, { useCallback } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import type { ImageSourcePropType } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSpeaker } from '../lib/useSpeaker';
import { useProfile } from '../lib/ProfileContext';
import { useReviewDeck, reviewStorageKey } from '../lib/useReviewDeck';
import { usePathProgress } from '../lib/usePathProgress';
import { getWordOfTheDay } from '../data/multilingualVocab';
import { LEVEL_LABEL, STEP_ICON } from '../data/learningPath';
import { AnimatedBar } from '../components/motion';
import { LoadingSpinner } from '../components/RNComponents';
import { PressableScale, Animated, FadeInDown } from '../components/anim';
import { LANGUAGE_IMAGES, ILLUSTRATIONS } from '../theme/images';
import { colors, borderRadius, fontSize } from '../theme';

const HERO_CONTENT_HEIGHT = 112;

export default function HomeScreen() {
  const { currentProgress: progress, loading, creditsRemaining, activeProfile, language } = useProfile();
  const { say } = useSpeaker();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();
  const reviewDeck = useReviewDeck(reviewStorageKey(activeProfile?.id, language.code));
  const path = usePathProgress();

  // Au retour d'un écran : cartes à réviser et étapes du parcours à jour
  useFocusEffect(useCallback(() => {
    reviewDeck.reload();
    path.reload();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reviewDeck.reload, path.reload]));

  const wordOfDay = getWordOfTheDay(language.code, new Date().toISOString().split('T')[0]);

  if (loading) {
    return <View style={styles.loading}><LoadingSpinner size="lg" /></View>;
  }

  const heroImage = LANGUAGE_IMAGES[language.code] ?? LANGUAGE_IMAGES.ar;
  const unit = path.currentUnit;
  const nextIdx = unit ? path.nextStepIndex(unit) : 0;
  const levelMeta = LEVEL_LABEL[path.level];
  const unitNumber = unit ? path.units.indexOf(unit) + 1 : 0;
  const pct = path.units.length ? Math.round((path.completedCount / path.units.length) * 100) : 0;

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 96 }}>
        {/* ── Bandeau ─────────────────────────────────────────────── */}
        <View style={[styles.hero, { height: HERO_CONTENT_HEIGHT + insets.top }]}>
          <Image source={heroImage} style={StyleSheet.absoluteFill} resizeMode="cover" />
          <View style={[StyleSheet.absoluteFill, styles.heroShade]} />
          <View style={[styles.heroRow, { paddingTop: insets.top + 10 }]}>
            <View style={{ flex: 1 }}>
              <Text style={styles.greetingWord} numberOfLines={1}>{language.greetingWord}</Text>
              <Text style={styles.greetingName} numberOfLines={1}>{activeProfile?.name ?? ''} 👋</Text>
            </View>
            <View style={styles.heroRight}>
              <View style={styles.avatarBubble}>
                <Text style={styles.avatarText}>{activeProfile?.avatar ?? '🌍'}</Text>
              </View>
              <View style={styles.creditPill}>
                <Ionicons name="sparkles" size={11} color={colors.secondaryLight} />
                <Text style={styles.creditPillText}>{creditsRemaining()}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.body}>
          {/* ── Statistiques sur une seule ligne ────────────────────── */}
          <Animated.View entering={FadeInDown.delay(60).springify().damping(16)} style={styles.statsRow}>
            <Stat icon="flame" image={ILLUSTRATIONS.streak} color={colors.secondary} value={progress?.streak_days ?? 0} label="jours" />
            <View style={styles.statDivider} />
            <Stat icon="flash" color={colors.primary} value={progress?.xp_points ?? 0} label="XP" />
            <View style={styles.statDivider} />
            <Stat icon="checkmark-done" color={colors.accent} value={path.completedCount} label="unités" />
            <View style={styles.statDivider} />
            <Stat icon="book" color={colors.secondary} value={progress?.vocab_learned ?? 0} label="mots" />
          </Animated.View>

          {/* ── Parcours d'apprentissage ────────────────────────────── */}
          {unit && (
            <Animated.View entering={FadeInDown.delay(120).springify().damping(16)} style={styles.pathCard}>
              <View style={styles.pathTop}>
                <View style={styles.levelChip}>
                  <Text style={styles.levelChipText}>{levelMeta.cefr} · {levelMeta.name}</Text>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('Path')} hitSlop={8}>
                  <Text style={styles.seeAll}>Tout le parcours ›</Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.pathKicker}>
                {path.finished ? 'Parcours terminé' : `Unité ${unitNumber} sur ${path.units.length}`}
              </Text>
              <Text style={styles.pathTitle} numberOfLines={2}>{unit.title}</Text>
              <Text style={styles.pathGoal} numberOfLines={2}>{unit.goal}</Text>

              <View style={styles.stepsRow}>
                {unit.steps.map((step, i) => {
                  const done = path.isStepDone(unit.id, i);
                  const isNext = !path.finished && i === nextIdx;
                  return (
                    <TouchableOpacity
                      key={i}
                      style={styles.stepCol}
                      onPress={() => path.launch(navigation, unit, i)}
                      activeOpacity={0.8}
                    >
                      <View style={[styles.stepDot, done && styles.stepDotDone, isNext && styles.stepDotNext]}>
                        <Ionicons
                          name={(done ? 'checkmark' : STEP_ICON[step.kind]) as any}
                          size={16}
                          color={done || isNext ? colors.white : colors.primary}
                        />
                      </View>
                      <Text style={styles.stepText} numberOfLines={1}>{step.kind === 'lesson' ? (step.partTitle ?? 'Leçon') : SHORT_LABEL[step.kind]}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>

              <AnimatedBar value={pct / 100} height={6} trackColor="rgba(255,255,255,0.18)" accent={colors.accentLight} />

              <PressableScale
                style={styles.cta}
                onPress={() => path.launch(navigation, unit, nextIdx)}
              >
                <Text style={styles.ctaText}>
                  {path.finished ? 'Revoir la dernière unité' : 'Continuer'}
                </Text>
                <Ionicons name="arrow-forward" size={18} color={colors.white} />
              </PressableScale>
            </Animated.View>
          )}

          {/* ── Mot du jour ─────────────────────────────────────────── */}
          {wordOfDay && (
            <Animated.View entering={FadeInDown.delay(180).springify().damping(16)} style={styles.wodCard}>
              <View style={{ flex: 1 }}>
                <Text style={styles.wodKicker}>💡 Mot du jour</Text>
                <Text style={[styles.wodNative, language.rtl && styles.rtl]} numberOfLines={1}>
                  {wordOfDay.native_word}
                </Text>
                <Text style={styles.wodFrench} numberOfLines={1}>
                  {wordOfDay.transliteration ? `${wordOfDay.transliteration} · ` : ''}{wordOfDay.french_translation}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => reviewDeck.has(wordOfDay.id) ? reviewDeck.removeWord(wordOfDay.id) : reviewDeck.addWord(wordOfDay)}
                style={styles.iconBtn}
              >
                <Ionicons
                  name={reviewDeck.has(wordOfDay.id) ? 'bookmark' : 'bookmark-outline'}
                  size={20}
                  color={reviewDeck.has(wordOfDay.id) ? colors.secondary : colors.textMuted}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => say(wordOfDay.native_word)} style={[styles.iconBtn, styles.iconBtnPrimary]}>
                <Ionicons name="volume-high" size={20} color={colors.primary} />
              </TouchableOpacity>
            </Animated.View>
          )}

          {/* ── Raccourcis absents de la barre de navigation ────────── */}
          <Animated.View entering={FadeInDown.delay(240).springify().damping(16)} style={styles.chips}>
            <Chip
              icon="layers" label="Réviser" color={colors.primary}
              badge={reviewDeck.dueCount > 0 ? String(reviewDeck.dueCount) : undefined}
              onPress={() => navigation.navigate('Review')}
            />
            <Chip icon="help-circle" label="Quiz" color={colors.secondary} onPress={() => navigation.navigate('Quiz')} />
            <Chip icon="chatbubbles" label="Dialogues" color={colors.accent} onPress={() => navigation.navigate('Dialogues')} />
            <Chip icon="eye" label="Lecture" color={colors.primaryLight} onPress={() => navigation.navigate('Alphabet')} />
          </Animated.View>
        </View>
      </ScrollView>
    </View>
  );
}

const SHORT_LABEL: Record<string, string> = {
  read: 'Signes', readquiz: 'Test', vocab: 'Mots', speak: 'Dialogue', quiz: 'Quiz', lesson: 'Leçon',
};

function Stat({ icon, image, color, value, label }: { icon: string; image?: ImageSourcePropType; color: string; value: number; label: string }) {
  return (
    <View style={styles.stat}>
      {image
        ? <Image source={image} style={{ width: 20, height: 20 }} resizeMode="contain" />
        : <Ionicons name={icon as any} size={16} color={color} />}
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function Chip(props: { icon: string; label: string; color: string; badge?: string; onPress: () => void }) {
  return (
    <PressableScale style={styles.chip} onPress={props.onPress}>
      <View style={[styles.chipIcon, { backgroundColor: `${props.color}1a` }]}>
        <Ionicons name={props.icon as any} size={20} color={props.color} />
        {props.badge && (
          <View style={styles.chipBadge}><Text style={styles.chipBadgeText}>{props.badge}</Text></View>
        )}
      </View>
      <Text style={styles.chipLabel}>{props.label}</Text>
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  loading:       { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background },

  hero:          { backgroundColor: colors.primaryDark, overflow: 'hidden' },
  heroShade:     { backgroundColor: 'rgba(15,28,26,0.38)' },
  heroRow:       { flexDirection: 'row', paddingHorizontal: 20, alignItems: 'flex-start' },
  greetingWord:  { fontSize: 28, fontWeight: '800', color: colors.white, textShadowColor: 'rgba(0,0,0,0.4)', textShadowOffset: { width: 0, height: 1 }, textShadowRadius: 6 },
  greetingName:  { fontSize: fontSize.md, fontWeight: '700', color: colors.white, marginTop: 1, textShadowColor: 'rgba(0,0,0,0.4)', textShadowOffset: { width: 0, height: 1 }, textShadowRadius: 6 },
  heroRight:     { alignItems: 'flex-end', gap: 6 },
  avatarBubble:  { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.92)', justifyContent: 'center', alignItems: 'center' },
  avatarText:    { fontSize: 22 },
  creditPill:    { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: 'rgba(15,28,26,0.72)', paddingHorizontal: 9, paddingVertical: 3, borderRadius: borderRadius.full },
  creditPillText:{ color: colors.white, fontSize: fontSize.xs, fontWeight: '700' },

  body:          { paddingHorizontal: 16, marginTop: -16, gap: 12 },

  statsRow:      { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.card, borderRadius: borderRadius['2xl'], borderWidth: 1, borderColor: colors.border, paddingVertical: 10, shadowColor: colors.primary, shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.07, shadowRadius: 10, elevation: 3 },
  stat:          { flex: 1, alignItems: 'center', gap: 1 },
  statValue:     { fontSize: fontSize.lg, fontWeight: '800', color: colors.text },
  statLabel:     { fontSize: 10, color: colors.textMuted },
  statDivider:   { width: 1, height: 28, backgroundColor: colors.border },

  pathCard:      { backgroundColor: colors.card, borderRadius: borderRadius['2xl'], borderWidth: 1, borderColor: colors.border, padding: 16, shadowColor: colors.primary, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.09, shadowRadius: 12, elevation: 4 },
  pathTop:       { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  levelChip:     { backgroundColor: `${colors.primary}12`, paddingHorizontal: 10, paddingVertical: 4, borderRadius: borderRadius.full },
  levelChipText: { fontSize: fontSize.xs, fontWeight: '800', color: colors.primary },
  seeAll:        { fontSize: fontSize.xs, fontWeight: '700', color: colors.secondary },
  pathKicker:    { fontSize: fontSize.xs, color: colors.textMuted, fontWeight: '600', marginTop: 10 },
  pathTitle:     { fontSize: fontSize.xl, fontWeight: '800', color: colors.text, marginTop: 2 },
  pathGoal:      { fontSize: fontSize.sm, color: colors.textMuted, marginTop: 4, lineHeight: 18 },
  stepsRow:      { flexDirection: 'row', justifyContent: 'space-around', marginTop: 14 },
  stepCol:       { alignItems: 'center', gap: 5, flex: 1 },
  stepDot:       { width: 38, height: 38, borderRadius: 19, backgroundColor: `${colors.primary}12`, justifyContent: 'center', alignItems: 'center' },
  stepDotDone:   { backgroundColor: colors.success },
  stepDotNext:   { backgroundColor: colors.primary },
  stepText:      { fontSize: 10, fontWeight: '600', color: colors.textMuted },
  pathBarBg:     { height: 4, backgroundColor: colors.border, borderRadius: 2, marginTop: 14, overflow: 'hidden' },
  pathBarFill:   { height: '100%', backgroundColor: colors.accent, borderRadius: 2 },
  cta:           { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: colors.primary, borderRadius: borderRadius.full, paddingVertical: 13, marginTop: 14 },
  ctaText:       { color: colors.white, fontSize: fontSize.md, fontWeight: '800' },

  wodCard:       { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: colors.card, borderRadius: borderRadius.xl, borderWidth: 1, borderColor: colors.border, paddingVertical: 10, paddingHorizontal: 14 },
  wodKicker:     { fontSize: 10, fontWeight: '700', color: colors.secondary },
  wodNative:     { fontSize: fontSize.xl, fontWeight: '800', color: colors.text, marginTop: 1 },
  rtl:           { writingDirection: 'rtl' },
  wodFrench:     { fontSize: fontSize.sm, color: colors.textMuted, marginTop: 1 },
  iconBtn:       { width: 38, height: 38, borderRadius: 19, justifyContent: 'center', alignItems: 'center' },
  iconBtnPrimary:{ backgroundColor: `${colors.primary}12` },

  chips:         { flexDirection: 'row', gap: 10 },
  chip:          { flex: 1, backgroundColor: colors.card, borderRadius: borderRadius.xl, borderWidth: 1, borderColor: colors.border, paddingVertical: 10, alignItems: 'center', gap: 6 },
  chipIcon:      { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
  chipLabel:     { fontSize: fontSize.sm, fontWeight: '700', color: colors.text },
  chipBadge:     { position: 'absolute', top: -4, right: -6, minWidth: 18, height: 18, borderRadius: 9, backgroundColor: colors.destructive, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 4 },
  chipBadgeText: { color: colors.white, fontSize: 10, fontWeight: '800' },
});
