const router = require('express').Router();

const gameManager = require('../managers/gameManager');

router.get('/catalog', async (req, res) => {
    const games = await gameManager.getGames().lean();

    res.render('game/catalog', { games });
});

router.get('/create', (req, res) => {
    res.render('game/create');
});

router.post('/create', async (req, res) => {
    const { platform, name, imageUrl, price, genre, description } = req.body;

    try {
        await gameManager.createGame({
            platform,
            name,
            imageUrl,
            price: Number(price),
            genre,
            description,
            owner: req.user._id
        });

        res.redirect('/games/catalog');
    } catch (error) {
        console.log(error);
    }

});

router.get('/details/:gameId', async (req, res) => {
    try {
        const game = await gameManager.getGameById(req.params.gameId).lean();

        if (!game) {
            res.redirect('/404');
        }

        const isOwner = game.owner?.toString() === req.user?._id;

        res.render('game/details', { game, isOwner });
    } catch (error) {
        console.log(error);
    }

});

router.get('/details/edit', (req, res) => {
    res.render('game/edit');
});
module.exports = router;