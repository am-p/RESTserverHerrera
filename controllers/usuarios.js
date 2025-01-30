const { request, response } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');

const usuariosGet = (req = request, res = response) => {
    const query = req.query;
    
    res.json({
	msg: 'get API - controlador',
	query
    });
};

const usuariosPost = async(req, res = response) => {
    
    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol});   
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);
    await usuario.save();
    res.json({
	usuario
    });
};

const usuariosPut =  (req, res = response) => {
    const id = req.params.id;
    
    res.json({
	msg: 'put API - constolador',
	id
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
