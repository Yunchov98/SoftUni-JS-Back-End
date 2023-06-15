const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require:[true, 'Username is required'],
        minLength: [5, 'Username should be at least 5 characters long'],
    },

    email: {
        type: String,
        required: [true, 'Email is required'],
        minLength: [10, 'Email should be at least 10 characters long'],
    },

    password: {
        type: String,
        required: [true, 'Password is required'],
        minLength: [4, 'Password should be at least 4 characters long'],
    },
});

userSchema.path('email').validate(async function (email) {
    try {
        const usernameCount = await mongoose.models.User.countDocuments({ email });

        return !usernameCount;
    } catch (error) {
        console.log(error);
    }
}, 'Email already exists');

userSchema.virtual('confirmPassword')
    .set(function (value) {
        if (this.password !== value) {
            throw new Error('Password missmatch');
        }
    });

userSchema.pre('save', async function () {
    const hash = await bcrypt.hash(this.password, 10);

    this.password = hash;
});

const User = mongoose.model('User', userSchema);

module.exports = User;