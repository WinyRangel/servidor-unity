const express = require('express');
const router = express.Router();

const recursoController = require('../controllers/recursoController');

/*
router.get('/empleado', recursoController.getRecursoPorEmpleado)
router.post('/asignar', recursoController.asignarRecurso)
router.post('/filtros', recursoController.getRecursoFiltro);
router.post('/asignar/empleado', recursoController.asignarEmpleado)
router.post('/reportar/falla', recursoController.reportarFallas)
*/
router.post('/', recursoController.crearRecurso);
router.get('/', recursoController.obtenerRecursos);
router.put(('/:id'), recursoController.actualizarRecurso);
router.delete(('/:id'), recursoController.eliminarRecurso);
router.post('/solicitar', recursoController.solicitarRecurso)
router.get('/obtenerSolicitudes', recursoController.obtenerSolicitudes)
router.get('/obtenerSolicitudesId', recursoController.obtenerSolicitudPorId)
router.put('/:id/aprobar', recursoController.aprobarSolicitud)
router.put('/:id/rechazar', recursoController.rechazarSolicitud)
router.post('/tipo', recursoController.crearTipo)
router.get('/tipo', recursoController.obtenerTipo)



module.exports = router;

