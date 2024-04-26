const Recurso = require("../models/Recurso.js");
const { transporter } = require('../nodemailer.js'); // Ajusta la ruta según tu estructura de carpetas
const Empleado = require("../models/Empleado.js"); // Ajusta la ruta según tu estructura de carpetas
const Solicitud = require("../models/Solicitud.js"); // Ajusta la ruta según tu estructura de carpetas
const Tipo = require("../models/Tipo.js");


exports.crearRecurso = async (req, res) => {
    try {
        const { recurso, marca, gama, estatus } = req.body; // Extrae los datos del cuerpo de la solicitud

        // Creamos nuestro recurso con los datos proporcionados
        const vrecurso = new Recurso({
            recurso,
            marca,
            gama,
            estatus,
            estado: "En almácen"
        });
        // Enviar correo electrónico a los empleados registrados
        const empleados = await Empleado.find(); // Ajusta el modelo y la consulta según tu estructura

        for (const empleado of empleados) {
            const mailOptions = {
                from: 'danielamanzanorangel@gmail.com',
                to: empleado.email,
                subject: 'Nuevo Artículo Agregado',
                text: `Se ha agregado un nuevo artículo: ${vrecurso.recurso} marca: ${vrecurso.marca} gama: ${vrecurso.gama}`,
            };

            try {
                await transporter.sendMail(mailOptions);
                console.log(`Correo enviado a ${empleado.email}`);
            } catch (error) {
                console.log(`Error al enviar correo a ${empleado.email}: ${error}`);
                // Puedes agregar aquí la lógica para intentar enviar el correo nuevamente o registrar el error
            }
        }
        await vrecurso.save(); // Guarda el recurso en la base de datos
        res.status(201).json(vrecurso); // Envía una respuesta con el recurso creado y el código de estado 201 (creado)
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
};


exports.obtenerRecursos = async (req, res) => {

    try {
        const vrecurso = await Recurso.find();
        res.json(vrecurso)
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }

}

exports.actualizarRecurso = async (req, res) => {

    try {
        const { numSerie, recurso, marca, modelo, cantidad, estatus } = req.body;
        let vrecurso = await Recurso.findById(req.params.id);

        if(!vrecurso) {
            res.status(404).json({ msg: 'No existe' })
        }

        vrecurso.numSerie = numSerie;
        vrecurso.recurso = recurso;
        vrecurso.marca = marca;
        vrecurso.modelo = modelo;
        vrecurso.estatus = estatus;
        
        vrecurso = await Recurso.findOneAndUpdate({ _id: req.params.id },vrecurso, { new: true} )
        res.json(vrecurso);

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}


exports.eliminarRecurso = async (req,res) => {

    try {
        let vrecurso = await Recurso.findById(req.params.id);

        if(!vrecurso){
            res.status(404).json({msg: 'Recurso inexistente'})
        }
        
        await Recurso.findOneAndRemove({ _id: req.params.id })
        res.json({msg: 'Recurso eliminado con exito'});

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.solicitarRecurso = async (req, res) => {
    try {
        const { idEmpleado, nombre, recurso, marca, comentario, estado, numSerie } = req.body;

        // Crear una nueva solicitud con el estado "Pendiente"
        const nuevaSolicitud = new Solicitud({
            idEmpleado,
            numSerie,
            nombre,
            recurso,
            marca,
            comentario,
            estado: "Pendiente"
        });

        // Guardar la solicitud en la base de datos
        await nuevaSolicitud.save();

        // Si la solicitud se crea correctamente, actualiza el estado del recurso a "Solicitado" en la tabla de recursos
        await Recurso.findOneAndUpdate({ numSerie, estatus: "No solicitado" }, { estatus: "Solicitado" });

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
        const solicitudId = req.params.id;
        const solicitud = await Solicitud.findById(solicitudId);

        if (!solicitud) {
            return res.status(404).json({ message: 'Solicitud no encontrada' });
        }

        // Obtener el empleado asociado a la solicitud
        const empleado = await Empleado.findOne({ idEmpleado: solicitud.idEmpleado });

        if (!empleado) {
            return res.status(404).json({ message: 'Empleado no encontrado' });
        }

        // Enviar correo electrónico al empleado que solicitó el recurso
        const mailOptions = {
            from: 'actunity24@gmail.com',
            to: empleado.email,
            subject: 'Solicitud de recurso',
            text: `Hemos revisado tu solicitud, en la que solicitaste un ${solicitud.recurso}. 
            Tu recurso será entregado el día ${solicitud.fechaEntrega}.`,
        };

        try {
            await transporter.sendMail(mailOptions);
            console.log(`Correo enviado a ${empleado.email}`);
        } catch (error) {
            console.log(`Error al enviar correo a ${empleado.email}: ${error}`);
            // Puedes agregar aquí la lógica para intentar enviar el correo nuevamente o registrar el error
        }

        // Obtén la fecha de entrega del cuerpo de la solicitud
        const fechaEntrega = req.body.fechaEntrega;

        // Asigna la fecha de entrega y el estado a la solicitud
        solicitud.fechaEntrega = fechaEntrega;
        solicitud.estado = 'Aprobada';
        await solicitud.save();

        const vrecurso = await Recurso.findOne({ numSerie: solicitud.numSerie });
        if (!vrecurso) {
            return res.status(404).json({ message: 'Recurso no encontrado' });
        }
        vrecurso.estado = 'Asignado';
        await vrecurso.save();

        return res.status(200).json({ message: 'Solicitud aceptada exitosamente' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};



  exports.rechazarSolicitud = async (req, res) => {
    try {
      const solicitudId = req.params.id; // 
      const solicitud = await Solicitud.findById(solicitudId); 
  
      if (!solicitud) {
        return res.status(404).json({ message: 'Solicitud no encontrada' });
      }
        solicitud.estado = 'Rechazada';
      await solicitud.save();
  
      return res.status(200).json({ message: 'Solicitud rechazada exitosamente' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error interno del servidor' });
    }
  };

  //Registrar nuevo tipoRecurso
  exports.crearTipo = async (req, res) =>
  {
      try {
          let tipo;
  
          //creamos supervisor
          tipo = new Tipo(req.body);
          await  tipo.save();
          res.send(tipo);
      } catch(error){
          console.log(error);
          res.status(500).send('Error')
      }
  }
  
  
  exports.obtenerTipo = async (req, res) => {
      try{
          const tipo = await Tipo.find({}, 'nombre');
          res.json(tipo)
      }catch(error){
          console.log(error);
          res.status(500).send('Error')
      }
  }



  /*Asignar recursos 
  
exports.getRecursoFiltro = async (req, res) => {
    console.info('getRecursoFiltro')
    try {
        const filtros = req.body;
        console.info(filtros)
        let mapFiltros = {};
        if(filtros.numSerie) {
            mapFiltros.numSerie = { $regex: filtros.numSerie }
        }
        if(filtros.recurso) {
            mapFiltros.recurso = { $regex: filtros.recurso }
        }
        if(filtros.marca) {
            mapFiltros.marca = { $regex: filtros.marca }
        }
        if(filtros.modelo) {
            mapFiltros.modelo = { $regex: filtros.modelo }
        }
        mapFiltros.estatus = "Sin Problemas";
        const retorno = await Recurso.find(mapFiltros);
        console.info(retorno)
        res.send(retorno)
    } catch(error) {
        console.error(error);
        res.status(500).send({mensaje: 'Hubo un error'})
    }

}

exports.asignarRecurso = async (req, res) => {
    console.info('asignarRecurso')
    try{
        const requestBody = req.body;
        console.info(requestBody)
        requestBody.recursos.forEach(async f => {
            const recurso = await Recurso.findOne({ _id: {$eq: f._id}});
            recurso.asignadoA = requestBody.empleado._id;
            console.info(recurso);
            await Recurso.findOneAndUpdate({ _id: recurso._id}, recurso, {new: true});
        })
        res.send({mensaje: 'Actualizado correctamente'});
    } catch(error) {
        console.error(error);
        res.status(500).send({mensaje: 'Hubo un error'})
    }
}

exports.getRecursoPorEmpleado = async (req, res) => {
    console.info('getRecursoPorEmpleado')
    try {
        const retorno = await Recurso.find({estatus: "Sin Problemas"});
        console.info(retorno)
        res.send(retorno)
    } catch(error) {
        console.error(error);
        res.status(500).send({mensaje: 'Hubo un error'})
    }

}

exports.asignarEmpleado = async (req, res) => {
    console.info('asignarEmpleado');
    try {
        const requestBody = req.body;
        console.info(requestBody);

        const promises = requestBody.map(async f => {
            const recurso = await Recurso.findOne({ _id: { $eq: f._id }});
            recurso.asignadoA = f.asignadoA;
            console.info(recurso);
            await Recurso.findOneAndUpdate({ _id: recurso._id }, recurso, { new: false });

            // Enviar correo electrónico al empleado asignado
            const empleado = await Empleado.findOne({ _id: { $eq: f.asignadoA }});
            const mailOptions = {
                from: 'tu_correo@gmail.com',
                to: empleado.email,
                subject: 'Recurso Asignado',
                text: `Se te ha asignado el recurso: ${recurso.nombre}`,
            };

            try {
                await transporter.sendMail(mailOptions);
                console.log(`Correo enviado a ${empleado.email}`);
            } catch (error) {
                console.log(`Error al enviar correo a ${empleado.email}: ${error}`);
            }
        });

        // Esperar a que se completen todas las operaciones antes de enviar la respuesta
        await Promise.all(promises);

        res.send({ mensaje: 'Actualizado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ mensaje: 'Hubo un error' });
    }
};

exports.reportarFallas = async (req, res) => {
    console.info('reportarFallas')
    try{
        const requestBody = req.body;
        console.info(requestBody)
        let vrecurso = await Recurso.findOne({ numSerie: {$eq: requestBody.numSerie}});

        if(!vrecurso) {
            res.status(404).json({ msg: 'No existe' })
        }

        vrecurso.asignadoA = null;
        vrecurso.descripcionFalla = requestBody.descripcion;
        vrecurso.fchDesdeFalla = requestBody.fchDesde;
        vrecurso.estatus = "Con Problemas";
        
        vrecurso = await Recurso.findOneAndUpdate({ _id: vrecurso._id },vrecurso, { new: true} )
        res.send({mensaje: 'Actualizado correctamente'});
    } catch(error) {
        console.error(error);
        res.status(500).send({mensaje: 'Hubo un error'})
    }
}

*/