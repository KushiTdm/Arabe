import type { ConvSpec } from '../conversations';

// ─── JA — conversations guidées C17 à C20 (supermarché, plage, chez un ami, taxi) ───
// Générées depuis une table de phrases communes à 11 langues. À faire relire par un locuteur natif.

export const JA_CONVERSATIONS2: ConvSpec[] = [
  {
    id: 'ja-C17', title: 'Au supermarché', scene: 'supermarket', npcRole: 'l\'employé du magasin', romanized: true,
    situation: 'Tu fais tes courses. Demande où est le lait, réponds à l\'employé et paie.',
    key: ['ぎゅうにゅう|gyūnyū|le lait|img:milk', 'パン|pan|le pain|img:bread', 'りんご|ringo|la pomme|img:apple', 'ふくろ|fukuro|le sac|img:bag'],
    turns: [
      { npc: 'いらっしゃいませ。何かお探しですか|irasshaimase. nanika osagashi desu ka|Bonjour, je peux vous aider ?', ok: '牛乳はどこですか|gyūnyū wa doko desu ka|Où est le lait ?', bad: ['さようなら|sayōnara|Au revoir', 'ありがとう|arigatō|Merci'] },
      { npc: '牛乳はあそこの右側です|gyūnyū wa asoko no migigawa desu|Le lait est là-bas, à droite', ok: 'どうもありがとうございます|dōmo arigatō gozaimasu|Merci beaucoup', bad: ['こんにちは|konnichiwa|Bonjour', 'フランスから来ました|furansu kara kimashita|Je viens de France'] },
      { npc: 'ほかに何かありますか|hoka ni nanika arimasu ka|Voulez-vous autre chose ?', ok: 'はい、パンとりんごをください|hai, pan to ringo o kudasai|Oui, du pain et des pommes', bad: ['はじめまして|hajimemashite|Enchanté(e)', 'あした|ashita|Demain'] },
      { npc: 'ふくろは要りますか|fukuro wa irimasu ka|Voulez-vous un sac ?', ok: 'はい、お願いします|hai, onegai shimasu|Oui, s\'il vous plaît', bad: ['わかりません|wakarimasen|Je ne comprends pas', 'さようなら|sayōnara|Au revoir'] },
      { npc: '十ユーロです|jū yūro desu|Ça fait dix euros', ok: 'はい、どうぞ|hai, dōzo|Voilà, tenez', bad: ['お元気ですか|ogenki desu ka|Comment vas-tu ?', 'わかりません|wakarimasen|Je ne comprends pas'] },
      { npc: '良い一日を|yoi ichinichi o|Bonne journée !', ok: 'ありがとう、そちらも|arigatō, sochira mo|Merci, à vous aussi', bad: ['わかりません|wakarimasen|Je ne comprends pas', 'こんにちは|konnichiwa|Bonjour'] },
    ],
  },
  {
    id: 'ja-C18', title: 'À la plage', scene: 'beach', npcRole: 'un ami', romanized: true,
    situation: 'Tu passes la journée à la plage avec un ami. Parle du temps, de la mer et de l\'eau.',
    key: ['ビーチ|bīchi|la plage|img:beach', 'うみ|umi|la mer|img:sea', 'たいよう|taiyō|le soleil|img:sun', 'みず|mizu|l\'eau|img:water'],
    turns: [
      { npc: '今日はいい天気ですね|kyō wa ii tenki desu ne|Il fait beau aujourd\'hui', ok: 'はい、とても暑いです|hai, totemo atsui desu|Oui, il fait très chaud', bad: ['私はカリムです|watashi wa Karimu desu|Je m\'appelle Karim', 'さようなら|sayōnara|Au revoir'] },
      { npc: '海は好きですか|umi wa suki desu ka|Tu aimes la mer ?', ok: 'はい、海が大好きです|hai, umi ga daisuki desu|Oui, j\'aime beaucoup la mer', bad: ['五時です|goji desu|Il est cinq heures', 'フランスから来ました|furansu kara kimashita|Je viens de France'] },
      { npc: '泳ぎたいですか|oyogitai desu ka|Tu veux nager ?', ok: 'はい、行きましょう|hai, ikimashō|Oui, allons-y !', bad: ['学生です|gakusei desu|Je suis étudiant', '駅はどこですか|eki wa doko desu ka|Où est la gare ?'] },
      { npc: 'のどがかわきましたか|nodo ga kawakimashita ka|Tu as soif ?', ok: 'はい、水がほしいです|hai, mizu ga hoshii desu|Oui, je veux de l\'eau', bad: ['あした|ashita|Demain', 'はじめまして|hajimemashite|Enchanté(e)'] },
      { npc: 'はい、水です|hai, mizu desu|Voici de l\'eau', ok: 'ありがとう|arigatō|Merci', bad: ['どういたしまして|dō itashimashite|De rien', 'さようなら|sayōnara|Au revoir'] },
      { npc: 'そろそろ帰りましょうか。遅いですから|sorosoro kaerimashō ka. osoi desu kara|On rentre ? Il est tard', ok: 'はい、またあした|hai, mata ashita|D\'accord, à demain', bad: ['こんにちは|konnichiwa|Bonjour', 'いくらですか|ikura desu ka|Combien ça coûte ?'] },
    ],
  },
  {
    id: 'ja-C19', title: 'Chez un ami', scene: 'house', npcRole: 'ton hôte', romanized: true,
    situation: 'Un ami t\'invite chez lui. Remercie, accepte une boisson et goûte ce qu\'il t\'offre.',
    key: ['いえ|ie|la maison|img:house', 'おちゃ|ocha|le thé|img:tea', 'パン|pan|le pain|img:bread', 'はちみつ|hachimitsu|le miel|img:honey'],
    turns: [
      { npc: 'うちへようこそ|uchi e yōkoso|Bienvenue chez moi !', ok: 'ありがとう、すてきな家ですね|arigatō, suteki na ie desu ne|Merci, ta maison est belle', bad: ['さようなら|sayōnara|Au revoir', 'わかりません|wakarimasen|Je ne comprends pas'] },
      { npc: 'どうぞ入って、座ってください|dōzo haitte, suwatte kudasai|Entre et assieds-toi', ok: 'どうもありがとうございます|dōmo arigatō gozaimasu|Merci beaucoup', bad: ['駅はどこですか|eki wa doko desu ka|Où est la gare ?', 'どういたしまして|dō itashimashite|De rien'] },
      { npc: 'お茶とコーヒー、どちらがいいですか|ocha to kōhī, dochira ga ii desu ka|Tu veux du thé ou du café ?', ok: 'お茶をお願いします|ocha o onegai shimasu|Du thé, s\'il te plaît', bad: ['フランスから来ました|furansu kara kimashita|Je viens de France', 'さようなら|sayōnara|Au revoir'] },
      { npc: 'おなかがすきましたか|onaka ga sukimashita ka|Tu as faim ?', ok: '少しだけ、ありがとう|sukoshi dake, arigatō|Un peu, merci', bad: ['はい、とても暑いです|hai, totemo atsui desu|Oui, il fait très chaud', '私はカリムです|watashi wa Karimu desu|Je m\'appelle Karim'] },
      { npc: 'パンとはちみつです、どうぞ|pan to hachimitsu desu, dōzo|Voici du pain et du miel', ok: 'とてもおいしいです|totemo oishii desu|C\'est très bon !', bad: ['牛乳はどこですか|gyūnyū wa doko desu ka|Où est le lait ?', 'こんにちは|konnichiwa|Bonjour'] },
      { npc: 'また来てくださいね|mata kite kudasai ne|Reviens bientôt !', ok: '喜んで。いろいろありがとう|yorokonde. iroiro arigatō|Avec plaisir, merci pour tout', bad: ['いくらですか|ikura desu ka|Combien ça coûte ?', 'はじめまして|hajimemashite|Enchanté(e)'] },
    ],
  },
  {
    id: 'ja-C20', level: 'intermediate', title: 'En taxi', scene: 'taxi', npcRole: 'le chauffeur de taxi', romanized: true,
    situation: 'Tu prends un taxi pour l\'aéroport. Dis ta destination, bavarde un peu et paie la course.',
    key: ['タクシー|takushī|le taxi|img:taxi', 'くうこう|kūkō|l\'aéroport|img:airport', 'スーツケース|sūtsukēsu|la valise|img:suitcase', 'きっぷ|kippu|le billet|img:ticket'],
    turns: [
      { npc: 'こんにちは、どちらまでですか|konnichiwa, dochira made desu ka|Bonjour, où allez-vous ?', ok: '空港までお願いします|kūkō made onegai shimasu|À l\'aéroport, s\'il vous plaît', bad: ['私はカリムです|watashi wa Karimu desu|Je m\'appelle Karim', 'お茶をお願いします|ocha o onegai shimasu|Du thé, s\'il te plaît'] },
      { npc: '二十分かかります|nijuppun kakarimasu|C\'est à vingt minutes', ok: 'わかりました|wakarimashita|D\'accord', bad: ['はじめまして|hajimemashite|Enchanté(e)', '牛乳はどこですか|gyūnyū wa doko desu ka|Où est le lait ?'] },
      { npc: 'ご旅行ですか|go-ryokō desu ka|Vous êtes en voyage ?', ok: 'はい、フランスから来ました|hai, furansu kara kimashita|Oui, je viens de France', bad: ['はい、とても暑いです|hai, totemo atsui desu|Oui, il fait très chaud', 'さようなら|sayōnara|Au revoir'] },
      { npc: '着きました|tsukimashita|Nous sommes arrivés', ok: 'ここで止めてください|koko de tomete kudasai|Arrêtez-vous ici, s\'il vous plaît', bad: ['こんにちは|konnichiwa|Bonjour', 'いくらですか|ikura desu ka|Combien ça coûte ?'] },
      { npc: '十五ユーロです|jūgo yūro desu|Ça fait quinze euros', ok: 'はい、おつりはいりません|hai, otsuri wa irimasen|Voilà, gardez la monnaie', bad: ['わかりません|wakarimasen|Je ne comprends pas', 'さようなら|sayōnara|Au revoir'] },
      { npc: '良い旅を|yoi tabi o|Bon voyage !', ok: 'ありがとうございます、さようなら|arigatō gozaimasu, sayōnara|Merci, au revoir', bad: ['こんにちは|konnichiwa|Bonjour', '駅はどこですか|eki wa doko desu ka|Où est la gare ?'] },
    ],
  },
];
