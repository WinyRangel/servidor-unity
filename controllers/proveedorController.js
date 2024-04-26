const Proveedor = require ("../models/Proveedor");
const Pedido = require ("../models/Pedido")
const Producto = require ("../models/Producto")


exports.crearProveedor = async (req, res) => {
    console.info('crear Proveedor')
    try{
        let proveedor;
        //crear proveedor
        proveedor = new Proveedor(req.body);

        await proveedor.save();
        res.send(proveedor);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.agregarProducto = async (req, res) => {
    const proveedorId = req.params.id; // Suponiendo que el id del proveedor se pasa como parámetro en la URL
    const nuevoProducto = req.body.producto; // Suponiendo que el nuevo producto se envía en el cuerpo de la solicitud

    try {
        const proveedor = await Proveedor.findById(proveedorId);

        if (!proveedor) {
            return res.status(404).send('Proveedor no encontrado');
        }

        proveedor.productos.push({ nombre: nuevoProducto });
        await proveedor.save();

        res.send(proveedor);
    } catch (error) {
        console.error(error);
        res.status(500).send('Hubo un error al agregar el producto al proveedor');
    }
}

exports.obtenerProveedores = async (req, res) =>{
    console.info('obtenerProveedores')

    try{
        const proveedor = await Proveedor.find();
        res.json(proveedor);
    }catch(error){
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}


exports.actualizarProveedor = async (req, res) =>{
    console.info('actualizarProveedor')

    try{
        console.info('id: ' + req.params.id)
        const { nombre, direccion, telefono, email, categoria, productos} = req.body;
        let proveedor = await Proveedor.findById(req.params.id);
        console.info(proveedor)
        if(!proveedor){
            res.status(404).json({msg: 'No existe este el proveedor'})
            
        }
        proveedor.nombre = nombre;
        proveedor.direccion = direccion;
        proveedor.productos = productos;            
        proveedor.categoria = categoria;
        proveedor.telefono = telefono;
        proveedor.email = email;
            proveedor = await Proveedor.findOneAndUpdate({_id: req.params.id}, proveedor, { new: true })
            res.json(proveedor);
        }
        catch (error){
            console.log(error);
            res.status(500).send('Hubo un error');
        }
    }


    exports.obtenerProveedor = async (req, res) =>{
        console.info('obtenerProveedor')
        console.info(req.params)
        try{
                let proveedor = await Proveedor.findById(req.params.id);
                if(!proveedor){
                    res.status(404).json({msg: 'No existe este proveedor'})
    
                }
               
                res.json(proveedor);
            }
            catch (error){
                console.log(error);
                res.status(500).send('Hubo un error');
            }
        }
    
        
     
    exports.eliminarProveedor = async (req, res) =>{
        console.info('eliminar Proveedor')

        try {
            let proveedor = await Proveedor.findById(req.params.id);
    
            if(!proveedor) {
                res.status(404).json({ msg: 'No existe el proveedor' })
            }
           
            await Proveedor.findOneAndDelete({ _id: req.params.id })
            res.json({ msg: 'Proveedor eliminado con exito' });
            
        } catch (error) {
            console.log(error);
            res.status(500).send('Hubo un error');
        }
        }

        exports.realizarPedidos = async (req, res) => {
            try{
                let pedido;
                pedido = new Pedido(req.body);
        
                await pedido.save();
                res.send(pedido);
            } catch (error) {
                console.log(error);
                res.status(500).send('Hubo un error');
            }
        }
        
        exports.obtenerPedidos = async (req, res) =>{
            console.info('obtener pedido')
        
            try{
                const pedido = await Pedido.find();
                res.json(pedido);
            }catch(error){
                console.log(error);
                res.status(500).send('Hubo un error');
            }
        }
        exports.obtenerProductos = async (req, res) =>{
            console.info('obtener Productos')
        
            try{
                const producto = await Producto.find();
                res.json(producto);
            }catch(error){
                console.log(error);
                res.status(500).send('Hubo un error');
            }
        }



        exports.obtenerProducto= async (req, res) =>{
            console.info('Obtener producto')
            console.info(req.params)
            try{
                    let producto = await Producto.findById(req.params.id);
                    if(!producto){
                        res.status(404).json({msg: 'No existe este producto'})
        
                    }
                   
                    res.json(producto);
                }
                catch (error){
                    console.log(error);
                    res.status(500).send('Hubo un error');
                }
            }
