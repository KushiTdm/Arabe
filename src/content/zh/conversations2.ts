import type { ConvSpec } from '../conversations';

// ─── ZH — conversations guidées C17 à C20 (supermarché, plage, chez un ami, taxi) ───
// Générées depuis une table de phrases communes à 11 langues. À faire relire par un locuteur natif.

export const ZH_CONVERSATIONS2: ConvSpec[] = [
  {
    id: 'zh-C17', title: 'Au supermarché', scene: 'supermarket', npcRole: 'l\'employé du magasin', romanized: true,
    situation: 'Tu fais tes courses. Demande où est le lait, réponds à l\'employé et paie.',
    key: ['牛奶|niúnǎi|le lait|img:milk', '面包|miànbāo|le pain|img:bread', '苹果|píngguǒ|la pomme|img:apple', '袋子|dàizi|le sac|img:bag'],
    turns: [
      { npc: '你好，需要帮忙吗？|nǐ hǎo, xūyào bāngmáng ma|Bonjour, je peux vous aider ?', ok: '牛奶在哪里？|niúnǎi zài nǎlǐ|Où est le lait ?', bad: ['再见|zàijiàn|Au revoir', '谢谢|xièxie|Merci'] },
      { npc: '牛奶在那边，右边|niúnǎi zài nàbiān, yòubiān|Le lait est là-bas, à droite', ok: '非常感谢|fēicháng gǎnxiè|Merci beaucoup', bad: ['你好|nǐ hǎo|Bonjour', '我从法国来|wǒ cóng fǎguó lái|Je viens de France'] },
      { npc: '还要别的吗？|hái yào bié de ma|Voulez-vous autre chose ?', ok: '是的，要面包和苹果|shì de, yào miànbāo hé píngguǒ|Oui, du pain et des pommes', bad: ['很高兴认识你|hěn gāoxìng rènshi nǐ|Enchanté(e)', '明天|míngtiān|Demain'] },
      { npc: '需要袋子吗？|xūyào dàizi ma|Voulez-vous un sac ?', ok: '要，谢谢|yào, xièxie|Oui, s\'il vous plaît', bad: ['我不明白|wǒ bù míngbai|Je ne comprends pas', '再见|zàijiàn|Au revoir'] },
      { npc: '一共十欧元|yígòng shí ōuyuán|Ça fait dix euros', ok: '给你|gěi nǐ|Voilà, tenez', bad: ['你好吗？|nǐ hǎo ma|Comment vas-tu ?', '我不明白|wǒ bù míngbai|Je ne comprends pas'] },
      { npc: '祝你今天愉快！|zhù nǐ jīntiān yúkuài|Bonne journée !', ok: '谢谢，你也是|xièxie, nǐ yě shì|Merci, à vous aussi', bad: ['我不明白|wǒ bù míngbai|Je ne comprends pas', '你好|nǐ hǎo|Bonjour'] },
    ],
  },
  {
    id: 'zh-C18', title: 'À la plage', scene: 'beach', npcRole: 'un ami', romanized: true,
    situation: 'Tu passes la journée à la plage avec un ami. Parle du temps, de la mer et de l\'eau.',
    key: ['海滩|hǎitān|la plage|img:beach', '大海|dàhǎi|la mer|img:sea', '太阳|tàiyáng|le soleil|img:sun', '水|shuǐ|l\'eau|img:water'],
    turns: [
      { npc: '今天天气很好|jīntiān tiānqì hěn hǎo|Il fait beau aujourd\'hui', ok: '是啊，很热|shì a, hěn rè|Oui, il fait très chaud', bad: ['我叫卡里姆|wǒ jiào Kǎlǐmǔ|Je m\'appelle Karim', '再见|zàijiàn|Au revoir'] },
      { npc: '你喜欢大海吗？|nǐ xǐhuan dàhǎi ma|Tu aimes la mer ?', ok: '是的，我很喜欢大海|shì de, wǒ hěn xǐhuan dàhǎi|Oui, j\'aime beaucoup la mer', bad: ['现在五点|xiànzài wǔ diǎn|Il est cinq heures', '我从法国来|wǒ cóng fǎguó lái|Je viens de France'] },
      { npc: '你想游泳吗？|nǐ xiǎng yóuyǒng ma|Tu veux nager ?', ok: '想，我们走吧！|xiǎng, wǒmen zǒu ba|Oui, allons-y !', bad: ['我是学生|wǒ shì xuésheng|Je suis étudiant', '火车站在哪里？|huǒchēzhàn zài nǎlǐ|Où est la gare ?'] },
      { npc: '你渴吗？|nǐ kě ma|Tu as soif ?', ok: '渴，我想喝水|kě, wǒ xiǎng hē shuǐ|Oui, je veux de l\'eau', bad: ['明天|míngtiān|Demain', '很高兴认识你|hěn gāoxìng rènshi nǐ|Enchanté(e)'] },
      { npc: '这是水|zhè shì shuǐ|Voici de l\'eau', ok: '谢谢|xièxie|Merci', bad: ['不客气|bú kèqi|De rien', '再见|zàijiàn|Au revoir'] },
      { npc: '我们回去吧？太晚了|wǒmen huíqù ba? tài wǎn le|On rentre ? Il est tard', ok: '好的，明天见|hǎo de, míngtiān jiàn|D\'accord, à demain', bad: ['你好|nǐ hǎo|Bonjour', '多少钱？|duōshao qián|Combien ça coûte ?'] },
    ],
  },
  {
    id: 'zh-C19', title: 'Chez un ami', scene: 'house', npcRole: 'ton hôte', romanized: true,
    situation: 'Un ami t\'invite chez lui. Remercie, accepte une boisson et goûte ce qu\'il t\'offre.',
    key: ['房子|fángzi|la maison|img:house', '茶|chá|le thé|img:tea', '面包|miànbāo|le pain|img:bread', '蜂蜜|fēngmì|le miel|img:honey'],
    turns: [
      { npc: '欢迎来我家！|huānyíng lái wǒ jiā|Bienvenue chez moi !', ok: '谢谢，你家真漂亮|xièxie, nǐ jiā zhēn piàoliang|Merci, ta maison est belle', bad: ['再见|zàijiàn|Au revoir', '我不明白|wǒ bù míngbai|Je ne comprends pas'] },
      { npc: '请进，请坐|qǐng jìn, qǐng zuò|Entre et assieds-toi', ok: '非常感谢|fēicháng gǎnxiè|Merci beaucoup', bad: ['火车站在哪里？|huǒchēzhàn zài nǎlǐ|Où est la gare ?', '不客气|bú kèqi|De rien'] },
      { npc: '你想喝茶还是咖啡？|nǐ xiǎng hē chá háishi kāfēi|Tu veux du thé ou du café ?', ok: '请给我茶|qǐng gěi wǒ chá|Du thé, s\'il te plaît', bad: ['我从法国来|wǒ cóng fǎguó lái|Je viens de France', '再见|zàijiàn|Au revoir'] },
      { npc: '你饿吗？|nǐ è ma|Tu as faim ?', ok: '有一点，谢谢|yǒu yìdiǎn, xièxie|Un peu, merci', bad: ['是啊，很热|shì a, hěn rè|Oui, il fait très chaud', '我叫卡里姆|wǒ jiào Kǎlǐmǔ|Je m\'appelle Karim'] },
      { npc: '这是面包和蜂蜜|zhè shì miànbāo hé fēngmì|Voici du pain et du miel', ok: '真好吃！|zhēn hǎochī|C\'est très bon !', bad: ['牛奶在哪里？|niúnǎi zài nǎlǐ|Où est le lait ?', '你好|nǐ hǎo|Bonjour'] },
      { npc: '欢迎再来！|huānyíng zài lái|Reviens bientôt !', ok: '很乐意，谢谢你的一切|hěn lèyì, xièxie nǐ de yíqiè|Avec plaisir, merci pour tout', bad: ['多少钱？|duōshao qián|Combien ça coûte ?', '很高兴认识你|hěn gāoxìng rènshi nǐ|Enchanté(e)'] },
    ],
  },
  {
    id: 'zh-C20', level: 'intermediate', title: 'En taxi', scene: 'taxi', npcRole: 'le chauffeur de taxi', romanized: true,
    situation: 'Tu prends un taxi pour l\'aéroport. Dis ta destination, bavarde un peu et paie la course.',
    key: ['出租车|chūzūchē|le taxi|img:taxi', '机场|jīchǎng|l\'aéroport|img:airport', '行李箱|xínglixiāng|la valise|img:suitcase', '票|piào|le billet|img:ticket'],
    turns: [
      { npc: '你好，您去哪里？|nǐ hǎo, nín qù nǎlǐ|Bonjour, où allez-vous ?', ok: '请到机场|qǐng dào jīchǎng|À l\'aéroport, s\'il vous plaît', bad: ['我叫卡里姆|wǒ jiào Kǎlǐmǔ|Je m\'appelle Karim', '请给我茶|qǐng gěi wǒ chá|Du thé, s\'il te plaît'] },
      { npc: '要二十分钟|yào èrshí fēnzhōng|C\'est à vingt minutes', ok: '好的|hǎo de|D\'accord', bad: ['很高兴认识你|hěn gāoxìng rènshi nǐ|Enchanté(e)', '牛奶在哪里？|niúnǎi zài nǎlǐ|Où est le lait ?'] },
      { npc: '您是来旅游的吗？|nín shì lái lǚyóu de ma|Vous êtes en voyage ?', ok: '是的，我从法国来|shì de, wǒ cóng fǎguó lái|Oui, je viens de France', bad: ['是啊，很热|shì a, hěn rè|Oui, il fait très chaud', '再见|zàijiàn|Au revoir'] },
      { npc: '我们到了|wǒmen dào le|Nous sommes arrivés', ok: '请在这里停车|qǐng zài zhèlǐ tíngchē|Arrêtez-vous ici, s\'il vous plaît', bad: ['你好|nǐ hǎo|Bonjour', '多少钱？|duōshao qián|Combien ça coûte ?'] },
      { npc: '一共十五欧元|yígòng shíwǔ ōuyuán|Ça fait quinze euros', ok: '给你，不用找了|gěi nǐ, bú yòng zhǎo le|Voilà, gardez la monnaie', bad: ['我不明白|wǒ bù míngbai|Je ne comprends pas', '再见|zàijiàn|Au revoir'] },
      { npc: '旅途愉快！|lǚtú yúkuài|Bon voyage !', ok: '谢谢，再见|xièxie, zàijiàn|Merci, au revoir', bad: ['你好|nǐ hǎo|Bonjour', '火车站在哪里？|huǒchēzhàn zài nǎlǐ|Où est la gare ?'] },
    ],
  },
];
