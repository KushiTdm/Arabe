# Programme de coréen pour francophones

> **Rôle** : programme de référence pour le coréen (`ko`). Complète [methodologie.md](../methodologie.md) § 3.8.
> **Public** : adultes francophones, autonomes sur mobile. **Norme** : coréen standard de Séoul (`ko-KR`).
> **Recherche** : [docs/recherche-coreen/](../docs/recherche-coreen/) — Grok, Gemini (après un premier refus), Perplexity (vérification avec sources). **Révision** : 12 octobre 2026.

---

## 1. Fondements

### 1.1 Références (vérifiées par Perplexity)

| Référence | Statut |
|-----------|--------|
| Yun-Roger, S., *J'aime le coréen ! Le coréen de tous les jours pour les francophones*, Séoul, Shinasa, 2006 (2e éd. 2012) | **Confirmé** |
| Couralet, S., *Coréen : 50 règles essentielles*, Studyrama, « Les Incontournables », 4e éd. oct. 2020 (traite les « erreurs les plus courantes ») | **Confirmé** |
| *Kaja, Hanguk ! — Première année*, Belin Éducation, 2024 (A1) | **Confirmé** ; Eunjin Kim, autrice principale et directrice pédagogique, **avec une équipe** (Shin, Kim Eonet, Bully-Noh, Choi) |
| Fabre, A. et Shim, S.-J., *Manuel de coréen*, L'Asiathèque, coll. « Langues INALCO » (1995 ; nouvelle éd. 2023, 17 leçons) | **Confirmé** ; la structure « vol. 1-2 » **n'est pas confirmée** |
| *Grammaire pratique du coréen : niveau débutant*, Armand Colin, 2019 (adaptation de *Korean Grammar in Use*, Darakwon) ; couvre TOPIK 1-2 | **Confirmé** |
| Shin, H., Tcho, H. Y., Fleury, J.-C., *Les bases du coréen — Grammaire progressive en 99 leçons*, Dunod, 2021 | **Confirmé** |
| Li, J.-M., *Apprenons le coréen ! Manuel A1-A2*, Presses universitaires de Bordeaux, 3e éd. 2019 | **Confirmé** — Gemini : « Didier FLE / Collège de France » : **éditeur inexact** |

**Non confirmés, écartés ou à vérifier** : « DU Didactique du coréen » à Bordeaux Montaigne (Grok) ; *Mélanges CRAPEL* 47/1 (2026) ; « Kim 2001 ; Choe 2014 » ; les enseignants cités par Gemini (Choi Jiyoung, Kang Shin-tae, Jin-Ok Kim, Stephane Bois, Li Jin-Mee) ; « chaire de 1960 / 1959 » (dates qui divergent entre les deux IA).
**Lacune** (Perplexity) : **aucune étude académique sur les erreurs des francophones en coréen** trouvée ; les difficultés viennent de la pratique et de manuels contrastifs.

### 1.2 Décisions

| # | Décision | Justification |
|---|----------|---------------|
| D1 | **Hangeul d'abord, en ~25 séances** (soit environ 8 h), lecture sans romanisation dès la fin | Deux IA : quelques heures à une quinzaine ; Perplexity : quelques heures à ~10 h pour déchiffrer, plus pour automatiser |
| D2 | **Romanisation supprimée dès la 2e-3e séance de lecture** | Grok : elle fige des approximations (déjà dans `pedagogy.ts`) |
| D3 | **Triple opposition (simple / tendue / aspirée) travaillée dès l'unité 3** | Absente du français, inaudible sans entraînement |
| D4 | **Registre 해요체 seul en A1** ; **합쇼체 en reconnaissance** | Choix obligatoire ; la politesse est pragmatique, non un tableau |
| D5 | **Deux numérations enseignées avec leurs emplois** (native : heures, âge, objets ; sino-coréenne : prix, dates, minutes) | Source constante d'erreurs |
| D6 | **은/는 vs 이/가 expliqué comme thème vs sujet, tard** | Notion « la plus complexe à intérioriser » (Gemini) |

### 1.3 Niveau de confiance

