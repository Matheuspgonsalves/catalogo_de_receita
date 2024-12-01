const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Receita = sequelize.define(
  "Receita",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nome: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    ingredientes: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    modoPreparo: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    tempoPreparo: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    dificuldade: {
      type: DataTypes.ENUM("facil", "medio", "dificil"),
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "Receitas",
    timestamps: true,
    paranoid: true,
  }
);

Receita.associate = (models) => {
  Receita.belongsTo(models.User, {
    foreignKey: "userId",
    as: "user",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
};

module.exports = Receita;
