import type { SimpleUnit } from '../simple';

// ─── Italien — unités A1 ─────────────────────────────────────────────────────
// Source : programmes/italien.md. Pas de translittération.

export const IT_UNITS: SimpleUnit[] = [
  {
    id: 'it-1', theme: 'greetings', title: 'Saluer et se présenter',
    goal: 'Se présenter avec essere et avere, sans pronom sujet',
    tip: { title: 'Pas de pronom sujet', body: 'En italien, le pronom sujet s\'omet : « Sono francese » = « je suis français ». « Piacere » (enchanté) se dit en serrant la main.' },
    phrases: [
      'Ciao|Salut|img:handshake', 'Buongiorno|Bonjour|img:sunrise', 'Buonasera|Bonsoir|img:sunset', 'Buonanotte|Bonne nuit|🌙',
      'Arrivederci|Au revoir|👋', 'Come ti chiami?|Comment t\'appelles-tu ?', 'Mi chiamo Anna|Je m\'appelle Anna',
      'Sono francese|Je suis français(e)|🇫🇷', 'Sono studente|Je suis étudiant|img:student', 'Come stai?|Comment vas-tu ?',
      'Sto bene, grazie|Je vais bien, merci', 'Piacere|Enchanté(e)', 'Grazie|Merci|🙏', 'Prego|De rien',
    ],
    qa: [['Come ti chiami?', 'Mi chiamo Anna', 'Arrivederci', 'Buonanotte'], ['Come stai?', 'Sto bene, grazie', 'Arrivederci', 'Grazie'], ['Grazie', 'Prego', 'Ciao', 'Arrivederci']],
  },
  {
    id: 'it-2', theme: 'numbers', title: 'Nombres et nationalités',
    goal: 'Dire son âge, sa nationalité et épeler son nom',
    tip: { title: 'L\'âge se « possède »', body: '« Ho venti anni » = « j\'ai vingt ans » (avere, pas essere). Les nombres de 11 à 16 (undici…sedici) se mémorisent un par un.' },
    phrases: [
      'uno|un (1)|1️⃣', 'due|deux (2)|2️⃣', 'tre|trois (3)|3️⃣', 'quattro|quatre (4)|4️⃣', 'cinque|cinq (5)|5️⃣', 'sei|six (6)|6️⃣',
      'sette|sept (7)|7️⃣', 'otto|huit (8)|8️⃣', 'nove|neuf (9)|9️⃣', 'dieci|dix (10)|🔟', 'venti|vingt (20)', 'cento|cent (100)',
      'Quanti anni hai?|Quel âge as-tu ?', 'Ho venti anni|J\'ai vingt ans', 'Qual è il tuo numero di telefono?|Quel est ton numéro de téléphone ?|📱',
      'Come si scrive?|Comment ça s\'écrit ?',
    ],
    qa: [['Quanti anni hai?', 'Ho venti anni', 'uno', 'dieci']],
    orders: ['Ho venti anni', 'Come si scrive?', 'Qual è il tuo numero di telefono?'],
  },
  {
    id: 'it-3', theme: 'family', title: 'Famille',
    goal: 'Présenter sa famille avec les possessifs et leur article',
    tip: { title: 'Possessifs et article', body: 'Devant un nom de famille singulier, pas d\'article : « mia madre », « mio padre ». Mais au pluriel ou avec un adjectif, l\'article revient : « i miei fratelli ».' },
    phrases: [
      'il padre|le père|img:father', 'la madre|la mère|img:mother', 'il fratello|le frère|img:brother', 'la sorella|la sœur|img:sister',
      'il figlio|le fils|img:boy', 'la figlia|la fille|img:girl', 'il nonno|le grand-père|👴', 'la nonna|la grand-mère|👵',
      'la mia famiglia|ma famille|👨‍👩‍👧', 'Questo è mio padre|Voici mon père', 'Questa è mia sorella|Voici ma sœur',
      'Hai fratelli?|As-tu des frères et sœurs ?', 'Ho due fratelli|J\'ai deux frères', 'Mia madre si chiama Rosa|Ma mère s\'appelle Rosa',
    ],
    qa: [['Hai fratelli?', 'Ho due fratelli', 'il nonno', 'la madre']],
  },
  {
    id: 'it-4', theme: 'places', title: 'Se repérer en ville',
    goal: 'Demander un chemin avec les prépositions articulées (al, nel)',
    tip: { title: 'Prépositions articulées', body: 'À + le = al ; dans + le = nel ; de + le = del. « Vado al mercato » (je vais au marché), « Sono nel negozio » (je suis dans le magasin).' },
    phrases: [
      'la strada|la rue|img:street', 'la casa|la maison|img:house', 'la scuola|l\'école|img:school', 'il mercato|le marché|img:market',
      'l\'ospedale|l\'hôpital|img:hospital', 'la biblioteca|la bibliothèque|img:library', 'la città|la ville|img:city',
      'Dov\'è l\'ospedale?|Où est l\'hôpital ?', 'È a destra|C\'est à droite|➡️', 'È a sinistra|C\'est à gauche|⬅️',
      'Sempre dritto|Tout droit|⬆️', 'È vicino|C\'est près', 'È lontano|C\'est loin', 'C\'è un mercato|Il y a un marché',
    ],
    qa: [['Dov\'è l\'ospedale?', 'È a destra', 'la strada', 'la biblioteca'], ['Dov\'è l\'ospedale?', 'È vicino', 'la casa', 'la scuola']],
  },
  {
    id: 'it-5', theme: 'food', title: 'Au restaurant',
    goal: 'Commander avec volere, potere, dovere',
    tip: { title: 'Mi piace / mi piacciono', body: '« Mi piace il pesce » (le poisson me plaît) mais « Mi piacciono le uova » (pluriel). Pour commander poliment : « Vorrei… » (je voudrais).' },
    phrases: [
      'l\'acqua|l\'eau|img:water', 'il pane|le pain|img:bread', 'il caffè|le café|img:coffee', 'il tè|le thé|img:tea', 'il pesce|le poisson|img:fish',
      'le uova|les œufs|img:eggs', 'il latte|le lait|img:milk', 'il succo|le jus|img:juice', 'la mela|la pomme|img:apple', 'la banana|la banane|img:banana',
      'Che cosa vuoi bere?|Que veux-tu boire ?', 'Vorrei un caffè, per favore|Je voudrais un café, s\'il vous plaît',
      'Mi piace il pesce|J\'aime le poisson', 'Mi piacciono le uova|J\'aime les œufs', 'Non mi piace il latte|Je n\'aime pas le lait',
      'Ho fame|J\'ai faim|🍽️', 'Ho sete|J\'ai soif|img:drinking', 'Il conto, per favore|L\'addition, s\'il vous plaît',
    ],
    qa: [['Che cosa vuoi bere?', 'Vorrei un caffè, per favore', 'la mela', 'le uova']],
  },
  {
    id: 'it-6', theme: 'daily_life', title: 'Ma journée',
    goal: 'Décrire sa routine et donner l\'heure',
    tip: { title: 'L\'heure', body: '« È l\'una » (une heure) mais « Sono le tre » (trois heures). Verbes pronominaux : mi alzo (je me lève), mi addormento (je m\'endors).' },
    phrases: [
      'Mi alzo alle sette|Je me lève à sept heures|⏰', 'Faccio colazione alle otto|Je prends le petit-déjeuner à huit heures|🍳',
      'Lavoro in un ufficio|Je travaille dans un bureau|💼', 'Pranzo all\'una|Je déjeune à treize heures',
      'Torno a casa|Je rentre à la maison|img:house', 'Ceno con la mia famiglia|Je dîne avec ma famille',
      'Vado a letto alle undici|Je me couche à onze heures|😴', 'Che ore sono?|Quelle heure est-il ?|img:clock',
      'Sono le tre|Il est trois heures', 'È l\'una|Il est une heure', 'A che ora ti alzi?|À quelle heure te lèves-tu ?',
      'oggi|aujourd\'hui', 'domani|demain', 'adesso|maintenant',
    ],
    qa: [['Che ore sono?', 'Sono le tre', 'oggi', 'domani'], ['A che ora ti alzi?', 'Mi alzo alle sette', 'Ceno con la mia famiglia', 'Lavoro in un ufficio']],
  },
  {
    id: 'it-7', theme: 'daily_life', title: 'Faire des achats',
    goal: 'Demander un prix et acheter un article',
    phrases: [
      'Quanto costa?|Combien ça coûte ?|img:money', 'Costa cinque euro|Ça coûte cinq euros', 'Voglio questo|Je veux ça', 'Ha del pane?|Avez-vous du pain ?|img:bread',
      'È molto caro|C\'est très cher', 'È economico|C\'est bon marché', 'il negozio|le magasin|🏪', 'i soldi|l\'argent|img:money', 'la borsa|le sac|🛍️',
      'Ecco a Lei|Voici (tenez)', 'Altro?|Autre chose ?', 'Nient\'altro, grazie|Rien d\'autre, merci', 'Posso pagare con la carta?|Puis-je payer par carte ?|💳',
    ],
    qa: [['Quanto costa?', 'Costa cinque euro', 'il negozio', 'la borsa'], ['Altro?', 'Nient\'altro, grazie', 'il negozio', 'i soldi']],
  },
];
