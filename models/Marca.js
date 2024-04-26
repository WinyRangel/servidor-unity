const mongoose = require('mongoose');

const MarcaSchema = new mongoose.Schema({
    nombre: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Marca', MarcaSchema);