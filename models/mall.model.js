module.exports = (sequelize, Sequelize) => {
    const Mall = sequelize.define("mall", {
      mall_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      mall_location: {
        type: Sequelize.STRING,
        allowNull: false
      }
});

    return Mall;
};
