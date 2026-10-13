# Gameplay : boucle de jeu

Principes (brainstorm du 14 oct. 2026) : récompenser la maîtrise et la révision, pas le simple clic ;
récompenses cosmétiques seulement ; aucune vibration ni secousse d'erreur ; pas de backend.

| Mécanique | Code | Stockage (AsyncStorage) |
|-----------|------|-------------------------|
| Boss de fin d'unité (10 questions, 70 % pour vaincre, +30 XP à la 1re victoire, rejouable, sans perte de série) | `lib/boss.ts`, `QuizScreen` (param `boss`), `PathScreen` | `@maa_path_*` (champ `boss`) |
| Mots ratés, réinjectés dans le boss ; un mot réussi face au boss perd une erreur | `lib/missedWords.ts` | `@maa_missed_<profil>_<langue>` |
| Quêtes du jour (réviser des cartes, réussir un quiz, finir une partie de leçon ou retrouver des mots ratés) | `lib/quests.ts`, `components/QuestsCard.tsx` | `@maa_quests_<profil>_<langue>` |
| Coffre du jour : 90 % carte-mot (commune 70, rare 25, épique 5, purement décoratif), 10 % gel de série (max 2) ; probabilités affichées à l'élève | `lib/quests.ts` | `@maa_inventory_<profil>` |
| Gel de série : rattrape exactement un jour manqué | `useProfiles.updateStreak` | idem inventaire |
| Collection de cartes | `components/CollectionCard.tsx` (onglet Stats du Profil) | idem inventaire |

## Pas encore fait
- Série validée par une vraie révision (et non une simple connexion).
- Paliers de voyelles de l'arabe (voyelles complètes, puis partielles, puis aucune).
- Défi fantôme local, mesure de rétention à J+7.
