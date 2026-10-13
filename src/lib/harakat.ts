// ─── Paliers de voyelles (arabe) ─────────────────────────────────────────────
// Plus un mot est maîtrisé, moins on l'aide : voyelles complètes, puis seulement
// celle de la première lettre (et la shadda), puis aucune comme dans un vrai
// texte. L'audio reste toujours disponible et la réponse montre le mot complet.

export type HarakatTier = 'full' | 'partial' | 'none';

const MARKS = /[ً-ْٰ]/;
const SHADDA = 'ّ';

/** Un mot est découpé en grappes : une lettre suivie de ses signes. */
function clusters(word: string): string[] {
  const out: string[] = [];
  for (const ch of word) {
    if (MARKS.test(ch) && out.length) out[out.length - 1] += ch;
    else out.push(ch);
  }
  return out;
}

export function applyHarakat(word: string, tier: HarakatTier): string {
  if (tier === 'full') return word;
  return clusters(word)
    .map((c, i) => {
      const [base, ...marks] = [...c];
      if (tier === 'partial' && i === 0) return c;
      return base + (tier === 'partial' && marks.includes(SHADDA) ? SHADDA : '');
    })
    .join('');
}

/** Palier selon la boîte de révision espacée : 0-1 complet, 2-3 partiel, 4 et + aucun. */
export function tierForBox(box: number): HarakatTier {
  return box >= 4 ? 'none' : box >= 2 ? 'partial' : 'full';
}

export const TIER_LABEL: Record<HarakatTier, string> = {
  full: 'Voyelles complètes',
  partial: 'Voyelles partielles',
  none: 'Sans voyelles',
};
