const router = require('express').Router();

const homeController = require('./controllers/homeController');
const userController = require('./controllers/userController');
const auctionController = require('./controllers/auctionController');

const { users, auctions } = require('./configs/utils');

router.use(homeController);
router.use(users, userController);
router.use(auctions, auctionController);

module.exports = router;