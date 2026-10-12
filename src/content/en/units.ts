import type { SimpleUnit } from '../simple';

// ─── Anglais (britannique) — unités A1 ───────────────────────────────────────
// Source : programmes/anglais.md. Voix en-GB. Pas de translittération : la
// prononciation s'apprend à l'oreille (bouton « Lent »).

export const EN_UNITS: SimpleUnit[] = [
  {
    id: 'en-1', theme: 'greetings', title: 'Se présenter',
    goal: 'Se présenter avec to be ; entendre le schwa',
    tip: { title: 'Le pronom est obligatoire', body: 'Contrairement à l\'espagnol, on ne peut pas l\'omettre : « I am from France » (« Am from France » est faux). Contractions courantes : I\'m, you\'re, it\'s.' },
    phrases: [
      'Hello|Bonjour, salut|img:handshake', 'Good morning|Bonjour (matin)|img:sunrise', 'Good afternoon|Bonjour (après-midi)|☀️', 'Good evening|Bonsoir|img:sunset',
      'Goodbye|Au revoir|👋', 'See you later|À tout à l\'heure', 'What\'s your name?|Comment t\'appelles-tu ?', 'My name is Anna|Je m\'appelle Anna',
      'I\'m from France|Je viens de France|🇫🇷', 'I\'m a student|Je suis étudiant(e)|img:student', 'How are you?|Comment vas-tu ?',
      'I\'m fine, thank you|Je vais bien, merci', 'Nice to meet you|Enchanté(e)', 'Thank you|Merci|🙏', 'You\'re welcome|De rien',
    ],
    qa: [['What\'s your name?', 'My name is Anna', 'Goodbye', 'Good evening'], ['How are you?', 'I\'m fine, thank you', 'Goodbye', 'Thank you'], ['Thank you', 'You\'re welcome', 'Hello', 'Goodbye']],
  },
  {
    id: 'en-2', theme: 'numbers', title: 'Épeler et compter',
    goal: 'Épeler son nom, dire son âge et l\'heure',
    tip: { title: 'L\'âge avec « to be »', body: 'On emploie « to be » pour l\'âge : « I\'m twenty years old » (pas « I have »). Ne pas confondre thirteen (13) et thirty (30) : l\'accent change de place.' },
    phrases: [
      'one|un (1)|1️⃣', 'two|deux (2)|2️⃣', 'three|trois (3)|3️⃣', 'four|quatre (4)|4️⃣', 'five|cinq (5)|5️⃣', 'six|six (6)|6️⃣',
      'seven|sept (7)|7️⃣', 'eight|huit (8)|8️⃣', 'nine|neuf (9)|9️⃣', 'ten|dix (10)|🔟', 'twenty|vingt (20)', 'one hundred|cent (100)',
      'How old are you?|Quel âge as-tu ?', 'I\'m twenty years old|J\'ai vingt ans', 'What\'s your phone number?|Quel est ton numéro de téléphone ?|📱',
      'How do you spell it?|Comment ça s\'écrit ?', 'What time is it?|Quelle heure est-il ?|img:clock', 'It\'s three o\'clock|Il est trois heures',
    ],
    qa: [['How old are you?', 'I\'m twenty years old', 'one', 'ten'], ['What time is it?', 'It\'s three o\'clock', 'twenty', 'one hundred']],
  },
  {
    id: 'en-3', theme: 'family', title: 'Famille',
    goal: 'Présenter sa famille avec have got et les possessifs',
    tip: { title: 'Possessifs selon le possesseur', body: 'En anglais, le possessif s\'accorde avec le POSSESSEUR, pas avec la chose : « his mother » (la mère de lui), « her mother » (la mère d\'elle). Pour « mon » : my.' },
    phrases: [
      'father|le père|img:father', 'mother|la mère|img:mother', 'brother|le frère|img:brother', 'sister|la sœur|img:sister',
      'son|le fils|img:boy', 'daughter|la fille|img:girl', 'grandfather|le grand-père|👴', 'grandmother|la grand-mère|👵',
      'my family|ma famille|👨‍👩‍👧', 'This is my father|Voici mon père', 'This is my sister|Voici ma sœur',
      'Have you got any brothers or sisters?|As-tu des frères et sœurs ?', 'I\'ve got two brothers|J\'ai deux frères', 'My mother\'s name is Rosa|Ma mère s\'appelle Rosa',
    ],
    qa: [['Have you got any brothers or sisters?', 'I\'ve got two brothers', 'grandfather', 'mother']],
  },
  {
    id: 'en-4', theme: 'places', title: 'Lieux',
    goal: 'Dire où se trouvent les choses (there is / are)',
    tip: { title: 'There is / there are', body: '« There is a market » (singulier), « There are two schools » (pluriel). Pour situer : « It\'s on the right ».' },
    phrases: [
      'street|la rue|img:street', 'house|la maison|img:house', 'school|l\'école|img:school', 'market|le marché|img:market',
      'hospital|l\'hôpital|img:hospital', 'library|la bibliothèque|img:library', 'city|la ville|img:city',
      'Where is the hospital?|Où est l\'hôpital ?', 'It\'s on the right|C\'est à droite|➡️', 'It\'s on the left|C\'est à gauche|⬅️',
      'Go straight ahead|Allez tout droit|⬆️', 'It\'s near|C\'est près', 'It\'s far|C\'est loin', 'There is a market|Il y a un marché',
    ],
    qa: [['Where is the hospital?', 'It\'s on the right', 'street', 'library'], ['Where is the hospital?', 'It\'s near', 'house', 'school']],
  },
  {
    id: 'en-5', theme: 'food', title: 'Au restaurant',
    goal: 'Commander avec I\'d like',
    tip: { title: 'Politesse', body: '« I\'d like… » (je voudrais) est plus poli que « I want… ». « Could I have… ? » est aussi très courant au restaurant.' },
    phrases: [
      'water|l\'eau|img:water', 'bread|le pain|img:bread', 'coffee|le café|img:coffee', 'tea|le thé|img:tea', 'fish|le poisson|img:fish',
      'eggs|les œufs|img:eggs', 'milk|le lait|img:milk', 'juice|le jus|img:juice', 'apple|la pomme|img:apple', 'banana|la banane|img:banana',
      'What would you like to drink?|Que voudriez-vous boire ?', 'I\'d like a coffee, please|Je voudrais un café, s\'il vous plaît',
      'I like fish|J\'aime le poisson', 'I don\'t like milk|Je n\'aime pas le lait', 'I\'m hungry|J\'ai faim|🍽️', 'I\'m thirsty|J\'ai soif|img:drinking',
      'The bill, please|L\'addition, s\'il vous plaît',
      'tomato|la tomate|img:tomato',
      'grapes|le raisin|img:grapes',
      'strawberry|la fraise|img:strawberry',
      "orange|l'orange|img:orange",
      'potato|la pomme de terre|img:potato',
      "onion|l'oignon|img:onion",
    ],
    qa: [['What would you like to drink?', 'I\'d like a coffee, please', 'apple', 'eggs']],
  },
  {
    id: 'en-6', theme: 'daily_life', title: 'Ma routine',
    goal: 'Décrire sa journée au present simple',
    tip: { title: 'Le « s » de la 3e personne', body: 'Au present simple, on ajoute -s à la 3e personne du singulier : « I get up » mais « she gets up ». Pour l\'heure : « at seven o\'clock ».' },
    phrases: [
      'I get up at seven|Je me lève à sept heures|⏰', 'I have breakfast at eight|Je prends le petit-déjeuner à huit heures|🍳',
      'I work in an office|Je travaille dans un bureau|💼', 'I have lunch at one|Je déjeune à treize heures',
      'I go home|Je rentre à la maison|img:house', 'I have dinner with my family|Je dîne avec ma famille',
      'I go to bed at eleven|Je me couche à onze heures|😴', 'What time do you get up?|À quelle heure te lèves-tu ?',
      'today|aujourd\'hui', 'tomorrow|demain', 'now|maintenant',
    ],
    qa: [['What time do you get up?', 'I get up at seven', 'I work in an office', 'today']],
  },
  {
    id: 'en-7', theme: 'daily_life', title: 'Faire des achats',
    goal: 'Demander un prix et acheter un article',
    phrases: [
      'How much is it?|Combien ça coûte ?|img:money', 'It\'s five pounds|Ça coûte cinq livres', 'I\'d like this|Je voudrais ça', 'Do you have any bread?|Avez-vous du pain ?|img:bread',
      'It\'s very expensive|C\'est très cher', 'It\'s cheap|C\'est bon marché', 'shop|le magasin|🏪', 'money|l\'argent|img:money', 'bag|le sac|🛍️',
      'Here you are|Voici', 'Anything else?|Autre chose ?', 'No, thank you|Non, merci', 'Can I pay by card?|Puis-je payer par carte ?|💳',
    ],
    qa: [['How much is it?', 'It\'s five pounds', 'shop', 'bag'], ['Anything else?', 'No, thank you', 'shop', 'money']],
  },
];
