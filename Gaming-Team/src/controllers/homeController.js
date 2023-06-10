const router = require('express').Router();

const gameManager = require('../managers/gameManager');

router.get('/', (req, res) => {
    res.render('home');
});

router.get('/search', async (req, res) => {
    const { name, platform} = req.query;

    try {
        const games = await gameManager.getGames(name, platform);

        res.render('search', { games, name, platform });
    } catch (error) {
        console.log(error);
    }

});

router.get('/404', (req, res) => {
    res.render('404');
});

module.exports = router;