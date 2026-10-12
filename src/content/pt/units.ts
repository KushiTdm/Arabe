import type { SimpleUnit } from '../simple';

// ─── Portugais (Brésil) — unités A1 ──────────────────────────────────────────
// Source : programmes/portugais.md. Variante brésilienne (pt-BR). Attention :
// ce n'est PAS la variante du CIPLE (examen de nationalité portugaise).

export const PT_UNITS: SimpleUnit[] = [
  {
    id: 'pt-1', theme: 'greetings', title: 'Saluer et se présenter',
    goal: 'Se présenter avec ser ; entendre les voyelles nasales',
    tip: { title: 'Les voyelles nasales', body: '« Não » (non), « mãe » (mère), « bom » (bon) : la voyelle résonne dans le nez, sans prononcer le « n » comme en français « bon ». Écoute, répète lentement.' },
    phrases: [
      'Oi|Salut|img:handshake', 'Bom dia|Bonjour (matin)|img:sunrise', 'Boa tarde|Bonjour (après-midi)|☀️', 'Boa noite|Bonsoir, bonne nuit|img:sunset',
      'Tchau|Au revoir|👋', 'Até logo|À tout à l\'heure', 'Como você se chama?|Comment t\'appelles-tu ?', 'Meu nome é Ana|Je m\'appelle Ana',
      'Sou da França|Je suis de France|🇫🇷', 'Sou estudante|Je suis étudiant(e)|img:student', 'Como vai você?|Comment vas-tu ?',
      'Tudo bem, obrigado|Ça va bien, merci', 'Prazer|Enchanté(e)', 'Obrigado|Merci (dit par un homme)|🙏', 'De nada|De rien',
    ],
    qa: [['Como você se chama?', 'Meu nome é Ana', 'Tchau', 'Boa noite'], ['Como vai você?', 'Tudo bem, obrigado', 'Tchau', 'Obrigado'], ['Obrigado', 'De nada', 'Oi', 'Tchau']],
  },
  {
    id: 'pt-2', theme: 'numbers', title: 'Nombres et nationalités',
    goal: 'Dire son âge, sa nationalité et épeler son nom',
    tip: { title: 'L\'âge avec « ter »', body: '« Eu tenho vinte anos » = « j\'ai vingt ans » (ter). « Dois » (deux) devient « duas » au féminin : duas casas.' },
    phrases: [
      'um|un (1)|1️⃣', 'dois|deux (2)|2️⃣', 'três|trois (3)|3️⃣', 'quatro|quatre (4)|4️⃣', 'cinco|cinq (5)|5️⃣', 'seis|six (6)|6️⃣',
      'sete|sept (7)|7️⃣', 'oito|huit (8)|8️⃣', 'nove|neuf (9)|9️⃣', 'dez|dix (10)|🔟', 'vinte|vingt (20)', 'cem|cent (100)',
      'Quantos anos você tem?|Quel âge as-tu ?', 'Eu tenho vinte anos|J\'ai vingt ans', 'Qual é o seu telefone?|Quel est ton numéro de téléphone ?|📱',
      'Como se escreve?|Comment ça s\'écrit ?',
    ],
    qa: [['Quantos anos você tem?', 'Eu tenho vinte anos', 'um', 'dez']],
    orders: ['Eu tenho vinte anos', 'Como se escreve?', 'Qual é o seu telefone?'],
  },
  {
    id: 'pt-3', theme: 'family', title: 'Famille',
    goal: 'Présenter sa famille avec ter et les possessifs',
    tip: { title: 'Possessifs', body: 'Au Brésil on emploie « meu / minha » seuls : « meu pai », « minha mãe ». Pour « voici » : « Este é… » (masculin) et « Esta é… » (féminin).' },
    phrases: [
      'o pai|le père|img:father', 'a mãe|la mère|img:mother', 'o irmão|le frère|img:brother', 'a irmã|la sœur|img:sister',
      'o filho|le fils|img:boy', 'a filha|la fille|img:girl', 'o avô|le grand-père|👴', 'a avó|la grand-mère|👵',
      'a minha família|ma famille|👨‍👩‍👧', 'Este é meu pai|Voici mon père', 'Esta é minha irmã|Voici ma sœur',
      'Você tem irmãos?|As-tu des frères et sœurs ?', 'Tenho dois irmãos|J\'ai deux frères', 'Minha mãe se chama Rosa|Ma mère s\'appelle Rosa',
    ],
    qa: [['Você tem irmãos?', 'Tenho dois irmãos', 'o avô', 'a mãe']],
  },
  {
    id: 'pt-4', theme: 'places', title: 'Se repérer en ville',
    goal: 'Demander un chemin avec estar, ficar et no / na / do',
    tip: { title: 'Ficar pour situer', body: '« Onde fica o hospital? » = « où se trouve l\'hôpital ? ». Contractions : em + o = no, em + a = na, de + o = do : « Fica no centro ».' },
    phrases: [
      'a rua|la rue|img:street', 'a casa|la maison|img:house', 'a escola|l\'école|img:school', 'o mercado|le marché|img:market',
      'o hospital|l\'hôpital|img:hospital', 'a biblioteca|la bibliothèque|img:library', 'a cidade|la ville|img:city',
      'Onde fica o hospital?|Où se trouve l\'hôpital ?', 'Fica à direita|C\'est à droite|➡️', 'Fica à esquerda|C\'est à gauche|⬅️',
      'Siga em frente|Allez tout droit|⬆️', 'Fica perto|C\'est près', 'Fica longe|C\'est loin', 'Tem um mercado|Il y a un marché',
    ],
    qa: [['Onde fica o hospital?', 'Fica à direita', 'a rua', 'a biblioteca'], ['Onde fica o hospital?', 'Fica perto', 'a casa', 'a escola']],
  },
  {
    id: 'pt-5', theme: 'food', title: 'Au restaurant',
    goal: 'Commander avec querer et dire ce qu\'on aime',
    phrases: [
      'a água|l\'eau|img:water', 'o pão|le pain|img:bread', 'o café|le café|img:coffee', 'o chá|le thé|img:tea', 'o peixe|le poisson|img:fish',
      'os ovos|les œufs|img:eggs', 'o leite|le lait|img:milk', 'o suco|le jus|img:juice', 'a maçã|la pomme|img:apple', 'a banana|la banane|img:banana',
      'O que você quer beber?|Que veux-tu boire ?', 'Eu queria um café, por favor|Je voudrais un café, s\'il vous plaît',
      'Eu gosto de peixe|J\'aime le poisson', 'Eu gosto de ovos|J\'aime les œufs', 'Eu não gosto de leite|Je n\'aime pas le lait',
      'Estou com fome|J\'ai faim|🍽️', 'Estou com sede|J\'ai soif|img:drinking', 'A conta, por favor|L\'addition, s\'il vous plaît',
      'o tomate|la tomate|img:tomato',
      'a uva|le raisin|img:grapes',
      'o morango|la fraise|img:strawberry',
      "a laranja|l'orange|img:orange",
      'a batata|la pomme de terre|img:potato',
      "a cebola|l'oignon|img:onion",
    ],
    qa: [['O que você quer beber?', 'Eu queria um café, por favor', 'a maçã', 'os ovos']],
  },
  {
    id: 'pt-6', theme: 'daily_life', title: 'Ma journée',
    goal: 'Décrire sa routine et donner l\'heure',
    tip: { title: 'L\'heure', body: '« É uma hora » (une heure) mais « São três horas » (trois heures). « Acordo às sete » : à sept heures = « às sete ».' },
    phrases: [
      'Acordo às sete|Je me réveille à sept heures|⏰', 'Tomo café da manhã às oito|Je prends le petit-déjeuner à huit heures|🍳',
      'Trabalho num escritório|Je travaille dans un bureau|💼', 'Almoço ao meio-dia|Je déjeune à midi',
      'Volto para casa|Je rentre à la maison|img:house', 'Janto com a minha família|Je dîne avec ma famille',
      'Vou dormir às onze|Je vais dormir à onze heures|😴', 'Que horas são?|Quelle heure est-il ?|img:clock',
      'São três horas|Il est trois heures', 'É uma hora|Il est une heure', 'A que horas você acorda?|À quelle heure te réveilles-tu ?',
      'hoje|aujourd\'hui', 'amanhã|demain', 'agora|maintenant',
    ],
    qa: [['Que horas são?', 'São três horas', 'hoje', 'amanhã'], ['A que horas você acorda?', 'Acordo às sete', 'Janto com a minha família', 'Trabalho num escritório']],
  },
  {
    id: 'pt-7', theme: 'daily_life', title: 'Faire des achats',
    goal: 'Demander un prix et acheter un article',
    phrases: [
      'Quanto custa?|Combien ça coûte ?|img:money', 'Custa cinco reais|Ça coûte cinq reais', 'Eu quero isto|Je veux ça', 'Você tem pão?|Avez-vous du pain ?|img:bread',
      'É muito caro|C\'est très cher', 'É barato|C\'est bon marché', 'a loja|le magasin|🏪', 'o dinheiro|l\'argent|img:money', 'a sacola|le sac|🛍️',
      'Aqui está|Voici', 'Mais alguma coisa?|Autre chose ?', 'Nada mais, obrigado|Rien d\'autre, merci', 'Posso pagar com cartão?|Puis-je payer par carte ?|💳',
    ],
    qa: [['Quanto custa?', 'Custa cinco reais', 'a loja', 'a sacola'], ['Mais alguma coisa?', 'Nada mais, obrigado', 'a loja', 'o dinheiro']],
  },
];
