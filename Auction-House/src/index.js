const express = require('express');

const expressConfigs = require('./configs/expressConfigs');
const handlebarsConfigs = require('./configs/handlebarsConfigs');

const { PORT } = require('./configs/utils');

const app = express();

expressConfigs(app);
handlebarsConfigs(app);

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));