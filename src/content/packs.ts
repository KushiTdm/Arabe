import type { VocabPack, Word } from './types';
import { w } from './builders';
import { PACK_WORDS } from './packData';
import { PACK_WORDS2 } from './packData2';
import { PACK_WORDS3 } from './packData3';
import { PACK_WORDS4 } from './packData4';

// ─── Packs de vocabulaire thématiques ────────────────────────────────────────
// Lots de mots indépendants des leçons : couleurs, jours, vêtements, transports,
// nature et métiers. Les mots rejoignent le lexique (écran Vocab, quiz, révision).
// Les couleurs s'affichent en pastilles de couleur ; les autres mots reçoivent une
// photo par la table français → image quand elle existe, sinon rien (plus d'émoticônes).

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

const FRUITS: Concept[] = ['la datte', 'la pastèque', 'la poire', 'la cerise', 'la pêche', 'la mangue'].map(fr => ({ fr }));
const ANIMALS: Concept[] = ['la vache', 'le lapin', 'le canard', 'le singe', 'l\'ours', 'la tortue'].map(fr => ({ fr }));
const KITCHEN: Concept[] = ['le fromage', 'le gâteau', 'la soupe', 'la glace', 'le miel', 'les olives'].map(fr => ({ fr }));
const VEGETABLES: Concept[] = ['la carotte', 'le concombre', 'le poivron', 'l\'aubergine', 'l\'ail', 'la salade'].map(fr => ({ fr }));
const LEISURE: Concept[] = ['le ballon', 'la guitare', 'la piscine', 'la tente', 'l\'appareil photo', 'le feu de camp'].map(fr => ({ fr }));
const CITY: Concept[] = ['le pont', 'la fontaine', 'le château', 'la tour', 'le restaurant', 'la boulangerie'].map(fr => ({ fr }));

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
  { id: 'fruits', theme: 'fruits', label: 'Fruits', concepts: FRUITS },
  { id: 'animals2', theme: 'animals', label: 'Animaux', concepts: ANIMALS },
  { id: 'kitchen', theme: 'dishes', label: 'Plats et douceurs', concepts: KITCHEN },
  { id: 'vegetables', theme: 'vegetables', label: 'Légumes', concepts: VEGETABLES },
  { id: 'leisure', theme: 'leisure', label: 'Loisirs et plein air', concepts: LEISURE },
  { id: 'city', theme: 'city', label: 'Ville et monuments', concepts: CITY },
];

export const PACK_LABELS: Record<string, string> = Object.fromEntries(PACKS_META.map(p => [p.id, p.label]));

const ROMANIZED = new Set(['ar', 'ru', 'ko', 'ja', 'zh']);
const cache = new Map<string, VocabPack[]>();

export function getPacks(code: string): VocabPack[] {
  const hit = cache.get(code);
  if (hit) return hit;
  const base = PACK_WORDS[code];
  const data = base && PACK_WORDS2[code] ? [...base, ...PACK_WORDS2[code], ...(PACK_WORDS3[code] ?? []), ...(PACK_WORDS4[code] ?? [])] : base;
  if (!data) { cache.set(code, []); return []; }
  let i = 0;
  const packs = PACKS_META.map<VocabPack>(meta => ({
    id: `${code}-pack-${meta.id}`, theme: meta.theme,
    words: meta.concepts.map<Word>(c => {
      const [native, tr] = (data[i++] ?? '').split('|');
      const fr = c.fr.replace(' (couleur)', '');
      const word = w(ROMANIZED.has(code) ? `${native}|${tr ?? ''}|${fr}` : `${native}||${fr}`);
      if (c.color) { delete word.img; return { ...word, color: c.color }; }   // la couleur « orange » ne prend pas la photo du fruit
      return c.emoji && !word.img ? { ...word, emoji: c.emoji } : word;
    }).filter(x => x.ar),
  }));
  cache.set(code, packs);
  return packs;
}

export const hasPacks = (code: string): boolean => code in PACK_WORDS;
