import bodyParser from "body-parser";

module.exports = app => {
  app.libs.db.mysql.connection.sync().done(() => {
    app.listen(app.get("port"), () => {
      console.log("Server ON");
    })
  });
};
