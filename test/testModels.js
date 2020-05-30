const dbConfig = require("../config/testdb-config.js");

const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.mall = require("../models/mall.model.js")(sequelize, Sequelize);
db.lot = require("../models/lots.model.js")(sequelize, Sequelize);
db.mall.hasMany(db.lot, { as: "lot" });
db.lot.belongsTo(db.mall, {
  foreignKey: "mallId",
  as: "mall",
});


db.slot = require("../models/slots.model.js")(sequelize, Sequelize);
db.lot.hasMany(db.slot , { as: "slot" });
db.slot.belongsTo(db.lot, {
  foreignKey: "lotId",
  as: "lot",
});

db.bookingDetails = require("../models/bookingDetail.model.js")(sequelize, Sequelize);
db.slot.hasMany(db.bookingDetails , { as: "bookingDetails" });
db.bookingDetails.belongsTo(db.slot, {
  foreignKey: "slotId",
  as: "slot",
});

module.exports = db;