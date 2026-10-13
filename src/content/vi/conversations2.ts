import type { ConvSpec } from '../conversations';

// ─── VI — conversations guidées C17 à C20 (supermarché, plage, chez un ami, taxi) ───
// Générées depuis une table de phrases communes à 11 langues. À faire relire par un locuteur natif.

export const VI_CONVERSATIONS2: ConvSpec[] = [
  {
    id: 'vi-C17', title: 'Au supermarché', scene: 'supermarket', npcRole: 'l\'employé du magasin',
    situation: 'Tu fais tes courses. Demande où est le lait, réponds à l\'employé et paie.',
    key: ['sữa|le lait|img:milk', 'bánh mì|le pain|img:bread', 'quả táo|la pomme|img:apple', 'cái túi|le sac|img:bag'],
    turns: [
      { npc: 'Xin chào, tôi giúp được gì cho bạn?|Bonjour, je peux vous aider ?', ok: 'Sữa ở đâu?|Où est le lait ?', bad: ['Tạm biệt|Au revoir', 'Cảm ơn|Merci'] },
      { npc: 'Sữa ở đằng kia, bên phải|Le lait est là-bas, à droite', ok: 'Cảm ơn rất nhiều|Merci beaucoup', bad: ['Xin chào|Bonjour', 'Tôi đến từ nước Pháp|Je viens de France'] },
      { npc: 'Bạn muốn mua gì nữa không?|Voulez-vous autre chose ?', ok: 'Vâng, bánh mì và táo|Oui, du pain et des pommes', bad: ['Rất vui được gặp bạn|Enchanté(e)', 'Ngày mai|Demain'] },
      { npc: 'Bạn có muốn một cái túi không?|Voulez-vous un sac ?', ok: 'Vâng, làm ơn|Oui, s\'il vous plaît', bad: ['Tôi không hiểu|Je ne comprends pas', 'Tạm biệt|Au revoir'] },
      { npc: 'Tất cả là mười euro|Ça fait dix euros', ok: 'Đây ạ|Voilà, tenez', bad: ['Bạn khỏe không?|Comment vas-tu ?', 'Tôi không hiểu|Je ne comprends pas'] },
      { npc: 'Chúc bạn một ngày tốt lành!|Bonne journée !', ok: 'Cảm ơn, bạn cũng vậy|Merci, à vous aussi', bad: ['Tôi không hiểu|Je ne comprends pas', 'Xin chào|Bonjour'] },
    ],
  },
  {
    id: 'vi-C18', title: 'À la plage', scene: 'beach', npcRole: 'un ami',
    situation: 'Tu passes la journée à la plage avec un ami. Parle du temps, de la mer et de l\'eau.',
    key: ['bãi biển|la plage|img:beach', 'biển|la mer|img:sea', 'mặt trời|le soleil|img:sun', 'nước|l\'eau|img:water'],
    turns: [
      { npc: 'Hôm nay trời đẹp|Il fait beau aujourd\'hui', ok: 'Vâng, trời rất nóng|Oui, il fait très chaud', bad: ['Tôi tên là Karim|Je m\'appelle Karim', 'Tạm biệt|Au revoir'] },
      { npc: 'Bạn có thích biển không?|Tu aimes la mer ?', ok: 'Có, tôi rất thích biển|Oui, j\'aime beaucoup la mer', bad: ['Bây giờ là năm giờ|Il est cinq heures', 'Tôi đến từ nước Pháp|Je viens de France'] },
      { npc: 'Bạn có muốn bơi không?|Tu veux nager ?', ok: 'Có, đi thôi!|Oui, allons-y !', bad: ['Tôi là sinh viên|Je suis étudiant', 'Nhà ga ở đâu?|Où est la gare ?'] },
      { npc: 'Bạn có khát không?|Tu as soif ?', ok: 'Có, tôi muốn uống nước|Oui, je veux de l\'eau', bad: ['Ngày mai|Demain', 'Rất vui được gặp bạn|Enchanté(e)'] },
      { npc: 'Nước đây|Voici de l\'eau', ok: 'Cảm ơn|Merci', bad: ['Không có gì|De rien', 'Tạm biệt|Au revoir'] },
      { npc: 'Mình về nhé? Muộn rồi|On rentre ? Il est tard', ok: 'Được, mai gặp lại|D\'accord, à demain', bad: ['Xin chào|Bonjour', 'Cái này bao nhiêu tiền?|Combien ça coûte ?'] },
    ],
  },
  {
    id: 'vi-C19', title: 'Chez un ami', scene: 'house', npcRole: 'ton hôte',
    situation: 'Un ami t\'invite chez lui. Remercie, accepte une boisson et goûte ce qu\'il t\'offre.',
    key: ['ngôi nhà|la maison|img:house', 'trà|le thé|img:tea', 'bánh mì|le pain|img:bread', 'mật ong|le miel|img:honey'],
    turns: [
      { npc: 'Chào mừng bạn đến nhà tôi!|Bienvenue chez moi !', ok: 'Cảm ơn, nhà bạn đẹp quá|Merci, ta maison est belle', bad: ['Tạm biệt|Au revoir', 'Tôi không hiểu|Je ne comprends pas'] },
      { npc: 'Vào đi và ngồi xuống|Entre et assieds-toi', ok: 'Cảm ơn rất nhiều|Merci beaucoup', bad: ['Nhà ga ở đâu?|Où est la gare ?', 'Không có gì|De rien'] },
      { npc: 'Bạn muốn uống trà hay cà phê?|Tu veux du thé ou du café ?', ok: 'Cho tôi trà, làm ơn|Du thé, s\'il te plaît', bad: ['Tôi đến từ nước Pháp|Je viens de France', 'Tạm biệt|Au revoir'] },
      { npc: 'Bạn có đói không?|Tu as faim ?', ok: 'Một chút, cảm ơn|Un peu, merci', bad: ['Vâng, trời rất nóng|Oui, il fait très chaud', 'Tôi tên là Karim|Je m\'appelle Karim'] },
      { npc: 'Đây là bánh mì và mật ong|Voici du pain et du miel', ok: 'Ngon lắm!|C\'est très bon !', bad: ['Sữa ở đâu?|Où est le lait ?', 'Xin chào|Bonjour'] },
      { npc: 'Lại đến chơi nhé!|Reviens bientôt !', ok: 'Rất sẵn lòng, cảm ơn bạn về tất cả|Avec plaisir, merci pour tout', bad: ['Cái này bao nhiêu tiền?|Combien ça coûte ?', 'Rất vui được gặp bạn|Enchanté(e)'] },
    ],
  },
  {
    id: 'vi-C20', level: 'intermediate', title: 'En taxi', scene: 'taxi', npcRole: 'le chauffeur de taxi',
    situation: 'Tu prends un taxi pour l\'aéroport. Dis ta destination, bavarde un peu et paie la course.',
    key: ['taxi|le taxi|img:taxi', 'sân bay|l\'aéroport|img:airport', 'vali|la valise|img:suitcase', 'vé|le billet|img:ticket'],
    turns: [
      { npc: 'Xin chào, bạn đi đâu?|Bonjour, où allez-vous ?', ok: 'Đến sân bay, làm ơn|À l\'aéroport, s\'il vous plaît', bad: ['Tôi tên là Karim|Je m\'appelle Karim', 'Cho tôi trà, làm ơn|Du thé, s\'il te plaît'] },
      { npc: 'Mất hai mươi phút|C\'est à vingt minutes', ok: 'Được rồi|D\'accord', bad: ['Rất vui được gặp bạn|Enchanté(e)', 'Sữa ở đâu?|Où est le lait ?'] },
      { npc: 'Bạn đang đi du lịch à?|Vous êtes en voyage ?', ok: 'Vâng, tôi đến từ nước Pháp|Oui, je viens de France', bad: ['Vâng, trời rất nóng|Oui, il fait très chaud', 'Tạm biệt|Au revoir'] },
      { npc: 'Đến nơi rồi|Nous sommes arrivés', ok: 'Làm ơn dừng ở đây|Arrêtez-vous ici, s\'il vous plaît', bad: ['Xin chào|Bonjour', 'Cái này bao nhiêu tiền?|Combien ça coûte ?'] },
      { npc: 'Tất cả là mười lăm euro|Ça fait quinze euros', ok: 'Đây, bạn giữ tiền thừa|Voilà, gardez la monnaie', bad: ['Tôi không hiểu|Je ne comprends pas', 'Tạm biệt|Au revoir'] },
      { npc: 'Chúc thượng lộ bình an!|Bon voyage !', ok: 'Cảm ơn, tạm biệt|Merci, au revoir', bad: ['Xin chào|Bonjour', 'Nhà ga ở đâu?|Où est la gare ?'] },
    ],
  },
];
