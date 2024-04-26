const mongoose = require('mongoose');
// Función para generar un número de serie aleatorio de 17 dígitos
function generarNumSerie() {
    // Genera un número aleatorio de 17 dígitos
    return Math.floor(Math.random() * 10**17).toString().padStart(17, '0');
}
const RecursoSchema = mongoose.Schema({
    numSerie: {
        type: String,
        default: generarNumSerie, // Usa la función generarNumSerie como valor predeterminado
    },
    idRecurso:{
        type: String,
        require: true
    },
    recurso: {
        type: String,
    },
    marca: {
        type: String,
    },
    gama: {
        type: String,
    },
    estatus: {
        type: String,
        require: false
    },
    fechaCreacion: {
        type: Date,
        default: Date.now()
    },
    estado:{
    type: String,
    enum: ['En almácen', 'Asignado'], default: 'En almácen'
}
});

module.exports = mongoose.model('Recurso', RecursoSchema);
