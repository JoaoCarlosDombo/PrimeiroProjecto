const express = require('express')
const router = express.Router()
const Usuario = require('../models/userModel')
const bcrypt = require('bcrypt')
const JWT = require('jsonwebtoken')
const loginRequired = require('../config/jwt')
const Upimage = require('../config/uploadImagens')

router.get('/login', (req, res) => {
    res.render('admin/login')
});
router.get('/register', (req, res) => {
    res.render('admin/register')
});

router.post('/register', Upimage.single('image'), (req, res) => {
    //verificação e validaçao do formulario
    const errors = []
    const { nome, email, senha, senha2, nivel } = req.body
    const images = req.file.filename

    if (!nome || !email || !senha || !senha2) {
        errors.push({ msg: 'Todos os campos são obrigatorios' })
    }
    //validaçao do Email
    var validEmail = /^[a-zA-Z0-9.!#$%&*+/=?_`{|~-]+@[a-zA-z0-9-]+(?:\.[a-zA-z0-9-]+)*$/;
    if (!email.match(validEmail)) {
        errors.push({ msg: 'Email invalido' })
    }

    //passwor
    if (senha.length < 6) {
        errors.push({ msg: 'A senha esta muito curta' })

    }
    //verificação das duas senhas
    if (senha !== senha2) {
        errors.push({ msg: 'As senhas são diferentes! Repita novamente' })
        console.log('As senhas são diferentes! Repita novamente')
    }
    if (errors.length > 0) {
        res.render('admin/register', {
            errors,
            nome,
            email,
            senha,
            senha2,
            nivel,
            images
        })
    } else {
        //Verifica se  o email já está regista na bd
        Usuario.findOne({ where: { email } })
            .then((usuario) => {
                if (usuario) {
                    errors.push({ msg: 'Este email já existe' })
                    res.render('admin/register')
                } else {
                    const usuario = new Usuario({
                        nome,
                        email,
                        senha,
                        nivel: 0,
                        images
                    })
                    //criptografar a senha
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(usuario.senha, salt, (err, has) => {
                            usuario.senha = has
                            usuario.save().then((usuario) => {
                                res.redirect('/user/login')
                            }).catch((err => {
                                res.redirect('/user/register')
                            }))
                        })
                    })

                }
            }).catch(err => {
                res.render('admin/register')
            })
    }

});

router.post('/atualize/:id', loginRequired, async (req, res) => {
    const { nome, email, nivel } = req.body
    const { id } = req.params
    await Usuario.update({
        nome,
        email,
        nivel,

    }, { where: { id_usuario: id } }).then(() => {
        res.redirect('/dashboard')
    })

})

router.get('/deleter/:id', loginRequired, async (req, res) => {

    const { id } = req.params
    await Usuario.destroy({ where: { id_usuario: id } }).then(() => {

        res.redirect('/dashboard')
    })
})
router.get('/edite/:id', async (req, res) => {
    const { id } = req.params
    await Usuario.findByPk(id)
        .then((user) => {
            res.render('admin/edite', { user })
        })

});
//sign token   
const createToken = (id) => {
    return JWT.sign({ id }, "secretKey")
}
//login  
router.post('/logar', (req, res) => {
    const { email, senha } = req.body
    res.setHeader('Content-Type', 'text/html');
    //verificando o email na bd
    Usuario.findOne({ where: { email } })
        .then((usuario) => {
            if (usuario) {
                bcrypt.compare(senha, usuario.senha, (err, isMatch) => {
                    if (isMatch) {
                        const token = createToken(usuario.id_usuario)
                        res.cookie("access-token", token)
                        res.redirect('/dashboard')


                    } else {
                        res.redirect('/user/login')
                    }
                })
            } else {
                res.redirect('/user/login')
            }
        })
})

router.get('/logout', (req, res) => {
    res.cookie("access-token", "", { maxAge: 1 })
    res.redirect('/user/login')
})


module.exports = router