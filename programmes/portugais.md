# Programme de portugais pour francophones

> **Rôle** : programme de référence pour le portugais (`pt`). Complète [methodologie.md](../methodologie.md) § 3.1.
> **Public** : adultes francophones, autonomes sur mobile. **Variante** : **brésilienne** (`pt-BR`), avec exposition au portugais européen (§ 1.2).
> **Recherche** : [docs/recherche-portugais/](../docs/recherche-portugais/) — Gemini, Grok, Perplexity (vérification avec sources). **Révision** : 12 octobre 2026.

---

## 1. Fondements

### 1.1 Références (vérifiées par Perplexity)

| Référence | Statut |
|-----------|--------|
| *Referencial Camões PLE*, Camões, I.P., 1re éd., septembre 2017 | **Confirmé** |
| INEP, *Documento-base do exame Celpe-Bras* (version 2020 ; version actualisée 2025 de 135 p.) | **Confirmé** |
| Mira Mateus, M. H., Brito, A. M., Duarte, I., Faria, I. H. *et al.*, *Gramática da Língua Portuguesa*, Lisbonne, Caminho (1983 ; 5e éd. 2003, ISBN 972-21-0445-4) | **Confirmé** — grammaire du **portugais européen** |
| Almeida Filho, J. C. P., *Dimensões comunicativas no ensino de línguas*, Campinas, Pontes (1re éd. 1993) | **Corrigé** : Gemini donnait « *Dimensões da Didática do PLE*, 2008 », titre non retrouvé |
| CAPLE (Université de Lisbonne) : ACESSO (A1), CIPLE (A2), DEPLE (B1), DIPLE (B2), DAPLE (C1), DUPLE (C2) | **Confirmé** |
| **Celpe-Bras** : niveaux *Intermediário, Intermediário Superior, Avançado, Avançado Superior* | **Confirmé** ; **pas une série A2/B1/C1** comparable au CAPLE |

**Écartés** : les chercheuses « Matilde Gonçalves », « Ana Madeira », « Maria Antónia Coutinho » et « Florence Pellegrini / Michel Cahen » (Gemini seul, non vérifiés) ; « QuaPLE » (non confirmé).
**Lacune majeure** (Perplexity) : **aucune étude de référence sur les erreurs systématiques des francophones** en portugais pour les voyelles nasales, *ser/estar* ou l'infinitif personnel. Ces difficultés sont « plausibles et traitées en didactique du PLE », non démontrées spécifiquement pour les francophones.

### 1.2 Décisions

| # | Décision | Justification |
|---|----------|---------------|
| D1 | **Brésilien comme variante principale** | Cohérent avec le code (`pt-BR`, drapeau 🇧🇷, `aiSeedPrompt`). Perplexity : le choix dépend de **l'objectif géographique**, non d'une supériorité de variante ; pour un public généraliste, annoncer clairement une variante principale |
| D2 | **Exposition à l'européen en écoute, dès B1** | Gemini et Perplexity : exposer aux deux normes, sans présenter l'une comme « incorrecte » |
| D3 | **Voyelles nasales avant le reste de la phonétique** | La différence *pão / pau* change le sens |
| D4 | **Infinitif personnel et futur du subjonctif à B1** | Absents du français : à introduire par tâches, pas par règle abstraite (Perplexity) |
| D5 | **Dire clairement ce que l'application ne prépare pas** | Le CIPLE (A2) est le niveau exigé pour la nationalité portugaise et évalue le **portugais européen** |

> **À savoir** (CAPLE, confirmé) : le **CIPLE A2** est le niveau minimal pour acquérir la nationalité portugaise. Un utilisateur qui vise ce certificat n'est **pas** servi par un parcours brésilien. Voir la décision n° 1 du § 6.

### 1.3 Niveau de confiance

| Affirmation | Statut |
|-------------|--------|
| Nasales, *lh/nh*, *r*, *ser/estar*, infinitif personnel, clitiques | **Plausibles et courants en didactique** ; non démontrés spécifiquement pour les francophones |
| Réduction vocalique du portugais européen rend l'oral plus difficile | Convergence Gemini et Grok |
| Heures | **Aucune norme.** Gemini : A1 60-80 h, A2 +80-100, B1 +100-120 ; Grok : 80-100 / 180-200 / 350-400. CIPLE : environ 2 h d'examen (source secondaire) |
| Vocabulaire | Gemini 800-1 000 / 1 500-2 000 / 3 000-4 000 ; Grok 500-1 000 / 1 500-2 000 / 2 500-3 500. Retenu : 500-800 / 1 500-2 000 / 2 500-3 500 |

---

## 2. Obstacles du francophone

| Obstacle | Erreur type | Traitement |
|----------|-------------|------------|
| **Voyelles nasales** (*ã, õ, ão, -em*) | *pão* lu comme une voyelle simple, confondu avec *pau* | Perception « nasale / orale », paires ci-dessous |
| **lh / nh** | /j/ (*paille*) pour /ʎ/ ; *gn* français | Contact de la langue contre le palais |
| **R initial et rr** | /ʁ/ français ou roulé | BR : /h/ ou /x/ (aspiré) ; PE : /ʁ/ ou /r/ |
| **Réduction des atones** (PE surtout) | Sur-articulation, incompréhension de l'oral rapide | Écoute progressive |
| **Ser / estar** | Un seul « être » | Par l'aspect, comme en espagnol, mais attention : *ficar* est fréquent en BR pour la localisation |
| **Infinitif personnel** | « *É importante que nós façamos* » | Introduction à B1, par tâches |
| **Futur du subjonctif** | Confondu avec le présent | Déclencheurs *quando, se, assim que* |
| **Clitiques** | BR : proclise (*me dá*) ; PE : enclise (*dá-me*) | Un seul schéma par variante, sans mélange |
| **Faux amis** | voir ci-dessous | Fiche dédiée |

