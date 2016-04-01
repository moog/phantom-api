import fs from "fs";
import path from "path";
import sequelize from "sequelize";

let db =  null;

module.exports = app => {
  if (!db) {
    const config = app.libs.config;
    db = {
      sequelize,
      mysql: {
        connection: new sequelize(
          config.mysql.database,
          config.mysql.username,
          config.mysql.password,
          config.mysql.params
        ),
        models: {}
      }
    };

    const dir = path.join(__dirname, "..", "models");
    fs.readdirSync(dir).forEach(file => {
      const modelDir = path.join(dir, file);
      const model = db.mysql.connection.import(modelDir);
      db.mysql.models[model.name] = model;
    });

    Object.keys(db.mysql.models).forEach(key => {
      if("associate" in db.mysql.models[key])
        db.mysql.models[key].associate(db.mysql.models);
    });
  }
  return db;
}
