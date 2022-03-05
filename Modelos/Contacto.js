const mongoose = require('mongoose');

const contactoSchema = mongoose.Schema({
    nombre: { type: String, required : true },
    apellido: {type: String, required : true},
    email: {type: String, required : true, unique: true},
    celular: {type: Number, required : true},
    cambios: {type:Array}
});

module.exports = mongoose.model('Contactos', contactoSchema);