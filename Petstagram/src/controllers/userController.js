const router = require('express').Router();

const userManager = require('../managers/userManager');
const photoManager = require('../managers/photoManager');
const { getErrorMessage } = require('../utils/errorHelper');
const { isAuth } = require('../middlewares/authMiddleware');
const { TOKEN_KEY } = require('../configs/utils');

router.get('/register', (req, res) => {
    res.render('user/register');
});

router.post('/register', async (req, res) => {
    const { username, email, password, repeatPassword } = req.body;

    try {
        const token = await userManager.register({ username, email, password, repeatPassword });

        res.cookie(TOKEN_KEY, token);
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

router.get('/profile', isAuth, async (req, res) => {
    const user = req.user;

    try {
        const photos = await photoManager.getUserPhotos(user._id).lean();

        res.render('user/profile', { user, photos });
    } catch (error) {
        res.redirect('/404');
    }
});

module.exports = router;