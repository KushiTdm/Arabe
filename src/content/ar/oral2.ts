import { ws, t, type OralSpec } from '../builders';

// ─── Arabe — unités communicatives O7 à O11 (A2) ─────────────────────────────
// Source : programmes/arabe.md § 5.3. Phrases voyellées, verbes avec leur
// voyelle finale, noms en forme de pause. À faire relire par un arabophone.

const A2 = 'intermediate' as const;

export const AR_ORAL_A2: OralSpec[] = [
  {
    id: 'ar-O7', level: A2,
    title: 'Raconter sa routine',
    goal: 'Décrire sa journée en six phrases',
    intro: { title: 'Le verbe au présent', body: 'Au présent, le verbe porte un préfixe qui indique qui agit : أَ (« je »), تَ (« tu »), يَ (« il »), نَ (« nous »). Ici tout est à la 1re personne : أَذْهَبُ = je vais, أَنَامُ = je dors.' },
    phrases: ws([
      'أَسْتَيْقِظُ فِي السَّابِعَة|astayqiẓu fī s-sābiʿa|Je me réveille à sept heures|⏰',
      'أَتَنَاوَلُ الفُطُور|atanāwalu l-fuṭūr|Je prends le petit-déjeuner|🍳',
      'أَذْهَبُ إِلَى العَمَل|adhhabu ilā l-ʿamal|Je vais au travail|💼',
      'أَعْمَلُ فِي مَكْتَب|aʿmalu fī maktab|Je travaille dans un bureau',
      'أَرْجِعُ إِلَى البَيْت|arjiʿu ilā l-bayt|Je rentre à la maison|🏠',
      'أَتَعَشَّى مَعَ العَائِلَة|ataʿashshā maʿa l-ʿāʾila|Je dîne avec ma famille',
      'أَنَامُ فِي العَاشِرَة|anāmu fī l-ʿāshira|Je dors à dix heures|😴',
      'مَتَى تَسْتَيْقِظُ؟|matā tastayqiẓu|Quand te réveilles-tu ?',
      'كُلَّ يَوْم|kulla yawm|Chaque jour',
      'أَوَّلاً|awwalan|D\'abord',
      'بَعْدَ ذٰلِكَ|baʿda dhālika|Après cela',
      'أَخِيراً|akhīran|Enfin',
    ]),
    orders: [
      { fr: 'Je vais au travail', words: ws(['أَذْهَبُ|adhhabu|je vais', 'إِلَى|ilā|à', 'العَمَل|al-ʿamal|le travail']) },
      { fr: 'Je rentre à la maison', words: ws(['أَرْجِعُ|arjiʿu|je rentre', 'إِلَى|ilā|à', 'البَيْت|al-bayt|la maison']) },
      { fr: 'D\'abord, je prends le petit-déjeuner', words: ws(['أَوَّلاً|awwalan|d\'abord', 'أَتَنَاوَلُ|atanāwalu|je prends', 'الفُطُور|al-fuṭūr|le petit-déjeuner']) },
    ],
    dialogues: [
      { context: ws(['مَتَى تَسْتَيْقِظُ؟|matā tastayqiẓu|']), prompt: 'On te demande quand tu te réveilles. Tu réponds :', options: ws(['أَسْتَيْقِظُ فِي السَّابِعَة|astayqiẓu fī s-sābiʿa|Je me réveille à sept heures', 'أَنَامُ فِي العَاشِرَة|anāmu fī l-ʿāshira|Je dors à dix heures', 'أَرْجِعُ إِلَى البَيْت|arjiʿu ilā l-bayt|Je rentre à la maison']), answer: 0 },
      { context: [t('Tu racontes ta journée dans l\'ordre.')], prompt: 'Quelle phrase vient en dernier ?', options: ws(['أَوَّلاً|awwalan|D\'abord', 'بَعْدَ ذٰلِكَ|baʿda dhālika|Après cela', 'أَخِيراً|akhīran|Enfin']), answer: 2 },
    ],
  },
  {
    id: 'ar-O8', level: A2,
    title: 'Raconter au passé',
    goal: 'Raconter son week-end',
    intro: { title: 'Le passé : on change la fin du verbe', body: 'Au passé, la terminaison indique qui agit : ـتُ (« je »), ـتَ (« tu », à un homme), ـنَا (« nous »). ذَهَبَ (il est allé) → ذَهَبْتُ (je suis allé).' },
    phrases: ws([
      'أَمْسِ|amsi|Hier',
      'ذَهَبْتُ إِلَى السُّوق|dhahabtu ilā s-sūq|Je suis allé au marché|🛒',
      'اِشْتَرَيْتُ خُبْزاً|ishtaraytu khubzan|J\'ai acheté du pain|🍞',
      'مَاذَا فَعَلْتَ؟|mādhā faʿalta|Qu\'as-tu fait ? (à un homme)',
      'زُرْتُ صَدِيقِي|zurtu ṣadīqī|J\'ai rendu visite à mon ami',
      'أَكَلْنَا مَعاً|akalnā maʿan|Nous avons mangé ensemble',
      'رَجَعْتُ مُتَأَخِّراً|rajaʿtu mutaʾakhkhiran|Je suis rentré tard',
      'كَانَ جَمِيلاً|kāna jamīlan|C\'était beau',
      'يَوْمَ السَّبْت ذَهَبْتُ إِلَى البَحْر|yawma s-sabt dhahabtu ilā l-baḥr|Samedi, je suis allé à la mer|🌊',
      'مَاذَا فَعَلْتَ أَمْسِ؟|mādhā faʿalta amsi|Qu\'as-tu fait hier ?',
    ]),
    orders: [
      { fr: 'Hier, je suis allé au marché', words: ws(['أَمْسِ|amsi|hier', 'ذَهَبْتُ|dhahabtu|je suis allé', 'إِلَى|ilā|à', 'السُّوق|as-sūq|le marché']) },
      { fr: 'J\'ai acheté du pain', words: ws(['اِشْتَرَيْتُ|ishtaraytu|j\'ai acheté', 'خُبْزاً|khubzan|du pain']) },
      { fr: 'Nous avons mangé ensemble', words: ws(['أَكَلْنَا|akalnā|nous avons mangé', 'مَعاً|maʿan|ensemble']) },
    ],
    dialogues: [
      { context: ws(['مَاذَا فَعَلْتَ أَمْسِ؟|mādhā faʿalta amsi|']), prompt: 'On te demande ce que tu as fait hier. Tu réponds :', options: ws(['ذَهَبْتُ إِلَى السُّوق|dhahabtu ilā s-sūq|Je suis allé au marché', 'أَسْتَيْقِظُ فِي السَّابِعَة|astayqiẓu fī s-sābiʿa|Je me réveille à sept heures', 'مَعَ السَّلَامَة|maʿa s-salāma|Au revoir']), answer: 0 },
      { context: ws(['أَكَلْنَا مَعاً|akalnā maʿan|']), prompt: 'Qui a mangé ?', options: [t('moi seul'), t('nous, ensemble'), t('toi')], answer: 1 },
    ],
  },
  {
    id: 'ar-O9', level: A2,
    title: 'Goûts et préférences',
    goal: 'Commander au restaurant en exprimant un choix',
    phrases: ws([
      'مَاذَا تُرِيد؟|mādhā turīd|Que veux-tu ?',
      'أُحِبُّ القَهْوَة|uḥibbu l-qahwa|J\'aime le café|☕',
      'لَا أُحِبُّ الشَّاي|lā uḥibbu sh-shāy|Je n\'aime pas le thé',
      'أُفَضِّلُ العَصِير|ufaḍḍilu l-ʿaṣīr|Je préfère le jus|🧃',
      'أُرِيدُ سَمَكاً|urīdu samakan|Je voudrais du poisson|🐟',
      'تُفَّاحَة|tuffāḥa|une pomme|🍎',
      'مَوْزَة|mawza|une banane|🍌',
      'حَلِيب|ḥalīb|du lait|🥛',
      'لَذِيذ|ladhīdh|délicieux',
      'سَاخِن|sākhin|chaud',
      'بَارِد|bārid|froid',
      'مَاء مِنْ فَضْلِكَ|māʾ min faḍlika|De l\'eau, s\'il vous plaît',
      'طَمَاطِم|ṭamāṭim|tomates', 'عِنَب|ʿinab|raisin', 'فَرَاوِلَة|farāwila|fraises', 'بُرْتُقَال|burtuqāl|orange', 'بَطَاطَا|baṭāṭā|pommes de terre', 'بَصَل|baṣal|oignon',
      'الحِسَاب مِنْ فَضْلِكَ|al-ḥisāb min faḍlika|L\'addition, s\'il vous plaît',
    ]),
    orders: [
      { fr: 'J\'aime le café', words: ws(['أُحِبُّ|uḥibbu|j\'aime', 'القَهْوَة|al-qahwa|le café']) },
      { fr: 'Je n\'aime pas le thé', words: ws(['لَا|lā|ne… pas', 'أُحِبُّ|uḥibbu|j\'aime', 'الشَّاي|ash-shāy|le thé']) },
      { fr: 'L\'addition, s\'il vous plaît', words: ws(['الحِسَاب|al-ḥisāb|l\'addition', 'مِنْ فَضْلِكَ|min faḍlika|s\'il vous plaît']) },
    ],
    dialogues: [
      { context: ws(['مَاذَا تُرِيد؟|mādhā turīd|']), prompt: 'Le serveur te demande ce que tu veux. Tu réponds :', options: ws(['أُرِيدُ سَمَكاً|urīdu samakan|Je voudrais du poisson', 'أَنَا طَالِب|ana ṭālib|Je suis étudiant', 'مَعَ السَّلَامَة|maʿa s-salāma|Au revoir']), answer: 0 },
      { context: [t('Le repas est fini.')], prompt: 'Tu veux payer. Tu dis :', options: ws(['الحِسَاب مِنْ فَضْلِكَ|al-ḥisāb min faḍlika|L\'addition, s\'il vous plaît', 'مَاء مِنْ فَضْلِكَ|māʾ min faḍlika|De l\'eau, s\'il vous plaît', 'أُحِبُّ القَهْوَة|uḥibbu l-qahwa|J\'aime le café']), answer: 0 },
    ],
  },
  {
    id: 'ar-O10', level: A2,
    title: 'Projets et invitations',
    goal: 'Fixer un rendez-vous, accepter ou refuser',
    intro: { title: 'Le futur : سَـ devant le verbe', body: 'Pour parler de demain, on ajoute سَـ devant le verbe au présent : أُسَافِرُ (je voyage) → سَأُسَافِرُ (je voyagerai).' },
    phrases: ws([
      'غَداً|ghadan|Demain',
      'سَأُسَافِرُ غَداً|sa-usāfiru ghadan|Je voyagerai demain|✈️',
      'هَلْ تُرِيدُ أَنْ نَخْرُجَ؟|hal turīdu an nakhruja|Veux-tu qu\'on sorte ?',
      'نَعَم، بِكُلِّ سُرُور|naʿam, bi-kulli surūr|Oui, avec plaisir',
      'لَا أَسْتَطِيع، عِنْدِي عَمَل|lā astaṭīʿ, ʿindī ʿamal|Je ne peux pas, j\'ai du travail',
      'مَتَى؟|matā|Quand ?',
      'فِي السَّاعَة الخَامِسَة|fī s-sāʿa l-khāmisa|À cinq heures',
      'أَيْنَ نَلْتَقِي؟|ayna naltaqī|Où se retrouve-t-on ?',
      'فِي المَقْهَى|fī l-maqhā|Au café|☕',
      'اِتَّفَقْنَا|ittafaqnā|C\'est entendu',
      'إِلَى اللِّقَاء|ilā l-liqāʾ|À bientôt',
    ]),
    orders: [
      { fr: 'Je voyagerai demain', words: ws(['سَأُسَافِرُ|sa-usāfiru|je voyagerai', 'غَداً|ghadan|demain']) },
      { fr: 'Où se retrouve-t-on ?', words: ws(['أَيْنَ|ayna|où', 'نَلْتَقِي|naltaqī|nous nous retrouvons']) },
      { fr: 'Au café, à cinq heures', words: ws(['فِي|fī|à', 'المَقْهَى|al-maqhā|le café', 'السَّاعَة|as-sāʿa|l\'heure', 'الخَامِسَة|al-khāmisa|cinquième']) },
    ],
    dialogues: [
      { context: ws(['هَلْ تُرِيدُ أَنْ نَخْرُجَ؟|hal turīdu an nakhruja|']), prompt: 'Tu acceptes :', options: ws(['نَعَم، بِكُلِّ سُرُور|naʿam, bi-kulli surūr|Oui, avec plaisir', 'لَا أَسْتَطِيع، عِنْدِي عَمَل|lā astaṭīʿ, ʿindī ʿamal|Je ne peux pas', 'مَعَ السَّلَامَة|maʿa s-salāma|Au revoir']), answer: 0 },
      { context: ws(['هَلْ تُرِيدُ أَنْ نَخْرُجَ؟|hal turīdu an nakhruja|']), prompt: 'Tu es occupé et tu refuses :', options: ws(['نَعَم، بِكُلِّ سُرُور|naʿam, bi-kulli surūr|Oui, avec plaisir', 'لَا أَسْتَطِيع، عِنْدِي عَمَل|lā astaṭīʿ, ʿindī ʿamal|Je ne peux pas, j\'ai du travail', 'اِتَّفَقْنَا|ittafaqnā|C\'est entendu']), answer: 1 },
    ],
  },
  {
    id: 'ar-O11', level: A2,
    title: 'Santé et imprévus',
    goal: 'Expliquer un problème à un tiers',
    phrases: ws([
      'أَنَا مَرِيض|ana marīḍ|Je suis malade',
      'عِنْدِي أَلَم فِي رَأْسِي|ʿindī alam fī raʾsī|J\'ai mal à la tête',
      'عِنْدِي أَلَم فِي بَطْنِي|ʿindī alam fī baṭnī|J\'ai mal au ventre',
      'أَحْتَاجُ إِلَى طَبِيب|aḥtāju ilā ṭabīb|J\'ai besoin d\'un médecin',
      'أَيْنَ الصَّيْدَلِيَّة؟|ayna ṣ-ṣaydaliyya|Où est la pharmacie ?',
      'أَيْنَ يُؤْلِمُكَ؟|ayna yuʾlimuka|Où as-tu mal ?',
      'مُنْذُ أَمْسِ|mundhu amsi|Depuis hier',
      'لَقَدْ ضَاعَتْ حَقِيبَتِي|laqad ḍāʿat ḥaqībatī|J\'ai perdu mon sac',
      'سَاعِدْنِي مِنْ فَضْلِكَ|sāʿidnī min faḍlika|Aide-moi, s\'il te plaît',
      'اِتَّصِلْ بِالإِسْعَاف|ittaṣil bi-l-isʿāf|Appelle l\'ambulance|🚑',
      'اِتَّصِلْ بِالشُّرْطَة|ittaṣil bi-sh-shurṭa|Appelle la police',
    ]),
    orders: [
      { fr: 'J\'ai mal à la tête', words: ws(['عِنْدِي|ʿindī|j\'ai', 'أَلَم|alam|une douleur', 'فِي|fī|dans', 'رَأْسِي|raʾsī|ma tête']) },
      { fr: 'J\'ai besoin d\'un médecin', words: ws(['أَحْتَاجُ|aḥtāju|j\'ai besoin', 'إِلَى|ilā|de', 'طَبِيب|ṭabīb|un médecin']) },
      { fr: 'J\'ai perdu mon sac', words: ws(['لَقَدْ|laqad|déjà', 'ضَاعَتْ|ḍāʿat|s\'est perdu', 'حَقِيبَتِي|ḥaqībatī|mon sac']) },
    ],
    dialogues: [
      { context: ws(['أَيْنَ يُؤْلِمُكَ؟|ayna yuʾlimuka|']), prompt: 'Tu as mal à la tête. Tu réponds :', options: ws(['عِنْدِي أَلَم فِي رَأْسِي|ʿindī alam fī raʾsī|J\'ai mal à la tête', 'عِنْدِي أَلَم فِي بَطْنِي|ʿindī alam fī baṭnī|J\'ai mal au ventre', 'أَنَا طَالِب|ana ṭālib|Je suis étudiant']), answer: 0 },
      { context: [t('Une personne est blessée dans la rue.')], prompt: 'Tu dis à un passant :', options: ws(['اِتَّصِلْ بِالإِسْعَاف|ittaṣil bi-l-isʿāf|Appelle l\'ambulance', 'أُحِبُّ القَهْوَة|uḥibbu l-qahwa|J\'aime le café', 'غَداً|ghadan|Demain']), answer: 0 },
    ],
  },
];
