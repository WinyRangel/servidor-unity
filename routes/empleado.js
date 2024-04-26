const express = require('express');
const router = express.Router();
const empeleadoController = require('./../controllers/empleadoController')

router.post('/filtros', empeleadoController.getEmpleadoFiltro);
// router.put('/asignar', empeleadoController.actualizarRecurso)

module.exports = router;