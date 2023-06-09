const Game = require('../models/Game');

exports.getGames = () => Game.find();
exports.createGame = (gameData) => Game.create(gameData);


exports.getGameById = (gameId) => Game.findById(gameId);
exports.editGame = (gameId, platfrom, name, imageUrl, price, genre, description) => Game.findByIdAndUpdate(gameId, { platfrom, name, imageUrl, price, genre, description });
exports.deleteGame = (gameId) => Game.findByIdAndDelete(gameId);