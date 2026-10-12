# Programme de russe pour francophones

> **Rôle** : programme de référence pour le russe (`ru`). Complète [methodologie.md](../methodologie.md) § 3.4.
> **Public** : adultes francophones, autonomes sur mobile. **Norme** : russe standard (`ru-RU`).
> **Recherche** : [docs/recherche-russe/](../docs/recherche-russe/) — Gemini, Grok, Perplexity (vérification avec sources). **Révision** : 12 octobre 2026.

---

## 1. Fondements

### 1.1 Références (vérifiées par Perplexity)

| Référence | Statut |
|-----------|--------|
| Garde, P., *Grammaire russe I. Phonologie et morphologie*, Paris, Institut d'études slaves, 1980 (2e éd. 1998, 3e éd. 2016) | **Confirmé**. Gemini la donnait « *Grammaire du russe*, PUF » : **éditeur inexact** |
| Roudet, R., *Grammaire russe II. Syntaxe*, Institut d'études slaves | **Confirmé** : le tome II n'est **pas** de Garde |
| Garde, P., *L'Accent*, Paris, PUF (coll. SUP « Le Linguiste »), 1968 (réed. Lambert-Lucas 2013) | **Confirmé** |
| Khavronina, S., *Le russe à votre rythme*, Institut d'études slaves (4e éd. 1989) | **Confirmé**. Gemini l'attribuait à « M. Sartori » : **erreur** |
| Chernyshov, S. et Chernyshova, A., *Poekhali !*, Saint-Pétersbourg, Zlatoust (par niveaux : 1.1 = A1, 1.2 = A2) | **Confirmé** |
| Camus, R. (INALCO) : *Grammaire russe théorique*, *Pratique écrite* | **Confirmé** comme auteur de supports utilisés à l'INALCO. Gemini en faisait un titre de manuel : **inexact** |
| Krylosova, S. (INALCO), co-aut. *Journal'russe. Vocabulaire et exercices*, Bréal, 2017 ; **Association française des russisants** et *La Revue russe* | **Confirmés** |
| Pienemann (1998), *Processability Theory* | **Confirmé** (théorie générale, voir [allemand.md](allemand.md)) |

**Écartés** : thèse « Ganzha, 2023 » et manuel « Zeltchenko, *Je parle russe !* » (Grok seul, non vérifiés).
**Lacune** (Perplexity) : **aucune étude empirique largement citée sur les erreurs des francophones en russe** pour cas, aspect et accent. Les difficultés sont **consensuelles dans les manuels et les analyses contrastives**, pas démontrées par un corpus de référence.

### 1.2 Décisions

| # | Décision | Justification |
|---|----------|---------------|
| D1 | **Cyrillique en 2 à 3 semaines, avant tout autre contenu** | Gemini et Grok : assimilation rapide ; le piège est visuel (faux amis graphiques) |
| D2 | **Accent tonique marqué sur chaque mot, toujours** (*молоко́*) | L'accent est mobile, distinctif, **non écrit** ; il conditionne la réduction vocalique |
| D3 | **Translittération décroissante** : A1 oui, A2 sur les mots difficiles, B1 non | Maintenue, elle fossilise une lecture erronée (déjà en place dans `pedagogy.ts`) |
| D4 | **Les cas un par un, par fonction** (sujet → lieu → objet → possession), non en paradigme N-G-D-A-I-P | Gemini ; Pienemann : l'ordre d'acquisition ne se saute pas |
| D5 | **Chaque verbe donné avec sa paire d'aspect** (*читать / прочитать*) | L'aspect n'a pas d'équivalent français ; le confondre avec l'imparfait/passé composé est l'erreur type |

### 1.3 Niveau de confiance

