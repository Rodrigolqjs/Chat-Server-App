/*
    api/login
*/

const { Router, response } = require('express');
const { crearUsuario } = require('../controllers/auth');
const { login } = require('../controllers/auth');
const { renewToken } = require('../controllers/auth');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const validateJWT = require('../middlewares/validar-jwt');

const router = Router();

router.post('/new', [
    check('name', 'El name es obligatorio').not().isEmpty(),
    check('email', 'El email no es valido').isEmail(),
    check('password', 'El password debe tener mas de 6 caracteres').isLength({min: 6}),
    validarCampos
], crearUsuario);

router.post('/', [
    check('email', 'El email no es valido').isEmail(),
    check('password', 'El password debe tener mas de 6 caracteres').isLength({min: 6}),
    validarCampos
], login);

router.get('/renew', [
    validateJWT
],renewToken);


module.exports = router