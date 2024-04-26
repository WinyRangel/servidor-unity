const express = require('express');
const router = express.Router();
const proveedorController = require('../controllers/proveedorController');

// Ruta para realizar un pedido a un proveedor
router.post('/pedido', proveedorController.realizarPedidos);
router.post('/pedido', proveedorController.realizarPedidos);

module.exports = router;
