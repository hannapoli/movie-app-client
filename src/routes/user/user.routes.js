const express = require('express');
const router = express.Router();
const { mostrarPaginaPrincipal } = require('../../controllers/user/inicioUser.controller');
const { verificarToken, verificarRol } = require('../../middlewares/verificarToken');
const { mostrarFavoritos, agregarFavorito, eliminarFavorito } = require('../../controllers/user/favoritosUser.controller');

router.get('/',[ verificarToken,verificarRol('user')], mostrarPaginaPrincipal);

router.get('/userFavoritos', [verificarToken, verificarRol('user')], mostrarFavoritos);

// Agregar a favoritos
router.post('/userFavoritos/agregar', [verificarToken, verificarRol('user')], agregarFavorito);

// Eliminar de favoritos
router.post('/userFavoritos/eliminar', [verificarToken, verificarRol('user')], eliminarFavorito);


module.exports = router;