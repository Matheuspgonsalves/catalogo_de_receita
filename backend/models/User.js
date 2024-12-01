const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const User = sequelize.define("User", {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  resetToken: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  tokenExpiry: {
    type: DataTypes.DATE,
    allowNull: true,
  },
});

User.associate = (models) => {
  User.hasMany(models.Receita, {
    foreignKey: "userId",
    as: "receitas",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
};

module.exports = User;
