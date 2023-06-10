const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        minLength: [5, 'Username should be at least five characters long'],
    },

    email: {
        type: String,
        required: [true, 'Email is required'],
        minLength: [10, 'Username should be at least ten characters long'],
    },

    password: {
        type: String,
        required: [true, 'Password is required'],
        minLength: [4, 'Username should be at least four characters long'],
    },
});

userSchema.virtual('confirmPassword')
    .set(function (value) {
        if (value !== this.password) {
            throw new Error('Password dont match');
        }
    });

userSchema.pre('save', async function () {
    try {
        const hash = await bcrypt.hash(this.password, 10);

        this.password = hash;
    } catch (error) {
        console.log(error);
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;