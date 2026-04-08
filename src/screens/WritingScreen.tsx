import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Speech from 'expo-speech';
import { useUserProgress } from '../lib/useUserProgress';
import { Card, Badge, Button } from '../components/RNComponents';
import { colors, spacing, borderRadius, fontSize } from '../theme';

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

export default function WritingScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { creditsRemaining } = useUserProgress();

  const letter = LETTERS[currentIndex];

  const speakArabic = (text: string) => {
    Speech.speak(text, { language: 'ar-SA', rate: 0.85 });
  };

  const handleNext = () => setCurrentIndex(i => (i + 1) % LETTERS.length);
  const handlePrev = () => setCurrentIndex(i => (i - 1 + LETTERS.length) % LETTERS.length);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={{ flex: 1 }}>
          <Text style={styles.headerTitle}>Écriture arabe</Text>
          <Text style={styles.headerSubtitle}>Apprenez à écrire les lettres</Text>
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

      {/* Instructions */}
      <Card style={styles.instructionsCard}>
        <Text style={styles.instructionsTitle}>✏️ Conseils d'écriture</Text>
        <Text style={styles.instructionsText}>
          • Les lettres arabes s'écrivent de <Text style={{ fontWeight: '700' }}>droite à gauche</Text>.{'\n'}
          • La lettre <Text style={{ fontWeight: '700' }}>{letter.letter}</Text> ({letter.name}) change de forme selon sa position dans le mot.{'\n'}
          • Entraînez-vous sur une feuille ou dans une application de dessin.
        </Text>
      </Card>

      {/* Navigation */}
      <View style={styles.navigation}>
        <Button variant="outline" onPress={handlePrev} style={{ flex: 1, marginRight: 8 }}>
          ← Précédent
        </Button>
        <Button onPress={handleNext} style={{ flex: 1, marginLeft: 8 }}>
          Suivant →
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container:         { flex: 1, backgroundColor: colors.background, paddingHorizontal: 20 },
  header:            { flexDirection: 'row', alignItems: 'center', paddingTop: 56, paddingBottom: 16 },
  headerTitle:       { fontSize: fontSize.xl, fontWeight: '700', color: colors.text },
  headerSubtitle:    { fontSize: fontSize.xs, color: colors.textMuted },
  letterCard:        { alignItems: 'center', marginBottom: spacing.md },
  letterContainer:   { padding: 16 },
  letterText:        { fontSize: 96, fontWeight: '700', color: colors.text, textAlign: 'center' },
  letterName:        { fontSize: fontSize.xl, fontWeight: '600', color: colors.primary },
  letterSound:       { fontSize: fontSize.sm, color: colors.textMuted, marginTop: 4, marginBottom: 16 },
  playButton:        { flexDirection: 'row', alignItems: 'center', backgroundColor: `${colors.primary}15`, paddingHorizontal: 24, paddingVertical: 12, borderRadius: borderRadius.full, gap: 8 },
  playText:          { fontSize: fontSize.sm, fontWeight: '600', color: colors.primary },
  formsCard:         { marginBottom: spacing.md },
  formsTitle:        { fontSize: fontSize.sm, fontWeight: '700', color: colors.text, marginBottom: 12 },
  formsGrid:         { flexDirection: 'row', justifyContent: 'space-around' },
  formItem:          { alignItems: 'center', flex: 1 },
  formLetter:        { fontSize: 28, fontWeight: '700', color: colors.text },
  formLabel:         { fontSize: 9, color: colors.textMuted, marginTop: 4 },
  instructionsCard:  { marginBottom: spacing.md },
  instructionsTitle: { fontSize: fontSize.base, fontWeight: '600', color: colors.text, marginBottom: 8 },
  instructionsText:  { fontSize: fontSize.xs, color: colors.textMuted, lineHeight: 20 },
  navigation:        { flexDirection: 'row', paddingBottom: 40 },
});