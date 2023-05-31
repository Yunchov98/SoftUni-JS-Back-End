const mongoose = require('mongoose');
const DB_URL = require('./dbUrl');

async function connectDb() {
    return await mongoose.connect(DB_URL);
}

module.exports = connectDb;