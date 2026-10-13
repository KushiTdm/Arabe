import type { ConvSpec } from '../conversations';

// ─── EN — conversations guidées (générées depuis la table de phrases communes) ───
// À faire relire par un locuteur natif.

export const EN_CONVERSATIONS: ConvSpec[] = [
  {
    id: 'en-C1', title: 'Rencontre', scene: 'handshake', npcRole: 'une personne que tu rencontres',
    situation: 'Tu rencontres quelqu\'un pour la première fois. Salue, présente-toi, réponds à ses questions.',
    key: ['Good morning|Bonjour (le matin)', 'My name is Anna|Je m\'appelle Anna', 'I\'m from France|Je viens de France', 'Nice to meet you|Enchanté(e)'],
    turns: [
      { npc: 'Good morning|Bonjour (le matin)', ok: 'Good morning|Bonjour (le matin)', bad: ['Good night|Bonne nuit', 'Goodbye|Au revoir'] },
      { npc: 'What\'s your name?|Comment t\'appelles-tu ?', ok: 'My name is Anna|Je m\'appelle Anna', bad: ['I\'m fine, thank you|Je vais bien, merci', 'I\'m from France|Je viens de France'] },
      { npc: 'Where are you from?|D\'où viens-tu ?', ok: 'I\'m from France|Je viens de France', bad: ['My name is Anna|Je m\'appelle Anna', 'Thank you|Merci'] },
      { npc: 'Nice to meet you|Enchanté(e)', ok: 'Nice to meet you|Enchanté(e)', bad: ['I don\'t understand|Je ne comprends pas', 'You\'re welcome|De rien'] },
      { npc: 'How are you?|Comment vas-tu ?', ok: 'I\'m fine, thank you|Je vais bien, merci', bad: ['Good morning|Bonjour (le matin)', 'Where is the hospital?|Où est l\'hôpital ?'] },
      { npc: 'Goodbye|Au revoir', ok: 'See you soon|À bientôt', bad: ['Good morning|Bonjour (le matin)', 'Yes|Oui'] },
    ],
  },
  {
    id: 'en-C2', title: 'Au café', scene: 'coffee', npcRole: 'le serveur',
    situation: 'Tu entres dans un café. Commande une boisson, réponds au serveur, paie.',
    key: ['coffee|café|img:coffee', 'tea|thé|img:tea', 'water|eau|img:water', 'juice|jus|img:juice'],
    turns: [
      { npc: 'Hello, what would you like?|Bonjour, que veux-tu ?', ok: 'I\'d like a coffee, please|Je voudrais un café, s\'il vous plaît|img:coffee', bad: ['Where is the hospital?|Où est l\'hôpital ?', 'Goodbye|Au revoir'] },
      { npc: 'Anything else?|Autre chose ?', ok: 'No, thank you|Non, merci', bad: ['My name is Anna|Je m\'appelle Anna', 'See you soon|À bientôt'] },
      { npc: 'That\'s three pounds|Ça fait trois euros|img:money', ok: 'Here you are|Voilà', bad: ['How much is it?|Combien ça coûte ?', 'I like coffee|J\'aime le café'] },
      { npc: 'Thank you|Merci', ok: 'You\'re welcome|De rien', bad: ['I don\'t understand|Je ne comprends pas', 'Yes|Oui'] },
    ],
  },
  {
    id: 'en-C3', title: 'Au marché', scene: 'market', npcRole: 'le vendeur',
    situation: 'Tu fais tes courses au marché. Demande ce que tu veux, le prix, et paie.',
    key: ['bread|pain|img:bread', 'eggs|œufs|img:eggs', 'fish|poisson|img:fish', 'money|argent|img:money'],
    turns: [
      { npc: 'Hello, what can I get you?|Bonjour, que désirez-vous ?', ok: 'I\'d like some bread|Je veux du pain|img:bread', bad: ['Goodbye|Au revoir', 'Where is the hospital?|Où est l\'hôpital ?'] },
      { npc: 'How many would you like?|Combien en voulez-vous ?', ok: 'Two, please|Deux, s\'il vous plaît', bad: ['Good morning|Bonjour (le matin)', 'Good night|Bonne nuit'] },
      { npc: 'Here you are|Voilà', ok: 'How much is it?|Combien ça coûte ?', bad: ['I don\'t understand|Je ne comprends pas', 'My name is Anna|Je m\'appelle Anna'] },
      { npc: 'That\'s five pounds|Ça fait cinq euros|img:money', ok: 'Here you are|Voilà', bad: ['Two, please|Deux, s\'il vous plaît', 'Yes|Oui'] },
      { npc: 'Thank you, goodbye|Merci, au revoir', ok: 'Goodbye|Au revoir', bad: ['Good morning|Bonjour (le matin)', 'Good night|Bonne nuit'] },
    ],
  },
  {
    id: 'en-C4', title: 'Demander son chemin', scene: 'street', npcRole: 'un passant',
    situation: 'Tu cherches l\'hôpital. Demande ton chemin et comprends la réponse.',
    key: ['hospital|hôpital|img:hospital', 'street|rue|img:street', 'school|école|img:school', 'market|marché|img:market'],
    turns: [
      { npc: 'Do you need help?|Avez-vous besoin d\'aide ?', ok: 'Yes, where is the hospital?|Oui, où est l\'hôpital ?|img:hospital', bad: ['Goodbye|Au revoir', 'My name is Anna|Je m\'appelle Anna'] },
      { npc: 'Straight ahead, then left|Tout droit puis à gauche', ok: 'Is it far?|Est-ce loin ?', bad: ['I\'m from France|Je viens de France', 'I\'d like some bread|Je veux du pain|img:bread'] },
      { npc: 'No, it\'s near|Non, c\'est près', ok: 'Thank you|Merci', bad: ['I don\'t understand|Je ne comprends pas', 'Two, please|Deux, s\'il vous plaît'] },
      { npc: 'You\'re welcome|De rien', ok: 'Goodbye|Au revoir', bad: ['I\'d like a coffee, please|Je voudrais un café, s\'il vous plaît|img:coffee', 'Good morning|Bonjour (le matin)'] },
    ],
  },
  {
    id: 'en-C5', title: 'Ma famille', scene: '👨‍👩‍👧', npcRole: 'un ami',
    situation: 'Un ami regarde tes photos de famille. Dis qui est sur chaque photo.',
    key: ['father|père|img:father', 'mother|mère|img:mother', 'brother|frère|img:brother', 'sister|sœur|img:sister'],
    turns: [
      { npc: 'Who is this?|Qui est-ce ?', img: 'father', ok: 'This is my father|C\'est mon père', bad: ['This is my brother|C\'est mon frère', 'This is my mother|C\'est ma mère'] },
      { npc: 'Who is this?|Qui est-ce ?', img: 'mother', ok: 'This is my mother|C\'est ma mère', bad: ['This is my sister|C\'est ma sœur', 'This is my father|C\'est mon père'] },
      { npc: 'Who is this?|Qui est-ce ?', img: 'sister', ok: 'This is my sister|C\'est ma sœur', bad: ['This is my mother|C\'est ma mère', 'This is my brother|C\'est mon frère'] },
      { npc: 'Who is this?|Qui est-ce ?', img: 'brother', ok: 'This is my brother|C\'est mon frère', bad: ['This is my father|C\'est mon père', 'This is my sister|C\'est ma sœur'] },
      { npc: 'Do you have brothers or sisters?|As-tu des frères et sœurs ?', ok: 'I have a brother and a sister|J\'ai un frère et une sœur', bad: ['I am a student|Je suis étudiant', 'I want water|Je veux de l\'eau'] },
    ],
  },
  {
    id: 'en-C6', level: 'intermediate', title: 'Au restaurant', scene: 'fish', npcRole: 'le serveur',
    situation: 'Tu dînes au restaurant. Commande un plat et une boisson, donne ton avis, demande l\'addition.',
    key: ['fish|poisson|img:fish', 'juice|jus|img:juice', 'delicious|délicieux', 'the bill|l\'addition|img:money'],
    turns: [
      { npc: 'Welcome|Bienvenue', ok: 'Hello|Bonjour', bad: ['The bill, please|L\'addition, s\'il vous plaît', 'Goodbye|Au revoir'] },
      { npc: 'What would you like to eat?|Que veux-tu manger ?', ok: 'I would like some fish|Je voudrais du poisson|img:fish', bad: ['I am a student|Je suis étudiant', 'Tomorrow|Demain'] },
      { npc: 'And what would you like to drink?|Et que veux-tu boire ?', ok: 'I prefer juice|Je préfère le jus|img:juice', bad: ['My name is Anna|Je m\'appelle Anna', 'I lost my bag|J\'ai perdu mon sac'] },
      { npc: 'Is it good?|Est-ce que c\'est bon ?', ok: 'Yes, it is very good|Oui, c\'est très bon', bad: ['I don\'t understand|Je ne comprends pas', 'on the right|à droite'] },
      { npc: 'Anything else?|Autre chose ?', ok: 'No, the bill, please|Non, l\'addition, s\'il vous plaît', bad: ['I like coffee|J\'aime le café', 'Where is the toilet?|Où sont les toilettes ?'] },
    ],
  },
  {
    id: 'en-C7', level: 'intermediate', title: 'À l\'université', scene: 'university', npcRole: 'le professeur',
    situation: 'C\'est ton premier jour à l\'université. Réponds à ton professeur et demande où est la bibliothèque.',
    key: ['professor|professeur|img:teacher', 'student|étudiant|img:student', 'library|bibliothèque|img:library', 'university|université|img:university'],
    turns: [
      { npc: 'Good morning|Bonjour (le matin)', ok: 'Hello|Bonjour', bad: ['Good evening|Bonsoir', 'You\'re welcome|De rien'] },
      { npc: 'Are you a new student?|Es-tu un nouvel étudiant ?', ok: 'Yes, I am a new student|Oui, je suis un nouvel étudiant|img:student', bad: ['I don\'t understand|Je ne comprends pas', 'How much is it?|Combien ça coûte ?'] },
      { npc: 'What do you study?|Qu\'étudies-tu ?', ok: 'I study languages|J\'étudie les langues', bad: ['I\'m from France|Je viens de France', 'I\'d like some bread|Je veux du pain|img:bread'] },
      { npc: 'Do you have a question?|As-tu une question ?', ok: 'Yes, where is the library?|Oui, où est la bibliothèque ?|img:library', bad: ['Thank you|Merci', 'Tomorrow|Demain'] },
      { npc: 'The library is close, straight ahead|La bibliothèque est près, tout droit', ok: 'Thank you, professor|Merci, professeur', bad: ['I apologise for this mistake|Je m\'excuse pour cette erreur', 'Hello|Bonjour'] },
    ],
  },
  {
    id: 'en-C8', level: 'intermediate', title: 'Chez le médecin', scene: 'hospital', npcRole: 'le médecin',
    situation: 'Tu ne te sens pas bien. Explique ce que tu as et écoute les conseils du médecin.',
    key: ['doctor|médecin|img:doctor', 'head|tête|img:head', 'water|eau|img:water', 'Since yesterday|Depuis hier'],
    turns: [
      { npc: 'Hello, what is the problem?|Bonjour, quel est le problème ?', ok: 'I am sick|Je suis malade', bad: ['I am a student|Je suis étudiant', 'I\'d like a coffee, please|Je voudrais un café, s\'il vous plaît|img:coffee'] },
      { npc: 'Where does it hurt?|Où as-tu mal ?', ok: 'I have a headache|J\'ai mal à la tête|img:head', bad: ['I\'m from France|Je viens de France', 'on the left|à gauche'] },
      { npc: 'Since when?|Depuis quand ?', ok: 'Since yesterday|Depuis hier', bad: ['Tomorrow|Demain', 'Yes|Oui'] },
      { npc: 'I will give you some medicine|Je vais te donner un médicament', ok: 'Thank you, doctor|Merci, docteur', bad: ['Goodbye|Au revoir', 'Where is the airport?|Où est l\'aéroport ?'] },
      { npc: 'Drink plenty of water|Bois beaucoup d\'eau|img:water', ok: 'All right|D\'accord', bad: ['I lost my bag|J\'ai perdu mon sac', 'How much is it?|Combien ça coûte ?'] },
    ],
  },
  {
    id: 'en-C9', level: 'intermediate', title: 'Inviter un ami', scene: 'sunset', npcRole: 'un ami',
    situation: 'Un ami te propose de sortir. Accepte, fixe l\'heure et le lieu.',
    key: ['tomorrow|demain', 'the café|le café|img:coffee', 'five o\'clock|cinq heures|img:clock', 'See you soon|À bientôt'],
    turns: [
      { npc: 'Good evening|Bonsoir', ok: 'Good evening|Bonsoir', bad: ['Good morning|Bonjour (le matin)', 'You\'re welcome|De rien'] },
      { npc: 'Do you want to go out tomorrow?|Veux-tu qu\'on sorte demain ?', ok: 'Yes, with pleasure|Oui, avec plaisir', bad: ['I don\'t understand|Je ne comprends pas', 'I am sick|Je suis malade'] },
      { npc: 'Where shall we meet?|Où se retrouve-t-on ?', ok: 'At the café|Au café|img:coffee', bad: ['I am a student|Je suis étudiant', 'My name is Anna|Je m\'appelle Anna'] },
      { npc: 'At what time?|À quelle heure ?', ok: 'At five o\'clock|À cinq heures|img:clock', bad: ['on the right|à droite', 'I want tea|Je veux du thé'] },
      { npc: 'It\'s a deal|C\'est entendu', ok: 'See you soon|À bientôt', bad: ['Hello|Bonjour', 'How much is it?|Combien ça coûte ?'] },
    ],
  },
  {
    id: 'en-C10', level: 'advanced', title: 'Donner son avis sur une ville', scene: 'city', npcRole: 'un ami',
    situation: 'Un ami te demande ce que tu penses de sa ville. Donne ton avis et justifie-le.',
    key: ['city|ville|img:city', 'beautiful|beau', 'because|parce que', 'but|mais'],
    turns: [
      { npc: 'What do you think of this city?|Que penses-tu de cette ville ?', ok: 'I think the city is beautiful|Je pense que la ville est belle|img:city', bad: ['I\'m from France|Je viens de France', 'Goodbye|Au revoir'] },
      { npc: 'Why?|Pourquoi ?', ok: 'Because it is clean and quiet|Parce qu\'elle est propre et calme', bad: ['Tomorrow|Demain', 'My name is Anna|Je m\'appelle Anna'] },
      { npc: 'But it is expensive|Mais elle est chère', ok: 'I agree, but I like it|Je suis d\'accord, mais je l\'aime', bad: ['I don\'t understand|Je ne comprends pas', 'Thank you|Merci'] },
      { npc: 'Will you visit it again?|La visiteras-tu encore ?', ok: 'Yes, I will visit it again|Oui, je la visiterai encore', bad: ['I am sick|Je suis malade', 'on the left|à gauche'] },
    ],
  },
  {
    id: 'en-C11', level: 'advanced', title: 'Une réclamation', scene: 'money', npcRole: 'l\'employé',
    situation: 'Ton appareil ne marche pas. Explique le problème et demande une réparation ou un dédommagement.',
    key: ['problem|problème', 'device|l\'appareil', 'compensation|dédommagement', 'manager|directeur'],
    turns: [
      { npc: 'How can I help you?|Comment puis-je t\'aider ?', ok: 'I have a problem|J\'ai un problème', bad: ['Hello|Bonjour', 'I am a student|Je suis étudiant'] },
      { npc: 'What is the problem?|Quel est le problème ?', ok: 'The device does not work|L\'appareil ne fonctionne pas', bad: ['My name is Anna|Je m\'appelle Anna', 'I\'d like a coffee, please|Je voudrais un café, s\'il vous plaît|img:coffee'] },
      { npc: 'Since when?|Depuis quand ?', ok: 'Since yesterday|Depuis hier', bad: ['Yes|Oui', 'on the right|à droite'] },
      { npc: 'I apologise for this mistake|Je m\'excuse pour cette erreur', ok: 'Please repair it|Je vous prie de le réparer', bad: ['Goodbye|Au revoir', 'I don\'t understand|Je ne comprends pas'] },
      { npc: 'I will repair it tomorrow|Je le réparerai demain', ok: 'Thank you|Merci à vous', bad: ['Where is the toilet?|Où sont les toilettes ?', 'I am sick|Je suis malade'] },
    ],
  },
  {
    id: 'en-C12', level: 'advanced', title: 'Un exposé en classe', scene: 'teacher', npcRole: 'le professeur',
    situation: 'Tu présentes un court exposé. Ouvre, argumente, conclus et remercie.',
    key: ['topic|sujet', 'for example|par exemple', 'to conclude|pour conclure', 'question|question'],
    turns: [
      { npc: 'Please, go ahead|Je vous en prie, commencez', ok: 'My topic is language learning|Mon sujet est l\'apprentissage des langues', bad: ['Thank you for your attention|Merci de votre attention', 'Goodbye|Au revoir'] },
      { npc: 'Why this topic?|Pourquoi ce sujet ?', ok: 'Because it is important|Parce qu\'il est important', bad: ['I\'d like some bread|Je veux du pain|img:bread', 'Tomorrow|Demain'] },
      { npc: 'Do you have an example?|As-tu un exemple ?', ok: 'Yes, for example travel|Oui, par exemple les voyages', bad: ['I don\'t understand|Je ne comprends pas', 'on the right|à droite'] },
      { npc: 'And to conclude?|Et pour conclure ?', ok: 'In conclusion, I learn every day|Pour conclure, j\'apprends chaque jour', bad: ['I am sick|Je suis malade', 'Hello|Bonjour'] },
      { npc: 'Well done, good job|Bravo, bon travail', ok: 'Thank you for your attention|Merci de votre attention', bad: ['I have a brother and a sister|J\'ai un frère et une sœur', 'How much is it?|Combien ça coûte ?'] },
    ],
  },
  {
    id: 'en-C13', title: 'À la gare', scene: 'station', npcRole: 'l\'employé du guichet',
    situation: 'Tu achètes un billet de train à la gare. Dis où tu vas, demande un billet et paie.',
    key: ['the station|la gare|img:station', 'the ticket|le billet|img:ticket', 'the train|le train|img:train', 'the suitcase|la valise|img:suitcase'],
    turns: [
      { npc: 'Hello, where are you going?|Bonjour, où allez-vous ?', ok: 'I am going downtown|Je vais en ville', bad: ['I am a student|Je suis étudiant', 'Thank you|Merci'] },
      { npc: 'One ticket or two?|Un billet ou deux ?', img: 'ticket', ok: 'One ticket, please|Un billet, s\'il vous plaît|img:ticket', bad: ['I want water|Je veux de l\'eau', 'My name is Anna|Je m\'appelle Anna'] },
      { npc: 'That is twenty euros|Ça fait vingt euros', ok: 'Here you are|Voilà', bad: ['How much is it?|Combien ça coûte ?', 'I like coffee|J\'aime le café'] },
      { npc: 'The train leaves at five o\'clock|Le train part à cinq heures', ok: 'All right, thank you|D\'accord, merci', bad: ['I lost my bag|J\'ai perdu mon sac', 'I am sick|Je suis malade'] },
      { npc: 'Have a good trip!|Bon voyage !', ok: 'Thank you, goodbye|Merci, au revoir', bad: ['Hello|Bonjour', 'I don\'t understand|Je ne comprends pas'] },
    ],
  },
  {
    id: 'en-C14', level: 'intermediate', title: 'À l\'hôtel', scene: 'hotel', npcRole: 'le réceptionniste',
    situation: 'Tu arrives à l\'hôtel. Annonce ta réservation, donne ton nom, écoute les consignes.',
    key: ['the hotel|l\'hôtel|img:hotel', 'the room|la chambre|img:bed', 'the key|la clé|img:key', 'breakfast|le petit-déjeuner'],
    turns: [
      { npc: 'Hello, welcome to the hotel|Bonjour, bienvenue à l\'hôtel', ok: 'Hello, I have a reservation|Bonjour, j\'ai une réservation', bad: ['The bill, please|L\'addition, s\'il vous plaît', 'I want tea|Je veux du thé'] },
      { npc: 'What is your name?|Quel est votre nom ?', ok: 'My name is Anna|Je m\'appelle Anna', bad: ['I\'m from France|Je viens de France', 'Thank you|Merci'] },
      { npc: 'Here is the key to your room|Voici la clé de votre chambre|img:key', img: 'key', ok: 'Thank you|Merci', bad: ['Goodbye|Au revoir', 'I am sick|Je suis malade'] },
      { npc: 'Breakfast is at eight o\'clock|Le petit-déjeuner est à huit heures', ok: 'Perfect, thank you|C\'est parfait, merci', bad: ['I lost my bag|J\'ai perdu mon sac', 'on the left|à gauche'] },
      { npc: 'Do you need anything else?|Avez-vous besoin d\'autre chose ?', ok: 'No, thank you, good night|Non, merci, bonne nuit', bad: ['My name is Anna|Je m\'appelle Anna', 'I\'m from France|Je viens de France'] },
    ],
  },
  {
    id: 'en-C15', level: 'intermediate', title: 'Au téléphone', scene: 'phone', npcRole: 'un ami',
    situation: 'Un ami t\'appelle. Réponds, donne des nouvelles et fixe un rendez-vous pour demain.',
    key: ['the phone|le téléphone|img:phone', 'the number|le numéro', 'tomorrow|demain', 'See you soon|À bientôt'],
    turns: [
      { npc: 'Hello?|Allô ?', ok: 'Hello, it\'s Anna|Allô, c\'est Anna', bad: ['Thank you|Merci', 'Yes|Oui'] },
      { npc: 'How are you?|Comment vas-tu ?', ok: 'I\'m fine, thank you|Je vais bien, merci', bad: ['My name is Anna|Je m\'appelle Anna', 'Goodbye|Au revoir'] },
      { npc: 'Are you free tomorrow?|Tu es libre demain ?', ok: 'Yes, I am free|Oui, je suis libre', bad: ['I am sick|Je suis malade', 'I lost my bag|J\'ai perdu mon sac'] },
      { npc: 'I will text you the address|Je t\'envoie l\'adresse par message', ok: 'All right, thank you|D\'accord, merci', bad: ['I am a student|Je suis étudiant', 'I don\'t understand|Je ne comprends pas'] },
      { npc: 'See you tomorrow!|À demain !', ok: 'See you tomorrow!|À demain !', bad: ['Hello|Bonjour', 'I like coffee|J\'aime le café'] },
    ],
  },
  {
    id: 'en-C16', level: 'intermediate', title: 'À l\'aéroport', scene: 'airport', npcRole: 'l\'agent d\'enregistrement',
    situation: 'Tu enregistres ton vol. Montre ton passeport, dis où tu vas et demande ta porte.',
    key: ['the airport|l\'aéroport|img:airport', 'the passport|le passeport', 'the suitcase|la valise|img:suitcase', 'the plane|l\'avion|img:airplane'],
    turns: [
      { npc: 'Your passport, please|Votre passeport, s\'il vous plaît', ok: 'Here is my passport|Voici mon passeport', bad: ['I am a student|Je suis étudiant', 'How much is it?|Combien ça coûte ?'] },
      { npc: 'Hello, where are you going?|Bonjour, où allez-vous ?', ok: 'I am going to France|Je vais en France', bad: ['Thank you|Merci', 'Tomorrow|Demain'] },
      { npc: 'Do you have a suitcase?|Avez-vous une valise ?', img: 'suitcase', ok: 'Yes, I have a suitcase|Oui, j\'ai une valise|img:suitcase', bad: ['I like coffee|J\'aime le café', 'My name is Anna|Je m\'appelle Anna'] },
      { npc: 'The plane leaves at ten o\'clock|L\'avion part à dix heures', ok: 'Thank you, where is the boarding gate?|Merci, où est la porte d\'embarquement ?', bad: ['I lost my bag|J\'ai perdu mon sac', 'I am sick|Je suis malade'] },
      { npc: 'Have a good flight!|Bon vol !', ok: 'Thank you, goodbye|Merci, au revoir', bad: ['Hello|Bonjour', 'I don\'t understand|Je ne comprends pas'] },
    ],
  },
];
