import bcrypt from "bcrypt";

module.exports = (sequelize, DataType) => {
  const Buyers = sequelize.define("Buyer", {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    email: {
      type: DataType.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    password: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  }, {
    hooks: {
      beforeCreate: buyer => {
        const salt = bcrypt.genSaltSync();
        buyer.password = bcrypt.hashSync(buyer.password, salt);
      }
    },
    classMethods: {
      isPassword: (encodedPassword, password) => {
        return bcrypt.compareSync(password, encodedPassword);
      }
    }
  });
  return Buyers;
};
