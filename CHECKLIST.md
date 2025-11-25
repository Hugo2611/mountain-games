# ✅ CHECKLIST DE VÉRIFICATION

Avant de déployer, vérifiez que tout fonctionne :

## 🏠 Page d'accueil
- [ ] Le titre "Mountain Games" s'affiche
- [ ] Le bouton "Commencer l'Aventure" fonctionne
- [ ] Les 3 défis sont listés

## 🧠 Jeu 1 : Quiz Montagne
- [ ] Les 5 questions s'affichent une par une
- [ ] Les boutons de réponse sont cliquables
- [ ] Le feedback vert/rouge s'affiche
- [ ] La bonne réponse est révélée
- [ ] Le compteur "Question X/5" s'affiche
- [ ] Avec 3+ bonnes réponses, passage au puzzle
- [ ] Avec moins de 3, bouton "Réessayer" visible

## 🧩 Jeu 2 : Puzzle des Sommets
- [ ] La grille 3x3 s'affiche avec des couleurs
- [ ] Cliquer sur une case la sélectionne (bordure bleue)
- [ ] Cliquer sur une 2ème case échange les deux
- [ ] Le compteur de coups augmente
- [ ] Le bouton "Réinitialiser" fonctionne
- [ ] Quand résolu, message de victoire
- [ ] Bouton "Passer au Runner" visible

## 🏃 Jeu 3 : Runner du Trail
- [ ] L'écran d'instructions s'affiche
- [ ] Le bouton "Démarrer" lance le jeu
- [ ] Le personnage 🏃 est visible
- [ ] Appuyer sur ESPACE fait sauter
- [ ] Cliquer fait sauter
- [ ] Les obstacles rouges défilent
- [ ] Le timer compte jusqu'à 20s
- [ ] La barre de progression se remplit
- [ ] Collision = Game Over
- [ ] 20 secondes = Victoire
- [ ] Bouton "Récupérer la carte cadeau" visible

## 🎁 Carte Cadeau
- [ ] Message "Bravo Tom !" s'affiche
- [ ] La carte cadeau est visible et stylée
- [ ] Le montant "50€" s'affiche
- [ ] Le code "MOUNTAIN2025" est visible
- [ ] Le bouton "Télécharger/Imprimer" fonctionne
- [ ] Le bouton "Recommencer" ramène à l'accueil

## 📊 Barre de Progression
- [ ] Les 3 étapes sont visibles en haut
- [ ] Les icônes 🧠 🧩 🏃 s'affichent
- [ ] Les étapes complétées deviennent violettes avec ✓
- [ ] La ligne entre les étapes devient violette

## 🎨 Design
- [ ] Le dégradé bleu/violet est visible en fond
- [ ] Les cartes blanches sont bien arrondies
- [ ] Les boutons ont un effet hover
- [ ] Les animations fonctionnent (bounce, fade, etc.)
- [ ] Pas de texte qui dépasse
- [ ] Tout est lisible

## 📱 Responsive
- [ ] Le site s'affiche bien sur mobile (inspecter > mode mobile)
- [ ] Le site s'affiche bien sur tablette
- [ ] Le site s'affiche bien sur desktop

## ⚙️ Technique
- [ ] Aucune erreur dans la console (F12)
- [ ] `npm run dev` fonctionne
- [ ] `npm run build` réussit
- [ ] Le build produit un dossier `dist/`
- [ ] `npm run preview` affiche le site

## 🚀 Git & Deploy
- [ ] `git status` montre "working tree clean"
- [ ] Tous les fichiers sont commités
- [ ] Le fichier `.gitignore` ignore `node_modules/` et `dist/`
- [ ] Le fichier `vercel.json` existe
- [ ] Le `README.md` est complet

---

## 🧪 Test Complet (Faire dans l'ordre)

1. Ouvrir http://localhost:5173
2. Cliquer "Commencer l'Aventure"
3. Répondre au quiz (faire au moins 3/5)
4. Résoudre le puzzle
5. Jouer au runner (survivre 20s)
6. Voir la carte cadeau
7. Cliquer "Recommencer"
8. Vérifier qu'on est revenu à l'accueil

**Si tout fonctionne : ✅ PRÊT À DÉPLOYER !**

---

## 🐛 Problèmes courants

### Le serveur ne démarre pas
```bash
npm install
npm run dev
```

### Erreurs dans la console
- Ouvrir F12 > Console
- Noter l'erreur
- Vérifier les imports dans les fichiers .jsx

### Le build échoue
```bash
npm run build
# Lire les erreurs et corriger
```

### Git refuse de commit
```bash
git config user.email "votre@email.com"
git config user.name "Votre Nom"
git commit -m "message"
```

### Vite ne se lance pas
- Fermer tous les terminaux
- Supprimer `node_modules/`
- `npm install`
- `npm run dev`

---

## 📞 Support

Si vous rencontrez un problème non listé :

1. Vérifier les fichiers de logs
2. Chercher l'erreur sur Google
3. Vérifier que toutes les dépendances sont installées
4. Comparer avec les fichiers d'origine

---

**Date du test : ______________**

**Testé par : ______________**

**Résultat : ⬜ PASS   ⬜ FAIL**

**Notes :**
_________________________
_________________________
_________________________
