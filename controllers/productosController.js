const Producto = require("../models/Producto");

exports.crearProducto = async (req, res) => {
  try {
    const { nombre, descripcion } = req.body;
    const imageUrl = req.file.path;
    const producto = new Producto({ nombre, descripcion, imageUrl });
    await producto.save();
    res.status(201).json({ message: 'Product created successfully', product });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};
