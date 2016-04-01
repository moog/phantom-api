import jwt from "jwt-simple";

module.exports = app => {
  const cfg = app.libs.config;
  const Users = app.libs.db.mysql.models.Users;

  app.post("/user/token", (req, res) => {
    if (req.body.email && req.body.password) {
      const email = req.body.email;
      const password = req.body.password;
      Users.findOne({where: {email: email}})
        .then(user => {
          if (Users.isPassword(user.password, password)) {
            const payload = {id: user.id};
            res.json({
              token: jwt.encode(payload, cfg.auth.user.jwtSecret)
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

  app.route("/user")
    .all(app.libs.auth.user.authenticate())
    .get((req, res) => {
      Users.findById(req.user.id, {
        attributes: ["id", "name", "email"]
      })
      .then(result => {
        res.json(result);
      })
      .catch(error => {
        res.status(412).json({msg: error.message});
      });
    });

  app.post("/user/signup", (req, res) => {
    Users.create(req.body)
      .then(result => {
        res.json(result);
      })
      .catch(error => {
        res.status(412).json({msg: error.message});
      });
  });
};