| Affirmation | Statut |
|-------------|--------|
| Triple opposition, batchim, particules, politesse, double numération | **Consensus des deux IA**, pratique d'enseignement |
| « Hangeul en 5-15 h » | **Estimation**, aucune norme NIIED ni King Sejong |
| Heures TOPIK | **Aucun volume officiel** (Perplexity : le NIIED définit les niveaux par score, TOPIK I niveau 2 = 140-200 points). Estimations : niv. 1 80-200 h, niv. 2 200-400 h, niv. 3 400-800 h, niv. 4 800-1 200 h. Gemini : 150-200 / 300-400 / 600-750. Les « heures théoriques NIIED » citées par Gemini ne sont **pas sourcées** |
| « +30 à 50 % pour un francophone » (Gemini) | **Non sourcé**, non retenu |
| Lexique sino-coréen ≈ 60 % du vocabulaire savant (Grok) | **Non vérifié** |
| Vocabulaire | Gemini : ~800 / 1 500-2 000 / 3 000-4 000 ; Grok : 800-1 500 (A2) / 2 000-3 000 (B1). Retenu : 400-800 / 1 000-2 000 / 2 000-3 500 |

---

## 2. Obstacles du francophone

| Obstacle | Erreur type | Traitement |
|----------|-------------|------------|
| **Blocs syllabiques** | Lire lettre par lettre | Blocs de 2 à 4 graphèmes, lecture en syllabes |
| **Triple opposition** | ㄱ = ㅋ = ㄲ | Perception puis souffle (main devant la bouche) |
| **ㅓ / ㅗ ; ㅡ** | Ouverture et centralisation | Exemples audio ; ㅡ = lèvres écartées |
| **Batchim** | Prononcer chaque lettre finale | 7 sons représentatifs ; consonne finale **non relâchée** |
| **Liaisons et assimilations** | *국물* lu « kuk-mul » | 연음화, nasalisation : *국물* → [궁물] |
| **Particules** | Calquées sur le français | Une particule par unité |
| **SOV** | Verbe en 2e position | Le verbe est **toujours à la fin** |
| **Politesse** | Un seul registre | Nommer 해요체 / 합쇼체 / 반말 à chaque phrase |
| **Deux numérations** | Mélange | Tableau d'emplois (D5) |

### Paires minimales

| Contraste | Paire | Sens |
|-----------|-------|------|
| simple / aspirée / tendue | *달* · *탈* · *딸* | lune · masque · fille |
| simple / aspirée / tendue | *불* · *풀* · *뿔* | feu · herbe · corne |
| simple / aspirée / tendue | *자다* · *차다* · *짜다* | dormir · donner un coup / être plein · salé |
| liaison | *음악이* → [으마기] | la musique (sujet) |
| nasalisation | *합니다* → [함니다] | (forme polie) |

---

## 3. Progression

### 3.1 Hangeul (~25 séances, 5 semaines)

| Unité | Contenu | Séances |
|-------|---------|---------|
| **KH1** | Voyelles de base **ㅏ ㅓ ㅗ ㅜ ㅡ ㅣ** ; ㅇ muet ; **ㄴ ㅁ** | 3 |
| **KH2** | Consonnes simples **ㄱ ㄷ ㅂ ㅅ ㅈ ㄹ ㅎ** | 4 |
| **KH3** | Voyelles en y : **ㅑ ㅕ ㅛ ㅠ** ; **ㅐ ㅔ** | 3 |
| **KH4** | Aspirées **ㅋ ㅌ ㅍ ㅊ** | 3 |
| **KH5** | **Tendues ㄲ ㄸ ㅃ ㅆ ㅉ** (triple opposition) | 4 |
| **KH6** | Voyelles composées **ㅘ ㅝ ㅚ ㅟ ㅢ** | 2 |
| **KH7** | **Batchim** : 7 sons représentatifs | 3 |
| **KH8** | Liaison, nasalisation, assimilations | 3 |

