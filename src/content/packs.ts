import type { VocabPack, Word } from './types';
import { w } from './builders';
import { PACK_WORDS } from './packData';
import { PACK_WORDS2 } from './packData2';

// ─── Packs de vocabulaire thématiques ────────────────────────────────────────
// Lots de mots indépendants des leçons : couleurs, jours, vêtements, transports,
// nature et métiers. Les mots rejoignent le lexique (écran Vocab, quiz, révision).
// Les couleurs s'affichent en pastilles de couleur ; les autres mots reçoivent une
// photo par la table français → image quand elle existe, sinon un emoji.

interface Concept { fr: string; emoji?: string; color?: string }

const COLORS: Concept[] = [
  { fr: 'rouge', color: '#dc2626' }, { fr: 'bleu', color: '#2563eb' }, { fr: 'vert', color: '#16a34a' }, { fr: 'jaune', color: '#facc15' },
  { fr: 'noir', color: '#171717' }, { fr: 'blanc', color: '#f5f5f4' }, { fr: 'orange (couleur)', color: '#f97316' }, { fr: 'marron', color: '#78350f' },
];
const DAYS: Concept[] = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'].map(fr => ({ fr, emoji: '📅' }));
const CLOTHES: Concept[] = ['la chemise', 'le pantalon', 'les chaussures', 'la casquette', 'le manteau', 'les lunettes'].map(fr => ({ fr }));
const TRANSPORT: Concept[] = ['le bus', 'le train', 'l\'avion', 'le vélo', 'le taxi', 'le bateau', 'la voiture'].map(fr => ({ fr }));
const NATURE: Concept[] = ['la pluie', 'la neige', 'le soleil', 'la lune', 'la montagne', 'la mer'].map(fr => ({ fr }));
const JOBS: Concept[] = [
  { fr: 'le médecin' }, { fr: 'le professeur' }, { fr: 'l\'étudiant' },
  { fr: 'le cuisinier', emoji: '🧑‍🍳' }, { fr: 'le policier', emoji: '👮' }, { fr: 'le chauffeur', emoji: '🧑‍✈️' },
];

const HOME: Concept[] = ['le lit', 'le canapé', 'la cuisine', 'la tasse', 'l\'assiette', 'le verre'].map(fr => ({ fr }));
const TRAVEL: Concept[] = ['la gare', 'l\'hôtel', 'l\'aéroport', 'la plage', 'le parc', 'le supermarché'].map(fr => ({ fr }));
const OBJECTS: Concept[] = ['le téléphone', 'l\'ordinateur', 'le cahier', 'le sac à dos', 'le parapluie', 'la valise'].map(fr => ({ fr }));

const PACKS_META: { id: string; theme: string; label: string; concepts: Concept[] }[] = [
  { id: 'colors', theme: 'colors', label: 'Couleurs', concepts: COLORS },
  { id: 'days', theme: 'time', label: 'Jours de la semaine', concepts: DAYS },
  { id: 'clothes', theme: 'clothes', label: 'Vêtements', concepts: CLOTHES },
  { id: 'transport', theme: 'transport', label: 'Transports', concepts: TRANSPORT },
  { id: 'nature', theme: 'nature', label: 'Nature et météo', concepts: NATURE },
  { id: 'jobs', theme: 'jobs', label: 'Métiers', concepts: JOBS },
  { id: 'home', theme: 'home', label: 'La maison', concepts: HOME },
  { id: 'travel', theme: 'travel', label: 'Voyage et lieux', concepts: TRAVEL },
  { id: 'objects', theme: 'objects', label: 'Objets du quotidien', concepts: OBJECTS },
];

export const PACK_LABELS: Record<string, string> = Object.fromEntries(PACKS_META.map(p => [p.id, p.label]));

const ROMANIZED = new Set(['ar', 'ru', 'ko', 'ja', 'zh']);
const cache = new Map<string, VocabPack[]>();

export function getPacks(code: string): VocabPack[] {
  const hit = cache.get(code);
  if (hit) return hit;
  const base = PACK_WORDS[code];
  const data = base && PACK_WORDS2[code] ? [...base, ...PACK_WORDS2[code]] : base;
  if (!data) { cache.set(code, []); return []; }
  let i = 0;
  const packs = PACKS_META.map<VocabPack>(meta => ({
    id: `${code}-pack-${meta.id}`, theme: meta.theme,
    words: meta.concepts.map<Word>(c => {
      const [native, tr] = data[i++].split('|');
      const fr = c.fr.replace(' (couleur)', '');
      const word = w(ROMANIZED.has(code) ? `${native}|${tr ?? ''}|${fr}` : `${native}||${fr}`);
      if (c.color) { delete word.img; return { ...word, color: c.color }; }   // la couleur « orange » ne prend pas la photo du fruit
      return c.emoji && !word.img ? { ...word, emoji: c.emoji } : word;
    }),
  }));
  cache.set(code, packs);
  return packs;
}

export const hasPacks = (code: string): boolean => code in PACK_WORDS;
