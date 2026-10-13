import type { ConvSpec } from '../conversations';

// ─── EN — conversations guidées C17 à C20 (supermarché, plage, chez un ami, taxi) ───
// Générées depuis une table de phrases communes à 11 langues. À faire relire par un locuteur natif.

export const EN_CONVERSATIONS2: ConvSpec[] = [
  {
    id: 'en-C17', title: 'Au supermarché', scene: 'supermarket', npcRole: 'l\'employé du magasin',
    situation: 'Tu fais tes courses. Demande où est le lait, réponds à l\'employé et paie.',
    key: ['the milk|le lait|img:milk', 'the bread|le pain|img:bread', 'the apple|la pomme|img:apple', 'the bag|le sac|img:bag'],
    turns: [
      { npc: 'Hello, can I help you?|Bonjour, je peux vous aider ?', ok: 'Where is the milk?|Où est le lait ?', bad: ['Goodbye|Au revoir', 'Thank you|Merci'] },
      { npc: 'The milk is over there, on the right|Le lait est là-bas, à droite', ok: 'Thank you very much|Merci beaucoup', bad: ['Hello|Bonjour', 'I am from France|Je viens de France'] },
      { npc: 'Would you like anything else?|Voulez-vous autre chose ?', ok: 'Yes, bread and apples|Oui, du pain et des pommes', bad: ['Nice to meet you|Enchanté(e)', 'Tomorrow|Demain'] },
      { npc: 'Would you like a bag?|Voulez-vous un sac ?', ok: 'Yes, please|Oui, s\'il vous plaît', bad: ['I don\'t understand|Je ne comprends pas', 'Goodbye|Au revoir'] },
      { npc: 'That\'s ten euros|Ça fait dix euros', ok: 'Here you go|Voilà, tenez', bad: ['How are you?|Comment vas-tu ?', 'I don\'t understand|Je ne comprends pas'] },
      { npc: 'Have a nice day!|Bonne journée !', ok: 'Thanks, you too|Merci, à vous aussi', bad: ['I don\'t understand|Je ne comprends pas', 'Hello|Bonjour'] },
    ],
  },
  {
    id: 'en-C18', title: 'À la plage', scene: 'beach', npcRole: 'un ami',
    situation: 'Tu passes la journée à la plage avec un ami. Parle du temps, de la mer et de l\'eau.',
    key: ['the beach|la plage|img:beach', 'the sea|la mer|img:sea', 'the sun|le soleil|img:sun', 'the water|l\'eau|img:water'],
    turns: [
      { npc: 'The weather is nice today|Il fait beau aujourd\'hui', ok: 'Yes, it is very hot|Oui, il fait très chaud', bad: ['My name is Karim|Je m\'appelle Karim', 'Goodbye|Au revoir'] },
      { npc: 'Do you like the sea?|Tu aimes la mer ?', ok: 'Yes, I like the sea a lot|Oui, j\'aime beaucoup la mer', bad: ['It is five o\'clock|Il est cinq heures', 'I am from France|Je viens de France'] },
      { npc: 'Do you want to swim?|Tu veux nager ?', ok: 'Yes, let\'s go!|Oui, allons-y !', bad: ['I am a student|Je suis étudiant', 'Where is the station?|Où est la gare ?'] },
      { npc: 'Are you thirsty?|Tu as soif ?', ok: 'Yes, I want some water|Oui, je veux de l\'eau', bad: ['Tomorrow|Demain', 'Nice to meet you|Enchanté(e)'] },
      { npc: 'Here is some water|Voici de l\'eau', ok: 'Thank you|Merci', bad: ['You\'re welcome|De rien', 'Goodbye|Au revoir'] },
      { npc: 'Shall we go home? It is late|On rentre ? Il est tard', ok: 'OK, see you tomorrow|D\'accord, à demain', bad: ['Hello|Bonjour', 'How much is it?|Combien ça coûte ?'] },
    ],
  },
  {
    id: 'en-C19', title: 'Chez un ami', scene: 'house', npcRole: 'ton hôte',
    situation: 'Un ami t\'invite chez lui. Remercie, accepte une boisson et goûte ce qu\'il t\'offre.',
    key: ['the house|la maison|img:house', 'the tea|le thé|img:tea', 'the bread|le pain|img:bread', 'the honey|le miel|img:honey'],
    turns: [
      { npc: 'Welcome to my home!|Bienvenue chez moi !', ok: 'Thanks, your house is lovely|Merci, ta maison est belle', bad: ['Goodbye|Au revoir', 'I don\'t understand|Je ne comprends pas'] },
      { npc: 'Come in and sit down|Entre et assieds-toi', ok: 'Thank you very much|Merci beaucoup', bad: ['Where is the station?|Où est la gare ?', 'You\'re welcome|De rien'] },
      { npc: 'Would you like tea or coffee?|Tu veux du thé ou du café ?', ok: 'Tea, please|Du thé, s\'il te plaît', bad: ['I am from France|Je viens de France', 'Goodbye|Au revoir'] },
      { npc: 'Are you hungry?|Tu as faim ?', ok: 'A little, thanks|Un peu, merci', bad: ['Yes, it is very hot|Oui, il fait très chaud', 'My name is Karim|Je m\'appelle Karim'] },
      { npc: 'Here is some bread and honey|Voici du pain et du miel', ok: 'It is very good!|C\'est très bon !', bad: ['Where is the milk?|Où est le lait ?', 'Hello|Bonjour'] },
      { npc: 'Come back soon!|Reviens bientôt !', ok: 'With pleasure, thanks for everything|Avec plaisir, merci pour tout', bad: ['How much is it?|Combien ça coûte ?', 'Nice to meet you|Enchanté(e)'] },
    ],
  },
  {
    id: 'en-C20', level: 'intermediate', title: 'En taxi', scene: 'taxi', npcRole: 'le chauffeur de taxi',
    situation: 'Tu prends un taxi pour l\'aéroport. Dis ta destination, bavarde un peu et paie la course.',
    key: ['the taxi|le taxi|img:taxi', 'the airport|l\'aéroport|img:airport', 'the suitcase|la valise|img:suitcase', 'the ticket|le billet|img:ticket'],
    turns: [
      { npc: 'Hello, where are you going?|Bonjour, où allez-vous ?', ok: 'To the airport, please|À l\'aéroport, s\'il vous plaît', bad: ['My name is Karim|Je m\'appelle Karim', 'Tea, please|Du thé, s\'il te plaît'] },
      { npc: 'It is twenty minutes away|C\'est à vingt minutes', ok: 'All right|D\'accord', bad: ['Nice to meet you|Enchanté(e)', 'Where is the milk?|Où est le lait ?'] },
      { npc: 'Are you travelling?|Vous êtes en voyage ?', ok: 'Yes, I am from France|Oui, je viens de France', bad: ['Yes, it is very hot|Oui, il fait très chaud', 'Goodbye|Au revoir'] },
      { npc: 'Here we are|Nous sommes arrivés', ok: 'Stop here, please|Arrêtez-vous ici, s\'il vous plaît', bad: ['Hello|Bonjour', 'How much is it?|Combien ça coûte ?'] },
      { npc: 'That\'s fifteen euros|Ça fait quinze euros', ok: 'Here, keep the change|Voilà, gardez la monnaie', bad: ['I don\'t understand|Je ne comprends pas', 'Goodbye|Au revoir'] },
      { npc: 'Have a good trip!|Bon voyage !', ok: 'Thank you, goodbye|Merci, au revoir', bad: ['Hello|Bonjour', 'Where is the station?|Où est la gare ?'] },
    ],
  },
];
