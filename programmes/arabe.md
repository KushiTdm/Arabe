# Programme d'arabe pour francophones — lecture et expression orale

> **Rôle du document** : programme pédagogique de référence pour l'enseignement de l'arabe dans l'application. Il complète [methodologie.md](../methodologie.md) (cadre général, 11 langues) et le remplace pour tout ce qui touche à l'arabe.
> **Public** : adultes francophones, débutants complets, apprenant seuls sur mobile.
> **Périmètre** : lecture (A0 → B1) et expression orale (A1 → B1). L'expression écrite manuscrite reste traitée par l'écran Écriture.
> **Recherche source** : [docs/recherche-arabe/](../docs/recherche-arabe/) (5 réponses sauvegardées : Gemini, Grok, et Perplexity pour la vérification ; voir § 1.3).
> **Révision** : 12 octobre 2026.

---

## 1. Fondements

### 1.1 Spécialistes de la didactique de l'arabe pour francophones

Noms retenus quand les IA les citent. **Perplexity a vérifié les publications avec sources** (HAL, Persée, IREMAM, Wikipédia) : les cinq premiers noms et leurs ouvrages ci-dessous sont confirmés. Larcher et Neyreneuf & Al-Hakkak, cités par une seule IA, ne sont pas recoupés.

| Spécialiste | Rattachement | Apport pour ce programme |
|-------------|--------------|--------------------------|
| **Luc-Willy Deheuvels** | INALCO | *Manuel d'arabe moderne*, vol. 1-2, L'Asiathèque, 1996 ; *Méthode d'arabe. Arabe littéral*, vol. 1 (2022) et vol. 2 (2023), coll. « Langues Inalco ». Référence francophone pour un enseignement structuré. **Ce sont des manuels, pas des études expérimentales** sur l'ordre optimal des graphèmes (Perplexity). |
| **Joseph Dichy** | Lyon 2, ICAR | « La pluriglossie de l'arabe », *Bulletin d'études orientales*, t. 46, 1994, p. 19-42 ; « L'enseignement de l'arabe, langue pluriglossique, dans la France d'aujourd'hui », in *Les langues de la Méditerranée*, L'Harmattan, 2002. **Pluriglossie** : l'arabe n'est pas une diglossie binaire mais un système de « glosses » en distribution selon le contexte. Justifie de ne pas enseigner « un arabe abstrait ». |
| **Catherine Pinon** | IREMAM | **« Apprendre à lire et à écrire l'arabe : typologie des difficultés », *Les Langues Modernes*, 3/2015, p. 77-88** — l'article le plus directement utile à notre parcours Lecture ; « Gérer la charge émotionnelle liée à la langue arabe », *Lidil* 48, 2013 ; grammaire fondée sur corpus (*Cahiers de Praxématique* 54-55). |
| **Héba Medhat-Lecocq** | INALCO / PLIDAM | Direction de *Arabe standard et variations régionales. Quelle(s) politique(s) linguistique(s) ? Quelle(s) didactique(s) ?*, Archives contemporaines, 2017. Arbitrages standard / dialectes. |
| **Dominique Caubet** | INALCO, émérite | *L'Arabe marocain*, t. I-II, Peeters, 1993 ; *Les mots du bled*, L'Harmattan, 2004. Socle sur la darija et sa reconnaissance en France ; apport **sociolinguistique plus que manuel**. Les titres *L'arabe dialectal : un siècle de rencontres* et *Entre deux rives*, donnés par Gemini, ne sont pas confirmés. |
| **Pierre Larcher** | Aix-Marseille | Fondements linguistiques (syntaxe et système verbal de l'arabe classique). Influence indirecte. |
| **Neyreneuf & Al-Hakkak** | — | *Grammaire active de l'arabe* : grammaire explicite traduite pour francophones, utile aux fiches de règles. |

**Références anglophones convergentes** (citées par les deux IA) : Brustad, Al-Batal & Al-Tonsi (*Alif Baa*, *Al-Kitaab*) ; Karin Ryding (*Teaching and Learning Arabic as a Foreign Language*, *Formal Spoken Arabic*) ; Wahba, Taha & England (*Handbook for Arabic Language Teaching Professionals*) ; Munther Younes (approche communicative et continuum) ; Elinor Saiegh-Haddad (lecture et diglossie) ; Al Midhwah & Alhawary (effet des diacritiques en L2).

### 1.2 Cinq décisions qui structurent le programme

| # | Décision | Justification (convergence des sources) |
|---|----------|------------------------------------------|
| D1 | **Texte voyellé d'abord, fading ensuite** : voyellage complet → partiel → nu | Les deux IA et la littérature citée (Al Midhwah & Alhawary) : les apprenants formés avec voyelles lisent mieux, y compris sans voyelles ensuite. Consensus Deheuvels / Al-Kitaab. |
| D2 | **Lettres par familles graphiques**, non dans l'ordre alphabétique, **en commençant par les 6 non-connectantes** (ا د ذ ر ز و) | Convergence Gemini et Grok (et *Mastering Arabic*). Les non-connectantes n'ont que 2 formes et simplifient les premiers assemblages. |
| D3 | **Voyelles longues et brèves dès la première semaine**, avec drills de durée | Phonème distinctif en arabe, absent du français : sinon le francophone raccourcit les longues. |
| D4 | **Un registre oral principal : l'arabe standard parlé**, avec **ponts dialectaux** dès A1 et un **module darija** différé (§ 5.5) | Voir § 1.4. L'application n'a qu'une voix TTS arabe (`ar-SA`) : elle ne sait lire que le standard. |
| D5 | **Phonétique avant la grammaire**, 10 à 15 minutes par séance dès A1 | Les deux IA : ع ح خ غ ق et emphatiques sont les principaux obstacles du francophone ; sans pratique précoce, les erreurs se fossilisent. |

### 1.3 Niveau de confiance de la recherche

Trois IA ont été interrogées. Perplexity, la seule à citer ses sources, a servi d'**arbitre** : elle confirme les publications et **corrige à la baisse** plusieurs affirmations des deux autres.

| Affirmation | Statut |
|-------------|--------|
| Ordre d'introduction par familles, non-connectantes d'abord, voyelles longues tôt | **Pratique courante, non démontrée.** Gemini et Grok convergent, mais Perplexity : « il n'existe pas d'ordre universellement validé » pour l'arabe langue étrangère ; trois logiques coexistent (alphabétique, fréquentielle, familles graphiques) sans arbitrage expérimental chez les francophones. Notre ordre est un **choix raisonné**, à réviser sur données d'usage |
| Voyellage complet puis fading | **Principe établi, calendrier non normé.** Les voyelles aident le déchiffrement débutant ; le retrait progressif est courant. Mais les études portent surtout sur des **enfants arabophones**, pas sur des adultes francophones, et le rythme (semaines ou semestre) n'est pas fixé. Nos 34 séances de L15-L18 sont une hypothèse |
| Approche intégrée standard + dialecte | **Solide comme consensus**, mais *pas une preuve* : elle est défendue par des auteurs qui la promeuvent |
| Volumes horaires | **Aucun référentiel officiel.** Le CECRL ne fixe pas d'heures ; Perplexity ne connaît aucun référentiel faisant autorité pour l'arabe de francophones. Ses chiffres génériques (A1 90-100 h, B1 350-400 h) sont jugés « probablement optimistes » pour l'arabe. Voir § 6.1 |
| Débits de lecture (mots/minute) | **Indicatifs** : Gemini 10-15 puis 25-35 puis 45-60 ; Grok 30-50 puis 50-70 puis 60-90. Écart de 2×. On retient les seuils bas, à recalibrer sur données réelles |
| Détails attribués à Bruno Paoli, au « CIMA », à Ezzaki et Miled, à des études d'oculométrie sur francophones | **Non retenus** : affirmés par Gemini seul, aucune confirmation, probablement des confusions |

### 1.4 Le choix du registre oral

**Constat de la recherche** : l'approche intégrée (standard pour l'écrit, dialecte pour l'oral quotidien) est le consensus anglophone ; Dichy lui donne un fondement francophone (pluriglossie). Elle suppose un enseignant et des enregistrements natifs en dialecte.

**Contraintes de l'application** :
- une seule voix de synthèse arabe, `ar-SA` — aucune voix darija, égyptienne fiable ou levantine garantie sur les téléphones ;
- l'évaluation de prononciation ([pronunciation.ts](../src/lib/pronunciation.ts)) compare à une cible écrite, ce qui suppose une orthographe stable — le standard en a une, les dialectes non ;
- le contenu statique existant (alphabet, vocabulaire) est en arabe standard voyellé.

**Décision** : pour l'oral, un **arabe standard parlé simple** (Ryding : *Formal Spoken Arabic*, la variété que des Arabes de pays différents utilisent entre eux). Il est compris partout, s'écrit, se synthétise, s'évalue. Il ne remplace pas le dialecte : il évite de bâtir un oral sur des données qu'on ne sait ni produire ni vérifier.

**Limite à dire à l'utilisateur** (déjà notée au § 4.4 de la méthodologie) : un apprenant qui termine ce parcours se fera comprendre partout mais paraîtra formel au marché de Casablanca ou du Caire. Le module darija (§ 5.5) répond à cela, une fois les prérequis techniques levés.

---

## 2. Vue d'ensemble

### 2.1 Cinq parcours parallèles

| Parcours | Code | Contenu | Écran principal |
|----------|------|---------|-----------------|
| **Écriture et lecture** | `L` | 28 lettres, voyelles, signes, fading, racines | Alphabet, Écriture |
| **Phonétique** | `P` | Sons absents du français, durée vocalique, emphatiques | Vocabulaire, Révisions (évaluation) |
| **Vocabulaire** | `V` | Mots par famille de racine et par thème | Vocabulaire, Révisions |
| **Expression orale** | `O` | Fonctions communicatives, dialogues, shadowing | Conversation |
| **Grammaire fonctionnelle** | `G` | Phrase nominale, verbe, annexion — au service de l'oral | Cours |

Les cinq avancent ensemble : une séance combine toujours **un geste de lecture, un son, quelques mots, une phrase à dire**.

### 2.2 Niveaux

Le code stocke trois niveaux (`beginner`, `intermediate`, `advanced`). Ils recouvrent ici :

| Niveau interne | CECRL | Lecture | Oral |
|----------------|-------|---------|------|
| `beginner` | **A0 → A1** | Alphabet complet, texte voyellé court | Se présenter, besoins immédiats |
| `intermediate` | **A2** | Texte voyellé suivi, premiers textes partiellement voyellés | Routines, passé, projets |
| `advanced` | **B1** | Texte partiellement voyellé puis nu, lecture par racines | Opinion, récit, imprévu |

On ne vise pas B2 : l'application seule n'y conduit pas (voir méthodologie § 2.2).

### 2.3 Rythme d'une séance mobile

Une séance dure **15 à 20 minutes** : elle remplace une heure de cours par ~3 séances.

| Minutes | Bloc | Contenu |
|---------|------|---------|
| 0-3 | **Rappel** | Révision espacée (items échus) |
| 3-8 | **Nouveau** | 1 petite notion : 2 à 3 lettres, ou 1 son, ou 1 fonction |
| 8-13 | **Pratique** | Décodage, discrimination, ou phrase à dire |
| 13-18 | **Production** | Lecture à voix haute, enregistrement, évaluation de la prononciation |

---

## 3. Parcours Lecture (`L`)

### 3.1 Principes

1. **Décoder avant de comprendre.** Les premières unités n'utilisent que des syllabes et des mots dont l'élève connaît toutes les lettres : jamais une lettre inconnue dans un exercice.
2. **Familles graphiques** (même squelette, points différents) pour réduire la charge visuelle ; les phonèmes difficiles sont **espacés** pour ne pas empiler deux obstacles.
3. **Chaque lettre = nom, son, quatre formes, un mot-clé.** Les formes positionnelles sont enseignées en contexte de mots, pas en tableau isolé.
4. **Un son nouveau est toujours entendu avant d'être lu**, et toujours opposé à son voisin le plus proche (paires minimales).
5. **La translittération latine est un échafaudage** : affichée en L1-L10, masquée par défaut dès L11, supprimée après L14.

### 3.2 Séquence des unités

Une **séance** = 15-20 min (§ 2.3). Les durées sont des repères, non des plafonds : le passage se fait sur les critères du § 3.4.

| Unité | Lettres / notions | Séances | Sons à travailler | Mots de décodage (voyellés) |
|-------|-------------------|---------|-------------------|------------------------------|
| **L1** | Sens d'écriture, ligne de base. **ا د ذ**. Voyelles brèves َ ُ ِ et **sukūn** ْ | 5 | /d/ vs /ð/ (ذ comme *th* anglais de *this*) | syllabes : دَ دُ دِ ذَ ذُ ذِ ; pseudo-mots (signalés « mots inventés ») |
| **L2** | **ر ز و**. Voyelles longues **ا و** ; contraste court/long | 5 | **/r/ roulé** (jamais le r français), /z/, durée vocalique | دَارَ · زَارَ · دُود · زُور |
| **L3** | **ب ت ث ن ي**. Formes initiale/médiane/finale ; voyelle longue **ي** ; diphtongues *ay*, *aw* | 8 | /θ/ (*th* de *think*) vs /t/ | بَيْت · تِين · ثَوْب · بِنْت · بَاب · نُور |
| **L4** | **ج ح خ** | 6 | **ح /ħ/** (inconnu du français), **خ /x/** | جَار · خُبْز · حِبْر · حُوت |
| **L5** | **س ش** | 4 | /s/ vs /ʃ/ | شَاي · شَجَر · سَبْت |
| **L6** | **ص ض** (emphatiques I) | 6 | **emphase** : ص vs س, ض vs د ; voyelles assombries autour d'une emphatique | صَبْر/سَبْر · دَرْب/ضَرْب · صَوْت |
| **L7** | **ط ظ** (emphatiques II) | 5 | ط vs ت, ظ vs ذ | تِين/طِين · طَيْر · ظَبْي |
| **L8** | **ع غ** | 7 | **ع /ʕ/** (le plus difficile), **غ /ɣ/** (proche du r français — à ne pas confondre avec ر) | عِيد · عَرَب · غَرْب · عَيْن |
| **L9** | **ك ل م ه** ; ligature **لا** | 6 | /h/ vs /ħ/ (ه vs ح) | كَلْب · مِلْح · كَرِيم · لَيْل · هَذَا |
| **L10** | **ف ق** | 5 | **ق /q/** vs ك /k/ | قَلْب/كَلْب · سَيْف/صَيْف · فَجْر · قَمَر · فِيل · قَلَم |

**Sous-total L1-L10 : ~57 séances (~19 h).** À la fin, les 28 lettres sont connues.

| Unité | Notions | Séances | Mots de décodage / contenu |
|-------|---------|---------|----------------------------|
| **L11** | **Shadda** ّ (gémination : consonne tenue, comme l'italien) ; **tanwīn** ً ٌ ٍ | 5 | رَبَّنَا · مُدَرِّس · كِتَابٌ · كِتَابًا · كِتَابٍ |
| **L12** | **Hamza** ء et ses supports أ إ ؤ ئ ; **madda** آ | 6 | أَب · إِمَام · سُؤَال · مَاء |
| **L13** | **ة** (tā' marbūṭa : /a/ en pause, /t/ en liaison), **ى** (alif maqṣūra), article **ال** et **lettres solaires/lunaires** | 6 | القَمَر / الشَّمْس · مَدْرَسَة · مُسْتَشْفَى |
| **L14** | **Consolidation** : phrases voyellées complètes, textes de 40-60 mots | 5 | dialogues de l'unité O1-O6 (§ 5), lus à voix haute |

**Sous-total L11-L14 : ~22 séances (~7 h).**

### 3.3 Fading du voyellage et lecture par racines

Cette phase s'appuie sur le consensus Deheuvels / Al Midhwah & Alhawary / Grok : des voyelles présentes au début *améliorent* la lecture ensuite non voyellée.

| Unité | Étape | Ce qui est affiché | Séances |
|-------|-------|--------------------|---------|
| **L15** | **Voyellage complet → partiel (50 %)** | On retire les voyelles brèves prévisibles ; on garde shadda, tanwīn, hamza, voyelles longues, fin de mot | 8 |
| **L16** | **Voyellage squelettique (20 %)** | Seules les marques indispensables ; exercice de **restauration** : l'élève rétablit mentalement les voyelles puis vérifie | 8 |
| **L17** | **Texte nu, mots connus** | Aucune voyelle brève ; vocabulaire déjà vu | 8 |
| **L18** | **Racines et schèmes** | Famille ك-ت-ب : كَتَبَ · كِتَاب · كَاتِب · مَكْتَب · مَكْتُوب · مَكْتَبَة. Schèmes productifs : **فَاعِل** (agent), **مَفْعُول** (patient), **مَفْعَل** (lieu) | 10 |

**Sous-total L15-L18 : ~34 séances (~11 h).**

**Total lecture : ~113 séances ≈ 37 h d'application.** Les classes indiquent 40-60 h de contact pour la lecture voyellée fluide (Grok) ou 46 h (Gemini) ; l'hypothèse est qu'une application sans temps d'attente compresse ce chiffre. **À valider sur données réelles** (§ 8).

### 3.4 Critères de passage

Une unité se valide quand **tous** les critères sont atteints sur un test de 20 items **non vus**, sans aide de translittération.

| Critère | Seuil | Remarque |
|---------|-------|----------|
| Exactitude du décodage | **≥ 90 %** des items | Une erreur de **durée vocalique** (long pris pour bref) compte comme **erreur critique** : elle n'est pas tolérée |
| Reconnaissance des formes | **≥ 90 %** (initiale/médiane/finale) | Pour les unités L1-L10 |
| Fluidité | voir ci-dessous | Mots voyellés lus **correctement** par minute |

| Fin d'étape | Fluidité minimale | Dispersion des sources |
|-------------|-------------------|------------------------|
| L10 (alphabet complet) | **15 mots/min** | Gemini 10-15 |
| L14 (texte voyellé) | **30 mots/min** | Gemini 25-35 ; Grok 30-50 |
| L16 (partiellement voyellé) | **45 mots/min** | Gemini 45-60 ; Grok 50-70 |
| L18 (non voyellé simple) | **60 mots/min** | Grok 60-90 |

On retient la borne **basse** quand les sources divergent, pour ne pas bloquer un apprenant sur un seuil douteux.

**Règle de remédiation** : deux échecs consécutifs sur la même unité → la séance suivante rejoue uniquement les lettres fautives (détectées par [useErrorTracker.ts](../src/lib/useErrorTracker.ts)), avec paires minimales visuelles.

### 3.5 Exercices de décodage (par difficulté croissante)

| Niveau | Exercice | Exemple | Compétence |
|--------|----------|---------|------------|
| 1. Forme | Appariement forme isolée ↔ forme dans un mot | بـ dans بَيْت | Reconnaître une lettre dans ses 4 formes |
| 2. Syllabe | Lire une syllabe, la choisir à l'oreille | بَ · بُو · بِي · بْ | Fusion consonne-voyelle |
| 3. Durée | Court ou long ? | بَ ≠ بَا | Contraste de durée |
| 4. Mot | Lecture chronométrée, puis dictée | مَكْتَب | Assemblage, règles d'attache |
| 5. Phrase | Lecture à voix haute + enregistrement | ذَهَبَ الطَّالِبُ إِلَى المَدْرَسَة | Liaison, rythme |
| 6. Texte | Lecture suivie + 3 questions | paragraphe 40-60 mots | Passage au sens |
| 7. Restauration | Réinsérer les voyelles retirées | كتب → كَتَبَ ou كُتُب ? | Lecture morphologique (L15+) |

---

## 4. Parcours Phonétique (`P`)

### 4.1 Les obstacles du francophone

Hiérarchie par difficulté, établie à partir de la convergence des deux sources.

| Rang | Son | Ce que fait le francophone | Geste correct |
|------|-----|----------------------------|---------------|
| 1 | **ع /ʕ/** | Remplace par une voyelle ou un coup de glotte | Resserrer la gorge, comme pour un « a » étranglé ; voix présente |
| 2 | **ح /ħ/** | Remplace par /h/ ou omet | Souffle sourd, gorge resserrée (comme souffler sur des lunettes, sans voix) |
| 3 | **ق /q/** | Prononce /k/ | Arrière de la langue contre la luette |
| 4 | **Emphatiques ص ض ط ظ** | Prononce les plaines س د ت ذ | Dos de la langue relevé et reculé ; **les voyelles voisines s'assombrissent** |
| 5 | **Durée vocalique** | Raccourcit les longues | Tenir environ deux fois plus longtemps |
| 6 | **خ /x/ et غ /ɣ/** | غ pris pour le *r* français, خ pour /k/ | غ = *r* voisé plus doux ; خ = *r* sourd (jota espagnole) |
| 7 | **ر /r/** | Utilise le *r* français | Battement de la pointe de la langue |
| 8 | **Gémination (shadda)** | Ne tient pas la consonne | Tenir la consonne, comme en italien (*nonno*) |

> Le français aide sur un point : **غ** est plus accessible pour un francophone que pour un anglophone, grâce au *r* français. Il faut surtout empêcher de **l'étendre à ر**.

### 4.2 Paires minimales de référence

Tous les mots sont des mots arabes réels.

| Contraste | Paire | Sens |
|-----------|-------|------|
| ق / ك | قَلْب · كَلْب | cœur · chien |
| س / ص | سَيْف · صَيْف | épée · été |
| ت / ط | تِين · طِين | figue · boue |
| د / ض | دَرْب · ضَرْب | route · coup |
| ع / أ | عَمَل · أَمَل | travail · espoir |
| ح / خ | سَحَر · سَخِرَ | aube · se moquer |
| خ / ح | خَرُوف · حُرُوف | mouton · lettres |
| ع / غ | عَالِي · غَالِي | haut · cher |
| ث / س | ثَمَن · سَمَن | prix · beurre |
| court / long | كَتَبَ · كَاتَبَ | il a écrit · il a correspondu |
| court / long | قَتَلَ · قَاتَلَ | il a tué · il a combattu |
| simple / géminé | دَرَسَ · دَرَّسَ | il a étudié · il a enseigné |

> **Note** : la première réponse de Gemini proposait « غَالِم » pour opposer ع à غ ; ce n'est pas un mot arabe. Elle est remplacée par عَالِي / غَالِي. Les paires doivent toutes être relues par un arabophone avant publication.

### 4.3 Protocole d'une séance de phonétique (10-15 min)

1. **Perception** (3 min) : « même / différent » sur 8 paires, sans lire.
2. **Geste articulatoire** (3 min) : consigne courte + démonstration audio (voix `ar-SA` lente — voir [speech.ts](../src/lib/speech.ts)).
3. **Production contrôlée** (4 min) : répéter 6 mots, enregistrer.
4. **Évaluation** (3 min, 1 crédit IA) : [pronunciation.ts](../src/lib/pronunciation.ts) note la production contre la cible connue. Seuil de réussite : **score ≥ 75** sur 3 mots de la même paire.
5. **Recyclage** : le son rejoint la file de révision espacée pour 1, 3, 7 jours.

### 4.4 Shadowing

Technique de répétition quasi simultanée, adaptée en 4 étapes (consensus des deux sources) :

| Étape | Durée | Action |
|-------|-------|--------|
| 1. Écoute | 1 passage | Comprendre le sens |
| 2. Murmure | 1-2 passages | Suivre le rythme à voix basse |
| 3. Voix haute | 2 passages | Enregistrer |
| 4. Comparaison | 1 passage | Réécouter la voix de référence puis la sienne |

Segments de **5 à 10 secondes** en A1, allongés progressivement. La voix de référence est la synthèse `ar-SA` : **aucun enregistrement natif n'est disponible**, ce qui est une limite réelle (§ 8).

---

## 5. Parcours Expression orale (`O`)

### 5.1 Principes

1. **L'oral précède la lecture.** Les phrases A1 sont **écoutées et répétées** avant que toutes les lettres soient connues : l'écran affiche l'écriture arabe, la translittération et le français, mais l'élève n'est évalué sur la **lecture** que des lettres déjà vues.
2. **Fonctions avant structures** : chaque unité vise quelque chose qu'on peut *faire* (saluer, demander un prix), conformément à l'approche actionnelle de la méthodologie.
3. **Rétroaction corrective par reformulation (*recast*)** : l'IA répète la phrase correcte, sans interrompre ni lister les fautes ; les erreurs systématiques sont traitées en fin d'échange (consensus Gemini et Grok ; cohérent avec [useErrorTracker.ts](../src/lib/useErrorTracker.ts)).
4. **Une erreur de durée vocalique ou d'emphase est corrigée, pas tolérée** : elle change le mot.
5. **Registre : arabe standard parlé** (§ 1.4). Phrases courtes, vocabulaire courant, flexion de fin de mot (*iʿrāb*) **omise à l'oral** (pause en fin de phrase).

### 5.2 Niveau A1 — survie et premier contact (`beginner`)

Toutes les phrases sont voyellées. `m.` / `f.` = adressé à un homme / une femme.

| Unité | Fonction | Phrases clés | Tâche finale |
|-------|----------|--------------|--------------|
| **O1** | **Saluer, prendre congé** | مَرْحَباً (*marḥaban*) · السَّلَامُ عَلَيْكُمْ (*as-salāmu ʿalaykum*) → وَعَلَيْكُمُ السَّلَام · صَبَاحُ الخَيْر → صَبَاحُ النُّور · مَسَاءُ الخَيْر · مَعَ السَّلَامَة | Échange de 4 répliques avec un inconnu |
| **O2** | **Se présenter** | مَا اسْمُكَ؟ (m.) / مَا اسْمُكِ؟ (f.) · اِسْمِي … · أَنَا مِنْ فَرَنْسَا · أَنَا طَالِب (m.) / طَالِبَة (f.) · تَشَرَّفْنَا · كَيْفَ حَالُكَ؟ → بِخَيْر، الحَمْدُ لِلّٰه · وَأَنْتَ؟ | Se présenter en 30 s |
| **O3** | **Gérer la communication** | هَلْ تَتَكَلَّمُ الفَرَنْسِيَّة؟ · أَتَكَلَّمُ العَرَبِيَّةَ قَلِيلاً · لَا أَفْهَم · أَعِدْ مِنْ فَضْلِكَ · تَكَلَّمْ بِبُطْءٍ مِنْ فَضْلِكَ · مَا مَعْنَى …؟ | Demander de répéter et de ralentir |
| **O4** | **Nombres, prix, heure** | الأَعْدَاد ١–١٠ puis ١١–١٠٠ · بِكَمْ هٰذَا؟ · كَمِ السَّاعَة؟ · أُرِيدُ … · مِنْ فَضْلِكَ · شُكْراً → عَفْواً | Acheter un article, demander le prix |
| **O5** | **Lieux et directions** | أَيْنَ …؟ · يَمِين · يَسَار · إِلَى الأَمَام · قَرِيب · بَعِيد | Demander et comprendre un chemin simple |
| **O6** | **Famille et besoins** | هٰذَا أَبِي · هٰذِهِ أُمِّي · عِنْدِي أَخٌ وَأُخْت · أُرِيدُ مَاء · أَيْنَ الحَمَّام؟ | Présenter sa famille, exprimer un besoin |

**Volume** : ~400-600 mots actifs et passifs à la fin de l'A1 (Gemini 400-600, Grok 400-700).
**Grammaire associée** : phrase nominale (*pas de « être » au présent*), pronoms, هٰذَا/هٰذِهِ, masculin/féminin, عِنْدِي, interrogatifs هَلْ · مَا · أَيْنَ · كَمْ, négation لَا et لَيْسَ, présent du verbe aux 3 personnes.
**Vocabulaire** : thèmes déjà présents dans l'application (salutations, nombres, famille, nourriture, couleurs, corps, émotions, voyage, vie quotidienne) — **à étoffer** (§ 7.3).

### 5.3 Niveau A2 — échanges courants (`intermediate`)

| Unité | Fonction | Phrases clés | Tâche finale |
|-------|----------|--------------|--------------|
| **O7** | **Raconter sa routine** | أَسْتَيْقِظُ فِي السَّاعَةِ السَّابِعَة · أَذْهَبُ إِلَى العَمَل · أَتَنَاوَلُ الفُطُور | Décrire sa journée (6 phrases) |
| **O8** | **Raconter au passé** | أَمْسِ ذَهَبْتُ إِلَى السُّوق · مَاذَا فَعَلْتَ؟ · اشْتَرَيْتُ … | Raconter son week-end |
| **O9** | **Goûts et préférences** | أُحِبُّ القَهْوَة · لَا أُحِبُّ … · أُفَضِّلُ الشَّاي | Commander au restaurant en exprimant un choix |
| **O10** | **Projets, invitations** | سَأُسَافِرُ غَداً · هَلْ تُرِيدُ أَنْ نَخْرُجَ؟ · لَا أَسْتَطِيعُ، عِنْدِي عَمَل | Fixer un rendez-vous, accepter ou refuser |
| **O11** | **Santé, imprévus simples** | عِنْدِي أَلَمٌ فِي رَأْسِي · أَحْتَاجُ إِلَى طَبِيب · لَقَدْ ضَاعَتْ حَقِيبَتِي | Expliquer un problème à un tiers |

**Volume** : ~1 000-1 500 mots (Gemini 1 200-1 500 ; Grok 1 000-1 500).
**Grammaire** : accompli, futur (سَـ / سَوْفَ), أَنْ + inaccompli, pronoms suffixes, duel et pluriels (réguliers puis brisés), annexion (*iḍāfa*), comparatif.

### 5.4 Niveau B1 — autonomie (`advanced`)

| Unité | Fonction | Phrases clés | Tâche finale |
|-------|----------|--------------|--------------|
| **O12** | **Donner son avis** | فِي رَأْيِي … · أَعْتَقِدُ أَنَّ … · أَتَّفِقُ مَعَكَ / لَا أَتَّفِقُ مَعَكَ | Défendre une opinion en 5 phrases |
| **O13** | **Cause, conséquence, opposition** | لِأَنَّ … · لِذٰلِكَ … · وَلٰكِنَّ … · رَغْمَ أَنَّ … | Argumenter avec 2 connecteurs |
| **O14** | **Raconter, structurer** | فِي البِدَايَة · بَعْدَ ذٰلِكَ · أَخِيراً · لَدَيَّ مُشْكِلَة | Gérer une réclamation |
| **O15** | **Exposé court** | introduction · développement · conclusion | Parler 3 à 5 minutes sur un thème familier |

**Volume** : ~2 000-2 800 mots (Gemini 2 500-3 000 ; Grok 2 000-2 500).
**Grammaire** : أَنَّ / إِنَّ, relatives (الَّذِي), formes verbales dérivées II / III / V, voix passive, subjonctif.

> **Honnêteté sur B1** : voir § 6.2. Avec le rythme réaliste d'un utilisateur mobile, ce palier reste hors de portée de l'application *seule*.

### 5.5 Ponts dialectaux et module darija (différé)

**Ponts dès A1** : à partir de O1, une fiche « Dans la rue » donne l'équivalent dialectal des phrases les plus utiles, **en audio uniquement et sans évaluation**, pour que l'apprenant reconnaisse ce qu'il entendra vraiment. Exemples en **darija marocaine** (à faire valider par un locuteur natif avant publication) :

| Standard | Darija (translittération) | Français |
|----------|---------------------------|----------|
| كَيْفَ حَالُكَ؟ | *labas ?* | ça va ? |
| بِكَمْ هٰذَا؟ | *bshḥal had ?* | combien ça coûte ? |
| أُرِيدُ … | *bghit …* | je veux … |
| جَيِّد | *mzyan* | bien |
| مُوَافِق | *wakha* | d'accord |
| أَيْنَ؟ | *fin ?* | où ? |
| انْتَهَى | *safi* | c'est fini / ça suffit |

**Module darija complet** — prérequis, tous bloquants :
1. enregistrements **d'un locuteur natif** (la synthèse vocale n'a pas de voix darija) ;
2. choix d'**une** variété (Maroc recommandé en premier : plus grand nombre de locuteurs en France) ;
3. une **convention orthographique** unique dans l'application (la darija n'en a pas de standard) ;
4. un mode d'évaluation qui ne compare pas à une forme standard.

Tant qu'ils ne sont pas levés, ce module **n'est pas implémentable proprement**.

---

## 6. Calendrier et volumes

### 6.1 Volumes de référence (sources)

| Niveau | Heures guidées cumulées — Gemini | — Grok | Retenu pour l'app |
|--------|----------------------------------|--------|-------------------|
| A1 | 150-200 | 80-120 (+80-150 autonomes) | **100-150 h** |
| A2 | 300-450 | 200-280 | **250-350 h** |
| B1 | 600-800 | 350-480 | **450-650 h** |

Perplexity donne des repères génériques (non spécifiques à l'arabe) : A1 90-100 h, A2 180-200 h, B1 350-400 h, qu'elle juge « probablement optimistes » pour l'arabe. Les écarts entre sources dépassent un facteur 1,7 : on retient une **fourchette large**. Pour référence, l'arabe est classé catégorie IV (~2 200 h pour le niveau professionnel) par le Foreign Service Institute.

### 6.2 Ce que l'application peut réellement offrir

Une séance de 20 min × 5 jours = **1 h 40 par semaine**.

| Rythme | Heures / an | Niveau atteignable en 12 mois |
|--------|-------------|-------------------------------|
| 20 min, 5 j/semaine | ~85 h | **Début d'A1** (60-85 % du volume A1) |
| 40 min, 5 j/semaine | ~170 h | **A1 atteint, début d'A2** |
| 1 h, 7 j/semaine | ~365 h | **A2** |

> **Conséquence** : B1 ne se rejoint avec l'application que sur **plusieurs années**, ou avec un complément (cours, échanges avec des locuteurs). Afficher « B1 » comme objectif à 12 mois serait une promesse fausse (cf. méthodologie § 2.2). Le programme B1 reste dans le document comme **horizon de contenu**, pas comme engagement de durée.

### 6.3 Plan type — premier cycle (≈ 5 séances / semaine)

| Semaines | Lecture | Phonétique | Oral | Vocabulaire cumulé |
|----------|---------|------------|------|--------------------|
| 1-2 | L1 · L2 | ع (écoute), durée vocalique | O1 | ~25 |
| 3-5 | L3 · L4 | ث, ح, خ | O2 | ~70 |
| 6-8 | L5 · L6 · L7 | emphatiques | O3 | ~130 |
| 9-12 | L8 · L9 · L10 | ع, غ, ق | O4 · O5 | ~230 |
| 13-16 | L11 · L12 · L13 · L14 | gémination | O6 | ~380 |
| 17-24 | L15 · L16 (fading) | recyclage | O7 · O8 · O9 | ~700 |
| 25-34 | L17 · L18 (nu, racines) | recyclage | O10 · O11 | ~1 000 |

**Jalons** : fin de la semaine 16 → **bilan lecture** (alphabet, signes, texte voyellé) ; fin de la semaine 34 → **bilan oral des unités O1-O11**.

> **Ce plan est un ordre de présentation du contenu, pas une promesse de niveau.** À 5 séances de 20 min par semaine, 34 semaines représentent ~57 h : l'apprenant aura *vu* le contenu A1 et une partie de l'A2, mais les volumes du § 6.1 (A1 : 100-150 h) indiquent qu'il ne le *maîtrisera* pas encore. Les semaines 17-34 sont plus longues que les seules séances de lecture (L15-L18 = 34 séances ≈ 7 semaines) car elles absorbent les unités orales O7-O11 et le recyclage du vocabulaire. Les bilans ne doivent donc **pas** être étiquetés « niveau A1 / A2 » dans l'interface.

---

## 7. Mise en œuvre dans l'application

### 7.1 Correspondance parcours → écrans

| Parcours | Écran | Ce qui existe | Ce qu'il faut ajouter |
|----------|-------|---------------|----------------------|
| `L` | [AlphabetScreen.tsx](../src/screens/AlphabetScreen.tsx) | 28 lettres, formes positionnelles, TTS normal/lent | **Réordonner** par unités L1-L10 (aujourd'hui : ordre alphabétique) ; champ `unit` ; exercices de décodage 2 à 7 (§ 3.5) |
| `L` | [WritingScreen.tsx](../src/screens/WritingScreen.tsx) | Tracé des lettres | Suivre l'ordre des unités |
| `P` | [VocabAudioRecorder.tsx](../src/components/VocabAudioRecorder.tsx) + [pronunciation.ts](../src/lib/pronunciation.ts) | Évaluation notée contre cible | **Mode paires minimales** (§ 4.2), seuil 75 |
| `V` | [VocabularyScreen.tsx](../src/screens/VocabularyScreen.tsx), [ReviewScreen.tsx](../src/screens/ReviewScreen.tsx) | ~100 mots, Leitner 5 boîtes | Étendre à 400-600 mots A1, champ `level`, familles de racines |
| `O` | [ConversationScreen.tsx](../src/screens/ConversationScreen.tsx) | Thèmes = catégories lexicales | Thèmes = **fonctions** O1-O15 (§ 5.2-5.4) |
| `G` | [Coursscreen.tsx](../src/screens/Coursscreen.tsx) | Cours générés à la demande | Cours **planifiés** par unité, pas seulement réactifs |

### 7.2 Brief IA pour l'arabe

À reporter dans `LANGUAGE_PROGRESSION.ar` de [pedagogy.ts](../src/lib/pedagogy.ts), qui en couvre aujourd'hui une version courte.

| Niveau | Consigne à injecter |
|--------|---------------------|
| `beginner` | Texte **entièrement voyellé**. Registre : arabe standard parlé, phrases de 4-6 mots. Une seule nouveauté par réponse. Donner translittération et français. Si l'élève a fait une erreur de **durée vocalique ou d'emphase**, la reformuler correctement sans l'interrompre, puis la nommer en fin d'échange. Ne jamais employer une lettre non encore vue **dans un exercice de lecture**. |
| `intermediate` | Voyellage **partiel** (mots nouveaux et ambiguïtés). Phrases de 8-12 mots. Racine nommée quand elle éclaire le mot. Passé et futur autorisés. |
| `advanced` | Texte **non voyellé** sauf ambiguïté. Connecteurs de discours (لِأَنَّ, وَلٰكِنَّ…). Demander de justifier une opinion. Proposer un synonyme ou une tournure plus idiomatique. |

### 7.3 Données à produire

| Donnée | État actuel | Cible |
|--------|-------------|-------|
| Alphabet par unités | `ARABIC_ALPHABET`, ordre alphabétique, aucun champ d'unité | 10 unités L1-L10 + notions L11-L13 |
| Vocabulaire statique A1 | ~100 mots, 10 catégories | 400-600 mots, étiquetés `level: 'A1'`, avec racine |
| Paires minimales | aucune | ~30 paires voyellées avec audio |
| Phrases O1-O15 | aucune | ~150 phrases voyellées + translittération + français |
| Textes de lecture graduée | aucun | ~25 textes de 15 à 150 mots, 3 niveaux de voyellage |

> **Règle de qualité** : tout contenu arabe **généré par une IA doit être relu par un arabophone** avant d'entrer dans les données statiques. Cette recherche en a fourni la preuve : une réponse proposait un mot inexistant (« غَالِم ») comme exemple de paire minimale.

### 7.4 Fonction de voyellage décroissant

Pour L15-L17, un utilitaire retire les voyelles à partir d'un texte voyellé stocké. Marques Unicode concernées :

| Marque | Point de code | Conservée en voyellage partiel ? |
|--------|---------------|----------------------------------|
| fatḥa َ · ḍamma ُ · kasra ِ | U+064E, U+064F, U+0650 | **Non** (retirée) |
| sukūn ْ | U+0652 | Non |
| shadda ّ | U+0651 | **Oui** |
| tanwīn ً ٌ ٍ | U+064B, U+064C, U+064D | **Oui** |
| alif suscrit ٰ | U+0670 | Oui |

Le voyellage **squelettique** (L16) retire aussi shadda et tanwīn sauf sur les mots flaggés ambigus. Un texte voyellé stocké reste la **source unique** : on ne génère jamais l'inverse, car restaurer des voyelles automatiquement est justement la difficulté de l'arabe.

---

## 8. Limites et décisions ouvertes

### 8.1 Limites de la recherche

- Les publications des cinq spécialistes principaux sont **vérifiées par Perplexity avec sources**, mais pas consultées directement par nous.
- Les études sur le fading des diacritiques portent sur des **enfants arabophones** ; leur transfert aux adultes francophones est une extrapolation.
- **Au moins une erreur linguistique** a été relevée dans une réponse (mot inexistant) : les exemples arabes de ce document ont été choisis avec prudence mais **n'ont pas été relus par un arabophone**.
- Les **débits de lecture** et les **volumes horaires** varient d'un facteur 1,7 à 2 selon la source.
- L'approche intégrée est le **consensus de ses promoteurs**, non un résultat expérimental contraignant.

### 8.2 Limites techniques

- **Aucun enregistrement natif** : seules les voix de synthèse (`ar-SA`) existent. Une synthèse reproduit mal la qualité des emphatiques et des pharyngales, c'est-à-dire exactement ce qu'on veut enseigner. **Enregistrer un locuteur natif pour les ~150 phrases A1 et les ~30 paires minimales est l'investissement le plus rentable** du programme.
- La disponibilité des voix arabes dépend du téléphone (voir [speech.ts](../src/lib/speech.ts) : l'application avertit l'utilisateur si aucune voix n'est installée).
- L'évaluation de prononciation par IA n'a **pas été validée contre un jugement humain** : à traiter comme un indicateur, pas comme une note.

### 8.3 Décisions à prendre

| # | Décision | Option recommandée | Conséquence |
|---|----------|--------------------|-------------|
| 1 | Registre oral principal | Arabe standard parlé (§ 1.4) | Cohérent avec les voix et l'évaluation actuelles |
| 2 | Dialecte à ajouter | Darija marocaine, **après** enregistrement natif | Public francophone le plus large |
| 3 | Réordonner l'alphabet | Oui, par familles et unités | Casse l'ordre alphabétique que l'utilisateur connaît ; à expliquer |
| 4 | Afficher les niveaux CECRL | Non au-delà de A2 (§ 6.2) | Évite une promesse non tenable |
| 5 | Budget d'évaluation IA | 1 crédit par évaluation de paire minimale | 150 crédits ≈ 150 évaluations : à répartir (§ 4.3) |

### 8.4 Prochaines étapes suggérées

1. **Faire relire ce document par un arabophone** (exemples, paires, phrases).
2. Lire l'article de Pinon (2015, *Les Langues Modernes* 3, p. 77-88) sur la typologie des difficultés de lecture-écriture et ajuster l'ordre des unités L1-L10.
3. Réordonner `ARABIC_ALPHABET` par unités (changement mécanique, risque faible).
4. Étendre `LANGUAGE_PROGRESSION.ar` selon le § 7.2.
5. Produire les contenus de la § 7.3 en commençant par O1-O3 et L1-L3.

---

## 9. Références

- **Recherche brute** : [docs/recherche-arabe/](../docs/recherche-arabe/) — `01` spécialistes, `02` recherche lecture/oral/diglossie, `03` progression de lecture, `04` programme d'oral (Gemini et Grok), `05` vérification (Perplexity). Réponses non éditées.
- **Brustad, K., Al-Batal, M., Al-Tonsi, A.** — *Alif Baa*, *Al-Kitaab fii Ta'allum al-'Arabiyya* (Georgetown University Press).
- **Ryding, K.** — *Teaching and Learning Arabic as a Foreign Language* ; *Formal Spoken Arabic*.
- **Wahba, K., Taha, Z., England, L.** (dir.) — *Handbook for Arabic Language Teaching Professionals in the 21st Century*.
- **Deheuvels, L.-W.** — *Manuel d'arabe moderne* ; *Méthode d'arabe — arabe littéral* (L'Asiathèque).
- **Dichy, J.** — « La pluriglossie de l'arabe », *Bulletin d'études orientales*, 1994.
- **Medhat-Lecocq, H.** (dir.) — *Arabe standard et variations régionales* (Archives contemporaines, 2017).
- **Saiegh-Haddad, E.** — travaux sur la lecture arabe et la diglossie.
- **Al Midhwah, A. & Alhawary, M.** — effet des diacritiques sur la lecture en L2.
- **Foreign Service Institute** — catégories de difficulté linguistique.
- Autres langues et cadre général : [methodologie.md](../methodologie.md).
