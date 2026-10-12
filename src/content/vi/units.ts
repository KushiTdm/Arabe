import { ws, w, type ReadingSpec } from '../builders';
import type { SimpleUnit } from '../simple';

// ─── Vietnamien — A1 : tons et lettres (V1-V4) puis unités orales ────────────
// Source : programmes/vietnamien.md. Variante du nord (hà nội) pour la voix vi-VN.
// Dans les unités de lecture, « tr » donne le ton ; pas de romanisation ensuite
// (l'écriture est déjà latine).

export const VI_READING: Omit<ReadingSpec, 'known'>[] = [
  {
    id: 'vi-V1', theme: 'reading', skipTr: true, title: 'Tons I : plat, grave, aigu',
    goal: 'Entendre et reproduire trois tons',
    letters: ['ma', 'mà', 'má'],
    intro: [{ title: 'Six tons, une syllabe', body: 'Le vietnamien a 6 tons, marqués par des signes sur la voyelle. Une même syllabe change complètement de sens : ma (fantôme), mà (mais), má (joue). Trois d\'abord : ngang (plat, sans signe), huyền (grave, voix qui descend ` ), sắc (aigu, voix qui monte ´ ).' }],
    words: ws(['ma|ton plat|fantôme', 'mà|ton grave|mais', 'má|ton aigu|joue', 'ba|ton plat|trois, papa', 'bà|ton grave|grand-mère', 'cá|ton aigu|poisson', 'la|ton plat|crier', 'là|ton grave|être', 'lá|ton aigu|feuille']),
    pairs: [[w('ma|ton plat|fantôme'), w('má|ton aigu|joue'), 'Voix plate, puis voix qui monte.'], [w('ba|ton plat|trois'), w('bà|ton grave|grand-mère'), 'Plat contre grave : écoute la voix qui descend.']],
  },
  {
    id: 'vi-V2', theme: 'reading', skipTr: true, title: 'Tons II : interrogatif, brisé, lourd',
    goal: 'Entendre et reproduire les trois tons restants',
    letters: ['mả', 'mã', 'mạ'],
    intro: [{ title: 'Les trois tons difficiles', body: 'hỏi (mả ˀ) : descend puis remonte doucement. ngã (mã ~) : monte avec une rupture de voix au milieu. nặng (mạ . ) : bref, bas, voix qui s\'arrête net. Ces trois-là demandent de l\'écoute : utilise « Lent ».' }],
    words: ws(['mả|ton interrogatif|tombe', 'mã|ton brisé|code (cheval en sino-vietnamien)', 'mạ|ton lourd|jeune plant de riz', 'bả|ton interrogatif|appât empoisonné', 'bã|ton brisé|résidu', 'bạ|ton lourd|au hasard']),
    pairs: [[w('mả|ton interrogatif|tombe'), w('mạ|ton lourd|jeune plant'), 'Descend-remonte contre bref et bas.'], [w('mã|ton brisé|cheval'), w('má|ton aigu|joue'), 'Le brisé a une rupture, l\'aigu monte tout droit.']],
  },
  {
    id: 'vi-V3', theme: 'reading', skipTr: true, title: 'Voyelles',
    goal: 'Lire les voyelles absentes du français',
    letters: ['ă', 'â', 'ê', 'ô', 'ơ', 'ư'],
    intro: [{ title: 'Voyelles à connaître', body: 'ă = a très bref, â = « e » muet bref, ê = « é », ô = « au », ơ = « eu » long, ư = « ou » prononcé les lèvres étirées (inexistant en français). Les signes de voyelle (ă â ê ô ơ ư) et de ton (` ´ ̉ ̃ ̣) se cumulent : ố = ô + aigu.' }],
    words: ws(['ăn|ăn|manger', 'mây|mây|nuage', 'ông|ôông|grand-père, monsieur', 'cơm|keum|riz cuit', 'mưa|mươa|pluie', 'mắt|mắt|œil|img:eye', 'bố|bố|père|img:father', 'mẹ|mẹ|mère|img:mother', 'tôi|tôi|je', 'nước|nước|eau|img:water', 'bên|bên|côté', 'cô|cô|tante, madame']),
  },
  {
    id: 'vi-V4', theme: 'reading', skipTr: true, title: 'Consonnes trompeuses',
    goal: 'Lire les consonnes piégeuses',
    letters: ['đ', 'gi', 'ch', 'kh', 'ng', 'nh', 'ph', 'th', 'tr'],
    intro: [{ title: 'Pièges pour francophones', body: 'đ (avec barre) = le vrai « d » ; d seul = « z » au nord ; gi = « z » au nord ; ph = « f » ; kh = « kh » (jota) ; ng = « ng » même en début de mot ; nh = « gn » ; tr ≈ « tch » ; th = « t » fortement aspiré.' }],
    words: ws(['đi|đi|aller', 'đêm|đêm|nuit', 'giá|giá|prix', 'chó|chó|chien|img:dog', 'không|không|non, zéro', 'người|người|personne', 'nhà|nhà|maison|img:house', 'phở|phở|soupe phở', 'thịt|thịt|viande', 'trà|trà|thé|img:tea', 'ngon|ngon|délicieux', 'chào|chào|bonjour']),
  },
];

