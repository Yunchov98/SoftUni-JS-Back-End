const jwtPromises = require('../lib/jwtPromises');
const { SECRET } = require('../utils/secret');

exports.auth = async (req, res, next) => {
    const token = req.cookies['auth'];

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
        return res.redirect('/user/login');
    }

    next();
};
