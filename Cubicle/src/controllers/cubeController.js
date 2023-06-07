const router = require('express').Router();
const cubeManager = require('../manager/cubeManager');
const accessoryManager = require('../manager/accessoryManager');

router.get('/create', (req, res) => {
    res.render('cube/create');
});

router.post('/create', async (req, res) => {
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
    });

    res.redirect('/');
});

router.get('/details/:cubeId', async (req, res) => {
    const cube = await cubeManager.getOneWithAccessories(req.params.cubeId).lean();

    if (!cube) {
        res.redirect('/404');
    }

    res.render('cube/details', { cube });
});

router.get('/attach-accessory/:cubeId', async (req, res) => {
    const cube = await cubeManager.getCubeById(req.params.cubeId).lean();
    const accessories = await accessoryManager.getRest(cube.accessories).lean();

    const hasAccessories = accessories.length > 0;

    res.render('accessory/attach', { cube, accessories, hasAccessories });
});

router.post('/attach-accessory/:cubeId', async (req, res) => {
    const { accessory: accessoryId } = req.body;
    const cubeId = req.params.cubeId;

    await cubeManager.attachAccessory(cubeId, accessoryId);

    res.redirect(`/cubes/details/${cubeId}`);
});

router.get('/edit/:cubeId', async (req, res) => {
    const cube = await cubeManager.getCubeById(req.params.cubeId).lean();

    res.render('cube/edit', { cube });
});

router.post('/edit/:cubeId', async (req, res) => {
    const cubeId = req.params.cubeId;
    const { name, description, imageUrl, difficultyLevel } = req.body;

    await cubeManager.updateCube(cubeId, name, description, imageUrl, difficultyLevel);

    res.redirect(`/cubes/details/${cubeId}`);
});

module.exports = router;