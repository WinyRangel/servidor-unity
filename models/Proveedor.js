const mongoose = require('mongoose');

const ProveedorSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    direccion: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: false
    },
    telefono: {
        type: Number,
        required: false
    },
    categoria: {
        type: String,
        required: false
    },
    productos: {

            type: String,
            required: false
        }
});

module.exports = mongoose.model('Proveedor', ProveedorSchema);

