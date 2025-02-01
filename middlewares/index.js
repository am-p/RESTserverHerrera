const validaCampos = require('../middlewares/validar-campos');
const validarJWT = require('../middlewares/validar-jwt');
const tieneRole = require('../middlewares/validar-roles');

module.exports = {
    ...validaCampos,
    ...validarJWT,
    ...tieneRole,
}
