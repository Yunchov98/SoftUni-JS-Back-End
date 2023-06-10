const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        minLength: [4, 'Name should be at least four characters long'],
    },

    imageUrl: {
        type: String,
        required: [true, 'Image is required'],
    },

    price: {
        type: Number,
        required: [true, 'Price is required'],
    },

    description: {
        type: String,
        required: [true, 'Description is required'],
        minLength: [true, 'Description should be at least ten characters long'],
    },

    genre: {
        type: String,
        required: [true, 'Genre is required'],
        minLength: [2, 'Genre should be at least two characters long'],
    },

    platform: {
        type: String,
        required: [true, 'Platform is required'],
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

// TODO: platfrom validation for PC, Nintendo, PS4, etc...

gameSchema.path('platform').validate((platform) => {
    const availablePlatforms = ['PC', 'Nintendo', 'PS4', 'PS5', 'XBOX'];

    if (!availablePlatforms.includes(platform)) {
        throw new Error(`Only ${availablePlatforms.join(' ')} are available`);
    }
});

gameSchema.path('imageUrl').validate((imageUrl) => {
    if (!imageUrl.startsWith('http')) {
        throw new Error('Image URL must starts with http:// ot https://');
    }
});

gameSchema.path('price').validate((price) => {
    if (Number(price) < 0) {
        throw new Error('Price must be a possitive number');
    }
});

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;