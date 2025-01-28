const { Router } = require('express'); //es una funcion de express
const { usuariosGet, usuariosPut, usuariosPost, usuariosPatch, usuariosDelete } = require('../controllers/usuarios');

const router = Router();

router.get('/', usuariosGet);
router.post('/', usuariosPost);
router.put('/:id', usuariosPut);
router.patch('/',  usuariosPatch);
router.delete('/', usuariosDelete);

router.delete('/', (req, res) => {
    res.json({
	msg: 'delete API'
    });
});

module.exports = router;
