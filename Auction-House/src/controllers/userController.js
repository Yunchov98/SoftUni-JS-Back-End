const router = require('express').Router();

const { register, registerPage, login, loginPage } = require('../utils/routes');

router.get(register, (req, res) => {
    res.render(registerPage);
});

router.get(login, (req, res) => {
    res.render(loginPage);
});

module.exports = router;