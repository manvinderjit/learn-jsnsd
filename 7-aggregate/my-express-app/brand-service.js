"use strict";

const port = process.env.PORT || 5050;
const brands = ["Gazelle", "Batavus", "Azor", "Cortina", "Giant", "Sparta"];
const MISSING = 3;

const express = require("express");
const app = express();

app.use("/:id", function (req, res, next) {
  if (!req.params.id || isNaN(Number(req.params.id))) {
    res.sendStatus(400);
  }

  if (
    Number(req.params.id) === MISSING ||
    Number(req.params.id) < 0
    
  ) {
    res.sendStatus(404);
  } else {
    const data = {
      id: req.params.id,
      color: brands[Number(req.params.id) % brands.length],
    };
    res.set("Content-Type", "application/json");
    res.status(201).send({
      id: req.params.id,
      name: brands[Number(req.params.id) % brands.length],
    });
  }
});

app.listen(port);
