const jwt = require('jsonwebtoken');

const sign = (payload, token, options) => {
    const promise = new Promise((resolve, reject) => {
        jwt.sign(payload, token, options, (err, result) => {
            if (err) {
                return reject(err);
            }

            resolve(result);
        });
    });

    return promise;
};

const verify = (token, secret, options) => {
    const promise = new Promise((resolve, reject) => {
        jwt.verify(token, secret, options, (err, result) => {
            if (err) {
                return reject(err);
            }

            resolve(result);
        });
    });

    return promise;
};

const jwtPromises = {
    sign,
    verify
};

module.exports = jwtPromises;