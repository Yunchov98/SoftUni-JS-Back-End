const { MongooseError, Error } = require('mongoose');

exports.getErrorMessages = (error) => {
    if (error instanceof MongooseError) {
        return Object.values(error.errors).map(e => e.message);
    } else if (error) {
        return [error.message];
    }
};