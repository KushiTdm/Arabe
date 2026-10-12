import { lv, type SimpleUnit } from '../simple';

// ─── Vietnamien — A2 et B1 ───────────────────────────────────────────────────
// Source : programmes/vietnamien.md. Variante du nord.

export const VI_A2: SimpleUnit[] = lv('intermediate', [
  {
    id: 'vi-7', theme: 'daily_life', title: 'Situer dans le temps',
    goal: 'Employer đã, đang, sẽ',
    tip: { title: 'Le temps avec des particules', body: 'Le verbe ne se conjugue pas : on place une particule devant. « đã » = déjà fait (passé), « đang » = en train de (présent), « sẽ » = futur. Négation de l\'accompli : « chưa » (pas encore).' },
    phrases: [
      'Tôi đã ăn cơm|J\'ai (déjà) mangé|🍚', 'Tôi đang ăn cơm|Je suis en train de manger', 'Tôi sẽ ăn cơm|Je vais manger', 'Hôm qua tôi đã đi chợ|Hier je suis allé au marché|img:market', 'Bây giờ tôi đang làm việc|En ce moment je travaille|💼',
      'Ngày mai tôi sẽ đi Hà Nội|Demain j\'irai à Hanoï', 'Bạn đang làm gì?|Que fais-tu ?', 'Tôi chưa ăn|Je n\'ai pas encore mangé', 'Anh ấy đã đến|Il est arrivé',
    ],
    qa: [['Bạn đang làm gì?', 'Tôi đang ăn cơm', 'Anh ấy đã đến', 'Tôi chưa ăn']],
  },
  {
    id: 'vi-8', theme: 'daily_life', title: 'Décrire, comparer',
    goal: 'Comparer avec hơn et nhất',
    tip: { title: 'hơn et nhất', body: 'Comparatif : adjectif + « hơn » (« đắt hơn » = plus cher). Superlatif : adjectif + « nhất » (« đẹp nhất » = le plus beau). « So với » ou « hơn + nom » indique l\'élément de comparaison.' },
    phrases: [
      'Hà Nội lạnh hơn Sài Gòn|Hanoï est plus froid que Saïgon', 'Cái này đắt hơn cái kia|Celui-ci est plus cher que celui-là', 'Đây là cái đẹp nhất|C\'est le plus beau', 'Tôi cao hơn anh trai tôi|Je suis plus grand que mon frère|img:brother', 'Phở ngon nhất|Le phở est le meilleur',
      'Hôm nay nóng hơn hôm qua|Aujourd\'hui il fait plus chaud qu\'hier', 'Cái nào rẻ nhất?|Lequel est le moins cher ?', 'Cái này rẻ nhất|Celui-ci est le moins cher',
    ],
    qa: [['Cái nào rẻ nhất?', 'Cái này rẻ nhất', 'Tôi cao hơn anh trai tôi', 'Hà Nội lạnh hơn Sài Gòn']],
  },
  {
    id: 'vi-9', theme: 'body', title: 'Santé',
    goal: 'Décrire un symptôme',
    phrases: [
      'Tôi bị đau đầu|J\'ai mal à la tête|img:head', 'Tôi bị đau bụng|J\'ai mal au ventre', 'Tôi bị sốt|J\'ai de la fièvre', 'Bạn bị sao?|Qu\'est-ce que tu as ?', 'Tôi cần đi bác sĩ|J\'ai besoin d\'aller chez le médecin|🩺', 'Bạn nên nghỉ ngơi|Tu devrais te reposer',
      'Uống nhiều nước|Bois beaucoup d\'eau|img:water', 'hiệu thuốc|pharmacie|💊', 'thuốc|médicament', 'Tôi bị ho|Je tousse',
    ],
    qa: [['Bạn bị sao?', 'Tôi bị đau đầu', 'hiệu thuốc', 'thuốc']],
  },
  {
    id: 'vi-10', theme: 'daily_life', title: 'Causes',
    goal: 'Expliquer avec vì… nên…',
    tip: { title: 'vì… nên…', body: '« Vì » (parce que) introduit la cause, « nên » (donc) la conséquence : « Vì trời mưa nên tôi ở nhà ». On peut en omettre un des deux. Question : « tại sao / vì sao » (pourquoi).' },
    phrases: [
      'Vì trời mưa nên tôi ở nhà|Comme il pleut, je reste à la maison|img:house', 'Vì tôi mệt nên tôi nghỉ|Comme je suis fatigué, je me repose', 'Tại sao bạn học tiếng Việt?|Pourquoi apprends-tu le vietnamien ?', 'Vì tôi thích Việt Nam|Parce que j\'aime le Vietnam',
      'Vì sao bạn đến muộn?|Pourquoi es-tu en retard ?', 'Vì xe buýt bị trễ|Parce que le bus est en retard|🚌', 'nên|donc', 'vì|parce que',
    ],
    qa: [['Tại sao bạn học tiếng Việt?', 'Vì tôi thích Việt Nam', 'nên', 'vì']],
  },
  {
    id: 'vi-11', theme: 'places', title: 'Se déplacer',
    goal: 'Prendre un transport et demander sa direction',
    phrases: [
      'Tôi muốn đi sân bay|Je voudrais aller à l\'aéroport|✈️', 'Đi xe buýt số mấy?|Quel numéro de bus ?|🚌', 'Cho tôi một vé|Un billet, s\'il vous plaît|🎫', 'Bao nhiêu tiền một vé?|Combien coûte un billet ?|img:money', 'Tôi đi bằng taxi|Je vais en taxi|🚕',
      'Xin dừng ở đây|Arrêtez-vous ici, s\'il vous plaît', 'Ga tàu ở đâu?|Où est la gare ?|🚉', 'Đi thẳng rồi rẽ phải|Allez tout droit puis tournez à droite|⬆️', 'tàu hỏa|train|🚆',
    ],
    qa: [['Ga tàu ở đâu?', 'Đi thẳng rồi rẽ phải', 'tàu hỏa', 'Cho tôi một vé']],
  },
]);

