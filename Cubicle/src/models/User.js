const mongoose = require('mongoose');

const userScehma = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required!'],
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    }
});

const User = mongoose.model('User', userScehma);

module.exports = User;