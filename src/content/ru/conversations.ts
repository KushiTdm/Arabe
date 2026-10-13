import type { ConvSpec } from '../conversations';

// ─── RU — conversations guidées (générées depuis la table de phrases communes) ───
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
  {
    id: 'ru-C5', title: 'Ma famille', scene: '👨‍👩‍👧', npcRole: 'un ami', romanized: true,
    situation: 'Un ami regarde tes photos de famille. Dis qui est sur chaque photo.',
    key: ['папа|papa|père|img:father', 'мама|mama|mère|img:mother', 'брат|brat|frère|img:brother', 'сестра|sestra|sœur|img:sister'],
    turns: [
      { npc: 'Кто это?|kto éto|Qui est-ce ?', img: 'father', ok: 'Это мой папа|éto moï papa|C\'est mon père', bad: ['Это мой брат|éto moï brat|C\'est mon frère', 'Это моя мама|éto moïa mama|C\'est ma mère'] },
      { npc: 'Кто это?|kto éto|Qui est-ce ?', img: 'mother', ok: 'Это моя мама|éto moïa mama|C\'est ma mère', bad: ['Это моя сестра|éto moïa sestra|C\'est ma sœur', 'Это мой папа|éto moï papa|C\'est mon père'] },
      { npc: 'Кто это?|kto éto|Qui est-ce ?', img: 'sister', ok: 'Это моя сестра|éto moïa sestra|C\'est ma sœur', bad: ['Это моя мама|éto moïa mama|C\'est ma mère', 'Это мой брат|éto moï brat|C\'est mon frère'] },
      { npc: 'Кто это?|kto éto|Qui est-ce ?', img: 'brother', ok: 'Это мой брат|éto moï brat|C\'est mon frère', bad: ['Это мой папа|éto moï papa|C\'est mon père', 'Это моя сестра|éto moïa sestra|C\'est ma sœur'] },
      { npc: 'У тебя есть братья и сёстры?|ou tibia iest bratia i siostry|As-tu des frères et sœurs ?', ok: 'У меня есть брат и сестра|ou minia iest brat i sestra|J\'ai un frère et une sœur', bad: ['Я студент|ia stoudiént|Je suis étudiant', 'Я хочу воды|ia khotchou vody|Je veux de l\'eau'] },
    ],
  },
  {
    id: 'ru-C6', level: 'intermediate', title: 'Au restaurant', scene: 'fish', npcRole: 'le serveur', romanized: true,
    situation: 'Tu dînes au restaurant. Commande un plat et une boisson, donne ton avis, demande l\'addition.',
    key: ['рыба|ryba|poisson|img:fish', 'сок|sok|jus|img:juice', 'вкусный|fkousnyï|délicieux', 'счёт|chiot|l\'addition|img:money'],
    turns: [
      { npc: 'Добро пожаловать|dobro pojalovat|Bienvenue', ok: 'Здравствуйте|zdravstvouïté|Bonjour', bad: ['Счёт, пожалуйста|chiot pajalouïsta|L\'addition, s\'il vous plaît', 'До свидания|da svidania|Au revoir'] },
      { npc: 'Что вы хотите съесть?|chto vy khotitié siést|Que veux-tu manger ?', ok: 'Я возьму рыбу|ia vazmou rybou|Je voudrais du poisson|img:fish', bad: ['Я студент|ia stoudiént|Je suis étudiant', 'Завтра|zaftra|Demain'] },
      { npc: 'А что вы хотите выпить?|a chto vy khotitié vypit|Et que veux-tu boire ?', ok: 'Я предпочитаю сок|ia pridpotchitaïou sok|Je préfère le jus|img:juice', bad: ['Меня зовут Анна|minia zavout anna|Je m\'appelle Anna', 'Я потерял сумку|ia patiériail soumkou|J\'ai perdu mon sac'] },
      { npc: 'Вкусно?|fkousna|Est-ce que c\'est bon ?', ok: 'Да, очень вкусно|da otchien fkousna|Oui, c\'est très bon', bad: ['Я не понимаю|ia ni panimaïou|Je ne comprends pas', 'направо|napravo|à droite'] },
      { npc: 'Что-нибудь ещё?|chto-nibout\' ichtchio|Autre chose ?', ok: 'Нет, спасибо. Счёт, пожалуйста|niét spassiba. chiot pajalouïsta|Non, l\'addition, s\'il vous plaît', bad: ['Я люблю кофе|ia lioubliou kofé|J\'aime le café', 'Где туалет?|gdié toualiét|Où sont les toilettes ?'] },
    ],
  },
  {
    id: 'ru-C7', level: 'intermediate', title: 'À l\'université', scene: 'university', npcRole: 'le professeur', romanized: true,
    situation: 'C\'est ton premier jour à l\'université. Réponds à ton professeur et demande où est la bibliothèque.',
    key: ['профессор|professor|professeur|img:teacher', 'студент|stoudiént|étudiant|img:student', 'библиотека|bibliotéka|bibliothèque|img:library', 'университет|ouniviersitét|université|img:university'],
    turns: [
      { npc: 'Доброе утро|dobraïé outra|Bonjour (le matin)', ok: 'Здравствуйте|zdravstvouïté|Bonjour', bad: ['Добрый вечер|dobryï vétchér|Bonsoir', 'Пожалуйста|pajalousta|De rien'] },
      { npc: 'Ты новый студент?|ty novyï stoudiént|Es-tu un nouvel étudiant ?', ok: 'Да, я новый студент|da ia novyï stoudiént|Oui, je suis un nouvel étudiant|img:student', bad: ['Я не понимаю|ia ni panimaïou|Je ne comprends pas', 'Сколько это стоит?|skol\'ka éta stoït|Combien ça coûte ?'] },
      { npc: 'Что ты изучаешь?|chto ty izoutchaïech|Qu\'étudies-tu ?', ok: 'Я изучаю языки|ia izoutchaïou iazyki|J\'étudie les langues', bad: ['Я из Франции|ia iz frantsii|Je viens de France', 'Я хочу хлеб|ia khatchou khliép|Je veux du pain|img:bread'] },
      { npc: 'У тебя есть вопрос?|ou tibia iest voprós|As-tu une question ?', ok: 'Да, где библиотека?|da gdié bibliotéka|Oui, où est la bibliothèque ?|img:library', bad: ['Спасибо|spassiba|Merci', 'Завтра|zaftra|Demain'] },
      { npc: 'Библиотека рядом, идите прямо|bibliotéka riadom idité priama|La bibliothèque est près, tout droit', ok: 'Спасибо, профессор|spassiba professor|Merci, professeur', bad: ['Извините за эту ошибку|izvinité za étou ochipkou|Je m\'excuse pour cette erreur', 'Здравствуйте|zdravstvouïté|Bonjour'] },
    ],
  },
  {
    id: 'ru-C8', level: 'intermediate', title: 'Chez le médecin', scene: 'hospital', npcRole: 'le médecin', romanized: true,
    situation: 'Tu ne te sens pas bien. Explique ce que tu as et écoute les conseils du médecin.',
    key: ['врач|vratch|médecin|img:doctor', 'голова|galava|tête|img:head', 'вода|vada|eau|img:water', 'Со вчерашнего дня|sa vtcherachniévo dnia|Depuis hier'],
    turns: [
      { npc: 'Здравствуйте, что случилось?|zdravstvouïté chto sloutchilos|Bonjour, quel est le problème ?', ok: 'Я болен|ia bolién|Je suis malade', bad: ['Я студент|ia stoudiént|Je suis étudiant', 'Я хочу кофе, пожалуйста|ia khatchou kofé pajalousta|Je voudrais un café, s\'il vous plaît|img:coffee'] },
      { npc: 'Что у вас болит?|chto ou vas bolit|Où as-tu mal ?', ok: 'У меня болит голова|ou minia bolit galava|J\'ai mal à la tête|img:head', bad: ['Я из Франции|ia iz frantsii|Je viens de France', 'налево|naliévo|à gauche'] },
      { npc: 'С каких пор?|s kakikh por|Depuis quand ?', ok: 'Со вчерашнего дня|sa vtcherachniévo dnia|Depuis hier', bad: ['Завтра|zaftra|Demain', 'Да|da|Oui'] },
      { npc: 'Я дам вам лекарство|ia dam vam lékarstva|Je vais te donner un médicament', ok: 'Спасибо, доктор|spassiba doktar|Merci, docteur', bad: ['До свидания|da svidania|Au revoir', 'Где аэропорт?|gdié aéroport|Où est l\'aéroport ?'] },
      { npc: 'Пей много воды|piéï mnogo vody|Bois beaucoup d\'eau|img:water', ok: 'Хорошо|kharocho|D\'accord', bad: ['Я потерял сумку|ia patiériail soumkou|J\'ai perdu mon sac', 'Сколько это стоит?|skol\'ka éta stoït|Combien ça coûte ?'] },
    ],
  },
  {
    id: 'ru-C9', level: 'intermediate', title: 'Inviter un ami', scene: 'sunset', npcRole: 'un ami', romanized: true,
    situation: 'Un ami te propose de sortir. Accepte, fixe l\'heure et le lieu.',
    key: ['завтра|zaftra|demain', 'кафе|kafé|le café|img:coffee', 'пять часов|piat tchasof|cinq heures|img:clock', 'До скорого|da skoraga|À bientôt'],
    turns: [
      { npc: 'Добрый вечер|dobryï vétchér|Bonsoir', ok: 'Добрый вечер|dobryï vétchér|Bonsoir', bad: ['Доброе утро|dobraïé outra|Bonjour (le matin)', 'Пожалуйста|pajalousta|De rien'] },
      { npc: 'Хочешь погулять завтра?|khotchiech pagoulïat zaftra|Veux-tu qu\'on sorte demain ?', ok: 'Да, с удовольствием|da s oudavolstviém|Oui, avec plaisir', bad: ['Я не понимаю|ia ni panimaïou|Je ne comprends pas', 'Я болен|ia bolién|Je suis malade'] },
      { npc: 'Где встретимся?|gdié vstriétimsia|Où se retrouve-t-on ?', ok: 'В кафе|v kafé|Au café|img:coffee', bad: ['Я студент|ia stoudiént|Je suis étudiant', 'Меня зовут Анна|minia zavout anna|Je m\'appelle Anna'] },
      { npc: 'Во сколько?|va skolka|À quelle heure ?', ok: 'В пять часов|f piat tchasof|À cinq heures|img:clock', bad: ['направо|napravo|à droite', 'Я хочу чай|ia khotchou tchaï|Je veux du thé'] },
      { npc: 'Договорились|dagavorilis|C\'est entendu', ok: 'До скорого|da skoraga|À bientôt', bad: ['Здравствуйте|zdravstvouïté|Bonjour', 'Сколько это стоит?|skol\'ka éta stoït|Combien ça coûte ?'] },
    ],
  },
  {
    id: 'ru-C10', level: 'advanced', title: 'Donner son avis sur une ville', scene: 'city', npcRole: 'un ami', romanized: true,
    situation: 'Un ami te demande ce que tu penses de sa ville. Donne ton avis et justifie-le.',
    key: ['город|gorat|ville|img:city', 'красивый|krassivyï|beau', 'потому что|patamou chto|parce que', 'но|no|mais'],
    turns: [
      { npc: 'Что ты думаешь об этом городе?|chto ty doumaïech ab étom gorodié|Que penses-tu de cette ville ?', ok: 'Я думаю, что город красивый|ia doumaïou chto gorat krassivyï|Je pense que la ville est belle|img:city', bad: ['Я из Франции|ia iz frantsii|Je viens de France', 'До свидания|da svidania|Au revoir'] },
      { npc: 'Почему?|patchemou|Pourquoi ?', ok: 'Потому что он чистый и тихий|patamou chto on tchistyï i tikhiï|Parce qu\'elle est propre et calme', bad: ['Завтра|zaftra|Demain', 'Меня зовут Анна|minia zavout anna|Je m\'appelle Anna'] },
      { npc: 'Но он дорогой|no on dorogoï|Mais elle est chère', ok: 'Я согласен, но он мне нравится|ia saglassien no on mnié nravitsa|Je suis d\'accord, mais je l\'aime', bad: ['Я не понимаю|ia ni panimaïou|Je ne comprends pas', 'Спасибо|spassiba|Merci'] },
      { npc: 'Ты ещё приедешь?|ty iechtchio priediech|La visiteras-tu encore ?', ok: 'Да, я ещё приеду|da ia iechtchio priedou|Oui, je la visiterai encore', bad: ['Я болен|ia bolién|Je suis malade', 'налево|naliévo|à gauche'] },
    ],
  },
  {
    id: 'ru-C11', level: 'advanced', title: 'Une réclamation', scene: 'money', npcRole: 'l\'employé', romanized: true,
    situation: 'Ton appareil ne marche pas. Explique le problème et demande une réparation ou un dédommagement.',
    key: ['проблема|problema|problème', 'прибор|pribor|l\'appareil', 'компенсация|kompiensatsiia|dédommagement', 'директор|diriektor|directeur'],
    turns: [
      { npc: 'Чем могу помочь?|tchiém mogou pamotch|Comment puis-je t\'aider ?', ok: 'У меня проблема|ou minia problema|J\'ai un problème', bad: ['Здравствуйте|zdravstvouïté|Bonjour', 'Я студент|ia stoudiént|Je suis étudiant'] },
      { npc: 'В чём проблема?|v tchiom problema|Quel est le problème ?', ok: 'Прибор не работает|pribor nié rabotaïet|L\'appareil ne fonctionne pas', bad: ['Меня зовут Анна|minia zavout anna|Je m\'appelle Anna', 'Я хочу кофе, пожалуйста|ia khatchou kofé pajalousta|Je voudrais un café, s\'il vous plaît|img:coffee'] },
      { npc: 'С каких пор?|s kakikh por|Depuis quand ?', ok: 'Со вчерашнего дня|sa vtcherachniévo dnia|Depuis hier', bad: ['Да|da|Oui', 'направо|napravo|à droite'] },
      { npc: 'Извините за эту ошибку|izvinité za étou ochipkou|Je m\'excuse pour cette erreur', ok: 'Пожалуйста, почините его|pajalouïsta patchinité iévo|Je vous prie de le réparer', bad: ['До свидания|da svidania|Au revoir', 'Я не понимаю|ia ni panimaïou|Je ne comprends pas'] },
      { npc: 'Я починю его завтра|ia patchinïou iévo zaftra|Je le réparerai demain', ok: 'Спасибо вам|spassiba vam|Merci à vous', bad: ['Где туалет?|gdié toualiét|Où sont les toilettes ?', 'Я болен|ia bolién|Je suis malade'] },
    ],
  },
  {
    id: 'ru-C12', level: 'advanced', title: 'Un exposé en classe', scene: 'teacher', npcRole: 'le professeur', romanized: true,
    situation: 'Tu présentes un court exposé. Ouvre, argumente, conclus et remercie.',
    key: ['тема|téma|sujet', 'например|naprimier|par exemple', 'в заключение|v zakliouchénié|pour conclure', 'вопрос|voprós|question'],
    turns: [
      { npc: 'Пожалуйста, начинайте|pajalouïsta natchinaïté|Je vous en prie, commencez', ok: 'Моя тема — изучение языков|maïa téma izoutchénié iazykof|Mon sujet est l\'apprentissage des langues', bad: ['Спасибо за внимание|spassiba za vnimanié|Merci de votre attention', 'До свидания|da svidania|Au revoir'] },
      { npc: 'Почему эта тема?|patchemou éta téma|Pourquoi ce sujet ?', ok: 'Потому что она важна|patamou chto ana vajna|Parce qu\'il est important', bad: ['Я хочу хлеб|ia khatchou khliép|Je veux du pain|img:bread', 'Завтра|zaftra|Demain'] },
      { npc: 'У вас есть пример?|ou vas iest primier|As-tu un exemple ?', ok: 'Да, например, путешествия|da naprimier poutéchiestviïa|Oui, par exemple les voyages', bad: ['Я не понимаю|ia ni panimaïou|Je ne comprends pas', 'направо|napravo|à droite'] },
      { npc: 'А в заключение?|a v zakliouchénié|Et pour conclure ?', ok: 'В заключение: я учусь каждый день|v zakliouchénié ia outchous kajdyï dien|Pour conclure, j\'apprends chaque jour', bad: ['Я болен|ia bolién|Je suis malade', 'Здравствуйте|zdravstvouïté|Bonjour'] },
      { npc: 'Браво, хорошая работа|bravo kharochaïa rabota|Bravo, bon travail', ok: 'Спасибо за внимание|spassiba za vnimanié|Merci de votre attention', bad: ['У меня есть брат и сестра|ou minia iest brat i sestra|J\'ai un frère et une sœur', 'Сколько это стоит?|skol\'ka éta stoït|Combien ça coûte ?'] },
    ],
  },
  {
    id: 'ru-C13', title: 'À la gare', scene: 'station', npcRole: 'l\'employé du guichet', romanized: true,
    situation: 'Tu achètes un billet de train à la gare. Dis où tu vas, demande un billet et paie.',
    key: ['вокзал|vagzal|la gare|img:station', 'билет|bilièt|le billet|img:ticket', 'поезд|poïezd|le train|img:train', 'чемодан|tchémodan|la valise|img:suitcase'],
    turns: [
      { npc: 'Здравствуйте, куда вы едете?|zdravstvouïté kouda vy iédété|Bonjour, où allez-vous ?', ok: 'Я еду в центр|ia iédou f tsentr|Je vais en ville', bad: ['Я студент|ia stoudiént|Je suis étudiant', 'Спасибо|spassiba|Merci'] },
      { npc: 'Один билет или два?|adin bilièt ili dva|Un billet ou deux ?', img: 'ticket', ok: 'Один билет, пожалуйста|adin bilièt pajalouïsta|Un billet, s\'il vous plaît|img:ticket', bad: ['Я хочу воды|ia khotchou vody|Je veux de l\'eau', 'Меня зовут Анна|minia zavout anna|Je m\'appelle Anna'] },
      { npc: 'С вас двадцать евро|s vas dvadtsat iévro|Ça fait vingt euros', ok: 'Вот, пожалуйста|vot pajalousta|Voilà', bad: ['Сколько это стоит?|skol\'ka éta stoït|Combien ça coûte ?', 'Я люблю кофе|ia lioubliou kofé|J\'aime le café'] },
      { npc: 'Поезд отправляется в пять часов|poïezd atpravliaïétsa f piat tchasof|Le train part à cinq heures', ok: 'Хорошо, спасибо|kharocho spassiba|D\'accord, merci', bad: ['Я потерял сумку|ia patiériail soumkou|J\'ai perdu mon sac', 'Я болен|ia bolién|Je suis malade'] },
      { npc: 'Счастливого пути!|chtchastlivava pouti|Bon voyage !', ok: 'Спасибо, до свидания|spassiba da svidania|Merci, au revoir', bad: ['Здравствуйте|zdravstvouïté|Bonjour', 'Я не понимаю|ia ni panimaïou|Je ne comprends pas'] },
    ],
  },
  {
    id: 'ru-C14', level: 'intermediate', title: 'À l\'hôtel', scene: 'hotel', npcRole: 'le réceptionniste', romanized: true,
    situation: 'Tu arrives à l\'hôtel. Annonce ta réservation, donne ton nom, écoute les consignes.',
    key: ['отель|ottel|l\'hôtel|img:hotel', 'номер|nomiér|la chambre|img:bed', 'ключ|kliouts|la clé|img:key', 'завтрак|zaftrak|le petit-déjeuner'],
    turns: [
      { npc: 'Здравствуйте, добро пожаловать в отель|zdravstvouïté dobro pojalovat v ottel|Bonjour, bienvenue à l\'hôtel', ok: 'Здравствуйте, у меня бронь|zdravstvouïté ou minia bron|Bonjour, j\'ai une réservation', bad: ['Счёт, пожалуйста|chiot pajalouïsta|L\'addition, s\'il vous plaît', 'Я хочу чай|ia khotchou tchaï|Je veux du thé'] },
      { npc: 'Как вас зовут?|kak vas zovout|Quel est votre nom ?', ok: 'Меня зовут Анна|minia zavout anna|Je m\'appelle Anna', bad: ['Я из Франции|ia iz frantsii|Je viens de France', 'Спасибо|spassiba|Merci'] },
      { npc: 'Вот ключ от вашего номера|vot kliouts ot vachiéva nomiéra|Voici la clé de votre chambre|img:key', img: 'key', ok: 'Спасибо|spassiba|Merci', bad: ['До свидания|da svidania|Au revoir', 'Я болен|ia bolién|Je suis malade'] },
      { npc: 'Завтрак в восемь часов|zaftrak v vossiém tchasof|Le petit-déjeuner est à huit heures', ok: 'Отлично, спасибо|otlitchno spassiba|C\'est parfait, merci', bad: ['Я потерял сумку|ia patiériail soumkou|J\'ai perdu mon sac', 'налево|naliévo|à gauche'] },
      { npc: 'Вам нужно что-нибудь ещё?|vam noujno chto-nibout iechtchio|Avez-vous besoin d\'autre chose ?', ok: 'Нет, спасибо, спокойной ночи|niét spassiba spakoïnoï notchi|Non, merci, bonne nuit', bad: ['Меня зовут Анна|minia zavout anna|Je m\'appelle Anna', 'Я из Франции|ia iz frantsii|Je viens de France'] },
    ],
  },
  {
    id: 'ru-C15', level: 'intermediate', title: 'Au téléphone', scene: 'phone', npcRole: 'un ami', romanized: true,
    situation: 'Un ami t\'appelle. Réponds, donne des nouvelles et fixe un rendez-vous pour demain.',
    key: ['телефон|téléfon|le téléphone|img:phone', 'номер телефона|nomiér téléfona|le numéro', 'завтра|zaftra|demain', 'До скорого|da skoraga|À bientôt'],
    turns: [
      { npc: 'Алло?|allo|Allô ?', ok: 'Алло, это Анна|allo éto anna|Allô, c\'est Anna', bad: ['Спасибо|spassiba|Merci', 'Да|da|Oui'] },
      { npc: 'Как дела?|kak diéla|Comment vas-tu ?', ok: 'Хорошо, спасибо|kharacho spassiba|Je vais bien, merci', bad: ['Меня зовут Анна|minia zavout anna|Je m\'appelle Anna', 'До свидания|da svidania|Au revoir'] },
      { npc: 'Ты завтра свободен?|ty zaftra svabodiéne|Tu es libre demain ?', ok: 'Да, я свободен|da ia svabodiéne|Oui, je suis libre', bad: ['Я болен|ia bolién|Je suis malade', 'Я потерял сумку|ia patiériail soumkou|J\'ai perdu mon sac'] },
      { npc: 'Я пришлю адрес сообщением|ia prichliou adrès sapchtchéniém|Je t\'envoie l\'adresse par message', ok: 'Хорошо, спасибо|kharocho spassiba|D\'accord, merci', bad: ['Я студент|ia stoudiént|Je suis étudiant', 'Я не понимаю|ia ni panimaïou|Je ne comprends pas'] },
      { npc: 'До завтра!|da zaftra|À demain !', ok: 'До завтра!|da zaftra|À demain !', bad: ['Здравствуйте|zdravstvouïté|Bonjour', 'Я люблю кофе|ia lioubliou kofé|J\'aime le café'] },
    ],
  },
  {
    id: 'ru-C16', level: 'intermediate', title: 'À l\'aéroport', scene: 'airport', npcRole: 'l\'agent d\'enregistrement', romanized: true,
    situation: 'Tu enregistres ton vol. Montre ton passeport, dis où tu vas et demande ta porte.',
    key: ['аэропорт|aéroport|l\'aéroport|img:airport', 'паспорт|pasport|le passeport', 'чемодан|tchémodan|la valise|img:suitcase', 'самолёт|samaliot|l\'avion|img:airplane'],
    turns: [
      { npc: 'Ваш паспорт, пожалуйста|vach pasport pajalouïsta|Votre passeport, s\'il vous plaît', ok: 'Вот мой паспорт|vot moï pasport|Voici mon passeport', bad: ['Я студент|ia stoudiént|Je suis étudiant', 'Сколько это стоит?|skol\'ka éta stoït|Combien ça coûte ?'] },
      { npc: 'Здравствуйте, куда вы едете?|zdravstvouïté kouda vy iédété|Bonjour, où allez-vous ?', ok: 'Я лечу во Францию|ia létchou va frantsiiou|Je vais en France', bad: ['Спасибо|spassiba|Merci', 'Завтра|zaftra|Demain'] },
      { npc: 'У вас есть чемодан?|ou vas iest tchémodan|Avez-vous une valise ?', img: 'suitcase', ok: 'Да, у меня есть чемодан|da ou minia iest tchémodan|Oui, j\'ai une valise|img:suitcase', bad: ['Я люблю кофе|ia lioubliou kofé|J\'aime le café', 'Меня зовут Анна|minia zavout anna|Je m\'appelle Anna'] },
      { npc: 'Самолёт вылетает в десять часов|samaliot vyliétaïét v diéssiat tchasof|L\'avion part à dix heures', ok: 'Спасибо, где выход на посадку?|spassiba gdié vykhod na pasadkou|Merci, où est la porte d\'embarquement ?', bad: ['Я потерял сумку|ia patiériail soumkou|J\'ai perdu mon sac', 'Я болен|ia bolién|Je suis malade'] },
      { npc: 'Счастливого полёта!|chtchastlivava paliota|Bon vol !', ok: 'Спасибо, до свидания|spassiba da svidania|Merci, au revoir', bad: ['Здравствуйте|zdravstvouïté|Bonjour', 'Я не понимаю|ia ni panimaïou|Je ne comprends pas'] },
    ],
  },
];
