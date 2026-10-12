import type { ConvSpec } from '../conversations';

// ─── PT — conversations guidées A1 (générées depuis la table de phrases communes) ───
// À faire relire par un locuteur natif.

export const PT_CONVERSATIONS: ConvSpec[] = [
  {
    id: 'pt-C1', title: 'Rencontre', scene: 'handshake', npcRole: 'une personne que tu rencontres',
    situation: 'Tu rencontres quelqu\'un pour la première fois. Salue, présente-toi, réponds à ses questions.',
    key: ['Bom dia|Bonjour (le matin)', 'Meu nome é Ana|Je m\'appelle Anna', 'Sou da França|Je viens de France', 'Prazer|Enchanté(e)'],
    turns: [
      { npc: 'Bom dia|Bonjour (le matin)', ok: 'Bom dia|Bonjour (le matin)', bad: ['Boa noite|Bonne nuit', 'Tchau|Au revoir'] },
      { npc: 'Como você se chama?|Comment t\'appelles-tu ?', ok: 'Meu nome é Ana|Je m\'appelle Anna', bad: ['Tudo bem, obrigado|Je vais bien, merci', 'Sou da França|Je viens de France'] },
      { npc: 'De onde você é?|D\'où viens-tu ?', ok: 'Sou da França|Je viens de France', bad: ['Meu nome é Ana|Je m\'appelle Anna', 'Obrigado|Merci'] },
      { npc: 'Prazer|Enchanté(e)', ok: 'Prazer|Enchanté(e)', bad: ['Não entendo|Je ne comprends pas', 'De nada|De rien'] },
      { npc: 'Como vai você?|Comment vas-tu ?', ok: 'Tudo bem, obrigado|Je vais bien, merci', bad: ['Bom dia|Bonjour (le matin)', 'Onde fica o hospital?|Où est l\'hôpital ?'] },
      { npc: 'Tchau|Au revoir', ok: 'Até logo|À bientôt', bad: ['Bom dia|Bonjour (le matin)', 'Sim|Oui'] },
    ],
  },
  {
    id: 'pt-C2', title: 'Au café', scene: 'coffee', npcRole: 'le serveur',
    situation: 'Tu entres dans un café. Commande une boisson, réponds au serveur, paie.',
    key: ['o café|café|img:coffee', 'o chá|thé|img:tea', 'a água|eau|img:water', 'o suco|jus|img:juice'],
    turns: [
      { npc: 'Oi, o que você quer?|Bonjour, que veux-tu ?', ok: 'Eu queria um café, por favor|Je voudrais un café, s\'il vous plaît|img:coffee', bad: ['Onde fica o hospital?|Où est l\'hôpital ?', 'Tchau|Au revoir'] },
      { npc: 'Mais alguma coisa?|Autre chose ?', ok: 'Não, obrigado|Non, merci', bad: ['Meu nome é Ana|Je m\'appelle Anna', 'Até logo|À bientôt'] },
      { npc: 'São três euros|Ça fait trois euros|img:money', ok: 'Aqui está|Voilà', bad: ['Quanto custa?|Combien ça coûte ?', 'Eu gosto de café|J\'aime le café'] },
      { npc: 'Obrigado|Merci', ok: 'De nada|De rien', bad: ['Não entendo|Je ne comprends pas', 'Sim|Oui'] },
    ],
  },
  {
    id: 'pt-C3', title: 'Au marché', scene: 'market', npcRole: 'le vendeur',
    situation: 'Tu fais tes courses au marché. Demande ce que tu veux, le prix, et paie.',
    key: ['o pão|pain|img:bread', 'os ovos|œufs|img:eggs', 'o peixe|poisson|img:fish', 'o dinheiro|argent|img:money'],
    turns: [
      { npc: 'Oi, o que deseja?|Bonjour, que désirez-vous ?', ok: 'Eu quero pão|Je veux du pain|img:bread', bad: ['Tchau|Au revoir', 'Onde fica o hospital?|Où est l\'hôpital ?'] },
      { npc: 'Quantos você quer?|Combien en voulez-vous ?', ok: 'Dois, por favor|Deux, s\'il vous plaît', bad: ['Bom dia|Bonjour (le matin)', 'Boa noite|Bonne nuit'] },
      { npc: 'Aqui está|Voilà', ok: 'Quanto custa?|Combien ça coûte ?', bad: ['Não entendo|Je ne comprends pas', 'Meu nome é Ana|Je m\'appelle Anna'] },
      { npc: 'São cinco euros|Ça fait cinq euros|img:money', ok: 'Aqui está|Voilà', bad: ['Dois, por favor|Deux, s\'il vous plaît', 'Sim|Oui'] },
      { npc: 'Obrigado, tchau|Merci, au revoir', ok: 'Tchau|Au revoir', bad: ['Bom dia|Bonjour (le matin)', 'Boa noite|Bonne nuit'] },
    ],
  },
  {
    id: 'pt-C4', title: 'Demander son chemin', scene: 'street', npcRole: 'un passant',
    situation: 'Tu cherches l\'hôpital. Demande ton chemin et comprends la réponse.',
    key: ['o hospital|hôpital|img:hospital', 'a rua|rue|img:street', 'a escola|école|img:school', 'o mercado|marché|img:market'],
    turns: [
      { npc: 'Precisa de ajuda?|Avez-vous besoin d\'aide ?', ok: 'Sim, onde fica o hospital?|Oui, où est l\'hôpital ?|img:hospital', bad: ['Tchau|Au revoir', 'Meu nome é Ana|Je m\'appelle Anna'] },
      { npc: 'Siga em frente e depois à esquerda|Tout droit puis à gauche', ok: 'É longe?|Est-ce loin ?', bad: ['Sou da França|Je viens de France', 'Eu quero pão|Je veux du pain|img:bread'] },
      { npc: 'Não, fica perto|Non, c\'est près', ok: 'Obrigado|Merci', bad: ['Não entendo|Je ne comprends pas', 'Dois, por favor|Deux, s\'il vous plaît'] },
      { npc: 'De nada|De rien', ok: 'Tchau|Au revoir', bad: ['Eu queria um café, por favor|Je voudrais un café, s\'il vous plaît|img:coffee', 'Bom dia|Bonjour (le matin)'] },
    ],
  },
];
