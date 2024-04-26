const Recurso = require("../models/Recurso.js");
const { transporter } = require('../nodemailer.js'); // Ajusta la ruta según tu estructura de carpetas
const Empleado = require("../models/Empleado.js"); // Ajusta la ruta según tu estructura de carpetas
const Solicitud = require("../models/Solicitud.js"); // Ajusta la ruta según tu estructura de carpetas
exports.solicitarRecurso = async (req, res) => {
  try {
      const { idEmpleado, nombre, recurso, marca, comentario, estado } = req.body;

      // Crear una nueva solicitud con el estado "En revisión"
      const nuevaSolicitud = new Solicitud({
          numSerie,
          idEmpleado,
          nombre,
          recurso,
          marca,
          comentario,
          estado: "En revisión"
      });

      // Guardar la solicitud en la base de datos
      await nuevaSolicitud.save();

      res.status(200).json({ message: 'Solicitud enviada correctamente' });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// Obtener todas las solicitudes
exports.obtenerSolicitudes = async (req, res) => {
  try {
  
  const solicitudes = await Solicitud.find();
  res.status(200).json(solicitudes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

// Obtener una solicitud por su ID
exports.obtenerSolicitudPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const solicitud = await Solicitud.findById(id);
    if (!solicitud) {
      return res.status(404).json({ mensaje: 'Solicitud no encontrada' });
    }
    res.status(200).json(solicitud);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};



exports.aprobarSolicitud = async (req, res) => {
  try {
    const solicitudId = req.params.id; // 
    const solicitud = await Solicitud.findById(solicitudId); 

    if (!solicitud) {
      return res.status(404).json({ message: 'Solicitud no encontrada' });
    }
      solicitud.estado = 'Aceptada';
    await solicitud.save();

    return res.status(200).json({ message: 'Solicitud aceptada exitosamente' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};