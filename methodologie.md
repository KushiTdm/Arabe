# Cadre Didactique — Application Multilingue (MonAppArabe)

> **Statut du document** : référence pédagogique de projet.
> **Portée** : les **11 langues** effectivement déclarées dans [src/lib/languages.ts](src/lib/languages.ts) — arabe, espagnol, mandarin, japonais, allemand, italien, portugais, russe, coréen, vietnamien, anglais.
> **Public visé** : apprenants **francophones** (toute l'interface, les traductions et les aides de prononciation partent du français).
> **Dernière révision** : août 2026.

---

## 0. Comment lire ce document

Ce document a trois usages distincts ; ne pas les confondre.

| Section | Sert à | Public |
|---------|--------|--------|
| **1. Fondations méthodologiques** | Justifier les choix pédagogiques | Décision produit |
| **2. Traduction dans le modèle de données** | Relier la théorie aux types TypeScript existants | Implémentation |
| **3. Fiches par langue** | Alimenter `aiSeedPrompt`, l'alphabet, les catégories, le vocabulaire statique | Contenu |
| **4. Écarts constatés** | Liste des points où le code ne suit pas encore ce cadre | Backlog |
| **5. Recommandations d'implémentation** | Comment combler ces écarts concrètement | Implémentation |

La section 4 est la plus importante à court terme : **le cadre décrit ci-dessous n'est aujourd'hui appliqué qu'en partie par l'application**.

---

## 1. Fondations méthodologiques

### 1.1 Cadre Européen Commun de Référence (CEFR)

Standard international décrivant la compétence par des descripteurs « can-do » (savoir-faire observable), et non par une quantité de grammaire couverte.

| Niveau | Désignation | Descripteur pivot |
|--------|-------------|-------------------|
| **A1** | Découverte (*Breakthrough*) | Comprend et utilise des expressions familières et quotidiennes, avec un interlocuteur coopératif. |
| **A2** | Survie (*Waystage*) | Communique lors de tâches simples et habituelles sur des sujets familiers. |
| **B1** | Seuil (*Threshold*) | Se débrouille dans la plupart des situations de voyage ; raconte, justifie brièvement. |
| **B2** | Avancé (*Vantage*) | Communique avec aisance et spontanéité ; argumente sur des sujets abstraits. |
| **C1** | Autonome | S'exprime couramment sans chercher ses mots ; usage souple et efficace. |
| **C2** | Maîtrise | Comprend pratiquement tout, restitue et nuance avec précision. |

Le *Companion Volume* (2018/2020) ajoute la **médiation** aux compétences classiques — pertinent ici, car l'application fait constamment traduire et reformuler entre le français et la langue cible.

> **Point d'attention** : le CEFR est **indépendant de la langue**. Un A2 en espagnol et un A2 en japonais représentent des volumes de travail très différents (voir § 1.6). Le niveau décrit ce que l'apprenant *sait faire*, jamais le temps qu'il a passé.

### 1.2 Hypothèse de l'input compréhensible (Krashen, i+1)

L'acquisition se produit par exposition à un input **compris**, légèrement au-dessus du niveau courant. Trois conséquences opérationnelles :

1. Le contenu doit être **calibré sur le niveau réel** de l'apprenant, pas sur un niveau générique.
2. La **compréhension précède la production** : accepter une phase silencieuse en réception.
3. Le **filtre affectif** compte : une correction agressive bloque l'acquisition. D'où le ton bienveillant imposé dans tous les `aiSeedPrompt`.

> **Nuance** : Krashen seul ne suffit pas. L'input compréhensible explique l'acquisition ; il n'explique pas la **précision** (les apprenants « fossilisent » des erreurs sans rétroaction). C'est pourquoi ce cadre y ajoute § 1.4.

### 1.3 Approche actionnelle et apprentissage par tâches (TBLT)

L'apprenant est un **acteur social** accomplissant des tâches. Une tâche a un objectif non linguistique (réserver, expliquer, se plaindre, raconter) ; la langue est le moyen, pas la fin.

**Implication directe** : les thèmes de conversation de l'application (construits dynamiquement à partir de `language.categories` dans [ConversationScreen.tsx:109](src/screens/ConversationScreen.tsx#L109)) devraient être formulés comme des **tâches** (« commander un repas et demander l'addition ») plutôt que comme des **domaines lexicaux** (« Nourriture »).

### 1.4 Production et rétroaction corrective (Swain ; Lyster & Ranta)

L'**output hypothesis** (Swain) : produire force l'apprenant à passer du traitement sémantique au traitement syntaxique, et révèle ses lacunes. La rétroaction corrective la plus efficace en contexte communicatif est la **reformulation (*recast*)** et l'**incitation (*prompt*)** — pas la correction explicite systématique.

**C'est la base théorique de [useErrorTracker.ts](src/lib/useErrorTracker.ts)** : consigner l'erreur, la classer (`pronunciation | grammar | vocabulary | writing`), la compter, et **la réinjecter** dans les exercices suivants. Une erreur vue une fois est un accident ; une erreur vue cinq fois est un objectif pédagogique.

### 1.5 Répétition espacée

La rétention lexicale suit une courbe d'oubli ; réactiver un item **juste avant** son oubli maximise le gain par répétition. L'application implémente un **système de Leitner à 5 boîtes** ([useReviewDeck.ts](src/lib/useReviewDeck.ts)) :

| Boîte | 1 | 2 | 3 | 4 | 5 (maîtrisé) |
|-------|---|---|---|---|---|
| Intervalle avant revue | 1 j | 3 j | 7 j | 14 j | 30 j |

Réussite → boîte + 1 ; échec → **retour boîte 1**. Voir § 4.6 pour la limite de ce reset brutal.

### 1.6 Charge de travail réaliste par langue

Le CEFR ne dit rien du temps nécessaire. Les estimations du *Foreign Service Institute* (calibrées pour anglophones, ici ajustées pour des francophones) donnent l'ordre de grandeur pour atteindre un **B2/C1 professionnel** :

| Groupe | Langues de l'app | Heures indicatives | `difficulty` dans le code |
|--------|------------------|--------------------|---------------------------|
| I — proches du français | Espagnol, Italien, Portugais, Anglais | ~600–750 h | `easy` |
| II — écart structurel modéré | Allemand | ~750–900 h | `medium` |
| III — écart important | Russe, Vietnamien | ~1100 h | `medium`/`hard` |
| IV — écart maximal (écriture + typologie) | Arabe, Mandarin, Japonais, Coréen | ~2200 h | `hard`/`medium` |

> **Mise à jour (octobre 2026)** : la recherche menée pour les programmes détaillés montre que **ces volumes horaires n'ont aucune source officielle** pour aucune des 11 langues. Ni le CECRL, ni le *Plan curricular* de l'Instituto Cervantes, ni le NIIED, ni la Fondation du Japon, ni les certifications CILS/CELI/PLIDA ne publient d'heures par niveau ; Cambridge English et le Goethe-Institut publient des **estimations**, non des exigences. Les fourchettes de chaque programme (dossier [programmes/](programmes/)) divergent d'un facteur 1,5 à 3 selon la source et priment sur le tableau ci-dessus.

**Usage produit** : ces chiffres ne doivent *pas* être affichés comme une promesse, mais doivent **calibrer les seuils d'XP et le rythme de déblocage** — voir § 4.7. Un apprenant qui atteint 1000 XP (« Avancé ») en japonais n'est pas au même endroit qu'en italien.

> Le champ `difficulty` du code est incohérent sur deux points : le **coréen** est marqué `medium` alors qu'il relève du groupe IV (le hangeul s'apprend en quelques heures, mais la syntaxe SOV, les niveaux de politesse et le lexique sino-coréen sont coûteux) ; le **russe** est marqué `hard` alors qu'il est un cran en dessous des langues à écriture non alphabétique.

---

## 2. Traduction du cadre dans le modèle de données