export const VI_UNITS: SimpleUnit[] = [
  {
    id: 'vi-1', theme: 'greetings', title: 'Saluer',
    goal: 'Saluer en adaptant le pronom (anh, chị, em)',
    tip: { title: 'Pas de « tu » neutre', body: 'Le vietnamien choisit le pronom selon l\'âge et le sexe : anh (homme un peu plus âgé), chị (femme un peu plus âgée), em (plus jeune), bạn (ami de même âge) ; pour les personnes beaucoup plus âgées : chú, bác, cô. « Chào anh » = « bonjour (grand frère) ».' },
    phrases: [
      'Xin chào|Bonjour|img:handshake', 'Chào anh|Bonjour (à un homme un peu plus âgé)', 'Chào chị|Bonjour (à une femme un peu plus âgée)', 'Chào em|Bonjour (à une personne plus jeune)', 'Tạm biệt|Au revoir|👋',
      'Cảm ơn|Merci|🙏', 'Không có gì|De rien', 'Xin lỗi|Pardon, désolé', 'Vâng|Oui (poli)', 'Không|Non', 'Bạn khỏe không?|Comment vas-tu ?', 'Tôi khỏe, cảm ơn|Je vais bien, merci',
    ],
    qa: [['Bạn khỏe không?', 'Tôi khỏe, cảm ơn', 'Tạm biệt', 'Xin lỗi'], ['Cảm ơn', 'Không có gì', 'Xin chào', 'Tạm biệt']],
  },
  {
    id: 'vi-2', theme: 'greetings', title: 'Se présenter',
    goal: 'Se présenter : Tôi là…',
    tip: { title: 'Là = être (devant un nom)', body: '« Tôi là Anna » = « je suis Anna ». « là » s\'emploie devant un nom, pas devant un adjectif : « Tôi vui » (je suis content). Le vietnamien ne conjugue pas.' },
    phrases: [
      'Tôi là Anna|Je suis Anna', 'Tôi là người Pháp|Je suis français(e)|🇫🇷', 'Tôi là sinh viên|Je suis étudiant|img:student', 'Bạn tên là gì?|Comment t\'appelles-tu ?', 'Tên tôi là Anna|Je m\'appelle Anna',
      'Rất vui được gặp bạn|Enchanté(e) de te rencontrer', 'Bạn là người nước nào?|De quel pays es-tu ?', 'Tôi sống ở Paris|J\'habite à Paris',
    ],
    qa: [['Bạn tên là gì?', 'Tên tôi là Anna', 'Tôi sống ở Paris', 'Tôi là sinh viên']],
  },
  {
    id: 'vi-3', theme: 'numbers', title: 'Compter, prix',
    goal: 'Demander un prix avec les classificateurs',
    tip: { title: 'Le classificateur « cái »', body: '« Cái này » = « ce (objet) ». « cái » sert pour les objets ; d\'autres classificateurs existent pour les animaux (con), les personnes (người).' },
    phrases: [
      'một|un (1)|1️⃣', 'hai|deux (2)|2️⃣', 'ba|trois (3)|3️⃣', 'bốn|quatre (4)|4️⃣', 'năm|cinq (5)|5️⃣', 'sáu|six (6)|6️⃣', 'bảy|sept (7)|7️⃣', 'tám|huit (8)|8️⃣', 'chín|neuf (9)|9️⃣', 'mười|dix (10)|🔟',
      'Cái này bao nhiêu tiền?|Combien coûte ceci ?|img:money', 'Năm mươi nghìn đồng|Cinquante mille dôngs', 'Đắt quá|Trop cher', 'Rẻ|Bon marché', 'Cho tôi cái này|Donnez-moi ceci',
    ],
    qa: [['Cái này bao nhiêu tiền?', 'Năm mươi nghìn đồng', 'một', 'mười']],
  },
  {
    id: 'vi-4', theme: 'food', title: 'Commander',
    goal: 'Commander avec Cho tôi…',
    tip: { title: 'Cho tôi… = « donnez-moi… »', body: 'Pour demander : « Cho tôi » + objet. « Cho tôi một ly cà phê » = « donnez-moi un (verre de) café ». « ly » est le classificateur des verres.' },
    phrases: [
      'Cho tôi một ly cà phê|Un café, s\'il vous plaît|img:coffee', 'Cho tôi một ly trà|Un thé, s\'il vous plaît|img:tea', 'Cho tôi nước|De l\'eau, s\'il vous plaît|img:water', 'phở|soupe phở|🍜', 'cơm|riz cuit|🍚',
      'bánh mì|pain, baguette|img:bread', 'cá|poisson|img:fish', 'Tôi thích cà phê|J\'aime le café', 'Ngon quá!|Délicieux !', 'Tính tiền|L\'addition, s\'il vous plaît', 'Tôi đói|J\'ai faim|🍽️', 'Tôi khát|J\'ai soif|img:drinking', 'Bạn muốn uống gì?|Que veux-tu boire ?',
      'cà chua|tomate|img:tomato',
      'nho|raisin|img:grapes',
      'dâu tây|fraise|img:strawberry',
      'cam|orange|img:orange',
      'khoai tây|pomme de terre|img:potato',
      'hành tây|oignon|img:onion',
    ],
    qa: [['Bạn muốn uống gì?', 'Cho tôi một ly cà phê', 'bánh mì', 'cá']],
  },
  {
    id: 'vi-5', theme: 'places', title: 'Où est… ?',
    goal: 'Demander et comprendre où se trouve un lieu',
    phrases: [
      'Nhà vệ sinh ở đâu?|Où sont les toilettes ?', 'Bệnh viện ở đâu?|Où est l\'hôpital ?', 'trường học|école|img:school', 'chợ|marché|img:market', 'đường|rue|img:street',
      'bên trái|à gauche|⬅️', 'bên phải|à droite|➡️', 'đi thẳng|tout droit|⬆️', 'gần|près', 'xa|loin', 'Ở đây|Ici', 'Ở đó|Là',
    ],
    qa: [['Bệnh viện ở đâu?', 'bên trái', 'chợ', 'đường'], ['Bệnh viện ở đâu?', 'gần', 'chợ', 'trường học']],
  },
  {
    id: 'vi-6', theme: 'daily_life', title: 'Heure et jours',
    goal: 'Dire l\'heure et le jour',
    phrases: [
      'Mấy giờ rồi?|Quelle heure est-il ?|img:clock', 'Ba giờ|Trois heures', 'hôm nay|aujourd\'hui', 'ngày mai|demain', 'hôm qua|hier', 'Thứ hai|lundi', 'Thứ ba|mardi', 'Chủ nhật|dimanche',
      'Tôi thức dậy lúc bảy giờ|Je me lève à sept heures|⏰', 'Tôi đi làm|Je vais travailler|💼',
    ],
    qa: [['Mấy giờ rồi?', 'Ba giờ', 'hôm nay', 'ngày mai']],
  },
];
