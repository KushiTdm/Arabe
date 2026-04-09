import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  PanResponder,
  Dimensions,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Speech from 'expo-speech';
import { useUserProgress } from '../lib/useUserProgress';
import { useErrorTracker } from '../lib/useErrorTracker';
import { Card, Badge, Button } from '../components/RNComponents';
import { colors, spacing, borderRadius, fontSize } from '../theme';
import { invokeAI } from '../api/aiClient';

const SCREEN_WIDTH = Dimensions.get('window').width;
const CANVAS_SIZE = Math.min(SCREEN_WIDTH - 80, 300);

const LETTERS = [
  { letter: 'ا', name: 'Alif',  sound: 'a',  isolated: 'ا', initial: 'ا',   medial: 'ـا',  final: 'ـا'  },
  { letter: 'ب', name: 'Ba',    sound: 'b',  isolated: 'ب', initial: 'بـ',  medial: 'ـبـ', final: 'ـب'  },
  { letter: 'ت', name: 'Ta',    sound: 't',  isolated: 'ت', initial: 'تـ',  medial: 'ـتـ', final: 'ـت'  },
  { letter: 'ث', name: 'Tha',   sound: 'th', isolated: 'ث', initial: 'ثـ',  medial: 'ـثـ', final: 'ـث'  },
  { letter: 'ج', name: 'Jim',   sound: 'j',  isolated: 'ج', initial: 'جـ',  medial: 'ـجـ', final: 'ـج'  },
  { letter: 'ح', name: 'Ha',    sound: 'ḥ',  isolated: 'ح', initial: 'حـ',  medial: 'ـحـ', final: 'ـح'  },
  { letter: 'خ', name: 'Kha',   sound: 'kh', isolated: 'خ', initial: 'خـ',  medial: 'ـخـ', final: 'ـخ'  },
  { letter: 'د', name: 'Dal',   sound: 'd',  isolated: 'د', initial: 'د',   medial: 'ـد',  final: 'ـد'  },
  { letter: 'ذ', name: 'Dhal',  sound: 'dh', isolated: 'ذ', initial: 'ذ',   medial: 'ـذ',  final: 'ـذ'  },
  { letter: 'ر', name: 'Ra',    sound: 'r',  isolated: 'ر', initial: 'ر',   medial: 'ـر',  final: 'ـر'  },
  { letter: 'ز', name: 'Zay',   sound: 'z',  isolated: 'ز', initial: 'ز',   medial: 'ـز',  final: 'ـز'  },
  { letter: 'س', name: 'Sin',   sound: 's',  isolated: 'س', initial: 'سـ',  medial: 'ـسـ', final: 'ـس'  },
  { letter: 'ش', name: 'Shin',  sound: 'sh', isolated: 'ش', initial: 'شـ',  medial: 'ـشـ', final: 'ـش'  },
  { letter: 'ص', name: 'Sad',   sound: 'ṣ',  isolated: 'ص', initial: 'صـ',  medial: 'ـصـ', final: 'ـص'  },
  { letter: 'ض', name: 'Dad',   sound: 'ḍ',  isolated: 'ض', initial: 'ضـ',  medial: 'ـضـ', final: 'ـض'  },
  { letter: 'ط', name: 'Tah',   sound: 'ṭ',  isolated: 'ط', initial: 'طـ',  medial: 'ـطـ', final: 'ـط'  },
  { letter: 'ظ', name: 'Dhah',  sound: 'ẓ',  isolated: 'ظ', initial: 'ظـ',  medial: 'ـظـ', final: 'ـظ'  },
  { letter: 'ع', name: 'Ayn',   sound: "'",  isolated: 'ع', initial: 'عـ',  medial: 'ـعـ', final: 'ـع'  },
  { letter: 'غ', name: 'Ghayn', sound: 'gh', isolated: 'غ', initial: 'غـ',  medial: 'ـغـ', final: 'ـغ'  },
  { letter: 'ف', name: 'Fa',    sound: 'f',  isolated: 'ف', initial: 'فـ',  medial: 'ـفـ', final: 'ـف'  },
  { letter: 'ق', name: 'Qaf',   sound: 'q',  isolated: 'ق', initial: 'قـ',  medial: 'ـقـ', final: 'ـق'  },
  { letter: 'ك', name: 'Kaf',   sound: 'k',  isolated: 'ك', initial: 'كـ',  medial: 'ـكـ', final: 'ـك'  },
  { letter: 'ل', name: 'Lam',   sound: 'l',  isolated: 'ل', initial: 'لـ',  medial: 'ـلـ', final: 'ـل'  },
  { letter: 'م', name: 'Mim',   sound: 'm',  isolated: 'م', initial: 'مـ',  medial: 'ـمـ', final: 'ـم'  },
  { letter: 'ن', name: 'Nun',   sound: 'n',  isolated: 'ن', initial: 'نـ',  medial: 'ـنـ', final: 'ـن'  },
  { letter: 'ه', name: 'Ha',    sound: 'h',  isolated: 'ه', initial: 'هـ',  medial: 'ـهـ', final: 'ـه'  },
  { letter: 'و', name: 'Waw',   sound: 'w',  isolated: 'و', initial: 'و',   medial: 'ـو',  final: 'ـو'  },
  { letter: 'ي', name: 'Ya',    sound: 'y',  isolated: 'ي', initial: 'يـ',  medial: 'ـيـ', final: 'ـي'  },
];

