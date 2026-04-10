import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Speech from 'expo-speech';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors, borderRadius, fontSize, spacing } from '../theme';
import { Card } from '../components/RNComponents';

// ─── Types ───────────────────────────────────────────────────────────────────

export interface VocabWord {
  id: string;
  arabic_word: string;
  transliteration: string;
  french_translation: string;
  category: string;
  mastered: boolean;
  practice_count: number;
}

type VocabMap = Record<string, Omit<VocabWord, 'id' | 'mastered' | 'practice_count'>[]>;

// ─── Static vocabulary data ───────────────────────────────────────────────────

export const STATIC_VOCAB: VocabMap = {
  greetings: [
    { arabic_word: 'مرحبا',         transliteration: 'marhaba',           french_translation: 'Bonjour',                  category: 'greetings' },
    { arabic_word: 'السلام عليكم',  transliteration: 'as-salamu alaykum', french_translation: 'Que la paix soit sur vous', category: 'greetings' },
    { arabic_word: 'وعليكم السلام', transliteration: 'wa alaykum as-salam',french_translation: 'Et sur vous la paix',      category: 'greetings' },
    { arabic_word: 'أهلا',          transliteration: 'ahlan',             french_translation: 'Bienvenue / Salut',          category: 'greetings' },
    { arabic_word: 'صباح الخير',    transliteration: 'sabah al-khayr',    french_translation: 'Bonjour (matin)',             category: 'greetings' },
    { arabic_word: 'مساء الخير',    transliteration: 'masa al-khayr',     french_translation: 'Bonsoir',                    category: 'greetings' },
    { arabic_word: 'كيف حالك',      transliteration: 'kayfa halak',       french_translation: 'Comment vas-tu ?',            category: 'greetings' },
    { arabic_word: 'بخير شكرا',     transliteration: 'bikhayr shukran',   french_translation: 'Bien, merci',                 category: 'greetings' },
    { arabic_word: 'الحمد لله',     transliteration: 'al-hamdu lillah',   french_translation: 'Dieu merci / Grâce à Dieu',  category: 'greetings' },
    { arabic_word: 'شكرا',          transliteration: 'shukran',           french_translation: 'Merci',                       category: 'greetings' },
    { arabic_word: 'شكرا جزيلا',    transliteration: 'shukran jazilan',   french_translation: 'Merci beaucoup',              category: 'greetings' },
    { arabic_word: 'عفواً',         transliteration: "'afwan",            french_translation: 'De rien / Pardon',            category: 'greetings' },
    { arabic_word: 'من فضلك',       transliteration: 'min fadlak',        french_translation: "S'il vous plaît",             category: 'greetings' },
    { arabic_word: 'مع السلامة',    transliteration: "ma' as-salama",     french_translation: 'Au revoir',                   category: 'greetings' },
    { arabic_word: 'إلى اللقاء',    transliteration: "ila al-liqa'",      french_translation: 'À bientôt',                   category: 'greetings' },
    { arabic_word: 'تصبح على خير',  transliteration: 'tusbih ala khayr',  french_translation: 'Bonne nuit',                  category: 'greetings' },
    { arabic_word: 'اسمي',          transliteration: 'ismi',              french_translation: "Je m'appelle",                category: 'greetings' },
    { arabic_word: 'تشرفنا',        transliteration: 'tasharrafna',       french_translation: 'Enchanté(e)',                  category: 'greetings' },
  ],
  numbers: [
    { arabic_word: 'صفر',    transliteration: 'sifr',      french_translation: 'Zéro',     category: 'numbers' },
    { arabic_word: 'واحد',   transliteration: 'wahid',     french_translation: 'Un',        category: 'numbers' },
    { arabic_word: 'اثنان',  transliteration: 'ithnan',    french_translation: 'Deux',      category: 'numbers' },
    { arabic_word: 'ثلاثة',  transliteration: 'thalatha',  french_translation: 'Trois',     category: 'numbers' },
    { arabic_word: 'أربعة',  transliteration: "arba'a",    french_translation: 'Quatre',    category: 'numbers' },
    { arabic_word: 'خمسة',   transliteration: 'khamsa',    french_translation: 'Cinq',      category: 'numbers' },
    { arabic_word: 'ستة',    transliteration: 'sitta',     french_translation: 'Six',       category: 'numbers' },
    { arabic_word: 'سبعة',   transliteration: "sab'a",     french_translation: 'Sept',      category: 'numbers' },
    { arabic_word: 'ثمانية', transliteration: 'thamaniya', french_translation: 'Huit',      category: 'numbers' },
    { arabic_word: 'تسعة',   transliteration: "tis'a",     french_translation: 'Neuf',      category: 'numbers' },
    { arabic_word: 'عشرة',   transliteration: "'ashara",   french_translation: 'Dix',       category: 'numbers' },
    { arabic_word: 'عشرون',  transliteration: "'ishrun",   french_translation: 'Vingt',     category: 'numbers' },
    { arabic_word: 'خمسون',  transliteration: 'khamsun',   french_translation: 'Cinquante', category: 'numbers' },
    { arabic_word: 'مئة',    transliteration: "mi'a",      french_translation: 'Cent',      category: 'numbers' },
    { arabic_word: 'ألف',    transliteration: 'alf',       french_translation: 'Mille',     category: 'numbers' },
  ],
  family: [
    { arabic_word: 'أب',    transliteration: 'ab',      french_translation: 'Père',            category: 'family' },
    { arabic_word: 'أم',    transliteration: 'umm',     french_translation: 'Mère',            category: 'family' },
    { arabic_word: 'أخ',    transliteration: 'akh',     french_translation: 'Frère',           category: 'family' },
    { arabic_word: 'أخت',   transliteration: 'ukht',    french_translation: 'Sœur',            category: 'family' },
    { arabic_word: 'ابن',   transliteration: 'ibn',     french_translation: 'Fils',            category: 'family' },
    { arabic_word: 'بنت',   transliteration: 'bint',    french_translation: 'Fille',           category: 'family' },
    { arabic_word: 'جد',    transliteration: 'jadd',    french_translation: 'Grand-père',      category: 'family' },
    { arabic_word: 'جدة',   transliteration: 'jadda',   french_translation: 'Grand-mère',      category: 'family' },
    { arabic_word: 'عم',    transliteration: "'amm",    french_translation: 'Oncle paternel',  category: 'family' },
    { arabic_word: 'عمة',   transliteration: "'amma",   french_translation: 'Tante paternelle',category: 'family' },
    { arabic_word: 'زوج',   transliteration: 'zawj',    french_translation: 'Mari',            category: 'family' },
    { arabic_word: 'زوجة',  transliteration: 'zawja',   french_translation: 'Femme (épouse)',  category: 'family' },
    { arabic_word: 'عائلة', transliteration: "'a'ila",  french_translation: 'Famille',         category: 'family' },
    { arabic_word: 'طفل',   transliteration: 'tifl',    french_translation: 'Enfant',          category: 'family' },
  ],
  food: [
    { arabic_word: 'خبز',    transliteration: 'khubz',   french_translation: 'Pain',           category: 'food' },
    { arabic_word: 'ماء',    transliteration: "ma'",     french_translation: 'Eau',            category: 'food' },
    { arabic_word: 'حليب',   transliteration: 'halib',   french_translation: 'Lait',           category: 'food' },
    { arabic_word: 'أرز',    transliteration: 'arruz',   french_translation: 'Riz',            category: 'food' },
    { arabic_word: 'لحم',    transliteration: 'lahm',    french_translation: 'Viande',         category: 'food' },
    { arabic_word: 'سمك',    transliteration: 'samak',   french_translation: 'Poisson',        category: 'food' },
    { arabic_word: 'دجاج',   transliteration: 'dajaj',   french_translation: 'Poulet',         category: 'food' },
    { arabic_word: 'فاكهة',  transliteration: 'fakiha',  french_translation: 'Fruit',          category: 'food' },
    { arabic_word: 'خضار',   transliteration: 'khudar',  french_translation: 'Légumes',        category: 'food' },
    { arabic_word: 'قهوة',   transliteration: 'qahwa',   french_translation: 'Café',           category: 'food' },
    { arabic_word: 'شاي',    transliteration: 'shay',    french_translation: 'Thé',            category: 'food' },
    { arabic_word: 'تفاح',   transliteration: 'tuffah',  french_translation: 'Pomme',          category: 'food' },
    { arabic_word: 'موز',    transliteration: 'mawz',    french_translation: 'Banane',         category: 'food' },
    { arabic_word: 'بيض',    transliteration: 'bayd',    french_translation: 'Œufs',           category: 'food' },
    { arabic_word: 'حلوى',   transliteration: 'halwa',   french_translation: 'Dessert',        category: 'food' },
  ],
  travel: [
    { arabic_word: 'مطار',     transliteration: 'matar',       french_translation: 'Aéroport',  category: 'travel' },
    { arabic_word: 'فندق',     transliteration: 'funduq',      french_translation: 'Hôtel',     category: 'travel' },
    { arabic_word: 'قطار',     transliteration: 'qitar',       french_translation: 'Train',     category: 'travel' },
    { arabic_word: 'سيارة',    transliteration: 'sayyara',     french_translation: 'Voiture',   category: 'travel' },
    { arabic_word: 'تذكرة',    transliteration: 'tadhkira',    french_translation: 'Billet',    category: 'travel' },
    { arabic_word: 'جواز سفر', transliteration: 'jawaz safar', french_translation: 'Passeport', category: 'travel' },
    { arabic_word: 'مدينة',    transliteration: 'madina',      french_translation: 'Ville',     category: 'travel' },
    { arabic_word: 'طائرة',    transliteration: "ta'ira",      french_translation: 'Avion',     category: 'travel' },
    { arabic_word: 'حافلة',    transliteration: 'hafila',      french_translation: 'Bus',       category: 'travel' },
    { arabic_word: 'بحر',      transliteration: 'bahr',        french_translation: 'Mer',       category: 'travel' },
    { arabic_word: 'مسجد',     transliteration: 'masjid',      french_translation: 'Mosquée',   category: 'travel' },
    { arabic_word: 'سوق',      transliteration: 'suq',         french_translation: 'Marché / Souk', category: 'travel' },
    { arabic_word: 'يسار',     transliteration: 'yasar',       french_translation: 'Gauche',    category: 'travel' },
    { arabic_word: 'يمين',     transliteration: 'yamin',       french_translation: 'Droite',    category: 'travel' },
  ],
  daily_life: [
    { arabic_word: 'بيت',   transliteration: 'bayt',    french_translation: 'Maison',       category: 'daily_life' },
    { arabic_word: 'مدرسة', transliteration: 'madrasa', french_translation: 'École',        category: 'daily_life' },
    { arabic_word: 'كتاب',  transliteration: 'kitab',   french_translation: 'Livre',        category: 'daily_life' },
    { arabic_word: 'قلم',   transliteration: 'qalam',   french_translation: 'Stylo',        category: 'daily_life' },
    { arabic_word: 'هاتف',  transliteration: 'hatif',   french_translation: 'Téléphone',    category: 'daily_life' },
    { arabic_word: 'يوم',   transliteration: 'yawm',    french_translation: 'Jour',         category: 'daily_life' },
    { arabic_word: 'ليل',   transliteration: 'layl',    french_translation: 'Nuit',         category: 'daily_life' },
    { arabic_word: 'اليوم', transliteration: 'al-yawm', french_translation: "Aujourd'hui",  category: 'daily_life' },
    { arabic_word: 'غدا',   transliteration: 'ghadan',  french_translation: 'Demain',       category: 'daily_life' },
    { arabic_word: 'أمس',   transliteration: 'ams',     french_translation: 'Hier',         category: 'daily_life' },
    { arabic_word: 'صديق',  transliteration: 'sadiq',   french_translation: 'Ami',          category: 'daily_life' },
    { arabic_word: 'درس',   transliteration: 'darasa',  french_translation: 'Étudier',      category: 'daily_life' },
  ],
  colors: [
    { arabic_word: 'أحمر',    transliteration: 'ahmar',     french_translation: 'Rouge',    category: 'colors' },
    { arabic_word: 'أزرق',    transliteration: 'azraq',     french_translation: 'Bleu',     category: 'colors' },
    { arabic_word: 'أخضر',    transliteration: 'akhdar',    french_translation: 'Vert',     category: 'colors' },
    { arabic_word: 'أصفر',    transliteration: 'asfar',     french_translation: 'Jaune',    category: 'colors' },
    { arabic_word: 'أبيض',    transliteration: 'abyad',     french_translation: 'Blanc',    category: 'colors' },
    { arabic_word: 'أسود',    transliteration: 'aswad',     french_translation: 'Noir',     category: 'colors' },
    { arabic_word: 'بني',     transliteration: 'bunni',     french_translation: 'Marron',   category: 'colors' },
    { arabic_word: 'برتقالي', transliteration: 'burtuqali', french_translation: 'Orange',   category: 'colors' },
    { arabic_word: 'وردي',    transliteration: 'wardi',     french_translation: 'Rose',     category: 'colors' },
    { arabic_word: 'رمادي',   transliteration: 'ramadi',    french_translation: 'Gris',     category: 'colors' },
  ],
  animals: [
    { arabic_word: 'كلب',   transliteration: 'kalb',    french_translation: 'Chien',    category: 'animals' },
    { arabic_word: 'قطة',   transliteration: 'qitta',   french_translation: 'Chat',     category: 'animals' },
    { arabic_word: 'حصان',  transliteration: 'hisan',   french_translation: 'Cheval',   category: 'animals' },
    { arabic_word: 'بقرة',  transliteration: 'baqara',  french_translation: 'Vache',    category: 'animals' },
    { arabic_word: 'أسد',   transliteration: 'asad',    french_translation: 'Lion',     category: 'animals' },
    { arabic_word: 'فيل',   transliteration: 'fil',     french_translation: 'Éléphant', category: 'animals' },
    { arabic_word: 'طائر',  transliteration: "ta'ir",   french_translation: 'Oiseau',   category: 'animals' },
    { arabic_word: 'أرنب',  transliteration: 'arnab',   french_translation: 'Lapin',    category: 'animals' },
    { arabic_word: 'دجاجة', transliteration: 'dajaja',  french_translation: 'Poule',    category: 'animals' },
    { arabic_word: 'جمل',   transliteration: 'jamal',   french_translation: 'Chameau',  category: 'animals' },
    { arabic_word: 'نمر',   transliteration: 'namir',   french_translation: 'Tigre',    category: 'animals' },
    { arabic_word: 'ثعلب',  transliteration: "tha'lab", french_translation: 'Renard',   category: 'animals' },
  ],
};

