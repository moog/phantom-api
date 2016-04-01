import passport from "passport";
import {Strategy, ExtractJwt} from "passport-jwt";

module.exports = app => {
  const Buyers = app.libs.db.mysql.models.Buyers;
  const cfg = app.libs.config;
  const strategy = new Strategy(
    {
      secretOrKey: cfg.auth.user.jwtSecret,
      jwtFromRequest: ExtractJwt.fromHeader("jwt")
    },
    (payload, done) => {
      Buyers.findById(payload.id)
        .then(buyer => {
          if (buyer) {
            return done(null, {
              id: buyer.id,
              email: buyer.email
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
      return passport.authenticate("jwt", cfg.auth.buyer.jwtSession);
    }
  };
};
