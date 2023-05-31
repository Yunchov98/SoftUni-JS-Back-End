const Accessory = require('../models/Accessory');

exports.getAllAccessories = () => Accessory.find();
exports.createAccessory = (accessoryData) => Accessory.create(accessoryData);
exports.getRest = (accessoryIds) => Accessory.find({ _id: { $nin: accessoryIds } });