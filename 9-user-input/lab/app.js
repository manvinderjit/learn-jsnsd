'use strict'
const express = require('express')
const app = express()
const router = express.Router()
const { PORT = 3000 } = process.env
const createError = require('http-errors');
const { query } = require("express-validator");


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(router);

router.get('/', (req, res, next) => {
  if(Array.isArray(req.query.un) == true) {
    next(createError(400));
  } else {
    setTimeout(() => {
      res.send((req.query.un || "").toUpperCase());
    }, 1000);
  }
  
})

router.post('/', (req, res, next) => {  
  const { data } = req.body;
  if(!data || data == undefined){
    console.log("no data");
  } else {    
    const _keys = JSON.stringify(Object.keys(data)).toLowerCase();
    if (_keys.includes("brand") && _keys.includes("color")){
      console.log(data["brand"], data["color"]);
      res.sendStatus(200);
    } else {      
      res.status(404).send('no keys found');
    }
  }
})

app.use((err, req, res, next) => {
  res.status(err.status || 500).send(err.message || 'Something went wrong');
})

app.listen(PORT, () => {
  console.log(`Express server listening on ${PORT}`)
})