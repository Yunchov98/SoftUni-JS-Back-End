const express = require('express');

const expressConfig = require('./config/expressConfig');
const handlebarsConfig = require('./config/handlebarsConfig');
const connectDb = require('./utils/databse');

const routes = require('./routes');
const PORT = require('./utils/port');

const app = express();
expressConfig(app);
handlebarsConfig(app);
app.use(routes);
connectDb();

app.listen(PORT, () => console.log('Server is listen on port 5000...'));