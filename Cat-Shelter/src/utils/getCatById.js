const Cat = require('../models/Cat');

async function getOneCat(catId) {
     return await Cat.findById(catId);
}

module.exports = getOneCat;