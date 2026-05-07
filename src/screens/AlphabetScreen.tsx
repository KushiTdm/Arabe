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
import { useProfile } from '../lib/ProfileContext';
import { colors, spacing, borderRadius, fontSize } from '../theme';

export default function AlphabetScreen() {
  const { language } = useProfile();
  const alphabet = language.alphabet;
  const [selectedLetter, setSelectedLetter] = useState<any>(null);

  const speakLetter = (text: string) => {
    Speech.speak(text, {
      language: language.ttsLang,
      rate: 0.85,
    });
  };

  if (selectedLetter) {
    const idx = alphabet.findIndex(l => l.letter === selectedLetter.letter);
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setSelectedLetter(null)} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{language.flag} {language.familiarName}</Text>
        </View>

        <Card style={styles.detailCard}>
          <TouchableOpacity
            onPress={() => speakLetter(selectedLetter.letter)}
            style={styles.letterContainer}
          >
            <Text style={styles.letterText}>{selectedLetter.letter}</Text>
          </TouchableOpacity>

          <View style={styles.letterInfo}>
            <Text style={styles.letterName}>{selectedLetter.name}</Text>
            <Text style={styles.letterSound}>Prononciation: {selectedLetter.sound}</Text>
          </View>

          {!!selectedLetter.example && (
            <View style={styles.exampleContainer}>
              <Text style={styles.exampleLabel}>Exemple:</Text>
              <TouchableOpacity onPress={() => speakLetter(selectedLetter.example.split(' ')[0])}>
                <Text style={styles.exampleText}>{selectedLetter.example}</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Positional forms — Arabic only */}
          {!!selectedLetter.isolated && (
            <View style={styles.formsRow}>
              {[
                { label: 'Isolée', val: selectedLetter.isolated },
                { label: 'Début',  val: selectedLetter.initial },
                { label: 'Milieu', val: selectedLetter.medial },
                { label: 'Fin',    val: selectedLetter.final },
              ].filter(f => !!f.val).map(f => (
                <View key={f.label} style={styles.formItem}>
                  <Text style={styles.formLetter}>{f.val}</Text>
                  <Text style={styles.formLabel}>{f.label}</Text>
                </View>
              ))}
            </View>
          )}

          {!!selectedLetter.tips && (
            <View style={styles.tipsBox}>
              <Text style={styles.tipsText}>💡 {selectedLetter.tips}</Text>
            </View>
          )}

          <Button
            onPress={() => speakLetter(selectedLetter.letter)}
            fullWidth
          >
            <Ionicons name="volume-high" size={16} color={colors.white} /> Écouter
          </Button>
        </Card>

        <View style={styles.navigation}>
          <Button
            variant="outline"
            onPress={() => { if (idx > 0) setSelectedLetter(alphabet[idx - 1]); }}
            style={{ flex: 1, marginRight: 8 }}
          >
            ← Précédent
          </Button>
          <Button
            onPress={() => { if (idx < alphabet.length - 1) setSelectedLetter(alphabet[idx + 1]); }}
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
        <Text style={styles.headerTitle}>{language.flag} {language.script}</Text>
        <Text style={styles.headerSubtitle}>{alphabet.length} lettres / sons à découvrir</Text>
      </View>

      <View style={styles.alphabetGrid}>
        {alphabet.map((item, i) => (
          <TouchableOpacity
            key={`${item.letter}-${i}`}
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
    fontSize: 28,
    fontWeight: '700',
    color: colors.text,
  },
  gridName: {
    fontSize: 8,
    color: colors.textMuted,
    marginTop: 4,
    textAlign: 'center',
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
    marginBottom: 16,
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
    marginBottom: 16,
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
  formsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 16,
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
    fontSize: 22,
    fontWeight: '700',
    color: colors.text,
  },
  formLabel: {
    fontSize: 9,
    color: colors.textMuted,
    marginTop: 4,
    fontWeight: '600',
  },
  tipsBox: {
    width: '100%',
    padding: 12,
    backgroundColor: `${colors.accent}10`,
    borderRadius: borderRadius.lg,
    marginBottom: 16,
  },
  tipsText: {
    fontSize: fontSize.sm,
    color: colors.text,
    lineHeight: 20,
  },
  navigation: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 8,
  },
});
