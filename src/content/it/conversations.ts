import type { ConvSpec } from '../conversations';

// ─── IT — conversations guidées (générées depuis la table de phrases communes) ───
// À faire relire par un locuteur natif.

export const IT_CONVERSATIONS: ConvSpec[] = [
  {
    id: 'it-C1', title: 'Rencontre', scene: 'handshake', npcRole: 'une personne que tu rencontres',
    situation: 'Tu rencontres quelqu\'un pour la première fois. Salue, présente-toi, réponds à ses questions.',
    key: ['Buongiorno|Bonjour (le matin)', 'Mi chiamo Anna|Je m\'appelle Anna', 'Sono francese|Je viens de France', 'Piacere|Enchanté(e)'],
    turns: [
      { npc: 'Buongiorno|Bonjour (le matin)', ok: 'Buongiorno|Bonjour (le matin)', bad: ['Buonanotte|Bonne nuit', 'Arrivederci|Au revoir'] },
      { npc: 'Come ti chiami?|Comment t\'appelles-tu ?', ok: 'Mi chiamo Anna|Je m\'appelle Anna', bad: ['Sto bene, grazie|Je vais bien, merci', 'Sono francese|Je viens de France'] },
      { npc: 'Di dove sei?|D\'où viens-tu ?', ok: 'Sono francese|Je viens de France', bad: ['Mi chiamo Anna|Je m\'appelle Anna', 'Grazie|Merci'] },
      { npc: 'Piacere|Enchanté(e)', ok: 'Piacere|Enchanté(e)', bad: ['Non capisco|Je ne comprends pas', 'Prego|De rien'] },
      { npc: 'Come stai?|Comment vas-tu ?', ok: 'Sto bene, grazie|Je vais bien, merci', bad: ['Buongiorno|Bonjour (le matin)', 'Dov\'è l\'ospedale?|Où est l\'hôpital ?'] },
      { npc: 'Arrivederci|Au revoir', ok: 'A presto|À bientôt', bad: ['Buongiorno|Bonjour (le matin)', 'Sì|Oui'] },
    ],
  },
  {
    id: 'it-C2', title: 'Au café', scene: 'coffee', npcRole: 'le serveur',
    situation: 'Tu entres dans un café. Commande une boisson, réponds au serveur, paie.',
    key: ['il caffè|café|img:coffee', 'il tè|thé|img:tea', 'l\'acqua|eau|img:water', 'il succo|jus|img:juice'],
    turns: [
      { npc: 'Ciao, che cosa vuoi?|Bonjour, que veux-tu ?', ok: 'Vorrei un caffè, per favore|Je voudrais un café, s\'il vous plaît|img:coffee', bad: ['Dov\'è l\'ospedale?|Où est l\'hôpital ?', 'Arrivederci|Au revoir'] },
      { npc: 'Altro?|Autre chose ?', ok: 'No, grazie|Non, merci', bad: ['Mi chiamo Anna|Je m\'appelle Anna', 'A presto|À bientôt'] },
      { npc: 'Sono tre euro|Ça fait trois euros|img:money', ok: 'Ecco a Lei|Voilà', bad: ['Quanto costa?|Combien ça coûte ?', 'Mi piace il caffè|J\'aime le café'] },
      { npc: 'Grazie|Merci', ok: 'Prego|De rien', bad: ['Non capisco|Je ne comprends pas', 'Sì|Oui'] },
    ],
  },
  {
    id: 'it-C3', title: 'Au marché', scene: 'market', npcRole: 'le vendeur',
    situation: 'Tu fais tes courses au marché. Demande ce que tu veux, le prix, et paie.',
    key: ['il pane|pain|img:bread', 'le uova|œufs|img:eggs', 'il pesce|poisson|img:fish', 'i soldi|argent|img:money'],
    turns: [
      { npc: 'Buongiorno, che cosa desidera?|Bonjour, que désirez-vous ?', ok: 'Voglio del pane|Je veux du pain|img:bread', bad: ['Arrivederci|Au revoir', 'Dov\'è l\'ospedale?|Où est l\'hôpital ?'] },
      { npc: 'Quanti ne vuole?|Combien en voulez-vous ?', ok: 'Due, per favore|Deux, s\'il vous plaît', bad: ['Buongiorno|Bonjour (le matin)', 'Buonanotte|Bonne nuit'] },
      { npc: 'Ecco a Lei|Voilà', ok: 'Quanto costa?|Combien ça coûte ?', bad: ['Non capisco|Je ne comprends pas', 'Mi chiamo Anna|Je m\'appelle Anna'] },
      { npc: 'Sono cinque euro|Ça fait cinq euros|img:money', ok: 'Ecco a Lei|Voilà', bad: ['Due, per favore|Deux, s\'il vous plaît', 'Sì|Oui'] },
      { npc: 'Grazie, arrivederci|Merci, au revoir', ok: 'Arrivederci|Au revoir', bad: ['Buongiorno|Bonjour (le matin)', 'Buonanotte|Bonne nuit'] },
    ],
  },
  {
    id: 'it-C4', title: 'Demander son chemin', scene: 'street', npcRole: 'un passant',
    situation: 'Tu cherches l\'hôpital. Demande ton chemin et comprends la réponse.',
    key: ['l\'ospedale|hôpital|img:hospital', 'la strada|rue|img:street', 'la scuola|école|img:school', 'il mercato|marché|img:market'],
    turns: [
      { npc: 'Ha bisogno di aiuto?|Avez-vous besoin d\'aide ?', ok: 'Sì, dov\'è l\'ospedale?|Oui, où est l\'hôpital ?|img:hospital', bad: ['Arrivederci|Au revoir', 'Mi chiamo Anna|Je m\'appelle Anna'] },
      { npc: 'Sempre dritto, poi a sinistra|Tout droit puis à gauche', ok: 'È lontano?|Est-ce loin ?', bad: ['Sono francese|Je viens de France', 'Voglio del pane|Je veux du pain|img:bread'] },
      { npc: 'No, è vicino|Non, c\'est près', ok: 'Grazie|Merci', bad: ['Non capisco|Je ne comprends pas', 'Due, per favore|Deux, s\'il vous plaît'] },
      { npc: 'Prego|De rien', ok: 'Arrivederci|Au revoir', bad: ['Vorrei un caffè, per favore|Je voudrais un café, s\'il vous plaît|img:coffee', 'Buongiorno|Bonjour (le matin)'] },
    ],
  },
  {
    id: 'it-C5', title: 'Ma famille', scene: '👨‍👩‍👧', npcRole: 'un ami',
    situation: 'Un ami regarde tes photos de famille. Dis qui est sur chaque photo.',
    key: ['il padre|père|img:father', 'la madre|mère|img:mother', 'il fratello|frère|img:brother', 'la sorella|sœur|img:sister'],
    turns: [
      { npc: 'Chi è?|Qui est-ce ?', img: 'father', ok: 'È mio padre|C\'est mon père', bad: ['È mio fratello|C\'est mon frère', 'È mia madre|C\'est ma mère'] },
      { npc: 'Chi è?|Qui est-ce ?', img: 'mother', ok: 'È mia madre|C\'est ma mère', bad: ['È mia sorella|C\'est ma sœur', 'È mio padre|C\'est mon père'] },
      { npc: 'Chi è?|Qui est-ce ?', img: 'sister', ok: 'È mia sorella|C\'est ma sœur', bad: ['È mia madre|C\'est ma mère', 'È mio fratello|C\'est mon frère'] },
      { npc: 'Chi è?|Qui est-ce ?', img: 'brother', ok: 'È mio fratello|C\'est mon frère', bad: ['È mio padre|C\'est mon père', 'È mia sorella|C\'est ma sœur'] },
      { npc: 'Hai fratelli o sorelle?|As-tu des frères et sœurs ?', ok: 'Ho un fratello e una sorella|J\'ai un frère et une sœur', bad: ['Sono studente|Je suis étudiant', 'Voglio dell\'acqua|Je veux de l\'eau'] },
    ],
  },
  {
    id: 'it-C6', level: 'intermediate', title: 'Au restaurant', scene: 'fish', npcRole: 'le serveur',
    situation: 'Tu dînes au restaurant. Commande un plat et une boisson, donne ton avis, demande l\'addition.',
    key: ['il pesce|poisson|img:fish', 'il succo|jus|img:juice', 'delizioso|délicieux', 'il conto|l\'addition|img:money'],
    turns: [
      { npc: 'Benvenuto|Bienvenue', ok: 'Ciao|Bonjour', bad: ['Il conto, per favore|L\'addition, s\'il vous plaît', 'Arrivederci|Au revoir'] },
      { npc: 'Che cosa vuoi mangiare?|Que veux-tu manger ?', ok: 'Vorrei del pesce|Je voudrais du poisson|img:fish', bad: ['Sono studente|Je suis étudiant', 'Domani|Demain'] },
      { npc: 'E che cosa vuoi bere?|Et que veux-tu boire ?', ok: 'Preferisco il succo|Je préfère le jus|img:juice', bad: ['Mi chiamo Anna|Je m\'appelle Anna', 'Ho perso la mia borsa|J\'ai perdu mon sac'] },
      { npc: 'È buono?|Est-ce que c\'est bon ?', ok: 'Sì, è molto buono|Oui, c\'est très bon', bad: ['Non capisco|Je ne comprends pas', 'a destra|à droite'] },
      { npc: 'Altro?|Autre chose ?', ok: 'No, il conto, per favore|Non, l\'addition, s\'il vous plaît', bad: ['Mi piace il caffè|J\'aime le café', 'Dov\'è il bagno?|Où sont les toilettes ?'] },
    ],
  },
  {
    id: 'it-C7', level: 'intermediate', title: 'À l\'université', scene: 'university', npcRole: 'le professeur',
    situation: 'C\'est ton premier jour à l\'université. Réponds à ton professeur et demande où est la bibliothèque.',
    key: ['il professore|professeur|img:teacher', 'lo studente|étudiant|img:student', 'la biblioteca|bibliothèque|img:library', 'l\'università|université|img:university'],
    turns: [
      { npc: 'Buongiorno|Bonjour (le matin)', ok: 'Ciao|Bonjour', bad: ['Buonasera|Bonsoir', 'Prego|De rien'] },
      { npc: 'Sei un nuovo studente?|Es-tu un nouvel étudiant ?', ok: 'Sì, sono un nuovo studente|Oui, je suis un nouvel étudiant|img:student', bad: ['Non capisco|Je ne comprends pas', 'Quanto costa?|Combien ça coûte ?'] },
      { npc: 'Che cosa studi?|Qu\'étudies-tu ?', ok: 'Studio le lingue|J\'étudie les langues', bad: ['Sono francese|Je viens de France', 'Voglio del pane|Je veux du pain|img:bread'] },
      { npc: 'Hai una domanda?|As-tu une question ?', ok: 'Sì, dov\'è la biblioteca?|Oui, où est la bibliothèque ?|img:library', bad: ['Grazie|Merci', 'Domani|Demain'] },
      { npc: 'La biblioteca è vicina, sempre dritto|La bibliothèque est près, tout droit', ok: 'Grazie, professore|Merci, professeur', bad: ['Mi scusi per questo errore|Je m\'excuse pour cette erreur', 'Ciao|Bonjour'] },
    ],
  },
  {
    id: 'it-C8', level: 'intermediate', title: 'Chez le médecin', scene: 'hospital', npcRole: 'le médecin',
    situation: 'Tu ne te sens pas bien. Explique ce que tu as et écoute les conseils du médecin.',
    key: ['il medico|médecin|img:doctor', 'la testa|tête|img:head', 'l\'acqua|eau|img:water', 'Da ieri|Depuis hier'],
    turns: [
      { npc: 'Buongiorno, qual è il problema?|Bonjour, quel est le problème ?', ok: 'Sono malato|Je suis malade', bad: ['Sono studente|Je suis étudiant', 'Vorrei un caffè, per favore|Je voudrais un café, s\'il vous plaît|img:coffee'] },
      { npc: 'Dove ti fa male?|Où as-tu mal ?', ok: 'Ho mal di testa|J\'ai mal à la tête|img:head', bad: ['Sono francese|Je viens de France', 'a sinistra|à gauche'] },
      { npc: 'Da quando?|Depuis quand ?', ok: 'Da ieri|Depuis hier', bad: ['Domani|Demain', 'Sì|Oui'] },
      { npc: 'Ti do una medicina|Je vais te donner un médicament', ok: 'Grazie, dottore|Merci, docteur', bad: ['Arrivederci|Au revoir', 'Dov\'è l\'aeroporto?|Où est l\'aéroport ?'] },
      { npc: 'Bevi molta acqua|Bois beaucoup d\'eau|img:water', ok: 'D\'accordo|D\'accord', bad: ['Ho perso la mia borsa|J\'ai perdu mon sac', 'Quanto costa?|Combien ça coûte ?'] },
    ],
  },
  {
    id: 'it-C9', level: 'intermediate', title: 'Inviter un ami', scene: 'sunset', npcRole: 'un ami',
    situation: 'Un ami te propose de sortir. Accepte, fixe l\'heure et le lieu.',
    key: ['domani|demain', 'il caffè|le café|img:coffee', 'le cinque|cinq heures|img:clock', 'A presto|À bientôt'],
    turns: [
      { npc: 'Buonasera|Bonsoir', ok: 'Buonasera|Bonsoir', bad: ['Buongiorno|Bonjour (le matin)', 'Prego|De rien'] },
      { npc: 'Vuoi uscire domani?|Veux-tu qu\'on sorte demain ?', ok: 'Sì, volentieri|Oui, avec plaisir', bad: ['Non capisco|Je ne comprends pas', 'Sono malato|Je suis malade'] },
      { npc: 'Dove ci vediamo?|Où se retrouve-t-on ?', ok: 'Al bar|Au café|img:coffee', bad: ['Sono studente|Je suis étudiant', 'Mi chiamo Anna|Je m\'appelle Anna'] },
      { npc: 'A che ora?|À quelle heure ?', ok: 'Alle cinque|À cinq heures|img:clock', bad: ['a destra|à droite', 'Voglio del tè|Je veux du thé'] },
      { npc: 'Siamo d\'accordo|C\'est entendu', ok: 'A presto|À bientôt', bad: ['Ciao|Bonjour', 'Quanto costa?|Combien ça coûte ?'] },
    ],
  },
  {
    id: 'it-C10', level: 'advanced', title: 'Donner son avis sur une ville', scene: 'city', npcRole: 'un ami',
    situation: 'Un ami te demande ce que tu penses de sa ville. Donne ton avis et justifie-le.',
    key: ['la città|ville|img:city', 'bello|beau', 'perché|parce que', 'ma|mais'],
    turns: [
      { npc: 'Che cosa pensi di questa città?|Que penses-tu de cette ville ?', ok: 'Penso che la città sia bella|Je pense que la ville est belle|img:city', bad: ['Sono francese|Je viens de France', 'Arrivederci|Au revoir'] },
      { npc: 'Perché?|Pourquoi ?', ok: 'Perché è pulita e tranquilla|Parce qu\'elle est propre et calme', bad: ['Domani|Demain', 'Mi chiamo Anna|Je m\'appelle Anna'] },
      { npc: 'Ma è cara|Mais elle est chère', ok: 'Sono d\'accordo, ma mi piace|Je suis d\'accord, mais je l\'aime', bad: ['Non capisco|Je ne comprends pas', 'Grazie|Merci'] },
      { npc: 'La visiterai ancora?|La visiteras-tu encore ?', ok: 'Sì, la visiterò ancora|Oui, je la visiterai encore', bad: ['Sono malato|Je suis malade', 'a sinistra|à gauche'] },
    ],
  },
  {
    id: 'it-C11', level: 'advanced', title: 'Une réclamation', scene: 'money', npcRole: 'l\'employé',
    situation: 'Ton appareil ne marche pas. Explique le problème et demande une réparation ou un dédommagement.',
    key: ['il problema|problème', 'l\'apparecchio|l\'appareil', 'il risarcimento|dédommagement', 'il direttore|directeur'],
    turns: [
      { npc: 'Come posso aiutarla?|Comment puis-je t\'aider ?', ok: 'Ho un problema|J\'ai un problème', bad: ['Ciao|Bonjour', 'Sono studente|Je suis étudiant'] },
      { npc: 'Qual è il problema?|Quel est le problème ?', ok: 'L\'apparecchio non funziona|L\'appareil ne fonctionne pas', bad: ['Mi chiamo Anna|Je m\'appelle Anna', 'Vorrei un caffè, per favore|Je voudrais un café, s\'il vous plaît|img:coffee'] },
      { npc: 'Da quando?|Depuis quand ?', ok: 'Da ieri|Depuis hier', bad: ['Sì|Oui', 'a destra|à droite'] },
      { npc: 'Mi scusi per questo errore|Je m\'excuse pour cette erreur', ok: 'La prego di ripararlo|Je vous prie de le réparer', bad: ['Arrivederci|Au revoir', 'Non capisco|Je ne comprends pas'] },
      { npc: 'Lo riparerò domani|Je le réparerai demain', ok: 'Grazie a lei|Merci à vous', bad: ['Dov\'è il bagno?|Où sont les toilettes ?', 'Sono malato|Je suis malade'] },
    ],
  },
  {
    id: 'it-C12', level: 'advanced', title: 'Un exposé en classe', scene: 'teacher', npcRole: 'le professeur',
    situation: 'Tu présentes un court exposé. Ouvre, argumente, conclus et remercie.',
    key: ['l\'argomento|sujet', 'per esempio|par exemple', 'per concludere|pour conclure', 'la domanda|question'],
    turns: [
      { npc: 'Prego, cominci pure|Je vous en prie, commencez', ok: 'Il mio argomento è l\'apprendimento delle lingue|Mon sujet est l\'apprentissage des langues', bad: ['Grazie per l\'attenzione|Merci de votre attention', 'Arrivederci|Au revoir'] },
      { npc: 'Perché questo argomento?|Pourquoi ce sujet ?', ok: 'Perché è importante|Parce qu\'il est important', bad: ['Voglio del pane|Je veux du pain|img:bread', 'Domani|Demain'] },
      { npc: 'Hai un esempio?|As-tu un exemple ?', ok: 'Sì, per esempio i viaggi|Oui, par exemple les voyages', bad: ['Non capisco|Je ne comprends pas', 'a destra|à droite'] },
      { npc: 'E per concludere?|Et pour conclure ?', ok: 'Per concludere, imparo ogni giorno|Pour conclure, j\'apprends chaque jour', bad: ['Sono malato|Je suis malade', 'Ciao|Bonjour'] },
      { npc: 'Bravo, buon lavoro|Bravo, bon travail', ok: 'Grazie per l\'attenzione|Merci de votre attention', bad: ['Ho un fratello e una sorella|J\'ai un frère et une sœur', 'Quanto costa?|Combien ça coûte ?'] },
    ],
  },
  {
    id: 'it-C13', title: 'À la gare', scene: 'station', npcRole: 'l\'employé du guichet',
    situation: 'Tu achètes un billet de train à la gare. Dis où tu vas, demande un billet et paie.',
    key: ['la stazione|la gare|img:station', 'il biglietto|le billet|img:ticket', 'il treno|le train|img:train', 'la valigia|la valise|img:suitcase'],
    turns: [
      { npc: 'Buongiorno, dove va?|Bonjour, où allez-vous ?', ok: 'Vado in centro|Je vais en ville', bad: ['Sono studente|Je suis étudiant', 'Grazie|Merci'] },
      { npc: 'Un biglietto o due?|Un billet ou deux ?', img: 'ticket', ok: 'Un biglietto, per favore|Un billet, s\'il vous plaît|img:ticket', bad: ['Voglio dell\'acqua|Je veux de l\'eau', 'Mi chiamo Anna|Je m\'appelle Anna'] },
      { npc: 'Sono venti euro|Ça fait vingt euros', ok: 'Ecco a Lei|Voilà', bad: ['Quanto costa?|Combien ça coûte ?', 'Mi piace il caffè|J\'aime le café'] },
      { npc: 'Il treno parte alle cinque|Le train part à cinq heures', ok: 'D\'accordo, grazie|D\'accord, merci', bad: ['Ho perso la mia borsa|J\'ai perdu mon sac', 'Sono malato|Je suis malade'] },
      { npc: 'Buon viaggio!|Bon voyage !', ok: 'Grazie, arrivederci|Merci, au revoir', bad: ['Ciao|Bonjour', 'Non capisco|Je ne comprends pas'] },
    ],
  },
  {
    id: 'it-C14', level: 'intermediate', title: 'À l\'hôtel', scene: 'hotel', npcRole: 'le réceptionniste',
    situation: 'Tu arrives à l\'hôtel. Annonce ta réservation, donne ton nom, écoute les consignes.',
    key: ['l\'albergo|l\'hôtel|img:hotel', 'la camera|la chambre|img:bed', 'la chiave|la clé|img:key', 'la colazione|le petit-déjeuner'],
    turns: [
      { npc: 'Buonasera, benvenuto in albergo|Bonjour, bienvenue à l\'hôtel', ok: 'Buonasera, ho una prenotazione|Bonjour, j\'ai une réservation', bad: ['Il conto, per favore|L\'addition, s\'il vous plaît', 'Voglio del tè|Je veux du thé'] },
      { npc: 'Qual è il suo nome?|Quel est votre nom ?', ok: 'Mi chiamo Anna|Je m\'appelle Anna', bad: ['Sono francese|Je viens de France', 'Grazie|Merci'] },
      { npc: 'Ecco la chiave della sua camera|Voici la clé de votre chambre|img:key', img: 'key', ok: 'Grazie|Merci', bad: ['Arrivederci|Au revoir', 'Sono malato|Je suis malade'] },
      { npc: 'La colazione è alle otto|Le petit-déjeuner est à huit heures', ok: 'Perfetto, grazie|C\'est parfait, merci', bad: ['Ho perso la mia borsa|J\'ai perdu mon sac', 'a sinistra|à gauche'] },
      { npc: 'Ha bisogno di altro?|Avez-vous besoin d\'autre chose ?', ok: 'No, grazie, buonanotte|Non, merci, bonne nuit', bad: ['Mi chiamo Anna|Je m\'appelle Anna', 'Sono francese|Je viens de France'] },
    ],
  },
  {
    id: 'it-C15', level: 'intermediate', title: 'Au téléphone', scene: 'phone', npcRole: 'un ami',
    situation: 'Un ami t\'appelle. Réponds, donne des nouvelles et fixe un rendez-vous pour demain.',
    key: ['il telefono|le téléphone|img:phone', 'il numero|le numéro', 'domani|demain', 'A presto|À bientôt'],
    turns: [
      { npc: 'Pronto?|Allô ?', ok: 'Pronto, sono Anna|Allô, c\'est Anna', bad: ['Grazie|Merci', 'Sì|Oui'] },
      { npc: 'Come stai?|Comment vas-tu ?', ok: 'Sto bene, grazie|Je vais bien, merci', bad: ['Mi chiamo Anna|Je m\'appelle Anna', 'Arrivederci|Au revoir'] },
      { npc: 'Sei libero domani?|Tu es libre demain ?', ok: 'Sì, sono libero|Oui, je suis libre', bad: ['Sono malato|Je suis malade', 'Ho perso la mia borsa|J\'ai perdu mon sac'] },
      { npc: 'Ti mando l\'indirizzo con un messaggio|Je t\'envoie l\'adresse par message', ok: 'D\'accordo, grazie|D\'accord, merci', bad: ['Sono studente|Je suis étudiant', 'Non capisco|Je ne comprends pas'] },
      { npc: 'A domani!|À demain !', ok: 'A domani!|À demain !', bad: ['Ciao|Bonjour', 'Mi piace il caffè|J\'aime le café'] },
    ],
  },
  {
    id: 'it-C16', level: 'intermediate', title: 'À l\'aéroport', scene: 'airport', npcRole: 'l\'agent d\'enregistrement',
    situation: 'Tu enregistres ton vol. Montre ton passeport, dis où tu vas et demande ta porte.',
    key: ['l\'aeroporto|l\'aéroport|img:airport', 'il passaporto|le passeport', 'la valigia|la valise|img:suitcase', 'l\'aereo|l\'avion|img:airplane'],
    turns: [
      { npc: 'Il suo passaporto, per favore|Votre passeport, s\'il vous plaît', ok: 'Ecco il mio passaporto|Voici mon passeport', bad: ['Sono studente|Je suis étudiant', 'Quanto costa?|Combien ça coûte ?'] },
      { npc: 'Buongiorno, dove va?|Bonjour, où allez-vous ?', ok: 'Vado in Francia|Je vais en France', bad: ['Grazie|Merci', 'Domani|Demain'] },
      { npc: 'Ha una valigia?|Avez-vous une valise ?', img: 'suitcase', ok: 'Sì, ho una valigia|Oui, j\'ai une valise|img:suitcase', bad: ['Mi piace il caffè|J\'aime le café', 'Mi chiamo Anna|Je m\'appelle Anna'] },
      { npc: 'L\'aereo parte alle dieci|L\'avion part à dix heures', ok: 'Grazie, dov\'è il gate?|Merci, où est la porte d\'embarquement ?', bad: ['Ho perso la mia borsa|J\'ai perdu mon sac', 'Sono malato|Je suis malade'] },
      { npc: 'Buon volo!|Bon vol !', ok: 'Grazie, arrivederci|Merci, au revoir', bad: ['Ciao|Bonjour', 'Non capisco|Je ne comprends pas'] },
    ],
  },
];
