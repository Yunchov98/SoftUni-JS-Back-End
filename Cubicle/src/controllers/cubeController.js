const router = require('express').Router();

const cubeManager = require('../manager/cubeManager');
const accessoryManager = require('../manager/accessoryManager');
const { isAuth } = require('../middlewares/authMiddleware');
const { getDiffOptViewData } = require('../utils/viewHelper');
const { getErrorMessage } = require('../utils/errorHelper');

router.get('/create', isAuth, (req, res) => {
    res.render('cube/create');
});

router.post('/create', isAuth, async (req, res) => {
    const {
        name,
        description,
        imageUrl,
        difficultyLevel,
    } = req.body;

    try {
        await cubeManager.createCube({
            name,
            description,
            imageUrl,
            difficultyLevel: Number(difficultyLevel),
            owner: req.user._id,
        });

        res.redirect('/');
    } catch (error) {
        const errorMessages = getErrorMessage(error);

        res.status(404).render('cube/create', { errorMessages });
    }
});

router.get('/details/:cubeId', async (req, res) => {
    try {
        const cube = await cubeManager.getOneWithAccessories(req.params.cubeId).lean();

        if (!cube) {
            res.redirect('/404');
        }

        const isOwner = cube.owner?.toString() === req.user?._id;

        res.render('cube/details', { cube, isOwner });
    } catch (error) {
        res.render('/404');
    }
});

router.get('/attach-accessory/:cubeId', isAuth, async (req, res) => {
    try {
        const cube = await cubeManager.getCubeById(req.params.cubeId).lean();
        const accessories = await accessoryManager.getRest(cube.accessories).lean();

        const hasAccessories = accessories.length > 0;

        res.render('accessory/attach', { cube, accessories, hasAccessories });
    } catch (error) {
        res.render('/404');
    }
});

router.post('/attach-accessory/:cubeId', isAuth, async (req, res, next) => {
    const { accessory: accessoryId } = req.body;
    const cubeId = req.params.cubeId;

    try {
        await cubeManager.attachAccessory(cubeId, accessoryId);

        res.redirect(`/cubes/details/${cubeId}`);
    } catch (error) {
        console.log(error);
    }
});

router.get('/edit/:cubeId', isAuth, async (req, res) => {
    try {
        const cube = await cubeManager.getCubeById(req.params.cubeId).lean();

        if (cube.owner.toString() !== req.user?._id) {
            return res.redirect('/404');
        }

        const options = getDiffOptViewData(cube.difficultyLevel);

        res.render('cube/edit', { cube, options });
    } catch (error) {
        res.render('404');
    }
});

router.post('/edit/:cubeId', isAuth, async (req, res) => {
    const cubeId = req.params.cubeId;
    const { name, description, imageUrl, difficultyLevel } = req.body;

    try {
        await cubeManager.updateCube(cubeId, name, description, imageUrl, difficultyLevel);

        if (name.length < 5) {
            throw new Error('Cube name must be at least 5 characters long');
        }

        if (description.length < 20) {
            throw new Error('Cube description must be at least 20 characters long');
        }

        res.redirect(`/cubes/details/${cubeId}`);
    } catch (error) {
        const errorMessages = getErrorMessage(error);

        res.status(404).render('cube/edit', { errorMessages });
    }
});

router.get('/delete/:cubeId', isAuth, async (req, res) => {
    try {
        const cube = await cubeManager.getCubeById(req.params.cubeId).lean();

        const options = getDiffOptViewData(cube.difficultyLevel);

        res.render('cube/delete', { cube, options });
    } catch (error) {
        res.render('404');
    }
});

router.post('/delete/:cubeId', isAuth, async (req, res) => {
    try {
        await cubeManager.deleteCube(req.params.cubeId);

        res.redirect('/');
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;