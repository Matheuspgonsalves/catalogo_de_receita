require("dotenv").config();
const { Sequelize } = require("sequelize");

if (
  !process.env.DB_NAME ||
  !process.env.DB_USER ||
  !process.env.DB_PASSWORD ||
  !process.env.DB_HOST
) {
  console.error("Erro: Variáveis de ambiente não configuradas corretamente.");
  process.exit(1);
}

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Conexão com o banco de dados bem-sucedida!");
  })
  .catch((err) => {
    console.error("Erro ao conectar ao banco de dados:", err);
    process.exit(1);
  });

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Banco de dados sincronizado!");
  })
  .catch((err) => {
    console.error("Erro ao sincronizar o banco de dados:", err);
    process.exit(1);
  });

module.exports = sequelize;
