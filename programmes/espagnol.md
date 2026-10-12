# Programme d'espagnol pour francophones

> **Rôle** : programme de référence pour l'espagnol (`es`) dans l'application. Complète [methodologie.md](../methodologie.md) § 3.1.
> **Public** : adultes francophones, autonomes sur mobile. **Variante** : castillan (`es-ES`), avec reconnaissance de l'Amérique latine (§ 1.2).
> **Recherche** : [docs/recherche-espagnol/](../docs/recherche-espagnol/) — Gemini, Grok, et Perplexity (vérification avec sources). **Révision** : 12 octobre 2026.

---

## 1. Fondements

### 1.1 Références (vérifiées par Perplexity)

| Référence | Statut | Apport |
|-----------|--------|--------|
| Instituto Cervantes, *Plan curricular del Instituto Cervantes. Niveles de referencia para el español*, Madrid, Instituto Cervantes / Biblioteca Nueva, 2006, 3 vol. | **Confirmé** | Inventaires par niveau CECRL : grammaire, fonctions, lexique, prononciation. Base de la progression § 3. **Aucun volume d'heures prescrit.** |
| Santos Gargallo, I., *Lingüística aplicada a la enseñanza-aprendizaje del español como lengua extranjera*, Madrid, Arco/Libros, 1999 | **Confirmé** | Analyse d'erreurs, démarche de l'apprenant adulte |
| Fernández López, M. S., *Interlengua y análisis de errores en el aprendizaje del español como lengua extranjera*, Madrid, Edelsa, 1997 | **Confirmé** (titre complet corrigé) | Catégorisation des interférences |
| Études sur francophones : ser/estar (étude québécoise, 1 499 erreurs analysées) ; thèse UCM (6 510 erreurs, 64 apprenants francophones B1/C1) ; *Carabela* n° 52 (subjonctif) | **Confirmées par Perplexity** | Établissent que ser/estar et le subjonctif sont des difficultés documentées chez les francophones |

**Écartés** : « Xaquín Núñez García » (phonétique contrastive), cité par Gemini seul, non confirmé. Les fréquences relatives d'erreurs (faux amis, ser/estar, subjonctif) ne reposent sur **aucun consensus chiffré**.

### 1.2 Décisions

| # | Décision | Justification |
|---|----------|---------------|
| D1 | **Castillan d'abord**, reconnaissance de l'Amérique latine dès A2 (voseo, seseo, lexique) | Le PCIC prend le castillan cultivé comme base ; Gemini et Grok recommandent d'éviter une variété exclusive. L'application utilise `es-ES` pour la synthèse vocale |
| D2 | **Exploiter la transparence lexicale, surveiller la production** | Les francophones comprennent vite à l'écrit mais « fossilisent » à la production (« fragnol ») : la rigueur se concentre sur ce qui est produit |
| D3 | **Ser/estar par l'aspect, pas par « permanent/temporaire »** | Gemini : la règle « permanent/temporaire » est simpliste et fausse (*es muerto* / *está muerto*) |
| D4 | **Input oral renforcé** | Gemini : l'input écrit est assimilé très vite ; l'effort doit porter sur la reconnaissance phonologique |
| D5 | **Subjonctif en deux temps** : présent à B1, imparfait à B1+/B2 | PCIC ; le subjonctif imparfait est vivant en espagnol, absent à l'oral en français |

### 1.3 Niveau de confiance

