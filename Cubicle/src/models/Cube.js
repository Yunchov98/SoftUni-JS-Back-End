const mongoose = require('mongoose');

const cubeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required!'],
        minLength: [5, 'Cube name must be at least 5 characters long'],
        match: [/^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/, 'Cube name must contains only uppercase, lowercase letters, digits and whitespaces'],
    },
    imageUrl: {
        type: String,
        required: [true, 'Image is required!'],
    },
    description: {
        type: String,
        required: [true, 'Description is required!'],
        minLength: [20, 'Cube description must be at least 20 characters long'],
        match: [/^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/, 'Cube name must contains only uppercase, lowercase letters, digits and whitespaces'],
    },
    difficultyLevel: {
        type: Number,
        required: [true, 'Difficulty level is required!'],
    },
    accessories: [{
        type: mongoose.Types.ObjectId,
        ref: 'Accessory',
    }],
    owner: [{
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }]
});

cubeSchema.path('imageUrl').validate((imgUrl) => {
    if (!imgUrl.startsWith('http')) {
        throw new Error('Invalid URL - Image URL must include http or https');
    }
});

module.exports = mongoose.model('Cube', cubeSchema);