const router = require('express').Router();

const userManager = require('../managers/userManager');

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
        console.log(error);
    }
});

router.get('/login', (req, res) => {
    res.render('user/login');
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // TODO: catch error message and render it
    try {
        const token = await userManager.login(email, password);

        res.cookie('auth', token, { httpOnly: true });

        res.redirect('/');
    } catch (error) {
        console.log(error);
    }
});

router.get('/logout', async (req, res) => {
    res.clearCookie('auth');
    res.redirect('/');
});

module.exports = router;