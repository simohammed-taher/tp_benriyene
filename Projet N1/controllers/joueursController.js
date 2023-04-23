const fs = require('fs');
const path = require('path');

const joueursFilePath = path.join(__dirname, '..', 'joueurs.json');
const equipesFilePath = path.join(__dirname, '..', 'equipes.json');

const readJoueursData = () => {
    const rawData = fs.readFileSync(joueursFilePath, 'utf-8');
    return JSON.parse(rawData);
};

const writeJoueursData = (data) => {
    const jsonData = JSON.stringify(data, null, 2);
    fs.writeFileSync(joueursFilePath, jsonData, 'utf-8');
};

const readEquipesData = () => {
    const rawData = fs.readFileSync(equipesFilePath, 'utf-8');
    return JSON.parse(rawData);
};

// CRUD operations for Joueur
exports.createJoueur = (req, res) => {
    const joueurs = readJoueursData();
    const newJoueur = req.body;
    newJoueur.id = String(joueurs.length + 1);
    joueurs.push(newJoueur);
    writeJoueursData(joueurs);
    res.status(201).json(newJoueur);
};

exports.getJoueurById = (req, res) => {
    const joueurs = readJoueursData();
    const joueur = joueurs.find((j) => j.id === req.params.id);
    res.json(joueur);
};

exports.updateJoueur = (req, res) => {
    const joueurs = readJoueursData();
    const index = joueurs.findIndex((j) => j.id === req.params.id);
    const updatedJoueur = { ...joueurs[index], ...req.body };
    joueurs[index] = updatedJoueur;
    writeJoueursData(joueurs);
    res.json(updatedJoueur);
};

exports.deleteJoueur = (req, res) => {
    const joueurs = readJoueursData();
    const newJoueurs = joueurs.filter((j) => j.id !== req.params.id);
    writeJoueursData(newJoueurs);
    res.sendStatus(204);
};

// Additional routes
exports.getJoueursByEquipeId = (req, res) => {
    const joueurs = readJoueursData();
    const idEquipe = req.params.idEquipe;
    const joueursByEquipeId = joueurs.filter((joueur) => joueur.idEquipe === idEquipe);
    res.json(joueursByEquipeId);
};

exports.getEquipeByJoueurId = (req, res) => {
    const joueurs = readJoueursData();
    const equipes = readEquipesData();
    const joueur = joueurs.find((j) => j.id === req.params.id);

    if (!joueur) {
        res.status(404).json({ message: 'Joueur non trouvé' });
        return;
    }

    const equipe = equipes.find((e) => e.id === joueur.idEquipe);
    res.json(equipe);
};

exports.searchJoueurByName = (req, res) => {
    const joueurs = readJoueursData();
    const searchTerm = req.query.nom.toLowerCase();
    const joueursFiltres = joueurs.filter((joueur) =>
        joueur.nom.toLowerCase().includes(searchTerm)
    );
    res.json(joueursFiltres);
};