const router = require('express').Router();

const gameManager = require('../managers/gameManager');
const { isAuth } = require('../middlewares/authMiddleware');
const { getPlatformsViewData } = require('../utils/viewHelper');

router.get('/catalog', async (req, res) => {
    const games = await gameManager.getGames().lean();

    res.render('game/catalog', { games });
});

router.get('/create', isAuth, (req, res) => {
    res.render('game/create');
});

router.post('/create', isAuth, async (req, res) => {
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
        const user = req.user;

        if (!game) {
            res.redirect('/404');
        }


        const isOwner = game.owner?.toString() === req.user?._id;
        const isBought = game.boughtBy?.toString() === req.user?._id && game.owner?.toString() !== game.boughtBy?.toString();

        res.render('game/details', { game, isOwner, isBought, user });
    } catch (error) {
        console.log(error);
    }

});

router.get('/edit/:gameId', isAuth, async (req, res) => {
    const gameId = req.params.gameId;

    try {
        const game = await gameManager.getGameById(gameId).lean();

        if (!game) {
            res.redirect('/404');
        }

        const options = getPlatformsViewData(game.platform);

        res.render('game/edit', { game, options });
    } catch (error) {
        console.log(error);
    }
});

router.post('/edit/:gameId', isAuth, async (req, res) => {
    const gameId = req.params.gameId;
    const { platfrom, name, imageUrl, price, genre, description } = req.body;

    try {
        await gameManager.editGame(gameId, platfrom, name, imageUrl, price, genre, description);

        res.redirect(`/games/details/${gameId}`);
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;