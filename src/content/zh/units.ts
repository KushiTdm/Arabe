import { ws, type ReadingSpec } from '../builders';
import type { SimpleUnit } from '../simple';

// ─── Mandarin — A1 : tons et pinyin (P1-P4) puis unités orales ───────────────
// Source : programmes/mandarin.md. Les mots sont affichés en caractères avec leur
// pinyin (tr). Les unités de lecture suivent les initiales du pinyin ; les
// caractères sont présentés mais pas encore à écrire.

export const ZH_READING: Omit<ReadingSpec, 'known'>[] = [
  {
    id: 'zh-P1', theme: 'reading', title: 'Les quatre tons',
    goal: 'Entendre et reproduire les quatre tons',
    letters: [],
    intro: [
      { title: 'Le ton change le sens', body: 'Le mandarin a 4 tons : 1er ¯ haut et plat (mā), 2e ´ montant (má), 3e ˇ descendant-montant (mǎ), 4e ` descendant sec (mà). La même syllabe « ma » peut signifier maman, chanvre, cheval ou gronder.' },
      { title: 'Écoute avant de lire', body: 'Sur ton téléphone, utilise le bouton « Lent ». Imagine le ton comme une mélodie : plat, montée, creux, chute.' },
    ],
    words: ws(['妈|mā|maman (1er ton)|img:mother', '麻|má|chanvre (2e ton)', '马|mǎ|cheval (3e ton)|img:horse', '骂|mà|gronder (4e ton)']),
    pairs: [
      [{ ar: '妈', tr: 'mā', fr: 'maman (1er ton)' }, { ar: '麻', tr: 'má', fr: 'chanvre (2e ton)' }, '1er ton plat, 2e ton montant : écoute la direction de la voix.'],
      [{ ar: '马', tr: 'mǎ', fr: 'cheval (3e ton)' }, { ar: '骂', tr: 'mà', fr: 'gronder (4e ton)' }, '3e ton creux, 4e ton qui tombe d\'un coup.'],
    ],
  },
  {
    id: 'zh-P2', theme: 'reading', title: 'Initiales I',
    goal: 'Lire b p m f d t n l g k h, aspirées et non aspirées',
    letters: ['b', 'p', 'm', 'f', 'd', 't', 'n', 'l', 'g', 'k', 'h'],
    intro: [{ title: 'b / p, d / t, g / k', body: 'En pinyin, b d g sont des sons non aspirés (comme p t k français) et p t k sont aspirés (avec un souffle). « b » ≠ le b français : approche-toi de « p ».' }],
    words: ws(['爸|bà|papa|img:father', '他|tā|il', '大|dà|grand', '你|nǐ|tu', '好|hǎo|bon, bien', '哥|gē|frère aîné|img:brother', '喝|hē|boire', '来|lái|venir', '不|bù|ne… pas', '吗|ma|(particule de question)', '个|gè|(classificateur)', '看|kàn|regarder']),
  },
  {
    id: 'zh-P3', theme: 'reading', title: 'Rétroflexes',
    goal: 'Lire zh ch sh r et les opposer à z c s',
    letters: ['zh', 'ch', 'sh', 'r'],
    intro: [{ title: 'La langue relevée', body: 'zh, ch, sh, r se prononcent avec la pointe de la langue relevée vers le palais : « sh » est un « ch » français plus grave, « r » ressemble à un « j » rétroflexe. À ne pas confondre avec z, c, s (langue à plat).' }],
    words: ws(['是|shì|être', '吃|chī|manger', '日|rì|jour, soleil', '中|zhōng|milieu', '车|chē|voiture', '水|shuǐ|eau|img:water', '人|rén|personne', '住|zhù|habiter', '说|shuō|parler', '热|rè|chaud', '书|shū|livre|img:book', '找|zhǎo|chercher']),
  },
  {
    id: 'zh-P4', theme: 'reading', title: 'Initiales II',
    goal: 'Lire z c s j q x et ü',
    letters: ['z', 'c', 's', 'j', 'q', 'x', 'ü'],
    intro: [{ title: 'j, q, x et ü', body: 'j (dj doux), q (tch aspiré), x (s mouillé, entre « s » et « ch ») ne s\'emploient que devant i et ü. ü se prononce « u » français (comme dans lune) ; après j, q, x, il s\'écrit « u » mais se lit ü.' }],
    words: ws(['在|zài|être (quelque part)', '菜|cài|plat, légume', '三|sān|trois', '家|jiā|maison, famille|img:house', '七|qī|sept', '小|xiǎo|petit', '学|xué|étudier', '去|qù|aller', '想|xiǎng|vouloir, penser', '谢|xiè|remercier', '九|jiǔ|neuf', '女|nǚ|femme', '绿|lǜ|vert']),
  },
];

