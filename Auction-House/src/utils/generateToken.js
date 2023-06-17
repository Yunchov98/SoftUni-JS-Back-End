const jwtPromises = require('../lib/jwtPromises');
const { SECRET } = require('../configs/utils');

function genrateToken(user) {
    const payload = {
        _id: user._id,
        email: user.uemail,
        firstName: user.firstName,
        lastName: user.lastName,
    };

    const token = jwtPromises.sign(payload, SECRET);

    return token;
}

module.exports = genrateToken;