import type { ConvSpec } from '../conversations';

// ─── AR — conversations guidées C17 à C20 (supermarché, plage, chez un ami, taxi) ───
// Générées depuis une table de phrases communes à 11 langues. À faire relire par un locuteur natif.

export const AR_CONVERSATIONS2: ConvSpec[] = [
  {
    id: 'ar-C17', title: 'Au supermarché', scene: 'supermarket', npcRole: 'l\'employé du magasin', romanized: true,
    situation: 'Tu fais tes courses. Demande où est le lait, réponds à l\'employé et paie.',
    key: ['حَلِيب|ḥalīb|le lait|img:milk', 'خُبْز|khubz|le pain|img:bread', 'تُفَّاحَة|tuffāḥa|la pomme|img:apple', 'حَقِيبَة|ḥaqība|le sac|img:bag'],
    turns: [
      { npc: 'هَلْ أَسْتَطِيعُ مُسَاعَدَتَكَ؟|hal astaṭīʿu musāʿadataka|Bonjour, je peux vous aider ?', ok: 'أَيْنَ الحَلِيب؟|ayna l-ḥalīb|Où est le lait ?', bad: ['مَعَ السَّلَامَة|maʿa s-salāma|Au revoir', 'شُكْراً|shukran|Merci'] },
      { npc: 'الحَلِيب هُنَاكَ عَلَى اليَمِين|al-ḥalīb hunāka ʿalā l-yamīn|Le lait est là-bas, à droite', ok: 'شُكْراً جَزِيلاً|shukran jazīlan|Merci beaucoup', bad: ['مَرْحَباً|marḥaban|Bonjour', 'أَنَا مِنْ فَرَنْسَا|ana min faransā|Je viens de France'] },
      { npc: 'هَلْ تُرِيدُ شَيْئاً آخَر؟|hal turīdu shayʾan ākhar|Voulez-vous autre chose ?', ok: 'نَعَم، خُبْزاً وَتُفَّاحاً|naʿam, khubzan wa tuffāḥan|Oui, du pain et des pommes', bad: ['تَشَرَّفْنَا|tasharrafnā|Enchanté(e)', 'غَداً|ghadan|Demain'] },
      { npc: 'هَلْ تُرِيدُ كِيساً؟|hal turīdu kīsan|Voulez-vous un sac ?', ok: 'نَعَم، مِنْ فَضْلِكَ|naʿam, min faḍlika|Oui, s\'il vous plaît', bad: ['لَا أَفْهَم|lā afham|Je ne comprends pas', 'مَعَ السَّلَامَة|maʿa s-salāma|Au revoir'] },
      { npc: 'الحِسَاب عَشَرَةُ يُورُو|al-ḥisāb ʿasharatu yūrū|Ça fait dix euros', ok: 'تَفَضَّلْ|tafaḍḍal|Voilà, tenez', bad: ['كَيْفَ حَالُكَ؟|kayfa ḥāluka|Comment vas-tu ?', 'لَا أَفْهَم|lā afham|Je ne comprends pas'] },
      { npc: 'أَتَمَنَّى لَكَ يَوْماً سَعِيداً|atamannā laka yawman saʿīdan|Bonne journée !', ok: 'شُكْراً، وَأَنْتَ أَيْضاً|shukran, wa anta ayḍan|Merci, à vous aussi', bad: ['لَا أَفْهَم|lā afham|Je ne comprends pas', 'مَرْحَباً|marḥaban|Bonjour'] },
    ],
  },
  {
    id: 'ar-C18', title: 'À la plage', scene: 'beach', npcRole: 'un ami', romanized: true,
    situation: 'Tu passes la journée à la plage avec un ami. Parle du temps, de la mer et de l\'eau.',
    key: ['شَاطِئ|shāṭiʾ|la plage|img:beach', 'بَحْر|baḥr|la mer|img:sea', 'شَمْس|shams|le soleil|img:sun', 'مَاء|māʾ|l\'eau|img:water'],
    turns: [
      { npc: 'الجَوُّ جَمِيل اليَوْم|al-jawwu jamīl al-yawm|Il fait beau aujourd\'hui', ok: 'نَعَم، الجَوُّ حَارّ جِدّاً|naʿam, al-jawwu ḥārr jiddan|Oui, il fait très chaud', bad: ['اِسْمِي كَرِيم|ismī karīm|Je m\'appelle Karim', 'مَعَ السَّلَامَة|maʿa s-salāma|Au revoir'] },
      { npc: 'هَلْ تُحِبُّ البَحْر؟|hal tuḥibbu l-baḥr|Tu aimes la mer ?', ok: 'نَعَم، أُحِبُّ البَحْر كَثِيراً|naʿam, uḥibbu l-baḥr kathīran|Oui, j\'aime beaucoup la mer', bad: ['السَّاعَة الخَامِسَة|as-sāʿa l-khāmisa|Il est cinq heures', 'أَنَا مِنْ فَرَنْسَا|ana min faransā|Je viens de France'] },
      { npc: 'هَلْ تُرِيدُ أَنْ تَسْبَحَ؟|hal turīdu an tasbaḥa|Tu veux nager ?', ok: 'نَعَم، هَيَّا بِنَا|naʿam, hayyā binā|Oui, allons-y !', bad: ['أَنَا طَالِب|ana ṭālib|Je suis étudiant', 'أَيْنَ المَحَطَّة؟|ayna l-maḥaṭṭa|Où est la gare ?'] },
      { npc: 'هَلْ أَنْتَ عَطْشَان؟|hal anta ʿaṭshān|Tu as soif ?', ok: 'نَعَم، أُرِيد مَاء|naʿam, urīd māʾ|Oui, je veux de l\'eau', bad: ['غَداً|ghadan|Demain', 'تَشَرَّفْنَا|tasharrafnā|Enchanté(e)'] },
      { npc: 'تَفَضَّلْ، هٰذَا مَاء|tafaḍḍal, hādhā māʾ|Voici de l\'eau', ok: 'شُكْراً|shukran|Merci', bad: ['عَفْواً|ʿafwan|De rien', 'مَعَ السَّلَامَة|maʿa s-salāma|Au revoir'] },
      { npc: 'هَلْ نَرْجِعُ؟ الوَقْت مُتَأَخِّر|hal narjiʿu? al-waqt mutaʾakhkhir|On rentre ? Il est tard', ok: 'حَسَناً، أَرَاكَ غَداً|ḥasanan, arāka ghadan|D\'accord, à demain', bad: ['مَرْحَباً|marḥaban|Bonjour', 'بِكَمْ هٰذَا؟|bikam hādhā|Combien ça coûte ?'] },
    ],
  },
  {
    id: 'ar-C19', title: 'Chez un ami', scene: 'house', npcRole: 'ton hôte', romanized: true,
    situation: 'Un ami t\'invite chez lui. Remercie, accepte une boisson et goûte ce qu\'il t\'offre.',
    key: ['بَيْت|bayt|la maison|img:house', 'شَاي|shāy|le thé|img:tea', 'خُبْز|khubz|le pain|img:bread', 'عَسَل|ʿasal|le miel|img:honey'],
    turns: [
      { npc: 'أَهْلاً وَسَهْلاً فِي بَيْتِي|ahlan wa sahlan fī baytī|Bienvenue chez moi !', ok: 'شُكْراً، بَيْتُكَ جَمِيل|shukran, baytuka jamīl|Merci, ta maison est belle', bad: ['مَعَ السَّلَامَة|maʿa s-salāma|Au revoir', 'لَا أَفْهَم|lā afham|Je ne comprends pas'] },
      { npc: 'تَفَضَّلْ بِالدُّخُولِ وَاجْلِسْ|tafaḍḍal bi-d-dukhūl wa-jlis|Entre et assieds-toi', ok: 'شُكْراً جَزِيلاً|shukran jazīlan|Merci beaucoup', bad: ['أَيْنَ المَحَطَّة؟|ayna l-maḥaṭṭa|Où est la gare ?', 'عَفْواً|ʿafwan|De rien'] },
      { npc: 'هَلْ تُرِيدُ شَاي أَوْ قَهْوَة؟|hal turīdu shāy aw qahwa|Tu veux du thé ou du café ?', ok: 'شَاي، مِنْ فَضْلِكَ|shāy, min faḍlika|Du thé, s\'il te plaît', bad: ['أَنَا مِنْ فَرَنْسَا|ana min faransā|Je viens de France', 'مَعَ السَّلَامَة|maʿa s-salāma|Au revoir'] },
      { npc: 'هَلْ أَنْتَ جَوْعَان؟|hal anta jawʿān|Tu as faim ?', ok: 'قَلِيلاً، شُكْراً|qalīlan, shukran|Un peu, merci', bad: ['نَعَم، الجَوُّ حَارّ جِدّاً|naʿam, al-jawwu ḥārr jiddan|Oui, il fait très chaud', 'اِسْمِي كَرِيم|ismī karīm|Je m\'appelle Karim'] },
      { npc: 'تَفَضَّلْ، خُبْز وَعَسَل|tafaḍḍal, khubz wa ʿasal|Voici du pain et du miel', ok: 'هٰذَا لَذِيذ جِدّاً|hādhā ladhīdh jiddan|C\'est très bon !', bad: ['أَيْنَ الحَلِيب؟|ayna l-ḥalīb|Où est le lait ?', 'مَرْحَباً|marḥaban|Bonjour'] },
      { npc: 'عُدْ قَرِيباً|ʿud qarīban|Reviens bientôt !', ok: 'بِكُلِّ سُرُور، شُكْراً عَلَى كُلِّ شَيْء|bi-kulli surūr, shukran ʿalā kulli shayʾ|Avec plaisir, merci pour tout', bad: ['بِكَمْ هٰذَا؟|bikam hādhā|Combien ça coûte ?', 'تَشَرَّفْنَا|tasharrafnā|Enchanté(e)'] },
    ],
  },
  {
    id: 'ar-C20', level: 'intermediate', title: 'En taxi', scene: 'taxi', npcRole: 'le chauffeur de taxi', romanized: true,
    situation: 'Tu prends un taxi pour l\'aéroport. Dis ta destination, bavarde un peu et paie la course.',
    key: ['تَاكْسِي|tāksī|le taxi|img:taxi', 'مَطَار|maṭār|l\'aéroport|img:airport', 'حَقِيبَة سَفَر|ḥaqībat safar|la valise|img:suitcase', 'تَذْكِرَة|tadhkira|le billet|img:ticket'],
    turns: [
      { npc: 'مَرْحَباً، أَيْنَ تَذْهَبُ؟|marḥaban, ayna tadhhabu|Bonjour, où allez-vous ?', ok: 'إِلَى المَطَار، مِنْ فَضْلِكَ|ilā l-maṭār, min faḍlika|À l\'aéroport, s\'il vous plaît', bad: ['اِسْمِي كَرِيم|ismī karīm|Je m\'appelle Karim', 'شَاي، مِنْ فَضْلِكَ|shāy, min faḍlika|Du thé, s\'il te plaît'] },
      { npc: 'تَحْتَاجُ إِلَى عِشْرِينَ دَقِيقَة|taḥtāju ilā ʿishrīna daqīqa|C\'est à vingt minutes', ok: 'حَسَناً|ḥasanan|D\'accord', bad: ['تَشَرَّفْنَا|tasharrafnā|Enchanté(e)', 'أَيْنَ الحَلِيب؟|ayna l-ḥalīb|Où est le lait ?'] },
      { npc: 'هَلْ أَنْتَ مُسَافِر؟|hal anta musāfir|Vous êtes en voyage ?', ok: 'نَعَم، أَنَا مِنْ فَرَنْسَا|naʿam, ana min faransā|Oui, je viens de France', bad: ['نَعَم، الجَوُّ حَارّ جِدّاً|naʿam, al-jawwu ḥārr jiddan|Oui, il fait très chaud', 'مَعَ السَّلَامَة|maʿa s-salāma|Au revoir'] },
      { npc: 'وَصَلْنَا|waṣalnā|Nous sommes arrivés', ok: 'تَوَقَّفْ هُنَا مِنْ فَضْلِكَ|tawaqqaf hunā min faḍlika|Arrêtez-vous ici, s\'il vous plaît', bad: ['مَرْحَباً|marḥaban|Bonjour', 'بِكَمْ هٰذَا؟|bikam hādhā|Combien ça coûte ?'] },
      { npc: 'الأُجْرَة خَمْسَةَ عَشَرَ يُورُو|al-ujra khamsata ʿashara yūrū|Ça fait quinze euros', ok: 'تَفَضَّلْ، وَالبَاقِي لَكَ|tafaḍḍal, wa-l-bāqī laka|Voilà, gardez la monnaie', bad: ['لَا أَفْهَم|lā afham|Je ne comprends pas', 'مَعَ السَّلَامَة|maʿa s-salāma|Au revoir'] },
      { npc: 'رِحْلَة سَعِيدَة|riḥla saʿīda|Bon voyage !', ok: 'شُكْراً، مَعَ السَّلَامَة|shukran, maʿa s-salāma|Merci, au revoir', bad: ['مَرْحَباً|marḥaban|Bonjour', 'أَيْنَ المَحَطَّة؟|ayna l-maḥaṭṭa|Où est la gare ?'] },
    ],
  },
];
