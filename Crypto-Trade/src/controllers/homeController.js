const router = require('express').Router();

const cryptoManager = require('../managers/cryptoManager');

router.get('/', (req, res) => {
    res.render('home');
});

router.get('/search', async (req, res) => {
    const { search, select } = req.query;

    try {
        const cryptos = await cryptoManager.getCryptos(search, select);

        res.render('search', {cryptos, search, select});
    } catch (error) {
        res.render('404');
    }

});

module.exports = router;