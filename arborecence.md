📁 Structure du projet

cube3D/
├── index.html # Point d'entrée HTML
├── css/
│ ├── reset.css # Reset CSS navigateurs
│ ├── variables.css # Variables CSS (couleurs, tailles)
│ └── styles.css # Styles principaux
├── js/
│ ├── config.js # Configuration globale
│ ├── components/ # Composants 3D modulaires
│ │ ├── Scene.js # Gestion de la scène
│ │ ├── Camera.js # Gestion de la caméra
│ │ ├── Renderer.js # Gestion du rendu
│ │ ├── Cube.js # Création du cube
│ │ └── Lights.js # Gestion des lumières
│ ├── utils/
│ │ └── responsive.js # Utilitaires responsive
│ └── main.js # Point d'entrée JavaScript
└── assets/ # Ressources (textures, modèles)
