const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductoSchema = new Schema({
    proveedor: {
        required: true,
        type: String
    },
    categoria:{
        type: String,
        required: true
    },
    nombre:{
            type: String,
            required: true
    },
    fecha: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Producto', ProductoSchema);
