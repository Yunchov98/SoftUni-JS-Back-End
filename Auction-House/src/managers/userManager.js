const bcrypt = require('bcrypt');

const User = require('../models/User');
const genrateToken = require('../utils/generateToken');

exports.register = async (userData) => {
    const createdUser = await User.create(userData);

    const token = genrateToken(createdUser);

    return token;
};

exports.login = async (email, password) => {

    const user = await User.findOne({ email });

    if (!user) {
        throw new Error('Wrong username or password');
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
        throw new Error('Wrong usrenam or password');
    }

    const token = genrateToken(user);

    return token;

};