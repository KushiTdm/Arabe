import { lv, type SimpleUnit } from '../simple';

// ─── Allemand — A2 et B1 ─────────────────────────────────────────────────────
// Source : programmes/allemand.md.

export const DE_A2: SimpleUnit[] = lv('intermediate', [
  {
    id: 'de-8', theme: 'daily_life', title: 'Donner, aider',
    goal: 'Employer le datif',
    tip: { title: 'Le datif', body: 'Le datif marque le destinataire : « Ich gebe dem Mann das Buch ». Articles : der→dem, die→der, das→dem ; pronoms : mir, dir, ihm, ihr, uns. Verbes qui exigent le datif : helfen, danken, gehören, gefallen.' },
    phrases: [
      'Ich helfe dir|Je t\'aide', 'Er gibt mir das Buch|Il me donne le livre|img:book', 'Das gehört meinem Bruder|Ça appartient à mon frère', 'Wem gehört das?|À qui est-ce ?', 'Kannst du mir helfen?|Peux-tu m\'aider ?',
      'Ich schenke dir eine Blume|Je t\'offre une fleur|img:flowers', 'Es gefällt mir|Ça me plaît', 'Wem gibst du das Geschenk?|À qui donnes-tu le cadeau ?', 'Ich gebe es meiner Mutter|Je le donne à ma mère|img:mother',
    ],
    qa: [['Wem gibst du das Geschenk?', 'Ich gebe es meiner Mutter', 'Es gefällt mir', 'Ich helfe dir']],
  },
  {
    id: 'de-9', theme: 'places', title: 'Où et vers où',
    goal: 'Localiser et déplacer avec les prépositions mixtes',
    tip: { title: 'Wo ? Wohin ?', body: 'Les prépositions mixtes (in, auf, an, über, unter, neben…) prennent le datif pour un lieu (WO ? « in der Küche ») et l\'accusatif pour un mouvement (WOHIN ? « in die Stadt »).' },
    phrases: [
      'Das Buch liegt auf dem Tisch|Le livre est sur la table|img:table', 'Ich lege das Buch auf den Tisch|Je pose le livre sur la table', 'Wo bist du?|Où es-tu ?', 'Ich bin in der Küche|Je suis dans la cuisine', 'Wohin gehst du?|Où vas-tu ?', 'Ich gehe in die Stadt|Je vais en ville|img:city',
      'Die Lampe hängt über dem Tisch|La lampe est suspendue au-dessus de la table', 'Der Hund sitzt unter dem Stuhl|Le chien est assis sous la chaise|img:dog', 'Ich stelle die Flasche neben das Glas|Je pose la bouteille à côté du verre',
    ],
    qa: [['Wohin gehst du?', 'Ich gehe in die Stadt', 'Ich bin in der Küche', 'Wo bist du?']],
  },
  {
    id: 'de-10', theme: 'daily_life', title: 'Raconter le passé',
    goal: 'Raconter au Perfekt',
    tip: { title: 'Le Perfekt', body: 'Passé de la conversation : haben/sein conjugué + participe II en fin de phrase. « Ich habe gearbeitet », mais « Ich bin gefahren » (verbes de mouvement avec sein).' },
    phrases: [
      'Ich habe gestern gearbeitet|J\'ai travaillé hier', 'Ich bin nach Berlin gefahren|Je suis allé à Berlin|img:city', 'Hast du den Film gesehen?|As-tu vu le film ?', 'Ja, ich habe ihn gesehen|Oui, je l\'ai vu', 'Ich habe noch nicht gegessen|Je n\'ai pas encore mangé',
      'Wir sind um acht angekommen|Nous sommes arrivés à huit heures', 'Was hast du heute gemacht?|Qu\'as-tu fait aujourd\'hui ?', 'Ich habe eingekauft|J\'ai fait les courses', 'gestern|hier', 'schon|déjà', 'heute Morgen|ce matin',
    ],
    qa: [['Was hast du heute gemacht?', 'Ich habe eingekauft', 'gestern', 'schon'], ['Hast du den Film gesehen?', 'Ja, ich habe ihn gesehen', 'gestern', 'schon']],
  },
  {
    id: 'de-11', theme: 'daily_life', title: 'Expliquer',
    goal: 'Justifier avec weil, dass, wenn (verbe final)',
    tip: { title: 'Le verbe part à la fin', body: 'Après weil, dass, wenn, le verbe conjugué se place à la fin de la subordonnée : « Ich bleibe zu Hause, weil ich krank bin ».' },
    phrases: [
      'Ich lerne Deutsch, weil ich in Berlin arbeite|J\'apprends l\'allemand parce que je travaille à Berlin', 'Ich glaube, dass es gut ist|Je crois que c\'est bien', 'Wenn es regnet, bleibe ich zu Hause|S\'il pleut, je reste à la maison', 'Ich weiß, dass du müde bist|Je sais que tu es fatigué',
      'Ich bleibe zu Hause, weil ich krank bin|Je reste à la maison parce que je suis malade', 'Warum lernst du Deutsch?|Pourquoi apprends-tu l\'allemand ?', 'Weil ich in Deutschland arbeiten möchte|Parce que je voudrais travailler en Allemagne', 'Wenn ich Zeit habe, gehe ich ins Kino|Quand j\'ai le temps, je vais au cinéma',
    ],
    qa: [['Warum lernst du Deutsch?', 'Weil ich in Deutschland arbeiten möchte', 'Ich weiß, dass du müde bist', 'Ich glaube, dass es gut ist']],
  },
  {
    id: 'de-12', theme: 'daily_life', title: 'Comparer',
    goal: 'Comparer deux choses',
    tip: { title: 'Comparatif et superlatif', body: 'Comparatif : adjectif + -er + als (« größer als »). Égalité : so… wie. Superlatif : am + -sten (« am billigsten ») ou der/die/das + -ste. Quelques irréguliers : gut → besser → am besten, viel → mehr.' },
    phrases: [
      'Berlin ist größer als Paris|Berlin est plus grand que Paris', 'Mein Haus ist kleiner als dein Haus|Ma maison est plus petite que la tienne|img:house', 'Das ist der beste Kaffee|C\'est le meilleur café|img:coffee', 'Dieses Hotel ist so teuer wie das andere|Cet hôtel est aussi cher que l\'autre',
      'Ich esse lieber Fisch als Fleisch|Je préfère le poisson à la viande|img:fish', 'Das Wetter ist besser als gestern|Le temps est meilleur qu\'hier', 'Mein Bruder ist älter als ich|Mon frère est plus âgé que moi|img:brother', 'Welcher ist am billigsten?|Lequel est le moins cher ?', 'Das ist am billigsten|C\'est le moins cher',
    ],
    qa: [['Welcher ist am billigsten?', 'Das ist am billigsten', 'Das ist der beste Kaffee', 'Das Wetter ist besser als gestern']],
  },
  {
    id: 'de-13', theme: 'daily_life', title: 'Passé de sein et haben',
    goal: 'Employer le Präteritum de sein, haben et des modaux',
    tip: { title: 'Les exceptions au Perfekt', body: 'Pour sein, haben et les modaux, on emploie le Präteritum même à l\'oral : « Ich war müde », « Ich hatte Hunger », « Ich konnte nicht kommen ».' },
    phrases: [
      'Ich war gestern müde|J\'étais fatigué hier', 'Wir waren im Kino|Nous étions au cinéma', 'Ich hatte Hunger|J\'avais faim', 'Er hatte keine Zeit|Il n\'avait pas le temps', 'Ich konnte nicht kommen|Je n\'ai pas pu venir', 'Sie wollte nach Hause gehen|Elle voulait rentrer', 'Ich musste arbeiten|J\'ai dû travailler|💼',
      'Wo warst du gestern?|Où étais-tu hier ?', 'Ich war zu Hause|J\'étais à la maison|img:house', 'Warum konntest du nicht kommen?|Pourquoi n\'as-tu pas pu venir ?',
    ],
    qa: [['Wo warst du gestern?', 'Ich war zu Hause', 'Ich hatte Hunger', 'Wir waren im Kino'], ['Warum konntest du nicht kommen?', 'Ich musste arbeiten', 'Ich war zu Hause', 'Ich hatte Hunger']],
  },
]);

