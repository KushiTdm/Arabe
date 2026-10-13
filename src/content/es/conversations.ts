import type { ConvSpec } from '../conversations';

// ─── ES — conversations guidées (générées depuis la table de phrases communes) ───
// À faire relire par un locuteur natif.

export const ES_CONVERSATIONS: ConvSpec[] = [
  {
    id: 'es-C1', title: 'Rencontre', scene: 'handshake', npcRole: 'une personne que tu rencontres',
    situation: 'Tu rencontres quelqu\'un pour la première fois. Salue, présente-toi, réponds à ses questions.',
    key: ['Buenos días|Bonjour (le matin)', 'Me llamo Ana|Je m\'appelle Anna', 'Soy de Francia|Je viens de France', 'Mucho gusto|Enchanté(e)'],
    turns: [
      { npc: 'Buenos días|Bonjour (le matin)', ok: 'Buenos días|Bonjour (le matin)', bad: ['Buenas noches|Bonne nuit', 'Adiós|Au revoir'] },
      { npc: '¿Cómo te llamas?|Comment t\'appelles-tu ?', ok: 'Me llamo Ana|Je m\'appelle Anna', bad: ['Estoy bien, gracias|Je vais bien, merci', 'Soy de Francia|Je viens de France'] },
      { npc: '¿De dónde eres?|D\'où viens-tu ?', ok: 'Soy de Francia|Je viens de France', bad: ['Me llamo Ana|Je m\'appelle Anna', 'Gracias|Merci'] },
      { npc: 'Mucho gusto|Enchanté(e)', ok: 'Mucho gusto|Enchanté(e)', bad: ['No entiendo|Je ne comprends pas', 'De nada|De rien'] },
      { npc: '¿Cómo estás?|Comment vas-tu ?', ok: 'Estoy bien, gracias|Je vais bien, merci', bad: ['Buenos días|Bonjour (le matin)', '¿Dónde está el hospital?|Où est l\'hôpital ?'] },
      { npc: 'Adiós|Au revoir', ok: 'Hasta luego|À bientôt', bad: ['Buenos días|Bonjour (le matin)', 'Sí|Oui'] },
    ],
  },
  {
    id: 'es-C2', title: 'Au café', scene: 'coffee', npcRole: 'le serveur',
    situation: 'Tu entres dans un café. Commande une boisson, réponds au serveur, paie.',
    key: ['el café|café|img:coffee', 'el té|thé|img:tea', 'el agua|eau|img:water', 'el zumo|jus|img:juice'],
    turns: [
      { npc: 'Hola, ¿qué quieres?|Bonjour, que veux-tu ?', ok: 'Quiero un café, por favor|Je voudrais un café, s\'il vous plaît|img:coffee', bad: ['¿Dónde está el hospital?|Où est l\'hôpital ?', 'Adiós|Au revoir'] },
      { npc: '¿Algo más?|Autre chose ?', ok: 'No, gracias|Non, merci', bad: ['Me llamo Ana|Je m\'appelle Anna', 'Hasta luego|À bientôt'] },
      { npc: 'Son tres euros|Ça fait trois euros|img:money', ok: 'Aquí tiene|Voilà', bad: ['¿Cuánto cuesta?|Combien ça coûte ?', 'Me gusta el café|J\'aime le café'] },
      { npc: 'Gracias|Merci', ok: 'De nada|De rien', bad: ['No entiendo|Je ne comprends pas', 'Sí|Oui'] },
    ],
  },
  {
    id: 'es-C3', title: 'Au marché', scene: 'market', npcRole: 'le vendeur',
    situation: 'Tu fais tes courses au marché. Demande ce que tu veux, le prix, et paie.',
    key: ['el pan|pain|img:bread', 'los huevos|œufs|img:eggs', 'el pescado|poisson|img:fish', 'el dinero|argent|img:money'],
    turns: [
      { npc: 'Hola, ¿qué desea?|Bonjour, que désirez-vous ?', ok: 'Quiero pan|Je veux du pain|img:bread', bad: ['Adiós|Au revoir', '¿Dónde está el hospital?|Où est l\'hôpital ?'] },
      { npc: '¿Cuántos quiere?|Combien en voulez-vous ?', ok: 'Dos, por favor|Deux, s\'il vous plaît', bad: ['Buenos días|Bonjour (le matin)', 'Buenas noches|Bonne nuit'] },
      { npc: 'Aquí tiene|Voilà', ok: '¿Cuánto cuesta?|Combien ça coûte ?', bad: ['No entiendo|Je ne comprends pas', 'Me llamo Ana|Je m\'appelle Anna'] },
      { npc: 'Son cinco euros|Ça fait cinq euros|img:money', ok: 'Aquí tiene|Voilà', bad: ['Dos, por favor|Deux, s\'il vous plaît', 'Sí|Oui'] },
      { npc: 'Gracias, adiós|Merci, au revoir', ok: 'Adiós|Au revoir', bad: ['Buenos días|Bonjour (le matin)', 'Buenas noches|Bonne nuit'] },
    ],
  },
  {
    id: 'es-C4', title: 'Demander son chemin', scene: 'street', npcRole: 'un passant',
    situation: 'Tu cherches l\'hôpital. Demande ton chemin et comprends la réponse.',
    key: ['el hospital|hôpital|img:hospital', 'la calle|rue|img:street', 'la escuela|école|img:school', 'el mercado|marché|img:market'],
    turns: [
      { npc: '¿Necesita ayuda?|Avez-vous besoin d\'aide ?', ok: 'Sí, ¿dónde está el hospital?|Oui, où est l\'hôpital ?|img:hospital', bad: ['Adiós|Au revoir', 'Me llamo Ana|Je m\'appelle Anna'] },
      { npc: 'Todo recto y luego a la izquierda|Tout droit puis à gauche', ok: '¿Está lejos?|Est-ce loin ?', bad: ['Soy de Francia|Je viens de France', 'Quiero pan|Je veux du pain|img:bread'] },
      { npc: 'No, está cerca|Non, c\'est près', ok: 'Gracias|Merci', bad: ['No entiendo|Je ne comprends pas', 'Dos, por favor|Deux, s\'il vous plaît'] },
      { npc: 'De nada|De rien', ok: 'Adiós|Au revoir', bad: ['Quiero un café, por favor|Je voudrais un café, s\'il vous plaît|img:coffee', 'Buenos días|Bonjour (le matin)'] },
    ],
  },
  {
    id: 'es-C5', title: 'Ma famille', scene: '👨‍👩‍👧', npcRole: 'un ami',
    situation: 'Un ami regarde tes photos de famille. Dis qui est sur chaque photo.',
    key: ['el padre|père|img:father', 'la madre|mère|img:mother', 'el hermano|frère|img:brother', 'la hermana|sœur|img:sister'],
    turns: [
      { npc: '¿Quién es?|Qui est-ce ?', img: 'father', ok: 'Es mi padre|C\'est mon père', bad: ['Es mi hermano|C\'est mon frère', 'Es mi madre|C\'est ma mère'] },
      { npc: '¿Quién es?|Qui est-ce ?', img: 'mother', ok: 'Es mi madre|C\'est ma mère', bad: ['Es mi hermana|C\'est ma sœur', 'Es mi padre|C\'est mon père'] },
      { npc: '¿Quién es?|Qui est-ce ?', img: 'sister', ok: 'Es mi hermana|C\'est ma sœur', bad: ['Es mi madre|C\'est ma mère', 'Es mi hermano|C\'est mon frère'] },
      { npc: '¿Quién es?|Qui est-ce ?', img: 'brother', ok: 'Es mi hermano|C\'est mon frère', bad: ['Es mi padre|C\'est mon père', 'Es mi hermana|C\'est ma sœur'] },
      { npc: '¿Tienes hermanos?|As-tu des frères et sœurs ?', ok: 'Tengo un hermano y una hermana|J\'ai un frère et une sœur', bad: ['Soy estudiante|Je suis étudiant', 'Quiero agua|Je veux de l\'eau'] },
    ],
  },
  {
    id: 'es-C6', level: 'intermediate', title: 'Au restaurant', scene: 'fish', npcRole: 'le serveur',
    situation: 'Tu dînes au restaurant. Commande un plat et une boisson, donne ton avis, demande l\'addition.',
    key: ['el pescado|poisson|img:fish', 'el zumo|jus|img:juice', 'delicioso|délicieux', 'la cuenta|l\'addition|img:money'],
    turns: [
      { npc: 'Bienvenido|Bienvenue', ok: 'Hola|Bonjour', bad: ['La cuenta, por favor|L\'addition, s\'il vous plaît', 'Adiós|Au revoir'] },
      { npc: '¿Qué quieres comer?|Que veux-tu manger ?', ok: 'Quiero pescado|Je voudrais du poisson|img:fish', bad: ['Soy estudiante|Je suis étudiant', 'Mañana|Demain'] },
      { npc: '¿Y qué quieres beber?|Et que veux-tu boire ?', ok: 'Prefiero el zumo|Je préfère le jus|img:juice', bad: ['Me llamo Ana|Je m\'appelle Anna', 'He perdido mi bolso|J\'ai perdu mon sac'] },
      { npc: '¿Está rico?|Est-ce que c\'est bon ?', ok: 'Sí, está muy rico|Oui, c\'est très bon', bad: ['No entiendo|Je ne comprends pas', 'a la derecha|à droite'] },
      { npc: '¿Algo más?|Autre chose ?', ok: 'No, la cuenta, por favor|Non, l\'addition, s\'il vous plaît', bad: ['Me gusta el café|J\'aime le café', '¿Dónde están los baños?|Où sont les toilettes ?'] },
    ],
  },
  {
    id: 'es-C7', level: 'intermediate', title: 'À l\'université', scene: 'university', npcRole: 'le professeur',
    situation: 'C\'est ton premier jour à l\'université. Réponds à ton professeur et demande où est la bibliothèque.',
    key: ['el profesor|professeur|img:teacher', 'el estudiante|étudiant|img:student', 'la biblioteca|bibliothèque|img:library', 'la universidad|université|img:university'],
    turns: [
      { npc: 'Buenos días|Bonjour (le matin)', ok: 'Hola|Bonjour', bad: ['Buenas noches|Bonsoir', 'De nada|De rien'] },
      { npc: '¿Eres un estudiante nuevo?|Es-tu un nouvel étudiant ?', ok: 'Sí, soy un estudiante nuevo|Oui, je suis un nouvel étudiant|img:student', bad: ['No entiendo|Je ne comprends pas', '¿Cuánto cuesta?|Combien ça coûte ?'] },
      { npc: '¿Qué estudias?|Qu\'étudies-tu ?', ok: 'Estudio idiomas|J\'étudie les langues', bad: ['Soy de Francia|Je viens de France', 'Quiero pan|Je veux du pain|img:bread'] },
      { npc: '¿Tienes alguna pregunta?|As-tu une question ?', ok: 'Sí, ¿dónde está la biblioteca?|Oui, où est la bibliothèque ?|img:library', bad: ['Gracias|Merci', 'Mañana|Demain'] },
      { npc: 'La biblioteca está cerca, todo recto|La bibliothèque est près, tout droit', ok: 'Gracias, profesor|Merci, professeur', bad: ['Perdón por este error|Je m\'excuse pour cette erreur', 'Hola|Bonjour'] },
    ],
  },
  {
    id: 'es-C8', level: 'intermediate', title: 'Chez le médecin', scene: 'hospital', npcRole: 'le médecin',
    situation: 'Tu ne te sens pas bien. Explique ce que tu as et écoute les conseils du médecin.',
    key: ['el médico|médecin|img:doctor', 'la cabeza|tête|img:head', 'el agua|eau|img:water', 'Desde ayer|Depuis hier'],
    turns: [
      { npc: 'Buenos días, ¿cuál es el problema?|Bonjour, quel est le problème ?', ok: 'Estoy enfermo|Je suis malade', bad: ['Soy estudiante|Je suis étudiant', 'Quiero un café, por favor|Je voudrais un café, s\'il vous plaît|img:coffee'] },
      { npc: '¿Dónde te duele?|Où as-tu mal ?', ok: 'Me duele la cabeza|J\'ai mal à la tête|img:head', bad: ['Soy de Francia|Je viens de France', 'a la izquierda|à gauche'] },
      { npc: '¿Desde cuándo?|Depuis quand ?', ok: 'Desde ayer|Depuis hier', bad: ['Mañana|Demain', 'Sí|Oui'] },
      { npc: 'Te voy a dar una medicina|Je vais te donner un médicament', ok: 'Gracias, doctor|Merci, docteur', bad: ['Adiós|Au revoir', '¿Dónde está el aeropuerto?|Où est l\'aéroport ?'] },
      { npc: 'Bebe mucha agua|Bois beaucoup d\'eau|img:water', ok: 'De acuerdo|D\'accord', bad: ['He perdido mi bolso|J\'ai perdu mon sac', '¿Cuánto cuesta?|Combien ça coûte ?'] },
    ],
  },
  {
    id: 'es-C9', level: 'intermediate', title: 'Inviter un ami', scene: 'sunset', npcRole: 'un ami',
    situation: 'Un ami te propose de sortir. Accepte, fixe l\'heure et le lieu.',
    key: ['mañana|demain', 'el café|le café|img:coffee', 'las cinco|cinq heures|img:clock', 'Hasta luego|À bientôt'],
    turns: [
      { npc: 'Buenas noches|Bonsoir', ok: 'Buenas noches|Bonsoir', bad: ['Buenos días|Bonjour (le matin)', 'De nada|De rien'] },
      { npc: '¿Quieres salir mañana?|Veux-tu qu\'on sorte demain ?', ok: 'Sí, con mucho gusto|Oui, avec plaisir', bad: ['No entiendo|Je ne comprends pas', 'Estoy enfermo|Je suis malade'] },
      { npc: '¿Dónde quedamos?|Où se retrouve-t-on ?', ok: 'En el café|Au café|img:coffee', bad: ['Soy estudiante|Je suis étudiant', 'Me llamo Ana|Je m\'appelle Anna'] },
      { npc: '¿A qué hora?|À quelle heure ?', ok: 'A las cinco|À cinq heures|img:clock', bad: ['a la derecha|à droite', 'Quiero té|Je veux du thé'] },
      { npc: 'Quedamos así|C\'est entendu', ok: 'Hasta luego|À bientôt', bad: ['Hola|Bonjour', '¿Cuánto cuesta?|Combien ça coûte ?'] },
    ],
  },
  {
    id: 'es-C10', level: 'advanced', title: 'Donner son avis sur une ville', scene: 'city', npcRole: 'un ami',
    situation: 'Un ami te demande ce que tu penses de sa ville. Donne ton avis et justifie-le.',
    key: ['la ciudad|ville|img:city', 'bonito|beau', 'porque|parce que', 'pero|mais'],
    turns: [
      { npc: '¿Qué piensas de esta ciudad?|Que penses-tu de cette ville ?', ok: 'Creo que la ciudad es bonita|Je pense que la ville est belle|img:city', bad: ['Soy de Francia|Je viens de France', 'Adiós|Au revoir'] },
      { npc: '¿Por qué?|Pourquoi ?', ok: 'Porque es limpia y tranquila|Parce qu\'elle est propre et calme', bad: ['Mañana|Demain', 'Me llamo Ana|Je m\'appelle Anna'] },
      { npc: 'Pero es cara|Mais elle est chère', ok: 'Estoy de acuerdo, pero me gusta|Je suis d\'accord, mais je l\'aime', bad: ['No entiendo|Je ne comprends pas', 'Gracias|Merci'] },
      { npc: '¿La visitarás otra vez?|La visiteras-tu encore ?', ok: 'Sí, la visitaré otra vez|Oui, je la visiterai encore', bad: ['Estoy enfermo|Je suis malade', 'a la izquierda|à gauche'] },
    ],
  },
  {
    id: 'es-C11', level: 'advanced', title: 'Une réclamation', scene: 'money', npcRole: 'l\'employé',
    situation: 'Ton appareil ne marche pas. Explique le problème et demande une réparation ou un dédommagement.',
    key: ['el problema|problème', 'el aparato|l\'appareil', 'la indemnización|dédommagement', 'el director|directeur'],
    turns: [
      { npc: '¿En qué puedo ayudarle?|Comment puis-je t\'aider ?', ok: 'Tengo un problema|J\'ai un problème', bad: ['Hola|Bonjour', 'Soy estudiante|Je suis étudiant'] },
      { npc: '¿Cuál es el problema?|Quel est le problème ?', ok: 'El aparato no funciona|L\'appareil ne fonctionne pas', bad: ['Me llamo Ana|Je m\'appelle Anna', 'Quiero un café, por favor|Je voudrais un café, s\'il vous plaît|img:coffee'] },
      { npc: '¿Desde cuándo?|Depuis quand ?', ok: 'Desde ayer|Depuis hier', bad: ['Sí|Oui', 'a la derecha|à droite'] },
      { npc: 'Perdón por este error|Je m\'excuse pour cette erreur', ok: 'Le ruego que lo repare|Je vous prie de le réparer', bad: ['Adiós|Au revoir', 'No entiendo|Je ne comprends pas'] },
      { npc: 'Lo repararé mañana|Je le réparerai demain', ok: 'Gracias a usted|Merci à vous', bad: ['¿Dónde están los baños?|Où sont les toilettes ?', 'Estoy enfermo|Je suis malade'] },
    ],
  },
  {
    id: 'es-C12', level: 'advanced', title: 'Un exposé en classe', scene: 'teacher', npcRole: 'le professeur',
    situation: 'Tu présentes un court exposé. Ouvre, argumente, conclus et remercie.',
    key: ['el tema|sujet', 'por ejemplo|par exemple', 'para concluir|pour conclure', 'la pregunta|question'],
    turns: [
      { npc: 'Adelante, empiece|Je vous en prie, commencez', ok: 'Mi tema es el aprendizaje de idiomas|Mon sujet est l\'apprentissage des langues', bad: ['Gracias por su atención|Merci de votre attention', 'Adiós|Au revoir'] },
      { npc: '¿Por qué este tema?|Pourquoi ce sujet ?', ok: 'Porque es importante|Parce qu\'il est important', bad: ['Quiero pan|Je veux du pain|img:bread', 'Mañana|Demain'] },
      { npc: '¿Tienes un ejemplo?|As-tu un exemple ?', ok: 'Sí, por ejemplo los viajes|Oui, par exemple les voyages', bad: ['No entiendo|Je ne comprends pas', 'a la derecha|à droite'] },
      { npc: '¿Y para concluir?|Et pour conclure ?', ok: 'Para concluir, aprendo todos los días|Pour conclure, j\'apprends chaque jour', bad: ['Estoy enfermo|Je suis malade', 'Hola|Bonjour'] },
      { npc: 'Bravo, buen trabajo|Bravo, bon travail', ok: 'Gracias por su atención|Merci de votre attention', bad: ['Tengo un hermano y una hermana|J\'ai un frère et une sœur', '¿Cuánto cuesta?|Combien ça coûte ?'] },
    ],
  },
  {
    id: 'es-C13', title: 'À la gare', scene: 'station', npcRole: 'l\'employé du guichet',
    situation: 'Tu achètes un billet de train à la gare. Dis où tu vas, demande un billet et paie.',
    key: ['la estación|la gare|img:station', 'el billete|le billet|img:ticket', 'el tren|le train|img:train', 'la maleta|la valise|img:suitcase'],
    turns: [
      { npc: 'Buenos días, ¿adónde va?|Bonjour, où allez-vous ?', ok: 'Voy al centro|Je vais en ville', bad: ['Soy estudiante|Je suis étudiant', 'Gracias|Merci'] },
      { npc: '¿Un billete o dos?|Un billet ou deux ?', img: 'ticket', ok: 'Un billete, por favor|Un billet, s\'il vous plaît|img:ticket', bad: ['Quiero agua|Je veux de l\'eau', 'Me llamo Ana|Je m\'appelle Anna'] },
      { npc: 'Son veinte euros|Ça fait vingt euros', ok: 'Aquí tiene|Voilà', bad: ['¿Cuánto cuesta?|Combien ça coûte ?', 'Me gusta el café|J\'aime le café'] },
      { npc: 'El tren sale a las cinco|Le train part à cinq heures', ok: 'De acuerdo, gracias|D\'accord, merci', bad: ['He perdido mi bolso|J\'ai perdu mon sac', 'Estoy enfermo|Je suis malade'] },
      { npc: '¡Buen viaje!|Bon voyage !', ok: 'Gracias, adiós|Merci, au revoir', bad: ['Hola|Bonjour', 'No entiendo|Je ne comprends pas'] },
    ],
  },
  {
    id: 'es-C14', level: 'intermediate', title: 'À l\'hôtel', scene: 'hotel', npcRole: 'le réceptionniste',
    situation: 'Tu arrives à l\'hôtel. Annonce ta réservation, donne ton nom, écoute les consignes.',
    key: ['el hotel|l\'hôtel|img:hotel', 'la habitación|la chambre|img:bed', 'la llave|la clé|img:key', 'el desayuno|le petit-déjeuner'],
    turns: [
      { npc: 'Buenas tardes, bienvenido al hotel|Bonjour, bienvenue à l\'hôtel', ok: 'Buenas tardes, tengo una reserva|Bonjour, j\'ai une réservation', bad: ['La cuenta, por favor|L\'addition, s\'il vous plaît', 'Quiero té|Je veux du thé'] },
      { npc: '¿Cuál es su nombre?|Quel est votre nom ?', ok: 'Me llamo Ana|Je m\'appelle Anna', bad: ['Soy de Francia|Je viens de France', 'Gracias|Merci'] },
      { npc: 'Aquí tiene la llave de su habitación|Voici la clé de votre chambre|img:key', img: 'key', ok: 'Gracias|Merci', bad: ['Adiós|Au revoir', 'Estoy enfermo|Je suis malade'] },
      { npc: 'El desayuno es a las ocho|Le petit-déjeuner est à huit heures', ok: 'Perfecto, gracias|C\'est parfait, merci', bad: ['He perdido mi bolso|J\'ai perdu mon sac', 'a la izquierda|à gauche'] },
      { npc: '¿Necesita algo más?|Avez-vous besoin d\'autre chose ?', ok: 'No, gracias, buenas noches|Non, merci, bonne nuit', bad: ['Me llamo Ana|Je m\'appelle Anna', 'Soy de Francia|Je viens de France'] },
    ],
  },
  {
    id: 'es-C15', level: 'intermediate', title: 'Au téléphone', scene: 'phone', npcRole: 'un ami',
    situation: 'Un ami t\'appelle. Réponds, donne des nouvelles et fixe un rendez-vous pour demain.',
    key: ['el teléfono|le téléphone|img:phone', 'el número|le numéro', 'mañana|demain', 'Hasta luego|À bientôt'],
    turns: [
      { npc: '¿Diga?|Allô ?', ok: 'Hola, soy Ana|Allô, c\'est Anna', bad: ['Gracias|Merci', 'Sí|Oui'] },
      { npc: '¿Cómo estás?|Comment vas-tu ?', ok: 'Estoy bien, gracias|Je vais bien, merci', bad: ['Me llamo Ana|Je m\'appelle Anna', 'Adiós|Au revoir'] },
      { npc: '¿Estás libre mañana?|Tu es libre demain ?', ok: 'Sí, estoy libre|Oui, je suis libre', bad: ['Estoy enfermo|Je suis malade', 'He perdido mi bolso|J\'ai perdu mon sac'] },
      { npc: 'Te mando la dirección por mensaje|Je t\'envoie l\'adresse par message', ok: 'De acuerdo, gracias|D\'accord, merci', bad: ['Soy estudiante|Je suis étudiant', 'No entiendo|Je ne comprends pas'] },
      { npc: '¡Hasta mañana!|À demain !', ok: '¡Hasta mañana!|À demain !', bad: ['Hola|Bonjour', 'Me gusta el café|J\'aime le café'] },
    ],
  },
  {
    id: 'es-C16', level: 'intermediate', title: 'À l\'aéroport', scene: 'airport', npcRole: 'l\'agent d\'enregistrement',
    situation: 'Tu enregistres ton vol. Montre ton passeport, dis où tu vas et demande ta porte.',
    key: ['el aeropuerto|l\'aéroport|img:airport', 'el pasaporte|le passeport', 'la maleta|la valise|img:suitcase', 'el avión|l\'avion|img:airplane'],
    turns: [
      { npc: 'Su pasaporte, por favor|Votre passeport, s\'il vous plaît', ok: 'Aquí tiene mi pasaporte|Voici mon passeport', bad: ['Soy estudiante|Je suis étudiant', '¿Cuánto cuesta?|Combien ça coûte ?'] },
      { npc: 'Buenos días, ¿adónde va?|Bonjour, où allez-vous ?', ok: 'Voy a Francia|Je vais en France', bad: ['Gracias|Merci', 'Mañana|Demain'] },
      { npc: '¿Tiene una maleta?|Avez-vous une valise ?', img: 'suitcase', ok: 'Sí, tengo una maleta|Oui, j\'ai une valise|img:suitcase', bad: ['Me gusta el café|J\'aime le café', 'Me llamo Ana|Je m\'appelle Anna'] },
      { npc: 'El avión sale a las diez|L\'avion part à dix heures', ok: 'Gracias, ¿dónde está la puerta de embarque?|Merci, où est la porte d\'embarquement ?', bad: ['He perdido mi bolso|J\'ai perdu mon sac', 'Estoy enfermo|Je suis malade'] },
      { npc: '¡Buen vuelo!|Bon vol !', ok: 'Gracias, adiós|Merci, au revoir', bad: ['Hola|Bonjour', 'No entiendo|Je ne comprends pas'] },
    ],
  },
];
