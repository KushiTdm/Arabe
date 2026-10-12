# Audit du contenu arabe intégré (src/content/ar)

Date : 2026-10-12. Gemini et Grok ont relu les ~160 mots et phrases (fichiers bruts :
`/Users/Dev/ai-search-results/20261012-230000_*.md` et `…230116_*.md`).
Perplexity n'a pas été sollicité. **Aucune relecture par un arabophone n'a eu lieu** : à faire avant publication.

## Corrigé
| Mot | Remarque | Décision |
|-----|----------|----------|
| تِين | nom collectif | traduit « figues » |
| طَيْر | nom collectif | traduit « oiseaux » |
| بِبُطْءٍ | tanwīn incohérent avec la forme de pause | écrit بِبُطْء |
| خَمْسَة يُورُو | annexion : tā' marbūṭa prononcée | écrit خَمْسَةُ يُورُو (khamsatu yūrū) |

## Écarté
| Remarque | Source | Raison |
|----------|--------|--------|
| زَار → « zār » | Gemini | زَارَ (zāra) est la forme du verbe : la fatḥa finale fait partie du mot. |
| هٰذِهِ → هَذِهِ | Grok | Les deux graphies existent ; la forme avec alif suscrit est le voyellage complet usuel. |
| الحَمْدُ لِلَّه → لِلَّهِ | Grok | Forme de pause voulue (voir programmes/arabe.md § 5.1). |
| أُرِيد مَاء → أُرِيدُ مَاءً | Gemini | Désinences casuelles omises à l'oral : choix du programme (§ 5.1). |
| الفَرَنْسِيَّة → الفَرَنْسِيَّةَ | Grok | Idem. |

Les deux IA se contredisent sur plusieurs points de voyellage et ont chacune un taux d'erreur connu sur
ces sujets : leur relecture a servi à repérer, pas à trancher.

## Seconde relecture — L11 à L18 (Gemini, 66 entrées)
Un seul passage, sans second avis. Retenu : « kitābin » traduit « un livre (génitif) » au lieu de « d'un livre ». Écarté : `ʾamal` (la hamza initiale n'est pas transcrite ailleurs : ab, umm, ana). `دَارِس` a été relu mais n'est pas utilisé dans les leçons. Même réserve qu'avant : l'IA relit, un arabophone doit trancher.

## Troisième relecture — O7 à O11 (Gemini, 52 entrées)
Retenu : subjonctif après أَنْ (نَخْرُجَ, nakhruja) ; « à cinq heures » = فِي السَّاعَة الخَامِسَة ; fatḥa finale de يُؤْلِمُكَ. Écarté : tanwīn sur « alam » (forme de pause voulue). Un seul avis, relecture par un arabophone toujours requise.
