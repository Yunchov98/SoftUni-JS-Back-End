const { getErrorMessage } = require('../utils//errorHelper');

module.exports = (err, req, res, next) => {
    const errorMessage = getErrorMessage(err);

    res.render('404', { errorMessage });
};