| Affirmation | Statut |
|-------------|--------|
| Difficultés ser/estar, subjonctif, prétérit/imparfait, r/rr, pronoms | **Établi** (études citées) et convergent entre sources |
| Heures par niveau | **Aucune norme officielle.** Gemini : A1 60-80 h, A2 80-100 h en plus, B1 120-150 h ; Grok : 90-100 / 180-200 cumulées / 350-400. Perplexity : les centres de l'Instituto Cervantes affichent 30 à 120 h pour A1, 60 à 180 h pour A2, 120 à 180 h pour B1 — **organisation de cours, non exigences DELE**. Fourchette retenue large (§ 5.1) |
| « Un francophone avance 30 % plus vite » (Gemini) | **Non sourcé**, non retenu |
| Vocabulaire par niveau | Estimations (Gemini actif : 500 / 1 000 / 2 000 ; Grok : 200-400 / 800-1 500 / ~3 000). Retenu : 400-600 / 1 000-1 500 / 2 000-3 000 |

---

## 2. Obstacles du francophone

| Obstacle | Erreur type | Traitement |
|----------|-------------|------------|
| **Faux amis** | *actual* = « présent » (≠ actuel) ; *éxito* = succès ; *embarazada* = enceinte ; *constipado* = enrhumé ; *ropa* = vêtements (≠ robe) ; *quitar* = enlever (≠ quitter) ; *discutir* = se disputer | Fiche dédiée dès A1, rappelée par la révision espacée |
| **Ser / estar** | « *Es enfermo* » pour *está enfermo* ; « *Cuando estaba niño* » pour *era niño* | Par l'aspect : ser = identité/classe, estar = état résultant/lieu. Tâches de description dès A1 |
| **Pronom sujet** | *yo hablo* systématique | Omission par défaut ; pronom seulement pour contraste |
| **Prétérit / imparfait** | Passé composé partout | Ligne du temps : action ponctuelle (*indefinido*) vs cadre/habitude (*imperfecto*) |
| **Subjonctif** | « *pienso que sea* » ; indicatif après *cuando* futur | Déclencheurs en blocs : *quiero que*, *no creo que*, *cuando + subj.* |
| **Pronoms COD/COI** | Confusion *lo/le*, placement | Substitution en blocs, d'abord un seul pronom |
| **R simple / rr roulé** | /ʁ/ français partout | Le /ɾ/ comme un *d* très rapide ; le /r/ en tenant la vibration |
| **Jota /x/** | /h/ ou /k/ | Souffle guttural doux |
| **Voyelles pures** | Nasalisation (*an*, *on*), diphtongaison | Articulation exagérée lèvres/mâchoire |
| **Accent écrit et tonique** | Accent de fin de mot à la française | Paires ci-dessous |

### Paires minimales

| Contraste | Paire | Sens |
|-----------|-------|------|
| r / rr | *pero* · *perro* | mais · chien |
| r / rr | *caro* · *carro* | cher · voiture |
| r / rr | *pera* · *perra* | poire · chienne |
| accent | *papa* · *papá* | pomme de terre · papa |
| accent | *hablo* · *habló* | je parle · il a parlé |
| accent | *termino* · *terminó* | je termine · il a terminé |
| s / z (castillan) | *casa* · *caza* | maison · chasse |

> La dernière paire n'existe pas en Amérique latine (*seseo*). À signaler à l'utilisateur.

---

## 3. Progression

Séance = 15-20 min. Chaque unité : 6 à 8 séances.

### A1 (`beginner`) — 400-600 mots

| Unité | Fonction | Grammaire |
|-------|----------|-----------|
| **ES1** | Saluer, se présenter | *ser*, pronoms **omis**, *llamarse* |
| **ES2** | Nationalités, professions, nombres 0-100 | genre et nombre, adjectifs |
| **ES3** | Famille, possession | *tener*, possessifs |
| **ES4** | Ville, localiser | *hay*, *estar*, prépositions de lieu |
| **ES5** | Restaurant, goûts | *querer*, *gustar*, nourriture |
| **ES6** | Routine, heure | présent régulier, irréguliers (e→ie, o→ue), réfléchis |
| **ES7** | Achats, prix | *cuánto cuesta*, démonstratifs |

### A2 (`intermediate`) — 1 000-1 500 mots

| Unité | Fonction | Grammaire |
|-------|----------|-----------|
| **ES8** | Raconter ce qu'on vient de faire | *pretérito perfecto* (*he* + participe) |
| **ES9** | Raconter un événement passé | *pretérito indefinido* |
| **ES10** | Décrire un souvenir, une habitude | *imperfecto* ; **contraste avec l'indefinido** |
| **ES11** | Projets | *ir a* + infinitif, futur simple |
| **ES12** | Conseils, santé | impératif, pronoms COD/COI |
| **ES13** | Comparer, voyager | comparatifs, superlatifs, *por/para* |

### B1 (`advanced`) — 2 000-3 000 mots

| Unité | Fonction | Grammaire |
|-------|----------|-----------|
| **ES14** | Souhaiter, demander, douter | **subjonctif présent** (volonté, émotion, doute) |
| **ES15** | Hypothèses | conditionnel, *si* + présent |
| **ES16** | Récit complexe | *pluscuamperfecto*, concordance de base |
| **ES17** | Opinion, argumentation | connecteurs, *no creo que* + subj. |
| **ES18** | Rapporter des paroles | discours indirect |
| **ES19** | Introduction | *imperfecto de subjuntivo* (B1+/B2) |

---

## 4. Calendrier et volumes

| Niveau | Heures cumulées indicatives | Source |
|--------|-----------------------------|--------|
| A1 | 60-100 h | Gemini 60-80 ; Grok 90-100 |
| A2 | 150-200 h | Gemini 140-180 ; Grok 180-200 |
| B1 | 300-400 h | Gemini 260-330 ; Grok 350-400 |

**Aucun de ces chiffres n'est officiel** (§ 1.3). À 20 min × 5 jours (~85 h/an), l'application mène à la fin de l'A1 en un an, A2 vers 2 ans. Avec 40 min par jour, A2 en environ un an. Ne pas afficher d'engagement de niveau.

---

## 5. Mise en œuvre

### 5.1 Brief IA

À aligner sur `LANGUAGE_PROGRESSION.es` de [pedagogy.ts](../src/lib/pedagogy.ts) (déjà présent, plus court) :

| Niveau | Consigne |
|--------|----------|
| `beginner` | Présent, ser/estar **expliqués par l'aspect**, pronom sujet omis. Un faux ami signalé dès qu'il apparaît. Phrases de 5-8 mots |
| `intermediate` | Prétérit vs imparfait **par contraste explicite**. Impératif, pronoms COD/COI un à la fois |
| `advanced` | Subjonctif par déclencheurs, conditionnel, connecteurs. Signaler les variantes latino-américaines rencontrées |

### 5.2 Données à produire

| Donnée | État | Cible |
|--------|------|-------|
| Vocabulaire statique `es` | ~100 mots | 400-600 mots A1, étiquetés `level` |
| Fiche faux amis | aucune | ~40 entrées, avec exemple contextualisé |
| Alphabet | ordre alphabétique, fonctionne | ajouter un son d'exemple pour *j*, *ll*, *ñ*, *r/rr* |
| Audio | synthèse `es-ES` | bon niveau : la qualité de synthèse espagnole est suffisante |

---

## 6. Limites

- **Pas de test de la qualité de la voix `es-ES`** sur tous les appareils (voir [speech.ts](../src/lib/speech.ts)).
- Les études sur francophones portent sur **B1/C1** : peu de données sur les erreurs d'A1.
- Les listes de faux amis et paires minimales sont à **relire par un hispanophone** avant publication.

## 7. Références

- Instituto Cervantes (2006), *Plan curricular…* · Santos Gargallo (1999) · Fernández López (1997) — voir § 1.1.
- Krashen (input compréhensible), Ellis et Nunan (tâches) : cadre général dans [methodologie.md](../methodologie.md) § 1.
- Certifications : **DELE** (Instituto Cervantes, validité à vie) et **SIELE** (panhispanique, validité 5 ans).
