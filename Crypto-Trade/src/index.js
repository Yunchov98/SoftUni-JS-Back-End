const express = require('express');

const { PORT } = require('./configs/utils');

const app = express();

app.listen(PORT, () => console.log(`Sever is listening on port ${PORT}...`));