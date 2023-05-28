const router = require('express').Router();
const cubeManager = require('../manager/cubeManager');

router.get('/', (req, res) => {
    const cubesPromise = cubeManager.getCubes()
        .then(cubes => res.render('index', { cubes }));
});

router.get('/about', (req, res) => {
    res.render('about');
});

module.exports = router;