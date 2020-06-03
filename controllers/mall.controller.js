const db = require("../models");
const Mall = db.mall;

exports.addMall = (req, res) => {
    return Mall.create({
        mall_name: req.body.mall_name,
        mall_location: req.body.mall_location,
    })
      .then((mall) => {
        console.log(">> Mall Created: " + JSON.stringify(mall, null, 4));
        return res.json({mall});
      })
      .catch((err) => {
        console.log(">> Error while creating mall: ", err);
        return res.status(400).json({error: err.message})
      });
  }

exports.getMalls = (req, res)=>{
    return Mall.findAll({ include: ["lot"] })
            .then((malls)=>{return res.json({ malls })})
            .catch((err)=>{return res.status(400).json({error: "Database has no malls!!!"})})
}
