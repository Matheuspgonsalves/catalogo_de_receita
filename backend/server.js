require("dotenv").config();
const express = require("express");
const cors = require("cors");
const sequelize = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const novaReceitaRoutes = require("./routes/novaReceitaRoutes");
const recuperarSenhaRoutes = require("./routes/recuperarSenhaRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", authRoutes);
app.use("/api", novaReceitaRoutes);
app.use("/api", recuperarSenhaRoutes);

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("Conexão com o banco de dados bem-sucedida.");

    await sequelize.sync({ force: false });

    const port = process.env.PORT;
    app.listen(port, () => console.log(`Servidor rodando na porta ${port}.`));
  } catch (error) {
    console.error("Erro ao conectar com o banco de dados:", error);
  }
};

startServer();
