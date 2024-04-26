const mongoose = require('mongoose');

const EmpleadoEsquema = mongoose.Schema({
    idEmpleado: {
        type: Number,
        require: true
    },
    nombre: {
        type: String,
        require: true
    },
    aPaterno: {
        type: String,
        require: true
    },
    aMaterno: {
        type: String,
        require: false
    },
    rfc: {
        type: String,
        require:false
    },    
    telefono: {
        type: String,
        require:false
    },
    email: {
        type: String,
        require:false
    },
    departamento: {
        type: String,
        require:false
    },    
    gerente: {
        type: String,
        require:false
    },    
    puesto: {
        type: String,
        require:false
    },    
});

module.exports = mongoose.model('Empleado', EmpleadoEsquema);