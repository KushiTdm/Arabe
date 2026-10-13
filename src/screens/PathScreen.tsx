import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import ReAnimated, { useSharedValue, useAnimatedScrollHandler, useAnimatedStyle, interpolate, Extrapolation } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useProfile } from '../lib/ProfileContext';
import { usePathProgress } from '../lib/usePathProgress';
import {
  LEVEL_LABEL, STEP_ICON, stepLabel, type PathLevel, type PathUnit,
} from '../data/learningPath';
import { Animated, FadeInDown } from '../components/anim';
import { ILLUSTRATIONS } from '../theme/images';
import { colors, spacing, borderRadius, fontSize } from '../theme';

const LEVEL_ORDER: PathLevel[] = ['beginner', 'intermediate', 'advanced'];

export default function PathScreen() {
  const navigation = useNavigation<any>();
  const { language } = useProfile();
  const path = usePathProgress();
  const [open, setOpen] = useState<string | null>(null);
  // Grand titre qui se replie en titre compact quand la liste défile.
  const scrollY = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler(e => { scrollY.value = e.contentOffset.y; });
  const compactStyle = useAnimatedStyle(() => ({ opacity: interpolate(scrollY.value, [30, 64], [0, 1], Extrapolation.CLAMP) }));
  const largeStyle = useAnimatedStyle(() => ({
    opacity: interpolate(scrollY.value, [0, 48], [1, 0], Extrapolation.CLAMP),
    transform: [{ translateY: interpolate(scrollY.value, [0, 48], [0, -6], Extrapolation.CLAMP) }] as any,
  }));

  useFocusEffect(useCallback(() => { path.reload(); }, [path.reload]));

  const currentId = path.currentUnit?.id;
  const expanded = open ?? currentId ?? null;
  const pct = path.units.length ? Math.round((path.completedCount / path.units.length) * 100) : 0;

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color={colors.text} />
        </TouchableOpacity>
        <ReAnimated.Text style={[styles.compactTitle, compactStyle]} numberOfLines={1}>Parcours · {language.familiarName}</ReAnimated.Text>
        <View style={styles.backBtn} />
      </View>

      <ReAnimated.ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false} onScroll={onScroll} scrollEventThrottle={16}>
        <ReAnimated.View style={[styles.largeBlock, largeStyle]}>
          <Text style={styles.largeTitle}>Parcours</Text>
          <Text style={styles.subtitle}>
            {language.familiarName} · {path.completedCount} / {path.units.length} unités · {pct} %
          </Text>
          <View style={styles.barBg}><View style={[styles.barFill, { width: `${pct}%` as any }]} /></View>
        </ReAnimated.View>
        {path.finished && (
          <View style={styles.finishedBanner}>
            <Image source={ILLUSTRATIONS.levelUnlocked} style={styles.finishedArt} resizeMode="contain" />
            <Text style={styles.finishedText}>Parcours terminé, bravo !</Text>
          </View>
        )}
        {LEVEL_ORDER.map(level => {
          const units = path.units.filter(u => u.level === level);
          if (units.length === 0) return null;
          const meta = LEVEL_LABEL[level];
          return (
            <View key={level} style={{ marginBottom: spacing.lg }}>
              <View style={styles.levelRow}>
                <View style={styles.levelChip}><Text style={styles.levelChipText}>{meta.cefr}</Text></View>
                <Text style={styles.levelName}>{meta.name}</Text>
              </View>
              {units.map((unit, k) => (
                <Animated.View key={unit.id} entering={FadeInDown.delay(Math.min(k, 8) * 35).springify().damping(20)}>
                <UnitRow
                  unit={unit}
                  index={path.units.indexOf(unit) + 1}
                  done={path.unitDone(unit)}
                  current={unit.id === currentId}
                  expanded={expanded === unit.id}
                  onToggle={() => setOpen(expanded === unit.id ? '' : unit.id)}
                  isStepDone={i => path.isStepDone(unit.id, i)}
                  onStep={i => path.launch(navigation, unit, i)}
                  boss={path.bossInfo(unit)}
                  onBoss={() => path.launchBoss(navigation, unit)}
                  labelFor={i => stepLabel(unit.steps[i], language)}
                />
                </Animated.View>
              ))}
            </View>
          );
        })}
      </ReAnimated.ScrollView>
    </SafeAreaView>
  );
}

