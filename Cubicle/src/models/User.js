const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        match: [/^[A-Za-z0-9]+$/, 'Username must contains only uppercase, lowercase letters and digits'],
        required: [true, 'Username is required'],
        minLength: [5, 'Your username must be at least 5 characters long'],
    },
    password: {
        type: String,
        match: [/^[A-Za-z0-9]+$/, 'Password must contains only uppercase, lowercase letters and digits'],
        required: [true, 'Password is required'],
        minLength: [8, 'Your password must be at least 8 characters long'],
    },
});

userSchema.path('username').validate(async (username) => {
    try {
        const usernameCount = await mongoose.models.User.countDocuments({ username });

        return !usernameCount;
    } catch (error) {
        console.log(error);
    }
}, 'Username alredy exists');

userSchema.virtual('repeatPassword')
    .set(function (value) {
        if (value !== this.password) {
            throw new Error('Password dont match!');
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