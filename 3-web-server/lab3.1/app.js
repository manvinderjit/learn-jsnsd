'use strict';

const port = process.env.PORT || 3000;
const express = require('express');

const createError = require("http-errors");

const app = express();

const indexRoutes = require("./routes");

app.use('/', indexRoutes);

app.use((req, res, next) => {
    if(req.method !== 'GET') {
        next(createError(405));
    }
    next(createError(404));
})

app.use((err, req, res, next) => {
    res.status(err.status || 500).send(err.message);
})

app.listen(port);
