const { MongooseError, Error, } = require('mongoose');

exports.getErrorMessages = (error) => {
    if (error instanceof MongooseError) {
       return Object.values(error.errors).map(e => e.message);
    } else if (Error) {
        return [error.message];
    }
};

exports.castErrorType = (error) => {
    if (error.name === 'CastError') {
        const errorMessage = 'Years should be number';
        return [errorMessage];
    }
};
