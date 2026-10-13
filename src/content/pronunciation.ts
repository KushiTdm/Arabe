import { ws, w, type ReadingSpec } from './builders';

// ─── Prononciation et faux amis — langues autres que l'arabe ─────────────────
// Source : section « Obstacles du francophone » de chaque programme
// (programmes/*.md) : paires minimales et faux amis déjà vérifiés par Perplexity
// (docs/recherche-*/…verification…). Aucun mot ajouté hors de ces listes, sauf les
// mots isolés de la fin de chaque leçon. Équivalent des parcours P1-P4 de l'arabe.
// À faire relire par un locuteur natif.

type Spec = Omit<ReadingSpec, 'known' | 'letters' | 'skipTr' | 'level'>;
export interface ExtraUnit { after: string; spec: Spec }

const P = (s: Spec): Spec => s;
const pair = (a: string, b: string, note: string): [ReturnType<typeof w>, ReturnType<typeof w>, string] => [w(a), w(b), note];

export const EXTRA_UNITS: Record<string, ExtraUnit[]> = {
  es: [
    { after: 'es-2', spec: P({
      id: 'es-P1', theme: 'reading', title: 'Prononciation : r, rr, accents',
      goal: 'Entendre la différence entre r et rr, et placer l\'accent',
      intro: [
        { title: 'r simple et rr roulé', body: 'Le r simple /ɾ/ est un « d » très rapide, un seul battement de la langue : pero, caro. Le rr se roule : tiens la vibration, perro, carro. Jamais le « r » français de la gorge.' },
        { title: 'Voyelles pures et accent écrit', body: 'a, e, i, o, u se prononcent toujours pareil, sans nasaliser (an, on) ni diphtonguer. L\'accent écrit change le mot : papa (pomme de terre) et papá (papa), hablo (je parle) et habló (il a parlé).' },
      ],
      words: ws(['jefe||chef', 'ojo||œil', 'rojo||rouge', 'calle||rue', 'niño||enfant', 'español||espagnol']),
      pairs: [
        pair('pero||mais', 'perro||chien', 'Un battement contre un r roulé.'),
        pair('caro||cher', 'carro||voiture', 'Tiens la vibration du rr.'),
        pair('pera||poire', 'perra||chienne', 'Même contraste r / rr.'),
        pair('papa||pomme de terre', 'papá||papa', 'L\'accent tonique tombe sur la dernière syllabe.'),
        pair('hablo||je parle', 'habló||il a parlé', 'Accent sur le o final : le mot change de temps.'),
        pair('termino||je termine', 'terminó||il a terminé', 'Même jeu d\'accent.'),
        pair('casa||maison', 'caza||chasse', 'En Espagne, z se prononce /θ/ ; en Amérique latine, comme s (seseo).'),
      ],
    }) },
    { after: 'es-7', spec: P({
      id: 'es-F1', theme: 'falsefriends', title: 'Faux amis',
      goal: 'Ne plus se faire piéger par sept mots qui ressemblent au français',
      intro: [{ title: 'Ça ressemble au français, ça veut dire autre chose', body: 'actual = présent, d\'aujourd\'hui (pas « actuel » au sens français) · éxito = succès · embarazada = enceinte (pas « embarrassée ») · constipado = enrhumé · ropa = vêtements (pas « robe ») · quitar = enlever (pas « quitter ») · discutir = se disputer.' }],
      words: ws(['actual||présent, d\'aujourd\'hui', 'éxito||succès', 'embarazada||enceinte', 'constipado||enrhumé', 'ropa||vêtements', 'quitar||enlever', 'discutir||se disputer']),
    }) },
  ],
  it: [
    { after: 'it-2', spec: P({
      id: 'it-P1', theme: 'reading', title: 'Prononciation : consonnes doubles',
      goal: 'Entendre et tenir les consonnes doubles',
      intro: [
        { title: 'Simple ou double ?', body: 'En italien, une consonne doublée se tient plus longtemps et change le mot : pala (pelle), palla (ballon). Écoute d\'abord : simple ou double ? Puis tiens la consonne, comme avant un petit silence.' },
        { title: 'L\'accent tonique', body: 'Le français accentue la dernière syllabe ; l\'italien accentue le plus souvent l\'avant-dernière. L\'accent compte : àncora (ancre) et ancóra (encore) ne se disent pas pareil.' },
      ],
      words: ws(['gnocchi||gnocchis', 'figlio||fils', 'città||ville', 'scusi||excusez-moi', 'ciao||salut', 'amico||ami']),
      pairs: [
        pair('pala||pelle', 'palla||ballon', 'Tiens le ll : pal-la.'),
        pair('pena||peine', 'penna||plume', 'Tiens le nn : pen-na.'),
        pair('caro||cher', 'carro||chariot', 'Tiens le rr.'),
        pair('fato||destin', 'fatto||fait', 'Tiens le tt.'),
        pair('nono||neuvième', 'nonno||grand-père', 'Tiens le nn : non-no.'),
        pair('sete||soif', 'sette||sept', 'Tiens le tt : set-te.'),
        pair('casa||maison', 'cassa||caisse', 'Tiens le ss : cas-sa.'),
      ],
    }) },
    { after: 'it-7', spec: P({
      id: 'it-F1', theme: 'falsefriends', title: 'Faux amis',
      goal: 'Reconnaître six faux amis fréquents',
      intro: [{ title: 'Attention aux pièges', body: 'subito = tout de suite · pronto = prêt (et « allô » au téléphone) · parente = membre de la famille (pas « parent » seulement) · burro = beurre · cena = dîner · bravo = compétent, doué.' }],
      words: ws(['subito||tout de suite', 'pronto||prêt, allô', 'parente||membre de la famille', 'burro||beurre', 'cena||dîner', 'bravo||compétent']),
    }) },
  ],
  pt: [
    { after: 'pt-2', spec: P({
      id: 'pt-P1', theme: 'reading', title: 'Prononciation : nasales, lh, nh',
      goal: 'Distinguer voyelles nasales et orales, et prononcer lh et nh',
      intro: [
        { title: 'Nasale ou orale ?', body: 'ão, ã, õ, -em, -im se disent par le nez : pão (pain) ne se dit pas comme pau (bâton). Écoute d\'abord « nasale ou orale ? », puis répète sans prononcer de « n » distinct à la fin.' },
        { title: 'lh et nh', body: 'lh (filho) se prononce avec le milieu de la langue contre le palais, plus doux que « ill » de paille ; nh (minha) est le « gn » de agneau, sans « i » après. Le r initial et le rr sont aspirés, pas roulés.' },
      ],
      words: ws(['irmão||frère', 'coração||cœur', 'limão||citron', 'amanhã||demain', 'obrigado||merci', 'sim||oui']),
      pairs: [
        pair('pão||pain', 'pau||bâton', 'Voyelle nasale contre orale.'),
        pair('mão||main', 'mau||mauvais', 'Même contraste ão / au.'),
        pair('vim||je suis venu', 'vi||j\'ai vu', 'Le m nasalise le i.'),
        pair('caro||cher', 'carro||voiture', 'Le rr est aspiré, comme un h expiré.'),
        pair('filho||fils', 'fio||fil', 'lh = un seul son palatal, pas « l + i ».'),
        pair('minha||ma', 'mina||mine', 'nh comme « gn » d\'agneau.'),
      ],
    }) },
    { after: 'pt-7', spec: P({
      id: 'pt-F1', theme: 'falsefriends', title: 'Faux amis',
      goal: 'Reconnaître huit faux amis',
      intro: [{ title: 'Attention aux pièges', body: 'puxar = tirer (pas « pousser ») · esquisito = bizarre · assistir = regarder, assister à · atender = répondre, recevoir (un client) · pretender = avoir l\'intention · comprido = long · parente = membre de la famille · constipado = enrhumé (portugais européen).' }],
      words: ws(['puxar||tirer', 'esquisito||bizarre', 'assistir||regarder, assister à', 'atender||répondre, recevoir', 'pretender||avoir l\'intention', 'comprido||long', 'parente||membre de la famille', 'constipado||enrhumé']),
    }) },
  ],
  de: [
    { after: 'de-2', spec: P({
      id: 'de-P1', theme: 'reading', title: 'Prononciation : ü, ö, ch',
      goal: 'Prononcer ü, ö et les deux sons de ch',
      intro: [
        { title: 'ü et ö : lèvres arrondies, langue avancée', body: 'Dis « i » puis arrondis les lèvres sans bouger la langue : tu obtiens ü (comme le « u » français). Dis « é » puis arrondis : c\'est ö (comme « eu »). Kuchen (gâteau) et Küchen (cuisines) ne se disent pas pareil.' },
        { title: 'ch : deux sons', body: 'Après e, i, ä, ö, ü, ch est doux [ç] : ich (je), nicht. Après a, o, u, il est rauque [x] : ach, Buch. Jamais le « ch » français /ʃ/ (qui s\'écrit sch). Chaque voyelle initiale commence par une attaque nette.' },
      ],
      words: ws(['Küche||cuisine', 'schön||beau', 'ich||je', 'Buch||livre', 'Mädchen||fille', 'Brötchen||petit pain']),
      pairs: [
        pair('Kuchen||gâteau', 'Küchen||cuisines', 'u contre ü : lèvres arrondies, langue en avant.'),
        pair('mochte||aimait', 'möchte||voudrait', 'o contre ö.'),
        pair('schon||déjà', 'schön||beau', 'o contre ö, comme plus haut.'),
        pair('Stadt||ville', 'Staat||État', 'Voyelle courte contre longue.'),
        pair('bitten||demander', 'bieten||offrir', 'i court contre ie long.'),
        pair('Ofen||four', 'offen||ouvert', 'o long fermé contre o court ouvert.'),
      ],
    }) },
    { after: 'de-7', spec: P({
      id: 'de-F1', theme: 'falsefriends', title: 'Faux amis',
      goal: 'Reconnaître six faux amis',
      intro: [{ title: 'Attention aux pièges', body: 'Gift = poison (pas « cadeau ») · also = donc · Rock = jupe · Brief = lettre · Chef = patron · Rente = retraite.' }],
      words: ws(['das Gift||le poison', 'also||donc', 'der Rock||la jupe', 'der Brief||la lettre', 'der Chef||le patron', 'die Rente||la retraite']),
    }) },
  ],
  en: [
    { after: 'en-2', spec: P({
      id: 'en-P1', theme: 'reading', title: 'Prononciation : th, h, voyelles',
      goal: 'Prononcer th, le h aspiré et distinguer voyelles courtes et longues',
      intro: [
        { title: 'th : la langue entre les dents', body: 'think (sourd) : souffle sans voix, langue entre les dents, jamais « s ». this (voisé) : même position avec la voix, jamais « z » ni « d ». Et le h de hat est un souffle sourd : sans lui, on dit « at ».' },
        { title: 'Court contre long', body: 'ship et sheep, full et fool ne diffèrent pas que par la durée : le timbre change aussi. Le son court /ɪ/ est détendu, le long /iː/ est tendu et étiré. Toujours écouter avant de lire : l\'orthographe anglaise trompe.' },
      ],
      words: ws(['think||penser', 'this||ceci', 'three||trois', 'have||avoir', 'here||ici', 'about||à propos de']),
      pairs: [
        pair('ship||bateau', 'sheep||mouton', 'Court détendu contre long tendu.'),
        pair('live||vivre', 'leave||partir', 'Même contraste /ɪ/ et /iː/.'),
        pair('bit||morceau', 'beat||battre', 'Même contraste.'),
        pair('full||plein', 'fool||idiot', 'Court /ʊ/ contre long /uː/.'),
        pair('think||penser', 'sink||couler', 'th : langue entre les dents ; s : langue derrière.'),
        pair('thin||mince', 'sin||péché', 'Même contraste th / s.'),
        pair('thin||mince', 'tin||étain', 'th : souffle continu ; t : arrêt net.'),
        pair('hair||cheveux', 'air||air', 'h : souffle sourd au début.'),
        pair('hat||chapeau', 'at||à', 'Sans souffle, le mot change.'),
      ],
    }) },
    { after: 'en-7', spec: P({
      id: 'en-F1', theme: 'falsefriends', title: 'Faux amis',
      goal: 'Reconnaître huit faux amis',
      intro: [{ title: 'Attention aux pièges', body: 'actually = en fait · eventually = finalement · library = bibliothèque (pas « librairie ») · sensible = raisonnable · pretend = faire semblant · attend = assister à · demand = exiger · introduce = présenter (quelqu\'un).' }],
      words: ws(['actually||en fait', 'eventually||finalement', 'library||bibliothèque', 'sensible||raisonnable', 'pretend||faire semblant', 'attend||assister à', 'demand||exiger', 'introduce||présenter']),
    }) },
  ],
  ru: [
    { after: 'ru-3', spec: P({
      id: 'ru-P1', theme: 'reading', title: 'Prononciation : accent, ы, dur et mou',
      goal: 'Placer l\'accent, dire ы et distinguer consonnes dures et molles',
      intro: [
        { title: 'L\'accent change le mot', body: 'L\'accent russe est mobile et rarement écrit : замо́к (serrure) et за́мок (château), мука́ (farine) et му́ка (tourment). La voyelle accentuée est longue ; les autres se réduisent : молоко́ se dit [məlɐˈko].' },
        { title: 'ы, dur et mou', body: 'ы se dit en reculant la langue, lèvres écartées, plus au fond que « i » : быть (être) et бить (battre). Le signe mou ь (ou une voyelle я е ё ю и) adoucit la consonne : мат (mat) et мать (mère).' },
      ],
      words: ws(['молоко́|malako|lait', 'мать|mat\'|mère', 'брат|brat|frère', 'вы|vy|vous', 'бить|bit\'|battre', 'ты|ty|tu']),
      pairs: [
        pair('быть|byt\'|être', 'бить|bit\'|battre', 'ы : langue reculée. и : langue en avant.'),
        pair('мат|mat|mat', 'мать|mat\'|mère', 'Consonne dure contre molle.'),
        pair('брат|brat|frère', 'брать|brat\'|prendre', 'Même contraste dur / mou.'),
        pair('у́гол|ougal|angle', 'у́голь|ougal\'|charbon', 'Le ь adoucit le л final.'),
      ],
    }) },
    { after: 'ru-7', spec: P({
      id: 'ru-F1', theme: 'falsefriends', title: 'Faux amis',
      goal: 'Reconnaître quatre faux amis',
      intro: [{ title: 'Attention aux pièges', body: 'фами́лия = nom de famille (pas « famille ») · фа́брика = usine · кабине́т = bureau (pièce de travail) · шофёр = chauffeur.' }],
      words: ws(['фами́лия|familia|nom de famille', 'фа́брика|fabrika|usine', 'кабине́т|kabinièt|bureau (pièce)', 'шофёр|chafior|chauffeur']),
    }) },
  ],
  ko: [
    { after: 'ko-2', spec: P({
      id: 'ko-P1', theme: 'reading', title: 'Prononciation : simple, aspirée, tendue',
      goal: 'Distinguer les trois séries de consonnes et connaître les liaisons',
      intro: [
        { title: 'Trois « t » différents', body: 'ㄷ (simple), ㅌ (aspirée) et ㄸ (tendue) sont trois sons distincts : 달 (lune), 탈 (masque), 딸 (fille). Pour sentir l\'aspiration, mets la main devant la bouche : ㅌ souffle, ㄸ est serré et sans souffle.' },
        { title: 'Liaisons et assimilations', body: 'La consonne finale (batchim) n\'est pas relâchée. Devant une voyelle, elle passe à la syllabe suivante : 음악이 se dit [으마기]. Devant ㄴ ou ㅁ, ㅂ devient ㅁ : 합니다 se dit [함니다].' },
      ],
      words: ws(['달|dal|lune', '탈|tal|masque', '딸|ttal|fille', '불|bul|feu', '풀|pul|herbe', '뿔|ppul|corne']),
      pairs: [
        pair('달|dal|lune', '탈|tal|masque', 'Simple contre aspirée : sens le souffle.'),
        pair('탈|tal|masque', '딸|ttal|fille', 'Aspirée contre tendue : pas de souffle, gorge serrée.'),
        pair('불|bul|feu', '풀|pul|herbe', 'Simple contre aspirée.'),
        pair('풀|pul|herbe', '뿔|ppul|corne', 'Aspirée contre tendue.'),
        pair('자다|jada|dormir', '차다|chada|être froid', 'Simple contre aspirée.'),
        pair('차다|chada|être froid', '짜다|jjada|être salé', 'Aspirée contre tendue.'),
      ],
    }) },
  ],
  ja: [
    { after: 'ja-2', spec: P({
      id: 'ja-P1', theme: 'reading', title: 'Prononciation : durée et petit っ',
      goal: 'Entendre les voyelles longues et les consonnes doublées',
      intro: [
        { title: 'Voyelles longues', body: 'Une voyelle longue dure deux temps. おばさん (tante) et おばあさん (grand-mère) ne diffèrent que par ça ; おじさん (oncle) et おじいさん (grand-père) de même. Compte les temps : o-ba-sa-n contre o-ba-a-sa-n.' },
        { title: 'っ et accent de hauteur', body: 'Le petit っ double la consonne suivante : on s\'arrête une fraction de seconde avant (きた, きった). Le japonais a aussi un accent de hauteur (haut/bas) plus qu\'un accent d\'intensité : あめ (pluie) et あめ (bonbon) s\'écrivent pareil mais se distinguent par la mélodie (variété de Tōkyō).' },
      ],
      words: ws(['おばあさん|obāsan|grand-mère', 'おじいさん|ojīsan|grand-père', 'ゆき|yuki|neige', 'がっこう|gakkō|école', 'きって|kitte|timbre', 'ざっし|zasshi|magazine']),
      pairs: [
        pair('おばさん|obasan|tante', 'おばあさん|obāsan|grand-mère', 'Allonge le « a » : deux temps.'),
        pair('おじさん|ojisan|oncle', 'おじいさん|ojīsan|grand-père', 'Allonge le « i ».'),
        pair('ゆき|yuki|neige', 'ゆうき|yūki|courage', 'Allonge le « u ».'),
        pair('ここ|koko|ici', 'こうこう|kōkō|lycée', 'Allonge chaque « o ».'),
        pair('きた|kita|est venu', 'きった|kitta|a coupé', 'Petit っ : une brève pause avant le t.'),
      ],
    }) },
  ],
  vi: [
    { after: 'vi-2', spec: P({
      id: 'vi-P1', theme: 'reading', title: 'Paires de tons et de voyelles',
      goal: 'Entendre les tons et les voyelles ư et ơ',
      intro: [
        { title: 'Le ton change le mot', body: 'bàn (table), bán (vendre), bẩn (sale), bận (occupé) : mêmes lettres, tons différents. Écoute la mélodie, pas les lettres. Au Sud, hỏi et ngã se confondent : on suit ici la prononciation du Nord.' },
        { title: 'ư contre ơ', body: 'ư se dit les lèvres écartées, comme « ou » sans arrondir ; ơ est un « eu » long, lèvres détendues. thư (lettre) et thơ (poème) ne diffèrent que par là.' },
      ],
      words: ws(['bàn||table', 'bán||vendre', 'bẩn||sale', 'bận||occupé', 'mua||acheter', 'mùa||saison']),
      pairs: [
        pair('bàn||table', 'bán||vendre', 'Ton grave contre ton aigu.'),
        pair('bẩn||sale', 'bận||occupé', 'Ton interrogatif contre ton lourd.'),
        pair('mua||acheter', 'mùa||saison', 'Plat contre grave.'),
        pair('thư||lettre', 'thơ||poème', 'ư (lèvres écartées) contre ơ (lèvres détendues).'),
      ],
    }) },
  ],
};
