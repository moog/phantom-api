module.exports = (sequelize, DataType) => {
  const Markets = sequelize.define("Markets", {
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
    }
  }, {
    classMethods: {
      associate: models => {
        Markets.belongsToMany(models.Products, { through: "ProductsCategoriesMarkets", foreignKey: "idMarket" });
        Markets.belongsToMany(models.Categories, { through: "ProductsCategoriesMarkets", foreignKey: "idMarket" });
        Markets.hasMany(models.Orders, { foreignKey: "idMarket" });
      }
    }
  });
  return Markets;
};
