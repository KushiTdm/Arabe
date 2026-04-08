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
import { Card, Button } from '../components/RNComponents';
import { colors, spacing, borderRadius, fontSize } from '../theme';

const ALPHABET = [
  { letter: 'ا', name: 'Alif', sound: 'a', example: 'أب (ab - père)' },
  { letter: 'ب', name: 'Ba', sound: 'b', example: 'باب (bab - porte)' },
  { letter: 'ت', name: 'Ta', sound: 't', example: 'تين (tīn - figue)' },
  { letter: 'ث', name: 'Tha', sound: 'th', example: 'ثعلب (tha\'lab - renard)' },
  { letter: 'ج', name: 'Jim', sound: 'j', example: 'جمل (jamal - chameau)' },
  { letter: 'ح', name: 'Ha', sound: 'ḥ', example: 'حصان (ḥiṣān - cheval)' },
  { letter: 'خ', name: 'Kha', sound: 'kh', example: 'خبز (khubz - pain)' },
  { letter: 'د', name: 'Dal', sound: 'd', example: 'دجاجة (dajāja - poule)' },
  { letter: 'ذ', name: 'Dhal', sound: 'dh', example: 'ذهب (dhahab - or)' },
  { letter: 'ر', name: 'Ra', sound: 'r', example: 'رأس (ra\'s - tête)' },
  { letter: 'ز', name: 'Zay', sound: 'z', example: 'زهرة (zahra - fleur)' },
  { letter: 'س', name: 'Sin', sound: 's', example: 'سمك (samak - poisson)' },
  { letter: 'ش', name: 'Shin', sound: 'sh', example: 'شمس (shams - soleil)' },
  { letter: 'ص', name: 'Sad', sound: 'ṣ', example: 'صقر (ṣaqr - faucon)' },
  { letter: 'ض', name: 'Dad', sound: 'ḍ', example: 'ضفدع (ḍifdi\' - grenouille)' },
  { letter: 'ط', name: 'Ta', sound: 'ṭ', example: 'طائر (ṭā\'ir - oiseau)' },
  { letter: 'ظ', name: 'Dha', sound: 'ẓ', example: 'ظفر (ẓufr - ongle)' },
  { letter: 'ع', name: 'Ayn', sound: 'ʿ', example: 'عين (ʿayn - œil)' },
  { letter: 'غ', name: 'Ghayn', sound: 'gh', example: 'غراب (ghurāb - corbeau)' },
  { letter: 'ف', name: 'Fa', sound: 'f', example: 'فيل (fīl - éléphant)' },
  { letter: 'ق', name: 'Qaf', sound: 'q', example: 'قمر (qamar - lune)' },
  { letter: 'ك', name: 'Kaf', sound: 'k', example: 'كتاب (kitāb - livre)' },
  { letter: 'ل', name: 'Lam', sound: 'l', example: 'ليمون (laymūn - citron)' },
  { letter: 'م', name: 'Mim', sound: 'm', example: 'ماء (mā\' - eau)' },
  { letter: 'ن', name: 'Nun', sound: 'n', example: 'نجم (najm - étoile)' },
  { letter: 'ه', name: 'Ha', sound: 'h', example: 'هلال (hilāl - croissant)' },
  { letter: 'و', name: 'Waw', sound: 'w', example: 'ورد (ward - rose)' },
  { letter: 'ي', name: 'Ya', sound: 'y', example: 'يد (yad - main)' },
];

export default function AlphabetScreen() {
  const [selectedLetter, setSelectedLetter] = useState<any>(null);

  const speakArabic = (text: string) => {
    Speech.speak(text, {
      language: 'ar-SA',
      rate: 0.85,
    });
  };

  if (selectedLetter) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setSelectedLetter(null)} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Alphabet arabe</Text>
        </View>

        <Card style={styles.detailCard}>
          <TouchableOpacity 
            onPress={() => speakArabic(selectedLetter.letter)}
            style={styles.letterContainer}
          >
            <Text style={styles.letterText}>{selectedLetter.letter}</Text>
          </TouchableOpacity>
          
          <View style={styles.letterInfo}>
            <Text style={styles.letterName}>{selectedLetter.name}</Text>
            <Text style={styles.letterSound}>Prononciation: {selectedLetter.sound}</Text>
          </View>

          <View style={styles.exampleContainer}>
            <Text style={styles.exampleLabel}>Exemple:</Text>
            <TouchableOpacity onPress={() => speakArabic(selectedLetter.example.split(' ')[0])}>
              <Text style={styles.exampleText}>{selectedLetter.example}</Text>
            </TouchableOpacity>
          </View>

          <Button 
            onPress={() => speakArabic(selectedLetter.letter)}
            fullWidth
          >
            <Ionicons name="volume-high" size={16} color={colors.white} /> Écouter la lettre
          </Button>
        </Card>

        <View style={styles.navigation}>
          <Button 
            variant="outline" 
            onPress={() => {
              const idx = ALPHABET.findIndex(l => l.letter === selectedLetter.letter);
              if (idx > 0) setSelectedLetter(ALPHABET[idx - 1]);
            }}
            style={{ flex: 1, marginRight: 8 }}
          >
            ← Précédent
          </Button>
          <Button 
            onPress={() => {
              const idx = ALPHABET.findIndex(l => l.letter === selectedLetter.letter);
              if (idx < ALPHABET.length - 1) setSelectedLetter(ALPHABET[idx + 1]);
            }}
            style={{ flex: 1, marginLeft: 8 }}
          >
            Suivant →
          </Button>
        </View>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Alphabet arabe</Text>
        <Text style={styles.headerSubtitle}>28 lettres à découvrir</Text>
      </View>

      <View style={styles.alphabetGrid}>
        {ALPHABET.map(item => (
          <TouchableOpacity
            key={item.letter}
            style={styles.letterCard}
            onPress={() => setSelectedLetter(item)}
          >
            <Text style={styles.gridLetter}>{item.letter}</Text>
            <Text style={styles.gridName}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingBottom: 100,
  },
  header: {
    paddingTop: 56,
    paddingBottom: 16,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: fontSize.xl,
    fontWeight: '700',
    color: colors.text,
  },
  headerSubtitle: {
    fontSize: fontSize.xs,
    color: colors.textMuted,
    marginTop: 4,
  },
  backButton: {
    padding: 8,
    marginRight: 12,
    borderRadius: borderRadius.lg,
    backgroundColor: `${colors.textMuted}15`,
  },
  alphabetGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    gap: 8,
  },
  letterCard: {
    width: '22%',
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    alignItems: 'center',
  },
  gridLetter: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.text,
  },
  gridName: {
    fontSize: 8,
    color: colors.textMuted,
    marginTop: 4,
  },
  detailCard: {
    margin: 20,
    alignItems: 'center',
  },
  letterContainer: {
    padding: 20,
  },
  letterText: {
    fontSize: 80,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'center',
  },
  letterInfo: {
    alignItems: 'center',
    marginBottom: 20,
  },
  letterName: {
    fontSize: fontSize.xl,
    fontWeight: '600',
    color: colors.primary,
  },
  letterSound: {
    fontSize: fontSize.sm,
    color: colors.textMuted,
    marginTop: 4,
  },
  exampleContainer: {
    width: '100%',
    padding: 16,
    backgroundColor: `${colors.primary}10`,
    borderRadius: borderRadius.lg,
    marginBottom: 20,
  },
  exampleLabel: {
    fontSize: fontSize.xs,
    color: colors.textMuted,
    marginBottom: 4,
  },
  exampleText: {
    fontSize: fontSize.lg,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
  },
  navigation: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 8,
  },
});