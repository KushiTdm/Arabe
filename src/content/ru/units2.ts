import { lv, type SimpleUnit } from '../simple';

// ─── Russe — A2 et B1 ────────────────────────────────────────────────────────
// Source : programmes/russe.md. Romanisation « à la française » (voir units.ts).

export const RU_A2: SimpleUnit[] = lv('intermediate', [
  {
    id: 'ru-8', theme: 'daily_life', title: 'Âge et besoins', romanized: true,
    goal: 'Employer le datif (мне нужно)',
    tip: { title: 'Le datif des besoins et de l\'âge', body: 'En russe, on dit « à moi » : « Мне двадцать лет » (à moi vingt ans), « Мне нужно работать » (à moi il faut travailler), « Мне холодно » (à moi froid). Pronoms au datif : мне, тебе, ему, ей, нам.' },
    phrases: [
      'Мне двадцать лет|mnié dvatsat\' liét|J\'ai vingt ans', 'Сколько тебе лет?|skol\'ka tibié liét|Quel âge as-tu ?', 'Мне нужно работать|mnié noujna rabotat\'|Je dois travailler|💼', 'Мне нравится кофе|mnié nravitsa kofé|J\'aime le café|img:coffee',
      'Мне холодно|mnié kholadna|J\'ai froid', 'Мне жарко|mnié jarka|J\'ai chaud', 'Мне надо идти|mnié nada iti|Je dois y aller', 'Тебе нужна помощь?|tibié noujna pomochtch\'|As-tu besoin d\'aide ?', 'Мне нужна помощь|mnié noujna pomochtch\'|J\'ai besoin d\'aide',
    ],
    qa: [['Сколько тебе лет?', 'Мне двадцать лет', 'Мне холодно', 'Мне жарко'], ['Тебе нужна помощь?', 'Мне нужна помощь', 'Мне холодно', 'Мне надо идти']],
  },
  {
    id: 'ru-9', theme: 'family', title: 'Compagnie et profession', romanized: true,
    goal: 'Employer l\'instrumental',
    tip: { title: 'L\'instrumental', body: 'Il exprime l\'accompagnement (« с братом » = avec mon frère), le moyen (« ручкой » = avec un stylo) et la profession après « работать » ou « быть » : « Я работаю врачом » (je travaille comme médecin). Terminaisons : -ом / -ем (masc.), -ой / -ей (fém.).' },
    phrases: [
      'Я работаю врачом|ia rabotaïou vratchom|Je travaille comme médecin|🩺', 'Я живу с братом|ia jivou s bratom|J\'habite avec mon frère|img:brother', 'Кем ты работаешь?|kiem ty rabotaïech\'|Quel est ton métier ?', 'Я хочу быть учителем|ia khatchou byt\' outchitiélem|Je veux être professeur|img:teacher',
      'Он пишет ручкой|on pichiet routchkoï|Il écrit avec un stylo|img:pen', 'Чай с молоком|tchaï s malakom|Thé au lait|img:tea', 'Кофе с сахаром|kofé s sakharam|Café avec du sucre', 'Мы говорим с другом|my gavarim s drougom|Nous parlons avec un ami',
    ],
    qa: [['Кем ты работаешь?', 'Я работаю врачом', 'Чай с молоком', 'Кофе с сахаром']],
  },
  {
    id: 'ru-10', theme: 'daily_life', title: 'Raconter', romanized: true,
    goal: 'Raconter au passé',
    tip: { title: 'Le passé russe', body: 'Un seul passé : le verbe perd -ть et prend -л (masc.), -ла (fém.), -ло (neutre), -ли (pluriel) : « читал / читала ». Il n\'y a pas de personne : c\'est le sujet qui l\'indique.' },
    phrases: [
      'Вчера я работал|vtchira ia rabotal|Hier j\'ai travaillé (homme)', 'Вчера я работала|vtchira ia rabotala|Hier j\'ai travaillé (femme)', 'Мы ходили в кино|my khadili v kino|Nous sommes allés au cinéma', 'Что ты делал вчера?|chto ty diélal vtchira|Qu\'as-tu fait hier ?',
      'Я читал книгу|ia tchital knigou|Je lisais un livre|img:book', 'Она была дома|ana byla doma|Elle était à la maison|img:house', 'Было холодно|bylo kholadna|Il faisait froid', 'Мы жили в Париже|my jili v pariji|Nous vivions à Paris', 'вчера|vtchira|hier', 'недавно|nidavna|récemment', 'давно|davno|il y a longtemps',
    ],
    qa: [['Что ты делал вчера?', 'Я читал книгу', 'вчера', 'давно']],
  },
  {
    id: 'ru-11', theme: 'daily_life', title: 'Projets et aspect', romanized: true,
    goal: 'Parler de l\'avenir ; premières paires d\'aspect',
    tip: { title: 'Deux aspects', body: 'Imperfectif = durée ou répétition (« читать »), perfectif = résultat, action finie (« прочитать »). Futur de l\'imperfectif : « буду » + infinitif. Futur du perfectif : on le conjugue comme un présent (« прочитаю » = je lirai jusqu\'au bout).' },
    phrases: [
      'Завтра я буду работать|zaftra ia boudou rabotat\'|Demain je travaillerai', 'Я напишу письмо|ia napichou pis\'mo|J\'écrirai une lettre', 'Что ты будешь делать?|chto ty boudiech diélat\'|Que feras-tu ?', 'Я буду читать весь вечер|ia boudou tchitat\' viess\' viétchir|Je lirai toute la soirée',
      'Я прочитаю эту книгу|ia pratchitaïou étou knigou|Je lirai ce livre jusqu\'au bout|img:book', 'на следующей неделе|na sliédouiouchtchéï nidiélié|la semaine prochaine', 'скоро|skora|bientôt', 'потом|patom|ensuite',
    ],
    qa: [['Что ты будешь делать?', 'Я буду читать весь вечер', 'скоро', 'потом']],
  },
  {
    id: 'ru-12', theme: 'places', title: 'Se déplacer', romanized: true,
    goal: 'Employer идти / ходить, ехать / ездить',
    tip: { title: 'Aller à pied ou en transport, une fois ou souvent', body: 'Deux verbes pour « aller » à pied : « идти » (un trajet précis, maintenant) et « ходить » (habitude, aller-retour). En véhicule : « ехать » et « ездить ».' },
    phrases: [
      'Я иду в школу|ia idou v chkolou|Je vais à l\'école (maintenant)|img:school', 'Я хожу в школу каждый день|ia khajou v chkolou kajdyï dién\'|Je vais à l\'école chaque jour', 'Мы едем в Москву|my iédim v maskvou|Nous allons à Moscou', 'Я часто езжу в Москву|ia tchasta iéjjou v maskvou|Je vais souvent à Moscou',
      'Куда ты идёшь?|kouda ty idiôch|Où vas-tu ?', 'Он едет на поезде|on iédiet na paiézdié|Il voyage en train|img:train', 'автобус|aftobous|autobus|img:bus', 'остановка|astanofka|arrêt', 'Я иду пешком|ia idou pichkom|J\'y vais à pied',
    ],
    qa: [['Куда ты идёшь?', 'Я иду в школу', 'автобус', 'остановка']],
  },
]);

