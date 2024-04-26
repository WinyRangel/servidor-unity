const mongoose = require('mongoose');

const pedidoSchema = new mongoose.Schema({
    proveedor: {
        required: true,
        type: String
    },
    email: {
        type: String,
        required: false
    },
    telefono: {
        type: Number,
        required: false
    },
     producto: {
            type: String,
            required: true
        },
        cantidad: {
            type: Number
        },
    fecha: {
        type: Date,
        default: Date.now
    }
});

const Pedido = mongoose.model('Pedido', pedidoSchema);

module.exports = Pedido;
