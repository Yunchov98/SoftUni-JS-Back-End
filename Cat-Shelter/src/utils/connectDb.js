const mongoose = require('mongoose');

async function connectDb() {
    console.log('succefully');
    return await mongoose.connect('mongodb://127.0.0.1:27017/catShelter');
}

module.exports = connectDb;