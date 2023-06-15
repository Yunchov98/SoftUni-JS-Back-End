const mongoose = require('mongoose');

const cryptoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        minLength: [2, 'Name should be at least 2 characters long'],
    },

    imageUrl: {
        type: String,
        required: [true, 'Image URL is required'],
        match: [/^https?:\/\//, 'URL should start with http:// or https://'],
    },

    price: {
        type: Number,
        required: [true, 'Price is required'],
    },

    description: {
        type: String,
        required: [true, 'Description is required'],
        minLength: [10, 'Description should be at least 10 characters long'],
    },

    payment: {
        type: String,
        required: [true, 'Payment is required'],
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

cryptoSchema.path('price').validate(function (price) {
    if (price < 0) {
        throw new Error('Price should be a positive number');
    }
});

cryptoSchema.path('payment').validate(function (payment) {
    const paymentes = ['crypto-wallet', 'debit-card', 'credit-card', 'paypal'];

    if (!paymentes.includes(payment)) {
        throw new Error('Invalid payment method');
    }
});

const Crypto = mongoose.model('Crypto', cryptoSchema);

module.exports = Crypto;