export function getWordsForCategory(category: string): VocabWord[] {
  const words = STATIC_VOCAB[category] ?? [];
  return words.map((w, i) => ({
    ...w,
    id: `${category}_${i}`,
    mastered: false,
    practice_count: 0,
  }));
}

export const ALL_CATEGORIES = Object.keys(STATIC_VOCAB);
export const TOTAL_WORDS = Object.values(STATIC_VOCAB).reduce((acc, words) => acc + words.length, 0);

// ─── Category metadata ────────────────────────────────────────────────────────

const CATEGORY_META: Record<string, { label: string; emoji: string; arabic: string }> = {
  greetings:  { label: 'Salutations',     emoji: '👋', arabic: 'التحيات' },
  numbers:    { label: 'Nombres',          emoji: '🔢', arabic: 'الأرقام' },
  family:     { label: 'Famille',          emoji: '👨‍👩‍👧', arabic: 'العائلة' },
  food:       { label: 'Nourriture',       emoji: '🍕', arabic: 'الطعام' },
  travel:     { label: 'Voyage',           emoji: '✈️', arabic: 'السفر' },
  daily_life: { label: 'Vie quotidienne',  emoji: '☀️', arabic: 'الحياة اليومية' },
  colors:     { label: 'Couleurs',         emoji: '🎨', arabic: 'الألوان' },
  animals:    { label: 'Animaux',          emoji: '🐱', arabic: 'الحيوانات' },
};

