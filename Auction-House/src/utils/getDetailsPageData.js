const { changeCahracters } = require('./editCategoryCahrs');

exports.getDetailsPageData = (offer) => {
    offer.category = changeCahracters(offer.category);

    offer.authorFullName = `${offer.author.firstName} ${offer.author.lastName}`;

    offer.isBidder = offer.bidder.length > 0;
    offer.higherOfferUser = offer.bidder?.sort((a, b) => b.bid - a.bid)[0];

    offer.higherOfferUserFullName = `${offer.higherOfferUser?.user.firstName} ${offer.higherOfferUser?.user.lastName}`;
    offer.currentPrice = offer.isBidder ? offer.higherOfferUser.bid : offer.price;

    return offer;
};

// res.render(detailsPage, { offer, currentPrice, authorFullName, category, isHigherOffer, user });
