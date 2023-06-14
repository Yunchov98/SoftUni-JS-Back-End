const router = require('express').Router();

const userManager = require('../managers/userManager');

router.get('/register', (req, res) => {
    res.render('user/register');
});

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

module.exports = router;