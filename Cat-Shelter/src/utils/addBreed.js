const mongoose = require('mongoose');
const Breed = require('../models/Breed');

async function addBreed(breed) {
    await Breed.create({
        breed: breed,
    });
}

module.exports = addBreed;