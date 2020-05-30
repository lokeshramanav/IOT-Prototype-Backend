const db = require("../models");
const Mall = db.mall;

exports.addMall = (mall) => {
    return Mall.create({
        mall_name: mall.mall_name,
        mall_location: mall.mall_location,
    })
      .then((mall) => {
        console.log(">> Mall Created: " + JSON.stringify(mall, null, 4));
        console.log("This is the mall data!!!");
        console.log(mall.dataValues);
        return mall;
      })
      .catch((err) => {
        console.log(">> Error while creating mall: ", err);
      });
  }