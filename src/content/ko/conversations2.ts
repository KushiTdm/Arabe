import type { ConvSpec } from '../conversations';

// ─── KO — conversations guidées C17 à C20 (supermarché, plage, chez un ami, taxi) ───
// Générées depuis une table de phrases communes à 11 langues. À faire relire par un locuteur natif.

export const KO_CONVERSATIONS2: ConvSpec[] = [
  {
    id: 'ko-C17', title: 'Au supermarché', scene: 'supermarket', npcRole: 'l\'employé du magasin', romanized: true,
    situation: 'Tu fais tes courses. Demande où est le lait, réponds à l\'employé et paie.',
    key: ['우유|uyu|le lait|img:milk', '빵|ppang|le pain|img:bread', '사과|sagwa|la pomme|img:apple', '봉투|bongtu|le sac|img:bag'],
    turns: [
      { npc: '안녕하세요, 도와드릴까요?|annyeonghaseyo, dowadeurilkkayo|Bonjour, je peux vous aider ?', ok: '우유는 어디에 있어요?|uyuneun eodie isseoyo|Où est le lait ?', bad: ['안녕히 가세요|annyeonghi gaseyo|Au revoir', '감사합니다|gamsahamnida|Merci'] },
      { npc: '우유는 저기 오른쪽에 있어요|uyuneun jeogi oreunjjoge isseoyo|Le lait est là-bas, à droite', ok: '정말 감사합니다|jeongmal gamsahamnida|Merci beaucoup', bad: ['안녕하세요|annyeonghaseyo|Bonjour', '저는 프랑스에서 왔어요|jeoneun peurangseueseo wasseoyo|Je viens de France'] },
      { npc: '더 필요하신 것 있어요?|deo piryohasin geot isseoyo|Voulez-vous autre chose ?', ok: '네, 빵하고 사과요|ne, ppanghago sagwayo|Oui, du pain et des pommes', bad: ['만나서 반갑습니다|mannaseo bangapseumnida|Enchanté(e)', '내일|naeil|Demain'] },
      { npc: '봉투 필요하세요?|bongtu piryohaseyo|Voulez-vous un sac ?', ok: '네, 주세요|ne, juseyo|Oui, s\'il vous plaît', bad: ['이해 못 해요|ihae mot haeyo|Je ne comprends pas', '안녕히 가세요|annyeonghi gaseyo|Au revoir'] },
      { npc: '십 유로입니다|sip yuroimnida|Ça fait dix euros', ok: '여기 있어요|yeogi isseoyo|Voilà, tenez', bad: ['잘 지내요?|jal jinaeyo|Comment vas-tu ?', '이해 못 해요|ihae mot haeyo|Je ne comprends pas'] },
      { npc: '좋은 하루 보내세요!|joeun haru bonaeseyo|Bonne journée !', ok: '감사합니다, 당신도요|gamsahamnida, dangsindoyo|Merci, à vous aussi', bad: ['이해 못 해요|ihae mot haeyo|Je ne comprends pas', '안녕하세요|annyeonghaseyo|Bonjour'] },
    ],
  },
  {
    id: 'ko-C18', title: 'À la plage', scene: 'beach', npcRole: 'un ami', romanized: true,
    situation: 'Tu passes la journée à la plage avec un ami. Parle du temps, de la mer et de l\'eau.',
    key: ['해변|haebyeon|la plage|img:beach', '바다|bada|la mer|img:sea', '해|hae|le soleil|img:sun', '물|mul|l\'eau|img:water'],
    turns: [
      { npc: '오늘 날씨가 좋아요|oneul nalssiga joayo|Il fait beau aujourd\'hui', ok: '네, 정말 더워요|ne, jeongmal deowoyo|Oui, il fait très chaud', bad: ['제 이름은 카림이에요|je ireumeun karimieyo|Je m\'appelle Karim', '안녕히 가세요|annyeonghi gaseyo|Au revoir'] },
      { npc: '바다를 좋아해요?|badareul joahaeyo|Tu aimes la mer ?', ok: '네, 바다를 아주 좋아해요|ne, badareul aju joahaeyo|Oui, j\'aime beaucoup la mer', bad: ['지금 다섯 시예요|jigeum daseot siyeyo|Il est cinq heures', '저는 프랑스에서 왔어요|jeoneun peurangseueseo wasseoyo|Je viens de France'] },
      { npc: '수영하고 싶어요?|suyeonghago sipeoyo|Tu veux nager ?', ok: '네, 가요!|ne, gayo|Oui, allons-y !', bad: ['저는 학생이에요|jeoneun haksaengieyo|Je suis étudiant', '역은 어디예요?|yeogeun eodiyeyo|Où est la gare ?'] },
      { npc: '목말라요?|mongmallayo|Tu as soif ?', ok: '네, 물을 마시고 싶어요|ne, mureul masigo sipeoyo|Oui, je veux de l\'eau', bad: ['내일|naeil|Demain', '만나서 반갑습니다|mannaseo bangapseumnida|Enchanté(e)'] },
      { npc: '여기 물이에요|yeogi murieyo|Voici de l\'eau', ok: '감사합니다|gamsahamnida|Merci', bad: ['천만에요|cheonmaneyo|De rien', '안녕히 가세요|annyeonghi gaseyo|Au revoir'] },
      { npc: '이제 돌아갈까요? 늦었어요|ije doragalkkayo? neujeosseoyo|On rentre ? Il est tard', ok: '좋아요, 내일 봐요|joayo, naeil bwayo|D\'accord, à demain', bad: ['안녕하세요|annyeonghaseyo|Bonjour', '얼마예요?|eolmayeyo|Combien ça coûte ?'] },
    ],
  },
  {
    id: 'ko-C19', title: 'Chez un ami', scene: 'house', npcRole: 'ton hôte', romanized: true,
    situation: 'Un ami t\'invite chez lui. Remercie, accepte une boisson et goûte ce qu\'il t\'offre.',
    key: ['집|jip|la maison|img:house', '차|cha|le thé|img:tea', '빵|ppang|le pain|img:bread', '꿀|kkul|le miel|img:honey'],
    turns: [
      { npc: '우리 집에 오신 걸 환영해요!|uri jibe osin geol hwanyeonghaeyo|Bienvenue chez moi !', ok: '고마워요, 집이 예뻐요|gomawoyo, jibi yeppeoyo|Merci, ta maison est belle', bad: ['안녕히 가세요|annyeonghi gaseyo|Au revoir', '이해 못 해요|ihae mot haeyo|Je ne comprends pas'] },
      { npc: '들어와서 앉으세요|deureowaseo anjeuseyo|Entre et assieds-toi', ok: '정말 감사합니다|jeongmal gamsahamnida|Merci beaucoup', bad: ['역은 어디예요?|yeogeun eodiyeyo|Où est la gare ?', '천만에요|cheonmaneyo|De rien'] },
      { npc: '차 드릴까요, 커피 드릴까요?|cha deurilkkayo, keopi deurilkkayo|Tu veux du thé ou du café ?', ok: '차 주세요|cha juseyo|Du thé, s\'il te plaît', bad: ['저는 프랑스에서 왔어요|jeoneun peurangseueseo wasseoyo|Je viens de France', '안녕히 가세요|annyeonghi gaseyo|Au revoir'] },
      { npc: '배고파요?|baegopayo|Tu as faim ?', ok: '조금요, 고마워요|jogeumyo, gomawoyo|Un peu, merci', bad: ['네, 정말 더워요|ne, jeongmal deowoyo|Oui, il fait très chaud', '제 이름은 카림이에요|je ireumeun karimieyo|Je m\'appelle Karim'] },
      { npc: '여기 빵과 꿀이에요|yeogi ppanggwa kkurieyo|Voici du pain et du miel', ok: '아주 맛있어요!|aju masisseoyo|C\'est très bon !', bad: ['우유는 어디에 있어요?|uyuneun eodie isseoyo|Où est le lait ?', '안녕하세요|annyeonghaseyo|Bonjour'] },
      { npc: '또 오세요!|tto oseyo|Reviens bientôt !', ok: '기꺼이요, 모든 게 고마워요|gikkeoiyo, modeun ge gomawoyo|Avec plaisir, merci pour tout', bad: ['얼마예요?|eolmayeyo|Combien ça coûte ?', '만나서 반갑습니다|mannaseo bangapseumnida|Enchanté(e)'] },
    ],
  },
  {
    id: 'ko-C20', level: 'intermediate', title: 'En taxi', scene: 'taxi', npcRole: 'le chauffeur de taxi', romanized: true,
    situation: 'Tu prends un taxi pour l\'aéroport. Dis ta destination, bavarde un peu et paie la course.',
    key: ['택시|taeksi|le taxi|img:taxi', '공항|gonghang|l\'aéroport|img:airport', '여행 가방|yeohaeng gabang|la valise|img:suitcase', '표|pyo|le billet|img:ticket'],
    turns: [
      { npc: '안녕하세요, 어디로 가세요?|annyeonghaseyo, eodiro gaseyo|Bonjour, où allez-vous ?', ok: '공항으로 가 주세요|gonghangeuro ga juseyo|À l\'aéroport, s\'il vous plaît', bad: ['제 이름은 카림이에요|je ireumeun karimieyo|Je m\'appelle Karim', '차 주세요|cha juseyo|Du thé, s\'il te plaît'] },
      { npc: '이십 분 걸려요|isip bun georyeoyo|C\'est à vingt minutes', ok: '알겠어요|algesseoyo|D\'accord', bad: ['만나서 반갑습니다|mannaseo bangapseumnida|Enchanté(e)', '우유는 어디에 있어요?|uyuneun eodie isseoyo|Où est le lait ?'] },
      { npc: '여행 중이세요?|yeohaeng jungiseyo|Vous êtes en voyage ?', ok: '네, 프랑스에서 왔어요|ne, peurangseueseo wasseoyo|Oui, je viens de France', bad: ['네, 정말 더워요|ne, jeongmal deowoyo|Oui, il fait très chaud', '안녕히 가세요|annyeonghi gaseyo|Au revoir'] },
      { npc: '다 왔습니다|da wasseumnida|Nous sommes arrivés', ok: '여기서 세워 주세요|yeogiseo sewo juseyo|Arrêtez-vous ici, s\'il vous plaît', bad: ['안녕하세요|annyeonghaseyo|Bonjour', '얼마예요?|eolmayeyo|Combien ça coûte ?'] },
      { npc: '십오 유로예요|sibo yuroyeyo|Ça fait quinze euros', ok: '여기요, 잔돈은 괜찮아요|yeogiyo, jandoneun gwaenchanayo|Voilà, gardez la monnaie', bad: ['이해 못 해요|ihae mot haeyo|Je ne comprends pas', '안녕히 가세요|annyeonghi gaseyo|Au revoir'] },
      { npc: '즐거운 여행 되세요!|jeulgeoun yeohaeng doeseyo|Bon voyage !', ok: '감사합니다, 안녕히 가세요|gamsahamnida, annyeonghi gaseyo|Merci, au revoir', bad: ['안녕하세요|annyeonghaseyo|Bonjour', '역은 어디예요?|yeogeun eodiyeyo|Où est la gare ?'] },
    ],
  },
];
