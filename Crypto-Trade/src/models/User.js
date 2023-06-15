const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require:[true, 'Username is required'],
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