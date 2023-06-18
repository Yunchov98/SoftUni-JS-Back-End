const router = require('express').Router();

const auctionManager = require('../managers/auctionManager');
const { publish, publishPage, browse, browsePage, errorPage, details, detailsPage, ownerDetails, edit, editPage } = require('../utils/routes');
const { getErrorMessages } = require('../utils/errorHelper');
const { changeCahracters } = require('../utils/editCategoryCahrs');
const { getDetailsPageData } = require('../utils/getDetailsPageData');
const { getCategoryViewData } = require('../utils/viewHelper');

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
            author: req.user._id,
        });

        res.redirect(`/${browsePage}`);
    } catch (error) {
        res.render(publishPage, { errors: getErrorMessages(error), title, category, imageUrl, description });
    }
});

router.get(details, async (req, res) => {
    const user = req.user;

    try {
        const offer = await auctionManager.getOffer(req.params.offerId).populate('bidder.user').lean();

        const isOwner = user?._id === offer.author?._id.toString();

        const modifyOffer = getDetailsPageData(offer);

        if (isOwner) {
            res.render(ownerDetails, { modifyOffer });
        } else {
            const isHigherOffer = modifyOffer.higherOfferUser?.user._id.toString() === req.user?._id;

            res.render(detailsPage, { modifyOffer, isHigherOffer, user });
        }

    } catch (error) {
        res.render(errorPage);
    }
});

router.post(details, async (req, res) => {
    const offerId = req.params.offerId;
    const user = req.user;
    const { bid } = req.body;

    try {
        const offer = await auctionManager.getOffer(offerId);

        if (offer.bidder.length && Number(bid) > offer.price) {
            await auctionManager.updatePrice(offerId, { price: bid });
        }

        if (bid <= offer.price) {
            throw new Error(`Offer should be bigger than ${offer.price}`);
        }
        await auctionManager.bidOffer(offerId, { user, bid });

        res.redirect(`/${detailsPage}/${offerId}`);
    } catch (error) {
        const offer = await auctionManager.getOffer(req.params.offerId).populate('bidder.user').lean();
        const modifyOffer = getDetailsPageData(offer);
        const isHigherOffer = modifyOffer.higherOfferUser?.user._id.toString() === req.user?._id;

        res.render(detailsPage, { errors: getErrorMessages(error), modifyOffer, isHigherOffer });
    }
});

router.get(edit, async (req, res) => {
    const offerId = req.params.offerId;

    try {
        const offer = await auctionManager.getOffer(offerId).populate('bidder.user').lean();

        const options = getCategoryViewData(offer.category);

        const isBidder = offer.bidder.length > 0;

        res.render(editPage, { offer, options, isBidder });
    } catch (error) {
        res.render(errorPage);
    }
});

router.post(edit, async (req, res) => {
    const offerId = req.params.offerId;
    const { title, select, imageUrl, price, description } = req.body;

    try {
        await auctionManager.updateOffer(offerId, { title, select, imageUrl, price, description });

        res.redirect(`/${detailsPage}/${offerId}`);
    } catch (error) {
        const offer = await auctionManager.getOffer(offerId).lean();
        const options = getCategoryViewData(offer.category);

        res.render(editPage, { errors: getErrorMessages(error), offer, options });
    }
});

module.exports = router;