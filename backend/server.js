const express = require('express');
const app = express();
const port = 3000;

// Middleware para lidar com requisições JSON
app.use(express.json());

// Rota básica de teste
app.get('/', (req, res) => {
    res.send('Olá, backend em Node.js!');
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
