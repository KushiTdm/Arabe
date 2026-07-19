import React, { useState, useCallback } from 'react';
import {
  View, Text, StyleSheet, ScrollView, Alert, TextInput, Image,
  TouchableOpacity, ActivityIndicator, Dimensions, Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { useProfile } from '../lib/ProfileContext';
import { MAX_AI_CREDITS } from '../lib/useProfiles';
import { computeBadges } from '../lib/badges';
import { SUPPORTED_LANGUAGES } from '../lib/languages';
import { LANGUAGE_IMAGES } from '../theme/images';
import { useErrorTracker } from '../lib/useErrorTracker';
import { Card, LoadingSpinner, ProgressBar } from '../components/RNComponents';
import { colors, spacing, borderRadius, fontSize } from '../theme';
import {
  getApiKey, saveApiKey, clearApiKey, invokeAI,
  getModel, saveModel, GEMINI_FREE_MODELS, DEFAULT_MODEL,
} from '../api/aiClient';

import { CONTENT_WIDTH } from '../lib/dimensions';

const SCREEN_WIDTH = CONTENT_WIDTH;

const REPORT_KEY_PREFIX   = '@maa_ai_report_';
const EXERCISES_KEY_PREFIX = '@maa_ai_exercises_';

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

const AVATARS = [
  '🦁', '🐬', '🦊', '🐧', '🦋', '🐙', '🦚', '🐨', '🦄', '🐺',
  '🦝', '🦜', '🐸', '🐯', '🦅', '🐳', '🌟', '🔥', '🎭', '🌈',
];

export default function ProfileScreen() {
  const {
    currentProgress: progress, loading, creditsRemaining,
    activeProfile, profiles, language,
    switchLanguage, createProfile, switchProfile, deleteProfile,
  } = useProfile();

  const {
    getErrorSummary, getErrorsForAIPrompt, clearErrors,
    reload: reloadErrors,
  } = useErrorTracker();

  const userName     = activeProfile?.name ?? 'Apprenant';
  const userAvatar   = activeProfile?.avatar ?? '🌍';
  const profileKey   = activeProfile?.id ?? 'default';
  const reportKey    = `${REPORT_KEY_PREFIX}${profileKey}_${activeProfile?.activeLanguageCode}`;
  const exercisesKey = `${EXERCISES_KEY_PREFIX}${profileKey}_${activeProfile?.activeLanguageCode}`;

  const [apiKey, setApiKey]               = useState('');
  const [apiKeyInput, setApiKeyInput]     = useState('');
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);
  const [showApiKey, setShowApiKey]       = useState(false);
  const [savingKey, setSavingKey]         = useState(false);
  const [testingKey, setTestingKey]       = useState(false);
  const [selectedModel, setSelectedModel] = useState(DEFAULT_MODEL);

  const [aiReport, setAiReport]           = useState<AIReport | null>(null);
  const [generatingReport, setGeneratingReport] = useState(false);
  const [aiExercises, setAiExercises]     = useState<GeneratedExercise[]>([]);
  const [exercisesSummary, setExercisesSummary] = useState('');
  const [generatingExercises, setGeneratingExercises] = useState(false);
  const [expandedExercise, setExpandedExercise] = useState<number | null>(null);

  const [activeSection, setActiveSection] = useState<'stats' | 'errors' | 'report' | 'settings'>('stats');

  // Modal langue
  const [showLangPicker, setShowLangPicker] = useState(false);
  // Modal nouveau profil
  const [showNewProfile, setShowNewProfile] = useState(false);
  const [newProfileName, setNewProfileName] = useState('');
  const [newProfileAvatar, setNewProfileAvatar] = useState(AVATARS[0]);
  const [newProfileLang, setNewProfileLang] = useState(language.code);
  const [creatingProfile, setCreatingProfile] = useState(false);

  useFocusEffect(useCallback(() => {
    loadApiKey();
    loadModel();
    loadCachedReport();
    loadCachedExercises();
    reloadErrors?.();
    // Ne pas appeler reloadProgress() ici — il remet loading=true dans le contexte global
    // et fait disparaître la navigation. La progression est déjà réactive via le contexte.
  }, [profileKey, activeProfile?.activeLanguageCode]));

  const loadApiKey = async () => {
    const key = await getApiKey();
    setApiKey(key);
    setApiKeyInput(key);
  };

  const loadModel = async () => {
    const model = await getModel();
    setSelectedModel(model);
  };

  const loadCachedReport = async () => {
    try {
      const raw = await AsyncStorage.getItem(reportKey);
      if (raw) setAiReport(JSON.parse(raw));
      else setAiReport(null);
    } catch {}
  };

  const loadCachedExercises = async () => {
    try {
      const raw = await AsyncStorage.getItem(exercisesKey);
      if (raw) {
        const data: AIExercisesResponse = JSON.parse(raw);
        setAiExercises(data.exercises || []);
        setExercisesSummary(data.summary || '');
      } else {
        setAiExercises([]);
        setExercisesSummary('');
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
      Alert.alert('✅ Clé enregistrée', 'Votre clé API Gemini a été sauvegardée !');
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
        Alert.alert('✅ Clé valide !', res.message || 'Votre clé API fonctionne.');
      }
    } catch (err: any) {
      Alert.alert('❌ Clé invalide', err?.message || 'Vérifiez sur console.cloud.google.com');
    } finally {
      setTestingKey(false);
    }
  };

  const handleClearApiKey = () => {
    Alert.alert('Supprimer la clé API', 'Les fonctionnalités IA ne seront plus disponibles.', [
      { text: 'Annuler', style: 'cancel' },
      { text: 'Supprimer', style: 'destructive', onPress: async () => {
        await clearApiKey();
        setApiKey('');
        setApiKeyInput('');
      }},
    ]);
  };

  const generateExercisesFromReport = async (report: AIReport) => {
    setGeneratingExercises(true);
    try {
      const errorsCtx = getErrorsForAIPrompt();
      const summary   = getErrorSummary();
      const res = await invokeAI<AIExercisesResponse>(
        `${language.aiSeedPrompt}

En te basant sur le rapport de progression de ${userName}, génère des exercices personnalisés pour toutes les catégories.

Rapport actuel:
- Niveau: ${report.overall_level}
- Points forts: ${report.strengths.join(', ')}
- Axes d'amélioration: ${report.weaknesses.join(', ')}
- Objectif quotidien: ${report.daily_goal}

${errorsCtx}
Erreurs fréquentes: ${summary.weak_categories?.join(', ') || 'aucune'}

Génère exactement 8 exercices variés (vocabulary, conversation, writing, grammar).
JSON: {
  "summary": "Résumé en 1 phrase",
  "exercises": [{"category":"...","title":"...","type":"vocabulary","difficulty":"easy","instruction":"...","content":["..."],"tips":["..."]}]
}`,
      );
      const data: AIExercisesResponse = { exercises: res.exercises || [], summary: res.summary || '' };
      await AsyncStorage.setItem(exercisesKey, JSON.stringify(data));
      setAiExercises(data.exercises);
      setExercisesSummary(data.summary);
    } catch (err: any) {
      console.error('Erreur génération exercices:', err);
    } finally {
      setGeneratingExercises(false);
    }
  };

  const generateAIReport = async () => {
    setGeneratingReport(true);
    try {
      const errorsCtx = getErrorsForAIPrompt();
      const summary   = getErrorSummary();
      const res = await invokeAI<AIReport>(
        `${language.aiSeedPrompt}

Génère un rapport de progression détaillé pour ${userName} qui apprend le ${language.familiarName}.

${errorsCtx}
Statistiques:
- Niveau: ${progress?.level || 'débutant'}
- XP: ${progress?.xp_points || 0}
- Conversations: ${progress?.conversations_count || 0}
- Exercices d'écriture: ${progress?.writing_exercises_count || 0}
- Mots appris: ${progress?.vocab_learned || 0}
- Sessions totales: ${summary.sessions_count}

Adresse-toi directement à "${userName}".
JSON: {
  "overall_level":"...",
  "strengths":["...","...","..."],
  "weaknesses":["...","...","..."],
  "recommended_plan":["Jour 1: ...","Jour 2: ...","Jour 3: ...","Jour 4: ...","Jour 5: ...","Jour 6: ...","Jour 7: ..."],
  "daily_goal":"...",
  "weekly_objective":"...",
  "encouragement":"Message personnel pour ${userName}..."
}`,
      );
      const report = { ...res, generated_at: new Date().toISOString() };
      setAiReport(report);
      await AsyncStorage.setItem(reportKey, JSON.stringify(report));
      setActiveSection('report');
      await generateExercisesFromReport(report);
    } catch (err: any) {
      Alert.alert('Erreur', err?.message || 'Impossible de générer le rapport. Vérifiez votre clé API.');
    } finally {
      setGeneratingReport(false);
    }
  };

  const handleReset = () => {
    Alert.alert(
      'Réinitialiser',
      `${userName}, toutes tes données de progression pour le ${language.familiarName} seront supprimées.`,
      [
        { text: 'Annuler', style: 'cancel' },
        { text: 'Réinitialiser', style: 'destructive', onPress: async () => {
          await AsyncStorage.multiRemove([reportKey, exercisesKey, '@maa_user_progress']);
          await clearErrors();
          setAiReport(null);
          setAiExercises([]);
        }},
      ],
    );
  };

  const handleSwitchLanguage = async (code: string) => {
    setShowLangPicker(false);
    await switchLanguage(code);
  };

  const handleCreateNewProfile = async () => {
    if (!newProfileName.trim()) return;
    setCreatingProfile(true);
    try {
      await createProfile(newProfileName.trim(), newProfileLang, newProfileAvatar);
      setShowNewProfile(false);
      setNewProfileName('');
    } catch (e) {
      Alert.alert('Erreur', 'Impossible de créer le profil.');
    } finally {
      setCreatingProfile(false);
    }
  };

  const handleDeleteProfile = (id: string, name: string) => {
    Alert.alert('Supprimer le profil', `Supprimer le profil de ${name} ?`, [
      { text: 'Annuler', style: 'cancel' },
      { text: 'Supprimer', style: 'destructive', onPress: () => deleteProfile(id) },
    ]);
  };

  if (loading) {
    return <View style={styles.loadingContainer}><LoadingSpinner size="lg" /></View>;
  }

  const errorSummary = getErrorSummary();
  const creditsUsed  = progress?.ai_credits_used || 0;
  const hasApiKey    = apiKey.length > 0;

  const levelThresholds: Record<string, { min: number; max: number; label: string; next: string }> = {
    beginner:     { min: 0,    max: 300,  label: 'Débutant',      next: 'Intermédiaire' },
    intermediate: { min: 300,  max: 1000, label: 'Intermédiaire', next: 'Avancé'        },
    advanced:     { min: 1000, max: 2000, label: 'Avancé',        next: 'Expert'        },
  };
  const currentLevel  = levelThresholds[progress?.level ?? 'beginner'] ?? levelThresholds.beginner;
  const xpProgress    = Math.min((((progress?.xp_points ?? 0) - currentLevel.min) / (currentLevel.max - currentLevel.min)) * 100, 100);

  const difficultyColor = (d: string) => d === 'easy' ? colors.success : d === 'medium' ? colors.secondary : colors.destructive;
  const typeIcon        = (t: string) => t === 'vocabulary' ? 'book' : t === 'conversation' ? 'chatbubbles' : t === 'writing' ? 'pencil' : 'school';

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

        {/* ── Header profil ── */}
        <View style={styles.profileHero}>
          <Image source={LANGUAGE_IMAGES[language.code]} style={StyleSheet.absoluteFill as any} resizeMode="cover" />
          <LinearGradient
            colors={['rgba(15,28,26,0.35)', 'rgba(15,28,26,0.88)']}
            style={StyleSheet.absoluteFill as any}
          />
          <View style={styles.profileHeroRow}>
            <View style={styles.avatarCircle}>
              <Text style={styles.avatarEmoji}>{userAvatar}</Text>
            </View>
            <View style={{ flex: 1, marginLeft: 14 }}>
              <Text style={styles.userName}>{userName}</Text>
              <View style={styles.langRow}>
                <Text style={styles.langFlag}>{language.flag}</Text>
                <Text style={styles.userLevel}>{language.familiarName} · {currentLevel.label}</Text>
              </View>
            </View>
            <View style={[styles.apiStatusBadge, { backgroundColor: hasApiKey ? 'rgba(16,185,129,0.85)' : 'rgba(239,68,68,0.85)' }]}>
              <View style={[styles.apiStatusDot, { backgroundColor: colors.white }]} />
              <Text style={[styles.apiStatusText, { color: colors.white }]}>
                {hasApiKey ? 'IA active' : 'IA inactive'}
              </Text>
            </View>
          </View>
        </View>

        {/* ── XP ── */}
        <Card style={styles.xpCard}>
          <View style={styles.xpHeader}>
            <Text style={styles.xpLevel}>{currentLevel.label}</Text>
            <Text style={styles.xpValue}>{progress?.xp_points ?? 0} / {currentLevel.max} XP</Text>
          </View>
          <ProgressBar progress={xpProgress} height={10} color={colors.primary} />
          <Text style={styles.xpNext}>Prochain : {currentLevel.next} ({currentLevel.max - (progress?.xp_points ?? 0)} XP restants)</Text>
        </Card>

        {/* ── Tabs ── */}
        <View style={styles.tabsRow}>
          {(['stats', 'errors', 'report', 'settings'] as const).map(tab => (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, activeSection === tab && styles.tabActive]}
              onPress={() => setActiveSection(tab)}
              activeOpacity={0.7}
            >
              <Text style={styles.tabText}>
                {tab === 'stats' ? '📊' : tab === 'errors' ? '🎯' : tab === 'report' ? '📋' : '⚙️'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* ── STATS ── */}
        {activeSection === 'stats' && (
          <View>
            <View style={styles.statsGrid}>
              <StatItem icon="flame"       value={progress?.streak_days            ?? 0} label="Jours"    color={colors.secondary} />
              <StatItem icon="book"        value={progress?.lessons_completed       ?? 0} label="Leçons"   color={colors.primary}   />
              <StatItem icon="chatbubbles" value={progress?.conversations_count     ?? 0} label="Convos"   color={colors.accent}    />
              <StatItem icon="pencil"      value={progress?.writing_exercises_count ?? 0} label="Écriture" color={colors.secondary} />
              <StatItem icon="language"    value={progress?.vocab_learned           ?? 0} label="Mots"     color={colors.primary}   />
              <StatItem icon="flash"       value={creditsRemaining()}                     label="Crédits"  color={colors.accent}    />
            </View>

            <Card style={styles.creditsCard}>
              <View style={styles.creditsHeader}>
                <Ionicons name="flash" size={18} color={colors.primary} />
                <Text style={styles.creditsTitle}>Crédits IA</Text>
                <Text style={styles.creditsCount}>{creditsUsed} / {MAX_AI_CREDITS}</Text>
              </View>
              <ProgressBar progress={(creditsUsed / MAX_AI_CREDITS) * 100} height={8} color={colors.primary} />
            </Card>

            {activeProfile && (() => {
              const badges = computeBadges(activeProfile);
              const earnedCount = badges.filter(b => b.earned).length;
              return (
                <Card style={styles.achievementsCard}>
                  <Text style={styles.sectionTitle}>🏆 Succès · {earnedCount}/{badges.length}</Text>
                  <View style={styles.badgeGrid}>
                    {badges.map(badge => (
                      <View key={badge.id} style={[styles.badgeItem, !badge.earned && styles.badgeItemLocked]}>
                        <Text style={[styles.badgeEmoji, !badge.earned && styles.badgeEmojiLocked]}>
                          {badge.earned ? badge.emoji : '🔒'}
                        </Text>
                        <Text style={[styles.badgeLabel, !badge.earned && styles.badgeLabelLocked]} numberOfLines={1}>
                          {badge.label}
                        </Text>
                        <Text style={styles.badgeDesc} numberOfLines={2}>{badge.description}</Text>
                      </View>
                    ))}
                  </View>
                </Card>
              );
            })()}

            {/* Autres profils */}
            <Card style={styles.profilesCard}>
              <Text style={styles.sectionTitle}>👥 Profils</Text>
              {profiles.map(p => (
                <View key={p.id} style={styles.profileRow}>
                  <TouchableOpacity
                    style={[styles.profileItem, p.id === activeProfile?.id && styles.profileItemActive]}
                    onPress={() => switchProfile(p.id)}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.profileItemAvatar}>{p.avatar}</Text>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.profileItemName}>{p.name}</Text>
                      <Text style={styles.profileItemLang}>
                        {SUPPORTED_LANGUAGES.find(l => l.code === p.activeLanguageCode)?.flag ?? ''}{' '}
                        {SUPPORTED_LANGUAGES.find(l => l.code === p.activeLanguageCode)?.familiarName ?? p.activeLanguageCode}
                      </Text>
                    </View>
                    {p.id === activeProfile?.id && (
                      <Ionicons name="checkmark-circle" size={20} color={colors.primary} />
                    )}
                  </TouchableOpacity>
                  {profiles.length > 1 && p.id !== activeProfile?.id && (
                    <TouchableOpacity onPress={() => handleDeleteProfile(p.id, p.name)} style={styles.deleteProfileBtn}>
                      <Ionicons name="trash-outline" size={16} color={colors.destructive} />
                    </TouchableOpacity>
                  )}
                </View>
              ))}
              <TouchableOpacity style={styles.addProfileBtn} onPress={() => setShowNewProfile(true)} activeOpacity={0.8}>
                <Ionicons name="add-circle-outline" size={18} color={colors.primary} />
                <Text style={styles.addProfileBtnText}>Nouveau profil</Text>
              </TouchableOpacity>
            </Card>

            <TouchableOpacity style={styles.resetBtn} onPress={handleReset}>
              <Ionicons name="trash-outline" size={16} color={colors.destructive} />
              <Text style={styles.resetBtnText}>Réinitialiser la progression ({language.familiarName})</Text>
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
                <Text style={styles.emptyBody}>Continue à pratiquer pour personnaliser tes exercices.</Text>
              </Card>
            ) : (
              <View>
                <Card style={styles.errorSummaryCard}>
                  <Text style={styles.sectionTitle}>📊 Résumé</Text>
                  <View style={styles.errorStatsRow}>
                    <View style={styles.errorStatItem}>
                      <Text style={styles.errorStatValue}>{errorSummary.total_errors}</Text>
                      <Text style={styles.errorStatLabel}>Actives</Text>
                    </View>
                    <View style={styles.errorStatItem}>
                      <Text style={styles.errorStatValue}>{errorSummary.resolved_count}</Text>
                      <Text style={styles.errorStatLabel}>Résolues</Text>
                    </View>
                    <View style={styles.errorStatItem}>
                      <Text style={styles.errorStatValue}>{errorSummary.sessions_count}</Text>
                      <Text style={styles.errorStatLabel}>Sessions</Text>
                    </View>
                  </View>
                </Card>
                {errorSummary.weak_categories?.length > 0 && (
                  <Card style={styles.weakCard}>
                    <Text style={styles.sectionTitle}>📚 À revoir</Text>
                    <View style={styles.chipsRow}>
                      {errorSummary.weak_categories.map((cat: string, i: number) => (
                        <View key={i} style={styles.chip}>
                          <Text style={styles.chipText}>{cat}</Text>
                        </View>
                      ))}
                    </View>
                  </Card>
                )}
                <Card style={styles.recentErrorsCard}>
                  <Text style={styles.sectionTitle}>🔍 Erreurs récentes</Text>
                  {errorSummary.recent_errors?.slice(0, 8).map((err: any, i: number) => (
                    <View key={err.id} style={[styles.errorRow, i < errorSummary.recent_errors.length - 1 && styles.errorRowBorder]}>
                      <View style={[styles.errTypeDot, { backgroundColor: errTypeColor(err.type) }]} />
                      <View style={{ flex: 1 }}>
                        <Text style={styles.errorForm} numberOfLines={2}>
                          <Text style={styles.errorAttempt}>{err.user_attempt}</Text>
                          {' → '}
                          <Text style={styles.errorCorrect}>{err.correct_form}</Text>
                        </Text>
                        <Text style={styles.errorMeta}>{err.type} · {err.category} · {err.count}×</Text>
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
              style={[styles.generateReportBtn, (generatingReport || generatingExercises) && { opacity: 0.6 }]}
              onPress={generateAIReport}
              disabled={generatingReport || generatingExercises || !hasApiKey}
              activeOpacity={0.85}
            >
              {generatingReport ? (
                <><ActivityIndicator color={colors.white} size="small" /><Text style={styles.generateReportBtnText}>Analyse en cours...</Text></>
              ) : generatingExercises ? (
                <><ActivityIndicator color={colors.white} size="small" /><Text style={styles.generateReportBtnText}>Génération des exercices...</Text></>
              ) : (
                <><Ionicons name="document-text" size={18} color={colors.white} />
                  <Text style={styles.generateReportBtnText}>{aiReport ? 'Régénérer rapport + exercices' : 'Générer rapport IA'}</Text>
                </>
              )}
            </TouchableOpacity>

            {!hasApiKey && (
              <Card style={styles.noKeyWarning}>
                <Ionicons name="warning" size={16} color={colors.secondary} />
                <Text style={styles.noKeyText}>Configurez votre clé API dans ⚙️ pour générer un rapport.</Text>
              </Card>
            )}

            {aiExercises.length > 0 && (
              <Card style={styles.exercisesCard}>
                <View style={styles.exercisesHeader}>
                  <Ionicons name="fitness" size={18} color={colors.primary} />
                  <Text style={styles.exercisesTitle}>Exercices personnalisés</Text>
                  {generatingExercises && <ActivityIndicator size="small" color={colors.primary} />}
                </View>
                {exercisesSummary ? <Text style={styles.exercisesSummary}>{exercisesSummary}</Text> : null}
                {aiExercises.map((ex, i) => (
                  <TouchableOpacity
                    key={i}
                    style={styles.exerciseItem}
                    onPress={() => setExpandedExercise(expandedExercise === i ? null : i)}
                    activeOpacity={0.8}
                  >
                    <View style={styles.exerciseItemHeader}>
                      <View style={[styles.exerciseTypeIcon, { backgroundColor: `${difficultyColor(ex.difficulty)}20` }]}>
                        <Ionicons name={typeIcon(ex.type) as any} size={16} color={difficultyColor(ex.difficulty)} />
                      </View>
                      <View style={{ flex: 1, marginLeft: 10 }}>
                        <Text style={styles.exerciseTitle} numberOfLines={2}>{ex.title}</Text>
                        <Text style={styles.exerciseMeta}>{ex.category} · <Text style={{ color: difficultyColor(ex.difficulty) }}>{ex.difficulty}</Text></Text>
                      </View>
                      <Ionicons name={expandedExercise === i ? 'chevron-up' : 'chevron-down'} size={16} color={colors.textMuted} />
                    </View>
                    {expandedExercise === i && (
                      <View style={styles.exerciseExpanded}>
                        <Text style={styles.exerciseInstruction}>{ex.instruction}</Text>
                        {ex.content.length > 0 && (
                          <View style={styles.exerciseContent}>
                            {ex.content.map((c, ci) => (
                              <View key={ci} style={styles.exerciseContentItem}>
                                <Text style={styles.exerciseContentDot}>•</Text>
                                <Text style={styles.exerciseContentText}>{c}</Text>
                              </View>
                            ))}
                          </View>
                        )}
                        {ex.tips.length > 0 && (
                          <View style={styles.exerciseTipsBox}>
                            <Text style={styles.exerciseTipsTitle}>💡 Conseils</Text>
                            {ex.tips.map((t, ti) => <Text key={ti} style={styles.exerciseTipText}>{t}</Text>)}
                          </View>
                        )}
                      </View>
                    )}
                  </TouchableOpacity>
                ))}
              </Card>
            )}

            {aiReport && (
              <View>
                <Card style={styles.reportCard}>
                  <View style={styles.reportHeader}>
                    <Text style={styles.reportTitle}>📋 Rapport</Text>
                    <Text style={styles.reportDate}>{new Date(aiReport.generated_at).toLocaleDateString('fr-FR')}</Text>
                  </View>
                  <Text style={styles.reportEncouragement}>{aiReport.encouragement}</Text>
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
                  <Text style={styles.reportSectionTitle}>🎯 À améliorer</Text>
                  {aiReport.weaknesses.map((w, i) => (
                    <View key={i} style={styles.reportBullet}>
                      <Text style={styles.reportBulletDot}>📌</Text>
                      <Text style={styles.reportBulletText}>{w}</Text>
                    </View>
                  ))}
                </Card>
                <Card style={styles.reportCard}>
                  <Text style={styles.reportSectionTitle}>📅 Plan 7 jours</Text>
                  {aiReport.recommended_plan.map((step, i) => (
                    <View key={i} style={styles.planStep}>
                      <View style={styles.planStepNum}><Text style={styles.planStepNumText}>{i + 1}</Text></View>
                      <Text style={styles.planStepText}>{step}</Text>
                    </View>
                  ))}
                </Card>
              </View>
            )}
          </View>
        )}

        {/* ── SETTINGS ── */}
        {activeSection === 'settings' && (
          <View>
            {/* Sélecteur de langue */}
            <Card style={styles.langCard}>
              <View style={styles.apiHeader}>
                <Text style={{ fontSize: 20 }}>{language.flag}</Text>
                <Text style={styles.apiTitle}>Langue apprise</Text>
              </View>
              <Text style={styles.apiDescription}>Change de langue pour ce profil. Tes cours et progression sont séparés par langue.</Text>
              <TouchableOpacity style={styles.langSelectBtn} onPress={() => setShowLangPicker(true)} activeOpacity={0.8}>
                <Text style={styles.langSelectFlag}>{language.flag}</Text>
                <Text style={styles.langSelectName}>{language.name} — {language.nativeName}</Text>
                <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
              </TouchableOpacity>
            </Card>

            {/* Clé API */}
            <Card style={styles.apiCard}>
              <View style={styles.apiHeader}>
                <Ionicons name="key" size={20} color={colors.primary} />
                <Text style={styles.apiTitle}>Clé API Gemini</Text>
              </View>
              <Text style={styles.apiDescription}>Pour utiliser les fonctionnalités IA, vous avez besoin d'une clé API Gemini gratuite.</Text>
              <View style={styles.keyStatusRow}>
                <View style={[styles.keyStatusIndicator, { backgroundColor: hasApiKey ? `${colors.success}20` : `${colors.destructive}10` }]}>
                  <Ionicons name={hasApiKey ? 'checkmark-circle' : 'close-circle'} size={16} color={hasApiKey ? colors.success : colors.destructive} />
                  <Text style={[styles.keyStatusText, { color: hasApiKey ? colors.success : colors.destructive }]}>
                    {hasApiKey ? 'Clé configurée' : 'Aucune clé'}
                  </Text>
                </View>
                {hasApiKey && <Text style={styles.keyPreview}>{apiKey.substring(0, 6)}••••{apiKey.slice(-4)}</Text>}
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
                    <TouchableOpacity onPress={() => setShowApiKey(v => !v)} style={styles.eyeBtn}>
                      <Ionicons name={showApiKey ? 'eye-off' : 'eye'} size={18} color={colors.textMuted} />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.apiActions}>
                    <TouchableOpacity style={[styles.apiActionBtn, styles.apiTestBtn, testingKey && { opacity: 0.6 }]} onPress={handleTestApiKey} disabled={testingKey}>
                      {testingKey ? <ActivityIndicator size="small" color={colors.primary} /> : <Text style={styles.apiTestBtnText}>Tester</Text>}
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.apiActionBtn, styles.apiSaveBtn, savingKey && { opacity: 0.6 }]} onPress={handleSaveApiKey} disabled={savingKey}>
                      {savingKey ? <ActivityIndicator size="small" color={colors.white} /> : <Text style={styles.apiSaveBtnText}>Enregistrer</Text>}
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.apiCancelBtn} onPress={() => { setShowApiKeyInput(false); setApiKeyInput(apiKey); }}>
                      <Text style={styles.apiCancelBtnText}>Annuler</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                <View style={styles.apiButtonsRow}>
                  <TouchableOpacity style={styles.apiEditBtn} onPress={() => setShowApiKeyInput(true)} activeOpacity={0.8}>
                    <Ionicons name={hasApiKey ? 'pencil' : 'add'} size={16} color={colors.white} />
                    <Text style={styles.apiEditBtnText}>{hasApiKey ? 'Modifier' : 'Ajouter ma clé'}</Text>
                  </TouchableOpacity>
                  {hasApiKey && (
                    <TouchableOpacity style={styles.apiDeleteBtn} onPress={handleClearApiKey}>
                      <Ionicons name="trash-outline" size={16} color={colors.destructive} />
                    </TouchableOpacity>
                  )}
                </View>
              )}
            </Card>

            {/* Sélecteur de modèle */}
            <Card style={styles.modelCard}>
              <View style={styles.apiHeader}>
                <Ionicons name="hardware-chip-outline" size={20} color={colors.primary} />
                <Text style={styles.apiTitle}>Modèle Gemini</Text>
              </View>
              <Text style={styles.apiDescription}>Tous ces modèles sont gratuits sur AI Studio (1500 req/jour).</Text>
              {GEMINI_FREE_MODELS.map(m => (
                <TouchableOpacity
                  key={m.id}
                  style={[styles.modelOption, selectedModel === m.id && styles.modelOptionSelected]}
                  onPress={() => { setSelectedModel(m.id); saveModel(m.id); }}
                  activeOpacity={0.8}
                >
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.modelLabel, selectedModel === m.id && { color: colors.primary }]}>{m.label}</Text>
                    <Text style={styles.modelDescription}>{m.description}</Text>
                  </View>
                  {selectedModel === m.id
                    ? <Ionicons name="checkmark-circle" size={22} color={colors.primary} />
                    : <Ionicons name="ellipse-outline" size={22} color={colors.textMuted} />
                  }
                </TouchableOpacity>
              ))}
            </Card>

            <Card style={styles.howToCard}>
              <Text style={styles.howToTitle}>🔑 Obtenir une clé API gratuite</Text>
              {['Allez sur aistudio.google.com','Connectez-vous avec Google','Cliquez "Get API key" → "Create API key"','Copiez la clé (AIza...) et collez-la ci-dessus'].map((step, i) => (
                <View key={i} style={styles.howToStep}>
                  <View style={styles.howToNumContainer}><Text style={styles.howToNum}>{i + 1}</Text></View>
                  <Text style={styles.howToText}>{step}</Text>
                </View>
              ))}
              <Text style={styles.howToNote}>💡 Plan gratuit : 1500 requêtes/jour !</Text>
            </Card>
          </View>
        )}
      </ScrollView>

      {/* ── Modal sélecteur de langue ── */}
      <Modal visible={showLangPicker} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalSheet}>
            <Text style={styles.modalTitle}>Choisir une langue</Text>
            <ScrollView>
              {SUPPORTED_LANGUAGES.map(lang => (
                <TouchableOpacity
                  key={lang.code}
                  style={[styles.langPickerItem, lang.code === language.code && styles.langPickerItemActive]}
                  onPress={() => handleSwitchLanguage(lang.code)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.langPickerFlag}>{lang.flag}</Text>
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.langPickerName, lang.code === language.code && { color: colors.primary }]}>{lang.name}</Text>
                    <Text style={styles.langPickerNative}>{lang.nativeName}</Text>
                  </View>
                  {lang.code === language.code && <Ionicons name="checkmark-circle" size={22} color={colors.primary} />}
                </TouchableOpacity>
              ))}
            </ScrollView>
            <TouchableOpacity style={styles.modalClose} onPress={() => setShowLangPicker(false)}>
              <Text style={styles.modalCloseText}>Fermer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* ── Modal nouveau profil ── */}
      <Modal visible={showNewProfile} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalSheet}>
            <Text style={styles.modalTitle}>Nouveau profil</Text>
            <TextInput
              style={[styles.apiInput, { marginBottom: 12 }]}
              value={newProfileName}
              onChangeText={setNewProfileName}
              placeholder="Prénom..."
              placeholderTextColor={colors.textMuted}
              maxLength={30}
            />
            <Text style={styles.label}>Avatar</Text>
            <View style={styles.avatarMiniGrid}>
              {AVATARS.map(a => (
                <TouchableOpacity key={a} style={[styles.avatarMiniItem, newProfileAvatar === a && styles.avatarMiniSelected]} onPress={() => setNewProfileAvatar(a)}>
                  <Text style={{ fontSize: 20 }}>{a}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <Text style={[styles.label, { marginTop: 12 }]}>Langue</Text>
            <ScrollView style={{ maxHeight: 160 }}>
              {SUPPORTED_LANGUAGES.map(lang => (
                <TouchableOpacity
                  key={lang.code}
                  style={[styles.langPickerItem, lang.code === newProfileLang && styles.langPickerItemActive]}
                  onPress={() => setNewProfileLang(lang.code)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.langPickerFlag}>{lang.flag}</Text>
                  <Text style={[styles.langPickerName, lang.code === newProfileLang && { color: colors.primary }]}>{lang.name}</Text>
                  {lang.code === newProfileLang && <Ionicons name="checkmark-circle" size={18} color={colors.primary} />}
                </TouchableOpacity>
              ))}
            </ScrollView>
            <View style={{ flexDirection: 'row', gap: 10, marginTop: 16 }}>
              <TouchableOpacity style={[styles.apiCancelBtn, { flex: 1 }]} onPress={() => setShowNewProfile(false)}>
                <Text style={styles.apiCancelBtnText}>Annuler</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.apiSaveBtn, styles.apiActionBtn, { flex: 2 }, (!newProfileName.trim() || creatingProfile) && { opacity: 0.5 }]}
                onPress={handleCreateNewProfile}
                disabled={!newProfileName.trim() || creatingProfile}
              >
                {creatingProfile
                  ? <ActivityIndicator color={colors.white} size="small" />
                  : <Text style={styles.apiSaveBtnText}>Créer</Text>
                }
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

function errTypeColor(type: string) {
  const map: Record<string, string> = { writing: colors.secondary, pronunciation: colors.primary, vocabulary: colors.accent, grammar: colors.destructive };
  return map[type] || colors.textMuted;
}

function StatItem({ icon, value, label, color }: { icon: string; value: number; label: string; color: string }) {
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

const styles = StyleSheet.create({
  safeArea:       { flex: 1, backgroundColor: colors.background },
  container:      { flex: 1 },
  content:        { paddingHorizontal: 16, paddingTop: 16, paddingBottom: 120 },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },

  profileHero:    { marginHorizontal: -16, marginTop: -16, marginBottom: 16, paddingTop: 24, minHeight: 156, justifyContent: 'flex-end', overflow: 'hidden', backgroundColor: colors.primary },
  profileHeroRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingBottom: 16 },
  avatarCircle:   { width: 56, height: 56, borderRadius: 28, backgroundColor: 'rgba(255,255,255,0.92)', justifyContent: 'center', alignItems: 'center' },
  avatarEmoji:    { fontSize: 32 },
  userName:       { fontSize: fontSize.xl, fontWeight: '800', color: colors.white, textShadowColor: 'rgba(0,0,0,0.35)', textShadowOffset: { width: 0, height: 1 }, textShadowRadius: 5 },
  langRow:        { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 2 },
  langFlag:       { fontSize: 14 },
  userLevel:      { fontSize: fontSize.xs, color: 'rgba(255,255,255,0.92)', fontWeight: '600' },

  apiStatusBadge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 8, paddingVertical: 4, borderRadius: borderRadius.full, gap: 4 },
  apiStatusDot:   { width: 6, height: 6, borderRadius: 3 },
  apiStatusText:  { fontSize: 10, fontWeight: '700' },

  xpCard:         { marginBottom: 12 },
  xpHeader:       { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  xpLevel:        { fontSize: fontSize.sm, fontWeight: '700', color: colors.primary },
  xpValue:        { fontSize: fontSize.xs, color: colors.textMuted },
  xpNext:         { fontSize: fontSize.xs, color: colors.textMuted, marginTop: 6 },

  tabsRow:        { flexDirection: 'row', gap: 6, marginBottom: 14 },
  tab:            { flex: 1, paddingVertical: 10, borderRadius: borderRadius.lg, backgroundColor: `${colors.textMuted}10`, alignItems: 'center' },
  tabActive:      { backgroundColor: colors.primary },
  tabText:        { fontSize: 16 },

  statsGrid:      { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 12 },
  statItem:       { width: (SCREEN_WIDTH - 32 - 16) / 3, backgroundColor: colors.card, borderRadius: borderRadius.xl, borderWidth: 1, borderColor: colors.border, padding: 10, alignItems: 'center' },
  statIcon:       { width: 34, height: 34, borderRadius: 17, justifyContent: 'center', alignItems: 'center', marginBottom: 4 },
  statValue:      { fontSize: fontSize.lg, fontWeight: '800', color: colors.text },
  statLabel:      { fontSize: 9, color: colors.textMuted, textAlign: 'center', marginTop: 2, fontWeight: '600' },

  creditsCard:    { marginBottom: 12 },
  creditsHeader:  { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 10 },
  creditsTitle:   { fontSize: fontSize.sm, fontWeight: '700', color: colors.text, flex: 1 },
  creditsCount:   { fontSize: fontSize.xs, color: colors.textMuted },

  achievementsCard: { marginBottom: 12 },
  badgeGrid: {
    flexDirection: 'row', flexWrap: 'wrap',
    justifyContent: 'space-between', rowGap: 10,
  },
  badgeItem: {
    width: '31%', alignItems: 'center',
    backgroundColor: `${colors.success}0A`,
    borderRadius: borderRadius.lg,
    borderWidth: 1, borderColor: `${colors.success}30`,
    paddingVertical: 10, paddingHorizontal: 6, gap: 2,
  },
  badgeItemLocked: {
    backgroundColor: `${colors.textMuted}08`,
    borderColor: colors.border,
  },
  badgeEmoji: { fontSize: 24 },
  badgeEmojiLocked: { opacity: 0.5 },
  badgeLabel: { fontSize: fontSize.xs, fontWeight: '700', color: colors.text },
  badgeLabelLocked: { color: colors.textMuted },
  badgeDesc: { fontSize: 8, color: colors.textMuted, textAlign: 'center', lineHeight: 11 },

  profilesCard:      { marginBottom: 12 },
  profileRow:        { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  profileItem:       { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 10, padding: 10, borderRadius: borderRadius.lg, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.card },
  profileItemActive: { borderColor: colors.primary, backgroundColor: `${colors.primary}08` },
  profileItemAvatar: { fontSize: 24 },
  profileItemName:   { fontSize: fontSize.sm, fontWeight: '700', color: colors.text },
  profileItemLang:   { fontSize: fontSize.xs, color: colors.textMuted, marginTop: 2 },
  deleteProfileBtn:  { padding: 8, marginLeft: 8 },
  addProfileBtn:     { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 6, padding: 10, borderRadius: borderRadius.lg, borderWidth: 1, borderColor: `${colors.primary}30`, borderStyle: 'dashed' },
  addProfileBtnText: { fontSize: fontSize.sm, color: colors.primary, fontWeight: '600' },

  sectionTitle:   { fontSize: fontSize.base, fontWeight: '700', color: colors.text, marginBottom: 10 },
  resetBtn:       { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, paddingVertical: 12, borderRadius: borderRadius.xl, borderWidth: 1, borderColor: `${colors.destructive}40`, marginBottom: 16 },
  resetBtnText:   { fontSize: fontSize.sm, color: colors.destructive, fontWeight: '600' },

  emptyCard:      { alignItems: 'center', paddingVertical: 32 },
  emptyEmoji:     { fontSize: 36, marginBottom: 8 },
  emptyTitle:     { fontSize: fontSize.lg, fontWeight: '700', color: colors.text, marginBottom: 6 },
  emptyBody:      { fontSize: fontSize.sm, color: colors.textMuted, textAlign: 'center', lineHeight: 20 },

  errorSummaryCard: { marginBottom: 10 },
  errorStatsRow:    { flexDirection: 'row', justifyContent: 'space-around' },
  errorStatItem:    { alignItems: 'center' },
  errorStatValue:   { fontSize: fontSize['2xl'], fontWeight: '800', color: colors.primary },
  errorStatLabel:   { fontSize: fontSize.xs, color: colors.textMuted },

  weakCard:       { marginBottom: 10 },
  chipsRow:       { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip:           { backgroundColor: `${colors.primary}12`, paddingHorizontal: 12, paddingVertical: 5, borderRadius: borderRadius.full },
  chipText:       { fontSize: fontSize.xs, color: colors.primary, fontWeight: '600' },

  recentErrorsCard: { marginBottom: 12 },
  errorRow:         { paddingVertical: 8, flexDirection: 'row', alignItems: 'flex-start', gap: 8 },
  errorRowBorder:   { borderBottomWidth: 1, borderBottomColor: `${colors.border}60` },
  errTypeDot:       { width: 8, height: 8, borderRadius: 4, marginTop: 5, flexShrink: 0 },
  errorForm:        { fontSize: fontSize.sm, color: colors.text, flexWrap: 'wrap' },
  errorAttempt:     { color: colors.destructive, fontWeight: '600' },
  errorCorrect:     { color: colors.success, fontWeight: '600' },
  errorMeta:        { fontSize: fontSize.xs, color: colors.textMuted, marginTop: 2 },

  generateReportBtn:     { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: colors.primary, borderRadius: borderRadius['2xl'], paddingVertical: 14, gap: 8, marginBottom: 12 },
  generateReportBtnText: { color: colors.white, fontSize: fontSize.base, fontWeight: '700', flexShrink: 1 },
  noKeyWarning:          { flexDirection: 'row', alignItems: 'flex-start', gap: 8, marginBottom: 12, backgroundColor: `${colors.secondary}10` },
  noKeyText:             { fontSize: fontSize.sm, color: colors.text, flex: 1, lineHeight: 20, flexWrap: 'wrap' },

  exercisesCard:        { marginBottom: 12 },
  exercisesHeader:      { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
  exercisesTitle:       { fontSize: fontSize.base, fontWeight: '700', color: colors.text, flex: 1 },
  exercisesSummary:     { fontSize: fontSize.sm, color: colors.textMuted, fontStyle: 'italic', marginBottom: 12, lineHeight: 18 },
  exerciseItem:         { backgroundColor: `${colors.primary}06`, borderRadius: borderRadius.lg, padding: 12, marginBottom: 8, borderWidth: 1, borderColor: `${colors.primary}15` },
  exerciseItemHeader:   { flexDirection: 'row', alignItems: 'center' },
  exerciseTypeIcon:     { width: 34, height: 34, borderRadius: 17, justifyContent: 'center', alignItems: 'center', flexShrink: 0 },
  exerciseTitle:        { fontSize: fontSize.sm, fontWeight: '700', color: colors.text, flexWrap: 'wrap' },
  exerciseMeta:         { fontSize: fontSize.xs, color: colors.textMuted, marginTop: 2 },
  exerciseExpanded:     { marginTop: 12, paddingTop: 12, borderTopWidth: 1, borderTopColor: `${colors.border}60` },
  exerciseInstruction:  { fontSize: fontSize.sm, color: colors.text, lineHeight: 20, marginBottom: 10, fontStyle: 'italic' },
  exerciseContent:      { marginBottom: 10 },
  exerciseContentItem:  { flexDirection: 'row', alignItems: 'flex-start', gap: 6, marginBottom: 4 },
  exerciseContentDot:   { fontSize: fontSize.sm, color: colors.primary, lineHeight: 20 },
  exerciseContentText:  { fontSize: fontSize.sm, color: colors.text, flex: 1, lineHeight: 20, flexWrap: 'wrap' },
  exerciseTipsBox:      { backgroundColor: `${colors.accent}10`, borderRadius: borderRadius.md, padding: 10 },
  exerciseTipsTitle:    { fontSize: fontSize.xs, fontWeight: '700', color: colors.text, marginBottom: 6 },
  exerciseTipText:      { fontSize: fontSize.xs, color: colors.textMuted, lineHeight: 18, marginBottom: 2 },

  reportCard:         { marginBottom: 10 },
  reportHeader:       { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 },
  reportTitle:        { fontSize: fontSize.base, fontWeight: '700', color: colors.text },
  reportDate:         { fontSize: fontSize.xs, color: colors.textMuted },
  reportEncouragement:{ fontSize: fontSize.sm, color: colors.text, fontStyle: 'italic', lineHeight: 20, borderLeftWidth: 3, borderLeftColor: colors.primary, paddingLeft: 10 },
  reportSectionTitle: { fontSize: fontSize.base, fontWeight: '700', color: colors.text, marginBottom: 10 },
  reportBullet:       { flexDirection: 'row', alignItems: 'flex-start', gap: 8, marginBottom: 6 },
  reportBulletDot:    { fontSize: 13, marginTop: 1, flexShrink: 0 },
  reportBulletText:   { fontSize: fontSize.sm, color: colors.text, flex: 1, lineHeight: 20, flexWrap: 'wrap' },
  planStep:           { flexDirection: 'row', alignItems: 'flex-start', gap: 10, marginBottom: 8 },
  planStepNum:        { width: 22, height: 22, borderRadius: 11, backgroundColor: colors.primary, justifyContent: 'center', alignItems: 'center', flexShrink: 0 },
  planStepNumText:    { color: colors.white, fontSize: 10, fontWeight: '700' },
  planStepText:       { flex: 1, fontSize: fontSize.sm, color: colors.text, lineHeight: 20, flexWrap: 'wrap' },

  langCard:           { marginBottom: 12 },
  langSelectBtn:      { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 14, borderRadius: borderRadius.xl, borderWidth: 1.5, borderColor: colors.border, backgroundColor: colors.background, marginTop: 8 },
  langSelectFlag:     { fontSize: 28 },
  langSelectName:     { flex: 1, fontSize: fontSize.sm, fontWeight: '700', color: colors.text },

  apiCard:            { marginBottom: 12 },
  apiHeader:          { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 8 },
  apiTitle:           { fontSize: fontSize.base, fontWeight: '700', color: colors.text },
  apiDescription:     { fontSize: fontSize.sm, color: colors.textMuted, lineHeight: 20, marginBottom: 12, flexWrap: 'wrap' },
  keyStatusRow:       { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12, flexWrap: 'wrap', gap: 8 },
  keyStatusIndicator: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 10, paddingVertical: 5, borderRadius: borderRadius.full },
  keyStatusText:      { fontSize: fontSize.xs, fontWeight: '700' },
  keyPreview:         { fontSize: fontSize.xs, color: colors.textMuted },
  apiInputContainer:  { gap: 10 },
  apiInputRow:        { flexDirection: 'row', alignItems: 'center', borderWidth: 1.5, borderColor: colors.border, borderRadius: borderRadius.xl, backgroundColor: colors.background, paddingHorizontal: 12, paddingVertical: 2 },
  apiInput:           { flex: 1, fontSize: fontSize.sm, color: colors.text, paddingVertical: 10 },
  eyeBtn:             { padding: 8 },
  apiActions:         { flexDirection: 'row', gap: 8 },
  apiActionBtn:       { flex: 1, paddingVertical: 10, borderRadius: borderRadius.xl, alignItems: 'center', justifyContent: 'center' },
  apiTestBtn:         { backgroundColor: `${colors.primary}12`, borderWidth: 1, borderColor: `${colors.primary}25` },
  apiTestBtnText:     { fontSize: fontSize.sm, fontWeight: '700', color: colors.primary },
  apiSaveBtn:         { backgroundColor: colors.primary },
  apiSaveBtnText:     { fontSize: fontSize.sm, fontWeight: '700', color: colors.white },
  apiCancelBtn:       { paddingHorizontal: 12, paddingVertical: 10, borderRadius: borderRadius.xl, backgroundColor: `${colors.textMuted}12`, alignItems: 'center', justifyContent: 'center' },
  apiCancelBtnText:   { fontSize: fontSize.sm, fontWeight: '600', color: colors.textMuted },
  apiButtonsRow:      { flexDirection: 'row', gap: 10 },
  apiEditBtn:         { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, backgroundColor: colors.primary, borderRadius: borderRadius.xl, paddingVertical: 12 },
  apiEditBtnText:     { color: colors.white, fontSize: fontSize.sm, fontWeight: '700' },
  apiDeleteBtn:       { width: 44, height: 44, borderRadius: borderRadius.xl, borderWidth: 1, borderColor: `${colors.destructive}40`, justifyContent: 'center', alignItems: 'center' },

  modelCard:              { marginBottom: 12 },
  modelOption:            { flexDirection: 'row', alignItems: 'center', padding: 14, borderRadius: borderRadius.xl, borderWidth: 1.5, borderColor: colors.border, marginBottom: 8, backgroundColor: colors.background },
  modelOptionSelected:    { borderColor: colors.primary, backgroundColor: `${colors.primary}08` },
  modelLabel:             { fontSize: fontSize.base, fontWeight: '700', color: colors.text },
  modelDescription:       { fontSize: fontSize.xs, color: colors.textMuted, marginTop: 2 },

  howToCard:           { marginBottom: 16, backgroundColor: `${colors.accent}08` },
  howToTitle:          { fontSize: fontSize.sm, fontWeight: '700', color: colors.text, marginBottom: 12 },
  howToStep:           { flexDirection: 'row', alignItems: 'flex-start', gap: 10, marginBottom: 8 },
  howToNumContainer:   { width: 22, height: 22, borderRadius: 11, backgroundColor: colors.primary, justifyContent: 'center', alignItems: 'center', flexShrink: 0 },
  howToNum:            { color: colors.white, fontSize: 11, fontWeight: '700', textAlign: 'center' },
  howToText:           { fontSize: fontSize.sm, color: colors.text, flex: 1, lineHeight: 20, flexWrap: 'wrap' },
  howToNote:           { fontSize: fontSize.xs, color: colors.primary, fontStyle: 'italic', marginTop: 6, lineHeight: 18 },

  // Modals
  modalOverlay:        { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalSheet:          { backgroundColor: colors.card, borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24, maxHeight: '80%' },
  modalTitle:          { fontSize: fontSize.lg, fontWeight: '800', color: colors.text, marginBottom: 16 },
  modalClose:          { alignItems: 'center', paddingVertical: 14, borderTopWidth: 1, borderTopColor: colors.border, marginTop: 12 },
  modalCloseText:      { fontSize: fontSize.sm, fontWeight: '700', color: colors.textMuted },
  langPickerItem:      { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 12, borderRadius: borderRadius.lg, marginBottom: 6, borderWidth: 1, borderColor: 'transparent' },
  langPickerItemActive:{ backgroundColor: `${colors.primary}08`, borderColor: colors.primary },
  langPickerFlag:      { fontSize: 28 },
  langPickerName:      { flex: 1, fontSize: fontSize.base, fontWeight: '700', color: colors.text },
  langPickerNative:    { fontSize: fontSize.xs, color: colors.textMuted },

  avatarMiniGrid:      { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  avatarMiniItem:      { width: 44, height: 44, borderRadius: 10, backgroundColor: colors.background, borderWidth: 1.5, borderColor: colors.border, justifyContent: 'center', alignItems: 'center' },
  avatarMiniSelected:  { borderColor: colors.primary, backgroundColor: `${colors.primary}12` },
  label:               { fontSize: fontSize.sm, fontWeight: '700', color: colors.text, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 },
});
