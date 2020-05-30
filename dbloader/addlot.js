const db = require("../models");
const Lot = db.lot;

exports.addLot = (mallId, lot) => {
    return Lot.create({
        lot_name: lot,
        mallId:mallId
    })
      .then((lot) => {
        console.log(">> Created lot: " + JSON.stringify(lot, null, 4));
        return lot;
      })
      .catch((err) => {
        console.log(">> Error while creating comment: ", err);
      });
  };