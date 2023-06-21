const mongoose = require('mongoose');

const animalSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        minLength: [2, 'Name should be at least 2 characters long'],
    },

    years: {
        type: Number,
        required: [true, 'Years are required'],
    },

    kind: {
        type: String,
        required: [true, 'Kind is required'],
        minLength: [3, 'King should be at least 3 characters long'],
    },

    imageUrl: {
        type: String,
        required: [true, 'Image URL is required'],
        match: [/^https?:\/\//, 'Invalid URL'],
    },

    need: {
        type: String,
        required: [true, 'Need is required'],
        minLength: [3, 'Needs should be at least 3 characters long'],
        maxLength: [20, 'Needs should be maximum 20 characters long'],
    },

    location: {
        type: String,
        required: [true, 'Location is required'],
        minLength: [5, 'Location should be at least 5 characters long'],
        maxLength: [15, 'Location should be maximum 15 characters long'],
    },

    description: {
        type: String,
        required: [true, 'Description is required'],
        minLength: [5, 'Description should be at least 5 characters long'],
        maxLength: [50, 'Description should be maximum 50 characters long'],
    },

    donations: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'User',
        }
    ],

    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }
});

animalSchema.path('years').validate(function (years) {
    if (years <= 0 || years > 100) {
        throw new Error('Years should be between 1-100');
    }
});

const Animal = mongoose.model('Animal', animalSchema);

module.exports = Animal;