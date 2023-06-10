const { getErrorMessages } = require('../utils/errorHelper');

module.exports = (err, req, res, next) => {
    const errorMessages = getErrorMessages(err);

    res.render('404', { errorMessages });
};