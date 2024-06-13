'use strict';
const express = require('express');
const app = express();

app.use('/bad', (req, res) => {
  res.sendStatus(404);
});

app.use('/redit', (req, res) => {
  res.sendStatus(301);
  res.end();
});

app.use('/ok', (req, res) => {
  res.header("Content-Type", "application/json");  
  res.header("Cookie", "test");
  res.send("hello");
});

app.use(function (req, res, next) {
  res.status(404);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  
});

app.listen(5050);
