const Cube = require('../models/Cube');

exports.getCubes = async function () {
    return await Cube.find().lean();
};

exports.createCube = async function (name, description, imageUrl, difficultyLevel) {
    await Cube.create({
        name,
        description,
        imageUrl,
        difficultyLevel: Number(difficultyLevel),
    });
};

exports.getCubeById = async function (cubeId) {
    return await Cube.findById(cubeId).lean();
};