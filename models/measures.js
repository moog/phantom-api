module.exports = (sequelize, DataType) => {
  const Measures = sequelize.define("Measures", {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    initials: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  }, {
    classMethods: {
      associate: models => {
        Measures.hasMany(models.Products, { foreignKey: "idMeasure" });
        Measures.hasMany(models.OrderItems, { foreignKey: "idMeasure" });
      }
    }
  });
  return Measures;
};
