const router = require('express').Router();

const userManager = require('../managers/userManager');
const { getErrorMessage } = require('../utils/errorHelper');

router.get('/register', (req, res) => {
    res.render('user/register');
});

router.post('/register', async (req, res) => {
    const { username, email, password, repeatPassword } = req.body;

    try {
        await userManager.register({ username, email, password, repeatPassword });

        const token = await userManager.login(username, password);

        res.cookie('auth', token, { httpOnly: true });

        res.redirect('/');
    } catch (error) {
        const errorMessages = getErrorMessage(error);
        res.render('user/register', { errorMessages });
    }
});

router.get('/login', (req, res) => {
    res.render('user/login');
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const token = await userManager.login(username, password);

        res.cookie('auth', token, { httpOnly: true });

        res.redirect('/');
    } catch (error) {
        const errorMessages = getErrorMessage(error);
        res.render('user/login', { errorMessages });
    }
});

router.get('/logout', (req, res) => {
    res.clearCookie('auth');
    res.redirect('/');
});

router.get('/profile', (req, res) => {
    res.render('user/profile');
});

module.exports = router;