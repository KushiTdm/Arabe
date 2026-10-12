# Programme d'allemand pour francophones

> **Rôle** : programme de référence pour l'allemand (`de`). Complète [methodologie.md](../methodologie.md) § 3.3.
> **Public** : adultes francophones, autonomes sur mobile. **Norme** : allemand standard (`de-DE`).
> **Recherche** : [docs/recherche-allemand/](../docs/recherche-allemand/) — Gemini, Grok, Perplexity (vérifications avec sources). **Révision** : 12 octobre 2026.

---

## 1. Fondements

### 1.1 Références (vérifiées par Perplexity)

| Référence | Statut |
|-----------|--------|
| Krumm, H.-J., Fandrych, C., Hufeisen, B., Riemer, C. (dir.), *Deutsch als Fremd- und Zweitsprache. Ein internationales Handbuch*, Berlin/Boston, De Gruyter Mouton, 2010 (HSK 35.1-35.2) | **Confirmé** |
| Pienemann, M., *Language Processing and Second Language Development: Processability Theory*, Amsterdam, John Benjamins, 1998 | **Confirmé** — théorie **générale**, appliquée à l'allemand L2, non propre aux francophones |
| **Diehl, E., Christen, H., Leuenberger, S., Pelvat, I., Studer, T.**, *Grammatikunterricht: Alles für die Katz? Untersuchungen zum Zweitspracherwerb Deutsch*, Tübingen, Niemeyer, 2000 | **Confirmé** : étude **longitudinale** d'élèves francophones à Genève ; l'enseignement explicite soutient mais ne remplace pas la séquence d'acquisition. Résultats par phénomène (cas, genre, verbe) **non vérifiés** |
| **Näf, A.**, « Les francophones face aux cas de l'allemand : un cas désespéré ? », *Travaux neuchâtelois de linguistique* 37, 2002, p. 115-143 | **Confirmé** : corpus oral d'élèves de Suisse romande ; interférence du français **et de l'anglais** (L3) |
| Zemb, J.-M., *Vergleichende Grammatik Französisch-Deutsch*, t. 1 *Comparaison de deux systèmes* (1978), t. 2 *L'économie de la langue et le jeu de la parole* (1984), Mannheim, Duden | **Corrigé** : Gemini donnait « *Les mots de l'allemand*, CIDEB, 1972 », **non retrouvé** |
| Hufeisen, B., *Faktorenmodell* | **Confirmé** comme concept ; **réf. récente** : Hufeisen (2020), in *Handbuch Mehrsprachigkeit und Bildung*, Springer VS |
| Goethe-Institut | **Confirmé** : fourchettes indicatives publiées (voir § 4) |

**Écartés** : « Daniel Coste & Cécile Ployert » et « Dalbera-Stefanaggi & Dalgalian » pour l'allemand (Gemini seul, non vérifiés). « Brigitte Jostes » existe (Freie Universität Berlin) mais **sans référence précise** sur le sujet.
Grok a cité les DLL (*Deutsch Lehren Lernen*) du Goethe-Institut : réelles, mais formation d'enseignants, hors sujet pour un apprenant.

### 1.2 Décisions

| # | Décision | Justification |
|---|----------|---------------|
| D1 | **Jamais un nom sans son article ni son pluriel** | Le genre est arbitraire pour le francophone (*la table* / *der Tisch*) et conditionne toute la déclinaison |
| D2 | **Respecter la séquence d'acquisition de l'ordre des mots** : SVO → adverbe en tête → verbe séparé → inversion V2 → verbe final | Pienemann : on ne peut **pas** sauter les étapes ; forcer le verbe final trop tôt surcharge la mémoire de travail. Diehl *et al.* : l'enseignement soutient la séquence sans la remplacer |
| D3 | **Cas progressifs** : nominatif/accusatif (A1) → datif (A2) → génitif (B1) | Jamais en tableau complet |
| D4 | **Perfekt à l'oral, Präteritum à l'écrit** (sauf *sein, haben*, modaux) | Gemini : usage réel de l'allemand parlé |
| D5 | **Konjunktiv II par *würde* + infinitif d'abord**, puis *wäre / hätte* | Gemini : la forme synthétique s'efface à l'oral |

### 1.3 Niveau de confiance

| Affirmation | Statut |
|-------------|--------|
| Genre, cas, verbe final difficiles pour les francophones | **Plausible et attesté par Näf et Diehl**, mais Perplexity : « ampleur » et fréquences **non établies**, résultats par phénomène **non vérifiés** |
| Séquence d'acquisition de l'ordre des mots | **Établi** (Pienemann), théorie générale |
| « Les suffixes *-ung, -heit, -keit* donnent le féminin à 99 % » (Gemini) | Les trois suffixes sont fiables ; **le chiffre n'est pas sourcé**, non retenu |
| Heures | **Fourchettes du Goethe-Institut**, indicatives et non exigées : A1 60-150 h (80-200 UE de 45 min), A2 150-260 h, B1 260-490 h. Gemini : 80-100 / +100-120 / +150-180 ; Grok : A1 150-200 h. **Écart de 2×** |
| Vocabulaire | Gemini et Grok : 300-700 / 800-1 500 / 2 000-3 000. Retenu : 400-700 / 1 000-1 500 / 2 000-3 000 |

---

## 2. Obstacles du francophone