interface Point {
  x: number;
  y: number;
}

interface AIWritingFeedback {
  score: number;
  feedback: string;
  encouragement: string;
  tips: string[];
  next_exercise: string;
}

export default function WritingScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [strokes, setStrokes] = useState<Point[][]>([]);
  const [currentStroke, setCurrentStroke] = useState<Point[]>([]);
  const [showGuide, setShowGuide] = useState(true);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [feedback, setFeedback] = useState<AIWritingFeedback | null>(null);
  const [mode, setMode] = useState<'learn' | 'practice'>('learn');

  const { addXP, updateProgress, progress, canUseAI, incrementCredits, creditsRemaining } = useUserProgress();
  const { addError, getErrorsForAIPrompt } = useErrorTracker();

  const letter = LETTERS[currentIndex];

  const speakArabic = (text: string) => {
    Speech.speak(text, { language: 'ar-SA', rate: 0.85 });
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

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt) => {
        const { locationX, locationY } = evt.nativeEvent;
        setCurrentStroke([{ x: locationX, y: locationY }]);
      },
      onPanResponderMove: (evt) => {
        const { locationX, locationY } = evt.nativeEvent;
        setCurrentStroke(prev => [...prev, { x: locationX, y: locationY }]);
      },
      onPanResponderRelease: () => {
        setStrokes(prev => [...prev, currentStroke]);
        setCurrentStroke([]);
      },
    })
  ).current;

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

      const strokeDesc = strokes.map((stroke, i) => {
        const start = stroke[0];
        const end = stroke[stroke.length - 1];
        const direction = end.x < start.x ? 'droite-à-gauche' : 'gauche-à-droite';
        const vertDir = end.y > start.y ? 'haut-en-bas' : 'bas-en-haut';
        return `Trait ${i + 1}: ${direction}, ${vertDir}, ${stroke.length} points, début(${Math.round(start.x)},${Math.round(start.y)}) fin(${Math.round(end.x)},${Math.round(end.y)})`;
      }).join('\n');

      const errorsContext = getErrorsForAIPrompt();

      const res = await invokeAI<AIWritingFeedback>(
        `Tu es un professeur d'arabe bienveillant qui enseigne à Fatima.
Elle essaie d'écrire la lettre "${letter.letter}" (${letter.name}, son: ${letter.sound}).

Voici la description de ses traits de dessin sur un canvas de ${CANVAS_SIZE}x${CANVAS_SIZE} pixels:
${strokeDesc}

${errorsContext}

Analyse son écriture et donne un retour encourageant. Souviens-toi que les lettres arabes s'écrivent de droite à gauche.
Donne un score de 1 à 10, un feedback constructif, et des conseils pour s'améliorer.
Adresse-toi à Fatima directement de manière chaleureuse et encourageante.

JSON: { "score": 8, "feedback": "...", "encouragement": "...", "tips": ["...", "..."], "next_exercise": "..." }`
      );

      setFeedback(res);

      if (res.score < 6) {
        await addError({
          type: 'writing',
          category: 'lettres',
          description: `Difficulté avec la lettre ${letter.letter} (${letter.name})`,
          correct_form: letter.letter,
          user_attempt: `score: ${res.score}/10`,
        });
      }

      await addXP(res.score >= 7 ? 5 : 3);
      await updateProgress({
        writing_exercises_count: (progress?.writing_exercises_count || 0) + 1,
      });
    } catch (err) {
      console.error('Erreur analyse écriture:', err);
      Alert.alert('Erreur', "Impossible d'analyser l'écriture. Vérifie ta connexion.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const renderStrokes = () => {
    const allPoints = [...strokes, currentStroke.length > 0 ? currentStroke : []].filter(s => s.length > 0);
    return allPoints.map((stroke, strokeIdx) =>
      stroke.map((point, pointIdx) => {
        if (pointIdx === 0) return null;
        const prev = stroke[pointIdx - 1];
        const dx = point.x - prev.x;
        const dy = point.y - prev.y;
        const length = Math.sqrt(dx * dx + dy * dy);
        const angle = Math.atan2(dy, dx) * (180 / Math.PI);
        return (
          <View
            key={`${strokeIdx}-${pointIdx}`}
            style={{
              position: 'absolute',
              left: prev.x,
              top: prev.y,
              width: Math.max(length, 1),
              height: 3,
              backgroundColor: colors.primary,
              borderRadius: 1.5,
              transform: [{ rotate: `${angle}deg` }],
              transformOrigin: 'left center',
            }}
          />
        );
      })
    );
  };

  // ── Mode Apprentissage ──────────────────────────────────────────────────
  if (mode === 'learn') {
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <View style={{ flex: 1 }}>
            <Text style={styles.headerTitle}>Bravo Fatima !</Text>
            <Text style={styles.headerSubtitle}>Apprends à écrire les lettres arabes</Text>
          </View>
          <Badge color="primary">{currentIndex + 1}/{LETTERS.length}</Badge>
        </View>

        {/* Letter display */}
        <Card style={styles.letterCard}>
          <TouchableOpacity onPress={() => speakArabic(letter.letter)} style={styles.letterContainer}>
            <Text style={styles.letterText}>{letter.letter}</Text>
          </TouchableOpacity>
          <Text style={styles.letterName}>{letter.name}</Text>
          <Text style={styles.letterSound}>Son : {letter.sound}</Text>

          <TouchableOpacity onPress={() => speakArabic(letter.letter)} style={styles.playButton}>
            <Ionicons name="volume-high" size={22} color={colors.primary} />
            <Text style={styles.playText}>Écouter</Text>
          </TouchableOpacity>
        </Card>

        {/* Letter forms */}
        <Card style={styles.formsCard}>
          <Text style={styles.formsTitle}>Formes de la lettre</Text>
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

        {/* Practice button */}
        <Button
          onPress={() => setMode('practice')}
          style={{ marginBottom: spacing.md }}
          fullWidth
        >
          Pratiquer l'écriture tactile
        </Button>

        {/* Navigation */}
        <View style={styles.navigation}>
          <Button variant="outline" onPress={handlePrev} style={{ flex: 1, marginRight: 8 }}>
            Précédent
          </Button>
          <Button onPress={handleNext} style={{ flex: 1, marginLeft: 8 }}>
            Suivant
          </Button>
        </View>

        {/* Encouragement */}
        <Card style={styles.encouragementCard}>
          <Text style={styles.encouragementText}>
            Tu fais un excellent travail Fatima ! Chaque lettre maîtrisée te rapproche de ton objectif.
            Continue comme ça !
          </Text>
        </Card>
      </ScrollView>
    );
  }

  // ── Mode Pratique (Canvas) ──────────────────────────────────────────────
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => { setMode('learn'); clearCanvas(); setFeedback(null); }} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color={colors.text} />
        </TouchableOpacity>
        <View style={{ flex: 1, marginLeft: 12 }}>
          <Text style={styles.headerTitle}>Pratique : {letter.letter} ({letter.name})</Text>
          <Text style={styles.headerSubtitle}>Dessine la lettre avec ton doigt, Fatima !</Text>
        </View>
        <Badge color="primary">{creditsRemaining()}</Badge>
      </View>

      {/* Target letter reference */}
      <View style={styles.referenceRow}>
        <TouchableOpacity onPress={() => speakArabic(letter.letter)} style={styles.refLetterBtn}>
          <Text style={styles.refLetter}>{letter.letter}</Text>
        </TouchableOpacity>
        <View style={{ flex: 1, marginLeft: 16 }}>
          <Text style={styles.refName}>{letter.name} - Son : {letter.sound}</Text>
          <Text style={styles.refHint}>Observe bien la lettre puis dessine-la ci-dessous</Text>
        </View>
        <TouchableOpacity
          onPress={() => setShowGuide(!showGuide)}
          style={[styles.guideToggle, showGuide && { backgroundColor: `${colors.primary}30` }]}
        >
          <Ionicons name={showGuide ? 'eye' : 'eye-off'} size={18} color={colors.primary} />
        </TouchableOpacity>
      </View>

      {/* Drawing canvas */}
      <Card style={styles.canvasCard}>
        <View
          style={[styles.canvas, { width: CANVAS_SIZE, height: CANVAS_SIZE }]}
          {...panResponder.panHandlers}
        >
          {/* Guide letter in background */}
          {showGuide && (
            <Text style={styles.guideLetterText}>{letter.letter}</Text>
          )}
          {/* Rendered strokes */}
          {renderStrokes()}
        </View>

        {/* Canvas controls */}
        <View style={styles.canvasControls}>
          <TouchableOpacity onPress={clearCanvas} style={styles.canvasBtn}>
            <Ionicons name="trash-outline" size={20} color={colors.destructive} />
            <Text style={[styles.canvasBtnText, { color: colors.destructive }]}>Effacer</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setShowGuide(!showGuide)} style={styles.canvasBtn}>
            <Ionicons name={showGuide ? 'eye-off-outline' : 'eye-outline'} size={20} color={colors.primary} />
            <Text style={styles.canvasBtnText}>{showGuide ? 'Masquer guide' : 'Afficher guide'}</Text>
          </TouchableOpacity>
        </View>
      </Card>

      {/* Analyze button */}
      <Button
        onPress={analyzeWriting}
        loading={isAnalyzing}
        disabled={strokes.length === 0 || isAnalyzing}
        fullWidth
        style={{ marginBottom: spacing.md }}
      >
        {isAnalyzing ? 'Analyse en cours...' : "Analyser mon écriture"}
      </Button>

      {/* AI Feedback */}
      {feedback && (
        <Card style={styles.feedbackCard}>
          <View style={styles.scoreRow}>
            <View style={styles.scoreBadge}>
              <Text style={styles.scoreText}>{feedback.score}/10</Text>
            </View>
            <Text style={styles.feedbackTitle}>
              {feedback.score >= 8 ? 'Excellent Fatima !' : feedback.score >= 5 ? 'Bien joué Fatima !' : 'Continue Fatima !'}
            </Text>
          </View>

          <Text style={styles.feedbackBody}>{feedback.feedback}</Text>

          <View style={styles.encouragementBubble}>
            <Text style={styles.encouragementEmoji}>💪</Text>
            <Text style={styles.encouragementFeedback}>{feedback.encouragement}</Text>
          </View>

          {feedback.tips.length > 0 && (
            <View style={styles.tipsSection}>
              <Text style={styles.tipsTitle}>Conseils :</Text>
              {feedback.tips.map((tip, i) => (
                <Text key={i} style={styles.tipText}>• {tip}</Text>
              ))}
            </View>
          )}

          {feedback.next_exercise && (
            <View style={styles.nextExercise}>
              <Ionicons name="arrow-forward-circle" size={18} color={colors.accent} />
              <Text style={styles.nextExerciseText}>{feedback.next_exercise}</Text>
            </View>
          )}
        </Card>
      )}

      {/* Navigation */}
      <View style={styles.navigation}>
        <Button variant="outline" onPress={handlePrev} style={{ flex: 1, marginRight: 8 }}>
          Précédent
        </Button>
        <Button onPress={handleNext} style={{ flex: 1, marginLeft: 8 }}>
          Suivant
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:           { flex: 1, backgroundColor: colors.background },
  scrollContent:       { paddingHorizontal: 20, paddingBottom: 120 },
  header:              { flexDirection: 'row', alignItems: 'center', paddingTop: 56, paddingBottom: 16 },
  headerTitle:         { fontSize: fontSize.xl, fontWeight: '700', color: colors.text },
  headerSubtitle:      { fontSize: fontSize.xs, color: colors.textMuted },
  backBtn:             { padding: 8, borderRadius: borderRadius.lg, backgroundColor: `${colors.textMuted}15` },
  letterCard:          { alignItems: 'center', marginBottom: spacing.md },
  letterContainer:     { padding: 12 },
  letterText:          { fontSize: 80, fontWeight: '700', color: colors.text, textAlign: 'center' },
  letterName:          { fontSize: fontSize.xl, fontWeight: '600', color: colors.primary },
  letterSound:         { fontSize: fontSize.sm, color: colors.textMuted, marginTop: 4, marginBottom: 12 },
  playButton:          { flexDirection: 'row', alignItems: 'center', backgroundColor: `${colors.primary}15`, paddingHorizontal: 24, paddingVertical: 10, borderRadius: borderRadius.full, gap: 8 },
  playText:            { fontSize: fontSize.sm, fontWeight: '600', color: colors.primary },
  formsCard:           { marginBottom: spacing.md },
  formsTitle:          { fontSize: fontSize.sm, fontWeight: '700', color: colors.text, marginBottom: 12 },
  formsGrid:           { flexDirection: 'row', justifyContent: 'space-around' },
  formItem:            { alignItems: 'center', flex: 1 },
  formLetter:          { fontSize: 26, fontWeight: '700', color: colors.text },
  formLabel:           { fontSize: 9, color: colors.textMuted, marginTop: 4 },
  navigation:          { flexDirection: 'row', marginBottom: spacing.lg },
  encouragementCard:   { marginBottom: spacing['2xl'], backgroundColor: `${colors.accent}15`, borderColor: `${colors.accent}30` },
  encouragementText:   { fontSize: fontSize.sm, color: colors.text, lineHeight: 20, textAlign: 'center', fontStyle: 'italic' },

  // Practice mode
  referenceRow:        { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.md, backgroundColor: colors.card, borderRadius: borderRadius['2xl'], borderWidth: 1, borderColor: colors.border, padding: spacing.lg },
  refLetterBtn:        { width: 60, height: 60, borderRadius: borderRadius.xl, backgroundColor: `${colors.primary}10`, justifyContent: 'center', alignItems: 'center' },
  refLetter:           { fontSize: 36, fontWeight: '700', color: colors.text },
  refName:             { fontSize: fontSize.base, fontWeight: '600', color: colors.text },
  refHint:             { fontSize: fontSize.xs, color: colors.textMuted, marginTop: 2 },
  guideToggle:         { width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center', backgroundColor: `${colors.primary}10` },

  canvasCard:          { alignItems: 'center', marginBottom: spacing.md, paddingVertical: spacing.lg },
  canvas:              { backgroundColor: '#fefefe', borderRadius: borderRadius.xl, borderWidth: 2, borderColor: colors.border, borderStyle: 'dashed', overflow: 'hidden', justifyContent: 'center', alignItems: 'center' },
  guideLetterText:     { position: 'absolute', fontSize: 160, fontWeight: '200', color: `${colors.textMuted}20`, textAlign: 'center' },
  canvasControls:      { flexDirection: 'row', justifyContent: 'center', gap: 24, marginTop: spacing.md },
  canvasBtn:           { flexDirection: 'row', alignItems: 'center', gap: 6, paddingVertical: 8, paddingHorizontal: 16, borderRadius: borderRadius.full, backgroundColor: `${colors.textMuted}10` },
  canvasBtnText:       { fontSize: fontSize.xs, fontWeight: '600', color: colors.primary },

  feedbackCard:        { marginBottom: spacing.md, backgroundColor: `${colors.primary}08` },
  scoreRow:            { flexDirection: 'row', alignItems: 'center', marginBottom: 12, gap: 12 },
  scoreBadge:          { width: 50, height: 50, borderRadius: 25, backgroundColor: colors.primary, justifyContent: 'center', alignItems: 'center' },
  scoreText:           { color: colors.white, fontWeight: '700', fontSize: fontSize.sm },
  feedbackTitle:       { fontSize: fontSize.lg, fontWeight: '700', color: colors.text },
  feedbackBody:        { fontSize: fontSize.sm, color: colors.text, lineHeight: 22, marginBottom: 12 },
  encouragementBubble: { flexDirection: 'row', alignItems: 'center', backgroundColor: `${colors.accent}15`, borderRadius: borderRadius.lg, padding: 12, gap: 8, marginBottom: 12 },
  encouragementEmoji:  { fontSize: 20 },
  encouragementFeedback:{ fontSize: fontSize.xs, color: colors.text, flex: 1 },
  tipsSection:         { marginBottom: 12 },
  tipsTitle:           { fontSize: fontSize.sm, fontWeight: '600', color: colors.text, marginBottom: 6 },
  tipText:             { fontSize: fontSize.xs, color: colors.textMuted, marginBottom: 4, lineHeight: 18 },
  nextExercise:        { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: `${colors.accent}10`, borderRadius: borderRadius.lg, padding: 12 },
  nextExerciseText:    { fontSize: fontSize.xs, color: colors.text, flex: 1 },
});
