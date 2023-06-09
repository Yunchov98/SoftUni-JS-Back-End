const express = require('express');

const expressConfigs = require('./configs/expressConfigs');
const handlebarsConfigs = require('./configs/handlebarsConfigs');

const app = express();

expressConfigs(app);
handlebarsConfigs(app);

app.get('/', (req, res) => {
    res.render('Hello World');
});

app.listen(3000, () => 'Server is listening on port 3000');