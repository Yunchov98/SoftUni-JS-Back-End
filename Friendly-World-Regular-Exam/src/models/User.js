const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        minLength: [10, 'Email should be at least 10 characters long'],
    },

    password: {
        type: String,
        required: [true, 'Password is required'],
        minLength: [4, 'Password should be at least 4 characters long'],
    }
});

userSchema.path('email').validate(async function (email) {
    try {
        const emailCount = await mongoose.models.User.countDocuments({ email });

        return !emailCount;
    } catch (error) {
        console.log(error);
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
        console.log(error);
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;