const Photo = require('../models/Photo');

exports.getPhotos = () => Photo.find();
exports.getPopulatePhotos = () => this.getPhotos().populate('owner');
exports.createPhoto = (photoData) => Photo.create(photoData);
exports.getPhotoById = (photoId) => Photo.findById(photoId).populate('owner');
exports.deletePhoto = (photoId) => Photo.findByIdAndDelete(photoId);
exports.addComment = (photoId, username, comment) => Photo.findByIdAndUpdate(photoId, {
    $push: {
        commentList: { id: username, comment }
    }
});