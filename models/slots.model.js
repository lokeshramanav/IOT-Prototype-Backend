module.exports = (sequelize, Sequelize) => {
    const Slot = sequelize.define("slot", {
      slot_number: {
        type: Sequelize.STRING
      }
});

    return Slot;
};
