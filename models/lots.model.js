module.exports = (sequelize, Sequelize) => {
    const Lot = sequelize.define("lot", {
      lot_name: {
        type: Sequelize.STRING,
        allowNull: false
      }
});

    return Lot;
};
