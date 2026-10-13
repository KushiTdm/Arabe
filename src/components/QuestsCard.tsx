import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { useProfile } from '../lib/ProfileContext';
import {
  useQuests, allDone, CHEST_ODDS, MAX_FREEZES, RARITY_COLOR, RARITY_LABEL, type Reward,
} from '../lib/quests';
import { AnimatedBar } from './motion/AnimatedBar';
import { PopIn } from './motion/PopIn';
import { WordPic } from './WordPic';
import { success } from '../lib/haptics';
import { Animated, FadeInDown } from './anim';
import { colors, borderRadius, fontSize } from '../theme';

// ─── Quêtes du jour ──────────────────────────────────────────────────────────
// Trois objectifs de révision ; une fois faits, le coffre s'ouvre. Les chances
// de chaque récompense sont écrites dans la fenêtre du coffre.

export function QuestsCard() {
  const { activeProfile, language } = useProfile();
  const { state, inv, reload, claim } = useQuests(activeProfile?.id, language.code);
  const [reward, setReward] = useState<Reward | null>(null);
  const [odds, setOdds] = useState(false);

  useFocusEffect(useCallback(() => { reload(); }, [reload]));
  if (!state) return null;

  const ready = allDone(state);
  const open = async () => { const r = await claim(); if (r) { setReward(r); success(); } };
  const doneCount = state.quests.filter(q => q.progress >= q.target).length;

  return (
    <Animated.View entering={FadeInDown.delay(160).springify().damping(20)} style={styles.card}>
      <View style={styles.head}>
        <Text style={styles.title}>Quêtes du jour</Text>
        <Text style={styles.count}>{doneCount} / {state.quests.length}</Text>
      </View>

      {state.quests.map(q => {
        const done = q.progress >= q.target;
        return (
          <View key={q.id} style={styles.row}>
            <Ionicons name={done ? 'checkmark-circle' : 'ellipse-outline'} size={20} color={done ? colors.success : colors.textLight} />
            <View style={{ flex: 1 }}>
              <Text style={[styles.label, done && { color: colors.textMuted }]}>{q.label}</Text>
              <AnimatedBar value={q.progress / q.target} height={4} accent={done ? colors.success : colors.primary} style={{ marginTop: 5 }} />
            </View>
            <Text style={styles.progress}>{q.progress}/{q.target}</Text>
          </View>
        );
      })}

      <View style={styles.footer}>
        {state.claimed ? (
          <Text style={styles.footText}>Coffre ouvert. Il se remplit de nouveau demain.</Text>
        ) : (
          <TouchableOpacity
            style={[styles.chestBtn, !ready && styles.chestOff]}
            onPress={open}
            disabled={!ready}
            activeOpacity={0.85}
          >
            <Ionicons name={ready ? 'gift' : 'lock-closed'} size={16} color={ready ? colors.white : colors.textMuted} />
            <Text style={[styles.chestText, !ready && { color: colors.textMuted }]}>
              {ready ? 'Ouvrir le coffre' : 'Coffre verrouillé'}
            </Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={() => setOdds(true)} hitSlop={8}>
          <Text style={styles.link}>Chances</Text>
        </TouchableOpacity>
      </View>
      {inv.freezes > 0 && (
        <View style={styles.freezeRow}>
          <Ionicons name="snow" size={14} color={colors.primary} />
          <Text style={styles.freezeText}>
            {inv.freezes} gel{inv.freezes > 1 ? 's' : ''} de série : un jour manqué ne casse pas ta série
          </Text>
        </View>
      )}

      <Modal visible={!!reward} transparent animationType="fade" onRequestClose={() => setReward(null)}>
        <View style={styles.backdrop}>
          <View style={styles.sheet}>
            {reward?.kind === 'card' && (
              <PopIn triggerKey={reward.card.word} peak={1.1} style={{ alignItems: 'center' }}>
                <Text style={[styles.rarity, { color: RARITY_COLOR[reward.card.rarity] }]}>{RARITY_LABEL[reward.card.rarity]}</Text>
                <View style={[styles.cardFrame, { borderColor: RARITY_COLOR[reward.card.rarity] }]}>
                  <WordPic img={reward.card.img} color={reward.card.color} size={120} />
                </View>
                <Text style={styles.word}>{reward.card.word}</Text>
                <Text style={styles.fr}>{reward.card.fr}</Text>
                <Text style={styles.note}>Ajoutée à ta collection, dans le Profil.</Text>
              </PopIn>
            )}
            {reward?.kind === 'freeze' && (
              <PopIn triggerKey="freeze" peak={1.1} style={{ alignItems: 'center' }}>
                <Ionicons name="snow" size={56} color={colors.primary} />
                <Text style={styles.word}>Gel de série</Text>
                <Text style={styles.note}>Si tu manques un jour, ta série continue. Maximum {MAX_FREEZES}.</Text>
              </PopIn>
            )}
            {reward?.kind === 'complete' && (
              <View style={{ alignItems: 'center' }}>
                <Ionicons name="trophy" size={48} color={colors.secondary} />
                <Text style={styles.word}>Collection complète</Text>
                <Text style={styles.note}>Tu as toutes les cartes de cette langue.</Text>
              </View>
            )}
            <TouchableOpacity style={styles.okBtn} onPress={() => setReward(null)}>
              <Text style={styles.okText}>Continuer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal visible={odds} transparent animationType="fade" onRequestClose={() => setOdds(false)}>
        <View style={styles.backdrop}>
          <View style={styles.sheet}>
            <Text style={styles.word}>Contenu du coffre</Text>
            <Text style={styles.odds}>{CHEST_ODDS.card} % : une carte-mot à collectionner</Text>
            <Text style={styles.odds}>{CHEST_ODDS.freeze} % : un gel de série (max {MAX_FREEZES})</Text>
            <Text style={[styles.note, { marginTop: 10 }]}>
              Rareté d'une carte : commune {CHEST_ODDS.rarity.common} %, rare {CHEST_ODDS.rarity.rare} %, épique {CHEST_ODDS.rarity.epic} %. La rareté est purement décorative.
            </Text>
            <Text style={styles.note}>Les récompenses ne donnent aucun avantage pour apprendre : elles ne servent qu'à collectionner.</Text>
            <TouchableOpacity style={styles.okBtn} onPress={() => setOdds(false)}>
              <Text style={styles.okText}>Fermer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card:      { backgroundColor: colors.card, borderRadius: borderRadius.lg, padding: 16, marginTop: 14, gap: 12 },
  head:      { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' },
  title:     { fontSize: fontSize.md, fontWeight: '700', color: colors.text },
  count:     { fontSize: fontSize.sm, color: colors.textMuted, fontWeight: '600' },
  row:       { flexDirection: 'row', alignItems: 'center', gap: 10 },
  label:     { fontSize: fontSize.base, color: colors.text, fontWeight: '500' },
  progress:  { fontSize: fontSize.sm, color: colors.textMuted, fontWeight: '600', minWidth: 30, textAlign: 'right' },
  footer:    { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 2 },
  chestBtn:  { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: colors.primary, paddingHorizontal: 16, paddingVertical: 10, borderRadius: borderRadius.full },
  chestOff:  { backgroundColor: `${colors.textMuted}15` },
  chestText: { color: colors.white, fontWeight: '700', fontSize: fontSize.base },
  footText:  { flex: 1, fontSize: fontSize.sm, color: colors.textMuted },
  link:      { fontSize: fontSize.sm, color: colors.primary, fontWeight: '600' },
  freezeRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  freezeText:{ flex: 1, fontSize: fontSize.xs, color: colors.textMuted },
  backdrop:  { flex: 1, backgroundColor: 'rgba(15,28,26,0.55)', justifyContent: 'center', padding: 28 },
  sheet:     { backgroundColor: colors.card, borderRadius: borderRadius.xl, padding: 24, alignItems: 'center', gap: 6 },
  rarity:    { fontSize: fontSize.xs, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 10 },
  cardFrame: { padding: 12, borderWidth: 2, borderRadius: borderRadius.lg, marginBottom: 10 },
  word:      { fontSize: fontSize.xl, fontWeight: '700', color: colors.text, textAlign: 'center' },
  fr:        { fontSize: fontSize.md, color: colors.textMuted },
  note:      { fontSize: fontSize.sm, color: colors.textMuted, textAlign: 'center', lineHeight: 19, marginTop: 6 },
  odds:      { fontSize: fontSize.base, color: colors.text, marginTop: 4 },
  okBtn:     { marginTop: 18, backgroundColor: colors.primary, borderRadius: borderRadius.full, paddingHorizontal: 28, paddingVertical: 11 },
  okText:    { color: colors.white, fontWeight: '700', fontSize: fontSize.base },
});
