const Game = require('../models/Game');

exports.getGames = async (name, platform) => {
    try {
        let result = await Game.find().lean();

        if (name) {
            result = result.filter(game => game.name.toLowerCase().includes(name.toLowerCase()));
        }

        if (platform) {
            result = result.filter(game => game.platform.toLocaleLowerCase().includes(platform.toLowerCase()));
        }

        return result;
    } catch (error) {
        console.log(error);
    }
};
exports.createGame = (gameData) => Game.create(gameData);


exports.getGameById = (gameId) => Game.findById(gameId);
exports.editGame = (gameId, platfrom, name, imageUrl, price, genre, description) => Game.findByIdAndUpdate(gameId, { platfrom, name, imageUrl, price, genre, description });
exports.deleteGame = (gameId) => Game.findByIdAndDelete(gameId);
exports.buyGame = (gameId, userId) => Game.findByIdAndUpdate(gameId, { $push: { boughtBy: userId } });