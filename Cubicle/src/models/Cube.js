const mongoose = require('mongoose');

const cubeSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: [true, 'ID is required!'],
    },
    name: {
        type: String,
        required: [true, 'Name is required!'],
    },
    description: {
        type: String,
        required: [true, 'Description is required!'],
    },
    difficultyLevel: {
        type: Number,
        required: [true, 'Difficulty level is required!'],
    }
});

module.exports = mongoose.model('Cube', cubeSchema);