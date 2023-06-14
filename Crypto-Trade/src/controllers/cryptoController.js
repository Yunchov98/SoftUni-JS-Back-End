const router = require('express').Router();

const { cryptoValidator } = require('../utils/validators');
const cryptoManager = require('../managers/cryptoManager');

router.get('/catalog', (req, res) => {
    res.render('crypto/catalog');
});

router.get('/create', (req, res) => {
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