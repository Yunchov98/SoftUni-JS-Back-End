const express = require('express');

const { PORT } = require('./configs/utils');
const expressConfigs = require('./configs/expressConfigs');

const app = express();

expressConfigs(app);

app.listen(PORT, () => console.log(`Sever is listening on port ${PORT}...`));