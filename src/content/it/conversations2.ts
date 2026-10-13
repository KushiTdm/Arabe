import type { ConvSpec } from '../conversations';

// ─── IT — conversations guidées C17 à C20 (supermarché, plage, chez un ami, taxi) ───
// Générées depuis une table de phrases communes à 11 langues. À faire relire par un locuteur natif.

export const IT_CONVERSATIONS2: ConvSpec[] = [
  {
    id: 'it-C17', title: 'Au supermarché', scene: 'supermarket', npcRole: 'l\'employé du magasin',
    situation: 'Tu fais tes courses. Demande où est le lait, réponds à l\'employé et paie.',
    key: ['il latte|le lait|img:milk', 'il pane|le pain|img:bread', 'la mela|la pomme|img:apple', 'la borsa|le sac|img:bag'],
    turns: [
      { npc: 'Buongiorno, posso aiutarla?|Bonjour, je peux vous aider ?', ok: 'Dov\'è il latte?|Où est le lait ?', bad: ['Arrivederci|Au revoir', 'Grazie|Merci'] },
      { npc: 'Il latte è là, a destra|Le lait est là-bas, à droite', ok: 'Grazie mille|Merci beaucoup', bad: ['Buongiorno|Bonjour', 'Sono francese|Je viens de France'] },
      { npc: 'Desidera altro?|Voulez-vous autre chose ?', ok: 'Sì, del pane e delle mele|Oui, du pain et des pommes', bad: ['Piacere|Enchanté(e)', 'Domani|Demain'] },
      { npc: 'Vuole una busta?|Voulez-vous un sac ?', ok: 'Sì, per favore|Oui, s\'il vous plaît', bad: ['Non capisco|Je ne comprends pas', 'Arrivederci|Au revoir'] },
      { npc: 'Sono dieci euro|Ça fait dix euros', ok: 'Ecco a lei|Voilà, tenez', bad: ['Come stai?|Comment vas-tu ?', 'Non capisco|Je ne comprends pas'] },
      { npc: 'Buona giornata!|Bonne journée !', ok: 'Grazie, altrettanto|Merci, à vous aussi', bad: ['Non capisco|Je ne comprends pas', 'Buongiorno|Bonjour'] },
    ],
  },
  {
    id: 'it-C18', title: 'À la plage', scene: 'beach', npcRole: 'un ami',
    situation: 'Tu passes la journée à la plage avec un ami. Parle du temps, de la mer et de l\'eau.',
    key: ['la spiaggia|la plage|img:beach', 'il mare|la mer|img:sea', 'il sole|le soleil|img:sun', 'l\'acqua|l\'eau|img:water'],
    turns: [
      { npc: 'Oggi c\'è bel tempo|Il fait beau aujourd\'hui', ok: 'Sì, fa molto caldo|Oui, il fait très chaud', bad: ['Mi chiamo Karim|Je m\'appelle Karim', 'Arrivederci|Au revoir'] },
      { npc: 'Ti piace il mare?|Tu aimes la mer ?', ok: 'Sì, mi piace molto il mare|Oui, j\'aime beaucoup la mer', bad: ['Sono le cinque|Il est cinq heures', 'Sono francese|Je viens de France'] },
      { npc: 'Vuoi nuotare?|Tu veux nager ?', ok: 'Sì, andiamo!|Oui, allons-y !', bad: ['Sono uno studente|Je suis étudiant', 'Dov\'è la stazione?|Où est la gare ?'] },
      { npc: 'Hai sete?|Tu as soif ?', ok: 'Sì, voglio dell\'acqua|Oui, je veux de l\'eau', bad: ['Domani|Demain', 'Piacere|Enchanté(e)'] },
      { npc: 'Ecco dell\'acqua|Voici de l\'eau', ok: 'Grazie|Merci', bad: ['Prego|De rien', 'Arrivederci|Au revoir'] },
      { npc: 'Torniamo? È tardi|On rentre ? Il est tard', ok: 'D\'accordo, a domani|D\'accord, à demain', bad: ['Buongiorno|Bonjour', 'Quanto costa?|Combien ça coûte ?'] },
    ],
  },
  {
    id: 'it-C19', title: 'Chez un ami', scene: 'house', npcRole: 'ton hôte',
    situation: 'Un ami t\'invite chez lui. Remercie, accepte une boisson et goûte ce qu\'il t\'offre.',
    key: ['la casa|la maison|img:house', 'il tè|le thé|img:tea', 'il pane|le pain|img:bread', 'il miele|le miel|img:honey'],
    turns: [
      { npc: 'Benvenuto a casa mia!|Bienvenue chez moi !', ok: 'Grazie, la tua casa è bella|Merci, ta maison est belle', bad: ['Arrivederci|Au revoir', 'Non capisco|Je ne comprends pas'] },
      { npc: 'Entra e siediti|Entre et assieds-toi', ok: 'Grazie mille|Merci beaucoup', bad: ['Dov\'è la stazione?|Où est la gare ?', 'Prego|De rien'] },
      { npc: 'Vuoi un tè o un caffè?|Tu veux du thé ou du café ?', ok: 'Un tè, per favore|Du thé, s\'il te plaît', bad: ['Sono francese|Je viens de France', 'Arrivederci|Au revoir'] },
      { npc: 'Hai fame?|Tu as faim ?', ok: 'Un po\', grazie|Un peu, merci', bad: ['Sì, fa molto caldo|Oui, il fait très chaud', 'Mi chiamo Karim|Je m\'appelle Karim'] },
      { npc: 'Ecco del pane e del miele|Voici du pain et du miel', ok: 'È molto buono!|C\'est très bon !', bad: ['Dov\'è il latte?|Où est le lait ?', 'Buongiorno|Bonjour'] },
      { npc: 'Torna presto!|Reviens bientôt !', ok: 'Volentieri, grazie di tutto|Avec plaisir, merci pour tout', bad: ['Quanto costa?|Combien ça coûte ?', 'Piacere|Enchanté(e)'] },
    ],
  },
  {
    id: 'it-C20', level: 'intermediate', title: 'En taxi', scene: 'taxi', npcRole: 'le chauffeur de taxi',
    situation: 'Tu prends un taxi pour l\'aéroport. Dis ta destination, bavarde un peu et paie la course.',
    key: ['il taxi|le taxi|img:taxi', 'l\'aeroporto|l\'aéroport|img:airport', 'la valigia|la valise|img:suitcase', 'il biglietto|le billet|img:ticket'],
    turns: [
      { npc: 'Buongiorno, dove va?|Bonjour, où allez-vous ?', ok: 'All\'aeroporto, per favore|À l\'aéroport, s\'il vous plaît', bad: ['Mi chiamo Karim|Je m\'appelle Karim', 'Un tè, per favore|Du thé, s\'il te plaît'] },
      { npc: 'Ci vogliono venti minuti|C\'est à vingt minutes', ok: 'D\'accordo|D\'accord', bad: ['Piacere|Enchanté(e)', 'Dov\'è il latte?|Où est le lait ?'] },
      { npc: 'È in viaggio?|Vous êtes en voyage ?', ok: 'Sì, sono francese|Oui, je viens de France', bad: ['Sì, fa molto caldo|Oui, il fait très chaud', 'Arrivederci|Au revoir'] },
      { npc: 'Siamo arrivati|Nous sommes arrivés', ok: 'Si fermi qui, per favore|Arrêtez-vous ici, s\'il vous plaît', bad: ['Buongiorno|Bonjour', 'Quanto costa?|Combien ça coûte ?'] },
      { npc: 'Sono quindici euro|Ça fait quinze euros', ok: 'Tenga il resto|Voilà, gardez la monnaie', bad: ['Non capisco|Je ne comprends pas', 'Arrivederci|Au revoir'] },
      { npc: 'Buon viaggio!|Bon voyage !', ok: 'Grazie, arrivederci|Merci, au revoir', bad: ['Buongiorno|Bonjour', 'Dov\'è la stazione?|Où est la gare ?'] },
    ],
  },
];
