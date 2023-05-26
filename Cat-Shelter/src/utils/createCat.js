const Cat = require('../models/Cat');

async function createCat(name, description, img, breed) {
    const newCat = Cat.create({
        name,
        description,
        img,
        breed,
    });

    return newCat;
}

module.exports = createCat;