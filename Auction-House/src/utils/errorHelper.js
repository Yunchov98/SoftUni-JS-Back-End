const { MongooseError, Error } = require('mongoose');

exports.getErrorMessages = (error) => {
    if (error instanceof MongooseError) {
        return Object.values(error.errors).map(err => err.message);
    } else if (Error) {
        return [error.message];
    }
};