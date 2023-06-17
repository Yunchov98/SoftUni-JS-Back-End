const Auction = require('../models/Auction');

exports.create = (offerData) => Auction.create(offerData);

exports.getAll = () => Auction.find();