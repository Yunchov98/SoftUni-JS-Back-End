// const mongoose = require('mongoose');

const Cat = require('../models/Cat');

async function getCats() {
    return await Cat.find({});
}

module.exports = getCats;