import type { ConvSpec } from '../conversations';

// ─── ES — conversations guidées A1 (générées depuis la table de phrases communes) ───
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
];
