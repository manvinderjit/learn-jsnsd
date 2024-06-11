var express = require("express");
var router = express.Router();
var hnLatestStream = require("hn-latest-stream");
var finished = require("stream").finished;

const { Readable, Transform } = require("stream");
function streamD() {
  const readable = Readable.from(
    ["this", "is", "a", "stream", "of", "data"].map((s) => s + "<br>")
  );
  const delay = new Transform({
    transform(chunk, enc, cb) {
      setTimeout(cb, 500, null, chunk);
    },
  });
  return readable.pipe(delay);
}

/* GET users listing. */
router.get("/", function (req, res, next) {
  
  const stream = streamD();
  
  stream.pipe(res, { end: false });
  finished(stream, (err) => {
    if (err) {
      next(err);
      return;
    }
    res.end();
  });  
  
});

module.exports = router;
