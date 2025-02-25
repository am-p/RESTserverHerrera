const { Router } = require('express');
const { check } = require('express-validator');
const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');
const { crearProducto, obtenerProducto, obtenerProductos, actualizarProducto, borrarProducto } = require('../controllers/productos.js');
const { existeProductoPorId, existeCategoriaPorId } = require('../helpers/db-validators.js');
const router = Router();

router.get('/', obtenerProductos);

 router.get('/:id', [
     check('id', 'No es un ID valido').isMongoId(),
     check('id').custom(existeProductoPorId),
     validarCampos
 ], obtenerProducto);

router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'No es un id de Mongo valido').isMongoId(),
    validarCampos
], crearProducto);

router.put('/:id', [
    validarJWT,
    check('id').custom(existeProductoPorId),    
    validarCampos
], actualizarProducto);

router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeProductoPorId),    
    validarCampos
], borrarProducto);

module.exports = router;

