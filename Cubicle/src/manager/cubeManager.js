const Cube = require('../models/Cube');

exports.getCubes = async (search, from, to) => {
    try {
        let result = await Cube.find().lean();

        if (search) {
            result = result.filter(cube => cube.name.toLowerCase().includes(search.toLowerCase()));
        }

        if (from) {
            result = result.filter(cube => cube.difficultyLevel >= Number(from));
        }

        if (to) {
            result = result.filter(cube => cube.difficultyLevel <= Number(to));
        }

        return result;
    } catch (error) {
        console.log(error);
    }
};

exports.createCube = (name, description, imageUrl, difficultyLevel) => {
    const cube = new Cube(name, description, imageUrl, difficultyLevel);

    return cube.save();
};

exports.getCubeById = (cubeId) => Cube.findById(cubeId);
exports.getOneWithAccessories = (cubeId) => this.getCubeById(cubeId).populate('accessories');
exports.attachAccessory = async (cubeId, accessoryId) => Cube.findByIdAndUpdate(cubeId, { $push: { accessories: accessoryId } });
exports.updateCube = (cubeId, name, description, imageUrl, difficultyLevel) => Cube.findByIdAndUpdate(cubeId, { name, description, imageUrl, difficultyLevel });
exports.deleteCube = (cubeId) => Cube.findByIdAndDelete(cubeId);


