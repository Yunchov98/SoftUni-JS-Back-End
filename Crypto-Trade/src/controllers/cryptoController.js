const router = require('express').Router();

const { cryptoValidator } = require('../utils/validators');
const cryptoManager = require('../managers/cryptoManager');

router.get('/catalog', async (req, res) => {
    try {
        const cryptos = await cryptoManager.getCryptos().lean();
        console.log(cryptos);
        res.render('crypto/catalog', { cryptos });
    } catch (error) {
        res.render('404');
    }
});

router.get('/create', async (req, res) => {
    res.render('crypto/create');
});

router.post('/create', async (req, res) => {
    const { name, imageUrl, price, description, payment } = req.body;

    try {
        cryptoValidator(name, imageUrl, price, description, payment);

        await cryptoManager.createCrypto({ name, imageUrl, price, description, payment });

        res.redirect('/crypto/catalog');
    } catch (error) {
        const data = req.body;

        res.render('crypto/create', { error: error.message, data });
    }
});

module.exports = router;