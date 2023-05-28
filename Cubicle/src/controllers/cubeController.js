const router = require('express').Router();
const cubeManager = require('../manager/cubeManager');

router.get('/create', (req, res) => {
    res.render('create');
});

router.post('/create', (req, res) => {
    const {
        name,
        description,
        imageUrl,
        difficultyLevel,
    } = req.body;

    cubeManager.createCube(name, description, imageUrl, difficultyLevel);

    res.redirect('/');
});

router.get('/details/:cubeId', (req, res) => {
    cubeManager.getCubeById(req.params.cubeId)
        .then(cube => {
            res.render('details', { cube });
        });
});

module.exports = router;