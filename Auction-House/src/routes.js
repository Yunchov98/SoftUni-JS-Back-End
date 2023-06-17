const router = require('express').Router();

const homeController = require('./controllers/homeController');
const userController = require('./controllers/userController');
const auctionController = require('./controllers/auctionController');

const { users, auctions } = require('./configs/utils');
const { inccorectUrl, errorPage } = require('./utils/routes');

router.use(homeController);
router.use(users, userController);
router.use(auctions, auctionController);
router.get(inccorectUrl, (req, res) => {
    res.render(errorPage);
});

module.exports = router;