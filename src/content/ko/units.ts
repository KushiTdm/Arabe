import { ws, type ReadingSpec } from '../builders';
import type { SimpleUnit } from '../simple';

// ─── Coréen — A1 : lecture du hangeul (H1-H6) puis unités orales ─────────────
// Source : programmes/coreen.md. Romanisation révisée (RR). Mots réels ; une
// syllabe n'utilise que des jamo déjà vus.

export const KO_READING: Omit<ReadingSpec, 'known'>[] = [
  {
    id: 'ko-H1', theme: 'reading', title: 'Hangeul I : voyelles et ㅇ ㄴ ㅁ',
    goal: 'Lire les voyelles de base et ㅇ ㄴ ㅁ',
    letters: ['ㅏ', 'ㅓ', 'ㅗ', 'ㅜ', 'ㅡ', 'ㅣ', 'ㅇ', 'ㄴ', 'ㅁ'],
    intro: [{ title: 'Un alphabet logique', body: 'Le hangeul s\'écrit en blocs carrés : consonne + voyelle (+ consonne finale). ㅇ au début d\'une syllabe est muet : 아 = « a ». En fin de syllabe, ㅇ se lit « ng ».' }],
    words: ws(['나|na|moi, je', '너|neo|toi', '아니|ani|non', '오|o|cinq (5)', '이|i|deux (2) ; ce', '아이|ai|enfant', '어머니|eomeoni|mère|img:mother', '나무|namu|arbre|img:tree', '누나|nuna|grande sœur (d\'un garçon)', '이모|imo|tante maternelle', '오이|oi|concombre', '마음|maeum|cœur, esprit|img:heart']),
  },
  {
    id: 'ko-H2', theme: 'reading', title: 'Hangeul II : consonnes simples',
    goal: 'Lire ㄱ ㄷ ㅂ ㅅ ㅈ ㄹ ㅎ',
    letters: ['ㄱ', 'ㄷ', 'ㅂ', 'ㅅ', 'ㅈ', 'ㄹ', 'ㅎ'],
    intro: [{ title: 'Entre sourd et sonore', body: 'ㄱ ㄷ ㅂ ㅈ se prononcent doux (g, d, b, j) entre deux voyelles et plus secs (k, t, p, tch) en début de mot ou en fin de syllabe. ㄹ est un « r » léger entre voyelles, un « l » en fin de syllabe.' }],
    words: ws(['가수|gasu|chanteur', '고기|gogi|viande', '바다|bada|mer|img:sea', '사람|saram|personne', '나라|nara|pays', '주스|juseu|jus|img:juice', '하나|hana|un (1)', '아버지|abeoji|père|img:father', '어디|eodi|où', '도시|dosi|ville|img:city', '사랑|sarang|amour|img:heart', '한국|hanguk|Corée', '바지|baji|pantalon', '하루|haru|un jour']),
  },
  {
    id: 'ko-H3', theme: 'reading', title: 'Hangeul III : voyelles en y',
    goal: 'Lire ㅑ ㅕ ㅛ ㅠ ㅐ ㅔ',
    letters: ['ㅑ', 'ㅕ', 'ㅛ', 'ㅠ', 'ㅐ', 'ㅔ'],
    intro: [{ title: 'Les voyelles avec « y »', body: 'ㅑ ya, ㅕ yeo, ㅛ yo, ㅠ yu : ce sont les voyelles de base avec un petit trait de plus. ㅐ et ㅔ se prononcent presque pareil (« é ») dans le coréen moderne.' }],
    words: ws(['야구|yagu|baseball', '여기|yeogi|ici', '요리|yori|cuisine, plat', '우유|uyu|lait|img:milk', '고양이|goyangi|chat', '아내|anae|épouse', '개|gae|chien|img:dog', '새|sae|oiseau|img:bird', '네|ne|oui', '여자|yeoja|femme', '배|bae|poire ; bateau ; ventre']),
  },
  {
    id: 'ko-H4', theme: 'reading', title: 'Hangeul IV : consonnes aspirées',
    goal: 'Lire ㅋ ㅌ ㅍ ㅊ et les opposer aux simples',
    letters: ['ㅋ', 'ㅌ', 'ㅍ', 'ㅊ'],
    intro: [{ title: 'Avec un souffle', body: 'ㅋ ㅌ ㅍ ㅊ sont des consonnes aspirées : un souffle d\'air les accompagne (comme « k », « t », « p » anglais devant une voyelle). Mets la main devant ta bouche : tu dois sentir l\'air.' }],
    words: ws(['코|ko|nez', '커피|keopi|café|img:coffee', '토마토|tomato|tomate', '파티|pati|fête', '차|cha|thé ; voiture', '치마|chima|jupe', '카메라|kamera|appareil photo', '피자|pija|pizza', '포도|podo|raisin', '타다|tada|monter (dans)', '키|ki|taille', '치즈|chijeu|fromage']),
  },
  {
    id: 'ko-H5', theme: 'reading', title: 'Hangeul V : consonnes tendues',
    goal: 'Lire ㄲ ㄸ ㅃ ㅆ ㅉ : la triple opposition',
    letters: ['ㄲ', 'ㄸ', 'ㅃ', 'ㅆ', 'ㅉ'],
    intro: [{ title: 'Doubles = tendues', body: 'ㄲ ㄸ ㅃ ㅆ ㅉ sont des consonnes « tendues » : gorge serrée, sans souffle, comme un « k » ou « p » bien sec. La triple opposition g / k / kk (ㄱ ㅋ ㄲ) est la difficulté du coréen.' }],
    words: ws(['아빠|appa|papa|img:father', '엄마|eomma|maman|img:mother', '오빠|oppa|grand frère (d\'une fille)|img:brother', '아저씨|ajeossi|monsieur', '까치|kkachi|pie', '토끼|tokki|lapin', '쓰다|sseuda|écrire', '뽀뽀|ppoppo|bisou', '딸기|ttalgi|fraise', '싸다|ssada|être bon marché']),
  },
  {
    id: 'ko-H6', theme: 'reading', title: 'Hangeul VI : voyelles composées',
    goal: 'Lire ㅘ ㅝ ㅚ ㅟ ㅢ',
    letters: ['ㅘ', 'ㅝ', 'ㅚ', 'ㅟ', 'ㅢ'],
    words: ws(['과일|gwail|fruit', '사과|sagwa|pomme|img:apple', '와인|wain|vin', '뭐|mwo|quoi', '회사|hoesa|entreprise', '귀|gwi|oreille', '의사|uisa|médecin', '의자|uija|chaise', '위|wi|dessus', '가위|gawi|ciseaux', '쉬다|swida|se reposer', '되다|doeda|devenir']),
  },
];

