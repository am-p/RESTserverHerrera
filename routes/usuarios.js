const { Router } = require('express'); //es una funcion de express
const { usuariosGet, usuariosPut, usuariosPost, usuariosPatch, usuariosDelete } = require('../controllers/usuarios');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { esRoleValido, emailExiste } = require('../helpers/db-validators');


const router = Router();

router.get('/', usuariosGet);
router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe ser de mas 6 letras').isLength({ min:6 }),
    check('correo').custom(emailExiste),
    check('rol').custom(esRoleValido), //rol se le envía al esRoleValido, si no se vé es porque es redundante, cosas de las funciones flecha, I guess
    validarCampos
], usuariosPost);
router.put('/:id', usuariosPut);
router.patch('/',  usuariosPatch);
router.delete('/', usuariosDelete);

router.delete('/', (req, res) => {
    res.json({
	msg: 'delete API'
    });
});

module.exports = router;
