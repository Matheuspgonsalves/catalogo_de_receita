require("dotenv").config();
const { Sequelize } = require("sequelize");

if (!process.env.DATABASE_URL) {
  console.error("Erro: A variável DATABASE_URL não está configurada.");
  process.exit(1);
}

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

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
