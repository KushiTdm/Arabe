import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUserProgress, MAX_AI_CREDITS } from '../lib/useUserProgress';
import { useErrorTracker } from '../lib/useErrorTracker';
import { Card, Badge, LoadingSpinner, ProgressBar, Button } from '../components/RNComponents';
import { colors, spacing, borderRadius, fontSize } from '../theme';

export default function ProfileScreen() {
  const { progress, loading, creditsRemaining, reload } = useUserProgress();
  const { getErrorSummary, clearErrors } = useErrorTracker();

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <LoadingSpinner size="lg" />
      </View>
    );
  }

  const levelThresholds: Record<string, { min: number; max: number; label: string; next: string }> = {
    beginner:     { min: 0,    max: 300,  label: 'Débutant',      next: 'Intermédiaire' },
    intermediate: { min: 300,  max: 1000, label: 'Intermédiaire', next: 'Avancé'        },
    advanced:     { min: 1000, max: 2000, label: 'Avancé',        next: 'Expert'        },
  };

  const currentLevel = levelThresholds[progress?.level ?? 'beginner'] ?? levelThresholds.beginner;
  const xpProgress = Math.min(
    (((progress?.xp_points ?? 0) - currentLevel.min) / (currentLevel.max - currentLevel.min)) * 100,
    100,
  );

  const errorSummary = getErrorSummary();

  const handleReset = () => {
    Alert.alert(
      'Réinitialiser la progression',
      'Fatima, es-tu sûre ? Toutes tes données seront supprimées.',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Réinitialiser',
          style: 'destructive',
          onPress: async () => {
            await AsyncStorage.multiRemove([
              '@maa_user_progress',
              '@maa_mastered_words',
            ]);
            await clearErrors();
            reload();
          },
        },
      ],
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profil de Fatima</Text>
        <Text style={styles.headerSubtitle}>Ta progression</Text>
      </View>

      {/* Level Card */}
      <Card style={styles.levelCard}>
        <View style={styles.levelHeader}>
          <View style={styles.levelIcon}>
            <Ionicons name="school" size={24} color={colors.white} />
          </View>
          <View>
            <Text style={styles.levelLabel}>{currentLevel.label}</Text>
            <Text style={styles.levelXp}>{progress?.xp_points ?? 0} XP</Text>
          </View>
        </View>
        <ProgressBar progress={xpProgress} height={8} />
        <Text style={styles.levelNext}>
          {progress?.xp_points ?? 0} / {currentLevel.max} XP pour atteindre {currentLevel.next}
        </Text>
      </Card>

      {/* Stats Grid */}
      <View style={styles.statsGrid}>
        <StatItem icon="flame"       value={progress?.streak_days              ?? 0} label="Jours consécutifs"    color={colors.secondary} />
        <StatItem icon="book"        value={progress?.lessons_completed         ?? 0} label="Leçons terminées"     color={colors.primary}   />
        <StatItem icon="chatbubbles" value={progress?.conversations_count       ?? 0} label="Conversations"        color={colors.accent}    />
        <StatItem icon="pencil"      value={progress?.writing_exercises_count   ?? 0} label="Exercices écriture"   color={colors.secondary} />
        <StatItem icon="language"    value={progress?.vocab_learned             ?? 0} label="Mots appris"          color={colors.primary}   />
        <StatItem icon="sparkles"    value={creditsRemaining()}                       label="Crédits IA restants"  color={colors.accent}    />
      </View>

      {/* AI Credits */}
      <Card style={styles.creditsCard}>
        <View style={styles.creditsHeader}>
          <Ionicons name="hardware-chip" size={22} color={colors.primary} />
          <Text style={styles.creditsTitle}>Crédits IA</Text>
        </View>
        <Text style={styles.creditsValue}>{creditsRemaining()} / {MAX_AI_CREDITS}</Text>
        <ProgressBar progress={(creditsRemaining() / MAX_AI_CREDITS) * 100} height={6} color={colors.primary} />
        <Text style={styles.creditsInfo}>Utilisés pour les conversations IA</Text>
      </Card>

      {/* Error tracking */}
      {errorSummary.total_errors > 0 && (
        <Card style={styles.errorsCard}>
          <Text style={styles.sectionTitle}>📊 Points à travailler</Text>
          <Text style={styles.errorsIntro}>
            Fatima, voici tes axes d'amélioration :
          </Text>
          {errorSummary.improvement_areas.map((area, i) => (
            <View key={i} style={styles.errorArea}>
              <Ionicons name="alert-circle" size={16} color={colors.secondary} />
              <Text style={styles.errorAreaText}>{area}</Text>
            </View>
          ))}
          {errorSummary.weak_categories.length > 0 && (
            <Text style={styles.weakCategories}>
              Catégories à revoir : {errorSummary.weak_categories.join(', ')}
            </Text>
          )}
          <Text style={styles.encourageText}>
            Tu fais des progrès chaque jour, continue comme ça !
          </Text>
        </Card>
      )}

      {/* Achievements */}
      <Card style={styles.achievementsCard}>
        <Text style={styles.sectionTitle}>🏆 Succès</Text>
        <Achievement title="Premier pas"         description="Termine ta première leçon"      completed={(progress?.lessons_completed    ?? 0) > 0}  />
        <Achievement title="Élève assidue"       description="7 jours consécutifs"            completed={(progress?.streak_days          ?? 0) >= 7}  />
        <Achievement title="Maîtresse du vocab"  description="Apprendre 50 mots"              completed={(progress?.vocab_learned        ?? 0) >= 50} />
        <Achievement title="Conversationniste"   description="10 conversations avec l'IA"    completed={(progress?.conversations_count  ?? 0) >= 10} />
      </Card>

      {/* Reset */}
      <Button variant="ghost" fullWidth onPress={handleReset} style={{ marginTop: 20, marginBottom: 40 }}>
        Réinitialiser la progression
      </Button>
    </ScrollView>
  );
}

