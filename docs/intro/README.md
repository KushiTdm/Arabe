# Intro au lancement : deux vidéos de 4 s qui se suivent

1. **Vidéo 1 : l'app** (du globe à « Polyglotte »).
2. **Vidéo 2 : la signature NeuraWeb.**

## Vidéo 1 : Polyglotte

**Image de départ :** [intro-start.png](intro-start.png) (572 × 1024, 9:16) — globe en laiton sur une table en bois, mur vert émeraude, lumière de fenêtre dorée, bokeh doré. Les 40 % du haut sont volontairement vides.

**Image de fin :** [intro-end.png](intro-end.png) — la même scène (image de départ agrandie à 1144 × 2048, c'est le même cadrage au pixel près) avec les deux bulles dorées *ع / A* et le nom **Polyglotte** écrit dans la moitié haute. Le texte est ajouté par code (pas par IA), donc l'orthographe est exacte. Utiliser [intro-start-2x.png](intro-start-2x.png) comme image de départ pour que les deux aient la même taille.

## Réglages Flow
- Mode : *Frames to video*, **début = intro-start-2x.png**, **fin = intro-end.png**, format **9:16 vertical**, **4 s**, son coupé (l'app joue la vidéo en muet).

## Prompt (à coller dans Flow)

```
Smooth cinematic 4-second transition from the first frame to the last frame. The camera makes a very slow, steady push-in toward the vintage brass globe, which stays in the same place on the wooden table and turns slightly on its axis. The golden bokeh lights drift gently upward in the emerald background; around the 1.5 second mark, thin glowing gold lines draw two overlapping circular speech bubbles in the upper half of the frame, with the Arabic letter ع in the left bubble and the Latin letter A in the right bubble. Then the word "Polyglotte" fades in below them in elegant cream-colored serif letters with a soft golden glow, and holds until the end. The open notebook's pages move very slightly in a breath of air. Warm, calm, elegant mood, shallow depth of field, soft film grain, continuous motion with no cuts. Deep emerald green and gold palette. No other text, no logos, no people.
```

**Prompt négatif (si Flow le propose) :** `text, letters, watermark, logo, people, faces, fast motion, camera shake, cuts, distortion`

## Vidéo 2 : signature NeuraWeb

**Image de départ :** [neuraweb-start.png](neuraweb-start.png) (1080 × 1920, 9:16) — le logo fourni, recomposé en vertical sur fond blanc pur, sans rien d'autre.

**Réglages Flow :** *Frames to video*, début = `neuraweb-start.png`, 9:16, 4 s, muet. (Option : mettre aussi `neuraweb-start.png` comme image de fin pour que la vidéo se termine exactement sur le logo.)

**Prompt :**

```
Minimal, elegant logo animation on a pure white background, 4 seconds, smooth continuous motion, no cuts. The blue geometric star-shaped network symbol above the text gently comes alive: its connecting nodes light up one after another with a soft cyan glow and a delicate ripple of light travels along its lines, while the symbol makes a slow, graceful quarter turn and settles back into its original upright position. A subtle soft-blue shockwave ring expands from the symbol and fades. The wordmark "NeuraWeb" and the line "tech agency" stay perfectly legible and in place, with only a faint light sweep passing across them from left to right. The final second holds perfectly still on the complete logo exactly as in the first frame. Clean modern tech aesthetic, crisp edges, no shadows, no extra objects, no extra text, no background changes, no camera shake.
```

**Prompt négatif :** `distorted letters, changed font, misspelled text, extra text, colored background, shadows, camera shake, cuts, people`

## Brancher les deux vidéos dans l'app
1. Enregistrer les fichiers sous `assets/video/intro.mp4` et `assets/video/neuraweb.mp4` (H.264, de préférence ≤ 5 Mo chacun).
2. Dans `src/theme/introVideo.ts`, remplacer chaque `null` par le `require(...)` indiqué dans le fichier (`INTRO_VIDEO`, `AGENCY_VIDEO`).
3. `src/components/IntroOverlay.tsx` joue la vidéo 1, puis la vidéo 2, en muet et plein écran (`cover`), à chaque démarrage. Un toucher passe l'étape en cours ; chaque vidéo se ferme seule à sa fin (6,5 s au plus), puis fondu vers l'accueil.

Chaque vidéo a sa solution de repli faite en code, utilisée tant que son fichier n'est pas branché : une intro animée (logo, titre, slogan, 2,6 s) pour la vidéo 1, et `src/components/NeuraWebIntro.tsx` (symbole qui tourne, nom qui monte, « tech agency », 2,8 s ; éléments dans `assets/brand/neuraweb-*.png`) pour la vidéo 2. On peut mélanger : une vidéo branchée et une animation de repli. `<IntroOverlay agency={false} />` supprime la signature.