| Affirmation | Statut |
|-------------|--------|
| Six cas, aspect, accent mobile = difficultés majeures | **Consensus des manuels**, non démontré par étude de corpus de francophones |
| « Cyrillique acquis en 1-2 semaines » (Grok) / « ~10 h » (méthodologie générale) | **Estimation de pratique**, non sourcée |
| Heures | **Aucune norme officielle.** Perplexity : TЭУ ≈ 80-100 h, ТБУ ≈ 180-200 h, ТРКИ-1 ≈ 440-460 h (« estimations courantes ») ; Poekhali : 80-120 h **par partie** pour atteindre A2. Gemini : A1 100-120, A2 220-250, B1 380-400 ; Grok : A1 60-100, A2 200-250, B1 400-600 |
| Équivalences ТРКИ ↔ CECRL | **Établies** : ТЭУ = A1, ТБУ = A2, ТРКИ-1 = B1 (épreuve de 4 h 45) |
| Vocabulaire | Grok : 800-850 / ~1 300 / ~2 300-2 500 ; Gemini non chiffré. Retenu : 600-850 / 1 300-1 500 / 2 300-2 500 |

---

## 2. Obstacles du francophone

| Obstacle | Erreur type | Traitement |
|----------|-------------|------------|
| **Faux amis graphiques** | Р lu « p », Н lu « h », В lu « b », С lu « c » | Groupe dédié (unité L2) ; lecture à voix haute dès la semaine 1 |
| **Accent mobile non noté** | Accent à la française ; mauvais mot | Accent marqué partout ; paires ci-dessous |
| **Réduction vocalique (*akanye*)** | /o/ prononcé tel quel | *молоко́* → [məlɐˈko] ; écoute puis répétition |
| **ы** | Remplacé par /i/ | Recul de la langue : *бы́ть / би́ть* |
| **Palatalisation (ь, consonnes molles)** | Dure et molle confondues | Paires dur / mou (*мат* · *мать*) |
| **Six cas** | Nominatif partout | Un cas par fonction (D4) |
| **Aspect** | Confondu avec imparfait / passé composé | Schéma : processus (ligne) vs résultat (point) ; paires |
| **Verbes de mouvement** | *идти* ≠ *ходить* | Cartographie, « chunks » (*я иду́* / *я е́ду*) |
| **Pas de copule au présent** | « Je suis étudiant » traduit | *Я студе́нт* |
| **Pas d'articles** | Détermination perdue | Ordre : information connue d'abord, nouvelle à la fin |

**Faux amis retenus** : *фами́лия* = nom de famille · *фа́брика* = usine · *кабине́т* = bureau (pièce) · *шофёр* = chauffeur.

### Paires minimales

| Contraste | Paire | Sens |
|-----------|-------|------|
| accent | *замо́к* · *за́мок* | serrure · château |
| accent | *мука́* · *му́ка* | farine · tourment |
| ы / и | *быть* · *бить* | être · battre |
| dur / mou | *мат* · *мать* | mat · mère |
| dur / mou | *брат* · *брать* | frère · prendre |
| dur / mou | *у́гол* · *у́голь* | angle · charbon |

---

## 3. Parcours Lecture (cyrillique)

Séance = 15-20 min. **~18 séances** (3 à 4 semaines à 5 séances).

| Unité | Lettres | Séances | Point d'attention |
|-------|---------|---------|-------------------|
| **RL1** | **А К М О Т Е** (même forme, même son, ou presque) | 2 | *Е* = /je/ ; *О* atone → /a/ |
| **RL2** | **В Н Р С У Х** (**faux amis graphiques**) | 3 | В = /v/, Н = /n/, Р = /r/ roulé, С = /s/, У = /u/, Х = /x/ |
| **RL3** | **Б Г Д П Л З И Й** | 3 | Ordre alphabétique de l'app conservé à l'intérieur du groupe |
| **RL4** | **Ж Ш Щ Ч Ц** (sifflantes, chuintantes) | 3 | Ж et Ш toujours durs ; Ч et Щ toujours mous |
| **RL5** | **Ф Э Ю Я Ё** | 2 | Ю, Я, Ё = iotées ; Ё toujours accentuée |
| **RL6** | **Ы, Ь, Ъ** ; palatalisation | 3 | *Ь* = mollesse ; *Ъ* = séparation |
| **RL7** | Consolidation : lire 30 mots sans aide | 2 | Mots internationaux : *парк, банк, такси, метро* |

