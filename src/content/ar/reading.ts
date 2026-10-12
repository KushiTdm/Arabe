import { ws, w, type ReadingSpec } from '../builders';

// ─── Arabe — unités de lecture L1 à L10 ──────────────────────────────────────
// Source : programmes/arabe.md § 3.2. Règle : aucune lettre inconnue dans un
// exercice (les lettres d'une unité sont celles des unités précédentes + les
// siennes). Mots voyellés, réels sauf mention « ~ » (mot inventé de décodage).
// À faire relire par un arabophone avant publication (programmes/arabe.md § 7.3).

export const AR_READING: Omit<ReadingSpec, 'known'>[] = [
  {
    id: 'ar-L1',
    title: 'Lettres I : ا د ذ',
    goal: 'Lire ا د ذ avec les trois voyelles brèves et distinguer /d/ de /ð/',
    letters: ['ا', 'د', 'ذ'],
    intro: [
      { title: 'On lit de droite à gauche', body: 'L\'arabe s\'écrit et se lit de droite à gauche, et les lettres d\'un mot sont reliées. Commence par repérer le sens avec ton doigt sur chaque mot.' },
      { title: 'Voyelles brèves', body: 'Trois petits signes se placent sur ou sous la lettre : fatḥa ــَ (a), ḍamma ــُ (ou), kasra ــِ (i). Le sukūn ــْ indique qu\'il n\'y a pas de voyelle. ا allonge le « a » : دَا = dā.' },
    ],
    words: ws([
      '~دَ|da|syllabe', '~دُ|dou|syllabe', '~دِ|di|syllabe',
      '~ذَ|dha|syllabe', '~ذُ|dhou|syllabe', '~ذِ|dhi|syllabe',
      '~دَا|dā|syllabe longue', '~ذَا|dhā|syllabe longue',
    ]),
    pairs: [
      [w('~دَ|da|syllabe'), w('~دَا|dā|syllabe longue'), 'Durée : la voyelle longue dure environ deux fois plus longtemps.'],
      [w('~دَا|dā|syllabe'), w('~ذَا|dhā|syllabe'), 'ذ se prononce comme le « th » anglais de « this », langue entre les dents.'],
    ],
  },
  {
    id: 'ar-L2',
    title: 'Lettres II : ر ز و',
    goal: 'Lire ر ز و, rouler le /r/ et sentir la durée des voyelles longues',
    letters: ['ر', 'ز', 'و'],
    intro: [
      { title: 'Le /r/ arabe est roulé', body: 'ر se prononce avec la pointe de la langue qui bat contre le palais, comme en espagnol ou en italien. Jamais le « r » français.' },
    ],
    words: ws([
      'دَار|dār|maison|🏠', 'وَاد|wād|vallée (oued)|🏞️', 'دُور|dūr|rôles, tours', 'وَرْد|ward|roses|🌹',
      'زَار|zāra|il a rendu visite', 'زُور|zūr|mensonge, faux', 'دُود|dūd|vers (insectes)|🐛',
    ]),
    pairs: [
      [w('~دُ|dou|syllabe'), w('~دُو|dū|syllabe longue'), 'Durée : bref ou long ? Ça change le mot en arabe.'],
      [w('زَار|zāra|il a rendu visite'), w('زُور|zūr|mensonge'), 'a long ou ou long : écoute la voyelle.'],
    ],
  },
  {
    id: 'ar-L3',
    title: 'Lettres III : ب ت ث ن ي',
    goal: 'Lire les lettres à points et reconnaître leurs formes dans un mot',
    letters: ['ب', 'ت', 'ث', 'ن', 'ي'],
    intro: [
      { title: 'Une même forme, des points différents', body: 'ب ت ث ن ي partagent le même squelette : seuls le nombre et la place des points changent. Compte-les : ب 1 sous, ت 2 dessus, ث 3 dessus, ن 1 dessus, ي 2 dessous.' },
      { title: 'Voyelle longue ي et diphtongues', body: 'يـ allonge le « i » : تِين = tīn. Avec fatḥa + sukūn : ــَيْ = « aï » (بَيْت bayt) et ــَوْ = « aou » (ثَوْب thawb).' },
    ],
    words: ws([
      'بَيْت|bayt|maison|🏠', 'تِين|tīn|figues', 'ثَوْب|thawb|vêtement|👘', 'بِنْت|bint|fille|👧',
      'بَاب|bāb|porte|🚪', 'نُور|nūr|lumière|💡', 'يَد|yad|main|✋', 'بَرْد|bard|froid|🥶',
    ]),
    pairs: [
      [w('~بَ|ba|syllabe'), w('~بَا|bā|syllabe longue'), 'Court contre long.'],
      [w('~تَ|ta|syllabe'), w('~ثَ|tha|syllabe'), 'ث : « th » de « think » (langue entre les dents, sans voix).'],
    ],
  },
  {
    id: 'ar-L4',
    title: 'Lettres IV : ج ح خ',
    goal: 'Lire ج ح خ et produire le son ح, inconnu du français',
    letters: ['ج', 'ح', 'خ'],
    intro: [
      { title: 'Deux sons nouveaux', body: 'ح (ḥ) : un souffle sourd, gorge resserrée, comme pour souffler sur des lunettes — pas un /h/ français. خ (kh) : comme la « jota » espagnole, un « r » sourd au fond de la gorge.' },
    ],
    words: ws([
      'جَار|jār|voisin|🏘️', 'خُبْز|khubz|pain|🍞', 'حِبْر|ḥibr|encre|🖋️', 'حُوت|ḥūt|poisson, baleine|🐋',
      'جَيْب|jayb|poche', 'بَحْر|baḥr|mer|🌊', 'خَيْر|khayr|bien, bonheur', 'خَبَر|khabar|nouvelle',
    ]),
    pairs: [
      [w('~حَ|ḥa|syllabe'), w('~خَ|kha|syllabe'), 'ح : souffle sans frottement ; خ : frottement rauque.'],
    ],
  },
  {
    id: 'ar-L5',
    title: 'Lettres V : س ش',
    goal: 'Lire س et ش',
    letters: ['س', 'ش'],
    words: ws([
      'شَاي|shāy|thé|🍵', 'سَبْت|sabt|samedi', 'شَجَر|shajar|arbres|🌳', 'دَرْس|dars|leçon|📖',
    ]),
    pairs: [
      [w('~سَ|sa|syllabe'), w('~شَ|cha|syllabe'), 'س = « s », ش = « ch ».'],
    ],
  },
  {
    id: 'ar-L6',
    title: 'Lettres VI : ص ض',
    goal: 'Lire les emphatiques ص et ض et les opposer à س et د',
    letters: ['ص', 'ض'],
    intro: [
      { title: 'Les emphatiques', body: 'ص et ض sont les versions « lourdes » de س et د : le dos de la langue se relève et recule, et les voyelles voisines s\'assombrissent. Un mot avec ص ou ض sonne plus grave.' },
    ],
    words: ws([
      'صَبْر|ṣabr|patience', 'صَوْت|ṣawt|voix|🗣️', 'ضَرْب|ḍarb|coup', 'دَرْب|darb|chemin|🛤️',
      'صَيْد|ṣayd|chasse', 'بَيْض|bayḍ|œufs|🥚',
    ]),
    pairs: [
      [w('دَرْب|darb|chemin'), w('ضَرْب|ḍarb|coup'), 'ض est l\'emphatique de د : la voyelle suivante s\'assombrit.'],
      [w('~سَ|sa|syllabe'), w('~صَ|ṣa|syllabe'), 'ص : s emphatique, plus grave.'],
    ],
  },
  {
    id: 'ar-L7',
    title: 'Lettres VII : ط ظ',
    goal: 'Lire ط et ظ et les opposer à ت et ذ',
    letters: ['ط', 'ظ'],
    words: ws([
      'طَيْر|ṭayr|oiseaux|🐦', 'طِين|ṭīn|boue', 'ظَبْي|ẓaby|gazelle|🦌', 'نَظَر|naẓar|regard, vue|👀',
      'خَطَر|khaṭar|danger|⚠️', 'سَطْح|saṭḥ|toit',
    ]),
    pairs: [
      [w('تِين|tīn|figues'), w('طِين|ṭīn|boue'), 'ط : t emphatique ; même « i » mais plus sombre.'],
      [w('~ذَ|dha|syllabe'), w('~ظَ|ẓa|syllabe'), 'ظ : version emphatique de ذ.'],
    ],
  },
  {
    id: 'ar-L8',
    title: 'Lettres VIII : ع غ',
    goal: 'Lire ع et غ et ne pas les confondre avec le r français',
    letters: ['ع', 'غ'],
    intro: [
      { title: 'ع, le son le plus difficile', body: 'ع (ʿayn) : resserre la gorge comme un « a » étranglé, avec la voix. Ce n\'est ni un coup de glotte ni une voyelle. غ (gh) ressemble au « r » français — mais ne l\'utilise jamais pour ر.' },
    ],
    words: ws([
      'عَيْن|ʿayn|œil|👁️', 'عِيد|ʿīd|fête|🎉', 'عَرَب|ʿarab|Arabes', 'غَرْب|gharb|ouest',
      'بَعِيد|baʿīd|loin', 'غُرَاب|ghurāb|corbeau', 'شَعْب|shaʿb|peuple', 'حِصَان|ḥiṣān|cheval|🐴',
    ]),
    pairs: [
      [w('عَرَب|ʿarab|Arabes'), w('غَرْب|gharb|ouest'), 'ع : gorge serrée ; غ : « r » doux au fond de la gorge.'],
      [w('~عَ|ʿa|syllabe'), w('~غَ|gha|syllabe'), 'Écoute la différence : l\'un est « étranglé », l\'autre « gargarisé ».'],
    ],
  },
  {
    id: 'ar-L9',
    title: 'Lettres IX : ك ل م ه',
    goal: 'Lire ك ل م ه et la ligature لا',
    letters: ['ك', 'ل', 'م', 'ه'],
    intro: [
      { title: 'La ligature لا', body: 'Quand ل est suivi d\'un alif, les deux lettres se fondent en une forme croisée : لا (lā). Ce n\'est pas une nouvelle lettre.' },
    ],
    words: ws([
      'كَلْب|kalb|chien|🐕', 'مِلْح|milḥ|sel|🧂', 'لَيْل|layl|nuit|🌙', 'كِتَاب|kitāb|livre|📖',
      'شَمْس|shams|soleil|☀️', 'سَلَام|salām|paix', 'هُنَا|hunā|ici', 'لَا|lā|non',
      'هَلْ|hal|est-ce que (question)', 'مَنْ|man|qui', 'كَمْ|kam|combien', 'هُوَ|huwa|il', 'سَمَك|samak|poisson|🐟', 'جَمَل|jamal|chameau|🐫', 'وَلَد|walad|garçon|👦',
    ]),
    pairs: [
      [w('~هَ|ha|syllabe'), w('~حَ|ḥa|syllabe'), 'ه : souffle léger, comme un « h » anglais. ح : gorge resserrée, plus rude.'],
    ],
  },
  {
    id: 'ar-L10',
    title: 'Lettres X : ف ق',
    goal: 'Lire ف et ق et opposer ق à ك',
    letters: ['ف', 'ق'],
    intro: [
      { title: 'ق contre ك', body: 'ق (q) se prononce tout au fond de la bouche, contre la luette ; ك (k) est plus en avant. قَلْب (cœur) et كَلْب (chien) ne diffèrent que par ça. À la fin de cette unité, tu connais les 28 lettres.' },
    ],
    words: ws([
      'قَلْب|qalb|cœur|❤️', 'فِيل|fīl|éléphant|🐘', 'فَجْر|fajr|aube|🌅', 'قَمَر|qamar|lune|🌙',
      'قَلَم|qalam|stylo|✏️', 'قَدَم|qadam|pied|🦶', 'فَم|fam|bouche|👄', 'سَيْف|sayf|épée|⚔️', 'مِفْتَاح|miftāḥ|clé|🔑',
    ]),
    pairs: [
      [w('قَلْب|qalb|cœur'), w('كَلْب|kalb|chien'), 'ق : fond de la gorge ; ك : plus en avant.'],
      [w('سَيْف|sayf|épée'), w('صَيْف|ṣayf|été'), 'س léger contre ص emphatique.'],
      [w('خَرُوف|kharūf|mouton'), w('حُرُوف|ḥurūf|lettres'), 'خ rauque contre ح soufflé.'],
    ],
  },
];
