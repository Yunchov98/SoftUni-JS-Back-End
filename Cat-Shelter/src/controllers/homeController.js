const router = require('express').Router();
const catManager = require('../managers/catManager');

router.get('/', (req, res) => {
    const cats = catManager.getCats()
        .then(catInfo => res.render('home', { catInfo }));
});

module.exports = router;