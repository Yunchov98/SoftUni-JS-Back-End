const express = require('express');

const expressConfig = require('./config/expressConfig');
const handlebarsConfig = require('./config/handlebarsConfig');
const connectDb = require('./utils/databse');

const routes = require('./routes');
const errorHandler = require('./middlewares/errorHandlerMiddleware');
const PORT = require('./utils/port');

const app = express();

expressConfig(app);
handlebarsConfig(app);

app.use(routes);
app.use(errorHandler);

connectDb()
    .then(() => console.log('Connection with DB - successfully'))
    .catch(err => console.log(err));

app.listen(PORT, () => console.log('Server is listen on port 5000...'));