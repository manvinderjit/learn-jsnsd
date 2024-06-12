"use strict";

const port = process.env.PORT || 4040;
const colors = ["Yellow", "Red", "Orange", "Green", "Blue", "Indigo"];
const MISSING = 2;

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
      color: colors[Number(req.params.id) % colors.length],
    };
    res.set("Content-Type", "application/json");
    res.status(201).send({
      id: req.params.id,
      color: colors[Number(req.params.id) % colors.length],
    });
  }
});

app.listen(port);
