const Cat = require('../models/Cat');

async function editCat(catId, name, breed, description, img) {
    await Cat.findByIdAndUpdate(catId, {$set: {
        name,
        breed,
        description,
        img,
    }});
}

module.exports = editCat;