const { response } = require('express');

const usuariosGet = (req, res = response) => {
    res.json({
	msg: 'get API - controlador'
    });
};

const usuariosPost = (req, res) => {
    res.status(201).json({
	msg: 'post API - controlador'
    });
};

const usuariosPut =  (req, res) => {
    res.status(400).json({
	msg: 'put API - constolador'
    });
};

const usuariosPatch = (req, res) => {
    res.status(201).json({
	msg: 'patch API - controlador'
    });
};

const usuariosDelete = (req, res) => {
    res.status(201).json({
	msg: 'delete API - controlador'
    });
};


module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
};
