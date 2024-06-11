'use strict';

const port = process.env.PORT || 3000;
const express = require ('express');
const app = express();
const model = require('./model');

app.use('/boat/:id', (req, res, next) => {
    if(req.method !== 'GET'){
      res.sendStatus(400);
    } 
    model.boat.read(req.params.id, (err, result) =>{
        if (err) {
          if (err.message === "not found") next();
          else next(err);
        } else {
            res.setHeader("Content-Type", "application/json");
            res.send(result);
        }
    });
});

app.use((err, req, res, next) => {  
  res.status(err.status || 500).send(err.Message || 'Something Went Wrong');
});

app.listen(port);
