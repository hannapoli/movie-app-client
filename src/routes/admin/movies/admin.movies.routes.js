const express = require('express');
const router = express.Router();
//const {verificarRol} = require('../../../middlewares/verificarRol');
const {mostrarPeliculas, createPeliculaForm, crearPelicula, editarPeliculaForm, editarPelicula, eliminarPeliculaForm, eliminarPelicula} = require('../../../controllers/admin/movies/admin.movies.controller');


//Ruta del panel de películas
router.get('/movies', mostrarPeliculas);

//La vista con el formuairo de crear películas
router.get('/movies/create', createPeliculaForm);

//Getionar los datos del formulaio por post
router.post('/movies/create', crearPelicula)

//Mostrar la vista con el formuairo de editar por get
router.get('/movies/edit/:id', editarPeliculaForm)

//Modificar los datos de la película:
router.put('/movies/edit/:id', editarPelicula);

//Mostrar la película por el id para eliminar:
router.get('/movies/delete/:id', eliminarPeliculaForm);

//Eliminar la película por el id:
router.delete('/movies/delete/:id', eliminarPelicula);

module.exports = router;
