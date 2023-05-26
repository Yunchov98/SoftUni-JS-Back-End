const Breed = require('../models/Breed');
const Cat = require('../models/Cat');

exports.addBreed = async function (breed) {
    await Breed.create({
        breed: breed,
    });
};

exports.getBreed = async function () {
    return await Breed.find({});
};

exports.createCat = async function (name, description, img, breed) {
    const newCat = Cat.create({
        name,
        description,
        img,
        breed,
    });

    return newCat;
};

exports.getCats = async function () {
    return await Cat.find({});
};

exports.getCatById = async function (catId) {
    return await Cat.findById(catId);
};

exports.editCat = async function (catId, name, breed, description, img) {
    await Cat.findByIdAndUpdate(catId, {
        $set: {
            name,
            breed,
            description,
            img,
        }
    });
};

exports.deleteCat = async function (catId) {
    await Cat.findByIdAndDelete(catId);
};