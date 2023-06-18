const router = require('express').Router();

const userManager = require('../managers/userManager');
const { register, registerPage, login, loginPage, home, logout } = require('../utils/routes');
const { TOKEN_KEY } = require('../configs/utils');
const { isAuth, isUserAuth } = require('../middlewares/authMiddleware');
const { getErrorMessages } = require('../utils/errorHelper');



router.get(register, isUserAuth, (req, res) => {
    res.render(registerPage);
});

router.post(register, isUserAuth, async (req, res) => {
    const { email, firstName, lastName, password, confirmPassword } = req.body;

    try {
        const token = await userManager.register({ email, firstName, lastName, password, confirmPassword });

        res.cookie(TOKEN_KEY, token, { httpOnly: true });

        res.redirect(home);
    } catch (error) {
        res.render(registerPage, { errors: getErrorMessages(error), email, firstName, lastName });
    }
});

router.get(login, isUserAuth, (req, res) => {
    res.render(loginPage);
});

router.post(login, isUserAuth, async (req, res) => {
    const { email, password } = req.body;

    try {
        const token = await userManager.login(email, password);

        res.cookie(TOKEN_KEY, token);

        res.redirect(home);
    } catch (error) {
        res.render(loginPage, { errors: getErrorMessages(error) });
    }
});

router.get(logout, isAuth, (req, res) => {
    res.clearCookie(TOKEN_KEY);

    res.redirect(home);
});

module.exports = router;