function StatItem({ icon, value, label, color }: { icon: string; value: number; label: string; color: string }) {
  return (
    <View style={styles.statItem}>
      <View style={[styles.statIcon, { backgroundColor: `${color}20` }]}>
        <Ionicons name={icon as any} size={20} color={color} />
      </View>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function Achievement({ title, description, completed }: { title: string; description: string; completed: boolean }) {
  return (
    <View style={styles.achievementItem}>
      <Ionicons
        name={completed ? 'checkmark-circle' : 'ellipse-outline'}
        size={24}
        color={completed ? colors.success : colors.textMuted}
        style={{ marginRight: spacing.md }}
      />
      <View style={{ flex: 1 }}>
        <Text style={[styles.achievementTitle, completed && { color: colors.success }]}>{title}</Text>
        <Text style={styles.achievementDesc}>{description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container:          { flex: 1, backgroundColor: colors.background },
  content:            { paddingHorizontal: 20, paddingTop: 56, paddingBottom: 40 },
  loadingContainer:   { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background },
  header:             { marginBottom: spacing['2xl'] },
  headerTitle:        { fontSize: fontSize['2xl'], fontWeight: '700', color: colors.text },
  headerSubtitle:     { fontSize: fontSize.sm, color: colors.textMuted, marginTop: 4 },
  levelCard:          { marginBottom: spacing['2xl'] },
  levelHeader:        { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.md },
  levelIcon:          { width: 48, height: 48, borderRadius: 24, backgroundColor: colors.primary, justifyContent: 'center', alignItems: 'center', marginRight: spacing.md },
  levelLabel:         { fontSize: fontSize.lg, fontWeight: '700', color: colors.text },
  levelXp:            { fontSize: fontSize.sm, color: colors.primary },
  levelNext:          { fontSize: fontSize.xs, color: colors.textMuted, marginTop: spacing.sm },
  statsGrid:          { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginBottom: spacing['2xl'] },
  statItem:           { width: '47%', backgroundColor: colors.card, borderRadius: borderRadius.xl, borderWidth: 1, borderColor: colors.border, padding: spacing.md, alignItems: 'center' },
  statIcon:           { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginBottom: spacing.xs },
  statValue:          { fontSize: fontSize.xl, fontWeight: '700', color: colors.text },
  statLabel:          { fontSize: 10, color: colors.textMuted, textAlign: 'center', marginTop: 2 },
  creditsCard:        { marginBottom: spacing['2xl'] },
  creditsHeader:      { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: spacing.md },
  creditsTitle:       { fontSize: fontSize.base, fontWeight: '600', color: colors.text },
  creditsValue:       { fontSize: fontSize['2xl'], fontWeight: '700', color: colors.text, marginBottom: spacing.sm },
  creditsInfo:        { fontSize: fontSize.xs, color: colors.textMuted, marginTop: spacing.sm },
  achievementsCard:   { marginBottom: spacing.lg },
  sectionTitle:       { fontSize: fontSize.base, fontWeight: '700', color: colors.text, marginBottom: spacing.md },
  achievementItem:    { flexDirection: 'row', alignItems: 'center', paddingVertical: spacing.sm, borderBottomWidth: 1, borderBottomColor: colors.border },
  achievementTitle:   { fontSize: fontSize.sm, fontWeight: '600', color: colors.text },
  achievementDesc:    { fontSize: fontSize.xs, color: colors.textMuted, marginTop: 2 },
  errorsCard:         { marginBottom: spacing['2xl'], backgroundColor: `${colors.secondary}08` },
  errorsIntro:        { fontSize: fontSize.sm, color: colors.text, marginBottom: spacing.sm },
  errorArea:          { flexDirection: 'row', alignItems: 'center', gap: 8, paddingVertical: 4 },
  errorAreaText:      { fontSize: fontSize.sm, color: colors.text, textTransform: 'capitalize' },
  weakCategories:     { fontSize: fontSize.xs, color: colors.textMuted, marginTop: spacing.sm },
  encourageText:      { fontSize: fontSize.sm, color: colors.accent, fontStyle: 'italic', marginTop: spacing.md },
});