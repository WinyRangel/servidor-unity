const Departamento = require("../models/Departamento");


exports.crearDepartamento = async (req, res) =>
{
    try {
        let departamento;

        //creamos supervisor
        departamento = new Departamento(req.body);
        await  departamento.save();
        res.send(departamento);
    } catch(error){
        console.log(error);
        res.status(500).send('Error')
    }
}


exports.obtenerDepartamento = async (req, res) => {
    try {
        const departamentos = await Departamento.find({}, 'nombre gerente');
        res.json(departamentos);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error');
    }
};
