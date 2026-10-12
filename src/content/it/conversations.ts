import type { ConvSpec } from '../conversations';

// ─── IT — conversations guidées A1 (générées depuis la table de phrases communes) ───
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
];
