import type { ConvSpec } from '../conversations';

// ─── ES — conversations guidées C17 à C20 (supermarché, plage, chez un ami, taxi) ───
// Générées depuis une table de phrases communes à 11 langues. À faire relire par un locuteur natif.

export const ES_CONVERSATIONS2: ConvSpec[] = [
  {
    id: 'es-C17', title: 'Au supermarché', scene: 'supermarket', npcRole: 'l\'employé du magasin',
    situation: 'Tu fais tes courses. Demande où est le lait, réponds à l\'employé et paie.',
    key: ['la leche|le lait|img:milk', 'el pan|le pain|img:bread', 'la manzana|la pomme|img:apple', 'la bolsa|le sac|img:bag'],
    turns: [
      { npc: 'Hola, ¿puedo ayudarle?|Bonjour, je peux vous aider ?', ok: '¿Dónde está la leche?|Où est le lait ?', bad: ['Adiós|Au revoir', 'Gracias|Merci'] },
      { npc: 'La leche está allí, a la derecha|Le lait est là-bas, à droite', ok: 'Muchas gracias|Merci beaucoup', bad: ['Hola|Bonjour', 'Soy de Francia|Je viens de France'] },
      { npc: '¿Quiere algo más?|Voulez-vous autre chose ?', ok: 'Sí, pan y manzanas|Oui, du pain et des pommes', bad: ['Mucho gusto|Enchanté(e)', 'Mañana|Demain'] },
      { npc: '¿Quiere una bolsa?|Voulez-vous un sac ?', ok: 'Sí, por favor|Oui, s\'il vous plaît', bad: ['No entiendo|Je ne comprends pas', 'Adiós|Au revoir'] },
      { npc: 'Son diez euros|Ça fait dix euros', ok: 'Aquí tiene|Voilà, tenez', bad: ['¿Cómo estás?|Comment vas-tu ?', 'No entiendo|Je ne comprends pas'] },
      { npc: '¡Que tenga un buen día!|Bonne journée !', ok: 'Gracias, igualmente|Merci, à vous aussi', bad: ['No entiendo|Je ne comprends pas', 'Hola|Bonjour'] },
    ],
  },
  {
    id: 'es-C18', title: 'À la plage', scene: 'beach', npcRole: 'un ami',
    situation: 'Tu passes la journée à la plage avec un ami. Parle du temps, de la mer et de l\'eau.',
    key: ['la playa|la plage|img:beach', 'el mar|la mer|img:sea', 'el sol|le soleil|img:sun', 'el agua|l\'eau|img:water'],
    turns: [
      { npc: 'Hoy hace buen tiempo|Il fait beau aujourd\'hui', ok: 'Sí, hace mucho calor|Oui, il fait très chaud', bad: ['Me llamo Karim|Je m\'appelle Karim', 'Adiós|Au revoir'] },
      { npc: '¿Te gusta el mar?|Tu aimes la mer ?', ok: 'Sí, me gusta mucho el mar|Oui, j\'aime beaucoup la mer', bad: ['Son las cinco|Il est cinq heures', 'Soy de Francia|Je viens de France'] },
      { npc: '¿Quieres nadar?|Tu veux nager ?', ok: '¡Sí, vamos!|Oui, allons-y !', bad: ['Soy estudiante|Je suis étudiant', '¿Dónde está la estación?|Où est la gare ?'] },
      { npc: '¿Tienes sed?|Tu as soif ?', ok: 'Sí, quiero agua|Oui, je veux de l\'eau', bad: ['Mañana|Demain', 'Mucho gusto|Enchanté(e)'] },
      { npc: 'Aquí tienes agua|Voici de l\'eau', ok: 'Gracias|Merci', bad: ['De nada|De rien', 'Adiós|Au revoir'] },
      { npc: '¿Volvemos? Es tarde|On rentre ? Il est tard', ok: 'Vale, hasta mañana|D\'accord, à demain', bad: ['Hola|Bonjour', '¿Cuánto cuesta?|Combien ça coûte ?'] },
    ],
  },
  {
    id: 'es-C19', title: 'Chez un ami', scene: 'house', npcRole: 'ton hôte',
    situation: 'Un ami t\'invite chez lui. Remercie, accepte une boisson et goûte ce qu\'il t\'offre.',
    key: ['la casa|la maison|img:house', 'el té|le thé|img:tea', 'el pan|le pain|img:bread', 'la miel|le miel|img:honey'],
    turns: [
      { npc: '¡Bienvenido a mi casa!|Bienvenue chez moi !', ok: 'Gracias, tu casa es bonita|Merci, ta maison est belle', bad: ['Adiós|Au revoir', 'No entiendo|Je ne comprends pas'] },
      { npc: 'Pasa y siéntate|Entre et assieds-toi', ok: 'Muchas gracias|Merci beaucoup', bad: ['¿Dónde está la estación?|Où est la gare ?', 'De nada|De rien'] },
      { npc: '¿Quieres té o café?|Tu veux du thé ou du café ?', ok: 'Té, por favor|Du thé, s\'il te plaît', bad: ['Soy de Francia|Je viens de France', 'Adiós|Au revoir'] },
      { npc: '¿Tienes hambre?|Tu as faim ?', ok: 'Un poco, gracias|Un peu, merci', bad: ['Sí, hace mucho calor|Oui, il fait très chaud', 'Me llamo Karim|Je m\'appelle Karim'] },
      { npc: 'Aquí tienes pan y miel|Voici du pain et du miel', ok: '¡Está muy rico!|C\'est très bon !', bad: ['¿Dónde está la leche?|Où est le lait ?', 'Hola|Bonjour'] },
      { npc: '¡Vuelve pronto!|Reviens bientôt !', ok: 'Con mucho gusto, gracias por todo|Avec plaisir, merci pour tout', bad: ['¿Cuánto cuesta?|Combien ça coûte ?', 'Mucho gusto|Enchanté(e)'] },
    ],
  },
  {
    id: 'es-C20', level: 'intermediate', title: 'En taxi', scene: 'taxi', npcRole: 'le chauffeur de taxi',
    situation: 'Tu prends un taxi pour l\'aéroport. Dis ta destination, bavarde un peu et paie la course.',
    key: ['el taxi|le taxi|img:taxi', 'el aeropuerto|l\'aéroport|img:airport', 'la maleta|la valise|img:suitcase', 'el billete|le billet|img:ticket'],
    turns: [
      { npc: 'Hola, ¿adónde va?|Bonjour, où allez-vous ?', ok: 'Al aeropuerto, por favor|À l\'aéroport, s\'il vous plaît', bad: ['Me llamo Karim|Je m\'appelle Karim', 'Té, por favor|Du thé, s\'il te plaît'] },
      { npc: 'Tardaremos veinte minutos|C\'est à vingt minutes', ok: 'De acuerdo|D\'accord', bad: ['Mucho gusto|Enchanté(e)', '¿Dónde está la leche?|Où est le lait ?'] },
      { npc: '¿Está de viaje?|Vous êtes en voyage ?', ok: 'Sí, soy de Francia|Oui, je viens de France', bad: ['Sí, hace mucho calor|Oui, il fait très chaud', 'Adiós|Au revoir'] },
      { npc: 'Ya hemos llegado|Nous sommes arrivés', ok: 'Pare aquí, por favor|Arrêtez-vous ici, s\'il vous plaît', bad: ['Hola|Bonjour', '¿Cuánto cuesta?|Combien ça coûte ?'] },
      { npc: 'Son quince euros|Ça fait quinze euros', ok: 'Tome, quédese con el cambio|Voilà, gardez la monnaie', bad: ['No entiendo|Je ne comprends pas', 'Adiós|Au revoir'] },
      { npc: '¡Buen viaje!|Bon voyage !', ok: 'Gracias, adiós|Merci, au revoir', bad: ['Hola|Bonjour', '¿Dónde está la estación?|Où est la gare ?'] },
    ],
  },
];
