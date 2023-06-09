const { MongooseError, Error } = require('mongoose');

exports.getErrorMessage = (error) => {
    if (error instanceof MongooseError) {
        return Object.values(error.errors).map(e => e.message);
    } else if (error) {
        return [error.message];
    }
};