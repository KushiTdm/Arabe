import { ws, w, type ReadingSpec } from '../builders';
import type { SimpleUnit } from '../simple';

// ─── Japonais — A1 : hiragana (K1-K5) puis unités orales ─────────────────────
// Source : programmes/japonais.md. Romaji Hepburn. Les mots de lecture n'emploient
// que des hiragana déjà vus (pas encore de dakuten, de petits kana ni de katakana).
// Les unités orales utilisent l'écriture naturelle ; les katakana (コーヒー, アンナ…)
// y apparaissent avec leur romaji : ils ne sont pas encore enseignés.

export const JA_READING: Omit<ReadingSpec, 'known'>[] = [
  {
    id: 'ja-K1', theme: 'reading', title: 'Hiragana I : あ か',
    goal: 'Lire les rangées あ et か',
    letters: ['あ', 'い', 'う', 'え', 'お', 'か', 'き', 'く', 'け', 'こ'],
    intro: [{ title: 'Un son par signe', body: 'Le hiragana est un syllabaire : chaque signe = une syllabe (あ = a, か = ka). Les cinq voyelles あ い う え お (a i u e o) se disent comme en espagnol : pures et brèves.' }],
    words: ws(['あい|ai|amour', 'いえ|ie|maison|img:house', 'うえ|ue|dessus', 'あお|ao|bleu', 'かお|kao|visage', 'いけ|ike|étang', 'あか|aka|rouge', 'きく|kiku|écouter', 'こえ|koe|voix', 'かき|kaki|kaki', 'くうき|kūki|air', 'えき|eki|gare']),
  },
  {
    id: 'ja-K2', theme: 'reading', title: 'Hiragana II : さ た',
    goal: 'Lire les rangées さ et た',
    letters: ['さ', 'し', 'す', 'せ', 'そ', 'た', 'ち', 'つ', 'て', 'と'],
    intro: [{ title: 'Trois exceptions', body: 'し se lit « shi », ち se lit « chi », つ se lit « tsu » (et non « si, ti, tu »). Le « u » de す et つ est souvent presque muet dans la conversation.' }],
    words: ws(['すし|sushi|sushi', 'たこ|tako|poulpe', 'しお|shio|sel|img:salt', 'そこ|soko|là', 'あさ|asa|matin|img:sunrise', 'いす|isu|chaise', 'かさ|kasa|parapluie', 'つき|tsuki|lune|img:moon', 'とけい|tokei|horloge|img:clock', 'くつ|kutsu|chaussure', 'そと|soto|dehors', 'せき|seki|siège', 'あし|ashi|pied|img:foot']),
  },
  {
    id: 'ja-K3', theme: 'reading', title: 'Hiragana III : な は',
    goal: 'Lire les rangées な et は',
    letters: ['な', 'に', 'ぬ', 'ね', 'の', 'は', 'ひ', 'ふ', 'へ', 'ほ'],
    intro: [{ title: 'は et へ, deux cas particuliers', body: 'Comme particules, は se lit « wa » et へ se lit « e ». Dans un mot (はな, へそ), ils se lisent « ha » et « he ». ふ est entre « fu » et « hu ».' }],
    words: ws(['さかな|sakana|poisson|img:fish', 'ねこ|neko|chat', 'にく|niku|viande', 'はな|hana|fleur|img:flowers', 'ひと|hito|personne', 'ほし|hoshi|étoile|img:star', 'なつ|natsu|été', 'ふね|fune|bateau', 'はし|hashi|baguettes', 'あなた|anata|vous, tu', 'へそ|heso|nombril']),
  },
  {
    id: 'ja-K4', theme: 'reading', title: 'Hiragana IV : ま や',
    goal: 'Lire les rangées ま et や',
    letters: ['ま', 'み', 'む', 'め', 'も', 'や', 'ゆ', 'よ'],
    words: ws(['やま|yama|montagne', 'ゆめ|yume|rêve', 'もも|momo|pêche', 'みみ|mimi|oreille', 'ゆき|yuki|neige', 'むかし|mukashi|autrefois', 'はやい|hayai|rapide, tôt', 'あめ|ame|pluie', 'やすい|yasui|bon marché', 'つめ|tsume|ongle|img:nails', 'おもい|omoi|lourd', 'まいにち|mainichi|tous les jours']),
  },
  {
    id: 'ja-K5', theme: 'reading', title: 'Hiragana V : ら わ ん',
    goal: 'Lire les dernières rangées',
    letters: ['ら', 'り', 'る', 'れ', 'ろ', 'わ', 'を', 'ん'],
    intro: [{ title: 'Le « r » japonais et ん', body: 'ら り る れ ろ se prononcent avec un petit battement de langue, entre « r » et « l ». ん est une nasale : il ne se rattache à aucune voyelle (ほん = « hon »). を se lit « o » et n\'existe que comme particule.' }],
    words: ws(['にほん|nihon|Japon', 'ほん|hon|livre|img:book', 'みかん|mikan|mandarine', 'さくら|sakura|cerisier', 'とり|tori|oiseau|img:bird', 'くるま|kuruma|voiture', 'いろ|iro|couleur', 'わたし|watashi|moi, je', 'れきし|rekishi|histoire', 'おんな|onna|femme', 'りす|risu|écureuil', 'らいねん|rainen|l\'année prochaine']),
  },
];

