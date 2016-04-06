module.exports = (sequelize, DataType) => {
  const Orders = sequelize.define("Orders", {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    street: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    city: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    state: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    zipCode: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  }, {
    classMethods: {
      associate: models => {
        Orders.hasMany(models.OrderItems, { foreignKey: "idOrder" });
        Orders.belongsTo(models.Users, { foreignKey: "idUser" })
        Orders.belongsTo(models.Buyers, { foreignKey: "idBuyer" })
        Orders.belongsTo(models.Markets, { foreignKey: "idMarket" })
      }
    }
  });

  return Orders;
};
