const Crypto = require('../models/Crypto');

exports.createCrypto = (cryptoData) => Crypto.create(cryptoData);

exports.getCryptoById = (cryptoId) => Crypto.findById(cryptoId);

exports.buyCrypto = (cryptoId, userId) => Crypto.findByIdAndUpdate(cryptoId, { $push: { boughtBy: userId } });

exports.deleteCrypto = (cryptoId) => Crypto.findByIdAndDelete(cryptoId);

exports.updateCrypto = (cryptoId, cryptoData) => Crypto.findByIdAndUpdate(cryptoId, cryptoData, { runValidators: true });

exports.getCryptos = async (search, select) => {
    try {
        let result = await Crypto.find().lean();

        if (search) {
            result = result.filter(crypto => crypto.name.toLowerCase().includes(search.toLowerCase()));
        }

        if (select) {
            result = result.filter(crypto => crypto.payment.toLowerCase().includes(select.toLowerCase()));
        }

        return result;
    } catch (error) {
        console.log(error);
    }
};