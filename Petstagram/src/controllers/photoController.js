const router = require('express').Router();

const photoManager = require('../managers/photoManager');
const userManager = require('../managers/userManager');
const { getErrorMessage } = require('../utils/errorHelper');

router.get('/catalog', async (req, res) => {
    try {
        const petCards = await photoManager.getPopulatePhotos().lean();

        res.render('pet/catalog', { petCards });
    } catch (error) {
        res.render('404');
    }
});

router.get('/create', (req, res) => {
    res.render('pet/create');
});

router.post('/create', async (req, res) => {
    const { name, age, description, location, imageUrl } = req.body;

    try {
        await photoManager.createPhoto({
            name,
            age: Number(age),
            description,
            location,
            imageUrl,
            owner: req.user._id,
        });

        res.redirect('/pets/catalog');
    } catch (error) {
        const errorMessages = getErrorMessage(error);

        res.render('pet/create', { errorMessages });
    }
});

router.get('/details/:photoId', async (req, res) => {
    const user = req.user;

    try {
        const photo = await photoManager.getPhotoById(req.params.photoId).lean();

        const commentList = photo.commentList;
        const isOwner = req.user?._id.toString() === photo.owner._id.toString();
        const isNotOwner = req.user?._id.toString() !== photo.owner._id.toString();

        res.render('pet/details', { photo, isOwner, isNotOwner, user, commentList });
    } catch (error) {
        res.render('404');
    }
});

router.post('/details/:photoId', async (req, res) => {
    const { comment } = req.body;

    try {
        await photoManager.addComment(req.params.photoId, req.user.username, comment);

        res.redirect(`/pets/details/${req.params.photoId}`);
    } catch (error) {
        console.log(error);
    }
});

router.get('/edit/:photoId', async (req, res) => {
    try {
        const photo = await photoManager.getPhotoById(req.params.photoId).lean();

        res.render('pet/edit', { photo });
    } catch (error) {
        res.render('404');
    }
});

router.post('/edit/:photoId', async (req, res) => {
    const photoId = req.params.photoId;
    const { name, age, description, location, imageUrl } = req.body;

    try {
        await photoManager.updatePhoto(photoId, name, age, description, location, imageUrl);

        res.redirect(`/pets/details/${photoId}`);
    } catch (error) {
        const errorMessages = getErrorMessage(error);

        res.render('pet/edit', { errorMessages });
    }
});

router.get('/delete/:photoId', async (req, res) => {
    try {
        await photoManager.deletePhoto(req.params.photoId);

        res.redirect('/pets/catalog');
    } catch (error) {
        res.render('404');
    }
});

module.exports = router;