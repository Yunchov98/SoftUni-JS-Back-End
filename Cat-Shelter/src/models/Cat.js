const mongoose = require('mongoose');

const catSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    description: {
        type: String,
    },
    img: {
        required: [true, 'Image is required'],
    },
    breed: {
        type: String,
        required: [true, 'Breed is required'],
    }
});

module.exports = mongoose.model('Cat', catSchema);