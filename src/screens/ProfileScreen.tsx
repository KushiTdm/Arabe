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
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { useUserProgress, MAX_AI_CREDITS } from '../lib/useUserProgress';
import { useErrorTracker } from '../lib/useErrorTracker';
import { Card, Badge, LoadingSpinner, ProgressBar, Button } from '../components/RNComponents';
import { colors, spacing, borderRadius, fontSize } from '../theme';
import { getApiKey, saveApiKey, clearApiKey, invokeAI } from '../api/aiClient';

const REPORT_KEY = '@maa_ai_report';

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

export default function ProfileScreen() {
  const { progress, loading, creditsRemaining, reload: reloadProgress } = useUserProgress();
  const { getErrorSummary, getErrorsForAIPrompt, clearErrors, sessions, reload: reloadErrors } = useErrorTracker();

  // API key state
  const [apiKey, setApiKey] = useState('');
  const [apiKeyInput, setApiKeyInput] = useState('');
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);
  const [showApiKey, setShowApiKey] = useState(false);
  const [savingKey, setSavingKey] = useState(false);
  const [testingKey, setTestingKey] = useState(false);

  // Report state
  const [aiReport, setAiReport] = useState<AIReport | null>(null);
  const [generatingReport, setGeneratingReport] = useState(false);
  const [showReport, setShowReport] = useState(false);

  // Active section
  const [activeSection, setActiveSection] = useState<'stats' | 'errors' | 'report' | 'settings'>('stats');

  useFocusEffect(
    useCallback(() => {
      loadApiKey();
      loadCachedReport();
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
      Alert.alert('✅ Clé enregistrée', 'Votre clé API Gemini a été sauvegardée avec succès !');
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
        Alert.alert('✅ Clé valide !', res.message || 'Votre clé API Gemini fonctionne parfaitement.');
      }
    } catch (err: any) {
      Alert.alert('❌ Clé invalide', err?.message || 'Cette clé API ne fonctionne pas. Vérifiez sur console.cloud.google.com');
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

Génère un rapport complet et personnalisé avec:
- Niveau global actuel détaillé
- 3 points forts de Fatima
- 3 axes d'amélioration prioritaires
- Un plan d'action sur 7 jours (7 étapes)
- Un objectif quotidien réaliste
- Un objectif hebdomadaire atteignable
- Un message d'encouragement personnel pour Fatima

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
      setShowReport(true);
      setActiveSection('report');
    } catch (err: any) {
      Alert.alert('Erreur', err?.message || 'Impossible de générer le rapport. Vérifiez votre clé API.');
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
            await AsyncStorage.multiRemove(['@maa_user_progress', '@maa_mastered_words', REPORT_KEY]);
            await clearErrors();
            setAiReport(null);
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
  const creditsUsed = (progress?.ai_credits_used || 0);
  const hasApiKey = apiKey.length > 0;

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

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={styles.header}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>ف</Text>
          </View>
          <View style={{ flex: 1, marginLeft: 14 }}>
            <Text style={styles.userName}>Fatima</Text>
            <Text style={styles.userLevel}>{currentLevel.label}</Text>
          </View>
          <View style={[styles.apiStatusBadge, { backgroundColor: hasApiKey ? `${colors.success}20` : `${colors.destructive}15` }]}>
            <View style={[styles.apiStatusDot, { backgroundColor: hasApiKey ? colors.success : colors.destructive }]} />
            <Text style={[styles.apiStatusText, { color: hasApiKey ? colors.success : colors.destructive }]}>
              {hasApiKey ? 'IA active' : 'IA inactive'}
            </Text>
          </View>
        </View>

        {/* XP Progress */}
        <Card style={styles.xpCard}>
          <View style={styles.xpHeader}>
            <Text style={styles.xpLevel}>{currentLevel.label}</Text>
            <Text style={styles.xpValue}>{progress?.xp_points ?? 0} / {currentLevel.max} XP</Text>
          </View>
          <ProgressBar progress={xpProgress} height={10} color={colors.primary} />
          <Text style={styles.xpNext}>
            Prochain niveau : {currentLevel.next} ({currentLevel.max - (progress?.xp_points ?? 0)} XP restants)
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
              <Text style={[styles.tabText, activeSection === tab && styles.tabTextActive]}>
                {tab === 'stats' ? '📊 Stats' : tab === 'errors' ? '🎯 Erreurs' : tab === 'report' ? '📋 Rapport' : '⚙️ API'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* ── STATS SECTION ── */}
        {activeSection === 'stats' && (
          <View>
            <View style={styles.statsGrid}>
              <StatItem icon="flame"       value={progress?.streak_days              ?? 0} label="Jours"          color={colors.secondary} />
              <StatItem icon="book"        value={progress?.lessons_completed         ?? 0} label="Leçons"         color={colors.primary}   />
              <StatItem icon="chatbubbles" value={progress?.conversations_count       ?? 0} label="Conversations"  color={colors.accent}    />
              <StatItem icon="pencil"      value={progress?.writing_exercises_count   ?? 0} label="Écriture"       color={colors.secondary} />
              <StatItem icon="language"    value={progress?.vocab_learned             ?? 0} label="Mots appris"    color={colors.primary}   />
              <StatItem icon="flash"       value={creditsRemaining()}                       label="Crédits IA"     color={colors.accent}    />
            </View>

            {/* Credits bar */}
            <Card style={styles.creditsCard}>
              <View style={styles.creditsHeader}>
                <Ionicons name="flash" size={20} color={colors.primary} />
                <Text style={styles.creditsTitle}>Crédits IA utilisés</Text>
                <Text style={styles.creditsCount}>{creditsUsed} / {MAX_AI_CREDITS}</Text>
              </View>
              <ProgressBar progress={(creditsUsed / MAX_AI_CREDITS) * 100} height={8} color={colors.primary} />
            </Card>

            {/* Achievements */}
            <Card style={styles.achievementsCard}>
              <Text style={styles.sectionTitle}>🏆 Succès</Text>
              <Achievement title="Premier pas"        description="Termine ta première leçon"   completed={(progress?.lessons_completed    ?? 0) > 0}  />
              <Achievement title="Élève assidue"      description="7 jours consécutifs"          completed={(progress?.streak_days          ?? 0) >= 7}  />
              <Achievement title="Vocabulaire riche"  description="Apprendre 50 mots"            completed={(progress?.vocab_learned        ?? 0) >= 50} />
              <Achievement title="Conversationniste"  description="10 conversations avec l'IA"  completed={(progress?.conversations_count  ?? 0) >= 10} />
              <Achievement title="Calligraphe"        description="20 exercices d'écriture"      completed={(progress?.writing_exercises_count ?? 0) >= 20} />
            </Card>

            <TouchableOpacity style={styles.resetBtn} onPress={handleReset}>
              <Ionicons name="trash-outline" size={16} color={colors.destructive} />
              <Text style={styles.resetBtnText}>Réinitialiser la progression</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* ── ERRORS SECTION ── */}
        {activeSection === 'errors' && (
          <View>
            {errorSummary.total_errors === 0 ? (
              <Card style={styles.emptyCard}>
                <Text style={styles.emptyEmoji}>🌟</Text>
                <Text style={styles.emptyTitle}>Aucune erreur enregistrée !</Text>
                <Text style={styles.emptyBody}>
                  Continue à pratiquer pour que l'IA puisse analyser ta progression et personnaliser tes exercices.
                </Text>
              </Card>
            ) : (
              <View>
                {/* Summary */}
                <Card style={styles.errorSummaryCard}>
                  <Text style={styles.sectionTitle}>📊 Résumé des difficultés</Text>
                  <View style={styles.errorStatsRow}>
                    <View style={styles.errorStatItem}>
                      <Text style={styles.errorStatValue}>{errorSummary.total_errors}</Text>
                      <Text style={styles.errorStatLabel}>Erreurs actives</Text>
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

                {/* Improvement areas */}
                {errorSummary.improvement_areas.length > 0 && (
                  <Card style={styles.improvCard}>
                    <Text style={styles.sectionTitle}>🎯 Axes d'amélioration</Text>
                    {errorSummary.improvement_areas.map((area, i) => (
                      <View key={i} style={styles.improvRow}>
                        <Ionicons name="alert-circle" size={16} color={colors.secondary} />
                        <Text style={styles.improvText}>{area}</Text>
                      </View>
                    ))}
                  </Card>
                )}

                {/* Weak categories */}
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

                {/* Recent errors list */}
                <Card style={styles.recentErrorsCard}>
                  <Text style={styles.sectionTitle}>🔍 Erreurs récentes</Text>
                  {errorSummary.recent_errors.slice(0, 8).map((err, i) => (
                    <View key={err.id} style={[styles.errorRow, i < errorSummary.recent_errors.length - 1 && styles.errorRowBorder]}>
                      <View style={[styles.errTypeDot, { backgroundColor: errTypeColor(err.type) }]} />
                      <View style={{ flex: 1 }}>
                        <Text style={styles.errorForm}>
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

        {/* ── REPORT SECTION ── */}
        {activeSection === 'report' && (
          <View>
            <TouchableOpacity
              style={[styles.generateReportBtn, generatingReport && { opacity: 0.6 }]}
              onPress={generateAIReport}
              disabled={generatingReport || !hasApiKey}
              activeOpacity={0.85}
            >
              {generatingReport ? (
                <>
                  <ActivityIndicator color={colors.white} size="small" />
                  <Text style={styles.generateReportBtnText}>Génération du rapport...</Text>
                </>
              ) : (
                <>
                  <Ionicons name="document-text" size={20} color={colors.white} />
                  <Text style={styles.generateReportBtnText}>
                    {aiReport ? 'Régénérer le rapport IA' : 'Générer mon rapport IA'}
                  </Text>
                </>
              )}
            </TouchableOpacity>

            {!hasApiKey && (
              <Card style={styles.noKeyWarning}>
                <Ionicons name="warning" size={18} color={colors.secondary} />
                <Text style={styles.noKeyText}>
                  Configurez votre clé API dans l'onglet ⚙️ API pour générer un rapport.
                </Text>
              </Card>
            )}

            {aiReport && (
              <View>
                <Card style={styles.reportCard}>
                  <View style={styles.reportHeader}>
                    <Text style={styles.reportTitle}>📋 Rapport de progression</Text>
                    <Text style={styles.reportDate}>
                      {new Date(aiReport.generated_at).toLocaleDateString('fr-FR')}
                    </Text>
                  </View>
                  <View style={styles.reportLevel}>
                    <Text style={styles.reportLevelLabel}>Niveau actuel :</Text>
                    <Text style={styles.reportLevelValue}>{aiReport.overall_level}</Text>
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
                  <Text style={styles.reportSectionTitle}>🎯 Axes d'amélioration</Text>
                  {aiReport.weaknesses.map((w, i) => (
                    <View key={i} style={styles.reportBullet}>
                      <Text style={styles.reportBulletDot}>📌</Text>
                      <Text style={styles.reportBulletText}>{w}</Text>
                    </View>
                  ))}
                </Card>

                <Card style={styles.reportCard}>
                  <Text style={styles.reportSectionTitle}>📅 Plan sur 7 jours</Text>
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
                    <Text style={styles.objectiveValue}>{aiReport.daily_goal}</Text>
                  </View>
                  <View style={styles.objectiveItem}>
                    <Text style={styles.objectiveLabel}>Cette semaine :</Text>
                    <Text style={styles.objectiveValue}>{aiReport.weekly_objective}</Text>
                  </View>
                </Card>
              </View>
            )}
          </View>
        )}

        {/* ── SETTINGS / API SECTION ── */}
        {activeSection === 'settings' && (
          <View>
            <Card style={styles.apiCard}>
              <View style={styles.apiHeader}>
                <Ionicons name="key" size={22} color={colors.primary} />
                <Text style={styles.apiTitle}>Clé API Gemini</Text>
              </View>

              <Text style={styles.apiDescription}>
                Pour utiliser les fonctionnalités IA (conversation, analyse d'écriture, exercices adaptatifs, rapports), vous avez besoin d'une clé API Gemini gratuite.
              </Text>

              {/* Current key status */}
              <View style={styles.keyStatusRow}>
                <View style={[styles.keyStatusIndicator, { backgroundColor: hasApiKey ? `${colors.success}20` : `${colors.destructive}10` }]}>
                  <Ionicons
                    name={hasApiKey ? 'checkmark-circle' : 'close-circle'}
                    size={18}
                    color={hasApiKey ? colors.success : colors.destructive}
                  />
                  <Text style={[styles.keyStatusText, { color: hasApiKey ? colors.success : colors.destructive }]}>
                    {hasApiKey ? 'Clé configurée' : 'Aucune clé configurée'}
                  </Text>
                </View>
                {hasApiKey && (
                  <Text style={styles.keyPreview}>
                    {apiKey.substring(0, 6)}••••{apiKey.slice(-4)}
                  </Text>
                )}
              </View>

              {/* API Key input */}
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
                      style={[styles.apiActionBtn, styles.apiTestBtn, testingKey && { opacity: 0.6 }]}
                      onPress={handleTestApiKey}
                      disabled={testingKey}
                    >
                      {testingKey ? (
                        <ActivityIndicator size="small" color={colors.primary} />
                      ) : (
                        <Text style={styles.apiTestBtnText}>Tester</Text>
                      )}
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.apiActionBtn, styles.apiSaveBtn, savingKey && { opacity: 0.6 }]}
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
                      onPress={() => { setShowApiKeyInput(false); setApiKeyInput(apiKey); }}
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
                    <Ionicons name={hasApiKey ? 'pencil' : 'add'} size={16} color={colors.white} />
                    <Text style={styles.apiEditBtnText}>
                      {hasApiKey ? 'Modifier la clé' : 'Ajouter ma clé'}
                    </Text>
                  </TouchableOpacity>
                  {hasApiKey && (
                    <TouchableOpacity style={styles.apiDeleteBtn} onPress={handleClearApiKey}>
                      <Ionicons name="trash-outline" size={16} color={colors.destructive} />
                    </TouchableOpacity>
                  )}
                </View>
              )}
            </Card>

            {/* How to get API key */}
            <Card style={styles.howToCard}>
              <Text style={styles.howToTitle}>🔑 Comment obtenir une clé API gratuite ?</Text>
              <View style={styles.howToStep}>
                <Text style={styles.howToNum}>1</Text>
                <Text style={styles.howToText}>Allez sur aistudio.google.com</Text>
              </View>
              <View style={styles.howToStep}>
                <Text style={styles.howToNum}>2</Text>
                <Text style={styles.howToText}>Connectez-vous avec un compte Google</Text>
              </View>
              <View style={styles.howToStep}>
                <Text style={styles.howToNum}>3</Text>
                <Text style={styles.howToText}>Cliquez sur "Get API key" → "Create API key"</Text>
              </View>
              <View style={styles.howToStep}>
                <Text style={styles.howToNum}>4</Text>
                <Text style={styles.howToText}>Copiez la clé (commence par "AIza...") et collez-la ci-dessus</Text>
              </View>
              <Text style={styles.howToNote}>
                💡 Le plan gratuit Gemini offre jusqu'à 1500 requêtes/jour, largement suffisant !
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

function StatItem({ icon, value, label, color }: { icon: string; value: number; label: string; color: string }) {
  return (
    <View style={styles.statItem}>
      <View style={[styles.statIcon, { backgroundColor: `${color}18` }]}>
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
        size={22}
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
  safeArea: { flex: 1, backgroundColor: colors.background },
  container: { flex: 1 },
  content: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 120 },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },

  // Header
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  avatar: { width: 52, height: 52, borderRadius: 26, backgroundColor: colors.primary, justifyContent: 'center', alignItems: 'center' },
  avatarText: { fontSize: 24, fontWeight: '700', color: colors.white },
  userName: { fontSize: fontSize.xl, fontWeight: '700', color: colors.text },
  userLevel: { fontSize: fontSize.xs, color: colors.textMuted, marginTop: 2 },
  apiStatusBadge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 5, borderRadius: borderRadius.full, gap: 5 },
  apiStatusDot: { width: 7, height: 7, borderRadius: 3.5 },
  apiStatusText: { fontSize: fontSize.xs, fontWeight: '700' },

  // XP
  xpCard: { marginBottom: 14 },
  xpHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  xpLevel: { fontSize: fontSize.sm, fontWeight: '700', color: colors.primary },
  xpValue: { fontSize: fontSize.xs, color: colors.textMuted },
  xpNext: { fontSize: fontSize.xs, color: colors.textMuted, marginTop: 6 },

  // Tabs
  tabsRow: { flexDirection: 'row', gap: 6, marginBottom: 14 },
  tab: { flex: 1, paddingVertical: 8, borderRadius: borderRadius.lg, backgroundColor: `${colors.textMuted}10`, alignItems: 'center' },
  tabActive: { backgroundColor: colors.primary },
  tabText: { fontSize: 10, fontWeight: '600', color: colors.textMuted },
  tabTextActive: { color: colors.white },

  // Stats
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 12 },
  statItem: { width: '30%', backgroundColor: colors.card, borderRadius: borderRadius.xl, borderWidth: 1, borderColor: colors.border, padding: 12, alignItems: 'center' },
  statIcon: { width: 38, height: 38, borderRadius: 19, justifyContent: 'center', alignItems: 'center', marginBottom: 6 },
  statValue: { fontSize: fontSize.xl, fontWeight: '800', color: colors.text },
  statLabel: { fontSize: 9, color: colors.textMuted, textAlign: 'center', marginTop: 2, fontWeight: '600' },

  // Credits
  creditsCard: { marginBottom: 12 },
  creditsHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 10 },
  creditsTitle: { fontSize: fontSize.sm, fontWeight: '700', color: colors.text, flex: 1 },
  creditsCount: { fontSize: fontSize.xs, color: colors.textMuted },

  // Achievements
  achievementsCard: { marginBottom: 12 },
  achievementItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: `${colors.border}80` },
  achievementTitle: { fontSize: fontSize.sm, fontWeight: '600', color: colors.text },
  achievementDesc: { fontSize: fontSize.xs, color: colors.textMuted, marginTop: 1 },
  sectionTitle: { fontSize: fontSize.base, fontWeight: '700', color: colors.text, marginBottom: 10 },

  resetBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, paddingVertical: 12, borderRadius: borderRadius.xl, borderWidth: 1, borderColor: `${colors.destructive}40`, marginBottom: 16 },
  resetBtnText: { fontSize: fontSize.sm, color: colors.destructive, fontWeight: '600' },

  // Errors
  emptyCard: { alignItems: 'center', paddingVertical: 32 },
  emptyEmoji: { fontSize: 40, marginBottom: 8 },
  emptyTitle: { fontSize: fontSize.lg, fontWeight: '700', color: colors.text, marginBottom: 6 },
  emptyBody: { fontSize: fontSize.sm, color: colors.textMuted, textAlign: 'center', lineHeight: 20 },

  errorSummaryCard: { marginBottom: 10 },
  errorStatsRow: { flexDirection: 'row', justifyContent: 'space-around' },
  errorStatItem: { alignItems: 'center' },
  errorStatValue: { fontSize: fontSize['2xl'], fontWeight: '800', color: colors.primary },
  errorStatLabel: { fontSize: fontSize.xs, color: colors.textMuted },

  improvCard: { marginBottom: 10, backgroundColor: `${colors.secondary}08` },
  improvRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 6 },
  improvText: { fontSize: fontSize.sm, color: colors.text, textTransform: 'capitalize' },

  weakCard: { marginBottom: 10 },
  chipsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: { backgroundColor: `${colors.primary}12`, paddingHorizontal: 12, paddingVertical: 5, borderRadius: borderRadius.full },
  chipText: { fontSize: fontSize.xs, color: colors.primary, fontWeight: '600' },

  recentErrorsCard: { marginBottom: 12 },
  errorRow: { paddingVertical: 8, flexDirection: 'row', alignItems: 'flex-start', gap: 8 },
  errorRowBorder: { borderBottomWidth: 1, borderBottomColor: `${colors.border}60` },
  errTypeDot: { width: 8, height: 8, borderRadius: 4, marginTop: 5 },
  errorForm: { fontSize: fontSize.sm, color: colors.text },
  errorAttempt: { color: colors.destructive, fontWeight: '600' },
  errorCorrect: { color: colors.success, fontWeight: '600' },
  errorMeta: { fontSize: fontSize.xs, color: colors.textMuted, marginTop: 2 },

  // Report
  generateReportBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    backgroundColor: colors.primary, borderRadius: borderRadius['2xl'],
    paddingVertical: 14, gap: 8, marginBottom: 12,
  },
  generateReportBtnText: { color: colors.white, fontSize: fontSize.base, fontWeight: '700' },
  noKeyWarning: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 12, backgroundColor: `${colors.secondary}10` },
  noKeyText: { fontSize: fontSize.sm, color: colors.text, flex: 1, lineHeight: 20 },

  reportCard: { marginBottom: 10 },
  reportHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 },
  reportTitle: { fontSize: fontSize.base, fontWeight: '700', color: colors.text },
  reportDate: { fontSize: fontSize.xs, color: colors.textMuted },
  reportLevel: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 10 },
  reportLevelLabel: { fontSize: fontSize.sm, color: colors.textMuted },
  reportLevelValue: { fontSize: fontSize.base, fontWeight: '700', color: colors.primary },
  reportEncouragement: { fontSize: fontSize.sm, color: colors.text, fontStyle: 'italic', lineHeight: 20, borderLeftWidth: 3, borderLeftColor: colors.primary, paddingLeft: 10 },
  reportSectionTitle: { fontSize: fontSize.base, fontWeight: '700', color: colors.text, marginBottom: 10 },
  reportBullet: { flexDirection: 'row', alignItems: 'flex-start', gap: 8, marginBottom: 6 },
  reportBulletDot: { fontSize: 14, marginTop: 1 },
  reportBulletText: { fontSize: fontSize.sm, color: colors.text, flex: 1, lineHeight: 20 },

  planStep: { flexDirection: 'row', alignItems: 'flex-start', gap: 10, marginBottom: 8 },
  planStepNum: { width: 24, height: 24, borderRadius: 12, backgroundColor: colors.primary, justifyContent: 'center', alignItems: 'center' },
  planStepNumText: { color: colors.white, fontSize: 11, fontWeight: '700' },
  planStepText: { flex: 1, fontSize: fontSize.sm, color: colors.text, lineHeight: 20 },

  objectiveItem: { marginBottom: 8 },
  objectiveLabel: { fontSize: fontSize.xs, color: colors.textMuted, fontWeight: '700', textTransform: 'uppercase', marginBottom: 2 },
  objectiveValue: { fontSize: fontSize.sm, color: colors.text, lineHeight: 20 },

  // API Settings
  apiCard: { marginBottom: 12 },
  apiHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 10 },
  apiTitle: { fontSize: fontSize.base, fontWeight: '700', color: colors.text },
  apiDescription: { fontSize: fontSize.sm, color: colors.textMuted, lineHeight: 20, marginBottom: 14 },

  keyStatusRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 },
  keyStatusIndicator: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 12, paddingVertical: 6, borderRadius: borderRadius.full },
  keyStatusText: { fontSize: fontSize.xs, fontWeight: '700' },
  keyPreview: { fontSize: fontSize.xs, color: colors.textMuted, fontFamily: 'monospace' },

  apiInputContainer: { gap: 10 },
  apiInputRow: { flexDirection: 'row', alignItems: 'center', borderWidth: 1.5, borderColor: colors.border, borderRadius: borderRadius.xl, backgroundColor: colors.background, paddingHorizontal: 14, paddingVertical: 2 },
  apiInput: { flex: 1, fontSize: fontSize.base, color: colors.text, paddingVertical: 12, fontFamily: 'monospace' },
  eyeBtn: { padding: 8 },

  apiActions: { flexDirection: 'row', gap: 8 },
  apiActionBtn: { flex: 1, paddingVertical: 11, borderRadius: borderRadius.xl, alignItems: 'center', justifyContent: 'center' },
  apiTestBtn: { backgroundColor: `${colors.primary}12`, borderWidth: 1, borderColor: `${colors.primary}25` },
  apiTestBtnText: { fontSize: fontSize.sm, fontWeight: '700', color: colors.primary },
  apiSaveBtn: { backgroundColor: colors.primary },
  apiSaveBtnText: { fontSize: fontSize.sm, fontWeight: '700', color: colors.white },
  apiCancelBtn: { paddingHorizontal: 16, paddingVertical: 11, borderRadius: borderRadius.xl, backgroundColor: `${colors.textMuted}12` },
  apiCancelBtnText: { fontSize: fontSize.sm, fontWeight: '600', color: colors.textMuted },

  apiButtonsRow: { flexDirection: 'row', gap: 10 },
  apiEditBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, backgroundColor: colors.primary, borderRadius: borderRadius.xl, paddingVertical: 12 },
  apiEditBtnText: { color: colors.white, fontSize: fontSize.sm, fontWeight: '700' },
  apiDeleteBtn: { width: 44, height: 44, borderRadius: borderRadius.xl, borderWidth: 1, borderColor: `${colors.destructive}40`, justifyContent: 'center', alignItems: 'center' },

  howToCard: { marginBottom: 16, backgroundColor: `${colors.accent}08` },
  howToTitle: { fontSize: fontSize.sm, fontWeight: '700', color: colors.text, marginBottom: 12 },
  howToStep: { flexDirection: 'row', alignItems: 'flex-start', gap: 10, marginBottom: 8 },
  howToNum: { width: 22, height: 22, borderRadius: 11, backgroundColor: colors.primary, color: colors.white, textAlign: 'center', lineHeight: 22, fontSize: 11, fontWeight: '700', overflow: 'hidden' },
  howToText: { fontSize: fontSize.sm, color: colors.text, flex: 1, lineHeight: 20 },
  howToNote: { fontSize: fontSize.xs, color: colors.primary, fontStyle: 'italic', marginTop: 6, lineHeight: 18 },
});