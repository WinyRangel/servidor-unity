const  gamaController= require ('../controllers/gamaController')
const express = require('express');
const router = express.Router();

router.post('/', gamaController.crearGama);
router.get('/', gamaController.obtenerGama);

module.exports = router;
