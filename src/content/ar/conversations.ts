import type { ConvSpec } from '../conversations';

// ─── Arabe — conversations guidées ───────────────────────────────────────────
// Phrases voyellées, déjà vues dans les unités O1-O15 quand c'est possible.
// À faire relire par un arabophone (docs/recherche-arabe/06).
// Format : 'arabe|translittération|français|emoji ou img:clé'.

export const AR_CONVERSATIONS: ConvSpec[] = [
  {
    id: 'ar-C1', title: 'Rencontre', romanized: true, scene: 'handshake', npcRole: 'un inconnu',
    situation: 'Tu rencontres quelqu\'un pour la première fois. Salue, présente-toi, réponds à ses questions.',
    key: ['السَّلَامُ عَلَيْكُمْ|as-salāmu ʿalaykum|Que la paix soit sur vous|img:handshake', 'اِسْمِي|ismī|mon nom', 'فَرَنْسَا|faransā|France|🇫🇷', 'تَشَرَّفْنَا|tasharrafnā|Enchanté'],
    turns: [
      { npc: 'السَّلَامُ عَلَيْكُمْ|as-salāmu ʿalaykum|Que la paix soit sur vous', ok: 'وَعَلَيْكُمُ السَّلَام|wa ʿalaykumu s-salām|Et sur vous la paix', bad: ['مَعَ السَّلَامَة|maʿa s-salāma|Au revoir', 'شُكْراً|shukran|Merci'], why: 'On répond à « as-salāmu ʿalaykum » par « wa ʿalaykumu s-salām ».' },
      { npc: 'مَا اسْمُكَ؟|mā smuka|Comment t\'appelles-tu ?', ok: 'اِسْمِي كَرِيم|ismī karīm|Je m\'appelle Karim', bad: ['بِخَيْر|bi-khayr|Bien', 'أَنَا مِنْ فَرَنْسَا|ana min faransā|Je viens de France'] },
      { npc: 'مِنْ أَيْنَ أَنْتَ؟|min ayna anta|D\'où viens-tu ?', ok: 'أَنَا مِنْ فَرَنْسَا|ana min faransā|Je viens de France', bad: ['اِسْمِي كَرِيم|ismī karīm|Je m\'appelle Karim', 'نَعَم|naʿam|Oui'] },
      { npc: 'تَشَرَّفْنَا|tasharrafnā|Enchanté', ok: 'تَشَرَّفْنَا|tasharrafnā|Enchanté', bad: ['لَا أَفْهَم|lā afham|Je ne comprends pas', 'عَفْواً|ʿafwan|De rien'] },
      { npc: 'كَيْفَ حَالُكَ؟|kayfa ḥāluka|Comment vas-tu ?', ok: 'بِخَيْر، الحَمْدُ لِلَّه|bi-khayr, al-ḥamdu lillāh|Bien, Dieu merci', bad: ['مَرْحَباً|marḥaban|Bonjour', 'أَيْنَ الحَمَّام؟|ayna l-ḥammām|Où sont les toilettes ?'] },
      { npc: 'مَعَ السَّلَامَة|maʿa s-salāma|Au revoir', ok: 'مَعَ السَّلَامَة|maʿa s-salāma|Au revoir', bad: ['مَرْحَباً|marḥaban|Bonjour', 'نَعَم|naʿam|Oui'] },
    ],
  },
  {
    id: 'ar-C2', title: 'Au café', romanized: true, scene: 'coffee', npcRole: 'le serveur',
    situation: 'Tu t\'assois dans un café. Commande une boisson, réponds au serveur, paie.',
    key: ['شَاي|shāy|thé|img:tea', 'قَهْوَة|qahwa|café|img:coffee', 'مَاء|māʾ|eau|img:water', 'عَصِير|ʿaṣīr|jus|img:juice'],
    turns: [
      { npc: 'مَرْحَباً، مَاذَا تُرِيد؟|marḥaban, mādhā turīd|Bonjour, que veux-tu ?', ok: 'أُرِيد شَاي|urīd shāy|Je veux du thé|img:tea', bad: ['أَيْنَ المَطَار؟|ayna l-maṭār|Où est l\'aéroport ?', 'وَعَلَيْكُمُ السَّلَام|wa ʿalaykumu s-salām|Et sur vous la paix'] },
      { npc: 'هَلْ تُرِيدُ سُكَّر؟|hal turīdu sukkar|Veux-tu du sucre ?', ok: 'نَعَم، مِنْ فَضْلِكَ|naʿam, min faḍlika|Oui, s\'il te plaît', bad: ['مَعَ السَّلَامَة|maʿa s-salāma|Au revoir', 'أَنَا مِنْ فَرَنْسَا|ana min faransā|Je viens de France'] },
      { npc: 'هَلْ تُرِيدُ شَيْئاً آخَر؟|hal turīdu shayʾan ākhar|Veux-tu autre chose ?', ok: 'لَا، شُكْراً|lā, shukran|Non, merci', bad: ['اِسْمِي كَرِيم|ismī karīm|Je m\'appelle Karim', 'غَداً|ghadan|Demain'] },
      { npc: 'الحِسَاب ثَلَاثَةُ يُورُو|al-ḥisāb thalāthatu yūrū|L\'addition : trois euros|img:money', ok: 'تَفَضَّلْ|tafaḍḍal|Voilà|img:money', bad: ['بِكَمْ هٰذَا؟|bikam hādhā|Combien ça coûte ?', 'أُحِبُّ القَهْوَة|uḥibbu l-qahwa|J\'aime le café'] },
      { npc: 'شُكْراً|shukran|Merci', ok: 'عَفْواً|ʿafwan|De rien', bad: ['أَعِدْ مِنْ فَضْلِكَ|aʿid min faḍlika|Répétez, s\'il vous plaît', 'نَعَم|naʿam|Oui'] },
    ],
  },
  {
    id: 'ar-C3', title: 'Au marché', romanized: true, scene: 'market', npcRole: 'le vendeur',
    situation: 'Tu fais tes courses au marché. Demande ce que tu veux, le prix, et paie.',
    key: ['خُبْز|khubz|pain|img:bread', 'بَيْض|bayḍ|œufs|img:eggs', 'سَمَك|samak|poisson|img:fish', 'بِكَمْ هٰذَا؟|bikam hādhā|Combien ça coûte ?|img:money'],
    turns: [
      { npc: 'أَهْلاً، مَاذَا تُرِيد؟|ahlan, mādhā turīd|Bienvenue, que veux-tu ?', ok: 'أُرِيد خُبْز|urīd khubz|Je veux du pain|img:bread', bad: ['مَعَ السَّلَامَة|maʿa s-salāma|Au revoir', 'أَيْنَ المَدْرَسَة؟|ayna l-madrasa|Où est l\'école ?'] },
      { npc: 'كَمْ تُرِيد؟|kam turīd|Combien en veux-tu ?', ok: 'اِثْنَان، مِنْ فَضْلِكَ|ithnān, min faḍlika|Deux, s\'il te plaît', bad: ['مَرْحَباً|marḥaban|Bonjour', 'صَبَاحُ الخَيْر|ṣabāḥ al-khayr|Bonjour (le matin)'] },
      { npc: 'هَلْ تُرِيدُ بَيْضاً؟|hal turīdu bayḍan|Veux-tu des œufs ?|img:eggs', ok: 'لَا، شُكْراً|lā, shukran|Non, merci', bad: ['اِسْمِي كَرِيم|ismī karīm|Je m\'appelle Karim', 'غَداً|ghadan|Demain'] },
      { npc: 'تَفَضَّلْ|tafaḍḍal|Voilà', ok: 'بِكَمْ هٰذَا؟|bikam hādhā|Combien ça coûte ?', bad: ['أَنَا طَالِب|ana ṭālib|Je suis étudiant', 'لَا أَفْهَم|lā afham|Je ne comprends pas'] },
      { npc: 'خَمْسَةُ يُورُو|khamsatu yūrū|Cinq euros|img:money', ok: 'تَفَضَّلْ|tafaḍḍal|Voilà', bad: ['أَيْنَ المَطَار؟|ayna l-maṭār|Où est l\'aéroport ?', 'وَاحِد|wāḥid|Un'] },
      { npc: 'شُكْراً، مَعَ السَّلَامَة|shukran, maʿa s-salāma|Merci, au revoir', ok: 'مَعَ السَّلَامَة|maʿa s-salāma|Au revoir', bad: ['مَرْحَباً|marḥaban|Bonjour', 'نَعَم|naʿam|Oui'] },
    ],
  },
  {
    id: 'ar-C4', title: 'Demander son chemin', romanized: true, scene: 'street', npcRole: 'un passant',
    situation: 'Tu cherches l\'hôpital. Demande ton chemin et comprends la réponse.',
    key: ['المُسْتَشْفَى|al-mustashfā|l\'hôpital|img:hospital', 'يَمِين|yamīn|à droite|➡️', 'يَسَار|yasār|à gauche|⬅️', 'إِلَى الأَمَام|ilā l-amām|tout droit|⬆️'],
    turns: [
      { npc: 'السَّلَامُ عَلَيْكُمْ|as-salāmu ʿalaykum|Que la paix soit sur vous', ok: 'وَعَلَيْكُمُ السَّلَام|wa ʿalaykumu s-salām|Et sur vous la paix', bad: ['شُكْراً|shukran|Merci', 'يَمِين|yamīn|à droite'] },
      { npc: 'هَلْ تَحْتَاجُ إِلَى مُسَاعَدَة؟|hal taḥtāju ilā musāʿada|As-tu besoin d\'aide ?', ok: 'نَعَم، أَيْنَ المُسْتَشْفَى؟|naʿam, ayna l-mustashfā|Oui, où est l\'hôpital ?|img:hospital', bad: ['مَعَ السَّلَامَة|maʿa s-salāma|Au revoir', 'أَنَا مِنْ فَرَنْسَا|ana min faransā|Je viens de France'] },
      { npc: 'إِلَى الأَمَام ثُمَّ يَسَار|ilā l-amām thumma yasār|Tout droit puis à gauche', ok: 'شُكْراً، هَلْ هُوَ قَرِيب؟|shukran, hal huwa qarīb|Merci, est-ce près ?', bad: ['اِسْمِي كَرِيم|ismī karīm|Je m\'appelle Karim', 'أُرِيد خُبْز|urīd khubz|Je veux du pain'] },
      { npc: 'نَعَم، هُوَ قَرِيب|naʿam, huwa qarīb|Oui, c\'est près', ok: 'شُكْراً|shukran|Merci', bad: ['لَا أَفْهَم|lā afham|Je ne comprends pas', 'عِنْدِي أَخ|ʿindī akh|J\'ai un frère'] },
      { npc: 'عَفْواً|ʿafwan|De rien', ok: 'مَعَ السَّلَامَة|maʿa s-salāma|Au revoir', bad: ['بِكَمْ هٰذَا؟|bikam hādhā|Combien ça coûte ?', 'غَداً|ghadan|Demain'] },
    ],
  },
  {
    id: 'ar-C5', title: 'Ma famille', romanized: true, scene: '👨‍👩‍👧', npcRole: 'un ami',
    situation: 'Un ami regarde tes photos de famille. Dis qui est sur chaque photo.',
    key: ['أَب|ab|père|img:father', 'أُمّ|umm|mère|img:mother', 'أَخ|akh|frère|img:brother', 'أُخْت|ukht|sœur|img:sister'],
    turns: [
      { npc: 'مَنْ هٰذَا؟|man hādhā|Qui est-ce ?', img: 'father', ok: 'هٰذَا أَبِي|hādhā abī|C\'est mon père', bad: ['هٰذَا أَخِي|hādhā akhī|C\'est mon frère', 'هٰذِهِ أُمِّي|hādhihi ummī|C\'est ma mère'], why: 'La photo montre le père : « abī » = mon père.' },
      { npc: 'مَنْ هٰذِهِ؟|man hādhihi|Qui est-ce ? (une femme)', img: 'mother', ok: 'هٰذِهِ أُمِّي|hādhihi ummī|C\'est ma mère', bad: ['هٰذِهِ أُخْتِي|hādhihi ukhtī|C\'est ma sœur', 'هٰذَا أَبِي|hādhā abī|C\'est mon père'] },
      { npc: 'مَنْ هٰذِهِ؟|man hādhihi|Qui est-ce ? (une femme)', img: 'sister', ok: 'هٰذِهِ أُخْتِي|hādhihi ukhtī|C\'est ma sœur', bad: ['هٰذِهِ أُمِّي|hādhihi ummī|C\'est ma mère', 'هٰذَا أَخِي|hādhā akhī|C\'est mon frère'] },
      { npc: 'مَنْ هٰذَا؟|man hādhā|Qui est-ce ?', img: 'brother', ok: 'هٰذَا أَخِي|hādhā akhī|C\'est mon frère', bad: ['هٰذَا أَبِي|hādhā abī|C\'est mon père', 'هٰذِهِ أُخْتِي|hādhihi ukhtī|C\'est ma sœur'] },
      { npc: 'هَلْ عِنْدَكَ إِخْوَة؟|hal ʿindaka ikhwa|As-tu des frères et sœurs ?', ok: 'عِنْدِي أَخ وَأُخْت|ʿindī akh wa-ukht|J\'ai un frère et une sœur', bad: ['أَنَا طَالِب|ana ṭālib|Je suis étudiant', 'أُرِيد مَاء|urīd māʾ|Je veux de l\'eau'] },
    ],
  },

  {
    id: 'ar-C6', level: 'intermediate', title: 'Au restaurant', romanized: true, scene: 'fish', npcRole: 'le serveur',
    situation: 'Tu dînes au restaurant. Commande un plat et une boisson, donne ton avis, demande l\'addition.',
    key: ['سَمَك|samak|poisson|img:fish', 'عَصِير|ʿaṣīr|jus|img:juice', 'لَذِيذ|ladhīdh|délicieux', 'الحِسَاب|al-ḥisāb|l\'addition|img:money'],
    turns: [
      { npc: 'أَهْلاً وَسَهْلاً|ahlan wa-sahlan|Bienvenue', ok: 'أَهْلاً بِكَ|ahlan bika|Bonjour à toi', bad: ['الحِسَاب مِنْ فَضْلِكَ|al-ḥisāb min faḍlika|L\'addition, s\'il vous plaît', 'مَعَ السَّلَامَة|maʿa s-salāma|Au revoir'] },
      { npc: 'مَاذَا تُرِيدُ أَنْ تَأْكُلَ؟|mādhā turīdu an takula|Que veux-tu manger ?', ok: 'أُرِيدُ سَمَكاً|urīdu samakan|Je voudrais du poisson|img:fish', bad: ['أَنَا طَالِب|ana ṭālib|Je suis étudiant', 'غَداً|ghadan|Demain'] },
      { npc: 'وَمَاذَا تُرِيدُ أَنْ تَشْرَبَ؟|wa-mādhā turīdu an tashraba|Et que veux-tu boire ?', ok: 'أُفَضِّلُ العَصِير|ufaḍḍilu l-ʿaṣīr|Je préfère le jus|img:juice', bad: ['اِسْمِي كَرِيم|ismī karīm|Je m\'appelle Karim', 'لَقَدْ ضَاعَتْ حَقِيبَتِي|laqad ḍāʿat ḥaqībatī|J\'ai perdu mon sac'] },
      { npc: 'هَلِ الطَّعَامُ لَذِيذ؟|hali ṭ-ṭaʿāmu ladhīdh|La nourriture est-elle délicieuse ?', ok: 'نَعَم، لَذِيذ جِدّاً|naʿam, ladhīdh jiddan|Oui, très délicieuse', bad: ['لَا أَفْهَم|lā afham|Je ne comprends pas', 'يَمِين|yamīn|à droite'] },
      { npc: 'هَلْ تُرِيدُ شَيْئاً آخَر؟|hal turīdu shayʾan ākhar|Veux-tu autre chose ?', ok: 'لَا، الحِسَاب مِنْ فَضْلِكَ|lā, al-ḥisāb min faḍlika|Non, l\'addition, s\'il vous plaît', bad: ['أُحِبُّ القَهْوَة|uḥibbu l-qahwa|J\'aime le café', 'أَيْنَ الحَمَّام؟|ayna l-ḥammām|Où sont les toilettes ?'] },
    ],
  },
  {
    id: 'ar-C7', level: 'intermediate', title: 'À l\'université', romanized: true, scene: 'university', npcRole: 'le professeur',
    situation: 'C\'est ton premier jour à l\'université. Réponds à ton professeur et demande où est la bibliothèque.',
    key: ['أُسْتَاذ|ustādh|professeur|img:teacher', 'طَالِب|ṭālib|étudiant|img:student', 'مَكْتَبَة|maktaba|bibliothèque|img:library', 'جَامِعَة|jāmiʿa|université|img:university'],
    turns: [
      { npc: 'صَبَاحُ الخَيْر|ṣabāḥ al-khayr|Bonjour (le matin)', ok: 'صَبَاحُ النُّور|ṣabāḥ an-nūr|Bonjour (réponse)', bad: ['مَسَاءُ الخَيْر|masāʾ al-khayr|Bonsoir', 'عَفْواً|ʿafwan|De rien'] },
      { npc: 'هَلْ أَنْتَ طَالِب جَدِيد؟|hal anta ṭālib jadīd|Es-tu un nouvel étudiant ?', ok: 'نَعَم، أَنَا طَالِب جَدِيد|naʿam, ana ṭālib jadīd|Oui, je suis un nouvel étudiant|img:student', bad: ['لَا أَفْهَم|lā afham|Je ne comprends pas', 'بِكَمْ هٰذَا؟|bikam hādhā|Combien ça coûte ?'] },
      { npc: 'مَاذَا تَدْرُسُ؟|mādhā tadrusu|Qu\'étudies-tu ?', ok: 'أَدْرُسُ العَرَبِيَّة|adrusu l-ʿarabiyya|J\'étudie l\'arabe', bad: ['أَنَا مِنْ فَرَنْسَا|ana min faransā|Je viens de France', 'أُرِيد خُبْز|urīd khubz|Je veux du pain'] },
      { npc: 'هَلْ لَدَيْكَ سُؤَال؟|hal ladayka suʾāl|As-tu une question ?', ok: 'نَعَم، أَيْنَ المَكْتَبَة؟|naʿam, ayna l-maktaba|Oui, où est la bibliothèque ?|img:library', bad: ['شُكْراً|shukran|Merci', 'غَداً|ghadan|Demain'] },
      { npc: 'المَكْتَبَةُ قَرِيبَة، إِلَى الأَمَام|al-maktabatu qarība, ilā l-amām|La bibliothèque est près, tout droit', ok: 'شُكْراً يَا أُسْتَاذ|shukran yā ustādh|Merci, professeur', bad: ['أَعْتَذِرُ عَنْ هٰذَا الخَطَأ|aʿtadhiru ʿan hādhā l-khaṭaʾ|Je m\'excuse pour cette erreur', 'مَرْحَباً|marḥaban|Bonjour'] },
    ],
  },
  {
    id: 'ar-C8', level: 'intermediate', title: 'Chez le médecin', romanized: true, scene: 'hospital', npcRole: 'le médecin',
    situation: 'Tu ne te sens pas bien. Explique ce que tu as et écoute les conseils du médecin.',
    key: ['طَبِيب|ṭabīb|médecin|img:doctor', 'رَأْس|raʾs|tête|img:head', 'مَاء|māʾ|eau|img:water', 'مُنْذُ أَمْسِ|mundhu amsi|depuis hier'],
    turns: [
      { npc: 'السَّلَامُ عَلَيْكُمْ، مَا المُشْكِلَة؟|as-salāmu ʿalaykum, mā l-mushkila|Bonjour, quel est le problème ?', ok: 'أَنَا مَرِيض|ana marīḍ|Je suis malade', bad: ['أَنَا طَالِب|ana ṭālib|Je suis étudiant', 'أُرِيد قَهْوَة|urīd qahwa|Je veux un café'] },
      { npc: 'أَيْنَ يُؤْلِمُكَ؟|ayna yuʾlimuka|Où as-tu mal ?', ok: 'عِنْدِي أَلَم فِي رَأْسِي|ʿindī alam fī raʾsī|J\'ai mal à la tête|img:head', bad: ['أَنَا مِنْ فَرَنْسَا|ana min faransā|Je viens de France', 'يَسَار|yasār|à gauche'] },
      { npc: 'مُنْذُ مَتَى؟|mundhu matā|Depuis quand ?', ok: 'مُنْذُ أَمْسِ|mundhu amsi|Depuis hier', bad: ['غَداً|ghadan|Demain', 'نَعَم|naʿam|Oui'] },
      { npc: 'سَأُعْطِيكَ دَوَاءً|saʾuʿṭīka dawāʾan|Je vais te donner un médicament', ok: 'شُكْراً يَا طَبِيب|shukran yā ṭabīb|Merci, docteur', bad: ['مَعَ السَّلَامَة|maʿa s-salāma|Au revoir', 'أَيْنَ المَطَار؟|ayna l-maṭār|Où est l\'aéroport ?'] },
      { npc: 'اِشْرَبْ مَاءً كَثِيراً|ishrab māʾan kathīran|Bois beaucoup d\'eau|img:water', ok: 'حَسَناً|ḥasanan|D\'accord', bad: ['لَقَدْ ضَاعَتْ حَقِيبَتِي|laqad ḍāʿat ḥaqībatī|J\'ai perdu mon sac', 'بِكَمْ هٰذَا؟|bikam hādhā|Combien ça coûte ?'] },
    ],
  },
  {
    id: 'ar-C9', level: 'intermediate', title: 'Inviter un ami', romanized: true, scene: 'sunset', npcRole: 'un ami',
    situation: 'Un ami te propose de sortir. Accepte, fixe l\'heure et le lieu.',
    key: ['غَداً|ghadan|demain', 'المَقْهَى|al-maqhā|le café|img:coffee', 'السَّاعَة الخَامِسَة|as-sāʿa l-khāmisa|cinq heures|img:clock', 'إِلَى اللِّقَاء|ilā l-liqāʾ|à bientôt'],
    turns: [
      { npc: 'مَسَاءُ الخَيْر|masāʾ al-khayr|Bonsoir', ok: 'مَسَاءُ النُّور|masāʾ an-nūr|Bonsoir (réponse)', bad: ['صَبَاحُ الخَيْر|ṣabāḥ al-khayr|Bonjour (le matin)', 'عَفْواً|ʿafwan|De rien'] },
      { npc: 'هَلْ تُرِيدُ أَنْ نَخْرُجَ غَداً؟|hal turīdu an nakhruja ghadan|Veux-tu qu\'on sorte demain ?', ok: 'نَعَم، بِكُلِّ سُرُور|naʿam, bi-kulli surūr|Oui, avec plaisir', bad: ['لَا أَفْهَم|lā afham|Je ne comprends pas', 'أَنَا مَرِيض|ana marīḍ|Je suis malade'] },
      { npc: 'أَيْنَ نَلْتَقِي؟|ayna naltaqī|Où se retrouve-t-on ?', ok: 'فِي المَقْهَى|fī l-maqhā|Au café|img:coffee', bad: ['أَنَا طَالِب|ana ṭālib|Je suis étudiant', 'اِسْمِي كَرِيم|ismī karīm|Je m\'appelle Karim'] },
      { npc: 'فِي أَيِّ سَاعَة؟|fī ayyi sāʿa|À quelle heure ?', ok: 'فِي السَّاعَة الخَامِسَة|fī s-sāʿa l-khāmisa|À cinq heures|img:clock', bad: ['يَمِين|yamīn|à droite', 'أُرِيد شَاي|urīd shāy|Je veux du thé'] },
      { npc: 'اِتَّفَقْنَا|ittafaqnā|C\'est entendu', ok: 'إِلَى اللِّقَاء|ilā l-liqāʾ|À bientôt', bad: ['مَرْحَباً|marḥaban|Bonjour', 'بِكَمْ هٰذَا؟|bikam hādhā|Combien ça coûte ?'] },
    ],
  },
  {
    id: 'ar-C10', level: 'advanced', title: 'Donner son avis sur une ville', romanized: true, scene: 'city', npcRole: 'un ami',
    situation: 'Un ami te demande ce que tu penses de sa ville. Donne ton avis et justifie-le.',
    key: ['مَدِينَة|madīna|ville|img:city', 'جَمِيل|jamīl|beau', 'لِأَنَّ|li-anna|parce que', 'لٰكِنْ|lākin|mais'],
    turns: [
      { npc: 'مَاذَا تَعْتَقِدُ عَنْ هٰذِهِ المَدِينَةِ؟|mādhā taʿtaqidu ʿan hādhihi l-madīna|Que penses-tu de cette ville ?', ok: 'أَعْتَقِدُ أَنَّ المَدِينَةَ جَمِيلَة|aʿtaqidu anna l-madīnata jamīla|Je pense que la ville est belle|img:city', bad: ['أَنَا مِنْ فَرَنْسَا|ana min faransā|Je viens de France', 'مَعَ السَّلَامَة|maʿa s-salāma|Au revoir'] },
      { npc: 'لِمَاذَا؟|limādhā|Pourquoi ?', ok: 'لِأَنَّهَا نَظِيفَة وَهَادِئَة|li-annahā naẓīfa wa-hādiʾa|Parce qu\'elle est propre et calme', bad: ['غَداً|ghadan|Demain', 'اِسْمِي كَرِيم|ismī karīm|Je m\'appelle Karim'] },
      { npc: 'لٰكِنَّهَا غَالِيَة|lākinnahā ghāliya|Mais elle est chère', ok: 'أَتَّفِقُ مَعَكَ، لٰكِنْ أُحِبُّهَا|attafiqu maʿaka, lākin uḥibbuhā|Je suis d\'accord, mais je l\'aime', bad: ['لَا أَفْهَم|lā afham|Je ne comprends pas', 'شُكْراً|shukran|Merci'] },
      { npc: 'هَلْ سَتَزُورُهَا مَرَّةً أُخْرَى؟|hal sa-tazūruhā marratan ukhrā|La visiteras-tu encore ?', ok: 'نَعَم، سَأَزُورُهَا مَرَّةً أُخْرَى|naʿam, sa-azūruhā marratan ukhrā|Oui, je la visiterai encore', bad: ['أَنَا مَرِيض|ana marīḍ|Je suis malade', 'يَسَار|yasār|à gauche'] },
    ],
  },
  {
    id: 'ar-C11', level: 'advanced', title: 'Une réclamation', romanized: true, scene: 'money', npcRole: 'l\'employé',
    situation: 'Ton appareil ne marche pas. Explique le problème et demande une réparation ou un dédommagement.',
    key: ['مُشْكِلَة|mushkila|problème', 'الجِهَاز|al-jihāz|l\'appareil', 'تَعْوِيض|taʿwīḍ|dédommagement', 'مُدِير|mudīr|directeur'],
    turns: [
      { npc: 'كَيْفَ أُسَاعِدُكَ؟|kayfa usāʿiduka|Comment puis-je t\'aider ?', ok: 'لَدَيَّ مُشْكِلَة|ladayya mushkila|J\'ai un problème', bad: ['مَرْحَباً|marḥaban|Bonjour', 'أَنَا طَالِب|ana ṭālib|Je suis étudiant'] },
      { npc: 'مَا هِيَ المُشْكِلَة؟|mā hiya l-mushkila|Quel est le problème ?', ok: 'الجِهَاز لَا يَعْمَل|al-jihāz lā yaʿmal|L\'appareil ne fonctionne pas', bad: ['اِسْمِي كَرِيم|ismī karīm|Je m\'appelle Karim', 'أُرِيد قَهْوَة|urīd qahwa|Je veux un café'] },
      { npc: 'مُنْذُ مَتَى؟|mundhu matā|Depuis quand ?', ok: 'مُنْذُ أَمْسِ|mundhu amsi|Depuis hier', bad: ['نَعَم|naʿam|Oui', 'يَمِين|yamīn|à droite'] },
      { npc: 'أَعْتَذِرُ عَنْ هٰذَا الخَطَأ|aʿtadhiru ʿan hādhā l-khaṭaʾ|Je m\'excuse pour cette erreur', ok: 'أَرْجُو أَنْ تُصْلِحَهُ|arjū an tuṣliḥahu|Je vous prie de le réparer', bad: ['مَعَ السَّلَامَة|maʿa s-salāma|Au revoir', 'لَا أَفْهَم|lā afham|Je ne comprends pas'] },
      { npc: 'سَوْفَ أُصْلِحُهُ غَداً|sawfa uṣliḥuhu ghadan|Je le réparerai demain', ok: 'شُكْراً لَكَ|shukran laka|Merci à toi', bad: ['أَيْنَ الحَمَّام؟|ayna l-ḥammām|Où sont les toilettes ?', 'أَنَا مَرِيض|ana marīḍ|Je suis malade'] },
    ],
  },
  {
    id: 'ar-C12', level: 'advanced', title: 'Un exposé en classe', romanized: true, scene: 'teacher', npcRole: 'le professeur',
    situation: 'Tu présentes un court exposé. Ouvre, argumente, conclus et remercie.',
    key: ['مَوْضُوع|mawḍūʿ|sujet', 'عَلَى سَبِيلِ المِثَال|ʿalā sabīli l-mithāl|par exemple', 'فِي الخِتَام|fī l-khitām|pour conclure', 'سُؤَال|suʾāl|question'],
    turns: [
      { npc: 'تَفَضَّلْ، اِبْدَأْ|tafaḍḍal, ibdaʾ|Je t\'en prie, commence', ok: 'مَوْضُوعِي هُوَ تَعَلُّمُ اللُّغَات|mawḍūʿī huwa taʿallumu l-lughāt|Mon sujet est l\'apprentissage des langues', bad: ['شُكْراً عَلَى اهْتِمَامِكُمْ|shukran ʿalā ihtimāmikum|Merci de votre attention', 'مَعَ السَّلَامَة|maʿa s-salāma|Au revoir'] },
      { npc: 'لِمَاذَا هٰذَا المَوْضُوع؟|limādhā hādhā l-mawḍūʿ|Pourquoi ce sujet ?', ok: 'لِأَنَّهُ مُهِمّ|li-annahu muhimm|Parce qu\'il est important', bad: ['أُرِيد خُبْز|urīd khubz|Je veux du pain', 'غَداً|ghadan|Demain'] },
      { npc: 'هَلْ لَدَيْكَ مِثَال؟|hal ladayka mithāl|As-tu un exemple ?', ok: 'نَعَم، عَلَى سَبِيلِ المِثَال، العَرَبِيَّة|naʿam, ʿalā sabīli l-mithāl, al-ʿarabiyya|Oui, par exemple l\'arabe', bad: ['لَا أَفْهَم|lā afham|Je ne comprends pas', 'يَمِين|yamīn|à droite'] },
      { npc: 'وَمَاذَا فِي الخِتَامِ؟|wa-mādhā fī l-khitām|Et pour conclure ?', ok: 'فِي الخِتَام، أَتَعَلَّمُ كُلَّ يَوْم|fī l-khitām, ataʿallamu kulla yawm|Pour conclure, j\'apprends chaque jour', bad: ['أَنَا مَرِيض|ana marīḍ|Je suis malade', 'مَرْحَباً|marḥaban|Bonjour'] },
      { npc: 'أَحْسَنْتَ، عَمَلٌ جَيِّد|aḥsanta, ʿamalun jayyid|Bravo, bon travail', ok: 'شُكْراً لِحُسْنِ اسْتِمَاعِكُمْ|shukran li-ḥusni stimāʿikum|Merci de votre attention', bad: ['عِنْدِي أَخ وَأُخْت|ʿindī akh wa-ukht|J\'ai un frère et une sœur', 'بِكَمْ هٰذَا؟|bikam hādhā|Combien ça coûte ?'] },
    ],
  },
  {
    id: 'ar-C13', title: 'À la gare', romanized: true, scene: 'station', npcRole: 'l\'employé du guichet',
    situation: 'Tu achètes un billet de train à la gare. Dis où tu vas, demande un billet et paie.',
    key: ['مَحَطَّة|maḥaṭṭa|la gare|img:station', 'تَذْكِرَة|tadhkira|le billet|img:ticket', 'قِطَار|qiṭār|le train|img:train', 'حَقِيبَة سَفَر|ḥaqībat safar|la valise|img:suitcase'],
    turns: [
      { npc: 'مَرْحَباً، إِلَى أَيْنَ تَذْهَب؟|marḥaban, ilā ayna tadhhab|Bonjour, où allez-vous ?', ok: 'أَذْهَبُ إِلَى وَسَطِ المَدِينَة|adhhabu ilā wasaṭi l-madīna|Je vais en ville', bad: ['أَنَا طَالِب|ana ṭālib|Je suis étudiant', 'شُكْراً|shukran|Merci'] },
      { npc: 'تَذْكِرَة وَاحِدَة أَمْ اثْنَتَان؟|tadhkira wāḥida am ithnatān|Un billet ou deux ?', img: 'ticket', ok: 'تَذْكِرَة وَاحِدَة، مِنْ فَضْلِكَ|tadhkira wāḥida, min faḍlika|Un billet, s\'il vous plaît|img:ticket', bad: ['أُرِيد مَاء|urīd māʾ|Je veux de l\'eau', 'اِسْمِي آنَّا|ismī ānnā|Je m\'appelle Anna'] },
      { npc: 'عِشْرُونَ يُورُو|ʿishrūna yūrū|Ça fait vingt euros', ok: 'تَفَضَّلْ|tafaḍḍal|Voilà', bad: ['بِكَمْ هٰذَا؟|bikam hādhā|Combien ça coûte ?', 'أُحِبُّ القَهْوَة|uḥibbu l-qahwa|J\'aime le café'] },
      { npc: 'القِطَارُ يَنْطَلِقُ فِي السَّاعَةِ الخَامِسَة|al-qiṭāru yanṭaliqu fī s-sāʿati l-khāmisa|Le train part à cinq heures', ok: 'حَسَناً، شُكْراً|ḥasanan, shukran|D\'accord, merci', bad: ['ضَاعَتْ حَقِيبَتِي|ḍāʿat ḥaqībatī|J\'ai perdu mon sac', 'أَنَا مَرِيض|ana marīḍ|Je suis malade'] },
      { npc: 'رِحْلَة سَعِيدَة|riḥla saʿīda|Bon voyage !', ok: 'شُكْراً، مَعَ السَّلَامَة|shukran, maʿa s-salāma|Merci, au revoir', bad: ['مَرْحَباً|marḥaban|Bonjour', 'لَا أَفْهَم|lā afham|Je ne comprends pas'] },
    ],
  },
  {
    id: 'ar-C14', level: 'intermediate', title: 'À l\'hôtel', romanized: true, scene: 'hotel', npcRole: 'le réceptionniste',
    situation: 'Tu arrives à l\'hôtel. Annonce ta réservation, donne ton nom, écoute les consignes.',
    key: ['فُنْدُق|funduq|l\'hôtel|img:hotel', 'غُرْفَة|ghurfa|la chambre|img:bed', 'مِفْتَاح|miftāḥ|la clé|img:key', 'فُطُور|futūr|le petit-déjeuner'],
    turns: [
      { npc: 'مَرْحَباً، أَهْلاً بِكَ فِي الفُنْدُق|marḥaban, ahlan bika fī l-funduq|Bonjour, bienvenue à l\'hôtel', ok: 'مَرْحَباً، لَدَيَّ حَجْز|marḥaban, ladayya ḥajz|Bonjour, j\'ai une réservation', bad: ['الحِسَاب، مِنْ فَضْلِكَ|al-ḥisāb, min faḍlika|L\'addition, s\'il vous plaît', 'أُرِيد شَاي|urīd shāy|Je veux du thé'] },
      { npc: 'مَا اسْمُكَ؟|mā smuka|Quel est votre nom ?', ok: 'اِسْمِي آنَّا|ismī ānnā|Je m\'appelle Anna', bad: ['أَنَا مِنْ فَرَنْسَا|ana min faransā|Je viens de France', 'شُكْراً|shukran|Merci'] },
      { npc: 'هٰذَا مِفْتَاحُ غُرْفَتِكَ|hādhā miftāḥu ghurfatika|Voici la clé de votre chambre|img:key', img: 'key', ok: 'شُكْراً|shukran|Merci', bad: ['مَعَ السَّلَامَة|maʿa s-salāma|Au revoir', 'أَنَا مَرِيض|ana marīḍ|Je suis malade'] },
      { npc: 'الفُطُورُ فِي الثَّامِنَة|al-futūru fī th-thāmina|Le petit-déjeuner est à huit heures', ok: 'مُمْتَاز، شُكْراً|mumtāz, shukran|C\'est parfait, merci', bad: ['ضَاعَتْ حَقِيبَتِي|ḍāʿat ḥaqībatī|J\'ai perdu mon sac', 'يَسَار|yasār|à gauche'] },
      { npc: 'هَلْ تَحْتَاجُ شَيْئاً آخَر؟|hal taḥtāju shayʾan ākhar|Avez-vous besoin d\'autre chose ?', ok: 'لَا، شُكْراً، تُصْبِحُ عَلَى خَيْر|lā, shukran, tuṣbiḥu ʿalā khayr|Non, merci, bonne nuit', bad: ['اِسْمِي آنَّا|ismī ānnā|Je m\'appelle Anna', 'أَنَا مِنْ فَرَنْسَا|ana min faransā|Je viens de France'] },
    ],
  },
  {
    id: 'ar-C15', level: 'intermediate', title: 'Au téléphone', romanized: true, scene: 'phone', npcRole: 'un ami',
    situation: 'Un ami t\'appelle. Réponds, donne des nouvelles et fixe un rendez-vous pour demain.',
    key: ['هَاتِف|hātif|le téléphone|img:phone', 'رَقْم|raqm|le numéro', 'غَداً|ghadan|demain', 'إِلَى اللِّقَاء|ilā l-liqāʾ|À bientôt'],
    turns: [
      { npc: 'أَلُو؟|alū|Allô ?', ok: 'أَلُو، أَنَا آنَّا|alū, anā ānnā|Allô, c\'est Anna', bad: ['شُكْراً|shukran|Merci', 'نَعَم|naʿam|Oui'] },
      { npc: 'كَيْفَ حَالُكَ؟|kayfa ḥāluka|Comment vas-tu ?', ok: 'بِخَيْر، الحَمْدُ لِلَّه|bi-khayr, al-ḥamdu lillāh|Je vais bien, merci', bad: ['اِسْمِي آنَّا|ismī ānnā|Je m\'appelle Anna', 'مَعَ السَّلَامَة|maʿa s-salāma|Au revoir'] },
      { npc: 'هَلْ أَنْتَ حُرٌّ غَداً؟|hal anta ḥurrun ghadan|Tu es libre demain ?', ok: 'نَعَم، أَنَا حُرّ|naʿam, anā ḥurr|Oui, je suis libre', bad: ['أَنَا مَرِيض|ana marīḍ|Je suis malade', 'ضَاعَتْ حَقِيبَتِي|ḍāʿat ḥaqībatī|J\'ai perdu mon sac'] },
      { npc: 'سَأُرْسِلُ العُنْوَانَ فِي رِسَالَةٍ|saʾursilu l-ʿunwān fī risālatin|Je t\'envoie l\'adresse par message', ok: 'حَسَناً، شُكْراً|ḥasanan, shukran|D\'accord, merci', bad: ['أَنَا طَالِب|ana ṭālib|Je suis étudiant', 'لَا أَفْهَم|lā afham|Je ne comprends pas'] },
      { npc: 'إِلَى اللِّقَاء غَداً|ilā l-liqāʾ ghadan|À demain !', ok: 'إِلَى اللِّقَاء غَداً|ilā l-liqāʾ ghadan|À demain !', bad: ['مَرْحَباً|marḥaban|Bonjour', 'أُحِبُّ القَهْوَة|uḥibbu l-qahwa|J\'aime le café'] },
    ],
  },
  {
    id: 'ar-C16', level: 'intermediate', title: 'À l\'aéroport', romanized: true, scene: 'airport', npcRole: 'l\'agent d\'enregistrement',
    situation: 'Tu enregistres ton vol. Montre ton passeport, dis où tu vas et demande ta porte.',
    key: ['مَطَار|maṭār|l\'aéroport|img:airport', 'جَوَاز سَفَر|jawāz safar|le passeport', 'حَقِيبَة سَفَر|ḥaqībat safar|la valise|img:suitcase', 'طَائِرَة|ṭāʾira|l\'avion|img:airplane'],
    turns: [
      { npc: 'جَوَازُ سَفَرِكَ، مِنْ فَضْلِكَ|jawāzu safarika, min faḍlika|Votre passeport, s\'il vous plaît', ok: 'هٰذَا جَوَازُ سَفَرِي|hādhā jawāzu safarī|Voici mon passeport', bad: ['أَنَا طَالِب|ana ṭālib|Je suis étudiant', 'بِكَمْ هٰذَا؟|bikam hādhā|Combien ça coûte ?'] },
      { npc: 'مَرْحَباً، إِلَى أَيْنَ تَذْهَب؟|marḥaban, ilā ayna tadhhab|Bonjour, où allez-vous ?', ok: 'أَذْهَبُ إِلَى فَرَنْسَا|adhhabu ilā faransā|Je vais en France', bad: ['شُكْراً|shukran|Merci', 'غَداً|ghadan|Demain'] },
      { npc: 'هَلْ لَدَيْكَ حَقِيبَة؟|hal ladayka ḥaqība|Avez-vous une valise ?', img: 'suitcase', ok: 'نَعَم، لَدَيَّ حَقِيبَة|naʿam, ladayya ḥaqība|Oui, j\'ai une valise|img:suitcase', bad: ['أُحِبُّ القَهْوَة|uḥibbu l-qahwa|J\'aime le café', 'اِسْمِي آنَّا|ismī ānnā|Je m\'appelle Anna'] },
      { npc: 'الطَّائِرَةُ تُقْلِعُ فِي العَاشِرَة|aṭ-ṭāʾiratu tuqliʿu fī l-ʿāshira|L\'avion part à dix heures', ok: 'شُكْراً، أَيْنَ بَوَّابَةُ الصُّعُود؟|shukran, ayna bawwābatu ṣ-ṣuʿūd|Merci, où est la porte d\'embarquement ?', bad: ['ضَاعَتْ حَقِيبَتِي|ḍāʿat ḥaqībatī|J\'ai perdu mon sac', 'أَنَا مَرِيض|ana marīḍ|Je suis malade'] },
      { npc: 'رِحْلَة سَعِيدَة|riḥla saʿīda|Bon vol !', ok: 'شُكْراً، مَعَ السَّلَامَة|shukran, maʿa s-salāma|Merci, au revoir', bad: ['مَرْحَباً|marḥaban|Bonjour', 'لَا أَفْهَم|lā afham|Je ne comprends pas'] },
    ],
  },
];
