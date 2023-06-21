const jwtPromises = require('../lib/jwtPromises');
const { SECRET, TOKEN_KEY } = require('../configs/utils');

exports.auth = async (req, res, next) => {
    const token = req.cookies[TOKEN_KEY];

    if (token) {
        const decodedToken = await jwtPromises.verify(token, SECRET);

        req.user = decodedToken;
        res.locals.user = decodedToken;
        res.locals.isAuthenticated = true;

        next();
    } else {
        next();
    }
};

exports.isAuth = (req, res, next) => {
    if (!req.user) {
        return res.redirect('/404');
    }

    next();
};

exports.isUserAuth = (req, res, next) => {
    if (req.user) {
        return res.redirect('/');
    }

    next();
};