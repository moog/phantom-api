module.exports = (sequelize, DataType) => {
  const OrderItems = sequelize.define("OrderItems", {
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
    price: {
      type: DataType.DECIMAL(10,2),
      allowNull: false
    },
    amount: {
      type: DataType.DECIMAL(10,2),
      allowNull: false
    }
  }, {
    classMethods: {
      associate: models => {
        OrderItems.belongsTo(models.Measures, { foreignKey: "idMeasure" });
        OrderItems.belongsTo(models.Products, { foreignKey: "idProduct" });
        OrderItems.belongsTo(models.Orders, { foreignKey: "idOrder" });
      }
    }
  });

  return OrderItems;
};