export const ZH_UNITS: SimpleUnit[] = [
  {
    id: 'zh-1', theme: 'greetings', title: 'Saluer, se présenter', romanized: true,
    goal: 'Dire bonjour, son nom et sa nationalité (是， 不)',
    tip: { title: 'Pas de conjugaison', body: 'Le chinois n\'a ni conjugaison ni articles. « 我是学生 » = « moi être étudiant ». Pour nier, 不 devant le verbe : « 我不是学生 » (je ne suis pas étudiant).' },
    phrases: [
      '你好|nǐ hǎo|Bonjour, salut|img:handshake', '您好|nín hǎo|Bonjour (poli)', '早上好|zǎoshang hǎo|Bonjour (le matin)|img:sunrise', '晚上好|wǎnshang hǎo|Bonsoir|img:sunset', '再见|zàijiàn|Au revoir|👋',
      '你叫什么名字？|nǐ jiào shénme míngzi|Comment t\'appelles-tu ?', '我叫安娜|wǒ jiào Ānnà|Je m\'appelle Anna', '我是法国人|wǒ shì Fǎguó rén|Je suis français(e)|🇫🇷', '我是学生|wǒ shì xuésheng|Je suis étudiant|img:student',
      '你好吗？|nǐ hǎo ma|Comment vas-tu ?', '我很好，谢谢|wǒ hěn hǎo, xièxie|Très bien, merci', '很高兴认识你|hěn gāoxìng rènshi nǐ|Enchanté(e)', '谢谢|xièxie|Merci|🙏', '不客气|bú kèqi|De rien',
    ],
    tokens: {
      '我叫安娜': ['我|wǒ', '叫|jiào', '安娜|Ānnà'],
      '我是法国人': ['我|wǒ', '是|shì', '法国人|Fǎguó rén'],
      '我是学生': ['我|wǒ', '是|shì', '学生|xuésheng'],
      '你好吗？': ['你|nǐ', '好|hǎo', '吗|ma'],
    },
    orders: ['我叫安娜', '我是法国人', '我是学生'],
    qa: [['你叫什么名字？', '我叫安娜', '再见', '不客气'], ['你好吗？', '我很好，谢谢', '再见', '谢谢'], ['谢谢', '不客气', '你好', '再见']],
  },
  {
    id: 'zh-2', theme: 'family', title: 'Famille et nombres', romanized: true,
    goal: 'Compter et employer le classificateur 个',
    tip: { title: 'Le classificateur 个', body: 'Entre un nombre et un nom, le chinois met un classificateur : « 两个哥哥 » = « deux (个) grands frères ». 个 (gè) est le plus courant. Pour « deux » devant un classificateur, on dit 两 (liǎng), non 二.' },
    phrases: [
      '一|yī|un (1)|1️⃣', '二|èr|deux (2)|2️⃣', '三|sān|trois (3)|3️⃣', '四|sì|quatre (4)|4️⃣', '五|wǔ|cinq (5)|5️⃣', '六|liù|six (6)|6️⃣', '七|qī|sept (7)|7️⃣', '八|bā|huit (8)|8️⃣', '九|jiǔ|neuf (9)|9️⃣', '十|shí|dix (10)|🔟',
      '爸爸|bàba|papa|img:father', '妈妈|māma|maman|img:mother', '哥哥|gēge|frère aîné|img:brother', '姐姐|jiějie|sœur aînée|img:sister',
      '你有兄弟姐妹吗？|nǐ yǒu xiōngdìjiěmèi ma|As-tu des frères et sœurs ?', '我有两个哥哥|wǒ yǒu liǎng gè gēge|J\'ai deux grands frères', '这是我妈妈|zhè shì wǒ māma|Voici ma mère',
    ],
    tokens: {
      '我有两个哥哥': ['我|wǒ', '有|yǒu', '两|liǎng', '个|gè', '哥哥|gēge'],
      '这是我妈妈': ['这|zhè', '是|shì', '我|wǒ', '妈妈|māma'],
    },
    orders: ['我有两个哥哥', '这是我妈妈'],
    qa: [['你有兄弟姐妹吗？', '我有两个哥哥', '十', '五']],
  },
  {
    id: 'zh-3', theme: 'daily_life', title: 'Heure et date', romanized: true,
    goal: 'Dire l\'heure : temps, lieu, puis verbe',
    tip: { title: 'Temps, lieu, verbe', body: 'L\'ordre est fixe : QUAND + OÙ + ACTION. « 我七点起床 » = « moi sept-heures me-lever » ; « 我在公司工作 » = « moi dans-l\'entreprise travailler ». Les mots de temps se placent avant le verbe.' },
    phrases: [
      '现在几点？|xiànzài jǐ diǎn|Quelle heure est-il ?|img:clock', '现在三点|xiànzài sān diǎn|Il est trois heures', '今天|jīntiān|aujourd\'hui', '明天|míngtiān|demain', '昨天|zuótiān|hier',
      '我七点起床|wǒ qī diǎn qǐchuáng|Je me lève à sept heures|⏰', '我八点吃早饭|wǒ bā diǎn chī zǎofàn|Je prends le petit-déjeuner à huit heures|🍳', '我在公司工作|wǒ zài gōngsī gōngzuò|Je travaille dans une entreprise|💼', '我十一点睡觉|wǒ shíyī diǎn shuìjiào|Je me couche à onze heures|😴',
    ],
    tokens: {
      '我七点起床': ['我|wǒ', '七点|qī diǎn', '起床|qǐchuáng'],
      '我八点吃早饭': ['我|wǒ', '八点|bā diǎn', '吃|chī', '早饭|zǎofàn'],
      '我在公司工作': ['我|wǒ', '在|zài', '公司|gōngsī', '工作|gōngzuò'],
    },
    orders: ['我七点起床', '我八点吃早饭', '我在公司工作'],
    qa: [['现在几点？', '现在三点', '今天', '明天']],
  },
  {
    id: 'zh-4', theme: 'food', title: 'Manger et boire', romanized: true,
    goal: 'Commander avec 想 et 要',
    tip: { title: '想 et 要', body: '想 = avoir envie de, 要 = vouloir / commander : « 我想喝茶 » (j\'aimerais du thé), « 我要一杯咖啡 » (je prends un café). 杯 (bēi) est le classificateur des verres et tasses.' },
    phrases: [
      '水|shuǐ|eau|img:water', '茶|chá|thé|img:tea', '咖啡|kāfēi|café|img:coffee', '米饭|mǐfàn|riz|🍚', '面包|miànbāo|pain|img:bread', '鱼|yú|poisson|img:fish', '苹果|píngguǒ|pomme|img:apple', '鸡蛋|jīdàn|œuf|img:eggs',
      '你想喝什么？|nǐ xiǎng hē shénme|Que veux-tu boire ?', '我想喝茶|wǒ xiǎng hē chá|J\'aimerais du thé', '我要一杯咖啡|wǒ yào yì bēi kāfēi|Je prends un café', '我很饿|wǒ hěn è|J\'ai faim|🍽️', '我很渴|wǒ hěn kě|J\'ai soif|img:drinking', '买单|mǎidān|L\'addition, s\'il vous plaît',
      '西红柿|xīhóngshì|tomate|img:tomato',
      '葡萄|pútao|raisin|img:grapes',
      '草莓|cǎoméi|fraise|img:strawberry',
      '橙子|chéngzi|orange|img:orange',
      '土豆|tǔdòu|pomme de terre|img:potato',
      '洋葱|yángcōng|oignon|img:onion',
    ],
    tokens: {
      '我想喝茶': ['我|wǒ', '想|xiǎng', '喝|hē', '茶|chá'],
      '我要一杯咖啡': ['我|wǒ', '要|yào', '一杯|yì bēi', '咖啡|kāfēi'],
      '你想喝什么？': ['你|nǐ', '想|xiǎng', '喝|hē', '什么|shénme'],
    },
    orders: ['我想喝茶', '我要一杯咖啡', '你想喝什么？'],
    qa: [['你想喝什么？', '我想喝茶', '苹果', '鸡蛋']],
  },
  {
    id: 'zh-5', theme: 'daily_life', title: 'Acheter', romanized: true,
    goal: 'Demander un prix (多少钱)',
    phrases: [
      '多少钱？|duōshao qián|Combien ça coûte ?|img:money', '五块钱|wǔ kuài qián|Cinq yuans', '太贵了|tài guì le|C\'est trop cher', '便宜一点|piányi yìdiǎn|Un peu moins cher, s\'il vous plaît', '我要这个|wǒ yào zhège|Je veux celui-ci',
      '可以刷卡吗？|kěyǐ shuākǎ ma|Puis-je payer par carte ?|💳', '商店|shāngdiàn|magasin|🏪', '钱|qián|argent|img:money',
    ],
    tokens: { '我要这个': ['我|wǒ', '要|yào', '这个|zhège'] },
    orders: ['我要这个'],
    qa: [['多少钱？', '五块钱', '商店', '钱'], ['太贵了', '便宜一点', '商店', '钱']],
  },
  {
    id: 'zh-6', theme: 'places', title: 'Localiser', romanized: true,
    goal: 'Dire où se trouve quelque chose (在)',
    tip: { title: '在 = être situé', body: '« 医院在那儿 » = « l\'hôpital est là-bas ». 在 relie un objet à son lieu. « 哪儿 » (nǎr) = où, « 那儿 » (nàr) = là-bas.' },
    phrases: [
      '医院在哪儿？|yīyuàn zài nǎr|Où est l\'hôpital ?', '医院在那儿|yīyuàn zài nàr|L\'hôpital est là-bas|img:hospital', '学校|xuéxiào|école|img:school', '图书馆|túshūguǎn|bibliothèque|img:library',
      '左边|zuǒbian|à gauche|⬅️', '右边|yòubian|à droite|➡️', '一直走|yìzhí zǒu|Allez tout droit|⬆️', '很近|hěn jìn|C\'est près', '很远|hěn yuǎn|C\'est loin', '厕所在哪儿？|cèsuǒ zài nǎr|Où sont les toilettes ?',
    ],
    tokens: {
      '医院在哪儿？': ['医院|yīyuàn', '在|zài', '哪儿|nǎr'],
      '医院在那儿': ['医院|yīyuàn', '在|zài', '那儿|nàr'],
      '厕所在哪儿？': ['厕所|cèsuǒ', '在|zài', '哪儿|nǎr'],
    },
    orders: ['医院在哪儿？', '医院在那儿', '厕所在哪儿？'],
    qa: [['医院在哪儿？', '医院在那儿', '学校', '图书馆'], ['医院在哪儿？', '很近', '左边', '右边']],
  },
];
