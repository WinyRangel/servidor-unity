const express = require('express');
const router = express.Router();
const contactoController = require('../controllers/contactoController');

router.post('/', contactoController.enviarCorreo);
router.get('/', contactoController.obtenerContactos);

module.exports = router;
