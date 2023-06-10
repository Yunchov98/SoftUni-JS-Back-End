const router = require('express').Router();

const userManager = require('../managers/userManager');
const { getErrorMessages } = require('../utils/errorHelper');

router.get('/register', (req, res) => {
    res.render('user/register');
});

// TODO: catch error message and render it

router.post('/register', async (req, res) => {
    const { username, email, password, confirmPassword } = req.body;

    try {
        await userManager.register({ username, email, password, confirmPassword });

        res.redirect('/');
    } catch (error) {
        const errorMessages = getErrorMessages(error);

        res.render('user/register', { errorMessages });
    }
});

router.get('/login', (req, res) => {
    res.render('user/login');
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const token = await userManager.login(email, password);

        res.cookie('auth', token, { httpOnly: true });

        res.redirect('/');
    } catch (error) {
        const errorMessages = getErrorMessages(error);

        res.render('user/login', { errorMessages });
    }
});

router.get('/logout', async (req, res) => {
    res.clearCookie('auth');
    res.redirect('/');
});

module.exports = router;