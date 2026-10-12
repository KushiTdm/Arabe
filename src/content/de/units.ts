import type { SimpleUnit } from '../simple';

// ─── Allemand — unités A1 ────────────────────────────────────────────────────
// Source : programmes/allemand.md. Règle : on apprend chaque nom avec son article
// (der / die / das). Pas de translittération.

export const DE_UNITS: SimpleUnit[] = [
  {
    id: 'de-1', theme: 'greetings', title: 'Se présenter',
    goal: 'Se présenter avec sein ; donner l\'article avec chaque nom',
    tip: { title: 'Le verbe en 2e position', body: 'En allemand, le verbe conjugué est toujours en 2e position : « Ich heiße Anna », « Ich komme aus Frankreich ». Les noms prennent une majuscule.' },
    phrases: [
      'Hallo|Salut|img:handshake', 'Guten Morgen|Bonjour (matin)|img:sunrise', 'Guten Tag|Bonjour|☀️', 'Guten Abend|Bonsoir|img:sunset',
      'Gute Nacht|Bonne nuit|🌙', 'Tschüss|Salut (au revoir)|👋', 'Auf Wiedersehen|Au revoir', 'Wie heißt du?|Comment t\'appelles-tu ?',
      'Ich heiße Anna|Je m\'appelle Anna', 'Ich komme aus Frankreich|Je viens de France|🇫🇷', 'Ich bin Student|Je suis étudiant|img:student',
      'Wie geht\'s?|Comment ça va ?', 'Gut, danke|Bien, merci', 'Freut mich|Enchanté(e)', 'Danke|Merci|🙏', 'Bitte|De rien, s\'il vous plaît',
    ],
    qa: [['Wie heißt du?', 'Ich heiße Anna', 'Tschüss', 'Gute Nacht'], ['Wie geht\'s?', 'Gut, danke', 'Tschüss', 'Danke'], ['Danke', 'Bitte', 'Hallo', 'Tschüss']],
  },
  {
    id: 'de-2', theme: 'numbers', title: 'Nombres et heure',
    goal: 'Dire son âge, les nombres et l\'heure',
    tip: { title: 'Les nombres à l\'envers', body: 'À partir de 21, on dit l\'unité d\'abord : « einundzwanzig » = « un-et-vingt ». « Ich bin zwanzig Jahre alt » : on emploie sein pour l\'âge.' },
    phrases: [
      'eins|un (1)|1️⃣', 'zwei|deux (2)|2️⃣', 'drei|trois (3)|3️⃣', 'vier|quatre (4)|4️⃣', 'fünf|cinq (5)|5️⃣', 'sechs|six (6)|6️⃣',
      'sieben|sept (7)|7️⃣', 'acht|huit (8)|8️⃣', 'neun|neuf (9)|9️⃣', 'zehn|dix (10)|🔟', 'zwanzig|vingt (20)', 'hundert|cent (100)',
      'Wie alt bist du?|Quel âge as-tu ?', 'Ich bin zwanzig Jahre alt|J\'ai vingt ans', 'Wie spät ist es?|Quelle heure est-il ?|img:clock',
      'Es ist drei Uhr|Il est trois heures',
    ],
    qa: [['Wie alt bist du?', 'Ich bin zwanzig Jahre alt', 'eins', 'zehn'], ['Wie spät ist es?', 'Es ist drei Uhr', 'zwanzig', 'hundert']],
  },
  {
    id: 'de-3', theme: 'family', title: 'Famille',
    goal: 'Présenter sa famille avec haben et les possessifs',
    tip: { title: 'Der, die, das', body: 'Trois genres : der (masculin), die (féminin), das (neutre). Il faut les apprendre avec le nom : der Vater, die Mutter. Possessifs : mein (m./n.), meine (f.).' },
    phrases: [
      'der Vater|le père|img:father', 'die Mutter|la mère|img:mother', 'der Bruder|le frère|img:brother', 'die Schwester|la sœur|img:sister',
      'der Sohn|le fils|img:boy', 'die Tochter|la fille|img:girl', 'der Großvater|le grand-père|👴', 'die Großmutter|la grand-mère|👵',
      'meine Familie|ma famille|👨‍👩‍👧', 'Das ist mein Vater|Voici mon père', 'Das ist meine Schwester|Voici ma sœur',
      'Hast du Geschwister?|As-tu des frères et sœurs ?', 'Ich habe zwei Geschwister|J\'ai deux frères et sœurs', 'Meine Mutter heißt Rosa|Ma mère s\'appelle Rosa',
    ],
    qa: [['Hast du Geschwister?', 'Ich habe zwei Geschwister', 'der Großvater', 'die Mutter']],
  },
  {
    id: 'de-4', theme: 'places', title: 'Se repérer en ville',
    goal: 'Localiser et demander un chemin',
    tip: { title: 'Es gibt', body: '« Es gibt einen Markt » = « il y a un marché ». Après « es gibt », le nom est à l\'accusatif : « einen Markt » (masculin), « eine Schule » (féminin).' },
    phrases: [
      'die Straße|la rue|img:street', 'das Haus|la maison|img:house', 'die Schule|l\'école|img:school', 'der Markt|le marché|img:market',
      'das Krankenhaus|l\'hôpital|img:hospital', 'die Bibliothek|la bibliothèque|img:library', 'die Stadt|la ville|img:city',
      'Wo ist das Krankenhaus?|Où est l\'hôpital ?', 'Es ist rechts|C\'est à droite|➡️', 'Es ist links|C\'est à gauche|⬅️',
      'Geradeaus|Tout droit|⬆️', 'Es ist in der Nähe|C\'est près', 'Es ist weit weg|C\'est loin', 'Es gibt einen Markt|Il y a un marché',
    ],
    qa: [['Wo ist das Krankenhaus?', 'Es ist rechts', 'die Straße', 'die Bibliothek'], ['Wo ist das Krankenhaus?', 'Es ist in der Nähe', 'das Haus', 'die Schule']],
  },
  {
    id: 'de-5', theme: 'food', title: 'Au restaurant',
    goal: 'Commander avec möchten et les verbes modaux',
    tip: { title: 'Möchten', body: '« Ich möchte einen Kaffee » = « je voudrais un café ». Le verbe modal conjugué prend la 2e place, l\'autre verbe part à la fin : « Ich möchte Kaffee trinken ».' },
    phrases: [
      'das Wasser|l\'eau|img:water', 'das Brot|le pain|img:bread', 'der Kaffee|le café|img:coffee', 'der Tee|le thé|img:tea', 'der Fisch|le poisson|img:fish',
      'die Eier|les œufs|img:eggs', 'die Milch|le lait|img:milk', 'der Saft|le jus|img:juice', 'der Apfel|la pomme|img:apple', 'die Banane|la banane|img:banana',
      'Was möchtest du trinken?|Que veux-tu boire ?', 'Ich möchte einen Kaffee, bitte|Je voudrais un café, s\'il vous plaît',
      'Ich mag Fisch|J\'aime le poisson', 'Ich mag keine Milch|Je n\'aime pas le lait', 'Ich habe Hunger|J\'ai faim|🍽️',
      'Ich habe Durst|J\'ai soif|img:drinking', 'Die Rechnung, bitte|L\'addition, s\'il vous plaît',
    ],
    qa: [['Was möchtest du trinken?', 'Ich möchte einen Kaffee, bitte', 'der Apfel', 'die Eier']],
  },
  {
    id: 'de-6', theme: 'daily_life', title: 'Ma routine',
    goal: 'Décrire sa journée avec les verbes séparables',
    tip: { title: 'Verbes séparables', body: '« aufstehen » (se lever) se sépare : « Ich stehe um sieben Uhr auf ». Le préfixe part tout à la fin de la phrase.' },
    phrases: [
      'Ich stehe um sieben Uhr auf|Je me lève à sept heures|⏰', 'Ich frühstücke um acht Uhr|Je prends le petit-déjeuner à huit heures|🍳',
      'Ich arbeite in einem Büro|Je travaille dans un bureau|💼', 'Ich esse um zwölf Uhr zu Mittag|Je déjeune à midi',
      'Ich komme nach Hause|Je rentre à la maison|img:house', 'Ich esse mit meiner Familie zu Abend|Je dîne avec ma famille',
      'Ich gehe um elf Uhr schlafen|Je vais dormir à onze heures|😴', 'Wann stehst du auf?|Quand te lèves-tu ?',
      'heute|aujourd\'hui', 'morgen|demain', 'jetzt|maintenant',
    ],
    qa: [['Wann stehst du auf?', 'Ich stehe um sieben Uhr auf', 'Ich arbeite in einem Büro', 'heute']],
  },
  {
    id: 'de-7', theme: 'daily_life', title: 'Acheter',
    goal: 'Acheter un article à l\'accusatif',
    phrases: [
      'Was kostet das?|Combien ça coûte ?|img:money', 'Das kostet fünf Euro|Ça coûte cinq euros', 'Ich möchte das|Je voudrais ça', 'Haben Sie Brot?|Avez-vous du pain ?|img:bread',
      'Das ist sehr teuer|C\'est très cher', 'Das ist billig|C\'est bon marché', 'der Laden|le magasin|🏪', 'das Geld|l\'argent|img:money', 'die Tasche|le sac|🛍️',
      'Bitte schön|Voici', 'Sonst noch etwas?|Autre chose ?', 'Nein, danke|Non, merci', 'Kann ich mit Karte zahlen?|Puis-je payer par carte ?|💳',
    ],
    qa: [['Was kostet das?', 'Das kostet fünf Euro', 'der Laden', 'die Tasche'], ['Sonst noch etwas?', 'Nein, danke', 'der Laden', 'das Geld']],
  },
];
