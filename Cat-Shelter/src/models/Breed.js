const mongoose = require('mongoose');

const breedSchema = new mongoose.Schema({
    breed: {
        type: String,
        required: [true, 'Breed is required'],
    }
});

module.exports = mongoose.model('Breed', breedSchema);