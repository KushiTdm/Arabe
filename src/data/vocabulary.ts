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

export const STATIC_VOCAB: VocabMap = {
  greetings: [
    { arabic_word: 'مرحبا',       transliteration: 'marhaba',       french_translation: 'Bonjour',             category: 'greetings' },
    { arabic_word: 'السلام عليكم',transliteration: 'as-salamu alaykum', french_translation: 'Que la paix soit sur vous', category: 'greetings' },
    { arabic_word: 'أهلا',        transliteration: 'ahlan',         french_translation: 'Bienvenue / Salut',   category: 'greetings' },
    { arabic_word: 'صباح الخير',  transliteration: 'sabah al-khayr',french_translation: 'Bonjour (matin)',     category: 'greetings' },
    { arabic_word: 'مساء الخير',  transliteration: 'masa al-khayr', french_translation: 'Bonsoir',             category: 'greetings' },
    { arabic_word: 'كيف حالك',    transliteration: 'kayfa halak',   french_translation: 'Comment vas-tu ?',    category: 'greetings' },
    { arabic_word: 'بخير',        transliteration: 'bikhayr',       french_translation: 'Bien',                category: 'greetings' },
    { arabic_word: 'شكرا',        transliteration: 'shukran',       french_translation: 'Merci',               category: 'greetings' },
    { arabic_word: 'من فضلك',     transliteration: 'min fadlak',    french_translation: 'S\'il vous plaît',    category: 'greetings' },
    { arabic_word: 'مع السلامة',  transliteration: 'ma\' as-salama',french_translation: 'Au revoir',           category: 'greetings' },
  ],
  numbers: [
    { arabic_word: 'واحد',  transliteration: 'wahid',  french_translation: 'Un',    category: 'numbers' },
    { arabic_word: 'اثنان', transliteration: 'ithnan', french_translation: 'Deux',  category: 'numbers' },
    { arabic_word: 'ثلاثة', transliteration: 'thalatha',french_translation: 'Trois', category: 'numbers' },
    { arabic_word: 'أربعة', transliteration: 'arba\'a',french_translation: 'Quatre',category: 'numbers' },
    { arabic_word: 'خمسة',  transliteration: 'khamsa', french_translation: 'Cinq',  category: 'numbers' },
    { arabic_word: 'ستة',   transliteration: 'sitta',  french_translation: 'Six',   category: 'numbers' },
    { arabic_word: 'سبعة',  transliteration: 'sab\'a', french_translation: 'Sept',  category: 'numbers' },
    { arabic_word: 'ثمانية',transliteration: 'thamaniya',french_translation: 'Huit',category: 'numbers' },
    { arabic_word: 'تسعة',  transliteration: 'tis\'a', french_translation: 'Neuf',  category: 'numbers' },
    { arabic_word: 'عشرة',  transliteration: '\'ashara',french_translation: 'Dix',  category: 'numbers' },
  ],
  family: [
    { arabic_word: 'أب',    transliteration: 'ab',      french_translation: 'Père',       category: 'family' },
    { arabic_word: 'أم',    transliteration: 'umm',     french_translation: 'Mère',       category: 'family' },
    { arabic_word: 'أخ',    transliteration: 'akh',     french_translation: 'Frère',      category: 'family' },
    { arabic_word: 'أخت',   transliteration: 'ukht',    french_translation: 'Sœur',       category: 'family' },
    { arabic_word: 'ابن',   transliteration: 'ibn',     french_translation: 'Fils',       category: 'family' },
    { arabic_word: 'بنت',   transliteration: 'bint',    french_translation: 'Fille',      category: 'family' },
    { arabic_word: 'جد',    transliteration: 'jadd',    french_translation: 'Grand-père', category: 'family' },
    { arabic_word: 'جدة',   transliteration: 'jadda',   french_translation: 'Grand-mère', category: 'family' },
    { arabic_word: 'عم',    transliteration: '\'amm',   french_translation: 'Oncle',      category: 'family' },
    { arabic_word: 'عمة',   transliteration: '\'amma',  french_translation: 'Tante',      category: 'family' },
  ],
  food: [
    { arabic_word: 'خبز',   transliteration: 'khubz',  french_translation: 'Pain',    category: 'food' },
    { arabic_word: 'ماء',   transliteration: 'ma\'',   french_translation: 'Eau',     category: 'food' },
    { arabic_word: 'حليب',  transliteration: 'halib',  french_translation: 'Lait',    category: 'food' },
    { arabic_word: 'أرز',   transliteration: 'arruz',  french_translation: 'Riz',     category: 'food' },
    { arabic_word: 'لحم',   transliteration: 'lahm',   french_translation: 'Viande',  category: 'food' },
    { arabic_word: 'سمك',   transliteration: 'samak',  french_translation: 'Poisson', category: 'food' },
    { arabic_word: 'دجاج',  transliteration: 'dajaj',  french_translation: 'Poulet',  category: 'food' },
    { arabic_word: 'فاكهة', transliteration: 'fakiha', french_translation: 'Fruit',   category: 'food' },
    { arabic_word: 'خضار',  transliteration: 'khudar', french_translation: 'Légumes', category: 'food' },
    { arabic_word: 'قهوة',  transliteration: 'qahwa',  french_translation: 'Café',    category: 'food' },
  ],
  travel: [
    { arabic_word: 'مطار',     transliteration: 'matar',      french_translation: 'Aéroport',  category: 'travel' },
    { arabic_word: 'فندق',     transliteration: 'funduq',     french_translation: 'Hôtel',     category: 'travel' },
    { arabic_word: 'طريق',     transliteration: 'tariq',      french_translation: 'Route',     category: 'travel' },
    { arabic_word: 'قطار',     transliteration: 'qitar',      french_translation: 'Train',     category: 'travel' },
    { arabic_word: 'سيارة',    transliteration: 'sayyara',    french_translation: 'Voiture',   category: 'travel' },
    { arabic_word: 'تذكرة',    transliteration: 'tadhkira',   french_translation: 'Billet',    category: 'travel' },
    { arabic_word: 'جواز سفر', transliteration: 'jawaz safar',french_translation: 'Passeport', category: 'travel' },
    { arabic_word: 'خريطة',    transliteration: 'kharita',    french_translation: 'Carte',     category: 'travel' },
    { arabic_word: 'محطة',     transliteration: 'mahatta',    french_translation: 'Gare',      category: 'travel' },
    { arabic_word: 'مدينة',    transliteration: 'madina',     french_translation: 'Ville',     category: 'travel' },
  ],
  daily_life: [
    { arabic_word: 'بيت',   transliteration: 'bayt',   french_translation: 'Maison',  category: 'daily_life' },
    { arabic_word: 'مدرسة', transliteration: 'madrasa',french_translation: 'École',   category: 'daily_life' },
    { arabic_word: 'عمل',   transliteration: '\'amal', french_translation: 'Travail', category: 'daily_life' },
    { arabic_word: 'كتاب',  transliteration: 'kitab',  french_translation: 'Livre',   category: 'daily_life' },
    { arabic_word: 'قلم',   transliteration: 'qalam',  french_translation: 'Stylo',   category: 'daily_life' },
    { arabic_word: 'هاتف',  transliteration: 'hatif',  french_translation: 'Téléphone',category: 'daily_life' },
    { arabic_word: 'صديق',  transliteration: 'sadiq',  french_translation: 'Ami',     category: 'daily_life' },
    { arabic_word: 'وقت',   transliteration: 'waqt',   french_translation: 'Temps',   category: 'daily_life' },
    { arabic_word: 'يوم',   transliteration: 'yawm',   french_translation: 'Jour',    category: 'daily_life' },
    { arabic_word: 'ليل',   transliteration: 'layl',   french_translation: 'Nuit',    category: 'daily_life' },
  ],
  colors: [
    { arabic_word: 'أحمر',  transliteration: 'ahmar',  french_translation: 'Rouge',   category: 'colors' },
    { arabic_word: 'أزرق',  transliteration: 'azraq',  french_translation: 'Bleu',    category: 'colors' },
    { arabic_word: 'أخضر',  transliteration: 'akhdar', french_translation: 'Vert',    category: 'colors' },
    { arabic_word: 'أصفر',  transliteration: 'asfar',  french_translation: 'Jaune',   category: 'colors' },
    { arabic_word: 'أبيض',  transliteration: 'abyad',  french_translation: 'Blanc',   category: 'colors' },
    { arabic_word: 'أسود',  transliteration: 'aswad',  french_translation: 'Noir',    category: 'colors' },
    { arabic_word: 'بني',   transliteration: 'bunni',  french_translation: 'Marron',  category: 'colors' },
    { arabic_word: 'برتقالي',transliteration: 'burtuqali',french_translation: 'Orange',category: 'colors' },
    { arabic_word: 'وردي',  transliteration: 'wardi',  french_translation: 'Rose',    category: 'colors' },
    { arabic_word: 'رمادي', transliteration: 'ramadi', french_translation: 'Gris',    category: 'colors' },
  ],
  animals: [
    { arabic_word: 'كلب',   transliteration: 'kalb',   french_translation: 'Chien',   category: 'animals' },
    { arabic_word: 'قطة',   transliteration: 'qitta',  french_translation: 'Chat',    category: 'animals' },
    { arabic_word: 'حصان',  transliteration: 'hisan',  french_translation: 'Cheval',  category: 'animals' },
    { arabic_word: 'بقرة',  transliteration: 'baqara', french_translation: 'Vache',   category: 'animals' },
    { arabic_word: 'أسد',   transliteration: 'asad',   french_translation: 'Lion',    category: 'animals' },
    { arabic_word: 'فيل',   transliteration: 'fil',    french_translation: 'Éléphant',category: 'animals' },
    { arabic_word: 'طائر',  transliteration: 'ta\'ir', french_translation: 'Oiseau',  category: 'animals' },
    { arabic_word: 'سمكة',  transliteration: 'samaka', french_translation: 'Poisson', category: 'animals' },
    { arabic_word: 'أرنب',  transliteration: 'arnab',  french_translation: 'Lapin',   category: 'animals' },
    { arabic_word: 'دجاجة', transliteration: 'dajaja', french_translation: 'Poule',   category: 'animals' },
  ],
};

/** Retourne les mots d'une catégorie enrichis d'un id unique */
export function getWordsForCategory(category: string): VocabWord[] {
  const words = STATIC_VOCAB[category] ?? [];
  return words.map((w, i) => ({
    ...w,
    id: `${category}_${i}`,
    mastered: false,
    practice_count: 0,
  }));
}