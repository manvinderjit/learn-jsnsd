'use strict';

const { Router } = require ('express');
const router = Router();

const data = require('../data');

router.get("/", async function (req, res) {
      try {
        res.send(await data());
      } catch (err) {
        next(err);
      }
});

module.exports = router;
