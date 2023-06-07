const bcrypt = require('bcrypt');
const jwtPromises = require('../lib/jwtPromises');

const SECRET = 'veryBigSecret';
const User = require('../models/User');


exports.register = (username, password, repassword) => User.create(username, password, repassword);
exports.login = async (username, password) => {

    const user = await User.findOne({ username });

    if (!user) {
        throw new Error('Can not find username or password!');
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
        throw new Error('Can not find username or password!');
    }

    const payload = {
        _id: user._id,
        username: user.username,
    };

    const token = await jwtPromises.sign(payload, SECRET, { expiresIn: '2d' });

    return token;
};
