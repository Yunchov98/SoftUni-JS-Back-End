const mongoose = require('mongoose');
const address = require('./address');

async function connectDb() {
    console.log('succefully connected to the databse');
    return await mongoose.connect(address);
}

module.exports = connectDb;