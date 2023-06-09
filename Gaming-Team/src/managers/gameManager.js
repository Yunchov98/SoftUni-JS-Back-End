const Game = require('../models/Game');

exports.getGames = () => Game.find();
exports.createGame = (platfrom, name, imageUrl, price, genre, description) => {
    Game.create(platfrom, name, imageUrl, price, genre, description);
};

exports.getGameById = (gameId) => Game.findById(gameId);
exports.editGame = (gameId, platfrom, name, imageUrl, price, genre, description) => Game.findByIdAndUpdate(gameId, { platfrom, name, imageUrl, price, genre, description });
exports.deleteGame = (gameId) => Game.findByIdAndDelete(gameId);