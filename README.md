# 🏔️ Mountain Games - Le Défi de Tom

Un site web React avec 3 mini-jeux progressifs qui débloquent une carte cadeau.

## 🎮 Les Jeux

1. **Quiz Montagne** (Facile) - 5 questions sur le ski, trail et montagne
2. **Jeu de Réflexes** (Moyen) - Cliquer sur 15 cibles en 30 secondes
3. **Descente de Ski** (Difficile) - Éviter les obstacles pendant 25 secondes

## 🚀 Installation locale

```bash
# Installer les dépendances
npm install

# Lancer en mode développement
npm run dev

# Builder pour la production
npm run build
```

## 📦 Déploiement sur Vercel

### Option 1 : Via le site Vercel (Recommandé)

1. Créer un compte sur [Vercel](https://vercel.com)
2. Cliquer sur "New Project"
3. Importer votre repository Git (GitHub, GitLab, Bitbucket)
4. Vercel détectera automatiquement qu'il s'agit d'un projet Vite
5. Cliquer sur "Deploy"

### Option 2 : Via Vercel CLI

```bash
# Installer Vercel CLI globalement
npm install -g vercel

# Se connecter à Vercel
vercel login

# Déployer (première fois)
vercel

# Déployer en production
vercel --prod
```

### Configuration automatique

Le fichier `vercel.json` est déjà configuré avec :
- Build command : `npm run build`
- Output directory : `dist`
- Install command : `npm install`

## 🛠️ Technologies utilisées

- **React 18** - Framework UI
- **Vite** - Build tool
- **CSS Modules** - Styling
- **Hooks React** - State management

## 📁 Structure du projet

```
mountain-games/
├── src/
│   ├── components/
│   │   ├── HomePage.jsx
│   │   ├── ProgressBar.jsx
│   │   └── GiftCard.jsx
│   ├── games/
│   │   ├── QuizGame.jsx
│   │   ├── PuzzleGame.jsx
│   │   └── RunnerGame.jsx
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
└── vercel.json
```

## 🎨 Fonctionnalités

- ✅ Progression linéaire à travers les jeux
- ✅ Barre de progression visuelle
- ✅ Design minimaliste blanc/bleu
- ✅ Animations fluides
- ✅ Responsive design
- ✅ Carte cadeau finale avec code

## 🎯 Objectifs des jeux

- **Quiz** : Répondre correctement à 3/5 questions
- **Réflexes** : Cliquer sur 15 cibles en moins de 30 secondes
- **Ski** : Descendre la piste pendant 25 secondes en évitant les obstacles
