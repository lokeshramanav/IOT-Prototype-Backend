const db = require("../models");
const Lot = db.lot;

exports.addLot = (req, res) => {
     return Lot.create({
         lot_name: req.body.lotName,
         mallId: req.body.mallId,
     })
       .then((lot) => {
         console.log(">> Lot Created: " + JSON.stringify(lot, null, 4));
         return res.json({lot});
       })
       .catch((err) => {
         console.log(">> Error while creating lot: ", err);
         return res.status(400).json({error: err.message})
       });
   }

exports.getLot  = (req, res)=>{
    return Lot.findAll({where:{mallId:req.body.mallId}})
    .then((lots)=>{return res.json({ lots })})
    .catch((err)=>{return res.status(400).json({error: "Database has no lots!!!"})})
}