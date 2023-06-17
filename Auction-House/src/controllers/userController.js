const router = require('express').Router();

const userManager = require('../managers/userManager');
const { register, registerPage, login, loginPage, home } = require('../utils/routes');
const { TOKEN_KEY } = require('../configs/utils');

router.get(register, (req, res) => {
    res.render(registerPage);
});

router.post(register, async (req, res) => {
    const { email, firstName, lastName, password, confirmPassword } = req.body;

    try {
        const token = await userManager.register({ email, firstName, lastName, password, confirmPassword });

        res.cookie(TOKEN_KEY, token, { httpOnly: true });

        res.redirect(home);
    } catch (error) {
        // TODO: CATCH THE ERROR AND RENDR IT !
        console.log(`Error: ${error}`);
    }
});

router.get(login, (req, res) => {
    res.render(loginPage);
});

module.exports = router;