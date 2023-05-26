const Cat = require('../models/Cat');

async function deleteCat(catId) {
    await Cat.findByIdAndDelete(catId);
}

module.exports = deleteCat;