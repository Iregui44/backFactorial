const express = require('express');
const router = express.Router();
const cors = require('cors');
const Contacto = require('../Modelos/Contacto');

router.use(cors());

router.get('/', cors(), (request, respond) => {
    Contacto.find({}, (error, result) => {
        if(error) {
            respond.send(error);
        }
        else {
            if(result === null) {
                respond.status(404).send("No se encontraron los contactos");
                
            }
            else {
                respond.send(result);
            }
        }
    });
});

router.get('/:email', cors(), (request, respond) => {
    Contacto.findOne({email:request.params.email}, (error, result) => {
        if(error) {
            respond.send(error);
        }
        else {
            if(result === null) {
                respond.status(404).send("No se encontro un contacto con ese correo");
            }
            else {
                respond.send(result);
            }
        }
    })
});

router.post('/', cors(), (request, respond) => {
    if(!validate(request.body.nombre,request.body.apellido,request.body.email,request.body.celular)) {
        respond.status(400).send("Todos los campos son necesarios")
    }
    else {
        Contacto.findOne({email:request.body.email}, (error, result) => {
            if(error) {
                respond.send(error);
            }
            else {
                if(result === null) {
                    const contacton = new Contacto ({
                        nombre: request.body.nombre,
                        apellido: request.body.apellido,
                        email: request.body.email,
                        celular: request.body.celular,
                        cambios: [
                            { cambio: "Agregado POST", fecha: Date.now() }
                        ]
                    });
                    contacton.save()
                    .then(()=> console.log("Guardado en DB"));
                    respond.send(contacton);
                }
                else {
                    respond.status(400).send('Este contacto con ese correo ya existe'); 
                }
            }
        });
    }
});

router.put('/:email', (request, respond) => {
    if(!validate2(request.body.nombre,request.body.apellido,request.body.celular)) {
        respond.status(400).send("Todos los campos son necesarios")
    }
    else {
        Contacto.findOneAndUpdate({email:request.params.email},
            {nombre:request.body.nombre, apellido: request.body.apellido, celular:request.body.celular, $push: { cambios: {cambio: "Modificado PUT", fecha: Date.now()}}}, 
            {new: true},
            (error, result) => {
                if(error) {
                    respond.send(error);
                }
                else {
                    if(result != null) {4
                        respond.send(result);
                    }
                    else {
                        respond.status(404).send('Este contacto con ese correo no existe');
                    }
                }
        });
    }
    
});

router.delete('/:email', (request, respond) => {
    Contacto.findOneAndDelete({email: request.params.email}, (error, result) => {
        if (error) {
            console.log(contactoE);
            respond.send("Error Borrando")
        }
        else {
            if(result!=null) {
                respond.send(result);
            }
            else {

                respond.send("Error Borrando, no se encontro el contacto")
            }
            
        }
    });
});

function validate(nombre, apellido, email, celular) {
    let bien = true;
    if(!nombre || !apellido || !email || !celular) {
        bien = false;
    }
    return bien;
}

function validate2(nombre, apellido, celular) {
    let bien = true;
    if(!nombre || !apellido || !celular) {
        bien = false;
    }
    return bien;
}


module.exports = router;