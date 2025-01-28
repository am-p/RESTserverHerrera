const { request, response } = require('express');

const usuariosGet = (req = request, res = response) => {
    const query = req.query;
    
    res.json({
	msg: 'get API - controlador',
	query
    });
};

const usuariosPost = (req, res = response) => {
    const body = req.body;
    
    res.json({
	msg: 'post API - controlador',
	body
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
