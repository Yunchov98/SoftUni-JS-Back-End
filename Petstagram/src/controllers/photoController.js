const router = require('express').Router();

const photoManager = require('../managers/photoManager');
const { getErrorMessage } = require('../utils/errorHelper');
const { isAuth } = require('../middlewares/authMiddleware');

router.get('/catalog', async (req, res) => {
    try {
        const petCards = await photoManager.getPopulatePhotos().lean();

        res.render('pet/catalog', { petCards });
    } catch (error) {
        res.render('404');
    }
});

router.get('/create', isAuth, (req, res) => {
    res.render('pet/create');
});

router.post('/create', isAuth, async (req, res) => {
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
    try {
        const photo = await photoManager.getPhotoById(req.params.photoId).populate('comments.user').lean();

        const isOwner = req.user?._id.toString() === photo.owner._id.toString();

        res.render('pet/details', { photo, isOwner });
    } catch (error) {
        res.render('404');
    }
});

router.post('/details/:photoId', async (req, res) => {
    const photo = await photoManager.getPhotoById(req.params.photoId).populate('comments.user').lean();
    const photoId = req.params.photoId;
    const user = req.user._id;
    const { comment } = req.body;
    const isOwner = req.user?._id.toString() === photo.owner._id.toString();

    try {
        await photoManager.addComment(photoId, { user, comment });

        res.redirect(`/pets/details/${photoId}`);
    } catch (error) {
        const errorMessages = getErrorMessage(error);
        res.render('pet/details', { errorMessages, isOwner, photo });
    }

});

router.get('/edit/:photoId', isAuth, async (req, res) => {
    try {
        const photo = await photoManager.getPhotoById(req.params.photoId).lean();

        res.render('pet/edit', { photo });
    } catch (error) {
        res.render('404');
    }
});

router.post('/edit/:photoId', isAuth, async (req, res) => {
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

router.get('/delete/:photoId', isAuth, async (req, res) => {
    try {
        await photoManager.deletePhoto(req.params.photoId);

        res.redirect('/pets/catalog');
    } catch (error) {
        res.render('404');
    }
});

module.exports = router;