export const RU_B1: SimpleUnit[] = lv('advanced', [
  {
    id: 'ru-13', theme: 'discourse', title: 'Les six cas au pluriel', romanized: true,
    goal: 'Consolider les cas',
    tip: { title: 'Cas au pluriel', body: 'Nominatif : друзья. Génitif : друзей (après « много »). Accusatif animé : = génitif (« вижу друзей »). Datif : друзьям (vers, chez). Instrumental : друзьями (avec). Prépositionnel : о друзьях.' },
    phrases: [
      'Мои друзья живут в городе|mai droug\'ia jivout v garadié|Mes amis habitent en ville|img:city', 'У меня много книг|ou minia mnoga knik|J\'ai beaucoup de livres|img:book', 'Я вижу детей|ia vijou diétiéï|Je vois les enfants', 'Я говорю с друзьями|ia gavariou s drouz\'iami|Je parle avec mes amis',
      'Это подарок для родителей|éta padarak dlia radiétiélieï|C\'est un cadeau pour mes parents', 'Мы идём к друзьям|my idiom k drouz\'iam|Nous allons chez des amis', 'Они в магазинах|ani v magazinakh|Ils sont dans les magasins|🏪', 'Что у тебя есть?|chto ou tibia iést\'|Qu\'as-tu ?',
    ],
    qa: [['Что у тебя есть?', 'У меня много книг', 'Я вижу детей', 'Они в магазинах']],
  },
  {
    id: 'ru-14', theme: 'discourse', title: 'Aspect', romanized: true,
    goal: 'Choisir entre perfectif et imperfectif',
    tip: { title: 'Processus ou résultat', body: 'Imperfectif (читал) : l\'action en cours, répétée ou son existence. Perfectif (прочитал) : l\'action terminée avec son résultat. Mots-indices : « каждый день », « часто » → imperfectif ; « уже », « наконец » → perfectif.' },
    phrases: [
      'Я читал книгу два часа|ia tchital knigou dva tchassa|J\'ai lu un livre pendant deux heures', 'Я прочитал книгу|ia pratchital knigou|J\'ai fini de lire le livre', 'Я каждый день пишу письма|ia kajdyï dién\' pichou pis\'ma|J\'écris des lettres chaque jour', 'Я написал письмо|ia napissal pis\'mo|J\'ai écrit une lettre (terminée)',
      'Я уже поел|ia ouje paiél|J\'ai déjà mangé', 'Он ещё спит|on iichtchio spit|Il dort encore', 'Ты решил?|ty richil|As-tu décidé ?', 'Что ты сделал?|chto ty zdiélal|Qu\'as-tu fait (résultat) ?',
    ],
    qa: [['Что ты сделал?', 'Я написал письмо', 'Я каждый день пишу письма', 'Он ещё спит']],
  },
  {
    id: 'ru-15', theme: 'places', title: 'Verbes préfixés', romanized: true,
    goal: 'Employer пойти, приехать, уйти',
    tip: { title: 'Le préfixe donne la direction', body: 'по- = partir (пойти), при- = arriver (прийти, приехать), у- = quitter (уйти, уехать), вы- = sortir (выйти), за- = passer prendre / entrer (зайти). Le verbe de base reste идти / ехать.' },
    phrases: [
      'Я пойду домой|ia païdou damoï|J\'irai à la maison|img:house', 'Он приехал вчера|on priiékhal vtchira|Il est arrivé hier (en transport)', 'Она ушла|ana ouchla|Elle est partie', 'Мы вышли из дома|my vychli iz doma|Nous sommes sortis de la maison',
      'Он пришёл поздно|on prichiol pozna|Il est arrivé tard (à pied)', 'Я зайду к тебе|ia zaïdou k tibié|Je passerai chez toi', 'Он уехал в Москву|on ouiékhal v maskvou|Il est parti à Moscou', 'Где он?|gdié on|Où est-il ?',
    ],
    qa: [['Где он?', 'Он уехал в Москву', 'Она ушла', 'Он приехал вчера']],
  },
  {
    id: 'ru-16', theme: 'discourse', title: 'Relier', romanized: true,
    goal: 'Employer который, чтобы, если',
    tip: { title: 'Trois mots de liaison', body: '« который » (qui, que) s\'accorde en genre et nombre avec son antécédent et prend le cas de sa fonction. « чтобы » (pour que) exprime le but. « если » (si) introduit la condition.' },
    phrases: [
      'Это человек, который живёт здесь|éta tchilaviek katoryï jivout zdies\'|C\'est l\'homme qui habite ici', 'Книга, которую я читаю, интересная|kniga katoroyou ia tchitaïou intiériesnaïa|Le livre que je lis est intéressant|img:book', 'Я учу русский, чтобы работать в России|ia outchou rousskiï chtoby rabotat\' v rassii|J\'apprends le russe pour travailler en Russie',
      'Если будет дождь, я останусь дома|iéssli boudiet dojt\' ia astanous\' doma|S\'il pleut, je resterai à la maison', 'Я думаю, что это хорошо|ia doumaïou chto éta kharacho|Je pense que c\'est bien', 'Когда я приду, я позвоню|kagda ia pridou ia pazvaniou|Quand j\'arriverai, j\'appellerai', 'Почему ты учишь русский?|patchimou ty outchich\' rousskiï|Pourquoi apprends-tu le russe ?',
    ],
    qa: [['Почему ты учишь русский?', 'Я учу русский, чтобы работать в России', 'Я думаю, что это хорошо', 'Когда я приду, я позвоню']],
  },
]);
