const { response, request } = require("express");
const { ObjectId } = require('mongoose').Types;
const { Categoria, Producto, Usuario } = require('../models');
const usuario = require("../models/usuario");

const coleccionesPermitidas = [
    'usuarios',
    'categoria',
    'productos',
    'roles'
];

const buscarUsuarios = async(termino = '', res = response) => {
    const esMongoID = ObjectId.isValid(termino);

    if (esMongoID) {
	const usuario = await Usuario.findById(termino);
	return res.json({
	    results: (usuario) ? [usuario] : []
	});
    }

    const regex = new RegExp(termino, 'i');

    const usuarios = await Usuario.find({
	$or: [{ nombre: regex }, {correo: regex}],
	$and: [{ estado: true }]
    });
    res.json({
	results: usuarios
    });
    
};

const buscar = (req = request, res = response) => {
    const { coleccion, termino} = req.params;

    if (!coleccionesPermitidas.includes(coleccion)) {
	return res.status(400).json({
	    msg: `Las colecciones permitidas son: ${ coleccionesPermitidas }`
	})
    }

    switch(coleccion) {
    case 'usuarios':
	buscarUsuarios(termino, res);
	break;
    case 'categoria':
	break;
    case 'productos':
	break;
    default:
	res.status(500).json({
	    msg: 'Se me chispoteo esa busqueda'
	});
    };
    
}


module.exports = {
    buscar,
    buscarUsuarios
}



