const express = require('express');

const expressConfigs = require('./configs/expressConfigs');
const handlebarsConfigs = require('./configs/handlebarsConfigs');

const app = express();

expressConfigs(app);
handlebarsConfigs(app);


app.listen('3000', () => console.log('Server is listening on port 3000'));