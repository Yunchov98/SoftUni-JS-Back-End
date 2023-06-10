const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
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
    },

    genre: {
        type: String,
        required: [true, 'Genre is required'],
    },

    platform: {
        type: String,
        required: [true, 'Platform is required'],
    },

    boughtBy: [{
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }],

    owner: [{
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }],
});

// TODO: platfrom validation for PC, Nintendo, PS4, etc...

gameSchema.path('platform').validate((platform) => {
    const availablePlatforms = ['PC', 'Nintendo', 'PS4', 'PS5', 'XBOX'];

    if (!availablePlatforms.includes(platform)) {
        throw new Error(`Only ${availablePlatforms.join(' ')} are available`);
    }
});

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;