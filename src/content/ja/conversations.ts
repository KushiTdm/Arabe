import type { ConvSpec } from '../conversations';

// ─── JA — conversations guidées (générées depuis la table de phrases communes) ───
// À faire relire par un locuteur natif.

export const JA_CONVERSATIONS: ConvSpec[] = [
  {
    id: 'ja-C1', title: 'Rencontre', scene: 'handshake', npcRole: 'une personne que tu rencontres', romanized: true,
    situation: 'Tu rencontres quelqu\'un pour la première fois. Salue, présente-toi, réponds à ses questions.',
    key: ['おはようございます|ohayō gozaimasu|Bonjour (le matin)', 'わたしはアンナです|watashi wa Anna desu|Je m\'appelle Anna', 'フランスからきました|Furansu kara kimashita|Je viens de France', 'はじめまして|hajimemashite|Enchanté(e)'],
    turns: [
      { npc: 'おはようございます|ohayō gozaimasu|Bonjour (le matin)', ok: 'おはようございます|ohayō gozaimasu|Bonjour (le matin)', bad: ['おやすみなさい|oyasuminasai|Bonne nuit', 'さようなら|sayōnara|Au revoir'] },
      { npc: 'おなまえはなんですか|onamae wa nan desu ka|Comment t\'appelles-tu ?', ok: 'わたしはアンナです|watashi wa Anna desu|Je m\'appelle Anna', bad: ['げんきです|genki desu|Je vais bien, merci', 'フランスからきました|Furansu kara kimashita|Je viens de France'] },
      { npc: 'どちらからきましたか|dochira kara kimashita ka|D\'où viens-tu ?', ok: 'フランスからきました|Furansu kara kimashita|Je viens de France', bad: ['わたしはアンナです|watashi wa Anna desu|Je m\'appelle Anna', 'ありがとうございます|arigatō gozaimasu|Merci'] },
      { npc: 'はじめまして|hajimemashite|Enchanté(e)', ok: 'はじめまして|hajimemashite|Enchanté(e)', bad: ['わかりません|wakarimasen|Je ne comprends pas', 'どういたしまして|dō itashimashite|De rien'] },
      { npc: 'おげんきですか|ogenki desu ka|Comment vas-tu ?', ok: 'げんきです|genki desu|Je vais bien, merci', bad: ['おはようございます|ohayō gozaimasu|Bonjour (le matin)', 'びょういんはどこですか|byōin wa doko desu ka|Où est l\'hôpital ?'] },
      { npc: 'さようなら|sayōnara|Au revoir', ok: 'またあとで|mata ato de|À bientôt', bad: ['おはようございます|ohayō gozaimasu|Bonjour (le matin)', 'はい|hai|Oui'] },
    ],
  },
  {
    id: 'ja-C2', title: 'Au café', scene: 'coffee', npcRole: 'le serveur', romanized: true,
    situation: 'Tu entres dans un café. Commande une boisson, réponds au serveur, paie.',
    key: ['コーヒー|kōhī|café|img:coffee', 'おちゃ|ocha|thé|img:tea', 'みず|mizu|eau|img:water', 'ジュース|jūsu|jus|img:juice'],
    turns: [
      { npc: 'いらっしゃいませ、ごちゅうもんはおきまりですか|irasshaimase, gochūmon wa okimari desu ka|Bonjour, que veux-tu ?', ok: 'コーヒーをください|kōhī o kudasai|Je voudrais un café, s\'il vous plaît|img:coffee', bad: ['びょういんはどこですか|byōin wa doko desu ka|Où est l\'hôpital ?', 'さようなら|sayōnara|Au revoir'] },
      { npc: 'ほかになにかありますか|hoka ni nanika arimasu ka|Autre chose ?', ok: 'いいえ、けっこうです|iie, kekkō desu|Non, merci', bad: ['わたしはアンナです|watashi wa Anna desu|Je m\'appelle Anna', 'またあとで|mata ato de|À bientôt'] },
      { npc: 'さんユーロです|san yūro desu|Ça fait trois euros|img:money', ok: 'どうぞ|dōzo|Voilà', bad: ['いくらですか|ikura desu ka|Combien ça coûte ?', 'コーヒーがすきです|kōhī ga suki desu|J\'aime le café'] },
      { npc: 'ありがとうございます|arigatō gozaimasu|Merci', ok: 'どういたしまして|dō itashimashite|De rien', bad: ['わかりません|wakarimasen|Je ne comprends pas', 'はい|hai|Oui'] },
    ],
  },
  {
    id: 'ja-C3', title: 'Au marché', scene: 'market', npcRole: 'le vendeur', romanized: true,
    situation: 'Tu fais tes courses au marché. Demande ce que tu veux, le prix, et paie.',
    key: ['パン|pan|pain|img:bread', 'たまご|tamago|œufs|img:eggs', 'さかな|sakana|poisson|img:fish', 'おかね|okane|argent|img:money'],
    turns: [
      { npc: 'いらっしゃいませ、なににしますか|irasshaimase, nani ni shimasu ka|Bonjour, que désirez-vous ?', ok: 'パンをください|pan o kudasai|Je veux du pain|img:bread', bad: ['さようなら|sayōnara|Au revoir', 'びょういんはどこですか|byōin wa doko desu ka|Où est l\'hôpital ?'] },
      { npc: 'いくつですか|ikutsu desu ka|Combien en voulez-vous ?', ok: 'ふたつください|futatsu kudasai|Deux, s\'il vous plaît', bad: ['おはようございます|ohayō gozaimasu|Bonjour (le matin)', 'おやすみなさい|oyasuminasai|Bonne nuit'] },
      { npc: 'どうぞ|dōzo|Voilà', ok: 'いくらですか|ikura desu ka|Combien ça coûte ?', bad: ['わかりません|wakarimasen|Je ne comprends pas', 'わたしはアンナです|watashi wa Anna desu|Je m\'appelle Anna'] },
      { npc: 'ごユーロです|go yūro desu|Ça fait cinq euros|img:money', ok: 'どうぞ|dōzo|Voilà', bad: ['ふたつください|futatsu kudasai|Deux, s\'il vous plaît', 'はい|hai|Oui'] },
      { npc: 'ありがとうございます、さようなら|arigatō gozaimasu, sayōnara|Merci, au revoir', ok: 'さようなら|sayōnara|Au revoir', bad: ['おはようございます|ohayō gozaimasu|Bonjour (le matin)', 'おやすみなさい|oyasuminasai|Bonne nuit'] },
    ],
  },
  {
    id: 'ja-C4', title: 'Demander son chemin', scene: 'street', npcRole: 'un passant', romanized: true,
    situation: 'Tu cherches l\'hôpital. Demande ton chemin et comprends la réponse.',
    key: ['びょういん|byōin|hôpital|img:hospital', 'みち|michi|rue|img:street', 'がっこう|gakkō|école|img:school', 'いちば|ichiba|marché|img:market'],
    turns: [
      { npc: 'おてつだいしましょうか|otetsudai shimashō ka|Avez-vous besoin d\'aide ?', ok: 'はい、びょういんはどこですか|hai, byōin wa doko desu ka|Oui, où est l\'hôpital ?|img:hospital', bad: ['さようなら|sayōnara|Au revoir', 'わたしはアンナです|watashi wa Anna desu|Je m\'appelle Anna'] },
      { npc: 'まっすぐいって、ひだりです|massugu itte, hidari desu|Tout droit puis à gauche', ok: 'とおいですか|tōi desu ka|Est-ce loin ?', bad: ['フランスからきました|Furansu kara kimashita|Je viens de France', 'パンをください|pan o kudasai|Je veux du pain|img:bread'] },
      { npc: 'いいえ、ちかいです|iie, chikai desu|Non, c\'est près', ok: 'ありがとうございます|arigatō gozaimasu|Merci', bad: ['わかりません|wakarimasen|Je ne comprends pas', 'ふたつください|futatsu kudasai|Deux, s\'il vous plaît'] },
      { npc: 'どういたしまして|dō itashimashite|De rien', ok: 'さようなら|sayōnara|Au revoir', bad: ['コーヒーをください|kōhī o kudasai|Je voudrais un café, s\'il vous plaît|img:coffee', 'おはようございます|ohayō gozaimasu|Bonjour (le matin)'] },
    ],
  },
  {
    id: 'ja-C5', title: 'Ma famille', scene: '👨‍👩‍👧', npcRole: 'un ami', romanized: true,
    situation: 'Un ami regarde tes photos de famille. Dis qui est sur chaque photo.',
    key: ['父|chichi|père|img:father', '母|haha|mère|img:mother', '兄|ani|frère|img:brother', '妹|imōto|sœur|img:sister'],
    turns: [
      { npc: 'どなたですか|donata desu ka|Qui est-ce ?', img: 'father', ok: '父です|chichi desu|C\'est mon père', bad: ['兄です|ani desu|C\'est mon frère', '母です|haha desu|C\'est ma mère'] },
      { npc: 'どなたですか|donata desu ka|Qui est-ce ?', img: 'mother', ok: '母です|haha desu|C\'est ma mère', bad: ['妹です|imōto desu|C\'est ma sœur', '父です|chichi desu|C\'est mon père'] },
      { npc: 'どなたですか|donata desu ka|Qui est-ce ?', img: 'sister', ok: '妹です|imōto desu|C\'est ma sœur', bad: ['母です|haha desu|C\'est ma mère', '兄です|ani desu|C\'est mon frère'] },
      { npc: 'どなたですか|donata desu ka|Qui est-ce ?', img: 'brother', ok: '兄です|ani desu|C\'est mon frère', bad: ['父です|chichi desu|C\'est mon père', '妹です|imōto desu|C\'est ma sœur'] },
      { npc: 'きょうだいはいますか|kyōdai wa imasu ka|As-tu des frères et sœurs ?', ok: '兄が一人と妹が一人います|ani ga hitori to imōto ga hitori imasu|J\'ai un frère et une sœur', bad: ['学生です|gakusei desu|Je suis étudiant', '水がほしいです|mizu ga hoshii desu|Je veux de l\'eau'] },
    ],
  },
  {
    id: 'ja-C6', level: 'intermediate', title: 'Au restaurant', scene: 'fish', npcRole: 'le serveur', romanized: true,
    situation: 'Tu dînes au restaurant. Commande un plat et une boisson, donne ton avis, demande l\'addition.',
    key: ['さかな|sakana|poisson|img:fish', 'ジュース|jūsu|jus|img:juice', 'おいしい|oishii|délicieux', 'お会計|okaikei|l\'addition|img:money'],
    turns: [
      { npc: 'いらっしゃいませ|irasshaimase|Bienvenue', ok: 'こんにちは|konnichiwa|Bonjour', bad: ['お会計をお願いします|okaikei o onegai shimasu|L\'addition, s\'il vous plaît', 'さようなら|sayōnara|Au revoir'] },
      { npc: '何を食べたいですか|nani o tabetai desu ka|Que veux-tu manger ?', ok: '魚をお願いします|sakana o onegai shimasu|Je voudrais du poisson|img:fish', bad: ['学生です|gakusei desu|Je suis étudiant', 'あした|ashita|Demain'] },
      { npc: '飲み物は何にしますか|nomimono wa nani ni shimasu ka|Et que veux-tu boire ?', ok: 'ジュースのほうがいいです|jūsu no hō ga ii desu|Je préfère le jus|img:juice', bad: ['わたしはアンナです|watashi wa Anna desu|Je m\'appelle Anna', 'かばんをなくしました|kaban o nakushimashita|J\'ai perdu mon sac'] },
      { npc: 'おいしいですか|oishii desu ka|Est-ce que c\'est bon ?', ok: 'はい、とてもおいしいです|hai, totemo oishii desu|Oui, c\'est très bon', bad: ['わかりません|wakarimasen|Je ne comprends pas', '右|migi|à droite'] },
      { npc: 'ほかになにかありますか|hoka ni nanika arimasu ka|Autre chose ?', ok: 'いいえ、お会計をお願いします|iie, okaikei o onegai shimasu|Non, l\'addition, s\'il vous plaît', bad: ['コーヒーがすきです|kōhī ga suki desu|J\'aime le café', 'トイレはどこですか|toire wa doko desu ka|Où sont les toilettes ?'] },
    ],
  },
  {
    id: 'ja-C7', level: 'intermediate', title: 'À l\'université', scene: 'university', npcRole: 'le professeur', romanized: true,
    situation: 'C\'est ton premier jour à l\'université. Réponds à ton professeur et demande où est la bibliothèque.',
    key: ['先生|sensei|professeur|img:teacher', '学生|gakusei|étudiant|img:student', '図書館|toshokan|bibliothèque|img:library', '大学|daigaku|université|img:university'],
    turns: [
      { npc: 'おはようございます|ohayō gozaimasu|Bonjour (le matin)', ok: 'こんにちは|konnichiwa|Bonjour', bad: ['こんばんは|konbanwa|Bonsoir', 'どういたしまして|dō itashimashite|De rien'] },
      { npc: '新入生ですか|shinnyūsei desu ka|Es-tu un nouvel étudiant ?', ok: 'はい、新入生です|hai, shinnyūsei desu|Oui, je suis un nouvel étudiant|img:student', bad: ['わかりません|wakarimasen|Je ne comprends pas', 'いくらですか|ikura desu ka|Combien ça coûte ?'] },
      { npc: '何を勉強していますか|nani o benkyō shite imasu ka|Qu\'étudies-tu ?', ok: '言語を勉強しています|gengo o benkyō shite imasu|J\'étudie les langues', bad: ['フランスからきました|Furansu kara kimashita|Je viens de France', 'パンをください|pan o kudasai|Je veux du pain|img:bread'] },
      { npc: '質問はありますか|shitsumon wa arimasu ka|As-tu une question ?', ok: 'はい、図書館はどこですか|hai, toshokan wa doko desu ka|Oui, où est la bibliothèque ?|img:library', bad: ['ありがとうございます|arigatō gozaimasu|Merci', 'あした|ashita|Demain'] },
      { npc: '図書館は近いです。まっすぐ行ってください|toshokan wa chikai desu. massugu itte kudasai|La bibliothèque est près, tout droit', ok: 'ありがとうございます、先生|arigatō gozaimasu, sensei|Merci, professeur', bad: ['この間違いをおわびします|kono machigai o owabi shimasu|Je m\'excuse pour cette erreur', 'こんにちは|konnichiwa|Bonjour'] },
    ],
  },
  {
    id: 'ja-C8', level: 'intermediate', title: 'Chez le médecin', scene: 'hospital', npcRole: 'le médecin', romanized: true,
    situation: 'Tu ne te sens pas bien. Explique ce que tu as et écoute les conseils du médecin.',
    key: ['医者|isha|médecin|img:doctor', '頭|atama|tête|img:head', 'みず|mizu|eau|img:water', 'きのうからです|kinō kara desu|Depuis hier'],
    turns: [
      { npc: 'こんにちは、どうしましたか|konnichiwa, dō shimashita ka|Bonjour, quel est le problème ?', ok: '具合が悪いです|guai ga warui desu|Je suis malade', bad: ['学生です|gakusei desu|Je suis étudiant', 'コーヒーをください|kōhī o kudasai|Je voudrais un café, s\'il vous plaît|img:coffee'] },
      { npc: 'どこが痛いですか|doko ga itai desu ka|Où as-tu mal ?', ok: '頭が痛いです|atama ga itai desu|J\'ai mal à la tête|img:head', bad: ['フランスからきました|Furansu kara kimashita|Je viens de France', '左|hidari|à gauche'] },
      { npc: 'いつからですか|itsu kara desu ka|Depuis quand ?', ok: 'きのうからです|kinō kara desu|Depuis hier', bad: ['あした|ashita|Demain', 'はい|hai|Oui'] },
      { npc: '薬を出します|kusuri o dashimasu|Je vais te donner un médicament', ok: 'ありがとうございます、先生|arigatō gozaimasu, sensei|Merci, docteur', bad: ['さようなら|sayōnara|Au revoir', '空港はどこですか|kūkō wa doko desu ka|Où est l\'aéroport ?'] },
      { npc: '水をたくさん飲んでください|mizu o takusan nonde kudasai|Bois beaucoup d\'eau|img:water', ok: 'わかりました|wakarimashita|D\'accord', bad: ['かばんをなくしました|kaban o nakushimashita|J\'ai perdu mon sac', 'いくらですか|ikura desu ka|Combien ça coûte ?'] },
    ],
  },
  {
    id: 'ja-C9', level: 'intermediate', title: 'Inviter un ami', scene: 'sunset', npcRole: 'un ami', romanized: true,
    situation: 'Un ami te propose de sortir. Accepte, fixe l\'heure et le lieu.',
    key: ['あした|ashita|demain', 'カフェ|kafe|le café|img:coffee', '五時|goji|cinq heures|img:clock', 'またあとで|mata ato de|À bientôt'],
    turns: [
      { npc: 'こんばんは|konbanwa|Bonsoir', ok: 'こんばんは|konbanwa|Bonsoir', bad: ['おはようございます|ohayō gozaimasu|Bonjour (le matin)', 'どういたしまして|dō itashimashite|De rien'] },
      { npc: 'あした出かけませんか|ashita dekakemasen ka|Veux-tu qu\'on sorte demain ?', ok: 'はい、ぜひ|hai, zehi|Oui, avec plaisir', bad: ['わかりません|wakarimasen|Je ne comprends pas', '具合が悪いです|guai ga warui desu|Je suis malade'] },
      { npc: 'どこで会いましょうか|doko de aimashō ka|Où se retrouve-t-on ?', ok: 'カフェで|kafe de|Au café|img:coffee', bad: ['学生です|gakusei desu|Je suis étudiant', 'わたしはアンナです|watashi wa Anna desu|Je m\'appelle Anna'] },
      { npc: '何時ですか|nanji desu ka|À quelle heure ?', ok: '五時です|goji desu|À cinq heures|img:clock', bad: ['右|migi|à droite', 'お茶がほしいです|ocha ga hoshii desu|Je veux du thé'] },
      { npc: 'わかりました、約束ですね|wakarimashita, yakusoku desu ne|C\'est entendu', ok: 'またあとで|mata ato de|À bientôt', bad: ['こんにちは|konnichiwa|Bonjour', 'いくらですか|ikura desu ka|Combien ça coûte ?'] },
    ],
  },
  {
    id: 'ja-C10', level: 'advanced', title: 'Donner son avis sur une ville', scene: 'city', npcRole: 'un ami', romanized: true,
    situation: 'Un ami te demande ce que tu penses de sa ville. Donne ton avis et justifie-le.',
    key: ['町|machi|ville|img:city', 'きれい|kirei|beau', 'から|kara|parce que', 'でも|demo|mais'],
    turns: [
      { npc: 'この町をどう思いますか|kono machi o dō omoimasu ka|Que penses-tu de cette ville ?', ok: 'きれいな町だと思います|kirei na machi da to omoimasu|Je pense que la ville est belle|img:city', bad: ['フランスからきました|Furansu kara kimashita|Je viens de France', 'さようなら|sayōnara|Au revoir'] },
      { npc: 'どうしてですか|dōshite desu ka|Pourquoi ?', ok: 'きれいで静かな町だからです|kirei de shizuka na machi da kara desu|Parce qu\'elle est propre et calme', bad: ['あした|ashita|Demain', 'わたしはアンナです|watashi wa Anna desu|Je m\'appelle Anna'] },
      { npc: 'でも、高いです|demo, takai desu|Mais elle est chère', ok: 'そうですね、でも好きです|sō desu ne, demo suki desu|Je suis d\'accord, mais je l\'aime', bad: ['わかりません|wakarimasen|Je ne comprends pas', 'ありがとうございます|arigatō gozaimasu|Merci'] },
      { npc: 'また行きますか|mata ikimasu ka|La visiteras-tu encore ?', ok: 'はい、また行きます|hai, mata ikimasu|Oui, je la visiterai encore', bad: ['具合が悪いです|guai ga warui desu|Je suis malade', '左|hidari|à gauche'] },
    ],
  },
  {
    id: 'ja-C11', level: 'advanced', title: 'Une réclamation', scene: 'money', npcRole: 'l\'employé', romanized: true,
    situation: 'Ton appareil ne marche pas. Explique le problème et demande une réparation ou un dédommagement.',
    key: ['問題|mondai|problème', '機械|kikai|l\'appareil', '補償|hoshō|dédommagement', '責任者|sekininsha|directeur'],
    turns: [
      { npc: 'どうしましたか|dō shimashita ka|Comment puis-je t\'aider ?', ok: '問題があります|mondai ga arimasu|J\'ai un problème', bad: ['こんにちは|konnichiwa|Bonjour', '学生です|gakusei desu|Je suis étudiant'] },
      { npc: 'どんな問題ですか|donna mondai desu ka|Quel est le problème ?', ok: '機械が動きません|kikai ga ugokimasen|L\'appareil ne fonctionne pas', bad: ['わたしはアンナです|watashi wa Anna desu|Je m\'appelle Anna', 'コーヒーをください|kōhī o kudasai|Je voudrais un café, s\'il vous plaît|img:coffee'] },
      { npc: 'いつからですか|itsu kara desu ka|Depuis quand ?', ok: 'きのうからです|kinō kara desu|Depuis hier', bad: ['はい|hai|Oui', '右|migi|à droite'] },
      { npc: 'この間違いをおわびします|kono machigai o owabi shimasu|Je m\'excuse pour cette erreur', ok: '直してもらえますか|naoshite moraemasu ka|Je vous prie de le réparer', bad: ['さようなら|sayōnara|Au revoir', 'わかりません|wakarimasen|Je ne comprends pas'] },
      { npc: 'あした直します|ashita naoshimasu|Je le réparerai demain', ok: 'ありがとうございます|arigatō gozaimasu|Merci à vous', bad: ['トイレはどこですか|toire wa doko desu ka|Où sont les toilettes ?', '具合が悪いです|guai ga warui desu|Je suis malade'] },
    ],
  },
  {
    id: 'ja-C12', level: 'advanced', title: 'Un exposé en classe', scene: 'teacher', npcRole: 'le professeur', romanized: true,
    situation: 'Tu présentes un court exposé. Ouvre, argumente, conclus et remercie.',
    key: ['テーマ|tēma|sujet', 'たとえば|tatoeba|par exemple', '最後に|saigo ni|pour conclure', '質問|shitsumon|question'],
    turns: [
      { npc: 'どうぞ、始めてください|dōzo, hajimete kudasai|Je vous en prie, commencez', ok: '私のテーマは言語学習です|watashi no tēma wa gengo gakushū desu|Mon sujet est l\'apprentissage des langues', bad: ['ご清聴ありがとうございました|go-seichō arigatō gozaimashita|Merci de votre attention', 'さようなら|sayōnara|Au revoir'] },
      { npc: 'どうしてこのテーマですか|dōshite kono tēma desu ka|Pourquoi ce sujet ?', ok: '大切だからです|taisetsu da kara desu|Parce qu\'il est important', bad: ['パンをください|pan o kudasai|Je veux du pain|img:bread', 'あした|ashita|Demain'] },
      { npc: '例はありますか|rei wa arimasu ka|As-tu un exemple ?', ok: 'はい、たとえば旅行です|hai, tatoeba ryokō desu|Oui, par exemple les voyages', bad: ['わかりません|wakarimasen|Je ne comprends pas', '右|migi|à droite'] },
      { npc: '最後にどうですか|saigo ni dō desu ka|Et pour conclure ?', ok: '最後に、毎日勉強しています|saigo ni, mainichi benkyō shite imasu|Pour conclure, j\'apprends chaque jour', bad: ['具合が悪いです|guai ga warui desu|Je suis malade', 'こんにちは|konnichiwa|Bonjour'] },
      { npc: 'よくできました|yoku dekimashita|Bravo, bon travail', ok: 'ご清聴ありがとうございました|go-seichō arigatō gozaimashita|Merci de votre attention', bad: ['兄が一人と妹が一人います|ani ga hitori to imōto ga hitori imasu|J\'ai un frère et une sœur', 'いくらですか|ikura desu ka|Combien ça coûte ?'] },
    ],
  },
  {
    id: 'ja-C13', title: 'À la gare', scene: 'station', npcRole: 'l\'employé du guichet', romanized: true,
    situation: 'Tu achètes un billet de train à la gare. Dis où tu vas, demande un billet et paie.',
    key: ['駅|eki|la gare|img:station', '切符|kippu|le billet|img:ticket', '電車|densha|le train|img:train', 'スーツケース|sūtsukēsu|la valise|img:suitcase'],
    turns: [
      { npc: 'こんにちは、どちらまで行きますか|konnichiwa, dochira made ikimasu ka|Bonjour, où allez-vous ?', ok: '町の中心まで行きます|machi no chūshin made ikimasu|Je vais en ville', bad: ['学生です|gakusei desu|Je suis étudiant', 'ありがとうございます|arigatō gozaimasu|Merci'] },
      { npc: '切符は一枚ですか、二枚ですか|kippu wa ichimai desu ka, nimai desu ka|Un billet ou deux ?', img: 'ticket', ok: '切符を一枚お願いします|kippu o ichimai onegai shimasu|Un billet, s\'il vous plaît|img:ticket', bad: ['水がほしいです|mizu ga hoshii desu|Je veux de l\'eau', 'わたしはアンナです|watashi wa Anna desu|Je m\'appelle Anna'] },
      { npc: '二十ユーロです|nijū yūro desu|Ça fait vingt euros', ok: 'どうぞ|dōzo|Voilà', bad: ['いくらですか|ikura desu ka|Combien ça coûte ?', 'コーヒーがすきです|kōhī ga suki desu|J\'aime le café'] },
      { npc: '電車は五時に出ます|densha wa goji ni demasu|Le train part à cinq heures', ok: 'わかりました、ありがとうございます|wakarimashita, arigatō gozaimasu|D\'accord, merci', bad: ['かばんをなくしました|kaban o nakushimashita|J\'ai perdu mon sac', '具合が悪いです|guai ga warui desu|Je suis malade'] },
      { npc: 'いってらっしゃい|itterasshai|Bon voyage !', ok: 'ありがとうございます、さようなら|arigatō gozaimasu, sayōnara|Merci, au revoir', bad: ['こんにちは|konnichiwa|Bonjour', 'わかりません|wakarimasen|Je ne comprends pas'] },
    ],
  },
  {
    id: 'ja-C14', level: 'intermediate', title: 'À l\'hôtel', scene: 'hotel', npcRole: 'le réceptionniste', romanized: true,
    situation: 'Tu arrives à l\'hôtel. Annonce ta réservation, donne ton nom, écoute les consignes.',
    key: ['ホテル|hoteru|l\'hôtel|img:hotel', '部屋|heya|la chambre|img:bed', '鍵|kagi|la clé|img:key', '朝食|chōshoku|le petit-déjeuner'],
    turns: [
      { npc: 'こんにちは、ホテルへようこそ|konnichiwa, hoteru e yōkoso|Bonjour, bienvenue à l\'hôtel', ok: 'こんにちは、予約しています|konnichiwa, yoyaku shite imasu|Bonjour, j\'ai une réservation', bad: ['お会計をお願いします|okaikei o onegai shimasu|L\'addition, s\'il vous plaît', 'お茶がほしいです|ocha ga hoshii desu|Je veux du thé'] },
      { npc: 'お名前は何ですか|onamae wa nan desu ka|Quel est votre nom ?', ok: 'わたしはアンナです|watashi wa Anna desu|Je m\'appelle Anna', bad: ['フランスからきました|Furansu kara kimashita|Je viens de France', 'ありがとうございます|arigatō gozaimasu|Merci'] },
      { npc: 'こちらがお部屋の鍵です|kochira ga oheya no kagi desu|Voici la clé de votre chambre|img:key', img: 'key', ok: 'ありがとうございます|arigatō gozaimasu|Merci', bad: ['さようなら|sayōnara|Au revoir', '具合が悪いです|guai ga warui desu|Je suis malade'] },
      { npc: '朝食は八時です|chōshoku wa hachiji desu|Le petit-déjeuner est à huit heures', ok: '完璧です、ありがとうございます|kanpeki desu, arigatō gozaimasu|C\'est parfait, merci', bad: ['かばんをなくしました|kaban o nakushimashita|J\'ai perdu mon sac', '左|hidari|à gauche'] },
      { npc: 'ほかに何か必要ですか|hoka ni nani ka hitsuyō desu ka|Avez-vous besoin d\'autre chose ?', ok: 'いいえ、大丈夫です。おやすみなさい|iie, daijōbu desu. oyasuminasai|Non, merci, bonne nuit', bad: ['わたしはアンナです|watashi wa Anna desu|Je m\'appelle Anna', 'フランスからきました|Furansu kara kimashita|Je viens de France'] },
    ],
  },
  {
    id: 'ja-C15', level: 'intermediate', title: 'Au téléphone', scene: 'phone', npcRole: 'un ami', romanized: true,
    situation: 'Un ami t\'appelle. Réponds, donne des nouvelles et fixe un rendez-vous pour demain.',
    key: ['電話|denwa|le téléphone|img:phone', '電話番号|denwa bangō|le numéro', 'あした|ashita|demain', 'またあとで|mata ato de|À bientôt'],
    turns: [
      { npc: 'もしもし|moshimoshi|Allô ?', ok: 'もしもし、アンナです|moshimoshi, anna desu|Allô, c\'est Anna', bad: ['ありがとうございます|arigatō gozaimasu|Merci', 'はい|hai|Oui'] },
      { npc: 'おげんきですか|ogenki desu ka|Comment vas-tu ?', ok: 'げんきです|genki desu|Je vais bien, merci', bad: ['わたしはアンナです|watashi wa Anna desu|Je m\'appelle Anna', 'さようなら|sayōnara|Au revoir'] },
      { npc: 'あした暇ですか|ashita hima desu ka|Tu es libre demain ?', ok: 'はい、暇です|hai, hima desu|Oui, je suis libre', bad: ['具合が悪いです|guai ga warui desu|Je suis malade', 'かばんをなくしました|kaban o nakushimashita|J\'ai perdu mon sac'] },
      { npc: '住所をメッセージで送りますね|jūsho o messēji de okurimasu ne|Je t\'envoie l\'adresse par message', ok: 'わかりました、ありがとうございます|wakarimashita, arigatō gozaimasu|D\'accord, merci', bad: ['学生です|gakusei desu|Je suis étudiant', 'わかりません|wakarimasen|Je ne comprends pas'] },
      { npc: 'また明日|mata ashita|À demain !', ok: 'また明日|mata ashita|À demain !', bad: ['こんにちは|konnichiwa|Bonjour', 'コーヒーがすきです|kōhī ga suki desu|J\'aime le café'] },
    ],
  },
  {
    id: 'ja-C16', level: 'intermediate', title: 'À l\'aéroport', scene: 'airport', npcRole: 'l\'agent d\'enregistrement', romanized: true,
    situation: 'Tu enregistres ton vol. Montre ton passeport, dis où tu vas et demande ta porte.',
    key: ['空港|kūkō|l\'aéroport|img:airport', 'パスポート|pasupōto|le passeport', 'スーツケース|sūtsukēsu|la valise|img:suitcase', '飛行機|hikōki|l\'avion|img:airplane'],
    turns: [
      { npc: 'パスポートをお願いします|pasupōto o onegai shimasu|Votre passeport, s\'il vous plaît', ok: 'これが私のパスポートです|kore ga watashi no pasupōto desu|Voici mon passeport', bad: ['学生です|gakusei desu|Je suis étudiant', 'いくらですか|ikura desu ka|Combien ça coûte ?'] },
      { npc: 'こんにちは、どちらまで行きますか|konnichiwa, dochira made ikimasu ka|Bonjour, où allez-vous ?', ok: 'フランスへ行きます|furansu e ikimasu|Je vais en France', bad: ['ありがとうございます|arigatō gozaimasu|Merci', 'あした|ashita|Demain'] },
      { npc: 'スーツケースはありますか|sūtsukēsu wa arimasu ka|Avez-vous une valise ?', img: 'suitcase', ok: 'はい、スーツケースがあります|hai, sūtsukēsu ga arimasu|Oui, j\'ai une valise|img:suitcase', bad: ['コーヒーがすきです|kōhī ga suki desu|J\'aime le café', 'わたしはアンナです|watashi wa Anna desu|Je m\'appelle Anna'] },
      { npc: '飛行機は十時に出ます|hikōki wa jūji ni demasu|L\'avion part à dix heures', ok: 'ありがとうございます、搭乗口はどこですか|arigatō gozaimasu, tōjōguchi wa doko desu ka|Merci, où est la porte d\'embarquement ?', bad: ['かばんをなくしました|kaban o nakushimashita|J\'ai perdu mon sac', '具合が悪いです|guai ga warui desu|Je suis malade'] },
      { npc: '良い空の旅を|yoi sora no tabi o|Bon vol !', ok: 'ありがとうございます、さようなら|arigatō gozaimasu, sayōnara|Merci, au revoir', bad: ['こんにちは|konnichiwa|Bonjour', 'わかりません|wakarimasen|Je ne comprends pas'] },
    ],
  },
];
