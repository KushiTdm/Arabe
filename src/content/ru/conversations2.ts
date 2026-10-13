import type { ConvSpec } from '../conversations';

// ─── RU — conversations guidées C17 à C20 (supermarché, plage, chez un ami, taxi) ───
// Générées depuis une table de phrases communes à 11 langues. À faire relire par un locuteur natif.

export const RU_CONVERSATIONS2: ConvSpec[] = [
  {
    id: 'ru-C17', title: 'Au supermarché', scene: 'supermarket', npcRole: 'l\'employé du magasin', romanized: true,
    situation: 'Tu fais tes courses. Demande où est le lait, réponds à l\'employé et paie.',
    key: ['молоко|malako|le lait|img:milk', 'хлеб|khliep|le pain|img:bread', 'яблоко|iablaka|la pomme|img:apple', 'пакет|pakiét|le sac|img:bag'],
    turns: [
      { npc: 'Здравствуйте, вам помочь?|zdravstvouïté, vam pamotch|Bonjour, je peux vous aider ?', ok: 'Где молоко?|gdié malako|Où est le lait ?', bad: ['До свидания|da svidania|Au revoir', 'Спасибо|spassiba|Merci'] },
      { npc: 'Молоко вон там, справа|malako von tam, sprava|Le lait est là-bas, à droite', ok: 'Большое спасибо|bal\'choïé spassiba|Merci beaucoup', bad: ['Здравствуйте|zdravstvouïté|Bonjour', 'Я из Франции|ia iz frantsii|Je viens de France'] },
      { npc: 'Что-нибудь ещё?|chto-nibout\' iéchtcho|Voulez-vous autre chose ?', ok: 'Да, хлеб и яблоки|da, khliep i iablaki|Oui, du pain et des pommes', bad: ['Очень приятно|otchién\' priiatna|Enchanté(e)', 'Завтра|zaftra|Demain'] },
      { npc: 'Вам нужен пакет?|vam noujén pakiét|Voulez-vous un sac ?', ok: 'Да, пожалуйста|da, pajalousta|Oui, s\'il vous plaît', bad: ['Я не понимаю|ia nié panimaïou|Je ne comprends pas', 'До свидания|da svidania|Au revoir'] },
      { npc: 'С вас десять евро|s vas diéssiat\' évro|Ça fait dix euros', ok: 'Вот, возьмите|vot, vazmitié|Voilà, tenez', bad: ['Как дела?|kak diéla|Comment vas-tu ?', 'Я не понимаю|ia nié panimaïou|Je ne comprends pas'] },
      { npc: 'Хорошего дня!|kharochiéva dnia|Bonne journée !', ok: 'Спасибо, вам тоже|spassiba, vam tojé|Merci, à vous aussi', bad: ['Я не понимаю|ia nié panimaïou|Je ne comprends pas', 'Здравствуйте|zdravstvouïté|Bonjour'] },
    ],
  },
  {
    id: 'ru-C18', title: 'À la plage', scene: 'beach', npcRole: 'un ami', romanized: true,
    situation: 'Tu passes la journée à la plage avec un ami. Parle du temps, de la mer et de l\'eau.',
    key: ['пляж|pliaj|la plage|img:beach', 'море|moré|la mer|img:sea', 'солнце|sontsé|le soleil|img:sun', 'вода|vada|l\'eau|img:water'],
    turns: [
      { npc: 'Сегодня хорошая погода|sivodnia kharochaïa pagoda|Il fait beau aujourd\'hui', ok: 'Да, очень жарко|da, otchién\' jarka|Oui, il fait très chaud', bad: ['Меня зовут Карим|minia zavout karim|Je m\'appelle Karim', 'До свидания|da svidania|Au revoir'] },
      { npc: 'Ты любишь море?|ty lioubich\' moré|Tu aimes la mer ?', ok: 'Да, я очень люблю море|da, ia otchién\' lioublïou moré|Oui, j\'aime beaucoup la mer', bad: ['Сейчас пять часов|siïtchass piat\' tchassov|Il est cinq heures', 'Я из Франции|ia iz frantsii|Je viens de France'] },
      { npc: 'Хочешь поплавать?|khotchich\' paplavat\'|Tu veux nager ?', ok: 'Да, пойдём!|da, païdiom|Oui, allons-y !', bad: ['Я студент|ia stoudiént|Je suis étudiant', 'Где вокзал?|gdié vagzal|Où est la gare ?'] },
      { npc: 'Хочешь пить?|khotchich\' pit\'|Tu as soif ?', ok: 'Да, я хочу воды|da, ia khatchou vody|Oui, je veux de l\'eau', bad: ['Завтра|zaftra|Demain', 'Очень приятно|otchién\' priiatna|Enchanté(e)'] },
      { npc: 'Вот вода|vot vada|Voici de l\'eau', ok: 'Спасибо|spassiba|Merci', bad: ['Пожалуйста|pajalousta|De rien', 'До свидания|da svidania|Au revoir'] },
      { npc: 'Пойдём домой? Уже поздно|païdiom damoï? ouje pozna|On rentre ? Il est tard', ok: 'Хорошо, до завтра|kharacho, da zaftra|D\'accord, à demain', bad: ['Здравствуйте|zdravstvouïté|Bonjour', 'Сколько это стоит?|skol\'ka éta stoït|Combien ça coûte ?'] },
    ],
  },
  {
    id: 'ru-C19', title: 'Chez un ami', scene: 'house', npcRole: 'ton hôte', romanized: true,
    situation: 'Un ami t\'invite chez lui. Remercie, accepte une boisson et goûte ce qu\'il t\'offre.',
    key: ['дом|dom|la maison|img:house', 'чай|tchaï|le thé|img:tea', 'хлеб|khliep|le pain|img:bread', 'мёд|miot|le miel|img:honey'],
    turns: [
      { npc: 'Добро пожаловать ко мне домой!|dabro pajalavat\' ka mnié damoï|Bienvenue chez moi !', ok: 'Спасибо, у тебя красивый дом|spassiba, ou tiebia krassivyï dom|Merci, ta maison est belle', bad: ['До свидания|da svidania|Au revoir', 'Я не понимаю|ia nié panimaïou|Je ne comprends pas'] },
      { npc: 'Входи и садись|vkhodi i sadis\'|Entre et assieds-toi', ok: 'Большое спасибо|bal\'choïé spassiba|Merci beaucoup', bad: ['Где вокзал?|gdié vagzal|Où est la gare ?', 'Пожалуйста|pajalousta|De rien'] },
      { npc: 'Хочешь чай или кофе?|khotchich\' tchaï ili kofé|Tu veux du thé ou du café ?', ok: 'Чай, пожалуйста|tchaï, pajalousta|Du thé, s\'il te plaît', bad: ['Я из Франции|ia iz frantsii|Je viens de France', 'До свидания|da svidania|Au revoir'] },
      { npc: 'Ты голоден?|ty galodién|Tu as faim ?', ok: 'Немного, спасибо|nimnoga, spassiba|Un peu, merci', bad: ['Да, очень жарко|da, otchién\' jarka|Oui, il fait très chaud', 'Меня зовут Карим|minia zavout karim|Je m\'appelle Karim'] },
      { npc: 'Вот хлеб и мёд|vot khliep i miot|Voici du pain et du miel', ok: 'Очень вкусно!|otchién\' fkousna|C\'est très bon !', bad: ['Где молоко?|gdié malako|Où est le lait ?', 'Здравствуйте|zdravstvouïté|Bonjour'] },
      { npc: 'Приходи ещё!|prikhodi iéchtcho|Reviens bientôt !', ok: 'С удовольствием, спасибо за всё|s oudavol\'stviem, spassiba za fsio|Avec plaisir, merci pour tout', bad: ['Сколько это стоит?|skol\'ka éta stoït|Combien ça coûte ?', 'Очень приятно|otchién\' priiatna|Enchanté(e)'] },
    ],
  },
  {
    id: 'ru-C20', level: 'intermediate', title: 'En taxi', scene: 'taxi', npcRole: 'le chauffeur de taxi', romanized: true,
    situation: 'Tu prends un taxi pour l\'aéroport. Dis ta destination, bavarde un peu et paie la course.',
    key: ['такси|taksi|le taxi|img:taxi', 'аэропорт|aéroport|l\'aéroport|img:airport', 'чемодан|tchémodan|la valise|img:suitcase', 'билет|bilièt|le billet|img:ticket'],
    turns: [
      { npc: 'Здравствуйте, куда едем?|zdravstvouïté, kouda iédiem|Bonjour, où allez-vous ?', ok: 'В аэропорт, пожалуйста|v aéroport, pajalousta|À l\'aéroport, s\'il vous plaît', bad: ['Меня зовут Карим|minia zavout karim|Je m\'appelle Karim', 'Чай, пожалуйста|tchaï, pajalousta|Du thé, s\'il te plaît'] },
      { npc: 'Ехать двадцать минут|iékhat\' dvatsat\' minout|C\'est à vingt minutes', ok: 'Хорошо|kharacho|D\'accord', bad: ['Очень приятно|otchién\' priiatna|Enchanté(e)', 'Где молоко?|gdié malako|Où est le lait ?'] },
      { npc: 'Вы в поездке?|vy f paiestkié|Vous êtes en voyage ?', ok: 'Да, я из Франции|da, ia iz frantsii|Oui, je viens de France', bad: ['Да, очень жарко|da, otchién\' jarka|Oui, il fait très chaud', 'До свидания|da svidania|Au revoir'] },
      { npc: 'Мы приехали|my priékhali|Nous sommes arrivés', ok: 'Остановите здесь, пожалуйста|astanavitié zdiés\', pajalousta|Arrêtez-vous ici, s\'il vous plaît', bad: ['Здравствуйте|zdravstvouïté|Bonjour', 'Сколько это стоит?|skol\'ka éta stoït|Combien ça coûte ?'] },
      { npc: 'С вас пятнадцать евро|s vas pitnatsat\' évro|Ça fait quinze euros', ok: 'Вот, сдачи не надо|vot, zdatchi nié nada|Voilà, gardez la monnaie', bad: ['Я не понимаю|ia nié panimaïou|Je ne comprends pas', 'До свидания|da svidania|Au revoir'] },
      { npc: 'Счастливого пути!|chtchastlivava pouti|Bon voyage !', ok: 'Спасибо, до свидания|spassiba, da svidania|Merci, au revoir', bad: ['Здравствуйте|zdravstvouïté|Bonjour', 'Где вокзал?|gdié vagzal|Où est la gare ?'] },
    ],
  },
];
