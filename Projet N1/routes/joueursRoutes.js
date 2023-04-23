const express = require('express');
const {
    createJoueur,
    getJoueurById,
    updateJoueur,
    deleteJoueur,
    getJoueursByEquipeId,
    getEquipeByJoueurId,
    searchJoueurByName
} = require('../controllers/joueursController');

const router = express.Router();

router.post('/', createJoueur);
router.get('/:id', getJoueurById);
router.put('/:id', updateJoueur);
router.delete('/:id', deleteJoueur);
router.get('/equipe/:idEquipe', getJoueursByEquipeId);
router.get('/:id/equipe', getEquipeByJoueurId);
router.get('/search', searchJoueurByName);

module.exports = router;
