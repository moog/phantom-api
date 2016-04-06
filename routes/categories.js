import jwt from "jwt-simple";

module.exports = app => {
  const Categories = app.libs.db.mysql.models.Categories;
  const Markets = app.libs.db.mysql.models.Markets;

  // All categories on specified market
  app.route("/market/:idMarket/categories")
    .all(app.libs.auth.user.authenticate())
    .get((req, res) => {
      Categories.findAll({
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
};
