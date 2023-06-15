exports.changeCharacters = (payment) => {
    let result = '';

    if (payment === 'credit-card') {
        result = 'Credit Card';
    } else if (payment === 'debit-card') {
        result = 'Debit Card';
    } else if (payment === 'crypto-wallet') {
        result = 'Crypto Wallet';
    } else if(payment === 'paypal') {
        result = 'PayPal';
    }

    return result;
};