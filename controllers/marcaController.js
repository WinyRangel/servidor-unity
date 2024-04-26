const Marca = require("../models/Marca");


exports.crearMarca = async (req, res) =>
{
    try {
        let marca;

        //creamos supervisor
        marca = new Marca(req.body);
        await  marca.save();
        res.send(marca);
    } catch(error){
        console.log(error);
        res.status(500).send('Error')
    }
}


exports.obtenerMarca = async (req, res) => {
    try{
        const marca = await Marca.find({}, 'nombre');
        res.json(marca)
    }catch(error){
        console.log(error);
        res.status(500).send('Error')
    }
}