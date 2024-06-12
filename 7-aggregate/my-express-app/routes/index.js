var express = require('express');
var router = express.Router();

const { BICYCLE_SERVICE_PORT = 4040, BRAND_SERVICE_PORT = 5050 } = process.env;
const bicycleSrv = `http://localhost:${BICYCLE_SERVICE_PORT}`;
const brandSrv = `http://localhost:${BRAND_SERVICE_PORT}`;

/* GET home page. */
router.get('/:id', async function(req, res, next) {
  try {
    const noop = Function.prototype;
    const signal = AbortSignal.timeout(3000); 
    const bicycleData = await fetch(`${bicycleSrv}/${req.params.id}`, {signal});
    const brandData = await fetch(`${brandSrv}/${req.params.id}`, { signal });
    if (bicycleData.status === 404 || brandData.status === 404) {
      res.sendStatus(404);
      // throw ({ status: '404', message: 'Not Found'});
    } else if (bicycleData.status === 400 || brandData.status === 400) {
      res.sendStatus(400);
      // throw ({ status: '404', message: 'Not Found'});
    } else {
      const bicycleDataPromise = bicycleData.json();
      // .catch((error) => error);
      const brandDataPromise = brandData.json();

      // .catch((error) => error);
      bicycleDataPromise.catch(noop);

      brandDataPromise.catch(noop);

      const resultData = await Promise.allSettled([
        bicycleDataPromise,
        brandDataPromise,
      ]);
      for (const { reason } of resultData) if (reason) throw reason;
      const [bicycle, brand] = resultData.map(({ value }) => value);

      res.status(201).send({
        id: bicycle.id ? bicycle.id : brand.id,
        color: bicycle.color,
        brand: brand.name,
      });
    }
    
  } catch (error) {
    next(error);
  }  
});

module.exports = router;
