import { ws, t, type OralSpec } from '../builders';

// ─── Arabe — unités communicatives O1 à O6 (A1) ──────────────────────────────
// Source : programmes/arabe.md § 5.2. Registre : arabe standard parlé, phrases
// voyellées, sans flexion finale (pause). Les lettres non encore vues sont
// affichées avec leur translittération : l'élève est évalué sur le sens et
// l'oreille, pas sur la lecture.

export const AR_ORAL: OralSpec[] = [
  {
    id: 'ar-O1',
    title: 'Saluer, prendre congé',
    goal: 'Échanger quatre répliques de salutation avec un inconnu',
    intro: { title: 'Saluer en arabe', body: 'La salutation religieuse السَّلَامُ عَلَيْكُمْ est comprise et employée partout dans le monde arabe, par tous. Elle appelle une réponse précise : وَعَلَيْكُمُ السَّلَام.' },
    phrases: ws([
      'مَرْحَباً|marḥaban|Bonjour, salut|👋',
      'السَّلَامُ عَلَيْكُمْ|as-salāmu ʿalaykum|Que la paix soit sur vous (bonjour)',
      'وَعَلَيْكُمُ السَّلَام|wa ʿalaykumu s-salām|Et sur vous la paix (réponse)',
      'صَبَاحُ الخَيْر|ṣabāḥ al-khayr|Bonjour (le matin)|🌅',
      'صَبَاحُ النُّور|ṣabāḥ an-nūr|Bonjour (réponse du matin)',
      'مَسَاءُ الخَيْر|masāʾ al-khayr|Bonsoir|🌆',
      'مَعَ السَّلَامَة|maʿa s-salāma|Au revoir',
      'شُكْراً|shukran|Merci|🙏',
      'عَفْواً|ʿafwan|De rien, pardon',
    ]),
    orders: [
      { fr: 'Bonjour (le matin)', words: ws(['صَبَاحُ|ṣabāḥ|matin', 'الخَيْر|al-khayr|le bien']) },
      { fr: 'Et sur vous la paix', words: ws(['وَعَلَيْكُمُ|wa ʿalaykumu|et sur vous', 'السَّلَام|as-salām|la paix']) },
      { fr: 'Au revoir', words: ws(['مَعَ|maʿa|avec', 'السَّلَامَة|as-salāma|la paix']) },
    ],
    dialogues: [
      { context: ws(['السَّلَامُ عَلَيْكُمْ|as-salāmu ʿalaykum|']), prompt: 'Un inconnu te dit :', options: ws(['وَعَلَيْكُمُ السَّلَام|wa ʿalaykumu s-salām|Et sur vous la paix', 'مَعَ السَّلَامَة|maʿa s-salāma|Au revoir', 'شُكْراً|shukran|Merci']), answer: 0 },
      { context: ws(['صَبَاحُ الخَيْر|ṣabāḥ al-khayr|']), prompt: 'Il est huit heures du matin. Tu réponds :', options: ws(['مَسَاءُ الخَيْر|masāʾ al-khayr|Bonsoir', 'صَبَاحُ النُّور|ṣabāḥ an-nūr|Bonjour (réponse)', 'عَفْواً|ʿafwan|De rien']), answer: 1 },
      { context: ws(['شُكْراً|shukran|']), prompt: 'On te remercie. Tu réponds :', options: ws(['مَرْحَباً|marḥaban|Bonjour', 'عَفْواً|ʿafwan|De rien', 'مَسَاءُ الخَيْر|masāʾ al-khayr|Bonsoir']), answer: 1 },
    ],
  },
  {
    id: 'ar-O2',
    title: 'Se présenter',
    goal: 'Dire son nom, son origine et demander « comment ça va ? »',
    intro: { title: 'Masculin et féminin', body: 'L\'arabe s\'adresse différemment à un homme et à une femme : مَا اسْمُكَ؟ (à un homme), مَا اسْمُكِ؟ (à une femme). Seule la dernière voyelle change : « a » pour lui, « i » pour elle.' },
    phrases: ws([
      'أَنَا|ana|je, moi',
      'مَا اسْمُكَ؟|mā smuka|Comment t\'appelles-tu ? (à un homme)',
      'مَا اسْمُكِ؟|mā smuki|Comment t\'appelles-tu ? (à une femme)',
      'اِسْمِي كَرِيم|ismī karīm|Je m\'appelle Karim',
      'أَنَا مِنْ فَرَنْسَا|ana min faransā|Je viens de France|🇫🇷',
      'أَنَا طَالِب|ana ṭālib|Je suis étudiant',
      'أَنَا طَالِبَة|ana ṭāliba|Je suis étudiante',
      'كَيْفَ حَالُكَ؟|kayfa ḥāluka|Comment vas-tu ? (à un homme)',
      'بِخَيْر، الحَمْدُ لِلَّه|bi-khayr, al-ḥamdu lillāh|Bien, Dieu merci',
      'وَأَنْتَ؟|wa-anta|Et toi ? (à un homme)',
      'تَشَرَّفْنَا|tasharrafnā|Enchanté',
    ]),
    orders: [
      { fr: 'Je viens de France', words: ws(['أَنَا|ana|je', 'مِنْ|min|de', 'فَرَنْسَا|faransā|France']) },
      { fr: 'Je m\'appelle Karim', words: ws(['اِسْمِي|ismī|mon nom', 'كَرِيم|karīm|Karim']) },
      { fr: 'Comment vas-tu ?', words: ws(['كَيْفَ|kayfa|comment', 'حَالُكَ|ḥāluka|ton état']) },
    ],
    dialogues: [
      { context: ws(['مَا اسْمُكَ؟|mā smuka|']), prompt: 'On te demande ton nom :', options: ws(['بِخَيْر|bi-khayr|Bien', 'اِسْمِي كَرِيم|ismī karīm|Je m\'appelle Karim', 'أَنَا مِنْ فَرَنْسَا|ana min faransā|Je viens de France']), answer: 1 },
      { context: ws(['كَيْفَ حَالُكَ؟|kayfa ḥāluka|']), prompt: 'On te demande comment tu vas :', options: ws(['بِخَيْر، الحَمْدُ لِلَّه|bi-khayr, al-ḥamdu lillāh|Bien, Dieu merci', 'تَشَرَّفْنَا|tasharrafnā|Enchanté', 'أَنَا طَالِب|ana ṭālib|Je suis étudiant']), answer: 0 },
      { context: ws(['مَا اسْمُكِ؟|mā smuki|']), prompt: 'Cette question s\'adresse à…', options: [t('un homme'), t('une femme')], answer: 1 },
    ],
  },
  {
    id: 'ar-O3',
    title: 'Se faire comprendre',
    goal: 'Demander de répéter, de parler lentement, dire « je ne comprends pas »',
    phrases: ws([
      'نَعَم|naʿam|Oui',
      'لَا|lā|Non',
      'هَلْ تَتَكَلَّمُ الفَرَنْسِيَّة؟|hal tatakallamu l-faransiyya|Parlez-vous français ?',
      'أَتَكَلَّمُ العَرَبِيَّةَ قَلِيلاً|atakallamu l-ʿarabiyya qalīlan|Je parle un peu arabe',
      'لَا أَفْهَم|lā afham|Je ne comprends pas',
      'أَعِدْ مِنْ فَضْلِكَ|aʿid min faḍlika|Répétez, s\'il vous plaît',
      'تَكَلَّمْ بِبُطْء مِنْ فَضْلِكَ|takallam bi-buṭʾ min faḍlika|Parlez lentement, s\'il vous plaît',
      'مَا مَعْنَى هٰذَا؟|mā maʿnā hādhā|Qu\'est-ce que ça veut dire ?',
    ]),
    orders: [
      { fr: 'Je ne comprends pas', words: ws(['لَا|lā|ne… pas', 'أَفْهَم|afham|je comprends']) },
      { fr: 'Répétez, s\'il vous plaît', words: ws(['أَعِدْ|aʿid|répétez', 'مِنْ|min|de', 'فَضْلِكَ|faḍlika|votre faveur']) },
      { fr: 'Parlez-vous français ?', words: ws(['هَلْ|hal|est-ce que', 'تَتَكَلَّمُ|tatakallamu|vous parlez', 'الفَرَنْسِيَّة|al-faransiyya|le français']) },
    ],
    dialogues: [
      { context: ws(['هَلْ تَتَكَلَّمُ الفَرَنْسِيَّة؟|hal tatakallamu l-faransiyya|']), prompt: 'Tu parles français. Tu réponds :', options: ws(['نَعَم|naʿam|Oui', 'عَفْواً|ʿafwan|De rien', 'مَعَ السَّلَامَة|maʿa s-salāma|Au revoir']), answer: 0 },
      { context: [t('Il parle très vite.')], prompt: 'Tu n\'as pas compris. Tu dis :', options: ws(['تَكَلَّمْ بِبُطْء مِنْ فَضْلِكَ|takallam bi-buṭʾ min faḍlika|Parlez lentement, s\'il vous plaît', 'شُكْراً|shukran|Merci', 'مَرْحَباً|marḥaban|Bonjour']), answer: 0 },
    ],
  },
  {
    id: 'ar-O4',
    title: 'Nombres, prix, heure',
    goal: 'Demander un prix et acheter un article',
    phrases: ws([
      'وَاحِد|wāḥid|un (1)|1️⃣', 'اِثْنَان|ithnān|deux (2)|2️⃣', 'ثَلَاثَة|thalātha|trois (3)|3️⃣',
      'أَرْبَعَة|arbaʿa|quatre (4)|4️⃣', 'خَمْسَة|khamsa|cinq (5)|5️⃣', 'سِتَّة|sitta|six (6)|6️⃣',
      'سَبْعَة|sabʿa|sept (7)|7️⃣', 'ثَمَانِيَة|thamāniya|huit (8)|8️⃣', 'تِسْعَة|tisʿa|neuf (9)|9️⃣',
      'عَشَرَة|ʿashara|dix (10)|🔟',
      'بِكَمْ هٰذَا؟|bikam hādhā|Combien ça coûte ?|💰',
      'أُرِيد هٰذَا|urīd hādhā|Je veux ceci',
      'خَمْسَةُ يُورُو|khamsatu yūrū|Cinq euros|💶',
    ]),
    orders: [
      { fr: 'Combien ça coûte ?', words: ws(['بِكَمْ|bikam|combien', 'هٰذَا|hādhā|ceci']) },
      { fr: 'Je veux ceci', words: ws(['أُرِيد|urīd|je veux', 'هٰذَا|hādhā|ceci']) },
      { fr: 'Cinq euros', words: ws(['خَمْسَةُ|khamsatu|cinq', 'يُورُو|yūrū|euros']) },
    ],
    dialogues: [
      { context: ws(['خَمْسَةُ يُورُو|khamsatu yūrū|']), prompt: 'Le vendeur annonce le prix. Combien ?', options: [t('3 €'), t('5 €'), t('10 €')], answer: 1 },
      { context: [t('Tu veux connaître le prix.')], prompt: 'Tu demandes :', options: ws(['بِكَمْ هٰذَا؟|bikam hādhā|Combien ça coûte ?', 'مَرْحَباً|marḥaban|Bonjour', 'لَا أَفْهَم|lā afham|Je ne comprends pas']), answer: 0 },
    ],
  },
  {
    id: 'ar-O5',
    title: 'Lieux et directions',
    goal: 'Demander et comprendre un chemin simple',
    phrases: ws([
      'أَيْنَ؟|ayna|Où ?',
      'أَيْنَ المَطَار؟|ayna l-maṭār|Où est l\'aéroport ?|✈️',
      'أَيْنَ الحَمَّام؟|ayna l-ḥammām|Où sont les toilettes ?|🚻',
      'يَمِين|yamīn|à droite|➡️',
      'يَسَار|yasār|à gauche|⬅️',
      'إِلَى الأَمَام|ilā l-amām|tout droit|⬆️',
      'قَرِيب|qarīb|près',
      'بَعِيد|baʿīd|loin',
      'المَدْرَسَة|al-madrasa|l\'école|🏫',
      'السُّوق|as-sūq|le marché|🛒',
      'المُسْتَشْفَى|al-mustashfā|l\'hôpital|🏥',
      'المَسْجِد|al-masjid|la mosquée|🕌',
      'شَارِع|shāriʿ|rue|🛣️',
    ]),
    orders: [
      { fr: 'Où est l\'aéroport ?', words: ws(['أَيْنَ|ayna|où', 'المَطَار|al-maṭār|l\'aéroport']) },
      { fr: 'Tout droit puis à droite', words: ws(['إِلَى الأَمَام|ilā l-amām|tout droit', 'ثُمَّ|thumma|puis', 'يَمِين|yamīn|à droite']) },
    ],
    dialogues: [
      { context: ws(['أَيْنَ المُسْتَشْفَى؟|ayna l-mustashfā|']), prompt: 'On t\'indique : « إِلَى الأَمَام ثُمَّ يَسَار ». Tu dois…', options: [t('aller tout droit puis à gauche'), t('aller tout droit puis à droite'), t('tourner à droite tout de suite')], answer: 0 },
      { context: [t('Tu cherches le marché.')], prompt: 'Tu demandes :', options: ws(['أَيْنَ السُّوق؟|ayna s-sūq|Où est le marché ?', 'بِكَمْ هٰذَا؟|bikam hādhā|Combien ça coûte ?', 'شُكْراً|shukran|Merci']), answer: 0 },
    ],
  },
  {
    id: 'ar-O6',
    title: 'Famille et besoins',
    goal: 'Présenter sa famille et exprimer un besoin',
    phrases: ws([
      'أَب|ab|père|👨', 'أُمّ|umm|mère|👩', 'أَخ|akh|frère|👦', 'أُخْت|ukht|sœur|👧',
      'هٰذَا أَبِي|hādhā abī|C\'est mon père',
      'هٰذِهِ أُمِّي|hādhihi ummī|C\'est ma mère',
      'عِنْدِي أَخ وَأُخْت|ʿindī akh wa-ukht|J\'ai un frère et une sœur',
      'أُرِيد مَاء|urīd māʾ|Je veux de l\'eau|💧',
      'أُرِيد خُبْز|urīd khubz|Je veux du pain|🍞',
      'أُرِيد قَهْوَة|urīd qahwa|Je veux un café|☕',
      'أَنَا جَائِع|ana jāʾiʿ|J\'ai faim|🍽️',
      'أَنَا عَطْشَان|ana ʿaṭshān|J\'ai soif|🥤',
    ]),
    orders: [
      { fr: 'C\'est mon père', words: ws(['هٰذَا|hādhā|ceci', 'أَبِي|abī|mon père']) },
      { fr: 'J\'ai un frère et une sœur', words: ws(['عِنْدِي|ʿindī|j\'ai', 'أَخ|akh|un frère', 'وَأُخْت|wa-ukht|et une sœur']) },
      { fr: 'Je veux de l\'eau', words: ws(['أُرِيد|urīd|je veux', 'مَاء|māʾ|de l\'eau']) },
    ],
    dialogues: [
      { context: [t('Tu as soif.')], prompt: 'Tu dis :', options: ws(['أَنَا عَطْشَان|ana ʿaṭshān|J\'ai soif', 'أَنَا جَائِع|ana jāʾiʿ|J\'ai faim', 'أَنَا طَالِب|ana ṭālib|Je suis étudiant']), answer: 0 },
      { context: ws(['هٰذِهِ أُمِّي|hādhihi ummī|']), prompt: 'Qui est cette personne ?', options: [t('ma sœur'), t('ma mère'), t('mon frère')], answer: 1 },
    ],
  },
];
