import { ws, type ReadingSpec } from '../builders';
import type { SimpleUnit } from '../simple';

// ─── Russe — A1 : lecture du cyrillique (R1-R6) puis unités orales ───────────
// Source : programmes/russe.md. Romanisation « à la française » (ou = у,
// tch = ч, j = ж, ch = ш, khtch = щ). Mots réels ; aucune lettre inconnue
// dans un exercice : les lettres d'une unité sont celles des précédentes + les siennes.

export const RU_READING: Omit<ReadingSpec, 'known'>[] = [
  {
    id: 'ru-R1', theme: 'reading', title: 'Cyrillique I : А К М О Т Е',
    goal: 'Lire les lettres qui ressemblent aux nôtres',
    letters: ['А', 'К', 'М', 'О', 'Т', 'Е'],
    intro: [{ title: 'Un alphabet, 33 lettres', body: 'Le russe s\'écrit en cyrillique. Bonne nouvelle : А К М О Т se lisent comme chez nous (a, k, m, o, t). Mais attention, Е se lit « yé » et non « é ».' }],
    words: ws(['мама|mama|maman|img:mother', 'там|tam|là-bas', 'кот|kot|chat', 'кто|kto|qui', 'как|kak|comment', 'так|tak|ainsi', 'тема|tiéma|thème', 'акт|akt|acte']),
  },
  {
    id: 'ru-R2', theme: 'reading', title: 'Cyrillique II : les faux amis',
    goal: 'Lire В Н Р С У Х : ce ne sont pas les sons attendus',
    letters: ['В', 'Н', 'Р', 'С', 'У', 'Х'],
    intro: [{ title: 'Ressemble à du latin, mais…', body: 'В se lit « v », Н se lit « n », Р se lit « r » (roulé), С se lit « s », У se lit « ou » et Х se lit « kh » (comme la jota espagnole). Ne pas lire « B, H, P, C, Y, X » !' }],
    words: ws(['рот|rot|bouche|img:mouth', 'сон|son|sommeil, rêve', 'нос|nos|nez', 'ухо|oukha|oreille', 'рука|rouka|main|img:hand', 'нет|niét|non', 'вот|vot|voici', 'метро|mitro|métro', 'сестра|sistra|sœur|img:sister', 'страна|strana|pays', 'мост|most|pont', 'ветер|viétir|vent']),
  },
  {
    id: 'ru-R3', theme: 'reading', title: 'Cyrillique III',
    goal: 'Lire Б Г Д П Л З И Й',
    letters: ['Б', 'Г', 'Д', 'П', 'Л', 'З', 'И', 'Й'],
    words: ws(['дом|dom|maison|img:house', 'папа|papa|papa|img:father', 'город|gorat|ville|img:city', 'лампа|lampa|lampe', 'книга|kniga|livre|img:book', 'брат|brat|frère|img:brother', 'друг|drouk|ami', 'мир|mir|paix, monde', 'да|da|oui', 'море|moré|mer|img:sea', 'мой|moï|mon', 'сад|sat|jardin', 'зуб|zoup|dent']),
  },
  {
    id: 'ru-R4', theme: 'reading', title: 'Cyrillique IV : les sifflantes',
    goal: 'Lire Ж Ш Щ Ч Ц',
    letters: ['Ж', 'Ш', 'Щ', 'Ч', 'Ц'],
    intro: [{ title: 'Les chuintantes', body: 'Ж = « j » (comme dans jour), Ш = « ch », Щ = « chtch » (ch long mouillé), Ч = « tch », Ц = « ts ». Ж, Ш et Ц sont toujours « durs » : après eux, на se prononce comme ы.' }],
    words: ws(['чай|tchaï|thé|img:tea', 'шум|choum|bruit', 'жена|jina|épouse', 'муж|mouch|mari', 'цирк|tsirk|cirque', 'центр|tsentr|centre', 'душ|douch|douche', 'чек|tchék|ticket de caisse', 'шоколад|chakalat|chocolat', 'борщ|borchtch|soupe de betterave', 'мужчина|mouchtchina|homme', 'женщина|jénchtchina|femme']),
  },
  {
    id: 'ru-R5', theme: 'reading', title: 'Cyrillique V',
    goal: 'Lire Ф Э Ю Я Ё',
    letters: ['Ф', 'Э', 'Ю', 'Я', 'Ё'],
    words: ws(['фото|foto|photo', 'эхо|éha|écho', 'юг|youk|sud', 'я|ia|je', 'моя|maïa|ma', 'ягода|iagada|baie', 'юмор|ioumar|humour', 'футбол|foutbol|football', 'кофе|kofé|café|img:coffee', 'лимон|limon|citron|img:lemon', 'студент|stoudiént|étudiant|img:student', 'театр|tiatr|théâtre', 'Россия|rassiia|Russie', 'Франция|frantsiia|France', 'ёж|iosh|hérisson']),
  },
  {
    id: 'ru-R6', theme: 'reading', title: 'Cyrillique VI : les signes',
    goal: 'Lire Ы Ь Ъ et sentir dur / mou',
    letters: ['Ы', 'Ь', 'Ъ'],
    intro: [{ title: 'Ы, signe mou, signe dur', body: 'Ы est un « i » prononcé du fond de la gorge (comme « y » dans un son entre i et ou). Le signe mou Ь n\'a pas de son : il « mouille » la consonne précédente (день). Le signe dur Ъ est rare : il sépare.' }],
    words: ws(['мы|my|nous', 'вы|vy|vous', 'ты|ty|tu', 'сын|syn|fils|img:boy', 'рыба|ryba|poisson|img:fish', 'день|dién\'|jour', 'ночь|notch\'|nuit', 'мать|mat\'|mère|img:mother', 'дочь|dotch\'|fille|img:girl', 'семья|simia|famille', 'письмо|pis\'mo|lettre', 'объект|abiékt|objet']),
  },
];

