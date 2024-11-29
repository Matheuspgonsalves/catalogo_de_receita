const sequelize = require('./config/db');
const User = require('./models/User');

(async () => {
    try {
        // Testa a conexão com o banco
        await sequelize.authenticate();
        console.log('Conexão com o banco de dados estabelecida com sucesso.');

        // Sincroniza os Models com o banco (cria tabelas se necessário)
        await sequelize.sync({ alter: true }); // Usa 'alter' para ajustar estrutura
        console.log('Sincronização dos Models concluída.');
    } catch (error) {
        console.error('Erro ao conectar ou sincronizar o banco de dados:', error);
    }
})();
