const router = require('express').Router();

const homeController = require('./controllers/homeController');
const gameController = require('./controllers/gameController');
const userController = require('./controllers/userController');

router.use(homeController);
router.use('/games', gameController);
router.use('/users', userController);
router.use('*', (req, res) => {
    res.render('404');
});

module.exports = router;