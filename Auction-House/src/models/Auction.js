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
    },

    author: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },

    bidder: [
        {
            user: {
                type: mongoose.Types.ObjectId,
                ref: 'User',
            },

            bid: {
                type: Number,
            }
        }
    ],
});

auctionSchema.path('price').validate(function (price) {
    if (price < 1) {
        throw new Error('Price is required and cannot be a negative number');
    }
});

const Auction = mongoose.model('Auction', auctionSchema);

module.exports = Auction;