const router = require('express').Router();

const userManager = require('../managers/userManager');
const { TOKEN_KEY } = require('../configs/utils');
const { getErrorMessage } = require('../utils/errorHelper');
const { isAuth } = require('../middlewares/authMiddleware');

router.get('/register', (req, res) => {
    res.render('user/register');
});

router.post('/register', async (req, res) => {
    const { username, email, password, confirmPassword } = req.body;

    try {
        await userManager.register({ username, email, password, confirmPassword });

        res.redirect('/');
    } catch (error) {
        const errorMessages = getErrorMessage(error);
        const { username, email } = req.body;
        res.render('user/register', { errorMessages, username, email });
    }
});

router.get('/login', (req, res) => {
    res.render('user/login');
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const token = await userManager.login(email, password);

        res.cookie(TOKEN_KEY, token, { httpOnly: true });

        res.redirect('/');
    } catch (error) {
        const errorMessages = getErrorMessage(error);
        res.render('user/login', { errorMessages });
    }
});

router.get('/logout', isAuth, (req, res) => {
    res.clearCookie(TOKEN_KEY);

    res.redirect('/');
});

module.exports = router;