import { lv, type SimpleUnit } from '../simple';

// ─── Japonais — A2 et B1 ─────────────────────────────────────────────────────
// Source : programmes/japonais.md. Écriture en hiragana (et katakana pour les
// mots étrangers) avec romaji ; les kanji ne sont pas encore introduits.

export const JA_A2: SimpleUnit[] = lv('intermediate', [
  {
    id: 'ja-7', theme: 'daily_life', title: 'Raconter le passé', romanized: true,
    goal: 'Raconter avec ました',
    tip: { title: 'ます → ました', body: 'Le passé poli remplace ます par ました : たべます → たべました (j\'ai mangé). La négation du passé : ませんでした (« たべませんでした »).' },
    phrases: [
      'きのうえいがをみました|kinō eiga o mimashita|Hier j\'ai vu un film', 'がっこうへいきました|gakkō e ikimashita|Je suis allé à l\'école|img:school', 'ひるごはんをたべました|hirugohan o tabemashita|J\'ai déjeuné', 'なにをしましたか|nani o shimashita ka|Qu\'avez-vous fait ?',
      'しゅうまつにともだちにあいました|shūmatsu ni tomodachi ni aimashita|Ce week-end j\'ai vu un ami', 'きのう|kinō|hier', 'せんしゅう|senshū|la semaine dernière', 'あさ|asa|le matin',
    ],
    tokens: {
      'がっこうへいきました': ['がっこう|gakkō', 'へ|e', 'いきました|ikimashita'],
      'ひるごはんをたべました': ['ひるごはん|hirugohan', 'を|o', 'たべました|tabemashita'],
    },
    orders: ['がっこうへいきました', 'ひるごはんをたべました'],
    qa: [['なにをしましたか', 'ひるごはんをたべました', 'きのう', 'せんしゅう']],
  },
  {
    id: 'ja-8', theme: 'daily_life', title: 'Demander, autoriser', romanized: true,
    goal: 'Employer la forme en て',
    tip: { title: 'La forme en て', body: 'Elle sert à demander (て + ください), à permettre (て + もいいですか) et à enchaîner. « まって » (attends), « すわって » (assieds-toi), « とって » (prends). Elle est irrégulière : le radical change selon le verbe.' },
    phrases: [
      'ちょっとまってください|chotto matte kudasai|Attendez un instant, s\'il vous plaît', 'ゆっくりはなしてください|yukkuri hanashite kudasai|Parlez lentement, s\'il vous plaît', 'もういちどいってください|mō ichido itte kudasai|Répétez, s\'il vous plaît', 'ここにすわってもいいですか|koko ni suwatte mo ii desu ka|Puis-je m\'asseoir ici ?',
      'はい、どうぞ|hai, dōzo|Oui, je vous en prie', 'しゃしんをとってもいいですか|shashin o totte mo ii desu ka|Puis-je prendre une photo ?', 'すみません|sumimasen|Excusez-moi', 'たすけてください|tasukete kudasai|Aidez-moi, s\'il vous plaît',
    ],
    tokens: { 'ちょっとまってください': ['ちょっと|chotto', 'まって|matte', 'ください|kudasai'], 'ゆっくりはなしてください': ['ゆっくり|yukkuri', 'はなして|hanashite', 'ください|kudasai'] },
    orders: ['ちょっとまってください', 'ゆっくりはなしてください'],
    qa: [['ここにすわってもいいですか', 'はい、どうぞ', 'すみません', 'たすけてください']],
  },
  {
    id: 'ja-9', theme: 'daily_life', title: 'Expliquer', romanized: true,
    goal: 'Employer la forme neutre ; distinguer は et が',
    tip: { title: 'Forme neutre, は et が', body: 'Entre proches on utilise la forme neutre (だ, いる, ある, たべる). は présente le thème connu (« たろうさんは がくせいです »), が désigne le sujet nouveau ou qu\'on distingue (« だれが きましたか » : qui est venu ?).' },
    phrases: [
      'きょうはさむい|kyō wa samui|Il fait froid aujourd\'hui', 'ねこがいる|neko ga iru|Il y a un chat', 'これはわたしのほんだ|kore wa watashi no hon da|C\'est mon livre|img:book', 'あのひとはせんせいだ|ano hito wa sensei da|Cette personne est professeur|img:teacher',
      'わたしがやります|watashi ga yarimasu|C\'est moi qui le ferai', 'だれがきましたか|dare ga kimashita ka|Qui est venu ?', 'たろうさんがきました|Tarō-san ga kimashita|C\'est Tarō qui est venu', 'たろうさんはがくせいです|Tarō-san wa gakusei desu|Tarō est étudiant|img:student',
    ],
    tokens: { 'これはわたしのほんだ': ['これ|kore', 'は|wa', 'わたし|watashi', 'の|no', 'ほん|hon', 'だ|da'], 'たろうさんがきました': ['たろうさん|Tarō-san', 'が|ga', 'きました|kimashita'] },
    orders: ['これはわたしのほんだ', 'たろうさんがきました'],
    qa: [['だれがきましたか', 'たろうさんがきました', 'ねこがいる', 'きょうはさむい']],
  },
  {
    id: 'ja-10', theme: 'places', title: 'Expériences', romanized: true,
    goal: 'Employer ことがある',
    tip: { title: 'Avoir déjà fait', body: 'Forme passée neutre + ことがあります = « avoir déjà fait » : « にほんへ いったことが あります » (je suis déjà allé au Japon). Négatif : ことがありません.' },
    phrases: [
      'にほんへいったことがありますか|nihon e itta koto ga arimasu ka|Êtes-vous déjà allé au Japon ?', 'はい、いったことがあります|hai, itta koto ga arimasu|Oui, j\'y suis déjà allé', 'いいえ、いったことがありません|iie, itta koto ga arimasen|Non, je n\'y suis jamais allé', 'すしをたべたことがあります|sushi o tabeta koto ga arimasu|J\'ai déjà mangé des sushis',
      'ふじさんをみたことがあります|Fujisan o mita koto ga arimasu|J\'ai déjà vu le mont Fuji', 'いちどもありません|ichido mo arimasen|Jamais une seule fois', 'にかいいきました|nikai ikimashita|J\'y suis allé deux fois', 'ありがとうございます|arigatō gozaimasu|Merci', 'さようなら|sayōnara|Au revoir',
    ],
    qa: [['にほんへいったことがありますか', 'はい、いったことがあります', 'ありがとうございます', 'さようなら']],
  },
  {
    id: 'ja-11', theme: 'daily_life', title: 'Justifier', romanized: true,
    goal: 'Employer から et ので',
    tip: { title: 'から et ので', body: 'Les deux donnent la cause : « あついですから、みずを のみます » (il fait chaud, donc je bois de l\'eau). から est plus subjectif, ので plus neutre et poli. La cause vient avant, le résultat après.' },
    phrases: [
      'あついですから、みずをのみます|atsui desu kara, mizu o nomimasu|Il fait chaud, alors je bois de l\'eau|img:water', 'つかれたので、はやくねます|tsukareta node, hayaku nemasu|Comme je suis fatigué, je me couche tôt|😴', 'どうしてですか|dōshite desu ka|Pourquoi ?', 'いそがしいですから|isogashii desu kara|Parce que je suis occupé',
      'あめですから、いえにいます|ame desu kara, ie ni imasu|Il pleut, alors je reste à la maison|img:house', 'おなかがすいたので、たべます|onaka ga suita node, tabemasu|J\'ai faim, alors je mange', 'ねむいので、かえります|nemui node, kaerimasu|J\'ai sommeil, alors je rentre', 'すみません|sumimasen|Excusez-moi', 'さようなら|sayōnara|Au revoir',
    ],
    qa: [['どうしてですか', 'いそがしいですから', 'すみません', 'さようなら']],
  },
  {
    id: 'ja-12', theme: 'daily_life', title: 'Intentions', romanized: true,
    goal: 'Employer つもり',
    tip: { title: 'つもり = avoir l\'intention de', body: 'Forme du dictionnaire + つもりです : « いくつもりです » (j\'ai l\'intention d\'aller). Négatif : forme en ない + つもりです (« いかないつもりです »).' },
    phrases: [
      'らいねんにほんへいくつもりです|rainen nihon e iku tsumori desu|J\'ai l\'intention d\'aller au Japon l\'année prochaine', 'あしたははたらかないつもりです|ashita wa hatarakanai tsumori desu|Je n\'ai pas l\'intention de travailler demain', 'なにをするつもりですか|nani o suru tsumori desu ka|Qu\'avez-vous l\'intention de faire ?', 'にほんごをべんきょうするつもりです|nihongo o benkyō suru tsumori desu|J\'ai l\'intention d\'étudier le japonais',
      'いえをかうつもりです|ie o kau tsumori desu|J\'ai l\'intention d\'acheter une maison|img:house', 'まだきめていません|mada kimete imasen|Je n\'ai pas encore décidé', 'こんにちは|konnichiwa|Bonjour', 'ありがとうございます|arigatō gozaimasu|Merci',
    ],
    qa: [['なにをするつもりですか', 'にほんごをべんきょうするつもりです', 'こんにちは', 'ありがとうございます']],
  },
]);

