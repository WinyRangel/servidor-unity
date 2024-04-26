const nodemailer = require('../nodemailer');
const Contacto = require('../models/Contacto');
exports.enviarCorreo = async (req, res) => {
    try {
      const { asunto, nombre, correo, descripcion } = req.body;
  
      const nuevoContacto = new Contacto({
        asunto,
        nombre,
        correo,
        descripcion
      });
  
      await nuevoContacto.save();
  
      res.status(201).json({ mensaje: 'Correo enviado correctamente' });
    } catch (error) {
        res.status(404).json({ mensaje: 'Error en el servidor' });      
    }
  };

  exports.obtenerContactos = async (req, res) => {
    try {
      // Obtener todos los contactos
      const contactos = await Contacto.find();
      res.status(200).json(contactos);
    } catch (error) {
      // Manejar errores
      res.status(500).json({ mensaje: 'Error en el servidor' });
    }
  };
  