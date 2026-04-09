import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { useUserProgress, MAX_AI_CREDITS } from '../lib/useUserProgress';
import { useErrorTracker } from '../lib/useErrorTracker';
import { Card, LoadingSpinner, ProgressBar, Button } from '../components/RNComponents';
import { colors, spacing, borderRadius, fontSize } from '../theme';
import { getApiKey, saveApiKey, clearApiKey, invokeAI } from '../api/aiClient';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const REPORT_KEY = '@maa_ai_report';
const EXERCISES_KEY = '@maa_ai_exercises';

interface AIReport {
  generated_at: string;
  overall_level: string;
  strengths: string[];
  weaknesses: string[];
  recommended_plan: string[];
  daily_goal: string;
  weekly_objective: string;
  encouragement: string;
}

interface GeneratedExercise {
  category: string;
  title: string;
  type: 'vocabulary' | 'conversation' | 'writing' | 'grammar';
  difficulty: 'easy' | 'medium' | 'hard';
  instruction: string;
  content: string[];
  tips: string[];
}

interface AIExercisesResponse {
  exercises: GeneratedExercise[];
  summary: string;
}

export default function ProfileScreen() {
  const { progress, loading, creditsRemaining, reload: reloadProgress } = useUserProgress();
  const {
    getErrorSummary,
    getErrorsForAIPrompt,
    clearErrors,
    sessions,
    reload: reloadErrors,
  } = useErrorTracker();

  const [apiKey, setApiKey] = useState('');
  const [apiKeyInput, setApiKeyInput] = useState('');
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);
  const [showApiKey, setShowApiKey] = useState(false);
  const [savingKey, setSavingKey] = useState(false);
  const [testingKey, setTestingKey] = useState(false);

  const [aiReport, setAiReport] = useState<AIReport | null>(null);
  const [generatingReport, setGeneratingReport] = useState(false);

  const [aiExercises, setAiExercises] = useState<GeneratedExercise[]>([]);
  const [exercisesSummary, setExercisesSummary] = useState('');
  const [generatingExercises, setGeneratingExercises] = useState(false);
  const [expandedExercise, setExpandedExercise] = useState<number | null>(null);

  const [activeSection, setActiveSection] = useState<
    'stats' | 'errors' | 'report' | 'settings'
  >('stats');

  useFocusEffect(
    useCallback(() => {
      loadApiKey();
      loadCachedReport();
      loadCachedExercises();
      reloadProgress();
      reloadErrors?.();
    }, []),
  );

  const loadApiKey = async () => {
    const key = await getApiKey();
    setApiKey(key);
    setApiKeyInput(key);
  };

  const loadCachedReport = async () => {
    try {
      const raw = await AsyncStorage.getItem(REPORT_KEY);
      if (raw) setAiReport(JSON.parse(raw));
    } catch {}
  };

  const loadCachedExercises = async () => {
    try {
      const raw = await AsyncStorage.getItem(EXERCISES_KEY);
      if (raw) {
        const data: AIExercisesResponse = JSON.parse(raw);
        setAiExercises(data.exercises || []);
        setExercisesSummary(data.summary || '');
      }
    } catch {}
  };

  const handleSaveApiKey = async () => {
    if (!apiKeyInput.trim()) {
      Alert.alert('Clé vide', 'Veuillez entrer une clé API valide.');
      return;
    }
    setSavingKey(true);
    try {
      await saveApiKey(apiKeyInput.trim());
      setApiKey(apiKeyInput.trim());
      setShowApiKeyInput(false);
      Alert.alert(
        '✅ Clé enregistrée',
        'Votre clé API Gemini a été sauvegardée avec succès !',
      );
    } catch {
      Alert.alert('Erreur', 'Impossible de sauvegarder la clé.');
    } finally {
      setSavingKey(false);
    }
  };

  const handleTestApiKey = async () => {
    if (!apiKeyInput.trim()) return;
    setTestingKey(true);
    try {
      await saveApiKey(apiKeyInput.trim());
      const res = await invokeAI<{ ok: boolean; message: string }>(
        'Réponds juste: { "ok": true, "message": "Clé API fonctionnelle" }',
      );
      if (res.ok) {
        setApiKey(apiKeyInput.trim());
        Alert.alert(
          '✅ Clé valide !',
          res.message || 'Votre clé API Gemini fonctionne parfaitement.',
        );
      }
    } catch (err: any) {
      Alert.alert(
        '❌ Clé invalide',
        err?.message ||
          'Cette clé API ne fonctionne pas. Vérifiez sur console.cloud.google.com',
      );
    } finally {
      setTestingKey(false);
    }
  };

  const handleClearApiKey = () => {
    Alert.alert(
      'Supprimer la clé API',
      'Voulez-vous vraiment supprimer votre clé API ? Les fonctionnalités IA ne seront plus disponibles.',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Supprimer',
          style: 'destructive',
          onPress: async () => {
            await clearApiKey();
            setApiKey('');
            setApiKeyInput('');
          },
        },
      ],
    );
  };

  // ── Generate exercises for all categories based on report ──────────────
  const generateExercisesFromReport = async (report: AIReport) => {
    setGeneratingExercises(true);
    try {
      const errorsCtx = getErrorsForAIPrompt();
      const summary = getErrorSummary();

      const res = await invokeAI<AIExercisesResponse>(
        `Tu es un professeur d'arabe expert. En te basant sur le rapport de progression de Fatima, génère des exercices personnalisés pour TOUTES les catégories suivantes: salutations, nombres, famille, nourriture, voyage, vie quotidienne, couleurs, animaux, écriture, conversation, grammaire.

Rapport actuel:
- Niveau: ${report.overall_level}
- Points forts: ${report.strengths.join(', ')}
- Axes d'amélioration: ${report.weaknesses.join(', ')}
- Objectif quotidien: ${report.daily_goal}

${errorsCtx}

Erreurs fréquentes: ${summary.weak_categories.join(', ') || 'aucune'}
Sessions complétées: ${summary.sessions_count}

Génère exactement 8 exercices variés (mix de types: vocabulary, conversation, writing, grammar).
Pour chaque exercice, fournis du contenu CONCRET (ex: 5 mots à apprendre, une phrase à conjuguer, etc).
Adapte la difficulté au niveau de Fatima.

JSON: {
  "summary": "Résumé en 1 phrase de ce plan d'exercices pour Fatima",
  "exercises": [
    {
      "category": "salutations",
      "title": "Titre de l'exercice",
      "type": "vocabulary",
      "difficulty": "easy",
      "instruction": "Instruction claire pour Fatima",
      "content": ["élément 1", "élément 2", "élément 3", "élément 4", "élément 5"],
      "tips": ["conseil 1", "conseil 2"]
    }
  ]
}`,
      );

      const data: AIExercisesResponse = {
        exercises: res.exercises || [],
        summary: res.summary || '',
      };

      await AsyncStorage.setItem(EXERCISES_KEY, JSON.stringify(data));
      setAiExercises(data.exercises);
      setExercisesSummary(data.summary);
    } catch (err: any) {
      console.error('Erreur génération exercices:', err);
      // Non-blocking: le rapport est déjà généré
    } finally {
      setGeneratingExercises(false);
    }
  };

  const generateAIReport = async () => {
    setGeneratingReport(true);
    try {
      const errorsCtx = getErrorsForAIPrompt();
      const summary = getErrorSummary();

      const res = await invokeAI<AIReport>(
        `Tu es un professeur d'arabe expert. Génère un rapport de progression détaillé pour Fatima.

${errorsCtx}

Statistiques actuelles:
- Niveau: ${progress?.level || 'débutant'}
- XP: ${progress?.xp_points || 0} points
- Conversations: ${progress?.conversations_count || 0}
- Exercices d'écriture: ${progress?.writing_exercises_count || 0}
- Mots appris: ${progress?.vocab_learned || 0}
- Sessions totales: ${summary.sessions_count}
- Erreurs non résolues: ${summary.total_errors}

Génère un rapport complet et personnalisé.
Adresse-toi directement à "Fatima" dans ton rapport.

JSON: {
  "overall_level": "Débutant avancé",
  "strengths": ["force 1", "force 2", "force 3"],
  "weaknesses": ["axe 1", "axe 2", "axe 3"],
  "recommended_plan": ["Jour 1: ...", "Jour 2: ...", "Jour 3: ...", "Jour 4: ...", "Jour 5: ...", "Jour 6: ...", "Jour 7: ..."],
  "daily_goal": "...",
  "weekly_objective": "...",
  "encouragement": "Message personnel pour Fatima..."
}`,
      );

      const report = { ...res, generated_at: new Date().toISOString() };
      setAiReport(report);
      await AsyncStorage.setItem(REPORT_KEY, JSON.stringify(report));
      setActiveSection('report');

      // Générer automatiquement les exercices après le rapport
      await generateExercisesFromReport(report);
    } catch (err: any) {
      Alert.alert(
        'Erreur',
        err?.message ||
          'Impossible de générer le rapport. Vérifiez votre clé API.',
      );
    } finally {
      setGeneratingReport(false);
    }
  };

  const handleReset = () => {
    Alert.alert(
      'Réinitialiser',
      'Fatima, toutes tes données de progression seront supprimées.',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Réinitialiser',
          style: 'destructive',
          onPress: async () => {
            await AsyncStorage.multiRemove([
              '@maa_user_progress',
              '@maa_mastered_words',
              REPORT_KEY,
              EXERCISES_KEY,
            ]);
            await clearErrors();
            setAiReport(null);
            setAiExercises([]);
            reloadProgress();
          },
        },
      ],
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <LoadingSpinner size="lg" />
      </View>
    );
  }

  const errorSummary = getErrorSummary();
  const creditsUsed = progress?.ai_credits_used || 0;
  const hasApiKey = apiKey.length > 0;

  const levelThresholds: Record<
    string,
    { min: number; max: number; label: string; next: string }
  > = {
    beginner: { min: 0, max: 300, label: 'Débutant', next: 'Intermédiaire' },
    intermediate: {
      min: 300,
      max: 1000,
      label: 'Intermédiaire',
      next: 'Avancé',
    },
    advanced: { min: 1000, max: 2000, label: 'Avancé', next: 'Expert' },
  };
  const currentLevel =
    levelThresholds[progress?.level ?? 'beginner'] ?? levelThresholds.beginner;
  const xpProgress = Math.min(
    (((progress?.xp_points ?? 0) - currentLevel.min) /
      (currentLevel.max - currentLevel.min)) *
      100,
    100,
  );

  const difficultyColor = (d: string) => {
    if (d === 'easy') return colors.success;
    if (d === 'medium') return colors.secondary;
    return colors.destructive;
  };

  const typeIcon = (t: string) => {
    if (t === 'vocabulary') return 'book';
    if (t === 'conversation') return 'chatbubbles';
    if (t === 'writing') return 'pencil';
    return 'school';
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>ف</Text>
          </View>
          <View style={{ flex: 1, marginLeft: 14 }}>
            <Text style={styles.userName}>Fatima</Text>
            <Text style={styles.userLevel}>{currentLevel.label}</Text>
          </View>
          <View
            style={[
              styles.apiStatusBadge,
              {
                backgroundColor: hasApiKey
                  ? `${colors.success}20`
                  : `${colors.destructive}15`,
              },
            ]}
          >
            <View
              style={[
                styles.apiStatusDot,
                {
                  backgroundColor: hasApiKey
                    ? colors.success
                    : colors.destructive,
                },
              ]}
            />
            <Text
              style={[
                styles.apiStatusText,
                { color: hasApiKey ? colors.success : colors.destructive },
              ]}
            >
              {hasApiKey ? 'IA active' : 'IA inactive'}
            </Text>
          </View>
        </View>

        {/* XP Progress */}
        <Card style={styles.xpCard}>
          <View style={styles.xpHeader}>
            <Text style={styles.xpLevel}>{currentLevel.label}</Text>
            <Text style={styles.xpValue}>
              {progress?.xp_points ?? 0} / {currentLevel.max} XP
            </Text>
          </View>
          <ProgressBar progress={xpProgress} height={10} color={colors.primary} />
          <Text style={styles.xpNext}>
            Prochain : {currentLevel.next} (
            {currentLevel.max - (progress?.xp_points ?? 0)} XP restants)
          </Text>
        </Card>

        {/* Section tabs */}
        <View style={styles.tabsRow}>
          {(['stats', 'errors', 'report', 'settings'] as const).map(tab => (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, activeSection === tab && styles.tabActive]}
              onPress={() => setActiveSection(tab)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.tabText,
                  activeSection === tab && styles.tabTextActive,
                ]}
              >
                {tab === 'stats'
                  ? '📊'
                  : tab === 'errors'
                  ? '🎯'
                  : tab === 'report'
                  ? '📋'
                  : '⚙️'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* ── STATS ── */}
        {activeSection === 'stats' && (
          <View>
            <View style={styles.statsGrid}>
              <StatItem
                icon="flame"
                value={progress?.streak_days ?? 0}
                label="Jours"
                color={colors.secondary}
              />
              <StatItem
                icon="book"
                value={progress?.lessons_completed ?? 0}
                label="Leçons"
                color={colors.primary}
              />
              <StatItem
                icon="chatbubbles"
                value={progress?.conversations_count ?? 0}
                label="Convos"
                color={colors.accent}
              />
              <StatItem
                icon="pencil"
                value={progress?.writing_exercises_count ?? 0}
                label="Écriture"
                color={colors.secondary}
              />
              <StatItem
                icon="language"
                value={progress?.vocab_learned ?? 0}
                label="Mots"
                color={colors.primary}
              />
              <StatItem
                icon="flash"
                value={creditsRemaining()}
                label="Crédits"
                color={colors.accent}
              />
            </View>

            <Card style={styles.creditsCard}>
              <View style={styles.creditsHeader}>
                <Ionicons name="flash" size={18} color={colors.primary} />
                <Text style={styles.creditsTitle}>Crédits IA</Text>
                <Text style={styles.creditsCount}>
                  {creditsUsed} / {MAX_AI_CREDITS}
                </Text>
              </View>
              <ProgressBar
                progress={(creditsUsed / MAX_AI_CREDITS) * 100}
                height={8}
                color={colors.primary}
              />
            </Card>

            <Card style={styles.achievementsCard}>
              <Text style={styles.sectionTitle}>🏆 Succès</Text>
              <Achievement
                title="Premier pas"
                description="Termine ta première leçon"
                completed={(progress?.lessons_completed ?? 0) > 0}
              />
              <Achievement
                title="Élève assidue"
                description="7 jours consécutifs"
                completed={(progress?.streak_days ?? 0) >= 7}
              />
              <Achievement
                title="Vocabulaire riche"
                description="Apprendre 50 mots"
                completed={(progress?.vocab_learned ?? 0) >= 50}
              />
              <Achievement
                title="Conversationniste"
                description="10 conversations avec l'IA"
                completed={(progress?.conversations_count ?? 0) >= 10}
              />
              <Achievement
                title="Calligraphe"
                description="20 exercices d'écriture"
                completed={(progress?.writing_exercises_count ?? 0) >= 20}
              />
            </Card>

            <TouchableOpacity style={styles.resetBtn} onPress={handleReset}>
              <Ionicons name="trash-outline" size={16} color={colors.destructive} />
              <Text style={styles.resetBtnText}>Réinitialiser la progression</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* ── ERRORS ── */}
        {activeSection === 'errors' && (
          <View>
            {errorSummary.total_errors === 0 ? (
              <Card style={styles.emptyCard}>
                <Text style={styles.emptyEmoji}>🌟</Text>
                <Text style={styles.emptyTitle}>Aucune erreur !</Text>
                <Text style={styles.emptyBody}>
                  Continue à pratiquer pour que l'IA personnalise tes exercices.
                </Text>
              </Card>
            ) : (
              <View>
                <Card style={styles.errorSummaryCard}>
                  <Text style={styles.sectionTitle}>📊 Résumé</Text>
                  <View style={styles.errorStatsRow}>
                    <View style={styles.errorStatItem}>
                      <Text style={styles.errorStatValue}>
                        {errorSummary.total_errors}
                      </Text>
                      <Text style={styles.errorStatLabel}>Actives</Text>
                    </View>
                    <View style={styles.errorStatItem}>
                      <Text style={styles.errorStatValue}>
                        {errorSummary.resolved_count}
                      </Text>
                      <Text style={styles.errorStatLabel}>Résolues</Text>
                    </View>
                    <View style={styles.errorStatItem}>
                      <Text style={styles.errorStatValue}>
                        {errorSummary.sessions_count}
                      </Text>
                      <Text style={styles.errorStatLabel}>Sessions</Text>
                    </View>
                  </View>
                </Card>

                {errorSummary.improvement_areas.length > 0 && (
                  <Card style={styles.improvCard}>
                    <Text style={styles.sectionTitle}>🎯 À améliorer</Text>
                    {errorSummary.improvement_areas.map((area, i) => (
                      <View key={i} style={styles.improvRow}>
                        <Ionicons
                          name="alert-circle"
                          size={14}
                          color={colors.secondary}
                        />
                        <Text style={styles.improvText}>{area}</Text>
                      </View>
                    ))}
                  </Card>
                )}

                {errorSummary.weak_categories.length > 0 && (
                  <Card style={styles.weakCard}>
                    <Text style={styles.sectionTitle}>📚 Catégories à revoir</Text>
                    <View style={styles.chipsRow}>
                      {errorSummary.weak_categories.map((cat, i) => (
                        <View key={i} style={styles.chip}>
                          <Text style={styles.chipText}>{cat}</Text>
                        </View>
                      ))}
                    </View>
                  </Card>
                )}

                <Card style={styles.recentErrorsCard}>
                  <Text style={styles.sectionTitle}>🔍 Erreurs récentes</Text>
                  {errorSummary.recent_errors.slice(0, 8).map((err, i) => (
                    <View
                      key={err.id}
                      style={[
                        styles.errorRow,
                        i < errorSummary.recent_errors.length - 1 &&
                          styles.errorRowBorder,
                      ]}
                    >
                      <View
                        style={[
                          styles.errTypeDot,
                          { backgroundColor: errTypeColor(err.type) },
                        ]}
                      />
                      <View style={{ flex: 1 }}>
                        <Text style={styles.errorForm} numberOfLines={2}>
                          <Text style={styles.errorAttempt}>
                            {err.user_attempt}
                          </Text>
                          {' → '}
                          <Text style={styles.errorCorrect}>
                            {err.correct_form}
                          </Text>
                        </Text>
                        <Text style={styles.errorMeta}>
                          {err.type} · {err.category} · {err.count}×
                        </Text>
                      </View>
                    </View>
                  ))}
                </Card>
              </View>
            )}
          </View>
        )}

        {/* ── REPORT ── */}
        {activeSection === 'report' && (
          <View>
            <TouchableOpacity
              style={[
                styles.generateReportBtn,
                (generatingReport || generatingExercises) && { opacity: 0.6 },
              ]}
              onPress={generateAIReport}
              disabled={generatingReport || generatingExercises || !hasApiKey}
              activeOpacity={0.85}
            >
              {generatingReport ? (
                <>
                  <ActivityIndicator color={colors.white} size="small" />
                  <Text style={styles.generateReportBtnText}>
                    Génération du rapport...
                  </Text>
                </>
              ) : generatingExercises ? (
                <>
                  <ActivityIndicator color={colors.white} size="small" />
                  <Text style={styles.generateReportBtnText}>
                    Génération des exercices...
                  </Text>
                </>
              ) : (
                <>
                  <Ionicons name="document-text" size={18} color={colors.white} />
                  <Text style={styles.generateReportBtnText}>
                    {aiReport ? 'Régénérer rapport + exercices' : 'Générer rapport IA'}
                  </Text>
                </>
              )}
            </TouchableOpacity>

            {!hasApiKey && (
              <Card style={styles.noKeyWarning}>
                <Ionicons name="warning" size={16} color={colors.secondary} />
                <Text style={styles.noKeyText}>
                  Configurez votre clé API dans ⚙️ pour générer un rapport.
                </Text>
              </Card>
            )}

            {/* Exercises section */}
            {(aiExercises.length > 0 || generatingExercises) && (
              <Card style={styles.exercisesCard}>
                <View style={styles.exercisesHeader}>
                  <Ionicons name="fitness" size={18} color={colors.primary} />
                  <Text style={styles.exercisesTitle}>
                    Exercices personnalisés
                  </Text>
                  {generatingExercises && (
                    <ActivityIndicator size="small" color={colors.primary} />
                  )}
                </View>
                {exercisesSummary ? (
                  <Text style={styles.exercisesSummary}>{exercisesSummary}</Text>
                ) : null}
                {aiExercises.map((ex, i) => (
                  <TouchableOpacity
                    key={i}
                    style={styles.exerciseItem}
                    onPress={() =>
                      setExpandedExercise(expandedExercise === i ? null : i)
                    }
                    activeOpacity={0.8}
                  >
                    <View style={styles.exerciseItemHeader}>
                      <View
                        style={[
                          styles.exerciseTypeIcon,
                          {
                            backgroundColor: `${difficultyColor(ex.difficulty)}20`,
                          },
                        ]}
                      >
                        <Ionicons
                          name={typeIcon(ex.type) as any}
                          size={16}
                          color={difficultyColor(ex.difficulty)}
                        />
                      </View>
                      <View style={{ flex: 1, marginLeft: 10 }}>
                        <Text style={styles.exerciseTitle} numberOfLines={2}>
                          {ex.title}
                        </Text>
                        <Text style={styles.exerciseMeta}>
                          {ex.category} ·{' '}
                          <Text
                            style={{ color: difficultyColor(ex.difficulty) }}
                          >
                            {ex.difficulty}
                          </Text>
                        </Text>
                      </View>
                      <Ionicons
                        name={
                          expandedExercise === i
                            ? 'chevron-up'
                            : 'chevron-down'
                        }
                        size={16}
                        color={colors.textMuted}
                      />
                    </View>

                    {expandedExercise === i && (
                      <View style={styles.exerciseExpanded}>
                        <Text style={styles.exerciseInstruction}>
                          {ex.instruction}
                        </Text>
                        {ex.content.length > 0 && (
                          <View style={styles.exerciseContent}>
                            {ex.content.map((c, ci) => (
                              <View key={ci} style={styles.exerciseContentItem}>
                                <Text style={styles.exerciseContentDot}>•</Text>
                                <Text style={styles.exerciseContentText}>
                                  {c}
                                </Text>
                              </View>
                            ))}
                          </View>
                        )}
                        {ex.tips.length > 0 && (
                          <View style={styles.exerciseTipsBox}>
                            <Text style={styles.exerciseTipsTitle}>
                              💡 Conseils
                            </Text>
                            {ex.tips.map((t, ti) => (
                              <Text key={ti} style={styles.exerciseTipText}>
                                {t}
                              </Text>
                            ))}
                          </View>
                        )}
                      </View>
                    )}
                  </TouchableOpacity>
                ))}
              </Card>
            )}

            {/* Report cards */}
            {aiReport && (
              <View>
                <Card style={styles.reportCard}>
                  <View style={styles.reportHeader}>
                    <Text style={styles.reportTitle}>📋 Rapport</Text>
                    <Text style={styles.reportDate}>
                      {new Date(aiReport.generated_at).toLocaleDateString(
                        'fr-FR',
                      )}
                    </Text>
                  </View>
                  <View style={styles.reportLevel}>
                    <Text style={styles.reportLevelLabel}>Niveau :</Text>
                    <Text style={styles.reportLevelValue}>
                      {aiReport.overall_level}
                    </Text>
                  </View>
                  <Text style={styles.reportEncouragement}>
                    {aiReport.encouragement}
                  </Text>
                </Card>

                <Card style={styles.reportCard}>
                  <Text style={styles.reportSectionTitle}>💪 Points forts</Text>
                  {aiReport.strengths.map((s, i) => (
                    <View key={i} style={styles.reportBullet}>
                      <Text style={styles.reportBulletDot}>✅</Text>
                      <Text style={styles.reportBulletText}>{s}</Text>
                    </View>
                  ))}
                </Card>

                <Card style={styles.reportCard}>
                  <Text style={styles.reportSectionTitle}>
                    🎯 À améliorer
                  </Text>
                  {aiReport.weaknesses.map((w, i) => (
                    <View key={i} style={styles.reportBullet}>
                      <Text style={styles.reportBulletDot}>📌</Text>
                      <Text style={styles.reportBulletText}>{w}</Text>
                    </View>
                  ))}
                </Card>

                <Card style={styles.reportCard}>
                  <Text style={styles.reportSectionTitle}>
                    📅 Plan 7 jours
                  </Text>
                  {aiReport.recommended_plan.map((step, i) => (
                    <View key={i} style={styles.planStep}>
                      <View style={styles.planStepNum}>
                        <Text style={styles.planStepNumText}>{i + 1}</Text>
                      </View>
                      <Text style={styles.planStepText}>{step}</Text>
                    </View>
                  ))}
                </Card>

                <Card style={styles.reportCard}>
                  <Text style={styles.reportSectionTitle}>⭐ Objectifs</Text>
                  <View style={styles.objectiveItem}>
                    <Text style={styles.objectiveLabel}>Aujourd'hui :</Text>
                    <Text style={styles.objectiveValue}>
                      {aiReport.daily_goal}
                    </Text>
                  </View>
                  <View style={styles.objectiveItem}>
                    <Text style={styles.objectiveLabel}>Cette semaine :</Text>
                    <Text style={styles.objectiveValue}>
                      {aiReport.weekly_objective}
                    </Text>
                  </View>
                </Card>
              </View>
            )}
          </View>
        )}

        {/* ── SETTINGS / API ── */}
        {activeSection === 'settings' && (
          <View>
            <Card style={styles.apiCard}>
              <View style={styles.apiHeader}>
                <Ionicons name="key" size={20} color={colors.primary} />
                <Text style={styles.apiTitle}>Clé API Gemini</Text>
              </View>

              <Text style={styles.apiDescription}>
                Pour utiliser les fonctionnalités IA, vous avez besoin d'une
                clé API Gemini gratuite (Google AI Studio).
              </Text>

              <View style={styles.keyStatusRow}>
                <View
                  style={[
                    styles.keyStatusIndicator,
                    {
                      backgroundColor: hasApiKey
                        ? `${colors.success}20`
                        : `${colors.destructive}10`,
                    },
                  ]}
                >
                  <Ionicons
                    name={
                      hasApiKey ? 'checkmark-circle' : 'close-circle'
                    }
                    size={16}
                    color={hasApiKey ? colors.success : colors.destructive}
                  />
                  <Text
                    style={[
                      styles.keyStatusText,
                      {
                        color: hasApiKey
                          ? colors.success
                          : colors.destructive,
                      },
                    ]}
                  >
                    {hasApiKey ? 'Clé configurée' : 'Aucune clé'}
                  </Text>
                </View>
                {hasApiKey && (
                  <Text style={styles.keyPreview}>
                    {apiKey.substring(0, 6)}••••{apiKey.slice(-4)}
                  </Text>
                )}
              </View>

              {showApiKeyInput ? (
                <View style={styles.apiInputContainer}>
                  <View style={styles.apiInputRow}>
                    <TextInput
                      style={styles.apiInput}
                      value={apiKeyInput}
                      onChangeText={setApiKeyInput}
                      placeholder="AIza..."
                      placeholderTextColor={colors.textMuted}
                      secureTextEntry={!showApiKey}
                      autoCapitalize="none"
                      autoCorrect={false}
                    />
                    <TouchableOpacity
                      onPress={() => setShowApiKey(v => !v)}
                      style={styles.eyeBtn}
                    >
                      <Ionicons
                        name={showApiKey ? 'eye-off' : 'eye'}
                        size={18}
                        color={colors.textMuted}
                      />
                    </TouchableOpacity>
                  </View>

                  <View style={styles.apiActions}>
                    <TouchableOpacity
                      style={[
                        styles.apiActionBtn,
                        styles.apiTestBtn,
                        testingKey && { opacity: 0.6 },
                      ]}
                      onPress={handleTestApiKey}
                      disabled={testingKey}
                    >
                      {testingKey ? (
                        <ActivityIndicator
                          size="small"
                          color={colors.primary}
                        />
                      ) : (
                        <Text style={styles.apiTestBtnText}>Tester</Text>
                      )}
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.apiActionBtn,
                        styles.apiSaveBtn,
                        savingKey && { opacity: 0.6 },
                      ]}
                      onPress={handleSaveApiKey}
                      disabled={savingKey}
                    >
                      {savingKey ? (
                        <ActivityIndicator size="small" color={colors.white} />
                      ) : (
                        <Text style={styles.apiSaveBtnText}>Enregistrer</Text>
                      )}
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.apiCancelBtn}
                      onPress={() => {
                        setShowApiKeyInput(false);
                        setApiKeyInput(apiKey);
                      }}
                    >
                      <Text style={styles.apiCancelBtnText}>Annuler</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                <View style={styles.apiButtonsRow}>
                  <TouchableOpacity
                    style={styles.apiEditBtn}
                    onPress={() => setShowApiKeyInput(true)}
                    activeOpacity={0.8}
                  >
                    <Ionicons
                      name={hasApiKey ? 'pencil' : 'add'}
                      size={16}
                      color={colors.white}
                    />
                    <Text style={styles.apiEditBtnText}>
                      {hasApiKey ? 'Modifier' : 'Ajouter ma clé'}
                    </Text>
                  </TouchableOpacity>
                  {hasApiKey && (
                    <TouchableOpacity
                      style={styles.apiDeleteBtn}
                      onPress={handleClearApiKey}
                    >
                      <Ionicons
                        name="trash-outline"
                        size={16}
                        color={colors.destructive}
                      />
                    </TouchableOpacity>
                  )}
                </View>
              )}
            </Card>

            <Card style={styles.howToCard}>
              <Text style={styles.howToTitle}>
                🔑 Obtenir une clé API gratuite
              </Text>
              {[
                'Allez sur aistudio.google.com',
                'Connectez-vous avec Google',
                'Cliquez "Get API key" → "Create API key"',
                'Copiez la clé (AIza...) et collez-la ci-dessus',
              ].map((step, i) => (
                <View key={i} style={styles.howToStep}>
                  <View style={styles.howToNumContainer}>
                    <Text style={styles.howToNum}>{i + 1}</Text>
                  </View>
                  <Text style={styles.howToText}>{step}</Text>
                </View>
              ))}
              <Text style={styles.howToNote}>
                💡 Plan gratuit : 1500 requêtes/jour, largement suffisant !
              </Text>
            </Card>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

function errTypeColor(type: string) {
  const map: Record<string, string> = {
    writing: colors.secondary,
    pronunciation: colors.primary,
    vocabulary: colors.accent,
    grammar: colors.destructive,
  };
  return map[type] || colors.textMuted;
}

function StatItem({
  icon,
  value,
  label,
  color,
}: {
  icon: string;
  value: number;
  label: string;
  color: string;
}) {
  return (
    <View style={styles.statItem}>
      <View style={[styles.statIcon, { backgroundColor: `${color}18` }]}>
        <Ionicons name={icon as any} size={18} color={color} />
      </View>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function Achievement({
  title,
  description,
  completed,
}: {
  title: string;
  description: string;
  completed: boolean;
}) {
  return (
    <View style={styles.achievementItem}>
      <Ionicons
        name={completed ? 'checkmark-circle' : 'ellipse-outline'}
        size={20}
        color={completed ? colors.success : colors.textMuted}
        style={{ marginRight: spacing.md }}
      />
      <View style={{ flex: 1 }}>
        <Text
          style={[
            styles.achievementTitle,
            completed && { color: colors.success },
          ]}
        >
          {title}
        </Text>
        <Text style={styles.achievementDesc}>{description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  container: { flex: 1 },
  content: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 120,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Header
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: { fontSize: 22, fontWeight: '700', color: colors.white },
  userName: {
    fontSize: fontSize.lg,
    fontWeight: '700',
    color: colors.text,
  },
  userLevel: { fontSize: fontSize.xs, color: colors.textMuted, marginTop: 2 },
  apiStatusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: borderRadius.full,
    gap: 4,
  },
  apiStatusDot: { width: 6, height: 6, borderRadius: 3 },
  apiStatusText: { fontSize: 10, fontWeight: '700' },

  // XP
  xpCard: { marginBottom: 12 },
  xpHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  xpLevel: {
    fontSize: fontSize.sm,
    fontWeight: '700',
    color: colors.primary,
  },
  xpValue: { fontSize: fontSize.xs, color: colors.textMuted },
  xpNext: {
    fontSize: fontSize.xs,
    color: colors.textMuted,
    marginTop: 6,
  },

  // Tabs
  tabsRow: { flexDirection: 'row', gap: 6, marginBottom: 14 },
  tab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: borderRadius.lg,
    backgroundColor: `${colors.textMuted}10`,
    alignItems: 'center',
  },
  tabActive: { backgroundColor: colors.primary },
  tabText: { fontSize: 16 },
  tabTextActive: { color: colors.white },

  // Stats
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  statItem: {
    width: (SCREEN_WIDTH - 32 - 16) / 3,
    backgroundColor: colors.card,
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 10,
    alignItems: 'center',
  },
  statIcon: {
    width: 34,
    height: 34,
    borderRadius: 17,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  statValue: {
    fontSize: fontSize.lg,
    fontWeight: '800',
    color: colors.text,
  },
  statLabel: {
    fontSize: 9,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: 2,
    fontWeight: '600',
  },

  creditsCard: { marginBottom: 12 },
  creditsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
  },
  creditsTitle: {
    fontSize: fontSize.sm,
    fontWeight: '700',
    color: colors.text,
    flex: 1,
  },
  creditsCount: { fontSize: fontSize.xs, color: colors.textMuted },

  achievementsCard: { marginBottom: 12 },
  achievementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: `${colors.border}80`,
  },
  achievementTitle: {
    fontSize: fontSize.sm,
    fontWeight: '600',
    color: colors.text,
  },
  achievementDesc: {
    fontSize: fontSize.xs,
    color: colors.textMuted,
    marginTop: 1,
  },
  sectionTitle: {
    fontSize: fontSize.base,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 10,
  },
  resetBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 12,
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: `${colors.destructive}40`,
    marginBottom: 16,
  },
  resetBtnText: {
    fontSize: fontSize.sm,
    color: colors.destructive,
    fontWeight: '600',
  },

  // Errors
  emptyCard: { alignItems: 'center', paddingVertical: 32 },
  emptyEmoji: { fontSize: 36, marginBottom: 8 },
  emptyTitle: {
    fontSize: fontSize.lg,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 6,
  },
  emptyBody: {
    fontSize: fontSize.sm,
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: 20,
  },

  errorSummaryCard: { marginBottom: 10 },
  errorStatsRow: { flexDirection: 'row', justifyContent: 'space-around' },
  errorStatItem: { alignItems: 'center' },
  errorStatValue: {
    fontSize: fontSize['2xl'],
    fontWeight: '800',
    color: colors.primary,
  },
  errorStatLabel: { fontSize: fontSize.xs, color: colors.textMuted },

  improvCard: {
    marginBottom: 10,
    backgroundColor: `${colors.secondary}08`,
  },
  improvRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  improvText: {
    fontSize: fontSize.sm,
    color: colors.text,
    textTransform: 'capitalize',
    flex: 1,
  },

  weakCard: { marginBottom: 10 },
  chipsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: {
    backgroundColor: `${colors.primary}12`,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: borderRadius.full,
  },
  chipText: {
    fontSize: fontSize.xs,
    color: colors.primary,
    fontWeight: '600',
  },

  recentErrorsCard: { marginBottom: 12 },
  errorRow: {
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  errorRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: `${colors.border}60`,
  },
  errTypeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginTop: 5,
    flexShrink: 0,
  },
  errorForm: { fontSize: fontSize.sm, color: colors.text, flexWrap: 'wrap' },
  errorAttempt: { color: colors.destructive, fontWeight: '600' },
  errorCorrect: { color: colors.success, fontWeight: '600' },
  errorMeta: {
    fontSize: fontSize.xs,
    color: colors.textMuted,
    marginTop: 2,
  },

  // Report
  generateReportBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    borderRadius: borderRadius['2xl'],
    paddingVertical: 14,
    gap: 8,
    marginBottom: 12,
  },
  generateReportBtnText: {
    color: colors.white,
    fontSize: fontSize.base,
    fontWeight: '700',
    flexShrink: 1,
  },
  noKeyWarning: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    marginBottom: 12,
    backgroundColor: `${colors.secondary}10`,
  },
  noKeyText: {
    fontSize: fontSize.sm,
    color: colors.text,
    flex: 1,
    lineHeight: 20,
    flexWrap: 'wrap',
  },

  // Exercises card
  exercisesCard: { marginBottom: 12 },
  exercisesHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  exercisesTitle: {
    fontSize: fontSize.base,
    fontWeight: '700',
    color: colors.text,
    flex: 1,
  },
  exercisesSummary: {
    fontSize: fontSize.sm,
    color: colors.textMuted,
    fontStyle: 'italic',
    marginBottom: 12,
    lineHeight: 18,
  },
  exerciseItem: {
    backgroundColor: `${colors.primary}06`,
    borderRadius: borderRadius.lg,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: `${colors.primary}15`,
  },
  exerciseItemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  exerciseTypeIcon: {
    width: 34,
    height: 34,
    borderRadius: 17,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  exerciseTitle: {
    fontSize: fontSize.sm,
    fontWeight: '700',
    color: colors.text,
    flexWrap: 'wrap',
  },
  exerciseMeta: {
    fontSize: fontSize.xs,
    color: colors.textMuted,
    marginTop: 2,
  },
  exerciseExpanded: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: `${colors.border}60`,
  },
  exerciseInstruction: {
    fontSize: fontSize.sm,
    color: colors.text,
    lineHeight: 20,
    marginBottom: 10,
    fontStyle: 'italic',
  },
  exerciseContent: { marginBottom: 10 },
  exerciseContentItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 6,
    marginBottom: 4,
  },
  exerciseContentDot: {
    fontSize: fontSize.sm,
    color: colors.primary,
    lineHeight: 20,
  },
  exerciseContentText: {
    fontSize: fontSize.sm,
    color: colors.text,
    flex: 1,
    lineHeight: 20,
    flexWrap: 'wrap',
  },
  exerciseTipsBox: {
    backgroundColor: `${colors.accent}10`,
    borderRadius: borderRadius.md,
    padding: 10,
  },
  exerciseTipsTitle: {
    fontSize: fontSize.xs,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 6,
  },
  exerciseTipText: {
    fontSize: fontSize.xs,
    color: colors.textMuted,
    lineHeight: 18,
    marginBottom: 2,
  },

  reportCard: { marginBottom: 10 },
  reportHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  reportTitle: {
    fontSize: fontSize.base,
    fontWeight: '700',
    color: colors.text,
  },
  reportDate: { fontSize: fontSize.xs, color: colors.textMuted },
  reportLevel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
    flexWrap: 'wrap',
  },
  reportLevelLabel: { fontSize: fontSize.sm, color: colors.textMuted },
  reportLevelValue: {
    fontSize: fontSize.base,
    fontWeight: '700',
    color: colors.primary,
    flexShrink: 1,
  },
  reportEncouragement: {
    fontSize: fontSize.sm,
    color: colors.text,
    fontStyle: 'italic',
    lineHeight: 20,
    borderLeftWidth: 3,
    borderLeftColor: colors.primary,
    paddingLeft: 10,
    flexWrap: 'wrap',
  },
  reportSectionTitle: {
    fontSize: fontSize.base,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 10,
  },
  reportBullet: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    marginBottom: 6,
  },
  reportBulletDot: { fontSize: 13, marginTop: 1, flexShrink: 0 },
  reportBulletText: {
    fontSize: fontSize.sm,
    color: colors.text,
    flex: 1,
    lineHeight: 20,
    flexWrap: 'wrap',
  },

  planStep: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    marginBottom: 8,
  },
  planStepNum: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  planStepNumText: { color: colors.white, fontSize: 10, fontWeight: '700' },
  planStepText: {
    flex: 1,
    fontSize: fontSize.sm,
    color: colors.text,
    lineHeight: 20,
    flexWrap: 'wrap',
  },

  objectiveItem: { marginBottom: 8 },
  objectiveLabel: {
    fontSize: fontSize.xs,
    color: colors.textMuted,
    fontWeight: '700',
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  objectiveValue: {
    fontSize: fontSize.sm,
    color: colors.text,
    lineHeight: 20,
    flexWrap: 'wrap',
  },

  // API Settings
  apiCard: { marginBottom: 12 },
  apiHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 8,
  },
  apiTitle: {
    fontSize: fontSize.base,
    fontWeight: '700',
    color: colors.text,
  },
  apiDescription: {
    fontSize: fontSize.sm,
    color: colors.textMuted,
    lineHeight: 20,
    marginBottom: 12,
    flexWrap: 'wrap',
  },

  keyStatusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
    flexWrap: 'wrap',
    gap: 8,
  },
  keyStatusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: borderRadius.full,
  },
  keyStatusText: { fontSize: fontSize.xs, fontWeight: '700' },
  keyPreview: {
    fontSize: fontSize.xs,
    color: colors.textMuted,
  },

  apiInputContainer: { gap: 10 },
  apiInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: borderRadius.xl,
    backgroundColor: colors.background,
    paddingHorizontal: 12,
    paddingVertical: 2,
  },
  apiInput: {
    flex: 1,
    fontSize: fontSize.sm,
    color: colors.text,
    paddingVertical: 10,
  },
  eyeBtn: { padding: 8 },

  apiActions: { flexDirection: 'row', gap: 8 },
  apiActionBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: borderRadius.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  apiTestBtn: {
    backgroundColor: `${colors.primary}12`,
    borderWidth: 1,
    borderColor: `${colors.primary}25`,
  },
  apiTestBtnText: {
    fontSize: fontSize.sm,
    fontWeight: '700',
    color: colors.primary,
  },
  apiSaveBtn: { backgroundColor: colors.primary },
  apiSaveBtnText: {
    fontSize: fontSize.sm,
    fontWeight: '700',
    color: colors.white,
  },
  apiCancelBtn: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: borderRadius.xl,
    backgroundColor: `${colors.textMuted}12`,
  },
  apiCancelBtnText: {
    fontSize: fontSize.sm,
    fontWeight: '600',
    color: colors.textMuted,
  },

  apiButtonsRow: { flexDirection: 'row', gap: 10 },
  apiEditBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: colors.primary,
    borderRadius: borderRadius.xl,
    paddingVertical: 12,
  },
  apiEditBtnText: {
    color: colors.white,
    fontSize: fontSize.sm,
    fontWeight: '700',
  },
  apiDeleteBtn: {
    width: 44,
    height: 44,
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: `${colors.destructive}40`,
    justifyContent: 'center',
    alignItems: 'center',
  },

  howToCard: { marginBottom: 16, backgroundColor: `${colors.accent}08` },
  howToTitle: {
    fontSize: fontSize.sm,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 12,
  },
  howToStep: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    marginBottom: 8,
  },
  howToNumContainer: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  howToNum: {
    color: colors.white,
    fontSize: 11,
    fontWeight: '700',
    textAlign: 'center',
  },
  howToText: {
    fontSize: fontSize.sm,
    color: colors.text,
    flex: 1,
    lineHeight: 20,
    flexWrap: 'wrap',
  },
  howToNote: {
    fontSize: fontSize.xs,
    color: colors.primary,
    fontStyle: 'italic',
    marginTop: 6,
    lineHeight: 18,
  },
});