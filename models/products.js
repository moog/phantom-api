module.exports = (sequelize, DataType) => {
  const Products = sequelize.define("Products", {
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
    stamp: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    description: {
      type: DataType.TEXT("long")
    },
    price: {
      type: DataType.DECIMAL(10,2),
      allowNull: false
    },
    imageHash: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  }, {
    classMethods: {
      associate: models => {
        Products.belongsToMany(models.Categories, { through: "ProductsCategoriesMarkets", foreignKey: "idProduct" });
        Products.belongsToMany(models.Markets, { through: "ProductsCategoriesMarkets", foreignKey: "idProduct" });
        Products.hasMany(models.OrderItems, { foreignKey: "idProduct" });
        Products.belongsTo(models.Measures, { foreignKey: "idMeasure" })
      }
    }
  });

  return Products;
};
