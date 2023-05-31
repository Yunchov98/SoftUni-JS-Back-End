const mongoose = require('mongoose');

const accessoryScheama = new mongoose.Schema({
    name: {
        type: String,
        require: [true, 'Name is required!'],
    },
    imageUrl: {
        type: String,
    },
    description: {
        type: String,
    }
});

const Accessory = mongoose.model('Accessory', accessoryScheama);

module.exports = Accessory;