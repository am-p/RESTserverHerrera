const { request } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const validarJWT = async( req = request, res, next) => {
    const token = req.header('x-token');
    if (!token) {
	return res.status(401).json({
	    msg: 'No hay token en la peticion'
	});
    };
    try {
	const { uid } = jwt.verify(token, process.env.SECRET_PRIVATE_KEY);
	const usuario = await Usuario.findById(uid);
	if (!usuario) {
	    return res.status(401).json({
		msg: 'Token no valido - usuario no existe en DB'
	    });
	}
	if (!usuario.estado) {
	    return res.status(401).json({
		msg: 'Token no valido - usuario con estado: false'
	    });
	}
	req.usuario = usuario;
	next();
    } catch(error) {
	console.log(error);
	res.status(401).json({
	    msg: 'Token no valido'
	});
    };

};

module.exports = {
    validarJWT
};
