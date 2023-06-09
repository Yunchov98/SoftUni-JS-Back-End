const router = require('express').Router();

router.get('/catalog', (req, res) => {
    res.render('game/catalog');
});

router.get('/create', (req, res) => {
    res.render('game/create');
});

// TODO: router.post('/create')

router.get('/details/:gameId', (req, res) => {
    res.render('game/details');
});

router.get('/details/edit', (req, res) => {
    res.render('game/edit');
});
module.exports = router;