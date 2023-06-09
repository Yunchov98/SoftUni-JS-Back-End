const router = require('express').Router();
const cubeManager = require('../manager/cubeManager');

router.get('/', async (req, res) => {
    const { search, from, to } = req.query;

    try {
        const cubes = await cubeManager.getCubes(search, from, to);

        res.render('index', { cubes, search, from, to });
    } catch (error) {
        console.log(error);
    }
});

router.get('/about', (req, res) => {
    res.render('about');
});

router.get('/404', (req, res) => {
    res.render('404');
});

module.exports = router;