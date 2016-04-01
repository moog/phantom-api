import express from "express";
import consign from "consign";

const app = express();

consign({verbose: false})
  .include("libs/config.js")
  .then("libs/db.js")
  .then("libs/auth")
  .then("libs/middlewares.js")
  .then("routes")
  .then("libs/server.js")
  .into(app);

module.exports = app;
