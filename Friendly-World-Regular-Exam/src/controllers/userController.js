const router = require('express').Router();

const userManager = require('../managers/userManager');
const { TOKEN_KEY } = require('../configs//utils');
const { getErrorMessages } = require('../utils/errorHelper');
const { isAuth, isUserAuth } = require('../middlewares/authMiddleware');

router.get('/register', isUserAuth, (req, res) => {
    res.render('users/register');
});

router.post('/register', isUserAuth, async (req, res) => {
    const { email, password, repeatPassword } = req.body;

    try {
        const token = await userManager.register({ email, password, repeatPassword });

        res.cookie(TOKEN_KEY, token, { httpOnly: true });

        res.redirect('/');
    } catch (error) {
        res.render('users/register', { errors: getErrorMessages(error), email });
    }
});

router.get('/login', isUserAuth, (req, res) => {
    res.render('users/login');
});

router.post('/login', isUserAuth, async (req, res) => {
    const { email, password } = req.body;

    try {
        const token = await userManager.login(email, password);

        res.cookie(TOKEN_KEY, token, { httpOnly: true });

        res.redirect('/');
    } catch (error) {
        res.render('users/login', { errors: getErrorMessages(error) });
    }
});

router.get('/logout', isAuth, (req, res) => {
    res.clearCookie(TOKEN_KEY);

    res.redirect('/');
});

module.exports = router;