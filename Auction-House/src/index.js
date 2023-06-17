const express = require('express');

const expressConfigs = require('./configs/expressConfigs');
const { PORT } = require('./configs/utils');

const app = express();

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));