const { promisify } = require('util');
const jwt = require('jsonwebtoken');

const jwtPromises = {
    sign: promisify(jwt.sign),
    verify: promisify(jwt.verify),
};

module.exports = jwtPromises;