const jwtPromises = require('../lib/jwtPromises');
const { SECRET } = require('../configs/utils');

async function generateToken(user) {
    const payload = {
        _id: user._id,
        username: user.username,
        email: user.email,
    };

    const token = await jwtPromises.sign(payload, SECRET, { expiresIn: '3d' });
    return token;
}

module.exports = generateToken;