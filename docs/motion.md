# Animations motion design réutilisables

Dossier : `src/components/motion/` (Reanimated 3). Chaque animation est un **gabarit piloté par des variables** :
le contenu (titre de leçon, mot, image…) vient des données, jamais du composant. Toutes respectent
« réduire les animations » du système (durées à 0) et acceptent `accent`, `surface`, `speed`.

| Animation | Utilisée par | Variables de contenu | Ce qu'elle fait |
|-----------|--------------|----------------------|-----------------|
| `LessonIntroMotion` | début de chaque partie de leçon | `title`, `goal`, `tag`, `img` / `emoji` (image de la leçon), `duration`, `onDone` | image dans un anneau qui pulse → titre → objectif ; barre de temps ; un toucher passe |
| `LetterRevealMotion` | carte « Nouvelle lettre » | `letter`, `name`, `sound`, `forms[]`, `img`, `keyword` | la lettre grandit, ses formes s'allument une à une, puis la photo du mot-clé |
| `WordRevealMotion` | exercice de répétition | `native`, `translit`, `meaning`, `img` / `emoji`, `rtl`, `picSize`, `nativeSize`, `replayKey` | photo (ressort) → mot → trait d'accent → translittération → sens |
| `WordFlipCard` | flashcards du vocabulaire, révision espacée | `native`, `translit`, `meaning`, `img` / `emoji`, `rtl`, `flipped`, `onFlip`, `hint`, `children` | carte qui se retourne en 3D ; `children` = boutons audio, enregistreur |
| `CelebrationMotion` | fin de partie | `title`, `message`, `score`, `passed`, `img` / `emoji`, `xp`, `confettiCount`, `confettiColors` | l'image de la leçon bondit, confettis, note qui monte, pastille d'XP ; échec : secousse douce, sans confettis |
| `AnswerMotion` | choix de réponse | `status` (`correct` / `wrong` / `null`), `amplitude` | rebond ou secousse autour de n'importe quel élément |
| `SpeakingWaves` | boutons d'écoute | `active`, `bars`, `height`, `color` | barres qui ondulent pendant la lecture audio |
| `AnimatedBar` | progression de leçon et du parcours | `value` (0-1), `height`, `trackColor` | la barre glisse vers la nouvelle valeur |
| `CountUp` | statistiques de l'accueil, score de fin de palier de lecture | `value`, `prefix`, `suffix`, `duration` | le nombre roule jusqu'à sa valeur |
| `ProgressRing` | cartes des paliers de lecture | `value` (0-1), `size`, `stroke`, `segments`, `trackColor`, `children` | anneau de petits traits qui s'allument ; contenu au centre |
| `FloatingXP` | bonne réponse en leçon | `label`, `trigger` (compteur), `rise`, `color`, `fontSize` | « ✓ », « ✨ ×2 », « 🔥 ×3 » : le texte monte et s'efface à chaque `trigger` |
| `BubbleIn` | bulles des conversations guidées | `from` (`left`/`right`), `delay` | la bulle glisse de son côté en grossissant |
| `PulseHint` | bouton « Continuer » de l'accueil, prochain palier de lecture | `active`, `radius`, `color` | halo qui pulse autour d'un élément |
| `PopIn` | coche d'un palier réussi | `triggerKey`, `peak` | petit rebond quand la clé change |
| `SkeletonLines` | génération du quiz et des cours par l'IA | `lines`, `label` | lignes grises qui respirent à la place d'un spinner |
| `FlameFlicker` | flamme de la série (accueil) | `intensity` (0-1, grandit avec la série) | la flamme vacille, plus vivement quand la série est longue |

Toutes acceptent aussi `accent`, `surface`, `speed` (`MotionTheme`). `IntroOverlay` (`src/components/IntroOverlay.tsx`) joue l'intro au lancement : voir `docs/intro/README.md`.

L'image d'une leçon vient de `getLessonCover(code, lessonId)` (`content/lexicon.ts`) : la photo du mot-clé de sa
première lettre, sinon la première photo d'un mot de l'unité, sinon un emoji.

## Ajouter une animation
1. Un fichier dans `motion/`, avec des props typées (contenu + `MotionTheme`).
2. Les durées passent par `useMotionTiming(speed)` — jamais de durée en dur hors de ce hook.
3. L'exporter dans `motion/index.ts` et la lister ici.

## Limites
- Écrites et compilées, **jamais vues tourner** sur appareil : à régler (durées, ressorts) en réel.
- Le mot arabe est animé d'un bloc (pas lettre à lettre) pour ne pas casser les liaisons.

## Transitions du quotidien (lot 2)
- Apparition décalée (35 ms par ligne, plafonnée) : unités du Parcours, mots du Vocabulaire, dialogues, carte des quêtes.
- Profil : fondu de 180 ms au changement d'onglet.
- Barre d'onglets : légère pulsation de l'icône active et haptique légère à chaque appui.

## Mode sombre et grand titre (lot 3)
- `theme/index.js` choisit la palette claire ou sombre selon le réglage du système, lu au lancement : un changement de thème en cours d'utilisation s'applique à la prochaine ouverture.
- Grand titre qui se replie en titre compact au défilement : écran Parcours.
