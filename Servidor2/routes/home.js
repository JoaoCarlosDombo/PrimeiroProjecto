const express = require('express')
const loginRequired = require('../config/jwt')
const router = express.Router()
const Usuario = require('../models/userModel')

router.get('/', async (req, res) => {
    const userId = req.usuario
    const dados = {
        apelido: 'Dombo'
    }
    await Usuario.findOne({ where: userId }).then((user) => {
        res.json({
            user,
            url: 'http://localhost:8080/files/user/'
        })

    })

})

router.get('/dashboard', loginRequired, async (req, res) => {
    const userId = req.usuario
    await Usuario.findOne({ where: userId })
        .then((user) => {
            Usuario.findAll().then((resultad) => {
                let paginas = req.query.pagina ? Number(req.query.pagina) : 1;
                if (paginas) {
                    //quantidade de paginas 
                    let qnt_result_pag = 3
                    let inicio = (paginas * qnt_result_pag) - qnt_result_pag
                    const quantidade_pag = Math.ceil((resultad.length / qnt_result_pag))
                    const max_link = 2
                    if (paginas > quantidade_pag) {
                        res.redirect('/dashboard/?pagina=' + encodeURIComponent(quantidade_pag));
                    } else if (paginas < 1) {
                        res.redirect('/dashboard/?pagina =' + encodeURIComponent('1'));
                    }
                    Usuario.findAll({ offset: inicio, limit: qnt_result_pag }).then((result) => {
                        res.render('admin/dashboard', { user: user, data: result, paginas, quantidade_pag, max_link, url: 'http://localhost:8080/files/user/' })
                    })
                }

            })
        })
})

module.exports = router