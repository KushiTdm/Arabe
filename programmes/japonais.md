# Programme de japonais pour francophones

> **Rôle** : programme de référence pour le japonais (`ja`). Complète [methodologie.md](../methodologie.md) § 3.7.
> **Public** : adultes francophones, autonomes sur mobile. **Norme** : japonais standard (Tōkyō), `ja-JP`.
> **Recherche** : [docs/recherche-japonais/](../docs/recherche-japonais/) — Gemini, Grok, Perplexity (vérification avec sources). **Révision** : 12 octobre 2026.

---

## 1. Fondements

### 1.1 Références (vérifiées par Perplexity)

| Référence | Statut |
|-----------|--------|
| Takahashi, N., thèse *Aspects et problèmes de l'enseignement du japonais langue étrangère à des non-spécialistes*, Université Paris 8, 2009 (dir. P. Martinez) | **Confirmé** |
| Higashi, T. et Oguma, K., *Parlons japonais*, Presses universitaires de Grenoble (1re éd. Higashi, 1989 ; *Parlons japonais A1-A2.1*, déc. 2022) | **Confirmé** |
| Ogawa, J. et Enokida, F., *Kitsune. Grand manuel de japonais*, Armand Colin (1re éd. 2022 ; 2e éd. 2024) | **Confirmé** |
| Shimamori, R., *Grammaire japonaise systématique*, 2 vol., Librairie Adrien Maisonneuve (vol. I 1994, vol. II 2001) | **Confirmé** — éditeur corrigé (Gemini : « Maisonneuve & Larose ») |
| Assimil, *Le japonais* (Garnier & **Mori**) ; *Guide de conversation* (Garnier & Takahashi) | **Corrigé** : Grok attribuait *Le japonais* à Takahashi |
| **Irodori** (Fondation du Japon) | **Confirmé en français**, téléchargeable gratuitement (ambassade du Japon) |
| **Marugoto** | **Confirmé**, avec nuance : cours Starter A1 à Pre-Intermediate sur JF Minato, interface en français ; pas nécessairement le manuel papier traduit |

