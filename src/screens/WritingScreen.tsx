import React, { useState, useRef, useCallback } from 'react';
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
  KeyboardAvoidingView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Speech from 'expo-speech';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUserProgress } from '../lib/useUserProgress';
import { useErrorTracker } from '../lib/useErrorTracker';
import { Card, Button, LoadingSpinner } from '../components/RNComponents';
import { colors, spacing, borderRadius, fontSize } from '../theme';
import { invokeAI } from '../api/aiClient';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const CANVAS_SIZE = Math.min(SCREEN_WIDTH - 48, 320);

const LETTERS = [
  { letter: 'ا', name: 'Alif',  sound: 'a',  isolated: 'ا', initial: 'ا',   medial: 'ـا',  final: 'ـا',  tips: 'Trait vertical de haut en bas, légèrement incliné vers la droite.' },
  { letter: 'ب', name: 'Ba',    sound: 'b',  isolated: 'ب', initial: 'بـ',  medial: 'ـبـ', final: 'ـب',  tips: 'Ligne horizontale avec un point en dessous.' },
  { letter: 'ت', name: 'Ta',    sound: 't',  isolated: 'ت', initial: 'تـ',  medial: 'ـتـ', final: 'ـت',  tips: 'Comme Ba mais avec deux points au-dessus.' },
  { letter: 'ث', name: 'Tha',   sound: 'th', isolated: 'ث', initial: 'ثـ',  medial: 'ـثـ', final: 'ـث',  tips: 'Comme Ba mais avec trois points au-dessus.' },
  { letter: 'ج', name: 'Jim',   sound: 'j',  isolated: 'ج', initial: 'جـ',  medial: 'ـجـ', final: 'ـج',  tips: 'Courbe avec un crochet vers le bas, point en dessous.' },
  { letter: 'ح', name: 'Ha',    sound: 'ḥ',  isolated: 'ح', initial: 'حـ',  medial: 'ـحـ', final: 'ـح',  tips: 'Deux courbes jointes, sans point.' },
  { letter: 'خ', name: 'Kha',   sound: 'kh', isolated: 'خ', initial: 'خـ',  medial: 'ـخـ', final: 'ـخ',  tips: 'Comme Ha mais avec un point au-dessus.' },
  { letter: 'د', name: 'Dal',   sound: 'd',  isolated: 'د', initial: 'د',   medial: 'ـد',  final: 'ـد',  tips: 'Angle droit avec une courbe, s\'écrit seul (ne se connecte pas à gauche).' },
  { letter: 'ذ', name: 'Dhal',  sound: 'dh', isolated: 'ذ', initial: 'ذ',   medial: 'ـذ',  final: 'ـذ',  tips: 'Comme Dal avec un point au-dessus.' },
  { letter: 'ر', name: 'Ra',    sound: 'r',  isolated: 'ر', initial: 'ر',   medial: 'ـر',  final: 'ـر',  tips: 'Petite courbe vers le bas-droite.' },
  { letter: 'ز', name: 'Zay',   sound: 'z',  isolated: 'ز', initial: 'ز',   medial: 'ـز',  final: 'ـز',  tips: 'Comme Ra avec un point au-dessus.' },
  { letter: 'س', name: 'Sin',   sound: 's',  isolated: 'س', initial: 'سـ',  medial: 'ـسـ', final: 'ـس',  tips: 'Trois petites dents puis une queue.' },
  { letter: 'ش', name: 'Shin',  sound: 'sh', isolated: 'ش', initial: 'شـ',  medial: 'ـشـ', final: 'ـش',  tips: 'Comme Sin avec trois points au-dessus.' },
  { letter: 'ص', name: 'Sad',   sound: 'ṣ',  isolated: 'ص', initial: 'صـ',  medial: 'ـصـ', final: 'ـص',  tips: 'Ovale fermé avec une queue vers le bas.' },
  { letter: 'ض', name: 'Dad',   sound: 'ḍ',  isolated: 'ض', initial: 'ضـ',  medial: 'ـضـ', final: 'ـض',  tips: 'Comme Sad avec un point au-dessus.' },
  { letter: 'ط', name: 'Tah',   sound: 'ṭ',  isolated: 'ط', initial: 'طـ',  medial: 'ـطـ', final: 'ـط',  tips: 'Cercle avec un trait vertical.' },
  { letter: 'ظ', name: 'Dhah',  sound: 'ẓ',  isolated: 'ظ', initial: 'ظـ',  medial: 'ـظـ', final: 'ـظ',  tips: 'Comme Tah avec un point au-dessus.' },
  { letter: 'ع', name: 'Ayn',   sound: "'",  isolated: 'ع', initial: 'عـ',  medial: 'ـعـ', final: 'ـع',  tips: 'Forme en spirale ouverte.' },
  { letter: 'غ', name: 'Ghayn', sound: 'gh', isolated: 'غ', initial: 'غـ',  medial: 'ـغـ', final: 'ـغ',  tips: 'Comme Ayn avec un point au-dessus.' },
  { letter: 'ف', name: 'Fa',    sound: 'f',  isolated: 'ف', initial: 'فـ',  medial: 'ـفـ', final: 'ـف',  tips: 'Cercle avec une queue et un point au-dessus.' },
  { letter: 'ق', name: 'Qaf',   sound: 'q',  isolated: 'ق', initial: 'قـ',  medial: 'ـقـ', final: 'ـق',  tips: 'Cercle plus profond avec deux points au-dessus.' },
  { letter: 'ك', name: 'Kaf',   sound: 'k',  isolated: 'ك', initial: 'كـ',  medial: 'ـكـ', final: 'ـك',  tips: 'Comme un L avec une tête.' },
  { letter: 'ل', name: 'Lam',   sound: 'l',  isolated: 'ل', initial: 'لـ',  medial: 'ـلـ', final: 'ـل',  tips: 'Courbe descendante avec boucle vers la gauche.' },
  { letter: 'م', name: 'Mim',   sound: 'm',  isolated: 'م', initial: 'مـ',  medial: 'ـمـ', final: 'ـم',  tips: 'Petit cercle avec une queue descendante.' },
  { letter: 'ن', name: 'Nun',   sound: 'n',  isolated: 'ن', initial: 'نـ',  medial: 'ـنـ', final: 'ـن',  tips: 'Demi-cercle ouvert avec un point au-dessus.' },
  { letter: 'ه', name: 'Ha',    sound: 'h',  isolated: 'ه', initial: 'هـ',  medial: 'ـهـ', final: 'ـه',  tips: 'Deux cercles imbriqués.' },
  { letter: 'و', name: 'Waw',   sound: 'w',  isolated: 'و', initial: 'و',   medial: 'ـو',  final: 'ـو',  tips: 'Petit cercle avec queue vers le bas.' },
  { letter: 'ي', name: 'Ya',    sound: 'y',  isolated: 'ي', initial: 'يـ',  medial: 'ـيـ', final: 'ـي',  tips: 'Courbe avec deux points en dessous.' },
];

