const Animal = require('../models/Animal');

exports.createAnimal = (animalData) => Animal.create(animalData);

exports.getOneAnimal = (animalId) => Animal.findById(animalId);

exports.donate = (animalId, userId) => Animal.findByIdAndUpdate(animalId, { $push: { donations: userId } });

exports.deleteAnimal = (animalId) => Animal.findByIdAndDelete(animalId);

exports.editAnimal = (animalId, animalData) => Animal.findByIdAndUpdate(animalId, animalData, { runValidators: true });

exports.getAllAnimals = async (search) => {
    try {
        let result = await Animal.find().lean();

        if (search) {
            result = result.filter(animals => animals.location.toLowerCase().includes(search.toLowerCase()));
        }

        return result;
    } catch (error) {
        console.log(error);
    }
};
