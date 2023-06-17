const router = require('express').Router();

const { home, homePage } = require('../utils/routes');

router.get(home, (req, res) => {
    res.render(homePage);
});

module.exports = router;