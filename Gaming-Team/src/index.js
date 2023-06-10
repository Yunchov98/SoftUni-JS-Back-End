const express = require('express');

const expressConfigs = require('./configs/expressConfigs');
const handlebarsConfigs = require('./configs/handlebarsConfigs');
const connectDb = require('./configs/database');
const { PORT } = require('./configs/utils');
const routes = require('./routes');
const errorHandler = require('./middlewares/errorHandlerMiddleware');

const app = express();

expressConfigs(app);
handlebarsConfigs(app);

app.use(routes);
app.use(errorHandler);

connectDb()
    .then(() => console.log('DB connected successfully'))
    .catch(err => console.log(err));

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));