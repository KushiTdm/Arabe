// Mot arabe (voyellé, tel qu'écrit dans les leçons) → clé d'illustration.
// Sans `require` : ce fichier est lu aussi par les scripts de vérification.
// Les fichiers sont dans assets/images/vocab/ (voir images.ts, docs/visuels-arabe.md).
export const IMG_KEY_BY_AR: Record<string, string> = {
  'بَيْت': 'house', 'دَار': 'house',
  'تِين': 'fig', 'ثَوْب': 'robe', 'بَاب': 'door', 'يَد': 'hand',
  'خُبْز': 'bread', 'حُوت': 'whale', 'شَاي': 'tea', 'شَجَر': 'tree',
  'عَيْن': 'eye', 'قَلْب': 'heart', 'فِيل': 'elephant', 'قَلَم': 'pen',
  'قَمَر': 'moon', 'شَمْس': 'sun', 'كِتَاب': 'book', 'كَلْب': 'dog',
  'طَيْر': 'bird', 'سَمَك': 'fish', 'جَمَل': 'camel', 'حِصَان': 'horse',
  'مِفْتَاح': 'key', 'وَلَد': 'boy', 'بِنْت': 'girl', 'شَارِع': 'street',
  'أَب': 'father', 'أُمّ': 'mother', 'أَخ': 'brother', 'أُخْت': 'sister',
  'المَدْرَسَة': 'school', 'السُّوق': 'market', 'المُسْتَشْفَى': 'hospital', 'المَسْجِد': 'mosque',
  'أُرِيد مَاء': 'water', 'مَاء': 'water', 'أُرِيد خُبْز': 'bread', 'أُرِيد قَهْوَة': 'coffee',
  'قَهْوَة': 'coffee', 'طَاوِلَة': 'table',
  'أُحِبُّ القَهْوَة': 'coffee', 'أُفَضِّلُ العَصِير': 'juice', 'تُفَّاحَة': 'apple', 'مَوْزَة': 'banana', 'حَلِيب': 'milk',
  'اِشْتَرَيْتُ خُبْزاً': 'bread', 'ذَهَبْتُ إِلَى السُّوق': 'market', 'أُرِيدُ سَمَكاً': 'fish',
  'أَرْجِعُ إِلَى البَيْت': 'house', 'مَاء مِنْ فَضْلِكَ': 'water',
  // Formes avec article ou tanwīn d'un mot déjà illustré
  'مَدْرَسَة': 'school', 'مَسْجِد': 'mosque', 'سُوق': 'market', 'مُسْتَشْفَى': 'hospital',
  'القَمَر': 'moon', 'الكِتَاب': 'book', 'الشَّمْس': 'sun', 'بَيْتٌ': 'house', 'كِتَابٌ': 'book',
  'رَأْس': 'head', 'وَرْد': 'rose', 'غُرَاب': 'raven', 'الشَّاي': 'tea', 'القَهْوَة': 'coffee',
  // Photos ajoutées pour les mots concrets du lexique
  'بَيْض': 'eggs', 'مِلْح': 'salt', 'خَرُوف': 'sheep', 'ظَبْي': 'gazelle', 'سَيْف': 'sword', 'شَعْر': 'hair',
  'قَدَم': 'foot', 'فَم': 'mouth', 'بَحْر': 'sea', 'سَاعَة': 'clock', 'مَكْتَبَة': 'library',
  'جَامِعَة': 'university', 'حِبْر': 'ink', 'مُعَلِّم': 'teacher', 'أُسْتَاذ': 'teacher', 'مُدَرِّس': 'teacher',
  'طَالِب': 'student', 'أَنَا طَالِب': 'student', 'مَدِينَة': 'city',
  // Scènes des unités orales
  'السَّلَامُ عَلَيْكُمْ': 'handshake', 'صَبَاحُ الخَيْر': 'sunrise', 'مَسَاءُ الخَيْر': 'sunset',
  'بِكَمْ هٰذَا؟': 'money', 'خَمْسَةُ يُورُو': 'money', 'أَنَا عَطْشَان': 'drinking',
};

/** Mot-clé illustré de chaque lettre (carte « Nouvelle lettre »). */
export const LETTER_IMG: Record<string, string> = {
  'ا': 'father', 'ب': 'door', 'ت': 'fig', 'ث': 'fox', 'ج': 'camel', 'ح': 'horse', 'خ': 'bread',
  'د': 'hen', 'ذ': 'gold', 'ر': 'head', 'ز': 'flowers', 'س': 'fish', 'ش': 'sun', 'ص': 'falcon',
  'ض': 'frog', 'ط': 'bird', 'ظ': 'nails', 'ع': 'eye', 'غ': 'raven', 'ف': 'elephant', 'ق': 'moon',
  'ك': 'book', 'ل': 'lemon', 'م': 'water', 'ن': 'star', 'ه': 'crescent', 'و': 'rose', 'ي': 'hand',
};
