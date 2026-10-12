import { lv, type SimpleUnit } from '../simple';

// ─── Anglais (britannique) — A2 et B1 ────────────────────────────────────────
// Source : programmes/anglais.md.

export const EN_A2: SimpleUnit[] = lv('intermediate', [
  {
    id: 'en-8', theme: 'daily_life', title: 'Raconter le passé',
    goal: 'Raconter son week-end au past simple',
    tip: { title: 'Past simple', body: 'Verbes réguliers : + -ed (« watched »). Irréguliers à connaître : go → went, see → saw, eat → ate, have → had. Question et négation : did / didn\'t + verbe de base (« Did you enjoy it ? », « I didn\'t go »).' },
    phrases: [
      'I went to London last weekend|Je suis allé à Londres le week-end dernier|img:city', 'I watched a film|J\'ai regardé un film', 'Did you enjoy it?|Tu as aimé ?', 'Yes, I did|Oui', 'I didn\'t go out|Je ne suis pas sorti', 'We stayed at home|Nous sommes restés à la maison|img:house',
      'What did you do yesterday?|Qu\'as-tu fait hier ?', 'I visited my grandmother|J\'ai rendu visite à ma grand-mère|👵', 'last week|la semaine dernière', 'yesterday|hier', 'two days ago|il y a deux jours', 'on Saturday|samedi',
    ],
    qa: [['What did you do yesterday?', 'I visited my grandmother', 'last week', 'on Saturday'], ['Did you enjoy it?', 'Yes, I did', 'yesterday', 'last week']],
  },
  {
    id: 'en-9', theme: 'daily_life', title: 'Comparer',
    goal: 'Comparer deux choses',
    tip: { title: 'Comparatif et superlatif', body: 'Adjectif court : -er than / the -est (« bigger than », « the biggest »). Adjectif long : more… than / the most… (« more expensive »). Irréguliers : good → better → the best.' },
    phrases: [
      'London is bigger than Paris|Londres est plus grand que Paris', 'My house is smaller than yours|Ma maison est plus petite que la tienne|img:house', 'This is the best coffee|C\'est le meilleur café|img:coffee', 'It\'s as expensive as the other one|C\'est aussi cher que l\'autre',
      'I prefer fish to meat|Je préfère le poisson à la viande|img:fish', 'The weather is better than yesterday|Le temps est meilleur qu\'hier', 'My brother is older than me|Mon frère est plus âgé que moi|img:brother', 'Which one is the cheapest?|Lequel est le moins cher ?', 'This one is the cheapest|Celui-ci est le moins cher',
    ],
    qa: [['Which one is the cheapest?', 'This one is the cheapest', 'This is the best coffee', 'London is bigger than Paris']],
  },
  {
    id: 'en-10', theme: 'daily_life', title: 'Projets',
    goal: 'Parler de l\'avenir avec going to et will',
    tip: { title: 'Going to ou will ?', body: 'BE going to = projet déjà décidé ou signe visible (« I\'m going to travel »). WILL = décision spontanée ou prédiction (« I\'ll call you », « It will rain »).' },
    phrases: [
      'I\'m going to travel to Spain|Je vais voyager en Espagne|✈️', 'Tomorrow I\'m going to work|Demain je vais travailler', 'I\'ll call you tonight|Je t\'appellerai ce soir', 'It will probably rain|Il va probablement pleuvoir', 'What are you going to do this weekend?|Que vas-tu faire ce week-end ?',
      'I think I\'ll stay at home|Je pense que je vais rester à la maison|img:house', 'I\'m going to buy a car|Je vais acheter une voiture', 'Next year I\'m going to learn Spanish|L\'année prochaine je vais apprendre l\'espagnol',
    ],
    qa: [['What are you going to do this weekend?', 'I think I\'ll stay at home', 'I\'ll call you tonight', 'It will probably rain']],
  },
  {
    id: 'en-11', theme: 'daily_life', title: 'Obligation et conseil',
    goal: 'Employer must, have to, should',
    tip: { title: 'Obligation ou conseil', body: 'MUST / HAVE TO = obligation (« I have to work »). SHOULD = conseil (« You should rest »). Attention : « don\'t have to » = pas obligé, mais « mustn\'t » = interdit.' },
    phrases: [
      'I must go now|Je dois y aller maintenant', 'You have to wear a seatbelt|Tu dois mettre ta ceinture', 'You should rest|Tu devrais te reposer', 'You shouldn\'t smoke|Tu ne devrais pas fumer', 'I have to work tomorrow|Je dois travailler demain|💼',
      'Do I have to pay?|Dois-je payer ?', 'You mustn\'t park here|Vous ne devez pas vous garer ici', 'You don\'t have to come|Tu n\'es pas obligé de venir', 'I feel ill|Je ne me sens pas bien',
    ],
    qa: [['I feel ill', 'You should rest', 'You mustn\'t park here', 'I must go now']],
  },
  {
    id: 'en-12', theme: 'food', title: 'Quantités',
    goal: 'Employer much, many, a lot of',
    tip: { title: 'Much ou many ?', body: 'MANY + dénombrable (« many friends »), MUCH + indénombrable (« much time »). À la forme affirmative on préfère « a lot of ». Question : « How much… ? / How many… ? ».' },
    phrases: [
      'How much is it?|Combien ça coûte ?|img:money', 'How many brothers have you got?|Combien de frères as-tu ?', 'I haven\'t got much time|Je n\'ai pas beaucoup de temps|img:clock', 'There are a lot of people|Il y a beaucoup de monde', 'I don\'t have many friends|Je n\'ai pas beaucoup d\'amis',
      'I\'d like a little sugar|Je voudrais un peu de sucre', 'There isn\'t much milk|Il n\'y a pas beaucoup de lait|img:milk', 'Can I have a few eggs?|Puis-je avoir quelques œufs ?|img:eggs', 'I\'ve got two brothers|J\'ai deux frères|img:brother',
    ],
    qa: [['How many brothers have you got?', 'I\'ve got two brothers', 'There are a lot of people', 'There isn\'t much milk']],
  },
  {
    id: 'en-13', theme: 'places', title: 'Voyager',
    goal: 'Poser des questions en voyage',
    phrases: [
      'Where is the train station?|Où est la gare ?|🚉', 'What time does the train leave?|À quelle heure part le train ?|🚆', 'How much is a ticket to London?|Combien coûte un billet pour Londres ?|🎫', 'Which platform?|Quel quai ?',
      'Does this bus go to the airport?|Ce bus va-t-il à l\'aéroport ?|🚌', 'Can you help me, please?|Pouvez-vous m\'aider, s\'il vous plaît ?', 'I\'d like a single ticket|Je voudrais un aller simple', 'Is it far?|Est-ce loin ?', 'It leaves at ten|Il part à dix heures',
    ],
    qa: [['What time does the train leave?', 'It leaves at ten', 'Which platform?', 'Is it far?']],
  },
]);

