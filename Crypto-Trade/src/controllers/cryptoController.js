const router = require('express').Router();

const { cryptoValidator } = require('../utils/validators');
const cryptoManager = require('../managers/cryptoManager');
const { getPaymentMethodsViewData } = require('../utils/viewHelper');
const { changeCharacters } = require('../utils/editPaymentMethod');

router.get('/catalog', async (req, res) => {
    try {
        const cryptos = await cryptoManager.getCryptos().lean();

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
        const result = changeCharacters(payment);

            await cryptoManager.createCrypto({
                name,
                imageUrl,
                price: Number(price),
                description,
                payment: result,
                owner: req.user._id,
            });

        res.redirect('/crypto/catalog');
    } catch (error) {
        const data = req.body;

        res.render('crypto/create', { error: error.message, data });
    }
});

router.get('/details/:cryptoId', async (req, res) => {
    const cryptoId = req.params.cryptoId;
    const user = req.user;

    try {
        const crypto = await cryptoManager.getCryptoById(cryptoId).lean();

        const isOwner = user?._id.toString() === crypto.owner?.toString();
        const isBought = user?._id.toString() === crypto.boughtBy?.toString() && isOwner === false;

        res.render('crypto/details', { crypto, isOwner, user, isBought });
    } catch (error) {
        res.render('404');
    }
});

router.get('/buy/:cryptoId', async (req, res) => {
    const cryptoId = req.params.cryptoId;

    try {
        await cryptoManager.buyCrypto(cryptoId, req.user._id);

        res.redirect(`/crypto/details/${cryptoId}`);
    } catch (error) {
        res.render('404');
    }
});

router.get('/delete/:cryptoId', async (req, res) => {
    try {
        await cryptoManager.deleteCrypto(req.params.cryptoId);

        res.redirect('/crypto/catalog');
    } catch (error) {
        res.render('404');
    }
});

router.get('/edit/:cryptoId', async (req, res) => {
    try {
        const crypto = await cryptoManager.getCryptoById(req.params.cryptoId).lean();

        const options = getPaymentMethodsViewData(crypto.payment);

        res.render('crypto/edit', { crypto, options });
    } catch (error) {
        res.render('404');
    }
});

module.exports = router;