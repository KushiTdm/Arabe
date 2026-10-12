import type { LanguageConfig } from '../lib/languages';
import { getAvailableCategories } from './multilingualVocab';
import { getLessons } from '../content';

// ─── Parcours d'apprentissage ────────────────────────────────────────────────
// Séquence d'unités par langue, tirée des programmes détaillés (dossier
// programmes/). Une unité = un objectif communicatif ou de lecture, atteint en
// 3 ou 4 étapes qui ouvrent les écrans existants (lecture, vocabulaire,
// conversation, quiz).
//
// Les niveaux internes recouvrent : beginner ≈ A1, intermediate ≈ A2,
// advanced ≈ B1 (voir methodologie.md § 2.2).

export type PathLevel = 'beginner' | 'intermediate' | 'advanced';

export type StepKind =
  | 'read'      // lettres de l'unité, à découvrir et à écouter
  | 'readquiz'  // test de lecture sur ces lettres (validé à ≥ 75 %)
  | 'vocab'     // mots d'une catégorie
  | 'speak'     // dialogue guidé par une tâche
  | 'quiz'      // QCM sur la catégorie (validé à ≥ 60 %)
  | 'lesson';   // partie d'une leçon intégrée (content/), validée à ≥ 70 %

export interface PathStep {
  kind: StepKind;
  categoryId?: string;
  letters?: string[];
  task?: string;
  /** Leçon intégrée et partie à jouer (kind 'lesson'). */
  lessonId?: string;
  part?: number;
  partTitle?: string;
}

export interface PathUnit {
  id: string;
  level: PathLevel;
  title: string;
  /** Objectif affiché à l'apprenant, et thème du dialogue. */
  goal: string;
  steps: PathStep[];
  /** Unité de lecture (écriture de la langue) plutôt que communicative. */
  reading: boolean;
}

export const QUIZ_PASS_PCT = 60;
export const READQUIZ_PASS_PCT = 75;

export const LEVEL_LABEL: Record<PathLevel, { cefr: string; name: string }> = {
  beginner:     { cefr: 'A1', name: 'Débutant' },
  intermediate: { cefr: 'A2', name: 'Intermédiaire' },
  advanced:     { cefr: 'B1', name: 'Avancé' },
};

// ─── Descripteurs bruts ──────────────────────────────────────────────────────

interface Raw {
  l: PathLevel;
  t: string;
  /** Catégorie lexicale (unités communicatives). */
  c?: string;
  /** Objectif / tâche. */
  g: string;
  /** Lettres (unités de lecture). */
  r?: string[];
}

const A1: PathLevel = 'beginner';
const A2: PathLevel = 'intermediate';
const B1: PathLevel = 'advanced';

const comm = (l: PathLevel, t: string, c: string, g: string): Raw => ({ l, t, c, g });
const read = (l: PathLevel, t: string, letters: string, g: string): Raw =>
  ({ l, t, g, r: letters.split(' ') });

// ─── Contenu par langue ──────────────────────────────────────────────────────

