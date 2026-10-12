import { lv, type SimpleUnit } from '../simple';

// ─── Mandarin — A2 et B1 ─────────────────────────────────────────────────────
// Source : programmes/mandarin.md. Caractères simplifiés + pinyin.

export const ZH_A2: SimpleUnit[] = lv('intermediate', [
  {
    id: 'zh-7', theme: 'daily_life', title: 'Dire ce qui est fait', romanized: true,
    goal: 'Employer 了 comme aspect accompli',
    tip: { title: '了 : l\'action est faite', body: '了 se place après le verbe pour dire que l\'action est accomplie : « 我吃了早饭 » (j\'ai pris le petit-déjeuner). Pour nier, on emploie 没(有) et on supprime 了 : « 我没吃 ».' },
    phrases: [
      '我吃了早饭|wǒ chī le zǎofàn|J\'ai pris le petit-déjeuner|🍳', '他去了商店|tā qù le shāngdiàn|Il est allé au magasin|🏪', '你吃饭了吗？|nǐ chī fàn le ma|As-tu mangé ?', '我已经吃了|wǒ yǐjīng chī le|J\'ai déjà mangé', '我还没吃|wǒ hái méi chī|Je n\'ai pas encore mangé',
      '昨天我看了一部电影|zuótiān wǒ kàn le yí bù diànyǐng|Hier j\'ai vu un film', '我买了一本书|wǒ mǎi le yì běn shū|J\'ai acheté un livre|img:book', '你做了什么？|nǐ zuò le shénme|Qu\'as-tu fait ?',
    ],
    tokens: { '我吃了早饭': ['我|wǒ', '吃了|chī le', '早饭|zǎofàn'], '我买了一本书': ['我|wǒ', '买了|mǎi le', '一本|yì běn', '书|shū'] },
    orders: ['我吃了早饭', '我买了一本书'],
    qa: [['你做了什么？', '我买了一本书', '你吃饭了吗？', '我还没吃']],
  },
  {
    id: 'zh-8', theme: 'places', title: 'Expérience', romanized: true,
    goal: 'Parler d\'une expérience avec 过',
    tip: { title: '过 : avoir déjà fait', body: '过 après le verbe = « avoir déjà fait une fois dans sa vie » : « 我去过中国 » (je suis déjà allé en Chine). Négation : 没…过 (« 我没去过 »).' },
    phrases: [
      '你去过中国吗？|nǐ qù guo Zhōngguó ma|Es-tu déjà allé en Chine ?', '我去过两次|wǒ qù guo liǎng cì|J\'y suis allé deux fois', '我没去过|wǒ méi qù guo|Je n\'y suis jamais allé', '我吃过北京烤鸭|wǒ chī guo Běijīng kǎoyā|J\'ai déjà mangé du canard laqué de Pékin',
      '你看过这个电影吗？|nǐ kàn guo zhège diànyǐng ma|As-tu déjà vu ce film ?', '我没看过|wǒ méi kàn guo|Je ne l\'ai jamais vu', '我学过一年中文|wǒ xué guo yì nián Zhōngwén|J\'ai étudié le chinois pendant un an',
    ],
    tokens: { '我去过两次': ['我|wǒ', '去过|qù guo', '两次|liǎng cì'], '我没看过': ['我|wǒ', '没|méi', '看过|kàn guo'] },
    orders: ['我去过两次', '我没看过'],
    qa: [['你去过中国吗？', '我去过两次', '我没看过', '我学过一年中文']],
  },
  {
    id: 'zh-9', theme: 'daily_life', title: 'Capacité et permission', romanized: true,
    goal: 'Employer 会， 能， 可以',
    tip: { title: 'Trois façons de « pouvoir »', body: '会 = savoir (compétence apprise : « 我会说中文 »). 能 = pouvoir (capacité ou circonstance : « 我今天不能来 »). 可以 = avoir la permission (« 这里可以拍照吗？ »).' },
    phrases: [
      '我会说中文|wǒ huì shuō Zhōngwén|Je sais parler chinois', '我不会游泳|wǒ bú huì yóuyǒng|Je ne sais pas nager', '我能来|wǒ néng lái|Je peux venir', '我今天不能来|wǒ jīntiān bù néng lái|Je ne peux pas venir aujourd\'hui', '这里可以拍照吗？|zhèlǐ kěyǐ pāizhào ma|Peut-on prendre des photos ici ?',
      '可以|kěyǐ|C\'est permis', '不可以|bù kěyǐ|Ce n\'est pas permis', '你会开车吗？|nǐ huì kāichē ma|Sais-tu conduire ?',
    ],
    tokens: { '我会说中文': ['我|wǒ', '会|huì', '说|shuō', '中文|Zhōngwén'], '我不会游泳': ['我|wǒ', '不会|bú huì', '游泳|yóuyǒng'] },
    orders: ['我会说中文', '我不会游泳'],
    qa: [['这里可以拍照吗？', '可以', '我不会游泳', '我会说中文']],
  },
  {
    id: 'zh-10', theme: 'daily_life', title: 'Comparer', romanized: true,
    goal: 'Comparer avec 比',
    tip: { title: 'A 比 B + adjectif', body: '« 我比你高 » = « moi (比) toi grand » : je suis plus grand que toi. On ne met pas « très » devant l\'adjectif. Négation : A 没有 B + adjectif (« 我没有你高 »). Superlatif : 最.' },
    phrases: [
      '我比你高|wǒ bǐ nǐ gāo|Je suis plus grand que toi', '北京比上海冷|Běijīng bǐ Shànghǎi lěng|Pékin est plus froid que Shanghai', '这个比那个便宜|zhège bǐ nàge piányi|Celui-ci est moins cher que celui-là', '他比我大两岁|tā bǐ wǒ dà liǎng suì|Il a deux ans de plus que moi',
      '我没有你高|wǒ méiyǒu nǐ gāo|Je ne suis pas aussi grand que toi', '哪个更好？|nǎge gèng hǎo|Lequel est mieux ?', '这个更好|zhège gèng hǎo|Celui-ci est mieux', '最好|zuì hǎo|le meilleur',
    ],
    tokens: { '我比你高': ['我|wǒ', '比|bǐ', '你|nǐ', '高|gāo'], '这个比那个便宜': ['这个|zhège', '比|bǐ', '那个|nàge', '便宜|piányi'] },
    orders: ['我比你高', '这个比那个便宜'],
    qa: [['哪个更好？', '这个更好', '我没有你高', '我比你高']],
  },
  {
    id: 'zh-11', theme: 'daily_life', title: 'Préciser un détail', romanized: true,
    goal: 'Employer 是…的',
    tip: { title: '是…的 : insister sur le détail', body: 'Quand l\'action est passée et connue, on insiste sur le quand, le comment ou le où avec 是…的 : « 我是昨天来的 » (c\'est hier que je suis venu), « 我是坐飞机来的 » (je suis venu en avion).' },
    phrases: [
      '你是什么时候来的？|nǐ shì shénme shíhou lái de|Quand es-tu venu ?', '我是昨天来的|wǒ shì zuótiān lái de|C\'est hier que je suis venu', '你是怎么来的？|nǐ shì zěnme lái de|Comment es-tu venu ?', '我是坐飞机来的|wǒ shì zuò fēijī lái de|Je suis venu en avion|✈️',
      '这是在哪儿买的？|zhè shì zài nǎr mǎi de|Où as-tu acheté ça ?', '我是在北京学的中文|wǒ shì zài Běijīng xué de Zhōngwén|C\'est à Pékin que j\'ai appris le chinois', '他是一个人来的|tā shì yí gè rén lái de|Il est venu seul',
    ],
    tokens: { '我是昨天来的': ['我|wǒ', '是|shì', '昨天|zuótiān', '来|lái', '的|de'], '我是坐飞机来的': ['我|wǒ', '是|shì', '坐飞机|zuò fēijī', '来|lái', '的|de'] },
    orders: ['我是昨天来的', '我是坐飞机来的'],
    qa: [['你是怎么来的？', '我是坐飞机来的', '他是一个人来的', '我是昨天来的']],
  },
  {
    id: 'zh-12', theme: 'places', title: 'Se déplacer', romanized: true,
    goal: 'Employer 去 et 来',
    tip: { title: 'Aller et venir', body: '去 (qù) = aller, s\'éloigner du locuteur ; 来 (lái) = venir, se rapprocher. « 我去学校 » (je vais à l\'école), « 他来我家 » (il vient chez moi). Moyen de transport : 坐 + transport + 去/来 (« 坐地铁去 »).' },
    phrases: [
      '我要去学校|wǒ yào qù xuéxiào|Je vais aller à l\'école|img:school', '你去哪儿？|nǐ qù nǎr|Où vas-tu ?', '他来我家|tā lái wǒ jiā|Il vient chez moi|img:house', '请进来|qǐng jìnlái|Entrez, je vous prie', '我回家|wǒ huí jiā|Je rentre à la maison',
      '我们坐地铁去|wǒmen zuò dìtiě qù|Nous y allons en métro|🚇', '我骑自行车来|wǒ qí zìxíngchē lái|Je viens à vélo|img:bicycle', '出租车|chūzūchē|taxi|img:taxi', '机场|jīchǎng|aéroport|img:airplane',
    ],
    tokens: { '我们坐地铁去': ['我们|wǒmen', '坐|zuò', '地铁|dìtiě', '去|qù'], '我骑自行车来': ['我|wǒ', '骑|qí', '自行车|zìxíngchē', '来|lái'] },
    orders: ['我们坐地铁去', '我骑自行车来'],
    qa: [['你去哪儿？', '我要去学校', '出租车', '机场']],
  },
]);

