# Smart Home Dashboard — site de test pour SonarQube

Lancer le site : ouvrir `index.html` (front) et `npm start` (back, port 3000).
Ce code contient des erreurs VOLONTAIRES. Ne jamais le déployer.

## Corrigé (à ne pas montrer avant l'analyse)
| Fichier | Type | Problème |
|---|---|---|
| app.js | Vulnérabilité | mot de passe et clé API en dur |
| app.js | Vulnérabilité | XSS via innerHTML (addDevice, searchRoom) |
| app.js | Vulnérabilité | eval() avec entrée utilisateur |
| app.js | Hotspot | Math.random pour un token |
| app.js | Bug | condition dupliquée, code mort après return |
| app.js | Code smell | var, ==, catch vide, parseInt sans radix, switch sans default, complexité cognitive, 7 paramètres, code dupliqué, TODO, code commenté |
| server.js | Vulnérabilité | injection SQL, injection de commande, MD5, TLS désactivé, secret en dur |
| server.js | Hotspot | CORS * |
| index.html | Bug/Accessibilité | pas de lang, img sans alt, champ sans label, id dupliqué, h1 vide |
| style.css | Bug | couleur invalide, règle vide, propriété dupliquée |
