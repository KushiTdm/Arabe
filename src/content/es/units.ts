import type { SimpleUnit } from '../simple';

// ─── Espagnol — unités A1 ────────────────────────────────────────────────────
// Source : programmes/espagnol.md § 3. Castillan (es-ES). Pas de translittération.
// Phrase = 'texte|français|emoji ou img:clé'.

export const ES_UNITS: SimpleUnit[] = [
  {
    id: 'es-1', theme: 'greetings', title: 'Saluer et se présenter',
    goal: 'Se présenter : nom, origine, profession — sans pronom sujet',
    tip: { title: 'Pas de pronom sujet', body: 'En espagnol, la fin du verbe dit qui agit : « Soy de Francia » = « je suis de France », sans « yo ». Les phrases interrogatives et exclamatives sont encadrées de ¿ ? et ¡ !.' },
    phrases: [
      'Hola|Bonjour, salut|img:handshake', 'Buenos días|Bonjour (le matin)|img:sunrise', 'Buenas tardes|Bonjour (l\'après-midi)|☀️',
      'Buenas noches|Bonsoir, bonne nuit|img:sunset', 'Adiós|Au revoir|👋', 'Hasta luego|À tout à l\'heure',
      '¿Cómo te llamas?|Comment t\'appelles-tu ?', 'Me llamo Ana|Je m\'appelle Ana', 'Soy de Francia|Je suis de France|🇫🇷',
      'Soy estudiante|Je suis étudiant(e)|img:student', '¿Cómo estás?|Comment vas-tu ?', 'Estoy bien, gracias|Je vais bien, merci',
      'Mucho gusto|Enchanté(e)', 'Gracias|Merci|🙏', 'De nada|De rien',
    ],
    qa: [[6, 7, 4, 12], [10, 11, 4, 13], [13, 14, 0, 4]],
  },
  {
    id: 'es-2', theme: 'numbers', title: 'Nombres et âge',
    goal: 'Dire son âge, son numéro et épeler son nom',
    tip: { title: 'L\'âge se « possède »', body: 'On ne dit pas « je suis 20 ans » mais « j\'ai 20 ans » : « Tengo veinte años » (verbe tener). Attention : ser et estar n\'interviennent pas ici.' },
    phrases: [
      'uno|un (1)|1️⃣', 'dos|deux (2)|2️⃣', 'tres|trois (3)|3️⃣', 'cuatro|quatre (4)|4️⃣', 'cinco|cinq (5)|5️⃣',
      'seis|six (6)|6️⃣', 'siete|sept (7)|7️⃣', 'ocho|huit (8)|8️⃣', 'nueve|neuf (9)|9️⃣', 'diez|dix (10)|🔟',
      'veinte|vingt (20)', 'cien|cent (100)',
      '¿Cuántos años tienes?|Quel âge as-tu ?', 'Tengo veinte años|J\'ai vingt ans',
      '¿Cuál es tu número de teléfono?|Quel est ton numéro de téléphone ?|📱', '¿Cómo se escribe?|Comment ça s\'écrit ?',
    ],
    qa: [[12, 13, 0, 9]],
    orders: [13, 14, 15],
  },
  {
    id: 'es-3', theme: 'family', title: 'Famille et possession',
    goal: 'Présenter sa famille avec tener et les possessifs',
    tip: { title: 'Genre et possessifs', body: 'Les noms sont masculins (el padre) ou féminins (la madre). Mon / ma = « mi » dans les deux cas : « mi padre », « mi madre ». Pour dire « voici », Este es (masculin) et Esta es (féminin).' },
    phrases: [
      'el padre|le père|img:father', 'la madre|la mère|img:mother', 'el hermano|le frère|img:brother', 'la hermana|la sœur|img:sister',
      'el hijo|le fils|img:boy', 'la hija|la fille|img:girl', 'el abuelo|le grand-père|👴', 'la abuela|la grand-mère|👵',
      'mi familia|ma famille|👨‍👩‍👧', 'Este es mi padre|Voici mon père', 'Esta es mi hermana|Voici ma sœur',
      '¿Tienes hermanos?|As-tu des frères et sœurs ?', 'Tengo dos hermanos|J\'ai deux frères et sœurs',
      'Mi madre se llama Rosa|Ma mère s\'appelle Rosa',
    ],
    qa: [[11, 12, 6, 1]],
  },
  {
    id: 'es-4', theme: 'places', title: 'Se repérer en ville',
    goal: 'Demander et comprendre un chemin (hay, estar)',
    tip: { title: 'Estar ou hay ?', body: 'Pour situer quelque chose de précis, on utilise estar : « El hospital está cerca ». Pour dire qu\'il existe, on utilise hay : « Hay un mercado ». Les deux se traduisent par « il y a / c\'est », mais pas au même moment.' },
    phrases: [
      'la calle|la rue|img:street', 'la casa|la maison|img:house', 'la escuela|l\'école|img:school', 'el mercado|le marché|img:market',
      'el hospital|l\'hôpital|img:hospital', 'la biblioteca|la bibliothèque|img:library', 'la ciudad|la ville|img:city',
      '¿Dónde está el hospital?|Où est l\'hôpital ?', 'Está a la derecha|C\'est à droite|➡️', 'Está a la izquierda|C\'est à gauche|⬅️',
      'Todo recto|Tout droit|⬆️', 'Está cerca|C\'est près', 'Está lejos|C\'est loin', 'Hay un mercado|Il y a un marché',
    ],
    qa: [[7, 8, 0, 5], [7, 11, 1, 4]],
  },
  {
    id: 'es-5', theme: 'food', title: 'Au restaurant',
    goal: 'Commander un repas et dire ce qu\'on aime (querer, gustar)',
    tip: { title: 'Gustar : l\'objet est le sujet', body: '« Me gusta el pan » = « le pain me plaît ». Avec un pluriel, le verbe suit : « Me gustan los huevos ». Pour commander, on dit « Quiero… » (je veux) ou plus poli « Quería… » (je voudrais).' },
    phrases: [
      'el agua|l\'eau|img:water', 'el pan|le pain|img:bread', 'el café|le café|img:coffee', 'el té|le thé|img:tea',
      'el pescado|le poisson|img:fish', 'los huevos|les œufs|img:eggs', 'la leche|le lait|img:milk', 'el zumo|le jus|img:juice',
      'la manzana|la pomme|img:apple', 'el plátano|la banane|img:banana',
      '¿Qué quieres beber?|Que veux-tu boire ?', 'Quiero un café, por favor|Je voudrais un café, s\'il vous plaît',
      'Me gusta el pescado|J\'aime le poisson', 'Me gustan los huevos|J\'aime les œufs', 'No me gusta la leche|Je n\'aime pas le lait',
      'Tengo hambre|J\'ai faim|🍽️', 'Tengo sed|J\'ai soif|img:drinking', 'La cuenta, por favor|L\'addition, s\'il vous plaît',
    ],
    qa: [[10, 11, 8, 5]],
  },
  {
    id: 'es-6', theme: 'daily_life', title: 'Ma journée',
    goal: 'Décrire sa routine et donner l\'heure',
    tip: { title: 'Verbes pronominaux et heure', body: 'Beaucoup de verbes de routine sont pronominaux : me levanto (je me lève), me acuesto (je me couche). L\'heure : « Es la una » (une heure, singulier) mais « Son las tres » (trois heures, pluriel).' },
    phrases: [
      'Me levanto a las siete|Je me lève à sept heures|⏰', 'Desayuno a las ocho|Je prends le petit-déjeuner à huit heures|🍳',
      'Trabajo en una oficina|Je travaille dans un bureau|💼', 'Como a las dos|Je déjeune à quatorze heures',
      'Vuelvo a casa|Je rentre à la maison|img:house', 'Ceno con mi familia|Je dîne avec ma famille',
      'Me acuesto a las once|Je me couche à onze heures|😴', '¿Qué hora es?|Quelle heure est-il ?|img:clock',
      'Son las tres|Il est trois heures', 'Es la una|Il est une heure', '¿A qué hora te levantas?|À quelle heure te lèves-tu ?',
      'hoy|aujourd\'hui', 'mañana|demain', 'ahora|maintenant',
    ],
    qa: [[7, 8, 11, 12], [10, 0, 5, 2]],
  },
  {
    id: 'es-7', theme: 'daily_life', title: 'Faire des achats',
    goal: 'Demander un prix et acheter un article',
    phrases: [
      '¿Cuánto cuesta?|Combien ça coûte ?|img:money', 'Cuesta cinco euros|Ça coûte cinq euros', 'Quiero esto|Je veux ça',
      '¿Tiene pan?|Avez-vous du pain ?|img:bread', 'Es muy caro|C\'est très cher', 'Es barato|C\'est bon marché',
      'la tienda|le magasin|🏪', 'el dinero|l\'argent|img:money', 'la bolsa|le sac|🛍️', 'Aquí tiene|Voici (tenez)',
      '¿Algo más?|Autre chose ?', 'Nada más, gracias|Rien d\'autre, merci', '¿Puedo pagar con tarjeta?|Puis-je payer par carte ?|💳',
    ],
    qa: [[0, 1, 6, 8], [10, 11, 6, 7]],
  },
];
