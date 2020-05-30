const db = require("../models");
const Slot = db.slot;

exports.addSlot = (lotId, slot) => {
    return Slot.create({
        slot_number: slot,
        lotId:lotId
    })
      .then((slot) => {
        console.log(">> Created slot: " + JSON.stringify(slot, null, 4));
        return slot;
      })
      .catch((err) => {
        console.log(">> Error while creating comment: ", err);
      });
  };