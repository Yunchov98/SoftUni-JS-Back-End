exports.registerValidator = (username, email, password, confirmPassword) => {
    if (username.length < 1) {
        throw new Error('Username field is required');
    } else if (email.length < 1) {
        throw new Error('Email field is required');
    } else if (password.length < 1) {
        throw new Error('Password field is required');
    } else if (confirmPassword.length < 1) {
        throw new Error('Confirm Password field is required');
    }
};

exports.loginValidator = (email, password) => {
    if (email.length < 1 || password < 1) {
        throw new Error('Wrong username or password');
    };
};