**Critères de passage** (même logique que l'arabe) : ≥ 90 % de lettres reconnues, ≥ 85 % de mots décodés correctement, lecture sans translittération.

---

## 4. Progression

### A1 (`beginner`) — 600-850 mots

| Unité | Fonction | Grammaire |
|-------|----------|-----------|
| **RU1** | Se présenter | **pas de copule** (*Я студе́нт*), *это*, pronoms |
| **RU2** | Nommer, décrire | genre (m / f / n), adjectifs au nominatif |
| **RU3** | Localiser | **prépositionnel** (*в, на* + *где ?*) |
| **RU4** | Parler d'objets, de goûts | **accusatif** (*что ? кого ?*), *любить, хотеть* |
| **RU5** | Posséder, nier | **génitif** : *у меня́ есть…*, *нет* + génitif |
| **RU6** | Routine | présent, 1re et 2e conjugaisons |
| **RU7** | Restaurant, achats | prix, nombres, heure |

### A2 (`intermediate`) — 1 300-1 500 mots

| Unité | Fonction | Grammaire |
|-------|----------|-----------|
| **RU8** | Âge, besoins, destinataire | **datif** (*мне ... лет*, *мне нужно*) |
| **RU9** | Compagnie, profession | **instrumental** (*с кем ?*, *кем ?*) |
| **RU10** | Raconter | **passé** (accord en genre) |
| **RU11** | Projets | futur ; **aspect : première approche** (processus vs résultat) |
| **RU12** | Se déplacer | verbes de mouvement **sans préfixe** (*идти / ходить, ехать / ездить*) |

### B1 (`advanced`) — 2 300-2 500 mots

| Unité | Fonction | Grammaire |
|-------|----------|-----------|
| **RU13** | Les six cas au pluriel | consolidation |
| **RU14** | Nuancer le passé et le futur | **aspect systématisé** |
| **RU15** | Se déplacer précisément | verbes de mouvement **préfixés** (*пойти́, приехать, уйти́*) |
| **RU16** | Relier | subordonnées (*кото́рый, что́бы, е́сли*) |
| **RU17** | Reconnaître | participes, gérondifs (introduction) |

---

## 5. Volumes

Estimations **non officielles** cumulées : A1 **80-120 h** ; A2 **180-250 h** ; B1 **400-460 h**. Le russe est une langue de la catégorie « difficile » (méthodologie § 1.6). À 85 h/an, l'application mène à la fin de l'A1 environ, **cyrillique inclus**, en un an.

---

## 6. Mise en œuvre

| Niveau | Consigne IA (`LANGUAGE_PROGRESSION.ru`, **déjà proche de ce programme**) |
|--------|---------------------------------------------------------------------------|
| `beginner` | Cyrillique + translittération ; **accent marqué** ; un cas à la fois ; rappeler l'absence de copule |
| `intermediate` | Translittération seulement si le mot est difficile ; accent toujours ; **paire d'aspect** pour chaque verbe |
| `advanced` | Cyrillique seul, accent marqué ; verbes de mouvement préfixés, participes |

**Données** : vocabulaire statique `ru` (**aujourd'hui inexistant** : [methodologie.md](../methodologie.md) § 4.2) ; **accent sur chaque entrée** ; alphabet existant (33 lettres) à **réordonner** selon RL1-RL6, comme proposé pour l'arabe. Fiche faux amis et paires dur/mou à produire.

## 7. Limites

- La synthèse `ru-RU` place-t-elle correctement l'accent ? À tester : c'est la fonction la plus risquée de la voix.
- L'accent n'est pas dans le texte Unicode « par défaut » : prévoir l'accent aigu combinant (U+0301) dans les données **et** dans les prompts.
- Aucune étude empirique sur les francophones ; toute difficulté listée est **consensuelle, non mesurée**.
- Contenu à faire relire par un russophone.

## 8. Références

Voir § 1.1. Certifications : **ТРКИ / TORFL** (ТЭУ A1, ТБУ A2, ТРКИ-1 B1, ТРКИ-2 B2). Cadre général : [methodologie.md](../methodologie.md).
