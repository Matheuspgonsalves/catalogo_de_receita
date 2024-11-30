require('dotenv').config();
const express = require('express');
const sequelize = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', authRoutes);

const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexão com o banco de dados bem-sucedida.');
        await sequelize.sync({ force: false });

        const port = process.env.PORT || 5000;
        app.listen(port, () => console.log(`Servidor rodando na porta ${port}.`));
    } catch (error) {
        console.error('Erro ao conectar com o banco de dados:', error);
    }
};

startServer();
