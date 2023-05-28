const mongoose = require('mongoose');
const DB_URL = require('./dbUrl');

async function connectDb() {
    console.log('Connection with DB - successfully');
    return await mongoose.connect(DB_URL);
}

module.exports = connectDb;