import type { ConvSpec } from '../conversations';

// ─── DE — conversations guidées A1 (générées depuis la table de phrases communes) ───
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
];
