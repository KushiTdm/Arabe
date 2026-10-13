import type { ConvSpec } from '../conversations';

// ─── VI — conversations guidées (générées depuis la table de phrases communes) ───
// À faire relire par un locuteur natif.

export const VI_CONVERSATIONS: ConvSpec[] = [
  {
    id: 'vi-C1', title: 'Rencontre', scene: 'handshake', npcRole: 'une personne que tu rencontres',
    situation: 'Tu rencontres quelqu\'un pour la première fois. Salue, présente-toi, réponds à ses questions.',
    key: ['Chào buổi sáng|Bonjour (le matin)', 'Tên tôi là Anna|Je m\'appelle Anna', 'Tôi đến từ Pháp|Je viens de France', 'Rất vui được gặp bạn|Enchanté(e)'],
    turns: [
      { npc: 'Chào buổi sáng|Bonjour (le matin)', ok: 'Chào buổi sáng|Bonjour (le matin)', bad: ['Chúc ngủ ngon|Bonne nuit', 'Tạm biệt|Au revoir'] },
      { npc: 'Bạn tên là gì?|Comment t\'appelles-tu ?', ok: 'Tên tôi là Anna|Je m\'appelle Anna', bad: ['Tôi khỏe, cảm ơn|Je vais bien, merci', 'Tôi đến từ Pháp|Je viens de France'] },
      { npc: 'Bạn từ đâu đến?|D\'où viens-tu ?', ok: 'Tôi đến từ Pháp|Je viens de France', bad: ['Tên tôi là Anna|Je m\'appelle Anna', 'Cảm ơn|Merci'] },
      { npc: 'Rất vui được gặp bạn|Enchanté(e)', ok: 'Rất vui được gặp bạn|Enchanté(e)', bad: ['Tôi không hiểu|Je ne comprends pas', 'Không có gì|De rien'] },
      { npc: 'Bạn khỏe không?|Comment vas-tu ?', ok: 'Tôi khỏe, cảm ơn|Je vais bien, merci', bad: ['Chào buổi sáng|Bonjour (le matin)', 'Bệnh viện ở đâu?|Où est l\'hôpital ?'] },
      { npc: 'Tạm biệt|Au revoir', ok: 'Hẹn gặp lại|À bientôt', bad: ['Chào buổi sáng|Bonjour (le matin)', 'Vâng|Oui'] },
    ],
  },
  {
    id: 'vi-C2', title: 'Au café', scene: 'coffee', npcRole: 'le serveur',
    situation: 'Tu entres dans un café. Commande une boisson, réponds au serveur, paie.',
    key: ['cà phê|café|img:coffee', 'trà|thé|img:tea', 'nước|eau|img:water', 'nước ép|jus|img:juice'],
    turns: [
      { npc: 'Xin chào, bạn muốn gì?|Bonjour, que veux-tu ?', ok: 'Cho tôi một ly cà phê|Je voudrais un café, s\'il vous plaît|img:coffee', bad: ['Bệnh viện ở đâu?|Où est l\'hôpital ?', 'Tạm biệt|Au revoir'] },
      { npc: 'Còn gì nữa không?|Autre chose ?', ok: 'Không, cảm ơn|Non, merci', bad: ['Tên tôi là Anna|Je m\'appelle Anna', 'Hẹn gặp lại|À bientôt'] },
      { npc: 'Ba euro ạ|Ça fait trois euros|img:money', ok: 'Của bạn đây|Voilà', bad: ['Cái này bao nhiêu tiền?|Combien ça coûte ?', 'Tôi thích cà phê|J\'aime le café'] },
      { npc: 'Cảm ơn|Merci', ok: 'Không có gì|De rien', bad: ['Tôi không hiểu|Je ne comprends pas', 'Vâng|Oui'] },
    ],
  },
  {
    id: 'vi-C3', title: 'Au marché', scene: 'market', npcRole: 'le vendeur',
    situation: 'Tu fais tes courses au marché. Demande ce que tu veux, le prix, et paie.',
    key: ['bánh mì|pain|img:bread', 'trứng|œufs|img:eggs', 'cá|poisson|img:fish', 'tiền|argent|img:money'],
    turns: [
      { npc: 'Xin chào, bạn muốn mua gì?|Bonjour, que désirez-vous ?', ok: 'Cho tôi bánh mì|Je veux du pain|img:bread', bad: ['Tạm biệt|Au revoir', 'Bệnh viện ở đâu?|Où est l\'hôpital ?'] },
      { npc: 'Bạn muốn mấy cái?|Combien en voulez-vous ?', ok: 'Hai cái, cảm ơn|Deux, s\'il vous plaît', bad: ['Chào buổi sáng|Bonjour (le matin)', 'Chúc ngủ ngon|Bonne nuit'] },
      { npc: 'Của bạn đây|Voilà', ok: 'Cái này bao nhiêu tiền?|Combien ça coûte ?', bad: ['Tôi không hiểu|Je ne comprends pas', 'Tên tôi là Anna|Je m\'appelle Anna'] },
      { npc: 'Năm euro ạ|Ça fait cinq euros|img:money', ok: 'Của bạn đây|Voilà', bad: ['Hai cái, cảm ơn|Deux, s\'il vous plaît', 'Vâng|Oui'] },
      { npc: 'Cảm ơn, tạm biệt|Merci, au revoir', ok: 'Tạm biệt|Au revoir', bad: ['Chào buổi sáng|Bonjour (le matin)', 'Chúc ngủ ngon|Bonne nuit'] },
    ],
  },
  {
    id: 'vi-C4', title: 'Demander son chemin', scene: 'street', npcRole: 'un passant',
    situation: 'Tu cherches l\'hôpital. Demande ton chemin et comprends la réponse.',
    key: ['bệnh viện|hôpital|img:hospital', 'đường|rue|img:street', 'trường học|école|img:school', 'chợ|marché|img:market'],
    turns: [
      { npc: 'Bạn cần giúp không?|Avez-vous besoin d\'aide ?', ok: 'Vâng, bệnh viện ở đâu?|Oui, où est l\'hôpital ?|img:hospital', bad: ['Tạm biệt|Au revoir', 'Tên tôi là Anna|Je m\'appelle Anna'] },
      { npc: 'Đi thẳng rồi rẽ trái|Tout droit puis à gauche', ok: 'Có xa không?|Est-ce loin ?', bad: ['Tôi đến từ Pháp|Je viens de France', 'Cho tôi bánh mì|Je veux du pain|img:bread'] },
      { npc: 'Không, gần thôi|Non, c\'est près', ok: 'Cảm ơn|Merci', bad: ['Tôi không hiểu|Je ne comprends pas', 'Hai cái, cảm ơn|Deux, s\'il vous plaît'] },
      { npc: 'Không có gì|De rien', ok: 'Tạm biệt|Au revoir', bad: ['Cho tôi một ly cà phê|Je voudrais un café, s\'il vous plaît|img:coffee', 'Chào buổi sáng|Bonjour (le matin)'] },
    ],
  },
  {
    id: 'vi-C5', title: 'Ma famille', scene: '👨‍👩‍👧', npcRole: 'un ami',
    situation: 'Un ami regarde tes photos de famille. Dis qui est sur chaque photo.',
    key: ['bố|père|img:father', 'mẹ|mère|img:mother', 'anh trai|frère|img:brother', 'chị gái|sœur|img:sister'],
    turns: [
      { npc: 'Đây là ai?|Qui est-ce ?', img: 'father', ok: 'Đây là bố tôi|C\'est mon père', bad: ['Đây là anh tôi|C\'est mon frère', 'Đây là mẹ tôi|C\'est ma mère'] },
      { npc: 'Đây là ai?|Qui est-ce ?', img: 'mother', ok: 'Đây là mẹ tôi|C\'est ma mère', bad: ['Đây là chị tôi|C\'est ma sœur', 'Đây là bố tôi|C\'est mon père'] },
      { npc: 'Đây là ai?|Qui est-ce ?', img: 'sister', ok: 'Đây là chị tôi|C\'est ma sœur', bad: ['Đây là mẹ tôi|C\'est ma mère', 'Đây là anh tôi|C\'est mon frère'] },
      { npc: 'Đây là ai?|Qui est-ce ?', img: 'brother', ok: 'Đây là anh tôi|C\'est mon frère', bad: ['Đây là bố tôi|C\'est mon père', 'Đây là chị tôi|C\'est ma sœur'] },
      { npc: 'Bạn có anh chị em không?|As-tu des frères et sœurs ?', ok: 'Tôi có một anh trai và một chị gái|J\'ai un frère et une sœur', bad: ['Tôi là sinh viên|Je suis étudiant', 'Cho tôi nước|Je veux de l\'eau'] },
    ],
  },
  {
    id: 'vi-C6', level: 'intermediate', title: 'Au restaurant', scene: 'fish', npcRole: 'le serveur',
    situation: 'Tu dînes au restaurant. Commande un plat et une boisson, donne ton avis, demande l\'addition.',
    key: ['cá|poisson|img:fish', 'nước ép|jus|img:juice', 'ngon|délicieux', 'hóa đơn|l\'addition|img:money'],
    turns: [
      { npc: 'Chào mừng quý khách|Bienvenue', ok: 'Xin chào|Bonjour', bad: ['Tính tiền giúp tôi|L\'addition, s\'il vous plaît', 'Tạm biệt|Au revoir'] },
      { npc: 'Bạn muốn ăn gì?|Que veux-tu manger ?', ok: 'Tôi muốn ăn cá|Je voudrais du poisson|img:fish', bad: ['Tôi là sinh viên|Je suis étudiant', 'Ngày mai|Demain'] },
      { npc: 'Còn bạn muốn uống gì?|Et que veux-tu boire ?', ok: 'Tôi thích nước ép hơn|Je préfère le jus|img:juice', bad: ['Tên tôi là Anna|Je m\'appelle Anna', 'Tôi bị mất túi|J\'ai perdu mon sac'] },
      { npc: 'Có ngon không?|Est-ce que c\'est bon ?', ok: 'Có, rất ngon|Oui, c\'est très bon', bad: ['Tôi không hiểu|Je ne comprends pas', 'bên phải|à droite'] },
      { npc: 'Còn gì nữa không?|Autre chose ?', ok: 'Không, tính tiền giúp tôi|Non, l\'addition, s\'il vous plaît', bad: ['Tôi thích cà phê|J\'aime le café', 'Nhà vệ sinh ở đâu?|Où sont les toilettes ?'] },
    ],
  },
  {
    id: 'vi-C7', level: 'intermediate', title: 'À l\'université', scene: 'university', npcRole: 'le professeur',
    situation: 'C\'est ton premier jour à l\'université. Réponds à ton professeur et demande où est la bibliothèque.',
    key: ['giáo viên|professeur|img:teacher', 'sinh viên|étudiant|img:student', 'thư viện|bibliothèque|img:library', 'đại học|université|img:university'],
    turns: [
      { npc: 'Chào buổi sáng|Bonjour (le matin)', ok: 'Xin chào|Bonjour', bad: ['Chào buổi tối|Bonsoir', 'Không có gì|De rien'] },
      { npc: 'Bạn là sinh viên mới à?|Es-tu un nouvel étudiant ?', ok: 'Vâng, tôi là sinh viên mới|Oui, je suis un nouvel étudiant|img:student', bad: ['Tôi không hiểu|Je ne comprends pas', 'Cái này bao nhiêu tiền?|Combien ça coûte ?'] },
      { npc: 'Bạn học ngành gì?|Qu\'étudies-tu ?', ok: 'Tôi học ngoại ngữ|J\'étudie les langues', bad: ['Tôi đến từ Pháp|Je viens de France', 'Cho tôi bánh mì|Je veux du pain|img:bread'] },
      { npc: 'Bạn có câu hỏi không?|As-tu une question ?', ok: 'Có ạ, thư viện ở đâu ạ?|Oui, où est la bibliothèque ?|img:library', bad: ['Cảm ơn|Merci', 'Ngày mai|Demain'] },
      { npc: 'Thư viện ở gần đây, đi thẳng nhé|La bibliothèque est près, tout droit', ok: 'Cảm ơn thầy|Merci, professeur', bad: ['Xin lỗi vì sự cố này|Je m\'excuse pour cette erreur', 'Xin chào|Bonjour'] },
    ],
  },
  {
    id: 'vi-C8', level: 'intermediate', title: 'Chez le médecin', scene: 'hospital', npcRole: 'le médecin',
    situation: 'Tu ne te sens pas bien. Explique ce que tu as et écoute les conseils du médecin.',
    key: ['bác sĩ|médecin|img:doctor', 'đầu|tête|img:head', 'nước|eau|img:water', 'Từ hôm qua|Depuis hier'],
    turns: [
      { npc: 'Chào bạn, bạn bị sao vậy?|Bonjour, quel est le problème ?', ok: 'Tôi bị ốm|Je suis malade', bad: ['Tôi là sinh viên|Je suis étudiant', 'Cho tôi một ly cà phê|Je voudrais un café, s\'il vous plaît|img:coffee'] },
      { npc: 'Bạn đau ở đâu?|Où as-tu mal ?', ok: 'Tôi bị đau đầu|J\'ai mal à la tête|img:head', bad: ['Tôi đến từ Pháp|Je viens de France', 'bên trái|à gauche'] },
      { npc: 'Từ bao giờ?|Depuis quand ?', ok: 'Từ hôm qua|Depuis hier', bad: ['Ngày mai|Demain', 'Vâng|Oui'] },
      { npc: 'Tôi sẽ kê thuốc cho bạn|Je vais te donner un médicament', ok: 'Cảm ơn bác sĩ|Merci, docteur', bad: ['Tạm biệt|Au revoir', 'Sân bay ở đâu?|Où est l\'aéroport ?'] },
      { npc: 'Uống nhiều nước nhé|Bois beaucoup d\'eau|img:water', ok: 'Được rồi|D\'accord', bad: ['Tôi bị mất túi|J\'ai perdu mon sac', 'Cái này bao nhiêu tiền?|Combien ça coûte ?'] },
    ],
  },
  {
    id: 'vi-C9', level: 'intermediate', title: 'Inviter un ami', scene: 'sunset', npcRole: 'un ami',
    situation: 'Un ami te propose de sortir. Accepte, fixe l\'heure et le lieu.',
    key: ['ngày mai|demain', 'quán cà phê|le café|img:coffee', 'năm giờ|cinq heures|img:clock', 'Hẹn gặp lại|À bientôt'],
    turns: [
      { npc: 'Chào buổi tối|Bonsoir', ok: 'Chào buổi tối|Bonsoir', bad: ['Chào buổi sáng|Bonjour (le matin)', 'Không có gì|De rien'] },
      { npc: 'Ngày mai bạn đi chơi không?|Veux-tu qu\'on sorte demain ?', ok: 'Vâng, rất vui|Oui, avec plaisir', bad: ['Tôi không hiểu|Je ne comprends pas', 'Tôi bị ốm|Je suis malade'] },
      { npc: 'Mình gặp nhau ở đâu?|Où se retrouve-t-on ?', ok: 'Ở quán cà phê|Au café|img:coffee', bad: ['Tôi là sinh viên|Je suis étudiant', 'Tên tôi là Anna|Je m\'appelle Anna'] },
      { npc: 'Mấy giờ?|À quelle heure ?', ok: 'Lúc năm giờ|À cinq heures|img:clock', bad: ['bên phải|à droite', 'Tôi muốn uống trà|Je veux du thé'] },
      { npc: 'Hẹn vậy nhé|C\'est entendu', ok: 'Hẹn gặp lại|À bientôt', bad: ['Xin chào|Bonjour', 'Cái này bao nhiêu tiền?|Combien ça coûte ?'] },
    ],
  },
  {
    id: 'vi-C10', level: 'advanced', title: 'Donner son avis sur une ville', scene: 'city', npcRole: 'un ami',
    situation: 'Un ami te demande ce que tu penses de sa ville. Donne ton avis et justifie-le.',
    key: ['thành phố|ville|img:city', 'đẹp|beau', 'vì|parce que', 'nhưng|mais'],
    turns: [
      { npc: 'Bạn nghĩ gì về thành phố này?|Que penses-tu de cette ville ?', ok: 'Tôi thấy thành phố này đẹp|Je pense que la ville est belle|img:city', bad: ['Tôi đến từ Pháp|Je viens de France', 'Tạm biệt|Au revoir'] },
      { npc: 'Tại sao?|Pourquoi ?', ok: 'Vì nó sạch và yên tĩnh|Parce qu\'elle est propre et calme', bad: ['Ngày mai|Demain', 'Tên tôi là Anna|Je m\'appelle Anna'] },
      { npc: 'Nhưng nó đắt|Mais elle est chère', ok: 'Tôi đồng ý, nhưng tôi thích nó|Je suis d\'accord, mais je l\'aime', bad: ['Tôi không hiểu|Je ne comprends pas', 'Cảm ơn|Merci'] },
      { npc: 'Bạn sẽ đến thăm nữa không?|La visiteras-tu encore ?', ok: 'Có, tôi sẽ đến thăm nữa|Oui, je la visiterai encore', bad: ['Tôi bị ốm|Je suis malade', 'bên trái|à gauche'] },
    ],
  },
  {
    id: 'vi-C11', level: 'advanced', title: 'Une réclamation', scene: 'money', npcRole: 'l\'employé',
    situation: 'Ton appareil ne marche pas. Explique le problème et demande une réparation ou un dédommagement.',
    key: ['vấn đề|problème', 'thiết bị|l\'appareil', 'tiền bồi thường|dédommagement', 'giám đốc|directeur'],
    turns: [
      { npc: 'Tôi có thể giúp gì cho bạn?|Comment puis-je t\'aider ?', ok: 'Tôi có một vấn đề|J\'ai un problème', bad: ['Xin chào|Bonjour', 'Tôi là sinh viên|Je suis étudiant'] },
      { npc: 'Vấn đề là gì?|Quel est le problème ?', ok: 'Thiết bị không hoạt động|L\'appareil ne fonctionne pas', bad: ['Tên tôi là Anna|Je m\'appelle Anna', 'Cho tôi một ly cà phê|Je voudrais un café, s\'il vous plaît|img:coffee'] },
      { npc: 'Từ bao giờ?|Depuis quand ?', ok: 'Từ hôm qua|Depuis hier', bad: ['Vâng|Oui', 'bên phải|à droite'] },
      { npc: 'Xin lỗi vì sự cố này|Je m\'excuse pour cette erreur', ok: 'Nhờ bạn sửa giúp tôi|Je vous prie de le réparer', bad: ['Tạm biệt|Au revoir', 'Tôi không hiểu|Je ne comprends pas'] },
      { npc: 'Ngày mai tôi sẽ sửa|Je le réparerai demain', ok: 'Cảm ơn bạn|Merci à vous', bad: ['Nhà vệ sinh ở đâu?|Où sont les toilettes ?', 'Tôi bị ốm|Je suis malade'] },
    ],
  },
  {
    id: 'vi-C12', level: 'advanced', title: 'Un exposé en classe', scene: 'teacher', npcRole: 'le professeur',
    situation: 'Tu présentes un court exposé. Ouvre, argumente, conclus et remercie.',
    key: ['chủ đề|sujet', 'ví dụ|par exemple', 'kết luận|pour conclure', 'câu hỏi|question'],
    turns: [
      { npc: 'Mời bạn bắt đầu|Je vous en prie, commencez', ok: 'Chủ đề của tôi là việc học ngoại ngữ|Mon sujet est l\'apprentissage des langues', bad: ['Cảm ơn mọi người đã lắng nghe|Merci de votre attention', 'Tạm biệt|Au revoir'] },
      { npc: 'Tại sao chọn chủ đề này?|Pourquoi ce sujet ?', ok: 'Vì nó quan trọng|Parce qu\'il est important', bad: ['Cho tôi bánh mì|Je veux du pain|img:bread', 'Ngày mai|Demain'] },
      { npc: 'Bạn có ví dụ không?|As-tu un exemple ?', ok: 'Có, ví dụ như du lịch|Oui, par exemple les voyages', bad: ['Tôi không hiểu|Je ne comprends pas', 'bên phải|à droite'] },
      { npc: 'Còn phần kết luận?|Et pour conclure ?', ok: 'Tóm lại, tôi học mỗi ngày|Pour conclure, j\'apprends chaque jour', bad: ['Tôi bị ốm|Je suis malade', 'Xin chào|Bonjour'] },
      { npc: 'Tốt lắm, bạn làm rất tốt|Bravo, bon travail', ok: 'Cảm ơn mọi người đã lắng nghe|Merci de votre attention', bad: ['Tôi có một anh trai và một chị gái|J\'ai un frère et une sœur', 'Cái này bao nhiêu tiền?|Combien ça coûte ?'] },
    ],
  },
  {
    id: 'vi-C13', title: 'À la gare', scene: 'station', npcRole: 'l\'employé du guichet',
    situation: 'Tu achètes un billet de train à la gare. Dis où tu vas, demande un billet et paie.',
    key: ['nhà ga|la gare|img:station', 'vé|le billet|img:ticket', 'tàu hỏa|le train|img:train', 'va li|la valise|img:suitcase'],
    turns: [
      { npc: 'Chào bạn, bạn đi đâu?|Bonjour, où allez-vous ?', ok: 'Tôi đi vào trung tâm|Je vais en ville', bad: ['Tôi là sinh viên|Je suis étudiant', 'Cảm ơn|Merci'] },
      { npc: 'Một vé hay hai vé?|Un billet ou deux ?', img: 'ticket', ok: 'Cho tôi một vé|Un billet, s\'il vous plaît|img:ticket', bad: ['Cho tôi nước|Je veux de l\'eau', 'Tên tôi là Anna|Je m\'appelle Anna'] },
      { npc: 'Hai mươi euro|Ça fait vingt euros', ok: 'Của bạn đây|Voilà', bad: ['Cái này bao nhiêu tiền?|Combien ça coûte ?', 'Tôi thích cà phê|J\'aime le café'] },
      { npc: 'Tàu chạy lúc năm giờ|Le train part à cinq heures', ok: 'Được rồi, cảm ơn|D\'accord, merci', bad: ['Tôi bị mất túi|J\'ai perdu mon sac', 'Tôi bị ốm|Je suis malade'] },
      { npc: 'Chúc thượng lộ bình an|Bon voyage !', ok: 'Cảm ơn, tạm biệt|Merci, au revoir', bad: ['Xin chào|Bonjour', 'Tôi không hiểu|Je ne comprends pas'] },
    ],
  },
  {
    id: 'vi-C14', level: 'intermediate', title: 'À l\'hôtel', scene: 'hotel', npcRole: 'le réceptionniste',
    situation: 'Tu arrives à l\'hôtel. Annonce ta réservation, donne ton nom, écoute les consignes.',
    key: ['khách sạn|l\'hôtel|img:hotel', 'phòng|la chambre|img:bed', 'chìa khóa|la clé|img:key', 'bữa sáng|le petit-déjeuner'],
    turns: [
      { npc: 'Chào bạn, chào mừng đến khách sạn|Bonjour, bienvenue à l\'hôtel', ok: 'Chào bạn, tôi có đặt phòng|Bonjour, j\'ai une réservation', bad: ['Tính tiền giúp tôi|L\'addition, s\'il vous plaît', 'Tôi muốn uống trà|Je veux du thé'] },
      { npc: 'Tên bạn là gì?|Quel est votre nom ?', ok: 'Tên tôi là Anna|Je m\'appelle Anna', bad: ['Tôi đến từ Pháp|Je viens de France', 'Cảm ơn|Merci'] },
      { npc: 'Đây là chìa khóa phòng của bạn|Voici la clé de votre chambre|img:key', img: 'key', ok: 'Cảm ơn|Merci', bad: ['Tạm biệt|Au revoir', 'Tôi bị ốm|Je suis malade'] },
      { npc: 'Bữa sáng lúc tám giờ|Le petit-déjeuner est à huit heures', ok: 'Tuyệt, cảm ơn|C\'est parfait, merci', bad: ['Tôi bị mất túi|J\'ai perdu mon sac', 'bên trái|à gauche'] },
      { npc: 'Bạn cần gì nữa không?|Avez-vous besoin d\'autre chose ?', ok: 'Không, cảm ơn, chúc ngủ ngon|Non, merci, bonne nuit', bad: ['Tên tôi là Anna|Je m\'appelle Anna', 'Tôi đến từ Pháp|Je viens de France'] },
    ],
  },
  {
    id: 'vi-C15', level: 'intermediate', title: 'Au téléphone', scene: 'phone', npcRole: 'un ami',
    situation: 'Un ami t\'appelle. Réponds, donne des nouvelles et fixe un rendez-vous pour demain.',
    key: ['điện thoại|le téléphone|img:phone', 'số điện thoại|le numéro', 'ngày mai|demain', 'Hẹn gặp lại|À bientôt'],
    turns: [
      { npc: 'Alô?|Allô ?', ok: 'Alô, Anna đây|Allô, c\'est Anna', bad: ['Cảm ơn|Merci', 'Vâng|Oui'] },
      { npc: 'Bạn khỏe không?|Comment vas-tu ?', ok: 'Tôi khỏe, cảm ơn|Je vais bien, merci', bad: ['Tên tôi là Anna|Je m\'appelle Anna', 'Tạm biệt|Au revoir'] },
      { npc: 'Mai bạn rảnh không?|Tu es libre demain ?', ok: 'Có, tôi rảnh|Oui, je suis libre', bad: ['Tôi bị ốm|Je suis malade', 'Tôi bị mất túi|J\'ai perdu mon sac'] },
      { npc: 'Tôi nhắn địa chỉ cho bạn nhé|Je t\'envoie l\'adresse par message', ok: 'Được rồi, cảm ơn|D\'accord, merci', bad: ['Tôi là sinh viên|Je suis étudiant', 'Tôi không hiểu|Je ne comprends pas'] },
      { npc: 'Mai gặp nhé!|À demain !', ok: 'Mai gặp nhé!|À demain !', bad: ['Xin chào|Bonjour', 'Tôi thích cà phê|J\'aime le café'] },
    ],
  },
  {
    id: 'vi-C16', level: 'intermediate', title: 'À l\'aéroport', scene: 'airport', npcRole: 'l\'agent d\'enregistrement',
    situation: 'Tu enregistres ton vol. Montre ton passeport, dis où tu vas et demande ta porte.',
    key: ['sân bay|l\'aéroport|img:airport', 'hộ chiếu|le passeport', 'va li|la valise|img:suitcase', 'máy bay|l\'avion|img:airplane'],
    turns: [
      { npc: 'Cho tôi xem hộ chiếu|Votre passeport, s\'il vous plaît', ok: 'Đây là hộ chiếu của tôi|Voici mon passeport', bad: ['Tôi là sinh viên|Je suis étudiant', 'Cái này bao nhiêu tiền?|Combien ça coûte ?'] },
      { npc: 'Chào bạn, bạn đi đâu?|Bonjour, où allez-vous ?', ok: 'Tôi đi Pháp|Je vais en France', bad: ['Cảm ơn|Merci', 'Ngày mai|Demain'] },
      { npc: 'Bạn có va li không?|Avez-vous une valise ?', img: 'suitcase', ok: 'Có, tôi có một va li|Oui, j\'ai une valise|img:suitcase', bad: ['Tôi thích cà phê|J\'aime le café', 'Tên tôi là Anna|Je m\'appelle Anna'] },
      { npc: 'Máy bay cất cánh lúc mười giờ|L\'avion part à dix heures', ok: 'Cảm ơn, cửa lên máy bay ở đâu?|Merci, où est la porte d\'embarquement ?', bad: ['Tôi bị mất túi|J\'ai perdu mon sac', 'Tôi bị ốm|Je suis malade'] },
      { npc: 'Chúc bay an toàn|Bon vol !', ok: 'Cảm ơn, tạm biệt|Merci, au revoir', bad: ['Xin chào|Bonjour', 'Tôi không hiểu|Je ne comprends pas'] },
    ],
  },
];
