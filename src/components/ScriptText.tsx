import React from 'react';
import { Text, type StyleProp, type TextStyle } from 'react-native';
import { colors } from '../theme';

// ─── Texte explicatif avec écritures étrangères agrandies ────────────────────
// Dans une explication en français, les signes arabes (fatḥa ـَ, ḍamma ـُ…), les
// lettres et les mots d'une autre écriture sont minuscules à la taille du texte.
// On les rend plus grands et plus contrastés, sans toucher au reste.

const ARABIC = '\\u0600-\\u06FF\\u0750-\\u077F\\uFB50-\\uFDFF\\uFE70-\\uFEFF';
const OTHER = '\\u0400-\\u04FF\\u3040-\\u30FF\\u3400-\\u9FFF\\uAC00-\\uD7AF\\u1100-\\u11FF';
const RUN = new RegExp(`([${ARABIC}${OTHER}]+(?:[ ]+[${ARABIC}${OTHER}]+)*)`, 'g');
const IS_ARABIC = new RegExp(`[${ARABIC}]`);

interface Props {
  children: string;
  style?: StyleProp<TextStyle>;
  /** Taille du texte courant (par défaut 16). */
  size?: number;
}

export function ScriptText({ children, style, size = 16 }: Props) {
  const parts = children.split(RUN);
  return (
    <Text style={[{ fontSize: size, lineHeight: size * 1.9, color: colors.text }, style]}>
      {parts.map((p, i) => {
        if (i % 2 === 0) return p;
        const arabic = IS_ARABIC.test(p);
        return (
          <Text key={i} style={{ fontSize: size * (arabic ? 1.75 : 1.35), fontWeight: '700', color: colors.arabicText }}>
            {p}
          </Text>
        );
      })}
    </Text>
  );
}
