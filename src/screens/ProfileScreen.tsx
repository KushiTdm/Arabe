import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useUserProgress, MAX_AI_CREDITS } from '../lib/useUserProgress';
import { Card, Badge, LoadingSpinner, ProgressBar, Button } from '../components/RNComponents';
import { colors, spacing, borderRadius, fontSize } from '../theme';

export default function ProfileScreen() {
  const { progress, loading, creditsRemaining } = useUserProgress();

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <LoadingSpinner size="lg" />
      </View>
    );
  }

  const levelThresholds = {
    beginner: { min: 0, max: 300, label: 'Débutant', next: 'Intermédiaire' },
    intermediate: { min: 300, max: 1000, label: 'Intermédiaire', next: 'Avancé' },
    advanced: { min: 1000, max: 2000, label: 'Avancé', next: 'Expert' },
  };

  const currentLevel = levelThresholds[progress?.level as keyof typeof levelThresholds] || levelThresholds.beginner;
  const xpProgress = Math.min(((progress?.xp_points || 0) - currentLevel.min) / (currentLevel.max - currentLevel.min) * 100, 100);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mon Profil</Text>
        <Text style={styles.headerSubtitle}>Votre progression</Text>
      </View>

      {/* Level Card */}
      <Card style={styles.levelCard}>
        <View style={styles.levelHeader}>
          <View style={styles.levelIcon}>
            <Ionicons name="school" size={24} color={colors.white} />
          </View>
          <View>
            <Text style={styles.levelLabel}>{currentLevel.label}</Text>
            <Text style={styles.levelXp}>{progress?.xp_points || 0} XP</Text>
          </View>
        </View>
        <ProgressBar progress={xpProgress} height={8} />
        <Text style={styles.levelNext}>
          {progress?.xp_points || 0} / {currentLevel.max} XP pour {currentLevel.next}
        </Text>
      </Card>

      {/* Stats Grid */}
      <View style={styles.statsGrid}>
        <StatItem icon="flame" value={progress?.streak_days || 0} label="Jours consécutifs" color={colors.secondary} />
        <StatItem icon="book" value={progress?.lessons_completed || 0} label="Leçons terminées" color={colors.primary} />
        <StatItem icon="chatbubbles" value={progress?.conversations_count || 0} label="Conversations" color={colors.accent} />
        <StatItem icon="pencil" value={progress?.writing_exercises_count || 0} label="Exercices écriture" color={colors.secondary} />
        <StatItem icon="language" value={progress?.vocab_learned || 0} label="Mots appris" color={colors.primary} />
        <StatItem icon="sparkles" value={creditsRemaining()} label="Crédits IA restants" color={colors.accent} />
      </View>

      {/* AI Credits */}
      <Card style={styles.creditsCard}>
        <View style={styles.creditsHeader}>
          <Ionicons name="hardware-chip" size={24} color={colors.primary} />
          <Text style={styles.creditsTitle}>Crédits IA</Text>
        </View>
        <Text style={styles.creditsValue}>{creditsRemaining()} / {MAX_AI_CREDITS}</Text>
        <ProgressBar 
          progress={(creditsRemaining() / MAX_AI_CREDITS) * 100} 
          height={6} 
          color={colors.primary} 
        />
        <Text style={styles.creditsInfo}>
          Utilisés pour les conversations IA et la génération de vocabulaire
        </Text>
      </Card>

      {/* Achievements */}
      <Card style={styles.achievementsCard}>
        <Text style={styles.sectionTitle}>🏆 Succès</Text>
        <Achievement 
          title="Premier pas" 
          description="Complétez votre première leçon"
          completed={(progress?.lessons_completed || 0) > 0}
        />
        <Achievement 
          title="Élève assidu" 
          description="7 jours consécutifs"
          completed={(progress?.streak_days || 0) >= 7}
        />
        <Achievement 
          title="Maître du vocabulaire" 
          description="Apprendre 50 mots"
          completed={(progress?.vocab_learned || 0) >= 50}
        />
        <Achievement 
          title="Conversationniste" 
          description="10 conversations avec l'IA"
          completed={(progress?.conversations_count || 0) >= 10}
        />
      </Card>

      {/* Reset Progress */}
      <Button 
        variant="ghost" 
        fullWidth
        style={{ marginTop: 20 }}
      >
        <Ionicons name="refresh" size={16} color={colors.textMuted} /> Réinitialiser la progression
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
      <View style={[styles.achievementIcon, completed && styles.achievementCompleted]}>
        <Ionicons 
          name={completed ? 'checkmark-circle' : 'ellipse-outline'} 
          size={24} 
          color={completed ? colors.success : colors.textMuted} 
        />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={[styles.achievementTitle, completed && styles.achievementTitleCompleted]}>
          {title}
        </Text>
        <Text style={styles.achievementDesc}>{description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 56,
    paddingBottom: 100,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  header: {
    marginBottom: spacing['2xl'],
  },
  headerTitle: {
    fontSize: fontSize['2xl'],
    fontWeight: '700',
    color: colors.text,
  },
  headerSubtitle: {
    fontSize: fontSize.sm,
    color: colors.textMuted,
    marginTop: 4,
  },
  levelCard: {
    marginBottom: spacing['2xl'],
  },
  levelHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  levelIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  levelLabel: {
    fontSize: fontSize.lg,
    fontWeight: '700',
    color: colors.text,
  },
  levelXp: {
    fontSize: fontSize.sm,
    color: colors.primary,
  },
  levelNext: {
    fontSize: fontSize.xs,
    color: colors.textMuted,
    marginTop: spacing.sm,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: spacing['2xl'],
  },
  statItem: {
    width: '47%',
    backgroundColor: colors.card,
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    alignItems: 'center',
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  statValue: {
    fontSize: fontSize.xl,
    fontWeight: '700',
    color: colors.text,
  },
  statLabel: {
    fontSize: 10,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: 2,
  },
  creditsCard: {
    marginBottom: spacing['2xl'],
  },
  creditsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: spacing.md,
  },
  creditsTitle: {
    fontSize: fontSize.base,
    fontWeight: '600',
    color: colors.text,
  },
  creditsValue: {
    fontSize: fontSize['2xl'],
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.sm,
  },
  creditsInfo: {
    fontSize: fontSize.xs,
    color: colors.textMuted,
    marginTop: spacing.sm,
  },
  achievementsCard: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: fontSize.base,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.md,
  },
  achievementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  achievementIcon: {
    marginRight: spacing.md,
  },
  achievementCompleted: {
    // Additional styles for completed
  },
  achievementTitle: {
    fontSize: fontSize.sm,
    fontWeight: '600',
    color: colors.text,
  },
  achievementTitleCompleted: {
    color: colors.success,
  },
  achievementDesc: {
    fontSize: fontSize.xs,
    color: colors.textMuted,
    marginTop: 2,
  },
});