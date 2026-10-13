# Visuels de l'arabe — 36 photos réalistes (généré, découpé, intégré)

> **État : fait.** 6 planches générées (style photo réaliste, fond blanc cassé, lumière de fenêtre), découpées en carrés de 480 px dans `assets/images/vocab/` (36 fichiers, ≈ 1 Mo). `robe` et `street` ont été regénérées à l'unité (la 1re version montrait une chemise et une rue de Paris). Table mot → image : `src/content/imageKeys.ts` ; assets : `src/content/images.ts`. 
> **Complément (planches 7 à 10)** : mots-clés des 13 lettres qui n'en avaient pas (renard, poule, or, tête, fleurs, faucon, grenouille, ongles, corbeau, citron, étoile, croissant, rose), 5 images de réserve non branchées (lion, banane, pomme, lait, jus — dans `assets/images/vocab/`), et 5 scènes (poignée de main, lever et coucher du soleil, argent, boire). La 6e scène (« manger ») a été écartée : elle montrait un verre de vin. Les 28 lettres ont un mot-clé illustré (`LETTER_IMG` dans `imageKeys.ts`).
>
> **Encore utile** : une scène « manger » sans alcool, des scènes pour les directions et le tout-droit, un aéroport, et des schémas de prononciation de ع ح ق خ (à faire dessiner ou valider par un phonéticien, pas à générer).

Le texte ci-dessous est l'historique des prompts.

Une planche = **un prompt = 6 illustrations** (grille 3 × 2), à découper ensuite
en 6 fichiers carrés `assets/images/vocab/<clé>.png`. Les leçons affichent un
emoji tant qu'une illustration n'existe pas (champ `emoji` de `content/`).

Préfixe commun à chaque prompt :

> A sticker sheet of exactly 6 separate flat vector illustrations arranged in a
> clean 3 columns by 2 rows grid, each on its own plain white square cell with
> generous empty margins between cells, no text, no letters, no labels, no
> borders. Consistent friendly modern flat design style, soft warm colors (teal,
> sand, terracotta, olive), thick rounded shapes, subtle shadow, mobile-app
> vocabulary-card style.

| Planche | Fichier | Haut (gauche → droite) | Bas (gauche → droite) |
|---------|---------|------------------------|------------------------|
| 1 Boire et manger | `ar_sheet1_food` | `water` verre d'eau · `tea` verre de thé à la menthe sur soucoupe · `bread` pain rond | `fig` figue coupée · `fish` poisson · `coffee` tasse de café arabe et dallah |
| 2 Objets | `ar_sheet2_objects` | `door` porte · `book` livre · `pen` stylo | `key` clé · `table` table · `robe` thawb (vêtement long blanc) |
| 3 Famille | `ar_sheet3_family` | `father` père · `mother` mère · `brother` frère | `sister` sœur · `boy` garçon · `girl` fille |
| 4 Animaux | `ar_sheet4_animals` | `dog` chien · `camel` chameau · `elephant` éléphant | `horse` cheval · `bird` oiseau · `whale` baleine |
| 5 Lieux | `ar_sheet5_places` | `house` maison · `school` école · `market` marché (souk) | `hospital` hôpital · `mosque` mosquée · `street` rue |
| 6 Nature et corps | `ar_sheet6_nature` | `moon` lune · `sun` soleil · `tree` arbre | `eye` œil · `heart` cœur · `hand` main |

Pour chaque planche, ajouter à la fin du prompt : « Top row left to right: 1) … 2) … 3) …
Bottom row left to right: 4) … 5) … 6) … ».

## Découpe

```bash
# 3 colonnes × 2 lignes ; W et H = taille de la planche
for i in 0 1 2; do for j in 0 1; do
  magick ar_sheet1_food.png -crop $((W/3))x$((H/2))+$((i*W/3))+$((j*H/2)) +repage cell_${j}_${i}.png
done; done
```

Puis renommer chaque cellule avec la clé du tableau et ajouter la clé dans
`src/content/images.ts` (à créer) pour que `Word.img` pointe vers l'asset.

## Lexique illustré (planches 11 à 13)

