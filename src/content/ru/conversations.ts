import type { ConvSpec } from '../conversations';

// ─── RU — conversations guidées A1 (générées depuis la table de phrases communes) ───
// À faire relire par un locuteur natif.

export const RU_CONVERSATIONS: ConvSpec[] = [
  {
    id: 'ru-C1', title: 'Rencontre', scene: 'handshake', npcRole: 'une personne que tu rencontres', romanized: true,
    situation: 'Tu rencontres quelqu\'un pour la première fois. Salue, présente-toi, réponds à ses questions.',
    key: ['Доброе утро|dobraïé outra|Bonjour (le matin)', 'Меня зовут Анна|minia zavout anna|Je m\'appelle Anna', 'Я из Франции|ia iz frantsii|Je viens de France', 'Очень приятно|otchin\' priyatna|Enchanté(e)'],
    turns: [
      { npc: 'Доброе утро|dobraïé outra|Bonjour (le matin)', ok: 'Доброе утро|dobraïé outra|Bonjour (le matin)', bad: ['Спокойной ночи|spakoïnoï notchi|Bonne nuit', 'До свидания|da svidania|Au revoir'] },
      { npc: 'Как вас зовут?|kak vas zavout|Comment t\'appelles-tu ?', ok: 'Меня зовут Анна|minia zavout anna|Je m\'appelle Anna', bad: ['Хорошо, спасибо|kharacho spassiba|Je vais bien, merci', 'Я из Франции|ia iz frantsii|Je viens de France'] },
      { npc: 'Откуда вы?|atkouda vy|D\'où viens-tu ?', ok: 'Я из Франции|ia iz frantsii|Je viens de France', bad: ['Меня зовут Анна|minia zavout anna|Je m\'appelle Anna', 'Спасибо|spassiba|Merci'] },
      { npc: 'Очень приятно|otchin\' priyatna|Enchanté(e)', ok: 'Очень приятно|otchin\' priyatna|Enchanté(e)', bad: ['Я не понимаю|ia ni panimaïou|Je ne comprends pas', 'Пожалуйста|pajalousta|De rien'] },
      { npc: 'Как дела?|kak diéla|Comment vas-tu ?', ok: 'Хорошо, спасибо|kharacho spassiba|Je vais bien, merci', bad: ['Доброе утро|dobraïé outra|Bonjour (le matin)', 'Где больница?|gdié balnitsa|Où est l\'hôpital ?'] },
      { npc: 'До свидания|da svidania|Au revoir', ok: 'До скорого|da skoraga|À bientôt', bad: ['Доброе утро|dobraïé outra|Bonjour (le matin)', 'Да|da|Oui'] },
    ],
  },
  {
    id: 'ru-C2', title: 'Au café', scene: 'coffee', npcRole: 'le serveur', romanized: true,
    situation: 'Tu entres dans un café. Commande une boisson, réponds au serveur, paie.',
    key: ['кофе|kofé|café|img:coffee', 'чай|tchaï|thé|img:tea', 'вода|vada|eau|img:water', 'сок|sok|jus|img:juice'],
    turns: [
      { npc: 'Здравствуйте, что вы желаете?|zdrastvouïtié chto vy jélaïétié|Bonjour, que veux-tu ?', ok: 'Я хочу кофе, пожалуйста|ia khatchou kofé pajalousta|Je voudrais un café, s\'il vous plaît|img:coffee', bad: ['Где больница?|gdié balnitsa|Où est l\'hôpital ?', 'До свидания|da svidania|Au revoir'] },
      { npc: 'Что-нибудь ещё?|chto-nibout\' ichtchio|Autre chose ?', ok: 'Нет, спасибо|niét spassiba|Non, merci', bad: ['Меня зовут Анна|minia zavout anna|Je m\'appelle Anna', 'До скорого|da skoraga|À bientôt'] },
      { npc: 'Три евро, пожалуйста|tri évro pajalousta|Ça fait trois euros|img:money', ok: 'Вот, пожалуйста|vot pajalousta|Voilà', bad: ['Сколько это стоит?|skol\'ka éta stoït|Combien ça coûte ?', 'Я люблю кофе|ia lioubliou kofé|J\'aime le café'] },
      { npc: 'Спасибо|spassiba|Merci', ok: 'Пожалуйста|pajalousta|De rien', bad: ['Я не понимаю|ia ni panimaïou|Je ne comprends pas', 'Да|da|Oui'] },
    ],
  },
  {
    id: 'ru-C3', title: 'Au marché', scene: 'market', npcRole: 'le vendeur', romanized: true,
    situation: 'Tu fais tes courses au marché. Demande ce que tu veux, le prix, et paie.',
    key: ['хлеб|khliép|pain|img:bread', 'яйца|iaïtsa|œufs|img:eggs', 'рыба|ryba|poisson|img:fish', 'деньги|diéng\'i|argent|img:money'],
    turns: [
      { npc: 'Здравствуйте, что вам нужно?|zdrastvouïtié chto vam noujna|Bonjour, que désirez-vous ?', ok: 'Я хочу хлеб|ia khatchou khliép|Je veux du pain|img:bread', bad: ['До свидания|da svidania|Au revoir', 'Где больница?|gdié balnitsa|Où est l\'hôpital ?'] },
      { npc: 'Сколько вам нужно?|skol\'ka vam noujna|Combien en voulez-vous ?', ok: 'Два, пожалуйста|dva pajalousta|Deux, s\'il vous plaît', bad: ['Доброе утро|dobraïé outra|Bonjour (le matin)', 'Спокойной ночи|spakoïnoï notchi|Bonne nuit'] },
      { npc: 'Вот, пожалуйста|vot pajalousta|Voilà', ok: 'Сколько это стоит?|skol\'ka éta stoït|Combien ça coûte ?', bad: ['Я не понимаю|ia ni panimaïou|Je ne comprends pas', 'Меня зовут Анна|minia zavout anna|Je m\'appelle Anna'] },
      { npc: 'Пять евро, пожалуйста|piat\' évro pajalousta|Ça fait cinq euros|img:money', ok: 'Вот, пожалуйста|vot pajalousta|Voilà', bad: ['Два, пожалуйста|dva pajalousta|Deux, s\'il vous plaît', 'Да|da|Oui'] },
      { npc: 'Спасибо, до свидания|spassiba da svidania|Merci, au revoir', ok: 'До свидания|da svidania|Au revoir', bad: ['Доброе утро|dobraïé outra|Bonjour (le matin)', 'Спокойной ночи|spakoïnoï notchi|Bonne nuit'] },
    ],
  },
  {
    id: 'ru-C4', title: 'Demander son chemin', scene: 'street', npcRole: 'un passant', romanized: true,
    situation: 'Tu cherches l\'hôpital. Demande ton chemin et comprends la réponse.',
    key: ['больница|balnitsa|hôpital|img:hospital', 'улица|oulitsa|rue|img:street', 'школа|chkola|école|img:school', 'рынок|rynak|marché|img:market'],
    turns: [
      { npc: 'Вам нужна помощь?|vam noujna pomochtch\'|Avez-vous besoin d\'aide ?', ok: 'Да, где больница?|da gdié balnitsa|Oui, où est l\'hôpital ?|img:hospital', bad: ['До свидания|da svidania|Au revoir', 'Меня зовут Анна|minia zavout anna|Je m\'appelle Anna'] },
      { npc: 'Прямо, потом налево|priama patom naliéva|Tout droit puis à gauche', ok: 'Это далеко?|éta daliéko|Est-ce loin ?', bad: ['Я из Франции|ia iz frantsii|Je viens de France', 'Я хочу хлеб|ia khatchou khliép|Je veux du pain|img:bread'] },
      { npc: 'Нет, это близко|niét éta blisko|Non, c\'est près', ok: 'Спасибо|spassiba|Merci', bad: ['Я не понимаю|ia ni panimaïou|Je ne comprends pas', 'Два, пожалуйста|dva pajalousta|Deux, s\'il vous plaît'] },
      { npc: 'Пожалуйста|pajalousta|De rien', ok: 'До свидания|da svidania|Au revoir', bad: ['Я хочу кофе, пожалуйста|ia khatchou kofé pajalousta|Je voudrais un café, s\'il vous plaît|img:coffee', 'Доброе утро|dobraïé outra|Bonjour (le matin)'] },
    ],
  },
];
