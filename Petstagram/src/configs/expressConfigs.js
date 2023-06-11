const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

function expressConfigs(app) {
    app.use(express.static(path.resolve(__dirname, '../pubic')));
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
}

module.exports = expressConfigs;