const MASTERED_KEY = '@maa_mastered_words';

// ─── Main screen component ────────────────────────────────────────────────────

export default function VocabularyScreen() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [mode, setMode] = useState<'browse' | 'flashcard'>('browse');
  const [flashcardIndex, setFlashcardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [masteredIds, setMasteredIds] = useState<Set<string>>(new Set());
  const [search, setSearch] = useState('');

  // Load mastered words from storage
  React.useEffect(() => {
    AsyncStorage.getItem(MASTERED_KEY).then(raw => {
      if (raw) setMasteredIds(new Set(JSON.parse(raw)));
    });
  }, []);

  const speakArabic = (text: string) => {
    Speech.speak(text, { language: 'ar-SA', rate: 0.85 });
  };

  const toggleMastered = async (id: string) => {
    const updated = new Set(masteredIds);
    if (updated.has(id)) {
      updated.delete(id);
    } else {
      updated.add(id);
    }
    setMasteredIds(updated);
    await AsyncStorage.setItem(MASTERED_KEY, JSON.stringify([...updated]));
  };

  // ── FLASHCARD MODE ────────────────────────────────────────────────────
  if (selectedCategory && mode === 'flashcard') {
    const words = getWordsForCategory(selectedCategory);
    const word = words[flashcardIndex];
    const isMastered = masteredIds.has(word.id);

    const next = async (mark: boolean) => {
      if (mark) await toggleMastered(word.id);
      if (flashcardIndex < words.length - 1) {
        setFlashcardIndex(i => i + 1);
        setShowAnswer(false);
      } else {
        setMode('browse');
        setFlashcardIndex(0);
        setShowAnswer(false);
      }
    };

    return (
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => { setMode('browse'); setFlashcardIndex(0); }} style={styles.backBtn}>
              <Ionicons name="arrow-back" size={22} color={colors.text} />
            </TouchableOpacity>
            <View style={{ flex: 1 }}>
              <Text style={styles.headerTitle}>
                {CATEGORY_META[selectedCategory]?.emoji} Flashcards
              </Text>
              <Text style={styles.headerSubtitle}>
                {flashcardIndex + 1} / {words.length}
              </Text>
            </View>
          </View>

          {/* Progress bar */}
          <View style={styles.progressBg}>
            <View style={[styles.progressFill, { width: `${((flashcardIndex + 1) / words.length) * 100}%` as any }]} />
          </View>

          {/* Card */}
          <TouchableOpacity
            style={styles.flashCard}
            onPress={() => setShowAnswer(true)}
            activeOpacity={0.85}
          >
            {!showAnswer ? (
              <>
                <Text style={styles.flashArabic}>{word.arabic_word}</Text>
                <Text style={styles.flashHint}>Toucher pour voir la réponse</Text>
              </>
            ) : (
              <>
                <Text style={styles.flashArabic}>{word.arabic_word}</Text>
                <Text style={styles.flashTranslit}>{word.transliteration}</Text>
                <Text style={styles.flashFrench}>{word.french_translation}</Text>
                <TouchableOpacity onPress={() => speakArabic(word.arabic_word)} style={styles.speakBtn}>
                  <Ionicons name="volume-high" size={20} color={colors.primary} />
                </TouchableOpacity>
              </>
            )}
          </TouchableOpacity>

          {showAnswer && (
            <View style={styles.flashActions}>
              <TouchableOpacity style={styles.flashBtnRetry} onPress={() => next(false)}>
                <Ionicons name="refresh" size={18} color={colors.text} />
                <Text style={styles.flashBtnRetryText}>Revoir</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.flashBtnMastered} onPress={() => next(true)}>
                <Ionicons name="checkmark" size={18} color={colors.white} />
                <Text style={styles.flashBtnMasteredText}>Maîtrisé !</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </SafeAreaView>
    );
  }

  // ── BROWSE MODE (category selected) ──────────────────────────────────
  if (selectedCategory) {
    const allWords = getWordsForCategory(selectedCategory);
    const filtered = search.trim()
      ? allWords.filter(w =>
          w.arabic_word.includes(search) ||
          w.french_translation.toLowerCase().includes(search.toLowerCase()) ||
          w.transliteration.toLowerCase().includes(search.toLowerCase()),
        )
      : allWords;

    const masteredCount = allWords.filter(w => masteredIds.has(w.id)).length;
    const meta = CATEGORY_META[selectedCategory];

    return (
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => { setSelectedCategory(null); setSearch(''); }} style={styles.backBtn}>
              <Ionicons name="arrow-back" size={22} color={colors.text} />
            </TouchableOpacity>
            <View style={{ flex: 1 }}>
              <Text style={styles.headerTitle}>{meta?.emoji} {meta?.label}</Text>
              <Text style={styles.headerSubtitle}>
                {allWords.length} mots · {masteredCount} maîtrisés
              </Text>
            </View>
            <TouchableOpacity
              style={styles.flashcardBtn}
              onPress={() => { setMode('flashcard'); setFlashcardIndex(0); setShowAnswer(false); }}
            >
              <Ionicons name="layers" size={16} color={colors.white} />
              <Text style={styles.flashcardBtnText}>Flashcards</Text>
            </TouchableOpacity>
          </View>

          {/* Search */}
          <View style={styles.searchBar}>
            <Ionicons name="search" size={16} color={colors.textMuted} />
            <TextInput
              style={styles.searchInput}
              value={search}
              onChangeText={setSearch}
              placeholder="Rechercher..."
              placeholderTextColor={colors.textMuted}
            />
            {search.length > 0 && (
              <TouchableOpacity onPress={() => setSearch('')}>
                <Ionicons name="close-circle" size={16} color={colors.textMuted} />
              </TouchableOpacity>
            )}
          </View>

          {/* Word list */}
          <ScrollView contentContainerStyle={styles.wordList} showsVerticalScrollIndicator={false}>
            {filtered.map(word => {
              const isMastered = masteredIds.has(word.id);
              return (
                <View key={word.id} style={[styles.wordRow, isMastered && styles.wordRowMastered]}>
                  <View style={styles.wordLeft}>
                    <Text style={styles.wordArabic}>{word.arabic_word}</Text>
                    <Text style={styles.wordTranslit}>{word.transliteration}</Text>
                  </View>
                  <View style={styles.wordRight}>
                    <Text style={styles.wordFrench}>{word.french_translation}</Text>
                  </View>
                  <TouchableOpacity onPress={() => speakArabic(word.arabic_word)} style={styles.iconBtn}>
                    <Ionicons name="volume-high" size={18} color={colors.primary} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => toggleMastered(word.id)} style={styles.iconBtn}>
                    <Ionicons
                      name={isMastered ? 'checkmark-circle' : 'ellipse-outline'}
                      size={20}
                      color={isMastered ? colors.success : colors.textMuted}
                    />
                  </TouchableOpacity>
                </View>
              );
            })}
            <View style={{ height: 80 }} />
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }

  // ── CATEGORY SELECTION ────────────────────────────────────────────────
  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView contentContainerStyle={styles.categoryContent} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={{ flex: 1 }}>
            <Text style={styles.headerTitle}>Vocabulaire</Text>
            <Text style={styles.headerSubtitle}>{TOTAL_WORDS} mots · {ALL_CATEGORIES.length} catégories</Text>
          </View>
        </View>

        {/* Categories grid */}
        <View style={styles.grid}>
          {ALL_CATEGORIES.map(cat => {
            const meta = CATEGORY_META[cat];
            if (!meta) return null;
            const words = getWordsForCategory(cat);
            const masteredCount = words.filter(w => masteredIds.has(w.id)).length;
            const pct = Math.round((masteredCount / words.length) * 100);

            return (
              <TouchableOpacity
                key={cat}
                style={styles.catCard}
                onPress={() => { setSelectedCategory(cat); setSearch(''); }}
                activeOpacity={0.75}
              >
                <Text style={styles.catEmoji}>{meta.emoji}</Text>
                <Text style={styles.catLabel}>{meta.label}</Text>
                <Text style={styles.catArabic}>{meta.arabic}</Text>
                <Text style={styles.catCount}>{words.length} mots</Text>
                {/* Mini progress bar */}
                <View style={styles.miniProgressBg}>
                  <View style={[styles.miniProgressFill, { width: `${pct}%` as any }]} />
                </View>
                {masteredCount > 0 && (
                  <Text style={styles.catMastered}>{pct}% maîtrisé</Text>
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  container: { flex: 1, backgroundColor: colors.background },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
  },
  headerTitle: { fontSize: fontSize.xl, fontWeight: '700', color: colors.text },
  headerSubtitle: { fontSize: fontSize.xs, color: colors.textMuted, marginTop: 2 },
  backBtn: {
    padding: 8,
    borderRadius: borderRadius.md,
    backgroundColor: `${colors.textMuted}15`,
    marginRight: 10,
  },

  // Category grid
  categoryContent: { paddingHorizontal: 16, paddingBottom: 120 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  catCard: {
    width: '47%',
    backgroundColor: colors.card,
    borderRadius: borderRadius['2xl'],
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    alignItems: 'center',
  },
  catEmoji: { fontSize: 28, marginBottom: 6 },
  catLabel: { fontSize: fontSize.base, fontWeight: '700', color: colors.text, textAlign: 'center' },
  catArabic: { fontSize: fontSize.xs, color: colors.textMuted, marginTop: 2 },
  catCount: { fontSize: fontSize.xs, color: colors.primary, marginTop: 4, fontWeight: '600' },
  miniProgressBg: {
    width: '100%',
    height: 4,
    backgroundColor: `${colors.textMuted}20`,
    borderRadius: 2,
    overflow: 'hidden',
    marginTop: 8,
  },
  miniProgressFill: { height: '100%', backgroundColor: colors.success, borderRadius: 2 },
  catMastered: { fontSize: 9, color: colors.success, fontWeight: '700', marginTop: 4 },

  // Browse
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginHorizontal: 16,
    marginBottom: 12,
    gap: 8,
  },
  searchInput: { flex: 1, fontSize: fontSize.base, color: colors.text },

  flashcardBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: borderRadius.full,
  },
  flashcardBtnText: { color: colors.white, fontSize: fontSize.xs, fontWeight: '700' },

  wordList: { paddingHorizontal: 16 },
  wordRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 12,
    marginBottom: 8,
    gap: 8,
  },
  wordRowMastered: {
    borderColor: `${colors.success}40`,
    backgroundColor: `${colors.success}06`,
  },
  wordLeft: { flex: 1 },
  wordArabic: { fontSize: 22, fontWeight: '700', color: colors.text, textAlign: 'right' },
  wordTranslit: { fontSize: fontSize.xs, color: colors.primary, fontStyle: 'italic', textAlign: 'right' },
  wordRight: { flex: 1 },
  wordFrench: { fontSize: fontSize.base, fontWeight: '600', color: colors.text },
  iconBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: `${colors.primary}10`,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Flashcard
  progressBg: {
    height: 4,
    backgroundColor: `${colors.textMuted}20`,
    marginHorizontal: 16,
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: 20,
  },
  progressFill: { height: '100%', backgroundColor: colors.primary, borderRadius: 2 },

  flashCard: {
    marginHorizontal: 16,
    backgroundColor: colors.card,
    borderRadius: borderRadius['3xl'],
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: 48,
    paddingHorizontal: 24,
    alignItems: 'center',
    minHeight: 220,
    justifyContent: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  flashArabic: { fontSize: 52, fontWeight: '700', color: colors.text, textAlign: 'center', marginBottom: 8 },
  flashTranslit: { fontSize: fontSize.lg, color: colors.primary, fontStyle: 'italic', marginBottom: 8 },
  flashFrench: { fontSize: fontSize.xl, fontWeight: '700', color: colors.text, marginBottom: 16 },
  flashHint: { fontSize: fontSize.sm, color: colors.textMuted, marginTop: 16 },
  speakBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: `${colors.primary}12`,
    justifyContent: 'center',
    alignItems: 'center',
  },

  flashActions: {
    flexDirection: 'row',
    gap: 12,
    marginHorizontal: 16,
    marginTop: 20,
  },
  flashBtnRetry: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: colors.card,
    borderRadius: borderRadius['2xl'],
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: 14,
  },
  flashBtnRetryText: { fontSize: fontSize.base, fontWeight: '600', color: colors.text },
  flashBtnMastered: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: colors.success,
    borderRadius: borderRadius['2xl'],
    paddingVertical: 14,
  },
  flashBtnMasteredText: { fontSize: fontSize.base, fontWeight: '700', color: colors.white },
});