export const KO_UNITS: SimpleUnit[] = [
  {
    id: 'ko-1', theme: 'greetings', title: 'Se présenter', romanized: true,
    goal: 'Se présenter avec 입니다 et 은/는',
    tip: { title: 'Le verbe à la fin', body: 'Le coréen met le verbe en dernière position : « 저는 학생입니다 » = « moi-(thème) étudiant-suis ». La particule 은/는 marque le thème de la phrase. 입니다 est la forme polie « suis / est ».' },
    phrases: [
      '안녕하세요|annyeonghaseyo|Bonjour|img:handshake', '안녕|annyeong|Salut', '안녕히 가세요|annyeonghi gaseyo|Au revoir (à celui qui part)|👋', '안녕히 계세요|annyeonghi gyeseyo|Au revoir (à celui qui reste)',
      '이름이 뭐예요?|ireumi mwoyeyo|Comment vous appelez-vous ?', '제 이름은 안나입니다|je ireumeun annaimnida|Je m\'appelle Anna', '저는 프랑스 사람입니다|jeoneun peurangseu saramimnida|Je suis français(e)|🇫🇷',
      '저는 학생입니다|jeoneun haksaengimnida|Je suis étudiant|img:student', '만나서 반갑습니다|mannaseo bangapseumnida|Enchanté(e)', '어떻게 지내세요?|eotteoke jinaeseyo|Comment allez-vous ?',
      '잘 지내요|jal jinaeyo|Je vais bien', '감사합니다|gamsahamnida|Merci|🙏', '괜찮아요|gwaenchanayo|Ça va, pas de souci',
    ],
    qa: [['이름이 뭐예요?', '제 이름은 안나입니다', '안녕히 가세요', '감사합니다'], ['어떻게 지내세요?', '잘 지내요', '안녕히 가세요', '안녕']],
  },
  {
    id: 'ko-2', theme: 'places', title: 'Désigner et localiser', romanized: true,
    goal: 'Dire où se trouvent les choses ; nombres sino-coréens',
    tip: { title: 'Deux systèmes de nombres', body: 'Le coréen a deux séries : sino-coréenne (일, 이, 삼, 사, 오 pour les prix, dates, minutes) et native (하나, 둘, 셋… pour l\'âge, l\'heure, le comptage). Ici : la sino-coréenne.' },
    phrases: [
      '이것은 뭐예요?|igeoseun mwoyeyo|Qu\'est-ce que c\'est ?', '이것은 책입니다|igeoseun chaegimnida|C\'est un livre|img:book', '집|jip|maison|img:house', '학교|hakgyo|école|img:school',
      '병원|byeongwon|hôpital|img:hospital', '병원은 어디예요?|byeongwoneun eodiyeyo|Où est l\'hôpital ?', '여기|yeogi|ici', '저기|jeogi|là-bas',
      '일|il|un (1)|1️⃣', '이|i|deux (2)|2️⃣', '삼|sam|trois (3)|3️⃣', '사|sa|quatre (4)|4️⃣', '오|o|cinq (5)|5️⃣', '십|sip|dix (10)|🔟',
    ],
    qa: [['이것은 뭐예요?', '이것은 책입니다', '집', '학교'], ['병원은 어디예요?', '저기', '일', '십']],
  },
  {
    id: 'ko-3', theme: 'daily_life', title: 'Actions du quotidien', romanized: true,
    goal: 'Parler de ses actions au style 해요체',
    tip: { title: 'Le style poli en -요', body: 'Dans la vie courante, on termine le verbe en -요 (style 해요체, poli et chaleureux) : 가요 (je vais), 먹어요 (je mange). L\'objet prend 을/를 (« 커피를 »), la destination prend 에 (« 학교에 »).' },
    phrases: [
      '일해요|ilhaeyo|Je travaille|💼', '공부해요|gongbuhaeyo|J\'étudie', '먹어요|meogeoyo|Je mange', '마셔요|masyeoyo|Je bois', '가요|gayo|Je vais', '와요|wayo|Je viens', '자요|jayo|Je dors|😴',
      '커피를 마셔요|keopireul masyeoyo|Je bois du café|img:coffee', '밥을 먹어요|bapeul meogeoyo|Je mange (un repas)', '집에 가요|jibe gayo|Je rentre à la maison|img:house', '학교에 가요|hakgyoe gayo|Je vais à l\'école|img:school', '어디에 가요?|eodie gayo|Où allez-vous ?',
    ],
    qa: [['어디에 가요?', '학교에 가요', '자요', '먹어요']],
  },
  {
    id: 'ko-4', theme: 'numbers', title: 'Heure, âge, objets', romanized: true,
    goal: 'Employer les nombres natifs et les classificateurs',
    phrases: [
      '하나|hana|un (1)|1️⃣', '둘|dul|deux (2)|2️⃣', '셋|set|trois (3)|3️⃣', '넷|net|quatre (4)|4️⃣', '다섯|daseot|cinq (5)|5️⃣',
      '지금 몇 시예요?|jigeum myeot siyeyo|Quelle heure est-il ?|img:clock', '세 시예요|se siyeyo|Il est trois heures', '몇 살이에요?|myeot sarieyo|Quel âge avez-vous ?', '스무 살이에요|seumu sarieyo|J\'ai vingt ans',
      '오늘|oneul|aujourd\'hui', '내일|naeil|demain',
    ],
    qa: [['지금 몇 시예요?', '세 시예요', '오늘', '내일'], ['몇 살이에요?', '스무 살이에요', '하나', '다섯']],
  },
  {
    id: 'ko-5', theme: 'food', title: 'Commander', romanized: true,
    goal: 'Commander avec 주세요',
    tip: { title: '주세요 : « donnez-moi »', body: 'Pour tout demander poliment : nom + 주세요. « 물 주세요 » (de l\'eau, s\'il vous plaît), « 이거 주세요 » (ceci, s\'il vous plaît).' },
    phrases: [
      '물 주세요|mul juseyo|De l\'eau, s\'il vous plaît|img:water', '커피 주세요|keopi juseyo|Un café, s\'il vous plaît|img:coffee', '이거 주세요|igeo juseyo|Donnez-moi ceci', '메뉴 주세요|menyu juseyo|Le menu, s\'il vous plaît',
      '계산서 주세요|gyesanseo juseyo|L\'addition, s\'il vous plaît', '얼마예요?|eolmayeyo|Combien ça coûte ?|img:money', '오천 원이에요|ocheon wonieyo|Ça fait cinq mille wons', '맛있어요|masisseoyo|C\'est délicieux',
      '비싸요|bissayo|C\'est cher', '싸요|ssayo|C\'est bon marché',
    ],
    qa: [['얼마예요?', '오천 원이에요', '물 주세요', '메뉴 주세요']],
  },
  {
    id: 'ko-6', theme: 'food', title: 'Décrire, goûts', romanized: true,
    goal: 'Dire ce qu\'on aime',
    phrases: [
      '저는 커피를 좋아해요|jeoneun keopireul joahaeyo|J\'aime le café|img:coffee', '저는 사과를 좋아해요|jeoneun sagwareul joahaeyo|J\'aime les pommes|img:apple', '저는 우유를 안 좋아해요|jeoneun uyureul an joahaeyo|Je n\'aime pas le lait|img:milk',
      '좋아요|joayo|C\'est bien, j\'aime', '싫어요|sireoyo|Je n\'aime pas', '예뻐요|yeppeoyo|C\'est joli', '커요|keoyo|C\'est grand', '작아요|jagayo|C\'est petit', '이 집은 커요|i jibeun keoyo|Cette maison est grande|img:house', '뭘 좋아해요?|mwol joahaeyo|Qu\'est-ce que vous aimez ?',
    ],
    qa: [['뭘 좋아해요?', '저는 커피를 좋아해요', '커요', '작아요']],
  },
];
