const Empleado = require('../models/Empleado');

exports.getEmpleadoFiltro = async (req, res) => {
    console.info('getEmpleadoFiltro')
    try {
        const filtros = req.body;
        console.info(filtros)
        let mapFiltros = {};
        if(filtros.nombre) {
            mapFiltros.nombre = { $regex: filtros.nombre }
        }
        if(filtros.aPaterno) {
            mapFiltros.aPaterno = { $regex: filtros.aPaterno }
        }
        if(filtros.aMaterno) {
            mapFiltros.aMaterno = { $regex: filtros.aMaterno }
        }
        if(filtros.idEmpleado) {
            mapFiltros.idEmpleado = filtros.idEmpleado
        }
        const retorno = await Empleado.find(mapFiltros);
        console.info(retorno)
        res.send(retorno)
    } catch(error) {
        console.error(error);
        res.status(500).send({mensaje: 'Hubo un error'})
    }

}