const router = require('express').Router();

const userManager = require('../managers/userManager');
const { TOKEN_KEY } = require('../configs/utils');
const { loginValidator, registerValidator } = require('../utils/validators');

router.get('/register', (req, res) => {
    res.render('user/register');
});

router.post('/register', async (req, res) => {
    const { username, email, password, confirmPassword } = req.body;

    try {
        registerValidator(username, email, password, confirmPassword);

        await userManager.register({ username, email, password, confirmPassword });

        res.redirect('/');
    } catch (error) {
        const { username, email } = req.body;
        res.render('user/register', { error: error.message, username, email });
    }
});

router.get('/login', (req, res) => {
    res.render('user/login');
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        loginValidator(email, password);

        const token = await userManager.login(email, password);

        res.cookie(TOKEN_KEY, token, { httpOnly: true });

        res.redirect('/');
    } catch (error) {
        res.render('user/login', { error: error.message });
    }
});

router.get('/logout', (req, res) => {
    res.clearCookie(TOKEN_KEY);

    res.redirect('/');
});

module.exports = router;