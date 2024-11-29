const pool = require('./config/db');

pool.getConnection()
    .then((conn) => {
        console.log('Conectado ao banco de dados!');
        conn.release(); // Libera a conexão após testar
    })
    .catch((err) => {
        console.error('Erro ao conectar ao banco de dados:', err);
    });
