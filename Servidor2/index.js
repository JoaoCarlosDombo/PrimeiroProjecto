require('dotEnv').config()
const express = require('express')
const app = express()
const cors = require('cors')



app.use(cors());
app.use(express.json())



app.listen(process.env.PORT || 8081, () => {
    console.log("Rodando o servidor na porta ");
});



