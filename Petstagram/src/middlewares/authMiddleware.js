const { SECRET, TOKEN_KEY } = require('../configs/utils');
const jwtPromises = require('../lib/jwtPromises');

exports.auth = async (req, res, next) => {
    const token = req.cookies[TOKEN_KEY];

    if (token) {
        const payload = await jwtPromises.verify(token, SECRET);

        req.user = payload;
        res.locals.user = payload;
        res.locals.isAuthenticated = true;

        next();
    } else {
        next();
    }
};

exports.isAuth = (req, res, next) => {
    if (!req.user) {
        return res.redirect('/users/login');
    }

    next();
};