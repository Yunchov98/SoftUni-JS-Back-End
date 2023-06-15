const router = require('express').Router();

const cryptoManager = require('../managers/cryptoManager');
const { getPaymentMethodsViewData } = require('../utils/viewHelper');
const { changeCharacters } = require('../utils/editPaymentMethod');
const { getErrorMessage } = require('../utils/errorHelper');
const { isAuth } = require('../middlewares/authMiddleware');

router.get('/catalog', async (req, res) => {
    try {
        const cryptos = await cryptoManager.getCryptos();

        res.render('crypto/catalog', { cryptos });
    } catch (error) {
        res.render('404');
    }
});

router.get('/create', isAuth, async (req, res) => {
    res.render('crypto/create');
});

router.post('/create', isAuth, async (req, res) => {
    const { name, imageUrl, price, description, payment } = req.body;

    try {
        // const result = changeCharacters(payment);

        await cryptoManager.createCrypto({
            name,
            imageUrl,
            price: Number(price),
            description,
            payment,
            owner: req.user._id,
        });

        res.redirect('/crypto/catalog');
    } catch (error) {
        const data = req.body;
        const errorMessages = getErrorMessage(error);
        res.render('crypto/create', { errorMessages, data });
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

router.get('/buy/:cryptoId', isAuth, async (req, res) => {
    const cryptoId = req.params.cryptoId;

    try {
        await cryptoManager.buyCrypto(cryptoId, req.user._id);

        res.redirect(`/crypto/details/${cryptoId}`);
    } catch (error) {
        res.render('404');
    }
});

router.get('/delete/:cryptoId', isAuth, async (req, res) => {
    try {
        await cryptoManager.deleteCrypto(req.params.cryptoId);

        res.redirect('/crypto/catalog');
    } catch (error) {
        res.render('404');
    }
});

router.get('/edit/:cryptoId', isAuth, async (req, res) => {
    try {
        const crypto = await cryptoManager.getCryptoById(req.params.cryptoId).lean();

        const options = getPaymentMethodsViewData(crypto.payment);

        res.render('crypto/edit', { crypto, options });
    } catch (error) {
        res.render('404');
    }
});

router.post('/edit/:cryptoId', isAuth, async (req, res) => {
    const { name, imageUrl, price, description, payment } = req.body;
    const cryptoId = req.params.cryptoId;

    try {
        await cryptoManager.updateCrypto(cryptoId, { name, imageUrl, price, description, payment });

        res.redirect(`/crypto/details/${cryptoId}`);
    } catch (error) {
        const crypto = req.body;
        
        const options = getPaymentMethodsViewData(crypto.payment);

        const errorMessages = getErrorMessage(error);

        res.render('crypto/edit', { errorMessages, crypto, options });
    }
});


module.exports = router;