import { ws, w, type ReadingSpec } from '../builders';

// ─── Arabe — parcours Phonétique P1 à P4 ─────────────────────────────────────
// Source : programmes/arabe.md § 4 (obstacles du francophone, paires minimales).
// Premier jet : docs/recherche-arabe/07-grok-phonetique.md ; vérification :
// docs/recherche-arabe/08-verification-perplexity-phonetique.md et décisions dans
// 09-phonetique-integre.md. Seules les paires attestées et réellement minimales
// sont gardées. Aucune lettre nouvelle : les 28 lettres sont connues dès L10.
// Voyellé complet, forme de pause. À faire relire par un arabophone.

export const AR_PHONETICS: Omit<ReadingSpec, 'known'>[] = [
  {
    id: 'ar-P1',
    title: 'Sons de gorge : ع et ح',
    goal: 'Entendre et produire ع et ح, sans les confondre avec la hamza, h ou خ',
    letters: [],
    skipTr: true,
    intro: [
      { title: 'ع : la gorge qui se serre, avec la voix', body: 'Serre le milieu de la gorge, comme pour un « a » étranglé, et garde la voix. Ce n\'est ni une voyelle ni le coup de glotte de la hamza (ء). عَيْن (ʿayn, œil) et أَيْن (ʾayn, où ?) ne se ressemblent que pour une oreille française.' },
      { title: 'ح : le souffle qui frotte, sans voix', body: 'Même endroit de la gorge, mais sans voix : un souffle sourd, comme pour embuer des lunettes. Plus profond que le « h » français, et plus en arrière que خ (le « ch » de l\'allemand « Bach »).' },
    ],
    words: ws(['عَيْن|ʿayn|œil', 'عَمَل|ʿamal|travail', 'حَبْل|ḥabl|corde', 'حَلِيب|ḥalīb|lait', 'خُبْز|khubz|pain', 'هَوَاء|hawāʾ|air']),
    pairs: [
      [w('عَيْن|ʿayn|œil'), w('أَيْن|ʾayn|où ?'), 'ع : gorge serrée, voix présente. أ : simple arrêt de la gorge.'],
      [w('عَلَم|ʿalam|drapeau'), w('أَلَم|ʾalam|douleur'), 'Même contraste : ع vibre, أ coupe net.'],
      [w('عَمَل|ʿamal|travail'), w('أَمَل|ʾamal|espoir'), 'Travail ou espoir ? Tout dépend de la première lettre.'],
      [w('عَنْ|ʿan|de, au sujet de'), w('أَنْ|ʾan|que'), 'Deux petits mots très fréquents : ne les confonds pas.'],
      [w('حَلّ|ḥall|solution'), w('خَلّ|khall|vinaigre'), 'ح : souffle de gorge ; خ : frottement rauque plus haut.'],
      [w('حَال|ḥāl|état, situation'), w('خَال|khāl|oncle maternel'), 'ح est plus bas dans la gorge que خ.'],
    ],
    orders: [],
  },
  {
    id: 'ar-P2',
    title: 'Sons du fond : ق, خ, غ',
    goal: 'Distinguer ق de ك, et خ et غ de ح et ع',
    letters: [],
    skipTr: true,
    intro: [
      { title: 'ق : plus loin que le « k »', body: 'Appuie le fond de la langue contre la luette, tout au fond de la bouche, puis relâche d\'un coup, sans souffle. ك (k) se fait plus en avant, comme en français. قَال (il a dit) et كَال (il a mesuré) ne diffèrent que par là.' },
      { title: 'خ sourd, غ sonore', body: 'خ : frottement sourd à l\'arrière de la bouche (jota espagnole, « Bach » allemand). غ : le même geste avec la voix, un « r » doux, comme un gargouillis léger. Attention : ne l\'étends pas à ر, qui se roule avec la pointe de la langue.' },
    ],
    words: ws(['قَلَم|qalam|stylo', 'قَمَر|qamar|lune', 'كِتَاب|kitāb|livre', 'غَرْب|gharb|ouest', 'خُبْز|khubz|pain', 'رَأْس|raʾs|tête']),
    pairs: [
      [w('قَال|qāl|il a dit'), w('كَال|kāl|il a mesuré'), 'ق : au fond de la bouche. ك : plus en avant.'],
      [w('قَاد|qād|il a mené'), w('كَاد|kād|il a failli'), 'Écoute la première consonne, tout le reste est pareil.'],
      [w('شَقّ|shaqq|fente'), w('شَكّ|shakk|doute'), 'Même contraste, ici au milieu du mot.'],
      [w('خَشِيَ|khashiya|il a craint'), w('غَشِيَ|ghashiya|il a recouvert'), 'خ sans voix, غ avec voix, même endroit.'],
      [w('عَالِي|ʿālī|haut'), w('غَالِي|ghālī|cher'), 'ع : gorge serrée. غ : gargouillis doux.'],
      [w('خَال|khāl|oncle maternel'), w('حَال|ḥāl|état, situation'), 'خ rauque en haut, ح soufflé plus bas.'],
    ],
    orders: [],
  },
  {
    id: 'ar-P3',
    title: 'Les emphatiques : ص ض ط ظ',
    goal: 'Entendre le son « sombre » des emphatiques face à س د ت ذ',
    letters: [],
    skipTr: true,
    intro: [
      { title: 'Recule la langue', body: 'Place la langue comme pour س, د, ت ou ذ, puis tire la racine de la langue vers l\'arrière et creuse un peu le dos. Le son devient plus sombre et plus plein : c\'est l\'emphase. Le français n\'a rien de pareil.' },
      { title: 'L\'emphase colore les voyelles voisines', body: 'Après ص ض ط ظ, un « a » se prononce plus sombre, presque vers « o ». C\'est ce qui fait entendre la différence entre سَار (il a marché) et صَار (il est devenu). Les consonnes claires س د ت ذ gardent la langue avancée et détendue.' },
    ],
    words: ws(['صَبْر|ṣabr|patience', 'طَالِب|ṭālib|étudiant', 'ضَوْء|ḍawʾ|lumière', 'ظِلّ|ẓill|ombre', 'سُوق|sūq|marché', 'دَرْس|dars|leçon']),
    pairs: [
      [w('صَار|ṣāra|il est devenu'), w('سَار|sāra|il a marché'), 'ص : langue reculée, son sombre. س : clair.'],
      [w('صَوْت|ṣawt|voix, son'), w('سَوْط|sawṭ|fouet'), 'La voyelle d\'après s\'assombrit aussi.'],
      [w('طِين|ṭīn|boue'), w('تِين|tīn|figues'), 'ط : lourd. ت : léger, pointe de langue seule.'],
      [w('طَابَ|ṭāba|il a été bon'), w('تَابَ|tāba|il s\'est repenti'), 'Même contraste ط / ت.'],
      [w('ضَرْس|ḍars|molaire'), w('دَرْس|dars|leçon'), 'ض est le د emphatique.'],
      [w('ضَلَّ|ḍalla|il s\'est égaré'), w('دَلَّ|dalla|il a guidé'), 'Sombre contre clair, avec shadda sur le ل.'],
      [w('ظَلَّ|ẓalla|il est resté'), w('ذَلَّ|dhalla|il s\'est humilié'), 'ظ et ذ : langue entre les dents, ظ en plus sombre.'],
      [w('نَظَر|naẓar|regard'), w('نَذَر|nadhar|vœu'), 'Même contraste ظ / ذ au milieu du mot.'],
    ],
    orders: [],
  },
  {
    id: 'ar-P4',
    title: 'Durée et shadda',
    goal: 'Tenir les voyelles longues et les consonnes doublées',
    letters: [],
    skipTr: true,
    intro: [
      { title: 'Long contre court : le double', body: 'Une voyelle longue (ā, ī, ū) dure environ deux fois plus qu\'une brève. En français, on les raccourcit sans y penser : en arabe, كَتَبَ (il a écrit) et كَاتَبَ (il a correspondu) sont deux verbes différents.' },
      { title: 'La shadda : tenir la consonne', body: 'Une consonne doublée par la shadda se tient plus longtemps, comme en italien (nonno, « grand-père »). دَرَسَ (il a étudié) devient دَرَّسَ (il a enseigné) : la fermeture ou le frottement dure, puis se relâche.' },
    ],
    words: ws(['كِتَاب|kitāb|livre', 'بَاب|bāb|porte', 'مُدَرِّس|mudarris|enseignant', 'تُفَّاحَة|tuffāḥa|pomme', 'سُكَّر|sukkar|sucre', 'حَقّ|ḥaqq|droit, vérité']),
    pairs: [
      [w('كَتَبَ|kataba|il a écrit'), w('كَاتَبَ|kātaba|il a correspondu'), 'La première voyelle dure deux fois plus dans le second.'],
      [w('قَتَلَ|qatala|il a tué'), w('قَاتَلَ|qātala|il a combattu'), 'Même contraste de durée.'],
      [w('دَرَسَ|darasa|il a étudié'), w('دَرَّسَ|darrasa|il a enseigné'), 'Tiens le r : dar-ra-sa.'],
      [w('عَلِمَ|ʿalima|il a su'), w('عَلَّمَ|ʿallama|il a enseigné'), 'Tiens le l : ʿal-la-ma.'],
      [w('فَهِمَ|fahima|il a compris'), w('فَهَّمَ|fahhama|il a expliqué'), 'Tiens le h : fah-ha-ma.'],
      [w('جَمَعَ|jamaʿa|il a réuni'), w('جَمَّعَ|jammaʿa|il a rassemblé'), 'Tiens le m : jam-ma-ʿa.'],
      [w('كَسَرَ|kasara|il a cassé'), w('كَسَّرَ|kassara|il a brisé en morceaux'), 'Tiens le s : kas-sa-ra.'],
    ],
    orders: [],
  },
];
