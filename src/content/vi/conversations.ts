import type { ConvSpec } from '../conversations';

// ─── VI — conversations guidées A1 (générées depuis la table de phrases communes) ───
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
];