**Références inexistantes ou non retrouvées, écartées** (Gemini seul) : Patrick Le Nestour, Kuwae Kunio (*Manuel de japonais*, L'Harmattan 1989), Gérard Siary (*Guide des kanjis de tous les jours*), Daniel Struve. Perplexity : « confusion d'auteurs pour Assimil » et références « vraisemblablement inventées ».
Non vérifié : Julien Fontanier, *Cours de japonais !* (Hachette 2024), cité par Grok seul.
Kadota (shadowing) : voir [anglais.md](anglais.md) § 1.1 ; Gemini donnait « 2007, 2014 », la référence confirmée est **2019** (Routledge).

### 1.2 Décisions

| # | Décision | Justification |
|---|----------|---------------|
| D1 | **Hiragana puis katakana en 4 semaines, avant tout le reste** | Consensus Gemini et Grok (2-4 semaines) |
| D2 | **Rōmaji supprimé dès la fin des kana** | Gemini et Grok : maintenu, il empêche la lecture (déjà noté dans `pedagogy.ts`) |
| D3 | **Forme polie (-masu / desu) seule en A1** ; niveau de politesse nommé à chaque phrase | Le choix est obligatoire ; le francophone ne le perçoit pas |
| D4 | **La particule est nommée et sa fonction expliquée** | La particule porte la fonction, l'ordre est libre |
| D5 | **Kanji : reconnaissance d'abord, furigana tant que nécessaire** ; production manuscrite limitée aux ~100 plus simples | Charge cognitive : trois écritures simultanées |
| D6 | **Longueur vocalique et gémination traitées dès le premier cours** | Phonème distinctif (*obasan* ≠ *obaasan*) |
| D7 | **は vs が expliqué par thème / sujet nouveau, à A2** | Premier obstacle durable (Gemini) |

### 1.3 Niveau de confiance

| Affirmation | Statut |
|-------------|--------|
| Particules, SOV, trois écritures, politesse, compteurs, longueur vocalique | **Consensus des deux IA** et sources contrastives |
| Kana en 2-4 semaines | **Pratique courante**, non sourcée |
| Kanji par niveau (N5 ≈ 100, N4 ≈ 300, N3 ≈ 650) | **Estimations traditionnelles**, non confirmées par la Fondation du Japon |
| Heures | **Aucun barème officiel** (Perplexity : « le JLPT évalue des compétences, il ne prescrit pas de durée »). Estimations : N5 150-300 h, N4 300-600 h, N3 450-900 h (Perplexity) ; Gemini 150-200 / 300-450 / 600-800 ; Grok 180-400 / 360-800 / 660-1 200+. **Écart de 2×** |
| Vocabulaire | N5 ≈ 800, N4 ≈ 1 500, N3 ≈ 3 750 (estimations JLPT concordantes entre IA) |
| Accent de hauteur | Décrit par les deux IA ; **variété de Tōkyō** retenue |

---

## 2. Obstacles du francophone

| Obstacle | Erreur type | Traitement |
|----------|-------------|------------|
| **Trois écritures** | Surcharge | Séquence stricte hiragana → katakana → kanji |
| **Kanji : on'yomi / kun'yomi** | Une seule lecture mémorisée | Apprendre en mots, pas en caractères isolés |
| **Particules** は が を に で | Omises, confondues | Une particule par unité, fonction nommée |
| **は / が** | Confondus | Thème connu vs sujet nouveau ; A2 |
| **SOV** | Verbe en 2e position | Le verbe est toujours **à la fin** |
| **Omission du sujet** | *Watashi wa…* à chaque phrase | Supprimer ce qui est évident par le contexte |
| **Politesse** | Un seul registre | Nommer *teineigo / keigo* ; B1 pour le keigo |
| **Compteurs** | Compter directement | Compteur avec chaque nom (本, 枚, 匹, 人) |
| **Voyelles longues, gémination** | Durée ignorée | Paires ci-dessous |
| **Accent de hauteur** | Accent d'intensité | Écoute de paires |
| **/r/** | /ʁ/ | Battement rapide de la pointe de la langue |

### Paires minimales

| Contraste | Paire | Sens |
|-----------|-------|------|
| voyelle longue | *おばさん* · *おばあさん* | tante · grand-mère |
| voyelle longue | *おじさん* · *おじいさん* | oncle · grand-père |
| voyelle longue | *ゆき* · *ゆうき* | neige · courage |
| voyelle longue | *ここ* · *こうこう* | ici · lycée |
| gémination | *きた* · *きった* (来た · 切った) | est venu · a coupé |
| accent de hauteur | *あめ* (雨 · 飴) | pluie · bonbon |
| accent de hauteur | *はし* (箸 · 橋) | baguettes · pont |

> Les paires d'accent sont données pour la **variété de Tōkyō** ; elles diffèrent à Kyōto et Ōsaka.

---

## 3. Progression

### 3.1 Écriture (semaines 1-4, ~20 séances, puis continu)

| Unité | Contenu | Séances |
|-------|---------|---------|
| **JK1** | Hiragana : あ か さ た な (5 rangées) | 4 |
| **JK2** | Hiragana : は ま や ら わ ん | 4 |
| **JK3** | Voisement (゛ ゜), contractions (きゃ…), **っ** et **ー** | 4 |
| **JK4** | Katakana (46) + mots d'emprunt | 6 |
| **JK5** | Premiers kanji : nombres, jours, éléments naturels | 4 |
| **JK6+** | Kanji par thème, **lus en mots**, avec furigana | continu |

**Critères de passage** : ≥ 90 % de reconnaissance, lecture sans rōmaji de 20 mots. **Kanji cumulés** : ~100 (A1), ~300 (A2), ~650 (B1), estimations.

### 3.2 Communication

#### A1 (`beginner`) — ~800 mots (N5)

| Unité | Fonction | Grammaire |
|-------|----------|-----------|
| **JA1** | Se présenter | N1 は N2 です, particule の |
| **JA2** | Désigner | これ / それ / あれ, この / その / あの |
| **JA3** | Acheter | いくらですか, nombres, compteurs |
| **JA4** | Routine | forme **-ます**, particules に・で・を |
| **JA5** | Localiser | あります / います, ここ・そこ |
| **JA6** | Goûts | が好きです, adjectifs en い / な |

#### A2 (`intermediate`) — ~1 500 mots (N4)

| Unité | Fonction | Grammaire |
|-------|----------|-----------|
| **JA7** | Raconter le passé | **-ました**, passé des adjectifs |
| **JA8** | Demander, autoriser | **forme en て** : ください, てもいい, ている |
| **JA9** | Expliquer | forme neutre ; **は vs が** |
| **JA10** | Expériences | ことがある, forme en た |
| **JA11** | Justifier | から, ので |
| **JA12** | Intentions | つもり, forme volitive |

#### B1 (`advanced`) — ~3 750 mots (N3)

| Unité | Fonction | Grammaire |
|-------|----------|-----------|
| **JA13** | Hypothèses, conseils | ば, たら, と, なら |
| **JA14** | Rapporter, opinion | と言いました, と思います |
| **JA15** | Donner et recevoir | あげる / もらう / くれる |
| **JA16** | Passif, causatif | formes に |
| **JA17** | Registres | introduction au **keigo** (尊敬語 / 謙譲語) |

---

## 4. Volumes

Estimations **non officielles**, cumulées : N5 **150-400 h**, N4 **300-800 h**, N3 **450-1 200 h**. Le japonais est la langue de l'application où l'**écart avec le temps réel** est le plus grand pour un francophone (écriture + syntaxe + politesse). À 85 h/an, l'application mène à la fin des kana et au début de N5 en un an.

---

## 5. Mise en œuvre

| Niveau | Consigne IA (`LANGUAGE_PROGRESSION.ja`) |
|--------|------------------------------------------|
| `beginner` | Kana avec rōmaji en appui ; **-masu seulement** ; particule nommée et sa fonction ; compteur donné ; longueur vocalique signalée |
| `intermediate` | Kanji avec furigana ; plus de rōmaji ; は vs が ; niveau de politesse précisé |
| `advanced` | Furigana sur les mots rares ; causatif, passif, conditionnels ; keigo |

**Données** : vocabulaire `ja` existe (~100 mots) ; l'alphabet `ja` à **vérifier** (kana complets, voisement, contractions) ; paires de durée avec audio ; fiche compteurs.

## 6. Limites

- La synthèse `ja-JP` gère-t-elle l'**accent de hauteur** et la durée des morae ? À tester sur appareil.
- L'évaluation par IA de l'accent de hauteur est **peu fiable** : indicatif seulement.
- Contenu à faire relire par un locuteur natif.
- **Aucune étude** spécifiquement francophone sur le japonais n'a été confirmée au-delà de la thèse de Takahashi (non-spécialistes).

## 7. Références

Voir § 1.1. Certifications : **JLPT** (N5 à N1, Fondation du Japon / JEES) ; référentiel **JF Standard** (Marugoto, Irodori). Cadre général : [methodologie.md](../methodologie.md).
