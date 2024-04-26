//Rutas empleado
const express = require('express');
const router = express.Router();
const empleadoController = require('../controllers/empleadosController');

//api empleados
router.post('/',  empleadoController.crearEmpleado);
router.get('/', empleadoController.obtenerEmpleados);
router.put('/:id', empleadoController.actualizarEmpleado);
router.get('/:id', empleadoController.obtenerEmpleado);
router.delete('/:id', empleadoController.eliminarEmpleado);


//Estados
module.exports = router;