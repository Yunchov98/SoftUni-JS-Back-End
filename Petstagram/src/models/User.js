const mongoose = require('mongoose');

const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
    },

    email: {
        type: String,
        required: [true, 'Email is required'],
    },

    password: {
        type: String,
        required: [true, 'Password is required'],
    },
});

userSchema.virtual('repeatPassword')
    .set(function (value) {
        if (value !== this.password) {
            throw new Error('Passwords dont match');
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