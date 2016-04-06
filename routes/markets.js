import jwt from "jwt-simple";

module.exports = app => {
  const Markets = app.libs.db.mysql.models.Markets;

  // All markets
  app.route("/markets")
    .all(app.libs.auth.user.authenticate())
    .get((req, res) => {
      Markets.findAll({
        attributes: ["id", "name"],
        order: "name ASC"
      })
      .then(result => {
        res.json(result);
      })
      .catch(error => {
        res.status(412).json({msg: error.message});
      });
    });
};
