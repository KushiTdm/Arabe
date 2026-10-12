import { lv, type SimpleUnit } from '../simple';

// ─── Portugais (Brésil) — A2 et B1 ───────────────────────────────────────────
// Source : programmes/portugais.md. Proclise brésilienne (« me liga », « te vejo »).

export const PT_A2: SimpleUnit[] = lv('intermediate', [
  {
    id: 'pt-8', theme: 'daily_life', title: 'Raconter le passé',
    goal: 'Raconter au pretérito perfeito',
    tip: { title: 'Le pretérito perfeito', body: 'Il exprime une action terminée : « trabalhei » (j\'ai travaillé), « comi », « fui ». Attention : ir et ser ont la même forme (fui, foi).' },
    phrases: [
      'Ontem eu trabalhei o dia todo|Hier j\'ai travaillé toute la journée', 'Fui ao mercado|Je suis allé au marché|img:market', 'Comi uma pizza|J\'ai mangé une pizza', 'Você viu o filme?|As-tu vu le film ?', 'Sim, eu vi|Oui, je l\'ai vu', 'Cheguei às oito|Je suis arrivé à huit heures',
      'O que você fez hoje?|Qu\'as-tu fait aujourd\'hui ?', 'Fiz as compras|J\'ai fait les courses', 'ontem|hier', 'já|déjà', 'hoje de manhã|ce matin',
    ],
    qa: [['O que você fez hoje?', 'Fiz as compras', 'ontem', 'já'], ['Você viu o filme?', 'Sim, eu vi', 'ontem', 'já']],
  },
  {
    id: 'pt-9', theme: 'family', title: 'Habitudes passées',
    goal: 'Décrire une habitude à l\'imperfeito',
    tip: { title: 'L\'imperfeito', body: 'Il décrit une habitude ou un décor passé : « morava », « brincava ». Seuls 4 verbes sont irréguliers : ser (era), ter (tinha), vir (vinha), pôr (punha).' },
    phrases: [
      'Quando eu era criança, morava numa casa grande|Enfant, j\'habitais une grande maison|img:house', 'Eu brincava com meus irmãos|Je jouais avec mes frères et sœurs', 'Minha avó cozinhava muito bem|Ma grand-mère cuisinait très bien|👵', 'Todo domingo almoçávamos juntos|Chaque dimanche nous déjeunions ensemble',
      'Tinha um jardim|Il y avait un jardin', 'Fazia muito calor|Il faisait très chaud', 'O que você fazia quando era criança?|Que faisais-tu enfant ?', 'sempre|toujours', 'às vezes|parfois', 'todo dia|tous les jours',
    ],
    qa: [['O que você fazia quando era criança?', 'Eu brincava com meus irmãos', 'sempre', 'às vezes']],
  },
  {
    id: 'pt-10', theme: 'daily_life', title: 'Raconter',
    goal: 'Opposer perfeito et imperfeito dans un récit',
    phrases: [
      'Enquanto eu cozinhava, o telefone tocou|Pendant que je cuisinais, le téléphone a sonné', 'Chovia quando eu saí|Il pleuvait quand je suis sorti', 'Eu estava cansado, então fui dormir|J\'étais fatigué, alors je suis allé dormir', 'Ontem à noite fiquei em casa|Hier soir je suis resté à la maison',
      'Encontrei um amigo enquanto caminhava|J\'ai rencontré un ami en marchant', 'Eu estava lendo quando você chegou|Je lisais quand tu es arrivé', 'Era um dia bonito|C\'était une belle journée', 'de repente|soudain', 'depois|ensuite', 'no final|à la fin', 'O que aconteceu?|Que s\'est-il passé ?',
    ],
    qa: [['O que aconteceu?', 'Enquanto eu cozinhava, o telefone tocou', 'depois', 'no final']],
  },
  {
    id: 'pt-11', theme: 'daily_life', title: 'Projets',
    goal: 'Parler de l\'avenir avec ir + infinitif',
    tip: { title: 'Le futur proche', body: 'Au Brésil, on dit presque toujours « vou + infinitif » : « vou viajar » (je vais voyager). Le futur simple (« viajarei ») est réservé à l\'écrit formel.' },
    phrases: [
      'Vou viajar para o Peru|Je vais voyager au Pérou', 'Amanhã vou trabalhar|Demain je vais travailler', 'Vou comprar um carro|Je vais acheter une voiture', 'No ano que vem vou estudar inglês|L\'année prochaine je vais étudier l\'anglais',
      'O que você vai fazer no fim de semana?|Que vas-tu faire ce week-end ?', 'Vou descansar|Je vais me reposer', 'Vou à praia|Je vais à la plage|img:sea', 'semana que vem|la semaine prochaine', 'em breve|bientôt',
    ],
    qa: [['O que você vai fazer no fim de semana?', 'Vou descansar', 'em breve', 'semana que vem']],
  },
  {
    id: 'pt-12', theme: 'daily_life', title: 'Remplacer un nom',
    goal: 'Employer les pronoms objets (proclise brésilienne)',
    tip: { title: 'Pronoms avant le verbe', body: 'Au Brésil, les pronoms se placent avant le verbe : « Eu te vejo », « Me liga amanhã ». En portugais européen on dirait « vejo-te », « liga-me » : c\'est une autre norme.' },
    phrases: [
      'Eu te vejo todo dia|Je te vois tous les jours', 'Eu te ligo hoje à noite|Je t\'appelle ce soir', 'Eu te dou o livro|Je te donne le livre|img:book', 'Você pode me ajudar?|Peux-tu m\'aider ?', 'Eu te falo depois|Je te le dis plus tard',
      'Me liga amanhã|Appelle-moi demain', 'A gente se vê amanhã|On se voit demain', 'Quem você chamou?|Qui as-tu appelé ?',
    ],
    qa: [['Quem você chamou?', 'Eu te ligo hoje à noite', 'Eu te dou o livro', 'Me liga amanhã']],
  },
  {
    id: 'pt-13', theme: 'daily_life', title: 'Action en cours',
    goal: 'Dire ce qu\'on est en train de faire avec estar + gérondif',
    tip: { title: 'Estar + gérondif', body: '« Estou trabalhando » = « je suis en train de travailler » (BR). Le gérondif se forme avec -ando, -endo, -indo. En portugais européen : « estou a trabalhar ».' },
    phrases: [
      'Estou trabalhando agora|Je suis en train de travailler|💼', 'Ela está cozinhando|Elle est en train de cuisiner', 'Estamos esperando o ônibus|Nous attendons le bus|🚌', 'O que você está fazendo?|Qu\'es-tu en train de faire ?', 'Estou lendo um livro|Je suis en train de lire un livre|img:book',
      'Eles estão jogando futebol|Ils jouent au football', 'Está chovendo|Il pleut', 'Estou falando com minha mãe|Je parle avec ma mère|img:mother', 'agora|maintenant', 'neste momento|en ce moment',
    ],
    qa: [['O que você está fazendo?', 'Estou lendo um livro', 'agora', 'neste momento']],
  },
]);

