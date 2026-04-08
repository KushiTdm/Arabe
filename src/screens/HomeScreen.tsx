import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useUserProgress } from '../lib/useUserProgress';
import { Card, Badge, LoadingSpinner, ProgressBar } from '../components/RNComponents';
import { colors, spacing, borderRadius, fontSize } from '../theme';

export default function HomeScreen() {
  const { progress, loading, creditsRemaining } = useUserProgress();
  const navigation = useNavigation<any>();

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <LoadingSpinner size="lg" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>مرحباً</Text>
          <Text style={styles.subtitle}>Bienvenue dans votre cours d'arabe</Text>
        </View>
        <Badge color="primary">{creditsRemaining()} crédits IA</Badge>
      </View>

      {/* XP Progress */}
      <Card style={styles.xpCard}>
        <XPBar xp={progress?.xp_points || 0} level={progress?.level || 'beginner'} />
      </Card>

      {/* Stats */}
      <View style={styles.statsGrid}>
        <StatCard icon="flame"  value={progress?.streak_days      || 0} label="Jours"  color={colors.secondary} />
        <StatCard icon="star"   value={progress?.lessons_completed || 0} label="Leçons" color={colors.primary}   />
        <StatCard icon="trophy" value={progress?.vocab_learned     || 0} label="Mots"   color={colors.accent}    />
      </View>

      {/* Lessons */}
      <View style={styles.lessonsSection}>
        <Text style={styles.sectionTitle}>Apprendre</Text>

        <LessonCard title="Conversation IA"   subtitle="Pratiquez l'arabe parlé avec l'IA" icon="chatbubbles" onPress={() => navigation.navigate('Conversation')} color="primary"   />
        <LessonCard title="Écriture arabe"    subtitle="Apprenez les 28 lettres"            icon="pencil"      onPress={() => navigation.navigate('Writing')}      color="secondary" />
        <LessonCard title="Vocabulaire"       subtitle="Enrichissez votre vocabulaire"       icon="book"        onPress={() => navigation.navigate('Vocabulary')}   color="accent"    />
        <LessonCard title="Alphabet arabe"    subtitle="Maîtrisez les lettres en détail"     icon="text"        onPress={() => navigation.navigate('Alphabet')}     color="primary"   />
      </View>
    </ScrollView>
  );
}

function StatCard({ icon, value, label, color }: { icon: string; value: number; label: string; color: string }) {
  return (
    <View style={styles.statCard}>
      <Ionicons name={icon as any} size={20} color={color} />
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function LessonCard({ title, subtitle, icon, onPress, color }: {
  title: string; subtitle: string; icon: string; onPress: () => void; color: 'primary' | 'secondary' | 'accent';
}) {
  const colorMap = {
    primary:   { bg: `${colors.primary}15`,   border: `${colors.primary}30`   },
    secondary: { bg: `${colors.secondary}15`, border: `${colors.secondary}30` },
    accent:    { bg: `${colors.accent}15`,    border: `${colors.accent}30`    },
  };
  return (
    <TouchableOpacity
      style={[styles.lessonCard, { backgroundColor: colorMap[color].bg, borderColor: colorMap[color].border }]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.lessonIconContainer}>
        <Ionicons name={icon as any} size={24} color={colors.primary} />
      </View>
      <View style={styles.lessonContent}>
        <Text style={styles.lessonTitle}>{title}</Text>
        <Text style={styles.lessonSubtitle}>{subtitle}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
    </TouchableOpacity>
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
        <Text style={styles.xpLevel}>{threshold.label}</Text>
        <Text style={styles.xpValue}>{xp} / {threshold.max} XP</Text>
      </View>
      <ProgressBar progress={pct} height={10} />
    </View>
  );
}

const styles = StyleSheet.create({
  container:          { flex: 1, backgroundColor: colors.background },
  content:            { paddingHorizontal: 20, paddingTop: 56, paddingBottom: 100 },
  loadingContainer:   { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background },
  header:             { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: spacing['2xl'] },
  greeting:           { fontSize: fontSize['2xl'], fontWeight: '700', color: colors.text },
  subtitle:           { fontSize: fontSize.sm, color: colors.textMuted, marginTop: 4 },
  xpCard:             { marginBottom: spacing['2xl'] },
  xpHeader:           { flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.sm },
  xpLevel:            { fontSize: fontSize.sm, fontWeight: '600', color: colors.primary },
  xpValue:            { fontSize: fontSize.xs, color: colors.textMuted },
  statsGrid:          { flexDirection: 'row', gap: spacing.md, marginBottom: spacing['2xl'] },
  statCard:           { flex: 1, backgroundColor: colors.card, borderRadius: borderRadius['2xl'], borderWidth: 1, borderColor: colors.border, padding: spacing.lg, alignItems: 'center' },
  statValue:          { fontSize: fontSize.xl, fontWeight: '700', color: colors.text, marginTop: spacing.xs },
  statLabel:          { fontSize: fontSize.xs, color: colors.textMuted, marginTop: 2 },
  lessonsSection:     { gap: spacing.md },
  sectionTitle:       { fontSize: fontSize.lg, fontWeight: '700', color: colors.text, marginBottom: spacing.xs },
  lessonCard:         { flexDirection: 'row', alignItems: 'center', padding: spacing.lg, borderRadius: borderRadius['2xl'], borderWidth: 1 },
  lessonIconContainer:{ width: 48, height: 48, borderRadius: borderRadius.lg, backgroundColor: colors.card, justifyContent: 'center', alignItems: 'center', marginRight: spacing.lg },
  lessonContent:      { flex: 1 },
  lessonTitle:        { fontSize: fontSize.base, fontWeight: '600', color: colors.text },
  lessonSubtitle:     { fontSize: fontSize.xs, color: colors.textMuted, marginTop: 2 },
});