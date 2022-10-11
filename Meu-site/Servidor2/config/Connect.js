const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false,
        },
    },
});
// verifica a conexao
sequelize.authenticate()
    .then(() => {
        console.loge("Banco de dados conectado")
    }).catch((erro) => {
        console.log("Erro: Falha ao conectar o banco de dados " + erro);
    });

module.exports = sequelize;