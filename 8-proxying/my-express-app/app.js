var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const { createProxyMiddleware } = require("http-proxy-middleware");
var app = express();

const pathFilter = function (path, req) {
  return (
    path.match("^/") && req.method === "GET"
    // path.match("^/") && req.query.token == "abc" && req.method === "GET"
  );
};

const checkTokenMiddleware = (req, res, next) => {
  if(!req.query.token || req.query.token !== 'abc') next(createError(404));
  next();    
}

const checkUrlMiddleware = (req, res, next) => {
  if (!req.query.url) next(createError('Url is required'));
  next();
};

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use(
  "/api",
  checkTokenMiddleware,
  createProxyMiddleware({
    // target: "https://news.ycombinator.com/",
    target: "http://localhost:5050",
    changeOrigin: true,
    // pathFilter: pathFilter,
    // add base path
    // pathRewrite: { "^/": "/api?token=abc/" },
    router: function (req) {
      return req.query.token
        ? "https://news.ycombinator.com/"
        : "http://127.0.0.1:5050";
    },    
  })
);

app.use(
  "/proxyme",
  checkUrlMiddleware,
  createProxyMiddleware({
    changeOrigin: true,
    router: function (req) {
      return req.query.url;
    },
    // on: {
    //   proxyRes: (proxyRes, req, res) => {
    //     /* handle proxyRes */
    //     // delete proxyRes.headers["x-removed"];
    //     proxyRes.headers["Content-Type"] = "application/json";
    //     // console.log(proxyRes.data, res.body);
    //   },
    // },
  })
);

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
