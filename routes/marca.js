const express = require ('express');
const router = express.Router();
const  marcaController= require ('../controllers/marcaController')



//api meseros
router.post('/', marcaController.crearMarca);
router.get('/', marcaController.obtenerMarca);



module.exports = router;