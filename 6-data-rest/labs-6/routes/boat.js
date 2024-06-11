var express = require('express');
var router = express.Router();
let model = require('../model');

router.get("/:id", function (req, res, next) { 
  
  const data = model.boat.read(req.params.id, (err, result) => {
    if(err) {
      if(err.message === 'not found') next();
      else next(err);
    } else{
      res.send(result);
    }          
  });
  
});

/* GET home page. */
router.post('/', function(req, res, next) {
  if(req.method === 'POST') {
    if(req.header('content-type') === 'application/json'){
      res.set('Content-Type', 'application/json');
      var id = model.boat.uid();
      model.boat.create(id, req.body.data, (err) => {
        if(err) next(err);
        else res.status(201).send({id});
      })
    }
  }
});

router.delete('/:id', function (req, res, next) {
  model.boat.del(req.params.id, (err) => {
    if(err){
      if(err.message === 'not found') next();
      else next(err);
    } else {
      res.status(204).send();
    }
  })  
});

module.exports = router;
