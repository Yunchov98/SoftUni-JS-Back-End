const router = require('express').Router();

const accessoryManager = require('../manager/accessoryManager');
const { getErrorMessage } = require('../utils/errorHelper');

router.get('/create-accessory', (req, res) => {
    res.render('accessory/create');
});

router.post('/create-accessory', async (req, res) => {
    const { name, description, imageUrl } = req.body;

    try {
        await accessoryManager.createAccessory({ name, description, imageUrl });

        res.redirect('/');
    } catch (error) {
        const errorMessages = getErrorMessage(error);

        res.status(400).render('accessory/create', { errorMessages });
    }
});

module.exports = router;