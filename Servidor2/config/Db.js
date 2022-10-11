const Sequelize = require('sequelize');

//Conexao com base de dados mysql
const sequelize = new Sequelize('celke', 'root', '', {
    host: "localhost",
    dialect: 'mysql'
});

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}