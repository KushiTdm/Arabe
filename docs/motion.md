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

L'image d'une leçon vient de `getLessonCover(code, lessonId)` (`content/lexicon.ts`) : la photo du mot-clé de sa
première lettre, sinon la première photo d'un mot de l'unité, sinon un emoji.

## Ajouter une animation
1. Un fichier dans `motion/`, avec des props typées (contenu + `MotionTheme`).
2. Les durées passent par `useMotionTiming(speed)` — jamais de durée en dur hors de ce hook.
3. L'exporter dans `motion/index.ts` et la lister ici.

## Limites
- Écrites et compilées, **jamais vues tourner** sur appareil : à régler (durées, ressorts) en réel.
- Le mot arabe est animé d'un bloc (pas lettre à lettre) pour ne pas casser les liaisons.
