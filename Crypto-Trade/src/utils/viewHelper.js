exports.getPaymentMethodsViewData = (payment) => {
    const paymentMethods = [
        'Crypto Wallet',
        'Credit Card',
        'Debit Card',
        'PayPayl',
    ];

    const options = paymentMethods.map(paymentMethod => ({
        paymentMethod,
        value: paymentMethod,
        selected: payment === paymentMethod,
    }));

    return options;
};