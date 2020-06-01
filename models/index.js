const dbConfig = require("../config/db-config.js");

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

db.mall = require("./mall.model.js")(sequelize, Sequelize);
db.lot = require("./lots.model.js")(sequelize, Sequelize);
db.mall.hasMany(db.lot, { as: "lot" });
db.lot.belongsTo(db.mall, {
  foreignKey: "mallId",
  as: "mall",
});


db.slot = require("./slots.model.js")(sequelize, Sequelize);
db.lot.hasMany(db.slot , { as: "slot" });
db.slot.belongsTo(db.lot, {
  foreignKey: "lotId",
  as: "lot",
});

db.bookingDetails = require("./bookingDetail.model.js")(sequelize, Sequelize);
db.slot.hasMany(db.bookingDetails , { as: "bookingDetails" });
db.bookingDetails.belongsTo(db.slot, {
  foreignKey: "slotId",
  as: "slot",
});
db.mall.hasMany(db.bookingDetails , { as: "bookingDetails" });
db.bookingDetails.belongsTo(db.mall, {
  foreignKey: "mallId",
  as: "mall",
});

module.exports = db;