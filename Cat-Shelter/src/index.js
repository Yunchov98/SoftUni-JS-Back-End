const catManager = require('./managers/catManager');
const connectDb = require('./utils/connectDb');

connectDb();

const cats = catManager.deleteCat('6470b7844987a584d0eb5b7b');

