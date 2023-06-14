const express = require('express');

const { PORT } = require('./configs/utils');
const expressConfigs = require('./configs/expressConfigs');
const handlebarsConfigs = require('./configs/handlebarsConfigs');

const app = express();

expressConfigs(app);
handlebarsConfigs(app);

app.listen(PORT, () => console.log(`Sever is listening on port ${PORT}...`));