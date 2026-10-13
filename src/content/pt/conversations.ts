import type { ConvSpec } from '../conversations';

// ─── PT — conversations guidées (générées depuis la table de phrases communes) ───
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
  {
    id: 'pt-C5', title: 'Ma famille', scene: '👨‍👩‍👧', npcRole: 'un ami',
    situation: 'Un ami regarde tes photos de famille. Dis qui est sur chaque photo.',
    key: ['o pai|père|img:father', 'a mãe|mère|img:mother', 'o irmão|frère|img:brother', 'a irmã|sœur|img:sister'],
    turns: [
      { npc: 'Quem é?|Qui est-ce ?', img: 'father', ok: 'É o meu pai|C\'est mon père', bad: ['É o meu irmão|C\'est mon frère', 'É a minha mãe|C\'est ma mère'] },
      { npc: 'Quem é?|Qui est-ce ?', img: 'mother', ok: 'É a minha mãe|C\'est ma mère', bad: ['É a minha irmã|C\'est ma sœur', 'É o meu pai|C\'est mon père'] },
      { npc: 'Quem é?|Qui est-ce ?', img: 'sister', ok: 'É a minha irmã|C\'est ma sœur', bad: ['É a minha mãe|C\'est ma mère', 'É o meu irmão|C\'est mon frère'] },
      { npc: 'Quem é?|Qui est-ce ?', img: 'brother', ok: 'É o meu irmão|C\'est mon frère', bad: ['É o meu pai|C\'est mon père', 'É a minha irmã|C\'est ma sœur'] },
      { npc: 'Tens irmãos?|As-tu des frères et sœurs ?', ok: 'Tenho um irmão e uma irmã|J\'ai un frère et une sœur', bad: ['Sou estudante|Je suis étudiant', 'Quero água|Je veux de l\'eau'] },
    ],
  },
  {
    id: 'pt-C6', level: 'intermediate', title: 'Au restaurant', scene: 'fish', npcRole: 'le serveur',
    situation: 'Tu dînes au restaurant. Commande un plat et une boisson, donne ton avis, demande l\'addition.',
    key: ['o peixe|poisson|img:fish', 'o suco|jus|img:juice', 'delicioso|délicieux', 'a conta|l\'addition|img:money'],
    turns: [
      { npc: 'Bem-vindo|Bienvenue', ok: 'Olá|Bonjour', bad: ['A conta, por favor|L\'addition, s\'il vous plaît', 'Tchau|Au revoir'] },
      { npc: 'O que queres comer?|Que veux-tu manger ?', ok: 'Queria peixe|Je voudrais du poisson|img:fish', bad: ['Sou estudante|Je suis étudiant', 'Amanhã|Demain'] },
      { npc: 'E o que queres beber?|Et que veux-tu boire ?', ok: 'Prefiro o sumo|Je préfère le jus|img:juice', bad: ['Meu nome é Ana|Je m\'appelle Anna', 'Perdi a minha mala|J\'ai perdu mon sac'] },
      { npc: 'Está bom?|Est-ce que c\'est bon ?', ok: 'Sim, está muito bom|Oui, c\'est très bon', bad: ['Não entendo|Je ne comprends pas', 'à direita|à droite'] },
      { npc: 'Mais alguma coisa?|Autre chose ?', ok: 'Não, a conta, por favor|Non, l\'addition, s\'il vous plaît', bad: ['Eu gosto de café|J\'aime le café', 'Onde ficam as casas de banho?|Où sont les toilettes ?'] },
    ],
  },
  {
    id: 'pt-C7', level: 'intermediate', title: 'À l\'université', scene: 'university', npcRole: 'le professeur',
    situation: 'C\'est ton premier jour à l\'université. Réponds à ton professeur et demande où est la bibliothèque.',
    key: ['o professor|professeur|img:teacher', 'o estudante|étudiant|img:student', 'a biblioteca|bibliothèque|img:library', 'a universidade|université|img:university'],
    turns: [
      { npc: 'Bom dia|Bonjour (le matin)', ok: 'Olá|Bonjour', bad: ['Boa noite|Bonsoir', 'De nada|De rien'] },
      { npc: 'És um aluno novo?|Es-tu un nouvel étudiant ?', ok: 'Sim, sou um aluno novo|Oui, je suis un nouvel étudiant|img:student', bad: ['Não entendo|Je ne comprends pas', 'Quanto custa?|Combien ça coûte ?'] },
      { npc: 'O que estudas?|Qu\'étudies-tu ?', ok: 'Estudo línguas|J\'étudie les langues', bad: ['Sou da França|Je viens de France', 'Eu quero pão|Je veux du pain|img:bread'] },
      { npc: 'Tens alguma pergunta?|As-tu une question ?', ok: 'Sim, onde fica a biblioteca?|Oui, où est la bibliothèque ?|img:library', bad: ['Obrigado|Merci', 'Amanhã|Demain'] },
      { npc: 'A biblioteca é perto, sempre em frente|La bibliothèque est près, tout droit', ok: 'Obrigado, professor|Merci, professeur', bad: ['Peço desculpa por este erro|Je m\'excuse pour cette erreur', 'Olá|Bonjour'] },
    ],
  },
  {
    id: 'pt-C8', level: 'intermediate', title: 'Chez le médecin', scene: 'hospital', npcRole: 'le médecin',
    situation: 'Tu ne te sens pas bien. Explique ce que tu as et écoute les conseils du médecin.',
    key: ['o médico|médecin|img:doctor', 'a cabeça|tête|img:head', 'a água|eau|img:water', 'Desde ontem|Depuis hier'],
    turns: [
      { npc: 'Bom dia, qual é o problema?|Bonjour, quel est le problème ?', ok: 'Estou doente|Je suis malade', bad: ['Sou estudante|Je suis étudiant', 'Eu queria um café, por favor|Je voudrais un café, s\'il vous plaît|img:coffee'] },
      { npc: 'Onde te dói?|Où as-tu mal ?', ok: 'Dói-me a cabeça|J\'ai mal à la tête|img:head', bad: ['Sou da França|Je viens de France', 'à esquerda|à gauche'] },
      { npc: 'Desde quando?|Depuis quand ?', ok: 'Desde ontem|Depuis hier', bad: ['Amanhã|Demain', 'Sim|Oui'] },
      { npc: 'Vou dar-te um remédio|Je vais te donner un médicament', ok: 'Obrigado, doutor|Merci, docteur', bad: ['Tchau|Au revoir', 'Onde fica o aeroporto?|Où est l\'aéroport ?'] },
      { npc: 'Bebe muita água|Bois beaucoup d\'eau|img:water', ok: 'Está bem|D\'accord', bad: ['Perdi a minha mala|J\'ai perdu mon sac', 'Quanto custa?|Combien ça coûte ?'] },
    ],
  },
  {
    id: 'pt-C9', level: 'intermediate', title: 'Inviter un ami', scene: 'sunset', npcRole: 'un ami',
    situation: 'Un ami te propose de sortir. Accepte, fixe l\'heure et le lieu.',
    key: ['amanhã|demain', 'o café|le café|img:coffee', 'as cinco|cinq heures|img:clock', 'Até logo|À bientôt'],
    turns: [
      { npc: 'Boa noite|Bonsoir', ok: 'Boa noite|Bonsoir', bad: ['Bom dia|Bonjour (le matin)', 'De nada|De rien'] },
      { npc: 'Queres sair amanhã?|Veux-tu qu\'on sorte demain ?', ok: 'Sim, com prazer|Oui, avec plaisir', bad: ['Não entendo|Je ne comprends pas', 'Estou doente|Je suis malade'] },
      { npc: 'Onde nos encontramos?|Où se retrouve-t-on ?', ok: 'No café|Au café|img:coffee', bad: ['Sou estudante|Je suis étudiant', 'Meu nome é Ana|Je m\'appelle Anna'] },
      { npc: 'A que horas?|À quelle heure ?', ok: 'Às cinco|À cinq heures|img:clock', bad: ['à direita|à droite', 'Quero chá|Je veux du thé'] },
      { npc: 'Combinado|C\'est entendu', ok: 'Até logo|À bientôt', bad: ['Olá|Bonjour', 'Quanto custa?|Combien ça coûte ?'] },
    ],
  },
  {
    id: 'pt-C10', level: 'advanced', title: 'Donner son avis sur une ville', scene: 'city', npcRole: 'un ami',
    situation: 'Un ami te demande ce que tu penses de sa ville. Donne ton avis et justifie-le.',
    key: ['a cidade|ville|img:city', 'bonito|beau', 'porque|parce que', 'mas|mais'],
    turns: [
      { npc: 'O que achas desta cidade?|Que penses-tu de cette ville ?', ok: 'Acho que a cidade é bonita|Je pense que la ville est belle|img:city', bad: ['Sou da França|Je viens de France', 'Tchau|Au revoir'] },
      { npc: 'Porquê?|Pourquoi ?', ok: 'Porque é limpa e calma|Parce qu\'elle est propre et calme', bad: ['Amanhã|Demain', 'Meu nome é Ana|Je m\'appelle Anna'] },
      { npc: 'Mas é cara|Mais elle est chère', ok: 'Concordo, mas gosto dela|Je suis d\'accord, mais je l\'aime', bad: ['Não entendo|Je ne comprends pas', 'Obrigado|Merci'] },
      { npc: 'Vais visitá-la outra vez?|La visiteras-tu encore ?', ok: 'Sim, vou visitá-la outra vez|Oui, je la visiterai encore', bad: ['Estou doente|Je suis malade', 'à esquerda|à gauche'] },
    ],
  },
  {
    id: 'pt-C11', level: 'advanced', title: 'Une réclamation', scene: 'money', npcRole: 'l\'employé',
    situation: 'Ton appareil ne marche pas. Explique le problème et demande une réparation ou un dédommagement.',
    key: ['o problema|problème', 'o aparelho|l\'appareil', 'a indemnização|dédommagement', 'o diretor|directeur'],
    turns: [
      { npc: 'Em que posso ajudá-lo?|Comment puis-je t\'aider ?', ok: 'Tenho um problema|J\'ai un problème', bad: ['Olá|Bonjour', 'Sou estudante|Je suis étudiant'] },
      { npc: 'Qual é o problema?|Quel est le problème ?', ok: 'O aparelho não funciona|L\'appareil ne fonctionne pas', bad: ['Meu nome é Ana|Je m\'appelle Anna', 'Eu queria um café, por favor|Je voudrais un café, s\'il vous plaît|img:coffee'] },
      { npc: 'Desde quando?|Depuis quand ?', ok: 'Desde ontem|Depuis hier', bad: ['Sim|Oui', 'à direita|à droite'] },
      { npc: 'Peço desculpa por este erro|Je m\'excuse pour cette erreur', ok: 'Peço-lhe que o repare|Je vous prie de le réparer', bad: ['Tchau|Au revoir', 'Não entendo|Je ne comprends pas'] },
      { npc: 'Vou repará-lo amanhã|Je le réparerai demain', ok: 'Obrigado a si|Merci à vous', bad: ['Onde ficam as casas de banho?|Où sont les toilettes ?', 'Estou doente|Je suis malade'] },
    ],
  },
  {
    id: 'pt-C12', level: 'advanced', title: 'Un exposé en classe', scene: 'teacher', npcRole: 'le professeur',
    situation: 'Tu présentes un court exposé. Ouvre, argumente, conclus et remercie.',
    key: ['o tema|sujet', 'por exemplo|par exemple', 'para concluir|pour conclure', 'a pergunta|question'],
    turns: [
      { npc: 'Faça favor de começar|Je vous en prie, commencez', ok: 'O meu tema é a aprendizagem de línguas|Mon sujet est l\'apprentissage des langues', bad: ['Obrigado pela vossa atenção|Merci de votre attention', 'Tchau|Au revoir'] },
      { npc: 'Porquê este tema?|Pourquoi ce sujet ?', ok: 'Porque é importante|Parce qu\'il est important', bad: ['Eu quero pão|Je veux du pain|img:bread', 'Amanhã|Demain'] },
      { npc: 'Tens um exemplo?|As-tu un exemple ?', ok: 'Sim, por exemplo as viagens|Oui, par exemple les voyages', bad: ['Não entendo|Je ne comprends pas', 'à direita|à droite'] },
      { npc: 'E para concluir?|Et pour conclure ?', ok: 'Para concluir, aprendo todos os dias|Pour conclure, j\'apprends chaque jour', bad: ['Estou doente|Je suis malade', 'Olá|Bonjour'] },
      { npc: 'Bravo, bom trabalho|Bravo, bon travail', ok: 'Obrigado pela vossa atenção|Merci de votre attention', bad: ['Tenho um irmão e uma irmã|J\'ai un frère et une sœur', 'Quanto custa?|Combien ça coûte ?'] },
    ],
  },
  {
    id: 'pt-C13', title: 'À la gare', scene: 'station', npcRole: 'l\'employé du guichet',
    situation: 'Tu achètes un billet de train à la gare. Dis où tu vas, demande un billet et paie.',
    key: ['a estação|la gare|img:station', 'o bilhete|le billet|img:ticket', 'o comboio|le train|img:train', 'a mala|la valise|img:suitcase'],
    turns: [
      { npc: 'Bom dia, para onde vai?|Bonjour, où allez-vous ?', ok: 'Vou ao centro|Je vais en ville', bad: ['Sou estudante|Je suis étudiant', 'Obrigado|Merci'] },
      { npc: 'Um bilhete ou dois?|Un billet ou deux ?', img: 'ticket', ok: 'Um bilhete, por favor|Un billet, s\'il vous plaît|img:ticket', bad: ['Quero água|Je veux de l\'eau', 'Meu nome é Ana|Je m\'appelle Anna'] },
      { npc: 'São vinte euros|Ça fait vingt euros', ok: 'Aqui está|Voilà', bad: ['Quanto custa?|Combien ça coûte ?', 'Eu gosto de café|J\'aime le café'] },
      { npc: 'O comboio parte às cinco|Le train part à cinq heures', ok: 'Está bem, obrigado|D\'accord, merci', bad: ['Perdi a minha mala|J\'ai perdu mon sac', 'Estou doente|Je suis malade'] },
      { npc: 'Boa viagem!|Bon voyage !', ok: 'Obrigado, tchau|Merci, au revoir', bad: ['Olá|Bonjour', 'Não entendo|Je ne comprends pas'] },
    ],
  },
  {
    id: 'pt-C14', level: 'intermediate', title: 'À l\'hôtel', scene: 'hotel', npcRole: 'le réceptionniste',
    situation: 'Tu arrives à l\'hôtel. Annonce ta réservation, donne ton nom, écoute les consignes.',
    key: ['o hotel|l\'hôtel|img:hotel', 'o quarto|la chambre|img:bed', 'a chave|la clé|img:key', 'o pequeno-almoço|le petit-déjeuner'],
    turns: [
      { npc: 'Boa tarde, bem-vindo ao hotel|Bonjour, bienvenue à l\'hôtel', ok: 'Boa tarde, tenho uma reserva|Bonjour, j\'ai une réservation', bad: ['A conta, por favor|L\'addition, s\'il vous plaît', 'Quero chá|Je veux du thé'] },
      { npc: 'Qual é o seu nome?|Quel est votre nom ?', ok: 'Meu nome é Ana|Je m\'appelle Anna', bad: ['Sou da França|Je viens de France', 'Obrigado|Merci'] },
      { npc: 'Aqui tem a chave do seu quarto|Voici la clé de votre chambre|img:key', img: 'key', ok: 'Obrigado|Merci', bad: ['Tchau|Au revoir', 'Estou doente|Je suis malade'] },
      { npc: 'O pequeno-almoço é às oito|Le petit-déjeuner est à huit heures', ok: 'Perfeito, obrigado|C\'est parfait, merci', bad: ['Perdi a minha mala|J\'ai perdu mon sac', 'à esquerda|à gauche'] },
      { npc: 'Precisa de mais alguma coisa?|Avez-vous besoin d\'autre chose ?', ok: 'Não, obrigado, boa noite|Non, merci, bonne nuit', bad: ['Meu nome é Ana|Je m\'appelle Anna', 'Sou da França|Je viens de France'] },
    ],
  },
  {
    id: 'pt-C15', level: 'intermediate', title: 'Au téléphone', scene: 'phone', npcRole: 'un ami',
    situation: 'Un ami t\'appelle. Réponds, donne des nouvelles et fixe un rendez-vous pour demain.',
    key: ['o telefone|le téléphone|img:phone', 'o número|le numéro', 'amanhã|demain', 'Até logo|À bientôt'],
    turns: [
      { npc: 'Estou?|Allô ?', ok: 'Olá, sou a Ana|Allô, c\'est Anna', bad: ['Obrigado|Merci', 'Sim|Oui'] },
      { npc: 'Como vai você?|Comment vas-tu ?', ok: 'Tudo bem, obrigado|Je vais bien, merci', bad: ['Meu nome é Ana|Je m\'appelle Anna', 'Tchau|Au revoir'] },
      { npc: 'Estás livre amanhã?|Tu es libre demain ?', ok: 'Sim, estou livre|Oui, je suis libre', bad: ['Estou doente|Je suis malade', 'Perdi a minha mala|J\'ai perdu mon sac'] },
      { npc: 'Mando-te a morada por mensagem|Je t\'envoie l\'adresse par message', ok: 'Está bem, obrigado|D\'accord, merci', bad: ['Sou estudante|Je suis étudiant', 'Não entendo|Je ne comprends pas'] },
      { npc: 'Até amanhã!|À demain !', ok: 'Até amanhã!|À demain !', bad: ['Olá|Bonjour', 'Eu gosto de café|J\'aime le café'] },
    ],
  },
  {
    id: 'pt-C16', level: 'intermediate', title: 'À l\'aéroport', scene: 'airport', npcRole: 'l\'agent d\'enregistrement',
    situation: 'Tu enregistres ton vol. Montre ton passeport, dis où tu vas et demande ta porte.',
    key: ['o aeroporto|l\'aéroport|img:airport', 'o passaporte|le passeport', 'a mala|la valise|img:suitcase', 'o avião|l\'avion|img:airplane'],
    turns: [
      { npc: 'O seu passaporte, por favor|Votre passeport, s\'il vous plaît', ok: 'Aqui está o meu passaporte|Voici mon passeport', bad: ['Sou estudante|Je suis étudiant', 'Quanto custa?|Combien ça coûte ?'] },
      { npc: 'Bom dia, para onde vai?|Bonjour, où allez-vous ?', ok: 'Vou para França|Je vais en France', bad: ['Obrigado|Merci', 'Amanhã|Demain'] },
      { npc: 'Tem uma mala?|Avez-vous une valise ?', img: 'suitcase', ok: 'Sim, tenho uma mala|Oui, j\'ai une valise|img:suitcase', bad: ['Eu gosto de café|J\'aime le café', 'Meu nome é Ana|Je m\'appelle Anna'] },
      { npc: 'O avião parte às dez|L\'avion part à dix heures', ok: 'Obrigado, onde fica a porta de embarque?|Merci, où est la porte d\'embarquement ?', bad: ['Perdi a minha mala|J\'ai perdu mon sac', 'Estou doente|Je suis malade'] },
      { npc: 'Bom voo!|Bon vol !', ok: 'Obrigado, tchau|Merci, au revoir', bad: ['Olá|Bonjour', 'Não entendo|Je ne comprends pas'] },
    ],
  },
];
