const mongoose = require('mongoose');

const cubeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required!'],
    },
    imageUrl: {
        type: String,
        required: [true, 'Image is required!'],
    },
    description: {
        type: String,
        required: [true, 'Description is required!'],
    },
    difficultyLevel: {
        type: Number,
        required: [true, 'Difficulty level is required!'],
    },
    accessories: [{
        type: mongoose.Types.ObjectId,
        ref: 'Accessory',
    }]
});

module.exports = mongoose.model('Cube', cubeSchema);