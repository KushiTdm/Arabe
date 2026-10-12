import type { ConvSpec } from '../conversations';

// ─── JA — conversations guidées A1 (générées depuis la table de phrases communes) ───
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
];