interface Point { x: number; y: number; }
interface Stroke { points: Point[]; color: string; width: number; }

interface AIWritingFeedback {
  score: number;
  feedback: string;
  encouragement: string;
  tips: string[];
  next_exercise: string;
  next_letter?: string;
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

export default function WritingScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [strokes, setStrokes] = useState<Stroke[]>([]);
  const [currentStroke, setCurrentStroke] = useState<Point[]>([]);
  const [showGuide, setShowGuide] = useState(true);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [feedback, setFeedback] = useState<AIWritingFeedback | null>(null);
  const [mode, setMode] = useState<ScreenMode>('learn');
  const [isLoadingExercise, setIsLoadingExercise] = useState(false);
  const [aiExercise, setAiExercise] = useState<AIGeneratedExercise | null>(null);
  const [brushColor] = useState(colors.primary);
  const [brushWidth] = useState(4);

  const { addXP, updateProgress, progress, canUseAI, incrementCredits, creditsRemaining } = useUserProgress();
  const { addError, addSession, getErrorsForAIPrompt, getAdaptiveExerciseSuggestion } = useErrorTracker();

  const letter = LETTERS[currentIndex];

  const speakArabic = (text: string) => {
    Speech.speak(text, { language: 'ar-SA', rate: 0.7 });
  };

