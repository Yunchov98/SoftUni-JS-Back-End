const mongoose = require('mongoose');

const auctionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        minLength: [4, 'Title should be at least 4 characters long'],
    },

    description: {
        type: String,
        maxLength: [200, 'Description can be maximum 200 characters long'],
    },

    category: {
        type: String,
        required: [true, 'Categor is required'],
    },

    imageUrl: {
        type: String,
    },

    price: {
        type: Number,
        required: [true, 'Price is required'],
    },

    author: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },

    bidder: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
});

auctionSchema.path('price').validate(function (price) {
    if (price < 0) {
        throw new Error('Price cannot be a negative number');
    }
});

const Auction = mongoose.model('Auction', auctionSchema);

module.exports = Auction;