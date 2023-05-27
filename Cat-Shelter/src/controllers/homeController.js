const router = require('express').Router();
const catManager = require('../managers/catManager');

router.get('/', (req, res) => {
    const catsPromise = catManager.getCats()
        .then(cats => res.render('home', { cats }));
});

router.get('/congrats', (req, res) => {
    res.render('congratulations');
});

module.exports = router;