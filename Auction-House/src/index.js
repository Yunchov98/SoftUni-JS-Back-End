const express = require('express');

const expressConfigs = require('./configs/expressConfigs');
const handlebarsConfigs = require('./configs/handlebarsConfigs');
const connectDb = require('./configs/database');
const routes = require('./routes');

const { PORT } = require('./configs/utils');

const app = express();

connectDb()
    .then(() => console.log('DB connected successfully'))
    .catch(err => console.log(`Error: ${err}`));

expressConfigs(app);
handlebarsConfigs(app);

app.use(routes);

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));