export const VI_B1: SimpleUnit[] = lv('advanced', [
  {
    id: 'vi-12', theme: 'discourse', title: 'Opinion et concession',
    goal: 'Employer mặc dù… nhưng…',
    tip: { title: 'Concession', body: '« Mặc dù… nhưng… » = bien que… mais… : les deux mots peuvent coexister en vietnamien. Pour l\'opinion : « theo tôi » (à mon avis), « tôi nghĩ là » (je pense que).' },
    phrases: [
      'Mặc dù trời mưa nhưng tôi vẫn đi|Bien qu\'il pleuve, j\'y vais quand même', 'Mặc dù khó nhưng rất thú vị|Bien que difficile, c\'est très intéressant', 'Theo tôi, đây là ý hay|À mon avis, c\'est une bonne idée', 'Tôi đồng ý|Je suis d\'accord', 'Tôi không đồng ý|Je ne suis pas d\'accord',
      'Bạn nghĩ sao?|Qu\'en penses-tu ?', 'Tuy nhiên|Cependant', 'Ngoài ra|De plus',
    ],
    qa: [['Bạn nghĩ sao?', 'Theo tôi, đây là ý hay', 'Tuy nhiên', 'Ngoài ra']],
  },
  {
    id: 'vi-13', theme: 'discourse', title: 'Raconter',
    goal: 'Raconter un souvenir ou un projet',
    phrases: [
      'Hồi nhỏ tôi sống ở quê|Enfant, je vivais à la campagne', 'Năm ngoái tôi đã đi Việt Nam|L\'année dernière je suis allé au Vietnam', 'Đầu tiên chúng tôi đến Hà Nội|D\'abord nous sommes arrivés à Hanoï', 'Sau đó chúng tôi đi Huế|Ensuite nous sommes allés à Huế', 'Cuối cùng chúng tôi về nhà|Enfin nous sommes rentrés',
      'Sang năm tôi sẽ quay lại|L\'année prochaine je reviendrai', 'Chuyến đi thế nào?|Comment était le voyage ?', 'Rất tuyệt|C\'était génial',
    ],
    qa: [['Chuyến đi thế nào?', 'Rất tuyệt', 'Sau đó chúng tôi đi Huế', 'Cuối cùng chúng tôi về nhà']],
  },
  {
    id: 'vi-14', theme: 'discourse', title: 'Imprévus',
    goal: 'Négocier ou réclamer',
    phrases: [
      'Tôi bị mất ví|J\'ai perdu mon portefeuille', 'Bạn có thể giúp tôi không?|Pouvez-vous m\'aider ?', 'Cái này bị hỏng|Ceci est cassé', 'Tôi muốn đổi cái khác|Je voudrais en changer', 'Giảm giá được không?|Pouvez-vous baisser le prix ?|img:money',
      'Đắt quá, bớt chút đi|Trop cher, faites un petit effort', 'Tôi muốn gặp quản lý|Je voudrais voir le responsable', 'Xin lỗi, đó là lỗi của chúng tôi|Désolé, c\'est notre faute', 'Bạn muốn gì?|Que voulez-vous ?',
    ],
    qa: [['Bạn muốn gì?', 'Tôi muốn đổi cái khác', 'Tôi bị mất ví', 'Xin lỗi, đó là lỗi của chúng tôi']],
  },
]);
