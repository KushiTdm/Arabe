import { ws, w, type ReadingSpec, type FadingSpec } from '../builders';

// ─── Arabe — signes et retrait du voyellage (L11 à L18) ──────────────────────
// Source : programmes/arabe.md § 3.2 (L11-L14) et § 3.3 (L15-L18). Mots réels,
// voyellés ; à faire relire par un arabophone (voir docs/recherche-arabe/06).

export const AR_SIGNS: Omit<ReadingSpec, 'known'>[] = [
  {
    id: 'ar-L11',
    title: 'Shadda et tanwīn',
    goal: 'Lire une consonne doublée (shadda) et les terminaisons -un, -an, -in',
    letters: [],
    intro: [
      { title: 'La shadda ـّ : tenir la consonne', body: 'Une petite tête de « w » au-dessus d\'une lettre signifie qu\'elle est doublée : on la tient plus longtemps, comme en italien (nonno). دَرَسَ (darasa, il a étudié) devient دَرَّسَ (darrasa, il a enseigné) : le sens change.' },
      { title: 'Le tanwīn : -un, -an, -in', body: 'Un signe doublé en fin de mot ajoute un « n » et marque l\'indéfini : ـٌ = -un, ـً = -an (souvent avec un alif : ـًا), ـٍ = -in. كِتَابٌ = « un livre ». À l\'oral, on le prononce surtout dans quelques mots figés comme شُكْراً (shukran).' },
    ],
    words: ws([
      'رَبّ|rabb|seigneur, maître', 'جَدّ|jadd|grand-père', 'كُلّ|kull|tout, chaque', 'حَبّ|ḥabb|grain',
      'دَرَّسَ|darrasa|il a enseigné', 'دَرَسَ|darasa|il a étudié', 'مُدَرِّس|mudarris|enseignant',
      'كِتَابٌ|kitābun|un livre|📖', 'بَيْتٌ|baytun|une maison|🏠', 'شُكْراً|shukran|merci', 'كِتَابٍ|kitābin|un livre (génitif)',
    ]),
    pairs: [
      [w('دَرَسَ|darasa|il a étudié'), w('دَرَّسَ|darrasa|il a enseigné'), 'La shadda : écoute la consonne tenue au milieu du mot.'],
    ],
  },
  {
    id: 'ar-L12',
    title: 'La hamza et ses supports',
    goal: 'Lire ء et ses supports أ إ ؤ ئ, et la madda آ',
    letters: [],
    intro: [
      { title: 'La hamza, un coup de glotte', body: 'ء (hamza) est une brève fermeture de la gorge, comme dans « ahah ». Elle s\'écrit seule ou posée sur un support selon la voyelle voisine : sur alif (أ avec fatḥa ou ḍamma, إ avec kasra), sur و (ؤ), sur ي sans points (ئ).' },
      { title: 'La madda آ', body: 'آ = hamza + alif long : « ā ». آخِر (ākhir) = dernier.' },
    ],
    words: ws([
      'أَب|ab|père|👨', 'أُمّ|umm|mère|👩', 'إِمَام|imām|imam', 'سُؤَال|suʾāl|question',
      'مَاء|māʾ|eau|💧', 'رَأْس|raʾs|tête', 'بِئْر|biʾr|puits', 'شَيْء|shayʾ|chose',
      'قَرَأَ|qaraʾa|il a lu', 'آخِر|ākhir|dernier', 'أَيْنَ|ayna|où', 'إِنْ|in|si',
    ]),
    pairs: [
      [w('عَمَل|ʿamal|travail'), w('أَمَل|amal|espoir'), 'ع : gorge serrée avec la voix ; أ : simple coup de glotte.'],
    ],
  },
  {
    id: 'ar-L13',
    title: 'ة, ى et l\'article ال',
    goal: 'Lire ة et ى, et savoir quand le « l » de ال s\'efface',
    letters: [],
    intro: [
      { title: 'ة (tā\' marbūṭa) et ى', body: 'ة marque presque toujours le féminin : /a/ à la pause (مَدْرَسَة madrasa), /t/ quand elle est suivie d\'un mot (مَدْرَسَةُ الوَلَد). ى (alif maqṣūra) se lit « ā » : مُسْتَشْفَى (mustashfā).' },
      { title: 'L\'article ال : lunaires et solaires', body: 'Devant une lettre « lunaire » (ق ك ب م ج ح خ ع غ ف ه و ي), le « l » se prononce : القَمَر al-qamar. Devant une lettre « solaire » (ت ث د ذ ر ز س ش ص ض ط ظ ل ن), il s\'assimile et la lettre est doublée (shadda) : الشَّمْس ash-shams.' },
    ],
    words: ws([
      'مَدْرَسَة|madrasa|école|🏫', 'مَدِينَة|madīna|ville', 'سَنَة|sana|année', 'مَكْتَبَة|maktaba|bibliothèque',
      'قَهْوَة|qahwa|café|☕', 'طَاوِلَة|ṭāwila|table|🪑', 'مُسْتَشْفَى|mustashfā|hôpital|🏥', 'مَعْنَى|maʿnā|sens',
      'القَمَر|al-qamar|la lune|🌙', 'الكِتَاب|al-kitāb|le livre|📖', 'الشَّمْس|ash-shams|le soleil|☀️',
      'النُّور|an-nūr|la lumière|💡', 'الدَّرْس|ad-dars|la leçon',
    ]),
    pairs: [
      [w('القَمَر|al-qamar|la lune'), w('الشَّمْس|ash-shams|le soleil'), 'Lunaire : le « l » se dit. Solaire : il disparaît, la lettre se double.'],
    ],
  },
  {
    id: 'ar-L14',
    title: 'Consolidation : phrases voyellées',
    goal: 'Lire de courtes phrases complètes à voix haute',
    letters: [],
    words: ws([
      'هٰذَا بَيْتٌ كَبِير|hādhā baytun kabīr|C\'est une grande maison',
      'الكِتَابُ عَلَى الطَّاوِلَة|al-kitābu ʿalā ṭ-ṭāwila|Le livre est sur la table',
      'القَمَرُ جَمِيل|al-qamaru jamīl|La lune est belle',
      'المَدْرَسَةُ قَرِيبَة|al-madrasatu qarība|L\'école est proche',
      'الشَّايُ سَاخِن|ash-shāyu sākhin|Le thé est chaud',
      'هِيَ فِي المَدِينَة|hiya fī l-madīna|Elle est dans la ville',
      'أَيْنَ مِفْتَاحِي؟|ayna miftāḥī|Où est ma clé ?',
      'أَنَا أَقْرَأُ كِتَاباً|ana aqraʾu kitāban|Je lis un livre',
    ]),
    orders: [
      { fr: 'Le thé est chaud', words: ws(['الشَّايُ|ash-shāyu|le thé', 'سَاخِن|sākhin|chaud']) },
      { fr: 'Elle est dans la ville', words: ws(['هِيَ|hiya|elle', 'فِي|fī|dans', 'المَدِينَة|al-madīna|la ville']) },
    ],
  },
];

