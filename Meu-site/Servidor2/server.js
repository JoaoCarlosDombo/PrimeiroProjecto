require('dotenv').config();
const express = require('express')
const expressEjsLayouts = require('express-ejs-layouts')
const app = express()
const PORT = process.env.PORT || 8080
const JWT = require('jsonwebtoken')
const cookieparser = require('cookie-parser')
const { urlencoded } = require('express')
const bodyParser = require("body-parser");
const path = require('path')
const cors = require('cors')
const routerHome = require('./routes/home')
const userRoute = require('./routes/user')


//bodyparser
app.use(urlencoded({ extends: true }))
app.use(bodyParser.json());
app.use(express.json())
app.use('/files', express.static(path.resolve(__dirname, "public", "imagens")))
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "X-PINGOTHER, Content-Type, Authorization")
    app.use(cors());
    next();
});
//Bootstrap
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')))
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')))
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')))

//cookie Parse
app.use(cookieparser())

app.use("/public", express.static(__dirname + "/public"));
app.use("/files", express.static(path.resolve(__dirname, "public", "imagens")));
//templet engine
app.use(expressEjsLayouts)
app.set("views", path.join(__dirname, "views"));
app.set("view options", { layout: "views/layout.ejs" });
app.set("view engine", "ejs");



//Routas 
app.use('/', routerHome)
app.use('/user', userRoute)


app.listen(PORT, () => {
    console.log('Servidor rodando na porta ' + PORT)
})


