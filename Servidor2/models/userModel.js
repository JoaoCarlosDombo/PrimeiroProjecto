//const db = require("../config/Db");
const db = require('../config/Connect')

const Usuario = db.define("usuarios", {
    id_usuario: {
        type: db.Sequelize.INTEGER,
        autoIncrement: true,
        allowwNull: true,
        primaryKey: true,
    },
    nome: {
        type: db.Sequelize.STRING,
    },
    email: {
        type: db.Sequelize.STRING,
    },
    senha: {
        type: db.Sequelize.STRING,
    },
    nivel: {
        type: db.Sequelize.INTEGER,
        default: 0
    },
    images: {
        type: db.Sequelize.STRING
    }
});
//crea a tabela se ela não existe
const init = async () => {
    await Usuario.sync({ force: true });
};
init();
module.exports = Usuario;
