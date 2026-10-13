import type { ConvSpec } from '../conversations';

// ─── KO — conversations guidées (générées depuis la table de phrases communes) ───
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
  {
    id: 'ko-C5', title: 'Ma famille', scene: '👨‍👩‍👧', npcRole: 'un ami', romanized: true,
    situation: 'Un ami regarde tes photos de famille. Dis qui est sur chaque photo.',
    key: ['아버지|abeoji|père|img:father', '어머니|eomeoni|mère|img:mother', '형|hyeong|frère|img:brother', '여동생|yeodongsaeng|sœur|img:sister'],
    turns: [
      { npc: '누구예요?|nuguyeyo|Qui est-ce ?', img: 'father', ok: '우리 아버지예요|uri abeojiyeyo|C\'est mon père', bad: ['제 형이에요|je hyeongieyo|C\'est mon frère', '우리 어머니예요|uri eomeoniyeyo|C\'est ma mère'] },
      { npc: '누구예요?|nuguyeyo|Qui est-ce ?', img: 'mother', ok: '우리 어머니예요|uri eomeoniyeyo|C\'est ma mère', bad: ['제 여동생이에요|je yeodongsaengieyo|C\'est ma sœur', '우리 아버지예요|uri abeojiyeyo|C\'est mon père'] },
      { npc: '누구예요?|nuguyeyo|Qui est-ce ?', img: 'sister', ok: '제 여동생이에요|je yeodongsaengieyo|C\'est ma sœur', bad: ['우리 어머니예요|uri eomeoniyeyo|C\'est ma mère', '제 형이에요|je hyeongieyo|C\'est mon frère'] },
      { npc: '누구예요?|nuguyeyo|Qui est-ce ?', img: 'brother', ok: '제 형이에요|je hyeongieyo|C\'est mon frère', bad: ['우리 아버지예요|uri abeojiyeyo|C\'est mon père', '제 여동생이에요|je yeodongsaengieyo|C\'est ma sœur'] },
      { npc: '형제자매가 있어요?|hyeongjejamaega isseoyo|As-tu des frères et sœurs ?', ok: '형 한 명과 여동생 한 명이 있어요|hyeong han myeonggwa yeodongsaeng han myeongi isseoyo|J\'ai un frère et une sœur', bad: ['저는 학생이에요|jeoneun haksaengieyo|Je suis étudiant', '물 주세요|mul juseyo|Je veux de l\'eau'] },
    ],
  },
  {
    id: 'ko-C6', level: 'intermediate', title: 'Au restaurant', scene: 'fish', npcRole: 'le serveur', romanized: true,
    situation: 'Tu dînes au restaurant. Commande un plat et une boisson, donne ton avis, demande l\'addition.',
    key: ['생선|saengseon|poisson|img:fish', '주스|juseu|jus|img:juice', '맛있는|masinneun|délicieux', '계산서|gyesanseo|l\'addition|img:money'],
    turns: [
      { npc: '어서 오세요|eoseo oseyo|Bienvenue', ok: '안녕하세요|annyeonghaseyo|Bonjour', bad: ['계산해 주세요|gyesanhae juseyo|L\'addition, s\'il vous plaît', '안녕히 가세요|annyeonghi gaseyo|Au revoir'] },
      { npc: '뭐 먹을래요?|mwo meogeullaeyo|Que veux-tu manger ?', ok: '생선으로 할게요|saengseoneuro halgeyo|Je voudrais du poisson|img:fish', bad: ['저는 학생이에요|jeoneun haksaengieyo|Je suis étudiant', '내일|naeil|Demain'] },
      { npc: '뭐 마실래요?|mwo masilaeyo|Et que veux-tu boire ?', ok: '주스가 더 좋아요|juseuga deo joayo|Je préfère le jus|img:juice', bad: ['제 이름은 안나입니다|je ireumeun annaimnida|Je m\'appelle Anna', '가방을 잃어버렸어요|gabangeul ireobeoryeosseoyo|J\'ai perdu mon sac'] },
      { npc: '맛있어요?|masisseoyo|Est-ce que c\'est bon ?', ok: '네, 아주 맛있어요|ne, aju masisseoyo|Oui, c\'est très bon', bad: ['잘 모르겠어요|jal moreugesseoyo|Je ne comprends pas', '오른쪽|oreunjjok|à droite'] },
      { npc: '또 필요한 거 있으세요?|tto piryohan geo isseuseyo|Autre chose ?', ok: '아니요, 계산해 주세요|aniyo, gyesanhae juseyo|Non, l\'addition, s\'il vous plaît', bad: ['저는 커피를 좋아해요|jeoneun keopireul joahaeyo|J\'aime le café', '화장실이 어디예요?|hwajangsiri eodiyeyo|Où sont les toilettes ?'] },
    ],
  },
  {
    id: 'ko-C7', level: 'intermediate', title: 'À l\'université', scene: 'university', npcRole: 'le professeur', romanized: true,
    situation: 'C\'est ton premier jour à l\'université. Réponds à ton professeur et demande où est la bibliothèque.',
    key: ['교수|gyosu|professeur|img:teacher', '학생|haksaeng|étudiant|img:student', '도서관|doseogwan|bibliothèque|img:library', '대학교|daehakgyo|université|img:university'],
    turns: [
      { npc: '안녕하세요|annyeonghaseyo|Bonjour (le matin)', ok: '안녕하세요|annyeonghaseyo|Bonjour', bad: ['좋은 저녁이에요|joeun jeonyeogieyo|Bonsoir', '아니에요|anieyo|De rien'] },
      { npc: '새로 온 학생이에요?|saero on haksaengieyo|Es-tu un nouvel étudiant ?', ok: '네, 새로 온 학생이에요|ne, saero on haksaengieyo|Oui, je suis un nouvel étudiant|img:student', bad: ['잘 모르겠어요|jal moreugesseoyo|Je ne comprends pas', '얼마예요?|eolmayeyo|Combien ça coûte ?'] },
      { npc: '뭘 공부해요?|mwol gongbuhaeyo|Qu\'étudies-tu ?', ok: '언어를 공부해요|eoneoreul gongbuhaeyo|J\'étudie les langues', bad: ['저는 프랑스 사람입니다|jeoneun peurangseu saramimnida|Je viens de France', '빵 주세요|ppang juseyo|Je veux du pain|img:bread'] },
      { npc: '질문 있어요?|jilmun isseoyo|As-tu une question ?', ok: '네, 도서관이 어디예요?|ne, doseogwani eodiyeyo|Oui, où est la bibliothèque ?|img:library', bad: ['감사합니다|gamsahamnida|Merci', '내일|naeil|Demain'] },
      { npc: '도서관은 가까워요. 쭉 가세요|doseogwaneun gakkawoyo. jjuk gaseyo|La bibliothèque est près, tout droit', ok: '감사합니다, 교수님|gamsahamnida, gyosunim|Merci, professeur', bad: ['실수해서 죄송합니다|silsuhaeseo joesonghamnida|Je m\'excuse pour cette erreur', '안녕하세요|annyeonghaseyo|Bonjour'] },
    ],
  },
  {
    id: 'ko-C8', level: 'intermediate', title: 'Chez le médecin', scene: 'hospital', npcRole: 'le médecin', romanized: true,
    situation: 'Tu ne te sens pas bien. Explique ce que tu as et écoute les conseils du médecin.',
    key: ['의사|uisa|médecin|img:doctor', '머리|meori|tête|img:head', '물|mul|eau|img:water', '어제부터요|eojebuteoyo|Depuis hier'],
    turns: [
      { npc: '안녕하세요, 무슨 일이세요?|annyeonghaseyo, museun irisyeyo|Bonjour, quel est le problème ?', ok: '아파요|apayo|Je suis malade', bad: ['저는 학생이에요|jeoneun haksaengieyo|Je suis étudiant', '커피 주세요|keopi juseyo|Je voudrais un café, s\'il vous plaît|img:coffee'] },
      { npc: '어디가 아파요?|eodiga apayo|Où as-tu mal ?', ok: '머리가 아파요|meoriga apayo|J\'ai mal à la tête|img:head', bad: ['저는 프랑스 사람입니다|jeoneun peurangseu saramimnida|Je viens de France', '왼쪽|oenjjok|à gauche'] },
      { npc: '언제부터요?|eonjebuteoyo|Depuis quand ?', ok: '어제부터요|eojebuteoyo|Depuis hier', bad: ['내일|naeil|Demain', '네|ne|Oui'] },
      { npc: '약을 드릴게요|yageul deurilgeyo|Je vais te donner un médicament', ok: '감사합니다, 선생님|gamsahamnida, seonsaengnim|Merci, docteur', bad: ['안녕히 가세요|annyeonghi gaseyo|Au revoir', '공항이 어디예요?|gonghangi eodiyeyo|Où est l\'aéroport ?'] },
      { npc: '물을 많이 드세요|mureul mani deuseyo|Bois beaucoup d\'eau|img:water', ok: '알겠어요|algesseoyo|D\'accord', bad: ['가방을 잃어버렸어요|gabangeul ireobeoryeosseoyo|J\'ai perdu mon sac', '얼마예요?|eolmayeyo|Combien ça coûte ?'] },
    ],
  },
  {
    id: 'ko-C9', level: 'intermediate', title: 'Inviter un ami', scene: 'sunset', npcRole: 'un ami', romanized: true,
    situation: 'Un ami te propose de sortir. Accepte, fixe l\'heure et le lieu.',
    key: ['내일|naeil|demain', '카페|kape|le café|img:coffee', '다섯 시|daseot si|cinq heures|img:clock', '다음에 봐요|daeume bwayo|À bientôt'],
    turns: [
      { npc: '좋은 저녁이에요|joeun jeonyeogieyo|Bonsoir', ok: '좋은 저녁이에요|joeun jeonyeogieyo|Bonsoir', bad: ['안녕하세요|annyeonghaseyo|Bonjour (le matin)', '아니에요|anieyo|De rien'] },
      { npc: '내일 놀러 갈래요?|naeil nolleo gallaeyo|Veux-tu qu\'on sorte demain ?', ok: '네, 좋아요|ne, joayo|Oui, avec plaisir', bad: ['잘 모르겠어요|jal moreugesseoyo|Je ne comprends pas', '아파요|apayo|Je suis malade'] },
      { npc: '어디에서 만날까요?|eodieseo mannalkkayo|Où se retrouve-t-on ?', ok: '카페에서요|kapeeseoyo|Au café|img:coffee', bad: ['저는 학생이에요|jeoneun haksaengieyo|Je suis étudiant', '제 이름은 안나입니다|je ireumeun annaimnida|Je m\'appelle Anna'] },
      { npc: '몇 시에 만날까요?|myeot sie mannalkkayo|À quelle heure ?', ok: '다섯 시에요|daseot sieyo|À cinq heures|img:clock', bad: ['오른쪽|oreunjjok|à droite', '차를 마시고 싶어요|chareul masigo sipeoyo|Je veux du thé'] },
      { npc: '좋아요, 그때 봐요|joayo, geuttae bwayo|C\'est entendu', ok: '다음에 봐요|daeume bwayo|À bientôt', bad: ['안녕하세요|annyeonghaseyo|Bonjour', '얼마예요?|eolmayeyo|Combien ça coûte ?'] },
    ],
  },
  {
    id: 'ko-C10', level: 'advanced', title: 'Donner son avis sur une ville', scene: 'city', npcRole: 'un ami', romanized: true,
    situation: 'Un ami te demande ce que tu penses de sa ville. Donne ton avis et justifie-le.',
    key: ['도시|dosi|ville|img:city', '아름다운|areumdaun|beau', '왜냐하면|waenyahamyeon|parce que', '하지만|hajiman|mais'],
    turns: [
      { npc: '이 도시를 어떻게 생각해요?|i dosireul eotteoke saenggakaeyo|Que penses-tu de cette ville ?', ok: '도시가 아름답다고 생각해요|dosiga areumdapdago saenggakaeyo|Je pense que la ville est belle|img:city', bad: ['저는 프랑스 사람입니다|jeoneun peurangseu saramimnida|Je viens de France', '안녕히 가세요|annyeonghi gaseyo|Au revoir'] },
      { npc: '왜요?|waeyo|Pourquoi ?', ok: '깨끗하고 조용하니까요|kkaekkeutago joyonghanikkayo|Parce qu\'elle est propre et calme', bad: ['내일|naeil|Demain', '제 이름은 안나입니다|je ireumeun annaimnida|Je m\'appelle Anna'] },
      { npc: '하지만 비싸요|hajiman bissayo|Mais elle est chère', ok: '맞아요, 그래도 좋아해요|majayo, geuraedo joahaeyo|Je suis d\'accord, mais je l\'aime', bad: ['잘 모르겠어요|jal moreugesseoyo|Je ne comprends pas', '감사합니다|gamsahamnida|Merci'] },
      { npc: '또 방문할 거예요?|tto bangmunhal geoyeyo|La visiteras-tu encore ?', ok: '네, 또 방문할 거예요|ne, tto bangmunhal geoyeyo|Oui, je la visiterai encore', bad: ['아파요|apayo|Je suis malade', '왼쪽|oenjjok|à gauche'] },
    ],
  },
  {
    id: 'ko-C11', level: 'advanced', title: 'Une réclamation', scene: 'money', npcRole: 'l\'employé', romanized: true,
    situation: 'Ton appareil ne marche pas. Explique le problème et demande une réparation ou un dédommagement.',
    key: ['문제|munje|problème', '기계|gigye|l\'appareil', '보상|bosang|dédommagement', '책임자|chaegimja|directeur'],
    turns: [
      { npc: '무엇을 도와드릴까요?|mueoseul dowadeurilkkayo|Comment puis-je t\'aider ?', ok: '문제가 있어요|munjega isseoyo|J\'ai un problème', bad: ['안녕하세요|annyeonghaseyo|Bonjour', '저는 학생이에요|jeoneun haksaengieyo|Je suis étudiant'] },
      { npc: '무슨 문제예요?|museun munjeyeyo|Quel est le problème ?', ok: '기계가 작동하지 않아요|gigyega jakdonghaji anayo|L\'appareil ne fonctionne pas', bad: ['제 이름은 안나입니다|je ireumeun annaimnida|Je m\'appelle Anna', '커피 주세요|keopi juseyo|Je voudrais un café, s\'il vous plaît|img:coffee'] },
      { npc: '언제부터요?|eonjebuteoyo|Depuis quand ?', ok: '어제부터요|eojebuteoyo|Depuis hier', bad: ['네|ne|Oui', '오른쪽|oreunjjok|à droite'] },
      { npc: '실수해서 죄송합니다|silsuhaeseo joesonghamnida|Je m\'excuse pour cette erreur', ok: '수리해 주세요|surihae juseyo|Je vous prie de le réparer', bad: ['안녕히 가세요|annyeonghi gaseyo|Au revoir', '잘 모르겠어요|jal moreugesseoyo|Je ne comprends pas'] },
      { npc: '내일 수리해 드릴게요|naeil surihae deurilgeyo|Je le réparerai demain', ok: '감사합니다|gamsahamnida|Merci à vous', bad: ['화장실이 어디예요?|hwajangsiri eodiyeyo|Où sont les toilettes ?', '아파요|apayo|Je suis malade'] },
    ],
  },
  {
    id: 'ko-C12', level: 'advanced', title: 'Un exposé en classe', scene: 'teacher', npcRole: 'le professeur', romanized: true,
    situation: 'Tu présentes un court exposé. Ouvre, argumente, conclus et remercie.',
    key: ['주제|juje|sujet', '예를 들어|yereul deureo|par exemple', '마지막으로|majimageuro|pour conclure', '질문|jilmun|question'],
    turns: [
      { npc: '시작하세요|sijakaseyo|Je vous en prie, commencez', ok: '제 주제는 언어 학습이에요|je jujeneun eoneo hakseubieyo|Mon sujet est l\'apprentissage des langues', bad: ['들어 주셔서 감사합니다|deureo jusyeoseo gamsahamnida|Merci de votre attention', '안녕히 가세요|annyeonghi gaseyo|Au revoir'] },
      { npc: '왜 이 주제예요?|wae i jujeyeyo|Pourquoi ce sujet ?', ok: '중요하니까요|jungyohanikkayo|Parce qu\'il est important', bad: ['빵 주세요|ppang juseyo|Je veux du pain|img:bread', '내일|naeil|Demain'] },
      { npc: '예를 하나 들어 주실래요?|yereul hana deureo jusillaeyo|As-tu un exemple ?', ok: '네, 예를 들면 여행이요|ne, yereul deulmyeon yeohaengiyo|Oui, par exemple les voyages', bad: ['잘 모르겠어요|jal moreugesseoyo|Je ne comprends pas', '오른쪽|oreunjjok|à droite'] },
      { npc: '그럼 마지막으로요?|geureom majimageuroyo|Et pour conclure ?', ok: '마지막으로, 저는 매일 배워요|majimageuro, jeoneun maeil baewoyo|Pour conclure, j\'apprends chaque jour', bad: ['아파요|apayo|Je suis malade', '안녕하세요|annyeonghaseyo|Bonjour'] },
      { npc: '잘했어요|jalhaesseoyo|Bravo, bon travail', ok: '들어 주셔서 감사합니다|deureo jusyeoseo gamsahamnida|Merci de votre attention', bad: ['형 한 명과 여동생 한 명이 있어요|hyeong han myeonggwa yeodongsaeng han myeongi isseoyo|J\'ai un frère et une sœur', '얼마예요?|eolmayeyo|Combien ça coûte ?'] },
    ],
  },
  {
    id: 'ko-C13', title: 'À la gare', scene: 'station', npcRole: 'l\'employé du guichet', romanized: true,
    situation: 'Tu achètes un billet de train à la gare. Dis où tu vas, demande un billet et paie.',
    key: ['기차역|gichayeok|la gare|img:station', '표|pyo|le billet|img:ticket', '기차|gicha|le train|img:train', '여행 가방|yeohaeng gabang|la valise|img:suitcase'],
    turns: [
      { npc: '안녕하세요, 어디 가세요?|annyeonghaseyo, eodi gaseyo|Bonjour, où allez-vous ?', ok: '시내에 가요|sinaee gayo|Je vais en ville', bad: ['저는 학생이에요|jeoneun haksaengieyo|Je suis étudiant', '감사합니다|gamsahamnida|Merci'] },
      { npc: '표 한 장이요, 두 장이요?|pyo han jangiyo, du jangiyo|Un billet ou deux ?', img: 'ticket', ok: '표 한 장 주세요|pyo han jang juseyo|Un billet, s\'il vous plaît|img:ticket', bad: ['물 주세요|mul juseyo|Je veux de l\'eau', '제 이름은 안나입니다|je ireumeun annaimnida|Je m\'appelle Anna'] },
      { npc: '이십 유로예요|isip yuroyeyo|Ça fait vingt euros', ok: '여기 있어요|yeogi isseoyo|Voilà', bad: ['얼마예요?|eolmayeyo|Combien ça coûte ?', '저는 커피를 좋아해요|jeoneun keopireul joahaeyo|J\'aime le café'] },
      { npc: '기차는 다섯 시에 출발해요|gichaneun daseot sie chulbalhaeyo|Le train part à cinq heures', ok: '알겠습니다, 감사합니다|algetseumnida, gamsahamnida|D\'accord, merci', bad: ['가방을 잃어버렸어요|gabangeul ireobeoryeosseoyo|J\'ai perdu mon sac', '아파요|apayo|Je suis malade'] },
      { npc: '즐거운 여행 되세요|jeulgeoun yeohaeng doeseyo|Bon voyage !', ok: '감사합니다, 안녕히 계세요|gamsahamnida, annyeonghi gyeseyo|Merci, au revoir', bad: ['안녕하세요|annyeonghaseyo|Bonjour', '잘 모르겠어요|jal moreugesseoyo|Je ne comprends pas'] },
    ],
  },
  {
    id: 'ko-C14', level: 'intermediate', title: 'À l\'hôtel', scene: 'hotel', npcRole: 'le réceptionniste', romanized: true,
    situation: 'Tu arrives à l\'hôtel. Annonce ta réservation, donne ton nom, écoute les consignes.',
    key: ['호텔|hotel|l\'hôtel|img:hotel', '객실|gaeksil|la chambre|img:bed', '열쇠|yeolsoe|la clé|img:key', '아침 식사|achim siksa|le petit-déjeuner'],
    turns: [
      { npc: '안녕하세요, 호텔에 오신 것을 환영합니다|annyeonghaseyo, hotere osin geoseul hwanyeonghamnida|Bonjour, bienvenue à l\'hôtel', ok: '안녕하세요, 예약했어요|annyeonghaseyo, yeyakhaesseoyo|Bonjour, j\'ai une réservation', bad: ['계산해 주세요|gyesanhae juseyo|L\'addition, s\'il vous plaît', '차를 마시고 싶어요|chareul masigo sipeoyo|Je veux du thé'] },
      { npc: '성함이 어떻게 되세요?|seonghami eotteoke doeseyo|Quel est votre nom ?', ok: '제 이름은 안나입니다|je ireumeun annaimnida|Je m\'appelle Anna', bad: ['저는 프랑스 사람입니다|jeoneun peurangseu saramimnida|Je viens de France', '감사합니다|gamsahamnida|Merci'] },
      { npc: '객실 열쇠 여기 있습니다|gaeksil yeolsoe yeogi itseumnida|Voici la clé de votre chambre|img:key', img: 'key', ok: '감사합니다|gamsahamnida|Merci', bad: ['안녕히 가세요|annyeonghi gaseyo|Au revoir', '아파요|apayo|Je suis malade'] },
      { npc: '아침 식사는 여덟 시예요|achim siksaneun yeodeol siyeyo|Le petit-déjeuner est à huit heures', ok: '좋아요, 감사합니다|joayo, gamsahamnida|C\'est parfait, merci', bad: ['가방을 잃어버렸어요|gabangeul ireobeoryeosseoyo|J\'ai perdu mon sac', '왼쪽|oenjjok|à gauche'] },
      { npc: '더 필요한 것 있으세요?|deo piryohan geot isseuseyo|Avez-vous besoin d\'autre chose ?', ok: '아니요, 괜찮습니다. 안녕히 주무세요|aniyo, gwaenchanseumnida. annyeonghi jumuseyo|Non, merci, bonne nuit', bad: ['제 이름은 안나입니다|je ireumeun annaimnida|Je m\'appelle Anna', '저는 프랑스 사람입니다|jeoneun peurangseu saramimnida|Je viens de France'] },
    ],
  },
  {
    id: 'ko-C15', level: 'intermediate', title: 'Au téléphone', scene: 'phone', npcRole: 'un ami', romanized: true,
    situation: 'Un ami t\'appelle. Réponds, donne des nouvelles et fixe un rendez-vous pour demain.',
    key: ['전화|jeonhwa|le téléphone|img:phone', '전화번호|jeonhwabeonho|le numéro', '내일|naeil|demain', '다음에 봐요|daeume bwayo|À bientôt'],
    turns: [
      { npc: '여보세요?|yeoboseyo|Allô ?', ok: '여보세요, 저 안나예요|yeoboseyo, jeo annayeyo|Allô, c\'est Anna', bad: ['감사합니다|gamsahamnida|Merci', '네|ne|Oui'] },
      { npc: '어떻게 지내세요?|eotteoke jinaeseyo|Comment vas-tu ?', ok: '잘 지내요|jal jinaeyo|Je vais bien, merci', bad: ['제 이름은 안나입니다|je ireumeun annaimnida|Je m\'appelle Anna', '안녕히 가세요|annyeonghi gaseyo|Au revoir'] },
      { npc: '내일 시간 있어요?|naeil sigan isseoyo|Tu es libre demain ?', ok: '네, 시간 있어요|ne, sigan isseoyo|Oui, je suis libre', bad: ['아파요|apayo|Je suis malade', '가방을 잃어버렸어요|gabangeul ireobeoryeosseoyo|J\'ai perdu mon sac'] },
      { npc: '주소를 메시지로 보낼게요|jusoreul mesijiro bonaelgeyo|Je t\'envoie l\'adresse par message', ok: '알겠습니다, 감사합니다|algetseumnida, gamsahamnida|D\'accord, merci', bad: ['저는 학생이에요|jeoneun haksaengieyo|Je suis étudiant', '잘 모르겠어요|jal moreugesseoyo|Je ne comprends pas'] },
      { npc: '내일 봐요!|naeil bwayo|À demain !', ok: '내일 봐요!|naeil bwayo|À demain !', bad: ['안녕하세요|annyeonghaseyo|Bonjour', '저는 커피를 좋아해요|jeoneun keopireul joahaeyo|J\'aime le café'] },
    ],
  },
  {
    id: 'ko-C16', level: 'intermediate', title: 'À l\'aéroport', scene: 'airport', npcRole: 'l\'agent d\'enregistrement', romanized: true,
    situation: 'Tu enregistres ton vol. Montre ton passeport, dis où tu vas et demande ta porte.',
    key: ['공항|gonghang|l\'aéroport|img:airport', '여권|yeogwon|le passeport', '여행 가방|yeohaeng gabang|la valise|img:suitcase', '비행기|bihaenggi|l\'avion|img:airplane'],
    turns: [
      { npc: '여권 보여 주세요|yeogwon boyeo juseyo|Votre passeport, s\'il vous plaît', ok: '여기 제 여권이에요|yeogi je yeogwonieyo|Voici mon passeport', bad: ['저는 학생이에요|jeoneun haksaengieyo|Je suis étudiant', '얼마예요?|eolmayeyo|Combien ça coûte ?'] },
      { npc: '안녕하세요, 어디 가세요?|annyeonghaseyo, eodi gaseyo|Bonjour, où allez-vous ?', ok: '프랑스에 가요|peurangseue gayo|Je vais en France', bad: ['감사합니다|gamsahamnida|Merci', '내일|naeil|Demain'] },
      { npc: '가방 있으세요?|gabang isseuseyo|Avez-vous une valise ?', img: 'suitcase', ok: '네, 가방이 있어요|ne, gabangi isseoyo|Oui, j\'ai une valise|img:suitcase', bad: ['저는 커피를 좋아해요|jeoneun keopireul joahaeyo|J\'aime le café', '제 이름은 안나입니다|je ireumeun annaimnida|Je m\'appelle Anna'] },
      { npc: '비행기는 열 시에 출발해요|bihaenggineun yeol sie chulbalhaeyo|L\'avion part à dix heures', ok: '감사합니다, 탑승구가 어디예요?|gamsahamnida, tapseunggu-ga eodiyeyo|Merci, où est la porte d\'embarquement ?', bad: ['가방을 잃어버렸어요|gabangeul ireobeoryeosseoyo|J\'ai perdu mon sac', '아파요|apayo|Je suis malade'] },
      { npc: '즐거운 비행 되세요|jeulgeoun bihaeng doeseyo|Bon vol !', ok: '감사합니다, 안녕히 계세요|gamsahamnida, annyeonghi gyeseyo|Merci, au revoir', bad: ['안녕하세요|annyeonghaseyo|Bonjour', '잘 모르겠어요|jal moreugesseoyo|Je ne comprends pas'] },
    ],
  },
];
