# 🎮 cube3D - Mon Premier Projet 3D

Un projet simple et pédagogique pour découvrir la 3D avec Three.js.
Ce projet affiche un cube 3D qui tourne dans une scène interactive.

## 🎯 Objectifs

- Apprendre les bases de Three.js
- Comprendre la structure d'une scène 3D (scène, caméra, renderer)
- Créer une architecture modulaire et scalable
- Implémenter un design responsive mobile-first

## 🚀 Démarrage rapide

### Prérequis

- Un navigateur web moderne (Chrome, Firefox, Safari, Edge)
- Un éditeur de code (VS Code recommandé)
- Un serveur local (Live Server, Python http.server, etc.)

### Installation

1. Clonez ou téléchargez le projet

```bash
git clone [votre-repo]/cube3D.git
cd cube3D

Lancez un serveur local

# Avec Python 3
python -m http.server 8000

# Avec Python 2
python -m SimpleHTTPServer 8000

# Avec Node.js (si vous avez installé http-server)
npx http-server

Ouvrez votre navigateur à http://localhost:8000

📚 Structure du projet
cube3D/
├── index.html              # Point d'entrée HTML
├── css/
│   ├── reset.css          # Reset CSS navigateurs
│   ├── variables.css      # Variables CSS (couleurs, tailles)
│   └── styles.css         # Styles principaux
├── js/
│   ├── config.js          # Configuration globale
│   ├── components/        # Composants 3D modulaires
│   │   ├── Scene.js       # Gestion de la scène
│   │   ├── Camera.js      # Gestion de la caméra
│   │   ├── Renderer.js    # Gestion du rendu
│   │   ├── Cube.js        # Création du cube
│   │   └── Lights.js      # Gestion des lumières
│   ├── utils/
│   │   └── responsive.js  # Utilitaires responsive
│   └── main.js            # Point d'entrée JavaScript
└── assets/                # Ressources (textures, modèles)
🎨 Fonctionnalités

✅ Cube 3D avec rotation automatique
✅ Éclairage ambiant et directionnel
✅ Design responsive (mobile-first)
✅ Architecture modulaire
✅ Code commenté et documenté
✅ Compatible tous navigateurs modernes

🛠️ Technologies utilisées

Three.js (r150+) - Bibliothèque 3D
HTML5 - Structure
CSS3 - Styles et responsive
JavaScript ES6+ - Logique

📖 Concepts Three.js abordés

Scene : Le conteneur de tous les objets 3D
Camera : Le point de vue de l'utilisateur
Renderer : Le moteur de rendu WebGL
Mesh : Combinaison géométrie + matériau
Lights : Sources lumineuses pour éclairer la scène
Animation Loop : Boucle de rendu pour l'animation

🎓 Pour aller plus loin
Exercices suggérés

Facile : Changer la couleur du cube
Facile : Modifier la vitesse de rotation
Moyen : Ajouter une sphère à côté du cube
Moyen : Ajouter des contrôles de caméra (OrbitControls)
Avancé : Ajouter des textures sur le cube
Avancé : Créer une interaction au clic sur le cube

Ressources utiles

Documentation Three.js
Exemples Three.js
Three.js Journey (cours complet)
Three.js Fundamentals

🐛 Résolution de problèmes
Le cube ne s'affiche pas

Vérifiez que vous utilisez un serveur local (pas file://)
Ouvrez la console pour voir les erreurs
Vérifiez que Three.js est bien chargé

Performance lente sur mobile

Réduisez la résolution du renderer
Limitez le nombre d'objets dans la scène

📝 License
Ce projet est libre d'utilisation à des fins pédagogiques.
👤 Auteur
Créé dans le cadre de l'apprentissage de la 3D avec Three.js
🤝 Contributions
Les suggestions et améliorations sont les bienvenues !
```
