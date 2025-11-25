# 🛠️ Guide de Personnalisation

Ce fichier explique comment modifier facilement le projet pour l'adapter à vos besoins.

## 🎨 Modifier les couleurs

### Couleurs principales
Dans `src/index.css` et `src/App.css`, modifier les dégradés :

```css
/* Dégradé bleu/violet actuel */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

/* Exemples d'autres dégradés */
background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); /* Rose
background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); /* Cyan */
background: linear-gradient(135deg, #fa709a 0%, #fee140 100%); /* Orange */
```

## 📝 Modifier les questions du Quiz

Dans `src/games/QuizGame.jsx`, ligne 4-31 :

```javascript
const questions = [
  {
    question: "Votre question ici ?",
    options: ["Réponse A", "Réponse B", "Réponse C", "Réponse D"],
    correct: 0  // Index de la bonne réponse (0 = première option)
  },
  // Ajoutez plus de questions...
]
```

**Modifier la difficulté :**
Ligne 37, changer `score >= 3` pour changer le nombre de bonnes réponses requises.

## 🧩 Modifier le Puzzle

### Changer les couleurs du puzzle
Dans `src/games/PuzzleGame.jsx`, ligne 5-15 :

```javascript
const createPuzzleImage = () => {
  const colors = [
    '#667eea', '#764ba2', '#56ab2f', // Remplacez par vos couleurs
    '#a8e063', '#4facfe', '#00f2fe',
    '#43e97b', '#38f9d7', '#fa709a'
  ]
  return colors
}
```

### Taille de la grille
Pour changer de 3x3 à 4x4, modifier plusieurs endroits dans `PuzzleGame.jsx` et `PuzzleGame.css` :
- Ajouter plus de couleurs (16 au lieu de 9)
- Modifier `grid-template-columns: repeat(4, 1fr)` dans le CSS

## 🏃 Modifier le Runner

### Changer la durée du jeu
Dans `src/games/RunnerGame.jsx`, ligne 18 :

```javascript
const WIN_TIME = 20 // Changer à 30, 40, etc.
```

### Modifier la difficulté

**Plus facile :**
```javascript
// Ligne 31-32 : Ralentir les obstacles
.map(obs => ({ ...obs, x: obs.x - 3 })) // au lieu de - 5

// Ligne 40 : Générer moins d'obstacles
}, 3000) // au lieu de 2000
```

**Plus difficile :**
```javascript
// Obstacles plus rapides
.map(obs => ({ ...obs, x: obs.x - 7 }))

// Plus d'obstacles
}, 1500)
```

### Changer les tailles
Lignes 13-16 :

```javascript
const PLAYER_SIZE = 50      // Taille du joueur
const OBSTACLE_WIDTH = 40   // Largeur obstacles
const OBSTACLE_HEIGHT = 50  // Hauteur obstacles
```

## 🎁 Modifier la Carte Cadeau

Dans `src/components/GiftCard.jsx` :

### Changer le montant
Ligne 13 :
```jsx
<div className="card-amount">100€</div>  {/* Au lieu de 50€ */}
```

### Changer le code
Ligne 15 :
```jsx
<div className="card-code">Code: NOEL2025</div>
```

### Changer le message
Lignes 9-11 :
```jsx
<h1 className="gift-title">Bravo Sarah !</h1>
<p className="gift-message">
  Tu as réussi tous les défis !
</p>
```

## 📊 Modifier la Barre de Progression

Dans `src/components/ProgressBar.jsx`, ligne 5-9 :

```javascript
const steps = [
  { name: 'Quiz', completed: progress.quiz, icon: '🧠' },
  { name: 'Puzzle', completed: progress.puzzle, icon: '🧩' },
  { name: 'Runner', completed: progress.runner, icon: '🏃' }
]
```

Changez les noms, icônes, ou ajoutez plus d'étapes.

## 🏠 Modifier la Page d'Accueil

