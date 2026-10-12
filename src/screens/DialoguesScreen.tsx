import React, { useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useProfile } from '../lib/ProfileContext';
import { getConversations } from '../content';
import { VOCAB_IMAGES } from '../content/images';
import { WordPic } from '../components/WordPic';
import { PressableScale, Animated, FadeInDown } from '../components/anim';
import { useConversationProgress, conversationStorageKey, CONVERSATION_XP } from '../lib/useConversationProgress';
import { LEVEL_LABEL } from '../data/learningPath';
import { colors, borderRadius, fontSize } from '../theme';

// ─── Liste des conversations guidées ─────────────────────────────────────────

export default function DialoguesScreen() {
  const navigation = useNavigation<any>();
  const { language, activeProfile } = useProfile();
  const list = getConversations(language.code);
  const progress = useConversationProgress(conversationStorageKey(activeProfile?.id, language.code));

  useFocusEffect(useCallback(() => { progress.reload(); }, [progress.reload])); // eslint-disable-line react-hooks/exhaustive-deps

  const levels = (['beginner', 'intermediate', 'advanced'] as const)
    .map(l => ({ level: l, items: list.filter(c => c.level === l) }))
    .filter(g => g.items.length > 0);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}>
            <Ionicons name="arrow-back" size={22} color={colors.text} />
          </TouchableOpacity>
          <View style={{ flex: 1 }}>
            <Text style={styles.title}>{language.flag} Conversations</Text>
            <Text style={styles.sub}>{progress.doneCount} / {list.length} réussies · +{CONVERSATION_XP} XP chacune</Text>
          </View>
        </View>

        {list.length === 0 && (
          <Text style={styles.empty}>Pas encore de conversation guidée pour cette langue. Utilise « Discuter IA » pour t'entraîner librement.</Text>
        )}

        {levels.map(g => (
          <View key={g.level}>
            <Text style={styles.level}>{LEVEL_LABEL[g.level].cefr} · {LEVEL_LABEL[g.level].name}</Text>
            {g.items.map((c, i) => {
              const best = progress.scores[c.id];
              const ok = progress.done(c.id);
              const src = c.scene.img ? VOCAB_IMAGES[c.scene.img] : undefined;
              return (
                <Animated.View key={c.id} entering={FadeInDown.delay(i * 40).springify().damping(16)}>
                  <PressableScale style={styles.row} onPress={() => navigation.navigate('Dialogue', { conversationId: c.id })}>
                    <View style={styles.thumb}>
                      {src ? <Image source={src} style={styles.thumbImg} /> : <WordPic emoji={c.scene.emoji} size={56} />}
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.rowTitle} numberOfLines={1}>{c.title}</Text>
                      <Text style={styles.rowSub} numberOfLines={2}>{c.situation}</Text>
                      <Text style={styles.rowMeta}>{c.turns.length} répliques{best !== undefined ? ` · meilleur : ${best}%` : ''}</Text>
                    </View>
                    <Ionicons name={ok ? 'checkmark-circle' : 'chevron-forward'} size={22} color={ok ? colors.success : colors.textMuted} />
                  </PressableScale>
                </Animated.View>
              );
            })}
          </View>
        ))}
        <View style={{ height: 80 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  content: { paddingHorizontal: 16 },
  header: { flexDirection: 'row', alignItems: 'center', paddingTop: 16, paddingBottom: 12 },
  back: { padding: 8, borderRadius: borderRadius.md, backgroundColor: `${colors.textMuted}15`, marginRight: 10 },
  title: { fontSize: fontSize.xl, fontWeight: '700', color: colors.text },
  sub: { fontSize: fontSize.xs, color: colors.textMuted, marginTop: 2 },
  empty: { color: colors.textMuted, textAlign: 'center', marginTop: 40, lineHeight: 22 },
  level: { fontSize: fontSize.sm, fontWeight: '800', color: colors.accent, marginTop: 16, marginBottom: 8, letterSpacing: 0.8 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: colors.card, borderRadius: borderRadius.xl, borderWidth: 1, borderColor: colors.border, padding: 12, marginBottom: 10 },
  thumb: { width: 64, height: 64, borderRadius: 16, overflow: 'hidden', backgroundColor: colors.background, alignItems: 'center', justifyContent: 'center' },
  thumbImg: { width: 64, height: 64 },
  rowTitle: { fontSize: fontSize.base, fontWeight: '800', color: colors.text },
  rowSub: { fontSize: fontSize.xs, color: colors.textMuted, marginTop: 2, lineHeight: 16 },
  rowMeta: { fontSize: fontSize.xs, color: colors.primaryLight, marginTop: 4, fontWeight: '600' },
});
