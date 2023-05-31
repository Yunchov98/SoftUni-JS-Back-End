const router = require('express').Router();
const accessoryManager = require('../manager/accessoryManager');

router.get('/create-accessory', (req, res) => {
    res.render('accessory/create');
});

router.post('/create-accessory', async (req, res) => {
    const { name, description, imageUrl } = req.body;
    
    await accessoryManager.createAccessory({name, description, imageUrl});

    res.redirect('/');
});

module.exports = router;