import type { ConvSpec } from '../conversations';

// ─── KO — conversations guidées A1 (générées depuis la table de phrases communes) ───
// À faire relire par un locuteur natif.

export const KO_CONVERSATIONS: ConvSpec[] = [
  {
    id: 'ko-C1', title: 'Rencontre', scene: 'handshake', npcRole: 'une personne que tu rencontres', romanized: true,
    situation: 'Tu rencontres quelqu\'un pour la première fois. Salue, présente-toi, réponds à ses questions.',
    key: ['안녕하세요|annyeonghaseyo|Bonjour (le matin)', '제 이름은 안나입니다|je ireumeun annaimnida|Je m\'appelle Anna', '저는 프랑스 사람입니다|jeoneun peurangseu saramimnida|Je viens de France', '만나서 반갑습니다|mannaseo bangapseumnida|Enchanté(e)'],
    turns: [
      { npc: '안녕하세요|annyeonghaseyo|Bonjour (le matin)', ok: '안녕하세요|annyeonghaseyo|Bonjour (le matin)', bad: ['안녕히 주무세요|annyeonghi jumuseyo|Bonne nuit', '안녕히 가세요|annyeonghi gaseyo|Au revoir'] },
      { npc: '이름이 뭐예요?|ireumi mwoyeyo|Comment t\'appelles-tu ?', ok: '제 이름은 안나입니다|je ireumeun annaimnida|Je m\'appelle Anna', bad: ['잘 지내요|jal jinaeyo|Je vais bien, merci', '저는 프랑스 사람입니다|jeoneun peurangseu saramimnida|Je viens de France'] },
      { npc: '어느 나라 사람이에요?|eoneu nara saramieyo|D\'où viens-tu ?', ok: '저는 프랑스 사람입니다|jeoneun peurangseu saramimnida|Je viens de France', bad: ['제 이름은 안나입니다|je ireumeun annaimnida|Je m\'appelle Anna', '감사합니다|gamsahamnida|Merci'] },
      { npc: '만나서 반갑습니다|mannaseo bangapseumnida|Enchanté(e)', ok: '만나서 반갑습니다|mannaseo bangapseumnida|Enchanté(e)', bad: ['잘 모르겠어요|jal moreugesseoyo|Je ne comprends pas', '아니에요|anieyo|De rien'] },
      { npc: '어떻게 지내세요?|eotteoke jinaeseyo|Comment vas-tu ?', ok: '잘 지내요|jal jinaeyo|Je vais bien, merci', bad: ['안녕하세요|annyeonghaseyo|Bonjour (le matin)', '병원이 어디예요?|byeongwoni eodiyeyo|Où est l\'hôpital ?'] },
      { npc: '안녕히 가세요|annyeonghi gaseyo|Au revoir', ok: '다음에 봐요|daeume bwayo|À bientôt', bad: ['안녕하세요|annyeonghaseyo|Bonjour (le matin)', '네|ne|Oui'] },
    ],
  },
  {
    id: 'ko-C2', title: 'Au café', scene: 'coffee', npcRole: 'le serveur', romanized: true,
    situation: 'Tu entres dans un café. Commande une boisson, réponds au serveur, paie.',
    key: ['커피|keopi|café|img:coffee', '차|cha|thé|img:tea', '물|mul|eau|img:water', '주스|juseu|jus|img:juice'],
    turns: [
      { npc: '어서 오세요, 뭐 드릴까요?|eoseo oseyo, mwo deurilkkayo|Bonjour, que veux-tu ?', ok: '커피 주세요|keopi juseyo|Je voudrais un café, s\'il vous plaît|img:coffee', bad: ['병원이 어디예요?|byeongwoni eodiyeyo|Où est l\'hôpital ?', '안녕히 가세요|annyeonghi gaseyo|Au revoir'] },
      { npc: '또 필요한 거 있으세요?|tto piryohan geo isseuseyo|Autre chose ?', ok: '아니요, 괜찮아요|aniyo, gwaenchanayo|Non, merci', bad: ['제 이름은 안나입니다|je ireumeun annaimnida|Je m\'appelle Anna', '다음에 봐요|daeume bwayo|À bientôt'] },
      { npc: '삼 유로예요|sam yuroyeyo|Ça fait trois euros|img:money', ok: '여기 있어요|yeogi isseoyo|Voilà', bad: ['얼마예요?|eolmayeyo|Combien ça coûte ?', '저는 커피를 좋아해요|jeoneun keopireul joahaeyo|J\'aime le café'] },
      { npc: '감사합니다|gamsahamnida|Merci', ok: '아니에요|anieyo|De rien', bad: ['잘 모르겠어요|jal moreugesseoyo|Je ne comprends pas', '네|ne|Oui'] },
    ],
  },
  {
    id: 'ko-C3', title: 'Au marché', scene: 'market', npcRole: 'le vendeur', romanized: true,
    situation: 'Tu fais tes courses au marché. Demande ce que tu veux, le prix, et paie.',
    key: ['빵|ppang|pain|img:bread', '계란|gyeran|œufs|img:eggs', '생선|saengseon|poisson|img:fish', '돈|don|argent|img:money'],
    turns: [
      { npc: '어서 오세요, 뭘 드릴까요?|eoseo oseyo, mwol deurilkkayo|Bonjour, que désirez-vous ?', ok: '빵 주세요|ppang juseyo|Je veux du pain|img:bread', bad: ['안녕히 가세요|annyeonghi gaseyo|Au revoir', '병원이 어디예요?|byeongwoni eodiyeyo|Où est l\'hôpital ?'] },
      { npc: '몇 개 드릴까요?|myeot gae deurilkkayo|Combien en voulez-vous ?', ok: '두 개 주세요|du gae juseyo|Deux, s\'il vous plaît', bad: ['안녕하세요|annyeonghaseyo|Bonjour (le matin)', '안녕히 주무세요|annyeonghi jumuseyo|Bonne nuit'] },
      { npc: '여기 있어요|yeogi isseoyo|Voilà', ok: '얼마예요?|eolmayeyo|Combien ça coûte ?', bad: ['잘 모르겠어요|jal moreugesseoyo|Je ne comprends pas', '제 이름은 안나입니다|je ireumeun annaimnida|Je m\'appelle Anna'] },
      { npc: '오 유로예요|o yuroyeyo|Ça fait cinq euros|img:money', ok: '여기 있어요|yeogi isseoyo|Voilà', bad: ['두 개 주세요|du gae juseyo|Deux, s\'il vous plaît', '네|ne|Oui'] },
      { npc: '감사합니다, 안녕히 계세요|gamsahamnida, annyeonghi gyeseyo|Merci, au revoir', ok: '안녕히 가세요|annyeonghi gaseyo|Au revoir', bad: ['안녕하세요|annyeonghaseyo|Bonjour (le matin)', '안녕히 주무세요|annyeonghi jumuseyo|Bonne nuit'] },
    ],
  },
  {
    id: 'ko-C4', title: 'Demander son chemin', scene: 'street', npcRole: 'un passant', romanized: true,
    situation: 'Tu cherches l\'hôpital. Demande ton chemin et comprends la réponse.',
    key: ['병원|byeongwon|hôpital|img:hospital', '길|gil|rue|img:street', '학교|hakgyo|école|img:school', '시장|sijang|marché|img:market'],
    turns: [
      { npc: '도와드릴까요?|dowadeurilkkayo|Avez-vous besoin d\'aide ?', ok: '네, 병원이 어디예요?|ne, byeongwoni eodiyeyo|Oui, où est l\'hôpital ?|img:hospital', bad: ['안녕히 가세요|annyeonghi gaseyo|Au revoir', '제 이름은 안나입니다|je ireumeun annaimnida|Je m\'appelle Anna'] },
      { npc: '쭉 가서 왼쪽으로 가세요|jjuk gaseo oenjjogeuro gaseyo|Tout droit puis à gauche', ok: '멀어요?|meoreoyo|Est-ce loin ?', bad: ['저는 프랑스 사람입니다|jeoneun peurangseu saramimnida|Je viens de France', '빵 주세요|ppang juseyo|Je veux du pain|img:bread'] },
      { npc: '아니요, 가까워요|aniyo, gakkawoyo|Non, c\'est près', ok: '감사합니다|gamsahamnida|Merci', bad: ['잘 모르겠어요|jal moreugesseoyo|Je ne comprends pas', '두 개 주세요|du gae juseyo|Deux, s\'il vous plaît'] },
      { npc: '아니에요|anieyo|De rien', ok: '안녕히 가세요|annyeonghi gaseyo|Au revoir', bad: ['커피 주세요|keopi juseyo|Je voudrais un café, s\'il vous plaît|img:coffee', '안녕하세요|annyeonghaseyo|Bonjour (le matin)'] },
    ],
  },
];
