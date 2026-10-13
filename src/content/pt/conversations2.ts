import type { ConvSpec } from '../conversations';

// ─── PT — conversations guidées C17 à C20 (supermarché, plage, chez un ami, taxi) ───
// Générées depuis une table de phrases communes à 11 langues. À faire relire par un locuteur natif.

export const PT_CONVERSATIONS2: ConvSpec[] = [
  {
    id: 'pt-C17', title: 'Au supermarché', scene: 'supermarket', npcRole: 'l\'employé du magasin',
    situation: 'Tu fais tes courses. Demande où est le lait, réponds à l\'employé et paie.',
    key: ['o leite|le lait|img:milk', 'o pão|le pain|img:bread', 'a maçã|la pomme|img:apple', 'a sacola|le sac|img:bag'],
    turns: [
      { npc: 'Bom dia, posso ajudar?|Bonjour, je peux vous aider ?', ok: 'Onde está o leite?|Où est le lait ?', bad: ['Adeus|Au revoir', 'Obrigado|Merci'] },
      { npc: 'O leite está ali, à direita|Le lait est là-bas, à droite', ok: 'Muito obrigado|Merci beaucoup', bad: ['Bom dia|Bonjour', 'Sou da França|Je viens de France'] },
      { npc: 'Quer mais alguma coisa?|Voulez-vous autre chose ?', ok: 'Sim, pão e maçãs|Oui, du pain et des pommes', bad: ['Prazer|Enchanté(e)', 'Amanhã|Demain'] },
      { npc: 'Quer uma sacola?|Voulez-vous un sac ?', ok: 'Sim, por favor|Oui, s\'il vous plaît', bad: ['Não entendo|Je ne comprends pas', 'Adeus|Au revoir'] },
      { npc: 'São dez euros|Ça fait dix euros', ok: 'Aqui está|Voilà, tenez', bad: ['Como vai?|Comment vas-tu ?', 'Não entendo|Je ne comprends pas'] },
      { npc: 'Tenha um bom dia!|Bonne journée !', ok: 'Obrigado, igualmente|Merci, à vous aussi', bad: ['Não entendo|Je ne comprends pas', 'Bom dia|Bonjour'] },
    ],
  },
  {
    id: 'pt-C18', title: 'À la plage', scene: 'beach', npcRole: 'un ami',
    situation: 'Tu passes la journée à la plage avec un ami. Parle du temps, de la mer et de l\'eau.',
    key: ['a praia|la plage|img:beach', 'o mar|la mer|img:sea', 'o sol|le soleil|img:sun', 'a água|l\'eau|img:water'],
    turns: [
      { npc: 'Hoje está um dia bonito|Il fait beau aujourd\'hui', ok: 'Sim, está muito calor|Oui, il fait très chaud', bad: ['Chamo-me Karim|Je m\'appelle Karim', 'Adeus|Au revoir'] },
      { npc: 'Gostas do mar?|Tu aimes la mer ?', ok: 'Sim, gosto muito do mar|Oui, j\'aime beaucoup la mer', bad: ['São cinco horas|Il est cinq heures', 'Sou da França|Je viens de France'] },
      { npc: 'Queres nadar?|Tu veux nager ?', ok: 'Sim, vamos!|Oui, allons-y !', bad: ['Sou estudante|Je suis étudiant', 'Onde fica a estação?|Où est la gare ?'] },
      { npc: 'Tens sede?|Tu as soif ?', ok: 'Sim, quero água|Oui, je veux de l\'eau', bad: ['Amanhã|Demain', 'Prazer|Enchanté(e)'] },
      { npc: 'Aqui tens água|Voici de l\'eau', ok: 'Obrigado|Merci', bad: ['De nada|De rien', 'Adeus|Au revoir'] },
      { npc: 'Vamos embora? Já é tarde|On rentre ? Il est tard', ok: 'Combinado, até amanhã|D\'accord, à demain', bad: ['Bom dia|Bonjour', 'Quanto custa?|Combien ça coûte ?'] },
    ],
  },
  {
    id: 'pt-C19', title: 'Chez un ami', scene: 'house', npcRole: 'ton hôte',
    situation: 'Un ami t\'invite chez lui. Remercie, accepte une boisson et goûte ce qu\'il t\'offre.',
    key: ['a casa|la maison|img:house', 'o chá|le thé|img:tea', 'o pão|le pain|img:bread', 'o mel|le miel|img:honey'],
    turns: [
      { npc: 'Bem-vindo à minha casa!|Bienvenue chez moi !', ok: 'Obrigado, a tua casa é bonita|Merci, ta maison est belle', bad: ['Adeus|Au revoir', 'Não entendo|Je ne comprends pas'] },
      { npc: 'Entra e senta-te|Entre et assieds-toi', ok: 'Muito obrigado|Merci beaucoup', bad: ['Onde fica a estação?|Où est la gare ?', 'De nada|De rien'] },
      { npc: 'Queres chá ou café?|Tu veux du thé ou du café ?', ok: 'Chá, por favor|Du thé, s\'il te plaît', bad: ['Sou da França|Je viens de France', 'Adeus|Au revoir'] },
      { npc: 'Tens fome?|Tu as faim ?', ok: 'Um pouco, obrigado|Un peu, merci', bad: ['Sim, está muito calor|Oui, il fait très chaud', 'Chamo-me Karim|Je m\'appelle Karim'] },
      { npc: 'Aqui tens pão e mel|Voici du pain et du miel', ok: 'Está muito bom!|C\'est très bon !', bad: ['Onde está o leite?|Où est le lait ?', 'Bom dia|Bonjour'] },
      { npc: 'Volta em breve!|Reviens bientôt !', ok: 'Com prazer, obrigado por tudo|Avec plaisir, merci pour tout', bad: ['Quanto custa?|Combien ça coûte ?', 'Prazer|Enchanté(e)'] },
    ],
  },
  {
    id: 'pt-C20', level: 'intermediate', title: 'En taxi', scene: 'taxi', npcRole: 'le chauffeur de taxi',
    situation: 'Tu prends un taxi pour l\'aéroport. Dis ta destination, bavarde un peu et paie la course.',
    key: ['o táxi|le taxi|img:taxi', 'o aeroporto|l\'aéroport|img:airport', 'a mala|la valise|img:suitcase', 'o bilhete|le billet|img:ticket'],
    turns: [
      { npc: 'Bom dia, para onde vai?|Bonjour, où allez-vous ?', ok: 'Ao aeroporto, por favor|À l\'aéroport, s\'il vous plaît', bad: ['Chamo-me Karim|Je m\'appelle Karim', 'Chá, por favor|Du thé, s\'il te plaît'] },
      { npc: 'Demora vinte minutos|C\'est à vingt minutes', ok: 'Está bem|D\'accord', bad: ['Prazer|Enchanté(e)', 'Onde está o leite?|Où est le lait ?'] },
      { npc: 'Está de viagem?|Vous êtes en voyage ?', ok: 'Sim, sou da França|Oui, je viens de France', bad: ['Sim, está muito calor|Oui, il fait très chaud', 'Adeus|Au revoir'] },
      { npc: 'Chegámos|Nous sommes arrivés', ok: 'Pare aqui, por favor|Arrêtez-vous ici, s\'il vous plaît', bad: ['Bom dia|Bonjour', 'Quanto custa?|Combien ça coûte ?'] },
      { npc: 'São quinze euros|Ça fait quinze euros', ok: 'Tome, fique com o troco|Voilà, gardez la monnaie', bad: ['Não entendo|Je ne comprends pas', 'Adeus|Au revoir'] },
      { npc: 'Boa viagem!|Bon voyage !', ok: 'Obrigado, adeus|Merci, au revoir', bad: ['Bom dia|Bonjour', 'Onde fica a estação?|Où est la gare ?'] },
    ],
  },
];