function UnitRow(props: {
  unit: PathUnit; index: number; done: boolean; current: boolean; expanded: boolean;
  onToggle: () => void; isStepDone: (i: number) => boolean;
  onStep: (i: number) => void; labelFor: (i: number) => string;
  boss: { best: number; wins: number }; onBoss: () => void;
}) {
  const { unit, index, done, current, expanded } = props;
  return (
    <View style={[styles.unit, current && styles.unitCurrent]}>
      <TouchableOpacity style={styles.unitHead} onPress={props.onToggle} activeOpacity={0.8}>
        <View style={[styles.badge, done && styles.badgeDone, current && styles.badgeCurrent]}>
          {done
            ? <Ionicons name="checkmark" size={16} color={colors.white} />
            : <Text style={[styles.badgeText, current && { color: colors.white }]}>{index}</Text>}
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.unitTitle}>{unit.title}</Text>
          {!expanded && <Text style={styles.unitGoal} numberOfLines={1}>{unit.goal}</Text>}
        </View>
        <Ionicons name={expanded ? 'chevron-up' : 'chevron-down'} size={18} color={colors.textMuted} />
      </TouchableOpacity>

      {expanded && (
        <View style={styles.unitBody}>
          <Text style={styles.unitGoalFull}>{unit.goal}</Text>
          {unit.steps.map((step, i) => {
            const stepDone = props.isStepDone(i);
            return (
              <TouchableOpacity key={i} style={styles.step} onPress={() => props.onStep(i)} activeOpacity={0.75}>
                <View style={[styles.stepIcon, stepDone && styles.stepIconDone]}>
                  <Ionicons
                    name={(stepDone ? 'checkmark' : STEP_ICON[step.kind]) as any}
                    size={16}
                    color={stepDone ? colors.white : colors.primary}
                  />
                </View>
                <Text style={[styles.stepLabel, stepDone && { color: colors.textMuted }]}>{props.labelFor(i)}</Text>
                <Ionicons name="play-circle" size={22} color={colors.primary} />
              </TouchableOpacity>
            );
          })}
          <TouchableOpacity
            style={[styles.step, styles.bossRow, !done && { opacity: 0.5 }]}
            onPress={props.onBoss}
            disabled={!done}
            activeOpacity={0.75}
          >
            <View style={[styles.stepIcon, styles.bossIcon, props.boss.wins > 0 && styles.stepIconDone]}>
              <Ionicons name={props.boss.wins > 0 ? 'shield-checkmark' : done ? 'flash' : 'lock-closed'} size={16} color={props.boss.wins > 0 ? colors.white : colors.destructive} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.stepLabel}>Boss de l'unité</Text>
              <Text style={styles.bossSub}>
                {!done ? 'Termine les étapes pour le défier'
                  : props.boss.wins > 0 ? `Vaincu · meilleur score ${props.boss.best} %`
                  : 'Tes mots de l\'unité et tes erreurs passées'}
              </Text>
            </View>
            {done && <Ionicons name="play-circle" size={22} color={colors.destructive} />}
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  finishedBanner: { alignItems: 'center', marginBottom: spacing.lg },
  finishedArt: { width: 120, height: 120 },
  finishedText: { fontSize: fontSize.base, fontWeight: '700', color: colors.text, marginTop: 4 },
  compactTitle:{ flex: 1, textAlign: 'center', fontSize: 17, fontWeight: '600', color: colors.text },
  largeBlock:  { marginBottom: spacing.lg },
  largeTitle:  { fontSize: 34, fontWeight: '700', lineHeight: 41, letterSpacing: 0.3, color: colors.text },
  safe:        { flex: 1, backgroundColor: colors.background },
  header:      { flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 16, paddingTop: 8, paddingBottom: 10 },
  backBtn:     { width: 36, height: 36, borderRadius: 18, backgroundColor: `${colors.textMuted}15`, justifyContent: 'center', alignItems: 'center' },
  title:       { fontSize: fontSize.lg, fontWeight: '800', color: colors.text },
  subtitle:    { fontSize: fontSize.xs, color: colors.textMuted, marginTop: 2 },
  barBg:       { height: 5, backgroundColor: colors.border, marginTop: 10, borderRadius: 3, overflow: 'hidden' },
  barFill:     { height: '100%', backgroundColor: colors.accent, borderRadius: 3 },
  content:     { padding: 16, paddingBottom: 110 },
  levelRow:    { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8, marginTop: 4 },
  levelChip:   { backgroundColor: colors.primary, paddingHorizontal: 9, paddingVertical: 3, borderRadius: borderRadius.full },
  levelChipText:{ color: colors.white, fontSize: fontSize.xs, fontWeight: '800' },
  levelName:   { fontSize: fontSize.base, fontWeight: '800', color: colors.text },
  unit:        { backgroundColor: colors.card, borderRadius: borderRadius.xl, borderWidth: 1, borderColor: colors.border, marginBottom: 8, overflow: 'hidden' },
  unitCurrent: { borderColor: colors.primary, borderWidth: 2 },
  unitHead:    { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 12 },
  badge:       { width: 30, height: 30, borderRadius: 15, backgroundColor: `${colors.textMuted}18`, justifyContent: 'center', alignItems: 'center' },
  badgeDone:   { backgroundColor: colors.success },
  badgeCurrent:{ backgroundColor: colors.primary },
  badgeText:   { fontSize: fontSize.sm, fontWeight: '800', color: colors.textMuted },
  unitTitle:   { fontSize: fontSize.base, fontWeight: '700', color: colors.text },
  unitGoal:    { fontSize: fontSize.xs, color: colors.textMuted, marginTop: 2 },
  unitBody:    { paddingHorizontal: 12, paddingBottom: 12, gap: 6 },
  unitGoalFull:{ fontSize: fontSize.sm, color: colors.text, lineHeight: 19, marginBottom: 4 },
  step:        { flexDirection: 'row', alignItems: 'center', gap: 10, padding: 10, borderRadius: borderRadius.lg, backgroundColor: `${colors.primary}08` },
  stepIcon:    { width: 30, height: 30, borderRadius: 15, backgroundColor: `${colors.primary}15`, justifyContent: 'center', alignItems: 'center' },
  stepIconDone:{ backgroundColor: colors.success },
  bossRow:     { backgroundColor: `${colors.destructive}0D`, marginTop: 4 },
  bossIcon:    { backgroundColor: `${colors.destructive}1A` },
  bossSub:     { fontSize: fontSize.xs, color: colors.textMuted, marginTop: 1 },
  stepLabel:   { flex: 1, fontSize: fontSize.sm, fontWeight: '600', color: colors.text },
});
