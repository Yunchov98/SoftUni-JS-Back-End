const express = require('express');
const connectDb = require('./utils/connectDb');
const expressConfig = require('./config/expressConfig');
const handlebarsConfig = require('./config/handlebarsConfig');
const routes = require('./routes');

const app = express();
const PORT = 5000;

connectDb();
expressConfig(app);
handlebarsConfig(app);
app.use(routes);

app.listen(PORT, () => console.log('Server is listening on port 5000'));