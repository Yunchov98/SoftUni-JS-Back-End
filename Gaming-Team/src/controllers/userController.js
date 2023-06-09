const router = require('express').Router();

router.get('/register', (req, res) => {
    res.render('user/register');
});

// TODO: router.post('/register')...

router.get('/login', (req, res) => {
    res.render('user/login');
});

// TODO: router.post('/login')...

module.exports = router;