Dans `src/components/HomePage.jsx` :

### Titre
Ligne 7 :
```jsx
<h1 className="home-title">🏔️ Vos Jeux</h1>
```

### Sous-titre
Ligne 8 :
```jsx
<p className="home-subtitle">Le Défi de Sarah</p>
```

### Description
Lignes 10-16 :
```jsx
<p>Bienvenue dans votre aventure !</p>
<p>Relève ces défis :</p>
```

## 🔧 Ajouter un 4ème jeu

1. **Créer le composant**
   ```bash
   # Créer src/games/Game4.jsx + Game4.css
   ```

2. **Importer dans App.jsx**
   ```javascript
   import Game4 from './games/Game4'
   ```

3. **Ajouter au state**
   ```javascript
   const [progress, setProgress] = useState({
     quiz: false,
     puzzle: false,
     runner: false,
     game4: false  // Ajouter
   })
   ```

4. **Ajouter la navigation**
   ```javascript
   {currentScreen === 'game4' && (
     <Game4 onComplete={() => handleGameComplete('game4')} />
   )}
   ```

5. **Modifier la progression**
   Dans `handleGameComplete`, ajuster la logique.

## 🌍 Changer la langue

Tous les textes sont en français. Pour traduire en anglais :

1. Chercher tous les fichiers `.jsx`
2. Remplacer les textes :
   - "Commencer" → "Start"
   - "Réessayer" → "Retry"
   - "Bravo" → "Congratulations"
   - etc.

**Astuce :** Utiliser la fonction "Rechercher et remplacer" de VS Code (Ctrl+Shift+H)

## 📱 Désactiver le responsive

Si vous voulez une largeur fixe, dans `App.css` :

```css
.game-container {
  max-width: 800px;
  min-width: 800px;  /* Ajouter */
}
```

## 🎵 Ajouter des sons

1. **Installer howler.js**
   ```bash
   npm install howler
   ```

2. **Dans un composant**
   ```javascript
   import { Howl } from 'howler'

   const sound = new Howl({
     src: ['/sounds/victory.mp3']
   })

   // Jouer le son
   sound.play()
   ```

## 💾 Sauvegarder la progression

Pour sauvegarder la progression dans `localStorage` :

Dans `App.jsx`, ajouter :

```javascript
// Sauvegarder
useEffect(() => {
  localStorage.setItem('progress', JSON.stringify(progress))
}, [progress])

// Charger
useEffect(() => {
  const saved = localStorage.getItem('progress')
  if (saved) {
    setProgress(JSON.parse(saved))
  }
}, [])
```

## 🏆 Ajouter un système de score global

```javascript
const [totalScore, setTotalScore] = useState(0)

// Dans chaque jeu, ajouter au score
setTotalScore(prev => prev + points)

// Afficher dans GiftCard
<p>Score total : {totalScore}</p>
```

## 🎨 Thèmes additionnels

Créer un fichier `src/themes.js` :

```javascript
export const themes = {
  mountain: {
    primary: '#667eea',
    secondary: '#764ba2'
  },
  ocean: {
    primary: '#4facfe',
    secondary: '#00f2fe'
  },
  forest: {
    primary: '#56ab2f',
    secondary: '#a8e063'
  }
}
```

Puis utiliser avec un state pour changer de thème dynamiquement.

## 📝 Notes importantes

- Toujours tester après modification
- Faire `npm run build` pour vérifier que tout compile
- Les modifications CSS sont instantanées avec hot-reload
- Commiter régulièrement avec Git

---

## 🆘 Besoin d'aide pour une modification ?

1. Identifier le fichier à modifier (voir structure ci-dessus)
2. Faire une sauvegarde : `git commit -am "Backup avant modif"`
3. Modifier le code
4. Tester avec `npm run dev`
5. Si problème : `git checkout .` pour annuler

Bonne personnalisation ! 🎨