16 photos ajoutées pour les mots concrets du lexique : œufs, sel, mouton, gazelle, épée, cheveux, pied, bouche, mer, horloge, bibliothèque, université, encrier, enseignant, étudiant, ville. Deux images ont été écartées : une voiture (logo de marque et plaque visibles) et un avion (livrée d'une compagnie lisible). **Encore sans photo** : voiture, avion/aéroport, poche, voisin, café (lieu). Pour savoir ce qui manque : `imageCoverage('ar')` dans `src/content/lexicon.ts` (état actuel : 87 mots illustrés sur 266).

## Planches 14 et 15 : faites (13 oct.)

Transports (bus, train, avion, vélo, taxi, barque) et fruits et légumes (tomate, raisin, fraise, orange, pomme de terre, oignon) ont été générées, découpées et reliées aux phrases ; des mots de nourriture (tomate…oignon) ont été ajoutés dans les unités « restaurant » de chaque langue. Le dossier `assets/images/vocab/` contient maintenant 87 photos. Le texte ci-dessous est l'historique des prompts.

## Planches 16 à 19 : faites (13 oct.)

Personnes (grand-père, grand-mère, médecin, femme, homme, amis), objets et lieux (magasin, sac, voiture sans marque, chaise, viande ; la pharmacie a été écartée : enseigne au texte flou), corps et nature (chat, oreille, nez, pluie, neige, montagne), vêtements (chemise, pantalon, chaussures, casquette, manteau, lunettes). 110 photos au total. **Liaison automatique** : `IMG_KEY_BY_FR` dans `src/content/imageKeys.ts` associe la traduction française d'un nom concret à sa photo, pour toutes les langues — un mot qui s'appelle « chat » en français reçoit la photo du chat dans toutes les leçons, sans lien manuel. Pour illustrer un nouveau mot : ajouter la photo, l'entrée `images.ts` et l'entrée du tableau.

## Prochaines planches (prêtes à lancer)

À lancer dès que l'outil image-gen accepte de nouveau (compteur de session 15/15 le 13 oct.). Mêmes règles de style : photo réaliste, fond blanc cassé, lumière douce, sujet centré à 70 %, **aucun logo, texte, plaque ni livrée lisible**.

| Planche | Fichier | Haut (gauche → droite) | Bas (gauche → droite) | Clés (`assets/images/vocab/`) |
|---------|---------|------------------------|------------------------|------------------------------|
| 14 Transports | `ar_sheet14_transport` | bus urbain neutre · train de voyageurs à quai · avion blanc en vol, sans marquage | vélo de ville contre un mur · taxi jaune générique, enseigne vierge · barque de pêche en bois | `bus`, `train`, `airplane`, `bicycle`, `taxi`, `boat` |
| 15 Fruits et légumes | `ar_sheet15_produce` | tomates mûres sur la grappe · grappe de raisin sombre · fraises | orange entière et demi-orange · pommes de terre · deux oignons rouges | `tomato`, `grapes`, `strawberry`, `orange`, `potato`, `onion` |

Mots à relier ensuite (`img:clé` dans les phrases, ou `IMG_KEY_BY_AR` pour l'arabe) : es-13 el tren / el avión ; en-13 bus, train ; ru-12 автобус, поезде ; zh-12 出租车, 自行车 ; vi-11 xe buýt, taxi, tàu hỏa ; ja ふね ; ko 토마토, 포도, 딸기 ; ja みかん.


## Planches 20 et 21 : faites (13 oct.)

Métiers et objets (cuisinier, policier, chauffeur, billet, riz, lampe) et divers (ambulance, vallée, chenille, nuit, fête, dormir) : 122 photos au total, reliées par `IMG_KEY_BY_FR` (cuisinier, policier, chauffeur, billet, riz, lumière, ambulance, vallée, nuit, fête, dormir) et `IMG_KEY_BY_AR` (دُود). La pharmacie reste sans photo (enseigne avec du texte).

## Planches 22 à 24 : faites (14 oct.)

Maison (lit, canapé, cuisine, tasse, assiette, verre), lieux (gare, réception d'hôtel, aéroport, plage, parc, supermarché) et objets (téléphone, ordinateur, cahier, sac à dos, parapluie, valise) : 140 photos au total. Packs 7 à 9 (`packData2.ts`) et conversations C13 à C16 (gare, hôtel, téléphone, aéroport) dans les 11 langues.
