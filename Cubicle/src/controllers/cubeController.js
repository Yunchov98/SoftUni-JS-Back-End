const router = require('express').Router();

const cubeManager = require('../manager/cubeManager');
const accessoryManager = require('../manager/accessoryManager');
const { isAuth } = require('../middlewares/authMiddleware');
const { getDiffOptViewData } = require('../utils/viewHelper');

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

    await cubeManager.createCube({
        name,
        description,
        imageUrl,
        difficultyLevel: Number(difficultyLevel),
        owner: req.user._id,
    });

    res.redirect('/');
});

router.get('/details/:cubeId', async (req, res) => {
    const cube = await cubeManager.getOneWithAccessories(req.params.cubeId).lean();

    if (!cube) {
        res.redirect('/404');
    }

    const isOwner = cube.owner?.toString() === req.user?._id;

    res.render('cube/details', { cube, isOwner });
});

router.get('/attach-accessory/:cubeId', isAuth, async (req, res) => {
    const cube = await cubeManager.getCubeById(req.params.cubeId).lean();
    const accessories = await accessoryManager.getRest(cube.accessories).lean();

    const hasAccessories = accessories.length > 0;

    res.render('accessory/attach', { cube, accessories, hasAccessories });
});

router.post('/attach-accessory/:cubeId', isAuth, async (req, res) => {
    const { accessory: accessoryId } = req.body;
    const cubeId = req.params.cubeId;

    await cubeManager.attachAccessory(cubeId, accessoryId);

    res.redirect(`/cubes/details/${cubeId}`);
});

router.get('/edit/:cubeId', isAuth, async (req, res) => {
    const cube = await cubeManager.getCubeById(req.params.cubeId).lean();

    if (cube.owner.toString() !== req.user?._id) {
        return res.redirect('/404');
    }

    const options = getDiffOptViewData(cube.difficultyLevel);

    res.render('cube/edit', { cube, options });
});

router.post('/edit/:cubeId', isAuth, async (req, res) => {
    const cubeId = req.params.cubeId;
    const { name, description, imageUrl, difficultyLevel } = req.body;

    await cubeManager.updateCube(cubeId, name, description, imageUrl, difficultyLevel);

    res.redirect(`/cubes/details/${cubeId}`);
});

router.get('/delete/:cubeId', isAuth, async (req, res) => {
    const cube = await cubeManager.getCubeById(req.params.cubeId).lean();

    const options = getDiffOptViewData(cube.difficultyLevel);

    res.render('cube/delete', { cube, options });
});

router.post('/delete/:cubeId', isAuth, async (req, res) => {
    await cubeManager.deleteCube(req.params.cubeId);

    res.redirect('/');
});

module.exports = router;