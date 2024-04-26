const mongoose = require('mongoose');

const SolicitudSchema = mongoose.Schema({
    idRecurso:{
        type: Number,
    },
    idEmpleado: {
        type: Number,
        require: true
    },
    nombre: {
        type: String,
        require: true
    },
    recurso: {
        type: String,
    },
    comentario:{
        type: String, 
        require: true
    },
    estado: {
        type: String,
        enum: ['Pendiente', 'Aprobada', 'Rechazada'], default: 'Pendiente'},
    fechaEntrega: {
        type: Date,
        default: Date.now // Para establecer la fecha de entrega como la fecha actual por defecto
    }
});

module.exports = mongoose.model('Solicitud', SolicitudSchema);
