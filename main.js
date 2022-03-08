const mongoose = require('mongoose');
const express = require('express');

const app = express();
require('dotenv/config');
app.use(express.json());


const routes = require('./Rutas/contactos');
app.use('/contactos', routes);

mongoose.connect(process.env.DB_CONNECTION, ()=>console.log('conectado a bd'));

const puerto = process.env.PORT || 3000;
app.listen(3000, () => console.log(`Escuchando en el ${puerto}`));