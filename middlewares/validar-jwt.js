const { request } = require('express');
const jwt = require('jsonwebtoken');

const validarJWT = ( req = request, res, next) => {
    const token = req.header('x-token');
    if (!token) {
	return res.status(401).json({
	    msg: 'No hay token en la peticion'
	});
    };
    try {
	const { uid } = jwt.verify(token, process.env.SECRET_PRIVATE_KEY);
	req.uid = uid;
	next();
    } catch(error) {
	console.log(error);
	res.status(401).json({
	    msg: 'Token no valido'
	});
    };

s};

module.exports = {
    validarJWT
};
