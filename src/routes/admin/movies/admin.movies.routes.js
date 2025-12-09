/**
 * Rutas del panel de películas (admin CRUD).
 * @module routes/admin/movies
 * @category Routes
 * @description Endpoints para gestionar películas desde el panel admin.
 */
const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer();
const { mostrarPeliculas, crearPeliculaForm, crearPelicula, editarPeliculaForm, editarPelicula, eliminarPeliculaForm, eliminarPelicula } = require('../../../controllers/admin/movies/admin.movies.controller');
const { verificarToken, verificarRol } = require('../../../middlewares/verificarToken');


//Ruta del panel de películas
router.get('/', [verificarToken, verificarRol('administrador')], mostrarPeliculas);

//La vista con el formuairo de crear películas
router.get('/create', [verificarToken, verificarRol('administrador')], crearPeliculaForm);

//Getionar los datos del formulaio por post
router.post('/create', upload.single('imagen'), [verificarToken, verificarRol('administrador')], crearPelicula)

//Mostrar la vista con el formuairo de editar por get
router.get('/edit/:id', [verificarToken, verificarRol('administrador')], editarPeliculaForm)

//Mandar los datos de la película por post a esta ruta para mandarla al backend con put en el controlador para editarla:
router.post('/edit/:id', upload.single('imagen'), [verificarToken, verificarRol('administrador')], editarPelicula);

//Mostrar la película por el id para eliminar:
router.get('/delete/:id', [verificarToken, verificarRol('administrador')], eliminarPeliculaForm);

//Mandar los datos de la película por post a esta ruta para mandarla al backend con put en el controlador para eliminarla:
router.post('/delete/:id', [verificarToken, verificarRol('administrador')], eliminarPelicula);

module.exports = router;

