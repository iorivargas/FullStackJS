const express = require('express');
const router = express.Router();
const pacienteController = require('../controllers/pacienteControllers')
module.exports = function(){
    //Agrega nuevos pasientes via POST
    router.post('/pacientes',
        pacienteController.nuevoPaciente 

    )

    //obtiene todos los registros de pacientes en la BD
    router.get('/pacientes',
        pacienteController.obtenerPacientes
    );

    //obtiene un paciente en especifico (id)
    router.get('/pacientes/:id',
        pacienteController.obtenerPaciente
    );

    //Actualizar un registro por su id
    router.put('/pacientes/:id',
        pacienteController.actualizarPaciente
    );

    //Elimina un paciente por su id
    router.delete('/pacientes/:id',
        pacienteController.eliminarPaciente
    );

    return router;
}