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
  'طَمَاطِم': 'tomato', 'عِنَب': 'grapes', 'فَرَاوِلَة': 'strawberry', 'بُرْتُقَال': 'orange', 'بَطَاطَا': 'potato', 'بَصَل': 'onion',
  'مَطَار': 'airplane',
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

/**
 * Mot français (sans article) → illustration. Sert à toutes les langues : un mot
 * dont la traduction est exactement l'un de ces noms reçoit la photo, même s'il
 * n'a pas de lien explicite. Uniquement des noms concrets sans ambiguïté.
 */
export const IMG_KEY_BY_FR: Record<string, string> = {
  'pain': 'bread', 'eau': 'water', 'lait': 'milk', 'café': 'coffee', 'thé': 'tea', 'poisson': 'fish', 'jus': 'juice',
  'œuf': 'eggs', 'œufs': 'eggs', 'pomme': 'apple', 'banane': 'banana', 'citron': 'lemon', 'sel': 'salt', 'figue': 'fig', 'figues': 'fig',
  'tomate': 'tomato', 'raisin': 'grapes', 'fraise': 'strawberry', 'fraises': 'strawberry', 'orange': 'orange',
  'pomme de terre': 'potato', 'pommes de terre': 'potato', 'oignon': 'onion',
  'maison': 'house', 'école': 'school', 'marché': 'market', 'hôpital': 'hospital', 'bibliothèque': 'library', 'ville': 'city',
  'rue': 'street', 'mosquée': 'mosque', 'université': 'university',
  'livre': 'book', 'stylo': 'pen', 'clé': 'key', 'porte': 'door', 'table': 'table', 'argent': 'money', 'horloge': 'clock',
  'chien': 'dog', 'oiseau': 'bird', 'chameau': 'camel', 'cheval': 'horse', 'éléphant': 'elephant', 'mouton': 'sheep',
  'renard': 'fox', 'poule': 'hen', 'grenouille': 'frog', 'corbeau': 'raven', 'faucon': 'falcon', 'lion': 'lion',
  'lune': 'moon', 'soleil': 'sun', 'étoile': 'star', 'arbre': 'tree', 'mer': 'sea', 'fleur': 'flowers', 'fleurs': 'flowers', 'rose': 'rose',
  'main': 'hand', 'œil': 'eye', 'cœur': 'heart', 'bouche': 'mouth', 'pied': 'foot', 'tête': 'head', 'cheveux': 'hair', 'ongle': 'nails', 'ongles': 'nails',
  'père': 'father', 'mère': 'mother', 'frère': 'brother', 'sœur': 'sister', 'garçon': 'boy', 'fille': 'girl',
  'étudiant': 'student', 'professeur': 'teacher', 'enseignant': 'teacher',
  'bus': 'bus', 'autobus': 'bus', 'train': 'train', 'avion': 'airplane', 'vélo': 'bicycle', 'taxi': 'taxi', 'bateau': 'boat',
  'grand-père': 'grandfather', 'grand-mère': 'grandmother', 'médecin': 'doctor', 'docteur': 'doctor', 'femme': 'woman', 'homme': 'man',
  'ami': 'friends', 'amis': 'friends', 'magasin': 'shop', 'boutique': 'shop', 'sac': 'bag', 'voiture': 'car', 'chaise': 'chair', 'viande': 'meat',
  'chat': 'cat', 'oreille': 'ear', 'nez': 'nose', 'pluie': 'rain', 'neige': 'snow', 'montagne': 'mountain',
  'chemise': 'shirt', 'pantalon': 'trousers', 'chaussure': 'shoes', 'chaussures': 'shoes', 'casquette': 'cap', 'chapeau': 'cap',
  'manteau': 'coat', 'lunettes': 'glasses',
  'gazelle': 'gazelle', 'épée': 'sword', 'baleine': 'whale', 'or': 'gold', 'robe': 'robe',
};

const ARTICLE = /^(le |la |l'|l’|les |un |une |du |de la |de l'|des |d')/;

/** Photo associée à une traduction française, ou undefined. */
export function imgForFrench(fr: string): string | undefined {
  const clean = fr.toLowerCase().replace(/\s*\(.*?\)\s*/g, ' ').trim().replace(ARTICLE, '').trim();
  return IMG_KEY_BY_FR[clean];
}