  const handleNext = () => {
    setCurrentIndex(i => (i + 1) % LETTERS.length);
    clearCanvas();
    setFeedback(null);
  };

  const handlePrev = () => {
    setCurrentIndex(i => (i - 1 + LETTERS.length) % LETTERS.length);
    clearCanvas();
    setFeedback(null);
  };

  const clearCanvas = () => {
    setStrokes([]);
    setCurrentStroke([]);
    setFeedback(null);
  };

  // ── PanResponder for smooth drawing ────────────────────────────────────
  const isDrawing = useRef(false);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: evt => {
        const { locationX, locationY } = evt.nativeEvent;
        isDrawing.current = true;
        setCurrentStroke([{ x: locationX, y: locationY }]);
      },
      onPanResponderMove: evt => {
        if (!isDrawing.current) return;
        const { locationX, locationY } = evt.nativeEvent;
        setCurrentStroke(prev => [...prev, { x: locationX, y: locationY }]);
      },
      onPanResponderRelease: () => {
        isDrawing.current = false;
        setCurrentStroke(prev => {
          if (prev.length > 0) {
            setStrokes(s => [
              ...s,
              { points: prev, color: brushColor, width: brushWidth },
            ]);
          }
          return [];
        });
      },
      onPanResponderTerminate: () => {
        isDrawing.current = false;
        setCurrentStroke(prev => {
          if (prev.length > 0) {
            setStrokes(s => [
              ...s,
              { points: prev, color: brushColor, width: brushWidth },
            ]);
          }
          return [];
        });
      },
    }),
  ).current;

  // ── Render strokes as SVG-like lines using Views ───────────────────────
  const renderStrokeLines = useCallback(
    (strokeList: Stroke[], currentPts: Point[]) => {
      const allStrokes = [
        ...strokeList,
        currentPts.length > 1
          ? { points: currentPts, color: brushColor, width: brushWidth }
          : null,
      ].filter(Boolean) as Stroke[];

      return allStrokes.flatMap((stroke, si) =>
        stroke.points.slice(1).map((pt, pi) => {
          const prev = stroke.points[pi];
          const dx = pt.x - prev.x;
          const dy = pt.y - prev.y;
          const len = Math.sqrt(dx * dx + dy * dy);
          if (len < 0.5) return null;
          const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
          return (
            <View
              key={`${si}-${pi}`}
              style={{
                position: 'absolute',
                left: prev.x - stroke.width / 2,
                top: prev.y - stroke.width / 2,
                width: len + stroke.width,
                height: stroke.width,
                backgroundColor: stroke.color,
                borderRadius: stroke.width / 2,
                transform: [{ rotate: `${angle}deg` }],
                // @ts-ignore
                transformOrigin: `${stroke.width / 2}px ${stroke.width / 2}px`,
              }}
            />
          );
        }),
      );
    },
    [brushColor, brushWidth],
  );

  // ── Analyze writing with Gemini ────────────────────────────────────────
  const analyzeWriting = async () => {
    if (strokes.length === 0) {
      Alert.alert('Fatima', 'Dessine la lettre avant de demander une analyse !');
      return;
    }
    if (!canUseAI()) {
      Alert.alert('Crédits IA', 'Tu as utilisé tous tes crédits IA, Fatima.');
      return;
    }

    setIsAnalyzing(true);
    try {
      const ok = await incrementCredits();
      if (!ok) return;

      const strokeDesc = strokes
        .map((stroke, i) => {
          const start = stroke.points[0];
          const end = stroke.points[stroke.points.length - 1];
          if (!start || !end) return `Trait ${i + 1}: (vide)`;
          const dx = end.x - start.x;
          const dy = end.y - start.y;
          const dirH = dx < -5 ? 'droite→gauche' : dx > 5 ? 'gauche→droite' : 'horizontal';
          const dirV = dy > 5 ? 'haut→bas' : dy < -5 ? 'bas→haut' : 'vertical';
          return `Trait ${i + 1}: direction ${dirH}/${dirV}, longueur ~${Math.round(Math.sqrt(dx*dx+dy*dy))}px, ${stroke.points.length} points de pression`;
        })
        .join('\n');

      const errorsContext = getErrorsForAIPrompt();
      const targetLetter = mode === 'ai_exercise' && aiExercise
        ? aiExercise.target_letter
        : letter.letter;
      const targetName = mode === 'ai_exercise' && aiExercise
        ? aiExercise.target_letter_name
        : letter.name;

      const res = await invokeAI<AIWritingFeedback>(
        `Tu es un professeur d'arabe expert qui enseigne à Fatima (débutante).
Elle essaie d'écrire la lettre arabe "${targetLetter}" (${targetName}).

Canvas: ${CANVAS_SIZE}x${CANVAS_SIZE}px. Rappel: l'arabe s'écrit de DROITE à GAUCHE.
Nombre de traits: ${strokes.length}

Description des traits:
${strokeDesc}

${errorsContext}

Analyse son écriture. Sois bienveillant et encourageant. Adresse-toi à "Fatima".
Donne: score /10, feedback constructif, encouragement, 2-3 conseils pratiques, prochain exercice recommandé.

JSON: { "score": 7, "feedback": "...", "encouragement": "...", "tips": ["...", "..."], "next_exercise": "..." }`,
      );

      setFeedback(res);

      // Track errors for low scores
      if (res.score < 6) {
        await addError({
          type: 'writing',
          category: 'lettres arabes',
          description: `Difficulté avec la lettre ${targetLetter} (${targetName})`,
          correct_form: targetLetter,
          user_attempt: `${strokes.length} traits, score ${res.score}/10`,
          source: 'writing',
        });
      }

      await addSession({
        type: 'writing',
        topic: `Lettre ${targetName}`,
        duration_minutes: 1,
        score: res.score,
        errors_count: res.score < 6 ? 1 : 0,
        xp_earned: res.score >= 7 ? 5 : 3,
      });

      await addXP(res.score >= 7 ? 5 : 3);
      await updateProgress({
        writing_exercises_count: (progress?.writing_exercises_count || 0) + 1,
      });
    } catch (err: any) {
      console.error('Erreur analyse écriture:', err);
      Alert.alert('Erreur IA', err?.message || "Impossible d'analyser. Vérifie ta clé API dans Profil → Paramètres API.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  // ── Generate AI adaptive exercise ─────────────────────────────────────
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
        `Tu es un professeur d'arabe expert. Génère un exercice d'écriture ADAPTÉ aux difficultés de Fatima.

${errorsCtx}

${suggestion ? `Suggestion d'exercice: ${suggestion.description}` : 'Propose un exercice pour débutant.'}

Choisis UNE lettre arabe à travailler parmi les 28 (basé sur les erreurs de Fatima).
Génère un exercice détaillé avec conseils spécifiques.

JSON: {
  "title": "Exercice adapté: ...",
  "instruction": "Instruction claire pour Fatima...",
  "target_letter": "ب",
  "target_letter_name": "Ba",
  "tips": ["conseil 1", "conseil 2", "conseil 3"],
  "variations": ["forme isolée: ب", "début: بـ", "milieu: ـبـ", "fin: ـب"]
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
          {/* Header */}
          <View style={styles.header}>
            <View style={{ flex: 1 }}>
              <Text style={styles.headerTitle}>✍️ Écriture arabe</Text>
              <Text style={styles.headerSubtitle}>
                Lettre {currentIndex + 1}/{LETTERS.length}
              </Text>
            </View>
            <View style={styles.creditsTag}>
              <Ionicons name="flash" size={14} color={colors.primary} />
              <Text style={styles.creditsText}>{creditsRemaining()}</Text>
            </View>
          </View>

          {/* Progress bar */}
          <View style={styles.progressBarBg}>
            <View
              style={[
                styles.progressBarFill,
                { width: `${((currentIndex + 1) / LETTERS.length) * 100}%` },
              ]}
            />
          </View>

          {/* Letter display */}
          <Card style={styles.letterCard}>
            <TouchableOpacity
              onPress={() => speakArabic(letter.letter)}
              style={styles.letterContainer}
              activeOpacity={0.7}
            >
              <Text style={styles.letterText}>{letter.letter}</Text>
              <View style={styles.speakHint}>
                <Ionicons name="volume-high" size={16} color={colors.primary} />
                <Text style={styles.speakHintText}>Toucher pour écouter</Text>
              </View>
            </TouchableOpacity>
            <Text style={styles.letterName}>{letter.name}</Text>
            <Text style={styles.letterSound}>Son : /{letter.sound}/</Text>
          </Card>

          {/* Forms grid */}
          <Card style={styles.formsCard}>
            <Text style={styles.formsTitle}>📐 Formes selon la position</Text>
            <View style={styles.formsGrid}>
              {[
                { label: 'Isolée', form: letter.isolated },
                { label: 'Début',  form: letter.initial  },
                { label: 'Milieu', form: letter.medial   },
                { label: 'Fin',    form: letter.final    },
              ].map(f => (
                <View key={f.label} style={styles.formItem}>
                  <Text style={styles.formLetter}>{f.form}</Text>
                  <Text style={styles.formLabel}>{f.label}</Text>
                </View>
              ))}
            </View>
          </Card>

          {/* Writing tips */}
          <Card style={styles.tipsCard}>
            <Text style={styles.tipsTitle}>💡 Conseil d'écriture</Text>
            <Text style={styles.tipsBody}>{letter.tips}</Text>
            <Text style={styles.rtlNote}>⬅️ L'arabe s'écrit de droite à gauche</Text>
          </Card>

          {/* Action buttons */}
          <TouchableOpacity
            style={styles.primaryBtn}
            onPress={() => { clearCanvas(); setFeedback(null); setMode('practice'); }}
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
            {isLoadingExercise ? (
              <LoadingSpinner size="sm" color={colors.primary} />
            ) : (
              <Ionicons name="sparkles" size={18} color={colors.primary} />
            )}
            <Text style={styles.secondaryBtnText}>
              {isLoadingExercise ? 'Génération...' : 'Exercice IA adaptatif'}
            </Text>
          </TouchableOpacity>

          {/* Navigation */}
          <View style={styles.navRow}>
            <TouchableOpacity
              style={styles.navBtn}
              onPress={handlePrev}
              activeOpacity={0.8}
            >
              <Ionicons name="arrow-back" size={18} color={colors.text} />
              <Text style={styles.navBtnText}>Précédent</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.navBtn, styles.navBtnPrimary]}
              onPress={handleNext}
              activeOpacity={0.8}
            >
              <Text style={[styles.navBtnText, { color: colors.white }]}>Suivant</Text>
              <Ionicons name="arrow-forward" size={18} color={colors.white} />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // ── PRACTICE / AI_EXERCISE MODE ───────────────────────────────────────
  const activeLetter = mode === 'ai_exercise' && aiExercise
    ? { letter: aiExercise.target_letter, name: aiExercise.target_letter_name, sound: '' }
    : letter;

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.practiceScrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => { setMode('learn'); clearCanvas(); setFeedback(null); }}
            style={styles.backBtn}
            activeOpacity={0.7}
          >
            <Ionicons name="arrow-back" size={22} color={colors.text} />
          </TouchableOpacity>
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={styles.headerTitle}>
              {mode === 'ai_exercise' ? '🎯 Exercice IA' : `✍️ Pratique : ${activeLetter.letter}`}
            </Text>
            <Text style={styles.headerSubtitle}>
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

        {/* AI exercise instructions */}
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

        {/* Reference letter */}
        <Card style={styles.referenceCard}>
          <TouchableOpacity
            onPress={() => speakArabic(activeLetter.letter)}
            style={styles.refLetterBtn}
            activeOpacity={0.7}
          >
            <Text style={styles.refLetter}>{activeLetter.letter}</Text>
            <Ionicons name="volume-high" size={14} color={colors.primary} style={{ marginTop: 4 }} />
          </TouchableOpacity>
          <View style={{ flex: 1, marginLeft: 16 }}>
            <Text style={styles.refName}>{activeLetter.name}</Text>
            <Text style={styles.refHint}>
              {mode === 'ai_exercise'
                ? 'Suis les conseils et dessine ci-dessous'
                : 'Observe puis dessine ci-dessous'}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => setShowGuide(!showGuide)}
            style={[styles.guideToggle, showGuide && styles.guideToggleActive]}
          >
            <Ionicons
              name={showGuide ? 'eye' : 'eye-off'}
              size={18}
              color={showGuide ? colors.primary : colors.textMuted}
            />
          </TouchableOpacity>
        </Card>

        {/* ── DRAWING CANVAS ── */}
        <View style={styles.canvasWrapper}>
          <View
            style={[styles.canvas, { width: CANVAS_SIZE, height: CANVAS_SIZE }]}
            {...panResponder.panHandlers}
          >
            {/* Guide letter watermark */}
            {showGuide && (
              <Text style={styles.guideLetterText}>{activeLetter.letter}</Text>
            )}
            {/* Drawn strokes */}
            {renderStrokeLines(strokes, currentStroke)}
          </View>

          {/* Canvas action row */}
          <View style={styles.canvasActions}>
            <TouchableOpacity style={styles.canvasActionBtn} onPress={clearCanvas}>
              <Ionicons name="trash-outline" size={18} color={colors.destructive} />
              <Text style={[styles.canvasActionText, { color: colors.destructive }]}>Effacer</Text>
            </TouchableOpacity>
            <Text style={styles.canvasHint}>✏️ Dessine avec ton doigt</Text>
            <TouchableOpacity
              style={styles.canvasActionBtn}
              onPress={() => setShowGuide(g => !g)}
            >
              <Ionicons
                name={showGuide ? 'eye-off-outline' : 'eye-outline'}
                size={18}
                color={colors.primary}
              />
              <Text style={styles.canvasActionText}>
                {showGuide ? 'Masquer' : 'Guide'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Analyze button */}
        <TouchableOpacity
          style={[
            styles.analyzeBtn,
            (strokes.length === 0 || isAnalyzing) && styles.analyzeBtnDisabled,
          ]}
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

        {/* AI Feedback */}
        {feedback && (
          <Card style={styles.feedbackCard}>
            <View style={styles.scoreRow}>
              <View
                style={[
                  styles.scoreBadge,
                  { backgroundColor: feedback.score >= 7 ? colors.success : feedback.score >= 5 ? colors.secondary : colors.destructive },
                ]}
              >
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

            {/* Actions after feedback */}
            <View style={styles.postFeedbackActions}>
              <TouchableOpacity style={styles.postActionBtn} onPress={clearCanvas}>
                <Ionicons name="refresh" size={16} color={colors.primary} />
                <Text style={styles.postActionText}>Réessayer</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.postActionBtn, styles.postActionPrimary]}
                onPress={() => { handleNext(); setMode('practice'); }}
              >
                <Text style={[styles.postActionText, { color: colors.white }]}>Lettre suivante</Text>
                <Ionicons name="arrow-forward" size={16} color={colors.white} />
              </TouchableOpacity>
            </View>
          </Card>
        )}

        {/* Navigation buttons at bottom — always visible */}
        <View style={styles.bottomNavRow}>
          <TouchableOpacity style={styles.navBtn} onPress={handlePrev} activeOpacity={0.8}>
            <Ionicons name="arrow-back" size={16} color={colors.text} />
            <Text style={styles.navBtnText}>Précédent</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navBtn}
            onPress={() => { clearCanvas(); setFeedback(null); setMode('learn'); }}
            activeOpacity={0.8}
          >
            <Ionicons name="book-outline" size={16} color={colors.text} />
            <Text style={styles.navBtnText}>Fiche</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.navBtn, styles.navBtnPrimary]}
            onPress={handleNext}
            activeOpacity={0.8}
          >
            <Text style={[styles.navBtnText, { color: colors.white }]}>Suivant</Text>
            <Ionicons name="arrow-forward" size={16} color={colors.white} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// ── STYLES ──────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  learnScrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 120, // extra padding for tab bar
  },
  practiceScrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 120,
    alignItems: 'center',
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    width: '100%',
  },
  headerTitle: {
    fontSize: fontSize.lg,
    fontWeight: '700',
    color: colors.text,
  },
  headerSubtitle: {
    fontSize: fontSize.xs,
    color: colors.textMuted,
    marginTop: 2,
  },
  backBtn: {
    padding: 8,
    borderRadius: borderRadius.md,
    backgroundColor: `${colors.textMuted}15`,
  },
  creditsTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: `${colors.primary}12`,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: borderRadius.full,
    gap: 4,
  },
  creditsText: {
    fontSize: fontSize.xs,
    fontWeight: '700',
    color: colors.primary,
  },

  // Progress bar
  progressBarBg: {
    height: 4,
    backgroundColor: `${colors.textMuted}20`,
    borderRadius: 2,
    marginBottom: 16,
    overflow: 'hidden',
    width: '100%',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 2,
  },

  // Letter card
  letterCard: {
    alignItems: 'center',
    marginBottom: 12,
    paddingVertical: 24,
    width: '100%',
  },
  letterContainer: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  letterText: {
    fontSize: 88,
    fontWeight: '700',
    color: colors.text,
    lineHeight: 100,
  },
  speakHint: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  speakHintText: {
    fontSize: fontSize.xs,
    color: colors.textMuted,
  },
  letterName: {
    fontSize: fontSize.xl,
    fontWeight: '700',
    color: colors.primary,
    marginTop: 4,
  },
  letterSound: {
    fontSize: fontSize.sm,
    color: colors.textMuted,
    marginTop: 2,
  },

  // Forms grid
  formsCard: { marginBottom: 12, width: '100%' },
  formsTitle: {
    fontSize: fontSize.sm,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 12,
  },
  formsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  formItem: {
    alignItems: 'center',
    flex: 1,
    padding: 8,
    backgroundColor: `${colors.primary}08`,
    borderRadius: borderRadius.md,
    marginHorizontal: 3,
  },
  formLetter: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text,
  },
  formLabel: {
    fontSize: 9,
    color: colors.textMuted,
    marginTop: 4,
    fontWeight: '600',
  },

  // Tips
  tipsCard: { marginBottom: 16, width: '100%', backgroundColor: `${colors.accent}10` },
  tipsTitle: { fontSize: fontSize.sm, fontWeight: '700', color: colors.text, marginBottom: 6 },
  tipsBody: { fontSize: fontSize.sm, color: colors.text, lineHeight: 20 },
  rtlNote: { fontSize: fontSize.xs, color: colors.primary, marginTop: 8, fontStyle: 'italic' },

  // Buttons
  primaryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    borderRadius: borderRadius['2xl'],
    paddingVertical: 14,
    gap: 8,
    marginBottom: 10,
    width: '100%',
  },
  primaryBtnText: {
    color: colors.white,
    fontSize: fontSize.base,
    fontWeight: '700',
  },
  secondaryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: `${colors.primary}12`,
    borderRadius: borderRadius['2xl'],
    paddingVertical: 14,
    gap: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: `${colors.primary}25`,
    width: '100%',
  },
  secondaryBtnText: {
    color: colors.primary,
    fontSize: fontSize.base,
    fontWeight: '600',
  },

  // Nav row
  navRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
    width: '100%',
  },
  navBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.card,
    borderRadius: borderRadius.xl,
    paddingVertical: 12,
    gap: 6,
    borderWidth: 1,
    borderColor: colors.border,
  },
  navBtnPrimary: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  navBtnText: {
    fontSize: fontSize.sm,
    fontWeight: '600',
    color: colors.text,
  },

  // Practice mode
  exerciseCard: {
    marginBottom: 12,
    width: '100%',
    backgroundColor: `${colors.secondary}08`,
    borderColor: `${colors.secondary}30`,
  },
  exerciseInstruction: {
    fontSize: fontSize.sm,
    color: colors.text,
    lineHeight: 20,
    marginBottom: 10,
    fontStyle: 'italic',
  },
  variationsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 10,
  },
  variationChip: {
    backgroundColor: `${colors.primary}12`,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: borderRadius.full,
  },
  variationText: {
    fontSize: fontSize.sm,
    color: colors.primary,
    fontWeight: '600',
  },
  exerciseTips: { gap: 4 },
  exerciseTip: { fontSize: fontSize.xs, color: colors.textMuted, lineHeight: 18 },

  referenceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    width: '100%',
  },
  refLetterBtn: {
    width: 64,
    height: 64,
    borderRadius: borderRadius.xl,
    backgroundColor: `${colors.primary}10`,
    justifyContent: 'center',
    alignItems: 'center',
  },
  refLetter: { fontSize: 38, fontWeight: '700', color: colors.text },
  refName: { fontSize: fontSize.base, fontWeight: '700', color: colors.text },
  refHint: { fontSize: fontSize.xs, color: colors.textMuted, marginTop: 2 },
  guideToggle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: `${colors.textMuted}10`,
    justifyContent: 'center',
    alignItems: 'center',
  },
  guideToggleActive: {
    backgroundColor: `${colors.primary}15`,
  },

  // Canvas
  canvasWrapper: { alignItems: 'center', marginBottom: 14, width: '100%' },
  canvas: {
    backgroundColor: '#f9fafb',
    borderRadius: borderRadius.xl,
    borderWidth: 2,
    borderColor: colors.border,
    borderStyle: 'dashed',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  guideLetterText: {
    position: 'absolute',
    fontSize: CANVAS_SIZE * 0.65,
    fontWeight: '200',
    color: `${colors.textMuted}18`,
    textAlign: 'center',
  },
  canvasActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: CANVAS_SIZE,
    marginTop: 10,
    paddingHorizontal: 4,
  },
  canvasActionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: borderRadius.full,
    backgroundColor: `${colors.textMuted}10`,
  },
  canvasActionText: {
    fontSize: fontSize.xs,
    fontWeight: '600',
    color: colors.primary,
  },
  canvasHint: {
    fontSize: fontSize.xs,
    color: colors.textMuted,
    fontStyle: 'italic',
  },

  // Analyze button
  analyzeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.accent,
    borderRadius: borderRadius['2xl'],
    paddingVertical: 14,
    gap: 8,
    marginBottom: 14,
    width: '100%',
  },
  analyzeBtnDisabled: {
    opacity: 0.45,
  },
  analyzeBtnText: {
    color: colors.white,
    fontSize: fontSize.base,
    fontWeight: '700',
  },

  // Feedback
  feedbackCard: {
    marginBottom: 14,
    width: '100%',
    backgroundColor: `${colors.primary}06`,
  },
  scoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  scoreBadge: {
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scoreText: {
    color: colors.white,
    fontWeight: '800',
    fontSize: fontSize.sm,
  },
  feedbackTitle: {
    fontSize: fontSize.lg,
    fontWeight: '700',
    color: colors.text,
    flex: 1,
  },
  feedbackBody: {
    fontSize: fontSize.sm,
    color: colors.text,
    lineHeight: 22,
    marginBottom: 12,
  },
  encouragementBubble: {
    backgroundColor: `${colors.accent}12`,
    borderRadius: borderRadius.lg,
    padding: 12,
    marginBottom: 12,
  },
  encouragementFeedback: {
    fontSize: fontSize.sm,
    color: colors.text,
    fontStyle: 'italic',
    lineHeight: 20,
  },
  tipsSection: { marginBottom: 12 },
  tipsSectionTitle: {
    fontSize: fontSize.sm,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 6,
  },
  tipText: {
    fontSize: fontSize.xs,
    color: colors.textMuted,
    lineHeight: 20,
    marginBottom: 2,
  },
  nextExerciseBubble: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    backgroundColor: `${colors.accent}10`,
    borderRadius: borderRadius.lg,
    padding: 10,
    marginBottom: 12,
  },
  nextExerciseText: {
    fontSize: fontSize.xs,
    color: colors.text,
    flex: 1,
    lineHeight: 18,
  },
  postFeedbackActions: {
    flexDirection: 'row',
    gap: 10,
  },
  postActionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 11,
    borderRadius: borderRadius.xl,
    backgroundColor: `${colors.primary}10`,
    borderWidth: 1,
    borderColor: `${colors.primary}20`,
  },
  postActionPrimary: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  postActionText: {
    fontSize: fontSize.sm,
    fontWeight: '600',
    color: colors.primary,
  },

  // Bottom nav
  bottomNavRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
    width: '100%',
  },
});