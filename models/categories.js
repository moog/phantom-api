module.exports = (sequelize, DataType) => {
  const Categories = sequelize.define("Categories", {
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
    order: {
      type: DataType.INTEGER,
      allowNull: false
    },
    stamp: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  }, {
    classMethods: {
      associate: models => {
        Categories.belongsToMany(models.Products, { through: "ProductsCategoriesMarkets", foreignKey: "idCategory" });
        Categories.belongsToMany(models.Markets, { through: "ProductsCategoriesMarkets", foreignKey: "idCategory" });
        Categories.hasMany(Categories, { foreignKey: "idDadCategory" });
      }
    }
  });

  return Categories;
};
