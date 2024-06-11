"use strict";

function bicycleModel() {
  const db = {
    1: { brand: "Veloretti", color: "green" },
    2: { brand: "Batavus", color: "yellow" },
  };

  return {
    read,
  };

  function read(id, cb) {
    if (!db.hasOwnProperty(id)) {
      const err = Error("not found");
      setImmediate(() => cb(err));
      return;
    }
    setImmediate(() => cb(null, db[id]));
    //  setImmediate(() => cb(Error()));
  }
}

module.exports = {
  bicycle: bicycleModel(),
};
