import type { ConvSpec } from '../conversations';

// ─── ZH — conversations guidées (générées depuis la table de phrases communes) ───
// À faire relire par un locuteur natif.

export const ZH_CONVERSATIONS: ConvSpec[] = [
  {
    id: 'zh-C1', title: 'Rencontre', scene: 'handshake', npcRole: 'une personne que tu rencontres', romanized: true,
    situation: 'Tu rencontres quelqu\'un pour la première fois. Salue, présente-toi, réponds à ses questions.',
    key: ['早上好|zǎoshang hǎo|Bonjour (le matin)', '我叫安娜|wǒ jiào Ānnà|Je m\'appelle Anna', '我是法国人|wǒ shì Fǎguó rén|Je viens de France', '很高兴认识你|hěn gāoxìng rènshi nǐ|Enchanté(e)'],
    turns: [
      { npc: '早上好|zǎoshang hǎo|Bonjour (le matin)', ok: '早上好|zǎoshang hǎo|Bonjour (le matin)', bad: ['晚安|wǎn\'ān|Bonne nuit', '再见|zàijiàn|Au revoir'] },
      { npc: '你叫什么名字？|nǐ jiào shénme míngzi|Comment t\'appelles-tu ?', ok: '我叫安娜|wǒ jiào Ānnà|Je m\'appelle Anna', bad: ['我很好，谢谢|wǒ hěn hǎo, xièxie|Je vais bien, merci', '我是法国人|wǒ shì Fǎguó rén|Je viens de France'] },
      { npc: '你是哪国人？|nǐ shì nǎ guó rén|D\'où viens-tu ?', ok: '我是法国人|wǒ shì Fǎguó rén|Je viens de France', bad: ['我叫安娜|wǒ jiào Ānnà|Je m\'appelle Anna', '谢谢|xièxie|Merci'] },
      { npc: '很高兴认识你|hěn gāoxìng rènshi nǐ|Enchanté(e)', ok: '很高兴认识你|hěn gāoxìng rènshi nǐ|Enchanté(e)', bad: ['我不明白|wǒ bù míngbai|Je ne comprends pas', '不客气|bú kèqi|De rien'] },
      { npc: '你好吗？|nǐ hǎo ma|Comment vas-tu ?', ok: '我很好，谢谢|wǒ hěn hǎo, xièxie|Je vais bien, merci', bad: ['早上好|zǎoshang hǎo|Bonjour (le matin)', '医院在哪儿？|yīyuàn zài nǎr|Où est l\'hôpital ?'] },
      { npc: '再见|zàijiàn|Au revoir', ok: '一会儿见|yíhuìr jiàn|À bientôt', bad: ['早上好|zǎoshang hǎo|Bonjour (le matin)', '是|shì|Oui'] },
    ],
  },
  {
    id: 'zh-C2', title: 'Au café', scene: 'coffee', npcRole: 'le serveur', romanized: true,
    situation: 'Tu entres dans un café. Commande une boisson, réponds au serveur, paie.',
    key: ['咖啡|kāfēi|café|img:coffee', '茶|chá|thé|img:tea', '水|shuǐ|eau|img:water', '果汁|guǒzhī|jus|img:juice'],
    turns: [
      { npc: '你好，请问您想要什么？|nǐ hǎo, qǐngwèn nín xiǎng yào shénme|Bonjour, que veux-tu ?', ok: '我要一杯咖啡|wǒ yào yì bēi kāfēi|Je voudrais un café, s\'il vous plaît|img:coffee', bad: ['医院在哪儿？|yīyuàn zài nǎr|Où est l\'hôpital ?', '再见|zàijiàn|Au revoir'] },
      { npc: '还要别的吗？|hái yào biéde ma|Autre chose ?', ok: '不用了，谢谢|búyòng le, xièxie|Non, merci', bad: ['我叫安娜|wǒ jiào Ānnà|Je m\'appelle Anna', '一会儿见|yíhuìr jiàn|À bientôt'] },
      { npc: '三欧元|sān ōuyuán|Ça fait trois euros|img:money', ok: '给你|gěi nǐ|Voilà', bad: ['多少钱？|duōshao qián|Combien ça coûte ?', '我喜欢咖啡|wǒ xǐhuan kāfēi|J\'aime le café'] },
      { npc: '谢谢|xièxie|Merci', ok: '不客气|bú kèqi|De rien', bad: ['我不明白|wǒ bù míngbai|Je ne comprends pas', '是|shì|Oui'] },
    ],
  },
  {
    id: 'zh-C3', title: 'Au marché', scene: 'market', npcRole: 'le vendeur', romanized: true,
    situation: 'Tu fais tes courses au marché. Demande ce que tu veux, le prix, et paie.',
    key: ['面包|miànbāo|pain|img:bread', '鸡蛋|jīdàn|œufs|img:eggs', '鱼|yú|poisson|img:fish', '钱|qián|argent|img:money'],
    turns: [
      { npc: '你好，你要什么？|nǐ hǎo, nǐ yào shénme|Bonjour, que désirez-vous ?', ok: '我要面包|wǒ yào miànbāo|Je veux du pain|img:bread', bad: ['再见|zàijiàn|Au revoir', '医院在哪儿？|yīyuàn zài nǎr|Où est l\'hôpital ?'] },
      { npc: '你要几个？|nǐ yào jǐ gè|Combien en voulez-vous ?', ok: '两个，谢谢|liǎng gè, xièxie|Deux, s\'il vous plaît', bad: ['早上好|zǎoshang hǎo|Bonjour (le matin)', '晚安|wǎn\'ān|Bonne nuit'] },
      { npc: '给你|gěi nǐ|Voilà', ok: '多少钱？|duōshao qián|Combien ça coûte ?', bad: ['我不明白|wǒ bù míngbai|Je ne comprends pas', '我叫安娜|wǒ jiào Ānnà|Je m\'appelle Anna'] },
      { npc: '五欧元|wǔ ōuyuán|Ça fait cinq euros|img:money', ok: '给你|gěi nǐ|Voilà', bad: ['两个，谢谢|liǎng gè, xièxie|Deux, s\'il vous plaît', '是|shì|Oui'] },
      { npc: '谢谢，再见|xièxie, zàijiàn|Merci, au revoir', ok: '再见|zàijiàn|Au revoir', bad: ['早上好|zǎoshang hǎo|Bonjour (le matin)', '晚安|wǎn\'ān|Bonne nuit'] },
    ],
  },
  {
    id: 'zh-C4', title: 'Demander son chemin', scene: 'street', npcRole: 'un passant', romanized: true,
    situation: 'Tu cherches l\'hôpital. Demande ton chemin et comprends la réponse.',
    key: ['医院|yīyuàn|hôpital|img:hospital', '街|jiē|rue|img:street', '学校|xuéxiào|école|img:school', '市场|shìchǎng|marché|img:market'],
    turns: [
      { npc: '你需要帮忙吗？|nǐ xūyào bāngmáng ma|Avez-vous besoin d\'aide ?', ok: '是的，请问医院在哪儿？|shì de, qǐngwèn yīyuàn zài nǎr|Oui, où est l\'hôpital ?|img:hospital', bad: ['再见|zàijiàn|Au revoir', '我叫安娜|wǒ jiào Ānnà|Je m\'appelle Anna'] },
      { npc: '一直走，然后左转|yìzhí zǒu, ránhòu zuǒ zhuǎn|Tout droit puis à gauche', ok: '远吗？|yuǎn ma|Est-ce loin ?', bad: ['我是法国人|wǒ shì Fǎguó rén|Je viens de France', '我要面包|wǒ yào miànbāo|Je veux du pain|img:bread'] },
      { npc: '不远，很近|bù yuǎn, hěn jìn|Non, c\'est près', ok: '谢谢|xièxie|Merci', bad: ['我不明白|wǒ bù míngbai|Je ne comprends pas', '两个，谢谢|liǎng gè, xièxie|Deux, s\'il vous plaît'] },
      { npc: '不客气|bú kèqi|De rien', ok: '再见|zàijiàn|Au revoir', bad: ['我要一杯咖啡|wǒ yào yì bēi kāfēi|Je voudrais un café, s\'il vous plaît|img:coffee', '早上好|zǎoshang hǎo|Bonjour (le matin)'] },
    ],
  },
  {
    id: 'zh-C5', title: 'Ma famille', scene: '👨‍👩‍👧', npcRole: 'un ami', romanized: true,
    situation: 'Un ami regarde tes photos de famille. Dis qui est sur chaque photo.',
    key: ['爸爸|bàba|père|img:father', '妈妈|māma|mère|img:mother', '哥哥|gēge|frère|img:brother', '妹妹|mèimei|sœur|img:sister'],
    turns: [
      { npc: '这是谁？|zhè shì shéi|Qui est-ce ?', img: 'father', ok: '这是我爸爸|zhè shì wǒ bàba|C\'est mon père', bad: ['这是我哥哥|zhè shì wǒ gēge|C\'est mon frère', '这是我妈妈|zhè shì wǒ māma|C\'est ma mère'] },
      { npc: '这是谁？|zhè shì shéi|Qui est-ce ?', img: 'mother', ok: '这是我妈妈|zhè shì wǒ māma|C\'est ma mère', bad: ['这是我妹妹|zhè shì wǒ mèimei|C\'est ma sœur', '这是我爸爸|zhè shì wǒ bàba|C\'est mon père'] },
      { npc: '这是谁？|zhè shì shéi|Qui est-ce ?', img: 'sister', ok: '这是我妹妹|zhè shì wǒ mèimei|C\'est ma sœur', bad: ['这是我妈妈|zhè shì wǒ māma|C\'est ma mère', '这是我哥哥|zhè shì wǒ gēge|C\'est mon frère'] },
      { npc: '这是谁？|zhè shì shéi|Qui est-ce ?', img: 'brother', ok: '这是我哥哥|zhè shì wǒ gēge|C\'est mon frère', bad: ['这是我爸爸|zhè shì wǒ bàba|C\'est mon père', '这是我妹妹|zhè shì wǒ mèimei|C\'est ma sœur'] },
      { npc: '你有兄弟姐妹吗？|nǐ yǒu xiōngdì jiěmèi ma|As-tu des frères et sœurs ?', ok: '我有一个哥哥和一个妹妹|wǒ yǒu yí ge gēge hé yí ge mèimei|J\'ai un frère et une sœur', bad: ['我是学生|wǒ shì xuésheng|Je suis étudiant', '我要一杯水|wǒ yào yì bēi shuǐ|Je veux de l\'eau'] },
    ],
  },
  {
    id: 'zh-C6', level: 'intermediate', title: 'Au restaurant', scene: 'fish', npcRole: 'le serveur', romanized: true,
    situation: 'Tu dînes au restaurant. Commande un plat et une boisson, donne ton avis, demande l\'addition.',
    key: ['鱼|yú|poisson|img:fish', '果汁|guǒzhī|jus|img:juice', '好吃|hǎochī|délicieux', '账单|zhàngdān|l\'addition|img:money'],
    turns: [
      { npc: '欢迎光临|huānyíng guānglín|Bienvenue', ok: '你好|nǐ hǎo|Bonjour', bad: ['请结账|qǐng jiézhàng|L\'addition, s\'il vous plaît', '再见|zàijiàn|Au revoir'] },
      { npc: '你想吃什么？|nǐ xiǎng chī shénme|Que veux-tu manger ?', ok: '我想吃鱼|wǒ xiǎng chī yú|Je voudrais du poisson|img:fish', bad: ['我是学生|wǒ shì xuésheng|Je suis étudiant', '明天|míngtiān|Demain'] },
      { npc: '你想喝什么？|nǐ xiǎng hē shénme|Et que veux-tu boire ?', ok: '我更喜欢果汁|wǒ gèng xǐhuan guǒzhī|Je préfère le jus|img:juice', bad: ['我叫安娜|wǒ jiào Ānnà|Je m\'appelle Anna', '我的包丢了|wǒ de bāo diū le|J\'ai perdu mon sac'] },
      { npc: '好吃吗？|hǎochī ma|Est-ce que c\'est bon ?', ok: '是的，非常好吃|shì de, fēicháng hǎochī|Oui, c\'est très bon', bad: ['我不明白|wǒ bù míngbai|Je ne comprends pas', '右边|yòubian|à droite'] },
      { npc: '还要别的吗？|hái yào biéde ma|Autre chose ?', ok: '不用了，请结账|bú yòng le, qǐng jiézhàng|Non, l\'addition, s\'il vous plaît', bad: ['我喜欢咖啡|wǒ xǐhuan kāfēi|J\'aime le café', '洗手间在哪里？|xǐshǒujiān zài nǎlǐ|Où sont les toilettes ?'] },
    ],
  },
  {
    id: 'zh-C7', level: 'intermediate', title: 'À l\'université', scene: 'university', npcRole: 'le professeur', romanized: true,
    situation: 'C\'est ton premier jour à l\'université. Réponds à ton professeur et demande où est la bibliothèque.',
    key: ['老师|lǎoshī|professeur|img:teacher', '学生|xuésheng|étudiant|img:student', '图书馆|túshūguǎn|bibliothèque|img:library', '大学|dàxué|université|img:university'],
    turns: [
      { npc: '早上好|zǎoshang hǎo|Bonjour (le matin)', ok: '你好|nǐ hǎo|Bonjour', bad: ['晚上好|wǎnshang hǎo|Bonsoir', '不客气|bú kèqi|De rien'] },
      { npc: '你是新生吗？|nǐ shì xīnshēng ma|Es-tu un nouvel étudiant ?', ok: '是的，我是新生|shì de, wǒ shì xīnshēng|Oui, je suis un nouvel étudiant|img:student', bad: ['我不明白|wǒ bù míngbai|Je ne comprends pas', '多少钱？|duōshao qián|Combien ça coûte ?'] },
      { npc: '你学什么？|nǐ xué shénme|Qu\'étudies-tu ?', ok: '我学外语|wǒ xué wàiyǔ|J\'étudie les langues', bad: ['我是法国人|wǒ shì Fǎguó rén|Je viens de France', '我要面包|wǒ yào miànbāo|Je veux du pain|img:bread'] },
      { npc: '你有问题吗？|nǐ yǒu wèntí ma|As-tu une question ?', ok: '有，请问图书馆在哪里？|yǒu, qǐngwèn túshūguǎn zài nǎlǐ|Oui, où est la bibliothèque ?|img:library', bad: ['谢谢|xièxie|Merci', '明天|míngtiān|Demain'] },
      { npc: '图书馆很近，一直往前走|túshūguǎn hěn jìn, yìzhí wǎng qián zǒu|La bibliothèque est près, tout droit', ok: '谢谢，老师|xièxie, lǎoshī|Merci, professeur', bad: ['对不起，我弄错了|duìbuqǐ, wǒ nòngcuò le|Je m\'excuse pour cette erreur', '你好|nǐ hǎo|Bonjour'] },
    ],
  },
  {
    id: 'zh-C8', level: 'intermediate', title: 'Chez le médecin', scene: 'hospital', npcRole: 'le médecin', romanized: true,
    situation: 'Tu ne te sens pas bien. Explique ce que tu as et écoute les conseils du médecin.',
    key: ['医生|yīshēng|médecin|img:doctor', '头|tóu|tête|img:head', '水|shuǐ|eau|img:water', '从昨天开始|cóng zuótiān kāishǐ|Depuis hier'],
    turns: [
      { npc: '你好，哪里不舒服？|nǐ hǎo, nǎlǐ bù shūfu|Bonjour, quel est le problème ?', ok: '我生病了|wǒ shēngbìng le|Je suis malade', bad: ['我是学生|wǒ shì xuésheng|Je suis étudiant', '我要一杯咖啡|wǒ yào yì bēi kāfēi|Je voudrais un café, s\'il vous plaît|img:coffee'] },
      { npc: '你哪里疼？|nǐ nǎlǐ téng|Où as-tu mal ?', ok: '我头疼|wǒ tóu téng|J\'ai mal à la tête|img:head', bad: ['我是法国人|wǒ shì Fǎguó rén|Je viens de France', '左边|zuǒbian|à gauche'] },
      { npc: '从什么时候开始的？|cóng shénme shíhou kāishǐ de|Depuis quand ?', ok: '从昨天开始|cóng zuótiān kāishǐ|Depuis hier', bad: ['明天|míngtiān|Demain', '是|shì|Oui'] },
      { npc: '我给你开点药|wǒ gěi nǐ kāi diǎn yào|Je vais te donner un médicament', ok: '谢谢，医生|xièxie, yīshēng|Merci, docteur', bad: ['再见|zàijiàn|Au revoir', '机场在哪里？|jīchǎng zài nǎlǐ|Où est l\'aéroport ?'] },
      { npc: '多喝水|duō hē shuǐ|Bois beaucoup d\'eau|img:water', ok: '好的|hǎo de|D\'accord', bad: ['我的包丢了|wǒ de bāo diū le|J\'ai perdu mon sac', '多少钱？|duōshao qián|Combien ça coûte ?'] },
    ],
  },
  {
    id: 'zh-C9', level: 'intermediate', title: 'Inviter un ami', scene: 'sunset', npcRole: 'un ami', romanized: true,
    situation: 'Un ami te propose de sortir. Accepte, fixe l\'heure et le lieu.',
    key: ['明天|míngtiān|demain', '咖啡馆|kāfēiguǎn|le café|img:coffee', '五点|wǔ diǎn|cinq heures|img:clock', '一会儿见|yíhuìr jiàn|À bientôt'],
    turns: [
      { npc: '晚上好|wǎnshang hǎo|Bonsoir', ok: '晚上好|wǎnshang hǎo|Bonsoir', bad: ['早上好|zǎoshang hǎo|Bonjour (le matin)', '不客气|bú kèqi|De rien'] },
      { npc: '明天一起出去吗？|míngtiān yìqǐ chūqù ma|Veux-tu qu\'on sorte demain ?', ok: '好啊，很乐意|hǎo a, hěn lèyì|Oui, avec plaisir', bad: ['我不明白|wǒ bù míngbai|Je ne comprends pas', '我生病了|wǒ shēngbìng le|Je suis malade'] },
      { npc: '我们在哪里见面？|wǒmen zài nǎlǐ jiànmiàn|Où se retrouve-t-on ?', ok: '在咖啡馆|zài kāfēiguǎn|Au café|img:coffee', bad: ['我是学生|wǒ shì xuésheng|Je suis étudiant', '我叫安娜|wǒ jiào Ānnà|Je m\'appelle Anna'] },
      { npc: '几点？|jǐ diǎn|À quelle heure ?', ok: '五点|wǔ diǎn|À cinq heures|img:clock', bad: ['右边|yòubian|à droite', '我想喝茶|wǒ xiǎng hē chá|Je veux du thé'] },
      { npc: '好，说定了|hǎo, shuōdìng le|C\'est entendu', ok: '一会儿见|yíhuìr jiàn|À bientôt', bad: ['你好|nǐ hǎo|Bonjour', '多少钱？|duōshao qián|Combien ça coûte ?'] },
    ],
  },
  {
    id: 'zh-C10', level: 'advanced', title: 'Donner son avis sur une ville', scene: 'city', npcRole: 'un ami', romanized: true,
    situation: 'Un ami te demande ce que tu penses de sa ville. Donne ton avis et justifie-le.',
    key: ['城市|chéngshì|ville|img:city', '美|měi|beau', '因为|yīnwèi|parce que', '但是|dànshì|mais'],
    turns: [
      { npc: '你觉得这座城市怎么样？|nǐ juéde zhè zuò chéngshì zěnmeyàng|Que penses-tu de cette ville ?', ok: '我觉得这座城市很美|wǒ juéde zhè zuò chéngshì hěn měi|Je pense que la ville est belle|img:city', bad: ['我是法国人|wǒ shì Fǎguó rén|Je viens de France', '再见|zàijiàn|Au revoir'] },
      { npc: '为什么？|wèishénme|Pourquoi ?', ok: '因为它干净又安静|yīnwèi tā gānjìng yòu ānjìng|Parce qu\'elle est propre et calme', bad: ['明天|míngtiān|Demain', '我叫安娜|wǒ jiào Ānnà|Je m\'appelle Anna'] },
      { npc: '但是很贵|dànshì hěn guì|Mais elle est chère', ok: '我同意，但是我喜欢它|wǒ tóngyì, dànshì wǒ xǐhuan tā|Je suis d\'accord, mais je l\'aime', bad: ['我不明白|wǒ bù míngbai|Je ne comprends pas', '谢谢|xièxie|Merci'] },
      { npc: '你还会再来吗？|nǐ hái huì zài lái ma|La visiteras-tu encore ?', ok: '会，我还会再来|huì, wǒ hái huì zài lái|Oui, je la visiterai encore', bad: ['我生病了|wǒ shēngbìng le|Je suis malade', '左边|zuǒbian|à gauche'] },
    ],
  },
  {
    id: 'zh-C11', level: 'advanced', title: 'Une réclamation', scene: 'money', npcRole: 'l\'employé', romanized: true,
    situation: 'Ton appareil ne marche pas. Explique le problème et demande une réparation ou un dédommagement.',
    key: ['问题|wèntí|problème', '机器|jīqì|l\'appareil', '赔偿|péicháng|dédommagement', '经理|jīnglǐ|directeur'],
    turns: [
      { npc: '有什么可以帮您？|yǒu shénme kěyǐ bāng nín|Comment puis-je t\'aider ?', ok: '我遇到一个问题|wǒ yùdào yí ge wèntí|J\'ai un problème', bad: ['你好|nǐ hǎo|Bonjour', '我是学生|wǒ shì xuésheng|Je suis étudiant'] },
      { npc: '是什么问题？|shì shénme wèntí|Quel est le problème ?', ok: '机器不能用|jīqì bù néng yòng|L\'appareil ne fonctionne pas', bad: ['我叫安娜|wǒ jiào Ānnà|Je m\'appelle Anna', '我要一杯咖啡|wǒ yào yì bēi kāfēi|Je voudrais un café, s\'il vous plaît|img:coffee'] },
      { npc: '从什么时候开始的？|cóng shénme shíhou kāishǐ de|Depuis quand ?', ok: '从昨天开始|cóng zuótiān kāishǐ|Depuis hier', bad: ['是|shì|Oui', '右边|yòubian|à droite'] },
      { npc: '对不起，我弄错了|duìbuqǐ, wǒ nòngcuò le|Je m\'excuse pour cette erreur', ok: '请您修一下|qǐng nín xiū yíxià|Je vous prie de le réparer', bad: ['再见|zàijiàn|Au revoir', '我不明白|wǒ bù míngbai|Je ne comprends pas'] },
      { npc: '我明天修|wǒ míngtiān xiū|Je le réparerai demain', ok: '谢谢您|xièxie nín|Merci à vous', bad: ['洗手间在哪里？|xǐshǒujiān zài nǎlǐ|Où sont les toilettes ?', '我生病了|wǒ shēngbìng le|Je suis malade'] },
    ],
  },
  {
    id: 'zh-C12', level: 'advanced', title: 'Un exposé en classe', scene: 'teacher', npcRole: 'le professeur', romanized: true,
    situation: 'Tu présentes un court exposé. Ouvre, argumente, conclus et remercie.',
    key: ['主题|zhǔtí|sujet', '比如|bǐrú|par exemple', '最后|zuìhòu|pour conclure', '问题|wèntí|question'],
    turns: [
      { npc: '请开始吧|qǐng kāishǐ ba|Je vous en prie, commencez', ok: '我的主题是语言学习|wǒ de zhǔtí shì yǔyán xuéxí|Mon sujet est l\'apprentissage des langues', bad: ['感谢大家的聆听|gǎnxiè dàjiā de língtīng|Merci de votre attention', '再见|zàijiàn|Au revoir'] },
      { npc: '为什么选这个主题？|wèishénme xuǎn zhège zhǔtí|Pourquoi ce sujet ?', ok: '因为它很重要|yīnwèi tā hěn zhòngyào|Parce qu\'il est important', bad: ['我要面包|wǒ yào miànbāo|Je veux du pain|img:bread', '明天|míngtiān|Demain'] },
      { npc: '你有例子吗？|nǐ yǒu lìzi ma|As-tu un exemple ?', ok: '有，比如旅行|yǒu, bǐrú lǚxíng|Oui, par exemple les voyages', bad: ['我不明白|wǒ bù míngbai|Je ne comprends pas', '右边|yòubian|à droite'] },
      { npc: '最后呢？|zuìhòu ne|Et pour conclure ?', ok: '最后，我每天都在学习|zuìhòu, wǒ měitiān dōu zài xuéxí|Pour conclure, j\'apprends chaque jour', bad: ['我生病了|wǒ shēngbìng le|Je suis malade', '你好|nǐ hǎo|Bonjour'] },
      { npc: '太棒了，做得好|tài bàng le, zuò de hǎo|Bravo, bon travail', ok: '感谢大家的聆听|gǎnxiè dàjiā de língtīng|Merci de votre attention', bad: ['我有一个哥哥和一个妹妹|wǒ yǒu yí ge gēge hé yí ge mèimei|J\'ai un frère et une sœur', '多少钱？|duōshao qián|Combien ça coûte ?'] },
    ],
  },
  {
    id: 'zh-C13', title: 'À la gare', scene: 'station', npcRole: 'l\'employé du guichet', romanized: true,
    situation: 'Tu achètes un billet de train à la gare. Dis où tu vas, demande un billet et paie.',
    key: ['车站|chēzhàn|la gare|img:station', '票|piào|le billet|img:ticket', '火车|huǒchē|le train|img:train', '行李箱|xínglǐxiāng|la valise|img:suitcase'],
    turns: [
      { npc: '您好，您去哪里？|nín hǎo, nín qù nǎlǐ|Bonjour, où allez-vous ?', ok: '我去市中心|wǒ qù shì zhōngxīn|Je vais en ville', bad: ['我是学生|wǒ shì xuésheng|Je suis étudiant', '谢谢|xièxie|Merci'] },
      { npc: '一张票还是两张？|yì zhāng piào háishi liǎng zhāng|Un billet ou deux ?', img: 'ticket', ok: '请给我一张票|qǐng gěi wǒ yì zhāng piào|Un billet, s\'il vous plaît|img:ticket', bad: ['我要一杯水|wǒ yào yì bēi shuǐ|Je veux de l\'eau', '我叫安娜|wǒ jiào Ānnà|Je m\'appelle Anna'] },
      { npc: '二十欧元|èrshí ōuyuán|Ça fait vingt euros', ok: '给你|gěi nǐ|Voilà', bad: ['多少钱？|duōshao qián|Combien ça coûte ?', '我喜欢咖啡|wǒ xǐhuan kāfēi|J\'aime le café'] },
      { npc: '火车五点开|huǒchē wǔ diǎn kāi|Le train part à cinq heures', ok: '好的，谢谢|hǎo de, xièxie|D\'accord, merci', bad: ['我的包丢了|wǒ de bāo diū le|J\'ai perdu mon sac', '我生病了|wǒ shēngbìng le|Je suis malade'] },
      { npc: '一路平安|yílù píng\'ān|Bon voyage !', ok: '谢谢，再见|xièxie, zàijiàn|Merci, au revoir', bad: ['你好|nǐ hǎo|Bonjour', '我不明白|wǒ bù míngbai|Je ne comprends pas'] },
    ],
  },
  {
    id: 'zh-C14', level: 'intermediate', title: 'À l\'hôtel', scene: 'hotel', npcRole: 'le réceptionniste', romanized: true,
    situation: 'Tu arrives à l\'hôtel. Annonce ta réservation, donne ton nom, écoute les consignes.',
    key: ['酒店|jiǔdiàn|l\'hôtel|img:hotel', '房间|fángjiān|la chambre|img:bed', '钥匙|yàoshi|la clé|img:key', '早餐|zǎocān|le petit-déjeuner'],
    turns: [
      { npc: '您好，欢迎来到酒店|nín hǎo, huānyíng láidào jiǔdiàn|Bonjour, bienvenue à l\'hôtel', ok: '您好，我预订了房间|nín hǎo, wǒ yùdìng le fángjiān|Bonjour, j\'ai une réservation', bad: ['请结账|qǐng jiézhàng|L\'addition, s\'il vous plaît', '我想喝茶|wǒ xiǎng hē chá|Je veux du thé'] },
      { npc: '请问您叫什么名字？|qǐngwèn nín jiào shénme míngzi|Quel est votre nom ?', ok: '我叫安娜|wǒ jiào Ānnà|Je m\'appelle Anna', bad: ['我是法国人|wǒ shì Fǎguó rén|Je viens de France', '谢谢|xièxie|Merci'] },
      { npc: '这是您的房间钥匙|zhè shì nín de fángjiān yàoshi|Voici la clé de votre chambre|img:key', img: 'key', ok: '谢谢|xièxie|Merci', bad: ['再见|zàijiàn|Au revoir', '我生病了|wǒ shēngbìng le|Je suis malade'] },
      { npc: '早餐八点开始|zǎocān bā diǎn kāishǐ|Le petit-déjeuner est à huit heures', ok: '太好了，谢谢|tài hǎo le, xièxie|C\'est parfait, merci', bad: ['我的包丢了|wǒ de bāo diū le|J\'ai perdu mon sac', '左边|zuǒbian|à gauche'] },
      { npc: '您还需要什么吗？|nín hái xūyào shénme ma|Avez-vous besoin d\'autre chose ?', ok: '不用了，谢谢，晚安|bú yòng le, xièxie, wǎn\'ān|Non, merci, bonne nuit', bad: ['我叫安娜|wǒ jiào Ānnà|Je m\'appelle Anna', '我是法国人|wǒ shì Fǎguó rén|Je viens de France'] },
    ],
  },
  {
    id: 'zh-C15', level: 'intermediate', title: 'Au téléphone', scene: 'phone', npcRole: 'un ami', romanized: true,
    situation: 'Un ami t\'appelle. Réponds, donne des nouvelles et fixe un rendez-vous pour demain.',
    key: ['电话|diànhuà|le téléphone|img:phone', '号码|hàomǎ|le numéro', '明天|míngtiān|demain', '一会儿见|yíhuìr jiàn|À bientôt'],
    turns: [
      { npc: '喂？|wèi|Allô ?', ok: '喂，我是安娜|wèi, wǒ shì ānnà|Allô, c\'est Anna', bad: ['谢谢|xièxie|Merci', '是|shì|Oui'] },
      { npc: '你好吗？|nǐ hǎo ma|Comment vas-tu ?', ok: '我很好，谢谢|wǒ hěn hǎo, xièxie|Je vais bien, merci', bad: ['我叫安娜|wǒ jiào Ānnà|Je m\'appelle Anna', '再见|zàijiàn|Au revoir'] },
      { npc: '你明天有空吗？|nǐ míngtiān yǒu kòng ma|Tu es libre demain ?', ok: '有，我有空|yǒu, wǒ yǒu kòng|Oui, je suis libre', bad: ['我生病了|wǒ shēngbìng le|Je suis malade', '我的包丢了|wǒ de bāo diū le|J\'ai perdu mon sac'] },
      { npc: '我把地址发给你|wǒ bǎ dìzhǐ fā gěi nǐ|Je t\'envoie l\'adresse par message', ok: '好的，谢谢|hǎo de, xièxie|D\'accord, merci', bad: ['我是学生|wǒ shì xuésheng|Je suis étudiant', '我不明白|wǒ bù míngbai|Je ne comprends pas'] },
      { npc: '明天见！|míngtiān jiàn|À demain !', ok: '明天见！|míngtiān jiàn|À demain !', bad: ['你好|nǐ hǎo|Bonjour', '我喜欢咖啡|wǒ xǐhuan kāfēi|J\'aime le café'] },
    ],
  },
  {
    id: 'zh-C16', level: 'intermediate', title: 'À l\'aéroport', scene: 'airport', npcRole: 'l\'agent d\'enregistrement', romanized: true,
    situation: 'Tu enregistres ton vol. Montre ton passeport, dis où tu vas et demande ta porte.',
    key: ['机场|jīchǎng|l\'aéroport|img:airport', '护照|hùzhào|le passeport', '行李箱|xínglǐxiāng|la valise|img:suitcase', '飞机|fēijī|l\'avion|img:airplane'],
    turns: [
      { npc: '请出示您的护照|qǐng chūshì nín de hùzhào|Votre passeport, s\'il vous plaît', ok: '这是我的护照|zhè shì wǒ de hùzhào|Voici mon passeport', bad: ['我是学生|wǒ shì xuésheng|Je suis étudiant', '多少钱？|duōshao qián|Combien ça coûte ?'] },
      { npc: '您好，您去哪里？|nín hǎo, nín qù nǎlǐ|Bonjour, où allez-vous ?', ok: '我去法国|wǒ qù Fǎguó|Je vais en France', bad: ['谢谢|xièxie|Merci', '明天|míngtiān|Demain'] },
      { npc: '您有行李箱吗？|nín yǒu xínglǐxiāng ma|Avez-vous une valise ?', img: 'suitcase', ok: '有，我有一个行李箱|yǒu, wǒ yǒu yí ge xínglǐxiāng|Oui, j\'ai une valise|img:suitcase', bad: ['我喜欢咖啡|wǒ xǐhuan kāfēi|J\'aime le café', '我叫安娜|wǒ jiào Ānnà|Je m\'appelle Anna'] },
      { npc: '飞机十点起飞|fēijī shí diǎn qǐfēi|L\'avion part à dix heures', ok: '谢谢，登机口在哪里？|xièxie, dēngjīkǒu zài nǎlǐ|Merci, où est la porte d\'embarquement ?', bad: ['我的包丢了|wǒ de bāo diū le|J\'ai perdu mon sac', '我生病了|wǒ shēngbìng le|Je suis malade'] },
      { npc: '一路顺风|yílù shùnfēng|Bon vol !', ok: '谢谢，再见|xièxie, zàijiàn|Merci, au revoir', bad: ['你好|nǐ hǎo|Bonjour', '我不明白|wǒ bù míngbai|Je ne comprends pas'] },
    ],
  },
];
