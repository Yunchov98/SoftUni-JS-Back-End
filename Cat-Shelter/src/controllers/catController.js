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

router.get('/edit-cat/:catId', (req, res) => {
    const catPromise = catManager.getCatById(req.params.catId)
        .then(cat => res.render('editCat', { cat }));
});

router.post('/edit-cat/:catId', (req, res) => {
    const catId = req.params.catId;
    const {
        name,
        description,
        img,
        breed,
    } = req.body;

    catManager.editCat(catId, name, description, img, breed);
    res.redirect('/');
});

router.get('/new-home/:catId', (req, res) => {
    const catPromise = catManager.getCatById(req.params.catId)
        .then(cat => res.render('catShelter', { cat }));
});

router.post('/new-home/:catId', (req, res) => {
    const catId = req.params.catId;
    catManager.deleteCat(catId);
    res.redirect('/congrats');
});

module.exports = router;