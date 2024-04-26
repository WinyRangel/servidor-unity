const express = require ('express');
const router = express.Router();
const departamentoController = require ('../controllers/departamentoController')


//api meseros
router.post('/', departamentoController.crearDepartamento);
router.get('/', departamentoController.obtenerDepartamento);


module.exports = router;