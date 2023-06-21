const router = require('express').Router();

const animalManager = require('../managers/animalManager');
const { getErrorMessages, castErrorType } = require('../utils/errorHelper');
const { isAuth } = require('../middlewares/authMiddleware');

router.get('/dashboard', async (req, res) => {
    try {
        const animals = await animalManager.getAllAnimals();

        res.render('animals/dashboard', { animals });
    } catch (error) {
        res.render('404');
    }
});

router.get('/create', isAuth, (req, res) => {
    res.render('animals/create');
});

router.post('/create', isAuth, async (req, res) => {
    const { name, years, kind, imageUrl, need, location, description } = req.body;

    try {
        await animalManager.createAnimal({
            name,
            years: Number(years),
            kind,
            imageUrl,
            need,
            location,
            description,
            owner: req.user._id,
        });

        res.redirect('/animals/dashboard');
    } catch (error) {
        res.render('animals/create', { errors: getErrorMessages(error) });
    }
});

router.get('/details/:animalId', async (req, res) => {
    const animalId = req.params.animalId;
    const user = req.user;

    try {
        const animal = await animalManager.getOneAnimal(animalId).lean();

        const isOwner = req.user?._id === animal.owner?._id.toString();
        const isDonated = animal.donations?.toString() === req.user?._id && isOwner === false;

        res.render('animals/details', { animal, isOwner, isDonated, user });
    } catch (error) {
        res.render('404');
    }
});

router.get('/donate/:animalId', isAuth, async (req, res) => {
    const animalId = req.params.animalId;
    const userId = req.user._id;

    try {
        await animalManager.donate(animalId, userId);

        res.redirect(`/animals/details/${animalId}`);
    } catch (error) {
        res.render('404');
    }
});

router.get('/delete/:animalId', isAuth, async (req, res) => {
    try {
        await animalManager.deleteAnimal(req.params.animalId);

        res.redirect('/animals/dashboard');
    } catch (error) {
        res.render('404');
    }
});

router.get('/edit/:animalId', isAuth, async (req, res) => {
    try {
        const animal = await animalManager.getOneAnimal(req.params.animalId).lean();

        res.render('animals/edit', { animal });
    } catch (error) {
        res.render('404');
    }
});

router.post('/edit/:animalId', isAuth, async (req, res) => {
    const animalId = req.params.animalId;
    const { name, years, kind, imageUrl, need, location, description } = req.body;

    try {
        await animalManager.editAnimal(animalId, { name, years, kind, imageUrl, need, location, description });

        res.redirect(`/animals/details/${animalId}`);
    } catch (error) {
        const animal = await animalManager.getOneAnimal(animalId).lean();

        if (error.name === 'CastError') {
            res.render('animals/edit', { errors: castErrorType(error), animal });
        } else {
            res.render('animals/edit', { errors: getErrorMessages(error), animal });
        }
    }
});

module.exports = router;