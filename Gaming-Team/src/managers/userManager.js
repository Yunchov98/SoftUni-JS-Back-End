const jwtPromises = require('../lib/jwtPromises');
const bcrypt = require('bcrypt');

const User = require('../models/User');
const { SECRET } = require('../configs/utils');

exports.register = (userData) => User.create(userData);
exports.login = async (email, password) => {
    const user = await User.findOne({ email });

    if (!user) {
        throw new Error('Wrong username or password');
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
        throw new Error('Wrong username or password');
    }

    const payload = {
        _id: user._id,
        email: user.email,
    };

    const token = await jwtPromises.sign(payload, SECRET, { expiresIn: '2d' });
    return token;
};