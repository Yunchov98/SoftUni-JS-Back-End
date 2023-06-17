const router = require('express').Router();

const homeController = require('./controllers/homeController');
const userController = require('./controllers/userController');

const { users } = require('./configs/utils');

router.use(homeController);
router.use(users, userController);

module.exports = router;