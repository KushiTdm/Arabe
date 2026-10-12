import type { ConvSpec } from '../conversations';

// ─── ZH — conversations guidées A1 (générées depuis la table de phrases communes) ───
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
];
