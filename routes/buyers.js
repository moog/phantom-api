import jwt from "jwt-simple";

module.exports = app => {
  const cfg = app.libs.config;
  const Buyers = app.libs.db.mysql.models.Buyers;

  app.post("/buyer/token", (req, res) => {
    if (req.body.email && req.body.password) {
      const email = req.body.email;
      const password = req.body.password;
      Buyers.findOne({where: {email: email}})
        .then(buyer => {
          if (Buyers.isPassword(buyer.password, password)) {
            const payload = {id: buyer.id};
            res.json({
              token: jwt.encode(payload, cfg.auth.buyer.jwtSecret)
            });
          } else {
            res.sendStatus(401);
          }
        })
        .catch(error => res.sendStatus(401));
    } else {
      res.sendStatus(401);
    }
  });

  app.route("/buyer")
    .all(app.libs.auth.buyer.authenticate())
    .get((req, res) => {
      Buyers.findById(req.buyer.id, {
        attributes: ["id", "name", "email"]
      })
      .then(result => {
        res.json(result);
      })
      .catch(error => {
        res.status(412).json({msg: error.message});
      });
    });

  /*app.post("/buyer/signup", (req, res) => {
    Buyers.create(req.body)
      .then(result => {
        res.json(result);
      })
      .catch(error => {
        res.status(412).json({msg: error.message});
      });
  });*/
};
