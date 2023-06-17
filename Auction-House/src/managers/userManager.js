const bcrypt = require('bcrypt');

const User = require('../models/User');
const genrateToken = require('../utils/generateToken');

exports.register = async (userData) => {
    const createdUser = await User.create(userData);

    const token = genrateToken(createdUser);

    return token;
};