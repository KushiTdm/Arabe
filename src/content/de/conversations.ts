import type { ConvSpec } from '../conversations';

// ─── DE — conversations guidées (générées depuis la table de phrases communes) ───
// À faire relire par un locuteur natif.

export const DE_CONVERSATIONS: ConvSpec[] = [
  {
    id: 'de-C1', title: 'Rencontre', scene: 'handshake', npcRole: 'une personne que tu rencontres',
    situation: 'Tu rencontres quelqu\'un pour la première fois. Salue, présente-toi, réponds à ses questions.',
    key: ['Guten Morgen|Bonjour (le matin)', 'Ich heiße Anna|Je m\'appelle Anna', 'Ich komme aus Frankreich|Je viens de France', 'Freut mich|Enchanté(e)'],
    turns: [
      { npc: 'Guten Morgen|Bonjour (le matin)', ok: 'Guten Morgen|Bonjour (le matin)', bad: ['Gute Nacht|Bonne nuit', 'Auf Wiedersehen|Au revoir'] },
      { npc: 'Wie heißt du?|Comment t\'appelles-tu ?', ok: 'Ich heiße Anna|Je m\'appelle Anna', bad: ['Gut, danke|Je vais bien, merci', 'Ich komme aus Frankreich|Je viens de France'] },
      { npc: 'Woher kommst du?|D\'où viens-tu ?', ok: 'Ich komme aus Frankreich|Je viens de France', bad: ['Ich heiße Anna|Je m\'appelle Anna', 'Danke|Merci'] },
      { npc: 'Freut mich|Enchanté(e)', ok: 'Freut mich|Enchanté(e)', bad: ['Ich verstehe nicht|Je ne comprends pas', 'Bitte|De rien'] },
      { npc: 'Wie geht\'s?|Comment vas-tu ?', ok: 'Gut, danke|Je vais bien, merci', bad: ['Guten Morgen|Bonjour (le matin)', 'Wo ist das Krankenhaus?|Où est l\'hôpital ?'] },
      { npc: 'Auf Wiedersehen|Au revoir', ok: 'Bis bald|À bientôt', bad: ['Guten Morgen|Bonjour (le matin)', 'Ja|Oui'] },
    ],
  },
  {
    id: 'de-C2', title: 'Au café', scene: 'coffee', npcRole: 'le serveur',
    situation: 'Tu entres dans un café. Commande une boisson, réponds au serveur, paie.',
    key: ['der Kaffee|café|img:coffee', 'der Tee|thé|img:tea', 'das Wasser|eau|img:water', 'der Saft|jus|img:juice'],
    turns: [
      { npc: 'Hallo, was möchtest du?|Bonjour, que veux-tu ?', ok: 'Ich möchte einen Kaffee, bitte|Je voudrais un café, s\'il vous plaît|img:coffee', bad: ['Wo ist das Krankenhaus?|Où est l\'hôpital ?', 'Auf Wiedersehen|Au revoir'] },
      { npc: 'Sonst noch etwas?|Autre chose ?', ok: 'Nein, danke|Non, merci', bad: ['Ich heiße Anna|Je m\'appelle Anna', 'Bis bald|À bientôt'] },
      { npc: 'Das macht drei Euro|Ça fait trois euros|img:money', ok: 'Bitte schön|Voilà', bad: ['Was kostet das?|Combien ça coûte ?', 'Ich mag Kaffee|J\'aime le café'] },
      { npc: 'Danke|Merci', ok: 'Bitte|De rien', bad: ['Ich verstehe nicht|Je ne comprends pas', 'Ja|Oui'] },
    ],
  },
  {
    id: 'de-C3', title: 'Au marché', scene: 'market', npcRole: 'le vendeur',
    situation: 'Tu fais tes courses au marché. Demande ce que tu veux, le prix, et paie.',
    key: ['das Brot|pain|img:bread', 'die Eier|œufs|img:eggs', 'der Fisch|poisson|img:fish', 'das Geld|argent|img:money'],
    turns: [
      { npc: 'Guten Tag, was darf es sein?|Bonjour, que désirez-vous ?', ok: 'Ich möchte Brot|Je veux du pain|img:bread', bad: ['Auf Wiedersehen|Au revoir', 'Wo ist das Krankenhaus?|Où est l\'hôpital ?'] },
      { npc: 'Wie viele möchten Sie?|Combien en voulez-vous ?', ok: 'Zwei, bitte|Deux, s\'il vous plaît', bad: ['Guten Morgen|Bonjour (le matin)', 'Gute Nacht|Bonne nuit'] },
      { npc: 'Bitte schön|Voilà', ok: 'Was kostet das?|Combien ça coûte ?', bad: ['Ich verstehe nicht|Je ne comprends pas', 'Ich heiße Anna|Je m\'appelle Anna'] },
      { npc: 'Das macht fünf Euro|Ça fait cinq euros|img:money', ok: 'Bitte schön|Voilà', bad: ['Zwei, bitte|Deux, s\'il vous plaît', 'Ja|Oui'] },
      { npc: 'Danke, auf Wiedersehen|Merci, au revoir', ok: 'Auf Wiedersehen|Au revoir', bad: ['Guten Morgen|Bonjour (le matin)', 'Gute Nacht|Bonne nuit'] },
    ],
  },
  {
    id: 'de-C4', title: 'Demander son chemin', scene: 'street', npcRole: 'un passant',
    situation: 'Tu cherches l\'hôpital. Demande ton chemin et comprends la réponse.',
    key: ['das Krankenhaus|hôpital|img:hospital', 'die Straße|rue|img:street', 'die Schule|école|img:school', 'der Markt|marché|img:market'],
    turns: [
      { npc: 'Brauchen Sie Hilfe?|Avez-vous besoin d\'aide ?', ok: 'Ja, wo ist das Krankenhaus?|Oui, où est l\'hôpital ?|img:hospital', bad: ['Auf Wiedersehen|Au revoir', 'Ich heiße Anna|Je m\'appelle Anna'] },
      { npc: 'Geradeaus und dann links|Tout droit puis à gauche', ok: 'Ist es weit?|Est-ce loin ?', bad: ['Ich komme aus Frankreich|Je viens de France', 'Ich möchte Brot|Je veux du pain|img:bread'] },
      { npc: 'Nein, es ist in der Nähe|Non, c\'est près', ok: 'Danke|Merci', bad: ['Ich verstehe nicht|Je ne comprends pas', 'Zwei, bitte|Deux, s\'il vous plaît'] },
      { npc: 'Bitte|De rien', ok: 'Auf Wiedersehen|Au revoir', bad: ['Ich möchte einen Kaffee, bitte|Je voudrais un café, s\'il vous plaît|img:coffee', 'Guten Morgen|Bonjour (le matin)'] },
    ],
  },
  {
    id: 'de-C5', title: 'Ma famille', scene: '👨‍👩‍👧', npcRole: 'un ami',
    situation: 'Un ami regarde tes photos de famille. Dis qui est sur chaque photo.',
    key: ['der Vater|père|img:father', 'die Mutter|mère|img:mother', 'der Bruder|frère|img:brother', 'die Schwester|sœur|img:sister'],
    turns: [
      { npc: 'Wer ist das?|Qui est-ce ?', img: 'father', ok: 'Das ist mein Vater|C\'est mon père', bad: ['Das ist mein Bruder|C\'est mon frère', 'Das ist meine Mutter|C\'est ma mère'] },
      { npc: 'Wer ist das?|Qui est-ce ?', img: 'mother', ok: 'Das ist meine Mutter|C\'est ma mère', bad: ['Das ist meine Schwester|C\'est ma sœur', 'Das ist mein Vater|C\'est mon père'] },
      { npc: 'Wer ist das?|Qui est-ce ?', img: 'sister', ok: 'Das ist meine Schwester|C\'est ma sœur', bad: ['Das ist meine Mutter|C\'est ma mère', 'Das ist mein Bruder|C\'est mon frère'] },
      { npc: 'Wer ist das?|Qui est-ce ?', img: 'brother', ok: 'Das ist mein Bruder|C\'est mon frère', bad: ['Das ist mein Vater|C\'est mon père', 'Das ist meine Schwester|C\'est ma sœur'] },
      { npc: 'Hast du Geschwister?|As-tu des frères et sœurs ?', ok: 'Ich habe einen Bruder und eine Schwester|J\'ai un frère et une sœur', bad: ['Ich bin Student|Je suis étudiant', 'Ich möchte Wasser|Je veux de l\'eau'] },
    ],
  },
  {
    id: 'de-C6', level: 'intermediate', title: 'Au restaurant', scene: 'fish', npcRole: 'le serveur',
    situation: 'Tu dînes au restaurant. Commande un plat et une boisson, donne ton avis, demande l\'addition.',
    key: ['der Fisch|poisson|img:fish', 'der Saft|jus|img:juice', 'lecker|délicieux', 'die Rechnung|l\'addition|img:money'],
    turns: [
      { npc: 'Willkommen|Bienvenue', ok: 'Hallo|Bonjour', bad: ['Die Rechnung, bitte|L\'addition, s\'il vous plaît', 'Auf Wiedersehen|Au revoir'] },
      { npc: 'Was möchtest du essen?|Que veux-tu manger ?', ok: 'Ich möchte Fisch|Je voudrais du poisson|img:fish', bad: ['Ich bin Student|Je suis étudiant', 'Morgen|Demain'] },
      { npc: 'Und was möchtest du trinken?|Et que veux-tu boire ?', ok: 'Ich nehme lieber Saft|Je préfère le jus|img:juice', bad: ['Ich heiße Anna|Je m\'appelle Anna', 'Ich habe meine Tasche verloren|J\'ai perdu mon sac'] },
      { npc: 'Schmeckt es?|Est-ce que c\'est bon ?', ok: 'Ja, es schmeckt sehr gut|Oui, c\'est très bon', bad: ['Ich verstehe nicht|Je ne comprends pas', 'rechts|à droite'] },
      { npc: 'Sonst noch etwas?|Autre chose ?', ok: 'Nein, die Rechnung, bitte|Non, l\'addition, s\'il vous plaît', bad: ['Ich mag Kaffee|J\'aime le café', 'Wo ist die Toilette?|Où sont les toilettes ?'] },
    ],
  },
  {
    id: 'de-C7', level: 'intermediate', title: 'À l\'université', scene: 'university', npcRole: 'le professeur',
    situation: 'C\'est ton premier jour à l\'université. Réponds à ton professeur et demande où est la bibliothèque.',
    key: ['der Professor|professeur|img:teacher', 'der Student|étudiant|img:student', 'die Bibliothek|bibliothèque|img:library', 'die Universität|université|img:university'],
    turns: [
      { npc: 'Guten Morgen|Bonjour (le matin)', ok: 'Hallo|Bonjour', bad: ['Guten Abend|Bonsoir', 'Bitte|De rien'] },
      { npc: 'Bist du ein neuer Student?|Es-tu un nouvel étudiant ?', ok: 'Ja, ich bin ein neuer Student|Oui, je suis un nouvel étudiant|img:student', bad: ['Ich verstehe nicht|Je ne comprends pas', 'Was kostet das?|Combien ça coûte ?'] },
      { npc: 'Was studierst du?|Qu\'étudies-tu ?', ok: 'Ich studiere Sprachen|J\'étudie les langues', bad: ['Ich komme aus Frankreich|Je viens de France', 'Ich möchte Brot|Je veux du pain|img:bread'] },
      { npc: 'Hast du eine Frage?|As-tu une question ?', ok: 'Ja, wo ist die Bibliothek?|Oui, où est la bibliothèque ?|img:library', bad: ['Danke|Merci', 'Morgen|Demain'] },
      { npc: 'Die Bibliothek ist ganz nah, geradeaus|La bibliothèque est près, tout droit', ok: 'Danke, Herr Professor|Merci, professeur', bad: ['Entschuldigung für diesen Fehler|Je m\'excuse pour cette erreur', 'Hallo|Bonjour'] },
    ],
  },
  {
    id: 'de-C8', level: 'intermediate', title: 'Chez le médecin', scene: 'hospital', npcRole: 'le médecin',
    situation: 'Tu ne te sens pas bien. Explique ce que tu as et écoute les conseils du médecin.',
    key: ['der Arzt|médecin|img:doctor', 'der Kopf|tête|img:head', 'das Wasser|eau|img:water', 'Seit gestern|Depuis hier'],
    turns: [
      { npc: 'Guten Tag, was ist das Problem?|Bonjour, quel est le problème ?', ok: 'Ich bin krank|Je suis malade', bad: ['Ich bin Student|Je suis étudiant', 'Ich möchte einen Kaffee, bitte|Je voudrais un café, s\'il vous plaît|img:coffee'] },
      { npc: 'Wo tut es weh?|Où as-tu mal ?', ok: 'Ich habe Kopfschmerzen|J\'ai mal à la tête|img:head', bad: ['Ich komme aus Frankreich|Je viens de France', 'links|à gauche'] },
      { npc: 'Seit wann?|Depuis quand ?', ok: 'Seit gestern|Depuis hier', bad: ['Morgen|Demain', 'Ja|Oui'] },
      { npc: 'Ich gebe dir ein Medikament|Je vais te donner un médicament', ok: 'Danke, Herr Doktor|Merci, docteur', bad: ['Auf Wiedersehen|Au revoir', 'Wo ist der Flughafen?|Où est l\'aéroport ?'] },
      { npc: 'Trink viel Wasser|Bois beaucoup d\'eau|img:water', ok: 'In Ordnung|D\'accord', bad: ['Ich habe meine Tasche verloren|J\'ai perdu mon sac', 'Was kostet das?|Combien ça coûte ?'] },
    ],
  },
  {
    id: 'de-C9', level: 'intermediate', title: 'Inviter un ami', scene: 'sunset', npcRole: 'un ami',
    situation: 'Un ami te propose de sortir. Accepte, fixe l\'heure et le lieu.',
    key: ['morgen|demain', 'das Café|le café|img:coffee', 'fünf Uhr|cinq heures|img:clock', 'Bis bald|À bientôt'],
    turns: [
      { npc: 'Guten Abend|Bonsoir', ok: 'Guten Abend|Bonsoir', bad: ['Guten Morgen|Bonjour (le matin)', 'Bitte|De rien'] },
      { npc: 'Möchtest du morgen ausgehen?|Veux-tu qu\'on sorte demain ?', ok: 'Ja, gern|Oui, avec plaisir', bad: ['Ich verstehe nicht|Je ne comprends pas', 'Ich bin krank|Je suis malade'] },
      { npc: 'Wo treffen wir uns?|Où se retrouve-t-on ?', ok: 'Im Café|Au café|img:coffee', bad: ['Ich bin Student|Je suis étudiant', 'Ich heiße Anna|Je m\'appelle Anna'] },
      { npc: 'Um wie viel Uhr?|À quelle heure ?', ok: 'Um fünf Uhr|À cinq heures|img:clock', bad: ['rechts|à droite', 'Ich möchte Tee|Je veux du thé'] },
      { npc: 'Abgemacht|C\'est entendu', ok: 'Bis bald|À bientôt', bad: ['Hallo|Bonjour', 'Was kostet das?|Combien ça coûte ?'] },
    ],
  },
  {
    id: 'de-C10', level: 'advanced', title: 'Donner son avis sur une ville', scene: 'city', npcRole: 'un ami',
    situation: 'Un ami te demande ce que tu penses de sa ville. Donne ton avis et justifie-le.',
    key: ['die Stadt|ville|img:city', 'schön|beau', 'weil|parce que', 'aber|mais'],
    turns: [
      { npc: 'Was denkst du über diese Stadt?|Que penses-tu de cette ville ?', ok: 'Ich finde, die Stadt ist schön|Je pense que la ville est belle|img:city', bad: ['Ich komme aus Frankreich|Je viens de France', 'Auf Wiedersehen|Au revoir'] },
      { npc: 'Warum?|Pourquoi ?', ok: 'Weil sie sauber und ruhig ist|Parce qu\'elle est propre et calme', bad: ['Morgen|Demain', 'Ich heiße Anna|Je m\'appelle Anna'] },
      { npc: 'Aber sie ist teuer|Mais elle est chère', ok: 'Ich stimme zu, aber ich mag sie|Je suis d\'accord, mais je l\'aime', bad: ['Ich verstehe nicht|Je ne comprends pas', 'Danke|Merci'] },
      { npc: 'Wirst du sie wieder besuchen?|La visiteras-tu encore ?', ok: 'Ja, ich werde sie wieder besuchen|Oui, je la visiterai encore', bad: ['Ich bin krank|Je suis malade', 'links|à gauche'] },
    ],
  },
  {
    id: 'de-C11', level: 'advanced', title: 'Une réclamation', scene: 'money', npcRole: 'l\'employé',
    situation: 'Ton appareil ne marche pas. Explique le problème et demande une réparation ou un dédommagement.',
    key: ['das Problem|problème', 'das Gerät|l\'appareil', 'die Entschädigung|dédommagement', 'der Direktor|directeur'],
    turns: [
      { npc: 'Wie kann ich Ihnen helfen?|Comment puis-je t\'aider ?', ok: 'Ich habe ein Problem|J\'ai un problème', bad: ['Hallo|Bonjour', 'Ich bin Student|Je suis étudiant'] },
      { npc: 'Was ist das Problem?|Quel est le problème ?', ok: 'Das Gerät funktioniert nicht|L\'appareil ne fonctionne pas', bad: ['Ich heiße Anna|Je m\'appelle Anna', 'Ich möchte einen Kaffee, bitte|Je voudrais un café, s\'il vous plaît|img:coffee'] },
      { npc: 'Seit wann?|Depuis quand ?', ok: 'Seit gestern|Depuis hier', bad: ['Ja|Oui', 'rechts|à droite'] },
      { npc: 'Entschuldigung für diesen Fehler|Je m\'excuse pour cette erreur', ok: 'Bitte reparieren Sie es|Je vous prie de le réparer', bad: ['Auf Wiedersehen|Au revoir', 'Ich verstehe nicht|Je ne comprends pas'] },
      { npc: 'Ich repariere es morgen|Je le réparerai demain', ok: 'Danke Ihnen|Merci à vous', bad: ['Wo ist die Toilette?|Où sont les toilettes ?', 'Ich bin krank|Je suis malade'] },
    ],
  },
  {
    id: 'de-C12', level: 'advanced', title: 'Un exposé en classe', scene: 'teacher', npcRole: 'le professeur',
    situation: 'Tu présentes un court exposé. Ouvre, argumente, conclus et remercie.',
    key: ['das Thema|sujet', 'zum Beispiel|par exemple', 'zum Schluss|pour conclure', 'die Frage|question'],
    turns: [
      { npc: 'Bitte, fangen Sie an|Je vous en prie, commencez', ok: 'Mein Thema ist das Sprachenlernen|Mon sujet est l\'apprentissage des langues', bad: ['Danke für Ihre Aufmerksamkeit|Merci de votre attention', 'Auf Wiedersehen|Au revoir'] },
      { npc: 'Warum dieses Thema?|Pourquoi ce sujet ?', ok: 'Weil es wichtig ist|Parce qu\'il est important', bad: ['Ich möchte Brot|Je veux du pain|img:bread', 'Morgen|Demain'] },
      { npc: 'Hast du ein Beispiel?|As-tu un exemple ?', ok: 'Ja, zum Beispiel Reisen|Oui, par exemple les voyages', bad: ['Ich verstehe nicht|Je ne comprends pas', 'rechts|à droite'] },
      { npc: 'Und zum Schluss?|Et pour conclure ?', ok: 'Zum Schluss lerne ich jeden Tag|Pour conclure, j\'apprends chaque jour', bad: ['Ich bin krank|Je suis malade', 'Hallo|Bonjour'] },
      { npc: 'Bravo, gute Arbeit|Bravo, bon travail', ok: 'Danke für Ihre Aufmerksamkeit|Merci de votre attention', bad: ['Ich habe einen Bruder und eine Schwester|J\'ai un frère et une sœur', 'Was kostet das?|Combien ça coûte ?'] },
    ],
  },
  {
    id: 'de-C13', title: 'À la gare', scene: 'station', npcRole: 'l\'employé du guichet',
    situation: 'Tu achètes un billet de train à la gare. Dis où tu vas, demande un billet et paie.',
    key: ['der Bahnhof|la gare|img:station', 'die Fahrkarte|le billet|img:ticket', 'der Zug|le train|img:train', 'der Koffer|la valise|img:suitcase'],
    turns: [
      { npc: 'Guten Tag, wohin fahren Sie?|Bonjour, où allez-vous ?', ok: 'Ich fahre in die Stadt|Je vais en ville', bad: ['Ich bin Student|Je suis étudiant', 'Danke|Merci'] },
      { npc: 'Eine Fahrkarte oder zwei?|Un billet ou deux ?', img: 'ticket', ok: 'Eine Fahrkarte, bitte|Un billet, s\'il vous plaît|img:ticket', bad: ['Ich möchte Wasser|Je veux de l\'eau', 'Ich heiße Anna|Je m\'appelle Anna'] },
      { npc: 'Das macht zwanzig Euro|Ça fait vingt euros', ok: 'Bitte schön|Voilà', bad: ['Was kostet das?|Combien ça coûte ?', 'Ich mag Kaffee|J\'aime le café'] },
      { npc: 'Der Zug fährt um fünf Uhr ab|Le train part à cinq heures', ok: 'In Ordnung, danke|D\'accord, merci', bad: ['Ich habe meine Tasche verloren|J\'ai perdu mon sac', 'Ich bin krank|Je suis malade'] },
      { npc: 'Gute Reise!|Bon voyage !', ok: 'Danke, auf Wiedersehen|Merci, au revoir', bad: ['Hallo|Bonjour', 'Ich verstehe nicht|Je ne comprends pas'] },
    ],
  },
  {
    id: 'de-C14', level: 'intermediate', title: 'À l\'hôtel', scene: 'hotel', npcRole: 'le réceptionniste',
    situation: 'Tu arrives à l\'hôtel. Annonce ta réservation, donne ton nom, écoute les consignes.',
    key: ['das Hotel|l\'hôtel|img:hotel', 'das Zimmer|la chambre|img:bed', 'der Schlüssel|la clé|img:key', 'das Frühstück|le petit-déjeuner'],
    turns: [
      { npc: 'Guten Tag, willkommen im Hotel|Bonjour, bienvenue à l\'hôtel', ok: 'Guten Tag, ich habe eine Reservierung|Bonjour, j\'ai une réservation', bad: ['Die Rechnung, bitte|L\'addition, s\'il vous plaît', 'Ich möchte Tee|Je veux du thé'] },
      { npc: 'Wie ist Ihr Name?|Quel est votre nom ?', ok: 'Ich heiße Anna|Je m\'appelle Anna', bad: ['Ich komme aus Frankreich|Je viens de France', 'Danke|Merci'] },
      { npc: 'Hier ist der Schlüssel zu Ihrem Zimmer|Voici la clé de votre chambre|img:key', img: 'key', ok: 'Danke|Merci', bad: ['Auf Wiedersehen|Au revoir', 'Ich bin krank|Je suis malade'] },
      { npc: 'Das Frühstück ist um acht Uhr|Le petit-déjeuner est à huit heures', ok: 'Perfekt, danke|C\'est parfait, merci', bad: ['Ich habe meine Tasche verloren|J\'ai perdu mon sac', 'links|à gauche'] },
      { npc: 'Brauchen Sie noch etwas?|Avez-vous besoin d\'autre chose ?', ok: 'Nein, danke, gute Nacht|Non, merci, bonne nuit', bad: ['Ich heiße Anna|Je m\'appelle Anna', 'Ich komme aus Frankreich|Je viens de France'] },
    ],
  },
  {
    id: 'de-C15', level: 'intermediate', title: 'Au téléphone', scene: 'phone', npcRole: 'un ami',
    situation: 'Un ami t\'appelle. Réponds, donne des nouvelles et fixe un rendez-vous pour demain.',
    key: ['das Telefon|le téléphone|img:phone', 'die Nummer|le numéro', 'morgen|demain', 'Bis bald|À bientôt'],
    turns: [
      { npc: 'Hallo?|Allô ?', ok: 'Hallo, hier ist Anna|Allô, c\'est Anna', bad: ['Danke|Merci', 'Ja|Oui'] },
      { npc: 'Wie geht\'s?|Comment vas-tu ?', ok: 'Gut, danke|Je vais bien, merci', bad: ['Ich heiße Anna|Je m\'appelle Anna', 'Auf Wiedersehen|Au revoir'] },
      { npc: 'Hast du morgen Zeit?|Tu es libre demain ?', ok: 'Ja, ich habe Zeit|Oui, je suis libre', bad: ['Ich bin krank|Je suis malade', 'Ich habe meine Tasche verloren|J\'ai perdu mon sac'] },
      { npc: 'Ich schicke dir die Adresse per Nachricht|Je t\'envoie l\'adresse par message', ok: 'In Ordnung, danke|D\'accord, merci', bad: ['Ich bin Student|Je suis étudiant', 'Ich verstehe nicht|Je ne comprends pas'] },
      { npc: 'Bis morgen!|À demain !', ok: 'Bis morgen!|À demain !', bad: ['Hallo|Bonjour', 'Ich mag Kaffee|J\'aime le café'] },
    ],
  },
  {
    id: 'de-C16', level: 'intermediate', title: 'À l\'aéroport', scene: 'airport', npcRole: 'l\'agent d\'enregistrement',
    situation: 'Tu enregistres ton vol. Montre ton passeport, dis où tu vas et demande ta porte.',
    key: ['der Flughafen|l\'aéroport|img:airport', 'der Reisepass|le passeport', 'der Koffer|la valise|img:suitcase', 'das Flugzeug|l\'avion|img:airplane'],
    turns: [
      { npc: 'Ihren Reisepass, bitte|Votre passeport, s\'il vous plaît', ok: 'Hier ist mein Reisepass|Voici mon passeport', bad: ['Ich bin Student|Je suis étudiant', 'Was kostet das?|Combien ça coûte ?'] },
      { npc: 'Guten Tag, wohin fahren Sie?|Bonjour, où allez-vous ?', ok: 'Ich fahre nach Frankreich|Je vais en France', bad: ['Danke|Merci', 'Morgen|Demain'] },
      { npc: 'Haben Sie einen Koffer?|Avez-vous une valise ?', img: 'suitcase', ok: 'Ja, ich habe einen Koffer|Oui, j\'ai une valise|img:suitcase', bad: ['Ich mag Kaffee|J\'aime le café', 'Ich heiße Anna|Je m\'appelle Anna'] },
      { npc: 'Das Flugzeug fliegt um zehn Uhr ab|L\'avion part à dix heures', ok: 'Danke, wo ist das Gate?|Merci, où est la porte d\'embarquement ?', bad: ['Ich habe meine Tasche verloren|J\'ai perdu mon sac', 'Ich bin krank|Je suis malade'] },
      { npc: 'Guten Flug!|Bon vol !', ok: 'Danke, auf Wiedersehen|Merci, au revoir', bad: ['Hallo|Bonjour', 'Ich verstehe nicht|Je ne comprends pas'] },
    ],
  },
];
