// ─── Imagerie embarquée (mode hors ligne) ────────────────────────────────────
//
// Toutes les images sont des assets locaux (assets/images/*.jpg) inclus dans
// le binaire par Metro : l'app s'affiche entièrement sans réseau.
// Source d'origine : Unsplash, téléchargées et optimisées (jpg q60).

import type { ImageSourcePropType } from 'react-native';

// ─── Public maps ─────────────────────────────────────────────────────────────

/** Big hero image shown on the welcome / onboarding screen. */
export const HERO_IMAGE: ImageSourcePropType = require('../../assets/images/hero.jpg');

/** Background image per vocabulary category id. */
export const CATEGORY_IMAGES: Record<string, ImageSourcePropType> = {
  greetings:  require('../../assets/images/cat-greetings.jpg'),
  numbers:    require('../../assets/images/cat-numbers.jpg'),
  family:     require('../../assets/images/cat-family.jpg'),
  food:       require('../../assets/images/cat-food.jpg'),
  travel:     require('../../assets/images/cat-travel.jpg'),
  daily_life: require('../../assets/images/cat-daily-life.jpg'),
  colors:     require('../../assets/images/cat-colors.jpg'),
  animals:    require('../../assets/images/cat-animals.jpg'),
  body:       require('../../assets/images/cat-body.jpg'),
  emotions:   require('../../assets/images/cat-emotions.jpg'),
  religion:   require('../../assets/images/cat-religion.jpg'),
  work:       require('../../assets/images/cat-work.jpg'),
};

/** Scenic image per language code (onboarding, home header, profil). */
export const LANGUAGE_IMAGES: Record<string, ImageSourcePropType> = {
  ar: require('../../assets/images/lang-ar.jpg'),
  es: require('../../assets/images/lang-es.jpg'),
  zh: require('../../assets/images/lang-zh.jpg'),
  ja: require('../../assets/images/lang-ja.jpg'),
  de: require('../../assets/images/lang-de.jpg'),
  it: require('../../assets/images/lang-it.jpg'),
  pt: require('../../assets/images/lang-pt.jpg'),
  ru: require('../../assets/images/lang-ru.jpg'),
  ko: require('../../assets/images/lang-ko.jpg'),
  vi: require('../../assets/images/lang-vi.jpg'),
  en: require('../../assets/images/lang-en.jpg'),
};

/** Small thumbnail per language code (mêmes assets, affichés en petit). */
export const LANGUAGE_THUMBS: Record<string, ImageSourcePropType> = LANGUAGE_IMAGES;

/** Thumbnail image for each home lesson card. */
export const LESSON_IMAGES: Record<string, ImageSourcePropType> = {
  conversation: require('../../assets/images/lesson-conversation.jpg'),
  writing:      require('../../assets/images/lesson-writing.jpg'),
  vocabulary:   require('../../assets/images/lesson-vocabulary.jpg'),
  cours:        require('../../assets/images/lesson-cours.jpg'),
  alphabet:     require('../../assets/images/lesson-alphabet.jpg'),
  quiz:         require('../../assets/images/lesson-quiz.jpg'),
  review:       require('../../assets/images/lesson-review.jpg'),
};
