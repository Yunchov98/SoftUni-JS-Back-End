const mongoose = require('mongoose');

const { URI } = require('./utils');

async function connectDb() {
    await mongoose.connect(URI);
}

module.exports = connectDb;