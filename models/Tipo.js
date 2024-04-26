const mongoose = require('mongoose');

const tipoSchema = new mongoose.Schema({
    nombre: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('tipo', tipoSchema);