import passport from "passport";
import {Strategy, ExtractJwt} from "passport-jwt";

module.exports = app => {
  const Users = app.libs.db.mysql.models.Users;
  const cfg = app.libs.config;
  const strategy = new Strategy(
    {
      secretOrKey: cfg.auth.user.jwtSecret,
      jwtFromRequest: ExtractJwt.fromHeader("jwt")
    },
    (payload, done) => {
      Users.findById(payload.id)
        .then(user => {
          if (user) {
            return done(null, {
              id: user.id,
              email: user.email
            });
          }
          return done(null, false);
        })
        .catch(error => done(error, null));
    });
  passport.use(strategy);

  return {
    initialize: () => {
      return passport.initialize();
    },
    authenticate: () => {
      return passport.authenticate("jwt", cfg.auth.user.jwtSession);
    }
  };
};