Cette section relie chaque concept pédagogique au **code existant**. C'est le contrat entre ce document et l'application.

### 2.1 Les langues effectivement supportées

Source de vérité : `SUPPORTED_LANGUAGES` dans [src/lib/languages.ts:283](src/lib/languages.ts#L283).

| Code | Langue | Écriture | TTS (`ttsLang`) | RTL | `difficulty` | Vocabulaire statique |
|------|--------|----------|-----------------|-----|--------------|----------------------|
| `ar` | Arabe | Alphabet arabe | `ar-SA` | ✅ | hard | ✅ |
| `es` | Espagnol | Latin | `es-ES` | — | easy | ✅ |
| `zh` | Mandarin | Caractères + Pinyin | `zh-CN` | — | hard | ✅ |
| `ja` | Japonais | Hiragana/Katakana/Kanji | `ja-JP` | — | hard | ✅ |
| `de` | Allemand | Latin | `de-DE` | — | medium | ✅ |
| `it` | Italien | Latin | `it-IT` | — | easy | ❌ |
| `pt` | Portugais | Latin | `pt-BR` | — | easy | ❌ |
| `ru` | Russe | Cyrillique | `ru-RU` | — | hard | ❌ |
| `ko` | Coréen | Hangeul | `ko-KR` | — | medium | ❌ |
| `vi` | Vietnamien | Latin + tons | `vi-VN` | — | medium | ✅ |
| `en` | Anglais | Latin | `en-GB` | — | easy | ✅ |

**4 langues sur 11 n'ont aucun vocabulaire hors ligne** (`it`, `pt`, `ru`, `ko`) : quiz, révisions et écran Vocabulaire y sont dégradés et dépendent entièrement de l'IA, donc du réseau et des crédits. Voir § 4.2.

### 2.2 Niveaux : `LanguageProgress.level` ↔ CEFR

Le code stocke trois niveaux (`beginner | intermediate | advanced`) dérivés automatiquement de l'XP dans [useProfiles.ts](src/lib/useProfiles.ts) :

```
xp < 300           → beginner
300 ≤ xp < 1000    → intermediate
xp ≥ 1000          → advanced
```

**Correspondance à retenir** — volontairement prudente, l'XP mesurant l'activité et non la compétence :

| `level` interne | Bande CEFR visée | Ce que l'apprenant sait faire |
|-----------------|------------------|-------------------------------|
| `beginner` | **A1 → A2 bas** | Se présenter, saluer, compter, nommer les objets du quotidien, lire l'écriture cible avec effort. |
| `intermediate` | **A2 → B1 bas** | Tenir une conversation simple sur un sujet familier, poser des questions, raconter au passé. |
| `advanced` | **B1 → B2 bas** | Argumenter, comprendre un texte authentique court, gérer un imprévu. |

> **À ne pas faire** : afficher « C1 » ou « C2 » dans l'application. Une app mobile à input court ne conduit pas seule au-delà de B1/B2, et annoncer un niveau non atteint dégrade la confiance. Les descripteurs C1–C2 restent dans ce document comme **horizon de contenu** (registres, idiomes) et non comme badge utilisateur.

**Trois niveaux internes suffisent** ; ne pas passer à six niveaux CEFR affichés tant que l'application ne fait pas d'évaluation de positionnement réelle (§ 5.1).

### 2.3 XP : ce que le compteur mesure vraiment

L'XP est un **indicateur d'engagement**, pas de compétence. Il doit rester découplé du niveau pédagogique injecté à l'IA. Le mélange actuel (niveau = f(XP)) est acceptable comme approximation, à condition de :

- **pondérer les seuils par `difficulty`** : atteindre `intermediate` doit demander plus d'XP en `hard` qu'en `easy` (§ 4.7) ;
- privilégier les XP issus d'activités **productives** (conversation, écriture, quiz raté puis réussi) sur les activités **passives** (consultation de vocabulaire).

### 2.4 Compétences CEFR ↔ écrans de l'application

| Compétence CEFR | Écran | État |
|-----------------|-------|------|
| **Réception orale** | TTS centralisé ([speech.ts](src/lib/speech.ts), [useSpeaker.ts](src/lib/useSpeaker.ts)) | ✅ — voix résolue explicitement, double vitesse, débit calibré par langue. Reste : pas de locuteur natif enregistré |
| **Réception écrite** | [Coursscreen.tsx](src/screens/Coursscreen.tsx), Vocabulaire | ✅ |
| **Production orale** | [ConversationScreen.tsx](src/screens/ConversationScreen.tsx), [VocabAudioRecorder.tsx](src/components/VocabAudioRecorder.tsx) + [pronunciation.ts](src/lib/pronunciation.ts) | ✅ — évaluation notée contre une cible connue, avec rubrique de pièges francophones |
| **Production écrite** | [WritingScreen.tsx](src/screens/WritingScreen.tsx) | ✅ |
| **Interaction** | Conversation (tours de parole) | ✅ |
| **Médiation** | Traduction FR↔cible dans Quiz et Écriture | Implicite, non nommé |

### 2.5 `CourseType` ↔ objets d'apprentissage

Les cours générés ([useCourses.ts](src/lib/useCourses.ts)) sont typés `grammar | pronunciation | vocabulary | writing | culture`. Cette typologie est bonne et couvre les axes CEFR ; **`culture` est le plus sous-exploité** alors que c'est le levier de motivation le plus fort, et le seul qui différencie réellement l'app d'un manuel.

### 2.6 Catégories lexicales ↔ domaines CEFR

`COMMON_CATEGORIES` ([languages.ts:268](src/lib/languages.ts#L268)) définit 10 catégories identiques pour toutes les langues :

`greetings`, `numbers`, `family`, `food`, `travel`, `daily_life`, `colors`, `animals`, `body`, `emotions`

**Diagnostic** : ces catégories couvrent correctement les domaines **A1**, mais ne mènent pas au-delà. Il manque les domaines A2–B1 du CEFR : *travail / études*, *santé*, *logement*, *temps et météo*, *achats et argent*, *transports*, *loisirs*, *technologie*. Seul l'arabe ajoute `religion` et `work`.

**Recommandation** : introduire un palier de catégories par niveau plutôt que d'allonger une liste plate —

| Palier | Catégories |
|--------|------------|
| **A1** (existant) | greetings, numbers, family, food, colors, body, animals, daily_life |
| **A2** (à ajouter) | shopping, time_weather, transport, home, health |
| **B1** (à ajouter) | work_study, leisure, technology, opinions, society |

Les catégories doivent rester **partagées entre langues** (le code s'appuie dessus pour construire les thèmes de conversation et les quiz), avec la possibilité d'en ajouter de spécifiques par langue, comme le fait déjà l'arabe.

---

## 3. Fiches par langue

Neuf fiches couvrant les onze langues (les trois langues romanes partagent une progression pour un francophone). Chaque fiche donne : les **difficultés réelles pour un francophone**, la **progression**, et les **consignes à refléter dans `aiSeedPrompt`**.

**Principe transversal** : l'obstacle n'est jamais « la langue est difficile », mais **un point précis où le français induit en erreur**. C'est ce point que le contenu doit attaquer.

---

### 3.1 Langues romanes — Espagnol `es`, Italien `it`, Portugais `pt`

> **Programmes détaillés** : [espagnol](programmes/espagnol.md) · [italien](programmes/italien.md) · [portugais](programmes/portugais.md). Cette fiche en reste le résumé.

#### Ce que le francophone gagne d'emblée
Lexique transparent (30–40 % de reconnaissance passive immédiate), même famille syntaxique, genre grammatical déjà intériorisé, alphabet identique. **Un francophone atteint A2 en espagnol ou italien 3 à 4 fois plus vite qu'en arabe.** La progression doit en tenir compte : commencer trop bas démotive.

#### Les vrais obstacles (à cibler prioritairement)

| Obstacle | ES | IT | PT | Traitement |
|----------|----|----|----|------------|
| **Faux-amis** (le piège n°1 de la proximité) | `embarazada` ≠ embarrassée | `confetti` ≠ confettis | `esquisito` ≠ exquis | Cours `vocabulary` dédié dès A1 |
| **Subjonctif** — vivant, là où le français le fige | `espero que **venga**` | `penso che **venga**` | + futur du subjonctif (unique) | B1, après maîtrise des passés |
| **Passé composé vs imparfait vs prétérit** | `fui` / `iba` | `sono andato` / `andavo` | `fui` / `ia` | A2 → B1, par contraste explicite |
| **Prononciation** | `j`, `rr`, `z`, voyelles pures | **consonnes doubles** (`nono` ≠ `nonno`) | **voyelles nasales**, `lh`, `nh`, `ão` | Cours `pronunciation`, dès A1 |
| **Absence de pronom sujet** | `hablo` (pas `yo hablo`) | `parlo` | `falo` | A1, contre-intuitif pour un francophone |

#### Progression commune

| Niveau | Objectif communicatif | Grammaire pivot | Lexique |
|--------|----------------------|-----------------|---------|
| **A1** | Se présenter, commander, demander son chemin | Présent, `ser`/`estar` (ES/PT) ou `essere`/`stare` (IT), genre et nombre, articles | 500–700 |
| **A2** | Raconter sa journée, décrire, comparer | Passé composé et imparfait, futur, pronoms COD/COI, impératif | 1 000–1 500 |
| **B1** | Donner un avis, se débrouiller face à un imprévu | **Subjonctif présent**, conditionnel, relatives | 2 000–2 500 |
| **B2** | Argumenter, comprendre un journal | Subjonctif imparfait, concordance des temps, connecteurs | 3 000–4 000 |

#### Spécificités par langue

- **Espagnol** — Variante : l'app utilise `es-ES`. Signaler le `voseo` (Argentine, Amérique centrale) et la disparition du `vosotros` en Amérique latine, mais **enseigner une norme unique** pour ne pas surcharger un débutant. Certifications : DELE, SIELE.
- **Italien** — Les **consonnes doubles sont phonémiques** et invisibles pour une oreille francophone : c'est la difficulté n°1, à traiter en `pronunciation` dès la première semaine. Prépositions articulées (`nel`, `dal`, `sulla`). Certifications : CILS, CELI, PLIDA.
- **Portugais** — **L'app est configurée en portugais brésilien** (`pt-BR`, drapeau 🇧🇷, `aiSeedPrompt` explicite). C'est un choix cohérent : ne pas prétendre couvrir les deux normes. Mentionner les écarts EP/BP en cours `culture`, sans faire choisir l'utilisateur (§ 4.4). Les **voyelles nasales** (`ã`, `õ`, `ão`) et le `r` guttural sont les points durs. Certifications : Celpe-Bras (Brésil), CAPLE (Portugal).

#### Consignes `aiSeedPrompt`
Genre systématique des noms · prononciation « à la française » · **signaler activement les faux-amis** · exemples culturels ancrés (musique, cuisine, expressions courantes).

---

### 3.2 Anglais `en`

> **Programme détaillé** : [programmes/anglais.md](programmes/anglais.md).

#### Difficultés réelles pour un francophone
L'anglais est réputé facile et ne l'est qu'à moitié : le lexique est accessible (fonds normand), **la phonologie et la prosodie ne le sont pas**.

| Obstacle | Détail | Priorité |
|----------|--------|----------|
| **Orthographe ↔ prononciation** | Aucune correspondance fiable (`through`/`though`/`tough`) | A1, continu |
| **Sons absents du français** | `/θ/ /ð/` (*think*, *this*), `/h/` aspiré, `/ɹ/`, `/ɪ/` vs `/iː/` (*ship*/*sheep*) | A1 |
| **Accent tonique** | Mobile et distinctif (`REcord` n. / `reCORD` v.) — un francophone accentue la finale par défaut | A1–A2, très sous-estimé |
| **Present perfect** | Aucun équivalent français direct ; confondu avec le passé composé | B1 |
| **Phrasal verbs** | `get up`, `get over`, `get by` — opaques, très fréquents | B1–B2 |
| **Faux-amis** | `actually`, `eventually`, `library`, `sensible` | Continu |

#### Progression

| Niveau | Objectif | Grammaire pivot | Lexique |
|--------|----------|-----------------|---------|
| **A1** | Se présenter, besoins immédiats | Présent simple / continu, `to be`, articles, pluriels | 500–700 |
| **A2** | Routines, descriptions, passé simple | Prétérit, `will` / `going to`, comparatifs, modaux de base | 1 000–1 500 |
| **B1** | Expériences, opinions, voyage | **Present perfect**, conditionnels 0–2, passif | 2 000–2 500 |
| **B2** | Argumentation, médias | Temps narratifs, discours rapporté, modaux de déduction | 3 000–4 000 |

**Variante** : l'app utilise `en-GB`. Signaler les écarts US/UK en `culture` (orthographe `-ise`/`-ize`, lexique) sans dédoubler le contenu.

#### Consignes `aiSeedPrompt`
Aide de prononciation à la française · **marquer l'accent tonique** (ex. `TOmato`) · signaler les faux-amis · attaquer explicitement `th`, `h` et `r`.

---

### 3.3 Allemand `de`

> **Programme détaillé** : [programmes/allemand.md](programmes/allemand.md).

#### Difficultés réelles pour un francophone
La difficulté allemande n'est pas le lexique (proche de l'anglais, donc partiellement transparent) mais **l'architecture de la phrase**.

| Obstacle | Détail | Priorité |
|----------|--------|----------|
| **Genre des noms** | 3 genres (`der`/`die`/`das`), largement imprévisible, et **conditionne toute la déclinaison** | A1 — le point n°1 |
| **Déclinaisons** | 4 cas (nominatif, accusatif, datif, génitif) × 3 genres × pluriel | A1 → B1, par paliers |
| **Position du verbe** | Verbe en 2ᵉ position en principale, **en dernier en subordonnée** | A2 |
| **Verbes à particule séparable** | `aufstehen` → `ich **stehe** früh **auf**` | A2 |
| **Mots composés** | `Geschwindigkeitsbegrenzung` — à décomposer, pas à mémoriser | B1 |

#### Progression

| Niveau | Objectif | Grammaire pivot | Certification |
|--------|----------|-----------------|---------------|
| **A1** | Se présenter, acheter | Présent, **genre + nominatif/accusatif**, verbes forts fréquents | Goethe A1 (*Start Deutsch 1*) |
| **A2** | Quotidien, passé | **Datif**, parfait (`haben`/`sein`), verbes séparables, prépositions mixtes | Goethe A2 |
| **B1** | Autonomie, opinions | Subordonnées (`weil`, `dass`, `wenn`) + **verbe final**, prétérit, génitif, comparatifs | Goethe B1 / *Zertifikat Deutsch* |
| **B2** | Argumentation | Passif, `Konjunktiv II`, groupes nominaux complexes, connecteurs | Goethe B2 / TestDaF |

**Méthode** : n'apprendre **aucun nom sans son article**. Le genre doit être stocké avec le mot dans le vocabulaire statique, pas déduit à l'affichage.

#### Consignes `aiSeedPrompt`
Toujours donner l'article (`der`/`die`/`das`) et le pluriel · signaler le cas employé et pourquoi · introduire les déclinaisons **progressivement** (nominatif → accusatif → datif → génitif), jamais en tableau complet.

---

### 3.4 Russe `ru`

> **Programme détaillé** : [programmes/russe.md](programmes/russe.md).

#### Difficultés réelles pour un francophone

| Obstacle | Détail | Priorité |
|----------|--------|----------|
| **Cyrillique** | 33 lettres — **s'apprend en ~10 h**, faux obstacle. Piège : les « faux amis graphiques » (`Р`=r, `Н`=n, `В`=v, `С`=s) | A1, semaine 1 |
| **Aspect verbal** | Perfectif / imperfectif — **la vraie difficulté**, sans équivalent français, présente dans chaque phrase | A2 → B2, continu |
| **6 cas** | Nominatif, accusatif, génitif, datif, instrumental, prépositionnel × 3 genres × pluriel | A1 → B1 |
| **Accent tonique mobile et non noté** | `замо́к` (serrure) / `за́мок` (château) ; il conditionne la réduction vocalique (*akanye*) | A1, continu |
| **Verbes de mouvement** | `идти`/`ходить`, + préfixes — système entier sans équivalent | B1 |
| **Absence de « être » au présent** | `Я студент` = « je [suis] étudiant » | A1 |

#### Progression

| Niveau | Objectif | Grammaire pivot | Certification (ТРКИ/TORFL) |
|--------|----------|-----------------|---------------------------|
| **A1** | Alphabet, se présenter | Genre, présent, **prépositionnel + accusatif**, absence de copule | ТЭУ (Élémentaire) |
| **A2** | Quotidien, passé | Passé (accord en genre), **génitif**, datif, **introduction de l'aspect** | ТБУ (Base) |
| **B1** | Autonomie | 6 cas au pluriel, aspect systématisé, **verbes de mouvement**, impératif | ТРКИ-1 |
| **B2** | Argumentation | Participes, gérondifs, subordination complexe, registres | ТРКИ-2 |

**Méthode** : le cyrillique **avant tout le reste** — la translittération latine doit rester une aide temporaire (A1 uniquement), sinon elle fossilise une lecture erronée. L'`aiSeedPrompt` actuel demande systématiquement la translittération : la faire **décroître** avec le niveau.

#### Consignes `aiSeedPrompt`
Cyrillique + translittération (A1) puis cyrillique seul · **marquer l'accent tonique** (`молоко́`) systématiquement · indiquer le cas et sa raison · pour chaque verbe, donner **la paire aspectuelle**.

---

### 3.5 Arabe `ar`

> **Programme détaillé** : voir [programmes/arabe.md](programmes/arabe.md) (lecture, phonétique, expression orale ; recherche dans [docs/recherche-arabe/](docs/recherche-arabe/)). Cette fiche en reste le résumé.

#### Le problème central : la diglossie

L'arabe n'est pas une langue mais un **continuum** : l'**arabe standard moderne (MSA / الفصحى)** sert à l'écrit, aux médias et au formel ; **personne ne le parle spontanément**. Les échanges quotidiens se font en **dialecte** (égyptien, maghrébin, levantin, golfe), mutuellement peu intelligibles à distance.

> **État de l'application** : `ttsLang: 'ar-SA'`, drapeau 🇸🇦, `aiSeedPrompt` et vocabulaire statique **entièrement en MSA vocalisé**. L'app enseigne donc **le MSA seul**. C'est un choix défendable (une seule norme, écrite, celle des médias et des textes), mais il doit être **assumé et énoncé à l'utilisateur** : un apprenant qui atteint « Avancé » ne pourra pas converser spontanément à Casablanca ou au Caire. Voir § 4.4.

#### Difficultés réelles pour un francophone

| Obstacle | Détail | Priorité |
|----------|--------|----------|
| **Écriture** | 28 lettres, **4 formes positionnelles** par lettre, droite-à-gauche, ligatures | A1 — déjà bien traité par [AlphabetScreen.tsx](src/screens/AlphabetScreen.tsx) |
| **Voyelles brèves non écrites** | Un texte réel n'est pas vocalisé : `كتب` = *kataba* / *kutiba* / *kutub* | A2 → B1, **transition à préparer** |
| **Phonèmes absents du français** | ع (ʿayn), ح (ḥāʾ), ق (qāf), غ (ghayn), خ (khāʾ), emphatiques ص ض ط ظ | A1, continu |
| **Racines trilitères** | ك-ت-ب → كتاب (livre), مكتب (bureau), كاتب (écrivain) | **Atout majeur** : à exploiter comme accélérateur lexical dès A2 |
| **Phrase nominale** | Pas de verbe « être » au présent : `البيت كبير` = « la maison [est] grande » | A1 |
| **Duel + pluriel brisé** | Un nombre grammatical supplémentaire ; pluriels irréguliers à mémoriser | A2 |

#### Progression (MSA)

| Niveau | Objectif | Contenu pivot |
|--------|----------|---------------|
| **A1** | Lire l'alphabet, saluer, se présenter | 28 lettres et formes positionnelles, voyelles brèves, phrase nominale, 300 mots, chiffres |
| **A2** | Décrire, raconter simplement | Verbe à l'accompli/inaccompli, pronoms suffixes, `إضافة` (annexion), 800 mots |
| **B1** | Lire un texte court, donner un avis | **Passage au texte non vocalisé**, racines et schèmes, formes verbales dérivées (II, III, V…), 1 500 mots |
| **B2** | Presse, argumentation | Voix passive, `إعراب` (cas), connecteurs du discours écrit, 3 000 mots |

**Deux jalons méthodologiques :**
1. **Vocalisation dégressive** — texte entièrement vocalisé (A1) → vocalisation partielle des ambiguïtés (A2) → texte nu (B1). Le vocabulaire statique actuel est vocalisé : prévoir le champ non vocalisé pour la suite.
2. **Racines dès A2** — présenter les mots par famille de racine multiplie le rendement lexical. C'est le levier le plus rentable en arabe et il n'est pas encore exploité par les catégories thématiques plates.

#### Consignes `aiSeedPrompt`
Arabe **vocalisé** + translittération + français · nommer la racine trilitère quand elle est éclairante · attaquer explicitement ع ح ق غ خ · préciser que le registre enseigné est le MSA.

---

### 3.6 Mandarin `zh`

> **Programme détaillé** : [programmes/mandarin.md](programmes/mandarin.md).

#### Difficultés réelles pour un francophone

| Obstacle | Détail | Priorité |
|----------|--------|----------|
| **4 tons + ton neutre** | Distinctifs : mā 妈 (mère) / má 麻 (chanvre) / mǎ 马 (cheval) / mà 骂 (insulter) | A1 — **avant tout le reste** |
| **Sandhi tonal** | Deux 3ᵉ tons consécutifs → 2ᵉ + 3ᵉ (`nǐ hǎo` → `ní hǎo`) ; variations de 不 et 一 | A1–A2 |
| **Caractères** | Pas d'alphabet ; ~2 500 caractères pour lire un journal | Continu, par **clés et composants** |
| **Classificateurs** | 个, 本, 张, 只… obligatoires avec les nombres | A1 |
| **Aspect, pas temps** | 了 / 过 / 着 — l'app doit éviter d'expliquer 了 comme « le passé » | A2 |
| **Absence de conjugaison** | Aucune flexion : **avantage** réel, à souligner pour rassurer | A1 |

#### Progression alignée HSK

Le code n'expose pas de « tracker HSK » ; le HSK sert ici de **référentiel de volume**, pas de fonctionnalité.

| HSK 2.0 | Vocabulaire | Caractères | CEFR *réaliste* | Objectif |
|---------|-------------|------------|-----------------|----------|
| 1 | 150 | ~150 | A1 | Pinyin, 4 tons, se présenter, compter |
| 2 | 300 | ~300 | A1+/A2 | Transactions simples, 了 de base |
| 3 | 600 | ~600 | A2/B1 | Quotidien, voyage, comparaisons |
| 4 | 1 200 | ~1 000 | B1/B2 | Sujets abstraits, presse avec effort |
| 5 | 2 500 | ~1 500 | B2 | Journaux, films, correspondance |
| 6 | 5 000+ | ~2 500 | B2+/C1 | Académique, 成语 (chengyu) |

> **Correction d'une idée reçue** : l'équivalence officielle « HSK 6 = C2 » est très optimiste. En pratique, HSK 6 correspond à un **B2 solide, C1 en réception**. Ne pas promettre C2.

**HSK 3.0** (publié en 2021, 9 niveaux en 3 bandes : 1–3 fondamental, 4–6 développement, 7–9 perfectionnement ; jusqu'à ~11 000 mots et 3 000 caractères) est la norme de référence pour les nouveaux contenus, mais le HSK 2.0 reste plus lisible pour un apprenant francophone débutant.

**Méthode** : pinyin et tons **avant** les caractères (2–3 semaines) ; puis caractères par **clés/composants** (氵 = eau, 木 = arbre) plutôt que par traits isolés ; reconnaissance avant écriture manuscrite.

#### Consignes `aiSeedPrompt`
Caractères + **pinyin accentué** (`nǐ hǎo`, jamais `ni hao`) + français · signaler le sandhi quand il s'applique · donner le classificateur avec chaque nom · expliquer 了 comme aspect, jamais comme temps.

---

### 3.7 Japonais `ja`

> **Programme détaillé** : [programmes/japonais.md](programmes/japonais.md).

#### Difficultés réelles pour un francophone

| Obstacle | Détail | Priorité |
|----------|--------|----------|
| **Trois écritures simultanées** | Hiragana (46, grammaire), katakana (46, emprunts), kanji (~2 136 *jōyō*) | A1 → continu |
| **Syntaxe SOV + particules** | は / が / を / に / で / へ — **la particule porte la fonction**, l'ordre est souple | A1 — le point n°1 |
| **は vs が** | Thème vs sujet ; distinction sans équivalent français, source d'erreurs durable | A2 → B1 |
| **Niveaux de politesse** | 丁寧語 (*teineigo*), 尊敬語, 謙譲語 — le choix est **obligatoire** à chaque phrase | A1 (`-masu`) → B2 (keigo) |
| **Compteurs** | 本, 枚, 匹, 人… variables selon la forme de l'objet | A1–A2 |
| **Lectures multiples des kanji** | *on'yomi* (sino-japonaise) / *kun'yomi* (japonaise) selon le contexte | A2 → continu |

**Bonne nouvelle** : la phonologie japonaise est **simple pour un francophone** (5 voyelles proches, syllabes ouvertes). C'est l'écriture et la pragmatique qui coûtent, pas la prononciation.

#### Progression alignée JLPT

| JLPT | Vocabulaire | Kanji | CEFR *réaliste* | Objectif |
|------|-------------|-------|-----------------|----------|
| **N5** | ~800 | ~100 | A1 | Kana complets, `desu/masu`, particules de base |
| **N4** | ~1 500 | ~300 | A2 | Forme neutre, forme en `-te`, passé, potentiel |
| **N3** | ~3 750 | ~650 | B1 | Causatif, passif, conditionnels, keigo simple |
| **N2** | ~6 000 | ~1 000 | B2 | Presse, keigo complet, nuances écrites |
| **N1** | ~10 000 | ~2 000 | B2+/C1 | Académique, littéraire, registres |

**Méthode** : hiragana → katakana (2 semaines, avant tout le reste) → kanji par radicaux, avec **reconnaissance avant production**. Le rōmaji doit disparaître dès la fin de A1 : maintenu, il empêche la lecture.

#### Consignes `aiSeedPrompt`
Japonais **avec kanji + furigana**, rōmaji en A1 seulement · signaler la particule et sa fonction · préciser le niveau de politesse employé · donner le compteur adapté.

---

### 3.8 Coréen `ko`

> **Programme détaillé** : [programmes/coreen.md](programmes/coreen.md).

> Le champ `difficulty: 'medium'` sous-estime le coréen : le **hangeul s'apprend en quelques heures** (d'où l'impression de facilité), mais syntaxe, politesse et lexique sino-coréen le placent au même niveau d'effort que le japonais. À corriger en `hard` (§ 5.6).

#### Difficultés réelles pour un francophone

| Obstacle | Détail | Priorité |
|----------|--------|----------|
| **Hangeul** | 24 lettres de base assemblées en **blocs syllabiques** — alphabet logique, très rapide à acquérir | A1, semaine 1 |
| **Batchim (consonne finale)** | Modifie la prononciation du bloc suivant (assimilations, liaisons) | A1 — sous-estimé |
| **Syntaxe SOV + particules** | 은/는, 이/가, 을/를, 에/에서 | A1 |
| **Niveaux de politesse** | 해요체 / 합쇼체 / 반말 — choix obligatoire, conditionné par l'âge et le statut | A1 → continu |
| **Double lexique** | Mots natifs coréens **et** sino-coréens, avec deux systèmes de numération concurrents | A1–A2 |
| **Consonnes tendues/aspirées** | ㄱ/ㄲ/ㅋ — triple opposition inaudible pour une oreille francophone | A1, continu |

#### Progression alignée TOPIK

| TOPIK | Niveau | CEFR *réaliste* | Objectif |
|-------|--------|-----------------|----------|
| **I — 1** | Débutant | A1 | Hangeul, 해요체, particules de base, ~800 mots |
| **I — 2** | Élémentaire | A2 | Passé/futur, connecteurs, ~1 500–2 000 mots |
| **II — 3** | Intermédiaire | B1 | Registres, subordination, ~4 000 mots |
| **II — 4** | Intermédiaire + | B1+/B2 | Sujets abstraits, médias |
| **II — 5–6** | Avancé | B2/C1 | Académique, professionnel, hanja de base |

#### Consignes `aiSeedPrompt`
Hangeul + romanisation révisée (A1) + français · **expliciter le niveau de politesse** de chaque phrase · signaler les changements de prononciation dus au batchim · distinguer numération native et sino-coréenne.

---

### 3.9 Vietnamien `vi`

> **Programme détaillé** : [programmes/vietnamien.md](programmes/vietnamien.md).

#### Difficultés réelles pour un francophone

| Obstacle | Détail | Priorité |
|----------|--------|----------|
| **6 tons** (Nord) | Distinctifs — une erreur de ton n'est pas un accent, c'est **un autre mot** | A1 — **absolument prioritaire** |
| **Voyelles et consonnes finales** | ơ / ư / â / ă absents du français ; finales non relâchées (`-c`, `-t`, `-p`) | A1 |
| **Pronoms relationnels** | Pas de « je / tu » neutre : `tôi`, `em`, `anh`, `chị`, `bác`… selon l'âge et le lien | A1 — culturellement obligatoire |
| **Classificateurs** | `cái`, `con`, `chiếc`, `quyển`… | A1–A2 |
| **Aucune conjugaison** | Temps par marqueurs (`đã`, `đang`, `sẽ`) — **avantage réel** à souligner | A1 |

#### Les six tons (dialecte du Nord / Hanoï)

| Ton | Signe | Contour | Exemple |
|-----|-------|---------|---------|
| `ngang` | *aucun* | Moyen, plat | **ma** — fantôme |
| `huyền` | ` (grave) | Bas, descendant | **mà** — mais |
| `sắc` | ´ (aigu) | Haut, montant | **má** — maman / joue |
| `hỏi` | ̉ (crochet) | Descendant puis remontant | **mả** — tombe |
| `ngã` | ˜ (tilde) | Montant, brisé par un coup de glotte | **mã** — cheval / code |
| `nặng` | ̣ (point souscrit) | Bas, bref, constricté | **mạ** — jeune plant de riz |

> Le **dialecte du Sud (Saigon) fusionne `hỏi` et `ngã`** : 5 tons. L'app utilise `vi-VN` et l'alphabet tonal du Nord ([languages.ts](src/lib/languages.ts)) — norme unique et cohérente, à conserver.

#### Progression

| Niveau | Objectif | Contenu pivot |
|--------|----------|---------------|
| **A1** | Produire les 6 tons, saluer, se présenter | Quốc ngữ + diacritiques, **paires minimales tonales**, pronoms relationnels, SVO, 300 mots |
| **A2** | Quotidien, marqueurs temporels | `đã`/`đang`/`sẽ`, classificateurs, questions (`không`, `à`, `nhé`), 800 mots |
| **B1** | Autonomie, récit | Particules modales, comparaisons, subordination, 1 500 mots |
| **B2** | Opinion, médias | Structures complexes, idiomes, registres, 3 000 mots |

**Méthode** : deux semaines d'**immersion tonale** avant toute grammaire — écoute, discrimination de paires minimales, production enregistrée et comparée. [VocabAudioRecorder.tsx](src/components/VocabAudioRecorder.tsx) et `invokeAIWithAudio` sont les briques adaptées ; c'est en vietnamien qu'elles ont le plus de valeur.

#### Consignes `aiSeedPrompt`
Vietnamien **toujours avec tous les diacritiques** (`Xin chào`, jamais `Xin chao`) · nommer le ton de chaque syllabe nouvelle · proposer la paire minimale contrastive · expliquer le pronom relationnel choisi et pourquoi.

---

### 3.10 Index des programmes détaillés

| Langue | Programme | Recherche |
|--------|-----------|-----------|
| Arabe | [arabe.md](programmes/arabe.md) | [recherche-arabe](docs/recherche-arabe/) |
| Espagnol | [espagnol.md](programmes/espagnol.md) | [recherche-espagnol](docs/recherche-espagnol/) |
| Italien | [italien.md](programmes/italien.md) | [recherche-italien](docs/recherche-italien/) |
| Portugais | [portugais.md](programmes/portugais.md) | [recherche-portugais](docs/recherche-portugais/) |
| Anglais | [anglais.md](programmes/anglais.md) | [recherche-anglais](docs/recherche-anglais/) |
| Allemand | [allemand.md](programmes/allemand.md) | [recherche-allemand](docs/recherche-allemand/) |
| Russe | [russe.md](programmes/russe.md) | [recherche-russe](docs/recherche-russe/) |
| Mandarin | [mandarin.md](programmes/mandarin.md) | [recherche-mandarin](docs/recherche-mandarin/) |
| Japonais | [japonais.md](programmes/japonais.md) | [recherche-japonais](docs/recherche-japonais/) |
| Coréen | [coreen.md](programmes/coreen.md) | [recherche-coreen](docs/recherche-coreen/) |
| Vietnamien | [vietnamien.md](programmes/vietnamien.md) | [recherche-vietnamien](docs/recherche-vietnamien/) |

Chaque programme suit la même structure : références **vérifiées** (Perplexity, avec sources) et références écartées, décisions justifiées, niveau de confiance par affirmation, obstacles du francophone avec paires minimales, progression par unités A1 → B1, volumes, brief IA, limites.

---

## 4. Écarts constatés entre ce cadre et le code

Points vérifiés dans le code au moment de la rédaction. Classés par impact pédagogique décroissant.

### 4.1 ✅ ~~Le niveau de l'apprenant n'est jamais transmis à l'IA~~ — corrigé (§ 5.1)

**C'est l'écart le plus important : le principe i+1 (§ 1.2) n'est pas implémenté.**

`LanguageProgress.level` est bien calculé et stocké, mais il n'est utilisé **que** pour afficher la barre d'XP ([HomeScreen.tsx:245](src/screens/HomeScreen.tsx#L245)). Tous les prompts IA supposent un débutant, en dur :

- [ConversationScreen.tsx:262](src/screens/ConversationScreen.tsx#L262) et [:266](src/screens/ConversationScreen.tsx#L266) — `(débutant en ${language.familiarName})`
- [WritingScreen.tsx:309](src/screens/WritingScreen.tsx#L309) — `'Propose un exercice pour débutant.'`
- [quiz.ts](src/lib/quiz.ts) `generateAIQuiz` — `pour un débutant`

**Conséquence** : un apprenant à 1 500 XP reçoit exactement le même contenu qu'au premier jour. La progression affichée est décorative. Correction : § 5.1.

### 4.2 🔴 Quatre langues sur onze n'ont aucun contenu hors ligne

`VOCAB_BY_LANG` ([multilingualVocab.ts:847](src/data/multilingualVocab.ts#L847)) ne couvre que `ar`, `es`, `zh`, `ja`, `de`, `vi`, `en`. Pour **`it`, `pt`, `ru`, `ko`** : écran Vocabulaire vide, quiz local impossible (`hasLocalQuiz` → `false`), aucune carte de révision amorçable sans IA.

Ces langues dépendent donc à 100 % du réseau et des 150 crédits IA — alors que l'application revendique un mode hors ligne. **Un utilisateur qui choisit le coréen à l'onboarding tombe sur une app vide.**

### 4.3 🟠 Les erreurs ne sont pas séparées par langue ni par profil

Les cours (`@maa_courses_${profileId}_${languageCode}`) et les révisions (`reviewStorageKey`) sont correctement scopés. **`useErrorTracker` ne l'est pas** : clé globale `@maa_error_tracker_v2` ([useErrorTracker.ts:4](src/lib/useErrorTracker.ts#L4)).

**Conséquence** : les erreurs d'arabe d'un enfant alimentent les exercices adaptatifs d'espagnol d'un autre profil. Le mécanisme de rétroaction corrective (§ 1.4) — la meilleure idée pédagogique de l'app — est donc bruité dès qu'il y a deux langues ou deux profils.

### 4.4 🟠 Les normes enseignées ne sont pas énoncées à l'utilisateur

L'app fait des choix de norme parfaitement défendables mais **silencieux** :

| Langue | Norme réellement enseignée | Ce que l'utilisateur croit apprendre |
|--------|---------------------------|--------------------------------------|
| Arabe | **MSA seul** (`ar-SA`, vocabulaire vocalisé) | « l'arabe » — donc, pour beaucoup, le dialecte parlé |
| Portugais | **Brésilien** (`pt-BR`, 🇧🇷) | « le portugais » |
| Espagnol | **Castillan** (`es-ES`) | « l'espagnol » |
| Anglais | **Britannique** (`en-GB`) | « l'anglais » |

Le cas arabe est le plus sensible : c'est la langue historique du projet, et un apprenant MSA ne pourra pas tenir une conversation informelle dans un pays arabe. **Recommandation : une ligne d'information à l'onboarding et dans le profil**, pas un choix de variante (qui doublerait le contenu à produire).

### 4.5 🟠 Les catégories plafonnent à A1

`COMMON_CATEGORIES` couvre les domaines A1 et sert de socle aux quiz **et** aux thèmes de conversation. Un apprenant `advanced` converse donc encore sur « Couleurs » et « Animaux ». Voir § 2.6 pour les paliers A2/B1 à ajouter.

De plus, `VocabEntry` n'a **aucun champ de niveau** : impossible de filtrer le vocabulaire par palier même si les mots existaient.

### 4.6 🟡 Le système de Leitner remet à zéro trop brutalement

`answer(id, known)` fait retomber une carte de la boîte 5 à la **boîte 1** sur un seul échec ([useReviewDeck.ts](src/lib/useReviewDeck.ts)). Un mot maîtrisé depuis un mois, raté une fois par inattention, repart de zéro — c'est démotivant et inefficace.

De plus, la réponse est **binaire** (`known: boolean`) : pas de distinction entre « hésité » et « aucune idée ».

### 4.7 🟡 Seuils d'XP identiques quelle que soit la difficulté

300 et 1 000 XP pour tous, alors que le champ `difficulty` existe et que l'écart d'effort réel va de 1 à 3 (§ 1.6). « Avancé » en italien et « Avancé » en japonais ne décrivent pas la même chose.

### 4.8 🟡 Champs hérités du mono-langue arabe

Dans [useCourses.ts](src/lib/useCourses.ts), les cours d'une app à 11 langues portent encore :

```ts
arabic_words: { arabic: string; transliteration: string; meaning: string }[];
// et
export interface CourseExample { arabic: string; /* ... */ }
```

Fonctionnellement inoffensif (le contenu est bien dans la langue active), mais c'est un piège pour toute évolution du prompt et pour toute relecture. À renommer `target_words` / `native`.

### 4.9 🟡 Badges agrégés toutes langues confondues

`computeBadges` somme `vocab_learned` sur toutes les langues : « 100 mots » peut être obtenu avec 20 mots dans 5 langues. Cohérent pour un badge « Polyglotte », discutable pour un badge de maîtrise lexicale.

---

## 5. Recommandations d'implémentation

Classées par rapport valeur / effort.

### 5.1 Injecter le niveau dans tous les prompts IA — *fait*

Implémenté dans [pedagogy.ts](src/lib/pedagogy.ts), en **deux couches** — un cadre générique par niveau, croisé avec la progression propre à chaque langue (11 langues × 3 niveaux, dérivées du § 3) :

```ts
// Couche 1 : ce que le niveau impose, quelle que soit la langue
const LEVEL_FRAME: Record<Level, string>
// Couche 2 : ce que CETTE langue travaille à CE niveau
const LANGUAGE_PROGRESSION: Record<string, Record<Level, string>>

export function levelBrief(level, language): string  // conversation, écriture, cours
export function levelTag(level, language): string    // quiz (version compacte)
```

Sans la couche 2, un A1 en arabe — qui déchiffre encore l'alphabet et travaille la phrase nominale — recevrait la même consigne qu'un A1 en espagnol, qui construit déjà des phrases. Exemples de ce que la couche 2 impose au niveau `beginner` : arabe → texte **toujours vocalisé** ; russe → **accent tonique marqué** sur chaque mot ; mandarin → pinyin accentué + classificateur systématique ; vietnamien → tous les diacritiques + ton nommé pour chaque syllabe nouvelle ; allemand → **jamais un nom sans son article**.

Branché sur **six sites de génération** : Conversation (démarrage, exercice, tour de parole, cours dérivé), Écriture (génération et correction d'exercice), Cours (question libre et cours ciblé), Quiz (`generateAIQuiz` prend désormais le niveau). Plus aucun `débutant` codé en dur.

**Corrigé au passage** : `getErrorsForAIPrompt()` renvoyait un contexte mentionnant « Fatima » en dur — reliquat de l'app mono-utilisateur — et reverrouillait le niveau sur débutant. Il prend maintenant le prénom du profil actif et ne prescrit plus de niveau, laissant `levelBrief` seul maître du calibrage.

### 5.2 Compléter le vocabulaire statique — *priorité 1*

Produire `IT`, `PT`, `RU`, `KO` sur le même modèle que les sept existants : 10 catégories × 10 mots = 100 entrées par langue. Format identique (`native_word`, `transliteration`, `french_translation`, `category`), avec :

- **`ru`** — cyrillique + translittération + **accent tonique noté** (`молоко́`) ;
- **`ko`** — hangeul + romanisation révisée ;
- **`pt`** — norme brésilienne, cohérente avec `pt-BR` ;
- **`it`** — marquer les consonnes doubles dans l'aide de prononciation.

Sans cela, quatre langues du sélecteur d'onboarding ne tiennent pas leur promesse.

### 5.3 Scoper le suivi des erreurs — *priorité 2*

Aligner `useErrorTracker` sur le modèle déjà employé par les cours et les révisions :

```ts
export function errorStorageKey(profileId: string | undefined, langCode: string): string {
  return `@maa_errors_${profileId ?? 'default'}_${langCode}`;
}
// puis : useErrorTracker(errorStorageKey(activeProfile?.id, language.code))
```

Prévoir une migration douce depuis `@maa_error_tracker_v2` (ou l'abandonner : les erreurs sont des données de travail, pas un historique précieux).

### 5.4 Assouplir la répétition espacée — *priorité 2*

Deux ajustements, tous deux dans `answer` :

1. **Échec = reculer d'une boîte, pas retomber à 1** :
   `const newBox = known ? Math.min(c.box + 1, MAX_BOX) : Math.max(c.box - 1, 1);`
2. **Trois réponses au lieu de deux** (`'again' | 'hard' | 'good'`) : `again` → boîte 1, `hard` → boîte inchangée (revue à J+1), `good` → boîte + 1. C'est le minimum pour approcher un comportement de type SM-2 sans en payer la complexité.

### 5.5 Taguer le vocabulaire par niveau — *priorité 3*

Ajouter un champ optionnel à `VocabEntry`, rétro-compatible :

```ts
export interface VocabEntry {
  native_word: string;
  transliteration: string;
  french_translation: string;
  category: string;
  level?: 'A1' | 'A2' | 'B1';   // défaut : 'A1'
}
```

Il devient alors possible de filtrer les quiz et les révisions par palier, et d'ouvrir les catégories A2/B1 de la § 2.6 sans noyer un débutant.

### 5.6 Pondérer les seuils d'XP par difficulté — *priorité 3*

```ts
const LEVEL_FACTOR = { easy: 1, medium: 1.5, hard: 2.2 } as const;
// intermediate : 300 × facteur ; advanced : 1000 × facteur
```

Le facteur reflète les ordres de grandeur de la § 1.6. Corriger au passage `difficulty` pour `ko` (`medium` → `hard`) et `ru` (`hard` → `medium`).

### 5.7 Reformuler les thèmes de conversation en tâches — *priorité 3*

Aujourd'hui les thèmes sont les catégories lexicales telles quelles ([ConversationScreen.tsx:109](src/screens/ConversationScreen.tsx#L109)). Les convertir en tâches actionnelles (§ 1.3) sans changer la structure de données : il suffit d'un libellé de tâche par catégorie et par niveau.

| Catégorie | Tâche A1 | Tâche A2 | Tâche B1 |
|-----------|----------|----------|----------|
| `food` | Commander une boisson | Commander un repas et demander l'addition | Expliquer une allergie, se plaindre d'un plat |
| `travel` | Demander son chemin | Acheter un billet, comprendre un horaire | Gérer un train raté, réclamer |
| `family` | Nommer les membres de sa famille | Décrire sa famille et ses habitudes | Raconter un souvenir d'enfance |

### 5.8 Architecture audio — *fait*

La chaîne audio est centralisée et repose sur trois modules :

| Module | Rôle |
|--------|------|
| [speech.ts](src/lib/speech.ts) | Résolution de voix (`getAvailableVoicesAsync`), débit par langue, arrêt avant relecture, session audio iOS |
| [useSpeaker.ts](src/lib/useSpeaker.ts) | Hook écran : `say` / `saySlow`, état de lecture, nettoyage au démontage, avertissement si aucune voix installée |
| [audioCapture.ts](src/lib/audioCapture.ts) | Enregistrement calibré voix (16 kHz mono), garde-fous de durée, type MIME |
| [pronunciation.ts](src/lib/pronunciation.ts) | Évaluation notée contre une cible connue + rubrique de pièges francophones par langue |

**Deux principes structurants :**

1. **Débit dépendant de la langue.** Ralentir une langue à tons dégrade l'information : le contour tonal synthétisé s'étire et devient perceptivement faux. `vi` et `zh` ne descendent pas sous 0,78 ; `ar` descend à 0,55. Un débit unique de 0,85 pour toutes les langues, comme avant, était pédagogiquement neutre au mieux, nuisible au pire.

2. **Évaluer contre une cible connue.** En Conversation, l'IA ignore ce que l'élève voulait dire : elle ne peut pas juger sa prononciation, seulement la commenter. Sur un mot de vocabulaire, la cible est connue — le diagnostic devient fiable et notable. C'est pourquoi l'évaluation est branchée sur Vocabulaire et Révisions, pas seulement sur la Conversation.

**Économie de crédits** : enregistrer et se réécouter reste gratuit et hors ligne (la répétition est le cœur de l'entraînement) ; seule l'évaluation IA, déclenchée explicitement, coûte un crédit.

### 5.9 Parcours d'apprentissage — *fait*

Implémenté à partir des programmes détaillés ([programmes/](programmes/)) :

| Élément | Fichier |
|---------|---------|
| Unités des 11 langues (arabe 25, espagnol 19, mandarin 20, japonais 21, allemand 18, italien 17, portugais 18, russe 22, coréen 20, vietnamien 18, anglais 20) | [learningPath.ts](src/data/learningPath.ts) |
| Progression par profil et par langue, récompense d'unité, synchronisation du niveau | [usePathProgress.ts](src/lib/usePathProgress.ts) |
| Écran du parcours complet | [PathScreen.tsx](src/screens/PathScreen.tsx) |
| Accueil recentré sur l'unité en cours | [HomeScreen.tsx](src/screens/HomeScreen.tsx) |
| Test de lecture local sur les lettres d'une unité | `generateLetterQuiz` dans [quiz.ts](src/lib/quiz.ts) |

**Règles de validation d'une étape** : quiz ≥ 60 % ; test de lecture ≥ 75 % ; dialogue après 2 tours de l'élève ; lecture et mots : étape visitée. Une unité terminée rapporte 20 XP.

**Le niveau n'est plus déduit de l'XP** : il suit l'unité en cours (A1, A2, B1) et pilote le contenu généré par l'IA via [pedagogy.ts](src/lib/pedagogy.ts). C'était l'écart du § 4.7 (seuils d'XP identiques pour toutes les langues).

**Écriture manuscrite supprimée** (écran, onglet, carte d'accueil) : un tracé tactile n'est pas viable sur un écran de téléphone. La **lecture** est conservée (écran Alphabet, test de lecture).

**Lacunes connues** : signes de l'arabe (shadda, tanwīn, hamza) et fading du voyellage (L11-L18), katakana et kanji, finales du pinyin — absents des données, donc absents du parcours.

### 5.10 Évaluation de positionnement — *priorité 4*

L'onboarding ([OnboardingScreen.tsx](src/screens/OnboardingScreen.tsx)) ne demande que nom, avatar et langue : tout le monde démarre à zéro XP, y compris un faux débutant. Un test court (8–10 items, réutilisant `generateLocalQuiz`) permettrait d'initialiser `xp_points` et `level`. À ne faire **qu'après** la § 5.1 — positionner un apprenant n'a d'intérêt que si le contenu s'adapte ensuite.

---

## 6. Références

### Cadres officiels
- **CEFR** — Conseil de l'Europe, *Common European Framework of Reference for Languages* et *Companion Volume* (2018/2020) · [coe.int](https://www.coe.int/en/web/common-european-framework-reference-languages/level-descriptions)
- **HSK** — Chinese Testing International ; HSK 2.0 (6 niveaux) et HSK 3.0 (9 niveaux, publié en 2021)
- **JLPT** — Japan Foundation / JEES, niveaux N5 → N1
- **TOPIK** — NIIED, TOPIK I (1–2) et TOPIK II (3–6)
- **ТРКИ / TORFL** — Système d'État russe, ТЭУ → ТРКИ-4
- **Goethe-Zertifikat / TestDaF** — Allemand · **DELE / SIELE** — Espagnol · **CILS / CELI / PLIDA** — Italien · **Celpe-Bras / CAPLE** — Portugais
- **FSI** — *Foreign Service Institute*, catégories de difficulté et volumes horaires

### Recherche en acquisition
- **Krashen, S.** — *Principles and Practice in Second Language Acquisition* : input compréhensible, i+1, filtre affectif
- **Swain, M.** — *Output hypothesis* : le rôle de la production dans l'acquisition
- **Lyster, R. & Ranta, L.** — Typologie de la rétroaction corrective (*recast*, *prompt*, correction explicite)
- **Ellis, R. / Long, M.** — *Task-Based Language Teaching* : la tâche comme unité pédagogique
- **Leitner, S. / Ebbinghaus, H.** — Courbe d'oubli et répétition espacée par boîtes

---

## Synthèse

Le socle de l'application est solide : la boucle **erreur repérée → cours généré → révision espacée** est pédagogiquement juste et rare dans les applications grand public. Trois chantiers la rendraient pleinement effective :

1. **Transmettre le niveau à l'IA** (§ 5.1) — sans quoi la progression affichée reste cosmétique ;
2. **Compléter le hors-ligne** pour `it`, `pt`, `ru`, `ko` (§ 5.2) — quatre langues sur onze sont aujourd'hui vides sans réseau ;
3. **Séparer les erreurs par langue et par profil** (§ 5.3) — pour que la rétroaction corrective vise juste.

Le reste — paliers de catégories, pondération des seuils, tâches actionnelles — relève de l'affinage progressif du contenu, langue par langue, en s'appuyant sur les fiches de la § 3.

### 5.11 Contenu intégré — l'IA n'est plus le moteur (arabe en premier)

Le parcours d'une langue peut désormais s'appuyer sur des **leçons écrites à l'avance** (`src/content/`), jouables sans réseau, sans clé d'API et sans crédit. L'IA devient un complément : « Discuter IA » (conversation libre), « Cours IA » (cours à la demande), quiz générés.

| Élément | Fichier |
|---------|---------|
| Modèle (mots, 9 types d'exercices, leçon = 3 parties) | `src/content/types.ts` |
| Générateurs d'exercices à partir des mots d'une unité | `src/content/builders.ts` |
| Arabe : 10 unités de lecture L1-L10, 6 unités orales O1-O6 | `src/content/ar/` |
| Lecteur de leçon | `src/screens/LessonScreen.tsx` |
| Lexique unique tiré des leçons (écran Vocab, mot du jour, révision) | `src/content/lexicon.ts` |
| Audit du contenu par IA (et ce qui a été écarté) | `docs/recherche-arabe/06-audit-contenu-integre.md` |
| Visuels (6 planches de 6 images, à générer) | `docs/visuels-arabe.md` |

Une partie est validée à 70 % de réussite **au premier essai** ; les réponses fausses reviennent en fin de partie. Les autres langues gardent l'ancien parcours (vocabulaire + dialogue IA + quiz) jusqu'à la production de leur contenu.

**Arabe — état :** 33 unités intégrées (L1-L18 et O1-O15, A1 à B1), 59 photos réalistes, 28 mots-clés de lettres. L15-L17 retirent progressivement les voyelles (`ar/vowels.ts`) et ajoutent l'exercice « restaure la lecture » ; L18 traite les racines. **Toutes les langues, A1 à B1 :** 226 leçons intégrées (ar 33, es 19, it 17, pt 18, de 19, en 19, ru 22, ko 20, ja 21, zh 20, vi 18), plus aucune unité du parcours ne dépend de l'IA. Les 10 langues autres que l'arabe sont écrites avec le format compact `src/content/simple.ts` (phrases, questions-réponses, note de grammaire) et réutilisent les mêmes photos. Seul l'arabe a été relu par IA ; aucune de ces langues n'a été relue par un locuteur natif. A2 et B1 des autres langues : phrases courtes illustrant la grammaire visée, pas de textes longs ni de production libre notée.

**Quiz :** pour toutes les langues, thèmes tirés du lexique des leçons (par thème, par unité, « mon paquet », « tout mélangé »), avec questions en images et à l'oreille, sans IA ni crédit (`src/lib/quiz.ts`). **Relecture croisée par IA** du russe, coréen, japonais, mandarin et vietnamien : `docs/recherche-relecture/`.

**Reste :** relecture par un arabophone, test sur téléphone. B1 : affichage presque nu (shadda et tanwīn conservés), audio voyellé.