export const PT_B1: SimpleUnit[] = lv('advanced', [
  {
    id: 'pt-14', theme: 'discourse', title: 'Souhait et doute',
    goal: 'Employer le subjonctif présent',
    tip: { title: 'Le subjuntivo', body: 'Après un souhait, un doute, une émotion : « Quero que você venha ». Formes : on inverse la voyelle (falar → fale, comer → coma).' },
    phrases: [
      'Quero que você venha|Je veux que tu viennes', 'Espero que dê tudo certo|J\'espère que tout ira bien', 'Duvido que seja verdade|Je doute que ce soit vrai', 'É possível que chova|Il est possible qu\'il pleuve', 'Não acho que ele tenha tempo|Je ne crois pas qu\'il ait le temps',
      'Fico feliz que você esteja aqui|Je suis content que tu sois ici', 'Recomendo que você descanse|Je te recommande de te reposer', 'É importante que você estude|Il est important que tu étudies', 'Obrigado pelo conselho|Merci pour le conseil',
    ],
    qa: [['Recomendo que você descanse', 'Obrigado pelo conselho', 'Duvido que seja verdade', 'É possível que chova']],
  },
  {
    id: 'pt-15', theme: 'discourse', title: 'Quand et si',
    goal: 'Employer le futur du subjonctif (quando, se)',
    tip: { title: 'Un temps sans équivalent', body: 'Après « quando », « se », « assim que » pour l\'avenir, le portugais emploie le futur du subjonctif : « Quando eu chegar, ligo » (quand j\'arriverai), « Se eu tiver tempo » (si j\'ai le temps).' },
    phrases: [
      'Quando eu chegar, ligo para você|Quand j\'arriverai, je t\'appellerai', 'Se eu tiver tempo, vou ao cinema|Si j\'ai le temps, j\'irai au cinéma', 'Se chover, fico em casa|S\'il pleut, je reste à la maison', 'Quando você puder, me avise|Quand tu pourras, préviens-moi',
      'Assim que eu souber, te falo|Dès que je saurai, je te le dis', 'Se você estudar, vai passar|Si tu étudies, tu réussiras', 'Se você quiser, a gente vai|Si tu veux, on y va', 'O que você faz se chover?|Que fais-tu s\'il pleut ?',
    ],
    qa: [['O que você faz se chover?', 'Se chover, fico em casa', 'Se você estudar, vai passar', 'Assim que eu souber, te falo']],
  },
  {
    id: 'pt-16', theme: 'discourse', title: 'Infinitif personnel',
    goal: 'Découvrir une structure sans équivalent français',
    tip: { title: 'L\'infinitif qui se conjugue', body: 'Le portugais peut accorder l\'infinitif avec son sujet : « É importante estudarmos » (qu\'il est important que nous étudiions). Ajout : -es, -mos, -em, selon la personne.' },
    phrases: [
      'É importante estudarmos|Il est important que nous étudiions', 'Depois de comermos, saímos|Après avoir mangé, nous sommes sortis', 'Antes de eu sair, fechei a porta|Avant que je sorte, j\'ai fermé la porte|img:door', 'Para nós viajarmos, precisamos de dinheiro|Pour voyager, nous avons besoin d\'argent|img:money',
      'Eles pediram para eu esperar|Ils m\'ont demandé d\'attendre', 'É difícil vocês entenderem|C\'est difficile que vous compreniez', 'Por que você fechou a porta?|Pourquoi as-tu fermé la porte ?',
    ],
    qa: [['Por que você fechou a porta?', 'Antes de eu sair, fechei a porta', 'Depois de comermos, saímos', 'É importante estudarmos']],
  },
  {
    id: 'pt-17', theme: 'discourse', title: 'Hypothèses',
    goal: 'Formuler une hypothèse avec le conditionnel',
    phrases: [
      'Eu gostaria de um café|Je voudrais un café|img:coffee', 'Eu poderia ajudar você|Je pourrais t\'aider', 'Seria melhor esperar|Ce serait mieux d\'attendre', 'Se eu tivesse tempo, viajaria|Si j\'avais le temps, je voyagerais', 'Se eu fosse rico, compraria uma casa|Si j\'étais riche, j\'achèterais une maison|img:house',
      'O que você faria no meu lugar?|Que ferais-tu à ma place ?', 'Eu falaria com ele|Je parlerais avec lui',
    ],
    qa: [['O que você faria no meu lugar?', 'Eu falaria com ele', 'Seria melhor esperar', 'Eu gostaria de um café']],
  },
  {
    id: 'pt-18', theme: 'discourse', title: 'Opinion',
    goal: 'Argumenter avec des connecteurs',
    phrases: [
      'Na minha opinião, é uma boa ideia|À mon avis, c\'est une bonne idée', 'Acho que você tem razão|Je crois que tu as raison', 'Não concordo|Je ne suis pas d\'accord', 'Por um lado… por outro lado…|D\'un côté… de l\'autre…', 'No entanto|Cependant', 'Além disso|De plus',
      'Por isso|C\'est pourquoi', 'Embora seja difícil|Bien que ce soit difficile', 'Em conclusão|En conclusion', 'O que você acha?|Qu\'en penses-tu ?',
    ],
    qa: [['O que você acha?', 'Acho que você tem razão', 'No entanto', 'Além disso']],
  },
]);
