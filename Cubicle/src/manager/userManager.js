const bcrypt = require('bcrypt');
const jwtPromises = require('../lib/jwtPromises');

const { SECRET } = require('../utils/secret');
const User = require('../models/User');


exports.register = (userData) => User.create(userData);
exports.login = async (username, password) => {
    const user = await User.findOne({ username });

    if (!user) {
        throw new Error('Wrong username or password');
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
        throw new Error('Wrong username or password');
    }

    const payload = {
        _id: user._id,
        username: user.username,
    };

    const token = await jwtPromises.sign(payload, SECRET, { expiresIn: '2d' });
    return token;
};
