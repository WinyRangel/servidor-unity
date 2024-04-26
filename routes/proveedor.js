//Rutas empleado
const express = require('express');
const router = express.Router();
const proveedorController = require('../controllers/proveedorController');

//api empleados
router.post('/',  proveedorController.crearProveedor);
router.post('/realizarPedido',  proveedorController.realizarPedidos);
router.get('/', proveedorController.obtenerProveedores);
router.get('/pedido', proveedorController.obtenerPedidos);
router.get('/producto', proveedorController.obtenerProductos);
router.put('/:id', proveedorController.actualizarProveedor);
router.get('/:id', proveedorController.obtenerProveedor);
router.post('proveedor/:id/agregar-producto', proveedorController.agregarProducto);



router.get('/producto/:id', proveedorController.obtenerProducto);

router.delete('/:id', proveedorController.eliminarProveedor);

//Estados
module.exports = router;