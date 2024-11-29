require('dotenv').config(); // Carrega as variáveis do .env

const { Sequelize } = require('sequelize');

// Configura o Sequelize com base no .env
const sequelize = new Sequelize(
    process.env.DB_NAME,       // Nome do banco
    process.env.DB_USER,       // Usuário
    process.env.DB_PASSWORD,   // Senha
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',      // Dialeto para MySQL
        port: process.env.DB_PORT || 3306, // Porta padrão do MySQL
        logging: false,        // Desativa logs de SQL no console
    }
);

module.exports = sequelize;
