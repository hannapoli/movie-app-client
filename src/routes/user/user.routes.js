const express = require('express');
const router = express.Router();
const { mostrarPaginaPrincipal } = require('../../controllers/user/inicioUser.controller');
const { verificarToken, verificarRol } = require('../../middlewares/verificarToken');

router.get('/',[ verificarToken,verificarRol('user')], mostrarPaginaPrincipal);

router.get('/',[ verificarToken,verificarRol('user')],)


module.exports = router;