**Faux amis retenus** : *puxar* = tirer · *esquisito* = bizarre · *assistir* = regarder / assister · *atender* = répondre, recevoir · *pretender* = avoir l'intention · *comprido* = long · *parente* = membre de la famille · *constipado* = enrhumé (PE).

### Paires minimales

| Contraste | Paire | Sens |
|-----------|-------|------|
| nasale / orale | *pão* · *pau* | pain · bâton |
| nasale / orale | *mão* · *mau* | main · mauvais |
| nasale / orale | *vim* · *vi* | je suis venu · j'ai vu |
| r / rr | *caro* · *carro* | cher · voiture |
| lh | *filho* · *fio* | fils · fil |
| nh | *minha* · *mina* | ma · mine |

---

## 3. Progression

### A1 (`beginner`) — 500-800 mots

| Unité | Fonction | Grammaire |
|-------|----------|-----------|
| **PT1** | Saluer, se présenter | *ser*, pronoms, **nasales** (écoute) |
| **PT2** | Nationalités, nombres | genre et nombre |
| **PT3** | Famille | possessifs, *ter* |
| **PT4** | Ville, localiser | *estar*, *ficar*, prépositions contractées (*no, na, do*) |
| **PT5** | Restaurant | *querer*, *gostar de* |
| **PT6** | Routine, heure | présent (réguliers et *ir, fazer, ter*) |
| **PT7** | Achats | *quanto custa*, démonstratifs |

### A2 (`intermediate`) — 1 500-2 000 mots

| Unité | Fonction | Grammaire |
|-------|----------|-----------|
| **PT8** | Raconter le passé | *pretérito perfeito* |
| **PT9** | Décrire une habitude | *pretérito imperfeito* |
| **PT10** | Raconter | **contraste perfeito / imperfeito** |
| **PT11** | Projets | *ir* + infinitif, futur |
| **PT12** | Remplacer un nom | pronoms objets (proclise brésilienne) |
| **PT13** | Action en cours | *estar* + gérondif (BR), comparatifs |

### B1 (`advanced`) — 2 500-3 500 mots

| Unité | Fonction | Grammaire |
|-------|----------|-----------|
| **PT14** | Souhait, doute | **subjonctif présent** |
| **PT15** | Hypothèses, temps futur | **futur du subjonctif** (*quando, se*) |
| **PT16** | Structures sans équivalent | **infinitif personnel** |
| **PT17** | Conditionnel, hypothèses | *condicional*, *mais-que-perfeito* |
| **PT18** | Opinion, argumentation | connecteurs, voix passive |
| **PT19** | Variation | écoute comparée BR / PE (compréhension) |

---

## 4. Volumes

Cumulés, **indicatifs** : A1 **60-100 h** ; A2 **150-200 h** ; B1 **300-400 h**. Aucune source officielle. À 85 h/an, l'application mène à la fin de l'A1 en un an.

---

## 5. Mise en œuvre

| Niveau | Consigne IA (`LANGUAGE_PROGRESSION.pt`) |
|--------|------------------------------------------|
| `beginner` | **Portugais brésilien**. Nasales travaillées, *lh/nh* signalés, *ser/estar* par l'aspect. Faux ami annoncé dès qu'il apparaît |
| `intermediate` | Perfeito vs imperfeito par contraste. Pronoms en proclise (norme brésilienne) |
| `advanced` | Subjonctif présent **et** futur du subjonctif, infinitif personnel. Mentionner l'écart avec le portugais européen quand il est notable |

**Données à produire** : vocabulaire statique `pt` (**aujourd'hui inexistant**, [methodologie.md](../methodologie.md) § 4.2) ; paires minimales avec audio ; fiche faux amis vérifiée.

## 6. Décisions ouvertes et limites

| # | Décision | Recommandation |
|---|----------|----------------|
| 1 | Proposer le portugais **européen** pour les utilisateurs qui visent la nationalité portugaise (CIPLE A2) | **Oui à terme** : variante sélectionnable, voix `pt-PT`, données propres. Chantier important car le vocabulaire et les clitiques diffèrent |
| 2 | Annoncer la variante à l'onboarding | **Oui**, sans quoi un utilisateur peut croire préparer le CIPLE |

- La qualité de la voix `pt-BR` pour les **nasales** est à tester.
- Gemini attribue au brésilien une phonétique « plus accessible » : **opinion, non démontrée**.
- Contenu à faire relire par un lusophone.

## 7. Références

*Referencial Camões PLE* (2017) · INEP, *Documento-base Celpe-Bras* · Mira Mateus *et al.* (2003) · Almeida Filho (1993) — § 1.1. Certifications : **CAPLE** (Portugal), **Celpe-Bras** (Brésil). Cadre général : [methodologie.md](../methodologie.md).
