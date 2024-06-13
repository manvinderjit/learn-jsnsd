var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const { createProxyMiddleware } = require('http-proxy-middleware');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

const routeCheckMiddleware = (req, res, next) => {
  // console.log(req.query.url, req.path);
  if(req.path !== '/') next(createError(404))
  else if(!req.query.url) next(createError(400))
  else next();
} 

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(
  "/",
  routeCheckMiddleware,
  createProxyMiddleware({
    // target: "http://www.example.org/secret",
    // target: "https://jsonplaceholder.typicode.com",
    changeOrigin: true,
    router: function (req) {
      console.log(req.query.url)
      return req.query.url;
    },    
    
    // followRedirects: true,
    // on: {
    //   proxyRes: (proxyRes, req, res) => {
    //     // proxyRes.headers["Content-Type"] = "application/json"; // add new header to response
    //     // delete proxyRes.headers["x-removed"]; // remove header from response
    //     // console.log(proxyRes.statusCode, res.statusCode);
    //     res.statusCode = proxyRes.statusCode;
    //     // res = proxyRes;
    //   },
    // },
  })
);
// app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