const RAW: Record<string, Raw[]> = {
  // ── Arabe : lecture et oral entrelacés (l'oral précède la lecture) ───────
  ar: [
    read(A1, 'Lettres I : ا د ذ', 'ا د ذ', 'Lire les premières lettres et distinguer /d/ de /ð/'),
    read(A1, 'Lettres II : ر ز و', 'ر ز و', 'Lire ر ز و et sentir la différence entre voyelle brève et longue'),
    comm(A1, 'Saluer, prendre congé', 'greetings', 'Échanger quatre répliques de salutation avec un inconnu'),
    read(A1, 'Lettres III : ب ت ث ن ي', 'ب ت ث ن ي', 'Lire les lettres à points en position initiale, médiane et finale'),
    read(A1, 'Lettres IV : ج ح خ', 'ج ح خ', 'Lire ج ح خ et produire le son ح, inconnu du français'),
    comm(A1, 'Se présenter', 'greetings', 'Dire son nom, son origine et demander « comment ça va ? »'),
    read(A1, 'Lettres V : س ش', 'س ش', 'Lire س et ش'),
    read(A1, 'Lettres VI : ص ض', 'ص ض', 'Lire les emphatiques ص et ض et les opposer à س et د'),
    comm(A1, 'Se faire comprendre', 'daily_life', 'Demander de répéter, de parler lentement, dire « je ne comprends pas »'),
    read(A1, 'Lettres VII : ط ظ', 'ط ظ', 'Lire les emphatiques ط et ظ'),
    read(A1, 'Lettres VIII : ع غ', 'ع غ', 'Lire ع et غ et ne pas les confondre avec le r français'),
    comm(A1, 'Nombres, prix, heure', 'numbers', 'Demander un prix et acheter un article'),
    read(A1, 'Lettres IX : ك ل م ه', 'ك ل م ه', 'Lire ك ل م ه'),
    read(A1, 'Lettres X : ف ق', 'ف ق', 'Lire ف et ق et opposer ق à ك'),
    comm(A1, 'Lieux et directions', 'travel', 'Demander et comprendre un chemin simple'),
    comm(A1, 'Famille et besoins', 'family', 'Présenter sa famille et exprimer un besoin'),
  ],

  // ── Espagnol ─────────────────────────────────────────────────────────────
  es: [
    comm(A1, 'Saluer et se présenter', 'greetings', 'Se présenter : nom, origine, profession — sans pronom sujet'),
    comm(A1, 'Nombres et âge', 'numbers', 'Dire son âge, son numéro et épeler son nom'),
    comm(A1, 'Famille et possession', 'family', 'Présenter sa famille avec tener et les possessifs'),
    comm(A1, 'Se repérer en ville', 'travel', 'Demander et comprendre un chemin (hay, estar)'),
    comm(A1, 'Au restaurant', 'food', 'Commander un repas et dire ce qu\'on aime (querer, gustar)'),
    comm(A1, 'Ma journée', 'daily_life', 'Décrire sa routine et donner l\'heure'),
    comm(A1, 'Faire des achats', 'daily_life', 'Demander un prix et acheter un article'),
    comm(A2, 'Ce que je viens de faire', 'daily_life', 'Raconter sa journée au pretérito perfecto'),
    comm(A2, 'Raconter un voyage', 'travel', 'Raconter un événement passé à l\'indefinido'),
    comm(A2, 'Souvenirs d\'enfance', 'family', 'Décrire une habitude passée à l\'imperfecto et la contraster avec l\'indefinido'),
    comm(A2, 'Mes projets', 'daily_life', 'Parler de l\'avenir avec ir a et le futur'),
    comm(A2, 'Santé et conseils', 'body', 'Expliquer un problème de santé et conseiller à l\'impératif'),
    comm(A2, 'Comparer et voyager', 'travel', 'Comparer deux options et employer por / para'),
    comm(B1, 'Souhaits et doutes', 'emotions', 'Exprimer un souhait ou un doute avec le subjonctif présent'),
    comm(B1, 'Hypothèses', 'daily_life', 'Formuler une hypothèse avec le conditionnel et si + présent'),
    comm(B1, 'Récit complexe', 'travel', 'Raconter une histoire avec plusieurs temps du passé'),
    comm(B1, 'Donner son opinion', 'emotions', 'Défendre une opinion avec des connecteurs'),
    comm(B1, 'Rapporter des paroles', 'daily_life', 'Rapporter ce que quelqu\'un a dit'),
    comm(B1, 'Subjonctif imparfait', 'emotions', 'Découvrir le subjonctif imparfait dans un récit'),
  ],

  // ── Italien ──────────────────────────────────────────────────────────────
  it: [
    comm(A1, 'Saluer et se présenter', 'greetings', 'Se présenter avec essere et avere, sans pronom sujet'),
    comm(A1, 'Nombres et nationalités', 'numbers', 'Dire son âge, sa nationalité et épeler son nom'),
    comm(A1, 'Famille', 'family', 'Présenter sa famille avec les possessifs et leur article'),
    comm(A1, 'Se repérer en ville', 'travel', 'Demander un chemin avec les prépositions articulées (al, nel)'),
    comm(A1, 'Au restaurant', 'food', 'Commander avec volere, potere, dovere'),
    comm(A1, 'Ma journée', 'daily_life', 'Décrire sa routine et donner l\'heure'),
    comm(A1, 'Faire des achats', 'daily_life', 'Demander un prix et acheter un article'),
    comm(A2, 'Passé récent', 'daily_life', 'Raconter sa journée au passato prossimo'),
    comm(A2, 'Habitudes passées', 'family', 'Décrire une habitude à l\'imperfetto'),
    comm(A2, 'Raconter', 'travel', 'Raconter en opposant passato prossimo et imperfetto'),
    comm(A2, 'Projets', 'daily_life', 'Parler de l\'avenir au futur'),
    comm(A2, 'Remplacer un nom', 'daily_life', 'Employer les pronoms directs et indirects'),
    comm(A2, 'Lieux et quantités', 'travel', 'Employer ci et ne'),
    comm(B1, 'Opinion et doute', 'emotions', 'Exprimer une opinion avec le congiuntivo'),
    comm(B1, 'Hypothèses', 'daily_life', 'Formuler une hypothèse avec le conditionnel'),
    comm(B1, 'Récit complexe', 'travel', 'Raconter avec le trapassato prossimo'),
    comm(B1, 'Rapporter', 'daily_life', 'Rapporter les paroles de quelqu\'un'),
  ],

  // ── Portugais (brésilien) ────────────────────────────────────────────────
  pt: [
    comm(A1, 'Saluer et se présenter', 'greetings', 'Se présenter avec ser ; entendre les voyelles nasales'),
    comm(A1, 'Nombres et nationalités', 'numbers', 'Dire son âge, sa nationalité et épeler son nom'),
    comm(A1, 'Famille', 'family', 'Présenter sa famille avec ter et les possessifs'),
    comm(A1, 'Se repérer en ville', 'travel', 'Demander un chemin avec estar, ficar et no / na / do'),
    comm(A1, 'Au restaurant', 'food', 'Commander avec querer et dire ce qu\'on aime'),
    comm(A1, 'Ma journée', 'daily_life', 'Décrire sa routine et donner l\'heure'),
    comm(A1, 'Faire des achats', 'daily_life', 'Demander un prix et acheter un article'),
    comm(A2, 'Raconter le passé', 'daily_life', 'Raconter au pretérito perfeito'),
    comm(A2, 'Habitudes passées', 'family', 'Décrire une habitude à l\'imperfeito'),
    comm(A2, 'Raconter', 'travel', 'Opposer perfeito et imperfeito dans un récit'),
    comm(A2, 'Projets', 'daily_life', 'Parler de l\'avenir avec ir + infinitif'),
    comm(A2, 'Remplacer un nom', 'daily_life', 'Employer les pronoms objets (proclise brésilienne)'),
    comm(A2, 'Action en cours', 'daily_life', 'Dire ce qu\'on est en train de faire avec estar + gérondif'),
    comm(B1, 'Souhait et doute', 'emotions', 'Employer le subjonctif présent'),
    comm(B1, 'Quand et si', 'daily_life', 'Employer le futur du subjonctif (quando, se)'),
    comm(B1, 'Infinitif personnel', 'daily_life', 'Découvrir une structure sans équivalent français'),
    comm(B1, 'Hypothèses', 'emotions', 'Formuler une hypothèse avec le conditionnel'),
    comm(B1, 'Opinion', 'emotions', 'Argumenter avec des connecteurs'),
  ],

  // ── Anglais ──────────────────────────────────────────────────────────────
  en: [
    comm(A1, 'Se présenter', 'greetings', 'Se présenter avec to be ; entendre le schwa'),
    comm(A1, 'Épeler et compter', 'numbers', 'Épeler son nom, dire son âge et l\'heure'),
    comm(A1, 'Famille', 'family', 'Présenter sa famille avec have got et les possessifs'),
    comm(A1, 'Lieux', 'travel', 'Dire où se trouvent les choses (there is / are)'),
    comm(A1, 'Au restaurant', 'food', 'Commander avec I\'d like'),
    comm(A1, 'Ma routine', 'daily_life', 'Décrire sa journée au present simple'),
    comm(A1, 'En ce moment', 'daily_life', 'Dire ce qui se passe maintenant (BE + -ING)'),
    comm(A1, 'Savoir faire', 'daily_life', 'Dire ce qu\'on sait faire avec can'),
    comm(A2, 'Raconter le passé', 'daily_life', 'Raconter son week-end au past simple'),
    comm(A2, 'Comparer', 'daily_life', 'Comparer deux choses'),
    comm(A2, 'Projets', 'travel', 'Parler de l\'avenir avec going to et will'),
    comm(A2, 'Obligation et conseil', 'daily_life', 'Employer must, have to, should'),
    comm(A2, 'Quantités', 'food', 'Employer much, many, a lot of'),
    comm(A2, 'Voyager', 'travel', 'Poser des questions en voyage'),
    comm(B1, 'Faire un bilan', 'daily_life', 'Parler d\'expériences au present perfect'),
    comm(B1, 'Hypothèses', 'emotions', 'Employer les conditionnels 0, 1 et 2'),
    comm(B1, 'Décrire un processus', 'daily_life', 'Employer la voix passive'),
    comm(B1, 'Rapporter', 'daily_life', 'Rapporter les paroles de quelqu\'un'),
    comm(B1, 'Langue courante', 'daily_life', 'Employer des phrasal verbs fréquents'),
    comm(B1, 'Préciser', 'daily_life', 'Employer des propositions relatives'),
  ],

  // ── Allemand ─────────────────────────────────────────────────────────────
  de: [
    comm(A1, 'Se présenter', 'greetings', 'Se présenter avec sein ; donner l\'article avec chaque nom'),
    comm(A1, 'Famille, nombres, heure', 'family', 'Présenter sa famille avec haben et les possessifs'),
    comm(A1, 'Acheter', 'daily_life', 'Acheter un article à l\'accusatif'),
    comm(A1, 'Au restaurant', 'food', 'Commander avec möchten et les verbes modaux'),
    comm(A1, 'Ma routine', 'daily_life', 'Décrire sa journée avec les verbes séparables'),
    comm(A1, 'Ma semaine', 'daily_life', 'Raconter sa semaine avec l\'inversion (Heute gehe ich…)'),
    comm(A2, 'Donner, aider', 'daily_life', 'Employer le datif'),
    comm(A2, 'Où et vers où', 'travel', 'Localiser et déplacer avec les prépositions mixtes'),
    comm(A2, 'Raconter le passé', 'daily_life', 'Raconter au Perfekt'),
    comm(A2, 'Expliquer', 'daily_life', 'Justifier avec weil, dass, wenn (verbe final)'),
    comm(A2, 'Comparer', 'daily_life', 'Comparer deux choses'),
    comm(A2, 'Passé de sein et haben', 'daily_life', 'Employer le Präteritum de sein, haben et des modaux'),
    comm(B1, 'Récit écrit', 'daily_life', 'Raconter au Präteritum'),
    comm(B1, 'Concession', 'emotions', 'Employer obwohl, da, während'),
    comm(B1, 'Politesse et hypothèses', 'emotions', 'Employer würde + infinitif, puis wäre et hätte'),
    comm(B1, 'Décrire un processus', 'daily_life', 'Employer le passif'),
    comm(B1, 'Décrire précisément', 'daily_life', 'Décliner l\'adjectif ; découvrir le génitif'),
    comm(B1, 'Préciser', 'daily_life', 'Employer des propositions relatives'),
  ],

  // ── Russe : cyrillique d'abord ───────────────────────────────────────────
  ru: [
    read(A1, 'Cyrillique I', 'А К М О Т Е', 'Lire les lettres qui ressemblent aux nôtres'),
    read(A1, 'Cyrillique II : faux amis', 'В Н Р С У Х', 'Lire В Н Р С У Х : ce ne sont pas les sons attendus'),
    read(A1, 'Cyrillique III', 'Б Г Д П Л З И Й', 'Lire Б Г Д П Л З И Й'),
    read(A1, 'Cyrillique IV : sifflantes', 'Ж Ш Щ Ч Ц', 'Lire Ж Ш Щ Ч Ц'),
    read(A1, 'Cyrillique V', 'Ф Э Ю Я Ё', 'Lire Ф Э Ю Я Ё'),
    read(A1, 'Cyrillique VI : signes', 'Ы Ь Ъ', 'Lire Ы Ь Ъ et sentir dur / mou'),
    comm(A1, 'Se présenter', 'greetings', 'Se présenter sans le verbe « être » (Я студент)'),
    comm(A1, 'Nommer et décrire', 'colors', 'Nommer des objets et leur genre'),
    comm(A1, 'Où ?', 'travel', 'Localiser avec le prépositionnel'),
    comm(A1, 'Goûts', 'food', 'Dire ce qu\'on aime avec l\'accusatif'),
    comm(A1, 'Posséder', 'family', 'Dire ce qu\'on a avec у меня есть et le génitif'),
    comm(A1, 'Ma routine', 'daily_life', 'Décrire sa journée au présent'),
    comm(A1, 'Restaurant et achats', 'numbers', 'Commander et demander un prix'),
    comm(A2, 'Âge et besoins', 'daily_life', 'Employer le datif (мне нужно)'),
    comm(A2, 'Compagnie et profession', 'family', 'Employer l\'instrumental'),
    comm(A2, 'Raconter', 'daily_life', 'Raconter au passé'),
    comm(A2, 'Projets et aspect', 'daily_life', 'Parler de l\'avenir ; premières paires d\'aspect'),
    comm(A2, 'Se déplacer', 'travel', 'Employer идти / ходить, ехать / ездить'),
    comm(B1, 'Les six cas au pluriel', 'daily_life', 'Consolider les cas'),
    comm(B1, 'Aspect', 'daily_life', 'Choisir entre perfectif et imperfectif'),
    comm(B1, 'Verbes préfixés', 'travel', 'Employer пойти, приехать, уйти'),
    comm(B1, 'Relier', 'emotions', 'Employer который, чтобы, если'),
  ],

  // ── Mandarin : tons et pinyin d'abord ────────────────────────────────────
  zh: [
    read(A1, 'Les quatre tons', 'ā á ǎ à', 'Entendre et reproduire les quatre tons'),
    read(A1, 'Initiales I', 'b p m f d t n l g k h', 'Lire les initiales, aspirées et non aspirées'),
    read(A1, 'Rétroflexes', 'zh ch sh r', 'Lire zh ch sh r et les opposer à z c s'),
    read(A1, 'Initiales II', 'z c s j q x ü', 'Lire z c s j q x et ü'),
    comm(A1, 'Saluer, se présenter', 'greetings', 'Dire bonjour, son nom et sa nationalité (是, 不)'),
    comm(A1, 'Famille et nombres', 'family', 'Compter et employer le classificateur 个'),
    comm(A1, 'Heure et date', 'numbers', 'Dire l\'heure : temps, lieu, puis verbe'),
    comm(A1, 'Manger et boire', 'food', 'Commander avec 想 et 要'),
    comm(A1, 'Acheter', 'daily_life', 'Demander un prix (多少钱)'),
    comm(A1, 'Localiser', 'travel', 'Dire où se trouve quelque chose (在)'),
    comm(A2, 'Dire ce qui est fait', 'daily_life', 'Employer 了 comme aspect accompli'),
    comm(A2, 'Expérience', 'travel', 'Parler d\'une expérience avec 过'),
    comm(A2, 'Capacité et permission', 'daily_life', 'Employer 会, 能, 可以'),
    comm(A2, 'Comparer', 'daily_life', 'Comparer avec 比'),
    comm(A2, 'Préciser un détail', 'daily_life', 'Employer 是…的'),
    comm(A2, 'Se déplacer', 'travel', 'Employer 去 et 来'),
    comm(B1, 'Raconter', 'daily_life', 'Enchaîner des événements avec 然后'),
    comm(B1, 'Manière', 'daily_life', 'Employer le complément en 得'),
    comm(B1, 'Mettre en avant', 'daily_life', 'Employer 把 et 被'),
    comm(B1, 'Donner son avis', 'emotions', 'Employer 觉得 et 因为…所以'),
  ],

  // ── Japonais : hiragana d'abord ──────────────────────────────────────────
  ja: [
    read(A1, 'Hiragana I : あ か', 'あ い う え お か き く け こ', 'Lire les rangées あ et か'),
    read(A1, 'Hiragana II : さ た', 'さ し す せ そ た ち つ て と', 'Lire les rangées さ et た'),
    read(A1, 'Hiragana III : な は', 'な に ぬ ね の は ひ ふ へ ほ', 'Lire les rangées な et は'),
    read(A1, 'Hiragana IV : ま や', 'ま み む め も や ゆ よ', 'Lire les rangées ま et や'),
    read(A1, 'Hiragana V : ら わ ん', 'ら り る れ ろ わ を ん', 'Lire les dernières rangées'),
    comm(A1, 'Se présenter', 'greetings', 'Se présenter avec は et です'),
    comm(A1, 'Désigner', 'daily_life', 'Employer これ, それ, あれ'),
    comm(A1, 'Acheter', 'numbers', 'Demander un prix et compter'),
    comm(A1, 'Ma routine', 'daily_life', 'Parler de ses actions avec ます et les particules'),
    comm(A1, 'Où est… ?', 'travel', 'Dire où se trouvent les choses (あります, います)'),
    comm(A1, 'Goûts', 'food', 'Dire ce qu\'on aime avec が好きです'),
    comm(A2, 'Raconter le passé', 'daily_life', 'Raconter avec ました'),
    comm(A2, 'Demander, autoriser', 'daily_life', 'Employer la forme en て'),
    comm(A2, 'Expliquer', 'daily_life', 'Employer la forme neutre ; distinguer は et が'),
    comm(A2, 'Expériences', 'travel', 'Employer ことがある'),
    comm(A2, 'Justifier', 'emotions', 'Employer から et ので'),
    comm(A2, 'Intentions', 'daily_life', 'Employer つもり'),
    comm(B1, 'Hypothèses', 'emotions', 'Employer ば, たら, と, なら'),
    comm(B1, 'Rapporter, opiner', 'emotions', 'Employer と言いました et と思います'),
    comm(B1, 'Donner et recevoir', 'daily_life', 'Employer あげる, もらう, くれる'),
    comm(B1, 'Politesse', 'daily_life', 'Découvrir le keigo'),
  ],

  // ── Coréen : hangeul d'abord ─────────────────────────────────────────────
  ko: [
    read(A1, 'Hangeul I : voyelles', 'ㅏ ㅓ ㅗ ㅜ ㅡ ㅣ ㅇ ㄴ ㅁ', 'Lire les voyelles de base et ㅇ ㄴ ㅁ'),
    read(A1, 'Hangeul II : consonnes', 'ㄱ ㄷ ㅂ ㅅ ㅈ ㄹ ㅎ', 'Lire les consonnes simples'),
    read(A1, 'Hangeul III : voyelles en y', 'ㅑ ㅕ ㅛ ㅠ ㅐ ㅔ', 'Lire ㅑ ㅕ ㅛ ㅠ ㅐ ㅔ'),
    read(A1, 'Hangeul IV : aspirées', 'ㅋ ㅌ ㅍ ㅊ', 'Lire ㅋ ㅌ ㅍ ㅊ et les opposer aux simples'),
    read(A1, 'Hangeul V : tendues', 'ㄲ ㄸ ㅃ ㅆ ㅉ', 'Lire ㄲ ㄸ ㅃ ㅆ ㅉ : la triple opposition'),
    read(A1, 'Hangeul VI : voyelles composées', 'ㅘ ㅝ ㅚ ㅟ ㅢ', 'Lire les voyelles composées'),
    comm(A1, 'Se présenter', 'greetings', 'Se présenter avec 입니다 et 은/는'),
    comm(A1, 'Désigner et localiser', 'numbers', 'Dire où se trouvent les choses ; nombres sino-coréens'),
    comm(A1, 'Actions du quotidien', 'daily_life', 'Parler de ses actions au style 해요체'),
    comm(A1, 'Heure, âge, objets', 'numbers', 'Employer les nombres natifs et les classificateurs'),
    comm(A1, 'Commander', 'food', 'Commander avec 주세요'),
    comm(A1, 'Décrire, goûts', 'emotions', 'Dire ce qu\'on aime'),
    comm(A2, 'Raconter', 'daily_life', 'Employer le passé -았/었-'),
    comm(A2, 'Projets', 'daily_life', 'Employer le futur -(으)ㄹ 거예요'),
    comm(A2, 'Demander, permettre', 'daily_life', 'Employer -아/어 주세요 et -(으)ㄹ 수 있다'),
    comm(A2, 'Expliquer, comparer', 'daily_life', 'Employer -아/어서 et -보다'),
    comm(A2, 'Honorifique', 'family', 'Employer -(으)시-'),
    comm(B1, 'Justifier, hypothèse', 'emotions', 'Employer -(으)니까 et -(으)면'),
    comm(B1, 'Proposer, décider', 'daily_life', 'Employer -(으)ㄹ까요? et -기로 하다'),
    comm(B1, 'Rapporter', 'daily_life', 'Employer le discours indirect'),
  ],

  // ── Vietnamien : tons d'abord ────────────────────────────────────────────
  vi: [
    read(A1, 'Tons I : ngang, huyền, sắc', 'ma mà má', 'Entendre et reproduire trois tons'),
    read(A1, 'Tons II : hỏi, ngã, nặng', 'mả mã mạ', 'Entendre et reproduire les trois tons restants'),
    read(A1, 'Voyelles', 'ă â ê ô ơ ư', 'Lire les voyelles absentes du français'),
    read(A1, 'Consonnes trompeuses', 'đ gi ch kh ng nh ph th tr', 'Lire les consonnes piégeuses'),
    comm(A1, 'Saluer', 'greetings', 'Saluer en adaptant le pronom (anh, chị, em)'),
    comm(A1, 'Se présenter', 'greetings', 'Se présenter : Tôi là…'),
    comm(A1, 'Compter, prix', 'numbers', 'Demander un prix avec les classificateurs'),
    comm(A1, 'Commander', 'food', 'Commander avec Cho tôi…'),
    comm(A1, 'Où est… ?', 'travel', 'Demander et comprendre où se trouve un lieu'),
    comm(A1, 'Heure et jours', 'daily_life', 'Dire l\'heure et le jour'),
    comm(A2, 'Situer dans le temps', 'daily_life', 'Employer đã, đang, sẽ'),
    comm(A2, 'Décrire, comparer', 'colors', 'Comparer avec hơn et nhất'),
    comm(A2, 'Santé', 'body', 'Décrire un symptôme'),
    comm(A2, 'Causes', 'emotions', 'Expliquer avec vì… nên…'),
    comm(A2, 'Se déplacer', 'travel', 'Prendre un transport et demander sa direction'),
    comm(B1, 'Opinion et concession', 'emotions', 'Employer mặc dù… nhưng…'),
    comm(B1, 'Raconter', 'daily_life', 'Raconter un souvenir ou un projet'),
    comm(B1, 'Imprévus', 'daily_life', 'Négocier ou réclamer'),
  ],
};

