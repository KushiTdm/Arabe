// Packs de vocabulaire 7 à 9 (maison, voyage, objets) — 6 mots par pack, dans l'ordre des concepts de packs.ts.
// Format : 'natif' ou 'natif|romanisation'. À faire relire par un locuteur natif.

export const PACK_WORDS2: Record<string, string[]> = {
  ar: [
    'سَرِير|sarīr', 'أَرِيكَة|arīka', 'مَطْبَخ|maṭbakh', 'فِنْجَان|finjān', 'صَحْن|ṣaḥn', 'كَأْس|kaʾs',
    'مَحَطَّة|maḥaṭṭa', 'فُنْدُق|funduq', 'مَطَار|maṭār', 'شَاطِئ|shāṭiʾ', 'حَدِيقَة|ḥadīqa', 'سُوبَرْمَارْكِت|sūbarmārkit',
    'هَاتِف|hātif', 'حَاسُوب|ḥāsūb', 'دَفْتَر|daftar', 'حَقِيبَة ظَهْر|ḥaqībat ẓahr', 'مِظَلَّة|miẓalla', 'حَقِيبَة سَفَر|ḥaqībat safar',
  ],
  es: ['la cama', 'el sofá', 'la cocina', 'la taza', 'el plato', 'el vaso',
    'la estación', 'el hotel', 'el aeropuerto', 'la playa', 'el parque', 'el supermercado',
    'el teléfono', 'el ordenador', 'el cuaderno', 'la mochila', 'el paraguas', 'la maleta'],
  it: ['il letto', 'il divano', 'la cucina', 'la tazza', 'il piatto', 'il bicchiere',
    'la stazione', 'l\'albergo', 'l\'aeroporto', 'la spiaggia', 'il parco', 'il supermercato',
    'il telefono', 'il computer', 'il quaderno', 'lo zaino', 'l\'ombrello', 'la valigia'],
  pt: ['a cama', 'o sofá', 'a cozinha', 'a chávena', 'o prato', 'o copo',
    'a estação', 'o hotel', 'o aeroporto', 'a praia', 'o parque', 'o supermercado',
    'o telefone', 'o computador', 'o caderno', 'a mochila', 'o guarda-chuva', 'a mala'],
  de: ['das Bett', 'das Sofa', 'die Küche', 'die Tasse', 'der Teller', 'das Glas',
    'der Bahnhof', 'das Hotel', 'der Flughafen', 'der Strand', 'der Park', 'der Supermarkt',
    'das Telefon', 'der Computer', 'das Heft', 'der Rucksack', 'der Regenschirm', 'der Koffer'],
  en: ['the bed', 'the sofa', 'the kitchen', 'the cup', 'the plate', 'the glass',
    'the station', 'the hotel', 'the airport', 'the beach', 'the park', 'the supermarket',
    'the phone', 'the computer', 'the notebook', 'the backpack', 'the umbrella', 'the suitcase'],
  ru: [
    'кровать|krovat', 'диван|divan', 'кухня|koukhnia', 'чашка|tchachka', 'тарелка|taryélka', 'стакан|stakan',
    'вокзал|vagzal', 'гостиница|gastinitsa', 'аэропорт|aéroport', 'пляж|pliaj', 'парк|park', 'супермаркет|soupermarkét',
    'телефон|téléfon', 'компьютер|kompiouter', 'тетрадь|tétrat', 'рюкзак|riougzak', 'зонт|zont', 'чемодан|tchémodan',
  ],
  ko: [
    '침대|chimdae', '소파|sopa', '부엌|bueok', '컵|keop', '접시|jeopsi', '유리잔|yurijan',
    '역|yeok', '호텔|hotel', '공항|gonghang', '해변|haebyeon', '공원|gongwon', '슈퍼마켓|syupeomaket',
    '전화|jeonhwa', '컴퓨터|keompyuteo', '공책|gongchaek', '배낭|baenang', '우산|usan', '여행 가방|yeohaeng gabang',
  ],
  ja: [
    'ベッド|beddo', 'ソファ|sofa', '台所|daidokoro', 'カップ|kappu', 'お皿|osara', 'コップ|koppu',
    '駅|eki', 'ホテル|hoteru', '空港|kūkō', '海辺|umibe', '公園|kōen', 'スーパー|sūpā',
    '電話|denwa', 'パソコン|pasokon', 'ノート|nōto', 'リュック|ryukku', '傘|kasa', 'スーツケース|sūtsukēsu',
  ],
  zh: [
    '床|chuáng', '沙发|shāfā', '厨房|chúfáng', '杯子|bēizi', '盘子|pánzi', '玻璃杯|bōlibēi',
    '车站|chēzhàn', '酒店|jiǔdiàn', '机场|jīchǎng', '海滩|hǎitān', '公园|gōngyuán', '超市|chāoshì',
    '电话|diànhuà', '电脑|diànnǎo', '笔记本|bǐjìběn', '背包|bēibāo', '雨伞|yǔsǎn', '行李箱|xínglǐxiāng',
  ],
  vi: ['cái giường', 'ghế sofa', 'nhà bếp', 'cái tách', 'cái đĩa', 'cái ly',
    'nhà ga', 'khách sạn', 'sân bay', 'bãi biển', 'công viên', 'siêu thị',
    'điện thoại', 'máy tính', 'quyển vở', 'ba lô', 'cái ô', 'va li'],
};