export const RU_UNITS: SimpleUnit[] = [
  {
    id: 'ru-1', theme: 'greetings', title: 'Se présenter', romanized: true,
    goal: 'Se présenter sans le verbe « être » (Я студент)',
    tip: { title: 'Pas de « être » au présent', body: 'En russe, on ne dit pas « je suis étudiant » mais « je étudiant » : « Я студент ». Le verbe « être » disparaît au présent. Pour « vous » poli ou pluriel, on dit Вы.' },
    phrases: [
      'Привет|privièt|Salut|img:handshake', 'Здравствуйте|zdrastvouïtié|Bonjour (poli)', 'Доброе утро|dobraïé outra|Bonjour (matin)|img:sunrise',
      'Добрый вечер|dobryï viétchir|Bonsoir|img:sunset', 'До свидания|da svidania|Au revoir|👋', 'Как вас зовут?|kak vas zavout|Comment vous appelez-vous ?',
      'Меня зовут Анна|minia zavout anna|Je m\'appelle Anna', 'Я из Франции|ia iz frantsii|Je viens de France|🇫🇷', 'Я студент|ia stoudiént|Je suis étudiant|img:student',
      'Как дела?|kak diéla|Comment ça va ?', 'Хорошо, спасибо|kharacho spassiba|Bien, merci', 'Очень приятно|otchin priyatna|Enchanté(e)',
      'Спасибо|spassiba|Merci|🙏', 'Пожалуйста|pajalousta|De rien, s\'il vous plaît',
    ],
    qa: [['Как вас зовут?', 'Меня зовут Анна', 'До свидания', 'Очень приятно'], ['Как дела?', 'Хорошо, спасибо', 'До свидания', 'Привет'], ['Спасибо', 'Пожалуйста', 'Привет', 'До свидания']],
  },
  {
    id: 'ru-2', theme: 'objects', title: 'Nommer et décrire', romanized: true,
    goal: 'Nommer des objets et leur genre',
    tip: { title: 'Trois genres', body: 'On reconnaît le genre à la finale : consonne = masculin (дом), -а/-я = féminin (книга), -о/-е = neutre (окно). « Он » (il), « она » (elle), « оно » (cela).' },
    phrases: [
      'Что это?|chto éta|Qu\'est-ce que c\'est ?', 'Это дом|éta dom|C\'est une maison|img:house', 'Это книга|éta kniga|C\'est un livre|img:book',
      'Это стол|éta stol|C\'est une table|img:table', 'Это ручка|éta routchka|C\'est un stylo|img:pen', 'Это ключ|éta klioutch|C\'est une clé|img:key',
      'он|on|il', 'она|ana|elle', 'большой|balchoï|grand', 'маленький|maliénkiï|petit', 'красивый|krassivyï|beau', 'Это большой дом|éta balchoï dom|C\'est une grande maison',
    ],
    qa: [['Что это?', 'Это книга', 'он', 'она']],
  },
  {
    id: 'ru-3', theme: 'places', title: 'Où ?', romanized: true,
    goal: 'Localiser avec le prépositionnel',
    tip: { title: 'Le prépositionnel', body: 'Après « в » (dans, à) et « на » (sur), le nom prend souvent -е : « город » → « в городе » (en ville). « Где » = où.' },
    phrases: [
      'Где?|gdié|Où ?', 'Где больница?|gdié balnitsa|Où est l\'hôpital ?', 'больница|balnitsa|hôpital|img:hospital', 'школа|chkola|école|img:school',
      'рынок|rynak|marché|img:market', 'улица|oulitsa|rue|img:street', 'город|gorat|ville|img:city', 'библиотека|bibliatiéka|bibliothèque|img:library',
      'Налево|naliéva|À gauche|⬅️', 'Направо|naprava|À droite|➡️', 'Прямо|priama|Tout droit|⬆️', 'Близко|bliska|Près', 'Далеко|daliéko|Loin',
      'Она в городе|ana v garadié|Elle est en ville',
    ],
    qa: [['Где больница?', 'Налево', 'школа', 'улица'], ['Где больница?', 'Близко', 'рынок', 'город']],
  },
  {
    id: 'ru-4', theme: 'food', title: 'Goûts', romanized: true,
    goal: 'Dire ce qu\'on aime avec l\'accusatif',
    tip: { title: 'L\'accusatif', body: 'Le complément d\'objet direct féminin en -а prend -у : « Я люблю воду » (j\'aime l\'eau). Le masculin inanimé ne change pas : « Я люблю кофе / чай ».' },
    phrases: [
      'вода|vada|eau|img:water', 'хлеб|khliép|pain|img:bread', 'рыба|ryba|poisson|img:fish', 'яблоко|iablaka|pomme|img:apple', 'сок|sok|jus|img:juice',
      'молоко|malako|lait|img:milk', 'чай|tchaï|thé|img:tea', 'кофе|kofé|café|img:coffee', 'Что вы хотите?|chto vy khatitié|Que voulez-vous ?',
      'Я люблю кофе|ia lioubliou kofé|J\'aime le café', 'Я не люблю молоко|ia ni lioubliou malako|Je n\'aime pas le lait', 'Я хочу чай, пожалуйста|ia khatchou tchaï pajalousta|Je voudrais un thé, s\'il vous plaît',
      'Я хочу есть|ia khatchou iést\'|J\'ai faim|🍽️', 'Я хочу пить|ia khatchou pit\'|J\'ai soif|img:drinking', 'Счёт, пожалуйста|chtchot pajalousta|L\'addition, s\'il vous plaît',
    ],
    qa: [['Что вы хотите?', 'Я хочу чай, пожалуйста', 'яблоко', 'сок']],
  },
  {
    id: 'ru-5', theme: 'family', title: 'Posséder', romanized: true,
    goal: 'Dire ce qu\'on a avec у меня есть et le génitif',
    tip: { title: '« Avoir » = « chez moi il y a »', body: 'Le russe n\'a pas de verbe « avoir » courant : « У меня есть брат » = « chez moi il y a un frère ». Pour la négation, « нет » + génitif : « У меня нет детей ».' },
    phrases: [
      'мама|mama|maman|img:mother', 'папа|papa|papa|img:father', 'брат|brat|frère|img:brother', 'сестра|sistra|sœur|img:sister', 'сын|syn|fils|img:boy', 'дочь|dotch\'|fille|img:girl',
      'семья|simia|famille|👨‍👩‍👧', 'У меня есть брат|ou minia iést\' brat|J\'ai un frère', 'У меня есть сестра|ou minia iést\' sistra|J\'ai une sœur',
      'У тебя есть дети?|ou tibia iést\' diéti|As-tu des enfants ?', 'У меня нет детей|ou minia niét diétiéï|Je n\'ai pas d\'enfants', 'Это моя мама|éta maïa mama|C\'est ma maman', 'Это мой папа|éta moï papa|C\'est mon papa',
    ],
    qa: [['У тебя есть дети?', 'У меня нет детей', 'семья', 'сын']],
  },
  {
    id: 'ru-6', theme: 'daily_life', title: 'Ma routine', romanized: true,
    goal: 'Décrire sa journée au présent',
    tip: { title: 'Verbes en -ю / -у', body: 'À la 1re personne du singulier, le verbe finit en -ю ou -у : « я работаю » (je travaille), « я встаю » (je me lève). Le russe n\'a qu\'un présent.' },
    phrases: [
      'Я встаю в семь часов|ia fstaïou f siem\' tchassof|Je me lève à sept heures|⏰', 'Я завтракаю в восемь|ia zaftrakaïou v vossiem\'|Je prends le petit-déjeuner à huit heures|🍳',
      'Я работаю в офисе|ia rabotaïou v ofissié|Je travaille dans un bureau|💼', 'Я обедаю в час|ia abiédaïou f tchass|Je déjeune à une heure',
      'Я иду домой|ia idou damoï|Je rentre à la maison|img:house', 'Я ужинаю с семьёй|ia oujinaïou s simioï|Je dîne avec ma famille',
      'Я ложусь спать в одиннадцать|ia lajous\' spat\' v adinatsat\'|Je me couche à onze heures|😴', 'Который час?|katoryï tchass|Quelle heure est-il ?|img:clock',
      'Сейчас три часа|sitchass tri tchassa|Il est trois heures', 'сегодня|sivodnia|aujourd\'hui', 'завтра|zaftra|demain', 'сейчас|sitchass|maintenant',
    ],
    qa: [['Который час?', 'Сейчас три часа', 'сегодня', 'завтра']],
  },
  {
    id: 'ru-7', theme: 'daily_life', title: 'Restaurant et achats', romanized: true,
    goal: 'Commander et demander un prix',
    phrases: [
      'один|adin|un (1)|1️⃣', 'два|dva|deux (2)|2️⃣', 'три|tri|trois (3)|3️⃣', 'четыре|tchitiry|quatre (4)|4️⃣', 'пять|piat\'|cinq (5)|5️⃣',
      'Сколько это стоит?|skol\'ka éta stoït|Combien ça coûte ?|img:money', 'Это стоит пять евро|éta stoït piat\' évra|Ça coûte cinq euros', 'Дайте хлеб, пожалуйста|daïtié khliép pajalousta|Donnez-moi du pain, s\'il vous plaît|img:bread',
      'Это дорого|éta doraga|C\'est cher', 'Это дёшево|éta diochiva|C\'est bon marché', 'магазин|magazin|magasin|🏪', 'деньги|diéng\'i|argent|img:money', 'сумка|soumka|sac|🛍️',
      'Вот, пожалуйста|vot pajalousta|Voici', 'Что-нибудь ещё?|chto-nibout\' ichtchio|Autre chose ?', 'Больше ничего, спасибо|bol\'ché nitchivo spassiba|Rien d\'autre, merci',
    ],
    qa: [['Сколько это стоит?', 'Это стоит пять евро', 'магазин', 'сумка'], ['Что-нибудь ещё?', 'Больше ничего, спасибо', 'магазин', 'деньги']],
  },
];
