const mongoose = require('mongoose');

const cryptoSchema = new mongoose.Schema({
    name: {
        type: String,
    },

    imageUrl: {
        type: String,
    },

    price: {
        type: Number,
    },

    description: {
        type: String,
    },

    boughtBy: [{
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }],

    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
});

const Crypto = mongoose.model('Crypto', cryptoSchema);

module.exports = Crypto;