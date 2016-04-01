import bodyParser from "body-parser";
// import express from "express";
import compression from "compression";

module.exports = app => {
  app.set("port", 3000);
  app.set("json spaces", 4);
  app.use(compression());
  app.use(bodyParser.json());
  app.use(app.libs.auth.user.initialize());
  app.use(app.libs.auth.buyer.initialize());
  app.use((req, res, next) => {
    delete req.body.id;
    next();
  });
  // app.use(express.static("public"));
};
