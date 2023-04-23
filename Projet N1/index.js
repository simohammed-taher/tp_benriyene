const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const joueursRoutes = require('./routes/joueursRoutes');

const app = express();

// Configuration des middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Utilisation des routes définies pour les joueurs
app.use('/api/joueurs', joueursRoutes);

// Gestion des erreurs 404
app.use((req, res, next) => {
    res.status(404).json({ message: 'Ressource non trouvée' });
});

// Configuration du port d'écoute du serveur
const PORT = process.env.PORT || 3000;

// Lancement du serveur
app.listen(PORT, () => {
    console.log(`Serveur en écoute sur le port ${PORT}`);
});