> **Écart avec l'application** : l'alphabet `ko` actuel liste **14 consonnes et 6 voyelles seulement** ([languages.ts](../src/lib/languages.ts)) : il manque **ㅑ ㅕ ㅛ ㅠ ㅐ ㅔ**, **les cinq consonnes tendues** et les voyelles composées. La triple opposition, principal obstacle, n'y est pas.

**Critères** : ≥ 90 % de syllabes lues, 20 mots lus sans romanisation.

### 3.2 Communication

#### A1 (`beginner`) — TOPIK 1 : 400-800 mots

| Unité | Fonction | Grammaire |
|-------|----------|-----------|
| **KO1** | Se présenter | 입니다 / 이에요·예요, **은/는** |
| **KO2** | Désigner, localiser | 이/그/저, 이/가 있다·없다, 에 ; nombres **sino-coréens** |
| **KO3** | Actions quotidiennes | **해요체**, 을/를, 에서 |
| **KO4** | Heure, âge, objets | nombres **natifs** + classificateurs (개, 명, 병) |
| **KO5** | Commander | 주세요, quantités |
| **KO6** | Décrire, goûts | adjectifs, 좋아해요 |

#### A2 (`intermediate`) — TOPIK 2 : 1 000-2 000 mots

| Unité | Fonction | Grammaire |
|-------|----------|-----------|
| **KO7** | Raconter | **passé -았/었-** |
| **KO8** | Projets | **futur -(으)ㄹ 거예요**, connecteur -고 |
| **KO9** | Demander, permettre | -아/어 주세요, -(으)ㄹ 수 있다, -(으)면 안 되다 |
| **KO10** | Expliquer, comparer | -아/어서, -보다 |
| **KO11** | Honorer | **-(으)시-** |
| **KO12** | Reconnaître | **반말** (compréhension) |

#### B1 (`advanced`) — TOPIK 3 : 2 000-3 500 mots

| Unité | Fonction | Grammaire |
|-------|----------|-----------|
| **KO13** | Justifier, hypothèse | -(으)니까, -(으)면 |
| **KO14** | Proposer, décider | -(으)ㄹ까요?, -(으)려고 하다, -기로 하다 |
| **KO15** | Rapporter | **discours indirect** -다고 하다, -자고 하다 |
| **KO16** | Registres | 합쇼체 actif, vocabulaire formel |
| **KO17** | Lexique | sino-coréen et hanja (introduction) |

---

## 4. Volumes

Estimations **non officielles** cumulées : TOPIK 1 **100-200 h** ; TOPIK 2 **250-400 h** ; TOPIK 3 **450-800 h**. À 85 h/an, l'application mène à la fin de l'A1 environ, hangeul compris. Le coréen a l'**écriture la plus rapide à acquérir** des langues non latines de l'application, mais la syntaxe et la politesse le placent au niveau du japonais (méthodologie § 1.6).

---

## 5. Mise en œuvre

| Niveau | Consigne IA (`LANGUAGE_PROGRESSION.ko`) |
|--------|------------------------------------------|
| `beginner` | Hangeul + romanisation révisée ; **해요체 seul** ; batchim et changements de prononciation signalés ; numération native vs sino-coréenne |
| `intermediate` | Romanisation sur les mots difficiles seulement ; niveaux de politesse introduits avec leurs emplois |
| `advanced` | Hangeul seul ; registres (합쇼체 / 반말) et choix social ; sino-coréen, hanja de base |

**Données** : vocabulaire `ko` (**aujourd'hui inexistant**, [methodologie.md](../methodologie.md) § 4.2) ; **compléter l'alphabet** (§ 3.1) ; paires de la triple opposition avec audio.

## 6. Limites

- Aucune étude sur les erreurs des francophones ; contenu à faire relire par un coréanophone.
- La synthèse `ko-KR` rend-elle la **tension** (ㄲ) et l'**aspiration** (ㅋ) ? À tester.
- L'évaluation par IA de la triple opposition est **à valider**.

## 7. Références

Voir § 1.1. Certifications : **TOPIK I** (niveaux 1-2) et **II** (3-6), NIIED ; cursus **King Sejong Institute**. Cadre général : [methodologie.md](../methodologie.md).
