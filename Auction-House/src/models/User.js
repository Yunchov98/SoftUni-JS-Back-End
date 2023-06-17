const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        match: [/^[A-Za-z\_\-\.]+\@[A-Za-z]+\.[a-z]{1,}/, 'Invalid email'],
    },

    password: {
        type: String,
        required: [true, 'Password is required'],
        minLength: [5, 'Password should be at least 5 characters long'],
    },

    firstName: {
        type: String,
        required: [true, 'First name is required'],
        minLength: [1, 'First name should be at least 1 character long'],
    },

    lastName: {
        type: String,
        required: [true, 'Last name is required'],
        minLength: [1, 'Last name should be at least 1 character long'],
    },
});

const User = mongoose.model('User', userSchema);

module.exports = User;