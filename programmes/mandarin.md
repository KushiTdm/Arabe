# Programme de mandarin pour francophones

> **Rôle** : programme de référence pour le mandarin (`zh`). Complète [methodologie.md](../methodologie.md) § 3.6.
> **Public** : adultes francophones, autonomes sur mobile. **Norme** : mandarin standard (`zh-CN`), caractères **simplifiés**.
> **Recherche** : [docs/recherche-mandarin/](../docs/recherche-mandarin/) — Gemini, Grok, Perplexity (vérification avec sources). **Révision** : 12 octobre 2026.

---

## 1. Fondements

### 1.1 Références (vérifiées par Perplexity)

| Référence | Statut |
|-----------|--------|
| Bellassen, J. (avec **Zhang Pengpeng**), *Méthode d'initiation à la langue et à l'écriture chinoises*, Paris, La Compagnie, 1989 | **Confirmé** — Gemini donnait « Zhang Zushan, L'Asiathèque » : **erreur** |
| Bellassen, J. et Arslangul, A., *Le Chinois pour tous*, Hatier / Bescherelle, 2010 | **Confirmé** |
| Bellassen, J. et Wong, W., *Les idéogrammes chinois ou l'empire du sens*, You Feng, **2010** (≈ 700 caractères) | **Confirmé** — Grok donnait 1995 |
| Alleton, V., *L'écriture chinoise*, PUF, « Que sais-je ? » (1re éd. 1970 ; éd. 2002) ; *L'écriture chinoise : le défi de la modernité*, Albin Michel, 2008 | **Confirmé** |
| Allanic, B., *Le chinois… comme en Chine* (*Méthode de langue et d'écriture chinoises*), Presses universitaires de Rennes, 2009 (préface de Bellassen) ; *La voie des signes : l'apprentissage de la lecture en Chine*, PUR, 2017 | **Confirmé** |
| **EBCL** (*European Benchmarks for the Chinese Language*) | **Existe** : référentiel CECRL pour le chinois ; 2e phase relancée en juin 2024, objectifs B1-C1 pour **juin 2026** (état d'avancement à vérifier) |
| HSK 3.0, norme GF 0025-2021 : 9 niveaux, 11 092 mots | **Confirmé** (chiffres § 3) |

**Références inexistantes ou non retrouvées, écartées** : Alleton, *L'apprentissage du chinois langue étrangère pour les francophones*, MSH, 2008 ; Xu Shuang, *Enseigner le chinois langue étrangère*, L'Harmattan, 2014 ; « Allanic 2008 » (psycholinguistique) ; *Clés du chinois réinventées* ; *C'est du chinois !* (M. Hoa) ; M.-C. Deyrich — tous cités par **Gemini seul**, aucune confirmation.
Grok attribue à Bellassen « 400 caractères prioritaires ≈ 66-70 % des textes courants » : **chiffre non vérifié**.

### 1.2 Décisions

| # | Décision | Justification |
|---|----------|---------------|
| D1 | **Quatre semaines d'oral + pinyin avant les caractères** (tons, sons, 30 phrases) | Courant « dissociation oral/écrit » (Allanic, EBCL) ; le pinyin est une prothèse, pas une écriture |
| D2 | **Puis caractères par composants**, **reconnaissance avant écriture manuscrite** | Gemini : ~100-200 clés pour décoder la structure ; Bellassen : 400 caractères prioritaires (chiffre à vérifier) |
| D3 | **Pinyin accentué partout** (*nǐ hǎo*, jamais *ni hao*) | Les tons sont la première cause d'incompréhension |
| D4 | **Chaque nom donné avec son classificateur** | Obligatoire avec les nombres, sans équivalent français |
| D5 | **了 présenté comme un aspect accompli, jamais comme « le passé »** | Le francophone cherche le temps ; le chinois exprime l'aspect |
| D6 | **Cibles HSK 3.0, HSK 2.0 en repère** | Norme actuelle ; les manuels existants sont encore en 2.0 |

> **Deux écoles à ne pas confondre.** *Zi benwei* (Bellassen) : le caractère est l'unité de base, enseigné dès le début à parité avec l'oral. Dissociation (Allanic, EBCL) : l'oral et le pinyin d'abord, les caractères selon une logique graphique. **Ce programme suit la seconde** pour des raisons d'application mobile (l'oral est évaluable par la voix) ; la première reste défendable. Aucune étude comparative chez les francophones n'a été trouvée.

### 1.3 Niveau de confiance

| Affirmation | Statut |
|-------------|--------|
| Tons, sandhi, aspiration, rétroflexes, classificateurs, aspect | **Consensus des deux IA** ; analyses contrastives |
| Écriture manuscrite améliore la reconnaissance | Gemini cite Longcamp *et al.* ; **non vérifié par Perplexity**. Principe plausible |
| « Le pinyin pur retarde la reconnaissance du caractère » (Gemini) | **Non sourcé** |
| HSK 3.0 niv. 1-3 | **Officiel** : mots cumulés 500 / 1 272 / 2 245 ; caractères cumulés 300 / 600 / 900. **Nuance** : le programme d'examen publié fin 2025 liste 246 / 371 / 655 caractères à reconnaître (norme de compétence vs programme d'examen) |
| Heures | **Aucune norme.** Perplexity : HSK 1 ≈ 60-100 h, HSK 2 cumulé 180-300 h, HSK 3 cumulé 350-600 h. Gemini : 150-200 / 350-450 / 700-900. Grok : A1 150-250, A2 350-500, B1 700-1 000. **Écart de 2 à 3×** |

