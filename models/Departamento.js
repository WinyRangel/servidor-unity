const mongoose = require('mongoose');

const DepartamentoSchema = new mongoose.Schema({
    nombre:{
    type: String,
    required: true
    },
    gerente: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Departamento', DepartamentoSchema);