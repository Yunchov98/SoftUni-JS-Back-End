const router = require('express').Router();

const homeController = require('./controllers/homeController');
const gameController = require('./controllers/gameController');

router.use(homeController);
router.use('/games', gameController);
router.use('*', (req, res) => {
    res.render('404');
});

module.exports = router;