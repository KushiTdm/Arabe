import React, { useState, useRef, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  PanResponder,
  Dimensions,
  Alert,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Speech from 'expo-speech';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useProfile } from '../lib/ProfileContext';
import { useErrorTracker } from '../lib/useErrorTracker';
import { Card, LoadingSpinner } from '../components/RNComponents';
import { colors, spacing, borderRadius, fontSize } from '../theme';
import { invokeAI } from '../api/aiClient';
import { getAvailableCategories, getWordsForCategory } from '../data/multilingualVocab';

import { CONTENT_WIDTH } from '../lib/dimensions';

const CANVAS_SIZE = CONTENT_WIDTH - 32 - 32;

interface Point { x: number; y: number; }
interface Stroke { points: Point[]; }

interface AIWritingFeedback {
  score: number;
  feedback: string;
  encouragement: string;
  tips: string[];
  next_exercise: string;
}

interface AIGeneratedExercise {
  title: string;
  instruction: string;
  target_letter: string;
  target_letter_name: string;
  tips: string[];
  variations: string[];
}

type ScreenMode = 'learn' | 'practice' | 'ai_exercise';
type TargetType = 'letter' | 'word';

export default function WritingScreen() {
  const { language, addXP, updateProgress, currentProgress: progress, canUseAI, incrementCredits, creditsRemaining, activeProfile } =
    useProfile();
  const userName = activeProfile?.name ?? 'Apprenant';
  const letters = language.alphabet;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [strokes, setStrokes] = useState<Stroke[]>([]);
  const [currentStroke, setCurrentStroke] = useState<Point[]>([]);
  const [showGuide, setShowGuide] = useState(true);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [feedback, setFeedback] = useState<AIWritingFeedback | null>(null);
  const [mode, setMode] = useState<ScreenMode>('learn');
  const [targetType, setTargetType] = useState<TargetType>('letter');
  const [isLoadingExercise, setIsLoadingExercise] = useState(false);
  const [aiExercise, setAiExercise] = useState<AIGeneratedExercise | null>(null);

  // true pendant qu'un trait est en cours → désactive le scroll de la page
  const [canvasActive, setCanvasActive] = useState(false);

  const {
    addError,
    addSession,
    getErrorsForAIPrompt,
    getAdaptiveExerciseSuggestion,
  } = useErrorTracker();

  // Cibles d'écriture "mots" : vocabulaire statique de la langue active
  const wordTargets = useMemo(
    () => getAvailableCategories(language.code)
      .flatMap(cat => getWordsForCategory(language.code, cat))
      .map(w => ({ letter: w.native_word, name: w.french_translation, sound: w.transliteration })),
    [language.code],
  );
  const hasWords = wordTargets.length > 0;
  const targets = targetType === 'word' && hasWords ? wordTargets : letters;
  const letter = targets[currentIndex] ?? targets[0];

  const speakLetter = (text: string) => {
    Speech.speak(text, { language: language.ttsLang, rate: 0.7 });
  };

  const handleNext = () => {
    setCurrentIndex(i => (i + 1) % targets.length);
    clearCanvas();
  };

  const handlePrev = () => {
    setCurrentIndex(i => (i - 1 + targets.length) % targets.length);
    clearCanvas();
  };

  const switchTargetType = (type: TargetType) => {
    if (type === targetType) return;
    setTargetType(type);
    setCurrentIndex(0);
    clearCanvas();
  };

  const clearCanvas = () => {
    setStrokes([]);
    setCurrentStroke([]);
    setFeedback(null);
  };

  const isDrawing = useRef(false);
  const lastPoint = useRef<Point | null>(null);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      // Ne jamais céder le geste à la ScrollView parente : sans ça, un trait
      // vertical est interprété comme un scroll et le dessin s'interrompt.
      onPanResponderTerminationRequest: () => false,
      onShouldBlockNativeResponder: () => true,
      onPanResponderGrant: evt => {
        // locationX/Y = coordonnées relatives au canvas lui-même : fiables
        // même après un scroll (contrairement à pageX/pageY + measure()).
        const { locationX, locationY } = evt.nativeEvent;
        const pt = { x: locationX, y: locationY };
        isDrawing.current = true;
        setCanvasActive(true);
        lastPoint.current = pt;
        setCurrentStroke([pt]);
      },
      onPanResponderMove: evt => {
        if (!isDrawing.current) return;
        const { locationX, locationY } = evt.nativeEvent;
        const pt = { x: locationX, y: locationY };
        if (pt.x < 0 || pt.y < 0 || pt.x > CANVAS_SIZE || pt.y > CANVAS_SIZE) return;
        if (
          lastPoint.current &&
          Math.abs(pt.x - lastPoint.current.x) < 1 &&
          Math.abs(pt.y - lastPoint.current.y) < 1
        ) return;
        lastPoint.current = pt;
        setCurrentStroke(prev => [...prev, pt]);
      },
      onPanResponderRelease: () => {
        isDrawing.current = false;
        setCanvasActive(false);
        lastPoint.current = null;
        setCurrentStroke(prev => {
          if (prev.length >= 2) setStrokes(s => [...s, { points: prev }]);
          return [];
        });
      },
      onPanResponderTerminate: () => {
        isDrawing.current = false;
        setCanvasActive(false);
        lastPoint.current = null;
        setCurrentStroke(prev => {
          if (prev.length >= 2) setStrokes(s => [...s, { points: prev }]);
          return [];
        });
      },
    }),
  ).current;

  const renderStrokeLines = useCallback(
    (strokeList: Stroke[], currentPts: Point[]) => {
      const allStrokes: Stroke[] = [
        ...strokeList,
        ...(currentPts.length >= 2 ? [{ points: currentPts }] : []),
      ];
      const elements: React.ReactElement[] = [];
      allStrokes.forEach((stroke, si) => {
        stroke.points.slice(1).forEach((pt, pi) => {
          const prev = stroke.points[pi];
          const dx = pt.x - prev.x;
          const dy = pt.y - prev.y;
          const len = Math.sqrt(dx * dx + dy * dy);
          if (len < 0.5) return;
          const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
          const BRUSH = 5;
          elements.push(
            <View
              key={`${si}-${pi}`}
              pointerEvents="none"
              style={{
                position: 'absolute',
                left: prev.x,
                top: prev.y - BRUSH / 2,
                width: len,
                height: BRUSH,
                backgroundColor: colors.primary,
                borderRadius: BRUSH / 2,
                transform: [{ translateX: 0 }, { rotate: `${angle}deg` }],
                transformOrigin: '0% 50%',
              }}
            />,
          );
        });
      });
      return elements;
    },
    [],
  );

  const analyzeWriting = async () => {
    if (strokes.length === 0) {
      Alert.alert(userName, `Dessine d'abord avant de demander une analyse !`);
      return;
    }
    if (!canUseAI()) {
      Alert.alert('Crédits IA', 'Tu as utilisé tous tes crédits IA.');
      return;
    }
    setIsAnalyzing(true);
    try {
      const ok = await incrementCredits();
      if (!ok) return;

      const strokeDesc = strokes.map((stroke, i) => {
        const start = stroke.points[0];
        const end = stroke.points[stroke.points.length - 1];
        if (!start || !end) return `Trait ${i + 1}: (vide)`;
        const dx = end.x - start.x;
        const dy = end.y - start.y;
        const dirH = dx < -5 ? 'droite→gauche' : dx > 5 ? 'gauche→droite' : 'horizontal';
        const dirV = dy > 5 ? 'haut→bas' : dy < -5 ? 'bas→haut' : 'vertical';
        return `Trait ${i + 1}: direction ${dirH}/${dirV}, longueur ~${Math.round(Math.sqrt(dx * dx + dy * dy))}px, ${stroke.points.length} points`;
      }).join('\n');

      const errorsContext = getErrorsForAIPrompt();
      const targetLetter = mode === 'ai_exercise' && aiExercise ? aiExercise.target_letter : letter.letter;
      const targetName = mode === 'ai_exercise' && aiExercise ? aiExercise.target_letter_name : letter.name;
      const targetKind = mode !== 'ai_exercise' && targetType === 'word' ? 'mot' : 'caractère';

      const res = await invokeAI<AIWritingFeedback>(
        `${language.aiSeedPrompt}
Tu analyses l'écriture de ${userName} qui essaie d'écrire le ${targetKind} "${targetLetter}" (${targetName}) en ${language.familiarName}.

Canvas: ${CANVAS_SIZE}x${CANVAS_SIZE}px.${language.rtl ? ' L\'écriture va de DROITE à GAUCHE.' : ''}
Nombre de traits: ${strokes.length}

Description des traits:
${strokeDesc}

${errorsContext}

Analyse son écriture. Sois bienveillant et encourageant. Adresse-toi à "${userName}".
Donne: score /10, feedback constructif, encouragement, 2-3 conseils pratiques, prochain exercice.

JSON: { "score": 7, "feedback": "...", "encouragement": "...", "tips": ["...", "..."], "next_exercise": "..." }`,
      );

      setFeedback(res);

      if (res.score < 6) {
        await addError({
          type: 'writing',
          category: `${targetKind === 'mot' ? 'mots' : 'lettres'} ${language.familiarName}`,
          description: `Difficulté avec le ${targetKind} ${targetLetter} (${targetName})`,
          correct_form: targetLetter,
          user_attempt: `${strokes.length} traits, score ${res.score}/10`,
          source: 'writing',
        });
      }

      await addSession({
        type: 'writing',
        topic: `${targetKind === 'mot' ? 'Mot' : 'Caractère'} ${targetName}`,
        duration_minutes: 1,
        score: res.score,
        errors_count: res.score < 6 ? 1 : 0,
        xp_earned: res.score >= 7 ? 5 : 3,
      });

      await addXP(res.score >= 7 ? 5 : 3);
      await updateProgress({ writing_exercises_count: (progress?.writing_exercises_count || 0) + 1 });
    } catch (err: any) {
      Alert.alert('Erreur IA', err?.message || "Impossible d'analyser. Vérifie ta clé API dans Profil.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const generateAIExercise = async () => {
    if (!canUseAI()) {
      Alert.alert('Crédits', 'Crédits IA insuffisants.');
      return;
    }
    setIsLoadingExercise(true);
    setFeedback(null);
    clearCanvas();
    try {
      const ok = await incrementCredits();
      if (!ok) return;

      const errorsCtx = getErrorsForAIPrompt();
      const suggestion = getAdaptiveExerciseSuggestion();

      const res = await invokeAI<AIGeneratedExercise>(
        `${language.aiSeedPrompt}
Génère un exercice d'écriture ADAPTÉ aux difficultés de ${userName} en ${language.familiarName}.

${errorsCtx}
${suggestion ? `Suggestion d'exercice: ${suggestion.description}` : 'Propose un exercice pour débutant.'}

Choisis UN caractère de l'alphabet ${language.familiarName} à travailler.
JSON: {
  "title": "Exercice adapté: ...",
  "instruction": "Instruction claire pour ${userName}...",
  "target_letter": "${letters[0]?.letter ?? 'A'}",
  "target_letter_name": "${letters[0]?.name ?? 'A'}",
  "tips": ["conseil 1", "conseil 2", "conseil 3"],
  "variations": ["forme 1", "forme 2"]
}`,
      );

      setAiExercise(res);
      setMode('ai_exercise');
    } catch (err: any) {
      Alert.alert('Erreur IA', err?.message || 'Impossible de générer un exercice.');
    } finally {
      setIsLoadingExercise(false);
    }
  };

  const activeLetter = mode === 'ai_exercise' && aiExercise
    ? { letter: aiExercise.target_letter, name: aiExercise.target_letter_name, sound: '' }
    : letter;

  const hasPositionalForms = !!(letter as any).isolated;

  // ── LEARN MODE ────────────────────────────────────────────────────────
  if (mode === 'learn') {
    return (
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.learnScrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.header}>
            <View style={{ flex: 1 }}>
              <Text style={styles.headerTitle}>✍️ Écriture {language.familiarName}</Text>
              <Text style={styles.headerSubtitle}>
                {targetType === 'word' ? 'Mot' : 'Caractère'} {currentIndex + 1}/{targets.length}
              </Text>
            </View>
            <View style={styles.creditsTag}>
              <Ionicons name="flash" size={14} color={colors.primary} />
              <Text style={styles.creditsText}>{creditsRemaining()}</Text>
            </View>
          </View>

          <View style={styles.progressBarBg}>
            <View style={[styles.progressBarFill, { width: `${((currentIndex + 1) / targets.length) * 100}%` }]} />
          </View>

          {/* Bascule Lettres / Mots */}
          {hasWords && (
            <View style={styles.targetTypeRow}>
              <TouchableOpacity
                style={[styles.targetTypeBtn, targetType === 'letter' && styles.targetTypeBtnActive]}
                onPress={() => switchTargetType('letter')}
                activeOpacity={0.8}
              >
                <Text style={[styles.targetTypeText, targetType === 'letter' && styles.targetTypeTextActive]}>
                  🔤 Lettres
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.targetTypeBtn, targetType === 'word' && styles.targetTypeBtnActive]}
                onPress={() => switchTargetType('word')}
                activeOpacity={0.8}
              >
                <Text style={[styles.targetTypeText, targetType === 'word' && styles.targetTypeTextActive]}>
                  📖 Mots
                </Text>
              </TouchableOpacity>
            </View>
          )}

          <Card style={styles.letterCard}>
            <TouchableOpacity onPress={() => speakLetter(letter.letter)} style={styles.letterContainer} activeOpacity={0.7}>
              <Text style={styles.letterText} adjustsFontSizeToFit numberOfLines={1}>{letter.letter}</Text>
              <View style={styles.speakHint}>
                <Ionicons name="volume-high" size={14} color={colors.primary} />
                <Text style={styles.speakHintText}>Toucher pour écouter</Text>
              </View>
            </TouchableOpacity>
            <Text style={styles.letterName}>{letter.name}</Text>
            {!!letter.sound && <Text style={styles.letterSound}>Son : /{letter.sound}/</Text>}
          </Card>

          {/* Formes positionnelles — arabe uniquement */}
          {hasPositionalForms && (
            <Card style={styles.formsCard}>
              <Text style={styles.formsTitle}>📐 Formes selon la position</Text>
              <View style={styles.formsGrid}>
                {[
                  { label: 'Isolée', form: (letter as any).isolated },
                  { label: 'Début',  form: (letter as any).initial },
                  { label: 'Milieu', form: (letter as any).medial },
                  { label: 'Fin',    form: (letter as any).final },
                ].filter(f => !!f.form).map(f => (
                  <View key={f.label} style={styles.formItem}>
                    <Text style={styles.formLetter}>{f.form}</Text>
                    <Text style={styles.formLabel}>{f.label}</Text>
                  </View>
                ))}
              </View>
            </Card>
          )}

          {!!(letter as any).tips && (
            <Card style={styles.tipsCard}>
              <Text style={styles.tipsTitle}>💡 Conseil d'écriture</Text>
              <Text style={styles.tipsBody}>{(letter as any).tips}</Text>
              {language.rtl && (
                <Text style={styles.rtlNote}>⬅️ L'{language.familiarName} s'écrit de droite à gauche</Text>
              )}
            </Card>
          )}

          <TouchableOpacity
            style={styles.primaryBtn}
            onPress={() => { clearCanvas(); setMode('practice'); }}
            activeOpacity={0.85}
          >
            <Ionicons name="pencil" size={20} color={colors.white} />
            <Text style={styles.primaryBtnText}>Pratiquer l'écriture tactile</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.secondaryBtn, isLoadingExercise && { opacity: 0.6 }]}
            onPress={generateAIExercise}
            disabled={isLoadingExercise}
            activeOpacity={0.85}
          >
            {isLoadingExercise
              ? <LoadingSpinner size="sm" color={colors.primary} />
              : <Ionicons name="sparkles" size={18} color={colors.primary} />
            }
            <Text style={styles.secondaryBtnText}>
              {isLoadingExercise ? 'Génération...' : 'Exercice IA adaptatif'}
            </Text>
          </TouchableOpacity>

          <View style={styles.navRow}>
            <TouchableOpacity style={styles.navBtn} onPress={handlePrev} activeOpacity={0.8}>
              <Ionicons name="arrow-back" size={18} color={colors.text} />
              <Text style={styles.navBtnText}>Précédent</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.navBtn, styles.navBtnPrimary]} onPress={handleNext} activeOpacity={0.8}>
              <Text style={[styles.navBtnText, { color: colors.white }]}>Suivant</Text>
              <Ionicons name="arrow-forward" size={18} color={colors.white} />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // ── PRACTICE / AI_EXERCISE MODE ───────────────────────────────────────
  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.practiceScrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        scrollEnabled={!canvasActive}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => { setMode('learn'); clearCanvas(); }} style={styles.backBtn} activeOpacity={0.7}>
            <Ionicons name="arrow-back" size={22} color={colors.text} />
          </TouchableOpacity>
          <View style={{ flex: 1, marginLeft: 10 }}>
            <Text style={styles.headerTitle} numberOfLines={1}>
              {mode === 'ai_exercise' ? '🎯 Exercice IA' : `✍️ ${activeLetter.letter}`}
            </Text>
            <Text style={styles.headerSubtitle} numberOfLines={1}>
              {mode === 'ai_exercise'
                ? aiExercise?.title || 'Exercice adaptatif'
                : `${activeLetter.name} — dessine avec ton doigt`}
            </Text>
          </View>
          <View style={styles.creditsTag}>
            <Ionicons name="flash" size={14} color={colors.primary} />
            <Text style={styles.creditsText}>{creditsRemaining()}</Text>
          </View>
        </View>

        {mode === 'ai_exercise' && aiExercise && (
          <Card style={styles.exerciseCard}>
            <Text style={styles.exerciseInstruction}>{aiExercise.instruction}</Text>
            <View style={styles.variationsRow}>
              {aiExercise.variations.map((v, i) => (
                <View key={i} style={styles.variationChip}>
                  <Text style={styles.variationText}>{v}</Text>
                </View>
              ))}
            </View>
            <View style={styles.exerciseTips}>
              {aiExercise.tips.map((t, i) => (
                <Text key={i} style={styles.exerciseTip}>• {t}</Text>
              ))}
            </View>
          </Card>
        )}

        <Card style={styles.referenceCard}>
          <TouchableOpacity onPress={() => speakLetter(activeLetter.letter)} style={styles.refLetterBtn} activeOpacity={0.7}>
            <Text style={styles.refLetter} adjustsFontSizeToFit numberOfLines={1}>{activeLetter.letter}</Text>
            <Ionicons name="volume-high" size={12} color={colors.primary} style={{ marginTop: 2 }} />
          </TouchableOpacity>
          <View style={{ flex: 1, marginLeft: 14 }}>
            <Text style={styles.refName}>{activeLetter.name}</Text>
            <Text style={styles.refHint}>
              {mode === 'ai_exercise' ? 'Suis les conseils et dessine ci-dessous' : 'Observe puis dessine ci-dessous'}
            </Text>
          </View>
          <TouchableOpacity onPress={() => setShowGuide(!showGuide)} style={[styles.guideToggle, showGuide && styles.guideToggleActive]}>
            <Ionicons name={showGuide ? 'eye' : 'eye-off'} size={18} color={showGuide ? colors.primary : colors.textMuted} />
          </TouchableOpacity>
        </Card>

        <View style={styles.canvasWrapper}>
          <View
            style={[styles.canvas, { width: CANVAS_SIZE, height: CANVAS_SIZE }]}
            {...panResponder.panHandlers}
          >
            {showGuide && (
              <View pointerEvents="none" style={[StyleSheet.absoluteFill, { justifyContent: 'center', alignItems: 'center' }]}>
                <Text
                  style={[styles.guideLetterText, { fontSize: CANVAS_SIZE * 0.65, width: CANVAS_SIZE - 16 }]}
                  adjustsFontSizeToFit
                  numberOfLines={1}
                >
                  {activeLetter.letter}
                </Text>
              </View>
            )}
            {renderStrokeLines(strokes, currentStroke)}
          </View>

          <View style={[styles.canvasActions, { width: CANVAS_SIZE }]}>
            <TouchableOpacity style={styles.canvasActionBtn} onPress={clearCanvas}>
              <Ionicons name="trash-outline" size={16} color={colors.destructive} />
              <Text style={[styles.canvasActionText, { color: colors.destructive }]}>Effacer</Text>
            </TouchableOpacity>
            <Text style={styles.canvasHint}>✏️ Dessine avec ton doigt</Text>
            <TouchableOpacity style={styles.canvasActionBtn} onPress={() => setShowGuide(g => !g)}>
              <Ionicons name={showGuide ? 'eye-off-outline' : 'eye-outline'} size={16} color={colors.primary} />
              <Text style={styles.canvasActionText}>{showGuide ? 'Masquer' : 'Guide'}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          style={[styles.analyzeBtn, (strokes.length === 0 || isAnalyzing) && styles.analyzeBtnDisabled]}
          onPress={analyzeWriting}
          disabled={strokes.length === 0 || isAnalyzing}
          activeOpacity={0.85}
        >
          {isAnalyzing ? (
            <>
              <LoadingSpinner size="sm" color={colors.white} />
              <Text style={styles.analyzeBtnText}>Analyse IA en cours...</Text>
            </>
          ) : (
            <>
              <Ionicons name="sparkles" size={20} color={colors.white} />
              <Text style={styles.analyzeBtnText}>Analyser mon écriture</Text>
            </>
          )}
        </TouchableOpacity>

        {feedback && (
          <Card style={styles.feedbackCard}>
            <View style={styles.scoreRow}>
              <View style={[styles.scoreBadge, { backgroundColor: feedback.score >= 7 ? colors.success : feedback.score >= 5 ? colors.secondary : colors.destructive }]}>
                <Text style={styles.scoreText}>{feedback.score}/10</Text>
              </View>
              <Text style={styles.feedbackTitle}>
                {feedback.score >= 8 ? '🌟 Excellent !' : feedback.score >= 5 ? '👍 Bien joué !' : '💪 Continue !'}
              </Text>
            </View>
            <Text style={styles.feedbackBody}>{feedback.feedback}</Text>
            <View style={styles.encouragementBubble}>
              <Text style={styles.encouragementFeedback}>{feedback.encouragement}</Text>
            </View>
            {feedback.tips.length > 0 && (
              <View style={styles.tipsSection}>
                <Text style={styles.tipsSectionTitle}>📝 Conseils :</Text>
                {feedback.tips.map((tip, i) => (
                  <Text key={i} style={styles.tipText}>• {tip}</Text>
                ))}
              </View>
            )}
            {feedback.next_exercise && (
              <View style={styles.nextExerciseBubble}>
                <Ionicons name="arrow-forward-circle" size={16} color={colors.accent} />
                <Text style={styles.nextExerciseText}>{feedback.next_exercise}</Text>
              </View>
            )}
            <View style={styles.postFeedbackActions}>
              <TouchableOpacity style={styles.postActionBtn} onPress={clearCanvas}>
                <Ionicons name="refresh" size={16} color={colors.primary} />
                <Text style={styles.postActionText}>Réessayer</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.postActionBtn, styles.postActionPrimary]} onPress={() => { handleNext(); setMode('practice'); }}>
                <Text style={[styles.postActionText, { color: colors.white }]}>Suivant</Text>
                <Ionicons name="arrow-forward" size={16} color={colors.white} />
              </TouchableOpacity>
            </View>
          </Card>
        )}

        <View style={styles.bottomNavRow}>
          <TouchableOpacity style={styles.navBtn} onPress={handlePrev} activeOpacity={0.8}>
            <Ionicons name="arrow-back" size={16} color={colors.text} />
            <Text style={styles.navBtnText}>Précédent</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navBtn} onPress={() => { clearCanvas(); setMode('learn'); }} activeOpacity={0.8}>
            <Ionicons name="book-outline" size={16} color={colors.text} />
            <Text style={styles.navBtnText}>Fiche</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.navBtn, styles.navBtnPrimary]} onPress={handleNext} activeOpacity={0.8}>
            <Text style={[styles.navBtnText, { color: colors.white }]}>Suivant</Text>
            <Ionicons name="arrow-forward" size={16} color={colors.white} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  container: { flex: 1, backgroundColor: colors.background },
  learnScrollContent: { paddingHorizontal: 16, paddingTop: 16, paddingBottom: 120 },
  practiceScrollContent: { paddingHorizontal: 16, paddingTop: 16, paddingBottom: 120, alignItems: 'center' },

  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 12, width: '100%' },
  headerTitle: { fontSize: fontSize.lg, fontWeight: '700', color: colors.text },
  headerSubtitle: { fontSize: fontSize.xs, color: colors.textMuted, marginTop: 2 },
  backBtn: { padding: 8, borderRadius: borderRadius.md, backgroundColor: `${colors.textMuted}15` },
  creditsTag: { flexDirection: 'row', alignItems: 'center', backgroundColor: `${colors.primary}12`, paddingHorizontal: 10, paddingVertical: 5, borderRadius: borderRadius.full, gap: 4 },
  creditsText: { fontSize: fontSize.xs, fontWeight: '700', color: colors.primary },

  progressBarBg: { height: 4, backgroundColor: `${colors.textMuted}20`, borderRadius: 2, marginBottom: 16, overflow: 'hidden', width: '100%' },
  progressBarFill: { height: '100%', backgroundColor: colors.primary, borderRadius: 2 },

  letterCard: { alignItems: 'center', marginBottom: 12, paddingVertical: 20, width: '100%' },
  letterContainer: { alignItems: 'center', paddingVertical: 8 },
  letterText: { fontSize: 80, fontWeight: '700', color: colors.text, lineHeight: 96 },
  speakHint: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 },
  speakHintText: { fontSize: fontSize.xs, color: colors.textMuted },
  letterName: { fontSize: fontSize.xl, fontWeight: '700', color: colors.primary, marginTop: 4 },
  letterSound: { fontSize: fontSize.sm, color: colors.textMuted, marginTop: 2 },

  formsCard: { marginBottom: 12, width: '100%' },
  formsTitle: { fontSize: fontSize.sm, fontWeight: '700', color: colors.text, marginBottom: 12 },
  formsGrid: { flexDirection: 'row', justifyContent: 'space-around' },
  formItem: { alignItems: 'center', flex: 1, padding: 8, backgroundColor: `${colors.primary}08`, borderRadius: borderRadius.md, marginHorizontal: 3 },
  formLetter: { fontSize: 26, fontWeight: '700', color: colors.text },
  formLabel: { fontSize: 9, color: colors.textMuted, marginTop: 4, fontWeight: '600' },

  tipsCard: { marginBottom: 16, width: '100%', backgroundColor: `${colors.accent}10` },
  tipsTitle: { fontSize: fontSize.sm, fontWeight: '700', color: colors.text, marginBottom: 6 },
  tipsBody: { fontSize: fontSize.sm, color: colors.text, lineHeight: 20 },
  rtlNote: { fontSize: fontSize.xs, color: colors.primary, marginTop: 8, fontStyle: 'italic' },

  primaryBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: colors.primary, borderRadius: borderRadius['2xl'], paddingVertical: 14, gap: 8, marginBottom: 10, width: '100%' },
  primaryBtnText: { color: colors.white, fontSize: fontSize.base, fontWeight: '700' },
  secondaryBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: `${colors.primary}12`, borderRadius: borderRadius['2xl'], paddingVertical: 14, gap: 8, marginBottom: 16, borderWidth: 1, borderColor: `${colors.primary}25`, width: '100%' },
  secondaryBtnText: { color: colors.primary, fontSize: fontSize.base, fontWeight: '600' },

  targetTypeRow: { flexDirection: 'row', gap: 8, marginBottom: 14, width: '100%' },
  targetTypeBtn: {
    flex: 1, alignItems: 'center', paddingVertical: 10,
    borderRadius: borderRadius.xl, backgroundColor: colors.card,
    borderWidth: 1.5, borderColor: colors.border,
  },
  targetTypeBtnActive: { borderColor: colors.primary, backgroundColor: `${colors.primary}10` },
  targetTypeText: { fontSize: fontSize.sm, fontWeight: '700', color: colors.textMuted },
  targetTypeTextActive: { color: colors.primary },

  navRow: { flexDirection: 'row', gap: 10, marginBottom: 16, width: '100%' },
  navBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: colors.card, borderRadius: borderRadius.xl, paddingVertical: 12, gap: 6, borderWidth: 1, borderColor: colors.border },
  navBtnPrimary: { backgroundColor: colors.primary, borderColor: colors.primary },
  navBtnText: { fontSize: fontSize.sm, fontWeight: '600', color: colors.text },

  exerciseCard: { marginBottom: 12, width: '100%', backgroundColor: `${colors.secondary}08`, borderColor: `${colors.secondary}30` },
  exerciseInstruction: { fontSize: fontSize.sm, color: colors.text, lineHeight: 20, marginBottom: 10, fontStyle: 'italic' },
  variationsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 10 },
  variationChip: { backgroundColor: `${colors.primary}12`, paddingHorizontal: 10, paddingVertical: 4, borderRadius: borderRadius.full },
  variationText: { fontSize: fontSize.sm, color: colors.primary, fontWeight: '600' },
  exerciseTips: { gap: 4 },
  exerciseTip: { fontSize: fontSize.xs, color: colors.textMuted, lineHeight: 18 },

  referenceCard: { flexDirection: 'row', alignItems: 'center', marginBottom: 14, width: '100%' },
  refLetterBtn: { width: 60, height: 60, borderRadius: borderRadius.xl, backgroundColor: `${colors.primary}10`, justifyContent: 'center', alignItems: 'center' },
  refLetter: { fontSize: 34, fontWeight: '700', color: colors.text },
  refName: { fontSize: fontSize.base, fontWeight: '700', color: colors.text },
  refHint: { fontSize: fontSize.xs, color: colors.textMuted, marginTop: 2 },
  guideToggle: { width: 36, height: 36, borderRadius: 18, backgroundColor: `${colors.textMuted}10`, justifyContent: 'center', alignItems: 'center' },
  guideToggleActive: { backgroundColor: `${colors.primary}15` },

  canvasWrapper: { alignItems: 'center', marginBottom: 14, width: '100%' },
  canvas: { backgroundColor: '#f9fafb', borderRadius: borderRadius.xl, borderWidth: 2, borderColor: colors.border, overflow: 'hidden', justifyContent: 'center', alignItems: 'center' },
  guideLetterText: { fontWeight: '200', color: `${colors.textMuted}20`, textAlign: 'center' },
  canvasActions: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10, paddingHorizontal: 4 },
  canvasActionBtn: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingVertical: 6, paddingHorizontal: 12, borderRadius: borderRadius.full, backgroundColor: `${colors.textMuted}10` },
  canvasActionText: { fontSize: fontSize.xs, fontWeight: '600', color: colors.primary },
  canvasHint: { fontSize: fontSize.xs, color: colors.textMuted, fontStyle: 'italic' },

  analyzeBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: colors.accent, borderRadius: borderRadius['2xl'], paddingVertical: 14, gap: 8, marginBottom: 14, width: '100%' },
  analyzeBtnDisabled: { opacity: 0.45 },
  analyzeBtnText: { color: colors.white, fontSize: fontSize.base, fontWeight: '700' },

  feedbackCard: { marginBottom: 14, width: '100%' },
  scoreRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 12 },
  scoreBadge: { width: 50, height: 50, borderRadius: 25, justifyContent: 'center', alignItems: 'center' },
  scoreText: { color: colors.white, fontWeight: '800', fontSize: fontSize.sm },
  feedbackTitle: { fontSize: fontSize.lg, fontWeight: '700', color: colors.text, flex: 1 },
  feedbackBody: { fontSize: fontSize.sm, color: colors.text, lineHeight: 22, marginBottom: 12 },
  encouragementBubble: { backgroundColor: `${colors.accent}12`, borderRadius: borderRadius.lg, padding: 12, marginBottom: 12 },
  encouragementFeedback: { fontSize: fontSize.sm, color: colors.text, fontStyle: 'italic', lineHeight: 20 },
  tipsSection: { marginBottom: 12 },
  tipsSectionTitle: { fontSize: fontSize.sm, fontWeight: '700', color: colors.text, marginBottom: 6 },
  tipText: { fontSize: fontSize.xs, color: colors.textMuted, lineHeight: 20, marginBottom: 2 },
  nextExerciseBubble: { flexDirection: 'row', alignItems: 'flex-start', gap: 8, backgroundColor: `${colors.accent}10`, borderRadius: borderRadius.lg, padding: 10, marginBottom: 12 },
  nextExerciseText: { fontSize: fontSize.xs, color: colors.text, flex: 1, lineHeight: 18 },
  postFeedbackActions: { flexDirection: 'row', gap: 10 },
  postActionBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, paddingVertical: 11, borderRadius: borderRadius.xl, backgroundColor: `${colors.primary}10`, borderWidth: 1, borderColor: `${colors.primary}20` },
  postActionPrimary: { backgroundColor: colors.primary, borderColor: colors.primary },
  postActionText: { fontSize: fontSize.sm, fontWeight: '600', color: colors.primary },

  bottomNavRow: { flexDirection: 'row', gap: 8, marginTop: 8, width: '100%' },
});
