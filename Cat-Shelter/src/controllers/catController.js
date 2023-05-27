const router = require('express').Router();
const catManager = require('../managers/catManager');

router.get('/add-cat', (req, res) => {
    const breedsPromise = catManager.getBreed()
        .then(breeds => res.render('addCat', { breeds }));
});

router.get('/add-breed', (req, res) => {
    res.render('addBreed');
});

router.post('/add-breed', (req, res) => {
    const breed = req.body.breed;
    catManager.addBreed(breed);
    res.redirect('/');
});

router.post('/add-cat', (req, res) => {
    const {
        name,
        description,
        upload,
        breed
    } = req.body;

    catManager.createCat(name, description, upload, breed);
    res.redirect('/');
});

module.exports = router;