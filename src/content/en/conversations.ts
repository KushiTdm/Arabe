import type { ConvSpec } from '../conversations';

// ─── EN — conversations guidées A1 (générées depuis la table de phrases communes) ───
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
];
