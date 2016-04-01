module.exports = app => {
  app.route("/")
    .get((req, res) => {
      res.json({status: "get is ok"});
    })
    .post((req, res) => {
      res.json({status: "post is ok"});
    })
    .delete((req, res) => {
      res.json({status: "delete is ok"});
    })
    .put((req, res) => {
      res.json({status: "put is ok"});
    });
}
