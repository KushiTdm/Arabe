// ─── Retrait progressif du voyellage (programmes/arabe.md § 3.3 et § 7.4) ────
// Marques Unicode : fatḥa U+064E, ḍamma U+064F, kasra U+0650, sukūn U+0652,
// shadda U+0651, tanwīn U+064B-064D. Les voyelles longues (ا و ي) sont des
// lettres : elles restent toujours.

const SHORT = /[َُِْ]/g;
const ALL_MARKS = /[ً-ْٰ]/g;
const MARK = /[ً-ْٰ]/;

export type FadeMode = 'partial' | 'skeletal' | 'bare';

/** Découpe un mot en groupes « lettre + signes qui la suivent ». */
function clusters(word: string): string[] {
  const out: string[] = [];
  for (const ch of Array.from(word)) {
    if (MARK.test(ch) && out.length > 0) out[out.length - 1] += ch;
    else out.push(ch);
  }
  return out;
}

/**
 * partial  : voyelles brèves retirées sauf sur la dernière lettre ; shadda et
 *            tanwīn restent (le lecteur reconstitue le milieu du mot).
 * skeletal : seules shadda et tanwīn restent.
 * bare     : texte nu.
 */
export function fade(text: string, mode: FadeMode): string {
  if (mode === 'bare') return text.replace(ALL_MARKS, '');
  if (mode === 'skeletal') return text.replace(SHORT, '');
  return text.split(' ').map(word => {
    const parts = clusters(word);
    return parts.map((c, i) => (i === parts.length - 1 ? c : c.replace(SHORT, ''))).join('');
  }).join(' ');
}
