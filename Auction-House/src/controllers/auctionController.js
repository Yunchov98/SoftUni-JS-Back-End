const router = require('express').Router();

const { publish, publishPage } = require('../utils/routes');

router.get(publish, (req, res) => {
    res.render(publishPage);
});

module.exports = router;