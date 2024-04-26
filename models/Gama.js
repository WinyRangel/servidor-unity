const mongoose = require('mongoose');

const GamaSchema = new mongoose.Schema({
    tipo: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Gama', GamaSchema);