---

## 2. Obstacles du francophone

| Obstacle | Erreur type | Traitement |
|----------|-------------|------------|
| **Tons** | Ton plat ; 2e confondu avec une question, 4e avec une affirmation sèche | Discrimination avant production ; paires ci-dessous |
| **Sandhi du 3e ton** | *nǐ hǎo* dit en 3+3 | 3+3 → 2+3 ; règle donnée avec l'exemple |
| **不 et 一** | Ton fixe | Changent selon le ton suivant |
| **Aspiration** | *b, d, g* confondus avec *p, t, k* | Papier devant la bouche : *p* le fait voler |
| **Rétroflexes zh ch sh r** | /ʃ/ français | Pointe de langue relevée ; opposer à *z c s* |
| **j q x** | Lus comme en français | Sons nouveaux, palatals |
| **Caractères** | Mémorisés comme des dessins | Décomposition : clé + composant phonétique |
| **Classificateurs** | Omis | Toujours avec le nom (个, 本, 张…) |
| **Aspect 了 / 过 / 着** | Traduits par un temps | Fiche : *accompli*, *déjà fait une fois*, *état en cours* |
| **Ordre des mots** | Lieu et temps après le verbe | **Temps → Lieu → Verbe** : 我十二点在餐厅吃饭 |

### Paires minimales

| Contraste | Paire | Sens |
|-----------|-------|------|
| tons | *mā · má · mǎ · mà* (妈 · 麻 · 马 · 骂) | mère · chanvre · cheval · gronder |
| 3e / 4e ton | *shuìjiào* · *shuǐjiǎo* (睡觉 · 水饺) | dormir · raviolis |
| 3e / 4e ton | *mǎi* · *mài* (买 · 卖) | acheter · vendre |
| 1er / 2e ton | *tāng* · *táng* (汤 · 糖) | soupe · sucre |
| aspiration | *dǎ* · *tǎ* (打 · 塔) | frapper · tour |
| rétroflexe / dentale | *shì* · *sì* (是 · 四) | être · quatre |

---

## 3. Progression

### 3.1 Phonétique et pinyin (semaines 1-4, ~20 séances)

| Unité | Contenu |
|-------|---------|
| **ZP1** | 4 tons + ton neutre ; discrimination, puis production |
| **ZP2** | Initiales : labiales, dentales, vélaires ; **aspirées / non aspirées** |
| **ZP3** | Rétroflexes **zh ch sh r** ; dentales **z c s** |
| **ZP4** | Palatales **j q x** ; finales, **ü** |
| **ZP5** | **Sandhi** du 3e ton, 不 et 一 |
| **ZP6** | Lecture de syllabes isolées → mots de 2 syllabes, sans caractères |

> **Écart avec l'application** : l'alphabet `zh` actuel ne liste que les **initiales** du pinyin ([languages.ts](../src/lib/languages.ts)). Il n'y a ni finales ni tons : à ajouter avant tout.

