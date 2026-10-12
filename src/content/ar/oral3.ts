import { ws, t, type OralSpec } from '../builders';

// ─── Arabe — unités communicatives O12 à O15 (B1) ────────────────────────────
// Source : programmes/arabe.md § 5.4. Affichage presque nu (shadda et tanwīn
// conservés) ; l'audio reste voyellé. Après أَنَّ, لِأَنَّ, رَغْمَ أَنَّ, le nom
// prend l'accusatif (fatḥa) : c'est noté, pas omis. À faire relire par un arabophone.

const B1 = 'advanced' as const;

export const AR_ORAL_B1: OralSpec[] = [
  {
    id: 'ar-O12', level: B1, fade: 'skeletal',
    title: 'Donner son avis',
    goal: 'Défendre une opinion en cinq phrases',
    intro: { title: 'Dire ce qu\'on pense', body: 'Pour exprimer une opinion : فِي رَأْيِي (à mon avis), أَعْتَقِدُ أَنَّ (je pense que). Après أَنَّ, le nom suivant prend la fatḥa : أَعْتَقِدُ أَنَّ الكِتَابَ مُفِيد. Les textes sont maintenant presque sans voyelles : lis d\'abord, puis écoute pour vérifier.' },
    phrases: ws([
      'فِي رَأْيِي|fī raʾyī|À mon avis',
      'مِنْ وِجْهَةِ نَظَرِي|min wijhati naẓarī|De mon point de vue',
      'أَعْتَقِدُ أَنَّ هٰذَا مُفِيد|aʿtaqidu anna hādhā mufīd|Je pense que c\'est utile',
      'أَظُنُّ أَنَّ هٰذَا صَعْب|aẓunnu anna hādhā ṣaʿb|Je crois que c\'est difficile',
      'أَتَّفِقُ مَعَكَ|attafiqu maʿaka|Je suis d\'accord avec toi',
      'لَا أَتَّفِقُ مَعَكَ|lā attafiqu maʿaka|Je ne suis pas d\'accord avec toi',
      'هَلْ تَتَّفِقُ مَعِي؟|hal tattafiqu maʿī|Es-tu d\'accord avec moi ?',
      'هٰذَا صَحِيح|hādhā ṣaḥīḥ|C\'est vrai',
      'هٰذَا خَطَأ|hādhā khaṭaʾ|C\'est faux',
      'مُفِيد|mufīd|utile',
      'سَهْل|sahl|facile',
      'صَعْب|ṣaʿb|difficile',
    ]),
    orders: [
      { fr: 'À mon avis, c\'est utile', words: ws(['فِي رَأْيِي|fī raʾyī|à mon avis', 'هٰذَا|hādhā|ceci', 'مُفِيد|mufīd|utile']) },
      { fr: 'Je suis d\'accord avec toi', words: ws(['أَتَّفِقُ|attafiqu|je suis d\'accord', 'مَعَكَ|maʿaka|avec toi']) },
      { fr: 'Je pense que c\'est difficile', words: ws(['أَعْتَقِدُ|aʿtaqidu|je pense', 'أَنَّ|anna|que', 'هٰذَا|hādhā|ceci', 'صَعْب|ṣaʿb|difficile']) },
    ],
    dialogues: [
      { context: ws(['هَلْ تَتَّفِقُ مَعِي؟|hal tattafiqu maʿī|']), prompt: 'Tu partages son avis. Tu réponds :', options: ws(['أَتَّفِقُ مَعَكَ|attafiqu maʿaka|Je suis d\'accord avec toi', 'لَا أَتَّفِقُ مَعَكَ|lā attafiqu maʿaka|Je ne suis pas d\'accord', 'هٰذَا خَطَأ|hādhā khaṭaʾ|C\'est faux']), answer: 0 },
      { context: ws(['هٰذَا سَهْل|hādhā sahl|']), prompt: 'Tu trouves cela difficile. Tu réponds :', options: ws(['لَا أَتَّفِقُ مَعَكَ، أَظُنُّ أَنَّ هٰذَا صَعْب|lā attafiqu maʿaka, aẓunnu anna hādhā ṣaʿb|Je ne suis pas d\'accord, je crois que c\'est difficile', 'أَتَّفِقُ مَعَكَ|attafiqu maʿaka|Je suis d\'accord', 'مَعَ السَّلَامَة|maʿa s-salāma|Au revoir']), answer: 0 },
    ],
  },
  {
    id: 'ar-O13', level: B1, fade: 'skeletal',
    title: 'Cause, conséquence, opposition',
    goal: 'Argumenter avec deux connecteurs',
    intro: { title: 'Relier ses idées', body: 'لِأَنَّ = parce que, لِذٰلِكَ = c\'est pourquoi, لٰكِنَّ = mais, رَغْمَ أَنَّ = bien que. Avec une lettre ou un pronom attaché, ils s\'écrivent en un mot : لِأَنَّهَا (parce qu\'elle), لٰكِنَّهَا (mais elle).' },
    phrases: ws([
      'لِأَنَّ|li-anna|parce que',
      'لِذٰلِكَ|li-dhālika|c\'est pourquoi, donc',
      'لٰكِنْ|lākin|mais',
      'رَغْمَ أَنَّ|raghma anna|bien que',
      'بِسَبَبِ|bi-sababi|à cause de',
      'بِفَضْلِ|bi-faḍli|grâce à',
      'أُحِبُّ العَرَبِيَّة لِأَنَّهَا جَمِيلَة|uḥibbu l-ʿarabiyya li-annahā jamīla|J\'aime l\'arabe parce qu\'elle est belle',
      'العَرَبِيَّة صَعْبَة لٰكِنَّهَا مُمْتِعَة|al-ʿarabiyya ṣaʿba lākinnahā mumtiʿa|L\'arabe est difficile mais elle est passionnante',
      'دَرَسْتُ كَثِيراً لِذٰلِكَ نَجَحْتُ|darastu kathīran li-dhālika najaḥtu|J\'ai beaucoup étudié, c\'est pourquoi j\'ai réussi',
      'رَغْمَ أَنَّ الطَّقْسَ بَارِد، خَرَجْتُ|raghma anna ṭ-ṭaqsa bārid, kharajtu|Bien que le temps soit froid, je suis sorti',
      'نَجَحْتُ بِفَضْلِ العَمَل|najaḥtu bi-faḍli l-ʿamal|J\'ai réussi grâce au travail',
      'مُمْتِع|mumtiʿ|passionnant, plaisant',
      'مُهِمّ|muhimm|important',
    ]),
    orders: [
      { fr: 'J\'aime l\'arabe parce qu\'elle est belle', words: ws(['أُحِبُّ|uḥibbu|j\'aime', 'العَرَبِيَّة|al-ʿarabiyya|l\'arabe', 'لِأَنَّهَا|li-annahā|parce qu\'elle', 'جَمِيلَة|jamīla|belle']) },
      { fr: 'J\'ai beaucoup étudié, donc j\'ai réussi', words: ws(['دَرَسْتُ|darastu|j\'ai étudié', 'كَثِيراً|kathīran|beaucoup', 'لِذٰلِكَ|li-dhālika|donc', 'نَجَحْتُ|najaḥtu|j\'ai réussi']) },
    ],
    dialogues: [
      { context: [t('Tu veux expliquer pourquoi tu apprends l\'arabe : parce que c\'est beau.')], prompt: 'Quelle phrase convient ?', options: ws(['أُحِبُّ العَرَبِيَّة لِأَنَّهَا جَمِيلَة|uḥibbu l-ʿarabiyya li-annahā jamīla|J\'aime l\'arabe parce qu\'elle est belle', 'العَرَبِيَّة صَعْبَة لٰكِنَّهَا مُمْتِعَة|al-ʿarabiyya ṣaʿba lākinnahā mumtiʿa|L\'arabe est difficile mais passionnant', 'دَرَسْتُ كَثِيراً لِذٰلِكَ نَجَحْتُ|darastu kathīran li-dhālika najaḥtu|J\'ai beaucoup étudié, donc j\'ai réussi']), answer: 0 },
      { context: [t('Tu veux exprimer une opposition : c\'est difficile, mais passionnant.')], prompt: 'Quel connecteur ?', options: ws(['لِأَنَّ|li-anna|parce que', 'لٰكِنْ|lākin|mais', 'لِذٰلِكَ|li-dhālika|donc']), answer: 1 },
    ],
  },
  {
    id: 'ar-O14', level: B1, fade: 'skeletal',
    title: 'Raconter et réclamer',
    goal: 'Structurer un récit et gérer une réclamation',
    phrases: ws([
      'فِي البِدَايَة|fī l-bidāya|Au début',
      'فِي النِّهَايَة|fī n-nihāya|À la fin',
      'لَدَيَّ مُشْكِلَة|ladayya mushkila|J\'ai un problème',
      'الجِهَاز لَا يَعْمَل|al-jihāz lā yaʿmal|L\'appareil ne fonctionne pas',
      'اِسْتَلَمْتُ المُنْتَجَ مَكْسُوراً|istalamtu l-muntaja maksūran|J\'ai reçu le produit cassé',
      'لَمْ أَفْهَمْ|lam afham|Je n\'ai pas compris',
      'أُرِيدُ تَعْوِيضاً|urīdu taʿwīḍan|Je veux un dédommagement',
      'أَرْجُو أَنْ تُصْلِحَهُ|arjū an tuṣliḥahu|Je vous prie de le réparer',
      'أَعْتَذِرُ عَنْ هٰذَا الخَطَأ|aʿtadhiru ʿan hādhā l-khaṭaʾ|Je m\'excuse pour cette erreur',
      'سَوْفَ أَتَّصِلُ بِالمُدِير|sawfa attaṣilu bi-l-mudīr|Je vais contacter le directeur',
      'مُشْكِلَة|mushkila|problème',
      'مُدِير|mudīr|directeur',
    ]),
    orders: [
      { fr: 'L\'appareil ne fonctionne pas', words: ws(['الجِهَاز|al-jihāz|l\'appareil', 'لَا|lā|ne… pas', 'يَعْمَل|yaʿmal|fonctionne']) },
      { fr: 'Je veux un dédommagement', words: ws(['أُرِيدُ|urīdu|je veux', 'تَعْوِيضاً|taʿwīḍan|un dédommagement']) },
      { fr: 'Je vous prie de le réparer', words: ws(['أَرْجُو|arjū|je vous prie', 'أَنْ|an|de', 'تُصْلِحَهُ|tuṣliḥahu|le réparer']) },
    ],
    dialogues: [
      { context: [t('Tu viens d\'acheter un téléphone qui ne s\'allume pas. Tu expliques :')], prompt: 'Quelle phrase dis-tu ?', options: ws(['الجِهَاز لَا يَعْمَل|al-jihāz lā yaʿmal|L\'appareil ne fonctionne pas', 'أَعْتَذِرُ عَنْ هٰذَا الخَطَأ|aʿtadhiru ʿan hādhā l-khaṭaʾ|Je m\'excuse', 'فِي النِّهَايَة|fī n-nihāya|À la fin']), answer: 0 },
      { context: ws(['أَعْتَذِرُ عَنْ هٰذَا الخَطَأ|aʿtadhiru ʿan hādhā l-khaṭaʾ|']), prompt: 'Le vendeur s\'excuse. Tu demandes une réparation :', options: ws(['أَرْجُو أَنْ تُصْلِحَهُ|arjū an tuṣliḥahu|Je vous prie de le réparer', 'لَمْ أَفْهَمْ|lam afham|Je n\'ai pas compris', 'شُكْراً|shukran|Merci']), answer: 0 },
    ],
  },
  {
    id: 'ar-O15', level: B1, fade: 'skeletal',
    title: 'Exposé court',
    goal: 'Parler trois minutes sur un thème familier',
    intro: { title: 'Construire un exposé', body: 'Un exposé a trois temps : introduction (je vais parler de…), développement (d\'une part… d\'autre part, par exemple…), conclusion (pour conclure, en résumé). Prépare une phrase pour chaque temps, puis enchaîne.' },
    phrases: ws([
      'مَوْضُوعِي هُوَ تَعَلُّمُ اللُّغَات|mawḍūʿī huwa taʿallumu l-lughāt|Mon sujet est l\'apprentissage des langues',
      'سَأَتَحَدَّثُ عَنْ ...|sa-ataḥaddathu ʿan|Je vais parler de…',
      'أَوَّلاً|awwalan|Premièrement',
      'ثَانِياً|thāniyan|Deuxièmement',
      'ثَالِثاً|thālithan|Troisièmement',
      'مِنْ جِهَة ... وَمِنْ جِهَة أُخْرَى|min jiha … wa-min jiha ukhrā|D\'une part… d\'autre part',
      'عَلَى سَبِيلِ المِثَال|ʿalā sabīli l-mithāl|Par exemple',
      'فِي الخِتَام|fī l-khitām|Pour conclure',
      'بِاخْتِصَار|bi-khtiṣār|En résumé',
      'شُكْراً لِحُسْنِ اسْتِمَاعِكُمْ|shukran li-ḥusni stimāʿikum|Merci de votre attention',
      'هَلْ لَدَيْكُمْ أَسْئِلَة؟|hal ladaykum asʾila|Avez-vous des questions ?',
    ]),
    orders: [
      { fr: 'Mon sujet est l\'apprentissage des langues', words: ws(['مَوْضُوعِي|mawḍūʿī|mon sujet', 'هُوَ|huwa|est', 'تَعَلُّمُ|taʿallumu|l\'apprentissage', 'اللُّغَات|al-lughāt|des langues']) },
      { fr: 'Merci de votre attention', words: ws(['شُكْراً|shukran|merci', 'لِحُسْنِ|li-ḥusni|pour la qualité de', 'اسْتِمَاعِكُمْ|istimāʿikum|votre écoute']) },
    ],
    dialogues: [
      { context: [t('Tu commences ton exposé.')], prompt: 'Quelle phrase ouvre l\'exposé ?', options: ws(['سَأَتَحَدَّثُ عَنْ ...|sa-ataḥaddathu ʿan|Je vais parler de…', 'فِي الخِتَام|fī l-khitām|Pour conclure', 'هَلْ لَدَيْكُمْ أَسْئِلَة؟|hal ladaykum asʾila|Avez-vous des questions ?']), answer: 0 },
      { context: [t('Tu as fini ton exposé et tu veux remercier le public.')], prompt: 'Tu dis :', options: ws(['بِاخْتِصَار|bi-khtiṣār|En résumé', 'شُكْراً لِحُسْنِ اسْتِمَاعِكُمْ|shukran li-ḥusni stimāʿikum|Merci de votre attention', 'أَوَّلاً|awwalan|Premièrement']), answer: 1 },
    ],
  },
];
