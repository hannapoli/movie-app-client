const express = require('express');
const router = express.Router();
const { mostrarPeliculas, createPeliculaForm, crearPelicula, editarPeliculaForm, editarPelicula, eliminarPeliculaForm, eliminarPelicula } = require('../../../controllers/admin/movies/admin.movies.controller');
const { verificarToken, verificarRol } = require('../../../middlewares/verificarToken');


//Ruta del panel de películas
router.get('/movies', [verificarToken, verificarRol('administrador')], mostrarPeliculas);

//La vista con el formuairo de crear películas
router.get('/movies/create', [verificarToken, verificarRol('administrador')], createPeliculaForm);

//Getionar los datos del formulaio por post
router.post('/movies/create', [verificarToken, verificarRol('administrador')], crearPelicula)

//Mostrar la vista con el formuairo de editar por get
router.get('/movies/edit/:id', [verificarToken, verificarRol('administrador')], editarPeliculaForm)

//Modificar los datos de la película:
router.put('/movies/edit/:id', [verificarToken, verificarRol('administrador')], editarPelicula);

//Mostrar la película por el id para eliminar:
router.get('/movies/delete/:id', [verificarToken, verificarRol('administrador')], eliminarPeliculaForm);

//Eliminar la película por el id:
router.delete('/movies/delete/:id', [verificarToken, verificarRol('administrador')], eliminarPelicula);

module.exports = router;

