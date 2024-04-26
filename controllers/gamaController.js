const Gama = require("../models/Gama");


exports.crearGama = async (req, res) =>
{
    try {
        let gama;

        //creamos supervisor
        gama = new Gama(req.body);
        await  gama.save();
        res.send(gama);
    } catch(error){
        console.log(error);
        res.status(500).send('Error')
    }
}


exports.obtenerGama= async (req, res) => {
    try{
        const gama = await Gama.find({}, 'tipo');
        res.json(gama)
    }catch(error){
        console.log(error);
        res.status(500).send('Error')
    }
}