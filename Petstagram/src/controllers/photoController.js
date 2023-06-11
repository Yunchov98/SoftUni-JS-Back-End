const router = require('express').Router();

const photoManager = require('../managers/photoManager');
const Photo = require('../models/Photo');
const { getErrorMessage } = require('../utils/errorHelper');

router.get('/catalog', async (req, res) => {
    try {
        const petCards = await photoManager.getPopulatePhotos().lean();

        res.render('pet/catalog', { petCards });
    } catch (error) {
        res.render('404');
    }
});

router.get('/create', (req, res) => {
    res.render('pet/create');
});

router.post('/create', async (req, res) => {
    const { name, age, description, location, imageUrl } = req.body;

    try {
        await photoManager.createPhoto({
            name,
            age: Number(age),
            description,
            location,
            imageUrl,
            owner: req.user._id,
        });

        res.redirect('/pets/catalog');
    } catch (error) {
        const errorMessages = getErrorMessage(error);

        res.render('pet/create', { errorMessages });
    }
});

router.get('/details/:photoId', async (req, res) => {
    try {
        const photo = await photoManager.getPhotoById(req.params.photoId).lean();

        res.render('pet/details', { photo });
    } catch (error) {
        res.render('404');
    }
});

module.exports = router;