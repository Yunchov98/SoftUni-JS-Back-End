const Crypto = require('../models/Crypto');

exports.createCrypto = (cryptoData) => Crypto.create(cryptoData);

exports.getCryptos = () => Crypto.find();

exports.getCryptoById = (cryptoId) => Crypto.findById(cryptoId);

exports.buyCrypto = (cryptoId, userId) => Crypto.findByIdAndUpdate(cryptoId, { $push: { boughtBy: userId } });

exports.deleteCrypto = (cryptoId) => Crypto.findByIdAndDelete(cryptoId);

exports.updateCrypto = (cryptoId, cryptoData) => Crypto.findByIdAndUpdate(cryptoId, cryptoData);