export const ZH_B1: SimpleUnit[] = lv('advanced', [
  {
    id: 'zh-13', theme: 'discourse', title: 'Raconter', romanized: true,
    goal: 'Enchaîner des événements avec 然后',
    tip: { title: 'Les connecteurs de récit', body: '首先 (d\'abord), 然后 (ensuite), 接着 (puis), 后来 (plus tard), 最后 (enfin), 突然 (soudain). Ils se placent en début de proposition.' },
    phrases: [
      '首先，我起床|shǒuxiān, wǒ qǐchuáng|D\'abord, je me lève|⏰', '然后，我吃早饭|ránhòu, wǒ chī zǎofàn|Ensuite, je prends le petit-déjeuner|🍳', '接着，我去上班|jiēzhe, wǒ qù shàngbān|Puis, je vais travailler|💼', '最后，我回家|zuìhòu, wǒ huí jiā|Enfin, je rentre à la maison',
      '后来，他走了|hòulái, tā zǒu le|Plus tard, il est parti', '突然，下雨了|tūrán, xiàyǔ le|Soudain, il s\'est mis à pleuvoir', '你周末做了什么？|nǐ zhōumò zuò le shénme|Qu\'as-tu fait ce week-end ?', '我去了公园，然后看了电影|wǒ qù le gōngyuán, ránhòu kàn le diànyǐng|Je suis allé au parc, puis j\'ai vu un film',
    ],
    qa: [['你周末做了什么？', '我去了公园，然后看了电影', '突然，下雨了', '最后，我回家']],
  },
  {
    id: 'zh-14', theme: 'discourse', title: 'Manière', romanized: true,
    goal: 'Employer le complément en 得',
    tip: { title: '得 : décrire la manière', body: 'Verbe + 得 + adjectif décrit comment on fait : « 他说得很快 » (il parle très vite). S\'il y a un objet, on répète le verbe : « 他说中文说得很好 ».' },
    phrases: [
      '他说得很快|tā shuō de hěn kuài|Il parle très vite', '我说得不好|wǒ shuō de bù hǎo|Je ne parle pas bien', '她唱得很好听|tā chàng de hěn hǎotīng|Elle chante très bien', '你写得真漂亮|nǐ xiě de zhēn piàoliang|Tu écris vraiment joliment',
      '他跑得比我快|tā pǎo de bǐ wǒ kuài|Il court plus vite que moi', '你做得怎么样？|nǐ zuò de zěnmeyàng|Comment t\'en sors-tu ?', '我开得很慢|wǒ kāi de hěn màn|Je conduis très lentement',
    ],
    tokens: { '他说得很快': ['他|tā', '说得|shuō de', '很快|hěn kuài'], '我开得很慢': ['我|wǒ', '开得|kāi de', '很慢|hěn màn'] },
    orders: ['他说得很快', '我开得很慢'],
    qa: [['你做得怎么样？', '我说得不好', '我开得很慢', '她唱得很好听']],
  },
  {
    id: 'zh-15', theme: 'discourse', title: 'Mettre en avant', romanized: true,
    goal: 'Employer 把 et 被',
    tip: { title: '把 et 被', body: '把 place l\'objet avant le verbe pour montrer ce qu\'on lui fait : « 请把门关上 » (fermez la porte). 被 introduit le passif : « 我的钱包被偷了 » (mon portefeuille a été volé). Le verbe est toujours suivi d\'un résultat.' },
    phrases: [
      '请把门关上|qǐng bǎ mén guānshàng|Veuillez fermer la porte|img:door', '我把书放在桌子上|wǒ bǎ shū fàng zài zhuōzi shàng|J\'ai posé le livre sur la table|img:table', '他把作业做完了|tā bǎ zuòyè zuò wán le|Il a fini ses devoirs', '发生了什么？|fāshēng le shénme|Que s\'est-il passé ?', '我的钱包被偷了|wǒ de qiánbāo bèi tōu le|On m\'a volé mon portefeuille',
      '杯子被打破了|bēizi bèi dǎpò le|Le verre a été cassé', '请把窗户打开|qǐng bǎ chuānghu dǎkāi|Veuillez ouvrir la fenêtre', '门被风吹开了|mén bèi fēng chuī kāi le|La porte a été ouverte par le vent',
    ],
    tokens: { '请把门关上': ['请|qǐng', '把|bǎ', '门|mén', '关上|guānshàng'], '杯子被打破了': ['杯子|bēizi', '被|bèi', '打破了|dǎpò le'] },
    orders: ['请把门关上', '杯子被打破了'],
    qa: [['发生了什么？', '我的钱包被偷了', '请把窗户打开', '杯子被打破了']],
  },
  {
    id: 'zh-16', theme: 'discourse', title: 'Donner son avis', romanized: true,
    goal: 'Employer 觉得 et 因为…所以',
    tip: { title: 'Opinion et cause', body: '觉得 = trouver, penser (« 我觉得很好 »). 因为…所以… = parce que… donc… (« 因为下雨，所以我不去 »). 虽然…但是… = bien que… mais… ; 如果…就… = si… alors…' },
    phrases: [
      '我觉得这个很好|wǒ juéde zhège hěn hǎo|Je trouve que c\'est très bien', '你觉得怎么样？|nǐ juéde zěnmeyàng|Qu\'en penses-tu ?', '因为下雨，所以我不去|yīnwèi xiàyǔ, suǒyǐ wǒ bú qù|Parce qu\'il pleut, je n\'y vais pas', '虽然很难，但是很有意思|suīrán hěn nán, dànshì hěn yǒu yìsi|Bien que difficile, c\'est très intéressant',
      '我同意|wǒ tóngyì|Je suis d\'accord', '我不同意|wǒ bù tóngyì|Je ne suis pas d\'accord', '我觉得学中文很重要|wǒ juéde xué Zhōngwén hěn zhòngyào|Je pense qu\'apprendre le chinois est important', '如果有时间，我就去|rúguǒ yǒu shíjiān, wǒ jiù qù|Si j\'ai le temps, j\'irai',
    ],
    qa: [['你觉得怎么样？', '我觉得这个很好', '如果有时间，我就去', '因为下雨，所以我不去']],
  },
]);
