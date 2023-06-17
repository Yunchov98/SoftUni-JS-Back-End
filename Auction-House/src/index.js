const express = require('express');

const expressConfigs = require('./configs/expressConfigs');
const handlebarsConfigs = require('./configs/handlebarsConfigs');
const routes = require('./routes');

const { PORT } = require('./configs/utils');

const app = express();

expressConfigs(app);
handlebarsConfigs(app);

app.use(routes);

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));