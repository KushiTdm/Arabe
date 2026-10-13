import type { ConvSpec } from '../conversations';

// ─── DE — conversations guidées C17 à C20 (supermarché, plage, chez un ami, taxi) ───
// Générées depuis une table de phrases communes à 11 langues. À faire relire par un locuteur natif.

export const DE_CONVERSATIONS2: ConvSpec[] = [
  {
    id: 'de-C17', title: 'Au supermarché', scene: 'supermarket', npcRole: 'l\'employé du magasin',
    situation: 'Tu fais tes courses. Demande où est le lait, réponds à l\'employé et paie.',
    key: ['die Milch|le lait|img:milk', 'das Brot|le pain|img:bread', 'der Apfel|la pomme|img:apple', 'die Tüte|le sac|img:bag'],
    turns: [
      { npc: 'Guten Tag, kann ich Ihnen helfen?|Bonjour, je peux vous aider ?', ok: 'Wo ist die Milch?|Où est le lait ?', bad: ['Auf Wiedersehen|Au revoir', 'Danke|Merci'] },
      { npc: 'Die Milch ist dort drüben, rechts|Le lait est là-bas, à droite', ok: 'Vielen Dank|Merci beaucoup', bad: ['Guten Tag|Bonjour', 'Ich komme aus Frankreich|Je viens de France'] },
      { npc: 'Möchten Sie noch etwas?|Voulez-vous autre chose ?', ok: 'Ja, Brot und Äpfel|Oui, du pain et des pommes', bad: ['Freut mich|Enchanté(e)', 'Morgen|Demain'] },
      { npc: 'Möchten Sie eine Tüte?|Voulez-vous un sac ?', ok: 'Ja, bitte|Oui, s\'il vous plaît', bad: ['Ich verstehe nicht|Je ne comprends pas', 'Auf Wiedersehen|Au revoir'] },
      { npc: 'Das macht zehn Euro|Ça fait dix euros', ok: 'Hier, bitte|Voilà, tenez', bad: ['Wie geht es dir?|Comment vas-tu ?', 'Ich verstehe nicht|Je ne comprends pas'] },
      { npc: 'Einen schönen Tag noch!|Bonne journée !', ok: 'Danke, gleichfalls|Merci, à vous aussi', bad: ['Ich verstehe nicht|Je ne comprends pas', 'Guten Tag|Bonjour'] },
    ],
  },
  {
    id: 'de-C18', title: 'À la plage', scene: 'beach', npcRole: 'un ami',
    situation: 'Tu passes la journée à la plage avec un ami. Parle du temps, de la mer et de l\'eau.',
    key: ['der Strand|la plage|img:beach', 'das Meer|la mer|img:sea', 'die Sonne|le soleil|img:sun', 'das Wasser|l\'eau|img:water'],
    turns: [
      { npc: 'Heute ist schönes Wetter|Il fait beau aujourd\'hui', ok: 'Ja, es ist sehr heiß|Oui, il fait très chaud', bad: ['Ich heiße Karim|Je m\'appelle Karim', 'Auf Wiedersehen|Au revoir'] },
      { npc: 'Magst du das Meer?|Tu aimes la mer ?', ok: 'Ja, ich mag das Meer sehr|Oui, j\'aime beaucoup la mer', bad: ['Es ist fünf Uhr|Il est cinq heures', 'Ich komme aus Frankreich|Je viens de France'] },
      { npc: 'Willst du schwimmen?|Tu veux nager ?', ok: 'Ja, los geht\'s!|Oui, allons-y !', bad: ['Ich bin Student|Je suis étudiant', 'Wo ist der Bahnhof?|Où est la gare ?'] },
      { npc: 'Hast du Durst?|Tu as soif ?', ok: 'Ja, ich möchte Wasser|Oui, je veux de l\'eau', bad: ['Morgen|Demain', 'Freut mich|Enchanté(e)'] },
      { npc: 'Hier ist Wasser|Voici de l\'eau', ok: 'Danke|Merci', bad: ['Bitte schön|De rien', 'Auf Wiedersehen|Au revoir'] },
      { npc: 'Gehen wir? Es ist spät|On rentre ? Il est tard', ok: 'Gut, bis morgen|D\'accord, à demain', bad: ['Guten Tag|Bonjour', 'Was kostet das?|Combien ça coûte ?'] },
    ],
  },
  {
    id: 'de-C19', title: 'Chez un ami', scene: 'house', npcRole: 'ton hôte',
    situation: 'Un ami t\'invite chez lui. Remercie, accepte une boisson et goûte ce qu\'il t\'offre.',
    key: ['das Haus|la maison|img:house', 'der Tee|le thé|img:tea', 'das Brot|le pain|img:bread', 'der Honig|le miel|img:honey'],
    turns: [
      { npc: 'Willkommen bei mir zu Hause!|Bienvenue chez moi !', ok: 'Danke, dein Haus ist schön|Merci, ta maison est belle', bad: ['Auf Wiedersehen|Au revoir', 'Ich verstehe nicht|Je ne comprends pas'] },
      { npc: 'Komm herein und setz dich|Entre et assieds-toi', ok: 'Vielen Dank|Merci beaucoup', bad: ['Wo ist der Bahnhof?|Où est la gare ?', 'Bitte schön|De rien'] },
      { npc: 'Möchtest du Tee oder Kaffee?|Tu veux du thé ou du café ?', ok: 'Tee, bitte|Du thé, s\'il te plaît', bad: ['Ich komme aus Frankreich|Je viens de France', 'Auf Wiedersehen|Au revoir'] },
      { npc: 'Hast du Hunger?|Tu as faim ?', ok: 'Ein bisschen, danke|Un peu, merci', bad: ['Ja, es ist sehr heiß|Oui, il fait très chaud', 'Ich heiße Karim|Je m\'appelle Karim'] },
      { npc: 'Hier sind Brot und Honig|Voici du pain et du miel', ok: 'Das schmeckt sehr gut!|C\'est très bon !', bad: ['Wo ist die Milch?|Où est le lait ?', 'Guten Tag|Bonjour'] },
      { npc: 'Komm bald wieder!|Reviens bientôt !', ok: 'Gern, danke für alles|Avec plaisir, merci pour tout', bad: ['Was kostet das?|Combien ça coûte ?', 'Freut mich|Enchanté(e)'] },
    ],
  },
  {
    id: 'de-C20', level: 'intermediate', title: 'En taxi', scene: 'taxi', npcRole: 'le chauffeur de taxi',
    situation: 'Tu prends un taxi pour l\'aéroport. Dis ta destination, bavarde un peu et paie la course.',
    key: ['das Taxi|le taxi|img:taxi', 'der Flughafen|l\'aéroport|img:airport', 'der Koffer|la valise|img:suitcase', 'die Fahrkarte|le billet|img:ticket'],
    turns: [
      { npc: 'Guten Tag, wohin fahren Sie?|Bonjour, où allez-vous ?', ok: 'Zum Flughafen, bitte|À l\'aéroport, s\'il vous plaît', bad: ['Ich heiße Karim|Je m\'appelle Karim', 'Tee, bitte|Du thé, s\'il te plaît'] },
      { npc: 'Das dauert zwanzig Minuten|C\'est à vingt minutes', ok: 'In Ordnung|D\'accord', bad: ['Freut mich|Enchanté(e)', 'Wo ist die Milch?|Où est le lait ?'] },
      { npc: 'Sind Sie auf Reisen?|Vous êtes en voyage ?', ok: 'Ja, ich komme aus Frankreich|Oui, je viens de France', bad: ['Ja, es ist sehr heiß|Oui, il fait très chaud', 'Auf Wiedersehen|Au revoir'] },
      { npc: 'Wir sind da|Nous sommes arrivés', ok: 'Halten Sie bitte hier an|Arrêtez-vous ici, s\'il vous plaît', bad: ['Guten Tag|Bonjour', 'Was kostet das?|Combien ça coûte ?'] },
      { npc: 'Das macht fünfzehn Euro|Ça fait quinze euros', ok: 'Stimmt so|Voilà, gardez la monnaie', bad: ['Ich verstehe nicht|Je ne comprends pas', 'Auf Wiedersehen|Au revoir'] },
      { npc: 'Gute Reise!|Bon voyage !', ok: 'Danke, auf Wiedersehen|Merci, au revoir', bad: ['Guten Tag|Bonjour', 'Wo ist der Bahnhof?|Où est la gare ?'] },
    ],
  },
];
