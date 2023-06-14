const Crypto = require('../models/Crypto');

exports.createCrypto = (cryptoData) => Crypto.create(cryptoData);