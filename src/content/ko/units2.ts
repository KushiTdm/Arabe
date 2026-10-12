import { lv, type SimpleUnit } from '../simple';

// ─── Coréen — A2 et B1 ───────────────────────────────────────────────────────
// Source : programmes/coreen.md. Romanisation révisée (RR). Style poli 해요체.

export const KO_A2: SimpleUnit[] = lv('intermediate', [
  {
    id: 'ko-7', theme: 'daily_life', title: 'Raconter', romanized: true,
    goal: 'Employer le passé -았/었-',
    tip: { title: 'Le passé en -았/었-', body: 'On ajoute -았- (après ㅏ ou ㅗ) ou -었- (autres voyelles) avant -어요 : 가다 → 갔어요 (je suis allé), 먹다 → 먹었어요 (j\'ai mangé), 하다 → 했어요 (j\'ai fait).' },
    phrases: [
      '어제 영화를 봤어요|eoje yeonghwareul bwasseoyo|Hier j\'ai vu un film', '저는 학교에 갔어요|jeoneun hakgyoe gasseoyo|Je suis allé à l\'école|img:school', '점심을 먹었어요|jeomsimeul meogeosseoyo|J\'ai déjeuné', '뭐 했어요?|mwo haesseoyo|Qu\'avez-vous fait ?',
      '주말에 친구를 만났어요|jumare chingureul mannasseoyo|Ce week-end j\'ai retrouvé un ami', '어제|eoje|hier', '지난주|jinanju|la semaine dernière', '아침에|achime|le matin',
    ],
    qa: [['뭐 했어요?', '점심을 먹었어요', '어제', '지난주']],
  },
  {
    id: 'ko-8', theme: 'daily_life', title: 'Projets', romanized: true,
    goal: 'Employer le futur -(으)ㄹ 거예요',
    tip: { title: 'Le futur en -ㄹ 거예요', body: 'Radical + -(으)ㄹ 거예요 : 가다 → 갈 거예요 (j\'irai), 읽다 → 읽을 거예요 (je lirai). Après une voyelle -ㄹ, après une consonne -을.' },
    phrases: [
      '내일 일할 거예요|naeil ilhal geoyeyo|Demain je travaillerai|💼', '주말에 여행할 거예요|jumare yeohaenghal geoyeyo|Ce week-end je voyagerai|✈️', '뭐 할 거예요?|mwo hal geoyeyo|Que ferez-vous ?', '한국에 갈 거예요|hanguge gal geoyeyo|J\'irai en Corée',
      '책을 읽을 거예요|chaegeul ilgeul geoyeyo|Je lirai un livre|img:book', '다음 주|daeum ju|la semaine prochaine', '나중에|najunge|plus tard', '내년|naenyeon|l\'année prochaine',
    ],
    qa: [['뭐 할 거예요?', '책을 읽을 거예요', '나중에', '내년']],
  },
  {
    id: 'ko-9', theme: 'daily_life', title: 'Demander, permettre', romanized: true,
    goal: 'Employer -아/어 주세요 et -(으)ㄹ 수 있다',
    tip: { title: 'Demander, pouvoir', body: '-아/어 주세요 = « s\'il vous plaît, faites… » (« 도와 주세요 »). -(으)ㄹ 수 있다/없다 = pouvoir / ne pas pouvoir (« 할 수 있어요 »). -아/어도 돼요? = est-ce permis de… ?' },
    phrases: [
      '도와주세요|dowajuseyo|Aidez-moi, s\'il vous plaît', '천천히 말해 주세요|cheoncheonhi malhae juseyo|Parlez lentement, s\'il vous plaît', '다시 한 번 말해 주세요|dasi han beon malhae juseyo|Répétez, s\'il vous plaît', '한국어를 할 수 있어요|hangugeoreul hal su isseoyo|Je sais parler coréen',
      '수영할 수 없어요|suyeonghal su eopseoyo|Je ne sais pas nager', '여기에 앉아도 돼요?|yeogie anjado dwaeyo|Puis-je m\'asseoir ici ?', '네, 앉으세요|ne anjeuseyo|Oui, asseyez-vous', '사진을 찍어도 돼요?|sajineul jjigeodo dwaeyo|Puis-je prendre une photo ?',
    ],
    qa: [['여기에 앉아도 돼요?', '네, 앉으세요', '도와주세요', '수영할 수 없어요']],
  },
  {
    id: 'ko-10', theme: 'daily_life', title: 'Expliquer, comparer', romanized: true,
    goal: 'Employer -아/어서 et -보다',
    tip: { title: 'Cause et comparaison', body: '-아/어서 exprime la cause (« 배고파서 먹었어요 » = j\'avais faim, alors j\'ai mangé). N + 보다 = « plus que N » : « 커피보다 차를 좋아해요 » (je préfère le thé au café).' },
    phrases: [
      '배고파서 밥을 먹었어요|baegopaseo babeul meogeosseoyo|J\'avais faim, alors j\'ai mangé', '비가 와서 집에 있어요|biga waseo jibe isseoyo|Il pleut, donc je reste à la maison|img:house', '늦어서 죄송합니다|neujeoseo joesonghamnida|Désolé d\'être en retard', '서울은 부산보다 커요|seoureun busanboda keoyo|Séoul est plus grande que Busan',
      '커피보다 차를 좋아해요|keopiboda chareul joahaeyo|Je préfère le thé au café|img:tea', '왜요?|waeyo|Pourquoi ?', '피곤해서요|pigonhaeseoyo|Parce que je suis fatigué', '이게 더 싸요|ige deo ssayo|Celui-ci est moins cher',
    ],
    qa: [['왜요?', '피곤해서요', '이게 더 싸요', '서울은 부산보다 커요']],
  },
  {
    id: 'ko-11', theme: 'family', title: 'Honorifique', romanized: true,
    goal: 'Employer -(으)시-',
    tip: { title: 'Respect pour les aînés', body: 'On insère -(으)시- dans le verbe quand le sujet mérite le respect (parents, professeur, client) : 가요 → 가세요. Quelques verbes ont une forme à part : 있다 → 계시다, 자다 → 주무시다, 먹다 → 드시다.' },
    phrases: [
      '아버지는 회사에 가세요|abeojineun hoesae gaseyo|Mon père va à son travail (honorifique)|img:father', '어머니는 요리하세요|eomeonineun yorihaseyo|Ma mère cuisine (honorifique)|img:mother', '선생님은 어디에 계세요?|seonsaengnimeun eodie gyeseyo|Où est le professeur ?|img:teacher', '할머니는 주무세요|halmeonineun jumuseyo|Grand-mère dort (honorifique)|👵',
      '이름이 어떻게 되세요?|ireumi eotteoke doeseyo|Comment vous appelez-vous ? (très poli)', '앉으세요|anjeuseyo|Asseyez-vous', '잘 먹겠습니다|jal meokgetseumnida|Bon appétit (avant de manger)', '드세요|deuseyo|Mangez, je vous en prie',
    ],
    qa: [['선생님은 어디에 계세요?', '할머니는 주무세요', '앉으세요', '드세요']],
  },
]);

