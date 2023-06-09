const mongoose = require('mongoose');

const accessoryScheama = new mongoose.Schema({
    name: {
        type: String,
        require: [true, 'Name is required!'],
        minLength: [5, 'Accessory name must be at least 5 characters long'],
        match: [/^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/, 'Accessory name must contains only uppercase, lowercase letters, digits and whitespaces']
    },
    imageUrl: {
        type: String,
    },
    description: {
        type: String,
        minLength: [5, 'Accessory description must be at least 20 characters long'],
        match: [/^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/, 'Accessory description must contains only uppercase, lowercase letters, digits and whitespaces']
    }
});

accessoryScheama.path('imageUrl').validate((imageUrl) => {
    if (!imageUrl.startsWith('http')) {
        throw new Error('Invalid URL - Image URL must include http or https');
    }
});

const Accessory = mongoose.model('Accessory', accessoryScheama);

module.exports = Accessory;