const { Router } = require('express'); 
const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete } = require('../controllers/usuarios');
const { check } = require('express-validator');
const { esRoleValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');
const { validarCampos, validarJWT, tieneRole } = require('../middlewares/index');

const router = Router();

router.get('/', usuariosGet);

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe ser de mas 6 letras').isLength({ min:6 }),
    check('correo').custom(emailExiste),
    check('rol').custom(esRoleValido), //rol se le envía al esRoleValido, si no se vé es porque es redundante, cosas de las funciones flecha, I guess
    validarCampos
], usuariosPost);

router.put('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('rol').custom(esRoleValido),
    validarCampos
] , usuariosPut);

router.delete('/:id', [
    validarJWT,
    tieneRole('ADMIN_ROLE', 'VENTAS_ROLE'),
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
], usuariosDelete);

module.exports = router;