export const KO_B1: SimpleUnit[] = lv('advanced', [
  {
    id: 'ko-12', theme: 'discourse', title: 'Justifier, hypothèse', romanized: true,
    goal: 'Employer -(으)니까 et -(으)면',
    tip: { title: '-니까 et -면', body: '-(으)니까 donne la raison d\'un conseil ou d\'un ordre (« 비가 오니까 우산을 가져가세요 »). -(으)면 exprime la condition : « si… » (« 시간이 있으면 같이 가요 »).' },
    phrases: [
      '비가 오니까 우산을 가져가세요|biga onikka usaneul gajyeogaseyo|Il pleut, prenez un parapluie', '시간이 있으면 같이 가요|sigani isseumyeon gachi gayo|Si vous avez le temps, allons-y ensemble', '날씨가 좋으면 산책할 거예요|nalssiga joeumyeon sanchaekal geoyeyo|S\'il fait beau, je me promènerai', '피곤하니까 쉬세요|pigonhanikka swiseyo|Vous êtes fatigué, reposez-vous',
      '배고프면 말하세요|baegopeumyeon malhaseyo|Si vous avez faim, dites-le', '돈이 있으면 여행할 거예요|doni isseumyeon yeohaenghal geoyeyo|Si j\'ai de l\'argent, je voyagerai', '왜 일찍 와요?|wae iljjik wayo|Pourquoi viens-tu tôt ?', '길이 막히니까요|giri makhinikkayo|Parce qu\'il y a des embouteillages',
    ],
    qa: [['왜 일찍 와요?', '길이 막히니까요', '배고프면 말하세요', '피곤하니까 쉬세요']],
  },
  {
    id: 'ko-13', theme: 'discourse', title: 'Proposer, décider', romanized: true,
    goal: 'Employer -(으)ㄹ까요? et -기로 하다',
    tip: { title: 'Proposer et décider', body: '-(으)ㄹ까요? = « on… ? » (« 같이 갈까요? »). -기로 하다 = décider de (« 만나기로 했어요 » = nous avons décidé de nous voir).' },
    phrases: [
      '같이 갈까요?|gachi galkkayo|On y va ensemble ?', '뭐 먹을까요?|mwo meogeulkkayo|Qu\'est-ce qu\'on mange ?', '영화 볼까요?|yeonghwa bolkkayo|On regarde un film ?', '좋아요, 그렇게 해요|joayo geureoke haeyo|D\'accord, faisons ça', '내일 만나기로 했어요|naeil mannagiro haesseoyo|Nous avons décidé de nous voir demain',
      '운동하기로 했어요|undonghagiro haesseoyo|J\'ai décidé de faire du sport', '어디에서 만날까요?|eodieseo mannalkkayo|Où se retrouve-t-on ?', '역 앞에서 만나요|yeok apeseo mannayo|Retrouvons-nous devant la gare|🚉',
    ],
    qa: [['어디에서 만날까요?', '역 앞에서 만나요', '좋아요, 그렇게 해요', '영화 볼까요?']],
  },
  {
    id: 'ko-14', theme: 'discourse', title: 'Rapporter', romanized: true,
    goal: 'Employer le discours indirect',
    tip: { title: 'Rapporter avec -다고 하다', body: 'On colle la forme simple du verbe + -고 하다 : « 온다고 했어요 » (il a dit qu\'il viendrait), « 피곤하다고 했어요 » (il a dit qu\'il était fatigué). Question : -(느)냐고 묻다 ; ordre : -(으)라고 하다.' },
    phrases: [
      '친구가 내일 온다고 했어요|chinguga naeil ondago haesseoyo|Mon ami a dit qu\'il viendrait demain', '선생님이 숙제를 하라고 했어요|seonsaengnimi sukjereul harago haesseoyo|Le professeur a dit de faire les devoirs', '그는 피곤하다고 했어요|geuneun pigonhadago haesseoyo|Il a dit qu\'il était fatigué', '뭐라고 했어요?|mworago haesseoyo|Qu\'a-t-il dit ?',
      '어디 가냐고 물었어요|eodi ganyago mureosseoyo|Il a demandé où j\'allais', '모른다고 했어요|moreundago haesseoyo|Il a dit qu\'il ne savait pas', '비가 온다고 해요|biga ondago haeyo|On dit qu\'il va pleuvoir',
    ],
    qa: [['뭐라고 했어요?', '그는 피곤하다고 했어요', '모른다고 했어요', '비가 온다고 해요']],
  },
]);