export const DE_B1: SimpleUnit[] = lv('advanced', [
  {
    id: 'de-14', theme: 'discourse', title: 'Récit écrit',
    goal: 'Raconter au Präteritum',
    tip: { title: 'Le Präteritum', body: 'Temps du récit écrit : « ging », « sah », « sagte ». Verbes faibles : radical + -te (« machte »). Verbes forts : voyelle qui change (gehen → ging, sehen → sah).' },
    phrases: [
      'Gestern ging ich in die Stadt|Hier, je suis allé en ville', 'Ich sah einen alten Freund|J\'ai vu un vieil ami', 'Er sagte, dass er müde war|Il a dit qu\'il était fatigué', 'Wir aßen zusammen|Nous avons mangé ensemble', 'Es regnete den ganzen Tag|Il a plu toute la journée',
      'Dann kam der Bus|Puis le bus est arrivé|🚌', 'Am Ende fuhren wir nach Hause|À la fin, nous sommes rentrés', 'Plötzlich klingelte das Telefon|Soudain le téléphone a sonné', 'Was geschah dann?|Que s\'est-il passé ensuite ?',
    ],
    qa: [['Was geschah dann?', 'Plötzlich klingelte das Telefon', 'Wir aßen zusammen', 'Es regnete den ganzen Tag']],
  },
  {
    id: 'de-15', theme: 'discourse', title: 'Concession',
    goal: 'Employer obwohl, da, während',
    tip: { title: 'Trois connecteurs, verbe final', body: 'obwohl = bien que, da = puisque, während = pendant que. Ce sont des subordonnants : le verbe conjugué va à la fin.' },
    phrases: [
      'Obwohl es regnet, gehe ich spazieren|Bien qu\'il pleuve, je vais me promener', 'Ich bleibe zu Hause, da ich krank bin|Je reste à la maison puisque je suis malade', 'Während ich koche, hört er Musik|Pendant que je cuisine, il écoute de la musique', 'Obwohl er müde ist, arbeitet er weiter|Bien qu\'il soit fatigué, il continue de travailler',
      'Da es spät ist, gehen wir nach Hause|Puisqu\'il est tard, nous rentrons', 'Warum gehst du spazieren?|Pourquoi vas-tu te promener ?', 'Ich gehe schlafen, obwohl es früh ist|Je vais dormir bien qu\'il soit tôt',
    ],
    qa: [['Warum gehst du spazieren?', 'Obwohl es regnet, gehe ich spazieren', 'Da es spät ist, gehen wir nach Hause', 'Während ich koche, hört er Musik']],
  },
  {
    id: 'de-16', theme: 'discourse', title: 'Politesse et hypothèses',
    goal: 'Employer würde + infinitif, puis wäre et hätte',
    tip: { title: 'Le Konjunktiv II', body: 'Pour la politesse et l\'irréel : « Ich würde gern… », « Könnten Sie… ? », « Das wäre schön », « Ich hätte gern… ». Hypothèse irréelle : « Wenn ich Zeit hätte, würde ich reisen ».' },
    phrases: [
      'Ich würde gern einen Kaffee trinken|J\'aimerais boire un café|img:coffee', 'Könnten Sie mir helfen?|Pourriez-vous m\'aider ?', 'Das wäre schön|Ce serait bien', 'Ich hätte gern ein Zimmer|J\'aimerais une chambre', 'Wenn ich Zeit hätte, würde ich reisen|Si j\'avais le temps, je voyagerais',
      'Wenn ich reich wäre, würde ich ein Haus kaufen|Si j\'étais riche, j\'achèterais une maison|img:house', 'Was würdest du an meiner Stelle tun?|Que ferais-tu à ma place ?', 'Ich würde mit ihm sprechen|Je parlerais avec lui',
    ],
    qa: [['Was würdest du an meiner Stelle tun?', 'Ich würde mit ihm sprechen', 'Das wäre schön', 'Könnten Sie mir helfen?']],
  },
  {
    id: 'de-17', theme: 'discourse', title: 'Décrire un processus',
    goal: 'Employer le passif',
    tip: { title: 'Le Vorgangspassiv', body: 'werden + participe II : « Das Haus wird gebaut » (présent), « wurde gebaut » (prétérit). L\'agent est facultatif : « Hier wird Deutsch gesprochen » (ici on parle allemand).' },
    phrases: [
      'Das Haus wird gebaut|La maison est en train d\'être construite|img:house', 'Die Arbeit wird gemacht|Le travail est fait', 'Der Brief wurde gestern geschrieben|La lettre a été écrite hier', 'Hier wird Deutsch gesprochen|Ici on parle allemand', 'Das Essen wird gekocht|Le repas est préparé',
      'Der Tisch wurde repariert|La table a été réparée|img:table', 'Wie wird das gemacht?|Comment cela se fait-il ?', 'Es wird gearbeitet|On travaille',
    ],
    qa: [['Wie wird das gemacht?', 'Das Essen wird gekocht', 'Es wird gearbeitet', 'Das Haus wird gebaut']],
  },
  {
    id: 'de-18', theme: 'discourse', title: 'Décrire précisément',
    goal: 'Décliner l\'adjectif ; découvrir le génitif',
    tip: { title: 'Terminaisons de l\'adjectif et génitif', body: 'L\'adjectif prend une terminaison selon l\'article : « ein großes Haus », « das große Haus ». Le génitif marque l\'appartenance : « das Auto meines Vaters ».' },
    phrases: [
      'ein großes Haus|une grande maison|img:house', 'das große Haus|la grande maison', 'eine schöne Stadt|une belle ville|img:city', 'Ich habe einen neuen Freund|J\'ai un nouvel ami', 'Das ist die Frau meines Bruders|C\'est la femme de mon frère',
      'Das Auto meines Vaters|La voiture de mon père|img:father', 'wegen des Wetters|à cause du temps', 'die Hauptstadt Deutschlands|la capitale de l\'Allemagne', 'der Hund meiner Schwester|le chien de ma sœur|img:dog', 'Wessen Auto ist das?|À qui est cette voiture ?',
    ],
    qa: [['Wessen Auto ist das?', 'Das Auto meines Vaters', 'wegen des Wetters', 'ein großes Haus']],
  },
  {
    id: 'de-19', theme: 'discourse', title: 'Préciser',
    goal: 'Employer des propositions relatives',
    tip: { title: 'La relative', body: 'Le pronom relatif s\'accorde en genre et nombre avec son antécédent, et prend le cas de sa fonction : « der Mann, der hier wohnt » (sujet), « der Freund, den ich getroffen habe » (objet). Le verbe est à la fin.' },
    phrases: [
      'Das ist der Mann, der hier wohnt|C\'est l\'homme qui habite ici', 'Das Buch, das ich lese, ist gut|Le livre que je lis est bon|img:book', 'Die Frau, die dort steht, ist meine Lehrerin|La femme qui est là-bas est ma professeure|img:teacher', 'Das ist das Haus, in dem ich wohne|C\'est la maison dans laquelle j\'habite|img:house',
      'Der Freund, den ich gestern getroffen habe|L\'ami que j\'ai rencontré hier', 'Die Stadt, die ich liebe, ist Berlin|La ville que j\'aime est Berlin', 'Ich kenne einen Mann, der Deutsch spricht|Je connais un homme qui parle allemand', 'Wer ist das?|Qui est-ce ?',
    ],
    qa: [['Wer ist das?', 'Das ist der Mann, der hier wohnt', 'Die Stadt, die ich liebe, ist Berlin', 'Das Buch, das ich lese, ist gut']],
  },
]);
