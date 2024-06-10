'use strict';

const port = process.env.PORT || 3000;
const express = require('express');
const createError = require('http-errors');
const app =  express();

app.use('/', (req, res) => {
    console.log(req.method);
    if(req.method === 'POST'){
        res.sendStatus(405);
    }
    else if (req.method === "GET") {
        res.status(200).send("Hello");
    } else {
        res.sendStatus(400);
    }
    
});

app.listen(port);
