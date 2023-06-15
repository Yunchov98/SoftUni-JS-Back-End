const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        minLength: [2, 'Name should be at least 2 characters long'],
    },

    imageUrl: {
        type: String,
        required: [true, 'Image URL is required'],
        match: [/^https?:\/\//, 'Invalid URL'],
    },

    age: {
        type: Number,
        required: [true, 'Age are required'],
    },

    description: {
        type: String,
        required: [true, 'Description is required'],
        minLength: [5, 'Description should be at least 5 characters long'],
        maxLength: [50, 'Description cannot be longer than 50 characters'],
    },

    location: {
        type: String,
        required: [true, 'Location is required'],
        minLength: [5, 'Location should be at least 5 charactes long'],
        maxLength: [50, 'Location cannot be longer than 50 characters'],
    },

    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },

    comments: [
        {
            user: {
                type: mongoose.Types.ObjectId,
                required: true,
                ref: 'User'
            },
            comment: {
                type: String,
                required: [true, 'Comment is required!']
            }
        }
    ],
});

// photoSchema.path('imageUrl').validate(function (imageUrl) {
//     if (!imageUrl.startsWith('http')) {
//         throw new Error('Image URL should start with http:// or https://');
//     }
// });

photoSchema.path('age').validate(function (age) {
    if (age < 1 || age > 100) {
        throw new Error('Age must be between 1 - 100');
    }
});

const Photo = mongoose.model('Photo', photoSchema);

module.exports = Photo;