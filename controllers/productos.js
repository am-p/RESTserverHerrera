const { response } = require("express");
const { Producto } = require("../models");

const crearProducto = async(req, res = response) => {
    const nombre = req.body.nombre.toUpperCase();
    const productoDB = await Producto.findOne({ nombre });

    if (productoDB) {
	return res.status(400).json({
	    msg: `El producto ${ productoDB.nombre } ya existe`
	})
    }
     
    const data = {
	nombre,
	usuario: req.usuario._id,
	categoria: req.categoria._id
    };

    const producto = new Producto(data);
    await producto.save();

    res.status(201).json(categoria);
}

module.exports = {
    crearProducto
}
