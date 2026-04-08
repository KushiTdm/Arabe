import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Speech from 'expo-speech';
import { useUserProgress } from '../lib/useUserProgress';
import { Card, Badge, LoadingSpinner, Button } from '../components/RNComponents';
import { colors, spacing, borderRadius, fontSize } from '../theme';
import { base44 } from '../api/base44Client';

const GEMINI_MODEL = 'gemini_2_flash';

const LETTERS = [
  { letter: 'ا', name: 'Alif', sound: 'a' },
  { letter: 'ب', name: 'Ba', sound: 'b' },
  { letter: 'ت', name: 'Ta', sound: 't' },
  { letter: 'ث', name: 'Tha', sound: 'th' },
  { letter: 'ج', name: 'Jim', sound: 'j' },
  { letter: 'ح', name: 'Ha', sound: 'h' },
  { letter: 'خ', name: 'Kha', sound: 'kh' },
  { letter: 'د', name: 'Dal', sound: 'd' },
  { letter: 'ذ', name: 'Dhal', sound: 'dh' },
  { letter: 'ر', name: 'Ra', sound: 'r' },
  { letter: 'ز', name: 'Zay', sound: 'z' },
  { letter: 'س', name: 'Sin', sound: 's' },
  { letter: 'ش', name: 'Shin', sound: 'sh' },
  { letter: 'ص', name: 'Sad', sound: 's' },
  { letter: 'ض', name: 'Dad', sound: 'd' },
  { letter: 'ط', name: 'Ta', sound: 't' },
  { letter: 'ظ', name: 'Dha', sound: 'dh' },
  { letter: 'ع', name: 'Ayn', sound: 'a' },
  { letter: 'غ', name: 'Ghayn', sound: 'gh' },
  { letter: 'ف', name: 'Fa', sound: 'f' },
  { letter: 'ق', name: 'Qaf', sound: 'q' },
  { letter: 'ك', name: 'Kaf', sound: 'k' },
  { letter: 'ل', name: 'Lam', sound: 'l' },
  { letter: 'م', name: 'Mim', sound: 'm' },
  { letter: 'ن', name: 'Nun', sound: 'n' },
  { letter: 'ه', name: 'Ha', sound: 'h' },
  { letter: 'و', name: 'Waw', sound: 'w' },
  { letter: 'ي', name: 'Ya', sound: 'y' },
];

export default function WritingScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<any>(null);
  
  const { incrementCredits, canUseAI, creditsRemaining, addXP, updateProgress, progress } = useUserProgress();

  const currentLetter = LETTERS[currentIndex];

  const speakArabic = (text: string) => {
    Speech.speak(text, {
      language: 'ar-SA',
      rate: 0.85,
    });
  };

  const handleNext = () => {
    setResult(null);
    setCurrentIndex((i) => (i + 1) % LETTERS.length);
  };

  const handlePrevious = () => {
    setResult(null);
    setCurrentIndex((i) => (i - 1 + LETTERS.length) % LETTERS.length);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={{ flex: 1 }}>
          <Text style={styles.headerTitle}>Écriture arabe</Text>
          <Text style={styles.headerSubtitle}>Apprenez à écrire les lettres</Text>
        </View>
        <Badge color="primary">{currentIndex + 1}/{LETTERS.length}</Badge>
      </View>

      {/* Letter display */}
      <Card style={styles.letterCard}>
        <TouchableOpacity 
          onPress={() => speakArabic(currentLetter.letter)}
          style={styles.letterContainer}
        >
          <Text style={styles.letterText}>{currentLetter.letter}</Text>
        </TouchableOpacity>
        <View style={styles.letterInfo}>
          <Text style={styles.letterName}>{currentLetter.name}</Text>
          <Text style={styles.letterSound}>Son: {currentLetter.sound}</Text>
        </View>
        <TouchableOpacity 
          onPress={() => speakArabic(currentLetter.letter)}
          style={styles.playButton}
        >
          <Ionicons name="volume-high" size={24} color={colors.primary} />
          <Text style={styles.playText}>Écouter</Text>
        </TouchableOpacity>
      </Card>

      {/* Instructions */}
      <Card style={styles.instructionsCard}>
        <Text style={styles.instructionsTitle}>✏️ Instructions</Text>
        <Text style={styles.instructionsText}>
          Pratiquez à écrire la lettre "{currentLetter.letter}" sur une feuille de papier ou dans votre application de dessin préférée.
        </Text>
        <View style={styles.tips}>
          <Text style={styles.tipText}>• Les lettres arabes s'écrivent de droite à gauche</Text>
          <Text style={styles.tipText}>• La lettre "{currentLetter.letter}" ({currentLetter.name}) a différentes formes selon sa position dans le mot</Text>
        </View>
      </Card>

      {/* Navigation */}
      <View style={styles.navigation}>
        <Button variant="outline" onPress={handlePrevious} style={{ flex: 1, marginRight: 8 }}>
          <Ionicons name="arrow-back" size={16} color={colors.text} /> Précédent
        </Button>
        <Button onPress={handleNext} style={{ flex: 1, marginLeft: 8 }}>
          Suivant <Ionicons name="arrow-forward" size={16} color={colors.white} />
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 56,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: fontSize.xl,
    fontWeight: '700',
    color: colors.text,
  },
  headerSubtitle: {
    fontSize: fontSize.xs,
    color: colors.textMuted,
  },
  letterCard: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  letterContainer: {
    padding: 20,
  },
  letterText: {
    fontSize: 96,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'center',
  },
  letterInfo: {
    alignItems: 'center',
    marginBottom: 16,
  },
  letterName: {
    fontSize: fontSize.lg,
    fontWeight: '600',
    color: colors.primary,
  },
  letterSound: {
    fontSize: fontSize.sm,
    color: colors.textMuted,
    marginTop: 4,
  },
  playButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: `${colors.primary}15`,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: borderRadius.full,
    gap: 8,
  },
  playText: {
    fontSize: fontSize.sm,
    fontWeight: '600',
    color: colors.primary,
  },
  instructionsCard: {
    marginBottom: spacing.lg,
  },
  instructionsTitle: {
    fontSize: fontSize.base,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  instructionsText: {
    fontSize: fontSize.sm,
    color: colors.textMuted,
    marginBottom: 12,
  },
  tips: {
    gap: 4,
  },
  tipText: {
    fontSize: fontSize.xs,
    color: colors.textMuted,
  },
  navigation: {
    flexDirection: 'row',
    paddingBottom: 100,
  },
});