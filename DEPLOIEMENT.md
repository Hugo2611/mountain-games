# 🚀 Guide de Déploiement sur Vercel

## Prérequis
- Un compte GitHub (gratuit)
- Un compte Vercel (gratuit)

## Étape 1 : Préparer le repository Git

1. Initialiser Git (si ce n'est pas déjà fait) :
```bash
git init
git add .
git commit -m "Initial commit - Mountain Games"
```

2. Créer un nouveau repository sur GitHub :
   - Aller sur https://github.com/new
   - Nommer le repository "mountain-games"
   - Ne pas initialiser avec README (déjà créé)
   - Cliquer sur "Create repository"

3. Pousser le code vers GitHub :
```bash
git remote add origin https://github.com/VOTRE_USERNAME/mountain-games.git
git branch -M main
git push -u origin main
```

## Étape 2 : Déployer sur Vercel

### Méthode 1 : Via l'interface Web (Plus simple)

1. **Se connecter à Vercel**
   - Aller sur https://vercel.com
   - Cliquer sur "Sign Up" ou "Login"
   - Choisir "Continue with GitHub"

2. **Importer le projet**
   - Cliquer sur "Add New..." → "Project"
   - Sélectionner le repository "mountain-games"
   - Vercel détecte automatiquement Vite

3. **Configuration (déjà faite automatiquement)**
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

4. **Déployer**
   - Cliquer sur "Deploy"
   - Attendre 1-2 minutes
   - Votre site est en ligne ! 🎉

### Méthode 2 : Via Vercel CLI

```bash
# Installer Vercel CLI
npm install -g vercel

# Se connecter
vercel login

# Déployer
vercel

# Répondre aux questions :
# - Set up and deploy? Yes
# - Which scope? Votre compte
# - Link to existing project? No
# - Project name? mountain-games
# - Directory? ./
# - Override settings? No

# Déployer en production
vercel --prod
```

## Étape 3 : Tester le site

Une fois déployé, vous recevrez une URL comme :
- `https://mountain-games.vercel.app`
- `https://mountain-games-abc123.vercel.app`

Testez tous les jeux :
1. ✅ Quiz Montagne
2. ✅ Puzzle des Sommets  
3. ✅ Runner du Trail
4. ✅ Carte Cadeau finale

## 🔄 Mises à jour automatiques

Chaque fois que vous faites un `git push` vers GitHub :
- Vercel détecte automatiquement le changement
- Lance un nouveau build
- Déploie la nouvelle version
- Aucune intervention manuelle nécessaire !

## 🌐 Domaine personnalisé (Optionnel)

1. Dans Vercel, aller dans les paramètres du projet
2. Section "Domains"
3. Ajouter votre domaine personnalisé
4. Suivre les instructions pour configurer le DNS

## 📊 Analytics et Monitoring

Vercel fournit gratuitement :
- Analytics de trafic
- Web Vitals (performance)
- Logs de déploiement
- Preview deployments pour chaque PR

## 🐛 Résolution de problèmes

### Le build échoue
```bash
# Tester localement d'abord
npm run build

# Si ça marche localement mais pas sur Vercel,
# vérifier les logs dans l'interface Vercel
```

### Les styles ne s'affichent pas
- Vérifier que tous les fichiers .css sont importés
- Effacer le cache de Vercel (Deployments → Redeploy)

### Le site est lent
- Vite optimise automatiquement
- Vercel utilise un CDN global
- Pas de configuration supplémentaire nécessaire

## 🎉 C'est terminé !

Votre site Mountain Games est maintenant en ligne et accessible au monde entier !

URL de production : `https://mountain-games.vercel.app`

Partagez le lien et laissez les joueurs relever les défis ! 🏔️
