const Auction = require('../models/Auction');

exports.create = (offerData) => Auction.create(offerData);

exports.getAll = () => Auction.find();

exports.getOffer = (offerId) => Auction.findById(offerId).populate('author');

exports.updatePrice = (offerId, price) => Auction.findByIdAndUpdate(offerId, price);

exports.updateOffer = (offerId, offerData) => Auction.findByIdAndUpdate(offerId, offerData, { runValidators: true });

exports.deleteOffer = (offerId) => Auction.findByIdAndDelete(offerId);

exports.bidOffer = async (offerId, bidData) => {
    const offer = await Auction.findById(offerId);

    offer.bidder.push(bidData);

    return offer.save();
};