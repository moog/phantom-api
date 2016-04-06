import jwt from "jwt-simple";

module.exports = app => {
  const Products = app.libs.db.mysql.models.Products;
  const Categories = app.libs.db.mysql.models.Categories;
  const Markets = app.libs.db.mysql.models.Markets;

  // All products on specified market
  app.route("/market/:idMarket/products")
    .all(app.libs.auth.user.authenticate())
    .get((req, res) => {
      Products.findAll({
        include: [{
          model: Markets,
          where: { id: req.params.idMarket },
          through: { attributes: [] },
          attributes: ["id", "name"],
          required: true
        }],
        attributes: ["id", "name"]
      })
      .then(result => {
        res.json(result);
      })
      .catch(error => {
        res.status(412).json({msg: error.message});
      });
    });

  // All products containing specified string in the name, on specified market
  app.route("/market/:idMarket/products/name/:name")
    .all(app.libs.auth.user.authenticate())
    .get((req, res) => {
      Products.findAll({
        include: [{
          model: Markets,
          where: { id: req.params.idMarket },
          through: { attributes: [] },
          attributes: ["id", "name"],
          required: true
        }],
        where: { name: { $like: "%" + req.params.name + "%" } },
        attributes: ["id", "name"]
      })
      .then(result => {
        res.json(result);
      })
      .catch(error => {
        res.status(412).json({msg: error.message});
      });
    });

  // All products on specified category and market
  app.route("/market/:idMarket/products/category/:idCategory")
    .all(app.libs.auth.user.authenticate())
    .get((req, res) => {
      Products.findAll({
        include: [{
          model: Markets,
          where: { id: req.params.idMarket },
          through: { attributes: [] },
          attributes: ["id", "name"],
          required: true
        }, {
          model: Categories,
          where: { id: req.params.idCategory },
          through: { attributes: [] },
          attributes: ["id", "name"],
          required: true
        }],
        attributes: ["id", "name"]
      })
      .then(result => {
        res.json(result);
      })
      .catch(error => {
        res.status(412).json({msg: error.message});
      });
    });

  // All products containing specified string in the name, on specified category and market
  app.route("/market/:idMarket/products/category/:idCategory/name/:name")
    .all(app.libs.auth.user.authenticate())
    .get((req, res) => {
      Products.findAll({
        include: [{
          model: Markets,
          where: { id: req.params.idMarket },
          through: { attributes: [] },
          attributes: ["id", "name"],
          required: true
        }, {
          model: Categories,
          where: { id: req.params.idCategory },
          through: { attributes: [] },
          attributes: ["id", "name"],
          required: true
        }],
        where: { name: { $like: "%" + req.params.name + "%" } },
        attributes: ["id", "name"]
      })
      .then(result => {
        res.json(result);
      })
      .catch(error => {
        res.status(412).json({msg: error.message});
      });
    });
};
