const express = require('express');

const expressConfigs = require('./configs/expressConfigs');
const handlebarsConfigs = require('./configs/handlebarsConfigs');
const connectDb = require('./configs/connectDb');

const routes = require('./routes');
const { PORT } = require('./configs/utils');

const app = express();

connectDb()
    .then(() => console.log('Successfully connected with the DB'))
    .catch(err => console.log(err));

expressConfigs(app);
handlebarsConfigs(app);

app.use(routes);

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));