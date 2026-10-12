# Polyglotte (MonAppArabe)

Application mobile React Native / Expo d'apprentissage de l'arabe : alphabet, vocabulaire, cours, quiz, conversation, écriture et suivi de progression (profils, révisions espacées, badges).

## Stack technique

- [Expo](https://expo.dev) SDK 51 / React Native 0.74
- TypeScript
- React Navigation (bottom tabs + native stack)
- AsyncStorage pour la persistance locale
- Expo AV / Expo Speech pour l'audio et la synthèse vocale
- EAS Build pour les builds Android/iOS

## Prérequis

- Node.js LTS (18+)
- npm
- [Expo CLI](https://docs.expo.dev/get-started/installation/) (via `npx`, pas besoin d'installation globale)
- Pour un build natif local : Xcode (iOS) et/ou Android Studio (Android)
- Pour un build cloud : [EAS CLI](https://docs.expo.dev/build/setup/) (`npm install -g eas-cli`) et un compte Expo

## Installation

```bash
npm install
```

Copier/adapter le fichier `.env` à la racine avec la clé nécessaire :

```
EXPO_PUBLIC_GEMINI_API_KEY=your_key_here
```

## Lancer l'application en développement

```bash
npm start          # démarre le serveur Metro / Expo (menu interactif)
npm run android     # lance sur un émulateur/appareil Android connecté
npm run ios         # lance sur un simulateur/appareil iOS (macOS uniquement)
npm run web          # lance la version web
```

## Structure du projet

```
App.tsx                # point d'entrée de l'app, navigation racine
index.js                # registerRootComponent Expo
src/
  api/                   # clients API externes (ex: IA)
  components/            # composants réutilisables (UI, animations, audio)
  data/                   # données statiques (vocabulaire, etc.)
  lib/                    # logique métier, hooks, contextes (profils, quiz, audio, discours...)
  screens/                # écrans de l'application (Accueil, Alphabet, Cours, Quiz, ...)
  theme/                  # thème, images, styles partagés
  utils/                  # fonctions utilitaires
assets/                  # icônes, images, splash screen
```

## Build de l'application

Les builds sont gérés via [EAS Build](https://docs.expo.dev/build/introduction/), configuré dans [eas.json](eas.json). Trois profils sont disponibles : `development`, `preview` et `production`.

### Se connecter à EAS (une seule fois)

```bash
npx eas login
```

### Builds Android

```bash
# Build de développement (client de dev, pour tester avec Expo Dev Client)
npx eas build -p android --profile development

# Build de préview (APK installable directement, distribution interne)
npx eas build -p android --profile preview

# Build de production (App Bundle .aab, destiné au Play Store)
npx eas build -p android --profile production
```

Raccourci npm équivalent au profil par défaut :

```bash
npm run build:android
```

### Builds iOS

```bash
# Build de développement
npx eas build -p ios --profile development

# Build de préview (distribution interne)
npx eas build -p ios --profile preview

# Build de production (destiné à l'App Store)
npx eas build -p ios --profile production
```

Raccourci npm équivalent :

```bash
npm run build:ios
```

### Build local (sans passer par le cloud EAS)

Nécessite les toolchains natives installées (Xcode / Android Studio) :

```bash
npx eas build -p android --profile preview --local
npx eas build -p ios --profile preview --local
```

Ou via les commandes Expo classiques (génère les dossiers natifs `android/` et `ios/`) :

```bash
npx expo run:android
npx expo run:ios
```

### Soumission aux stores

```bash
npx eas submit -p android
npx eas submit -p ios
```

## Tests

```bash
npm test
```

## Notes

- Identifiants d'application : `com.monapparabe.app` (Android package / iOS bundle identifier)
- Project ID EAS : voir `app.json` (`expo.extra.eas.projectId`)
- Les profils `preview` et `production` définissent des options `GRADLE_OPTS` pour fiabiliser le build Android en cas de réseau instable
