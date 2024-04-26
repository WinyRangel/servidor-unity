const mongoose = require('mongoose');

const contactoSchema = new mongoose.Schema({
  asunto: {
    type: String,
    required: true
  },
  nombre: {
    type: String,
    required: true
  },
  correo: {
    type: String,
    required: true
  },
  descripcion: {
    type: String,
    required: true
  }
});

const Contacto = mongoose.model('Contacto', contactoSchema);

module.exports = Contacto;
