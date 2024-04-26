const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/registro', authController.registro);
router.post('/inicio-sesion', authController.inicioSesion);
router.post('/recuperar-contrasena', authController.recuperarContrasena);
router.post('/cambiar-contrasena', authController.cambiarContrasena);
router.post('/verificar-token', authController.verificarToken);
router.post('/verificar-token-correo', authController.verificarTokenCorreo);

//router.post('/reset-password/:token', authController.resetPassword);
// Ruta para solicitar un restablecimiento de contraseña
//router.post('/forgot-password', authController.requestPasswordReset);

// Ruta para restablecer la contraseña utilizando el token
//router.post('/reset-password/:token', authController.resetPassword);
module.exports = router;