export const JA_B1: SimpleUnit[] = lv('advanced', [
  {
    id: 'ja-13', theme: 'discourse', title: 'Hypothèses', romanized: true,
    goal: 'Employer ば, たら, と, なら',
    tip: { title: 'Quatre « si »', body: 'たら = si / quand (le plus courant), ば = condition générale, と = conséquence automatique (« はるに なると、はなが さきます »), なら = « si c\'est le cas ». Pour débuter, たら suffit presque toujours.' },
    phrases: [
      'あめがふったら、いえにいます|ame ga futtara, ie ni imasu|S\'il pleut, je reste à la maison', 'やすければ、かいます|yasukereba, kaimasu|Si c\'est bon marché, j\'achète', 'はるになると、はながさきます|haru ni naru to, hana ga sakimasu|Quand le printemps arrive, les fleurs s\'ouvrent|img:flowers', 'ひまなら、いっしょにいきましょう|hima nara, issho ni ikimashō|Si tu es libre, allons-y ensemble',
      'おかねがあったら、りょこうします|okane ga attara, ryokō shimasu|Si j\'avais de l\'argent, je voyagerais|img:money', 'なにをしたらいいですか|nani o shitara ii desu ka|Que dois-je faire ?',
    ],
    qa: [['なにをしたらいいですか', 'ひまなら、いっしょにいきましょう', 'おかねがあったら、りょこうします', 'はるになると、はながさきます']],
  },
  {
    id: 'ja-14', theme: 'discourse', title: 'Rapporter, opiner', romanized: true,
    goal: 'Employer と言いました et と思います',
    tip: { title: 'Citer avec と', body: 'La particule と ferme la citation : « くると いいました » (il a dit qu\'il viendrait), « いいと おもいます » (je pense que c\'est bien). La forme neutre précède と.' },
    phrases: [
      'ともだちはあしたくるといいました|tomodachi wa ashita kuru to iimashita|Mon ami a dit qu\'il viendrait demain', 'せんせいはいいといいました|sensei wa ii to iimashita|Le professeur a dit que c\'était bien|img:teacher', 'わたしはこれがいいとおもいます|watashi wa kore ga ii to omoimasu|Je pense que celui-ci est bien', 'あしたはあめがふるとおもいます|ashita wa ame ga furu to omoimasu|Je pense qu\'il pleuvra demain',
      'なんといいましたか|nan to iimashita ka|Qu\'a-t-il dit ?', 'どうおもいますか|dō omoimasu ka|Qu\'en pensez-vous ?', 'そうおもいません|sō omoimasen|Je ne le pense pas',
    ],
    qa: [['どうおもいますか', 'わたしはこれがいいとおもいます', 'そうおもいません', 'なんといいましたか']],
  },
  {
    id: 'ja-15', theme: 'discourse', title: 'Donner et recevoir', romanized: true,
    goal: 'Employer あげる, もらう, くれる',
    tip: { title: 'Trois verbes de don', body: 'あげる = je donne à quelqu\'un ; くれる = quelqu\'un me donne (ou donne à mon groupe) ; もらう = je reçois de quelqu\'un. Le point de vue est celui du locuteur.' },
    phrases: [
      'ともだちにほんをあげました|tomodachi ni hon o agemashita|J\'ai donné un livre à mon ami|img:book', 'ははにはなをもらいました|haha ni hana o moraimashita|J\'ai reçu des fleurs de ma mère|img:flowers', 'ともだちがわたしにほんをくれました|tomodachi ga watashi ni hon o kuremashita|Mon ami m\'a donné un livre', 'なにをもらいましたか|nani o moraimashita ka|Qu\'avez-vous reçu ?',
      'おくりものをあげます|okurimono o agemasu|Je donne un cadeau', 'ちちにプレゼントをもらいました|chichi ni purezento o moraimashita|J\'ai reçu un cadeau de mon père|img:father',
    ],
    qa: [['なにをもらいましたか', 'ははにはなをもらいました', 'おくりものをあげます', 'ともだちにほんをあげました']],
  },
  {
    id: 'ja-16', theme: 'discourse', title: 'Politesse', romanized: true,
    goal: 'Découvrir le keigo',
    tip: { title: 'Le keigo', body: 'Le japonais a trois registres : neutre, poli (です・ます) et honorifique (敬語). Le keigo élève l\'interlocuteur (« いらっしゃいませ », « おしえてください ») ou abaisse le locuteur (« よろしく おねがいします »). On l\'emploie avec les clients, supérieurs, inconnus.' },
    phrases: [
      'いらっしゃいませ|irasshaimase|Bienvenue (dans un magasin)', 'おなまえをおしえてください|onamae o oshiete kudasai|Veuillez me dire votre nom', 'すこしまってくださいませんか|sukoshi matte kudasaimasen ka|Pourriez-vous patienter un peu ?', 'はじめまして、どうぞよろしくおねがいします|hajimemashite, dōzo yoroshiku onegaishimasu|Enchanté, je compte sur vous',
      'しつれいします|shitsurei shimasu|Excusez-moi (en entrant ou en partant)', 'わかりました|wakarimashita|C\'est compris', 'ありがとうございました|arigatō gozaimashita|Merci (pour ce qui a été fait)',
    ],
    qa: [['すこしまってくださいませんか', 'わかりました', 'いらっしゃいませ', 'しつれいします']],
  },
]);
