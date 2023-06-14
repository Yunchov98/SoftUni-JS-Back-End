const express = require('express');

const { PORT } = require('./configs/utils');
const expressConfigs = require('./configs/expressConfigs');
const handlebarsConfigs = require('./configs/handlebarsConfigs');
const routes = require('./routes');

const app = express();

expressConfigs(app);
handlebarsConfigs(app);

app.use(routes);

app.listen(PORT, () => console.log(`Sever is listening on port ${PORT}...`));