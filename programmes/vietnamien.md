# Programme de vietnamien pour francophones

> **Rôle** : programme de référence pour le vietnamien (`vi`). Complète [methodologie.md](../methodologie.md) § 3.9.
> **Public** : adultes francophones, autonomes sur mobile. **Variété** : **Nord (Hanoï, 6 tons)**, `vi-VN`, avec reconnaissance du Sud.
> **Recherche** : [docs/recherche-vietnamien/](../docs/recherche-vietnamien/) — Gemini, Grok, Perplexity (vérification avec sources). **Révision** : 12 octobre 2026.

---

## 1. Fondements

### 1.1 Références (vérifiées par Perplexity)

Gemini et Grok se **contredisaient** sur plusieurs auteurs ; Perplexity tranche.

| Référence | Statut |
|-----------|--------|
| Nguyễn Tôn Nữ Hoàng Mai, *Parlons vietnamien. Langue et culture*, L'Harmattan, **1998** | **Confirmé** — « Lê Hoài Bắc 1998 » (Gemini) et « Lê Văn Phú 2001 » (Gemini) : **erreurs** |
| Đỗ Thế Dũng et Lê Thanh Thủy, *Le vietnamien*, Assimil « Sans peine », **2019** (92 leçons, ISBN 978-2-7005-0691-4) ; un *Vietnamien sans peine* existe en 1994 | **Confirmé** — auteurs « Nguyễn Trịnh Thị » et « Nguyen Trinh Sliwanow 2014 » : **non confirmés** |
| Đào, H.-L. et Eglinger, J.-P. (INALCO), *Initiation au vietnamien. Langue et culture. A1 vers B1*, Ellipses, juin 2023 (51 leçons, audio) | **Confirmé** (prénom d'Eglinger : **Jean-Philippe**) |
| Nguyễn Đình-Hoà, *Vietnamese*, Amsterdam/Philadelphie, John Benjamins, 1997 | **Confirmé** |
| Ferlus, M., « Les systèmes de tons dans les langues viet-muong », *Diachronica* 15(1), 1998, p. 1-27 | **Confirmé** — recherche en linguistique historique, **non didactique** |
| Michaud, A., « Final consonants and glottalization: new perspectives from Hanoi Vietnamese », *Phonetica* 61(2-3), 2004, p. 119-146 ; thèse *Prosodie de langues à tons (naxi et vietnamien), prosodie de l'anglais*, 2005 | **Confirmé** — Gemini : « Tones and Glottalization » : **titre inexact** |
| *Khung năng lực tiếng Việt dùng cho người nước ngoài*, **Thông tư 17/2015/TT-BGDĐT** (1er sept. 2015) | **Confirmé** : 3 degrés (sơ cấp, trung cấp, cao cấp), **6 niveaux alignés A1-C2** |

**Non confirmés, écartés** : Trần Thị Mai Lan, *Cours de vietnamien* (INALCO) ; *Manuel de vietnamien* (EFEO) ; Phan Văn Giưỡng, *Vietnamese for Beginners* (non vérifié) ; *Parler en vietnamien A1-A2* (Ellipses 2025, Grok seul). Emmanuel Poisson est historien, pas didacticien.
**Lacune** (Perplexity) : **aucune étude expérimentale identifiée sur la perception des six tons par des francophones.** Le caractère « distinctif et prioritaire » des tons repose sur la phonologie, non sur une étude d'apprentissage.

### 1.2 Décisions

| # | Décision | Justification |
|---|----------|---------------|
| D1 | **Tons dès la première séance**, avant le vocabulaire | Gemini et Grok : distinctifs ; des tons mal acquis forment des habitudes d'interlangue difficiles à corriger |
| D2 | **Nord (6 tons)** comme variété de production | Standard officiel et académique ; cohérent avec l'application (alphabet des 6 tons) |
| D3 | **Sud (5 tons) en reconnaissance**, audio doublé dès A2 | Les manuels récents proposent Nord/Sud ; Gemini : diaspora en France en majorité sudiste (**non sourcé**) |
| D4 | **Pronom relationnel expliqué à chaque nouveau pronom** | Pas de « je / tu » neutre : l'âge et le statut sont obligatoires |
| D5 | **Diacritiques toujours** (*Xin chào*, jamais *Xin chao*) | Un mot sans ton est un autre mot |
| D6 | **Valoriser le chữ Quốc ngữ et les emprunts au français** | Alphabet latin lisible immédiatement ; plusieurs mots courants viennent du français |
| D7 | **Pas de conjugaison, marqueurs đã / đang / sẽ en A2** | Allègement réel : à souligner |

### 1.3 Niveau de confiance

| Affirmation | Statut |
|-------------|--------|
| Six tons, voyelles *ơ ư â ă*, finales non relâchées, pronoms, classificateurs | **Consensus des deux IA** et description linguistique (Nguyễn Đình-Hoà) |
| Quốc ngữ = « aide majeure » | **Consensus** ; il ne résout ni la production orale ni les oppositions tonales |
| Heures | **Aucune norme officielle** (le référentiel 2015 définit des niveaux, non des heures). Gemini : A1 150-200 h, A2 350-450, B1 700-800 ; Grok : 100-150 / 250-350 / 500-700. **Écart de 1,5×** |
| Vocabulaire | Non chiffré par les sources. Repères de la méthodologie : 300 / 800 / 1 500 |

---

## 2. Obstacles du francophone

| Obstacle | Erreur type | Traitement |
|----------|-------------|------------|
| **Six tons** | Ton plat ou intonation d'expression française | Discrimination avant production ; paires |
| **Voyelles ơ ư â ă** | Arrondies ou raccourcies | Exemples audio ; ư = lèvres écartées |
| **Finales -p -t -k (-ch)** | Relâchées | Arrêt de l'air sans explosion |
| **Lettres trompeuses** | *d* lu /d/, *gi* lu /ʒi/, *x* lu /ks/ | Table de correspondance (ci-dessous) |
| **Pronoms relationnels** | « *Tôi* » partout | *tôi, em, anh, chị, bác, cô, chú…* selon âge et statut |
| **Classificateurs** | Omis | *cái, con, quyển, chiếc, quả* avec le nom |
| **Pas de conjugaison** | Chercher des terminaisons | Contexte + *đã / đang / sẽ* |

### Lettres trompeuses (Nord)

| Lettre | Son (Nord) | Écueil |
|--------|-----------|--------|
| **d** | /z/ | pas /d/ |
| **đ** | /ɗ/ | le /d/ français |
| **gi** | /z/ | pas /ʒi/ |
| **x** | /s/ | pas /ks/ |
| **s** | /s/ (Sud : /ʂ/) | — |
| **c / k / q** | /k/ | trois graphies, un son |

### Les six tons (Nord) et paires

| Ton | Signe | Exemple |
|-----|-------|---------|
| ngang | — | *ma* (fantôme) |
| huyền | ` | *mà* (mais) |
| sắc | ´ | *má* (mère, joue) |
| hỏi | ̉ | *mả* (tombe) |
| ngã | ˜ | *mã* (cheval, code) |
| nặng | ̣ | *mạ* (jeune plant de riz) |

| Paire | Sens |
|-------|------|
| *bàn · bán · bẩn · bận* | table · vendre · sale · occupé |
| *mua · mùa* | acheter · saison |
| *thư · thơ* | lettre · poème (ư / ơ) |

> Au **Sud**, *hỏi* et *ngã* **fusionnent** : 5 tons. Une paire hỏi / ngã n'y est pas distinctive.

### Emprunts au français (aide à la mémorisation, à valider)

*cà phê* (café) · *bơ* (beurre) · *ga* (gare) · *pho mát* (fromage) · *xà phòng* (savon) · *cà vạt* (cravate).

---

## 3. Progression

### 3.1 Tons et sons (semaines 1-2, ~12 séances)

| Unité | Contenu | Séances |
|-------|---------|---------|
| **VT1** | **Ngang, sắc, huyền** : trois premiers tons, contours | 3 |
| **VT2** | **Hỏi, ngã, nặng** : tons à contour complexe et glottalisation | 3 |
| **VT3** | Voyelles **ơ ư â ă**, diphtongues | 2 |
| **VT4** | **Consonnes** : d / đ / gi / x / s ; finales non relâchées | 2 |
| **VT5** | Syllabes → mots de 2 syllabes avec tons | 2 |

> L'application possède déjà l'alphabet des 6 tons ([languages.ts](../src/lib/languages.ts)) ; il manque les **paires minimales** et les **voyelles** ci-dessus.

### 3.2 Communication

#### A1 (`beginner`) — ~300 mots

| Unité | Fonction | Grammaire |
|-------|----------|-----------|
| **VI1** | Saluer en adaptant le pronom | *Chào anh / chị / em*, **pronoms relationnels** |
| **VI2** | Se présenter | *Tôi là… / Tôi là người Pháp*, ordre **SVO** |
| **VI3** | Compter, prix | nombres ; *bao nhiêu ?* ; **classificateurs** |
| **VI4** | Commander | *Cho tôi một…* |
| **VI5** | Localiser | *ở đâu ?*, *bên trái / bên phải* |
| **VI6** | Heure, jours | *mấy giờ ?* |

#### A2 (`intermediate`) — ~800 mots

| Unité | Fonction | Grammaire |
|-------|----------|-----------|
| **VI7** | Situer dans le temps | **đã / đang / sẽ**, *mới, vừa* |
| **VI8** | Décrire, comparer | *hơn, bằng, nhất* |
| **VI9** | Santé | symptômes, *bị* |
| **VI10** | Causes | *vì… nên…* |
| **VI11** | Se déplacer | transports, directions |
| **VI12** | Questions | *không ?, à ?, nhé* |

#### B1 (`advanced`) — ~1 500 mots

| Unité | Fonction | Grammaire |
|-------|----------|-----------|
| **VI13** | Opinion, concession | *mặc dù… nhưng…* |
| **VI14** | Raconter | souvenirs, projets |
| **VI15** | Registre | mots **Hán-Việt**, formel |
| **VI16** | Imprévus | négocier, réclamer |
| **VI17** | Variation | écoute **Nord / Sud** |

---

## 4. Volumes

Estimations **non officielles**, cumulées : A1 **100-200 h** ; A2 **250-450 h** ; B1 **500-800 h**. L'application mène à la fin des tons et au début de l'A1 en un an à 85 h. Le vietnamien est **sans écriture difficile et sans conjugaison** : la charge se concentre sur les **tons** et la **pragmatique des pronoms**.

---

## 5. Mise en œuvre

| Niveau | Consigne IA (`LANGUAGE_PROGRESSION.vi`, **déjà très proche**) |
|--------|----------------------------------------------------------------|
| `beginner` | **Tous les diacritiques**, ton nommé pour chaque syllabe nouvelle, paire minimale contrastive, pronom relationnel expliqué, classificateur |
| `intermediate` | Diacritiques toujours ; *đã / đang / sẽ* ; particules interrogatives |
| `advanced` | Particules modales, subordination, mots Hán-Việt, écoute Nord/Sud |

**Données** : vocabulaire `vi` existe (~100 mots) ; **ajouter le ton nommé** à chaque entrée, les paires du § 2, la table des lettres, les emprunts français.
**Évaluation de prononciation** : [pronunciation.ts](../src/lib/pronunciation.ts) cible déjà les tons, ơ ư â ă et les finales.

## 6. Limites

- **La synthèse `vi-VN` rend-elle correctement les six tons ?** À tester : c'est le point de défaillance probable.
- **L'évaluation par IA du ton est la moins fiable** de l'application ; à traiter comme un indicateur.
- Aucune étude sur la perception des tons par les francophones.
- Contenu à faire relire par un vietnamophone ; **dialecte du Sud** non couvert en production.

## 7. Références

Voir § 1.1. Certifications : **référentiel vietnamien** (6 niveaux, Thông tư 17/2015) et examens associés (VNU-ETP, à vérifier). Cadre général : [methodologie.md](../methodologie.md).
