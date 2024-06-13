const { createProxyMiddleware } = require("http-proxy-middleware");
var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {  
  // const { url } = req.query;
  // console.log(url);
  // proxy(req.query.url);
  res.render("index", { title: "Express" });
});
// router.get('/', proxy(`${req.query.url}`))
// router.use(
//   "/",
//   createProxyMiddleware({
//     target: "http://localhost:5050/",
//     // target: "htt‌ps://news.ycombinator.com",
//     changeOrigin: true,
//   })
// );

module.exports = router;
