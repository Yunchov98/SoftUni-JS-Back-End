const mongoose = require('mongoose');
const { DB_URI } = require('./utils');

async function connectDb() {
    await mongoose.connect(DB_URI);
}

module.exports = connectDb;