### 3.2 Caractères (dès la semaine 5)

| Palier | Contenu | HSK 3.0 |
|--------|---------|---------|
| **ZC1** | ~20 clés fréquentes (人 口 木 水 火 女 子 心 手 日 月 言…) en reconnaissance | prépare niv. 1 |
| **ZC2** | 300 caractères : reconnaissance + sens + pinyin | niv. 1 |
| **ZC3** | +300 (cumul 600) | niv. 2 |
| **ZC4** | +300 (cumul 900) ; écriture manuscrite des ~150 plus simples | niv. 3 |

### 3.3 Communication

#### A1 (`beginner`) — HSK 3.0 niv. 1 : 500 mots, 300 caractères

| Unité | Fonction | Grammaire |
|-------|----------|-----------|
| **ZH1** | Saluer, se présenter | 是, négation 不, 你好 *nǐ hǎo*, 我叫… *wǒ jiào…* |
| **ZH2** | Famille, nombres | 有, **classificateur 个** |
| **ZH3** | Heure, date | **ordre Temps → Lieu → Verbe** |
| **ZH4** | Manger, boire | 想 / 要, 吗 |
| **ZH5** | Acheter | 多少钱 *duōshao qián ?*, 块 |
| **ZH6** | Localiser | 在, 这儿 / 那儿, directions |

#### A2 (`intermediate`) — HSK 3.0 niv. 2 : 1 272 mots, 600 caractères

| Unité | Fonction | Grammaire |
|-------|----------|-----------|
| **ZH7** | Dire ce qui est fait | **了** (accompli) |
| **ZH8** | Parler d'expérience | **过** |
| **ZH9** | Capacité, permission | 会 / 能 / 可以 |
| **ZH10** | Comparer | 比 |
| **ZH11** | Insister sur un détail | 是…的 |
| **ZH12** | Se déplacer | 去 / 来, compléments de direction |

#### B1 (`advanced`) — HSK 3.0 niv. 3 : 2 245 mots, 900 caractères

| Unité | Fonction | Grammaire |
|-------|----------|-----------|
| **ZH13** | Raconter | complément de résultat, connecteurs 然后 |
| **ZH14** | Manière | complément de manière **得** |
| **ZH15** | Mettre en avant | **把** et **被** |
| **ZH16** | Opinion | 觉得 / 认为, 因为…所以 |
| **ZH17** | État | **着** |

---

## 4. Volumes

Estimations **non officielles**, cumulées pour un francophone : HSK 1 **60-200 h** ; HSK 2 **180-400 h** ; HSK 3 **350-900 h**. L'écart traduit des définitions différentes de « atteindre le niveau » (reconnaître ou produire les caractères). À 85 h/an, l'application mène à environ la moitié du niveau HSK 1-2 en un an.

---

## 5. Mise en œuvre

| Niveau | Consigne IA (`LANGUAGE_PROGRESSION.zh`, déjà proche) |
|--------|-------------------------------------------------------|
| `beginner` | Caractères + **pinyin accentué**, classificateur avec chaque nom, sandhi signalé, ~150 caractères les plus fréquents |
| `intermediate` | 了 expliqué comme aspect ; clés données pour chaque caractère nouveau |
| `advanced` | Pinyin sur les mots nouveaux seulement ; 把 et 被 ; premiers 成语 |

**Données** : vocabulaire `zh` existe (~100 mots) ; **ajouter finales, tons et clés** à l'alphabet ; paires de tons avec audio ; fiche classificateurs.

## 6. Limites

- La synthèse `zh-CN` rend-elle les **tons en contexte** (sandhi) ? À tester : cas critique.
- Évaluation par IA du **ton** : les modèles audio sont moins fiables sur la hauteur que sur les phonèmes ; traiter le score comme indicatif.
- Contenu à faire relire par un sinophone ; **caractères traditionnels non traités**.
- EBCL B1-C1 : vérifier s'il est publié avant de s'y aligner.

## 7. Références

Voir § 1.1. Certifications : **HSK** (Chinese Testing International), **TOCFL** (Taïwan, caractères traditionnels, hors périmètre). Cadre général : [methodologie.md](../methodologie.md).
