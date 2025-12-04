const express = require('express');
const router = express.Router();
const {verificarRol} = require('../../../middlewares/verificarRol');
const {mostrarPeliculas, mostrarFormCrearPelicula, submitCrearPelicula, mostrarFormEditarPelicula} = require('../../../controllers/admin/movies/admin.movies.controller')

//Añadir verificarRol a las ruutas!!!!!!

//validar input?

//Ruta del panel de películas
router.get('/movies', mostrarPeliculas);

//La vista con el formuairo de crear películas
router.get('/movies/create', mostrarFormCrearPelicula);

//Getionar los datos del formulaio por post
router.post('/movies/create', submitCrearPelicula)

//Mostrar la vista con el formuairo de editar por get
router.get('/movies/edit', mostrarFormEditarPelicula)

//Modificar los datos de la película:
router.put('/movies/edit:id', (req, res) => { });

//Eliminar la película por el id:
router.delete('/movies/remove', (req, res) => { });

module.exports = router;