// ─── Construction ────────────────────────────────────────────────────────────

/** Catégories sans vocabulaire statique : l'étape « mots » n'a pas de contenu. */
function hasStaticVocab(code: string): boolean {
  return getAvailableCategories(code).length > 0;
}

function buildUnit(code: string, raw: Raw, index: number, vocabAvailable: boolean): PathUnit {
  const id = `${code}-${index + 1}`;
  if (raw.r) {
    return {
      id, level: raw.l, title: raw.t, goal: raw.g, reading: true,
      steps: [
        { kind: 'read', letters: raw.r },
        { kind: 'readquiz', letters: raw.r },
      ],
    };
  }
  const steps: PathStep[] = [];
  if (vocabAvailable) steps.push({ kind: 'vocab', categoryId: raw.c });
  steps.push({ kind: 'speak', categoryId: raw.c, task: raw.g });
  steps.push({ kind: 'quiz', categoryId: raw.c });
  return { id, level: raw.l, title: raw.t, goal: raw.g, reading: false, steps };
}

const cache = new Map<string, PathUnit[]>();

export function getPath(code: string): PathUnit[] {
  const hit = cache.get(code);
  if (hit) return hit;
  const vocabAvailable = hasStaticVocab(code);

  // Unités à contenu intégré (jouables sans IA), puis le reste du parcours
  // encore appuyé sur les écrans existants.
  const integrated: PathUnit[] = getLessons(code).map(l => ({
    id: l.id, level: l.level, title: l.title, goal: l.goal, reading: l.reading,
    steps: l.parts.map((p, i) => ({
      kind: 'lesson' as const, lessonId: l.id, part: i, partTitle: p.title,
    })),
  }));
  // Les niveaux déjà couverts par des leçons intégrées ne repassent pas par l'IA.
  const covered = new Set(integrated.map(u => u.level));
  const raws = (RAW[code] ?? []).filter(r => !covered.has(r.l));
  const rest = raws.map((r, i) => buildUnit(code, r, integrated.length + i, vocabAvailable));
  const units = [...integrated, ...rest];
  cache.set(code, units);
  return units;
}

export function stepLabel(step: PathStep, language: LanguageConfig): string {
  const cat = language.categories.find(c => c.id === step.categoryId);
  switch (step.kind) {
    case 'read':     return `Découvrir ${step.letters?.length ?? 0} signes`;
    case 'readquiz': return 'Test de lecture';
    case 'vocab':    return `Mots : ${cat?.label ?? 'thème'}`;
    case 'speak':    return 'Dialogue guidé';
    case 'quiz':     return `Quiz : ${cat?.label ?? 'thème'}`;
    case 'lesson':   return step.partTitle ?? 'Leçon';
  }
}

export const STEP_ICON: Record<StepKind, string> = {
  read: 'eye',
  readquiz: 'checkmark-done',
  vocab: 'book',
  speak: 'chatbubbles',
  quiz: 'help-circle',
  lesson: 'school',
};
