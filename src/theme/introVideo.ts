// Les deux vidéos jouées au lancement, l'une après l'autre (4 s chacune, verticales 9:16) :
//   1. INTRO_VIDEO  : l'app (du globe à « Polyglotte »)
//   2. AGENCY_VIDEO : la signature de l'agence NeuraWeb
// Dépose chaque fichier dans assets/video/ puis remplace `null` par le `require` correspondant :
//   export const INTRO_VIDEO:  number | null = require('../../assets/video/intro.mp4');
//   export const AGENCY_VIDEO: number | null = require('../../assets/video/neuraweb.mp4');
// Tant qu'une vidéo vaut `null`, l'app joue à sa place une animation faite en code.
// Voir docs/intro/README.md.
export const INTRO_VIDEO: number | null = require('../../assets/video/intro.mp4');
export const AGENCY_VIDEO: number | null = require('../../assets/video/neuraweb.mp4');
