const jwt = require('jsonwebtoken')
//const cookie = require('cookie-parser')

const loginRequired = (req, res, next) => {
    const token = req.cookies["access-token"]
    if (token) {
        const validToken = jwt.verify(token, "secretKey")
        if (validToken) {
            req.usuario = validToken.id
            next()
        } else {

            res.redirect('/user/login')
        }
    } else {

        res.redirect('/user/login')
    }
}
module.exports = loginRequired