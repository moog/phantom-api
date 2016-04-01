module.exports = {
  mysql: {
    database: "phantom",
    username: "root",
    password: "mo2013og",
    params: {
      dialect: "mysql"
    }
  },
  auth: {
    user: {
      jwtSecret: "Ph4n70n-4p1",
      jwtSession: {session: false}
    },
    buyer: {
      jwtSecret: "Ph4n70n-4p1/b8",
      jwtSession: {session: false}
    }
  }
};
