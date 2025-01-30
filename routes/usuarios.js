const { Router } = require('express'); //es una funcion de express
const { usuariosGet, usuariosPut, usuariosPost, usuariosPatch, usuariosDelete } = require('../controllers/usuarios');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { esRoleValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');


const router = Router();

router.get('/', usuariosGet);

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe ser de mas 6 letras').isLength({ min:6 }),
    check('correo').custom(emailExiste),
    check('rol').custom(esRoleValido), //rol se le env�a al esRoleValido, si no se v� es porque es redundante, cosas de las funciones flecha, I guess
    validarCampos
], usuariosPost);

router.put('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('rol').custom(esRoleValido),
    validarCampos
] , usuariosPut);

router.patch('/',  usuariosPatch);
router.delete('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
], usuariosDelete);

router.delete('/', (req, res) => {
    res.json({
	msg: 'delete API'
    });
});

module.exports = router;
