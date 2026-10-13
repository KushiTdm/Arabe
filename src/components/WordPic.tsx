import React from 'react';
import { Image, View } from 'react-native';
import { VOCAB_IMAGES } from '../content/images';

/** Illustration d'un mot (clé de content/images.ts), ou sa pastille de couleur (plus d'émoticônes). */
export function WordPic({ img, color, size }: { img?: string; emoji?: string; color?: string; size: number }) {
  const src = img ? VOCAB_IMAGES[img] : undefined;
  if (src) return <Image source={src} style={{ width: size, height: size, borderRadius: size / 6 }} />;
  if (color) return <View style={{ width: size, height: size, borderRadius: size / 2, backgroundColor: color, borderWidth: 3, borderColor: 'rgba(0,0,0,0.08)' }} />;
  return null;
}
