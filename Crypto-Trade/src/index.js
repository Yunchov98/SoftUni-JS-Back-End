const express = require('express');

const expressConfigs = require('./configs/expressConfigs');
const handlebarsConfigs = require('./configs/handlebarsConfigs');
const connectDb = require('./configs/database');

const { PORT } = require('./configs/utils');
const routes = require('./routes');

const app = express();

connectDb()
    .then(() => console.log('DB connected successfully'))
    .catch(err => console.log(err));

expressConfigs(app);
handlebarsConfigs(app);

app.use(routes);

app.listen(PORT, () => console.log(`Sever is listening on port ${PORT}...`));