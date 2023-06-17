const router = require('express').Router();

const auctionManager = require('../managers/auctionManager');
const { publish, publishPage, browse, browsePage, errorPage } = require('../utils/routes');

router.get(browse, async (req, res) => {
    try {
        const offers = await auctionManager.getAll().lean();

        res.render(browsePage, { offers });
    } catch (error) {
        res.render(errorPage);
    }
});

router.get(publish, (req, res) => {
    res.render(publishPage);
});

router.post(publish, async (req, res) => {
    const { title, category, imageUrl, price, description } = req.body;

    try {
        await auctionManager.create({
            title,
            category,
            imageUrl,
            price: Number(price),
            description,
            owner: req.user._id,
        });

        res.redirect(`/${browsePage}`);
    } catch (error) {
        console.log(`Error: ${error}`);
    }
});

module.exports = router;