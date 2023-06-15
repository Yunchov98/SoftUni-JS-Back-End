const { changeCharacters } = require('./editPaymentMethod');

exports.getPaymentMethodsViewData = (payment) => {
    const paymentMethods = [
        'crypto-wallet',
        'credit-card',
        'debit-card',
        'paypal',
    ];

    // const result = 

    const options = paymentMethods.map(paymentMethod => ({
        paymentMethod: changeCharacters(paymentMethod),
        value: paymentMethod,
        selected: payment === paymentMethod,
    }));

    return options;
};