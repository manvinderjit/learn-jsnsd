var model = require("../../model");

var express = require("express");
var router = express.Router();

router.get("/:id", function (req, res, next) {
  model.boat.read(req.params.id, (err, result) => {
    if (err) {
      if (err.message === "not found") next();
      else next(err);
    } else {
      res.send(result);
    }
  });
});

const validatePostDataMW = (req,res,next) => {
    if(!req.body.data || req.body.data == undefined || !req.body.data['brand'] || req.body.data['brand'] == undefined || !req.body.data['color'] || req.body.data['color'] == undefined ) {
        res.sendStatus(400);        
    } else {
        next();
    }
}

router.post("/", validatePostDataMW, function (req, res, next) {
  var id = model.boat.uid();
  console.log(req.body.data);  
  const _data = {
    brand: req.body.data["brand"],
    color: req.body.data["color"],
  };

  model.boat.create(id, _data, (err) => {
    if (err) next(err);
    else res.status(201).send({ id });
  });
});

// router.post("/:id/update", function (req, res, next) {
//   model.boat.update(req.params.id, req.body.data, (err) => {
//     if (err) {
//       if (err.message === "not found") next();
//       else next(err);
//     } else {
//       res.status(204).send();
//     }
//   });
// });

// router.put("/:id", function (req, res, next) {
//   model.boat.create(req.params.id, req.body.data, (err) => {
//     if (err) {
//       if (err.message === "resource exists") {
//         model.boat.update(req.params.id, req.body.data, (err) => {
//           if (err) next(err);
//           else res.status(204).send();
//         });
//       } else {
//         next(err);
//       }
//     } else {
//       res.status(201).send({});
//     }
//   });
// });

router.delete("/:id", function (req, res, next) {
  model.boat.del(req.params.id, (err) => {
    if (err) {
      if (err.message === "not found") next();
      else next(err);
    } else {
      res.status(204).send();
    }
  });
});

module.exports = router;
