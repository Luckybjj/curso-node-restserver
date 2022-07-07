const { Router } = require('express');
const { check } = require('express-validator');

const { validaCampos } = require('../middlewares/validar-campos');
const { esRolValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');

const { usersGet, usersPost, usersPut, usersDelete } = require('../controllers/usuarios');

const router = Router();

router.get('/', usersGet);      // solo se manda la referencia, no se ejecuta la función

router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('rol').custom(esRolValido),
    validaCampos
], usersPut);   // el middleware es el segundo argumento, cuando el controlador esta como 3° argumento

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe de ser más de 6 letras').isLength({ min: 6 }),
    check('correo').custom(emailExiste),
    check('correo', 'El correo no es válido').isEmail(),
    // check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom(esRolValido),
    validaCampos
], usersPost);     // en el check especificamos que campo del body es el que quiero validar

router.delete('/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validaCampos
], usersDelete);


module.exports = router;
