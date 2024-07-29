const express = require('express');
const dotenv = require('dotenv').config();
const userRoutes = require('./routes/users.routes')
const connect = require('../MyBaseDados/database')
const app = express();


connect();
const port = process.env.PORT || 3000;
app.use(express.json());


app.use('/api/',userRoutes)
app.listen(port,()=>console.log(`Servidor rodando na porta localhost:${port}`))