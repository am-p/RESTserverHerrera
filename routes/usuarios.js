const { Router } = require('express'); //es una funcion de express
const { usuariosGet, usuariosPut, usuariosPost, usuariosPatch, usuariosDelete } = require('../controllers/usuarios');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.get('/', usuariosGet);
router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe ser de mas 6 letras').isLength({ min:6 }),
    check('rol', 'No es un rol permitido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('correo', 'El correo no es valido').isEmail(),
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
