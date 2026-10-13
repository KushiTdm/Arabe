# Parcours Phonétique P1 à P4 — intégré (14 oct. 2026)

Fichier : `src/content/ar/phonetics.ts`. Ordre : P1-P3 après L10 (les 28 lettres sont connues), P4 après L11 (shadda). Méthode : programme § 4 → premier jet Grok (07) → vérification Perplexity avec dictionnaires (08) → tri. Aucun arabophone n'a relu.

## Retenu
Toutes les paires jugées OK par Perplexity et réellement minimales ; les verbes sont écrits avec leur fatḥa finale (كَاتَبَ, ضَلَّ…), comme Perplexity le recommande.

## Écarté ou remplacé
| Entrée de Grok | Raison | Remplacement |
|----------------|--------|--------------|
| عَمّ / أَمّ | أَمّ n'est pas « mère » (c'est أُمّ) | عَنْ / أَنْ |
| حَال / هَال | هَال rare (« هِيل » est la forme courante) | paire ح/خ conservée seule |
| سَحَر « magie » | سَحَر = fin de nuit ; magie = سِحْر | paire retirée |
| خَال / غَال | غَالٍ (adjectif) ≠ غَال | عَالِي / غَالِي (programme § 4.2) |
| غَرْب / عَرْب | عَرْب n'est pas usuel, paire non minimale | retirée |
| عَلَم / عَلَّم | nom contre verbe | عَلِمَ / عَلَّمَ |
| سَعَد, حَزِن, خَبَر / خَبَّر | voyellation fausse ou paire trop proche | فَهِمَ / فَهَّمَ, كَسَرَ / كَسَّرَ, قَتَلَ / قَاتَلَ |

Perplexity a validé sans nuance des entrées contestables (عَمّ/أَمّ) : son « OK » ne vaut pas arbitrage. Conserver la relecture par un arabophone.

## Audio
`prepareForSpeech` (`src/lib/speech.ts`) pose un soukoun sur la dernière consonne sans marque d'un mot arabe isolé, pour que le moteur ne lui invente pas de désinence (دُود lu « doudoun »). Non vérifié à l'oreille : à tester sur appareil.