export const JA_UNITS: SimpleUnit[] = [
  {
    id: 'ja-1', theme: 'greetings', title: 'Se présenter', romanized: true,
    goal: 'Se présenter avec は et です',
    tip: { title: 'Particule は et です', body: 'La particule は (lue « wa ») marque le thème : « わたしは アンナです » = « quant à moi, (je suis) Anna ». です = « est / suis » (poli). On omet souvent « je » : le contexte suffit. Les mots en katakana (アンナ, コーヒー) arrivent plus tard : lis le romaji.' },
    phrases: [
      'こんにちは|konnichiwa|Bonjour|img:handshake', 'おはようございます|ohayō gozaimasu|Bonjour (le matin)|img:sunrise', 'こんばんは|konbanwa|Bonsoir|img:sunset', 'さようなら|sayōnara|Au revoir|👋',
      'はじめまして|hajimemashite|Enchanté(e) (première rencontre)', 'おなまえはなんですか|onamae wa nan desu ka|Comment vous appelez-vous ?', 'わたしはアンナです|watashi wa Anna desu|Je suis Anna',
      'わたしはフランスじんです|watashi wa Furansujin desu|Je suis français(e)|🇫🇷', 'がくせいです|gakusei desu|Je suis étudiant|img:student', 'おげんきですか|ogenki desu ka|Comment allez-vous ?',
      'げんきです|genki desu|Je vais bien', 'ありがとうございます|arigatō gozaimasu|Merci|🙏', 'どういたしまして|dō itashimashite|De rien',
    ],
    tokens: {
      'わたしはアンナです': ['わたし|watashi', 'は|wa', 'アンナ|Anna', 'です|desu'],
      'わたしはフランスじんです': ['わたし|watashi', 'は|wa', 'フランスじん|Furansujin', 'です|desu'],
      'おなまえはなんですか': ['おなまえ|onamae', 'は|wa', 'なん|nan', 'ですか|desu ka'],
    },
    orders: ['わたしはアンナです', 'わたしはフランスじんです', 'おなまえはなんですか'],
    qa: [['おなまえはなんですか', 'わたしはアンナです', 'さようなら', 'どういたしまして'], ['おげんきですか', 'げんきです', 'さようなら', 'こんばんは'], ['ありがとうございます', 'どういたしまして', 'こんにちは', 'さようなら']],
  },
  {
    id: 'ja-2', theme: 'objects', title: 'Désigner', romanized: true,
    goal: 'Employer これ, それ, あれ',
    tip: { title: 'Ceci, cela, ça là-bas', body: 'これ = ceci (près de moi), それ = cela (près de toi), あれ = ça là-bas (loin des deux). « これは ほんです » = « ceci est un livre ».' },
    phrases: [
      'これ|kore|ceci', 'それ|sore|cela', 'あれ|are|ça là-bas', 'これはなんですか|kore wa nan desu ka|Qu\'est-ce que c\'est ?', 'これはほんです|kore wa hon desu|C\'est un livre|img:book',
      'あれはがっこうです|are wa gakkō desu|Là-bas, c\'est une école|img:school', 'これはみずです|kore wa mizu desu|C\'est de l\'eau|img:water', 'ほん|hon|livre|img:book', 'いえ|ie|maison|img:house', 'みず|mizu|eau|img:water', 'はい|hai|oui', 'いいえ|iie|non',
    ],
    tokens: {
      'これはほんです': ['これ|kore', 'は|wa', 'ほん|hon', 'です|desu'],
      'あれはがっこうです': ['あれ|are', 'は|wa', 'がっこう|gakkō', 'です|desu'],
      'これはみずです': ['これ|kore', 'は|wa', 'みず|mizu', 'です|desu'],
    },
    orders: ['これはほんです', 'あれはがっこうです', 'これはみずです'],
    qa: [['これはなんですか', 'これはほんです', 'はい', 'いいえ']],
  },
  {
    id: 'ja-3', theme: 'numbers', title: 'Acheter', romanized: true,
    goal: 'Demander un prix et compter',
    phrases: [
      'いち|ichi|un (1)|1️⃣', 'に|ni|deux (2)|2️⃣', 'さん|san|trois (3)|3️⃣', 'よん|yon|quatre (4)|4️⃣', 'ご|go|cinq (5)|5️⃣', 'ろく|roku|six (6)|6️⃣', 'なな|nana|sept (7)|7️⃣', 'はち|hachi|huit (8)|8️⃣', 'きゅう|kyū|neuf (9)|9️⃣', 'じゅう|jū|dix (10)|🔟',
      'いくらですか|ikura desu ka|Combien ça coûte ?|img:money', 'ごひゃくえんです|gohyaku en desu|Ça fait cinq cents yens', 'これをください|kore o kudasai|Donnez-moi ceci', 'たかいです|takai desu|C\'est cher', 'やすいです|yasui desu|C\'est bon marché',
    ],
    tokens: { 'これをください': ['これ|kore', 'を|o', 'ください|kudasai'] },
    orders: ['これをください'],
    qa: [['いくらですか', 'ごひゃくえんです', 'いち', 'じゅう']],
  },
  {
    id: 'ja-4', theme: 'daily_life', title: 'Ma routine', romanized: true,
    goal: 'Parler de ses actions avec ます et les particules',
    tip: { title: 'Particules を et へ', body: 'を (lue « o ») marque l\'objet : « コーヒーを のみます » (je bois du café). へ (lue « e ») marque la direction : « がっこうへ いきます » (je vais à l\'école). Le verbe ferme la phrase, en forme ます.' },
    phrases: [
      'まいあさろくじにおきます|maiasa rokuji ni okimasu|Je me lève à six heures tous les matins|⏰', 'あさごはんをたべます|asagohan o tabemasu|Je prends le petit-déjeuner|🍳', 'がっこうへいきます|gakkō e ikimasu|Je vais à l\'école|img:school',
      'うちへかえります|uchi e kaerimasu|Je rentre à la maison|img:house', 'コーヒーをのみます|kōhī o nomimasu|Je bois du café|img:coffee', 'ねます|nemasu|Je dors|😴', 'いまなんじですか|ima nanji desu ka|Quelle heure est-il ?|img:clock',
      'さんじです|sanji desu|Il est trois heures', 'きょう|kyō|aujourd\'hui', 'あした|ashita|demain',
    ],
    tokens: {
      'がっこうへいきます': ['がっこう|gakkō', 'へ|e', 'いきます|ikimasu'],
      'コーヒーをのみます': ['コーヒー|kōhī', 'を|o', 'のみます|nomimasu'],
      'あさごはんをたべます': ['あさごはん|asagohan', 'を|o', 'たべます|tabemasu'],
    },
    orders: ['がっこうへいきます', 'コーヒーをのみます', 'あさごはんをたべます'],
    qa: [['いまなんじですか', 'さんじです', 'きょう', 'あした']],
  },
  {
    id: 'ja-5', theme: 'places', title: 'Où est… ?', romanized: true,
    goal: 'Dire où se trouvent les choses (あります, います)',
    tip: { title: 'あります et います', body: 'Pour dire qu\'une chose existe : あります (objet, plante). Pour un être vivant : います. « ここに ほんが あります » = « il y a un livre ici ».' },
    phrases: [
      'えきはどこですか|eki wa doko desu ka|Où est la gare ?', 'おてあらいはどこですか|otearai wa doko desu ka|Où sont les toilettes ?', 'えき|eki|gare', 'ここ|koko|ici', 'そこ|soko|là', 'あそこ|asoko|là-bas',
      'みぎ|migi|droite|➡️', 'ひだり|hidari|gauche|⬅️', 'まっすぐ|massugu|tout droit|⬆️', 'ちかいです|chikai desu|C\'est près', 'とおいです|tōi desu|C\'est loin', 'ここにほんがあります|koko ni hon ga arimasu|Il y a un livre ici|img:book',
    ],
    tokens: {
      'えきはどこですか': ['えき|eki', 'は|wa', 'どこ|doko', 'ですか|desu ka'],
      'ここにほんがあります': ['ここ|koko', 'に|ni', 'ほん|hon', 'が|ga', 'あります|arimasu'],
    },
    orders: ['えきはどこですか', 'ここにほんがあります'],
    qa: [['えきはどこですか', 'ひだり', 'ここ', 'そこ'], ['えきはどこですか', 'ちかいです', 'みぎ', 'ひだり']],
  },
  {
    id: 'ja-6', theme: 'food', title: 'Goûts', romanized: true,
    goal: 'Dire ce qu\'on aime avec が好きです',
    tip: { title: 'Aimer = « être aimé »', body: '« すしが すきです » : « すし » est le sujet (が) et « すき » est un adjectif : le sushi est aimable (pour moi). Pour nier : « すきじゃありません ».' },
    phrases: [
      'すしがすきです|sushi ga suki desu|J\'aime les sushis', 'コーヒーがすきです|kōhī ga suki desu|J\'aime le café|img:coffee', 'さかながすきです|sakana ga suki desu|J\'aime le poisson|img:fish', 'にくはすきじゃありません|niku wa suki ja arimasen|Je n\'aime pas la viande',
      'おいしいです|oishii desu|C\'est délicieux', 'なにがすきですか|nani ga suki desu ka|Qu\'est-ce que vous aimez ?', 'みずをください|mizu o kudasai|De l\'eau, s\'il vous plaît|img:water',
    ],
    tokens: {
      'すしがすきです': ['すし|sushi', 'が|ga', 'すき|suki', 'です|desu'],
      'さかながすきです': ['さかな|sakana', 'が|ga', 'すき|suki', 'です|desu'],
      'みずをください': ['みず|mizu', 'を|o', 'ください|kudasai'],
    },
    orders: ['すしがすきです', 'さかながすきです', 'みずをください'],
    qa: [['なにがすきですか', 'すしがすきです', 'おいしいです', 'みずをください']],
  },
];