export const AR_FADING: FadingSpec[] = [
  {
    id: 'ar-L15',
    title: 'Voyellage partiel',
    goal: 'Lire des mots dont les voyelles du milieu ont disparu',
    mode: 'partial',
    intro: [
      { title: 'Les voyelles s\'effacent', body: 'Dans les textes réels, les voyelles brèves sont rarement écrites. Ici, on garde la dernière, la shadda et le tanwīn, et on retire les autres. Lis le mot, devine les voyelles, puis écoute pour vérifier. Les voyelles longues (ا و ي) restent : elles sont des lettres.' },
    ],
    words: ws([
      'مَدْرَسَة|madrasa|école', 'كِتَاب|kitāb|livre', 'قَلَم|qalam|stylo', 'مَدِينَة|madīna|ville',
      'سَيَّارَة|sayyāra|voiture', 'مُعَلِّم|muʿallim|professeur', 'مَكْتَب|maktab|bureau', 'صَدِيق|ṣadīq|ami',
      'بَيْت|bayt|maison', 'طَالِب|ṭālib|étudiant', 'جَمِيل|jamīl|beau', 'كَبِير|kabīr|grand',
    ]),
    variants: [
      ws(['كَتَبَ|kataba|il a écrit', 'كُتُب|kutub|livres']),
      ws(['دَرَسَ|darasa|il a étudié', 'دَرَّسَ|darrasa|il a enseigné']),
    ],
  },
  {
    id: 'ar-L16',
    title: 'Voyellage squelettique',
    goal: 'Lire avec seulement la shadda et le tanwīn, et restaurer les voyelles',
    mode: 'skeletal',
    intro: [
      { title: 'Restaurer les voyelles', body: 'Presque plus de signes : il faut reconnaître le mot, pas le déchiffrer. Un mot nu peut avoir plusieurs lectures (كتب : kataba, kutub…) : le contexte et la forme du mot tranchent. Entraîne-toi à proposer la bonne lecture.' },
    ],
    words: ws([
      'مَدْرَسَة|madrasa|école', 'كِتَاب|kitāb|livre', 'مُدَرِّس|mudarris|enseignant', 'مَكْتَبَة|maktaba|bibliothèque',
      'صَدِيقٌ|ṣadīqun|un ami', 'شَاي|shāy|thé', 'قَهْوَة|qahwa|café', 'مَطَار|maṭār|aéroport',
      'سَاعَة|sāʿa|heure, montre', 'عَرَبِيَّة|ʿarabiyya|arabe (langue)', 'فَرَنْسِيَّة|faransiyya|français (langue)', 'بِنْت|bint|fille',
    ]),
    variants: [
      ws(['كَتَبَ|kataba|il a écrit', 'كُتُب|kutub|livres', 'كَتَّبَ|kattaba|il a fait écrire']),
      ws(['دَرَسَ|darasa|il a étudié', 'دَرَّسَ|darrasa|il a enseigné', 'دَرْس|dars|leçon']),
      ws(['عَلِمَ|ʿalima|il a su', 'عَلَّمَ|ʿallama|il a enseigné', 'عِلْم|ʿilm|science', 'عَلَم|ʿalam|drapeau']),
    ],
  },
  {
    id: 'ar-L17',
    title: 'Texte nu',
    goal: 'Lire des mots connus sans aucune voyelle',
    mode: 'bare',
    intro: [
      { title: 'Lire comme un arabophone', body: 'Un journal arabe ne note presque aucune voyelle brève. Tu connais ces mots : reconnais-les d\'un coup d\'œil. Si tu hésites, écoute la lecture, puis recommence.' },
    ],
    words: ws([
      'مَدْرَسَة|madrasa|école', 'مُسْتَشْفَى|mustashfā|hôpital', 'مَسْجِد|masjid|mosquée', 'شَارِع|shāriʿ|rue',
      'مَطَار|maṭār|aéroport', 'سُوق|sūq|marché', 'أُسْتَاذ|ustādh|professeur', 'جَامِعَة|jāmiʿa|université',
      'مَكْتَب|maktab|bureau', 'بَحْر|baḥr|mer', 'صَبَاح|ṣabāḥ|matin', 'مَسَاء|masāʾ|soir',
    ]),
    variants: [
      ws(['شَعْر|shaʿr|cheveux', 'شِعْر|shiʿr|poésie']),
      ws(['حُبّ|ḥubb|amour', 'حَبّ|ḥabb|grain']),
    ],
  },
  {
    id: 'ar-L18',
    title: 'Racines et schèmes',
    goal: 'Reconnaître une famille de mots autour d\'une racine à trois consonnes',
    mode: 'bare',
    intro: [
      { title: 'La racine, c\'est le cœur du mot', body: 'La plupart des mots arabes sont bâtis sur 3 consonnes qui portent l\'idée. Racine ك-ت-ب (écrire) : كَتَبَ il a écrit · كِتَاب livre · كَاتِب écrivain · مَكْتَب bureau · مَكْتَبَة bibliothèque · مَكْتُوب écrit.' },
      { title: 'Les schèmes', body: 'فَاعِل désigne celui qui fait (كَاتِب, دَارِس) ; مَفْعُول ce qui subit (مَكْتُوب) ; مَفْعَل un lieu (مَكْتَب, مَدْرَسَة, مَعْمَل). Repérer le schème, c\'est deviner le sens de dizaines de mots.' },
    ],
    words: ws([
      'كَتَبَ|kataba|il a écrit', 'كِتَاب|kitāb|livre', 'كَاتِب|kātib|écrivain', 'مَكْتَب|maktab|bureau',
      'مَكْتَبَة|maktaba|bibliothèque', 'مَكْتُوب|maktūb|écrit', 'دَرَسَ|darasa|il a étudié', 'دَرْس|dars|leçon',
      'مَدْرَسَة|madrasa|école', 'عَمَل|ʿamal|travail', 'عَامِل|ʿāmil|ouvrier', 'مَعْمَل|maʿmal|laboratoire',
    ]),
  },
];
