const express = require('express');
const router = express.Router();
const { mostrarPaginaPrincipal } = require('../../controllers/user/inicioUser.controller');
const { verificarToken, verificarRol } = require('../../middlewares/verificarToken');
const { mostrarFavoritos, agregarFavorito, eliminarFavorito } = require('../../controllers/user/favoritosUser.controller');
const { vistaBuscador, buscarPeliculas, buscarPeliculaPorId } = require('../../controllers/user/search.controller');

router.get('/',[ verificarToken,verificarRol('user')], mostrarPaginaPrincipal);

// Mostrar todas las películas
router.get('/peliculas', [verificarToken, verificarRol('user')], buscarPeliculas);


router.get('/userFavoritos', [verificarToken, verificarRol('user')], mostrarFavoritos);
// Mostrar detalle de película
router.get('/peliculas/:id', [verificarToken, verificarRol('user')], buscarPeliculaPorId);


router.post('/userFavoritos/agregar', [verificarToken, verificarRol('user')], agregarFavorito);

router.post('/userFavoritos/eliminar', [verificarToken, verificarRol('user')], eliminarFavorito);


router.get('/buscador', [verificarToken, verificarRol('user')], vistaBuscador);
// Buscar películas desde el buscador
router.post('/buscador/buscar', [verificarToken, verificarRol('user')], buscarPeliculas);


module.exports = router;