const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        match: [/^[A-Za-z\_\-\.]+\@[A-Za-z]+\.[a-z]{2,}/, 'Invalid email'],
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

userSchema.path('email').validate(async function (email) {
    try {
        const emailCount = await mongoose.models.User.countDocuments({ email });

        return !emailCount;
    } catch (error) {
        console.log(`Error: ${error}`);
    }
}, 'Email already exists');

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
        console.log(`Error: ${error}`);
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;