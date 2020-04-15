module.exports = function(sequelize, DataTypes) {
    var stats = sequelize.define("stats", {
      latitude: DataTypes.DECIMAL,
      longitude: DataTypes.DECIMAL,
      deaths: DataTypes.INTEGER
    });
    return stats;
  };