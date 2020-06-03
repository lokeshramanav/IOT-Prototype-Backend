module.exports = (sequelize, Sequelize) => {
    const BookingDetail = sequelize.define("bookingDetail", {
      mall_name:{
        type: Sequelize.STRING
      },
      lot_name:{
        type: Sequelize.STRING
      },
      userName:{
        type: Sequelize.STRING
      },
      start_date:{
        type: Sequelize.DATEONLY
      },
      start_time:{
        type: Sequelize.TIME
      },
      end_date:{
        type: Sequelize.DATEONLY
      },
      end_time:{
        type: Sequelize.TIME
      }
});

    return BookingDetail;
};
