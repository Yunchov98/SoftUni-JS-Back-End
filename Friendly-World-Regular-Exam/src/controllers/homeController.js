const router = require('express').Router();

const animalManager = require('../managers/animalManager');

router.get('/', async (req, res) => {
    const animals = await animalManager.getAllAnimals();

    const neededAnimals = animals.slice(-3);
    res.render('home', { neededAnimals });
});

router.get('/search', async (req, res) => {
    const { search } = req.query;

    try {
        const animals = await animalManager.getAllAnimals(search);

        animals.sort((a, b) => a.location.localeCompare(b.location));

        res.render('search', { animals, search });
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;