// routes/solicitudRoutes.js

const express = require('express');
const router = express.Router();
const solicitudController = require('../controllers/solicitarRecurso');

router.post('/', solicitudController.solicitarRecurso);

module.exports = router;
