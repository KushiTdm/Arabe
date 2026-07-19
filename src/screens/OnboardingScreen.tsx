import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TextInput, TouchableOpacity, Image,
  ScrollView, KeyboardAvoidingView, Platform, ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useProfile } from '../lib/ProfileContext';
import { SUPPORTED_LANGUAGES } from '../lib/languages';
import { HERO_IMAGE, LANGUAGE_THUMBS } from '../theme/images';
import { Animated, FadeInDown, FadeInUp } from '../components/anim';
import { colors, spacing, borderRadius, fontSize } from '../theme';

const AVATARS = [
  '🦁', '🐬', '🦊', '🐧', '🦋', '🐙',
  '🦚', '🐨', '🦄', '🐺', '🦝', '🦜',
  '🐸', '🐯', '🦅', '🐳', '🌟', '🔥',
  '🎭', '🌈',
];

function diffColor(d: string) {
  if (d === 'easy') return '#10b981';
  if (d === 'medium') return '#f59e0b';
  return '#ef4444';
}

function diffLabel(d: string) {
  if (d === 'easy') return 'Facile';
  if (d === 'medium') return 'Moyen';
  return 'Difficile';
}

export default function OnboardingScreen() {
  const { createProfile } = useProfile();
  const [step, setStep] = useState<1 | 2>(1);
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState(AVATARS[0]);
  const [selectedLang, setSelectedLang] = useState('ar');
  const [creating, setCreating] = useState(false);

  const handleCreate = async () => {
    if (!name.trim() || creating) return;
    setCreating(true);
    try {
      await createProfile(name.trim(), selectedLang, avatar);
      // RootStack voit profiles.length > 0 → bascule automatiquement sur MainTabs
    } catch (e) {
      console.error('Erreur création profil:', e);
    } finally {
      setCreating(false);
    }
  };

  // ── Étape 1 : prénom + avatar ─────────────────────────────────────────────
  if (step === 1) {
    return (
      <SafeAreaView style={styles.safe}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <Animated.View entering={FadeInUp.duration(500)} style={styles.heroBanner}>
              <Image source={HERO_IMAGE} style={StyleSheet.absoluteFill as any} resizeMode="cover" />
              <LinearGradient
                colors={['rgba(15,28,26,0.25)', 'rgba(15,28,26,0.88)']}
                style={StyleSheet.absoluteFill as any}
              />
              <View style={styles.heroContent}>
                <Text style={styles.heroLogo}>🌍</Text>
                <Text style={styles.heroAppName}>LinguaLearn</Text>
                <Text style={styles.heroTagline}>Apprends une langue, voyage avec les mots</Text>
              </View>
            </Animated.View>

            <Text style={styles.title}>Bienvenue !</Text>
            <Text style={styles.subtitle}>Commence ton voyage linguistique</Text>

            <View style={styles.section}>
              <Text style={styles.label}>Ton prénom</Text>
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Entrez votre prénom..."
                placeholderTextColor={colors.textMuted}
                maxLength={30}
                returnKeyType="done"
              />
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>Choisis ton avatar</Text>
              <View style={styles.avatarGrid}>
                {AVATARS.map(a => (
                  <TouchableOpacity
                    key={a}
                    style={[styles.avatarItem, avatar === a && styles.avatarSelected]}
                    onPress={() => setAvatar(a)}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.avatarEmoji}>{a}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <TouchableOpacity
              style={[styles.btn, !name.trim() && styles.btnDisabled]}
              onPress={() => name.trim() && setStep(2)}
              activeOpacity={0.85}
            >
              <Text style={styles.btnText}>Continuer</Text>
              <Ionicons name="arrow-forward" size={20} color={colors.white} />
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }

  // ── Étape 2 : choix de la langue ─────────────────────────────────────────
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.content}>
        <TouchableOpacity style={styles.backBtn} onPress={() => setStep(1)} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>

        <Text style={styles.title}>Quelle langue{'\n'}veux-tu apprendre ?</Text>

        <ScrollView style={{ flex: 1, marginTop: 16 }} showsVerticalScrollIndicator={false}>
          {SUPPORTED_LANGUAGES.map((lang, i) => (
            <Animated.View key={lang.code} entering={FadeInDown.delay(i * 45).springify().damping(16)}>
              <TouchableOpacity
                style={[styles.langCard, selectedLang === lang.code && styles.langCardSelected]}
                onPress={() => setSelectedLang(lang.code)}
                activeOpacity={0.7}
              >
                <View style={styles.langThumbWrap}>
                  {LANGUAGE_THUMBS[lang.code] && (
                    <Image source={LANGUAGE_THUMBS[lang.code]} style={styles.langThumb} resizeMode="cover" />
                  )}
                  <Text style={styles.langThumbFlag}>{lang.flag}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.langName, selectedLang === lang.code && { color: colors.primary }]}>
                    {lang.name}
                  </Text>
                  <Text style={styles.langNative}>{lang.nativeName}</Text>
                </View>
                <View style={[styles.diffBadge, { backgroundColor: diffColor(lang.difficulty) + '20' }]}>
                  <Text style={[styles.diffText, { color: diffColor(lang.difficulty) }]}>
                    {diffLabel(lang.difficulty)}
                  </Text>
                </View>
                {selectedLang === lang.code && (
                  <Ionicons name="checkmark-circle" size={22} color={colors.primary} style={{ marginLeft: 8 }} />
                )}
              </TouchableOpacity>
            </Animated.View>
          ))}
          <View style={{ height: 24 }} />
        </ScrollView>

        <TouchableOpacity
          style={[styles.btn, creating && styles.btnDisabled]}
          onPress={handleCreate}
          disabled={creating}
          activeOpacity={0.85}
        >
          {creating
            ? <ActivityIndicator color={colors.white} />
            : <>
                <Text style={styles.btnText}>C'est parti !</Text>
                <Text style={{ fontSize: 20 }}>🚀</Text>
              </>
          }
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  content: { flex: 1, paddingHorizontal: 24, paddingTop: 24, paddingBottom: 24 },
  // Contenu de la ScrollView (étape 1) : surtout PAS de flex:1 ici, sinon le
  // contenu est verrouillé à la hauteur de l'écran et le bouton devient
  // inatteignable sur mobile.
  scrollContent: { flexGrow: 1, paddingHorizontal: 24, paddingTop: 24, paddingBottom: 40 },

  heroBanner: {
    height: 170, borderRadius: borderRadius['2xl'], overflow: 'hidden',
    marginBottom: 24, justifyContent: 'flex-end', backgroundColor: colors.primary,
  },
  heroContent: { padding: 18 },
  heroLogo: { fontSize: 34 },
  heroAppName: { fontSize: fontSize['3xl'], fontWeight: '800', color: colors.white, marginTop: 2 },
  heroTagline: { fontSize: fontSize.sm, color: 'rgba(255,255,255,0.9)', marginTop: 4 },

  title: { fontSize: fontSize['4xl'], fontWeight: '800', color: colors.text, lineHeight: 44, marginBottom: 8 },
  subtitle: { fontSize: fontSize.base, color: colors.textMuted, marginBottom: 32 },

  backBtn: { marginBottom: 16 },

  section: { marginBottom: 28 },
  label: {
    fontSize: fontSize.sm, fontWeight: '700', color: colors.text,
    textTransform: 'uppercase', letterSpacing: 1, marginBottom: 10,
  },

  input: {
    backgroundColor: colors.card, borderWidth: 1.5, borderColor: colors.border,
    borderRadius: borderRadius.xl, paddingHorizontal: 16, paddingVertical: 14,
    fontSize: fontSize.md, color: colors.text,
  },

  avatarGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  avatarItem: {
    width: 52, height: 52, borderRadius: borderRadius.lg,
    backgroundColor: colors.card, borderWidth: 2, borderColor: colors.border,
    justifyContent: 'center', alignItems: 'center',
  },
  avatarSelected: { borderColor: colors.primary, backgroundColor: `${colors.primary}12` },
  avatarEmoji: { fontSize: 26 },

  langCard: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    backgroundColor: colors.card, borderRadius: borderRadius.xl,
    borderWidth: 1.5, borderColor: colors.border,
    padding: 14, marginBottom: 8,
  },
  langCardSelected: { borderColor: colors.primary, backgroundColor: `${colors.primary}08` },
  langThumbWrap: { width: 48, height: 48, borderRadius: borderRadius.lg, overflow: 'hidden', backgroundColor: `${colors.primary}10`, justifyContent: 'flex-end', alignItems: 'flex-end' },
  langThumb: { ...StyleSheet.absoluteFillObject },
  langThumbFlag: { fontSize: 18, margin: 2, textShadowColor: 'rgba(0,0,0,0.4)', textShadowOffset: { width: 0, height: 1 }, textShadowRadius: 3 },
  langName: { fontSize: fontSize.base, fontWeight: '700', color: colors.text },
  langNative: { fontSize: fontSize.sm, color: colors.textMuted, marginTop: 2 },
  diffBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: borderRadius.full },
  diffText: { fontSize: fontSize.xs, fontWeight: '700' },

  btn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    backgroundColor: colors.primary, borderRadius: borderRadius['2xl'],
    paddingVertical: 16, marginTop: 12,
  },
  btnDisabled: { opacity: 0.45 },
  btnText: { color: colors.white, fontSize: fontSize.base, fontWeight: '800' },
});
