const mongoose = require('mongoose');

const { DB_URL } = require('./utils');

async function connectDb() {
    await mongoose.connect(DB_URL);
}

module.exports = connectDb;
