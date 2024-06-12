var express = require('express');
var router = express.Router();

const { BOAT_SERVICE_PORT = 41605, BRAND_SERVICE_PORT = 34011 } = process.env;

/* GET home page. */
router.get('/:id', async function(req, res, next) {
  try {
    if (!req.params.id || isNaN(Number(req.params.id))) {
      res.sendStatus(400);
    } else {
      const signal = AbortSignal.timeout(1250);
      const boatRequest = await fetch(
        `http://localhost:${BOAT_SERVICE_PORT}/${req.params.id}`,
        { signal }
      );
      if(boatRequest.status == 200) {
        const boatRequestPromise = await boatRequest.json();        

        const brandRequest = await fetch(`http://localhost:${BRAND_SERVICE_PORT}/${boatRequestPromise.brand}`,{ signal });
        if(brandRequest.status == 200){
          const brandRequestPromise = await brandRequest.json();
          res.status(200).send({
            id: boatRequestPromise.id,
            color: boatRequestPromise.color,
            brand: brandRequestPromise.name,
          });
        } else if (brandRequest.status == 404) {
          res.sendStatus(404);
        }
      } else if (boatRequest.status == 404) {
        res.sendStatus(404);
      } else {
        res.sendStatus(500);
      }

    }    
  } catch (error) {
    next(error);
  }
  
});

module.exports = router;