| Obstacle | Erreur type | Traitement |
|----------|-------------|------------|
| **Genre** | *der Tisch* appris sans article | Article + pluriel avec chaque mot, dans les données et les prompts |
| **Quatre cas** | *Ich sehe der Mann* | Une fonction à la fois : sujet, objet direct, destinataire |
| **Position du verbe** | SVO partout | Respecter la séquence (D2) ; schéma de la « pince verbale » |
| **Particules séparables** | *Ich aufstehe* | Particule soulignée, rejetée en fin de phrase |
| **Mots composés** | Mémorisation brute | Décomposer de droite à gauche : le noyau est à la fin |
| **ü / ö** | /u/, /o/ | Lèvres arrondies, langue avancée |
| **ch [ç] / [x]** | /ʃ/ pour *ich* | [ç] après voyelle antérieure, [x] après voyelle postérieure |
| **Coup de glotte, h aspiré** | Voyelles liées | Attaque nette de chaque voyelle initiale |
| **Perfekt / Präteritum** | Mélange | Perfekt par défaut à l'oral |
| **Faux amis** | *Gift* lu « cadeau » | Fiche dédiée |

**Faux amis retenus** : *Gift* = poison · *also* = donc · *Rock* = jupe · *Brief* = lettre · *Chef* = patron · *Rente* = retraite.

### Paires minimales

| Contraste | Paire | Sens |
|-----------|-------|------|
| u / ü | *Kuchen* · *Küchen* | gâteau · cuisines |
| o / ö | *mochte* · *möchte* | aimait · voudrait |
| sch / ö | *schon* · *schön* | déjà · beau |
| court / long | *Stadt* · *Staat* | ville · État |
| i / ie | *bitten* · *bieten* | demander · offrir |
| fermé / ouvert | *Ofen* · *offen* | four · ouvert |

---

## 3. Progression

### A1 (`beginner`) — 400-700 mots

| Unité | Fonction | Grammaire |
|-------|----------|-----------|
| **DE1** | Se présenter | *sein*, SVO, questions en W-, **article avec chaque nom** |
| **DE2** | Famille, nombres, heure | *haben*, possessifs, pluriels |
| **DE3** | Acheter | **accusatif** (*ein/kein*, *den*) |
| **DE4** | Restaurant | *möchten*, verbes modaux |
| **DE5** | Routine | verbes à voyelle changeante (*fahren, sehen*), **verbes séparables** |
| **DE6** | Raconter sa semaine | **inversion** (*Heute gehe ich…*) |

### A2 (`intermediate`) — 1 000-1 500 mots

| Unité | Fonction | Grammaire |
|-------|----------|-----------|
| **DE7** | Donner, aider | **datif**, prépositions + datif (*mit, bei, nach*) |
| **DE8** | Localiser, déplacer | prépositions mixtes (*Wechselpräpositionen*) : où / vers où |
| **DE9** | Raconter le passé | **Perfekt** (*haben / sein*), participes |
| **DE10** | Expliquer, justifier | subordonnées *weil, dass, wenn* : **verbe final** |
| **DE11** | Comparer | comparatif, superlatif |
| **DE12** | Passé de *sein / haben* | Präteritum de *sein, haben*, modaux |

### B1 (`advanced`) — 2 000-3 000 mots

| Unité | Fonction | Grammaire |
|-------|----------|-----------|
| **DE13** | Récit écrit | Präteritum narratif |
| **DE14** | Concession, temps | *obwohl, da, während* |
| **DE15** | Politesse, hypothèses | **Konjunktiv II** : *würde* + inf., puis *wäre, hätte* |
| **DE16** | Décrire un processus | passif (*werden* + Partizip II) |
| **DE17** | Décrire précisément | déclinaison de l'adjectif, génitif |
| **DE18** | Préciser | propositions relatives |

---

## 4. Volumes

Fourchettes **indicatives du Goethe-Institut** : A1 **60-150 h**, A2 cumulé **150-260 h**, B1 cumulé **260-490 h**. L'écart interne (jusqu'à 2,5×) reflète des cours différents, non une incertitude de la méthode. À 85 h/an, l'application mène à l'A1.

---

## 5. Mise en œuvre

| Niveau | Consigne IA (`LANGUAGE_PROGRESSION.de`) |
|--------|------------------------------------------|
| `beginner` | **Article et pluriel avec chaque nom.** Nominatif et accusatif seulement. Verbe en 2e position. Particules séparables soulignées |
| `intermediate` | Indiquer le **cas employé et pourquoi**. Perfekt à l'oral. Subordonnées avec verbe final, **seulement après** la séquence A1 |
| `advanced` | Präteritum écrit, Konjunktiv II, passif, adjectifs déclinés |

**Données** : vocabulaire statique `de` existe (~100 mots) : **vérifier que chaque entrée porte article et pluriel**. Fiche faux amis à produire.
**Prononciation** : [pronunciation.ts](../src/lib/pronunciation.ts) cible déjà ü/ö, ch et coup de glotte.

## 6. Limites

- Les études sur francophones portent sur des **élèves de Suisse romande** : transfert aux adultes français à confirmer.
- Résultats détaillés de Diehl *et al.* et typologie des erreurs de Näf **non lus**.
- Contenu à faire relire par un germanophone.

## 7. Références

Voir § 1.1. Certifications : **Goethe-Zertifikat** (A1-C2), **TestDaF** (B2-C1, accès aux universités), **telc** (A1-C2, usages professionnels). Cadre général : [methodologie.md](../methodologie.md).
