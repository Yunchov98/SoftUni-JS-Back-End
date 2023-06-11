const express = require('express');

const expressConfigs = require('./configs/expressConfigs');
const handlebarsConfigs = require('./configs/handlebarsConfigs');
const connectDb = require('./configs/database');
const routes = require('./routes');

const { PORT } = require('./configs/utils');

const app = express();

expressConfigs(app);
handlebarsConfigs(app);

app.use(routes);

connectDb()
    .then(console.log('Successfully connected to the database'))
    .catch(error => console.log(error));

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));