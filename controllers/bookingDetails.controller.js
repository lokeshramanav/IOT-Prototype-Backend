const db = require("../models");
const Bookings = db.bookingDetails;

exports.deleteDetails = (req, res)=>{
    return Bookings.destroy({
        where: {},
        truncate: true
      }).then(response=>res.json({response})).catch((err)=>{return res.status(400).json({error: err.message})})
}