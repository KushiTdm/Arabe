import React from 'react';
import { Image, Text } from 'react-native';
import { VOCAB_IMAGES } from '../content/images';

/** Illustration d'un mot (clé de content/images.ts), ou son emoji de repli. */
export function WordPic({ img, emoji, size }: { img?: string; emoji?: string; size: number }) {
  const src = img ? VOCAB_IMAGES[img] : undefined;
  if (src) return <Image source={src} style={{ width: size, height: size, borderRadius: size / 6 }} />;
  if (emoji) return <Text style={{ fontSize: size * 0.55, width: size, textAlign: 'center' }}>{emoji}</Text>;
  return null;
}
