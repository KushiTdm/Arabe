import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useProfile } from '../lib/ProfileContext';
import { readInventory, RARITY_COLOR, type CollectedCard } from '../lib/quests';
import { WordPic } from './WordPic';
import { colors, borderRadius, fontSize } from '../theme';

/** Cartes-mots gagnées dans les coffres, pour la langue en cours. */
export function CollectionCard() {
  const { activeProfile, language } = useProfile();
  const [cards, setCards] = useState<CollectedCard[]>([]);
  useFocusEffect(useCallback(() => {
    readInventory(activeProfile?.id).then(i => setCards(i.cards.filter(c => c.lang === language.code)));
  }, [activeProfile?.id, language.code]));

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Collection · {cards.length}</Text>
      {cards.length === 0 ? (
        <Text style={styles.empty}>Termine les quêtes du jour pour gagner ta première carte.</Text>
      ) : (
        <View style={styles.grid}>
          {cards.map(c => (
            <View key={c.word} style={[styles.item, { borderColor: RARITY_COLOR[c.rarity] }]}>
              <WordPic img={c.img} color={c.color} size={54} />
              <Text style={styles.word} numberOfLines={1}>{c.word}</Text>
              <Text style={styles.fr} numberOfLines={1}>{c.fr}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card:  { backgroundColor: colors.card, borderRadius: borderRadius.lg, padding: 16, marginBottom: 12 },
  title: { fontSize: fontSize.md, fontWeight: '700', color: colors.text, marginBottom: 10 },
  empty: { fontSize: fontSize.sm, color: colors.textMuted, lineHeight: 19 },
  grid:  { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  item:  { width: '30.5%', alignItems: 'center', padding: 8, borderWidth: 1.5, borderRadius: borderRadius.md, gap: 2 },
  word:  { fontSize: fontSize.sm, fontWeight: '700', color: colors.text },
  fr:    { fontSize: fontSize.xs, color: colors.textMuted },
});