export const EN_B1: SimpleUnit[] = lv('advanced', [
  {
    id: 'en-14', theme: 'discourse', title: 'Faire un bilan',
    goal: 'Parler d\'expériences au present perfect',
    tip: { title: 'Present perfect', body: 'have/has + participe passé : lien entre passé et présent (« I\'ve lived here for five years »). Avec ever, never, just, already, yet, since, for. On ne précise pas « quand » (« yesterday » exige le past simple).' },
    phrases: [
      'I\'ve lived here for five years|J\'habite ici depuis cinq ans', 'Have you ever been to Japan?|Es-tu déjà allé au Japon ?', 'I\'ve never eaten sushi|Je n\'ai jamais mangé de sushi', 'She has just left|Elle vient de partir', 'We\'ve already finished|Nous avons déjà fini',
      'I\'ve been to London twice|Je suis allé deux fois à Londres', 'How long have you worked here?|Depuis combien de temps travailles-tu ici ?', 'I haven\'t seen him since Monday|Je ne l\'ai pas vu depuis lundi',
    ],
    qa: [['How long have you worked here?', 'I\'ve lived here for five years', 'She has just left', 'We\'ve already finished']],
  },
  {
    id: 'en-15', theme: 'discourse', title: 'Hypothèses',
    goal: 'Employer les conditionnels 0, 1 et 2',
    tip: { title: 'Trois conditionnels', body: '0 : if + présent, présent (vérité générale). 1 : if + présent, will (réel). 2 : if + past simple, would (imaginaire) : « If I had time, I would travel ». On dit « If I were » pour tous.' },
    phrases: [
      'If you heat ice, it melts|Si on chauffe de la glace, elle fond', 'If it rains, I\'ll stay at home|S\'il pleut, je resterai à la maison', 'If I had time, I would travel|Si j\'avais le temps, je voyagerais', 'If I were rich, I\'d buy a house|Si j\'étais riche, j\'achèterais une maison|img:house',
      'What would you do in my place?|Que ferais-tu à ma place ?', 'I wouldn\'t do that if I were you|Je ne ferais pas ça à ta place', 'I\'d talk to him|Je lui parlerais',
    ],
    qa: [['What would you do in my place?', 'I\'d talk to him', 'If I were rich, I\'d buy a house', 'If it rains, I\'ll stay at home']],
  },
  {
    id: 'en-16', theme: 'discourse', title: 'Décrire un processus',
    goal: 'Employer la voix passive',
    tip: { title: 'La voix passive', body: 'be + participe passé : « The house was built in 1990 ». On l\'emploie quand l\'agent est inconnu ou sans importance. « By + agent » est facultatif.' },
    phrases: [
      'The house was built in 1990|La maison a été construite en 1990|img:house', 'English is spoken here|On parle anglais ici', 'The letter was written yesterday|La lettre a été écrite hier', 'The room is cleaned every day|La chambre est nettoyée chaque jour', 'The window was broken|La fenêtre a été cassée',
      'It is made of wood|C\'est fait en bois', 'Where was it made?|Où a-t-il été fabriqué ?', 'It was made in Italy|Il a été fabriqué en Italie',
    ],
    qa: [['Where was it made?', 'It was made in Italy', 'The window was broken', 'It is made of wood']],
  },
  {
    id: 'en-17', theme: 'discourse', title: 'Rapporter',
    goal: 'Rapporter les paroles de quelqu\'un',
    tip: { title: 'Reculer d\'un temps', body: '« I\'m tired » → « He said he was tired ». « I will come » → « She said she would come ». Pour une question : « He asked me if I was hungry » (pas d\'inversion).' },
    phrases: [
      'He said that he was tired|Il a dit qu\'il était fatigué', 'She told me that she would come|Elle m\'a dit qu\'elle viendrait', 'He asked me if I was hungry|Il m\'a demandé si j\'avais faim', 'She said she had finished|Elle a dit qu\'elle avait fini', 'They told us to wait|Ils nous ont dit d\'attendre',
      'He asked where the station was|Il a demandé où était la gare', 'I said I didn\'t know|J\'ai dit que je ne savais pas', 'What did he say?|Qu\'a-t-il dit ?',
    ],
    qa: [['What did he say?', 'He said that he was tired', 'She told me that she would come', 'They told us to wait']],
  },
  {
    id: 'en-18', theme: 'discourse', title: 'Langue courante',
    goal: 'Employer des phrasal verbs fréquents',
    tip: { title: 'Verbe + particule', body: 'Les phrasal verbs combinent un verbe et une particule, et le sens change : look for (chercher), look after (s\'occuper de), give up (abandonner), pick up (récupérer). Au pronom, il se place avant la particule : « pick it up ».' },
    phrases: [
      'Please sit down|Asseyez-vous, s\'il vous plaît', 'Turn off the light|Éteins la lumière|💡', 'I\'m looking for my keys|Je cherche mes clés|img:key', 'Can you pick me up?|Peux-tu venir me chercher ?', 'Let\'s find out|Découvrons-le',
      'I gave up smoking|J\'ai arrêté de fumer', 'She\'s looking after the children|Elle s\'occupe des enfants', 'Put on your coat|Mets ton manteau', 'Take off your shoes|Enlève tes chaussures', 'What are you looking for?|Que cherches-tu ?',
    ],
    qa: [['What are you looking for?', 'I\'m looking for my keys', 'Please sit down', 'Turn off the light']],
  },
  {
    id: 'en-19', theme: 'discourse', title: 'Préciser',
    goal: 'Employer des propositions relatives',
    tip: { title: 'Who, which, that, whose', body: 'WHO pour une personne, WHICH pour une chose, THAT pour les deux, WHOSE pour la possession, WHERE pour un lieu. On peut supprimer le relatif s\'il est objet : « the film we saw ».' },
    phrases: [
      'The man who lives here is my teacher|L\'homme qui habite ici est mon professeur|img:teacher', 'The book that I\'m reading is good|Le livre que je lis est bon|img:book', 'The woman whose son is a doctor|La femme dont le fils est médecin', 'This is the house where I was born|C\'est la maison où je suis né(e)|img:house',
      'The film which we saw was long|Le film que nous avons vu était long', 'That\'s the person I told you about|C\'est la personne dont je t\'ai parlé', 'A friend who speaks French|Un ami qui parle français', 'Who is he?|Qui est-ce ?',
    ],
    qa: [['Who is he?', 'The man who lives here is my teacher', 'The film which we saw was long', 'A friend who speaks French']],
  },
]);
