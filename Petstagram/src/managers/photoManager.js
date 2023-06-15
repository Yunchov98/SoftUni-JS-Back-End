const Photo = require('../models/Photo');

exports.getPopulatePhotos = () => Photo.find().populate('owner');

exports.createPhoto = (photoData) => Photo.create(photoData);

exports.getPhotoById = (photoId) => Photo.findById(photoId).populate('owner');

exports.deletePhoto = (photoId) => Photo.findByIdAndDelete(photoId);

exports.updatePhoto = (photoId, name, age, description, location, imageUrl) => Photo.findByIdAndUpdate(photoId, { name, age, description, location, imageUrl });

exports.getUserPhotos = (userId) => Photo.find({ owner: userId });

exports.addComment = async (photoId, commentData) => {
    const photo = await Photo.findById(photoId);

    photo.comments.push(commentData);

    return photo.save();
};
