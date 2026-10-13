# Relecture des conversations C17-C20, des packs 10-15 et des unités de prononciation (14 oct. 2026)

Fichiers bruts : `relecture-ar-c17-c20-packs.md` (Perplexity), `relecture-ru-ko-ja-zh-c17-c20.md` (Grok), `relecture-es-it-pt-c17-c20.md` et `relecture-de-en-vi-c17-c20.md` (ChatGPT). Une première passe Gemini n'a pas lu les fichiers (réponse inutilisable) et a été écartée. Zh : une seule IA. **Aucun natif n'a relu.**

## Retenu
| Langue | Changement | Source |
|--------|-----------|--------|
| ar | « poivron » : فِلْفِل حُلْو (فلفل seul = poivre, piment) ; « nous sommes arrivés » (وَصَلْنَا est un accompli, la traduction française est alignée dans les 11 langues) | Perplexity |
| ja | dattes : デーツ (ナツメヤシ = le palmier) ; château : 城 ; « puis-je vous aider » : 何かお探しですか ; « à vous aussi » : そちらも | Perplexity, Grok |
| zh | « oui, s'il vous plaît » à « un sac ? » : 要，谢谢 | Grok |
| ko | « dix euros » : 십 유로입니다 (10 se lit sip, avec liaison) | Grok |
| es / it / pt | durée du trajet : tardaremos / ci vogliono / demora vinte minutos | ChatGPT |
| de / en / vi | Hier, bitte · Gut, bis morgen · Here you go · Here we are · vali · Đây ạ | ChatGPT |

## Écarté
| Remarque | Raison |
|----------|--------|
| ru : « malako », « vada », « iablaka »… à remplacer par une transcription savante (Grok, Perplexity) | Le projet romanise **à la française, d'après la prononciation réelle** (akanye comprise), comme dans les 226 leçons existantes et dans `programmes/russe.md`. Changer ici ferait deux conventions. |
| ar : désinences casuelles (مَاءٌ, لَذِيذٌ, الحِسَابُ…) | Choix du programme (§ 5.1) : forme de pause, voir `recherche-arabe/06-audit-contenu-integre.md`. |
| ko : 당신도요 → 선생님도요 ; zh : 奶牛 → 牛 ; es : « la miel » | Préférence stylistique, ou affirmation fausse (« miel » est féminin en espagnol : ChatGPT s'est trompé). |
| ja : ChatGPT/Grok lignes « Correct » | Rien à corriger. |

## Revue de code (ChatGPT, DeepSeek, Kimi)
Retenu : opacité de `BubbleIn` pilotée par sa propre valeur partagée ; garde sur les index des packs ; `؛` ajouté à la ponctuation de `prepareForSpeech`. Écarté : l'« erreur » de regex (elle ne capture que la dernière lettre du mot, testé).

## Prononciation et faux amis (autres langues)
`src/content/pronunciation.ts` : unités P1 (es, it, pt, de, en, ru, ko, ja, vi) et F1 (es, it, pt, de, en, ru) bâties sur les listes de `programmes/*.md` § 2 déjà vérifiées par Perplexity. Pas de P1 en zh (zh-P1 à P4 existent) ni de F1 en ko/ja/zh/vi (pas de liste dans leur programme). Les paires qui ne diffèrent que par l'accent (замо́к / за́мок, àncora / ancóra) sont dans les cartes mais **pas dans les exercices** : la synthèse vocale ne les distingue pas.
